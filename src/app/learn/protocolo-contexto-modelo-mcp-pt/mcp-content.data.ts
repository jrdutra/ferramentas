import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MCP_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "O que é o Model Context Protocol (MCP)?",
    "id": "o-que-e-o-model-context-protocol-mcp"
  },
  {
    "kind": "paragraph",
    "text": "Um guia completo para servidores MCP, arquitetura, segurança e integração de agentes de IA"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Tipo de artigo",
      "Aprofundamento técnico"
    ],
    "rows": [
      [
        "Data da pesquisa",
        "23 de julho de 2026"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "SELEÇÃO DE TÍTULOS FOCADOS EM SEO"
  },
  {
    "kind": "paragraph",
    "text": "O título leva à consulta informativa dominante - \"O que é Model Context Protocol (MCP)?\" - e inclui termos de suporte de alta intenção, como servidores MCP, arquitetura, segurança, agentes de IA e integração."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Sumário executivo",
    "id": "sumario-executivo"
  },
  {
    "kind": "paragraph",
    "text": "Grandes modelos de linguagem são raciocinadores impressionantes, mas o raciocínio por si só não lhes dá acesso confiável a documentos, bancos de dados, sistemas de software ou ações de negócios atuais. O Model Context Protocol, geralmente abreviado para MCP, é um protocolo aberto projetado para padronizar a conexão ausente. Ele oferece aos aplicativos de IA uma maneira consistente de descobrir e usar ferramentas externas, ler recursos contextuais e oferecer fluxos de trabalho de prompt reutilizáveis."
  },
  {
    "kind": "paragraph",
    "text": "A ideia central é simples: em vez de escrever um conector personalizado diferente para cada combinação de assistente de IA e serviço externo, os desenvolvedores podem expor recursos por meio de um servidor MCP. Qualquer host AI compatível pode então criar uma conexão de cliente MCP com esse servidor. Isto reduz a duplicação de integração, incentiva a interoperabilidade e torna os sistemas de IA conectados mais fáceis de testar, governar e evoluir."
  },
  {
    "kind": "paragraph",
    "text": "O MCP não é um modelo, uma estrutura de agente, um banco de dados ou um substituto para APIs. É um contrato de interface entre aplicações de IA e capacidades externas. Seu valor fica mais claro quando a mesma ferramenta ou fonte de conhecimento deve funcionar em vários assistentes, IDEs, plataformas de agentes ou ambientes corporativos."
  },
  {
    "kind": "subhead",
    "text": "Principais conclusões"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "O MCP padroniza como os aplicativos de IA se conectam a ferramentas externas, fontes de dados e fluxos de trabalho reutilizáveis.",
      "A arquitetura separa o host, uma conexão de cliente MCP e um servidor MCP que expõe recursos.",
      "Os servidores expõem principalmente três primitivos: ferramentas, recursos e prompts.",
      "O protocolo usa mensagens JSON-RPC e oferece suporte a conexões stdio locais e conexões HTTP Streamable remotas.",
      "O MCP melhora a portabilidade, mas não resolve automaticamente a autorização, a injeção de prompt, o vazamento de dados ou a execução insegura de ferramentas.",
      "Os designs de produção mais fortes combinam privilégios mínimos, aprovação explícita do usuário, validação de esquema, isolamento, observabilidade e decisões cuidadosas de confiança no servidor."
    ]
  },
  {
    "kind": "subhead",
    "text": "Conteúdo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "1. Introdução: Dos Chatbots aos Sistemas de IA Conectados",
      "2. Uma Breve História do MCP",
      "3. O que é MCP – e o que não é",
      "4. O problema que o MCP resolve",
      "5. Arquitetura MCP: Host, Cliente e Servidor",
      "6. A camada de protocolo: JSON-RPC, ciclo de vida e recursos",
      "7. Os Três Primitivos do Servidor Central",
      "8. Capacidades do lado do cliente",
      "9. Transportes Locais e Remotos",
      "10. Autorização e Identidade",
      "11. MCP comparado com APIs, chamadas de função, RAG e protocolos de agente",
      "12. Riscos de segurança e design defensivo",
      "13. Exemplo prático de Python: um pequeno servidor MCP",
      "14. Casos de uso do mundo real",
      "15. Princípios de Design para Servidores MCP de Produção",
      "16. Limitações, compensações e equívocos comuns",
      "17. O futuro do MCP e o seu impacto social mais amplo",
      "18. Conclusão",
      "Glossário e Referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1. Introdução: Dos Chatbots aos Sistemas de IA Conectados",
    "id": "1-introducao-dos-chatbots-aos-sistemas-de-ia-conectados"
  },
  {
    "kind": "paragraph",
    "text": "A primeira onda de IA generativa ensinou o público a pensar num modelo de linguagem como uma máquina de conversação: faça uma pergunta e receba uma resposta. A próxima onda é mais ambiciosa. Em vez de apenas descrever o que deve ser feito, um sistema de IA pode pesquisar uma base de conhecimento interna, inspecionar um repositório de código, consultar um banco de dados ativo, criar um ticket de suporte, atualizar um plano de projeto ou acionar um fluxo de trabalho controlado."
  },
  {
    "kind": "paragraph",
    "text": "Essa transição muda o problema de engenharia. Um modelo pode gerar texto sem tocar em outro sistema, mas um agente de IA útil precisa de contexto, permissões, interfaces e uma maneira confiável de chamar software. Antes de existir uma interface padrão, cada conexão era normalmente personalizada: uma integração para um assistente e um sistema de arquivos, outra para um IDE e GitHub, outra para um bot de suporte e uma plataforma de tickets. À medida que o número de aplicações de IA e sistemas externos cresceu, a matriz de integração tornou-se cara e frágil."
  },
  {
    "kind": "paragraph",
    "text": "O MCP aborda esse problema no nível do protocolo. Ele define uma linguagem comum por meio da qual um aplicativo de IA pode perguntar: “Quais recursos você oferece?”, receber descrições estruturadas, invocar uma operação permitida e incorporar o resultado na conversa em andamento. A documentação oficial compara o papel do MCP a um conector universal para aplicações de IA – uma analogia útil porque o protocolo tem menos a ver com inteligência em si e mais com interoperabilidade. [2]"
  },
  {
    "kind": "subhead",
    "text": "A PERGUNTA QUE IMPORTA"
  },
  {
    "kind": "paragraph",
    "text": "O que acontece quando um modelo de IA deixa de ser isolado do mundo e passa a operar por meio de ferramentas reais? O MCP é uma resposta, mas a qualidade e a segurança dessa resposta dependem da arquitetura, das permissões e da supervisão humana."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2. Uma Breve História do MCP",
    "id": "2-uma-breve-historia-do-mcp"
  },
  {
    "kind": "paragraph",
    "text": "O MCP emergiu de um gargalo prático no desenvolvimento de assistentes de IA. A qualidade dos modelos estava melhorando rapidamente, mas os modelos permaneciam separados dos dados e sistemas que tornavam suas respostas úteis dentro de organizações reais. A Anthropic apresentou publicamente e abriu o código-fonte do Model Context Protocol em 25 de novembro de 2024, descrevendo-o como um padrão para conectar assistentes de IA a repositórios de conteúdo, ferramentas de negócios e ambientes de desenvolvimento. [1]"
  },
  {
    "kind": "paragraph",
    "text": "A versão inicial incluía uma especificação, kits de desenvolvimento de software, suporte de servidor local e implementações de servidor de referência. A promessa arquitetônica importante era que um desenvolvedor pudesse expor um recurso uma vez como um servidor MCP e disponibilizá-lo para vários clientes compatíveis, em vez de reconstruir a integração para cada produto de IA."
  },
  {
    "kind": "table",
    "caption": "Uma linha do tempo condensada",
    "headers": [
      "Período",
      "Desenvolvimento",
      "Por que isso importava"
    ],
    "rows": [
      [
        "Antes do final de 2024",
        "As integrações de ferramentas de IA eram comumente criadas como plug-ins específicos de produtos, esquemas de funções personalizadas ou adaptadores de estrutura.",
        "Útil, mas duplicado entre fornecedores e difícil de reutilizar."
      ],
      [
        "25 de novembro de 2024",
        "Anthropic introduzido e MCP de código aberto.",
        "Criou um protocolo público e vocabulário compartilhado para conexões de IA ao sistema."
      ],
      [
        "2025",
        "Suporte expandido para assistentes de IA, ferramentas de desenvolvimento, estruturas e provedores de infraestrutura. OpenAI adicionou suporte de servidor MCP remoto à API Responses em maio de 2025.",
        "O MCP foi além de um experimento de fornecedor único e tornou-se uma camada de interoperabilidade mais ampla."
      ],
      [
        "Dezembro de 2025",
        "A Anthropic doou o MCP para a Agentic AI Foundation da Linux Foundation.",
        "A administração neutra fortaleceu a posição do protocolo como um padrão de ecossistema aberto."
      ],
      [
        "2026",
        "O ecossistema se expandiu em direção a interfaces mais ricas, governança de produção e ofertas de servidores corporativos.",
        "O MCP tornou-se cada vez mais um limite de plataforma, não apenas um formato de conector."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "A OpenAI anunciou suporte para servidores MCP remotos em sua API de respostas em maio de 2025 e declarou que havia se juntado aos esforços de orientação do MCP. Mais tarde naquele ano, a Anthropic doou o projeto para a Agentic AI Foundation da Linux Foundation, uma medida destinada a preservar a governança aberta e neutra em relação ao fornecedor. [9]"
  },
  {
    "kind": "paragraph",
    "text": "O padrão histórico assemelha-se aos padrões de infraestrutura anteriores: primeiro, uma dolorosa coleção de integrações pontuais; depois, um protocolo compartilhado; finalmente, um ecossistema de ferramentas, práticas de segurança, registros, gateways e serviços gerenciados. O MCP ainda está evoluindo, mas sua direção é clara: seu objetivo é tornar a integração de capacidades de IA portátil o suficiente para se tornar uma infraestrutura. [10]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3. O que é MCP – e o que não é",
    "id": "3-o-que-e-mcp-e-o-que-nao-e"
  },
  {
    "kind": "paragraph",
    "text": "O Model Context Protocol é um protocolo aberto para conectar aplicativos de modelo de linguagem grande a fontes de dados externas e ferramentas executáveis. A especificação oficial define os requisitos para clientes e servidores, enquanto SDKs específicos de linguagem implementam grande parte do tratamento de mensagens de nível inferior. [3]"
  },
  {
    "kind": "subhead",
    "text": "Uma definição precisa"
  },
  {
    "kind": "paragraph",
    "text": "MCP é uma interface de tempo de execução padronizada que permite que um host de IA descubra recursos contextuais, prompts reutilizáveis ​​e ferramentas executáveis ​​expostas por um ou mais servidores. Ele também define a negociação do ciclo de vida, esquemas de mensagens, transportes, notificações e comportamento de autorização opcional."
  },
  {
    "kind": "subhead",
    "text": "O MCP não é..."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Um LLM: MCP conecta modelos a capacidades; não gera linguagem nem realiza raciocínio por si só.",
      "Uma estrutura de agente: não prescreve loops de planejamento, estratégias de memória, reflexão ou orquestração multiagente.",
      "Um substituto para REST, GraphQL, bancos de dados ou corretores de mensagens: os servidores MCP geralmente encapsulam esses sistemas existentes.",
      "Uma garantia de segurança: o protocolo fornece estrutura, mas a implantação segura ainda requer fortes controles de engenharia.",
      "Um modelo semântico universal: dois servidores podem expor ferramentas semelhantes com nomes, descrições e esquemas diferentes.",
      "Uma promessa de que cada cliente oferece suporte a todos os recursos: as implementações negociam recursos e os clientes podem apresentar ferramentas ou aprovações de maneira diferente."
    ]
  },
  {
    "kind": "subhead",
    "text": "UM MODELO MENTAL ÚTIL"
  },
  {
    "kind": "paragraph",
    "text": "Uma API descreve como o software pode acessar um serviço. O MCP descreve como um aplicativo de IA pode descobrir e usar recursos de um serviço em um fluxo de trabalho conversacional com reconhecimento de modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4. O problema que o MCP resolve",
    "id": "4-o-problema-que-o-mcp-resolve"
  },
  {
    "kind": "paragraph",
    "text": "O problema central às vezes é chamado de problema de integração N por M. Imagine aplicações N AI e sistemas empresariais M. Sem um protocolo compartilhado, as equipes podem precisar de um adaptador personalizado para cada emparelhamento relevante. Mesmo quando os conectores compartilham lógica semelhante, a autenticação, os esquemas, o tratamento de erros, a implantação e a aprovação do usuário são implementados repetidamente."
  },
  {
    "kind": "paragraph",
    "text": "O MCP reduz essa repetição colocando um limite de protocolo estável em torno dos recursos. Um servidor é dono da integração com o sistema externo. Um host é dono da experiência do usuário, da interação do modelo, do fluxo de aprovação e do gerenciamento de contexto. A conexão do cliente MCP é transferida entre esses dois lados usando um contrato compartilhado."
  },
  {
    "kind": "subhead",
    "text": "Por que a palavra “contexto” é importante"
  },
  {
    "kind": "paragraph",
    "text": "Um modelo responde com base no que aparece em seu contexto de entrada atual e no que aprendeu durante o treinamento. As organizações reais, no entanto, dependem de informações privadas, dinâmicas e grandes demais para serem colocadas permanentemente em um prompt. Os recursos e ferramentas do MCP permitem que o host recupere apenas o que é necessário no momento e, em seguida, alimente o resultado ao modelo."
  },
  {
    "kind": "paragraph",
    "text": "Isto pode melhorar a relevância e reduzir o inchaço do contexto, mas o MCP não decide quais informações são verdadeiramente relevantes. A qualidade da recuperação, as descrições das ferramentas, o comportamento do modelo e as políticas de aplicação ainda determinam se o contexto correto chega ao modelo."
  },
  {
    "kind": "subhead",
    "text": "De respostas somente leitura a ações controladas"
  },
  {
    "kind": "paragraph",
    "text": "O segundo problema é a ação. Ler um documento de política é diferente de alterar um registro de cliente. As ferramentas MCP podem representar tanto a recuperação como a mutação, mas os sistemas de produção devem tratá-las de forma diferente. As operações de leitura muitas vezes podem ser automáticas dentro de um escopo permitido; as operações de gravação podem exigir confirmação, autorização mais forte, registros de auditoria, chaves de idempotência ou aprovação em várias etapas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "5. Arquitetura MCP: Host, Cliente e Servidor",
    "id": "5-arquitetura-mcp-host-cliente-e-servidor"
  },
  {
    "kind": "paragraph",
    "text": "O MCP segue uma arquitetura cliente-servidor, mas sua terminologia é mais específica do que uma aplicação web convencional. O host é o aplicativo de IA que interage com o usuário e coordena o comportamento do modelo. Para cada conexão de servidor, o host cria um componente cliente MCP. O servidor MCP expõe capacidades e se comunica com esse cliente. [2]"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Participante",
      "Responsabilidade primária",
      "Exemplos típicos"
    ],
    "rows": [
      [
        "Anfitrião MCP",
        "Executa a experiência de IA, seleciona o modelo, gerencia o contexto, apresenta aprovações e coordena uma ou mais conexões de cliente.",
        "Assistente de IA, IDE, agente de desktop, copiloto empresarial."
      ],
      [
        "Cliente MCP",
        "Mantém uma sessão de protocolo dedicada com um servidor MCP e traduz solicitações de host em mensagens MCP.",
        "Um objeto de conexão dentro do aplicativo host."
      ],
      [
        "Servidor MCP",
        "Expõe ferramentas, recursos e prompts apoiados por um programa local ou serviço remoto.",
        "Conector de sistema de arquivos, gateway de banco de dados, integração de tickets, servidor de gerenciamento em nuvem."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Um host, muitos servidores"
  },
  {
    "kind": "paragraph",
    "text": "Um único host pode conectar-se a vários servidores MCP ao mesmo tempo. Por exemplo, um assistente de engenharia pode se conectar a um servidor Git, um rastreador de problemas, uma plataforma de observabilidade e um repositório de arquitetura interna. O host continua responsável por decidir como a lista de capacidades combinadas será mostrada ao modelo e ao usuário."
  },
  {
    "kind": "paragraph",
    "text": "O relacionamento de um cliente por servidor cria limites de isolamento. Credenciais, sessões e falhas podem ser separadas por conexão. Isso também significa que o host deve lidar com conflitos de nomenclatura, seleção de ferramentas, latência e o risco de um servidor não confiável influenciar o comportamento envolvendo outro servidor."
  },
  {
    "kind": "subhead",
    "text": "Duas camadas de protocolo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Camada de dados: mensagens JSON-RPC, negociação do ciclo de vida, ferramentas, recursos, prompts, recursos do cliente, notificações, progresso e erros.",
      "Camada de transporte: o canal que move essas mensagens, incluindo stdio local e HTTP Streamable remoto."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Essa separação é importante porque a mesma ferramenta conceitual pode funcionar em um processo local ou em um terminal de rede remoto sem alterar a primitiva do MCP de alto nível. O transporte altera os requisitos de implantação e segurança, e não o significado da ferramenta em si. [2]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "6. A camada de protocolo: JSON-RPC, ciclo de vida e recursos",
    "id": "6-a-camada-de-protocolo-json-rpc-ciclo-de-vida-e-recursos"
  },
  {
    "kind": "paragraph",
    "text": "O MCP usa JSON-RPC 2.0 como formato de mensagem base. JSON-RPC define solicitações, respostas, notificações, nomes de métodos, identificadores, parâmetros, resultados e objetos de erro. O MCP adiciona métodos e esquemas específicos de domínio sobre essa base. [2]"
  },
  {
    "kind": "subhead",
    "text": "Solicitações, respostas e notificações"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Solicitação: solicita ao outro participante que realize uma operação e inclui um identificador para que a resposta possa ser correlacionada.",
      "Resposta: retorna um resultado ou erro estruturado para uma solicitação.",
      "Notificação: comunica um evento sem esperar uma resposta, como um sinal de mudança de lista ou atualização de progresso."
    ]
  },
  {
    "kind": "subhead",
    "text": "O ciclo de vida da conexão"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Inicialização: o cliente propõe uma versão do protocolo e declara os recursos suportados.",
      "Negociação: o servidor retorna sua versão selecionada, informações de implementação e capacidades.",
      "Estado inicializado: o cliente sinaliza que as operações normais do protocolo podem começar.",
      "Operação: o cliente lista e invoca primitivas; qualquer um dos lados pode enviar notificações ou solicitações suportadas.",
      "Encerramento: a conexão ou sessão é encerrada de acordo com o ciclo de vida do transporte e do host."
    ]
  },
  {
    "kind": "paragraph",
    "text": "A negociação de capacidade evita que qualquer um dos lados presuma que existe um recurso opcional. Um servidor pode oferecer ferramentas, mas não prompts. Um host pode apoiar a amostragem, mas não a elicitação. Implementações robustas baseiam-se em capacidades negociadas, em vez de depender de suposições otimistas."
  },
  {
    "kind": "subhead",
    "text": "Descoberta dinâmica"
  },
  {
    "kind": "paragraph",
    "text": "O protocolo é projetado para descoberta. Um cliente pode solicitar uma lista de ferramentas, recursos ou prompts e inspecionar metadados estruturados antes de usá-los. Os servidores também podem notificar os clientes de que uma lista foi alterada. Isso é mais flexível do que codificar todos os recursos no host, mas levanta uma questão de governança: todos os recursos recentemente anunciados deveriam ficar imediatamente disponíveis para o modelo? Em ambientes de alta confiança, a resposta pode ser sim. Em ambientes confidenciais, os recursos novos ou alterados devem ser revisados, filtrados ou verificados primeiro por políticas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "7. Os Três Primitivos do Servidor Central",
    "id": "7-os-tres-primitivos-do-servidor-central"
  },
  {
    "kind": "paragraph",
    "text": "Os conceitos mais importantes do MCP são os três primitivos que os servidores expõem: ferramentas, recursos e prompts. Eles não são intercambiáveis. Cada um tem um modelo de controle diferente e deve ser projetado para um tipo diferente de interação. [2]"
  },
  {
    "kind": "subhead",
    "text": "7.1 Ferramentas: funções invocadas por modelo"
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas são funções executáveis ​​expostas ao modelo através do host. Uma ferramenta possui um nome, uma descrição, um esquema de entrada e um resultado. Os exemplos incluem consultar um banco de dados, criar um ticket, calcular um preço, ler um status de implantação ou gravar um arquivo. Na hierarquia de controle oficial, as ferramentas são controladas pelo modelo: o modelo pode decidir que uma ferramenta é útil enquanto responde ao usuário. [3]"
  },
  {
    "kind": "paragraph",
    "text": "O design da ferramenta afeta fortemente o comportamento do modelo. Uma descrição vaga como “gerenciar dados” é difícil de usar com segurança. Uma ferramenta precisa como \"get_invoice_status(invoice_id)\" fornece ao modelo um limite de decisão mais estreito. Os esquemas de entrada devem rejeitar formas inválidas e a saída deve ser estruturada o suficiente para que o host e o modelo sejam interpretados de forma confiável."
  },
  {
    "kind": "subhead",
    "text": "PRINCÍPIO DO PROJETO"
  },
  {
    "kind": "paragraph",
    "text": "Prefira ferramentas pequenas e reveladoras de intenções a uma única ferramenta irrestrita de \"executar qualquer coisa\". Ferramentas restritas são mais fáceis de autorizar, testar, auditar e explicar aos usuários."
  },
  {
    "kind": "subhead",
    "text": "7.2 Recursos: contexto gerenciado por aplicativo"
  },
  {
    "kind": "paragraph",
    "text": "Os recursos representam dados contextuais que podem ser listados e lidos. Um recurso pode ser um arquivo, esquema de banco de dados, artigo de conhecimento, histórico de repositório, configuração ou resposta de API. Os recursos são controlados pelo aplicativo: o host decide como os usuários os descobrem, selecionam, visualizam ou anexam ao contexto do modelo. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Os recursos são especialmente úteis quando o conteúdo tem uma identidade endereçável, como um URI, e quando a leitura é conceitualmente diferente da execução de uma ação. Um recurso bem projetado inclui metadados úteis – título, descrição, tipo de mídia e sinais de atualização – para que o cliente possa apresentá-los de forma inteligente."
  },
  {
    "kind": "subhead",
    "text": "7.3 Prompts: modelos de fluxo de trabalho invocados pelo usuário"
  },
  {
    "kind": "paragraph",
    "text": "Os prompts são modelos de interação parametrizados e reutilizáveis. Um prompt pode codificar um fluxo de trabalho recomendado, instruções de domínio, exemplos rápidos ou uma sequência estruturada que combina recursos e ferramentas. Os prompts são controlados pelo usuário e normalmente exigem uma seleção explícita na interface do host. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Os prompts ajudam os autores do servidor a ensinar aos usuários como obter valor de um recurso sem colocar todas as orientações de domínio nas descrições das ferramentas. Por exemplo, um servidor de segurança pode oferecer um prompt \"Revisar uma API para riscos comuns\" que solicita um documento OpenAPI, um ambiente e uma tolerância a riscos. As mensagens resultantes podem guiar o modelo através de uma análise consistente."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Primitivo",
      "Modelo de controle",
      "Melhor usado para",
      "Exemplo"
    ],
    "rows": [
      [
        "Ferramenta",
        "Controlado por modelo",
        "Ações e recuperação dinâmica",
        "create_ticket, query_orders, restart_service"
      ],
      [
        "Recurso",
        "Controlado por aplicativo",
        "Contexto endereçável e dados de referência",
        "arquivo://policy.pdf, db://schema/orders"
      ],
      [
        "Incitar",
        "Controlado pelo usuário",
        "Fluxos de trabalho reutilizáveis ​​e interações estruturadas",
        "código de revisão, liberação de plano, incidente resumido"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8. Capacidades do lado do cliente",
    "id": "8-capacidades-do-lado-do-cliente"
  },
  {
    "kind": "paragraph",
    "text": "O MCP é bidirecional. Os servidores não respondem apenas às solicitações dos clientes; também podem utilizar capacidades expostas pelo cliente, quando negociadas. Esses recursos permitem fluxos de trabalho mais ricos, mantendo o host no controle do modelo e da experiência do usuário. [2]"
  },
  {
    "kind": "subhead",
    "text": "Amostragem"
  },
  {
    "kind": "paragraph",
    "text": "A amostragem permite que um servidor solicite a conclusão de um modelo de linguagem por meio do cliente. Isso ajuda os desenvolvedores de servidores a permanecerem independentes do modelo: o servidor pode solicitar ao host que raciocine sobre as informações sem incorporar um SDK de modelo específico do fornecedor ou possuir as credenciais de modelo do usuário. O anfitrião ainda decide se e como atender à solicitação."
  },
  {
    "kind": "subhead",
    "text": "Elicitação"
  },
  {
    "kind": "paragraph",
    "text": "A elicitação permite que um servidor solicite mais informações ou confirmação do usuário por meio do host. Uma ferramenta de implantação pode precisar de um ambiente de destino; um fluxo de trabalho de compras pode precisar de confirmação antes de criar um pedido. O host deve apresentar a solicitação de forma clara e evitar transformar a elicitação em um desvio de autorização oculto."
  },
  {
    "kind": "subhead",
    "text": "Raízes e limites"
  },
  {
    "kind": "paragraph",
    "text": "As raízes podem comunicar limites do sistema de arquivos ou do espaço de trabalho que o servidor possa considerar relevantes. São úteis para ferramentas de desenvolvimento local, mas não devem ser tratados como uma caixa de areia completa. O processo do servidor ainda precisa de permissões do sistema operacional, validação de caminho e proteção contra passagem ou escapes baseados em links simbólicos."
  },
  {
    "kind": "subhead",
    "text": "Registro e progresso"
  },
  {
    "kind": "paragraph",
    "text": "Registros, notificações, cancelamentos e relatórios de progresso tornam as operações de longa duração observáveis ​​e interrompíveis. Esses detalhes podem parecer secundários, mas são essenciais para a confiabilidade da produção. Um agente de IA que pode começar a trabalhar, mas não consegue explicar o progresso, lidar com cancelamentos ou revelar erros estruturados cria uma experiência de usuário ruim e potencialmente insegura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9. Transportes Locais e Remotos",
    "id": "9-transportes-locais-e-remotos"
  },
  {
    "kind": "paragraph",
    "text": "A camada de transporte define como as mensagens MCP se movem entre o cliente e o servidor. A especificação estável descreve dois mecanismos padrão: stdio e Streamable HTTP. [4]"
  },
  {
    "kind": "subhead",
    "text": "9.1 stdio: comunicação de processo local"
  },
  {
    "kind": "paragraph",
    "text": "Com stdio, o host inicia o servidor MCP como um subprocesso. O servidor lê mensagens de protocolo da entrada padrão e grava mensagens de protocolo na saída padrão. Essa abordagem é eficiente para ferramentas locais porque evita sobrecarga de rede e permite que o host gerencie o ciclo de vida do processo do servidor."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Boa opção: acesso ao sistema de arquivos local, ferramentas de desenvolvedor, integrações de linha de comando, automações pessoais.",
      "Padrão de credencial: variáveis ​​de ambiente, configuração local ou recursos do sistema operacional em vez do fluxo de autorização HTTP.",
      "Regra crítica de implementação: as mensagens do protocolo devem ser o único conteúdo gravado na saída padrão; logs devem ir para o erro padrão ou para um arquivo."
    ]
  },
  {
    "kind": "subhead",
    "text": "9.2 HTTP streamável: serviços remotos"
  },
  {
    "kind": "paragraph",
    "text": "HTTP streamable permite servidores MCP remotos. Os clientes enviam mensagens JSON-RPC por meio de solicitações HTTP, enquanto o servidor pode retornar respostas JSON ou usar eventos enviados pelo servidor para streaming. O design oferece suporte a múltiplas conexões de cliente, mensagens de servidor para cliente, capacidade de retomada e identificadores de sessão opcionais. [4]"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Boa opção: integrações SaaS, conectores empresariais gerenciados centralmente, serviços em nuvem, ferramentas compartilhadas em toda a organização.",
      "Preocupações operacionais: autenticação, TLS, validação de origem, limitação de taxa, isolamento de locação, segurança de sessão, observabilidade e controles de saída de rede.",
      "Preocupação com compatibilidade: implementações mais antigas ainda podem usar o transporte HTTP mais SSE obsoleto, portanto, clientes e servidores podem precisar de uma estratégia de migração."
    ]
  },
  {
    "kind": "table",
    "caption": "Escolhendo um transporte",
    "headers": [
      "Pergunta",
      "Prefira stdio quando...",
      "Prefira HTTP Streamable quando..."
    ],
    "rows": [
      [
        "Onde ele funciona?",
        "O servidor é local para o usuário ou estação de trabalho.",
        "O servidor é hospedado centralmente ou acessível pela Internet."
      ],
      [
        "Quem usa?",
        "Um host normalmente possui o processo.",
        "Muitos clientes ou usuários precisam do mesmo serviço."
      ],
      [
        "Como as credenciais são tratadas?",
        "O ambiente local e as permissões de processo são suficientes.",
        "OAuth, tokens de portador, gateways e identidade com reconhecimento de locatário são necessários."
      ],
      [
        "Qual é o modelo operacional?",
        "Ciclo de vida local simples e latência mínima.",
        "Implantação escalonável, monitoramento, política e disponibilidade remota."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10. Autorização e Identidade",
    "id": "10-autorizacao-e-identidade"
  },
  {
    "kind": "paragraph",
    "text": "A autorização é opcional no nível do protocolo, mas raramente é opcional em uma implantação remota séria. A especificação de autorização MCP estável foi projetada principalmente para transportes baseados em HTTP. Para stdio, as credenciais geralmente são obtidas por meio do ambiente local, e não pelo protocolo de autorização remota. [5]"
  },
  {
    "kind": "subhead",
    "text": "Autenticação não é autorização"
  },
  {
    "kind": "paragraph",
    "text": "A autenticação responde \"Quem é este cliente ou usuário?\" A autorização responde \"O que esta identidade pode fazer?\" Um servidor que valida um token, mas ignora público, escopo, locatário, função ou propriedade de recurso não concluiu o trabalho de segurança."
  },
  {
    "kind": "subhead",
    "text": "Limites de identidade importantes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Do usuário ao host: o aplicativo de IA deve saber qual usuário está solicitando e qual organização ou locatário se aplica.",
      "Host ou cliente para servidor MCP: o servidor deve validar se as credenciais foram destinadas a ele.",
      "Servidor MCP para API downstream: o servidor pode precisar de tokens de usuário delegados, credenciais de serviço ou um fluxo em nome de.",
      "Ferramenta para objeto de negócios: a autorização ainda deve ser verificada no nível de registro, projeto, conta ou recurso."
    ]
  },
  {
    "kind": "paragraph",
    "text": "A passagem de token é especialmente perigosa. Um servidor não deve aceitar tokens arbitrários e encaminhá-los para outro serviço sem validar o público e os privilégios pretendidos. A orientação oficial de segurança alerta explicitamente contra a aceitação de tokens que não foram emitidos para o servidor MCP. [6]"
  },
  {
    "kind": "subhead",
    "text": "Consentimento e aprovação"
  },
  {
    "kind": "paragraph",
    "text": "A autorização do protocolo e a aprovação do usuário resolvem problemas diferentes. OAuth pode provar que um usuário concedeu acesso a um serviço, enquanto uma aprovação durante uma conversa pode confirmar que o usuário deseja uma ação específica agora. Ferramentas de alto impacto geralmente precisam de ambos: permissão durável e confirmação contextual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11. MCP comparado com APIs, chamadas de função, RAG e protocolos de agente",
    "id": "11-mcp-comparado-com-apis-chamadas-de-funcao-rag-e-protocolos-de-agente"
  },
  {
    "kind": "paragraph",
    "text": "O MCP é mais fácil de entender comparando-o com tecnologias adjacentes. Geralmente os complementa em vez de substituí-los."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Tecnologia",
      "Objetivo principal",
      "Relacionamento com o MCP"
    ],
    "rows": [
      [
        "API REST ou GraphQL",
        "Exponha dados e operações de aplicativos a clientes de software.",
        "Um servidor MCP geralmente envolve uma ou mais APIs e apresenta ferramentas ou recursos orientados para IA."
      ],
      [
        "Chamada de função de modelo",
        "Deixe que uma API de modelo específico retorne argumentos estruturados de chamada de função.",
        "O MCP padroniza a descoberta e a execução entre hosts e servidores externos através dos limites do modelo e do fornecedor."
      ],
      [
        "pano",
        "Recuperar conhecimento relevante e colocá-lo no contexto do modelo.",
        "Um servidor MCP pode expor ferramentas e recursos de pesquisa que implementam um pipeline RAG."
      ],
      [
        "Estrutura do agente",
        "Gerencie planejamento, memória, loops, estado e orquestração.",
        "Uma estrutura pode usar o MCP como ferramenta e camada de integração de contexto."
      ],
      [
        "Protocolo agente para agente",
        "Permita que os agentes descubram, deleguem e colaborem com outros agentes.",
        "O MCP conecta principalmente aplicativos de IA a ferramentas e contexto; os protocolos de colaboração de agentes abordam um limite diferente."
      ],
      [
        "Sistema de plug-ins",
        "Estenda um aplicativo com recursos empacotados.",
        "O MCP pode servir como protocolo aberto sob um ecossistema de plug-ins ou conectores."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "MCP versus chamada direta de função"
  },
  {
    "kind": "paragraph",
    "text": "A chamada direta de função funciona bem quando o aplicativo já possui um conjunto pequeno e estático de ferramentas. O desenvolvedor define esquemas de função dentro da solicitação do modelo e executa a função escolhida no código do aplicativo. O MCP se torna mais valioso quando as ferramentas são externas, descobertas dinamicamente, compartilhadas entre aplicativos, implantadas de forma independente ou mantidas por outra equipe."
  },
  {
    "kind": "subhead",
    "text": "MCP versus RAG"
  },
  {
    "kind": "paragraph",
    "text": "RAG é um padrão de recuperação de informações, não um protocolo de interoperabilidade. Um sistema RAG decide como indexar, classificar, agrupar e recuperar o conhecimento. O MCP pode expor essa capacidade de recuperação como uma ferramenta ou expor documentos individuais como recursos. Não garante que a recuperação subjacente seja precisa ou que o contexto retornado seja suficiente."
  },
  {
    "kind": "subhead",
    "text": "MCP versus APIs"
  },
  {
    "kind": "paragraph",
    "text": "Uma API geralmente é projetada para clientes de software determinísticos que já conhecem o endpoint e a operação. Um servidor MCP adiciona metadados de descoberta orientados por IA, esquemas de ferramentas, prompts, recursos e comportamento do ciclo de vida do protocolo. O servidor ainda precisa de uma implementação real por trás dele - geralmente uma API, driver de banco de dados, programa de linha de comando ou serviço comercial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12. Riscos de segurança e design defensivo",
    "id": "12-riscos-de-seguranca-e-design-defensivo"
  },
  {
    "kind": "paragraph",
    "text": "O MCP expande o que uma aplicação de IA pode alcançar, por isso também expande as consequências dos erros. A segurança não pode ser reduzida a “usar OAuth” ou “perguntar ao usuário antes de chamar a ferramenta”. Um design completo considera o modelo, o host, o servidor, o transporte, os sistemas downstream, os dados e a interface humana como limites de confiança separados."
  },
  {
    "kind": "subhead",
    "text": "12.1 Injeção imediata e conteúdo não confiável"
  },
  {
    "kind": "paragraph",
    "text": "Uma ferramenta ou recurso pode retornar texto que contém instruções maliciosas. O modelo pode confundir esse conteúdo com orientação confiável e tentar uma ação insegura. Esta é a injeção indireta de prompt: o invasor controla os dados em vez do prompt visível do usuário. As defesas incluem separar instruções de dados, rotular a proveniência, restringir cadeias de ferramentas, filtrar ações confidenciais e exigir aprovação para operações consequentes."
  },
  {
    "kind": "subhead",
    "text": "12.2 Envenenamento por ferramentas e descrições enganosas"
  },
  {
    "kind": "paragraph",
    "text": "O modelo seleciona ferramentas parcialmente a partir de nomes e descrições. Um servidor malicioso ou comprometido pode anunciar uma ferramenta de uma forma que manipula a seleção ou oculta efeitos colaterais. Os hosts devem exibir identidade, origem, permissões e visualizações de ação significativas da ferramenta. Os ambientes corporativos podem precisar de listas de permissões, pacotes assinados, manifestos revisados ​​ou um gateway que reescreva e filtre metadados de ferramentas expostas."
  },
  {
    "kind": "subhead",
    "text": "12.3 Privilégio excessivo"
  },
  {
    "kind": "paragraph",
    "text": "Um servidor executado com amplo sistema de arquivos, nuvem, banco de dados ou permissões administrativas converte um erro de modelo em um grande incidente. Use credenciais de privilégio mínimo, padrões somente leitura, escopo de locatário e recurso, tokens de curta duração, sandbox e servidores separados para diferentes níveis de privilégio."
  },
  {
    "kind": "subhead",
    "text": "12.4 Problemas confusos de deputados"
  },
  {
    "kind": "paragraph",
    "text": "Um servidor pode se tornar um substituto confuso quando possui autoridade que o usuário solicitante não possui. Por exemplo, uma conta de serviço compartilhada pode acessar todos os registros de clientes, mesmo que o usuário veja apenas um locatário. O servidor deve preservar a identidade do usuário e impor autorização comercial em vez de assumir que uma conexão MCP válida implica permissão para cada ação downstream."
  },
  {
    "kind": "subhead",
    "text": "12.5 Falsificação de solicitação no servidor"
  },
  {
    "kind": "paragraph",
    "text": "A autorização remota e a descoberta de metadados podem fazer com que um cliente busque URLs fornecidos por terceiros. Sem validação estrita, um invasor pode ter como alvo endereços de rede internos, serviços de metadados em nuvem ou terminais administrativos locais. A orientação oficial de segurança do MCP recomenda controles de rede e tratamento de solicitações resistentes a SSRF. [6]"
  },
  {
    "kind": "subhead",
    "text": "12.6 Religação de DNS e exposição local"
  },
  {
    "kind": "paragraph",
    "text": "A especificação Streamable HTTP requer validação de origem para conexões de entrada e recomenda vincular servidores locais a localhost em vez de todas as interfaces de rede. Sem essas proteções, um site malicioso poderia potencialmente interagir com um servidor local por meio de técnicas de religação de DNS. [4]"
  },
  {
    "kind": "subhead",
    "text": "12.7 Vazamento de dados e influência entre servidores"
  },
  {
    "kind": "paragraph",
    "text": "Um host conectado a vários servidores pode mover acidentalmente informações de um recurso confiável para uma chamada de ferramenta não confiável. O modelo pode ser a ponte. Os hosts devem classificar os dados, restringir quais ferramentas podem receber conteúdo confidencial, redigir segredos e aplicar políticas antes de enviar argumentos a um servidor."
  },
  {
    "kind": "subhead",
    "text": "Uma lista de verificação prática de defesa"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Confiar explicitamente nos servidores; não se conecte automaticamente a pontos de extremidade arbitrários.",
      "Use credenciais de menor privilégio e curta duração e valide o público, o emissor, o escopo e o locatário do token.",
      "Recursos separados somente leitura e gravação; exigem confirmação para operações de alto impacto.",
      "Valide cada entrada em um esquema rigoroso e valide regras de negócios de forma independente.",
      "Limpe caminhos, URLs, argumentos de shell, parâmetros SQL e nomes de arquivos.",
      "Execute servidores locais em uma sandbox ou em uma conta de sistema operacional restrita.",
      "Valide a origem para transportes HTTP e vincule endpoints locais apenas ao host local.",
      "Restrinja o acesso de saída à rede e proteja-se contra SSRF e acesso a serviços de metadados.",
      "Registre a identidade da ferramenta, a identidade do usuário, argumentos, aprovações, resultados, latência e erros em uma trilha de auditoria.",
      "Limite o tamanho da saída e trate conteúdo não confiável como dados, não como instruções privilegiadas.",
      "Teste com prompts maliciosos, descrições de ferramentas envenenadas, esquemas malformados, tentativas de repetição e cenários entre locatários.",
      "Forneça aos usuários visualizações claras, ações reversíveis e mensagens de erro significativas."
    ]
  },
  {
    "kind": "subhead",
    "text": "PRINCÍPIO DE SEGURANÇA"
  },
  {
    "kind": "paragraph",
    "text": "O modelo deverá propor; a política deve decidir; o servidor deve fazer cumprir; e o usuário deve compreender as ações consequentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13. Exemplo prático de Python: um pequeno servidor MCP",
    "id": "13-exemplo-pratico-de-python-um-pequeno-servidor-mcp"
  },
  {
    "kind": "paragraph",
    "text": "O exemplo a seguir mostra um servidor MCP local mínimo que expõe uma ferramenta de pesquisa de política somente leitura. Ele usa o auxiliar FastMCP do Python SDK, que pode derivar esquemas de ferramentas de dicas de tipo e docstrings do Python. O exemplo é intencionalmente pequeno para que o limite do protocolo fique visível. [7]"
  },
  {
    "kind": "subhead",
    "text": "Passo 1: Crie o projeto"
  },
  {
    "kind": "paragraph",
    "text": "terminal"
  },
  {
    "kind": "code",
    "text": "uv init policy-mcp-server\ncd policy-mcp-server\nuv add \"mcp[cli]\""
  },
  {
    "kind": "subhead",
    "text": "Etapa 2: Implementar o servidor"
  },
  {
    "kind": "paragraph",
    "text": "servidor_política.py"
  },
  {
    "kind": "code",
    "text": "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP(\"company-policy\")\n\nPOLICIES = {\n    \"external-api\": (\n        \"External APIs require OAuth 2.0, TLS, rate limiting, \"\n        \"centralized logging, and an approved threat model.\"\n    ),\n    \"data-retention\": (\n        \"Production logs must follow the approved retention schedule \"\n        \"and must not store secrets or full authentication tokens.\"\n    ),\n    \"change-management\": (\n        \"High-risk production changes require peer review, a rollback \"\n        \"plan, and a recorded change ticket.\"\n    ),\n}\n\n@mcp.tool()\ndef search_policies(query: str) -> str:\n    \"\"\"Search approved company policies using a short text query.\n\n    Args:\n        query: Words describing the policy topic to find.\n    \"\"\"\n    terms = query.lower().split()\n    matches = []\n\n    for name, text in POLICIES.items():\n        searchable = f\"{name} {text}\".lower()\n        if all(term in searchable for term in terms):\n            matches.append(f\"{name}: {text}\")\n\n    if not matches:\n        return \"No approved policy matched the query.\"\n\n    return \"\\n\".join(matches)\n\ndef main() -> None:\n    mcp.run(transport=\"stdio\")\n\nif __name__ == \"__main__\":\n    main()"
  },
  {
    "kind": "subhead",
    "text": "Etapa 3: conectar um host MCP"
  },
  {
    "kind": "paragraph",
    "text": "Um host local compatível está configurado para iniciar o comando do servidor. O formato exato da configuração depende do host, mas as informações essenciais são o executável, o diretório de trabalho e os argumentos. Quando o host inicia o processo, o canal stdio transporta mensagens MCP JSON-RPC."
  },
  {
    "kind": "paragraph",
    "text": "Configuração local ilustrativa"
  },
  {
    "kind": "code",
    "text": "{\n  \"mcpServers\": {\n    \"company-policy\": {\n      \"command\": \"uv\",\n\n      \"args\": [\n        \"--directory\",\n        \"/absolute/path/to/policy-mcp-server\",\n        \"run\",\n        \"policy_server.py\"\n      ]\n    }\n  }\n}"
  },
  {
    "kind": "subhead",
    "text": "Etapa 4: compreender o fluxo do tempo de execução"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "O host inicia policy_server.py como um processo local.",
      "O cliente e o servidor inicializam a sessão MCP e negociam recursos.",
      "O cliente lista ferramentas e descobre search_policies com seu esquema de entrada gerado.",
      "O usuário pergunta: “Quais controles se aplicam a uma API externa?”",
      "O modelo seleciona search_policies e fornece uma consulta como \"API externa\".",
      "O host roteia a chamada para o servidor, recebe o texto da política e o adiciona ao contexto do modelo.",
      "O modelo explica a política ao usuário e pode citar o resultado recuperado na conversa."
    ]
  },
  {
    "kind": "subhead",
    "text": "O que torna esta uma integração MCP?"
  },
  {
    "kind": "paragraph",
    "text": "A função de pesquisa em si é Python comum. O MCP adiciona descoberta padronizada, esquema, ciclo de vida, transporte e limite de invocação. O mesmo servidor pode ser usado por outro host compatível sem reescrever a função de pesquisa como um plugin específico do fornecedor."
  },
  {
    "kind": "subhead",
    "text": "Como evoluir o exemplo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Substitua o dicionário na memória por um índice de documentos ou serviço de conhecimento aprovado.",
      "Exponha as políticas como recursos com URIs estáveis ​​para leitura direta e citação.",
      "Adicione um prompt invocado pelo usuário, como \"Criar uma lista de verificação de conformidade de API externa\".",
      "Retorne resultados estruturados com ID da política, versão, proprietário, data de vigência e URI de origem.",
      "Adicione autorização com reconhecimento de locatário para uma implantação HTTP Streamable remota.",
      "Use o MCP Inspector para testar descobertas, entradas, resultados, erros e notificações antes de conectar um host de produção."
    ]
  },
  {
    "kind": "paragraph",
    "text": "O MCP Inspector oficial fornece um ambiente interativo para conectar-se a um servidor e examinar suas ferramentas, recursos, prompts e notificações. É uma das ferramentas mais úteis para validar um servidor antes da integração. [8]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14. Casos de uso do mundo real",
    "id": "14-casos-de-uso-do-mundo-real"
  },
  {
    "kind": "subhead",
    "text": "Engenharia de software"
  },
  {
    "kind": "paragraph",
    "text": "Um IDE ou agente de codificação pode usar servidores MCP para ler o histórico do repositório, inspecionar problemas, consultar documentação, entender o status da implantação ou acionar operações de construção controladas. O benefício é a continuidade contextual: o assistente pode raciocinar sobre os mesmos sistemas que os desenvolvedores já usam."
  },
  {
    "kind": "subhead",
    "text": "Conhecimento empresarial"
  },
  {
    "kind": "paragraph",
    "text": "As organizações podem expor políticas, decisões de arquitetura, documentação de produtos e dar suporte ao conhecimento por meio de recursos e ferramentas de pesquisa. Um servidor centralizado pode impor controle de acesso e retornar metadados oficiais, reduzindo a tentação de copiar bases de conhecimento privadas inteiras em prompts."
  },
  {
    "kind": "subhead",
    "text": "Suporte ao cliente e operações"
  },
  {
    "kind": "paragraph",
    "text": "Um assistente de suporte pode recuperar o contexto da conta, inspecionar o status do serviço, resumir tickets anteriores e redigir uma resolução. As operações de gravação – reembolsos, alterações de conta, escalonamentos – podem ser representadas como ferramentas separadas com aprovação explícita e requisitos de auditoria."
  },
  {
    "kind": "subhead",
    "text": "Dados e análises"
  },
  {
    "kind": "paragraph",
    "text": "Um servidor analítico pode expor esquemas de banco de dados como recursos, ferramentas de consulta com parâmetros limitados e solicitações de relatórios padrão. Isso pode tornar a análise de linguagem natural mais portátil, mas a conversão irrestrita de texto para SQL deve ser evitada em bancos de dados de produção confidenciais. Um servidor mais seguro expõe visualizações selecionadas, funções somente leitura, limites de consulta e controles de tamanho de resultados."
  },
  {
    "kind": "subhead",
    "text": "Nuvem e infraestrutura"
  },
  {
    "kind": "paragraph",
    "text": "Os servidores MCP de gerenciamento de nuvem podem ajudar os usuários a inspecionar recursos, diagnosticar incidentes e executar operações aprovadas. Como o nível de privilégio pode ser alto, os projetos de produção devem separar as ferramentas de inventário das ferramentas de mutação, definir o escopo das credenciais por assinatura ou projeto e exigir uma forte confirmação para alterações."
  },
  {
    "kind": "subhead",
    "text": "Educação e pesquisa"
  },
  {
    "kind": "paragraph",
    "text": "Um assistente de aprendizagem pode se conectar a materiais de cursos, simulações, conjuntos de dados e bibliotecas de citações. O MCP pode tornar as ferramentas educacionais reutilizáveis ​​entre assistentes, enquanto os metadados de recursos podem ajudar a preservar a proveniência. O protocolo não substitui o julgamento acadêmico: o sistema ainda deve distinguir fontes primárias, interpretações e explicações geradas."
  },
  {
    "kind": "subhead",
    "text": "Experiências interativas de agente"
  },
  {
    "kind": "paragraph",
    "text": "O ecossistema MCP também está se expandindo além dos resultados de ferramentas de texto simples. Os aplicativos MCP, introduzidos como uma extensão em 2026, permitem que as ferramentas retornem interfaces interativas em sandbox que podem ser renderizadas em hosts compatíveis. Isso aponta para agentes que combinam conversação com gráficos, formulários, visualizadores de documentos e manipulação direta. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15. Princípios de Design para Servidores MCP de Produção",
    "id": "15-principios-de-design-para-servidores-mcp-de-producao"
  },
  {
    "kind": "subhead",
    "text": "Design para compreensão do modelo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use nomes claros que descrevam a intenção e evite abreviações ambíguas.",
      "Escreva descrições que indiquem a finalidade, os efeitos colaterais, as limitações e quando não usar a ferramenta.",
      "Mantenha os esquemas pequenos, digitados e restritos com enums, formatos, intervalos e campos obrigatórios.",
      "Retornar resultados estruturados e concisos; coloque conteúdo grande atrás de recursos ou paginação.",
      "Use categorias de erro consistentes para que o modelo possa recuperar ou solicitar ao usuário informações ausentes."
    ]
  },
  {
    "kind": "subhead",
    "text": "Design para humanos"
  },
  {
    "kind": "paragraph",
    "text": "Os usuários devem ser capazes de entender o que uma ferramenta fará antes de aprová-la. Os nomes das ferramentas e as visualizações dos argumentos devem ser legíveis, e não apenas tecnicamente corretos. Para ações destrutivas ou caras, mostre o alvo, o escopo, o efeito esperado e se a ação pode ser revertida."
  },
  {
    "kind": "subhead",
    "text": "Projeto para operações"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publique metadados de versão e implementação.",
      "Use tempos limite, cancelamento, novas tentativas com cuidado e idempotência para mutações.",
      "Registre métricas estruturadas para chamadas de ferramentas, latência, falhas, aprovações e dependências downstream.",
      "Proteja contra inundação de resultados com limites de tamanho e paginação.",
      "Suporta degradação graciosa quando uma API downstream não está disponível.",
      "Teste a compatibilidade em vários clientes porque a interface do usuário e o comportamento de aprovação podem ser diferentes."
    ]
  },
  {
    "kind": "subhead",
    "text": "Design para governança"
  },
  {
    "kind": "paragraph",
    "text": "Os programas Enterprise MCP precisam de propriedade. Cada servidor deve ter um mantenedor, classificação de dados, escopos aprovados, inventário de dependências, revisão de segurança, processo de incidentes e plano de desativação. Um registro ou gateway"
  },
  {
    "kind": "paragraph",
    "text": "pode facilitar a descoberta de servidores, mas também deve comunicar o nível de confiança e o status da política, em vez de funcionar como um mercado não revisado."
  },
  {
    "kind": "table",
    "caption": "Um modelo de maturidade",
    "headers": [
      "Nível",
      "Características",
      "Objetivo principal"
    ],
    "rows": [
      [
        "1 – Experimental",
        "Servidor local, ferramenta restrita somente leitura, configuração manual, uso somente para desenvolvedores.",
        "Prove utilidade."
      ],
      [
        "2 – Controlado",
        "Esquemas definidos, aprovações básicas, registros, testes, permissões restritas.",
        "Reduza o risco óbvio."
      ],
      [
        "3 - Gerenciado",
        "Implantação central, integração de identidade, aplicação de políticas, monitoramento e propriedade documentada.",
        "Opere de forma confiável em escala de equipe."
      ],
      [
        "4 - Empresa",
        "Isolamento de locatários, controles de gateway, testes contínuos de segurança, governança de mudanças, integração de auditoria.",
        "Dimensione em toda a organização."
      ],
      [
        "5 – Ecossistema",
        "Servidores reutilizáveis ​​entre fornecedores e hosts, experiências interativas portáteis, confiança e compatibilidade mensuráveis.",
        "Alcance interoperabilidade estratégica."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16. Limitações, compensações e equívocos comuns",
    "id": "16-limitacoes-compensacoes-e-equivocos-comuns"
  },
  {
    "kind": "subhead",
    "text": "Transporte padronizado não é significado padronizado"
  },
  {
    "kind": "paragraph",
    "text": "O MCP pode padronizar como uma ferramenta é descrita e chamada, mas não pode garantir que cada servidor descreva conceitos de negócios equivalentes da mesma maneira. As organizações ainda podem precisar de convenções de nomenclatura, esquemas de domínio, catálogos semânticos e design de servidor com curadoria."
  },
  {
    "kind": "subhead",
    "text": "Mais ferramentas podem reduzir a confiabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Um modelo apresentado com centenas de ferramentas sobrepostas pode escolher mal, consumir mais contexto ou exigir lógica de roteamento extra. Os hosts podem precisar de filtragem de ferramentas, agrupamento, seleção de ferramentas com base em recuperação ou conjuntos de recursos específicos para tarefas."
  },
  {
    "kind": "subhead",
    "text": "Compatibilidade de protocolo não implica qualidade"
  },
  {
    "kind": "paragraph",
    "text": "Um servidor pode ser um MCP válido e ainda assim ser lento, inseguro, mal documentado ou semanticamente confuso. A avaliação da produção deve incluir correção, disponibilidade, autorização, manipulação de dados, observabilidade, experiência do usuário e resistência a entradas adversárias."
  },
  {
    "kind": "subhead",
    "text": "MCP não torna um agente autônomo"
  },
  {
    "kind": "paragraph",
    "text": "As ferramentas aumentam o que um sistema pode fazer, mas a autonomia depende do ciclo de planejamento do host, do comportamento do modelo, da memória, da política e do design de aprovação. Uma interface de chat com uma ferramenta de busca MCP está conectada, não necessariamente autônoma. Por outro lado, uma estrutura de agente pode ser altamente autônoma sem MCP, usando integrações proprietárias."
  },
  {
    "kind": "subhead",
    "text": "Local não significa automaticamente seguro"
  },
  {
    "kind": "paragraph",
    "text": "Um servidor stdio local pode acessar arquivos confidenciais ou executar comandos com as permissões do usuário. Por não atravessar a Internet pública, as equipes podem subestimar o seu risco. Os servidores locais ainda devem ser revisados, colocados em área restrita, com escopo definido e monitorados quando lidam com dados ou ações consequentes."
  },
  {
    "kind": "subhead",
    "text": "O protocolo continuará a evoluir"
  },
  {
    "kind": "paragraph",
    "text": "O MCP usa versões de protocolo desatualizadas e negociação de capacidade porque os recursos e requisitos mudam. Os desenvolvedores devem fixar versões testadas do SDK, monitorar alterações nas especificações, preservar a compatibilidade com versões anteriores quando necessário e evitar presumir que os recursos de rascunho tenham suporte universal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17. O futuro do MCP e o seu impacto social mais amplo",
    "id": "17-o-futuro-do-mcp-e-o-seu-impacto-social-mais-amplo"
  },
  {
    "kind": "paragraph",
    "text": "O MCP pode influenciar mais do que a conveniência do desenvolvedor. Uma camada de conexão portátil pode reduzir a dependência do fornecedor: as organizações podem expor um recurso uma vez e permitir que os usuários o acessem por meio de diferentes hosts de IA compatíveis. Isso transfere parte do poder do fornecedor da interface para o provedor de capacidade e o usuário."
  },
  {
    "kind": "paragraph",
    "text": "O protocolo também pode reduzir o custo de criação de assistentes especializados. Uma escola, instituição pública, pequena empresa ou comunidade de código aberto poderia publicar um servidor com escopo cuidadosamente definido que funcionasse em vários aplicativos de IA. Padrões compartilhados podem tornar integrações úteis menos dependentes de parcerias exclusivas."
  },
  {
    "kind": "paragraph",
    "text": "No entanto, o menor atrito de integração também reduz o atrito de conceder aos sistemas de IA acesso a ferramentas sensíveis. A sociedade necessitará de melhores normas para consentimento, proveniência, auditabilidade, revogação, responsabilidade e controlo humano. A questão não é apenas se um agente pode se conectar a um sistema, mas quem autorizou a conexão, quais dados cruzaram a fronteira, que ação ocorreu e quem pode explicá-la ou revertê-la."
  },
  {
    "kind": "paragraph",
    "text": "A governança neutra sob a Agentic AI Foundation da Linux Foundation pode ajudar o MCP a se desenvolver como uma infraestrutura compartilhada, em vez de um recurso de propriedade de um fornecedor modelo. O seu sucesso a longo prazo dependerá da interoperabilidade prática, padrões seguros, padrões claros e da vontade dos anfitriões e fornecedores de servidores para implementarem o protocolo fielmente. [10]"
  },
  {
    "kind": "paragraph",
    "text": "O surgimento dos aplicativos MCP sugere outra direção: as próprias interfaces podem se tornar capacidades de agentes portáteis. Em vez de navegar em aplicativos separados, os usuários podem trabalhar cada vez mais por meio de um host de IA confiável que renderiza o componente interativo certo no momento certo. Isso poderia simplificar os fluxos de trabalho, mas também aumenta a importância do sandbox, da procedência e do consentimento transparente do usuário. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18. Conclusão",
    "id": "18-conclusao"
  },
  {
    "kind": "paragraph",
    "text": "O Model Context Protocol aborda um dos problemas centrais de engenharia da IA ​​conectada: como fornecer aos modelos acesso estruturado e reutilizável ao contexto e ações externas sem reconstruir cada integração para cada assistente. Sua arquitetura host-cliente-servidor separa o aplicativo de IA voltado para o usuário dos sistemas que fornecem ferramentas, recursos e fluxos de trabalho de prompt. JSON-RPC, negociação de capacidade, transportes locais e remotos e autorização opcional criam uma base técnica comum."
  },
  {
    "kind": "paragraph",
    "text": "A maior força do protocolo é a interoperabilidade. Um servidor MCP bem projetado pode disponibilizar um recurso para vários hosts compatíveis, permitindo que as equipes invistam em uma integração controlada em vez de em muitos adaptadores específicos do produto. Isso torna o MCP especialmente atraente para conhecimento empresarial, ferramentas de desenvolvedor, operações de suporte, análises, gerenciamento de nuvem e outros domínios onde a IA deve funcionar com sistemas ativos."
  },
  {
    "kind": "paragraph",
    "text": "Seu maior risco também é a interoperabilidade: um conector padrão pode facilitar a conexão de recursos poderosos. Sem o mínimo de privilégio, validação, isolamento, aprovações, preservação de identidade e observabilidade, uma camada de ferramentas conveniente pode se tornar uma superfície de ataque. O MCP deve, portanto, ser tratado como uma infra-estrutura e não como um atalho em torno da arquitectura de segurança."
  },
  {
    "kind": "paragraph",
    "text": "A minha avaliação é que o MCP provavelmente se tornará uma parte durável da pilha de IA agente, não porque torne os modelos mais inteligentes, mas porque dá à indústria uma forma partilhada de ligar a inteligência a sistemas úteis. As implementações vencedoras não serão os servidores com maior número de ferramentas. Serão eles que exporão os recursos certos, com semântica clara, permissões defensáveis, operações confiáveis ​​e uma experiência de usuário que mantenha os humanos no controle de forma significativa."
  },
  {
    "kind": "subhead",
    "text": "PENSAMENTO FINAL"
  },
  {
    "kind": "paragraph",
    "text": "O MCP muda a questão de \"Este modelo pode ligar para o meu sistema?\" em um conjunto mais importante de questões:"
  },
  {
    "kind": "paragraph",
    "text": "“Através de qual padrão, sob a autoridade de quem, com que contexto e com quais salvaguardas?”"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário",
    "id": "glossario"
  },
  {
    "kind": "subhead",
    "text": "Agente de IA: um aplicativo de IA que pode raciocinar, escolher ações e interagir com ferramentas ou ambientes em várias etapas."
  },
  {
    "kind": "subhead",
    "text": "Negociação de capacidade: O processo de inicialização através do qual o cliente e o servidor declaram quais recursos de protocolo opcionais eles suportam."
  },
  {
    "kind": "subhead",
    "text": "Elicitação: Um recurso do cliente que permite que um servidor solicite informações adicionais ou confirmação do usuário por meio do host."
  },
  {
    "kind": "subhead",
    "text": "Host: o aplicativo de IA que gerencia a experiência do usuário, o modelo, o contexto, as aprovações e as conexões do cliente MCP."
  },
  {
    "kind": "subhead",
    "text": "JSON-RPC: Um formato leve de mensagem de chamada de procedimento remoto usado como protocolo base de troca de dados do MCP."
  },
  {
    "kind": "subhead",
    "text": "Cliente MCP: O componente dentro de um host que mantém uma conexão dedicada a um servidor MCP."
  },
  {
    "kind": "subhead",
    "text": "Servidor MCP: um programa ou serviço que expõe ferramentas, recursos e prompts por meio do MCP."
  },
  {
    "kind": "subhead",
    "text": "Prompt: um modelo de fluxo de trabalho reutilizável e invocado pelo usuário, fornecido por um servidor."
  },
  {
    "kind": "subhead",
    "text": "Recurso: Contexto ou dados endereçáveis ​​que um cliente pode listar ou ler."
  },
  {
    "kind": "subhead",
    "text": "Amostragem: Um recurso do cliente por meio do qual um servidor solicita ao host que gere uma conclusão de modelo."
  },
  {
    "kind": "subhead",
    "text": "stdio: Um transporte local que troca mensagens de protocolo por meio de entrada e saída padrão."
  },
  {
    "kind": "subhead",
    "text": "HTTP Streamable: O transporte MCP remoto padrão usando solicitações HTTP e eventos enviados pelo servidor opcionais."
  },
  {
    "kind": "subhead",
    "text": "Ferramenta: Uma função executável exposta por um servidor para recuperação ou ação selecionada pelo modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências",
    "id": "referencias"
  },
  {
    "kind": "subhead",
    "text": "[1] Anthropic - Apresentando o Model Context Protocol. 25 de novembro de 2024."
  },
  {
    "kind": "subhead",
    "text": "[2] Model Context Protocol - Visão Geral da Arquitetura. Arquitetura conceitual oficial e camadas de protocolo."
  },
  {
    "kind": "subhead",
    "text": "[3] Especificação do Model Context Protocol - 2025-11-25. Especificação de protocolo estável usada para este artigo."
  },
  {
    "kind": "subhead",
    "text": "[4] Especificação do Model Context Protocol - Transportes. Requisitos stdio e HTTP Streamable."
  },
  {
    "kind": "subhead",
    "text": "[5] Especificação do Model Context Protocol - autorização. Requisitos de autorização para implantações baseadas em HTTP."
  },
  {
    "kind": "subhead",
    "text": "[6] Model Context Protocol - Melhores Práticas de Segurança. Cenários oficiais de ataque e orientações de implementação."
  },
  {
    "kind": "subhead",
    "text": "[7] Model Context Protocol - Construa um servidor MCP. Tutorial oficial do SDK e exemplo FastMCP."
  },
  {
    "kind": "subhead",
    "text": "[8] Model Context Protocol - Inspetor MCP. Ferramenta oficial de teste e depuração de servidor."
  },
  {
    "kind": "subhead",
    "text": "[9] OpenAI – Novas ferramentas e recursos na API de respostas. Anúncio de suporte remoto do MCP, 21 de maio de 2025."
  },
  {
    "kind": "subhead",
    "text": "[10] Anthropic - Doando MCP e Estabelecendo a Agentic AI Foundation. Anúncio de governança aberta, 9 de dezembro de 2025."
  },
  {
    "kind": "subhead",
    "text": "[11] Blog do Model Context Protocol - Aplicativos MCP. Anúncio da extensão da IU interativa, 26 de janeiro de 2026."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Notas de pesquisa e publicação",
    "id": "notas-de-pesquisa-e-publicacao"
  },
  {
    "kind": "paragraph",
    "text": "Metatítulo recomendado: O que é Model Context Protocol (MCP)? Guia completo para servidores, arquitetura e segurança"
  },
  {
    "kind": "paragraph",
    "text": "Meta descrição recomendada: Aprenda o que é Model Context Protocol (MCP), como funcionam os servidores e clientes MCP, sua arquitetura, ferramentas, recursos, prompts, riscos de segurança e como construir um servidor MCP simples em Python."
  },
  {
    "kind": "paragraph",
    "text": "Palavra-chave primária: Model Context Protocol (MCP)"
  },
  {
    "kind": "paragraph",
    "text": "Palavras-chave de suporte: o que é MCP, servidor MCP, cliente MCP, arquitetura MCP, ferramentas MCP, recursos MCP, prompts MCP, agentes de IA, integração LLM, segurança MCP, construção de um servidor MCP, servidor Python MCP, integração de ferramentas de IA."
  },
  {
    "kind": "subhead",
    "text": "THE BIG LEARN"
  },
  {
    "kind": "paragraph",
    "text": "Aprendizado técnico profundo para um mundo conectado"
  }
];
