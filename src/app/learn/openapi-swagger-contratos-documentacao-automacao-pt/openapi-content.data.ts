import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const OPENAPI_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Do desenho ao runtime: o contrato como eixo da plataforma"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/pt/overview.svg",
    "alt": "Contrato OpenAPI conectando design, qualidade, automação, execução, documentação e governança",
    "caption": "Figura de abertura - O contrato OpenAPI conecta desenho, implementação, testes, documentação e operação."
  },
  {
    "kind": "paragraph",
    "text": "A mesma descrição orienta documentação, validação, segurança, compatibilidade e publicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Nos capítulos anteriores, REST foi estudado como estilo arquitetural e o Modelo de Maturidade de Richardson foi usado para observar recursos, semântica HTTP e hipermídia. O passo seguinte é transformar essas decisões em um contrato explícito, revisável e processável por ferramentas. A OpenAPI Specification, frequentemente associada ao nome Swagger por razões históricas, fornece uma linguagem padronizada para descrever interfaces HTTP sem depender de uma linguagem de programação específica."
  },
  {
    "kind": "paragraph",
    "text": "Uma descrição OpenAPI não é apenas uma página de documentação. Quando completa e coerente, ela registra caminhos, operações, parâmetros, corpos, representações, respostas, headers, modelos de dados, requisitos de segurança e informações de servidores. Esse documento pode alimentar portais para desenvolvedores, validadores, mocks, geradores de clientes, testes de contrato, políticas de gateway, catálogos e mecanismos de análise de compatibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes corporativos, o valor do contrato aumenta porque várias equipes dependem da mesma API. O consumidor precisa saber o que pode enviar e receber; o desenvolvedor do backend precisa implementar a interface acordada; a equipe de gateway precisa publicar e proteger operações; segurança precisa avaliar esquemas de autenticação; testes precisam construir cenários; e governança precisa detectar mudanças incompatíveis. Sem uma fonte comum, cada área cria uma interpretação própria e a divergência aparece tarde, normalmente em homologação ou produção."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo utiliza a família OpenAPI 3 como referência. Serão abordadas a estrutura do documento, a relação com JSON Schema, o uso de YAML e JSON, referências reutilizáveis, segurança, exemplos, callbacks, webhooks, design-first, code-first, linting, diff semântico, geração de artefatos e integração com API Gateways. A ênfase está em produzir contratos precisos, e não apenas arquivos que passam por um editor visual."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Mantenha um editor OpenAPI aberto e valide cada exemplo. Para cada operação, pergunte: qual recurso está sendo representado, quais entradas são obrigatórias, quais respostas são possíveis, como os erros são modelados, qual segurança se aplica e como uma ferramenta distinguirá mudança compatível de mudança quebradora?"
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
      "Explicar a finalidade da OpenAPI Specification e diferenciar especificação, descrição, contrato, documentação e implementação.",
      "Distinguir OpenAPI de Swagger e reconhecer o papel histórico e atual desses termos.",
      "Construir a estrutura raiz de uma OpenAPI Description em YAML ou JSON.",
      "Descrever paths, operations, parameters, requestBody, responses, headers e media types.",
      "Modelar dados com Schema Objects, composição, restrições, nulabilidade e discriminação.",
      "Reutilizar elementos com components e referências sem criar ciclos ou dependências frágeis.",
      "Declarar API keys, HTTP authentication, OAuth 2.0, OpenID Connect e mTLS no contrato.",
      "Comparar design-first, code-first e abordagens híbridas com critérios técnicos e organizacionais.",
      "Aplicar parsing, linting, diff, mocking, geração de SDKs e testes de contrato em pipelines.",
      "Integrar OpenAPI a portais, catálogos, API Gateways e processos de governança."
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
      "12.1 O que é OpenAPI e qual problema ela resolve",
      "12.2 OpenAPI e Swagger: termos relacionados, mas diferentes",
      "12.3 OpenAPI Description como contrato executável",
      "12.4 Estrutura raiz do documento",
      "12.5 YAML, JSON e regras de serialização",
      "12.6 info, servers, tags e externalDocs",
      "12.7 paths, Path Item e Operation Object",
      "12.8 Parâmetros de path, query, header e cookie",
      "12.9 requestBody, content e media types",
      "12.10 Responses, headers, links e erros",
      "12.11 Schema Object e JSON Schema",
      "12.12 Restrições, composição e polimorfismo",
      "12.13 components, $ref e modularização",
      "12.14 Segurança no contrato",
      "12.15 Exemplos, callbacks e webhooks",
      "12.16 Design-first, code-first e abordagem híbrida",
      "12.17 Parsing, validação e linting",
      "12.18 Mock servers, geração de SDKs e stubs",
      "12.19 Testes de contrato e conformidade",
      "12.20 Compatibilidade e mudanças quebradoras",
      "12.21 OpenAPI 3.0, 3.1 e 3.2",
      "12.22 Portais, catálogos e API Gateways",
      "12.23 Governança e CI/CD",
      "12.24 Troubleshooting",
      "12.25 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.1 O que é OpenAPI e qual problema ela resolve",
    "id": "12-1-o-que-e-openapi-e-qual-problema-ela-resolve"
  },
  {
    "kind": "paragraph",
    "text": "A OpenAPI Specification, ou OAS, define uma forma padronizada e independente de linguagem para descrever APIs HTTP. O documento resultante é chamado de OpenAPI Description. Ele pode ser lido por pessoas, mas sua característica decisiva é ser estruturado o suficiente para que programas descubram operações, dados e requisitos sem inspecionar o código-fonte do serviço ou observar tráfego de rede."
  },
  {
    "kind": "paragraph",
    "text": "O problema central resolvido é a ambiguidade de interface. Uma documentação escrita apenas em texto pode afirmar que o campo valor é numérico, mas não dizer se aceita negativos, quantas casas decimais são permitidas, se é obrigatório ou como erros são representados. Em OpenAPI, essas regras podem ser expressas por tipos, formatos, limites, padrões, enumerações, required, content types e respostas associadas a cada operação."
  },
  {
    "kind": "paragraph",
    "text": "A especificação não implementa o serviço e não garante que o runtime cumpra o contrato. Ela descreve a interface esperada. A conformidade depende de geração controlada, validação de mensagens, testes e observabilidade. Também não define a lógica de negócio: saber que POST /transferencias aceita uma estrutura não explica como saldo, antifraude, limites ou compensação são calculados."
  },
  {
    "kind": "paragraph",
    "text": "OAS é particularmente útil em plataformas com múltiplos consumidores porque permite separar a interface pública da estrutura interna do backend. Um serviço pode mudar banco de dados, classes, framework ou topologia sem alterar o contrato. Quando uma mudança de interface é necessária, ferramentas podem comparar versões e indicar potenciais quebras antes da publicação."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI descreve o que um consumidor pode observar e utilizar na interface HTTP. Código implementa esse comportamento; testes verificam a correspondência; gateway e portal publicam e governam a interface. Nenhum desses elementos substitui os demais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.2 OpenAPI e Swagger: termos relacionados, mas diferentes",
    "id": "12-2-openapi-e-swagger-termos-relacionados-mas-diferentes"
  },
  {
    "kind": "paragraph",
    "text": "Swagger foi o nome do projeto original criado para descrever APIs RESTful e fornecer ferramentas como interface de documentação, geração de código e editor. Em 2015, a especificação foi doada à OpenAPI Initiative e passou a ser desenvolvida como OpenAPI Specification. A versão Swagger 2.0 tornou-se a base da OpenAPI 2.0; as linhas posteriores adotaram oficialmente o nome OpenAPI 3.x."
  },
  {
    "kind": "paragraph",
    "text": "Hoje, Swagger costuma designar um ecossistema de ferramentas e produtos que trabalham com OpenAPI, enquanto OpenAPI designa a especificação. Expressões como arquivo Swagger ainda aparecem em projetos, mas podem ser imprecisas: é necessário saber se o documento está em Swagger/OpenAPI 2.0 ou OpenAPI 3.x, porque a estrutura de servers, requestBody, content, components e security mudou significativamente."
  },
  {
    "kind": "paragraph",
    "text": "A distinção evita erros de integração. Uma ferramenta que aceita apenas Swagger 2.0 não necessariamente compreende OpenAPI 3.1. Da mesma forma, uma interface visual chamada Swagger UI pode renderizar uma OpenAPI Description sem que o serviço tenha sido gerado por Swagger ou use qualquer biblioteca específica. O contrato pertence à organização e deve permanecer portátil."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Vocabulário que reduz ambiguidades em projetos e integrações.",
    "headers": [
      "Termo",
      "Uso recomendado",
      "Observação"
    ],
    "rows": [
      [
        "OpenAPI Specification",
        "Padrão que define a linguagem e os objetos da descrição.",
        "Possui versões e documentos normativos."
      ],
      [
        "OpenAPI Description",
        "Documento concreto da API, em YAML ou JSON.",
        "Pode ser único ou distribuído em vários arquivos."
      ],
      [
        "Swagger 2.0",
        "Nome histórico frequentemente associado à OpenAPI 2.0.",
        "Estrutura diferente de OAS 3.x."
      ],
      [
        "Swagger tooling",
        "Editores, UI, geradores e bibliotecas.",
        "Ferramentas não são a especificação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.3 OpenAPI Description como contrato executável",
    "id": "12-3-openapi-description-como-contrato-executavel"
  },
  {
    "kind": "paragraph",
    "text": "O termo contrato executável indica que a descrição pode participar do ciclo de engenharia, e não apenas ser publicada no fim. Um parser verifica se o YAML ou JSON forma um documento válido; um validador confere regras da especificação; um linter aplica convenções organizacionais; um gerador produz stubs ou SDKs; um mock responde conforme exemplos; e um teste compara mensagens reais com schemas declarados."
  },
  {
    "kind": "paragraph",
    "text": "Executável não significa perfeitamente completo. Regras de negócio complexas, dependências entre campos, autorização contextual e efeitos colaterais podem exigir testes ou extensões adicionais. Ainda assim, quanto mais precisa a descrição, maior a quantidade de verificações automáticas possíveis. Descrições vagas, com schemas do tipo object sem propriedades ou respostas default genéricas, fornecem pouca proteção."
  },
  {
    "kind": "paragraph",
    "text": "Em governança, o contrato torna a revisão objetiva. Em vez de avaliar apenas screenshots ou documentos separados, a equipe analisa uma alteração versionada. Pull requests registram quem mudou a interface, quais regras falharam, qual impacto foi detectado e quais aprovações ocorreram. Essa trilha é especialmente importante em APIs externas, reguladas ou compartilhadas por muitos domínios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/pt/figure-01.svg",
    "alt": "Pipeline de contrato com pull request, parser, linter, diff, testes e publicação",
    "caption": "Figura 1 - Um pipeline de contrato transforma a descrição em controles repetíveis antes da publicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.4 Estrutura raiz do documento",
    "id": "12-4-estrutura-raiz-do-documento"
  },
  {
    "kind": "paragraph",
    "text": "A raiz de uma OpenAPI Description é o OpenAPI Object. O campo openapi informa a versão da especificação usada pelo documento. O objeto info identifica a API e a versão do contrato. paths descreve endpoints e operações; components armazena objetos reutilizáveis; security pode aplicar requisitos globais; tags organizam operações; servers indica URLs base; externalDocs aponta material complementar. Em versões recentes, webhooks também podem aparecer na raiz."
  },
  {
    "kind": "paragraph",
    "text": "Nem todos os campos são obrigatórios em todas as versões, mas um documento mínimo útil precisa ir além da validade sintática. Uma descrição sem operações, respostas ou schemas pode ser aceita por um parser e ainda ser inadequada para consumidores. O critério de qualidade deve considerar se a interface pode ser compreendida, testada e evoluída."
  },
  {
    "kind": "paragraph",
    "text": "Extensões de especificação começam normalmente com x-, como x-owner-team ou x-gateway-policy. Elas permitem transportar metadados não padronizados, mas criam acoplamento com ferramentas. Uma extensão deve possuir proprietário, schema, versão, documentação e política de compatibilidade; caso contrário, o contrato vira um recipiente de configurações arbitrárias."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/pt/figure-02.svg",
    "alt": "Anatomia do OpenAPI Object com info, servers, paths, components, security e tags",
    "caption": "Figura 2 - Principais áreas do OpenAPI Object e suas responsabilidades."
  },
  {
    "kind": "code",
    "text": "Documento mínimo expandido\nopenapi: 3.1.1\ninfo:\n  title: API de Clientes\n  version: 1.4.0\nservers:\n  - url: https://api.empresa.example/clientes/v1\npaths:\n  /clientes/{clienteId}:\n    get:\n      operationId: obterCliente\n      responses:\n        '200':\n          description: Cliente localizado\ncomponents:\n  schemas: {}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.5 YAML, JSON e regras de serialização",
    "id": "12-5-yaml-json-e-regras-de-serializacao"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI pode ser serializada em JSON ou YAML. Os dois formatos representam a mesma estrutura lógica, mas possuem riscos diferentes. JSON é explícito em aspas, chaves e colchetes; YAML é mais legível para edição manual, porém depende de indentação e possui recursos que podem variar entre parsers. Em ambos os casos, nomes de campos, tipos e valores precisam respeitar a versão da OAS."
  },
  {
    "kind": "paragraph",
    "text": "Em YAML, tabs não devem ser usados para indentação, strings com caracteres especiais podem exigir aspas e valores como yes, no, on ou datas podem ser interpretados de forma inesperada por implementações antigas. Códigos de resposta devem ser tratados como strings, por exemplo '200'. Um path que contém dois-pontos, hash ou chaves deve ser revisado para evitar interpretação equivocada."
  },
  {
    "kind": "paragraph",
    "text": "A organização deve padronizar codificação UTF-8, finais de linha, ordenação lógica e formatação. Um formatador automático reduz diffs ruidosos e conflitos. Comentários são úteis para autores, mas não fazem parte do modelo semântico consumido por todas as ferramentas; informações essenciais devem estar em description, summary ou extensões definidas."
  },
  {
    "kind": "subhead",
    "text": "Regra prática para YAML"
  },
  {
    "kind": "paragraph",
    "text": "Use dois espaços por nível, nunca tabs; coloque códigos de status entre aspas; evite tipos implícitos ambíguos; limite linhas; e execute parser e linter no mesmo commit. Um arquivo visualmente alinhado ainda pode representar tipos inesperados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.6 info, servers, tags e externalDocs",
    "id": "12-6-info-servers-tags-e-externaldocs"
  },
  {
    "kind": "paragraph",
    "text": "O objeto info fornece identidade humana ao contrato. title deve distinguir a API; version representa a versão da descrição ou da interface, conforme convenção declarada; description explica escopo, público, limites e premissas; contact e license registram responsabilidade e condições de uso. A versão em info não é a versão da OAS, que permanece no campo openapi."
  },
  {
    "kind": "paragraph",
    "text": "servers lista URLs base e pode conter variáveis. Uma descrição pode apresentar produção, homologação e sandbox, mas publicar endpoints internos em um contrato externo pode expor topologia. Em muitas organizações, o contrato canônico usa uma URL lógica e o portal injeta o ambiente. Variáveis devem possuir default e enumerações coerentes para evitar combinações inválidas."
  },
  {
    "kind": "paragraph",
    "text": "tags agrupam operações por capacidade ou domínio. Elas não devem reproduzir a estrutura de times ou controladores automaticamente se isso prejudicar a experiência do consumidor. externalDocs serve para materiais que não cabem no contrato, como guias de onboarding, regras de negócio, runbooks ou políticas legais. Links externos precisam de ciclo de vida e monitoramento para não se tornarem referências quebradas."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Metadados também fazem parte da experiência e da governança.",
    "headers": [
      "Elemento",
      "Pergunta que responde",
      "Erro frequente"
    ],
    "rows": [
      [
        "info",
        "Que API é esta, quem mantém e qual versão está publicada?",
        "Versionar sem convenção ou omitir proprietário."
      ],
      [
        "servers",
        "Em quais bases a interface pode ser chamada?",
        "Misturar ambientes internos e externos."
      ],
      [
        "tags",
        "Como operações são agrupadas para descoberta?",
        "Copiar nomes de classes ou squads."
      ],
      [
        "externalDocs",
        "Onde ficam guias e regras complementares?",
        "Apontar documentos sem manutenção."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.7 paths, Path Item e Operation Object",
    "id": "12-7-paths-path-item-e-operation-object"
  },
  {
    "kind": "paragraph",
    "text": "paths é um mapa cujas chaves representam templates de caminho. Cada Path Item pode conter operações como get, post, put, patch e delete, além de parâmetros compartilhados. O path descreve a estrutura relativa à URL base; query string não deve ser incorporada à chave. /clientes/{clienteId} representa um recurso identificado, enquanto filtros pertencem a parameters."
  },
  {
    "kind": "paragraph",
    "text": "Cada Operation Object deve comunicar intenção. summary oferece uma frase curta; description registra detalhes; operationId cria um identificador estável usado por geradores; tags organizam; parameters e requestBody descrevem entradas; responses descreve resultados; security pode sobrescrever a regra global; deprecated sinaliza descontinuação sem remover imediatamente a operação."
  },
  {
    "kind": "paragraph",
    "text": "operationId precisa ser único em todo o documento e estável ao longo do tempo. Geradores frequentemente o transformam em nome de método. Renomeá-lo pode quebrar SDKs mesmo quando URL e HTTP permanecem iguais. Paths também devem evitar ambiguidades como /clientes/{id} e /clientes/ativos no mesmo nível quando o roteador pode tratar ativos como valor de id."
  },
  {
    "kind": "paragraph",
    "text": "O contrato deve documentar respostas de sucesso e falha relevantes. Declarar apenas 200 esconde validação, autenticação, autorização, conflito, limitação e indisponibilidade. Por outro lado, listar todos os códigos HTTP possíveis sem relação com a operação cria ruído. A seleção deve refletir comportamentos que consumidores precisam tratar."
  },
  {
    "kind": "code",
    "text": "Path Item e operação GET\npaths:\n  /clientes/{clienteId}:\n    parameters:\n      - $ref: '#/components/parameters/ClienteId'\n    get:\n      tags: [Clientes]\n      summary: Obtém um cliente\n      operationId: obterCliente\n      responses:\n        '200':\n          $ref: '#/components/responses/ClienteEncontrado'\n        '404':\n          $ref: '#/components/responses/ProblemaNaoEncontrado'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.8 Parâmetros de path, query, header e cookie",
    "id": "12-8-parametros-de-path-query-header-e-cookie"
  },
  {
    "kind": "paragraph",
    "text": "O Parameter Object descreve valores transportados em path, query, header ou cookie. name e in formam a identidade do parâmetro. Parâmetros de path são sempre obrigatórios porque o template não pode ser resolvido sem o valor. Query parameters representam filtros, paginação, ordenação ou projeção; headers carregam metadados; cookies são menos comuns em APIs corporativas máquina a máquina."
  },
  {
    "kind": "paragraph",
    "text": "schema define o tipo e as restrições. style e explode controlam a serialização de arrays e objetos, detalhe frequentemente ignorado. Um array de status pode ser enviado como status=ATIVO&status;=BLOQUEADO, como status=ATIVO,BLOQUEADO ou de outras formas. Sem declarar a estratégia, clientes e servidores podem produzir representações incompatíveis apesar de concordarem sobre o tipo lógico."
  },
  {
    "kind": "paragraph",
    "text": "Parâmetros não devem duplicar informações do corpo sem uma regra explícita de precedência. Headers padronizados pelo HTTP não precisam ser redefinidos de maneira inconsistente. Identificadores de correlação, idempotency keys e versões condicionais podem ser declarados, mas a semântica precisa constar na description e, quando possível, ser associada a schemas, examples e respostas."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A localização altera a serialização e a semântica do parâmetro.",
    "headers": [
      "Local",
      "Uso típico",
      "Cuidados"
    ],
    "rows": [
      [
        "path",
        "Identidade obrigatória no endereço do recurso.",
        "required=true e correspondência exata com o template."
      ],
      [
        "query",
        "Filtros, paginação, ordenação e campos opcionais.",
        "Definir serialização de arrays, defaults e limites."
      ],
      [
        "header",
        "Correlação, idempotência, preferências e precondições.",
        "Evitar duplicar headers reservados ou dados sensíveis."
      ],
      [
        "cookie",
        "Estado associado ao cliente em cenários específicos.",
        "Avaliar segurança, domínio, SameSite e adequação ao estilo da API."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.9 requestBody, content e media types",
    "id": "12-9-requestbody-content-e-media-types"
  },
  {
    "kind": "paragraph",
    "text": "Em OpenAPI 3, corpos de requisição são descritos por requestBody. O campo content mapeia media types para schemas e exemplos. Isso permite que a mesma operação aceite representações diferentes, como application/json e application/xml, desde que o comportamento seja realmente suportado. Declarar media types apenas para preencher documentação cria expectativas falsas e amplia a superfície de testes e segurança."
  },
  {
    "kind": "paragraph",
    "text": "required indica se o corpo é obrigatório. O schema descreve estrutura, mas não substitui limites operacionais como tamanho máximo, compressão aceita ou regras para upload. multipart/form-data exige modelar partes e seus tipos; application/octet-stream representa conteúdo binário; arquivos em JSON normalmente precisam de codificação e metadados claros."
  },
  {
    "kind": "paragraph",
    "text": "O contrato deve distinguir ausência de propriedade, valor nulo e string vazia. Essa diferença impacta criação, atualização completa e PATCH. Em atualizações parciais, um campo ausente pode significar manter valor, enquanto null pode significar remover. A semântica não é inferida automaticamente pelo schema e deve ser documentada."
  },
  {
    "kind": "code",
    "text": "Corpo JSON com schema e exemplo\nrequestBody:\n  required: true\n  content:\n    application/json:\n      schema:\n        $ref: '#/components/schemas/NovaTransferencia'\n      examples:\n        transferenciaPix:\n          value:\n            contaOrigem: '000123'\n            valor: 125.90\n            chaveDestino: cliente@example.com"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.10 Responses, headers, links e erros",
    "id": "12-10-responses-headers-links-e-erros"
  },
  {
    "kind": "paragraph",
    "text": "responses é obrigatório em cada operação e mapeia códigos de status ou faixas para Response Objects. Cada resposta possui description e pode incluir headers, content e links. A descrição deve explicar o significado daquela resposta no contexto da operação, não apenas repetir a frase genérica do código HTTP."
  },
  {
    "kind": "paragraph",
    "text": "Headers de resposta como Location, ETag, Retry-After, RateLimit ou identificadores de correlação fazem parte do contrato observável. Location em uma criação indica o recurso criado; ETag participa de cache e precondições; Retry-After orienta nova tentativa; headers de limitação precisam ter semântica padronizada pela organização. Documentá-los permite geração de clientes e testes mais realistas."
  },
  {
    "kind": "paragraph",
    "text": "Erros devem possuir modelo consistente. Uma estrutura inspirada em Problem Details pode registrar type, title, status, detail, instance e extensões de domínio. O contrato precisa diferenciar erro de validação, autenticação, autorização, conflito e indisponibilidade. Retornar 200 com um campo sucesso=false reduz a capacidade de intermediários e clientes aplicarem a semântica HTTP estudada nos capítulos anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Links no Response Object descrevem como valores de uma resposta podem alimentar outra operação. Eles não são idênticos aos links de hipermídia enviados no payload, mas ajudam ferramentas a entender relacionamentos e fluxos. Para jornadas complexas, a organização pode complementar OpenAPI com especificações de workflows, testes ou documentação."
  },
  {
    "kind": "code",
    "text": "Respostas explícitas de sucesso e falha\nresponses:\n  '201':\n    description: Transferência aceita\n    headers:\n      Location:\n        schema: { type: string, format: uri-reference }\n    content:\n      application/json:\n        schema:\n          $ref: '#/components/schemas/Transferencia'\n  '422':\n    $ref: '#/components/responses/ProblemaValidacao'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.11 Schema Object e JSON Schema",
    "id": "12-11-schema-object-e-json-schema"
  },
  {
    "kind": "paragraph",
    "text": "O Schema Object descreve a forma e as restrições de dados usados em parâmetros, corpos e respostas. Na linha OpenAPI 3.1, o modelo foi alinhado de maneira ampla ao JSON Schema Draft 2020-12. Isso permite utilizar palavras-chave de validação e composição de forma mais consistente, embora ferramentas possam implementar subconjuntos ou possuir diferenças de suporte."
  },
  {
    "kind": "paragraph",
    "text": "Tipos básicos incluem string, number, integer, boolean, object, array e null, conforme o dialeto aplicável. properties define membros de objetos; required lista nomes obrigatórios; additionalProperties controla campos não declarados; items descreve elementos de arrays; enum e const limitam valores; minimum, maximum, minLength, pattern e formatos refinam validação."
  },
  {
    "kind": "paragraph",
    "text": "format normalmente funciona como anotação semântica, e sua validação depende da ferramenta e da configuração. Declarar format: date-time não garante que todos os parsers rejeitem valores inválidos. Contratos críticos devem testar exemplos e mensagens reais com a mesma implementação usada no pipeline ou runtime."
  },
  {
    "kind": "paragraph",
    "text": "Schemas excessivamente permissivos enfraquecem o contrato. additionalProperties: true pode ser adequado para mapas dinâmicos, mas em DTOs estáveis permite campos desconhecidos e dificulta detectar erros de digitação. Em contrapartida, fechar todos os objetos sem estratégia de evolução pode tornar adições compatíveis em quebras para consumidores que validam estritamente."
  },
  {
    "kind": "code",
    "text": "Schema de objeto com restrições\ncomponents:\n  schemas:\n    Cliente:\n      type: object\n      additionalProperties: false\n      required: [id, nome, status]\n      properties:\n        id:\n          type: string\n          pattern: '^[0-9]{10}$'\n        nome:\n          type: string\n          minLength: 1\n          maxLength: 120\n        status:\n          type: string\n          enum: [ATIVO, BLOQUEADO, ENCERRADO]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.12 Restrições, composição e polimorfismo",
    "id": "12-12-restricoes-composicao-e-polimorfismo"
  },
  {
    "kind": "paragraph",
    "text": "allOf, anyOf, oneOf e not permitem compor schemas. allOf exige que a instância satisfaça todos os subschemas e costuma ser usado para combinar estruturas; oneOf exige exatamente uma alternativa válida; anyOf aceita uma ou mais; not rejeita o schema indicado. O uso deve considerar como validadores e geradores interpretam a composição."
  },
  {
    "kind": "paragraph",
    "text": "allOf não deve ser tratado automaticamente como herança orientada a objetos. Ele representa interseção de restrições. Se dois subschemas definem propriedades incompatíveis, a composição pode se tornar impossível. Geradores podem produzir classes diferentes para o mesmo contrato; portanto, a prioridade é a semântica da instância, não a estrutura desejada no código."
  },
  {
    "kind": "paragraph",
    "text": "O discriminator ajuda a selecionar alternativas por uma propriedade, mas não substitui oneOf nem valida por si só todos os casos. Mapeamentos precisam apontar para schemas existentes e valores devem ser estáveis. Polimorfismo sem discriminador pode depender de formatos mutuamente exclusivos, o que aumenta custo de validação e pode gerar mensagens de erro difíceis."
  },
  {
    "kind": "paragraph",
    "text": "Restrições condicionais do JSON Schema, quando suportadas, permitem expressar relações como: se tipo for EMPRESA, então cnpj é obrigatório. Antes de adotá-las, verifique suporte de editores, gateways, geradores e validadores. Um contrato teoricamente correto pode ser impraticável se ferramentas críticas ignorarem a palavra-chave."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Composição exige precisão e testes com as ferramentas reais.",
    "headers": [
      "Palavra-chave",
      "Semântica",
      "Armadilha"
    ],
    "rows": [
      [
        "allOf",
        "A instância deve satisfazer todos os schemas.",
        "Confundir interseção com herança de classes."
      ],
      [
        "oneOf",
        "Exatamente uma alternativa deve ser válida.",
        "Alternativas sobrepostas validam mais de uma."
      ],
      [
        "anyOf",
        "Uma ou mais alternativas podem ser válidas.",
        "Consumidor não sabe qual representação recebeu."
      ],
      [
        "discriminator",
        "Ajuda a escolher schema por propriedade.",
        "Mapeamento incompleto ou valores instáveis."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.13 components, $ref e modularização",
    "id": "12-13-components-ref-e-modularizacao"
  },
  {
    "kind": "paragraph",
    "text": "components armazena schemas, responses, parameters, examples, requestBodies, headers, securitySchemes, links, callbacks e outros objetos reutilizáveis. A reutilização reduz duplicação e permite aplicar correções em um ponto. Entretanto, componentes globais não são usados automaticamente: precisam ser referenciados pela operação ou por outro objeto."
  },
  {
    "kind": "paragraph",
    "text": "$ref substitui o objeto no local em que aparece por uma referência a outro componente ou documento, conforme as regras da versão. Referências internas usam JSON Pointer, como #/components/schemas/Cliente. Referências externas podem apontar para arquivos ou recursos de rede. Identidade, resolução relativa, codificação de caracteres e política de acesso precisam ser controladas para builds reproduzíveis."
  },
  {
    "kind": "paragraph",
    "text": "Dividir um contrato em muitos arquivos melhora organização, mas aumenta a complexidade de resolver e empacotar. Bundling reúne recursos mantendo referências; dereferencing substitui referências pelo conteúdo, podendo aumentar tamanho e criar problemas com ciclos. A ferramenta de publicação deve produzir uma forma compatível com portal, gateway e consumidores sem perder a fonte modular."
  },
  {
    "kind": "paragraph",
    "text": "Bibliotecas corporativas de schemas podem promover consistência, mas também acoplar domínios e dificultar evolução. Componentes compartilhados devem representar conceitos realmente estáveis, possuir versionamento e evitar que uma alteração em um arquivo central quebre dezenas de APIs. Reuso por coincidência estrutural é mais perigoso que duplicação consciente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/pt/figure-03.svg",
    "alt": "Referências conectando uma operação a responses e schemas reutilizáveis",
    "caption": "Figura 3 - $ref conecta operações a componentes reutilizáveis, mas a governança precisa controlar identidade e evolução."
  },
  {
    "kind": "subhead",
    "text": "Evite o componente universal"
  },
  {
    "kind": "paragraph",
    "text": "Um schema Pessoa usado por cliente, funcionário, procurador e beneficiário tende a acumular campos opcionais e regras contraditórias. Prefira modelos orientados ao contexto da operação e compartilhe apenas elementos com semântica verdadeiramente comum."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.14 Segurança no contrato",
    "id": "12-14-seguranca-no-contrato"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI descreve mecanismos de segurança por Security Scheme Objects e aplica requisitos por Security Requirement Objects. Esquemas comuns incluem apiKey, http, oauth2, openIdConnect e mutualTLS nas versões que o suportam. A descrição informa como o consumidor apresenta credenciais, mas não contém segredos nem implementa autenticação."
  },
  {
    "kind": "paragraph",
    "text": "Um requisito global pode ser definido na raiz e sobrescrito por operação. Uma lista de requisitos representa alternativas lógicas; múltiplos esquemas no mesmo objeto representam combinação. Essa sintaxe precisa ser revisada com cuidado: declarar OAuth ou API key como alternativas é diferente de exigir ambos."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 deve informar flows, authorizationUrl, tokenUrl e scopes aplicáveis. OpenID Connect usa a URL de descoberta. Bearer tokens são descritos como HTTP bearer, com bearerFormat apenas como dica. mTLS descreve autenticação por certificado, mas detalhes de truststore, emissão, revogação e subject mapping permanecem em políticas operacionais."
  },
  {
    "kind": "paragraph",
    "text": "Não coloque tokens, chaves, senhas ou certificados reais em examples, descriptions ou extensões. Contratos são copiados para repositórios, portais e artefatos. Dados de teste também precisam ser sintéticos para evitar exposição de informações pessoais ou segredos."
  },
  {
    "kind": "code",
    "text": "OAuth 2.0 combinado com mTLS\ncomponents:\n  securitySchemes:\n    OAuthCorporativo:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes:\n            clientes.leitura: Consulta clientes\n    CertificadoCliente:\n      type: mutualTLS\nsecurity:\n  - OAuthCorporativo: [clientes.leitura]\n    CertificadoCliente: []"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.15 Exemplos, callbacks e webhooks",
    "id": "12-15-exemplos-callbacks-e-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "Examples tornam o contrato concreto e alimentam documentação, mocks e testes. Um schema pode ter example, e objetos de mídia podem ter examples nomeados. Exemplos devem ser válidos segundo o schema, cobrir casos representativos e evitar dados reais. Um exemplo desatualizado gera mais confusão que sua ausência, por isso deve ser validado automaticamente."
  },
  {
    "kind": "paragraph",
    "text": "Callbacks descrevem requisições que o provedor fará para uma URL fornecida durante uma operação. O caminho do callback pode usar uma expressão que extrai a URL da requisição ou resposta. Eles são úteis em processamento assíncrono, mas exigem modelar autenticação de retorno, retries, idempotência, disponibilidade e validação da URL para prevenir abuso de conexões de saída."
  },
  {
    "kind": "paragraph",
    "text": "Webhooks definidos na raiz descrevem requisições iniciadas pelo provedor sem depender de uma operação específica que registre a URL. A descrição informa o contrato da mensagem, mas a assinatura, replay protection, entrega, ordenação e política de repetição precisam de documentação adicional. Consumidores devem considerar que eventos podem chegar duplicados ou fora de ordem."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI descreve bem operações individuais, mas jornadas com várias chamadas e dependências podem exigir especificações complementares, testes de cenário ou documentos de workflow. Não force toda regra temporal para dentro de descriptions longas; use referências governadas e exemplos executáveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.16 Design-first, code-first e abordagem híbrida",
    "id": "12-16-design-first-code-first-e-abordagem-hibrida"
  },
  {
    "kind": "paragraph",
    "text": "No design-first, o contrato é elaborado e revisado antes da implementação. Isso permite envolver consumidores, arquitetura, segurança e gateway enquanto mudanças ainda são baratas. Mocks podem desbloquear desenvolvimento paralelo. O risco é o contrato se afastar do código se a equipe não automatizar conformidade."
  },
  {
    "kind": "paragraph",
    "text": "No code-first, o serviço é implementado e a descrição é gerada a partir de anotações, reflexão ou metadados. A abordagem reduz duplicação inicial e tende a acompanhar tipos do código, mas pode expor detalhes de framework, produzir operationIds instáveis, omitir erros e dificultar revisão da experiência antes do desenvolvimento. O contrato passa a refletir o que foi codificado, não necessariamente o que deveria ser público."
  },
  {
    "kind": "paragraph",
    "text": "A abordagem híbrida define um contrato canônico, gera parte do código e valida o runtime contra ele. Também pode extrair a descrição do código e submetê-la a regras e aprovação como artefato. O ponto essencial é estabelecer uma fonte de verdade: quando contrato e código divergem, qual é corrigido e qual pipeline impede publicação?"
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve considerar maturidade da equipe, ciclo de releases, número de consumidores, necessidade de mocks, suporte das ferramentas e governança. Em APIs externas ou amplamente compartilhadas, design-first costuma oferecer maior controle. Em serviços internos simples, code-first pode ser aceitável desde que o contrato publicado seja estável e revisado."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A abordagem é uma decisão de processo, não apenas de ferramenta.",
    "headers": [
      "Abordagem",
      "Força principal",
      "Risco principal",
      "Controle necessário"
    ],
    "rows": [
      [
        "Design-first",
        "Revisão precoce e trabalho paralelo.",
        "Divergência entre contrato e runtime.",
        "Testes de conformidade e geração controlada."
      ],
      [
        "Code-first",
        "Proximidade com tipos e implementação.",
        "Contrato acoplado ao framework e tardio.",
        "Linting, diff e revisão do artefato gerado."
      ],
      [
        "Híbrida",
        "Combina contrato canônico e automação.",
        "Fluxo complexo sem fonte de verdade clara.",
        "Política explícita de precedência e pipeline."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.17 Parsing, validação e linting",
    "id": "12-17-parsing-validacao-e-linting"
  },
  {
    "kind": "paragraph",
    "text": "Parsing verifica se YAML ou JSON pode ser lido. Validação estrutural verifica se os objetos obedecem à versão da OAS. Resolução de referências confirma que alvos existem. Validação de schemas analisa palavras-chave e exemplos. Linting aplica regras de estilo, governança e qualidade que a especificação não exige, como operationId único, descrições mínimas, convenção de nomes e respostas obrigatórias."
  },
  {
    "kind": "paragraph",
    "text": "Essas etapas devem ser separadas porque produzem diagnósticos diferentes. Um documento pode ser sintaticamente válido e estruturalmente inválido; pode ser válido pela OAS e reprovar regras corporativas; pode passar no linter e ter referência externa indisponível. Mensagens do pipeline precisam indicar arquivo, caminho do objeto, regra, severidade e correção sugerida."
  },
  {
    "kind": "paragraph",
    "text": "Regras de linting devem possuir justificativa e versionamento. Transformar toda preferência em erro bloqueante cria atrito e incentiva exceções. Classifique regras em erro, aviso e informação; forneça mecanismo de supressão rastreável; revise falsos positivos; e meça quais regras previnem incidentes ou incompatibilidades reais."
  },
  {
    "kind": "paragraph",
    "text": "Validação deve ocorrer localmente, no pull request e antes da publicação. Usar versões diferentes de parser em cada etapa produz resultados inconsistentes. Fixe versões, registre checksums quando necessário e atualize ferramentas por processo controlado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.18 Mock servers, geração de SDKs e stubs",
    "id": "12-18-mock-servers-geracao-de-sdks-e-stubs"
  },
  {
    "kind": "paragraph",
    "text": "Um mock server interpreta o contrato e retorna respostas simuladas. Ele permite que consumidores desenvolvam antes do backend, demonstra a API em portais e executa testes de integração isolados. O mock pode escolher examples explícitos ou gerar valores a partir de schemas. Valores gerados automaticamente nem sempre representam casos de negócio realistas, por isso examples nomeados são importantes."
  },
  {
    "kind": "paragraph",
    "text": "Geradores transformam operações e schemas em clientes, modelos ou stubs de servidor. O resultado depende de operationId, nomes de schemas, nulabilidade, composição e formatos. Alterações aparentemente cosméticas podem renomear métodos ou tipos. Antes de adotar geração em massa, a equipe deve avaliar qualidade do código, extensibilidade, tratamento de erros, autenticação, retries e atualização de versões."
  },
  {
    "kind": "paragraph",
    "text": "SDKs gerados não devem esconder a semântica HTTP de forma perigosa. Um método que lança a mesma exceção para 400, 404 e 409 impede decisões do consumidor. O gerador ou templates precisam preservar status, headers, corpo de erro e correlação. Também é necessário definir quem publica o SDK, como ele é versionado e como vulnerabilidades em dependências são corrigidas."
  },
  {
    "kind": "paragraph",
    "text": "Stubs de servidor aceleram scaffolding, mas não implementam regras de negócio, segurança ou observabilidade. Código gerado deve ser isolado de extensões manuais para permitir regeneração. Alterar diretamente arquivos gerados cria conflitos e torna futuras atualizações imprevisíveis."
  },
  {
    "kind": "subhead",
    "text": "Mock não é homologação"
  },
  {
    "kind": "paragraph",
    "text": "Um mock prova que o consumidor entende o contrato simulado. Ele não prova que o backend real cumpre semântica, autorização, desempenho, consistência ou efeitos colaterais. Use mock para paralelismo e testes rápidos, e complemente com conformidade contra ambientes reais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.19 Testes de contrato e conformidade",
    "id": "12-19-testes-de-contrato-e-conformidade"
  },
  {
    "kind": "paragraph",
    "text": "Testes de contrato verificam se mensagens e comportamentos observáveis correspondem à descrição. No lado do provedor, respostas reais podem ser validadas contra status, media type e schema. No lado do consumidor, requisições geradas podem ser validadas antes do envio. Testes negativos confirmam rejeição de campos, formatos e estados inválidos."
  },
  {
    "kind": "paragraph",
    "text": "Validação em runtime precisa equilibrar segurança e custo. Validar todos os payloads grandes pode aumentar latência e consumo de CPU; validar apenas amostras pode não bloquear violações. Uma estratégia comum combina validação completa em testes e homologação, proteção seletiva no gateway e observabilidade em produção. Dados sensíveis devem ser mascarados em logs de erro."
  },
  {
    "kind": "paragraph",
    "text": "Conformidade não é apenas schema. Uma resposta pode ter estrutura válida e status incorreto; um POST pode retornar 200 em vez de 201; um GET pode modificar estado; um header obrigatório pode faltar; uma operação pode aceitar media type não declarado. Testes precisam cobrir semântica HTTP, segurança e regras de compatibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Consumer-driven contracts capturam expectativas específicas de consumidores, enquanto OpenAPI descreve a interface geral. As abordagens podem se complementar: OpenAPI é a fonte ampla e contratos de consumidores validam interações críticas. É necessário evitar que expectativas particulares impeçam evolução legítima para todos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.20 Compatibilidade e mudanças quebradoras",
    "id": "12-20-compatibilidade-e-mudancas-quebradoras"
  },
  {
    "kind": "paragraph",
    "text": "Uma mudança quebradora é aquela que pode fazer um consumidor compatível com a versão anterior deixar de funcionar. Remover path, operação, parâmetro, propriedade ou resposta é um caso evidente. Tornar campo opcional obrigatório, restringir enum, reduzir limite, mudar tipo ou alterar segurança também pode quebrar. Mudanças aditivas são frequentemente compatíveis, mas dependem do comportamento dos consumidores."
  },
  {
    "kind": "paragraph",
    "text": "Adicionar propriedade de resposta pode quebrar clientes que rejeitam campos desconhecidos. Adicionar novo valor de enum pode quebrar switches exaustivos. Adicionar resposta 429 pode revelar uma condição operacional nova. Tornar validação mais estrita pode rejeitar dados antes aceitos. Por isso, diff semântico precisa ser combinado com políticas de robustez e conhecimento do ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "Versionamento de contrato deve distinguir versão da OAS, versão do documento em info.version e versão da interface exposta em URL ou header. Sem essa distinção, equipes atualizam openapi: 3.1.1 e acreditam ter criado uma nova versão de negócio. A convenção precisa definir quando major, minor e patch são alterados e como depreciação é comunicada."
  },
  {
    "kind": "paragraph",
    "text": "Deprecar envolve marcar deprecated, publicar substituição, medir uso, notificar consumidores, oferecer prazo e remover apenas após critérios. Um portal pode exibir aviso, mas o gateway e a observabilidade precisam identificar quem ainda chama a operação. Contrato sem telemetria não informa o impacto real da remoção."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Compatibilidade depende da direção dos dados e do comportamento dos consumidores.",
    "headers": [
      "Alteração",
      "Classificação provável",
      "Por que"
    ],
    "rows": [
      [
        "Remover operação",
        "Quebradora",
        "Clientes deixam de encontrar o endpoint."
      ],
      [
        "Adicionar propriedade opcional na resposta",
        "Potencialmente compatível",
        "Clientes estritos podem rejeitar campos desconhecidos."
      ],
      [
        "Adicionar valor a enum de resposta",
        "Potencialmente quebradora",
        "Consumidor pode não tratar o novo caso."
      ],
      [
        "Relaxar minLength de entrada",
        "Compatível para clientes",
        "Servidor passa a aceitar conjunto maior."
      ],
      [
        "Tornar parâmetro opcional obrigatório",
        "Quebradora",
        "Requisições existentes ficam inválidas."
      ],
      [
        "Adicionar exemplo",
        "Não quebradora",
        "Não altera validação, se o exemplo já for válido."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.21 OpenAPI 3.0, 3.1 e 3.2",
    "id": "12-21-openapi-3-0-3-1-e-3-2"
  },
  {
    "kind": "paragraph",
    "text": "A linha 3.0 reorganizou profundamente o modelo em relação à versão 2.0, introduzindo servers, components, requestBody e content por media type. A linha 3.1 aproximou o Schema Object do JSON Schema Draft 2020-12, permitiu expressar null como tipo, adicionou jsonSchemaDialect e refinou vários pontos de interoperabilidade."
  },
  {
    "kind": "paragraph",
    "text": "A OpenAPI 3.2.0 foi publicada como evolução posterior da especificação. A adoção em ambientes corporativos deve considerar suporte real de editores, geradores, validadores, portais e gateways. O fato de uma versão estar publicada não significa que toda cadeia de ferramentas a implemente imediatamente."
  },
  {
    "kind": "paragraph",
    "text": "Migração não deve ser feita apenas alterando o valor do campo openapi. Palavras-chave, nulabilidade, exemplos, referências e comportamento de ferramentas podem mudar. Execute conversão controlada, valide a descrição resultante, compare artefatos gerados e teste importação em todos os componentes críticos."
  },
  {
    "kind": "paragraph",
    "text": "Quando um gateway suporta apenas uma versão anterior, mantenha uma fonte canônica e uma transformação comprovada, em vez de editar duas descrições manualmente. Documente perdas de expressividade. Uma conversão que descarta webhooks, callbacks, tipos ou restrições pode produzir documentação aparentemente correta, mas semanticamente incompleta."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - A versão do contrato deve ser escolhida pela capacidade da cadeia completa.",
    "headers": [
      "Linha",
      "Características relevantes",
      "Atenção operacional"
    ],
    "rows": [
      [
        "3.0.x",
        "Modelo OAS 3 com components, requestBody e content.",
        "Schema Object possui diferenças em relação a JSON Schema completo."
      ],
      [
        "3.1.x",
        "Maior alinhamento ao JSON Schema 2020-12 e dialeto explícito.",
        "Ferramentas antigas podem interpretar nulabilidade e palavras-chave de forma diferente."
      ],
      [
        "3.2.x",
        "Evolução publicada da OAS.",
        "Confirmar suporte ponta a ponta antes de adotar como formato canônico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.22 Portais, catálogos e API Gateways",
    "id": "12-22-portais-catalogos-e-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Portais para desenvolvedores renderizam operações, schemas e exemplos a partir do contrato. Uma descrição bem organizada reduz documentação duplicada e permite exploração interativa. Entretanto, a interface de teste deve tratar autenticação, CORS, ambientes e dados com segurança. Habilitar chamadas de produção diretamente no navegador pode ser inadequado para operações sensíveis."
  },
  {
    "kind": "paragraph",
    "text": "Catálogos utilizam metadados para descoberta, ownership, classificação de dados, domínio, ciclo de vida e dependências. Parte desses dados pode ficar em extensões x-, mas a organização deve evitar acoplar o contrato a um catálogo específico sem necessidade. Uma camada de metadados externa pode complementar a OAS e preservar portabilidade."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways frequentemente importam OpenAPI para criar rotas, métodos, políticas ou produtos. A importação não substitui configuração de backends, timeouts, autenticação, transformações e observabilidade. Também pode haver diferenças entre o que o gateway aceita e a versão canônica. O pipeline deve validar a transformação antes de aplicar mudanças em produção."
  },
  {
    "kind": "paragraph",
    "text": "A publicação precisa ser idempotente e rastreável. O mesmo commit deve gerar o artefato do portal, a configuração do gateway e evidências de teste. Alterações manuais na console causam drift: o contrato diz uma coisa, o gateway executa outra. Exportar configuração e comparar estado ajuda a detectar divergências."
  },
  {
    "kind": "subhead",
    "text": "Contrato não é política de gateway completa"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI pode declarar interface e segurança esperada, mas rate limiting, quotas, circuit breakers, transformações, roteamento, logging e proteção de ameaças normalmente exigem configuração adicional. Extensões podem ajudar, desde que sejam padronizadas e portáveis quando possível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.23 Governança e CI/CD",
    "id": "12-23-governanca-e-ci-cd"
  },
  {
    "kind": "paragraph",
    "text": "Governança eficaz transforma padrões em feedback automatizado. O repositório deve conter a fonte canônica, regras de lint, exemplos, changelog e ownership. Pull requests executam parser, resolução, linter, validação de exemplos, diff de compatibilidade, testes e geração de preview. Aprovações podem variar conforme risco: uma correção textual não exige o mesmo fluxo de uma remoção de operação."
  },
  {
    "kind": "paragraph",
    "text": "Políticas precisam distinguir requisitos universais de convenções por domínio. Toda API pode exigir operationId único, segurança explícita e modelo de erro; paginação ou idempotency key dependem da operação. Regras excessivamente genéricas produzem contratos artificiais e extensões para contornar o padrão."
  },
  {
    "kind": "paragraph",
    "text": "Artefatos devem ser imutáveis e promovidos entre ambientes. Gerar novamente o contrato em cada estágio pode introduzir diferenças. Assine ou registre checksum, associe versão ao commit e preserve relatório de validação. Quando o gateway transforma a descrição, armazene também o artefato efetivamente importado."
  },
  {
    "kind": "paragraph",
    "text": "Métricas de governança podem incluir cobertura de respostas, porcentagem de operações com exemplos, violações por regra, tempo de revisão, mudanças quebradoras bloqueadas, contratos divergentes do runtime e uso de operações deprecadas. Métricas devem orientar melhoria, não incentivar preenchimento superficial."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/pt/figure-04.svg",
    "alt": "Pipeline de governança reduzindo divergência entre contrato, portal, gateway e runtime",
    "caption": "Figura 4 - A automação reduz divergência e mantém evidências do contrato promovido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.24 Troubleshooting",
    "id": "12-24-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Quando uma ferramenta rejeita o contrato, identifique primeiro a camada da falha: YAML/JSON inválido, regra da OAS, referência não resolvida, palavra-chave de JSON Schema, extensão desconhecida ou limitação específica do produto. Testar o mesmo arquivo em vários editores sem registrar versões pode confundir, pois cada implementação possui cobertura diferente."
  },
  {
    "kind": "paragraph",
    "text": "Erros de referência exigem verificar base URI, caminho relativo, JSON Pointer, codificação de caracteres e disponibilidade do recurso. Em ambientes isolados, referências HTTP externas podem falhar. Empacotar dependências ou usar um registry interno torna builds reproduzíveis. Ciclos podem ser válidos para modelos recursivos, mas alguns geradores não os suportam."
  },
  {
    "kind": "paragraph",
    "text": "Quando documentação e runtime divergem, capture a requisição e resposta reais, identifique a operação por method e path, valide media type e schema, confira versão implantada e compare commit do contrato. O problema pode estar no backend, gateway, transformação, cache do portal ou artefato antigo. Hash e identificador de build expostos em metadados ajudam a correlacionar."
  },
  {
    "kind": "paragraph",
    "text": "Falhas de importação em gateway precisam ser reproduzidas com o artefato exato. Verifique versão OAS aceita, tamanho, extensões, schemas complexos, operationIds duplicados, paths incompatíveis e security schemes. Não simplifique o contrato manualmente sem registrar o que foi perdido; crie transformação automatizada e teste regressão."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Diagnóstico deve separar validade da especificação, suporte da ferramenta e conformidade do runtime.",
    "headers": [
      "Sintoma",
      "Hipótese inicial",
      "Evidência"
    ],
    "rows": [
      [
        "Editor não abre o arquivo",
        "Sintaxe YAML/JSON ou tamanho excessivo.",
        "Parser local, linha/coluna e encoding."
      ],
      [
        "$ref não encontrado",
        "Base relativa, pointer ou arquivo ausente.",
        "URI resolvida e bundle gerado."
      ],
      [
        "SDK muda nomes inesperadamente",
        "operationId ou nome de schema instável.",
        "Diff do contrato e configuração do gerador."
      ],
      [
        "Portal mostra versão antiga",
        "Cache ou artefato não promovido.",
        "Checksum, commit e timestamp da publicação."
      ],
      [
        "Gateway ignora restrição",
        "Importador não suporta palavra-chave.",
        "Matriz de suporte e configuração efetiva."
      ],
      [
        "Resposta real falha no schema",
        "Drift de runtime ou schema incorreto.",
        "Payload mascarado e relatório de validação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.25 Estudos de caso e laboratórios",
    "id": "12-25-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudo de caso 1 - contrato gerado depois do backend"
  },
  {
    "kind": "paragraph",
    "text": "Uma equipe implementou endpoints e gerou OpenAPI por anotações. O contrato publicado continha apenas respostas 200, schemas sem required e operationIds derivados dos nomes dos métodos Java. Após uma refatoração interna, SDKs foram regenerados com nomes diferentes e consumidores precisaram alterar código apesar de URLs e payloads permanecerem iguais."
  },
  {
    "kind": "paragraph",
    "text": "A correção foi estabilizar operationIds, modelar respostas de erro, declarar obrigatoriedade e submeter o artefato gerado a diff e revisão. O caso mostra que code-first não elimina design de contrato; apenas desloca o ponto em que ele precisa ser controlado."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estudo de caso 2 - importação parcial no gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um contrato OpenAPI 3.1 utilizava palavras-chave de JSON Schema não reconhecidas pelo importador do gateway. A importação terminava sem erro grave, mas algumas restrições eram descartadas. O portal mostrava o schema completo enquanto o runtime aceitava mensagens mais amplas."
  },
  {
    "kind": "paragraph",
    "text": "A equipe criou uma etapa de transformação para a versão suportada, publicou um relatório de perdas e manteve validação de mensagens críticas em componente compatível. Testes de regressão passaram a comparar o contrato canônico, o artefato transformado e o comportamento efetivo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - construir e validar uma API de clientes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Crie info, servers e tags para uma API fictícia de clientes.",
      "Descreva GET /clientes/{clienteId} e POST /clientes com operationIds estáveis.",
      "Modele Cliente, NovoCliente e Problem Details em components/schemas.",
      "Inclua parâmetros, exemplos, respostas 201, 400, 401, 404, 409 e 500 conforme o comportamento definido.",
      "Execute parser, validação estrutural e linter; corrija cada diagnóstico registrando a causa."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - detectar mudanças quebradoras"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Crie uma versão inicial do contrato e gere um cliente.",
      "Remova uma propriedade, torne outra obrigatória e adicione um valor de enum de resposta.",
      "Execute um diff semântico e classifique cada mudança pela direção dos dados.",
      "Restaure compatibilidade ou proponha uma nova versão major com plano de depreciação."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - publicar com mock e gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Inicie um mock server a partir dos exemplos e valide um consumidor simples.",
      "Gere um bundle para importação e compare-o com a fonte modular.",
      "Importe em um ambiente autorizado de gateway ou simulador e registre campos ignorados.",
      "Compare uma resposta real com o schema e produza relatório de conformidade."
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
    "text": "OpenAPI fornece uma linguagem padronizada para descrever interfaces HTTP de forma legível e processável. O contrato conecta consumidores, backend, testes, documentação, portal, gateway e governança. Seu valor depende da precisão de paths, operações, parâmetros, corpos, respostas, schemas e segurança."
  },
  {
    "kind": "paragraph",
    "text": "A descrição não substitui implementação nem garante conformidade. Parsing, validação, linting, exemplos, testes e observabilidade são necessários para manter contrato e runtime alinhados. Reuso com components e $ref reduz duplicação, mas exige controle de identidade, modularização e compatibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Design-first, code-first e abordagens híbridas podem funcionar quando existe uma fonte de verdade e um pipeline que bloqueia divergências. Mudanças quebradoras precisam ser detectadas semanticamente e avaliadas pelo comportamento real dos consumidores. A versão da OAS, a versão do contrato e a versão pública da API são conceitos distintos."
  },
  {
    "kind": "paragraph",
    "text": "Em plataformas corporativas, OpenAPI deve ser tratado como artefato governado: versionado, revisado, validado, promovido e correlacionado com o estado do gateway e do portal. Um arquivo que apenas renderiza em uma UI não é suficiente; o objetivo é um contrato confiável que reduza ambiguidade e permita automação segura."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "Depois de formalizar o contrato com OpenAPI, o curso pode aprofundar versionamento, compatibilidade, governança e ciclo de vida de APIs, conectando decisões de design a publicação, depreciação e operação em escala."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de revisão de uma OpenAPI Description",
    "id": "checklist-de-revisao-de-uma-openapi-description"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A versão openapi é suportada por parser, portal, gerador e gateway usados no pipeline.",
      "info identifica API, versão, responsável e escopo sem confundir versão da OAS.",
      "Cada operação possui summary, operationId único, tags, entradas e respostas relevantes.",
      "Parâmetros possuem localização, obrigatoriedade, schema e serialização coerentes.",
      "Request bodies e responses declaram media types realmente suportados.",
      "Schemas possuem tipos, required, limites e estratégia para campos desconhecidos.",
      "Erros seguem modelo comum e preservam status, correlação e detalhes seguros.",
      "Security schemes e requisitos representam corretamente alternativas e combinações.",
      "Examples são sintéticos, válidos e testados automaticamente.",
      "Referências são resolvíveis e o bundle publicado é reproduzível.",
      "O diff de compatibilidade é executado contra a versão atualmente suportada.",
      "Portal, gateway e runtime podem ser correlacionados ao mesmo commit e checksum."
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
      "Explique por que uma OpenAPI Description válida pode ainda ser um contrato fraco.",
      "Diferencie OpenAPI Specification, OpenAPI Description, Swagger 2.0 e Swagger UI.",
      "Modele a operação PATCH /clientes/{id} e descreva a diferença entre campo ausente e null.",
      "Crie um Parameter Object para uma lista de status e escolha style/explode, justificando a serialização.",
      "Modele respostas 200, 304, 404 e 412 para um GET condicional com ETag.",
      "Compare allOf e oneOf e apresente um caso em que alternativas sobrepostas tornam oneOf inválido.",
      "Descreva como exigir simultaneamente OAuth 2.0 e mTLS e como declarar alternativas.",
      "Classifique como compatível ou quebradora a adição de uma propriedade opcional em resposta.",
      "Proponha pipeline de governança para contrato design-first publicado em um API Gateway.",
      "Explique como investigar uma divergência entre documentação do portal e resposta real."
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
    "caption": "Tabela 9 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "OAS",
        "OpenAPI Specification, padrão para descrição de APIs HTTP."
      ],
      [
        "OAD",
        "OpenAPI Description, documento concreto que descreve uma API."
      ],
      [
        "OpenAPI Object",
        "Objeto raiz da descrição."
      ],
      [
        "Path Item",
        "Objeto associado a um template de caminho e suas operações."
      ],
      [
        "Operation Object",
        "Descrição de uma operação HTTP específica."
      ],
      [
        "Schema Object",
        "Estrutura e restrições de dados em parâmetros e mensagens."
      ],
      [
        "JSON Schema",
        "Vocabulário para descrever e validar documentos JSON."
      ],
      [
        "$ref",
        "Referência a outro objeto ou documento."
      ],
      [
        "Bundling",
        "Empacotamento de documentos mantendo referências."
      ],
      [
        "Dereferencing",
        "Substituição de referências pelo conteúdo referenciado."
      ],
      [
        "Linting",
        "Aplicação de regras de qualidade e governança."
      ],
      [
        "Semantic diff",
        "Comparação que considera impacto do contrato, não apenas texto."
      ],
      [
        "Mock server",
        "Servidor simulado baseado no contrato e exemplos."
      ],
      [
        "Design-first",
        "Processo em que o contrato antecede a implementação."
      ],
      [
        "Code-first",
        "Processo em que o contrato é derivado do código."
      ],
      [
        "Drift",
        "Divergência entre contrato, configuração publicada e runtime."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Exemplo integrado de contrato",
    "id": "anexo-a-exemplo-integrado-de-contrato"
  },
  {
    "kind": "paragraph",
    "text": "O trecho a seguir reúne os elementos centrais estudados: metadados, servidor, path, operação, parâmetro, segurança, resposta e schema reutilizável. Ele é propositalmente compacto e deve ser expandido com erros, exemplos e regras específicas antes de uso real."
  },
  {
    "kind": "code",
    "text": "Exemplo consolidado em YAML\nopenapi: 3.1.1\ninfo:\n  title: API de Clientes\n  version: 1.0.0\nservers:\n  - url: https://api.empresa.example/clientes/v1\npaths:\n  /clientes/{clienteId}:\n    get:\n      operationId: obterCliente\n      security:\n        - OAuthCorporativo: [clientes.leitura]\n      parameters:\n        - name: clienteId\n          in: path\n          required: true\n          schema: { type: string, pattern: '^[0-9]{10}$' }\n      responses:\n        '200':\n          description: Cliente localizado\n          content:\n            application/json:\n              schema: { $ref: '#/components/schemas/Cliente' }\n        '404': { $ref: '#/components/responses/NaoEncontrado' }\ncomponents:\n  securitySchemes:\n    OAuthCorporativo:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes: { clientes.leitura: Consulta clientes }\n  schemas:\n    Cliente:\n      type: object\n      required: [id, nome, status]\n      properties:\n        id: { type: string }\n        nome: { type: string, maxLength: 120 }\n        status: { type: string, enum: [ATIVO, BLOQUEADO] }"
  },
  {
    "kind": "subhead",
    "text": "Como usar o anexo"
  },
  {
    "kind": "paragraph",
    "text": "Valide o trecho, gere documentação, inicie um mock e depois acrescente respostas de autenticação, autorização, validação, conflito e indisponibilidade. Em seguida, execute um diff após alterar enum, required e schemas para observar o impacto."
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
      "OpenAPI Initiative. OpenAPI Specification 3.2.0. Documento normativo publicado em 19 set. 2025.",
      "OpenAPI Initiative. OpenAPI Specification 3.1.1. Documento normativo publicado em 24 out. 2024.",
      "OpenAPI Initiative. Learn OpenAPI - Introduction, Structure, Paths, Components, Security, Referencing e Best Practices.",
      "JSON Schema. Draft 2020-12 - Core e Validation specifications.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9111 - HTTP Caching.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "Fielding, Roy T. Architectural Styles and the Design of Network-based Software Architectures. 2000.",
      "OpenAPI Initiative. Arazzo Specification 1.1.0, para descrição de sequências de chamadas e dependências."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota sobre versões"
  },
  {
    "kind": "paragraph",
    "text": "A especificação e o suporte das ferramentas evoluem. Antes de adotar recursos de uma versão, consulte a documentação oficial e teste toda a cadeia: editor, parser, linter, gerador, portal, gateway e runtime. Este material prioriza princípios duráveis e usa a família OpenAPI 3 como base."
  }
];
