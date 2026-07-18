export interface ChapterTableBlock {
  kind: 'table';
  caption: string;
  headers: string[];
  rows: string[][];
}

export type ChapterBlock =
  | { kind: 'heading'; level: 2 | 3; text: string; id?: string }
  | { kind: 'subhead'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'code'; text: string }
  | { kind: 'figure'; src: string; alt: string; caption: string }
  | ChapterTableBlock;

// Conteúdo extraído integralmente do PDF fornecido, com recomposição apenas das quebras de linha do A4.
export const FUNDAMENTOS_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "APIs corporativas parecem, à primeira vista, uma tecnologia concentrada na camada de aplicação: um consumidor envia uma requisição, um serviço executa uma operação e devolve uma resposta. Entretanto, essa visão esconde uma cadeia extensa de mecanismos. Antes de um método HTTP chegar ao backend, o nome do host precisa ser resolvido, pacotes precisam ser roteados, uma conexão precisa ser estabelecida, parâmetros criptográficos precisam ser negociados e políticas de segurança podem ser avaliadas em diferentes componentes da infraestrutura."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo apresenta essa cadeia de maneira progressiva. O objetivo não é transformar o leitor imediatamente em especialista em redes, mas fornecer um modelo mental suficientemente preciso para compreender onde uma chamada pode falhar, qual componente possui cada responsabilidade e por que tecnologias como TLS, OAuth, JWT, mTLS e API Gateways dependem de fundamentos anteriores. Nos capítulos seguintes, cada uma dessas áreas será explorada em profundidade."
  },
  {
    "kind": "paragraph",
    "text": "A abordagem combina contexto histórico, teoria de protocolos e aplicação prática em ambientes corporativos. Sempre que possível, o texto relaciona os conceitos a plataformas como Axway API Gateway e Azure API Management. Os exemplos utilizam uma API fictícia de clientes bancários para demonstrar o caminho completo da comunicação sem expor detalhes de ambientes reais."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Leia as seções em sequência na primeira passagem. Depois, refaça a leitura acompanhando o diagrama ponta a ponta e tente classificar cada possível falha pela camada em que ela ocorre. Essa prática prepara o raciocínio de troubleshooting usado por equipes de gateways e integração."
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
      "Distinguir Internet, Web, HTTP, API e API REST, evitando o uso desses termos como sinônimos.",
      "Explicar como padrões técnicos são definidos por organizações como IETF, RFC Editor, NIST,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "IEEE, W3C, OpenID Foundation e OpenAPI Initiative."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Compreender encapsulamento, endereçamento, roteamento, portas, conexões, resolução de"
    ]
  },
  {
    "kind": "paragraph",
    "text": "nomes e proteção criptográfica em nível conceitual."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Descrever o caminho completo de uma requisição HTTPS desde o consumidor até um backend"
    ]
  },
  {
    "kind": "paragraph",
    "text": "protegido por um API Gateway."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Identificar responsabilidades típicas de firewalls, balanceadores, proxies, gateways, provedores de"
    ]
  },
  {
    "kind": "paragraph",
    "text": "identidade e serviços de backend."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Usar o modelo de camadas para organizar investigações de erros de DNS, TCP, TLS, HTTP,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "autenticação, roteamento e aplicação."
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
      "1.1 Por que fundamentos de rede importam para APIs",
      "1.2 Internet, Web e API: conceitos diferentes",
      "1.3 Evolução histórica da Internet às plataformas de APIs",
      "1.4 Ecossistema de padronização",
      "1.5 RFCs: como os protocolos são documentados",
      "1.6 Comunicação em rede e encapsulamento",
      "1.7 Modelos OSI e TCP/IP",
      "1.8 Endereçamento IP e roteamento",
      "1.9 DNS e resolução de nomes",
      "1.10 TCP, UDP, portas e sockets",
      "1.11 NAT, firewall, proxy e balanceamento",
      "1.12 TLS, HTTPS e confiança",
      "1.13 Anatomia de uma mensagem HTTP",
      "1.14 REST e o conceito de recurso",
      "1.15 API Gateway e plataforma de APIs",
      "1.16 Jornada ponta a ponta",
      "1.17 Troubleshooting orientado por camadas",
      "1.18 Aplicação em ambientes corporativos e bancários",
      "Resumo, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.1 Por que fundamentos de rede importam para APIs",
    "id": "por-que-importa"
  },
  {
    "kind": "paragraph",
    "text": "Uma equipe de API Gateway trabalha na interseção entre desenvolvimento, infraestrutura, identidade e segurança. O gateway recebe mensagens de aplicação, mas a disponibilidade desse ponto de entrada depende de elementos que existem antes da aplicação: DNS, rotas, endereços, portas, conexões e certificados. Por isso, um erro observado como \"a API não responde\" pode ter causas completamente diferentes, desde um nome que não resolve até uma política que rejeita um token."
  },
  {
    "kind": "paragraph",
    "text": "A mesma resposta HTTP também pode esconder origens distintas. Um código 502 pode indicar que o gateway não conseguiu estabelecer comunicação com o backend; um 401 normalmente se relaciona à autenticação, mas pode ser produzido pelo próprio gateway, por um provedor de identidade ou pelo serviço; um timeout pode ocorrer no consumidor, no balanceador, no gateway ou no backend. Sem uma visão de camadas, o diagnóstico tende a virar tentativa e erro."
  },
  {
    "kind": "paragraph",
    "text": "O conhecimento fundamental também melhora decisões de arquitetura. Ao compreender onde a confidencialidade é garantida, o arquiteto consegue diferenciar proteção de transporte e proteção da própria mensagem. Ao entender conexão e sessão, consegue avaliar efeitos de keep-alive, pooling e terminação TLS. Ao compreender resolução de nomes, consegue projetar failover, múltiplos ambientes e estratégias de descoberta de serviços com menos suposições incorretas."
  },
  {
    "kind": "paragraph",
    "text": "Neste material, a expressão \"fundamentos\" não significa conteúdo superficial. Significa estudar os mecanismos que sustentam as tecnologias mais visíveis. OAuth 2.0, JWT, OpenID Connect, mTLS e políticas de gateway serão mais fáceis de compreender quando estiver claro o que ocorre antes, durante e depois da transmissão de uma requisição."
  },
  {
    "kind": "subhead",
    "text": "Aplicação no trabalho"
  },
  {
    "kind": "paragraph",
    "text": "Quando um consumidor informa que recebe timeout, a pergunta inicial não deve ser apenas \"qual política do gateway falhou?\". Primeiro, determine se houve resolução DNS, estabelecimento TCP, negociação TLS e chegada da requisição ao listener do gateway. Só depois avance para HTTP, autenticação e roteamento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.2 Internet, Web e API: conceitos diferentes",
    "id": "conceitos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Internet"
  },
  {
    "kind": "paragraph",
    "text": "A Internet é uma infraestrutura global formada pela interconexão de redes independentes. Cada organização pode operar seus próprios enlaces, roteadores, sistemas autônomos e políticas, mas a comunicação é possível porque os participantes adotam protocolos comuns. O termo internet, em sentido genérico, significa uma rede de redes; Internet, com inicial maiúscula, costuma designar o sistema público global que utiliza a família de protocolos IP."
  },
  {
    "kind": "paragraph",
    "text": "O funcionamento da Internet é descentralizado. Não existe um único servidor central que encaminhe todas as mensagens. Operadores de telecomunicações, provedores de nuvem, empresas, universidades e governos administram partes da infraestrutura. O roteamento entre essas partes permite que pacotes atravessem múltiplas redes até alcançar o destino. Essa característica explica por que latência, perda de pacotes e caminhos assimétricos podem variar mesmo quando cliente e servidor não mudam."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "World Wide Web"
  },
  {
    "kind": "paragraph",
    "text": "A Web é um sistema de recursos interligados que utiliza a Internet como infraestrutura. Ela foi concebida em torno de identificadores de recursos, representações transferidas entre clientes e servidores e links que conectam documentos. Navegadores e servidores web popularizaram o HTTP, mas a Internet já existia antes da Web e continua transportando muitos protocolos que não pertencem à Web."
  },
  {
    "kind": "paragraph",
    "text": "Dizer que uma API é acessada pela Web geralmente significa que ela usa tecnologias associadas à Web, especialmente URI, HTTP e formatos como JSON. Isso não transforma toda API em uma página web. A interface pode ser consumida por aplicativos móveis, sistemas batch, dispositivos, microsserviços ou parceiros, sem qualquer interação humana por navegador."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "API e API REST"
  },
  {
    "kind": "paragraph",
    "text": "API é uma interface criada para permitir que um software utilize capacidades oferecidas por outro software. A interface define operações, dados esperados, respostas, erros e regras de uso. APIs existem em diferentes níveis: bibliotecas locais, sistemas operacionais, bancos de dados, mensageria e interfaces remotas. Portanto, API não é sinônimo de HTTP e não é sinônimo de REST."
  },
  {
    "kind": "paragraph",
    "text": "Uma API REST é uma interface remota projetada segundo princípios do estilo arquitetural REST e normalmente exposta sobre HTTP. Na prática de mercado, muitas interfaces são chamadas de REST apenas porque usam JSON e métodos HTTP. Uma avaliação mais rigorosa também observa identificação de recursos, semântica dos métodos, ausência de estado de sessão no servidor, cache e arquitetura em camadas."
  },
  {
    "kind": "subhead",
    "text": "Distinção essencial"
  },
  {
    "kind": "paragraph",
    "text": "Internet é a infraestrutura de redes. Web é um sistema construído sobre essa infraestrutura. HTTP é um protocolo de aplicação. API é um contrato entre softwares. REST é um estilo arquitetural. Esses conceitos se relacionam, mas não são equivalentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.3 Evolução histórica: da comutação de pacotes às plataformas de APIs",
    "id": "evolucao"
  },
  {
    "kind": "paragraph",
    "text": "As primeiras redes de computadores eram frequentemente construídas para ambientes específicos e possuíam pouca interoperabilidade. A pesquisa em comutação de pacotes introduziu a ideia de dividir dados em unidades menores que poderiam atravessar a rede por caminhos compartilhados. Em vez de reservar um circuito físico exclusivo durante toda a comunicação, a rede poderia utilizar sua capacidade de maneira estatística e reconstruir os dados no destino."
  },
  {
    "kind": "paragraph",
    "text": "A ARPANET, operacional a partir de 1969, foi um dos projetos que demonstraram a viabilidade dessa abordagem em uma rede de longa distância. Ela não era a Internet moderna, mas forneceu experiência técnica e organizacional para a evolução posterior. O desafio seguinte não era apenas conectar computadores em uma mesma rede, mas permitir que redes diferentes se comunicassem sem exigir uma tecnologia física única."
  },
  {
    "kind": "paragraph",
    "text": "O conjunto TCP/IP surgiu para resolver esse problema de interconexão. A camada IP oferece um mecanismo de endereçamento e entrega de datagramas entre redes, enquanto protocolos de transporte como TCP fornecem propriedades adicionais aos aplicativos. A adoção de TCP/IP pela ARPANET em 1983 é tradicionalmente tratada como um marco na consolidação da Internet moderna."
  },
  {
    "kind": "paragraph",
    "text": "No fim da década de 1980 e início da década de 1990, a Web acrescentou uma camada de publicação e navegação de recursos. URI, HTTP e HTML formaram um sistema simples, extensível e distribuído."
  },
  {
    "kind": "paragraph",
    "text": "Com o crescimento de aplicações dinâmicas, o HTTP passou a transportar não apenas documentos para pessoas, mas dados entre sistemas."
  },
  {
    "kind": "paragraph",
    "text": "Nos anos 2000, arquiteturas orientadas a serviços e APIs web ganharam importância na integração corporativa. REST tornou-se popular por alinhar a integração à infraestrutura já difundida da Web. Posteriormente, nuvem, microsserviços, aplicativos móveis e ecossistemas de parceiros elevaram o número de APIs e consumidores, criando a necessidade de governança, proteção e observabilidade em escala."
  },
  {
    "kind": "paragraph",
    "text": "É nesse contexto que surgem as plataformas modernas de gerenciamento de APIs. Um API Gateway passa a funcionar como ponto controlado de exposição e mediação, enquanto componentes de management plane cuidam de configuração, catálogo, publicação, análise e ciclo de vida. Produtos como Axway API Gateway e Azure API Management representam implementações corporativas dessa evolução."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/timeline-api-platforms.svg",
    "alt": "Linha do tempo da ARPANET às plataformas de APIs",
    "caption": "Figura 1 - Linha do tempo simplificada da infraestrutura de rede até as plataformas de APIs."
  },
  {
    "kind": "subhead",
    "text": "Leitura crítica"
  },
  {
    "kind": "paragraph",
    "text": "A evolução não ocorreu como substituição completa. Tecnologias antigas e novas coexistem. HTTP/1.1 continua presente ao lado de HTTP/2 e HTTP/3; TLS 1.2 ainda pode coexistir com TLS 1.3; sistemas legados podem ser expostos por gateways modernos. Arquitetura corporativa exige compreender essas combinações."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.4 Ecossistema de padronização e referências técnicas",
    "id": "padroes"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "IETF e RFC Editor"
  },
  {
    "kind": "paragraph",
    "text": "A Internet Engineering Task Force (IETF) é uma comunidade aberta responsável pelo desenvolvimento de muitos padrões utilizados na Internet. O trabalho é organizado em grupos que discutem problemas técnicos, analisam propostas e produzem documentos. Protocolos como HTTP, TLS, DNS, TCP, OAuth 2.0 e diversos mecanismos de segurança são definidos ou atualizados nesse ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "O RFC Editor publica e mantém a série RFC. Uma RFC recebe um número permanente e não é editada depois da publicação. Quando uma especificação precisa ser corrigida ou substituída, uma nova RFC é publicada e registra sua relação com documentos anteriores, por exemplo \"updates\" ou \"obsoletes\". Essa característica é importante: ao pesquisar um protocolo, o profissional deve verificar se a RFC encontrada ainda é atual."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NIST, W3C, IEEE e outros organismos"
  },
  {
    "kind": "paragraph",
    "text": "O National Institute of Standards and Technology (NIST) publica padrões e guias amplamente utilizados em segurança, criptografia, identidade e gestão de riscos. Embora seja uma instituição dos Estados Unidos, suas publicações influenciam organizações em vários países. Para APIs, documentos do NIST ajudam a organizar controles de proteção durante desenvolvimento, implantação e operação."
  },
  {
    "kind": "paragraph",
    "text": "O World Wide Web Consortium (W3C) produz padrões relacionados à plataforma Web, incluindo tecnologias utilizadas por navegadores. O Institute of Electrical and Electronics Engineers (IEEE) mantém padrões importantes nas camadas física e de enlace, como as famílias Ethernet e Wi-Fi. Esses padrões ficam abaixo do HTTP, mas afetam diretamente conectividade, capacidade e comportamento da rede."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Foundation mantém especificações relacionadas a identidade, incluindo OpenID Connect e perfis usados em ecossistemas financeiros. OpenAPI Initiative mantém a especificação OpenAPI, utilizada para descrever contratos HTTP de forma legível por pessoas e ferramentas. OASIS mantém padrões como SAML. Cada organismo atua em um domínio, e projetos corporativos frequentemente combinam especificações de várias fontes."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Como avaliar a autoridade de uma documentação"
  },
  {
    "kind": "paragraph",
    "text": "Documentações de fabricantes explicam como um produto implementa um padrão, mas não substituem a especificação normativa. Para entender o comportamento do Azure APIM, consulte a Microsoft; para entender o Axway API Gateway, consulte a Axway. Entretanto, para compreender a semântica de HTTP, consulte a RFC aplicável. A distinção evita confundir decisão de produto com requisito de protocolo."
  },
  {
    "kind": "paragraph",
    "text": "Uma estratégia de estudo eficiente possui três níveis. Primeiro, uma introdução didática estabelece o vocabulário. Depois, a especificação oficial esclarece requisitos normativos e casos de borda. Por fim, a documentação do produto demonstra como configurar ou observar aquele comportamento em uma implementação específica. Essa sequência reduz o risco de aprender apenas procedimentos sem compreender os fundamentos."
  },
  {
    "kind": "subhead",
    "text": "Regra de ouro"
  },
  {
    "kind": "paragraph",
    "text": "Para responder \"o que o protocolo permite?\", procure a especificação. Para responder \"como o produto implementa ou configura isso?\", procure a documentação do fabricante. Para responder \"qual controle é recomendado?\", procure guias de segurança e risco, como NIST e OWASP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.5 RFCs: como protocolos são documentados e evoluem",
    "id": "rfcs"
  },
  {
    "kind": "paragraph",
    "text": "RFC significa Request for Comments, nome histórico que permaneceu mesmo quando parte da série passou a registrar padrões consolidados. Nem toda RFC é um Internet Standard. Existem documentos em trilhas e categorias diferentes, incluindo Standards Track, Best Current Practice, Informational e Experimental. Por isso, citar apenas um número sem verificar o status pode levar a conclusões erradas."
  },
  {
    "kind": "paragraph",
    "text": "Antes da publicação, propostas da IETF normalmente circulam como Internet-Drafts. Um draft é um documento de trabalho temporário: pode mudar, expirar ou nunca se tornar RFC. Durante a análise, participantes discutem interoperabilidade, segurança, clareza e experiência de implementação. O objetivo não é apenas produzir uma descrição elegante, mas permitir que implementações independentes se comuniquem corretamente."
  },
  {
    "kind": "paragraph",
    "text": "RFCs utilizam palavras normativas como MUST, MUST NOT, SHOULD e MAY de acordo com convenções específicas. Em uma leitura técnica, essas palavras indicam níveis diferentes de obrigatoriedade. MUST descreve requisito indispensável para conformidade; SHOULD admite exceções justificadas; MAY indica opção permitida. Traduções informais podem suavizar essas diferenças e alterar a interpretação."
  },
  {
    "kind": "paragraph",
    "text": "A evolução de HTTP demonstra a importância de acompanhar relações entre documentos. RFCs antigas podem permanecer muito citadas, embora tenham sido substituídas. A semântica moderna de HTTP está consolidada na RFC 9110, enquanto versões de transporte possuem documentos próprios. TCP também recebeu uma especificação consolidada mais recente na RFC 9293, que substitui a histórica RFC 793."
  },
  {
    "kind": "paragraph",
    "text": "Ao estudar uma RFC, comece pelo resumo, status, relação com outros documentos e sumário. Depois, identifique terminologia, modelo de funcionamento, requisitos normativos e seção de segurança. Não é necessário memorizar todo o documento. O objetivo inicial é aprender a localizar a fonte formal de uma dúvida e interpretar o trecho relevante no contexto correto."
  },
  {
    "kind": "subhead",
    "text": "Vocabulário normativo simplificado"
  },
  {
    "kind": "code",
    "text": "MUST requisito obrigatório\nMUST NOT comportamento proibido\nSHOULD recomendado, salvo motivo técnico justificável\nMAY opção permitida pela especificação"
  },
  {
    "kind": "subhead",
    "text": "Exemplo de investigação"
  },
  {
    "kind": "paragraph",
    "text": "Ao encontrar uma configuração que aceita TLS 1.0, não conclua apenas com base na tela do produto que a versão é recomendada. Verifique o padrão, as orientações de segurança vigentes e a política da organização. Capacidade técnica de configuração não equivale a decisão segura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.6 Comunicação em rede, pacotes e encapsulamento",
    "id": "camadas"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações trabalham com mensagens significativas para o negócio: uma requisição para consultar cliente, uma resposta JSON ou um token de acesso. A infraestrutura de rede, porém, precisa transportar esses dados por meios com limites de tamanho, endereços e regras próprias. Para isso, cada camada acrescenta informações de controle ao conteúdo recebido da camada superior. Esse processo é chamado encapsulamento."
  },
  {
    "kind": "paragraph",
    "text": "Em uma chamada HTTP sobre TLS e TCP, a aplicação produz bytes de uma mensagem HTTP. TLS organiza esses bytes em registros protegidos. TCP trata o fluxo como uma sequência confiável e cria segmentos. IP acrescenta endereços de origem e destino aos datagramas. A tecnologia de enlace cria quadros adequados ao meio local, como Ethernet ou Wi-Fi. No destino, cada camada remove e interpreta seu cabeçalho antes de entregar o conteúdo à camada superior."
  },
  {
    "kind": "paragraph",
    "text": "Essa separação permite evolução independente. A mesma aplicação HTTP pode funcionar sobre diferentes redes físicas, e o mesmo enlace pode transportar diferentes protocolos de camada superior. Também explica por que ferramentas de diagnóstico exibem visões distintas: uma captura de pacotes pode mostrar endereços e portas, enquanto logs do gateway mostram métodos, caminhos e headers HTTP."
  },
  {
    "kind": "paragraph",
    "text": "O tamanho dos dados importa. Interfaces possuem uma Maximum Transmission Unit (MTU), e mensagens maiores precisam ser divididas ou ajustadas aos limites do caminho. Problemas de MTU e fragmentação podem produzir sintomas difíceis de perceber, como conexões que funcionam para mensagens pequenas, mas falham com certificados grandes, headers extensos ou uploads."
  },
  {
    "kind": "paragraph",
    "text": "Encapsulamento não significa que todas as camadas sejam igualmente visíveis em cada componente. Um roteador encaminha principalmente com base em informações IP. Um balanceador de camada 4 pode usar IP e porta. Um proxy de camada 7 interpreta HTTP. Um gateway pode inspecionar método, URI, token e corpo. Quanto mais alta a camada de atuação, maior a compreensão semântica da mensagem e, normalmente, maior o custo de processamento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/encapsulamento-api.svg",
    "alt": "Cinco camadas encapsulando uma requisição HTTP",
    "caption": "Figura 2 - Visão simplificada do encapsulamento de uma chamada HTTP protegida por TLS."
  },
  {
    "kind": "subhead",
    "text": "Relação com observabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Logs de aplicação, logs do gateway, traces distribuídos e capturas de pacotes observam níveis diferentes. Uma investigação completa pode precisar correlacionar timestamp, endereço, porta, SNI, método HTTP, correlation ID e trace ID."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.7 Modelos OSI e TCP/IP",
    "id": "modelos"
  },
  {
    "kind": "paragraph",
    "text": "Modelos em camadas são ferramentas conceituais. Eles ajudam a separar responsabilidades e organizar o raciocínio, mas não representam com perfeição todos os detalhes de uma implementação. O modelo OSI descreve sete camadas: física, enlace, rede, transporte, sessão, apresentação e aplicação. O modelo TCP/IP costuma ser apresentado com quatro ou cinco camadas, agrupando funções de maneira mais próxima à arquitetura da Internet."
  },
  {
    "kind": "paragraph",
    "text": "Na prática de APIs, as camadas mais citadas são rede, transporte e aplicação. IP pertence à camada de rede; TCP e UDP pertencem à camada de transporte; HTTP, DNS e protocolos de identidade aparecem na camada de aplicação. TLS é frequentemente posicionado entre aplicação e transporte, embora sua classificação varie conforme o modelo usado. O importante é compreender sua função e não disputar apenas o número da camada."
  },
  {
    "kind": "paragraph",
    "text": "O modelo OSI é útil em troubleshooting porque incentiva uma ordem. Primeiro, existe conectividade física ou virtual? Depois, o endereço está alcançável? A porta aceita conexão? A negociação TLS conclui? A mensagem HTTP é válida? A autenticação é aceita? A regra de negócio funciona? Esse caminho reduz investigações que começam em políticas complexas quando o problema é uma rota inexistente."
  },
  {
    "kind": "paragraph",
    "text": "Termos como \"balanceador L4\" e \"proxy L7\" derivam desse vocabulário. Um dispositivo L4 toma decisões principalmente com base em endereços e portas de transporte. Um componente L7 interpreta o protocolo de aplicação e pode rotear por host, path ou header. Um API Gateway é tipicamente um componente de camada de aplicação, embora dependa de recursos das camadas inferiores."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Mapeamento aproximado entre OSI e TCP/IP.",
    "headers": [
      "OSI",
      "TCP/IP aproximado",
      "Exemplos no contexto de APIs"
    ],
    "rows": [
      [
        "7 Aplicação",
        "Aplicação",
        "HTTP, DNS, OAuth, OpenID Connect"
      ],
      [
        "6 Apresentação",
        "Aplicação",
        "JSON, codificação, serialização, TLS em alguns modelos"
      ],
      [
        "5 Sessão",
        "Aplicação",
        "Sessões lógicas, negociação e contexto"
      ],
      [
        "4 Transporte",
        "Transporte",
        "TCP, UDP, QUIC"
      ],
      [
        "3 Rede",
        "Internet",
        "IPv4, IPv6, roteamento"
      ],
      [
        "2 Enlace",
        "Acesso à rede",
        "Ethernet, Wi-Fi, VLAN"
      ],
      [
        "1 Física",
        "Acesso à rede",
        "Cabo, fibra, rádio"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.8 Endereçamento IP e roteamento",
    "id": "enderecamento"
  },
  {
    "kind": "paragraph",
    "text": "O protocolo IP fornece endereçamento lógico e entrega de datagramas entre redes. Um endereço identifica uma interface em determinado contexto de rede, não necessariamente uma pessoa, aplicação ou máquina de forma permanente. Equipamentos podem possuir múltiplos endereços, endereços podem mudar e mecanismos intermediários podem traduzir origens e destinos."
  },
  {
    "kind": "paragraph",
    "text": "IPv4 utiliza endereços de 32 bits e costuma ser representado em quatro números decimais. IPv6 utiliza 128 bits e representação hexadecimal, oferecendo espaço muito maior e outras melhorias arquiteturais. Em redes corporativas, IPv4 privado continua comum, enquanto IPv6 pode aparecer de forma crescente em ambientes externos, cloud e redes modernas. Uma API pode ser publicada com registros DNS para uma ou ambas as famílias."
  },
  {
    "kind": "paragraph",
    "text": "A máscara ou prefixo identifica qual parte do endereço corresponde à rede. Quando o destino está fora da rede local, o host envia o datagrama ao gateway padrão. Roteadores consultam suas tabelas e encaminham o pacote salto a salto. Cada roteador decide o próximo caminho; ele não precisa conhecer a lógica da API, apenas informações suficientes para alcançar a rede de destino."
  },
  {
    "kind": "paragraph",
    "text": "Roteamento é diferente de roteamento de API. O primeiro ocorre na infraestrutura IP e escolhe caminhos entre redes. O segundo ocorre em proxies e gateways e pode escolher um backend com base em host, caminho, versão, header ou política. Uma falha de rota IP impede a conexão antes de o gateway analisar HTTP; uma falha de roteamento de API ocorre depois que a mensagem já chegou ao gateway."
  },
  {
    "kind": "paragraph",
    "text": "Em nuvem e datacenters, rotas podem ser influenciadas por redes virtuais, peering, túneis, appliances de segurança e regras de saída. O fato de duas aplicações estarem na mesma empresa não garante conectividade direta. Arquitetos devem tratar caminho de rede, resolução de nomes, regras de firewall e dependências de saída como parte explícita do desenho."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de endereçamento"
  },
  {
    "kind": "code",
    "text": "IPv4 privado de exemplo: 10.20.30.40/24\nRede aproximada: 10.20.30.0/24\nGateway padrão: 10.20.30.1\nDestino externo: encaminhado ao gateway"
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico"
  },
  {
    "kind": "paragraph",
    "text": "Se o nome resolve, mas a conexão expira sem resposta, investigue caminho IP, firewall, rota e listener. Se a conexão é recusada imediatamente, o destino pode estar alcançável, porém sem serviço escutando naquela porta ou com rejeição ativa."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.9 DNS e resolução de nomes",
    "id": "dns"
  },
  {
    "kind": "paragraph",
    "text": "O Domain Name System permite utilizar nomes hierárquicos em vez de depender de endereços IP fixos. Em uma URL como https://api.exemplo.com, o host api.exemplo.com precisa ser resolvido para um endereço que o cliente possa alcançar. Essa resolução pode envolver cache local, resolvedor corporativo, servidores recursivos e servidores autoritativos."
  },
  {
    "kind": "paragraph",
    "text": "O DNS é distribuído e hierárquico. A zona responsável por um domínio publica registros que descrevem como nomes devem ser resolvidos. Registros A associam nomes a endereços IPv4; AAAA associam a IPv6; CNAME cria um alias para outro nome; TXT transporta informações textuais usadas por diferentes mecanismos; SRV pode indicar serviços e portas. Em arquiteturas de APIs, CNAMEs são comuns para desacoplar o endereço público da infraestrutura física ou do provedor."
  },
  {
    "kind": "paragraph",
    "text": "O Time to Live (TTL) orienta por quanto tempo uma resposta pode permanecer em cache. TTL alto reduz consultas e pode melhorar eficiência, mas torna mudanças mais lentas para consumidores que ainda mantêm dados antigos. TTL baixo acelera transições, mas aumenta consultas e não elimina todos os caches intermediários. Estratégias de migração e disaster recovery precisam considerar esse comportamento."
  },
  {
    "kind": "paragraph",
    "text": "Split-horizon DNS ocorre quando o mesmo nome retorna respostas diferentes conforme a origem da consulta. Um consumidor interno pode receber endereço privado, enquanto um consumidor externo recebe um endpoint público. Essa técnica é útil, mas pode causar confusão quando testes realizados de redes diferentes produzem resultados distintos."
  },
  {
    "kind": "paragraph",
    "text": "DNS também se relaciona a TLS. O cliente normalmente valida se o certificado apresentado pelo servidor é válido para o nome solicitado. Assim, apontar um nome para outro endpoint não basta: o endpoint precisa apresentar certificado compatível e responder adequadamente ao host ou SNI esperado. Falhas de nome e certificado frequentemente aparecem juntas durante migrações."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de verificação de resolução e conexão"
  },
  {
    "kind": "code",
    "text": "$ nslookup api.exemplo.com\nNome: api.exemplo.com\nAddress: 203.0.113.20\n$ curl -v https://api.exemplo.com/clientes\n* Host api.exemplo.com:443 was resolved\n* Connected to api.exemplo.com (...) port 443"
  },
  {
    "kind": "subhead",
    "text": "Ponto de atenção"
  },
  {
    "kind": "paragraph",
    "text": "Um ping bem-sucedido não comprova que uma API está disponível. ICMP pode ser bloqueado, e a API depende de DNS, rota, porta, TLS e HTTP. Da mesma forma, um ping bloqueado não prova indisponibilidade do serviço HTTPS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.10 TCP, UDP, portas e sockets",
    "id": "transporte"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TCP"
  },
  {
    "kind": "paragraph",
    "text": "TCP fornece um fluxo de bytes confiável e ordenado entre dois endpoints. Antes da troca de dados, uma conexão é estabelecida por meio do three-way handshake: SYN, SYN-ACK e ACK. A conexão mantém números de sequência, confirma recebimentos e retransmite dados quando necessário. Essas propriedades simplificam o trabalho de protocolos como HTTP/1.1 e HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "Confiabilidade possui custo. TCP precisa controlar estado, janelas, retransmissões e congestionamento. Perdas de pacotes podem aumentar latência, mesmo quando a aplicação recebe todos os bytes ao final. Conexões persistentes e pools evitam repetir handshakes para cada requisição, mas exigem configuração cuidadosa de timeouts e limites em clientes, gateways e backends."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "UDP e QUIC"
  },
  {
    "kind": "paragraph",
    "text": "UDP oferece datagramas sem estabelecimento de conexão e sem garantia de entrega ou ordem no próprio protocolo. Isso não significa que aplicações sobre UDP sejam necessariamente não confiáveis; elas podem implementar os mecanismos necessários. DNS tradicionalmente utiliza UDP em muitas consultas, com alternativas e extensões para outros cenários."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utiliza QUIC, que opera sobre UDP e incorpora recursos de transporte e segurança. A escolha permite reduzir alguns custos de estabelecimento e evitar certos efeitos de bloqueio entre fluxos. Entretanto, para o profissional de gateway, o ponto principal neste capítulo é reconhecer que HTTP moderno não depende exclusivamente de TCP em todas as versões."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Portas e sockets"
  },
  {
    "kind": "paragraph",
    "text": "Uma porta identifica um ponto lógico de comunicação no host. HTTPS costuma utilizar 443 e HTTP 80 por convenção, mas serviços podem operar em outras portas. O par endereço IP e porta identifica um endpoint de transporte; combinado aos endpoints de origem e destino e ao protocolo, forma a identificação de uma comunicação."
  },
  {
    "kind": "paragraph",
    "text": "Socket é uma abstração utilizada pelo sistema operacional para permitir que aplicações enviem e recebam dados. Um servidor cria um socket, associa endereço e porta e passa a escutar conexões. Se o processo não estiver escutando, o cliente pode receber conexão recusada. Se um firewall descartar os pacotes silenciosamente, o cliente tende a aguardar até um timeout."
  },
  {
    "kind": "subhead",
    "text": "Conexões distintas no caminho"
  },
  {
    "kind": "code",
    "text": "Cliente 10.1.5.20:53144 -> Gateway 10.2.8.10:443\nporta efêmera porta do serviço\nGateway 10.2.8.10:48720 -> Backend 10.3.9.15:8443\nnova conexão listener do backend"
  },
  {
    "kind": "subhead",
    "text": "Implicação arquitetural"
  },
  {
    "kind": "paragraph",
    "text": "A conexão cliente-gateway e a conexão gateway-backend são normalmente independentes. O gateway pode terminar TLS, reutilizar conexões de backend e aplicar timeouts diferentes. Isso explica por que um problema pode existir apenas em um dos lados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.11 NAT, firewall, proxy reverso e balanceamento de carga",
    "id": "intermediarios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NAT"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifica informações de endereço e, em muitos casos, de porta durante a passagem do tráfego. NAT permite que endereços privados utilizem um conjunto menor de endereços públicos e é frequente em redes corporativas e nuvem. Como consequência, o endereço observado pelo servidor pode ser o endereço do dispositivo intermediário, não o endereço original do consumidor."
  },
  {
    "kind": "paragraph",
    "text": "Para preservar informações de origem na camada de aplicação, proxies podem acrescentar headers como Forwarded ou X-Forwarded-For. Esses headers exigem uma cadeia de confiança: aceitar valores enviados diretamente por qualquer cliente permite falsificação. O componente de borda deve remover ou sobrescrever valores não confiáveis antes de repassar a informação."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Firewall"
  },
  {
    "kind": "paragraph",
    "text": "Firewalls aplicam regras para permitir, rejeitar ou descartar tráfego segundo critérios como endereço, porta, protocolo e estado de conexão. Firewalls de aplicação podem analisar protocolos de nível superior. Em ambientes de APIs, diferentes camadas de firewall podem existir no consumidor, na rede, na borda pública, no cluster e no host."
  },
  {
    "kind": "paragraph",
    "text": "Uma liberação de firewall precisa considerar direção, origem, destino, porta e protocolo. Solicitações vagas como \"liberar a API\" são insuficientes. Além disso, o retorno normalmente depende do estado da conexão, e tráfego de saída para provedores de identidade, validação de certificados ou serviços externos também pode exigir regras específicas."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Proxy reverso e balanceador"
  },
  {
    "kind": "paragraph",
    "text": "Um proxy reverso recebe requisições em nome de servidores internos. Ele pode terminar TLS, aplicar regras, normalizar headers, comprimir respostas e ocultar a topologia de backend. Um API Gateway possui características de proxy reverso, mas acrescenta funções específicas de gestão, segurança e governança de APIs."
  },
  {
    "kind": "paragraph",
    "text": "Balanceadores distribuem tráfego entre múltiplas instâncias para aumentar capacidade e disponibilidade. Algoritmos podem considerar round-robin, conexões ativas, pesos, latência ou afinidade. Health checks determinam quais instâncias podem receber tráfego. Um serviço pode parecer disponível em um teste local e ainda falhar externamente se o balanceador considerar todas as instâncias não saudáveis."
  },
  {
    "kind": "subhead",
    "text": "Erro comum"
  },
  {
    "kind": "paragraph",
    "text": "Terminar TLS no balanceador não significa necessariamente que o trecho até o gateway esteja sem proteção; pode existir recriptografia. O desenho deve registrar cada hop, onde TLS termina, qual certificado é validado e quais headers de contexto são confiáveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.12 TLS, HTTPS e o estabelecimento de confiança",
    "id": "seguranca"
  },
  {
    "kind": "paragraph",
    "text": "TLS protege a comunicação contra leitura indevida, alteração e falsificação dentro do modelo de ameaça considerado. HTTPS é HTTP transportado em um canal protegido por TLS. O protocolo negocia parâmetros criptográficos, autentica pelo menos o servidor na configuração comum e estabelece chaves de sessão utilizadas para proteger os dados transmitidos."
  },
  {
    "kind": "paragraph",
    "text": "O servidor apresenta um certificado que associa uma chave pública a identidades, geralmente nomes DNS. O cliente verifica assinatura, período de validade, cadeia de certificação, uso permitido e correspondência do nome. A confiança depende das autoridades certificadoras aceitas pelo cliente. Em ambientes corporativos, certificados podem ser emitidos por autoridades públicas ou por PKIs internas."
  },
  {
    "kind": "paragraph",
    "text": "No handshake, cliente e servidor negociam versão e algoritmos compatíveis. TLS 1.3 simplificou e modernizou partes do protocolo em relação a versões anteriores. A aplicação só deve enviar informações sensíveis depois que o canal está estabelecido e validado. Quando a negociação falha, nenhuma política HTTP do gateway pode ser executada porque a mensagem de aplicação ainda não foi recebida."
  },
  {
    "kind": "paragraph",
    "text": "mTLS acrescenta autenticação do cliente no nível TLS. Além de validar o certificado do servidor, o servidor solicita e valida um certificado apresentado pelo cliente. Isso é comum em integrações B2B e financeiras. mTLS autentica uma identidade técnica ligada ao certificado; autorização de negócio ainda pode depender de token, escopo, contrato e contexto."
  },
  {
    "kind": "paragraph",
    "text": "TLS pode terminar em vários pontos. Uma conexão externa pode terminar no WAF ou balanceador, seguida por outra conexão TLS até o gateway. O gateway pode criar uma terceira conexão até o backend. Cada trecho possui handshake, configuração, truststore, certificado e risco próprios. Documentar apenas \"a API usa HTTPS\" é insuficiente para compreender a arquitetura."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de TLS por hops"
  },
  {
    "kind": "code",
    "text": "Cliente --TLS 1--> Balanceador --TLS 2--> API Gateway --TLS 3--> Backend\ncert. público cert. interno mTLS opcional\nCada seta representa uma conexão e uma validação potencialmente diferente."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico de handshake"
  },
  {
    "kind": "paragraph",
    "text": "Mensagens como certificate unknown, hostname mismatch, unknown CA, expired certificate, no shared cipher ou protocol version apontam para classes diferentes de falha. A captura do erro e a identificação do hop são essenciais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.13 Anatomia de uma mensagem HTTP",
    "id": "http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP segue um modelo de requisição e resposta. A requisição contém método, alvo, campos de cabeçalho e, quando aplicável, conteúdo. A resposta contém código de status, headers e conteúdo. HTTP define semântica: um método não é apenas uma palavra, e um código não é apenas um número. Clientes, caches, proxies e gateways tomam decisões com base nesses significados."
  },
  {
    "kind": "paragraph",
    "text": "O método GET solicita uma representação e é considerado seguro e idempotente no modelo do protocolo. POST envia conteúdo para processamento definido pelo recurso. PUT é associado à criação ou substituição do estado no alvo e é idempotente. DELETE solicita remoção e também possui semântica idempotente, embora respostas e efeitos observáveis possam variar. PATCH aplica modificações parciais segundo o formato utilizado."
  },
  {
    "kind": "paragraph",
    "text": "Headers carregam metadados. Host ou :authority identifica a autoridade de destino; Content-Type descreve o tipo do conteúdo enviado; Accept indica representações aceitas; Authorization transporta credenciais de aplicação; Cache-Control orienta cache; traceparent pode propagar contexto de tracing. Gateways frequentemente validam, removem, acrescentam ou transformam headers."
  },
  {
    "kind": "paragraph",
    "text": "Códigos 2xx indicam sucesso; 3xx tratam redirecionamento; 4xx indicam que a requisição não pode ser atendida nas condições apresentadas; 5xx indicam falha do servidor ou de um intermediário. O código deve ser interpretado com o corpo, headers, componente emissor e contexto. Um 404 pode significar recurso inexistente no backend ou rota não publicada no gateway."
  },
  {
    "kind": "paragraph",
    "text": "HTTP é stateless no sentido de que cada requisição deve conter as informações necessárias para sua interpretação. Aplicações podem construir sessões usando cookies ou tokens, mas isso ocorre acima da semântica básica do protocolo. APIs corporativas costumam preferir tokens explícitos e contexto por requisição para facilitar distribuição e escalabilidade."
  },
  {
    "kind": "code",
    "text": "Requisição e resposta HTTP simplificadas\nGET /v1/clientes/123 HTTP/1.1\nHost: api.exemplo.com\nAccept: application/json\nAuthorization: Bearer <token>\nX-Correlation-ID: 7ad3c8c0\nHTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nX-Correlation-ID: 7ad3c8c0\n{\"id\":123,\"nome\":\"Cliente de Exemplo\"}"
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Interpretação inicial de códigos comuns em gateways.",
    "headers": [
      "Código",
      "Interpretação inicial",
      "Possível origem em APIs"
    ],
    "rows": [
      [
        "200",
        "Operação concluída",
        "Backend ou resposta sintetizada pelo gateway"
      ],
      [
        "400",
        "Requisição inválida",
        "Schema, parâmetro, header ou sintaxe"
      ],
      [
        "401",
        "Não autenticado",
        "Token ausente/inválido ou certificado não associado"
      ],
      [
        "403",
        "Autenticado sem autorização",
        "Escopo, papel, contrato ou política"
      ],
      [
        "404",
        "Recurso ou rota não encontrado",
        "Gateway, backend ou versão incorreta"
      ],
      [
        "429",
        "Limite excedido",
        "Rate limit ou quota"
      ],
      [
        "502",
        "Resposta inválida do upstream",
        "Falha gateway-backend"
      ],
      [
        "503",
        "Serviço indisponível",
        "Sem instâncias saudáveis ou proteção de capacidade"
      ],
      [
        "504",
        "Timeout do upstream",
        "Backend não respondeu no prazo"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.14 REST e o conceito de recurso",
    "id": "rest"
  },
  {
    "kind": "paragraph",
    "text": "REST foi descrito por Roy Fielding como um estilo arquitetural para sistemas hipermídia distribuídos. Um estilo arquitetural é um conjunto de restrições que produz determinadas propriedades. REST combina cliente-servidor, stateless, cache, interface uniforme, sistema em camadas e código sob demanda opcional. O resultado pretendido inclui escalabilidade, visibilidade e evolução independente de componentes."
  },
  {
    "kind": "paragraph",
    "text": "O conceito central é recurso. Um recurso representa algo que pode ser identificado: cliente, conta, pagamento, contrato ou coleção. O consumidor interage com representações do recurso, como JSON ou XML. A URI identifica o recurso; o método expressa a intenção; headers e conteúdo completam a mensagem. Essa separação evita desenhar a interface apenas como chamadas de procedimento disfarçadas."
  },
  {
    "kind": "paragraph",
    "text": "Stateless significa que o servidor não deve depender de contexto de sessão oculto entre requisições para interpretar a próxima operação. Cada requisição traz o contexto necessário. Isso facilita distribuição entre instâncias e aumenta visibilidade, mas pode elevar o tamanho das mensagens. Tokens de acesso são um exemplo de contexto explicitamente transportado."
  },
  {
    "kind": "paragraph",
    "text": "A interface uniforme limita variações e permite que intermediários compreendam a comunicação. Semântica correta de métodos e status, representações autodescritivas e hipermídia fazem parte do modelo. Muitas APIs comerciais adotam apenas uma parte dessas restrições. É útil reconhecer a diferença entre REST como definido academicamente e o uso coloquial de \"REST API\"."
  },
  {
    "kind": "paragraph",
    "text": "Sistema em camadas permite inserir proxies, caches, gateways e balanceadores sem exigir que o consumidor conheça toda a topologia. Essa restrição se conecta diretamente ao mundo de API Gateways: o cliente chama uma autoridade pública e não precisa saber qual microsserviço, cluster ou datacenter processará a operação."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de modelagem orientada a recursos"
  },
  {
    "kind": "code",
    "text": "GET /clientes/123 obter representação do cliente\nPUT /clientes/123 substituir estado conforme contrato\nPATCH /clientes/123 aplicar alteração parcial\nDELETE /clientes/123 solicitar remoção\nGET /clientes/123/contas navegar para sub-recursos"
  },
  {
    "kind": "subhead",
    "text": "Cuidado com verbos na URI"
  },
  {
    "kind": "paragraph",
    "text": "Rotas como /consultarCliente ou /deletarCliente aproximam a interface de RPC. Nem todo uso é automaticamente incorreto, mas o desenho deve ser intencional e coerente com o estilo escolhido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.15 API Gateway e plataforma de APIs",
    "id": "gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway é um intermediário especializado que recebe chamadas de consumidores e as encaminha a serviços de backend. No caminho, aplica políticas relacionadas a segurança, tráfego, mediação, roteamento e observabilidade. Essa posição permite padronizar controles sem duplicar toda a implementação em cada serviço."
  },
  {
    "kind": "paragraph",
    "text": "O gateway não deve ser confundido com toda a plataforma de API Management. A plataforma pode incluir management plane, catálogo, portal de desenvolvedores, analytics, gestão de produtos, subscriptions, credenciais e ciclo de vida. O gateway é o componente de runtime ou data plane que processa o tráfego. Produtos diferentes usam nomes e separações próprias, mas a distinção conceitual é útil."
  },
  {
    "kind": "paragraph",
    "text": "Segurança no gateway pode incluir validação de API key, JWT, OAuth 2.0, mTLS, assinatura, allowlists e proteção contra conteúdo malformado. Controle de tráfego pode incluir rate limiting, quotas, spike arrest e circuit breaking. Mediação pode transformar headers, paths e formatos. Observabilidade coleta logs, métricas e traces para operação e auditoria."
  },
  {
    "kind": "paragraph",
    "text": "Centralização traz benefícios e riscos. Políticas consistentes aumentam governança, mas o gateway pode se tornar ponto crítico de capacidade e disponibilidade. Regras excessivamente complexas elevam latência e dificultam manutenção. Lógica de negócio profunda no gateway cria acoplamento e reduz clareza de responsabilidades. O desenho deve manter equilíbrio entre controles transversais e domínio do backend."
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway fornece recursos de gestão, entrega e segurança de APIs, com políticas e componentes de administração. Azure API Management oferece uma plataforma gerenciada com gateway, management plane e portal. Apesar das diferenças de produto, os fundamentos deste capítulo se aplicam a ambos: listeners, certificados, DNS, upstreams, políticas HTTP, identidade, logs e capacidade."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-responsabilidades.svg",
    "alt": "Consumidores, responsabilidades do API Gateway e backends",
    "caption": "Figura 3 - Responsabilidades transversais normalmente concentradas no API Gateway."
  },
  {
    "kind": "subhead",
    "text": "Limite de responsabilidade"
  },
  {
    "kind": "paragraph",
    "text": "O gateway pode validar que um token contém escopo adequado, mas o backend continua responsável por regras de autorização ligadas aos dados e ao domínio, como verificar se o cliente autenticado pode acessar aquela conta específica."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.16 Jornada ponta a ponta de uma chamada de API",
    "id": "jornada"
  },
  {
    "kind": "paragraph",
    "text": "Considere um aplicativo corporativo que consulta GET https://api.exemplo.com/v1/clientes/123. Antes de enviar a mensagem, a biblioteca cliente interpreta a URI, identifica o esquema HTTPS, o host, a porta padrão 443 e o caminho. Ela consulta a resolução de nomes, possivelmente utilizando caches do processo, sistema operacional e resolvedor configurado."
  },
  {
    "kind": "paragraph",
    "text": "Após obter um endereço, o cliente inicia uma conexão de transporte. Em HTTP/1.1 ou HTTP/2 sobre TCP, ocorre o three-way handshake. Em seguida, inicia o handshake TLS. O cliente informa capacidades, versão e nome de servidor; o endpoint apresenta certificado e negocia chaves. Se a validação falhar, a operação termina antes de existir requisição HTTP útil para o gateway."
  },
  {
    "kind": "paragraph",
    "text": "Com o canal estabelecido, o cliente envia método, caminho, headers e corpo. Um componente de borda pode receber a conexão, aplicar regras de firewall de aplicação, limitar tamanho e encaminhar a mensagem. O API Gateway seleciona a API publicada com base em host, path, método e configuração. Políticas podem validar certificado cliente, token, escopos, schema e limites de consumo."
  },
  {
    "kind": "paragraph",
    "text": "Se a requisição for aceita, o gateway determina o backend, constrói ou reutiliza uma conexão e envia uma mensagem upstream. O backend executa autenticação complementar ou autorização de domínio, consulta dependências e produz resposta. O gateway recebe essa resposta, pode transformá-la, remover headers internos, registrar métricas e devolvê-la ao consumidor."
  },
  {
    "kind": "paragraph",
    "text": "A resposta percorre conexões independentes. O backend não necessariamente conhece o endereço original do cliente, e o cliente não conhece o endereço do backend. Headers controlados podem propagar correlation IDs, identidade técnica e informações de origem. Cada salto deve possuir contratos claros para evitar spoofing, perda de contexto e exposição de detalhes internos."
  },
  {
    "kind": "paragraph",
    "text": "Em caso de falha, o componente que detecta o problema pode gerar a resposta. Um 401 pode ser produzido pela política do gateway sem chamar o backend. Um 502 pode ser produzido porque a conexão upstream falhou. Um 500 pode vir do backend e apenas atravessar o gateway. Identificar o emissor real é uma das habilidades centrais de troubleshooting."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jornada-requisicao-api.svg",
    "alt": "Etapas de uma chamada HTTPS do cliente aos dados",
    "caption": "Figura 4 - Principais componentes na jornada ponta a ponta."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Sequência detalhada"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "A aplicação monta a URI, os headers, o conteúdo e suas configurações de timeout.",
      "O host é resolvido por DNS; o cliente escolhe um endereço retornado.",
      "A rota e as regras de rede permitem ou impedem a chegada ao endpoint.",
      "A conexão TCP ou QUIC é estabelecida.",
      "TLS negocia parâmetros, valida certificados e cria chaves de sessão.",
      "A borda recebe a requisição e pode aplicar proteção inicial.",
      "O gateway identifica a API e executa políticas de entrada.",
      "Credenciais são validadas localmente ou com sistemas de identidade.",
      "O gateway seleciona o upstream e encaminha a requisição.",
      "O backend executa regras de negócio e acessa dependências.",
      "A resposta retorna ao gateway, que aplica políticas de saída.",
      "Métricas, logs e traces são registrados; a resposta retorna ao cliente."
    ]
  },
  {
    "kind": "subhead",
    "text": "Pergunta operacional"
  },
  {
    "kind": "paragraph",
    "text": "Em qual dessas etapas a chamada parou? Essa pergunta é mais útil do que \"a API está fora?\" porque transforma um sintoma amplo em hipóteses verificáveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.17 Troubleshooting orientado por camadas",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting eficiente começa com evidências, não com alterações. Registre horário com fuso, endpoint, consumidor, método, correlation ID, código, duração e mensagem completa. Compare uma chamada que falha com outra que funciona. Mudanças recentes em DNS, certificado, rota, política, backend ou credencial ajudam a priorizar hipóteses, mas não substituem a validação."
  },
  {
    "kind": "paragraph",
    "text": "A investigação pode seguir de baixo para cima. Primeiro, o nome resolve para o endereço esperado? Segundo, existe conectividade até a porta? Terceiro, o handshake TLS conclui e o certificado é válido? Quarto, a requisição HTTP chega ao gateway? Quinto, qual política ou rota é selecionada? Sexto, o upstream responde? Sétimo, a regra de negócio conclui? Essa ordem evita analisar payload quando a conexão nem existe."
  },
  {
    "kind": "paragraph",
    "text": "Também é necessário observar timeouts em cadeia. O timeout do consumidor deve ser coerente com o timeout da borda, do gateway e do backend. Se o gateway aguarda 60 segundos, mas o balanceador encerra em 30, o limite efetivo é 30. Retry automático pode multiplicar carga e transformar lentidão em indisponibilidade. Timeouts, retries e circuit breakers precisam ser projetados em conjunto."
  },
  {
    "kind": "paragraph",
    "text": "Logs devem permitir correlação entre hops. Um correlation ID estável facilita seguir a transação, enquanto trace IDs e spans mostram dependências e duração. Cuidado com dados sensíveis: tokens, certificados privados, senhas e payloads pessoais não devem ser registrados indiscriminadamente. Observabilidade precisa equilibrar diagnóstico, segurança, privacidade e custo."
  },
  {
    "kind": "paragraph",
    "text": "O gateway oferece um ponto privilegiado de observação, mas não enxerga tudo. Se o handshake TLS falha antes do listener, pode não existir log de política. Se o backend aceita a conexão e trava internamente, o gateway observa apenas timeout. Se o cliente cancela a requisição, o backend pode continuar processando. A interpretação exige combinar fontes."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Matriz inicial de troubleshooting.",
    "headers": [
      "Camada/etapa",
      "Teste ou evidência",
      "Falhas comuns"
    ],
    "rows": [
      [
        "DNS",
        "nslookup/dig, cache, registro esperado",
        "NXDOMAIN, IP antigo, split DNS"
      ],
      [
        "Rede",
        "rota, firewall, conexão à porta",
        "timeout, reset, conexão recusada"
      ],
      [
        "TLS",
        "openssl/curl -v, cadeia e nome",
        "CA desconhecida, expirado, mismatch"
      ],
      [
        "HTTP",
        "método, path, headers, tamanho",
        "400, 404, 405, 413"
      ],
      [
        "Gateway",
        "trace de política, API selecionada",
        "401, 403, 429, rota incorreta"
      ],
      [
        "Upstream",
        "pool, health check, conexão backend",
        "502, 503, 504"
      ],
      [
        "Aplicação",
        "logs, trace, banco e dependências",
        "500, lentidão, regra de negócio"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Prática recomendada"
  },
  {
    "kind": "paragraph",
    "text": "Antes de reiniciar um componente, preserve evidências. Reinícios podem aliviar sintomas e apagar estado útil para a análise. Em ambientes críticos, siga procedimentos de incidente, mudança e comunicação definidos pela organização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.18 Aplicação em ambientes corporativos e bancários",
    "id": "pratica"
  },
  {
    "kind": "paragraph",
    "text": "Instituições financeiras operam APIs com requisitos elevados de confidencialidade, integridade, disponibilidade, rastreabilidade e segregação. Uma chamada pode atravessar internet pública, redes privadas, zonas de segurança, múltiplos gateways, provedores de identidade, sistemas legados e plataformas em nuvem. Cada fronteira acrescenta controles e também complexidade operacional."
  },
  {
    "kind": "paragraph",
    "text": "mTLS é frequentemente utilizado para autenticar participantes técnicos e estabelecer confiança entre organizações ou camadas internas. OAuth 2.0 e tokens podem representar autorização delegada, escopos e contexto do cliente. O uso conjunto não é redundância simples: mTLS protege e autentica o canal/participante técnico, enquanto tokens podem transportar autorização de aplicação e consentimento conforme o ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "Gateways corporativos aplicam padrões comuns e evitam que cada backend implemente de forma diferente validação de certificados, rate limiting, quotas e logging. Entretanto, políticas devem ser versionadas, testadas e observadas como software. Uma mudança em truststore, algoritmo, timeout ou transformação pode afetar muitas APIs ao mesmo tempo."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas híbridas podem utilizar um gateway on-premises e outro em cloud. Uma requisição pode passar por Axway na borda corporativa e Azure APIM próximo a serviços em Azure, ou o caminho inverso conforme o desenho. Nesses casos, é essencial definir qual camada autentica, qual autoriza, quais headers podem atravessar, onde TLS termina e como IDs de correlação são preservados."
  },
  {
    "kind": "paragraph",
    "text": "Risco de API não se limita a ataques externos. Configuração incorreta, inventário incompleto, credenciais excessivas, dependências inseguras e consumo de APIs de terceiros podem expor dados e operações. O OWASP API Security Top 10 e o NIST SP 800-228 oferecem estruturas para estudar vulnerabilidades e controles em fases de pré-runtime e runtime."
  },
  {
    "kind": "paragraph",
    "text": "O conhecimento das camadas também melhora comunicação entre equipes. Em vez de atribuir genericamente uma falha ao gateway, redes pode confirmar caminho e firewall; segurança pode validar certificados e trust; identidade pode analisar token; plataforma pode verificar policy e upstream; aplicação pode investigar regra de negócio. Um vocabulário comum reduz o tempo de resolução."
  },
  {
    "kind": "subhead",
    "text": "Cenário bancário simplificado"
  },
  {
    "kind": "paragraph",
    "text": "Parceiro apresenta certificado mTLS ao gateway. O gateway valida cadeia, validade e identidade cadastrada. Em seguida, valida o access token e seus escopos. O backend ainda verifica autorização sobre o recurso solicitado. Logs registram a transação sem gravar segredos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "APIs dependem de uma cadeia formada por DNS, rede, transporte, TLS, HTTP, gateway e"
    ]
  },
  {
    "kind": "paragraph",
    "text": "backend."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Internet, Web, HTTP, API e REST são conceitos relacionados, porém distintos.",
      "IETF e RFC Editor definem e publicam muitos protocolos; fabricantes documentam suas"
    ]
  },
  {
    "kind": "paragraph",
    "text": "implementações."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Encapsulamento separa responsabilidades e permite que camadas evoluam de forma"
    ]
  },
  {
    "kind": "paragraph",
    "text": "relativamente independente."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "DNS associa nomes a informações de resolução; IP trata endereçamento e roteamento; TCP"
    ]
  },
  {
    "kind": "paragraph",
    "text": "fornece fluxo confiável; TLS protege o canal; HTTP define mensagens e semântica de aplicação."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Um API Gateway é o data plane que aplica políticas e encaminha tráfego; API Management"
    ]
  },
  {
    "kind": "paragraph",
    "text": "abrange um ciclo de vida mais amplo."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Conexões cliente-gateway e gateway-backend são independentes e podem ter certificados,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "timeouts e falhas diferentes."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Troubleshooting por camadas começa com evidências e identifica a etapa exata em que a"
    ]
  },
  {
    "kind": "paragraph",
    "text": "transação parou."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Questões de revisão",
    "id": "questoes"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explique por que Internet e Web não são sinônimos.",
      "Qual é a diferença entre uma API e uma API REST?",
      "Por que a documentação do fabricante não substitui uma RFC?",
      "O que ocorre durante encapsulamento e desencapsulamento?",
      "Como o modelo de camadas ajuda a investigar falhas?",
      "Qual é a diferença entre roteamento IP e roteamento de API?",
      "Como TTL de DNS influencia migrações e failover?",
      "Por que uma conexão recusada e um timeout sugerem hipóteses diferentes?",
      "Qual é a diferença entre a conexão cliente-gateway e gateway-backend?",
      "O que TLS protege e o que ele não resolve sozinho?",
      "Por que mTLS e OAuth podem ser usados em conjunto?",
      "Como interpretar um código HTTP produzido pelo gateway em vez do backend?",
      "Quais responsabilidades são adequadas ao gateway e quais devem permanecer no backend?",
      "Como timeouts desalinhados entre componentes afetam uma chamada?",
      "Descreva, em ordem, a jornada completa de uma requisição HTTPS."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudos de caso",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Certificado trocado durante migração"
  },
  {
    "kind": "paragraph",
    "text": "Uma equipe altera o CNAME de api.exemplo.com para um novo balanceador. Alguns consumidores acessam normalmente, enquanto outros recebem erro de hostname ou cadeia não confiável. O DNS parece correto nos testes da equipe responsável."
  },
  {
    "kind": "paragraph",
    "text": "Analise as possíveis causas considerando cache DNS, split-horizon, SNI, certificado apresentado pelo novo endpoint, cadeia intermediária e truststores diferentes. Liste as evidências que você coletaria antes de alterar novamente o DNS."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - 504 intermitente"
  },
  {
    "kind": "paragraph",
    "text": "Uma API apresenta 504 em horários de pico. O backend registra parte das operações concluídas após 40 segundos, mas o gateway possui timeout de 30 segundos. O cliente realiza duas tentativas automáticas."
  },
  {
    "kind": "paragraph",
    "text": "Explique como timeout e retry podem aumentar carga e produzir operações duplicadas. Proponha um conjunto de análises envolvendo latência, idempotência, capacidade, limite do gateway e comportamento do consumidor."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - 401 apenas em um ambiente"
  },
  {
    "kind": "paragraph",
    "text": "O mesmo token funciona em homologação, mas recebe 401 em produção. O formato do token parece correto e a API possui o mesmo path nos dois ambientes."
  },
  {
    "kind": "paragraph",
    "text": "Investigue diferenças possíveis de issuer, audience, chave de assinatura, relógio, escopo, policy, cadeia mTLS e produto de API. Explique quais dados podem ser registrados com segurança para comparar as duas execuções."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário essencial",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Termo",
      "Definição no contexto do capítulo"
    ],
    "rows": [
      [
        "API",
        "Interface que define como softwares podem utilizar capacidades oferecidas por outro componente."
      ],
      [
        "API Gateway",
        "Intermediário especializado que recebe, protege, medeia e encaminha chamadas de API."
      ],
      [
        "Backend/Upstream",
        "Serviço de destino para o qual o gateway encaminha a requisição."
      ],
      [
        "DNS",
        "Sistema distribuído de nomes utilizado para resolver nomes e outros dados associados."
      ],
      [
        "Encapsulamento",
        "Processo em que cada camada acrescenta informações de controle aos dados."
      ],
      [
        "Endpoint",
        "Ponto de comunicação identificado por informações como esquema, host, porta e caminho."
      ],
      [
        "HTTP",
        "Protocolo de aplicação com modelo de requisição e resposta e semântica padronizada."
      ],
      [
        "IP",
        "Protocolo responsável por endereçamento e encaminhamento de datagramas entre redes."
      ],
      [
        "mTLS",
        "TLS com autenticação do cliente por certificado, além da autenticação do servidor."
      ],
      [
        "Proxy reverso",
        "Intermediário que recebe requisições em nome de servidores internos."
      ],
      [
        "REST",
        "Estilo arquitetural para sistemas hipermídia distribuídos."
      ],
      [
        "RFC",
        "Documento publicado na série Request for Comments, que pode registrar padrões, práticas ou informação."
      ],
      [
        "Socket",
        "Abstração do sistema operacional usada por aplicações para comunicação em rede."
      ],
      [
        "TCP",
        "Protocolo de transporte que oferece fluxo confiável e ordenado de bytes."
      ],
      [
        "TLS",
        "Protocolo que protege comunicações e estabelece confiança criptográfica."
      ],
      [
        "URI",
        "Identificador compacto de um recurso abstrato ou físico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências oficiais e leituras recomendadas",
    "id": "referencias"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "IETF - About RFCs. https://www.ietf.org/process/rfcs/ - Visão geral do papel das RFCs e do processo da IETF.",
      "RFC Editor. https://www.rfc-editor.org/ - Pesquisa e status de RFCs.",
      "RFC 9293 - Transmission Control Protocol. https://www.rfc-editor.org/rfc/rfc9293 - Especificação consolidada do TCP.",
      "RFC 8200 - IPv6 Specification. https://www.rfc-editor.org/rfc/rfc8200 - Especificação do IPv6.",
      "RFC 1034 - DNS Concepts and Facilities. https://www.rfc-editor.org/rfc/rfc1034 - Fundamentos conceituais do DNS.",
      "RFC 1035 - DNS Implementation and Specification. https://www.rfc-editor.org/rfc/rfc1035 - Formato e funcionamento do DNS.",
      "RFC 3986 - URI Generic Syntax. https://www.rfc-editor.org/rfc/rfc3986 - Sintaxe genérica de URI.",
      "RFC 9110 - HTTP Semantics. https://www.rfc-editor.org/rfc/rfc9110 - Semântica moderna de HTTP.",
      "RFC 9112 - HTTP/1.1. https://www.rfc-editor.org/rfc/rfc9112 - Mensagens e conexões HTTP/1.1.",
      "RFC 9113 - HTTP/2. https://www.rfc-editor.org/rfc/rfc9113 - Especificação do HTTP/2.",
      "RFC 9114 - HTTP/3. https://www.rfc-editor.org/rfc/rfc9114 - Especificação do HTTP/3.",
      "RFC 8446 - TLS 1.3. https://www.rfc-editor.org/rfc/rfc8446 - Especificação do TLS 1.3.",
      "Roy Fielding - REST Architectural Style. https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm - Capítulo da dissertação que descreve REST.",
      "NIST SP 800-228. https://csrc.nist.gov/pubs/sp/800/228/final - Diretrizes de proteção de APIs em sistemas cloud-native.",
      "OWASP API Security Project. https://owasp.org/www-project-api-security/ - Riscos e materiais de segurança de APIs.",
      "Microsoft - Azure API Management concepts. https://learn.microsoft.com/azure/api-management/api-management-key-concepts - Conceitos e componentes do Azure API Management.",
      "Microsoft - API Management gateway overview. https://learn.microsoft.com/azure/api-management/api-management-gateways-overview - Papel do gateway no data plane.",
      "Axway - Introduction to API Gateway. https://docs.axway.com/bundle/axway-open-docs/page/docs/api_mgmt_overview/api_mgmt_components/apigateway/index.html - Visão geral oficial do Axway API Gateway."
    ]
  }
];
