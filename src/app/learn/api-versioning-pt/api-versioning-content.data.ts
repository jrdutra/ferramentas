import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const API_VERSIONING_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Evolução controlada: mudar sem surpreender consumidores"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/pt/overview.svg",
    "alt": "Contrato, mudança, coexistência, depreciação e retirada como etapas da evolução de APIs",
    "caption": "Figura de abertura - A evolução segura transforma mudanças em um processo observável e governado."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Compatibilidade é percebida pelo consumidor; a versão é apenas um mecanismo de coordenação."
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
    "text": "No capítulo anterior, rate limiting, quotas e throttling foram apresentados como parte do contrato operacional de uma API. Reduzir um limite, alterar a unidade de consumo ou modificar o comportamento de uma resposta 429 pode quebrar consumidores mesmo quando nenhum campo JSON mudou. Essa observação conduz ao tema central deste capítulo: uma API é compatível quando continua atendendo às expectativas legítimas dos consumidores, e não apenas quando o arquivo OpenAPI ainda pode ser analisado."
  },
  {
    "kind": "paragraph",
    "text": "API Versioning é frequentemente reduzido à escolha entre colocar v1 no caminho, em um header ou em um parâmetro. Essa escolha é importante, mas representa apenas a parte visível. O problema real é coordenar evolução em um sistema distribuído: contratos foram publicados, SDKs foram gerados, aplicações incorporaram comportamentos e integrações podem estar fora do controle direto do provedor. Alterar a API passa a exigir análise de impacto, comunicação, coexistência e evidências de migração."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo de vida amplia essa análise. Uma versão precisa nascer com critérios de estabilidade, tornar-se ativa, receber correções, comunicar mudanças, entrar em depreciação e eventualmente ser retirada. Sem governança, versões se acumulam no gateway, vulnerabilidades permanecem em contratos antigos e consumidores descobrem a retirada apenas quando o tráfego falha."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo apresenta modelos de compatibilidade, taxonomia de mudanças, estratégias de seleção de versão, evolução de schemas, versionamento em REST, GraphQL, gRPC e eventos, versões e revisões no Azure API Management, depreciação com os headers Deprecation e Sunset, telemetria, testes de contrato e o padrão expand-migrate-contract."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada mudança, responda: quem produz o dado, quem o interpreta, qual comportamento anterior foi prometido, quais consumidores ainda dependem dele e qual evidência demonstra que a mudança é segura. Evite classificar alterações apenas pela aparência do diff."
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
      "Explicar por que evolução de API é um problema de contrato distribuído e não apenas de código.",
      "Distinguir compatibilidade sintática, estrutural, semântica, comportamental e operacional.",
      "Classificar mudanças em requests, responses, schemas, erros, segurança e limites.",
      "Aplicar versionamento semântico com senso crítico em APIs remotas.",
      "Comparar versionamento por path, query string, header, media type e data.",
      "Planejar coexistência, migração e retirada de versões em API Gateways.",
      "Diferenciar versão pública, revisão, release de implementação e versão da especificação.",
      "Utilizar Deprecation, Sunset, changelogs e guias de migração.",
      "Aplicar diff semântico, testes de contrato, telemetria e quality gates.",
      "Diagnosticar roteamento incorreto, contract drift e consumidores presos em versões antigas."
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
      "28.1 Por que APIs precisam evoluir; 28.2 Contrato público; 28.3 Dimensões de compatibilidade; 28.4 Direção dos dados; 28.5 Taxonomia de mudanças; 28.6 SemVer; 28.7 Dimensões de versão; 28.8 Path; 28.9 Query, header e media type; 28.10 Versões por data; 28.11 Critérios de escolha; 28.12 Schemas e enums; 28.13 Operações, erros, segurança e limites; 28.14 REST, GraphQL, gRPC e eventos; 28.15 Dados persistentes; 28.16 Coexistência; 28.17 Azure APIM; 28.18 Ciclo de vida; 28.19 Depreciação e Sunset; 28.20 Comunicação; 28.21 Telemetria; 28.22 Diff e testes; 28.23 Expand-migrate-contract; 28.24 Gateway e troubleshooting; 28.25 Estudos de caso e laboratórios."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.1 Por que APIs precisam evoluir",
    "id": "28-1-por-que-apis-precisam-evoluir"
  },
  {
    "kind": "paragraph",
    "text": "APIs evoluem porque o domínio muda. Novas regras regulatórias, produtos, canais, parceiros e requisitos de segurança exigem informações adicionais ou comportamentos diferentes. Também existem motivos técnicos: correção de modelagem, melhoria de desempenho, substituição de dependências, adoção de novos formatos e eliminação de vulnerabilidades. Congelar uma interface para sempre transfere custo ao backend, que passa a manter adaptações e exceções indefinidamente."
  },
  {
    "kind": "paragraph",
    "text": "Ao mesmo tempo, uma API publicada cria dependência. O consumidor pode compilar um SDK, persistir respostas, validar enums como conjuntos fechados, usar um status HTTP para controle de fluxo ou assumir determinada ordenação. Essas suposições nem sempre aparecem no contrato formal. Uma mudança pequena para o provedor pode ser quebradora para aplicações que incorporaram o comportamento anterior."
  },
  {
    "kind": "paragraph",
    "text": "A evolução segura separa mudança interna de mudança observável. Refatorar classes, trocar banco ou mover o serviço entre clusters não exige nova versão quando o contrato e as características prometidas permanecem. Alterar campo obrigatório, remover valor aceito ou mudar semântica de operação afeta a interface pública, mesmo que a URL continue igual."
  },
  {
    "kind": "subhead",
    "text": "Princípio de arquitetura"
  },
  {
    "kind": "paragraph",
    "text": "Nova implantação não implica automaticamente nova versão pública. Uma nova versão pública é necessária quando o contrato observável muda de forma incompatível ou quando a organização precisa oferecer comportamentos distintos explicitamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.2 O contrato público de uma API",
    "id": "28-2-o-contrato-publico-de-uma-api"
  },
  {
    "kind": "paragraph",
    "text": "O contrato público inclui tudo aquilo que o consumidor pode observar e em que foi autorizado a confiar. Paths, métodos, parâmetros, schemas, status, headers, media types e requisitos de segurança formam a parte explícita. Latência acordada, limites, ordenação, consistência, idempotência, política de retry e janela de disponibilidade podem formar uma parte operacional igualmente relevante."
  },
  {
    "kind": "paragraph",
    "text": "O contrato não se limita ao documento OpenAPI. Ele também existe no gateway, na implementação, no portal, nos SDKs e no comportamento real de produção. Quando essas representações divergem, surge contract drift. Comparar a nova proposta apenas com um arquivo desatualizado produz falsa segurança; a baseline deve corresponder à versão realmente publicada e suportada."
  },
  {
    "kind": "paragraph",
    "text": "O consumidor não precisa conhecer detalhes internos, mas precisa de previsibilidade. O provedor pode alterar a implementação livremente enquanto preserva semântica e garantias. A fronteira entre liberdade interna e compromisso externo é a essência de uma estratégia de versionamento madura."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.3 Dimensões de compatibilidade",
    "id": "28-3-dimensoes-de-compatibilidade"
  },
  {
    "kind": "paragraph",
    "text": "Compatibilidade sintática significa que a mensagem ainda pode ser analisada. Compatibilidade estrutural indica que tipos, propriedades e restrições continuam aceitos. Compatibilidade semântica exige que o significado permaneça. Compatibilidade comportamental observa efeitos, transições e erros. Compatibilidade operacional inclui desempenho, disponibilidade, limites e características necessárias para o consumidor cumprir seus próprios objetivos."
  },
  {
    "kind": "paragraph",
    "text": "Uma API pode permanecer estruturalmente compatível e quebrar semanticamente: o campo continua sendo string, mas o mesmo valor passa a significar outro estado. Pode também manter a semântica e falhar operacionalmente quando a paginação diminui, o rate limit é reduzido ou o timeout cresce além da jornada do consumidor. O diff do contrato é necessário, mas não suficiente."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Compatibilidade precisa ser avaliada em várias dimensões.",
    "headers": [
      "Dimensão",
      "Pergunta de verificação",
      "Exemplo de quebra"
    ],
    "rows": [
      [
        "Sintática",
        "A mensagem ainda pode ser lida?",
        "Media type removido ou payload inválido."
      ],
      [
        "Estrutural",
        "Tipos e restrições continuam compatíveis?",
        "Campo muda de string para inteiro."
      ],
      [
        "Semântica",
        "O significado permaneceu?",
        "Mesmo valor passa a representar outro estado."
      ],
      [
        "Comportamental",
        "Efeitos, ordem e erros permanecem?",
        "POST antes idempotente passa a duplicar."
      ],
      [
        "Operacional",
        "SLA, limites e volume permanecem viáveis?",
        "Página máxima ou quota reduzida."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.4 Direção dos dados e perspectiva do consumidor",
    "id": "28-4-direcao-dos-dados-e-perspectiva-do-consumidor"
  },
  {
    "kind": "paragraph",
    "text": "A mesma alteração pode ter impacto oposto conforme a direção do dado. Em um request, o consumidor produz e o provedor interpreta. Tornar a validação do provedor mais permissiva geralmente preserva requests antigos; torná-la mais restritiva pode rejeitá-los. Em uma response, o provedor produz e o consumidor interpreta; acrescentar possibilidades pode exigir tolerância que o cliente não possui."
  },
  {
    "kind": "paragraph",
    "text": "Adicionar valor de enum em request costuma ser compatível para consumidores existentes, pois eles podem continuar enviando valores conhecidos. Adicionar valor em response pode quebrar clientes que mapearam o conjunto como fechado. Ferramentas de diff precisam conhecer essa direção; regras genéricas como “adição é compatível” produzem falsos negativos."
  },
  {
    "kind": "paragraph",
    "text": "Callbacks, webhooks e eventos invertem papéis tradicionais. A organização que normalmente atua como servidor passa a produzir mensagens consumidas por terceiros. A revisão precisa registrar claramente quem produz e quem interpreta cada elemento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/pt/figure-01-data-direction.svg",
    "alt": "Compatibilidade analisada conforme a direção dos dados entre consumidor e provedor",
    "caption": "Figura 1 - A direção dos dados muda a classificação de compatibilidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.5 Taxonomia de mudanças",
    "id": "28-5-taxonomia-de-mudancas"
  },
  {
    "kind": "paragraph",
    "text": "Mudanças aditivas acrescentam elementos sem remover existentes: operação nova, campo opcional ou media type adicional. Costumam ser compatíveis, mas não são automaticamente seguras. Campo adicional em response pode quebrar desserializadores estritos; valor novo de enum pode atingir um switch sem caso default; rota nova pode colidir com rota genérica no gateway."
  },
  {
    "kind": "paragraph",
    "text": "Mudanças restritivas reduzem o conjunto de mensagens aceitas. Tornar campo obrigatório, diminuir maxLength, eliminar enum ou aceitar menos formatos tende a quebrar requests antes válidos. Mudanças substitutivas trocam um elemento por outro, como renomear propriedade, path ou escopo OAuth. Mudanças comportamentais preservam estrutura, mas alteram regra, side effect, consistência, ordenação ou política de erro."
  },
  {
    "kind": "paragraph",
    "text": "A classificação deve registrar direção, alcance e mitigação. Uma mudança pode ser compatível para requests e incompatível para responses; segura para clientes tolerantes e arriscada para SDKs gerados; aceitável em preview e inadequada em produção."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Taxonomia prática para revisão de mudanças.",
    "headers": [
      "Categoria",
      "Exemplo",
      "Risco principal"
    ],
    "rows": [
      [
        "Aditiva",
        "Nova propriedade opcional em response.",
        "Cliente rejeita campos desconhecidos."
      ],
      [
        "Restritiva",
        "Campo antes opcional torna-se required.",
        "Requests existentes passam a falhar."
      ],
      [
        "Substitutiva",
        "Renomear clienteId para id.",
        "Código e SDK precisam mudar."
      ],
      [
        "Comportamental",
        "Mudar ordenação padrão.",
        "Paginação e resultados deixam de ser estáveis."
      ],
      [
        "Operacional",
        "Reduzir timeout, quota ou rate limit.",
        "Consumidor não cumpre sua jornada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.6 Versionamento semântico e seus limites",
    "id": "28-6-versionamento-semantico-e-seus-limites"
  },
  {
    "kind": "paragraph",
    "text": "Semantic Versioning utiliza MAJOR.MINOR.PATCH. A major aumenta quando há mudança incompatível na API pública; minor quando há funcionalidade compatível; patch quando há correção compatível. O modelo é valioso porque obriga a declarar uma interface pública e atribui significado à mudança de número."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs remotas, SemVer precisa de senso crítico. O consumidor não escolhe necessariamente uma versão exata do servidor como escolhe uma biblioteca. O provedor pode implantar continuamente sob o mesmo endpoint, e características operacionais também fazem parte da experiência. Publicar 1.4.3 em info.version não determina como o gateway selecionará a versão."
  },
  {
    "kind": "paragraph",
    "text": "Muitas organizações expõem apenas a major, como v1, e tratam minor e patch como releases compatíveis sob a mesma interface. Essa abordagem reduz proliferação de endpoints, mas exige disciplina rigorosa na classificação de compatibilidade. SemVer não substitui política de depreciação, suporte ou migração."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - SemVer comunica intenção, mas depende de regras claras de compatibilidade.",
    "headers": [
      "Número",
      "Intenção",
      "Uso possível em APIs"
    ],
    "rows": [
      [
        "MAJOR",
        "Mudança incompatível.",
        "Nova interface selecionável: v1 para v2."
      ],
      [
        "MINOR",
        "Funcionalidade compatível.",
        "Release compatível sob a mesma major."
      ],
      [
        "PATCH",
        "Correção compatível.",
        "Correção de implementação sem novo contrato público."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.7 Versão pública, contrato, implementação e especificação",
    "id": "28-7-versao-publica-contrato-implementacao-e-especificacao"
  },
  {
    "kind": "paragraph",
    "text": "Uma arquitetura madura distingue diferentes números. A versão pública identifica uma interface selecionável pelo consumidor. A versão do contrato identifica uma revisão do documento OpenAPI ou do schema. A versão da implementação identifica build ou release do backend. A versão da especificação, como OpenAPI 3.1, informa qual dialeto descreve o documento."
  },
  {
    "kind": "paragraph",
    "text": "Esses números mudam por razões diferentes. O backend pode receber várias implantações sem alterar a versão pública. O contrato pode corrigir uma descrição sem mudar o runtime. Migrar a descrição de OpenAPI 3.0 para 3.1 não exige criar v2. Confundir dimensões produz URLs instáveis e dificulta auditoria."
  },
  {
    "kind": "paragraph",
    "text": "Logs e métricas devem registrar versão pública solicitada, revisão do gateway, build do backend e checksum do contrato. Essa correlação permite investigar quando respostas aparentemente da mesma API vieram de implementações diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Não trate todos os números como uma única versão.",
    "headers": [
      "Dimensão",
      "Exemplo",
      "Uso"
    ],
    "rows": [
      [
        "Versão pública",
        "v2",
        "Consumidor, portal e roteamento."
      ],
      [
        "Contrato",
        "2.3.0",
        "Diff, testes, catálogo e governança."
      ],
      [
        "Implementação",
        "build 2026.07.16.4",
        "Deploy, rollback e observabilidade."
      ],
      [
        "Especificação",
        "openapi: 3.1.1",
        "Parser, editor e geradores."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.8 Versionamento no caminho da URI",
    "id": "28-8-versionamento-no-caminho-da-uri"
  },
  {
    "kind": "paragraph",
    "text": "O versionamento por path coloca o identificador em uma parte visível da URI, como /v1/clientes. É simples de compreender, aparece em logs sem inspeção de headers e costuma ser facilmente roteado por gateways. Também permite documentação e políticas separadas por base path."
  },
  {
    "kind": "paragraph",
    "text": "A principal desvantagem é transformar a versão em parte da identidade do recurso. /v1/clientes/10 e /v2/clientes/10 são URIs diferentes, mesmo representando a mesma entidade. Links, caches e integrações precisam ser atualizados. O padrão funciona melhor quando apenas mudanças major incompatíveis geram novo caminho."
  },
  {
    "kind": "paragraph",
    "text": "O gateway deve impedir ambiguidades, como /v1beta colidir com /v1, e precisa definir o comportamento de paths sem versão. Redirecionar silenciosamente para a versão mais nova pode ser perigoso; rejeição explícita ou versão default documentada são escolhas mais previsíveis."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de versão no caminho"
  },
  {
    "kind": "code",
    "text": "GET /v2/clientes/123 HTTP/1.1\nHost: api.empresa.example\nAccept: application/json"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.9 Query string, header e media type",
    "id": "28-9-query-string-header-e-media-type"
  },
  {
    "kind": "paragraph",
    "text": "A query string expressa a versão como parâmetro, por exemplo ?api-version=2026-07-01. Preserva o caminho e é comum em serviços que versionam por data. Gateways e caches precisam incluir o parâmetro na chave e impedir que valores desconhecidos sejam ignorados silenciosamente."
  },
  {
    "kind": "paragraph",
    "text": "Um header dedicado, como Api-Version: 2, mantém a URI estável e torna a negociação explícita. A desvantagem é menor visibilidade em ferramentas simples e logs que não registram headers. WAF, CORS, proxies e observabilidade precisam preservar o campo corretamente."
  },
  {
    "kind": "paragraph",
    "text": "Versionamento por media type utiliza Accept, como application/vnd.empresa.cliente-v2+json. Ele combina formato e versão de representação e se alinha à negociação de conteúdo. Entretanto, aumenta complexidade de tooling e exige Vary: Accept quando a resposta muda conforme o header."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/pt/figure-02-version-selection.svg",
    "alt": "Estratégias para selecionar versões por path, query, header e media type",
    "caption": "Figura 2 - Estratégias de seleção possuem trade-offs em visibilidade, cache e operação."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A escolha deve funcionar em toda a cadeia técnica.",
    "headers": [
      "Mecanismo",
      "Vantagem",
      "Cuidado"
    ],
    "rows": [
      [
        "Path",
        "Visível e simples de rotear.",
        "Muda a URI e tende a proliferar."
      ],
      [
        "Query",
        "Boa para versões por data.",
        "Cache e links devem preservar o parâmetro."
      ],
      [
        "Header",
        "Mantém o caminho estável.",
        "Menor visibilidade e maior dependência de tooling."
      ],
      [
        "Media type",
        "Negocia versão e representação.",
        "Complexidade de clientes e caches."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Versões por data, como 2026-07-01, comunicam uma baseline temporal em vez de uma sequência major. São úteis em plataformas com muitas mudanças coordenadas ou quando o consumidor precisa fixar o comportamento conhecido em determinada data. A data não significa necessariamente data de deploy; ela representa um contrato publicado e precisa ser imutável depois de disponibilizado."
  },
  {
    "kind": "paragraph",
    "text": "Outra abordagem combina versão major com níveis de estabilidade: alpha, beta e stable. Alpha admite mudanças frequentes e suporte limitado; beta sinaliza maior maturidade, mas ainda pode evoluir; stable oferece compromissos de compatibilidade e suporte. Esses rótulos só têm valor quando existem critérios claros de promoção e retirada."
  },
  {
    "kind": "paragraph",
    "text": "Versões por data e rótulos de estabilidade não eliminam a necessidade de compatibilidade. Eles apenas expressam melhor o modelo de ciclo de vida escolhido pela organização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.11 Critérios para escolher uma estratégia",
    "id": "28-11-criterios-para-escolher-uma-estrategia"
  },
  {
    "kind": "paragraph",
    "text": "Não existe mecanismo universalmente melhor. A decisão precisa considerar consumidores, caching, observabilidade, portais, SDKs, infraestrutura, políticas corporativas e capacidade de operação. Path costuma favorecer simplicidade; header e media type favorecem URI estável; query funciona bem para baselines por data. Consistência organizacional é mais importante que preferência individual."
  },
  {
    "kind": "paragraph",
    "text": "A estratégia também precisa definir versões ausentes, desconhecidas e retiradas. O gateway deve responder de forma previsível, com mensagem de erro padronizada e link para documentação. Fallback silencioso para a versão mais próxima pode mascarar falhas e produzir comportamento incorreto."
  },
  {
    "kind": "paragraph",
    "text": "Quando diferentes equipes adotam mecanismos incompatíveis, o custo aparece no portal, nos clientes e na observabilidade. Um padrão corporativo deve permitir exceções justificadas, mas precisa manter critérios comuns de compatibilidade, ciclo de vida e depreciação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.12 Evolução de schemas, campos, enums e nullability",
    "id": "28-12-evolucao-de-schemas-campos-enums-e-nullability"
  },
  {
    "kind": "paragraph",
    "text": "Adicionar campo opcional em request normalmente é compatível porque clientes antigos simplesmente não o enviam. Torná-lo obrigatório quebra mensagens existentes. Em response, adicionar campo pode quebrar clientes estritos. Remover campo, alterar tipo, diminuir limites ou mudar nullability tende a ser incompatível."
  },
  {
    "kind": "paragraph",
    "text": "Enums exigem atenção especial. Em request, adicionar valor aceito pelo servidor não obriga clientes antigos a usá-lo. Em response, o novo valor pode quebrar SDKs que geraram enum fechado. Uma política de evolução deve definir se consumidores precisam ignorar valores desconhecidos ou mapear um estado UNKNOWN."
  },
  {
    "kind": "paragraph",
    "text": "JSON Schema, OpenAPI e geradores de SDK podem interpretar ausência, null e valor vazio de formas diferentes. Alterar campo de nullable para não nullable, mudar default ou passar a omitir propriedades pode afetar lógica mesmo quando o tipo nominal permanece igual."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - A direção da mensagem altera a análise de compatibilidade.",
    "headers": [
      "Mudança",
      "Request",
      "Response"
    ],
    "rows": [
      [
        "Adicionar campo opcional",
        "Geralmente compatível.",
        "Condicional: cliente deve tolerar desconhecidos."
      ],
      [
        "Tornar campo required",
        "Quebradora.",
        "Pode quebrar parsing e expectativas."
      ],
      [
        "Adicionar enum",
        "Geralmente compatível.",
        "Arriscada para clientes com enum fechado."
      ],
      [
        "Mudar tipo",
        "Quebradora.",
        "Quebradora."
      ],
      [
        "Alterar nullability",
        "Normalmente quebradora.",
        "Pode quebrar validação e lógica."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Adicionar operação costuma ser compatível, mas pode colidir com rotas genéricas. Remover ou renomear path ou método é quebrador. Tornar parâmetro obrigatório, mudar localização de query para header, alterar encoding ou eliminar media type exige migração coordenada."
  },
  {
    "kind": "paragraph",
    "text": "Status HTTP e modelos de erro fazem parte do contrato. Trocar 404 por 200 com corpo vazio, alterar 409 para 422 ou substituir estrutura de erro pode quebrar retry, observabilidade e controle de fluxo. O provedor deve manter códigos estáveis ou fornecer uma nova versão com guia claro de migração."
  },
  {
    "kind": "paragraph",
    "text": "Mudanças em segurança são frequentemente incompatíveis: exigir novo escopo OAuth, trocar audience, remover API key, exigir mTLS ou alterar assinatura de requests. O mesmo vale para rate limits, quotas, timeouts e paginação. A versão pública deve refletir mudanças que inviabilizam consumidores existentes, ainda que o payload permaneça idêntico."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.14 Versionamento em REST, GraphQL, gRPC e eventos",
    "id": "28-14-versionamento-em-rest-graphql-grpc-e-eventos"
  },
  {
    "kind": "paragraph",
    "text": "Em REST, versões aparecem frequentemente no path, query, header ou media type. Em GraphQL, a evolução costuma ocorrer no próprio schema por adição e depreciação de campos; criar /v2 para qualquer mudança elimina parte da flexibilidade do modelo. Campos incompatíveis podem coexistir temporariamente, com @deprecated e telemetria por operação."
  },
  {
    "kind": "paragraph",
    "text": "Em gRPC e Protocol Buffers, compatibilidade depende de números de campo. Campos removidos devem ser marcados como reserved e números antigos não podem ser reutilizados. Pacotes e serviços podem incluir major na nomenclatura quando há quebra. A compatibilidade binária precisa ser testada contra clientes gerados em versões anteriores."
  },
  {
    "kind": "paragraph",
    "text": "Eventos e mensageria exigem atenção especial porque mensagens podem permanecer armazenadas. O consumidor pode processar eventos antigos depois de uma nova versão ser publicada. Estratégias incluem schema registry, compatibilidade backward/forward, versionamento no envelope e consumidores tolerantes. Atualizar produtor e consumidor simultaneamente raramente é seguro em ambientes distribuídos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.15 Dados persistentes e migrações",
    "id": "28-15-dados-persistentes-e-migracoes"
  },
  {
    "kind": "paragraph",
    "text": "Mudanças de API frequentemente dependem de mudanças no banco. Adicionar campo obrigatório em v2 pode exigir backfill de registros históricos. Alterar identificador ou normalizar uma entidade pode afetar links, eventos e caches. A migração precisa considerar dados antigos, rollback e coexistência entre versões da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "O padrão expand-and-contract também se aplica ao banco: primeiro adicione nova coluna ou estrutura sem remover a antiga; depois escreva nos dois formatos ou faça backfill; em seguida migre leitores; por fim remova a estrutura antiga quando não houver dependentes. Trocas instantâneas aumentam risco porque código e dados raramente mudam de forma atômica em toda a plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Quando v1 e v2 precisam ler e escrever o mesmo domínio, a organização deve definir fonte de verdade, transformação e consistência. Adaptadores no gateway resolvem diferenças superficiais; mudanças profundas de semântica pertencem ao domínio ou a serviços de compatibilidade dedicados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.16 Coexistência de versões e adapters",
    "id": "28-16-coexistencia-de-versoes-e-adapters"
  },
  {
    "kind": "paragraph",
    "text": "Coexistência permite que consumidores migrem em ritmos diferentes. O gateway pode rotear v1 e v2 para backends separados, para a mesma implementação com branches internas ou para uma façade que adapta contratos. Cada opção possui custo. Backends separados aumentam isolamento, mas duplicam operação; implementação compartilhada reduz infraestrutura, mas acumula condicionais; adapters funcionam bem para diferenças de representação, mas não para regras de negócio incompatíveis."
  },
  {
    "kind": "paragraph",
    "text": "Uma versão antiga não deve permanecer indefinidamente apenas porque ainda recebe tráfego. O provedor precisa medir consumidores, classificar criticidade, definir prazo e oferecer suporte de migração. Sem sunset, versões se tornam produtos permanentes e ampliam superfície de ataque."
  },
  {
    "kind": "paragraph",
    "text": "Políticas, cache, autenticação, observabilidade e SLAs podem divergir por versão. O version set precisa registrar versão recomendada, estado, owner, documentação e relação de substituição."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.17 Versions e revisions no Azure API Management",
    "id": "28-17-versions-e-revisions-no-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, versions agrupam APIs relacionadas e permitem expor interfaces incompatíveis por path, query ou header. São apropriadas quando consumidores precisam selecionar explicitamente contratos diferentes. Cada versão pode possuir operações, policies, produtos e documentação próprios."
  },
  {
    "kind": "paragraph",
    "text": "Revisions atendem outro problema: alterar e testar uma API sem criar nova versão pública. Uma revisão pode receber mudanças não quebradoras, ser testada separadamente e depois tornar-se current. O changelog pode ser publicado para consumidores. Revisão não é substituta de versionamento quando o contrato é incompatível."
  },
  {
    "kind": "paragraph",
    "text": "A regra prática é simples: mudança não quebradora pode ser preparada como revisão e promovida à versão atual; mudança quebradora exige nova versão e plano de migração. O pipeline precisa evitar que uma revisão experimental se torne current sem testes e aprovação."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Version, revision e release resolvem problemas diferentes.",
    "headers": [
      "Conceito",
      "Quando usar",
      "Efeito para o consumidor"
    ],
    "rows": [
      [
        "Version",
        "Contrato incompatível ou comportamento distinto.",
        "Seleciona versão por mecanismo explícito."
      ],
      [
        "Revision",
        "Mudança controlada sob a mesma versão pública.",
        "Normalmente continua chamando a mesma versão."
      ],
      [
        "Release/build",
        "Mudança de implementação interna.",
        "Nenhuma seleção pública necessária."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.18 Estados do ciclo de vida e governança",
    "id": "28-18-estados-do-ciclo-de-vida-e-governanca"
  },
  {
    "kind": "paragraph",
    "text": "Uma versão precisa de estados claros. Design indica contrato em revisão; preview permite pilotos e admite mudanças; active oferece suporte e SLA; deprecated informa que a versão não é mais recomendada; sunset marca data de retirada; retired indica que o tráfego não é mais atendido."
  },
  {
    "kind": "paragraph",
    "text": "Cada transição precisa de critérios de entrada e saída. Para tornar active, por exemplo, o contrato deve estar publicado, políticas testadas, capacidade validada e owner definido. Para entrar em deprecated, deve existir substituta funcional, guia de migração e prazo. Para retirar, telemetria precisa demonstrar ausência ou aceitação formal dos consumidores restantes."
  },
  {
    "kind": "paragraph",
    "text": "A governança deve impedir versões órfãs: sem owner, sem documentação, sem observabilidade ou com certificado e dependências sem manutenção."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/pt/figure-03-lifecycle.svg",
    "alt": "Ciclo de vida governado de uma versão de API",
    "caption": "Figura 3 - Ciclo de vida transforma versão em objeto governado e auditável."
  },
  {
    "kind": "paragraph",
    "text": "Depreciação não significa desligamento imediato. Ela comunica que o recurso ou versão não é mais recomendado e pode ser retirado no futuro. O consumidor precisa de substituta, prazo, justificativa e documentação de migração. A data de sunset representa o momento a partir do qual o recurso tende a deixar de responder."
  },
  {
    "kind": "paragraph",
    "text": "O header Deprecation permite sinalizar que o recurso será ou já foi depreciado. O link relation deprecation pode apontar para documentação adicional. O header Sunset informa quando a URI provavelmente se tornará indisponível. Esses sinais complementam portal, e-mail e changelog; não substituem gestão ativa dos consumidores."
  },
  {
    "kind": "paragraph",
    "text": "A data de Sunset não deve ser anterior à data de depreciação. O gateway pode inserir esses headers por versão, mas a configuração precisa ser consistente com catálogo e plano real de retirada."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de sinalização de depreciação"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 200 OK\nDeprecation: @1782863999\nSunset: Wed, 30 Jun 2027 23:59:59 GMT\nLink: <https://developer.example/migrations/v2>; rel=\"deprecation\""
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.20 Comunicação, changelog e guia de migração",
    "id": "28-20-comunicacao-changelog-e-guia-de-migracao"
  },
  {
    "kind": "paragraph",
    "text": "Uma comunicação eficaz responde o que mudou, por que mudou, quem é afetado, quando a versão será retirada e como migrar. O changelog deve ser orientado ao consumidor, não uma lista de commits. O guia precisa mostrar mapeamento de campos, diferenças de status, novos requisitos de segurança e exemplos antes/depois."
  },
  {
    "kind": "paragraph",
    "text": "Consumidores críticos podem exigir contato direto, janela de homologação e acompanhamento. Notificações genéricas no portal são insuficientes quando a versão participa de pagamentos, Open Finance ou jornadas reguladas. A organização deve registrar confirmação, riscos e exceções."
  },
  {
    "kind": "paragraph",
    "text": "O portal deve indicar versão recomendada, estado das demais, documentação, SDKs, changelog e datas. Links quebrados ou documentação divergente reduzem confiança e prolongam migrações."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.21 Inventário e telemetria de consumidores",
    "id": "28-21-inventario-e-telemetria-de-consumidores"
  },
  {
    "kind": "paragraph",
    "text": "Não é possível retirar com segurança aquilo que não é medido. O inventário deve identificar aplicação, owner, tenant, ambiente, versão usada, criticidade e volume. IP isolado é insuficiente em ambientes com NAT, proxies e pools compartilhados. client_id, subscription key, certificado ou identidade de workload são chaves melhores."
  },
  {
    "kind": "paragraph",
    "text": "Telemetria precisa cobrir tráfego periódico e jornadas sazonais. Uma versão pode parecer inativa durante dias e ser usada apenas no fechamento mensal. Métricas úteis incluem chamadas por versão, consumidores únicos, erros, operações utilizadas, última atividade e percentual de migração."
  },
  {
    "kind": "paragraph",
    "text": "Logs devem preservar versão solicitada e versão efetivamente roteada. Quando o gateway aplica default ou rewrite, a diferença precisa estar visível para evitar diagnósticos incorretos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.22 Diff semântico, testes de contrato e quality gates",
    "id": "28-22-diff-semantico-testes-de-contrato-e-quality-gates"
  },
  {
    "kind": "paragraph",
    "text": "Diff textual identifica linhas alteradas, mas não entende impacto. Diff semântico interpreta operações, schemas, direção dos dados, required, enums e restrições. Ainda assim, ferramentas não capturam toda mudança comportamental. A revisão humana precisa analisar semântica, segurança e operação."
  },
  {
    "kind": "paragraph",
    "text": "O pipeline deve validar sintaxe, linting, regras corporativas, diff contra a baseline publicada, testes de contrato, testes de consumidores e aprovação de exceções. A baseline não pode ser apenas a branch principal; deve representar o artefato realmente em produção."
  },
  {
    "kind": "paragraph",
    "text": "Consumer-driven contract testing ajuda a revelar dependências concretas, mas não substitui contrato do provedor. Uma boa estratégia combina OpenAPI ou schema oficial, testes de compatibilidade e telemetria real."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Automação reduz risco, mas precisa de contexto e revisão.",
    "headers": [
      "Quality gate",
      "Objetivo",
      "Falha detectada"
    ],
    "rows": [
      [
        "Parser e linter",
        "Garantir contrato válido e consistente.",
        "Erro estrutural ou violação de padrão."
      ],
      [
        "Diff semântico",
        "Classificar impacto da mudança.",
        "Remoção, restrição ou enum incompatível."
      ],
      [
        "Contract tests",
        "Verificar implementação contra contrato.",
        "Runtime diverge da especificação."
      ],
      [
        "Consumer tests",
        "Validar expectativas reais.",
        "Cliente quebra apesar de diff aparentemente seguro."
      ],
      [
        "Telemetria",
        "Confirmar adoção e uso.",
        "Consumidor ainda preso na versão antiga."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "O padrão expand-migrate-contract evita troca instantânea. Na fase de expansão, o provedor aceita antigo e novo: adiciona campo, endpoint ou formato sem remover o existente. Na migração, consumidores são movidos gradualmente, com telemetria e suporte. Na contração, o elemento antigo é removido apenas quando não há dependentes relevantes."
  },
  {
    "kind": "paragraph",
    "text": "Para renomear um campo obrigatório, por exemplo, o servidor pode aceitar os dois nomes, responder temporariamente com ambos e registrar qual forma cada consumidor utiliza. Depois que todos migram, o nome antigo é depreciado e removido em nova major ou na janela de compatibilidade definida."
  },
  {
    "kind": "paragraph",
    "text": "O padrão aumenta temporariamente a complexidade, mas reduz risco, facilita rollback e elimina necessidade de sincronizar deploys de todos os consumidores."
  },
  {
    "kind": "subhead",
    "text": "Expandir, migrar e contrair"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/pt/figure-04-expand-migrate-contract.svg",
    "alt": "Evolução segura pelas fases expandir, migrar e contrair",
    "caption": "Figura 4 - Evolução segura utiliza coexistência temporária e evidência de migração."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.24 API Gateways, roteamento e troubleshooting",
    "id": "28-24-api-gateways-roteamento-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "O gateway é ponto natural de seleção de versão, mas não deve esconder semântica incompatível. Policies podem extrair versão de path, query ou header, validar valores, rotear para backend, inserir headers de depreciação e registrar telemetria. A ordem de policies precisa ser previsível: identificar versão antes de cache, autenticação específica e roteamento."
  },
  {
    "kind": "paragraph",
    "text": "Falhas comuns incluem versão default inesperada, rewrite incorreto, cache compartilhado entre versões, policy herdada apenas em parte, backend v2 recebendo tráfego v1 e documentação apontando para outra base URL. Logs devem registrar versão recebida, versão resolvida, backend escolhido, revisão e contract checksum."
  },
  {
    "kind": "paragraph",
    "text": "No troubleshooting, reproduza a requisição com todos os elementos de seleção e compare gateway, portal, OpenAPI e backend. Um 404 pode significar operação inexistente na versão, rota não publicada ou version set mal configurado. Um 200 com payload antigo pode indicar cache ou roteamento incorreto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.25 Estudos de caso e laboratórios",
    "id": "28-25-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1: uma API de clientes precisa substituir idCliente por customerId. A equipe usa expansão temporária, aceita ambos em requests, responde com os dois durante a migração, mede uso e publica v2 apenas quando outras mudanças incompatíveis justificam uma nova major."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2: uma API de pagamentos passa a exigir mTLS e novo audience. Como a mudança afeta credenciais e infraestrutura do consumidor, a equipe cria v2, mantém v1 por prazo definido, distribui certificados em homologação e usa Deprecation e Sunset em produção."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3: no Azure APIM, uma correção de descrição e novo campo opcional são preparados como revision da v2. Depois de testes, a revisão torna-se current sem criar v3. Meses depois, uma mudança incompatível de contrato gera v3 no mesmo version set."
  },
  {
    "kind": "subhead",
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "paragraph",
    "text": "1) Compare dois documentos OpenAPI e classifique as mudanças. 2) Configure versionamento por path e header em um gateway de laboratório. 3) Simule Deprecation e Sunset. 4) Crie telemetria por versão e consumidor. 5) Execute uma migração expand-migrate-contract com campo renomeado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "API Versioning é um mecanismo de coordenação para mudanças observáveis. O objetivo não é gerar números, mas permitir evolução com risco controlado. Compatibilidade precisa ser analisada nas dimensões sintática, estrutural, semântica, comportamental e operacional."
  },
  {
    "kind": "paragraph",
    "text": "A direção dos dados altera a classificação de mudanças. Estratégias por path, query, header, media type ou data possuem trade-offs e precisam funcionar em toda a cadeia. Versão pública, revisão, release e versão da especificação são dimensões diferentes."
  },
  {
    "kind": "paragraph",
    "text": "O ciclo de vida transforma depreciação e retirada em processos auditáveis. Deprecation e Sunset melhoram comunicação em runtime, mas inventário, telemetria, guias de migração e confirmação de adoção determinam segurança. Diff semântico, testes e expand-migrate-contract reduzem risco sem impedir evolução."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "Com versões e ciclo de vida governados, o próximo capítulo aprofunda Service Mesh, incluindo Istio, Linkerd e Envoy, e mostra como políticas, identidade e observabilidade são aplicadas à comunicação entre serviços."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de API Versioning",
    "id": "checklist-de-api-versioning"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A baseline corresponde ao contrato realmente publicado e suportado.",
      "A mudança foi analisada nas dimensões sintática, estrutural, semântica, comportamental e operacional.",
      "A direção dos dados e o comportamento de SDKs foram considerados.",
      "Nova versão é criada apenas quando existe incompatibilidade ou necessidade explícita de coexistência.",
      "O mecanismo de seleção funciona em cliente, cache, WAF, gateway, portal e observabilidade.",
      "Versão pública, revisão, build e versão da especificação estão separadas.",
      "A depreciação oferece substituta, guia, prazo, owner e canal de suporte.",
      "Deprecation, Sunset, portal e catálogo estão consistentes.",
      "O inventário identifica consumidores por aplicação ou identidade, não apenas por IP.",
      "O pipeline executa parser, linter, diff, testes e aprovação de exceções.",
      "A retirada possui evidência, comunicação e plano de recuperação."
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
      "Explique por que adicionar campo em response pode ser quebrador.",
      "Diferencie compatibilidade estrutural, semântica e operacional.",
      "Classifique a adição de enum em request e em response.",
      "Diferencie versão pública, contrato, revisão, build e versão da OpenAPI Specification.",
      "Compare path, query, header, media type e versão por data.",
      "Explique quando uma revision é preferível a uma nova version no Azure APIM.",
      "Escreva resposta HTTP com Deprecation, Sunset e Link para guia de migração.",
      "Descreva um plano expand-migrate-contract para renomear campo obrigatório.",
      "Proponha métricas para decidir se v1 pode ser retirada.",
      "Descreva como investigar quando v2 retorna comportamento de v1."
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
        "Backward compatibility",
        "Capacidade de consumidores existentes continuarem funcionando após uma mudança."
      ],
      [
        "Baseline",
        "Contrato ou comportamento de referência usado na comparação."
      ],
      [
        "Breaking change",
        "Mudança incompatível com expectativas suportadas."
      ],
      [
        "Changelog",
        "Registro orientado ao consumidor sobre mudanças publicadas."
      ],
      [
        "Compatibility window",
        "Período de coexistência e migração entre contratos."
      ],
      [
        "Contract drift",
        "Divergência entre descrição, gateway e runtime."
      ],
      [
        "Deprecation",
        "Sinalização de que uma interface não é recomendada e poderá ser retirada."
      ],
      [
        "Expand-migrate-contract",
        "Estratégia de introduzir compatibilidade, migrar e remover o antigo."
      ],
      [
        "Revision",
        "Alteração controlada sob a mesma versão pública."
      ],
      [
        "Semantic diff",
        "Comparação que interpreta impacto do contrato."
      ],
      [
        "SemVer",
        "Versionamento semântico MAJOR.MINOR.PATCH."
      ],
      [
        "Sunset",
        "Momento a partir do qual um recurso tende a deixar de responder."
      ],
      [
        "Version set",
        "Grupo de versões relacionadas de uma API."
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
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 8594 - The Sunset HTTP Header Field.",
      "IETF. RFC 9745 - The Deprecation HTTP Response Header Field.",
      "Microsoft Learn. Versions in Azure API Management.",
      "Microsoft Learn. Revisions in Azure API Management.",
      "Google Cloud API Design Guide. AIP-185: API Versioning.",
      "Semantic Versioning Specification 2.0.0.",
      "OpenAPI Initiative. OpenAPI Specification 3.1.",
      "Protocol Buffers Documentation. Updating a Message Type.",
      "GraphQL Specification e práticas de depreciação de schema."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Padrões, serviços gerenciados e ferramentas evoluem. Antes de automatizar version sets, revisions, depreciação ou diff semântico, valide a documentação oficial da versão implantada e teste o comportamento em ambiente autorizado."
  }
];
