import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const HIGH_AVAILABILITY_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Alta disponibilidade bancária: continuidade ponta a ponta, não apenas servidores duplicados"
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "O serviço crítico precisa sobreviver a falhas de processo, nó, zona, região, fornecedor, mudança e erro humano."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/overview.svg",
    "alt": "Arquitetura bancária resiliente protegendo a continuidade ponta a ponta",
    "caption": "Figura de abertura - A disponibilidade bancária depende da continuidade de toda a cadeia, não apenas de componentes isolados."
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
    "text": "Em uma instituição financeira, indisponibilidade não significa apenas uma tela lenta. Pode impedir pagamentos, bloquear transferências, interromper liquidação, deixar clientes sem acesso a saldo, atrasar conciliações e ampliar exposição a fraude. Por isso, a arquitetura de alta disponibilidade bancária precisa ser construída a partir das operações críticas do negócio e das consequências de sua interrupção, e não apenas da duplicação de servidores."
  },
  {
    "kind": "paragraph",
    "text": "O Comitê de Basileia define resiliência operacional como a capacidade de um banco entregar operações críticas durante uma disrupção. Essa perspectiva é mais ampla que disponibilidade técnica: inclui pessoas, processos, tecnologia, instalações, fornecedores e dependências externas. A arquitetura deve assumir que falhas ocorrerão e estabelecer tolerâncias para disrupção, mecanismos de proteção, resposta, adaptação, recuperação e aprendizado."
  },
  {
    "kind": "paragraph",
    "text": "No Brasil, o tema se relaciona às estruturas de gerenciamento de riscos, à política de segurança cibernética, à contratação de serviços de processamento e nuvem e aos requisitos dos arranjos de pagamentos. Normas e manuais não prescrevem uma única topologia, mas exigem governança, continuidade, controles, testes, capacidade de recuperação e gestão de terceiros. O desenho técnico precisa transformar essas obrigações em propriedades verificáveis."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo conecta API Gateways, microserviços, mensageria, Kubernetes, observabilidade e Zero Trust a uma visão bancária de continuidade. Serão estudados RTO, RPO, SLOs, fault domains, active-active, active-passive, consistência, replicação, idempotência, reconciliação, capacidade, segurança, disaster recovery e testes de cenários severos, mas plausíveis."
  },
  {
    "kind": "paragraph",
    "text": "Como estudar este capítulo Para cada arquitetura, identifique a operação crítica, a dependência que pode falhar, o efeito observado pelo cliente, a tolerância aceita, a estratégia de recuperação e a evidência produzida pelos testes. Alta disponibilidade sem critérios mensuráveis é apenas uma intenção."
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
      "Diferenciar disponibilidade, confiabilidade, continuidade de negócios, disaster recovery e resiliência operacional.",
      "Definir operações críticas, impacto, tolerância à disrupção, RTO, RPO, SLI e SLO.",
      "Projetar redundância por processo, nó, zona, região, rede, fornecedor e equipe.",
      "Comparar topologias active-active, active-passive, warm standby e pilot light.",
      "Compreender replicação síncrona e assíncrona, quorum, split-brain e consistência.",
      "Aplicar idempotência, ledger, Outbox, reconciliação e semânticas de entrega a transações financeiras.",
      "Desenhar DNS, balanceadores, API Gateways, egress e conectividade com failover controlado.",
      "Relacionar segurança, HSM, PKI, gestão de segredos e fornecedores à disponibilidade.",
      "Planejar capacidade, degradação graciosa, load shedding e proteção contra falhas em cascata.",
      "Construir testes de DR, chaos engineering, observabilidade e resposta a incidentes auditáveis."
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
      "37.1 Alta disponibilidade e resiliência operacional",
      "37.2 Operações críticas, impacto e tolerância à disrupção",
      "37.3 Métricas: disponibilidade, SLI, SLO, RTO e RPO",
      "37.4 Domínios de falha e redundância real",
      "37.5 Active-active, active-passive e multi-região",
      "37.6 Dados: replicação, quorum e consistência",
      "37.7 Integridade transacional, idempotência e reconciliação",
      "37.8 Rede, DNS, balanceadores e API Gateways",
      "37.9 Segurança, HSM, PKI, nuvem e terceiros",
      "37.10 Capacidade, backpressure e degradação controlada",
      "37.11 Observabilidade e resposta a incidentes",
      "37.12 Mudanças, DR, testes e chaos engineering",
      "37.13 Arquiteturas híbridas, mainframe, Pix e pagamentos instantâneos",
      "37.14 Troubleshooting e estudos de caso",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.1 Alta disponibilidade e resiliência operacional",
    "id": "37-1-alta-disponibilidade-e-resiliencia-operacional"
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade é a capacidade de um serviço permanecer acessível dentro de um nível acordado. Confiabilidade trata da probabilidade de executar corretamente por um período; continuidade de negócios trata da manutenção de atividades essenciais; disaster recovery concentra-se na restauração de tecnologia após desastre; resiliência operacional integra prevenção, absorção, resposta, recuperação e aprendizado. Em bancos, esses conceitos se sobrepõem, mas não são sinônimos."
  },
  {
    "kind": "paragraph",
    "text": "Uma aplicação pode apresentar 99,99% de uptime e ainda ser operacionalmente frágil se uma falha produz saldos incorretos, pagamentos duplicados ou reconciliação incompleta. Por isso, a qualidade da recuperação é tão importante quanto sua velocidade. A arquitetura deve preservar integridade, rastreabilidade e capacidade de explicar o estado final de cada transação."
  },
  {
    "kind": "paragraph",
    "text": "Resiliência deve ser avaliada por operação crítica, não pelo status agregado da infraestrutura. O aplicativo móvel pode estar disponível, enquanto a iniciação de pagamento falha por indisponibilidade de um HSM ou de um participante externo. A cadeia precisa ser modelada do canal ao ledger, incluindo autenticação, gateway, serviços, filas, bancos, redes, provedores e processos humanos."
  },
  {
    "kind": "subhead",
    "text": "Resiliência em camadas: cada dependência precisa de uma resposta de falha"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/figure-01.svg",
    "alt": "Camadas interdependentes de resiliência bancária, do negócio à infraestrutura",
    "caption": "Figura 1 - A resiliência é composta por camadas técnicas e organizacionais interdependentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.2 Operações críticas, impacto e tolerância à disrupção",
    "id": "37-2-operacoes-criticas-impacto-e-tolerancia-a-disrupcao"
  },
  {
    "kind": "paragraph",
    "text": "O primeiro passo é identificar operações críticas, como consulta de saldo, autorização de cartão, liquidação, Pix, emissão de boletos, autenticação, prevenção a fraude e acesso de parceiros. A classificação precisa considerar clientes, estabilidade financeira, obrigações regulatórias, perdas financeiras, reputação e efeito sistêmico. Serviços internos também podem ser críticos quando sustentam várias jornadas externas."
  },
  {
    "kind": "paragraph",
    "text": "A Business Impact Analysis relaciona operação, dependências, períodos de pico, volumes, consequências e prioridades de recuperação. A tolerância à disrupção expressa quanto impacto a instituição aceita sob cenários severos, mas plausíveis. Essa tolerância não é apenas tempo: pode envolver número de clientes afetados, volume financeiro, atraso de liquidação, divergência tolerável e capacidade manual de contingência."
  },
  {
    "kind": "paragraph",
    "text": "Mapear dependências exige ir além do diagrama lógico. É necessário registrar certificados, HSMs, DNS, filas, bancos, sistemas legados, provedores de nuvem, telecomunicações, equipes de plantão e contratos de suporte. Uma dependência compartilhada pode invalidar redundâncias aparentemente independentes. Dois datacenters que usam o mesmo circuito, a mesma autoridade de certificação ou o mesmo pipeline de configuração possuem riscos comuns."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Resiliência começa pela operação de negócio e suas dependências reais.",
    "headers": [
      "Elemento",
      "Pergunta de arquitetura",
      "Evidência"
    ],
    "rows": [
      [
        "Operação crítica",
        "Qual serviço deve continuar durante a disrupção?",
        "Catálogo, BIA e owner."
      ],
      [
        "Tolerância",
        "Quanto impacto é aceitável e por quanto tempo?",
        "Limites aprovados e cenários."
      ],
      [
        "Dependências",
        "Quais recursos sustentam a operação ponta a ponta?",
        "Mapa técnico e de terceiros."
      ],
      [
        "Contingência",
        "Como operar de modo degradado ou manual?",
        "Runbook e teste periódico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.3 Métricas: disponibilidade, SLI, SLO, RTO e RPO",
    "id": "37-3-metricas-disponibilidade-sli-slo-rto-e-rpo"
  },
  {
    "kind": "paragraph",
    "text": "Disponibilidade pode ser medida como a proporção de tempo ou de requisições bem-sucedidas. Para APIs, o indicador deve considerar semântica: uma resposta HTTP 200 com dado incorreto não é sucesso. SLIs podem medir taxa de sucesso, latência, frescor de dados, completude, tempo de processamento e backlog. O SLO define o objetivo e o orçamento de erro permite decidir quanta mudança ou risco operacional cabe no período."
  },
  {
    "kind": "paragraph",
    "text": "RTO é o tempo máximo esperado para restabelecer a operação após uma interrupção. RPO é a quantidade máxima de dados que se aceita perder, expressa como distância temporal entre o último ponto recuperável e a falha. Esses valores orientam replicação, backup, failover, automação e frequência de testes. RPO zero normalmente exige mecanismos síncronos ou ledger distribuído com forte coordenação, elevando latência e complexidade."
  },
  {
    "kind": "paragraph",
    "text": "MTTR e MTBF ajudam a observar recuperação e frequência de falhas, mas não substituem métricas de experiência. Em sistemas distribuídos, degradações parciais são mais comuns que falhas totais. Por isso, dashboards devem mostrar disponibilidade por operação, região, canal e dependência, além de indicadores de integridade e reconciliação."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/figure-02.svg",
    "alt": "Linha do tempo comparando RPO e RTO durante uma recuperação",
    "caption": "Figura 2 - RPO limita perda de dados; RTO limita o tempo para restabelecer a operação."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Métricas técnicas precisam estar ligadas a decisões de arquitetura e negócio.",
    "headers": [
      "Objetivo",
      "Significado",
      "Decisão influenciada"
    ],
    "rows": [
      [
        "SLO",
        "Nível de serviço desejado em uma janela.",
        "Capacidade, alertas e orçamento de erro."
      ],
      [
        "RTO",
        "Prazo para restabelecer a operação.",
        "Automação, standby e prioridade."
      ],
      [
        "RPO",
        "Perda máxima de dados aceitável.",
        "Replicação, journal e backup."
      ],
      [
        "Tolerância à disrupção",
        "Impacto máximo aceito no negócio.",
        "Estratégia ponta a ponta."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.4 Domínios de falha e redundância real",
    "id": "37-4-dominios-de-falha-e-redundancia-real"
  },
  {
    "kind": "paragraph",
    "text": "Um domínio de falha é um conjunto de componentes que pode ser afetado pelo mesmo evento. Processos no mesmo host compartilham o nó; nós no mesmo rack podem compartilhar energia; zonas podem compartilhar uma região; regiões podem compartilhar provedor, plano de controle, identidade ou rede de longa distância. Alta disponibilidade real exige identificar o maior evento que a arquitetura deve tolerar."
  },
  {
    "kind": "paragraph",
    "text": "Redundância elimina pontos únicos apenas quando as cópias são independentes e testadas. Dois firewalls com a mesma configuração defeituosa podem falhar simultaneamente. Dois clusters que recebem a mesma mudança incorreta não protegem contra erro lógico. Diversidade operacional, separação de pipelines, staged rollout e capacidade de congelar mudanças durante incidente são partes da arquitetura."
  },
  {
    "kind": "paragraph",
    "text": "A independência também precisa incluir pessoas e procedimentos. O mesmo time pode não conseguir operar dois ambientes durante uma crise. Credenciais de emergência, comunicação fora de banda, contatos de fornecedores e acesso a runbooks precisam sobreviver à indisponibilidade dos sistemas normais."
  },
  {
    "kind": "paragraph",
    "text": "Teste de independência Pergunte: qual causa comum derruba todas as réplicas? Se a resposta inclui identidade, DNS, repositório de configuração, HSM, rota, telecomunicação, fornecedor ou equipe, a redundância ainda possui um ponto compartilhado que precisa ser tratado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.5 Active-active, active-passive e multi-região",
    "id": "37-5-active-active-active-passive-e-multi-regiao"
  },
  {
    "kind": "paragraph",
    "text": "Em active-active, duas ou mais localidades atendem tráfego simultaneamente. A capacidade já está aquecida e a falha pode ser absorvida mais rapidamente. Porém, o modelo exige distribuição de dados, roteamento, prevenção de split-brain, consistência de configuração e reconciliação entre regiões. O ganho de RTO pode vir acompanhado de maior complexidade e custo permanente."
  },
  {
    "kind": "paragraph",
    "text": "Em active-passive, uma localidade primária atende e outra permanece pronta para assumir. O standby pode ser hot, warm ou cold, conforme capacidade, dados e componentes ativos. Esse modelo simplifica algumas decisões de consistência, mas o failover precisa ser automatizado e testado. Ambientes passivos que nunca recebem tráfego tendem a acumular drift, certificados vencidos e dependências não validadas."
  },
  {
    "kind": "paragraph",
    "text": "Arquiteturas multi-região precisam definir granularidade de failover. Mover toda a instituição de uma vez aumenta o blast radius; mover operações por domínio permite controle, mas exige dependências desacopladas. O retorno à região original, ou failback, deve ser tratado como outra mudança de alto risco, com sincronização e critérios próprios."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/figure-03.svg",
    "alt": "Comparação entre topologias active-active e active-passive",
    "caption": "Figura 3 - Active-active reduz tempo de ativação; active-passive reduz simultaneidade, mas exige standby comprovadamente pronto."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A escolha deve refletir tolerância, integridade, custo e capacidade operacional.",
    "headers": [
      "Topologia",
      "Vantagem",
      "Risco dominante"
    ],
    "rows": [
      [
        "Active-active",
        "Capacidade em uso e failover rápido.",
        "Consistência, split-brain e conflito."
      ],
      [
        "Hot standby",
        "RTO baixo com escrita concentrada.",
        "Ambiente passivo pode divergir."
      ],
      [
        "Warm standby",
        "Custo menor que hot standby.",
        "Escala e inicialização durante crise."
      ],
      [
        "Pilot light",
        "Componentes mínimos e dados replicados.",
        "RTO maior e dependências não aquecidas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.6 Dados: replicação, quorum e consistência",
    "id": "37-6-dados-replicacao-quorum-e-consistencia"
  },
  {
    "kind": "paragraph",
    "text": "Dados são normalmente a parte mais difícil da alta disponibilidade. Replicação síncrona confirma a escrita somente após alcançar o número exigido de réplicas, reduzindo RPO, porém aumentando latência e sensibilidade à rede. Replicação assíncrona permite resposta mais rápida, mas pode perder transações ainda não replicadas durante a falha. A decisão deve ser tomada por classe de dado, não por uma regra única para toda a plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Sistemas baseados em quorum exigem que leituras e escritas alcancem uma quantidade de nós suficiente para preservar propriedades desejadas. Entretanto, quorum não elimina conflitos automaticamente. É necessário compreender leader election, fencing tokens, relógios, consistência linearizável, eventual consistency e comportamento sob partições. Split-brain ocorre quando lados isolados aceitam operações incompatíveis; prevenção e reconciliação precisam estar explícitas."
  },
  {
    "kind": "paragraph",
    "text": "Ledgers financeiros normalmente exigem imutabilidade lógica, dupla entrada, trilha auditável e capacidade de reconstrução. Caches e materialized views podem ser eventualmente consistentes, desde que o sistema autoritativo permaneça claro. A arquitetura deve diferenciar dado de decisão, dado derivado e dado de apresentação, evitando que uma réplica atrasada seja tratada como fonte oficial."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Replicação atende disponibilidade; backup atende também corrupção e perda lógica.",
    "headers": [
      "Mecanismo",
      "Propriedade",
      "Cuidado"
    ],
    "rows": [
      [
        "Replicação síncrona",
        "Menor perda potencial.",
        "Latência e disponibilidade sob partição."
      ],
      [
        "Replicação assíncrona",
        "Menor latência e maior distância.",
        "RPO e promoção de réplica atrasada."
      ],
      [
        "Quorum",
        "Coordenação entre réplicas.",
        "Configuração, eleição e partições."
      ],
      [
        "Backup imutável",
        "Recuperação de corrupção ou ataque.",
        "Restauração precisa ser testada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.7 Integridade transacional, idempotência e reconciliação",
    "id": "37-7-integridade-transacional-idempotencia-e-reconciliacao"
  },
  {
    "kind": "paragraph",
    "text": "Falhas em transações financeiras geram estados ambíguos: o cliente recebeu timeout, mas o pagamento foi aceito; o gateway repetiu a requisição; o serviço gravou o ledger, mas não publicou o evento; a mensagem foi consumida duas vezes. A arquitetura precisa resolver ambiguidade por meio de identificadores únicos, idempotency keys, estados transacionais, consulta de status e reconciliação."
  },
  {
    "kind": "paragraph",
    "text": "Idempotência permite repetir uma operação sem produzir efeito financeiro adicional. A chave precisa estar vinculada ao consumidor, à operação e ao payload relevante. O servidor deve persistir resultado ou estado antes de responder de modo que retries concorrentes não atravessem a proteção. Para mensageria, Inbox, deduplicação e processamento transacional reduzem efeitos de entrega pelo menos uma vez."
  },
  {
    "kind": "paragraph",
    "text": "O padrão Transactional Outbox grava a mudança de negócio e o evento na mesma transação local; um publicador separado envia o evento posteriormente. Isso evita o dual write entre banco e broker. Mesmo assim, consumidores precisam tolerar duplicatas. Reconciliação compara fontes autoritativas, eventos, liquidação e extratos para identificar diferenças que os controles online não resolveram."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/figure-04.svg",
    "alt": "Fluxo resiliente de uma transação financeira com idempotência e reconciliação",
    "caption": "Figura 4 - Uma transação resiliente precisa preservar estado e permitir recuperação sem duplicação."
  },
  {
    "kind": "paragraph",
    "text": "Fluxo conceitual de processamento idempotente POST /pagamentos HTTP/1.1 Idempotency-Key: 98f4d0b2-... X-Correlation-ID: 7aa1c9e8-..."
  },
  {
    "kind": "paragraph",
    "text": "1. Reservar a chave e validar o comando 2. Registrar a transação no ledger 3. Gravar evento no Outbox 4. Responder com identificador e estado 5. Publicar evento e reconciliar assíncronamente"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.8 Rede, DNS, balanceadores e API Gateways",
    "id": "37-8-rede-dns-balanceadores-e-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "O caminho de uma API bancária passa por DNS, proteção de borda, balanceadores, API Gateways, redes privadas, proxies e backends. Cada camada precisa de health checks que reflitam capacidade real. Um TCP check pode declarar saudável uma instância incapaz de acessar o HSM ou o banco. Readiness deve considerar dependências essenciais sem criar uma cascata em que todas as réplicas se removem simultaneamente."
  },
  {
    "kind": "paragraph",
    "text": "DNS e GSLB podem direcionar tráfego entre regiões, mas TTL, caches e clientes persistentes atrasam a convergência. Balanceadores L4 e L7 podem manter conexões existentes para a região anterior. Em HTTP/2, gRPC e WebSocket, conexões duradouras exigem drenagem e reconexão controladas. Failover precisa ser testado com clientes reais e não apenas com consultas administrativas."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways devem distribuir configuração de maneira segura, manter políticas críticas durante perda do control plane e possuir dependências de baixa latência para rate limiting, autenticação e roteamento. Uma arquitetura pode escolher fail-open ou fail-closed por controle, mas a decisão deve considerar fraude, indisponibilidade e integridade. Cache de chaves e políticas precisa de expiração, revogação e observabilidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A disponibilidade da API depende da convergência de toda a cadeia de rede.",
    "headers": [
      "Componente",
      "Falha típica",
      "Controle"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "Destino antigo permanece em cache.",
        "TTL, health global e testes de convergência."
      ],
      [
        "Load balancer",
        "Health check superficial.",
        "Readiness sem dependências não essenciais."
      ],
      [
        "API Gateway",
        "Policy store ou control plane indisponível.",
        "Configuração local válida e rollback."
      ],
      [
        "Rede privada",
        "Rota assimétrica ou circuito único.",
        "Caminhos independentes e flow logs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.9 Segurança, HSM, PKI, nuvem e terceiros",
    "id": "37-9-seguranca-hsm-pki-nuvem-e-terceiros"
  },
  {
    "kind": "paragraph",
    "text": "Segurança é dependência de disponibilidade. Se a autoridade de identidade, o HSM, a PKI ou o serviço de segredos falha, aplicações saudáveis podem parar de autenticar e assinar operações. Esses componentes precisam de redundância, capacidade, rotação segura e procedimentos de emergência. Certificados de contingência não devem ser improvisados durante o incidente."
  },
  {
    "kind": "paragraph",
    "text": "A contratação de nuvem e processamento externo exige conhecer regiões, modelos de responsabilidade, suporte, portabilidade, backup, acesso administrativo e subcontratados. Multi-cloud pode reduzir dependência de fornecedor, mas aumenta complexidade, diferenças operacionais e superfície de erro. Em muitos casos, uma arquitetura bem testada em um provedor com portabilidade de dados é mais resiliente que duas nuvens mantidas de forma desigual."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust permanece aplicável durante contingência. Contas break-glass devem ser fortemente protegidas, auditadas e testadas. A pressão para recuperar não justifica desativar controles sem prazo e compensações. A resposta precisa registrar quem autorizou, quais restrições foram flexibilizadas e quando a configuração normal será restaurada."
  },
  {
    "kind": "paragraph",
    "text": "Risco de dependência oculta Sistemas críticos podem compartilhar o mesmo HSM, tenant de identidade, cofre de segredos, pipeline ou fornecedor de telecomunicações. Esses componentes precisam aparecer no mapa de dependências e nos cenários de teste, mesmo quando não fazem parte do fluxo funcional visível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.10 Capacidade, backpressure e degradação controlada",
    "id": "37-10-capacidade-backpressure-e-degradacao-controlada"
  },
  {
    "kind": "paragraph",
    "text": "Failover aumenta carga na infraestrutura sobrevivente. Se duas regiões operam a 70% cada, a perda de uma não pode ser absorvida pela outra. Planejamento de capacidade precisa considerar picos, manutenção, crescimento, retries e degradação de dependências. N+1 significa que a operação continua após perder um componente; em multi-região, a instituição deve decidir se exige capacidade total ou serviço degradado."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure impede que produtores sobrecarreguem consumidores. Filas, limites de concorrência, rate limiting e circuit breakers devem manter o sistema em uma faixa recuperável. Retries precisam de backoff, jitter e orçamento; caso contrário, multiplicam o tráfego durante a falha. Load shedding rejeita trabalho de menor prioridade para preservar operações críticas."
  },
  {
    "kind": "paragraph",
    "text": "Degradação graciosa deve ser planejada previamente. O banco pode manter consulta de saldo e pagamentos enquanto suspende relatórios, recomendações e enriquecimentos não essenciais. Respostas degradadas precisam ser explícitas para evitar decisões com dado desatualizado. Feature flags de contingência devem ser testadas, versionadas e protegidas contra ativação indevida."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Resiliência inclui controlar demanda, não apenas aumentar infraestrutura.",
    "headers": [
      "Técnica",
      "Objetivo",
      "Exemplo bancário"
    ],
    "rows": [
      [
        "Backpressure",
        "Reduzir entrada quando o consumidor satura.",
        "Limitar comandos enquanto ledger recupera."
      ],
      [
        "Load shedding",
        "Preservar tráfego prioritário.",
        "Suspender relatórios antes de pagamentos."
      ],
      [
        "Circuit breaker",
        "Interromper chamadas sem chance de sucesso.",
        "Evitar cascata para provedor indisponível."
      ],
      [
        "Bulkhead",
        "Isolar pools e recursos.",
        "Separar cartões, Pix e consultas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.11 Observabilidade e resposta a incidentes",
    "id": "37-11-observabilidade-e-resposta-a-incidentes"
  },
  {
    "kind": "paragraph",
    "text": "A observabilidade precisa responder se a operação crítica está disponível, correta e dentro da tolerância. Métricas de infraestrutura são insuficientes sem sinais de negócio: pagamentos aceitos, liquidados, pendentes, duplicados, revertidos e reconciliados. Traces distribuídos ajudam a localizar a dependência, enquanto logs de auditoria explicam decisões e mudanças."
  },
  {
    "kind": "paragraph",
    "text": "Alertas devem ser acionáveis e orientados a SLOs. Uma taxa pequena de erro pode ser crítica em uma operação de alto valor; uma latência elevada pode ser tolerável em relatórios. Burn-rate alerts detectam consumo acelerado do orçamento de erro. Synthetic transactions e probes externas verificam a jornada completa, mas precisam usar dados controlados e não criar efeitos financeiros reais."
  },
  {
    "kind": "paragraph",
    "text": "Durante o incidente, o comando precisa combinar tecnologia, negócio, segurança, comunicação e fornecedores. Runbooks descrevem ações, pré-condições e rollback, mas não substituem julgamento. Depois da recuperação, reconciliação e análise de causa devem ocorrer antes de declarar encerramento definitivo."
  },
  {
    "kind": "subhead",
    "text": "Ciclo de resiliência operacional"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/pt/figure-05.svg",
    "alt": "Ciclo de resposta, recuperação, reconciliação e aprendizado após incidente",
    "caption": "Figura 5 - Recuperar o serviço é apenas uma etapa; reconciliar e aprender completam a resiliência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.12 Mudanças, disaster recovery e chaos engineering",
    "id": "37-12-mudancas-disaster-recovery-e-chaos-engineering"
  },
  {
    "kind": "paragraph",
    "text": "Mudanças são uma das principais fontes de indisponibilidade. Progressive delivery, canary, blue-green, feature flags, validação automática e rollback reduzem risco. Alterações de schema e migrações de dados exigem expand-migrate-contract para permitir coexistência. A automação deve bloquear promoção quando SLOs, reconciliação ou checks de segurança falham."
  },
  {
    "kind": "paragraph",
    "text": "Disaster recovery precisa ser exercitado com objetivos reais. Testar apenas a criação de máquinas não prova que a operação crítica funciona. O teste deve incluir ativação de tráfego, identidade, chaves, dados, filas, fornecedores, canais e retorno. Evidências devem registrar tempos, perda de dados, intervenções manuais, desvios e ações corretivas."
  },
  {
    "kind": "paragraph",
    "text": "Chaos engineering introduz falhas controladas para validar hipóteses. Em bancos, o escopo precisa respeitar risco e ambiente: perda de pod, atraso de rede, indisponibilidade de zona, expiração de certificado, fila acumulada ou falha de HSM podem ser simulados progressivamente. O objetivo não é causar caos, mas descobrir fragilidades antes de um evento real."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Testes precisam validar hipóteses de negócio e tecnologia.",
    "headers": [
      "Teste",
      "Hipótese",
      "Evidência esperada"
    ],
    "rows": [
      [
        "Perda de nó",
        "Orquestrador repõe capacidade sem impacto relevante.",
        "Tempo de recuperação e erros observados."
      ],
      [
        "Falha de zona",
        "Tráfego migra e dados permanecem consistentes.",
        "SLO, quorum e backlog."
      ],
      [
        "Promoção regional",
        "Standby assume dentro do RTO/RPO.",
        "Jornada completa e reconciliação."
      ],
      [
        "Restauração de backup",
        "Corrupção lógica pode ser recuperada.",
        "Tempo, integridade e cadeia de custódia."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.13 Arquiteturas híbridas, mainframe, Pix e pagamentos instantâneos",
    "id": "37-13-arquiteturas-hibridas-mainframe-pix-e-pagamentos-instantaneos"
  },
  {
    "kind": "paragraph",
    "text": "Bancos frequentemente combinam mainframes, middleware, bancos distribuídos, nuvem e gateways. O mainframe pode ser o ledger autoritativo, enquanto canais e APIs operam em plataformas modernas. A alta disponibilidade depende do acoplamento entre esses mundos: filas, transações, adaptadores, janelas batch, capacidade do host e limites de conexão precisam ser observados de forma conjunta."
  },
  {
    "kind": "paragraph",
    "text": "Pagamentos instantâneos ampliam a exigência de operação contínua e baixa latência. A instituição precisa tratar conectividade, certificados, assinatura, prevenção a fraude, limites, mensageria, reconciliação e contingência como uma cadeia. Uma resposta ao cliente deve distinguir rejeição definitiva, processamento pendente e estado desconhecido, permitindo consulta posterior sem repetir o efeito financeiro."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas híbridas, a migração para nuvem deve ocorrer por capacidades e domínios, não apenas por cópia de máquinas. Strangler, eventos, APIs anticorrupção e replicação controlada permitem transição gradual. A coexistência precisa de ownership claro do dado e critérios de desligamento do legado para evitar dois sistemas autoritativos."
  },
  {
    "kind": "paragraph",
    "text": "Caso Pix Uma falha de comunicação após o envio de uma ordem não deve ser tratada automaticamente como falha de negócio. O sistema precisa consultar o estado, usar identificadores únicos e reconciliar antes de permitir nova tentativa que possa duplicar o pagamento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.14 Troubleshooting e estudos de caso",
    "id": "37-14-troubleshooting-e-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting de alta disponibilidade começa pela linha do tempo. Determine qual mudança ou falha ocorreu, qual região ou zona foi afetada, quando o health check reagiu, quando o roteamento convergiu e qual estado de dados foi promovido. Logs sem relógios sincronizados e IDs de correlação tornam a reconstrução difícil."
  },
  {
    "kind": "paragraph",
    "text": "Em failovers intermitentes, investigue flapping de health checks, TTLs, pools de conexão, sessões, leader election e dependências com capacidade insuficiente. Em divergência de dados, interrompa novas escritas conflitantes, preserve evidências e estabeleça a fonte autoritativa antes de reconciliar. Recuperar disponibilidade às custas de integridade pode agravar a perda."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso: uma região primária perde conectividade com o banco de dados. O balanceador mantém instâncias como saudáveis porque o endpoint técnico responde. Clientes recebem erros por vários minutos. A correção envolve readiness orientada à operação, circuit breaker, remoção gradual do tráfego, promoção da réplica, verificação de lag e reconciliação posterior."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso: após um deploy, os dois clusters active-active passam a rejeitar tokens por configuração de issuer incorreta. A redundância não protegeu contra falha comum de configuração. A resposta exige rollback independente, staged rollout, validação sintética e separação do pipeline entre ondas de implantação."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - O diagnóstico deve preservar integridade e reconstruir a sequência de eventos.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidência prioritária"
    ],
    "rows": [
      [
        "Failover lento",
        "DNS, conexões persistentes ou standby frio.",
        "Timeline de roteamento e capacidade."
      ],
      [
        "Pagamentos duplicados",
        "Retry sem idempotência ou dedupe.",
        "Chaves, ledger e logs de comando."
      ],
      [
        "Regiões divergentes",
        "Replicação atrasada ou split-brain.",
        "LSN/offset, quorum e eleição."
      ],
      [
        "Falha simultânea",
        "Dependência ou mudança compartilhada.",
        "Mapa de blast radius e configuração."
      ]
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
    "text": "Arquiteturas bancárias de alta disponibilidade precisam partir das operações críticas e de suas tolerâncias à disrupção. Disponibilidade técnica isolada não garante resiliência: integridade, reconciliação, segurança, pessoas, fornecedores e comunicação fazem parte do resultado."
  },
  {
    "kind": "paragraph",
    "text": "RTO, RPO, SLOs e tolerâncias orientam topologia, replicação, capacidade e testes. Active-active e active-passive possuem trade-offs diferentes; nenhuma opção elimina a necessidade de compreender dados, dependências comuns e comportamento sob partição."
  },
  {
    "kind": "paragraph",
    "text": "Transações financeiras exigem idempotência, ledger autoritativo, Outbox, consulta de estado e reconciliação. Rede, DNS, gateways, HSMs, identidade e nuvem também são dependências críticas. Resiliência operacional é comprovada por exercícios, evidências e aprendizado contínuo."
  },
  {
    "kind": "paragraph",
    "text": "Próximo passo do curso O Capítulo 38 aprofundará troubleshooting de APIs e Gateways, consolidando uma metodologia para localizar falhas de DNS, TCP, TLS, autenticação, políticas, backends, dados e plataformas distribuídas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de arquitetura",
    "id": "checklist-de-arquitetura"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Operações críticas, owners, dependências e tolerâncias estão documentados.",
      "SLIs e SLOs medem sucesso real, latência, integridade e frescor por operação.",
      "RTO e RPO possuem mecanismos técnicos e testes compatíveis.",
      "Domínios de falha e dependências compartilhadas foram identificados.",
      "Topologia active-active ou active-passive possui critérios de promoção e failback.",
      "Replicação, quorum, fencing e prevenção de split-brain estão definidos.",
      "Transações usam idempotência, ledger, Outbox e reconciliação.",
      "DNS, balanceadores, gateways, conexões persistentes e clientes foram testados no failover.",
      "HSM, PKI, identidade, segredos, nuvem e terceiros participam dos exercícios.",
      "Capacidade sobrevivente suporta falha com margem e prioridades explícitas.",
      "Backpressure, retries, circuit breakers e load shedding evitam cascatas.",
      "DR, restore, chaos tests e runbooks produzem evidências e ações corretivas."
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
      "Diferencie alta disponibilidade, disaster recovery e resiliência operacional.",
      "Defina RTO e RPO para consulta de saldo, Pix e relatório mensal, justificando diferenças.",
      "Desenhe uma arquitetura active-active e identifique riscos de consistência.",
      "Explique por que replicação não substitui backup.",
      "Descreva como impedir pagamento duplicado após timeout.",
      "Proponha health checks para gateway, serviço e ledger.",
      "Liste dependências comuns que podem derrubar duas regiões simultaneamente.",
      "Defina uma estratégia de degradação graciosa para um banco digital.",
      "Crie um teste de DR que valide jornada completa e reconciliação.",
      "Analise um cenário em que o serviço volta rápido, mas os dados ficam divergentes."
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
        "Active-active",
        "Topologia em que múltiplas localidades atendem tráfego simultaneamente."
      ],
      [
        "Active-passive",
        "Topologia com localidade primária e outra preparada para assumir."
      ],
      [
        "BIA",
        "Análise de impacto no negócio usada para priorizar continuidade e recuperação."
      ],
      [
        "Blast radius",
        "Escopo afetado por uma falha, mudança ou incidente."
      ],
      [
        "Disaster recovery",
        "Capacidade de restaurar tecnologia após evento severo."
      ],
      [
        "Fencing token",
        "Mecanismo que impede um nó antigo de continuar escrevendo após perder liderança."
      ],
      [
        "Failback",
        "Retorno controlado para a localidade original após failover."
      ],
      [
        "Idempotência",
        "Propriedade que permite repetir uma operação sem duplicar seu efeito."
      ],
      [
        "Load shedding",
        "Rejeição deliberada de trabalho para preservar operações prioritárias."
      ],
      [
        "RPO",
        "Perda máxima de dados aceitável medida em tempo."
      ],
      [
        "RTO",
        "Prazo máximo esperado para restabelecer a operação."
      ],
      [
        "Split-brain",
        "Condição em que partições isoladas aceitam decisões conflitantes."
      ],
      [
        "Tolerância à disrupção",
        "Impacto máximo aceito para uma operação crítica."
      ],
      [
        "Warm standby",
        "Ambiente secundário parcialmente ativo, ampliado durante failover."
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
      "Basel Committee on Banking Supervision. Principles for Operational Resilience. 2021.",
      "Basel Committee on Banking Supervision. Revisions to the Principles for the Sound Management of Operational Risk. 2021.",
      "Banco Central do Brasil. Resolução CMN nº 4.557, de 23 de fevereiro de 2017 - estrutura de gerenciamento de riscos e capital.",
      "Banco Central do Brasil. Resolução CMN nº 4.893, de 26 de fevereiro de 2021, com alterações posteriores - segurança cibernética e contratação de processamento, armazenamento e nuvem.",
      "Banco Central do Brasil. Resolução CMN nº 5.274, de 18 de dezembro de 2025 - alteração de requisitos de segurança cibernética e serviços de tecnologia.",
      "Banco Central do Brasil. Regulamento do Pix e manuais técnicos e de segurança vigentes.",
      "NIST. SP 800-34 Rev. 1 - Contingency Planning Guide for Federal Information Systems.",
      "NIST. Cybersecurity Framework 2.0.",
      "Google. Site Reliability Engineering - Availability, SLOs and error budgets.",
      "OpenTelemetry. Specifications and Semantic Conventions for distributed observability."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de atualização Normas bancárias, manuais de arranjos de pagamento e requisitos de provedores evoluem. Antes de aplicar controles ou declarar conformidade, valide o texto vigente do Banco Central, os manuais do serviço crítico e as capacidades reais da versão implantada."
  }
];
