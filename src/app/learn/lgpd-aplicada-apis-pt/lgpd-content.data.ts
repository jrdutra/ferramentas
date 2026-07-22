import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const LGPD_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "LGPD aplicada às APIs: proteção de dados durante todo o ciclo de vida"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/pt/overview.svg",
    "alt": "Dados pessoais atravessando coleta, processamento, compartilhamento, retenção e eliminação protegidos",
    "caption": "Figura de abertura - A proteção de dados acompanha todo o ciclo de vida da informação processada por APIs."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Privacidade precisa ser traduzida em decisões técnicas verificáveis desde o contrato da API até logs, backups, terceiros e eliminação."
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
    "text": "APIs são canais de tratamento de dados. Elas coletam identificadores, recebem credenciais, consultam cadastros, movimentam informações entre sistemas, alimentam logs, caches e filas e, em muitos casos, compartilham dados com parceiros. Por isso, a aplicação da Lei Geral de Proteção de Dados Pessoais não pode ser reduzida a um aviso de privacidade ou a uma tela de consentimento. A conformidade precisa estar incorporada ao contrato, à arquitetura, ao código, à operação e à governança da API."
  },
  {
    "kind": "paragraph",
    "text": "A LGPD disciplina o tratamento de dados pessoais realizado por pessoas naturais ou jurídicas de direito público ou privado, inclusive em meios digitais. Para uma equipe de APIs, isso significa compreender quais campos identificam ou tornam identificável uma pessoa, qual finalidade justifica cada operação, quem decide o tratamento, quem executa em nome de outro agente, quais terceiros recebem dados e por quanto tempo cópias permanecem em ambientes de produção, observabilidade, backup e desenvolvimento."
  },
  {
    "kind": "paragraph",
    "text": "O desafio técnico surge porque APIs distribuídas multiplicam cópias e contextos. Um campo enviado no payload pode aparecer no access log do gateway, no trace distribuído, em uma dead-letter queue, em um data lake e em um backup. Um pedido de eliminação pode exigir ações coordenadas em vários serviços. Uma mudança de contrato pode introduzir uma nova categoria de dado sem que a análise de impacto seja atualizada. Portanto, mapear fluxos e responsabilidades é condição para aplicar minimização, necessidade, transparência e segurança."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo traduz princípios e obrigações em práticas para arquitetos, desenvolvedores, equipes de gateway, segurança e operação. O texto é educacional e não substitui avaliação jurídica do caso concreto. A interpretação deve considerar a LGPD compilada, regulamentações vigentes da Agência Nacional de Proteção de Dados - ANPD, normas setoriais e contratos aplicáveis."
  },
  {
    "kind": "paragraph",
    "text": "Como estudar este capítulo Para cada endpoint, registre: finalidade, categorias de dados, base legal, titular, origem, destinatários, retenção, controles de acesso, logs gerados e procedimento de atendimento de direitos. Essa ficha transforma conceitos jurídicos em evidências arquiteturais verificáveis."
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
      "Explicar como a LGPD se aplica ao ciclo de vida de uma API.",
      "Distinguir dado pessoal, dado pessoal sensível, dado anonimizado e pseudonimizado.",
      "Relacionar princípios da LGPD a requisitos técnicos de contratos e gateways.",
      "Diferenciar controlador, operador, encarregado e suboperadores em integrações.",
      "Mapear bases legais sem tratar consentimento como opção universal.",
      "Projetar minimização, retenção, eliminação e atendimento de direitos.",
      "Aplicar privacy by design, segurança e accountability à esteira de APIs.",
      "Compreender RIPD, incidentes, transferência internacional e contratos.",
      "Diagnosticar riscos em logs, tokens, payloads, caches, filas e ambientes de teste."
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
      "36.1 Escopo da LGPD e o papel das APIs",
      "36.2 Dados pessoais, sensíveis, anonimização e pseudonimização",
      "36.3 Princípios traduzidos em requisitos técnicos",
      "36.4 Agentes de tratamento e responsabilidades",
      "36.5 Bases legais e finalidade",
      "36.6 Inventário, data mapping e lineage",
      "36.7 Minimização e desenho de contratos",
      "36.8 Direitos dos titulares em arquiteturas distribuídas",
      "36.9 Retenção, eliminação, backups e logs",
      "36.10 Privacy by design e RIPD",
      "36.11 Segurança, incidentes e comunicação",
      "36.12 Transferência internacional e terceiros",
      "36.13 Gateways, observabilidade e ambientes de desenvolvimento",
      "36.14 Governança, DevSecOps e evidências",
      "36.15 Crianças, adolescentes e proteção reforçada",
      "36.16 Decisões automatizadas, perfilamento e IA",
      "36.17 Fiscalização, sanções e prestação de contas",
      "36.18 Troubleshooting e estudos de caso",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.1 Escopo da LGPD e o papel das APIs",
    "id": "36-1-escopo-da-lgpd-e-o-papel-das-apis"
  },
  {
    "kind": "paragraph",
    "text": "A LGPD se aplica a operações de tratamento, conceito amplo que inclui coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, modificação, comunicação, transferência, difusão e extração. Uma chamada de API pode realizar várias dessas operações em sequência. O endpoint não é apenas uma interface técnica: ele é um ponto do fluxo de tratamento."
  },
  {
    "kind": "paragraph",
    "text": "O escopo territorial não depende somente do local do servidor. A lei alcança situações previstas em seu texto, como tratamento realizado no território nacional, oferta ou fornecimento de bens e serviços a pessoas localizadas no Brasil ou dados coletados no país. Arquiteturas globais precisam analisar regiões de nuvem, suporte internacional, replicação, fornecedores e transferência de telemetria."
  },
  {
    "kind": "paragraph",
    "text": "Há hipóteses de não aplicação e regimes especiais, mas elas devem ser avaliadas com cuidado. Não é seguro assumir que uma API interna está fora da LGPD ou que dados corporativos nunca são pessoais. Endereços de e-mail, matrículas, IPs, IDs de usuário, identificadores de dispositivo e trilhas de auditoria podem se relacionar a pessoas naturais."
  },
  {
    "kind": "paragraph",
    "text": "Modelo mental A pergunta não é apenas “a resposta contém CPF?”. Pergunte se qualquer dado do fluxo permite identificar, individualizar, contatar, perfilar ou tomar decisão sobre uma pessoa natural, isoladamente ou em conjunto com outras informações."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.2 Dados pessoais, sensíveis, anonimização e pseudonimização",
    "id": "36-2-dados-pessoais-sensiveis-anonimizacao-e-pseudonimizacao"
  },
  {
    "kind": "paragraph",
    "text": "Dado pessoal é informação relacionada a pessoa natural identificada ou identificável. A identificação pode ser direta, como nome e CPF, ou indireta, quando combinações de atributos permitem reconhecer alguém. Em APIs, identificadores técnicos também importam: um customerId aparentemente aleatório continua sendo dado pessoal se a organização consegue relacioná-lo ao titular."
  },
  {
    "kind": "paragraph",
    "text": "Dados pessoais sensíveis recebem proteção reforçada. A categoria inclui, entre outros elementos definidos pela LGPD, dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, genética e biometria quando vinculados a uma pessoa. Uma API de autenticação biométrica, saúde ou prevenção a fraude deve reconhecer explicitamente essa categoria e aplicar base legal e controles compatíveis."
  },
  {
    "kind": "paragraph",
    "text": "Anonimização busca retirar a possibilidade razoável de associação direta ou indireta a uma pessoa, considerando meios técnicos disponíveis na ocasião. Pseudonimização substitui identificadores por chaves ou tokens, mas preserva a possibilidade de reidentificação mediante informação adicional. Pseudonimização reduz risco e exposição, porém os dados continuam sujeitos à LGPD."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Classificação de dados deve considerar contexto e possibilidade de associação.",
    "headers": [
      "Categoria",
      "Exemplo em APIs",
      "Implicação técnica"
    ],
    "rows": [
      [
        "Dado pessoal direto",
        "nome, CPF, e-mail",
        "Acesso restrito, finalidade e retenção explícitas."
      ],
      [
        "Identificador indireto",
        "customerId, IP, deviceId",
        "Continua pessoal se houver associação razoável."
      ],
      [
        "Dado sensível",
        "biometria, saúde",
        "Proteção reforçada e hipótese legal específica."
      ],
      [
        "Pseudonimizado",
        "token substituindo CPF",
        "Reduz exposição, mas permanece dado pessoal."
      ],
      [
        "Anonimizado",
        "estatística sem reidentificação razoável",
        "Pode sair do regime, desde que anonimização seja efetiva."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.3 Princípios traduzidos em requisitos técnicos",
    "id": "36-3-principios-traduzidos-em-requisitos-tecnicos"
  },
  {
    "kind": "paragraph",
    "text": "Os princípios do art. 6º orientam todo o desenho. Finalidade exige que a API tenha propósito legítimo, específico e informado. Adequação exige coerência entre o tratamento e a finalidade declarada. Necessidade limita o tratamento ao mínimo pertinente. Livre acesso, qualidade e transparência orientam documentação e canais de atendimento. Segurança e prevenção exigem controles técnicos e administrativos. Não discriminação impede usos abusivos. Responsabilização e prestação de contas exigem evidências."
  },
  {
    "kind": "paragraph",
    "text": "Em engenharia, princípios precisam virar critérios de aceite. Necessidade pode ser verificada por revisão de schema e campos opcionais. Transparência pode ser apoiada por catálogos e avisos consistentes. Segurança aparece em autenticação, autorização, criptografia, segregação, testes e monitoramento. Accountability aparece em decisões registradas, owners, inventário, revisões, métricas e trilhas de auditoria."
  },
  {
    "kind": "paragraph",
    "text": "Princípios também ajudam a resolver situações não cobertas por uma regra operacional específica. Quando uma equipe quer adicionar um campo ao log “para facilitar suporte”, a pergunta não é só se tecnicamente funciona. É necessário avaliar necessidade, risco, acesso, retenção e transparência."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Princípios devem ser observáveis em decisões de arquitetura e operação.",
    "headers": [
      "Princípio",
      "Pergunta para a API",
      "Controle associado"
    ],
    "rows": [
      [
        "Finalidade",
        "Por que este endpoint precisa do dado?",
        "Registro de finalidade e uso permitido."
      ],
      [
        "Necessidade",
        "Qual é o conjunto mínimo de campos?",
        "Schemas mínimos e filtragem de resposta."
      ],
      [
        "Transparência",
        "O titular entende o fluxo?",
        "Documentação e aviso coerentes."
      ],
      [
        "Segurança",
        "Quem pode acessar e como protegemos?",
        "IAM, criptografia, logs e testes."
      ],
      [
        "Responsabilização",
        "Quais evidências demonstram conformidade?",
        "Inventário, aprovações e auditoria."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.4 Agentes de tratamento e responsabilidades",
    "id": "36-4-agentes-de-tratamento-e-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "Controlador é quem toma as decisões referentes ao tratamento. Operador realiza tratamento em nome do controlador. O encarregado atua como canal de comunicação e exerce atribuições definidas na LGPD e na regulamentação. Em cadeias modernas, fornecedores de nuvem, plataformas de observabilidade, gateways gerenciados e bureaus podem atuar como operadores ou suboperadores conforme o contexto contratual e factual."
  },
  {
    "kind": "paragraph",
    "text": "A classificação não decorre apenas do nome usado no contrato. É preciso observar quem determina finalidades e elementos essenciais do tratamento. Uma mesma organização pode ser controladora em um fluxo e operadora em outro. Arquitetos devem registrar responsabilidades por API, domínio e integração, evitando documentos genéricos que não refletem a operação real."
  },
  {
    "kind": "paragraph",
    "text": "Contratos com operadores devem descrever instruções, confidencialidade, segurança, subcontratação, incidentes, retorno ou eliminação de dados, auditoria e apoio a direitos dos titulares. Esses elementos precisam corresponder às capacidades técnicas do produto. Não adianta prometer eliminação imediata se a arquitetura mantém cópias em backups sem política definida."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Papéis devem ser analisados por operação de tratamento, não apenas por empresa.",
    "headers": [
      "Papel",
      "Decisão principal",
      "Evidência em APIs"
    ],
    "rows": [
      [
        "Controlador",
        "Define finalidade e meios essenciais.",
        "Catálogo, base legal, owner e regras de uso."
      ],
      [
        "Operador",
        "Executa conforme instruções.",
        "Contrato, runbook, controles e relatórios."
      ],
      [
        "Encarregado",
        "Canal e apoio à governança.",
        "Fluxo de atendimento e recomendações."
      ],
      [
        "Suboperador",
        "Executa parte da cadeia.",
        "Inventário de terceiros e cláusulas aplicáveis."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.5 Bases legais e finalidade",
    "id": "36-5-bases-legais-e-finalidade"
  },
  {
    "kind": "paragraph",
    "text": "Toda operação de tratamento precisa se apoiar em hipótese legal adequada. A LGPD prevê bases diferentes para dados pessoais e para dados pessoais sensíveis. Consentimento é apenas uma delas e não deve ser usado automaticamente quando outra base representa melhor a relação. A escolha exige análise jurídica e factual, registro da finalidade e coerência entre coleta, uso e compartilhamento."
  },
  {
    "kind": "paragraph",
    "text": "Execução de contrato, cumprimento de obrigação legal ou regulatória, exercício regular de direitos, proteção da vida, tutela da saúde, proteção do crédito e legítimo interesse são exemplos previstos na lei, cada um com condições próprias. O legítimo interesse requer avaliação de finalidade, necessidade, balanceamento e salvaguardas, além da consideração das legítimas expectativas e direitos do titular."
  },
  {
    "kind": "paragraph",
    "text": "Na API, a base legal não precisa viajar como header em toda chamada, mas precisa estar ligada ao inventário e às regras do produto. Um mesmo endpoint pode atender finalidades diferentes; isso deve ser evitado quando dificulta segregação e governança. APIs muito genéricas aumentam risco de reutilização incompatível."
  },
  {
    "kind": "paragraph",
    "text": "Consentimento não é sinônimo de autenticação Login prova ou ajuda a provar quem está interagindo. Consentimento é manifestação específica para determinada finalidade, quando essa for a base aplicável. Uma tela de login ou o uso continuado do serviço não substituem automaticamente os requisitos do consentimento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.6 Inventário, data mapping e lineage",
    "id": "36-6-inventario-data-mapping-e-lineage"
  },
  {
    "kind": "paragraph",
    "text": "O inventário de tratamento deve ser conectado ao catálogo de APIs. Para cada operação, registre categorias de titulares, dados, finalidade, base legal, sistemas de origem e destino, compartilhamentos, retenção, controles e responsáveis. O OpenAPI ajuda a identificar campos, mas não revela sozinho logs, transformações, caches, réplicas ou destinos indiretos."
  },
  {
    "kind": "paragraph",
    "text": "Data mapping descreve o fluxo. Lineage registra a trajetória e as transformações. Em um gateway, o payload pode ser transformado, enriquecido e encaminhado. Em mensageria, eventos podem ser replicados para vários consumidores. Em observabilidade, atributos podem ser exportados a ferramentas externas. O mapa precisa incluir esses caminhos, não apenas o banco de dados principal."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/pt/figure-01.svg",
    "alt": "Mapa do ciclo de vida de dados incluindo APIs, logs, filas, caches e backups",
    "caption": "Figura 1 - O mapa de dados precisa incluir componentes operacionais e cópias indiretas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.7 Minimização e desenho de contratos",
    "id": "36-7-minimizacao-e-desenho-de-contratos"
  },
  {
    "kind": "paragraph",
    "text": "Minimização começa no design. Requests devem pedir apenas dados necessários; responses devem evitar objetos superdimensionados. O fato de um backend possuir muitos campos não significa que todos devem atravessar o gateway. APIs por contexto, scopes adequados, field-level authorization e projeções controladas ajudam a reduzir exposição."
  },
  {
    "kind": "paragraph",
    "text": "Erros também precisam ser minimizados. Stack traces, SQL, tokens, chaves, dados cadastrais e respostas completas de fornecedores não devem chegar ao consumidor. A mensagem externa deve ser útil sem revelar detalhes desnecessários. Internamente, logs precisam equilibrar diagnóstico e proteção."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL merece atenção especial porque o cliente escolhe campos. Autorização por campo, limites de complexidade e schemas cuidadosamente desenhados evitam que flexibilidade se torne exposição. Em REST, filtros de campos e múltiplas representações também devem respeitar autorização e finalidade."
  },
  {
    "kind": "paragraph",
    "text": "Contrato orientado à necessidade # Exemplo conceitual de resposta minimizada { \"clienteId\": \"c_9f32...\", \"nomeExibicao\": \"João D.\", \"status\": \"ATIVO\" } # Não retornar por padrão: CPF completo, endereço, # biometria, histórico e dados de outros domínios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.8 Direitos dos titulares em arquiteturas distribuídas",
    "id": "36-8-direitos-dos-titulares-em-arquiteturas-distribuidas"
  },
  {
    "kind": "paragraph",
    "text": "A LGPD assegura direitos como confirmação da existência de tratamento, acesso, correção, anonimização, bloqueio ou eliminação em certas condições, portabilidade, informação sobre compartilhamentos e revisão de decisões automatizadas nos termos aplicáveis. A operação precisa possuir canal, autenticação proporcional e processo para localizar os dados do titular."
  },
  {
    "kind": "paragraph",
    "text": "Em microserviços, o atendimento não pode depender de consultas manuais sem coordenação. Um serviço de privacidade pode orquestrar solicitações, consultar catálogo e lineage, enviar comandos aos domínios e reunir evidências. A identidade usada para localizar dados precisa ser segura: pedir CPF em texto aberto a todos os serviços pode criar nova exposição."
  },
  {
    "kind": "paragraph",
    "text": "Eliminação não é absoluta em todas as situações. Obrigações legais, regulatórias, exercício de direitos e outras hipóteses podem justificar conservação. O sistema deve distinguir dado ativo, bloqueado, arquivado e eliminado, registrando fundamento e prazo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/pt/figure-02.svg",
    "alt": "Direitos dos titulares coordenados entre identidade, catálogo e sistemas distribuídos",
    "caption": "Figura 2 - Direitos dos titulares exigem coordenação entre identidade, catálogo e sistemas distribuídos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.9 Retenção, eliminação, backups e logs",
    "id": "36-9-retencao-eliminacao-backups-e-logs"
  },
  {
    "kind": "paragraph",
    "text": "Retenção deve ser definida por finalidade e obrigação aplicável, não por hábito técnico. Bancos, objetos, tópicos, caches e índices precisam de políticas. Dados expirados não devem permanecer indefinidamente apenas porque armazenamento é barato. A política deve descrever início da contagem, eventos que alteram o prazo, descarte e evidência."
  },
  {
    "kind": "paragraph",
    "text": "Backups exigem tratamento específico. Eliminação imediata de cada registro em todas as mídias pode ser impraticável, mas a organização deve controlar acesso, limitar retenção e impedir que dados restaurados voltem a uso ativo sem reaplicar exclusões. Runbooks de restauração precisam contemplar esse risco."
  },
  {
    "kind": "paragraph",
    "text": "Logs e traces são fontes frequentes de vazamento. Tokens, Authorization headers, cookies, payloads, query strings e identificadores sensíveis devem ser mascarados ou omitidos. O princípio é registrar o necessário para operação e auditoria, usando IDs de correlação e referências pseudonimizadas em vez de conteúdo completo."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Cópias operacionais precisam fazer parte da política de retenção.",
    "headers": [
      "Ativo",
      "Risco típico",
      "Controle recomendado"
    ],
    "rows": [
      [
        "Access log",
        "Headers ou query com dados pessoais.",
        "Allowlist de campos e masking."
      ],
      [
        "Trace distribuído",
        "Baggage propagando identificadores.",
        "Política de atributos e redaction."
      ],
      [
        "Fila / DLQ",
        "Payload retido por tempo indefinido.",
        "TTL, criptografia e acesso restrito."
      ],
      [
        "Backup",
        "Restauração reintroduz dados eliminados.",
        "Runbook de reaplicação e retenção."
      ],
      [
        "Ambiente de teste",
        "Cópia de produção sem proteção.",
        "Dados sintéticos ou mascarados."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.10 Privacy by design e Relatório de Impacto",
    "id": "36-10-privacy-by-design-e-relatorio-de-impacto"
  },
  {
    "kind": "paragraph",
    "text": "Privacy by design significa incorporar proteção desde a concepção do produto e durante todo o ciclo de vida. Na prática, a descoberta identifica dados e finalidades; o design define minimização, segregação e autorização; o desenvolvimento implementa controles; testes validam abuso e exposição; a operação mede, revisa e responde a incidentes."
  },
  {
    "kind": "paragraph",
    "text": "O Relatório de Impacto à Proteção de Dados Pessoais - RIPD - documenta tratamentos que podem gerar riscos e descreve medidas, salvaguardas e mecanismos de mitigação. A necessidade, forma e momento devem considerar a LGPD, orientações da ANPD, risco e contexto setorial. Para APIs, diagramas de fluxo, inventário, ameaças, contratos e evidências técnicas alimentam o relatório."
  },
  {
    "kind": "paragraph",
    "text": "A avaliação precisa ser atualizada quando houver mudança relevante: nova finalidade, novo terceiro, dado sensível, perfilamento, expansão de escala, uso de IA, transferência internacional ou integração com ecossistemas externos. Um RIPD estático, desconectado do catálogo e do pipeline, perde valor rapidamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/pt/figure-03.svg",
    "alt": "Privacy by design acompanhando requisitos, contratos, testes e implantação",
    "caption": "Figura 3 - Privacidade deve acompanhar a esteira e as mudanças de contrato."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.11 Segurança, incidentes e comunicação",
    "id": "36-11-seguranca-incidentes-e-comunicacao"
  },
  {
    "kind": "paragraph",
    "text": "A LGPD exige medidas técnicas e administrativas aptas a proteger dados contra acessos não autorizados e situações acidentais ou ilícitas. Para APIs, isso envolve autenticação forte, menor privilégio, mTLS quando adequado, criptografia, gestão de segredos, segmentação, validação de entrada, proteção contra abuso, segurança de dependências e monitoramento."
  },
  {
    "kind": "paragraph",
    "text": "Incidente de segurança não é sinônimo automático de obrigação de comunicação, mas precisa ser avaliado. O Regulamento de Comunicação de Incidente de Segurança da ANPD define critérios e procedimentos para situações que possam acarretar risco ou dano relevante. A organização deve ter processo para detectar, classificar, conter, preservar evidências e decidir com rapidez."
  },
  {
    "kind": "paragraph",
    "text": "O inventário de APIs acelera a resposta. Quando uma credencial é exposta, é necessário saber quais endpoints ela alcança, quais dados podem ter sido consultados, quais logs registram uso e como revogar. A comunicação, quando aplicável, deve ser consistente com fatos confirmados e medidas adotadas."
  },
  {
    "kind": "subhead",
    "text": "Resposta a incidente envolvendo dados pessoais"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/pt/figure-04.svg",
    "alt": "Resposta a incidente conectando contenção, avaliação de risco e governança",
    "caption": "Figura 4 - Resposta a incidente combina operação técnica, avaliação de risco e governança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.12 Transferência internacional e terceiros",
    "id": "36-12-transferencia-internacional-e-terceiros"
  },
  {
    "kind": "paragraph",
    "text": "Transferência internacional ocorre quando dados pessoais são transferidos para país estrangeiro ou organismo internacional. Arquiteturas de nuvem podem realizar transferências por hospedagem, suporte, observabilidade, backup, CDN ou acesso remoto. O local do endpoint não revela sozinho todos os fluxos."
  },
  {
    "kind": "paragraph",
    "text": "A Resolução CD/ANPD nº 19/2024 regulamenta mecanismos de transferência, incluindo cláusulas-padrão contratuais, cláusulas específicas, normas corporativas globais e decisões de adequação. Em 2025 houve retificação do regulamento. Equipes devem manter inventário de destinos, fornecedores, subprocessadores, regiões e mecanismos jurídicos correspondentes."
  },
  {
    "kind": "paragraph",
    "text": "Third-party APIs também exigem due diligence. O contrato precisa limitar finalidade, instruções, retenção, subcontratação, segurança e incidentes. Tecnicamente, egress control, allowlists, gateways, token exchange, pseudonimização e minimização reduzem exposição. O fornecedor deve receber apenas o necessário para sua função."
  },
  {
    "kind": "paragraph",
    "text": "Nuvem não elimina responsabilidade Serviço gerenciado reduz carga operacional, mas não substitui classificação de dados, configuração segura, contratos, controle de regiões, revisão de subprocessadores e monitoramento de acesso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.13 API Gateways, observabilidade e ambientes de desenvolvimento",
    "id": "36-13-api-gateways-observabilidade-e-ambientes-de-desenvolvimento"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é ponto valioso de enforcement: autenticação, autorização, validação de schema, filtragem de campos, masking, rate limiting e auditoria. Porém, ele não deve se tornar repositório irrestrito de payloads. Traces detalhados e Traffic Monitors precisam de acesso controlado, retenção curta e mascaramento."
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade deve favorecer metadados operacionais: status, latência, routeId, clientId pseudonimizado, resultado de políticas e IDs de correlação. Captura de corpo precisa ser excepcional, justificada e temporária. Dashboards e alertas também podem expor dados se rótulos e dimensões tiverem alta cardinalidade com identificadores pessoais."
  },
  {
    "kind": "paragraph",
    "text": "Ambientes de desenvolvimento e homologação devem usar dados sintéticos ou adequadamente mascarados. Copiar base de produção para investigar bug cria tratamento adicional e amplia superfície. Ferramentas de replay precisam remover credenciais, cookies e campos pessoais."
  },
  {
    "kind": "paragraph",
    "text": "Política mínima para telemetria de APIs # Exemplo conceitual de política de logging permitir: method, routeId, status, latencyMs, traceId pseudonimizar: customerId, partnerId mascarar: email, telefone, documento bloquear: Authorization, Cookie, token, senha, biometria payload completo: somente exceção aprovada e temporária"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.14 Governança, DevSecOps e evidências",
    "id": "36-14-governanca-devsecops-e-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "Conformidade sustentável depende de automação. O catálogo de APIs pode armazenar owner, classificação de dados, finalidade e retenção. Linters podem detectar campos sensíveis em OpenAPI. Pipelines podem impedir logs de headers proibidos, exigir threat modeling e registrar aprovações. Scanners e testes de contrato verificam exposição acidental."
  },
  {
    "kind": "paragraph",
    "text": "Evidence as code é a prática de gerar evidências a partir da esteira: hash do contrato, resultado de testes, versão de policies, inventário atualizado, aprovação de segurança e registro de implantação. Isso reduz auditorias baseadas em planilhas desatualizadas. A evidência precisa ser íntegra, acessível aos responsáveis e proporcional ao risco."
  },
  {
    "kind": "paragraph",
    "text": "A governança também inclui treinamento, métricas e revisão periódica. Indicadores úteis: APIs com classificação completa, campos sensíveis sem owner, logs com redaction, pedidos de titular no prazo, incidentes, terceiros revisados e retenções expiradas."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A conformidade ganha escala quando a esteira gera evidências.",
    "headers": [
      "Controle de esteira",
      "Evidência produzida",
      "Falha evitada"
    ],
    "rows": [
      [
        "Lint de OpenAPI",
        "Relatório de campos críticos.",
        "Novo dado entra sem revisão."
      ],
      [
        "Testes de policy",
        "Resultado versionado.",
        "Gateway deixa vazar header ou payload."
      ],
      [
        "SAST / secret scan",
        "Achados e correções.",
        "Credenciais no código."
      ],
      [
        "Deploy assinado",
        "Artefato e aprovação.",
        "Configuração não rastreável."
      ],
      [
        "Revisão periódica",
        "Registro de owner e retenção.",
        "Inventário obsoleto."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.15 Crianças, adolescentes e proteção reforçada",
    "id": "36-15-criancas-adolescentes-e-protecao-reforcada"
  },
  {
    "kind": "paragraph",
    "text": "O tratamento de dados de crianças e adolescentes exige consideração prioritária de seu melhor interesse. Serviços digitais, APIs de educação, jogos, saúde, identidade e benefícios precisam avaliar linguagem, transparência, perfilamento, publicidade, compartilhamentos e mecanismos de verificação ou aferição de idade quando aplicáveis ao produto e à legislação vigente."
  },
  {
    "kind": "paragraph",
    "text": "Do ponto de vista técnico, a arquitetura deve reduzir coleta, evitar inferências desnecessárias, limitar retenção e impedir uso secundário incompatível. Identificadores de responsáveis, dados escolares, localização, biometria e histórico de uso podem elevar o risco. Controles de consentimento ou representação, quando exigidos, não devem ser implementados como simples checkbox desconectado da identidade e da finalidade."
  },
  {
    "kind": "paragraph",
    "text": "A Lei nº 15.211/2025, conhecida como Estatuto Digital da Criança e do Adolescente, acrescentou deveres específicos ao ecossistema digital e reforçou a articulação com a LGPD. Como a regulamentação e a fiscalização evoluem, equipes devem acompanhar orientações oficiais da ANPD e revisar produtos destinados ou acessíveis a menores."
  },
  {
    "kind": "paragraph",
    "text": "Proteção por padrão Para públicos potencialmente menores, a configuração inicial deve privilegiar privacidade: menor coleta, menor exposição, compartilhamento restrito e controles compreensíveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.16 Decisões automatizadas, perfilamento e inteligência artificial",
    "id": "36-16-decisoes-automatizadas-perfilamento-e-inteligencia-artificial"
  },
  {
    "kind": "paragraph",
    "text": "APIs frequentemente fornecem scores, recomendações, detecção de fraude, limites e classificações produzidas por modelos. Quando decisões automatizadas afetam interesses do titular, a arquitetura deve permitir explicabilidade proporcional, revisão, contestação e identificação dos critérios relevantes, observados segredos comercial e industrial e a legislação aplicável."
  },
  {
    "kind": "paragraph",
    "text": "O risco não está apenas no endpoint de inferência. Dados de treinamento, features, prompts, logs, feedback e outputs também integram o tratamento. É preciso registrar origem, finalidade, qualidade, vieses, retenção, acesso e compartilhamentos. Um modelo hospedado por terceiro pode introduzir transferência internacional, suboperadores e uso secundário de dados."
  },
  {
    "kind": "paragraph",
    "text": "Controles técnicos incluem separação entre identificadores e atributos, versionamento do modelo, registro da decisão, monitoramento de drift, testes de discriminação, revisão humana em casos críticos e limitação de dados enviados a provedores. A decisão de usar legítimo interesse, consentimento ou outra base precisa ser analisada no contexto concreto."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - IA amplia o ciclo de vida e exige evidências adicionais.",
    "headers": [
      "Elemento",
      "Risco",
      "Evidência necessária"
    ],
    "rows": [
      [
        "Feature store",
        "Reuso além da finalidade.",
        "Catálogo, origem e política de retenção."
      ],
      [
        "Endpoint de score",
        "Decisão opaca ou discriminatória.",
        "Versão, critérios e revisão."
      ],
      [
        "Prompt / contexto",
        "Dados pessoais enviados a terceiro.",
        "Minimização e contrato."
      ],
      [
        "Feedback",
        "Ampliação silenciosa do tratamento.",
        "Finalidade e base revisadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.17 Fiscalização, sanções e prestação de contas",
    "id": "36-17-fiscalizacao-sancoes-e-prestacao-de-contas"
  },
  {
    "kind": "paragraph",
    "text": "A ANPD pode atuar de forma orientativa, preventiva, fiscalizatória e sancionadora. A LGPD prevê sanções administrativas, e a Resolução CD/ANPD nº 4/2023 disciplina dosimetria e aplicação. A análise considera fatores previstos na lei e no regulamento, como gravidade, boa-fé, vantagem, reincidência, cooperação e adoção de mecanismos capazes de minimizar danos."
  },
  {
    "kind": "paragraph",
    "text": "Para equipes técnicas, prestação de contas significa demonstrar que decisões foram tomadas antes do incidente ou da auditoria. Políticas documentadas, inventário atualizado, testes, revisões de acesso, registros de eliminação, treinamento e resposta a incidentes são evidências mais fortes do que documentos genéricos produzidos depois."
  },
  {
    "kind": "paragraph",
    "text": "Métricas de conformidade precisam ser acionáveis. Quantidade de APIs sem owner, campos sensíveis sem classificação, retenções vencidas, credenciais expostas, pedidos fora do prazo e terceiros sem revisão ajudam a priorizar risco. A governança deve evitar transformar privacidade em mera contagem de documentos."
  },
  {
    "kind": "paragraph",
    "text": "Accountability não é burocracia O objetivo da evidência é permitir reconstruir por que a organização tratou dados, quais controles aplicou, como avaliou risco e como corrigiu desvios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.18 Troubleshooting e estudos de caso",
    "id": "36-18-troubleshooting-e-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - payload aparecendo em logs: uma API de cadastro registra o body inteiro para diagnóstico. O problema não é resolvido apenas reduzindo a retenção. A análise deve identificar campos, usuários com acesso, destinos de exportação, backups e consultas realizadas. A correção inclui remover captura, mascarar, restringir acesso, revisar incidentes e atualizar testes."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - pedido de eliminação incompleto: o registro principal é apagado, mas eventos, índices e data lake permanecem. A causa é inventário incompleto e ausência de lineage. A solução exige orquestração, estados de bloqueio, política de retenção e evidências por domínio."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - fornecedor internacional recebe dados além do necessário: a integração envia objeto completo quando apenas um score é necessário. A correção combina contrato mínimo, pseudonimização, egress control, mecanismo de transferência e revisão de finalidade."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting de privacidade deve preservar evidências sem ampliar exposição. Evite copiar dados para chats, tickets e planilhas. Use IDs de correlação, acesso temporário, ambientes controlados e procedimentos de emergência auditáveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Aplicar a LGPD às APIs significa transformar princípios e obrigações em arquitetura verificável. A conformidade começa no inventário, passa por finalidade, base legal, minimização e responsabilidades e continua em logs, filas, backups, terceiros e atendimento de direitos."
  },
  {
    "kind": "paragraph",
    "text": "Controladores e operadores precisam conhecer o fluxo real. O contrato OpenAPI é parte da evidência, mas deve ser complementado por lineage, retenção, políticas de gateway, observabilidade e contratos com fornecedores. Dados pseudonimizados continuam pessoais; consentimento não substitui outras bases legais nem se confunde com autenticação."
  },
  {
    "kind": "paragraph",
    "text": "Privacy by design, RIPD, segurança e resposta a incidentes formam um ciclo contínuo. Mudanças de API podem mudar risco e finalidade, exigindo revisão. Automação de controles e evidências na esteira reduz dependência de processos manuais e aumenta a capacidade de demonstrar responsabilidade."
  },
  {
    "kind": "paragraph",
    "text": "Próximo passo do curso O Capítulo 37 aprofunda arquiteturas bancárias de alta disponibilidade, conectando continuidade, redundância, consistência, capacidade e recuperação aos requisitos de APIs críticas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de LGPD para APIs",
    "id": "checklist-de-lgpd-para-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "A finalidade, base legal, categorias de dados e titular estão registradas por operação.",
      "Schemas e responses seguem minimização e autorização por contexto.",
      "Gateway, logs, traces, filas, caches, backups e testes estão no mapa de dados.",
      "Papéis de controlador, operador e terceiros refletem a prática e os contratos.",
      "Retenção, bloqueio, eliminação e restauração possuem regras e evidências.",
      "Direitos dos titulares podem ser atendidos de forma coordenada e segura.",
      "Dados sensíveis e identificadores técnicos recebem classificação adequada.",
      "Transferências internacionais e subprocessadores estão inventariados.",
      "Policies impedem registro de tokens, cookies, senhas e payloads desnecessários.",
      "Mudanças de contrato disparam revisão de privacidade e risco.",
      "Incidentes possuem processo de contenção, avaliação e comunicação.",
      "A esteira gera evidências de testes, aprovações e versões implantadas."
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
      "Mapeie o ciclo de vida de dados de uma API de cadastro desde o gateway até backups.",
      "Classifique customerId, IP, biometria e score de crédito e justifique.",
      "Explique por que pseudonimização não torna o dado automaticamente anônimo.",
      "Compare controlador e operador em uma integração com SaaS de antifraude.",
      "Proponha uma response minimizada para uma API de consulta de cliente.",
      "Desenhe o fluxo de atendimento a um pedido de acesso em microserviços.",
      "Defina política de retenção para access logs, traces, DLQ e backups.",
      "Liste gatilhos para atualizar um RIPD após mudança de API.",
      "Proponha controles de gateway para impedir vazamento em logs.",
      "Descreva evidências necessárias para investigar um incidente com token exposto."
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
    "caption": "Tabela 6 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "ANPD",
        "Agência Nacional de Proteção de Dados, responsável pela regulação e fiscalização da proteção de dados no Brasil."
      ],
      [
        "Anonimização",
        "Uso de meios técnicos razoáveis para retirar possibilidade de associação a uma pessoa."
      ],
      [
        "Base legal",
        "Hipótese prevista em lei que legitima uma operação de tratamento."
      ],
      [
        "Controlador",
        "Agente responsável por decisões referentes ao tratamento."
      ],
      [
        "Dado pessoal",
        "Informação relacionada a pessoa natural identificada ou identificável."
      ],
      [
        "Dado sensível",
        "Categoria de dado pessoal com proteção reforçada definida pela LGPD."
      ],
      [
        "Encarregado",
        "Canal e agente de apoio com atribuições previstas na LGPD e regulamentação."
      ],
      [
        "Lineage",
        "Rastreabilidade da origem, transformação e destinos dos dados."
      ],
      [
        "Operador",
        "Agente que trata dados em nome do controlador."
      ],
      [
        "Privacy by design",
        "Integração da proteção de dados desde a concepção e durante o ciclo de vida."
      ],
      [
        "Pseudonimização",
        "Tratamento que separa identificadores, mantendo reidentificação mediante informação adicional."
      ],
      [
        "RIPD",
        "Relatório de Impacto à Proteção de Dados Pessoais."
      ],
      [
        "Decisão automatizada",
        "Resultado produzido exclusivamente ou predominantemente por tratamento automatizado."
      ],
      [
        "Titular",
        "Pessoa natural a quem se referem os dados pessoais."
      ],
      [
        "Tratamento",
        "Conjunto amplo de operações realizadas com dados pessoais."
      ],
      [
        "Transferência internacional",
        "Transferência de dados pessoais para país estrangeiro ou organismo internacional."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências técnicas e normativas",
    "id": "referencias-tecnicas-e-normativas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "BRASIL. Lei nº 13.709/2018 - Lei Geral de Proteção de Dados Pessoais, texto compilado.",
      "BRASIL. Lei nº 13.853/2019 - alterações na LGPD e criação da ANPD.",
      "BRASIL. Lei nº 15.211/2025 - Estatuto Digital da Criança e do Adolescente.",
      "BRASIL. Lei nº 15.352/2026 - transformação da ANPD em agência reguladora e alterações correlatas.",
      "ANPD. Regulamentações vigentes da Agência Nacional de Proteção de Dados.",
      "ANPD. Resolução CD/ANPD nº 4/2023 - dosimetria e aplicação de sanções administrativas.",
      "ANPD. Resolução CD/ANPD nº 15/2024 - Regulamento de Comunicação de Incidente de Segurança.",
      "ANPD. Resolução CD/ANPD nº 18/2024 - atuação do encarregado pelo tratamento de dados pessoais.",
      "ANPD. Resolução CD/ANPD nº 19/2024 - Transferência Internacional de Dados e cláusulas-padrão contratuais.",
      "ANPD. Guia Orientativo sobre Hipóteses Legais - Legítimo Interesse.",
      "ANPD. Guia Orientativo sobre Segurança da Informação para Agentes de Tratamento de Pequeno Porte.",
      "ANPD. Guia Orientativo para Definições dos Agentes de Tratamento e do Encarregado.",
      "ANPD. Portal de Direitos dos Titulares de Dados.",
      "OWASP. API Security Top 10 e práticas de segurança para APIs."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota jurídica e de atualização Este capítulo é material educacional. A aplicação da LGPD depende do contexto, do setor e de normas vigentes. Valide decisões com as áreas jurídica, privacidade, segurança e regulatória e consulte as publicações oficiais atualizadas da ANPD."
  }
];
