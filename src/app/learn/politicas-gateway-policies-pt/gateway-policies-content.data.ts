import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const GATEWAY_POLICIES_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Políticas como pipeline executável de controle, proteção e mediação"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/pt/overview.svg",
    "alt": "Pipeline programável de policies entre a entrada e a resposta do API Gateway",
    "caption": "Figura de abertura - Policies transformam o gateway em um pipeline programável de controle e mediação."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Uma policy é código de infraestrutura: ordem, dependências, efeitos colaterais e tratamento de falha determinam seu comportamento."
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
    "text": "O capítulo anterior apresentou o API Gateway como um intermediário especializado que encerra conexões, aplica controles, seleciona rotas e cria uma nova relação com o backend. Este capítulo aprofunda o mecanismo que torna esse comportamento programável: as políticas de gateway. Uma policy representa uma unidade de decisão ou transformação executada em determinado ponto do fluxo. Autenticação, validação de token, rate limiting, cache, transformação de payload, roteamento e observabilidade podem ser implementados por políticas encadeadas."
  },
  {
    "kind": "paragraph",
    "text": "Em uma demonstração simples, policies parecem blocos independentes que podem ser arrastados ou escritos em XML, YAML, JSON ou uma linguagem gráfica. Em produção, porém, elas formam um programa distribuído. A ordem altera o resultado; uma política produz contexto consumido pela seguinte; chamadas externas introduzem latência e disponibilidade; leitura do body pode consumir streams; retries podem multiplicar efeitos; e uma falha pode encerrar a requisição antes de o backend ser alcançado."
  },
  {
    "kind": "paragraph",
    "text": "Políticas também são parte do modelo de segurança. Um erro de precedência pode permitir tráfego antes da autorização, registrar tokens em claro, aplicar quota ao identificador errado ou transformar uma mensagem assinada e invalidar sua integridade. Por isso, policy design exige os mesmos cuidados de engenharia de software: responsabilidades claras, testes, revisão, versionamento, observabilidade, rollback e controle de mudanças."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo deste capítulo é construir um modelo mental independente de produto e relacioná-lo a implementações como Axway API Gateway, Azure API Management e proxies baseados em filtros. Ao final, o leitor deverá conseguir desenhar um pipeline, justificar sua ordem, prever efeitos de falha, identificar dependências externas e diagnosticar em qual policy uma chamada foi alterada ou rejeitada."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada policy, registre cinco elementos: entrada, condição de execução, efeito, estado produzido e comportamento em falha. Depois analise como ela interage com as policies anteriores e posteriores. Esse método transforma uma cadeia visual em um programa compreensível."
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
      "Explicar policy como unidade executável de decisão, controle ou transformação no data plane.",
      "Distinguir seções inbound, backend, outbound e on-error, reconhecendo equivalentes em diferentes produtos.",
      "Analisar ordem, dependências, short-circuit, variáveis de contexto e efeitos colaterais.",
      "Projetar políticas de autenticação, autorização, validação, limitação, cache, transformação e roteamento.",
      "Compreender retries, timeouts, circuit breaker, fallback e idempotência.",
      "Reconhecer riscos de leitura de body, buffering, manipulação de headers e chamadas externas.",
      "Construir tratamento de erros consistente sem esconder a causa técnica.",
      "Aplicar logs, métricas, traces, correlação e auditoria em nível de policy.",
      "Organizar reutilização, herança, escopos, fragments, templates e parâmetros.",
      "Aplicar CI/CD, testes, revisão, segregação de funções e rollback a políticas de gateway."
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
      "22.1 O que é uma policy",
      "22.2 Modelo de execução e seções",
      "22.3 Ordem, contexto e short-circuit",
      "22.4 Escopos, herança e precedência",
      "22.5 Policies de autenticação e identidade",
      "22.6 Autorização e decisões externas",
      "22.7 Validação de mensagens e contratos",
      "22.8 Rate limiting, quotas e throttling",
      "22.9 Transformação de headers, URL e payload",
      "22.10 Roteamento e seleção de backend",
      "22.11 Cache e coerência",
      "22.12 Resiliência e chamadas externas",
      "22.13 Tratamento de erros",
      "22.14 Observabilidade e auditoria",
      "22.15 Reutilização e governança",
      "22.16 Testes, CI/CD e troubleshooting",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.1 O que é uma policy",
    "id": "22-1-o-que-e-uma-policy"
  },
  {
    "kind": "paragraph",
    "text": "Uma policy é uma regra executada pelo gateway sobre uma requisição, resposta, conexão ou contexto. Ela pode observar dados, produzir variáveis, permitir ou negar continuidade, modificar a mensagem, chamar um serviço externo, alterar o destino ou gerar uma resposta sem encaminhar a requisição. Em produtos gráficos, a policy pode ser representada por filtros conectados; em plataformas declarativas, por elementos de configuração executados em sequência."
  },
  {
    "kind": "paragraph",
    "text": "A policy não deve ser confundida com a política organizacional abstrata. Uma regra como “somente aplicações parceiras com contrato ativo podem acessar a API” é uma política de negócio ou segurança. Para executá-la, o gateway pode combinar várias policies técnicas: validar certificado, extrair client_id, consultar um PDP, verificar status do contrato, registrar decisão e aplicar quota. O pipeline é a implementação operacional da regra."
  },
  {
    "kind": "paragraph",
    "text": "Policies podem ser locais, quando usam apenas o contexto já disponível, ou remotas, quando consultam IdP, introspection endpoint, banco, cache, serviço de autorização ou sistema antifraude. Policies remotas aumentam poder, mas também introduzem dependência de rede, timeout, retry, autenticação entre componentes e risco de indisponibilidade em cascata."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Uma policy deve ter objetivo explícito e efeito observável.",
    "headers": [
      "Classe",
      "Exemplos",
      "Efeito dominante"
    ],
    "rows": [
      [
        "Segurança",
        "JWT, mTLS, API key, autorização.",
        "Permitir, negar ou enriquecer identidade."
      ],
      [
        "Tráfego",
        "Rate limit, quota, spike arrest.",
        "Controlar volume e concorrência."
      ],
      [
        "Mediação",
        "Headers, payload, protocolo.",
        "Alterar representação ou contexto."
      ],
      [
        "Roteamento",
        "Backend, versão, região, canary.",
        "Escolher destino e estratégia."
      ],
      [
        "Operação",
        "Logs, métricas, tracing, auditoria.",
        "Produzir evidências e telemetria."
      ],
      [
        "Resiliência",
        "Timeout, retry, circuit breaker.",
        "Conter falhas e proteger dependências."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.2 Modelo de execução e seções",
    "id": "22-2-modelo-de-execucao-e-secoes"
  },
  {
    "kind": "paragraph",
    "text": "Plataformas de gateway costumam dividir o pipeline em fases. No inbound, a requisição é recebida e pode ser autenticada, validada, limitada e transformada. Na fase de backend, o gateway prepara e executa a chamada ao upstream. No outbound, processa a resposta, remove dados, adiciona headers, normaliza erros ou armazena cache. Em falhas, uma seção on-error ou equivalente produz tratamento específico."
  },
  {
    "kind": "paragraph",
    "text": "Essas fases são lógicas, não universais. Um produto pode representar tudo como uma árvore de filtros, outro como seções declarativas e outro como filtros HTTP conectados ao listener. O arquiteto deve mapear o conceito para o produto sem assumir equivalência perfeita. O ponto decisivo é saber onde a mensagem está, se o backend já foi chamado e qual contexto permanece disponível."
  },
  {
    "kind": "paragraph",
    "text": "Uma policy pode realizar short-circuit e produzir resposta imediatamente. Uma validação de token inválido pode retornar 401; um rate limit excedido pode retornar 429; um cache hit pode devolver 200 sem acessar o backend. Portanto, “o gateway recebeu a chamada” não significa que o backend foi chamado. Logs de cada fase precisam tornar essa decisão visível."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/pt/figure-01-policy-phases.svg",
    "alt": "Fases inbound, backend, outbound e on-error do pipeline de policies",
    "caption": "Figura 1 - O pipeline possui fases, mas qualquer uma pode encerrar ou desviar o fluxo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.3 Ordem, contexto e short-circuit",
    "id": "22-3-ordem-contexto-e-short-circuit"
  },
  {
    "kind": "paragraph",
    "text": "A ordem de execução é parte da semântica. Correlacionar a requisição antes de qualquer rejeição garante que respostas 401 e 429 também tenham request ID. Autenticar antes de autorizar fornece identidade à policy de decisão. Validar tamanho do payload antes de fazer parsing evita gastar CPU com mensagens abusivas. Aplicar transformação antes da validação pode ser correto quando o gateway normaliza um formato legado, mas perigoso quando esconde uma entrada inválida."
  },
  {
    "kind": "paragraph",
    "text": "Policies trocam informações por um contexto de execução. Esse contexto pode conter método, URL, headers, certificado, identidade, variáveis, resposta parcial, erro corrente e métricas. Variáveis devem ter nomes previsíveis, tipo conhecido e escopo documentado. Reutilizar nomes genéricos como token, user ou result em fragments diferentes aumenta colisões e torna o troubleshooting difícil."
  },
  {
    "kind": "paragraph",
    "text": "Short-circuit é útil para rejeitar cedo e poupar backend. Entretanto, a resposta precisa preservar observabilidade, CORS quando aplicável, headers de segurança e formato de erro. Caso contrário, chamadas rejeitadas pelo gateway se comportam de modo diferente das respostas produzidas pelo backend, confundindo consumidores e monitores."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/pt/figure-02-policy-order.svg",
    "alt": "Ordem de correlação, autenticação, autorização, limites, transformação e roteamento",
    "caption": "Figura 2 - A sequência precisa refletir dependências e objetivos de proteção."
  },
  {
    "kind": "subhead",
    "text": "Pergunta de revisão"
  },
  {
    "kind": "paragraph",
    "text": "Se duas policies forem trocadas de posição, o comportamento muda? Se a resposta for sim, essa dependência deve estar documentada e coberta por teste. Se a equipe não souber responder, o pipeline ainda não está suficientemente compreendido."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.4 Escopos, herança e precedência",
    "id": "22-4-escopos-heranca-e-precedencia"
  },
  {
    "kind": "paragraph",
    "text": "Políticas podem ser aplicadas em escopos diferentes: global, workspace, produto, API, versão, operação ou instância específica. Escopos amplos reduzem duplicação e garantem controles mínimos, enquanto escopos estreitos permitem comportamento especializado. O risco aparece quando herança e precedência não são claras. Uma API pode imaginar que substituiu uma policy global quando, na realidade, apenas acrescentou outra etapa."
  },
  {
    "kind": "paragraph",
    "text": "Herança deve ser usada para invariantes corporativos: correlação, headers mínimos, proteção de segredos, logs essenciais e controles obrigatórios. Regras de negócio, roteamento específico e transformação de payload normalmente pertencem a escopos mais próximos da API. Quanto mais lógica de negócio for colocada globalmente, maior o blast radius de uma mudança."
  },
  {
    "kind": "paragraph",
    "text": "Fragments e templates precisam receber parâmetros explícitos e evitar dependências ocultas de variáveis globais. Uma alteração em fragment reutilizado pode afetar centenas de APIs. Por isso, referências devem ser versionadas, testadas por consumidores e liberadas gradualmente."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - O escopo correto equilibra consistência e autonomia.",
    "headers": [
      "Escopo",
      "Uso adequado",
      "Risco"
    ],
    "rows": [
      [
        "Global",
        "Controles corporativos invariantes.",
        "Mudança com grande blast radius."
      ],
      [
        "Produto / workspace",
        "Políticas comuns a um domínio ou canal.",
        "Acoplamento entre APIs diferentes."
      ],
      [
        "API",
        "Contrato e segurança daquela interface.",
        "Duplicação se não houver fragments."
      ],
      [
        "Operação",
        "Exceções específicas e semântica fina.",
        "Configuração fragmentada e difícil de auditar."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.5 Policies de autenticação e identidade",
    "id": "22-5-policies-de-autenticacao-e-identidade"
  },
  {
    "kind": "paragraph",
    "text": "Policies de autenticação verificam a credencial apresentada e estabelecem uma identidade confiável. Isso pode envolver API key, Basic Auth, certificado cliente, access token opaco, JWT ou credenciais customizadas. O resultado não deve ser apenas um booleano. O pipeline precisa produzir contexto normalizado: sujeito, cliente, emissor, audience, scopes, método de autenticação e nível de garantia."
  },
  {
    "kind": "paragraph",
    "text": "Na validação JWT, a policy deve verificar assinatura, algoritmo permitido, issuer, audience, expiração e claims requeridas. Apenas decodificar o token não autentica ninguém. Para tokens opacos, a policy pode consultar introspection, com cache controlado e timeout curto. Para mTLS, a identidade não deve ser derivada somente do CN sem regras de confiança, SAN e cadeia do certificado."
  },
  {
    "kind": "paragraph",
    "text": "Credenciais não devem ser registradas em logs. Quando o gateway propaga identidade ao backend por headers, ele deve remover headers equivalentes enviados pelo consumidor e escrever valores confiáveis. O backend precisa aceitar esses headers apenas de uma rede ou identidade de gateway autenticada; caso contrário, o consumidor pode forjar o contexto."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo - estabelecimento e propagação de identidade"
  },
  {
    "kind": "paragraph",
    "text": "# Fluxo conceitual de autenticação remover_header_nao_confiavel(\"X-Authenticated-Subject\") credencial = extrair_credencial(request) identidade = validar(credencial) se identidade.invalida: retornar 401 context.subject = identidade.subject context.client_id = identidade.client_id adicionar_header_backend(\"X-Authenticated-Subject\", context.subject)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.6 Autorização e decisões externas",
    "id": "22-6-autorizacao-e-decisoes-externas"
  },
  {
    "kind": "paragraph",
    "text": "Autorização responde se a identidade pode realizar a ação sobre o recurso naquele contexto. Policies simples verificam scopes, roles ou claims. Casos avançados consultam um Policy Decision Point, enviando atributos do sujeito, recurso, ação e ambiente. A policy do gateway atua como PEP: coleta dados, solicita decisão, aplica allow ou deny e registra evidência."
  },
  {
    "kind": "paragraph",
    "text": "Uma chamada externa de autorização precisa de contrato estável, autenticação mútua, timeout, circuit breaker e decisão de fail-open ou fail-closed. Para operações sensíveis, fail-closed é a regra segura: se o PDP não responde, o acesso é negado. Para telemetria não crítica, uma policy pode falhar de forma degradada. Essa escolha deve ser explícita e aprovada pelo risco, não decidida acidentalmente pelo comportamento padrão da ferramenta."
  },
  {
    "kind": "paragraph",
    "text": "Decisões podem ser cacheadas quando atributos e validade permitem. A chave do cache precisa incluir todos os elementos que influenciam a decisão. Cachear apenas por usuário, ignorando recurso, ação ou tenant, cria autorização incorreta. A invalidação também precisa considerar mudança de papel, revogação e encerramento de contrato."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Autorização deve equilibrar expressividade, latência e disponibilidade.",
    "headers": [
      "Estratégia",
      "Vantagem",
      "Cuidado técnico"
    ],
    "rows": [
      [
        "Scopes/roles locais",
        "Baixa latência e simplicidade.",
        "Pode ser insuficiente para contexto dinâmico."
      ],
      [
        "PDP externo",
        "Centraliza decisões complexas.",
        "Disponibilidade, timeout e cache."
      ],
      [
        "Policy híbrida",
        "Pré-filtro local e decisão externa.",
        "Consistência entre duas camadas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.7 Validação de mensagens e contratos",
    "id": "22-7-validacao-de-mensagens-e-contratos"
  },
  {
    "kind": "paragraph",
    "text": "Policies de validação verificam método, Content-Type, tamanho, schema, campos obrigatórios, parâmetros e restrições. A validação precoce protege o backend e torna erros consistentes. OpenAPI pode fornecer parte do contrato, mas nem toda regra de negócio deve ser transferida ao gateway. Validações complexas, dependentes de estado do domínio, pertencem ao serviço responsável."
  },
  {
    "kind": "paragraph",
    "text": "Validar JSON ou XML exige parsing e pode consumir memória. O gateway deve impor limite de tamanho antes de carregar o body. Em streams grandes, uploads e downloads, buffering completo pode destruir desempenho. Policies que precisam ler o body devem documentar se preservam o stream para etapas posteriores."
  },
  {
    "kind": "paragraph",
    "text": "Validação em modo detect ou log-only pode ajudar na migração, mas não deve virar estado permanente. Se a organização coleta violações sem bloquear, precisa de prazo e critério para ativar enforcement. Caso contrário, o contrato declarado e o tráfego real continuam divergentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O gateway protege o contrato; o backend preserva a verdade do domínio.",
    "headers": [
      "Camada",
      "Exemplos",
      "Local preferencial"
    ],
    "rows": [
      [
        "Sintaxe",
        "JSON bem formado, XML válido.",
        "Gateway."
      ],
      [
        "Contrato",
        "Schema, tipos, required, tamanho.",
        "Gateway e testes do backend."
      ],
      [
        "Semântica simples",
        "Faixas, enums, formatos.",
        "Gateway ou backend conforme ownership."
      ],
      [
        "Regra de domínio",
        "Saldo, elegibilidade, transição de estado.",
        "Backend de domínio."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.8 Rate limiting, quotas e throttling",
    "id": "22-8-rate-limiting-quotas-e-throttling"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting restringe a quantidade de eventos em uma janela; quota controla consumo acumulado em período maior; throttling regula a velocidade ou concorrência para proteger capacidade. Embora os termos variem entre produtos, a policy precisa definir unidade, chave, algoritmo, janela, resposta e escopo distribuído."
  },
  {
    "kind": "paragraph",
    "text": "A posição no pipeline muda o objetivo. Limitar por IP antes da autenticação reduz ataques volumétricos. Limitar por client_id depois da autenticação aplica plano comercial ou contrato. Limitar por operação protege endpoints caros. Muitas plataformas combinam camadas, mas cada contador aumenta custo e dependência de estado compartilhado."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways distribuídos, contadores locais podem permitir que o total agregado ultrapasse o limite. Contadores globais exigem serviço compartilhado e introduzem latência. A arquitetura deve declarar se o limite é aproximado ou estrito. A resposta 429 deve incluir orientação como Retry-After quando possível e não revelar detalhes internos desnecessários."
  },
  {
    "kind": "subhead",
    "text": "Aprofundamento posterior"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 27 será dedicado a Rate Limiting, Quotas e Throttling. Aqui, o foco é entender como essas políticas participam do pipeline e interagem com identidade, estado distribuído e tratamento de erro."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.9 Transformação de headers, URL e payload",
    "id": "22-9-transformacao-de-headers-url-e-payload"
  },
  {
    "kind": "paragraph",
    "text": "Policies de transformação adaptam consumidores e backends: adicionam ou removem headers, reescrevem caminhos, convertem query parameters, alteram Content-Type ou transformam JSON e XML. Elas são úteis para modernizar legados e manter contratos estáveis, mas podem criar acoplamento invisível. O backend passa a depender de uma mensagem que nenhum consumidor envia diretamente."
  },
  {
    "kind": "paragraph",
    "text": "Headers de segurança e identidade exigem regras especiais. O gateway deve remover valores não confiáveis antes de inserir seus próprios. Hop-by-hop headers não devem ser propagados como headers end-to-end. Host e SNI precisam ser tratados conscientemente, pois uma reescrita incorreta pode alcançar virtual host errado ou causar falha de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Transformações de payload têm custo de CPU e memória e podem alterar assinatura, hash ou idempotency key. Se uma mensagem é assinada pelo consumidor, qualquer alteração invalida a assinatura, a menos que o modelo preveja nova assinatura pelo gateway. Transformações devem ser pequenas, testadas e observáveis; lógica de negócio extensa no gateway vira um monólito de integração difícil de evoluir."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de policies declarativas"
  },
  {
    "kind": "paragraph",
    "text": "<inbound> <set-header name=\"X-Correlation-ID\" exists-action=\"skip\"> <value>@(Guid.NewGuid().ToString())</value> </set-header> <rewrite-uri template=\"/clientes/{id}\" /> <set-backend-service base-url=\"https://backend.interno\" /> </inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.10 Roteamento e seleção de backend",
    "id": "22-10-roteamento-e-selecao-de-backend"
  },
  {
    "kind": "paragraph",
    "text": "Policies de roteamento escolhem backend, versão, região, cluster, tenant ou implementação canary. A decisão pode usar caminho, header, claim, peso, saúde, latência ou configuração externa. Roteamento é diferente de autorização: um consumidor pode estar autorizado e ainda ser enviado ao backend incorreto se regras de precedência forem ambíguas."
  },
  {
    "kind": "paragraph",
    "text": "Canary e blue-green exigem afinidade quando a experiência precisa permanecer consistente entre chamadas. O gateway deve registrar qual variante foi escolhida e propagar identificador para tracing. Fallback entre regiões precisa considerar residência de dados, consistência e idempotência. Enviar automaticamente uma escrita para outra região após timeout pode duplicar transações."
  },
  {
    "kind": "paragraph",
    "text": "Descoberta de backend pode depender de DNS, service registry ou configuração estática. Policies não devem fazer resolução customizada a cada requisição sem cache e limites. O plano de controle deve distribuir destinos de forma segura, enquanto o data plane continua processando tráfego mesmo durante indisponibilidade temporária do management plane."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Roteamento precisa ser explicável em logs e traces.",
    "headers": [
      "Decisão",
      "Sinal de entrada",
      "Evidência necessária"
    ],
    "rows": [
      [
        "Versão",
        "Path, header ou query.",
        "Versão solicitada e rota aplicada."
      ],
      [
        "Canary",
        "Peso, cookie ou client_id.",
        "Variante selecionada e motivo."
      ],
      [
        "Região",
        "Localidade, saúde e política.",
        "Região escolhida e fallback."
      ],
      [
        "Tenant",
        "Claim ou host.",
        "Tenant validado e backend isolado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.11 Cache e coerência",
    "id": "22-11-cache-e-coerencia"
  },
  {
    "kind": "paragraph",
    "text": "Policies de cache podem reduzir latência e carga do backend, mas exigem compreensão da semântica HTTP e do contrato de dados. A chave precisa incluir método, URI normalizada e todas as variações relevantes, como tenant, idioma, Accept e autorização. Cachear resposta privada sem separar consumidores pode causar vazamento grave."
  },
  {
    "kind": "paragraph",
    "text": "O gateway deve respeitar Cache-Control, Vary e regras de invalidação quando aplicáveis. Em APIs autenticadas, o cache geralmente precisa ser privado por consumidor ou limitado a dados realmente públicos. Um cache hit também deve produzir logs e métricas; caso contrário, o backend parecerá saudável porque recebe menos tráfego, enquanto consumidores podem estar recebendo conteúdo obsoleto."
  },
  {
    "kind": "paragraph",
    "text": "Cache não corrige backend lento de forma universal. Ele altera consistência e comportamento em falha. Stale-while-revalidate e fallback com dado antigo podem ser válidos para catálogo, mas inadequados para saldo ou autorização. A policy precisa refletir criticidade do domínio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.12 Resiliência e chamadas externas",
    "id": "22-12-resiliencia-e-chamadas-externas"
  },
  {
    "kind": "paragraph",
    "text": "Timeout limita quanto o gateway espera. Retry repete uma operação sob condições específicas. Circuit breaker interrompe chamadas quando a dependência apresenta falhas persistentes. Fallback produz resposta alternativa ou usa outra origem. Esses mecanismos devem ser desenhados em conjunto com o orçamento total de latência e a idempotência do método."
  },
  {
    "kind": "paragraph",
    "text": "Retry em GET pode ser seguro em muitos casos, mas não automaticamente. Um GET mal desenhado pode disparar efeito colateral. Retry em POST pode duplicar transações sem idempotency key e deduplicação no backend. Também é necessário evitar multiplicação entre camadas: cliente, gateway, mesh e backend podem repetir simultaneamente e transformar uma falha pequena em tempestade."
  },
  {
    "kind": "paragraph",
    "text": "Chamadas auxiliares feitas por policies - introspection, PDP, vault, antifraude - precisam de timeouts menores que o orçamento principal. O gateway deve distinguir falha da API de negócio e falha da dependência de policy. Sem essa distinção, uma indisponibilidade do serviço de autorização aparece como 500 genérico e dificulta resposta operacional."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/pt/figure-03-resilience.svg",
    "alt": "Coordenação entre timeout, retry, circuit breaker e fallback",
    "caption": "Figura 3 - Resiliência exige coordenação entre mecanismos e camadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.13 Tratamento de erros e respostas padronizadas",
    "id": "22-13-tratamento-de-erros-e-respostas-padronizadas"
  },
  {
    "kind": "paragraph",
    "text": "Policies de erro convertem falhas internas em respostas estáveis ao consumidor. Elas devem preservar o status correto, um código de erro de negócio ou plataforma, mensagem segura, correlation ID e documentação. O tratamento não pode transformar qualquer falha em 200 nem esconder diferença entre autenticação, autorização, limitação, timeout e indisponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Uma resposta padronizada deve evitar detalhes sensíveis como stack trace, nome de cluster, caminho de arquivo, SQL, endpoint interno ou conteúdo de token. Ao mesmo tempo, logs internos precisam manter causa, policy, tempo e dependência envolvida. O consumidor recebe uma visão segura; a operação recebe evidência suficiente."
  },
  {
    "kind": "paragraph",
    "text": "Erros produzidos antes do backend precisam aplicar headers comuns, inclusive CORS quando necessário. Caso contrário, o navegador pode esconder o erro real por falha de CORS. Também é importante impedir que a policy de erro falhe ao tentar ler variáveis que não foram criadas, gerando uma segunda exceção que mascara a primeira."
  },
  {
    "kind": "code",
    "text": "Exemplo de resposta de erro padronizada\n{\n  \"type\": \"https://api.empresa.example/errors/rate-limit\",\n  \"title\": \"Limite de requisições excedido\",\n  \"status\": 429,\n  \"detail\": \"Tente novamente após o período indicado.\",\n  \"correlationId\": \"8f4d9c2a-...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.14 Observabilidade e auditoria em nível de policy",
    "id": "22-14-observabilidade-e-auditoria-em-nivel-de-policy"
  },
  {
    "kind": "paragraph",
    "text": "Observabilidade de gateway precisa responder quais policies executaram, quanto tempo consumiram e qual decisão tomaram. Um access log com status e duração total é necessário, mas insuficiente. Policies remotas devem medir latência e resultado. Rate limit deve registrar chave anonimizada e contador. Roteamento deve registrar backend selecionado. Autenticação deve registrar método e motivo de falha sem expor credencial."
  },
  {
    "kind": "paragraph",
    "text": "Tracing distribuído deve criar ou preservar trace context e gerar spans para chamadas ao backend e dependências de policy. Uma policy de transformação pode adicionar atributos úteis, mas cardinalidade precisa ser controlada. client_id, API, operação, versão e resultado são dimensões úteis; payload completo e identificadores pessoais não devem virar labels de métricas."
  },
  {
    "kind": "paragraph",
    "text": "Auditoria difere de log operacional. Ela registra mudanças administrativas e decisões sensíveis com integridade, retenção e acesso controlado. Quem alterou uma policy global, quem aprovou, qual versão foi implantada e quais APIs foram afetadas são informações essenciais para investigação e conformidade."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Logs, métricas, traces e auditoria atendem perguntas diferentes.",
    "headers": [
      "Evidência",
      "Exemplo",
      "Uso"
    ],
    "rows": [
      [
        "Access log",
        "API, operação, status, duração.",
        "Diagnóstico de tráfego."
      ],
      [
        "Métrica",
        "Falhas por policy, latência externa.",
        "Alertas e capacidade."
      ],
      [
        "Trace",
        "Spans de gateway, PDP e backend.",
        "Análise ponta a ponta."
      ],
      [
        "Auditoria",
        "Autor, versão, aprovação e deploy.",
        "Governança e conformidade."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.15 Reutilização, fragments e governança",
    "id": "22-15-reutilizacao-fragments-e-governanca"
  },
  {
    "kind": "paragraph",
    "text": "Reutilização reduz duplicação, mas precisa ser controlada como biblioteca. Fragments devem ter contrato, versão, owner, exemplos, testes e changelog. Um fragment de validação JWT, por exemplo, deve declarar issuers, audiences, algoritmos, variáveis produzidas e formato de erro. Sem isso, cada API passa a depender de comportamento implícito."
  },
  {
    "kind": "paragraph",
    "text": "Governança deve separar policies obrigatórias, recomendadas e opcionais. Obrigatórias podem ser aplicadas globalmente ou verificadas no pipeline. Recomendadas são templates adaptáveis. Opcionais atendem casos específicos. Exceções precisam de justificativa e prazo; caso contrário, a plataforma acumula configurações permanentes que ninguém compreende."
  },
  {
    "kind": "paragraph",
    "text": "Segregação de funções evita que uma única pessoa altere autenticação, publique e aprove sua própria mudança em produção. Repositório Git, pull request, validação automática, ambientes e promoção controlada transformam policy em infraestrutura como código. O portal ou editor visual pode continuar existindo, mas mudanças manuais precisam ser reconciliadas com a fonte de verdade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.16 Testes, CI/CD e troubleshooting",
    "id": "22-16-testes-ci-cd-e-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Testes de policy devem cobrir caminho feliz, credencial ausente, token inválido, permissão insuficiente, limite excedido, backend indisponível, timeout externo e resposta malformada. Testes unitários ou simulados validam expressões e fragments; testes de integração executam o gateway real; testes de carga revelam custo de parsing, chamadas remotas e estado distribuído."
  },
  {
    "kind": "paragraph",
    "text": "O pipeline de CI/CD pode validar sintaxe, schema, referências, segredos, policies proibidas, ordem mínima e presença de observabilidade. Depois, implanta em ambiente de teste, executa casos automatizados e promove artefato imutável. Canary no próprio gateway reduz risco, mas precisa de rollback rápido e métricas comparáveis."
  },
  {
    "kind": "paragraph",
    "text": "No troubleshooting, identifique primeiro se a chamada chegou ao listener e qual API/operação foi selecionada. Em seguida, percorra o pipeline: correlation ID, autenticação, autorização, rate limit, transformação, rota, chamada ao backend, outbound e on-error. Evite começar pelo backend quando o gateway respondeu sem encaminhar a requisição."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - O diagnóstico deve localizar a decisão exata dentro do pipeline.",
    "headers": [
      "Sintoma",
      "Hipóteses de policy",
      "Evidência"
    ],
    "rows": [
      [
        "401 inesperado",
        "Issuer, audience, relógio, header removido.",
        "Trace de autenticação sem token em claro."
      ],
      [
        "403 intermitente",
        "Cache de decisão, tenant ou atributo dinâmico.",
        "PDP decision ID e chave de cache."
      ],
      [
        "429 em poucos pedidos",
        "Chave incorreta ou contador global.",
        "Identificador de limite e escopo."
      ],
      [
        "502/504",
        "Rota, timeout, retry ou backend.",
        "Backend escolhido e tempos por tentativa."
      ],
      [
        "Payload vazio",
        "Body consumido por transformação.",
        "Logs da policy e tamanho antes/depois."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Estudos de caso",
    "id": "estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 1 - Token válido, autorização incorreta: o gateway valida assinatura e expiração do JWT, mas não verifica audience. Um token emitido para outra API é aceito. A correção não é apenas acrescentar uma condição; é revisar o fragment corporativo, adicionar testes negativos, identificar APIs afetadas e promover nova versão de forma controlada."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 2 - Tempestade de retries: cliente, gateway e service mesh repetem a mesma chamada. Durante degradação do backend, cada requisição original gera várias tentativas, esgotando conexões. O redesenho define um único owner de retry, orçamento total, condições por método e circuit breaker baseado em erro e latência."
  },
  {
    "kind": "paragraph",
    "text": "Estudo de caso 3 - Header de identidade forjado: o backend confia em X-User-ID, mas o gateway preserva o valor enviado pelo cliente quando não existe token. O atacante injeta o header. A correção remove sempre o header externo, produz novo valor apenas após autenticação e restringe o backend a conexões mTLS vindas do gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Policies são o programa executado pelo data plane. Elas observam, decidem, transformam, chamam dependências e podem encerrar o fluxo. O comportamento final depende da ordem, do contexto, dos escopos, da herança e do tratamento de falhas."
  },
  {
    "kind": "paragraph",
    "text": "Um pipeline robusto autentica e autoriza com critérios explícitos, valida mensagens sem assumir regras de domínio, controla tráfego com chaves corretas, transforma apenas o necessário, roteia de forma explicável e aplica cache e resiliência conforme a semântica da operação."
  },
  {
    "kind": "paragraph",
    "text": "Policies precisam ser tratadas como código: fonte versionada, revisão, testes, CI/CD, observabilidade, auditoria, rollback e ownership. O editor visual é apenas uma forma de autoria; não elimina dependências nem efeitos colaterais."
  },
  {
    "kind": "paragraph",
    "text": "O troubleshooting eficiente percorre o pipeline com correlation ID e evidências por etapa. A pergunta central deixa de ser “o gateway falhou?” e passa a ser “qual policy tomou qual decisão, com quais entradas e em quanto tempo?”."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 23 aprofundará a arquitetura e o funcionamento do Axway API Gateway, relacionando conceitos deste capítulo a Policy Studio, filtros, circuitos, grupos, instâncias, caches, configuração e operação da plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de revisão de policies",
    "id": "checklist-de-revisao-de-policies"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cada policy possui objetivo, owner, entrada, saída e comportamento em falha documentados.",
      "A ordem do pipeline reflete dependências e é coberta por testes.",
      "Headers e variáveis de identidade não podem ser forjados pelo consumidor.",
      "Tokens, segredos e dados pessoais são removidos de logs.",
      "Chamadas externas têm timeout, autenticação, métricas e decisão fail-open/fail-closed.",
      "Limites usam chave, escopo e contador coerentes com o objetivo.",
      "Transformações preservam contrato, streaming, assinatura e idempotência.",
      "Retries possuem orçamento, condição e owner únicos.",
      "Erros mantêm status correto, formato seguro e correlation ID.",
      "Fragments são versionados, testados e têm blast radius conhecido.",
      "Mudanças passam por Git, revisão, validação, promoção e rollback.",
      "Logs, métricas, traces e auditoria permitem reconstruir decisões."
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
      "Desenhe um pipeline para API protegida por JWT e explique a ordem das policies.",
      "Compare aplicar rate limit antes e depois da autenticação.",
      "Explique por que uma policy de leitura do body pode afetar etapas posteriores.",
      "Proponha tratamento para indisponibilidade de um PDP externo.",
      "Descreva riscos de retry em uma operação POST.",
      "Defina uma chave segura de cache para API multi-tenant autenticada.",
      "Explique como impedir header de identidade forjado.",
      "Proponha scopes global, API e operação para policies distintas.",
      "Crie uma matriz de testes para token expirado, audience incorreta e escopo ausente.",
      "Descreva um roteiro de troubleshooting para erro 502 produzido no gateway."
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
    "caption": "Tabela 8 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Backend section",
        "Fase que prepara ou executa a chamada ao upstream."
      ],
      [
        "Circuit breaker",
        "Mecanismo que interrompe chamadas quando uma dependência está degradada."
      ],
      [
        "Context",
        "Estado disponível durante a execução do pipeline."
      ],
      [
        "Fail-closed",
        "Negar a operação quando o mecanismo de decisão falha."
      ],
      [
        "Fail-open",
        "Permitir ou degradar a operação quando um controle falha."
      ],
      [
        "Fragment",
        "Trecho reutilizável de configuração de policies."
      ],
      [
        "Inbound",
        "Fase de processamento da requisição recebida."
      ],
      [
        "On-error",
        "Fluxo executado quando ocorre falha no pipeline."
      ],
      [
        "Outbound",
        "Fase de processamento da resposta."
      ],
      [
        "PDP",
        "Componente que calcula decisão de autorização."
      ],
      [
        "PEP",
        "Ponto que aplica uma decisão de autorização."
      ],
      [
        "Policy expression",
        "Expressão avaliada em runtime para produzir condição ou valor."
      ],
      [
        "Short-circuit",
        "Encerramento antecipado do fluxo com resposta própria."
      ],
      [
        "Spike arrest",
        "Controle de rajadas para suavizar picos de tráfego."
      ],
      [
        "Throttling",
        "Regulação da velocidade ou concorrência de requisições."
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
      "IETF. RFC 9209 - The Proxy-Status HTTP Response Header Field.",
      "Microsoft Learn. Policies in Azure API Management.",
      "Microsoft Learn. Azure API Management policy reference e policy expressions.",
      "Microsoft Learn. Referências de validate-content, choose, retry, cache-lookup e set-variable.",
      "Axway Documentation Portal. API Gateway, Policy Studio e filtros de políticas.",
      "Envoy Proxy Documentation. HTTP filters, external authorization e rate limiting.",
      "OWASP. API Security Top 10 - 2023 Edition.",
      "OpenTelemetry. Trace Context e semantic conventions para HTTP."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "A sintaxe, disponibilidade e escopos das policies variam por produto, edição e versão. Antes de aplicar exemplos, valide a documentação oficial da plataforma implantada e execute testes em ambiente autorizado."
  }
];
