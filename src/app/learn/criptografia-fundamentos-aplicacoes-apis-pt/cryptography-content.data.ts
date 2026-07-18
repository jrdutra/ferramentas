import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.
export const CRYPTOGRAPHY_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-01-cryptographic-primitives.svg",
    "alt": "Mapa das principais primitivas criptográficas e dos objetivos que cada uma atende",
    "caption": "Figura 7.1 - Mapa das principais primitivas criptograficas."
  },
  {
    "kind": "paragraph",
    "text": "Este capitulo apresenta os fundamentos matematicos e operacionais da criptografia moderna e conecta cada primitiva ao uso real em APIs, TLS, tokens, assinaturas de mensagens, cofres de chaves e API Gateways. O objetivo e permitir que o leitor reconheca o papel de cada algoritmo, seus parametros criticos e os riscos de uma composicao incorreta."
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
      "Distinguir confidencialidade, integridade, autenticidade, autorizacao e nao repudio, evitando atribuir a um algoritmo propriedades que ele nao fornece.",
      "Compreender as diferencas entre criptografia simetrica e assimetrica, bem como o motivo de sistemas modernos combinarem as duas em esquemas hibridos.",
      "Entender AES, modos de operacao, cifras de fluxo, AEAD, nonces, IVs, tags e os efeitos do reuso de parametros.",
      "Compreender funcoes hash, HMAC, KDFs, armazenamento de senhas e a diferenca entre hash simples e derivacao resistente a ataques de senha.",
      "Entender RSA, criptografia de curvas elipticas, troca de chaves, encapsulamento de chaves e assinaturas digitais.",
      "Relacionar primitivas criptograficas a TLS, mTLS, JWT, JWS, JWE, webhooks, Open Finance, HSM, KMS, Axway API Gateway e Azure API Management.",
      "Construir um processo de troubleshooting para falhas de assinatura, decriptacao, integridade, codificacao e acesso a chaves.",
      "Conhecer os padroes pos-quanticos FIPS 203, FIPS 204 e FIPS 205 e compreender por que criptoagilidade e inventario sao requisitos arquiteturais."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Como estudar este capitulo",
    "id": "como-estudar-este-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Criptografia costuma parecer um conjunto de siglas isoladas: AES, RSA, SHA, HMAC, ECDSA, EdDSA, GCM, OAEP e PSS. O aprendizado melhora quando essas siglas sao organizadas por objetivo. Primeiro identifique o servico desejado - cifrar, verificar integridade, autenticar uma mensagem, estabelecer uma chave ou assinar. Depois escolha a primitiva, o esquema e os parametros apropriados. Por fim, examine o ciclo de vida das chaves e o contexto do protocolo."
  },
  {
    "kind": "paragraph",
    "text": "O foco nao sera demonstrar todas as provas matematicas, mas fornecer profundidade suficiente para arquitetura e operacao. O leitor deve terminar o capitulo sabendo por que usar AES-GCM e diferente de usar AES-ECB, por que uma funcao hash nao cifra dados, por que HMAC nao equivale a assinatura digital, por que RSA nao deve cifrar payloads grandes diretamente e por que o maior risco muitas vezes esta na gestao de chaves, nao no algoritmo."
  },
  {
    "kind": "paragraph",
    "text": "Regra editorial para diagramas Para evitar textos quebrados, os diagramas deste capitulo usam apenas rotulos curtos. Explicacoes contextuais e tecnicas ficam no corpo do texto, onde o fluxo pode crescer naturalmente entre paginas. As caixas de destaque do documento sao tabelas de altura automatica, sem dimensoes fixas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "O que a criptografia resolve",
    "id": "o-que-a-criptografia-resolve"
  },
  {
    "kind": "paragraph",
    "text": "A criptografia e um conjunto de tecnicas para proteger informacao contra adversarios. Em sistemas digitais, ela pode impedir a leitura de dados por pessoas nao autorizadas, detectar alteracoes, autenticar quem produziu uma mensagem, estabelecer segredos entre partes que nunca compartilharam uma chave e produzir evidencias tecnicas de autoria. Esses objetivos aparecem em protocolos de rede, armazenamento, identidade, pagamentos, APIs e dispositivos."
  },
  {
    "kind": "paragraph",
    "text": "Um erro comum e tratar criptografia como sinonimo de cifragem. Cifrar e apenas uma das funcoes possiveis. Uma assinatura digital, por exemplo, normalmente nao esconde o conteudo; ela permite verificar integridade e autenticidade. Uma funcao hash tambem nao esconde o conteudo de maneira reversivel; ela produz um resumo de tamanho fixo. Um MAC autentica uma mensagem entre participantes que compartilham um segredo. A arquitetura segura nasce da composicao correta dessas primitivas."
  },
  {
    "kind": "paragraph",
    "text": "No contexto de APIs, a criptografia protege varias fronteiras. TLS protege o canal. JWS protege a integridade de tokens e mensagens. JWE pode fornecer confidencialidade de objetos. HMAC e usado em assinaturas de webhooks e autenticacao de requisicoes. Certificados e chaves privadas suportam TLS, mTLS e assinaturas. KMS e HSM reduzem exposicao de chaves. Cada mecanismo responde a uma ameaca diferente."
  },
  {
    "kind": "paragraph",
    "text": "A escolha criptografica tambem e uma decisao operacional. Algoritmos e tamanhos de chave precisam ser suportados por clientes, gateways, bibliotecas, appliances e HSMs. Chaves precisam ser geradas, distribuidas, rotacionadas, auditadas e descartadas. Uma implementacao pode usar um algoritmo robusto e ainda ser insegura por causa de nonces repetidos, aleatoriedade fraca, chaves compartilhadas por muitos sistemas ou logs que revelam material sensivel."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Objetivos de seguranca e limites das primitivas",
    "id": "objetivos-de-seguranca-e-limites-das-primitivas"
  },
  {
    "kind": "paragraph",
    "text": "Confidencialidade significa impedir que terceiros compreendam o conteudo protegido. Integridade significa detectar modificacoes. Autenticidade relaciona a mensagem a uma identidade ou a um detentor de chave. Disponibilidade, autorizacao e validacao de regras de negocio nao sao fornecidas automaticamente pela criptografia. Um endpoint pode usar TLS forte e ainda permitir uma operacao indevida por falha de autorizacao."
  },
  {
    "kind": "paragraph",
    "text": "O termo nao repudio deve ser usado com cuidado. Uma assinatura digital pode criar evidencia tecnica verificavel por terceiros, porque a chave publica e diferente da chave privada. Entretanto, a conclusao juridica de que uma pessoa nao pode negar uma acao depende de identidade, custodia da chave, auditoria, politica, dispositivo, processo de emissao e contexto legal. A matematica e uma parte do sistema probatorio, nao o sistema inteiro."
  },
  {
    "kind": "paragraph",
    "text": "Outro limite e que criptografia protege dados em estados e fronteiras especificos. Criptografia em transito nao protege automaticamente dados depois que a aplicacao os descriptografa. Criptografia em repouso pode proteger discos roubados, mas nao impede que um processo autorizado e comprometido leia os dados. Assinaturas detectam alteracoes, mas nao garantem que o conteudo assinado e verdadeiro ou permitido."
  },
  {
    "kind": "paragraph",
    "text": "Arquitetos devem formular a ameaca antes de escolher a primitiva. Quem e o adversario? Ele observa a rede, altera mensagens, compromete um servidor, rouba um backup, controla um cliente ou possui acesso administrativo? Qual informacao precisa permanecer secreta e por quanto tempo? Quem deve verificar a autenticidade? Essas respostas determinam algoritmo, chave, protocolo, isolamento e governanca."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Vocabulário essencial: chaves, nonces, IVs, salts e tags",
    "id": "vocabulario-essencial-chaves-nonces-ivs-salts-e-tags"
  },
  {
    "kind": "paragraph",
    "text": "Texto claro e a informacao antes da cifragem. Texto cifrado e o resultado produzido pelo algoritmo. A chave e um valor secreto ou parcialmente publico que controla a transformacao. O algoritmo pode ser conhecido por todos; a seguranca deve depender da chave. Essa ideia e associada ao principio de Kerckhoffs: sistemas devem permanecer seguros mesmo que o adversario conheca o projeto, exceto o segredo criptografico."
  },
  {
    "kind": "paragraph",
    "text": "Nonce significa number used once. Em muitos esquemas, ele nao precisa ser secreto, mas precisa atender a uma regra de unicidade ou imprevisibilidade. Em AES-GCM, reutilizar o mesmo nonce com a mesma chave pode comprometer confidencialidade e integridade. IV, vetor de inicializacao, e um parametro usado por modos de operacao; seus requisitos variam. Tratar todo IV como \"numero aleatorio qualquer\" e perigoso."
  },
  {
    "kind": "paragraph",
    "text": "Salt e um valor associado principalmente a derivacao de chaves e armazenamento de senhas. Ele normalmente nao e secreto. Seu papel e garantir que entradas iguais produzam resultados diferentes e dificultar tabelas precomputadas. Salt nao substitui custo computacional. Para senhas, e necessario usar uma funcao de derivacao apropriada, com parametros de memoria e tempo ajustados ao ambiente."
  },
  {
    "kind": "paragraph",
    "text": "Tag de autenticacao e o valor que permite verificar integridade e autenticidade em um esquema AEAD ou MAC. A aplicacao deve rejeitar a mensagem se a verificacao da tag falhar, sem liberar texto claro parcial. Reduzir tags excessivamente, comparar tags de modo vulneravel a timing ou continuar o processamento apos falha de autenticacao destrói propriedades que o algoritmo deveria fornecer."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aleatoriedade, entropia e geracao de chaves",
    "id": "aleatoriedade-entropia-e-geracao-de-chaves"
  },
  {
    "kind": "paragraph",
    "text": "Chaves, nonces, salts, desafios e valores temporarios dependem de aleatoriedade adequada. Um gerador comum usado para simulacoes ou interfaces nao e necessariamente seguro para criptografia. Geradores criptograficamente seguros combinam fontes de entropia com mecanismos deterministas projetados para produzir sequencias imprevisiveis. O NIST trata fontes de entropia e DRBGs na familia SP 800-90."
  },
  {
    "kind": "paragraph",
    "text": "Entropia descreve incerteza. Uma chave de 256 bits nao possui 256 bits de seguranca se foi escolhida a partir de uma lista pequena, de um timestamp ou de um identificador previsivel. O tamanho nominal do campo nao corrige uma origem fraca. Chaves devem ser geradas por bibliotecas criptograficas confiaveis, sistemas operacionais, HSMs ou KMSs, evitando implementacoes caseiras."
  },
  {
    "kind": "paragraph",
    "text": "Falhas de aleatoriedade podem ser silenciosas. Dois dispositivos inicializados com o mesmo estado podem gerar chaves repetidas. Um container clonado em um momento inadequado pode reproduzir sequencias. Um contador reiniciado pode repetir nonces. Uma biblioteca pode cair para uma fonte fraca quando a fonte principal falha. Por isso, modulos criptograficos precisam de inicializacao, health tests, isolamento e observabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, aleatoriedade aparece em sessoes TLS, geracao de chaves, tokens opacos, correlacao e protecoes contra replay. O gateway nao deve usar identificadores previsiveis como segredo. Chaves geradas externamente precisam ser importadas com controles de acesso, e chaves geradas no HSM idealmente nunca deixam a fronteira criptografica em texto claro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia simetrica",
    "id": "criptografia-simetrica"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-02-symmetric-asymmetric.svg",
    "alt": "Comparação entre criptografia simétrica e assimétrica em sistemas reais",
    "caption": "Figura 7.2 - Comparacao entre criptografia simetrica e assimetrica."
  },
  {
    "kind": "paragraph",
    "text": "Na criptografia simetrica, as partes usam a mesma chave secreta, ou chaves diretamente relacionadas, para cifrar e decifrar. A principal vantagem e desempenho: algoritmos simetricos processam grandes volumes com baixo custo relativo. Por isso, dados de aplicacao em TLS, arquivos, discos e backups sao normalmente protegidos por cifras simetricas."
  },
  {
    "kind": "paragraph",
    "text": "O desafio e distribuir a chave. Se duas partes precisam compartilhar um segredo, como esse segredo chega a ambas sem ser interceptado? Sistemas modernos resolvem isso com estabelecimento de chaves assimetrico, KEMs, canais previamente protegidos, KMSs ou processos de provisionamento. Depois que uma chave de sessao e estabelecida, a cifra simetrica protege o fluxo de dados."
  },
  {
    "kind": "paragraph",
    "text": "Chaves simetricas exigem separacao de finalidade. A mesma chave nao deve ser reutilizada indiscriminadamente para cifragem, MAC, ambientes, clientes e protocolos. KDFs permitem derivar chaves distintas a partir de um segredo principal e de um contexto. Essa separacao reduz o impacto de falhas e evita interacoes inesperadas entre esquemas."
  },
  {
    "kind": "paragraph",
    "text": "A criptografia simetrica tambem nao fornece automaticamente autenticidade. Um modo que apenas cifra pode permitir alteracoes controladas no texto cifrado. Por isso, arquiteturas modernas preferem AEAD, que combina confidencialidade e autenticacao, ou uma composicao formalmente segura de cifragem e MAC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cifras de bloco, cifras de fluxo e o AES",
    "id": "cifras-de-bloco-cifras-de-fluxo-e-o-aes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-03-aes-round.svg",
    "alt": "Transformações conceituais executadas durante uma rodada do AES",
    "caption": "Figura 7.3 - Visao conceitual de uma rodada do AES."
  },
  {
    "kind": "paragraph",
    "text": "Uma cifra de bloco transforma blocos de tamanho fixo. O AES, padronizado no FIPS 197, trabalha com blocos de 128 bits e chaves de 128, 192 ou 256 bits. Mensagens reais sao maiores ou menores que um bloco; por isso, o AES precisa ser usado com um modo de operacao. O algoritmo AES e apenas o nucleo. A seguranca da aplicacao depende do modo, do nonce ou IV, da autenticacao e do tratamento de erros."
  },
  {
    "kind": "paragraph",
    "text": "O AES organiza o bloco em um estado e aplica rodadas de substituicao, permutacao, mistura e adicao de chave. Essas operacoes criam confusao e difusao: relacoes simples entre entrada, chave e saida desaparecem. O numero de rodadas varia com o tamanho da chave. A implementacao deve ser resistente a canais laterais, porque uma execucao matematicamente correta pode vazar informacao por tempo, cache, consumo ou falhas induzidas."
  },
  {
    "kind": "paragraph",
    "text": "Cifras de fluxo produzem uma sequencia de chave que e combinada com o texto claro, normalmente por XOR. O ChaCha20 e um exemplo moderno, frequentemente combinado com Poly1305 para formar um AEAD. Ele apresenta bom desempenho em software e e especificado para protocolos IETF na RFC 8439. Como em outros esquemas, reutilizar nonce e chave pode ser catastrofico."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs, a escolha entre AES-GCM e ChaCha20-Poly1305 costuma ser feita pelo protocolo ou biblioteca. Aplicacoes nao devem inventar formatos proprios sem necessidade. TLS, JOSE, COSE e bibliotecas de envelope encryption ja definem algoritmos, campos e verificacoes. A interoperabilidade e a analise de seguranca de um protocolo estabelecido valem mais que uma composicao artesanal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Modos de operacao: ECB, CBC, CTR e GCM",
    "id": "modos-de-operacao-ecb-cbc-ctr-e-gcm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-04-block-modes.svg",
    "alt": "Comparação entre os modos de operação ECB, CBC, CTR e GCM",
    "caption": "Figura 7.4 - Diferencas conceituais entre modos de operacao."
  },
  {
    "kind": "paragraph",
    "text": "ECB cifra cada bloco de forma independente. Blocos iguais sob a mesma chave geram blocos cifrados iguais, revelando padroes. Por isso, ECB nao e apropriado para proteger mensagens estruturadas. Ele e um exemplo didatico importante: usar AES nao garante seguranca se o modo de operacao for inadequado."
  },
  {
    "kind": "paragraph",
    "text": "CBC encadeia cada bloco com o bloco anterior e exige um IV com propriedades corretas. Historicamente foi amplamente usado, mas requer padding e autenticacao separada. Erros de validacao podem criar padding oracles, permitindo ao atacante aprender informacoes por respostas diferentes. Protocolos modernos tendem a preferir AEAD, reduzindo a complexidade de composicao."
  },
  {
    "kind": "paragraph",
    "text": "CTR transforma um cifrador de bloco em uma cifra de fluxo usando contadores. Ele permite paralelismo e nao exige padding, mas a reutilizacao do mesmo contador ou nonce com a mesma chave pode revelar relacoes entre textos claros. CTR fornece confidencialidade, nao autenticacao; precisa ser combinado com um MAC de modo seguro."
  },
  {
    "kind": "paragraph",
    "text": "GCM combina modo contador com autenticacao baseada em Galois, produzindo texto cifrado e tag. Ele suporta dados autenticados que nao sao cifrados, como cabecalhos de protocolo. GCM e eficiente e muito usado em TLS e JOSE, mas depende fortemente da unicidade do nonce. O NIST esta revisando a SP 800- 38D, mas a recomendacao final vigente continua sendo a referencia operacional ate que uma revisao final a substitua."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "AEAD e dados associados",
    "id": "aead-e-dados-associados"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-05-aead.svg",
    "alt": "Entradas e saídas de um esquema de cifragem autenticada AEAD",
    "caption": "Figura 7.5 - Entradas e saidas de um esquema AEAD."
  },
  {
    "kind": "paragraph",
    "text": "AEAD significa Authenticated Encryption with Associated Data. O esquema protege confidencialidade do texto claro e autenticidade tanto do texto cifrado quanto de dados associados. AAD pode conter metadados que precisam ser protegidos contra alteracao, mas precisam permanecer visiveis para roteamento ou processamento."
  },
  {
    "kind": "paragraph",
    "text": "Uma operacao AEAD recebe chave, nonce, texto claro e AAD. Ela retorna texto cifrado e tag. Na abertura, o receptor apresenta os mesmos parametros e valida a tag. Somente depois da verificacao bem-sucedida o texto claro deve ser aceito. Esse fluxo evita que dados alterados alcancem a logica de negocio como se fossem validos."
  },
  {
    "kind": "paragraph",
    "text": "Em formatos de token e mensagem, os campos que compoem AAD precisam ser definidos pelo padrao. Alterar serializacao, ordem, canonicalizacao ou encoding pode fazer a tag falhar, mesmo quando os dados parecem semanticamente iguais. Isso e comum em troubleshooting de JOSE: a assinatura ou tag cobre bytes exatos, nao um objeto abstrato interpretado livremente."
  },
  {
    "kind": "paragraph",
    "text": "Nonce management deve ser parte do desenho. Gerar nonces aleatorios pode ser adequado quando a probabilidade de colisao e controlada; contadores podem ser melhores em outros contextos, desde que nao reiniciem sob a mesma chave. Sistemas distribuidos precisam coordenar unicidade entre instancias ou separar chaves por instancia e contexto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Funcoes hash criptograficas",
    "id": "funcoes-hash-criptograficas"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-06-hash-avalanche.svg",
    "alt": "Efeito avalanche produzido por uma função hash criptográfica",
    "caption": "Figura 7.6 - Efeito avalanche de uma funcao hash."
  },
  {
    "kind": "paragraph",
    "text": "Uma funcao hash recebe uma mensagem de tamanho arbitrario e produz um digest de tamanho fixo. Ela deve ser deterministica, eficiente e resistente a pre-imagem, segunda pre-imagem e colisoes. Resistencia a pre-imagem dificulta recuperar uma entrada a partir do digest. Resistencia a colisao dificulta encontrar duas entradas diferentes com o mesmo digest."
  },
  {
    "kind": "paragraph",
    "text": "Hashes sao usados para integridade, assinaturas, estruturas de dados, identificadores, derivacao e protocolos. Eles nao sao cifragem porque nao existe uma chave de decriptacao que recupere a mensagem. Tambem nao e seguro proteger senhas apenas calculando SHA-256, pois hashes genericos sao rapidos demais e permitem testar grandes volumes de palpites."
  },
  {
    "kind": "paragraph",
    "text": "A familia SHA-2 inclui SHA-256 e SHA-512. SHA-3, padronizada no FIPS 202, usa uma construcao diferente baseada em Keccak e oferece alternativas como SHA3-256 e funcoes XOF SHAKE. Ter familias diferentes aumenta diversidade criptografica. A escolha depende de protocolo, interoperabilidade, desempenho e requisitos de conformidade."
  },
  {
    "kind": "paragraph",
    "text": "MD5 e SHA-1 nao devem ser usados quando resistencia a colisao e necessaria. Sistemas legados podem mante-los em identificadores nao adversariais, mas novos projetos devem usar algoritmos modernos. A transicao precisa considerar onde o hash aparece: assinatura, certificado, armazenamento, ETag, checksum, protocolo ou integracao externa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "MAC e HMAC",
    "id": "mac-e-hmac"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-07-hmac.svg",
    "alt": "Fluxo simplificado de geração de um HMAC com segredo compartilhado",
    "caption": "Figura 7.7 - Fluxo simplificado de HMAC."
  },
  {
    "kind": "paragraph",
    "text": "Um Message Authentication Code produz uma tag usando uma chave secreta compartilhada. O receptor que possui a mesma chave recalcula a tag e compara. Se a verificacao for bem-sucedida, ha evidencia de que a mensagem nao foi alterada e foi produzida por alguem que conhece o segredo. HMAC e uma construcao padronizada na RFC 2104 que combina uma funcao hash com uma chave."
  },
  {
    "kind": "paragraph",
    "text": "HMAC nao cifra o conteudo. A mensagem pode permanecer legivel enquanto sua integridade e autenticidade sao protegidas. Esse modelo e comum em webhooks, APIs de parceiros e assinaturas de requisicao. O protocolo precisa definir exatamente quais bytes entram no HMAC, incluindo metodo, caminho, timestamp, corpo, cabecalhos e canonicalizacao."
  },
  {
    "kind": "paragraph",
    "text": "Como ambas as partes possuem o mesmo segredo, qualquer uma pode gerar tags validas. Isso limita a verificabilidade por terceiros e diferencia HMAC de assinatura digital. HMAC e excelente para autenticacao bilateral eficiente, mas nao oferece a mesma separacao de poderes de uma chave publica e privada."
  },
  {
    "kind": "paragraph",
    "text": "A comparacao da tag deve ser feita em tempo constante quando possivel. O protocolo tambem precisa de protecao contra replay, por exemplo timestamp, nonce e janela de aceitacao. Uma mensagem antiga com HMAC valido continua autentica; sem um mecanismo de frescor, o atacante pode retransmiti-la."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "KDFs e armazenamento de senhas",
    "id": "kdfs-e-armazenamento-de-senhas"
  },
  {
    "kind": "paragraph",
    "text": "Uma Key Derivation Function transforma material de chave em uma ou mais chaves com propriedades adequadas. HKDF, definido na RFC 5869, usa uma etapa de extracao e uma etapa de expansao. Ele e comum em TLS e protocolos de estabelecimento de chaves, porque separa chaves por contexto, rotulo e finalidade."
  },
  {
    "kind": "paragraph",
    "text": "Senhas humanas possuem baixa entropia e precisam de funcoes desenhadas para tornar cada tentativa cara. PBKDF2 aplica repeticoes de uma funcao pseudorrandomica e permanece amplamente suportado. Argon2id, recomendado na RFC 9106 para muitos cenarios, adiciona custo de memoria, dificultando ataques paralelos com hardware especializado. Parametros devem ser calibrados e revistos ao longo do tempo."
  },
  {
    "kind": "paragraph",
    "text": "Salt deve ser unico por senha e armazenado junto ao resultado. Um pepper e um segredo adicional mantido separadamente, por exemplo em HSM ou KMS, mas aumenta complexidade operacional e precisa de rotacao planejada. A aplicacao deve armazenar o identificador do algoritmo e seus parametros para permitir verificacao e migracao."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs, senhas idealmente sao tratadas por provedores de identidade, nao por gateways de recursos. Ainda assim, o entendimento de KDFs e importante para Basic Authentication legada, client secrets, cofres e processos de credenciais. Um segredo de cliente de alta entropia pode ser armazenado como hash para comparacao, enquanto uma chave de assinatura precisa permanecer disponivel para operacoes criptograficas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia assimetrica",
    "id": "criptografia-assimetrica"
  },
  {
    "kind": "paragraph",
    "text": "Criptografia assimetrica usa um par de chaves relacionado matematicamente. A chave publica pode ser distribuida; a chave privada deve permanecer protegida. Dependendo do esquema, a chave publica permite cifrar para o detentor da chave privada, verificar assinaturas ou participar de um acordo de chaves."
  },
  {
    "kind": "paragraph",
    "text": "A principal vantagem e reduzir o problema de distribuicao de segredos. Um cliente pode verificar uma assinatura sem possuir a chave privada. Duas partes podem estabelecer um segredo por canal publico. Entretanto, operacoes assimetricas sao mais custosas e produzem artefatos maiores, por isso raramente protegem grandes volumes diretamente."
  },
  {
    "kind": "paragraph",
    "text": "Chaves assimetricas tambem exigem autenticidade da chave publica. Receber uma chave publica por um canal inseguro nao prova a quem ela pertence. Certificados, fingerprints, diretorios, DNS seguro, pinning e processos de provisionamento associam chaves a identidades. O Capitulo 8 aprofundara PKI e X.509."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, chaves publicas validam JWS e certificados; chaves privadas assinam tokens, terminam TLS e autenticam o gateway perante backends. A separacao de chaves por ambiente, emissor, finalidade e algoritmo reduz impacto e facilita auditoria."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "RSA: cifragem, assinatura e padding",
    "id": "rsa-cifragem-assinatura-e-padding"
  },
  {
    "kind": "paragraph",
    "text": "RSA baseia sua seguranca pratica na dificuldade de fatorar um grande modulo composto por primos. Uma chave publica contem modulo e expoente publico; a chave privada contem informacao que permite a operacao inversa. A RFC 8017 especifica esquemas RSA de cifragem e assinatura e mostra que a operacao matematica bruta precisa de codificacao e padding seguros."
  },
  {
    "kind": "paragraph",
    "text": "Para cifragem, RSAES-OAEP e o esquema moderno descrito no PKCS #1. RSA nao deve cifrar payloads grandes diretamente. O uso normal e proteger uma chave de sessao curta em envelope encryption. RSAES- PKCS1-v1_5 permanece em sistemas legados, mas seu historico de oraculos exige cautela e uniformidade de erros."
  },
  {
    "kind": "paragraph",
    "text": "Para assinaturas, RSASSA-PSS introduz aleatoriedade e e geralmente preferida em novos desenhos quando o ecossistema suporta. RSASSA-PKCS1-v1_5 continua amplamente usado e interoperavel. A escolha deve seguir o padrao do protocolo e a politica da organizacao, evitando \"RSA puro\" ou padding inventado."
  },
  {
    "kind": "paragraph",
    "text": "Tamanho de chave impacta seguranca, desempenho e tamanho de assinatura. RSA 2048 ainda aparece amplamente; requisitos mais longos podem exigir 3072 bits ou migracao para ECC/PQC conforme horizonte de protecao. O tamanho correto deve seguir normas atuais e o periodo durante o qual a informacao precisa permanecer protegida."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Curvas elipticas, X25519 e Ed25519",
    "id": "curvas-elipticas-x25519-e-ed25519"
  },
  {
    "kind": "paragraph",
    "text": "Criptografia de curvas elipticas oferece niveis de seguranca elevados com chaves menores que RSA. A seguranca se baseia na dificuldade do logaritmo discreto em grupos de pontos de uma curva. Chaves e assinaturas menores reduzem largura de banda, armazenamento e custo, embora a implementacao exija cuidado com validacao, curvas e canais laterais."
  },
  {
    "kind": "paragraph",
    "text": "X25519, especificado na RFC 7748, e usado para acordo de chaves. Ed25519, descrito na RFC 8032 como uma instancia de EdDSA, e usado para assinaturas. Apesar dos nomes relacionados, eles cumprem funcoes diferentes e nao devem ser tratados como a mesma chave ou algoritmo. Protocolos precisam definir formatos e conversoes explicitamente."
  },
  {
    "kind": "paragraph",
    "text": "ECDSA e outra familia de assinatura, padronizada no FIPS 186-5. Sua seguranca de implementacao depende fortemente da geracao do nonce por assinatura; repetir ou enviesar esse valor pode revelar a chave privada. EdDSA foi projetada com uma abordagem deterministica, mas implementacoes ainda precisam proteger chaves e resistir a falhas e canais laterais."
  },
  {
    "kind": "paragraph",
    "text": "Em JOSE, suporte a curvas depende da implementacao e do registro de algoritmos. Gateways precisam validar algoritmo permitido, curva, key usage e origem da chave. Aceitar qualquer chave apresentada em um token sem vincula-la ao emissor confiavel transforma verificacao criptografica em uma falsa garantia."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Acordo de chaves, ECDH e KEM",
    "id": "acordo-de-chaves-ecdh-e-kem"
  },
  {
    "kind": "paragraph",
    "text": "Acordo de chaves permite que duas partes derivem um segredo compartilhado sem transmiti-lo diretamente. Diffie-Hellman e ECDH usam contribuicoes de ambas as partes. Em TLS moderno, variantes efemeras fornecem forward secrecy: o comprometimento futuro da chave de identidade nao revela automaticamente sessoes passadas."
  },
  {
    "kind": "paragraph",
    "text": "O segredo bruto produzido por um acordo de chaves nao deve ser usado diretamente. Uma KDF incorpora contexto, nonces e identificadores para gerar chaves de trafego distintas. Confirmacao de chave e autenticacao do handshake evitam ataques em que um adversario se posiciona entre as partes."
  },
  {
    "kind": "paragraph",
    "text": "Um KEM, Key Encapsulation Mechanism, possui operacoes para gerar um ciphertext de encapsulamento e um segredo compartilhado, e para recuperar esse segredo com a chave privada. O FIPS 203 padroniza ML- KEM, um mecanismo pos-quantico. KEMs se encaixam naturalmente em criptografia hibrida e estabelecimento de chaves."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, o acordo de chaves costuma estar encapsulado no TLS. Mesmo assim, o arquiteto precisa entender curvas, grupos, forward secrecy e compatibilidade. Uma lista de grupos mal configurada pode impedir handshakes; um terminador TLS antigo pode eliminar propriedades desejadas; um HSM pode suportar assinatura, mas nao determinado acordo de chaves."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Assinaturas digitais",
    "id": "assinaturas-digitais"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-08-digital-signature.svg",
    "alt": "Fluxos de geração e verificação de uma assinatura digital",
    "caption": "Figura 7.8 - Geracao e verificacao de assinatura digital."
  },
  {
    "kind": "paragraph",
    "text": "Uma assinatura digital usa a chave privada para produzir um valor verificavel com a chave publica. Normalmente o algoritmo assina um digest ou uma representacao codificada da mensagem. A verificacao confirma que os bytes cobertos nao foram alterados e que a assinatura foi produzida por uma chave privada correspondente."
  },
  {
    "kind": "paragraph",
    "text": "Assinar e cifrar sao operacoes diferentes. Assinatura nao oculta o conteudo. Cifrar com \"chave privada\" nao e uma explicacao adequada de assinaturas modernas, porque esquemas como PSS, ECDSA, EdDSA e ML- DSA possuem estruturas e provas especificas. O entendimento deve seguir o esquema, nao uma analogia simplificada."
  },
  {
    "kind": "paragraph",
    "text": "Canonicalizacao e um desafio central. JSON pode ser serializado de varias formas equivalentes. Se produtor e verificador assinarem bytes diferentes, a verificacao falha. JWS resolve parte desse problema definindo Base64url, protected header e signing input. Protocolos de assinatura HTTP tambem precisam definir componentes derivados e ordem."
  },
  {
    "kind": "paragraph",
    "text": "A chave privada de assinatura merece protecao forte. HSMs permitem assinar sem exportar a chave. Politicas podem exigir dupla aprovacao, logs imutaveis, limites de uso e separacao entre chaves de teste e producao. Se a chave e comprometida, assinaturas validas podem ser forjadas ate que a confianca seja revogada e consumidores atualizados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia hibrida e envelope encryption",
    "id": "criptografia-hibrida-e-envelope-encryption"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-09-envelope-encryption.svg",
    "alt": "Criptografia híbrida com chave de dados e envelope encryption",
    "caption": "Figura 7.9 - Criptografia hibrida e envelope encryption."
  },
  {
    "kind": "paragraph",
    "text": "Criptografia hibrida combina a eficiencia da cifra simetrica com a distribuicao de chaves assimetrica. A aplicacao gera uma chave de dados aleatoria, cifra o payload com AEAD e protege a chave de dados com RSA-OAEP, ECDH/KDF, KEM ou uma chave de envelope mantida em KMS. O pacote armazena texto cifrado, nonce, tag e chave encapsulada."
  },
  {
    "kind": "paragraph",
    "text": "Envelope encryption permite que o KMS proteja apenas chaves pequenas, enquanto a aplicacao processa grandes volumes localmente. Isso reduz chamadas ao servico de chaves e permite rotacionar uma chave mestra recriptografando chaves de dados, sem descriptografar todos os payloads. O desenho precisa registrar versao e identificador da chave usada."
  },
  {
    "kind": "paragraph",
    "text": "Uma chave de dados pode ser unica por objeto, lote, sessao ou periodo, conforme risco e custo. Reutilizacao ampla aumenta o impacto de comprometimento. Chaves de envelope precisam de controles de acesso que impeçam um servico de descriptografar dados fora de seu dominio. A politica de KMS deve refletir identidade da carga e finalidade."
  },
  {
    "kind": "paragraph",
    "text": "JWE e um exemplo de formato de criptografia hibrida aplicado a objetos JOSE. Ele separa algoritmo de gerenciamento de chave e algoritmo de cifragem de conteudo. Gateways que processam JWE precisam suportar combinacoes aprovadas, controlar tamanhos e evitar decriptar conteudo antes de validar limites e contexto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Gestao de chaves, KMS e HSM",
    "id": "gestao-de-chaves-kms-e-hsm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-10-key-lifecycle.svg",
    "alt": "Ciclo de vida de uma chave criptográfica da geração à rotação",
    "caption": "Figura 7.10 - Ciclo de vida resumido de uma chave criptografica."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos fortes dependem de chaves bem geridas. O ciclo inclui geracao, registro, distribuicao, ativacao, armazenamento, uso, rotacao, suspensao, revogacao, backup, recuperacao, arquivamento e destruicao. A SP 800-57 do NIST organiza principios de gestao de material criptografico e ajuda a definir protecoes conforme tipo e finalidade da chave."
  },
  {
    "kind": "paragraph",
    "text": "KMS e um servico de gerenciamento que aplica identidade, autorizacao, auditoria e operacoes de chave. HSM e um modulo com fronteira criptografica projetada para proteger chaves e executar operacoes. Um KMS pode usar HSM por baixo. Nem toda chave precisa estar no mesmo nivel, mas chaves raiz, chaves de assinatura critica e chaves de CA frequentemente exigem protecao reforcada."
  },
  {
    "kind": "paragraph",
    "text": "Controle de acesso deve ser orientado a operacoes. Um servico pode precisar assinar, mas nao exportar; outro pode verificar com chave publica; um pipeline pode ativar uma nova versao, mas nao usar a chave para dados. Separar administracao, uso e auditoria reduz abuso e erro humano."
  },
  {
    "kind": "paragraph",
    "text": "Rotacao precisa ser compatível com dados e consumidores existentes. Chaves de verificacao antigas podem permanecer publicadas ate tokens expirarem. Chaves de decriptacao precisam ser mantidas enquanto houver dados cifrados. Identificadores de chave, como kid em JOSE, ajudam a selecionar versoes, mas nao devem ser aceitos como fonte de confianca sem um emissor e repositorio controlados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia em TLS, JWT, JWS, JWE e webhooks",
    "id": "criptografia-em-tls-jwt-jws-jwe-e-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "TLS combina acordo de chaves, assinaturas ou certificados, KDFs e AEAD. O cliente e o servidor negociam parametros, autenticam o handshake e derivam chaves de trafego. O Capitulo 6 analisou o protocolo; aqui a licao e que TLS e uma composicao de primitivas com papeis distintos."
  },
  {
    "kind": "paragraph",
    "text": "JWT e um formato de claims. Quando protegido por JWS, recebe assinatura ou MAC. Quando protegido por JWE, recebe cifragem autenticada. Um JWT apenas codificado em Base64url nao e protegido. O gateway deve verificar algoritmo, emissor, audiencia, tempo, chave e claims, nao apenas confirmar que a assinatura matematica e valida."
  },
  {
    "kind": "paragraph",
    "text": "Webhooks frequentemente usam HMAC sobre corpo, timestamp e identificadores. O consumidor precisa ler os bytes exatos recebidos antes de qualquer normalizacao que altere o corpo. A verificacao deve ocorrer antes de processar a operacao, com janela de tempo e armazenamento de identificadores para impedir replay."
  },
  {
    "kind": "paragraph",
    "text": "Em Open Finance e integracoes bancarias, assinaturas podem proteger mensagens, tokens e requisicoes de forma adicional ao TLS. O desenho precisa deixar claro qual artefato e assinado, qual chave e usada, como a chave publica e distribuida, qual algoritmo e permitido e como revogacao e rotacao acontecem."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicacao em Axway API Gateway e Azure API Management",
    "id": "aplicacao-em-axway-api-gateway-e-azure-api-management"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-11-api-gateway-cryptography.svg",
    "alt": "Primitivas criptográficas aplicadas em uma arquitetura de API Gateway",
    "caption": "Figura 7.11 - Primitivas criptograficas em uma arquitetura de API Gateway."
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway pode terminar TLS, validar certificados de cliente, verificar JWT, produzir tokens, assinar ou validar mensagens, chamar KMSs e proteger segredos de backend. Essas funcoes nao devem ser tratadas como uma unica policy de \"criptografia\". Cada policy tem entradas, chaves, algoritmos e falhas especificas."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, certificados, private key stores, trusted certificate stores, filters e policies compoem o fluxo. O diagnostico deve identificar se a falha ocorre no listener TLS, na validacao de token, na policy de assinatura, na decriptacao ou na conexao de saida. Logs precisam informar identificador de chave e algoritmo sem revelar segredo ou payload sensivel."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, certificados, named values, Key Vault, managed identity e policies podem participar. A plataforma pode validar JWT, autenticar backend com certificado e obter segredos de um cofre. A identidade gerenciada reduz credenciais estaticas, mas permissoes de acesso ao Key Vault e cache de atualizacoes precisam ser compreendidos."
  },
  {
    "kind": "paragraph",
    "text": "Em ambos os produtos, o gateway nao deve virar um cofre indiscriminado. Segredos precisam de dono, finalidade e rotacao. Policies devem usar algoritmos permitidos por baseline. Ambientes de desenvolvimento e producao devem ter chaves separadas. Exportacoes de configuracao e backups precisam ser protegidos, pois podem conter referencias ou material sensivel."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Erros comuns e ataques",
    "id": "erros-comuns-e-ataques"
  },
  {
    "kind": "paragraph",
    "text": "Reutilizar nonce em AES-GCM ou ChaCha20-Poly1305 e um dos erros mais graves. Dependendo do esquema, o atacante pode derivar relacoes entre textos claros, recuperar a chave de autenticacao ou forjar mensagens. Sistemas distribuidos precisam de estrategia explicita para unicidade, especialmente apos reinicio, rollback ou clonagem."
  },
  {
    "kind": "paragraph",
    "text": "Usar ECB, cifrar sem autenticar, validar padding com erros distinguiveis, aceitar algoritmos escolhidos pelo atacante, misturar chaves entre ambientes, desabilitar validacao de certificado e armazenar chaves em codigo sao falhas recorrentes. Muitas nao quebram a matematica; quebram o protocolo e a operacao."
  },
  {
    "kind": "paragraph",
    "text": "Canais laterais exploram tempo, cache, consumo, emissao e comportamento de erro. Comparacoes de MAC e assinatura devem evitar vazamento progressivo. Implementacoes de RSA, ECC e AES precisam usar bibliotecas maduras e recursos de hardware adequados. Escrever primitivas manualmente quase nunca e justificavel em aplicacoes corporativas."
  },
  {
    "kind": "paragraph",
    "text": "Criptografia tambem pode falhar por excesso de confianca. Um payload assinado pode conter uma operacao maliciosa autorizada por uma chave comprometida. Um token cifrado pode carregar claims erradas. Um hash pode validar integridade de um arquivo fornecido pelo mesmo atacante que forneceu o hash. A origem confiavel e o contexto importam tanto quanto a verificacao."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Criptografia pos-quantica e criptoagilidade",
    "id": "criptografia-pos-quantica-e-criptoagilidade"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-12-post-quantum-transition.svg",
    "alt": "Etapas de inventário, testes híbridos e migração pós-quântica",
    "caption": "Figura 7.12 - Etapas de uma transicao pos-quantica."
  },
  {
    "kind": "paragraph",
    "text": "Computadores quanticos de escala criptograficamente relevante poderiam aplicar o algoritmo de Shor contra RSA, Diffie-Hellman e ECC. Cifras simetricas e hashes tambem sofrem impacto teorico, mas podem manter margens maiores com tamanhos adequados. O risco inclui harvest now, decrypt later: capturar dados hoje para tentar decriptar no futuro."
  },
  {
    "kind": "paragraph",
    "text": "Em agosto de 2024, o NIST publicou FIPS 203 para ML-KEM, FIPS 204 para ML-DSA e FIPS 205 para SLH-DSA. ML-KEM estabelece segredos; ML-DSA e SLH-DSA produzem assinaturas. Esses algoritmos possuem tamanhos e perfis diferentes dos esquemas classicos, exigindo testes de desempenho, largura de banda, armazenamento, certificados, HSMs e protocolos."
  },
  {
    "kind": "paragraph",
    "text": "Migracao pos-quantica nao significa trocar tudo imediatamente sem planejamento. O primeiro passo e inventario criptografico: onde RSA, ECC e DH aparecem, por quanto tempo os dados precisam permanecer secretos, quais fornecedores controlam a implementacao e quais dependencias nao possuem agilidade. Depois vem classificacao de risco, testes e transicao."
  },
  {
    "kind": "paragraph",
    "text": "Criptoagilidade e a capacidade de trocar algoritmos, parametros e chaves sem reconstruir o sistema. Protocolos devem negociar apenas suites permitidas, formatos precisam identificar algoritmo e versao, e aplicacoes nao devem codificar tamanhos fixos. Estrategias hibridas combinam mecanismos classicos e pos-quanticos durante a transicao, mas precisam de especificacoes formais para evitar composicoes inseguras."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Troubleshooting criptografico",
    "id": "troubleshooting-criptografico"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/pt/figure-13-cryptographic-troubleshooting.svg",
    "alt": "Árvore de troubleshooting para classificar falhas criptográficas",
    "caption": "Figura 7.13 - Arvore inicial de troubleshooting criptografico."
  },
  {
    "kind": "paragraph",
    "text": "O troubleshooting deve separar formato, algoritmo, parametros, chave e contexto. Uma falha \"invalid signature\" pode significar chave publica errada, algoritmo diferente, payload canonicalizado de outra forma, Base64url incorreto, header protegido diferente ou mensagem alterada. Trocar a chave sem testar os bytes assinados pode mascarar a causa."
  },
  {
    "kind": "paragraph",
    "text": "Falhas de decriptacao podem vir de chave de dados errada, tag invalida, nonce incorreto, AAD diferente, padding, encoding ou versao de envelope. Em AEAD, falha de tag deve ser tratada como mensagem nao autentica. A aplicacao nao deve tentar \"recuperar\" texto parcial ou ignorar a verificacao para diagnosticar em producao."
  },
  {
    "kind": "paragraph",
    "text": "Erros de acesso a KMS/HSM podem parecer criptograficos, mas ser de identidade, rede, quota, particao ou permissao. Verifique qual principal chamou, qual operacao foi negada, qual versao da chave foi selecionada e se a chave esta ativa. Latencia e throttling de KMS podem exigir cache seguro de chaves de dados ou ajustes de envelope encryption."
  },
  {
    "kind": "paragraph",
    "text": "Para reproduzir uma assinatura, capture apenas dados nao sensiveis e normalize o caso em ambiente controlado. Registre algoritmo, identificador de chave, comprimento, hash do payload, timestamp e resultado, sem registrar chave privada, segredo, texto claro sensivel ou token completo. Observabilidade segura e essencial para diagnostico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Aplicacao no mundo bancario e financeiro",
    "id": "aplicacao-no-mundo-bancario-e-financeiro"
  },
  {
    "kind": "paragraph",
    "text": "Bancos usam criptografia em canais digitais, pagamentos, Open Finance, PIN, cartoes, mensageria, arquivos, backups, HSMs, certificados e assinaturas de transacoes. A criticidade vem do valor financeiro, da privacidade, da regulacao e da necessidade de auditoria. Uma escolha criptografica precisa considerar disponibilidade e recuperacao, nao apenas confidencialidade."
  },
  {
    "kind": "paragraph",
    "text": "HSMs sao comuns para chaves de alta criticidade, incluindo emissao, assinatura, processamento de pagamentos e raizes de confianca. Controles como dual control, split knowledge e trilhas de auditoria reduzem a possibilidade de uma pessoa controlar todo o ciclo. Esses controles organizacionais complementam a matematica."
  },
  {
    "kind": "paragraph",
    "text": "Em Open Finance, TLS e mTLS protegem canais e autenticam participantes, enquanto OAuth e tokens controlam autorizacao. Assinaturas de mensagens podem garantir integridade em saltos intermediarios. Chaves e certificados precisam de rotacao coordenada entre instituicoes, com sobreposicao e testes para evitar indisponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "O profissional de gateways precisa distinguir falha criptografica de falha de negocio. Uma assinatura valida demonstra que bytes foram assinados por uma chave confiavel; nao demonstra saldo, consentimento ou permissao. Policies criptograficas devem alimentar o contexto de autorizacao, e nao substitui-lo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Tabelas de referencia tecnica",
    "id": "tabelas-de-referencia-tecnica"
  },
  {
    "kind": "paragraph",
    "text": "As tabelas resumem decisoes frequentes. Elas nao substituem a documentacao do protocolo nem a politica criptografica da organizacao."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 — Primitivas criptográficas, objetivos, exemplos e cuidados.",
    "headers": [
      "Primitiva",
      "Objetivo principal",
      "Exemplos",
      "Cuidado essencial"
    ],
    "rows": [
      [
        "Cifra simetrica",
        "Confidencialidade eficiente",
        "AES, ChaCha20",
        "Modo, nonce/IV e autenticacao."
      ],
      [
        "AEAD",
        "Confidencialidade e autenticidade",
        "AES-GCM, ChaCha20-Poly1305",
        "Nonce unico por chave e verificacao da tag."
      ],
      [
        "Hash",
        "Resumo e integridade quando a referencia e confiavel",
        "SHA-256, SHA-3",
        "Nao usar hash rapido como armazenamento de senha."
      ],
      [
        "MAC",
        "Integridade e autenticacao com segredo compartilhado",
        "HMAC-SHA-256, GMAC",
        "Protecao contra replay e comparacao segura."
      ],
      [
        "Assinatura",
        "Integridade e autenticidade verificavel por chave publica",
        "RSA-PSS, ECDSA, EdDSA, ML-DSA",
        "Custodia da chave, canonicalizacao e algoritmo permitido."
      ],
      [
        "KDF",
        "Derivar chaves por contexto",
        "HKDF",
        "Separar finalidade, salt/contexto e comprimento."
      ],
      [
        "Password KDF",
        "Tornar palpites de senha caros",
        "Argon2id, PBKDF2",
        "Parametros calibrados, salt unico e migracao."
      ],
      [
        "KEM / acordo",
        "Estabelecer segredo compartilhado",
        "X25519, ML-KEM",
        "Autenticacao do protocolo e derivacao posterior."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabela 2 — Requisitos de segredo e unicidade para materiais criptográficos.",
    "headers": [
      "Termo",
      "Precisa ser secreto?",
      "Precisa ser unico?",
      "Observacao"
    ],
    "rows": [
      [
        "Chave simetrica",
        "Sim",
        "Deve ser independente por finalidade",
        "Comprometimento permite cifrar/decriptar ou autenticar."
      ],
      [
        "Nonce",
        "Normalmente nao",
        "Frequentemente sim, conforme esquema",
        "Em GCM, reuso com a mesma chave e grave."
      ],
      [
        "IV",
        "Depende do modo",
        "Requisitos variam",
        "Nao presumir que IV e sempre aleatorio ou sempre secreto."
      ],
      [
        "Salt",
        "Nao",
        "Deve ser unico por credencial/derivacao",
        "Combate precomputacao; nao substitui custo."
      ],
      [
        "Tag AEAD/MAC",
        "Nao",
        "Derivada de mensagem e parametros",
        "Deve ser verificada antes de aceitar a mensagem."
      ],
      [
        "Chave publica",
        "Nao",
        "Associacao com identidade deve ser confiavel",
        "Pode ser distribuida por certificado ou repositorio controlado."
      ],
      [
        "Chave privada",
        "Sim",
        "Uma por identidade/finalidade conforme politica",
        "Idealmente nao exportavel em casos criticos."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Tabela 3 — Problemas criptográficos, hipóteses e verificações iniciais.",
    "headers": [
      "Problema observado",
      "Hipoteses",
      "Verificacoes iniciais"
    ],
    "rows": [
      [
        "Assinatura invalida",
        "Chave, algoritmo, bytes ou encoding diferentes",
        "Comparar signing input byte a byte, kid, alg e chave do emissor."
      ],
      [
        "Tag GCM invalida",
        "Chave, nonce, AAD ou ciphertext divergente",
        "Confirmar todos os parametros; nao liberar plaintext parcial."
      ],
      [
        "HMAC diferente",
        "Canonicalizacao, segredo ou encoding",
        "Reproduzir metodo, caminho, timestamp e corpo bruto."
      ],
      [
        "KMS access denied",
        "Identidade ou policy",
        "Verificar principal, operacao, chave, versao e ambiente."
      ],
      [
        "Algoritmo nao suportado",
        "Biblioteca, gateway ou HSM sem capacidade",
        "Consultar matriz de suporte e baseline aprovado."
      ],
      [
        "Erro de PEM/DER",
        "Formato ou cadeia incorreta",
        "Identificar container, headers, Base64, algoritmo e tipo de chave."
      ],
      [
        "Falha apos rotacao",
        "Consumidor usa chave antiga ou kid incorreto",
        "Manter sobreposicao e publicar conjunto de verificacao atualizado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exemplos tecnicos comentados",
    "id": "exemplos-tecnicos-comentados"
  },
  {
    "kind": "paragraph",
    "text": "Os exemplos a seguir sao didaticos. Em producao, use bibliotecas, formatos e servicos aprovados pela organizacao. Nao implemente primitivas criptograficas manualmente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exemplo 1 - Hash e HMAC em Python"
  },
  {
    "kind": "code",
    "text": "import hashlib\nimport hmac\nmensagem = b\"evento=pagamento&valor=100\"\nsegredo = b\"segredo-de-alta-entropia-obtido-de-um-cofre\"\ndigest = hashlib.sha256(mensagem).hexdigest()\nmac = hmac.new(segredo, mensagem, hashlib.sha256).hexdigest()\nprint(\"SHA-256:\", digest)\nprint(\"HMAC-SHA-256:\", mac)\n# Ao verificar, prefira compare_digest para reduzir vazamento por timing.\nmac_recebido = mac\nassert hmac.compare_digest(mac, mac_recebido)"
  },
  {
    "kind": "paragraph",
    "text": "O SHA-256 produz um resumo sem chave. Qualquer pessoa consegue recalcula-lo. O HMAC inclui um segredo compartilhado e autentica a mensagem entre os detentores desse segredo. A comparacao deve usar uma funcao apropriada, e o protocolo ainda precisa de timestamp ou nonce para evitar replay."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exemplo 2 - Inspecao de algoritmos e chaves com OpenSSL"
  },
  {
    "kind": "code",
    "text": "# Gerar 32 bytes aleatorios em hexadecimal.\nopenssl rand -hex 32\n# Calcular SHA-256 de um arquivo.\nopenssl dgst -sha256 mensagem.json\n# Gerar chave RSA para laboratorio.\nopenssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out chave-privada.pem\nopenssl pkey -in chave-privada.pem -pubout -out chave-publica.pem\n# Assinar e verificar com RSA-PSS e SHA-256.\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -sign chave-privada.pem -out assinatura.bin\nmensagem.json\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -verify chave-publica.pem -signature\nassinatura.bin mensagem.json"
  },
  {
    "kind": "paragraph",
    "text": "O laboratorio separa chave privada e publica e usa PSS. A chave privada nao deve ser enviada ao verificador. Em ambiente real, a assinatura pode ocorrer em HSM ou KMS, e o verificador recebe a chave publica por um canal confiavel."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Exemplo 3 - Estrutura conceitual de um envelope"
  },
  {
    "kind": "code",
    "text": "{\n  \"versao\": 1,\n  \"algoritmo_chave\": \"KMS-KEY-WRAP\",\n  \"algoritmo_conteudo\": \"AES-256-GCM\",\n  \"id_chave_mestra\": \"payments-prod-v12\",\n  \"chave_dados_encapsulada\": \"...\",\n  \"nonce\": \"...\",\n  \"aad\": \"...\",\n  \"ciphertext\": \"...\",\n  \"tag\": \"...\"\n}"
  },
  {
    "kind": "paragraph",
    "text": "O envelope registra versao e algoritmos para permitir migracao. A chave de dados encapsulada nao e a chave mestra. O consumidor recupera a chave de dados por uma operacao autorizada no KMS, valida a tag e somente entao aceita o texto claro."
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
    "text": "Caso 1 - Webhook com HMAC valido e operacao duplicada"
  },
  {
    "kind": "paragraph",
    "text": "Um parceiro enviava webhooks assinados com HMAC-SHA-256. O consumidor verificava corretamente a assinatura, mas nao registrava o identificador do evento nem validava timestamp. Um intermediario retransmitiu uma mensagem antiga. O HMAC permaneceu valido porque a mensagem nao foi alterada, e a operacao financeira foi processada duas vezes."
  },
  {
    "kind": "paragraph",
    "text": "A correcao nao foi trocar o algoritmo. Foi adicionar timestamp assinado, janela de tolerancia, identificador unico, armazenamento de eventos processados e idempotencia no backend. O caso demonstra que autenticidade nao implica frescor nem unicidade de negocio."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Falha intermitente de AES-GCM apos escalabilidade horizontal"
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicacao usava um contador local como nonce. Cada instancia iniciava o contador em zero. Quando o servico passou de uma para varias replicas, instancias diferentes reutilizaram nonces com a mesma chave. O sistema continuou funcionando, mas perdeu garantias criptograficas e abriu possibilidade de forja."
  },
  {
    "kind": "paragraph",
    "text": "A solucao exigiu interromper o uso da chave afetada, rotacionar material, avaliar dados expostos e adotar estrategia de nonce distribuida ou chaves separadas por instancia. Monitoramento de unicidade e testes de reinicio foram incorporados ao pipeline."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Rotacao de chave JWT derruba consumidores"
  },
  {
    "kind": "paragraph",
    "text": "O emissor trocou a chave de assinatura e removeu imediatamente a chave publica antiga do JWKS. Tokens emitidos minutos antes continuavam dentro da validade, mas consumidores nao conseguiam verifica-los. O incidente foi interpretado inicialmente como falha de OAuth, embora a causa estivesse no ciclo de vida criptografico."
  },
  {
    "kind": "paragraph",
    "text": "A estrategia correta manteve chaves de verificacao antigas publicadas ate o fim do maior tempo de vida de tokens e caches, usou kid consistente, publicou a nova chave antes de ativar a assinatura e monitorou consumidores. Rotacao segura e uma mudanca coordenada, nao apenas substituicao de arquivo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - Gateway valida assinatura com chave escolhida pelo token"
  },
  {
    "kind": "paragraph",
    "text": "Uma policy aceitava uma URL de chave informada no proprio token. O gateway baixava a chave e confirmava que a assinatura era matematicamente valida. Um atacante gerou seu proprio par, publicou a chave e criou tokens aceitos. A verificacao criptografica funcionava, mas a raiz de confianca era controlada pelo atacante."
  },
  {
    "kind": "paragraph",
    "text": "A correcao vinculou cada emissor autorizado a um JWKS previamente configurado, restringiu algoritmos, validou issuer e audience e aplicou cache seguro. O caso mostra que uma chave publica precisa ser confiavel e associada a uma identidade; assinatura valida isoladamente nao basta."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratorios de estudo",
    "id": "laboratorios-de-estudo"
  },
  {
    "kind": "paragraph",
    "text": "Ambiente de laboratorio Execute os testes apenas em arquivos e chaves criados para estudo. Nao copie chaves, tokens, payloads ou segredos de producao. O objetivo e observar propriedades e formatos, nao reproduzir material sensivel."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Calcule SHA-256 de dois arquivos que diferem por um caractere e compare os digests. Relacione o resultado ao efeito avalanche.",
      "Calcule HMAC do mesmo corpo com duas chaves diferentes. Depois altere um byte da mensagem e confirme que a verificacao falha.",
      "Gere um par RSA de laboratorio, assine um arquivo com RSA-PSS, verifique com a chave publica e confirme que a verificacao falha apos alterar o arquivo.",
      "Examine uma chave PEM e identifique se ela representa chave privada, chave publica ou certificado. Converta entre PEM e DER apenas no laboratorio.",
      "Crie um pequeno envelope conceitual contendo versao, algoritmo, id de chave, nonce, ciphertext e tag. Explique como cada campo participa da decriptacao.",
      "Desenhe uma policy de gateway para webhook com HMAC, incluindo canonicalizacao, timestamp, protecao contra replay, comparacao segura e observabilidade.",
      "Crie um inventario criptografico de uma arquitetura ficticia: TLS, JWT, banco, backups, filas, KMS e parceiros. Registre algoritmo, chave, proprietario, validade e dependencia.",
      "Escolha uma integracao RSA/ECC ficticia e descreva como seria uma transicao para uma abordagem hibrida com algoritmo pos-quantico, incluindo riscos de tamanho e compatibilidade."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercicios de revisao",
    "id": "exercicios-de-revisao"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por que criptografia e mais ampla que cifragem.",
      "Diferencie confidencialidade, integridade, autenticidade, autorizacao e nao repudio.",
      "Por que o principio de Kerckhoffs favorece algoritmos publicos e chaves secretas?",
      "Qual e a diferenca entre nonce, IV e salt?",
      "Por que o AES precisa de um modo de operacao?",
      "Por que ECB revela padroes?",
      "Quais propriedades AES-GCM fornece e qual requisito de nonce e critico?",
      "Diferencie SHA-256, HMAC-SHA-256 e assinatura RSA-PSS.",
      "Por que hash rapido nao e adequado para armazenamento de senhas?",
      "Qual e o papel de uma KDF como HKDF?",
      "Por que RSA nao deve cifrar payloads grandes diretamente?",
      "Diferencie X25519 e Ed25519.",
      "Como uma assinatura digital pode falhar mesmo quando produtor e verificador usam a mesma chave?",
      "Explique envelope encryption e sua relacao com KMS.",
      "Por que kid nao deve ser tratado como raiz de confianca?",
      "Quais controles adicionais um webhook com HMAC precisa para impedir replay?",
      "Descreva o ciclo de vida de uma chave e os cuidados de rotacao.",
      "Como Axway API Gateway ou Azure API Management podem usar KMS, certificados e chaves sem se tornarem repositorios indiscriminados de segredos?",
      "Quais familias de algoritmos foram padronizadas nos FIPS 203, 204 e 205?",
      "Por que inventario e criptoagilidade sao pre-requisitos para migracao pos-quantica?"
    ]
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
        "AEAD",
        "Cifragem autenticada com dados associados, produzindo ciphertext e tag."
      ],
      [
        "AES",
        "Cifra simetrica de bloco padronizada no FIPS 197."
      ],
      [
        "AAD",
        "Dados autenticados, mas nao cifrados, em um esquema AEAD."
      ],
      [
        "Ciphertext",
        "Resultado cifrado de uma mensagem."
      ],
      [
        "CSPRNG / DRBG",
        "Gerador projetado para produzir bits imprevisiveis para uso criptografico."
      ],
      [
        "Digest",
        "Saida de uma funcao hash."
      ],
      [
        "Envelope encryption",
        "Protecao de dados com chave de dados, que por sua vez e protegida por uma chave mestra ou KEM."
      ],
      [
        "HMAC",
        "MAC construido a partir de funcao hash e segredo compartilhado."
      ],
      [
        "HSM",
        "Modulo de seguranca de hardware que protege chaves e executa operacoes criptograficas."
      ],
      [
        "IV",
        "Vetor de inicializacao usado por determinados modos de operacao."
      ],
      [
        "KDF",
        "Funcao que deriva chaves a partir de material de entrada e contexto."
      ],
      [
        "KEM",
        "Mecanismo de encapsulamento de chave para estabelecer segredo compartilhado."
      ],
      [
        "KMS",
        "Servico de gerenciamento de chaves com identidade, policy, versao e auditoria."
      ],
      [
        "MAC",
        "Codigo de autenticacao de mensagem baseado em segredo compartilhado."
      ],
      [
        "Nonce",
        "Valor usado uma vez ou conforme regra de unicidade do esquema."
      ],
      [
        "Plaintext",
        "Informacao antes da cifragem."
      ],
      [
        "Salt",
        "Valor nao secreto e normalmente unico usado em derivacao, especialmente de senhas."
      ],
      [
        "Tag",
        "Valor de autenticacao produzido por MAC ou AEAD."
      ],
      [
        "Criptoagilidade",
        "Capacidade de trocar algoritmos, parametros e chaves com impacto controlado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capitulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Criptografia fornece servicos diferentes; nenhuma primitiva resolve sozinha confidencialidade, integridade, autenticacao, autorizacao e disponibilidade.",
      "Criptografia simetrica protege grandes volumes; criptografia assimetrica distribui confianca, estabelece chaves e permite assinaturas.",
      "AES deve ser usado com modo apropriado. AEAD, como AES-GCM e ChaCha20-Poly1305, combina cifragem e autenticacao.",
      "Nonces, IVs, salts e tags possuem requisitos diferentes. Reuso de nonce pode destruir a seguranca de um esquema.",
      "Hashes nao cifram dados. HMAC autentica com segredo compartilhado. Assinaturas usam chave privada e sao verificadas com chave publica.",
      "KDFs separam chaves por contexto; funcoes de senha adicionam custo contra palpites.",
      "RSA-OAEP e RSA-PSS sao esquemas com padding apropriado. ECC oferece acordo e assinatura com chaves menores.",
      "Envelope encryption e KMS/HSM reduzem exposicao e organizam o ciclo de vida de chaves.",
      "Gateways aplicam criptografia em TLS, mTLS, tokens, webhooks e conexoes de backend, mas precisam de raiz de confianca, governanca e observabilidade.",
      "A transicao pos-quantica com ML-KEM, ML-DSA e SLH-DSA exige inventario, testes e criptoagilidade."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referencias oficiais e leituras recomendadas",
    "id": "referencias-oficiais-e-leituras-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 197 - Advanced Encryption Standard (AES): https://csrc.nist.gov/pubs/fips/197/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-38D - GCM e GMAC: https://csrc.nist.gov/pubs/sp/800/38/d/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 180-4 - Secure Hash Standard: https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 202 - SHA-3 Standard: https://csrc.nist.gov/pubs/fips/202/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 186-5 - Digital Signature Standard: https://csrc.nist.gov/pubs/fips/186-5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-57 Part 1 Rev. 5 - Key Management: https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90A Rev. 1 - Deterministic Random Bit Generators: https://csrc.nist.gov/pubs/sp/800/90/a/r1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90B - Entropy Sources: https://csrc.nist.gov/pubs/sp/800/90/b/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90C - Random Bit Generator Constructions: https://csrc.nist.gov/pubs/sp/800/90/c/final"
  },
  {
    "kind": "paragraph",
    "text": "RFC 2104 - HMAC: https://www.rfc-editor.org/info/rfc2104/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5869 - HKDF: https://www.rfc-editor.org/info/rfc5869/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8017 - PKCS #1 RSA v2.2: https://www.rfc-editor.org/info/rfc8017/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 7748 - X25519 e X448: https://www.rfc-editor.org/info/rfc7748/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8032 - EdDSA: https://www.rfc-editor.org/info/rfc8032/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8439 - ChaCha20 e Poly1305: https://www.rfc-editor.org/info/rfc8439/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9106 - Argon2: https://www.rfc-editor.org/info/rfc9106/"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 203 - ML-KEM: https://csrc.nist.gov/pubs/fips/203/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 204 - ML-DSA: https://csrc.nist.gov/pubs/fips/204/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 205 - SLH-DSA: https://csrc.nist.gov/pubs/fips/205/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST Post-Quantum Cryptography Project: https://csrc.nist.gov/projects/post-quantum-cryptography"
  },
  {
    "kind": "paragraph",
    "text": "Observacao sobre documentos em revisao Normas criptograficas evoluem. Em julho de 2026, o NIST mantem processos de revisao para documentos como SP 800-38D e SP 800-57. Para projetos novos, consulte sempre o status oficial da publicacao, o baseline da organizacao e as matrizes de suporte dos produtos antes de definir algoritmos e tamanhos."
  }
];
