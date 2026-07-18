import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const BASIC_AUTH_DIGEST_API_KEYS_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Três mecanismos de credencial com propriedades muito diferentes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/overview.svg",
    "alt": "Basic Auth, Digest e API Key como mecanismos de credencial com propriedades diferentes",
    "caption": "Figura de abertura - Basic, Digest e API Keys parecem simples, mas exigem gestão completa de credenciais."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Todos dependem de TLS, gestão de segredo, menor privilégio, rotação e observabilidade para uso seguro."
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
    "text": "O capítulo anterior separou autenticação e autorização e mostrou que uma identidade só se torna útil quando existe uma prova, um principal e uma decisão de acesso. Agora o curso aprofunda três mecanismos historicamente importantes e ainda encontrados em APIs corporativas: HTTP Basic, HTTP Digest e API Keys. Eles aparecem em integrações legadas, automações, produtos SaaS, gateways, appliances e sistemas internos que precisam de onboarding simples."
  },
  {
    "kind": "paragraph",
    "text": "A simplicidade operacional é a principal razão de sua permanência, mas também cria armadilhas. Basic Auth envia uma credencial reutilizável em todas as chamadas e depende totalmente de TLS para confidencialidade. Digest evita transmitir a senha diretamente e utiliza desafio-resposta, porém continua sensível a senhas fracas, replay mal controlado e limitações de interoperabilidade. API Keys identificam aplicações e planos de consumo, mas frequentemente são tratadas como se fossem identidade forte de usuário ou como autorização suficiente para qualquer operação."
  },
  {
    "kind": "paragraph",
    "text": "Os três mecanismos são credenciais estáticas ou de longa duração quando comparados a tokens curtos. Por isso, segurança não pode se limitar ao formato do header. É necessário considerar geração, armazenamento, exposição em logs, rotação, revogação, escopo, quotas, segregação por ambiente, auditoria e resposta a incidentes. Uma chave forte vazada continua sendo uma credencial válida até que a plataforma a detecte e revogue."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo apresenta o framework HTTP de autenticação, o fluxo detalhado de Basic e Digest, a arquitetura de gestão de API Keys e a aplicação em API Gateways. O objetivo é permitir que o leitor reconheça quando esses mecanismos são aceitáveis, quais controles compensatórios são indispensáveis e quando a migração para OAuth 2.0, mTLS ou identidades de workload deve ser priorizada."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada mecanismo, acompanhe a credencial desde a emissão até a revogação. Pergunte onde o segredo existe em claro, quem consegue reutilizá-lo, como o gateway identifica o consumidor, como o backend recebe contexto e quanto tempo uma exposição permaneceria válida."
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
      "Explicar o framework HTTP de desafios e o papel de 401, WWW-Authenticate e Authorization.",
      "Descrever a codificação de Basic Auth e diferenciar Base64 de criptografia.",
      "Analisar riscos de exposição, replay, compartilhamento e armazenamento de senhas.",
      "Compreender o desafio-resposta do HTTP Digest e seus principais parâmetros.",
      "Explicar realm, nonce, opaque, qop, nc, cnonce, algorithm e stale.",
      "Reconhecer limitações práticas e de segurança do Digest em APIs modernas.",
      "Distinguir API Key de identidade de usuário, token OAuth e assinatura HMAC.",
      "Projetar geração, armazenamento, escopo, quota, rotação e revogação de chaves.",
      "Aplicar validação de credenciais em API Gateways sem propagar segredos ao backend.",
      "Planejar migração de credenciais estáticas para mecanismos de curta duração ou prova de posse."
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
      "15.1 Credenciais estáticas no contexto de APIs",
      "15.2 Framework HTTP de autenticação",
      "15.3 Basic Auth: formato e fluxo",
      "15.4 Base64 não é criptografia",
      "15.5 Basic Auth sobre TLS e intermediários",
      "15.6 Armazenamento de senhas e validação",
      "15.7 Hardening e migração de Basic",
      "15.8 Digest: motivação e desafio-resposta",
      "15.9 Parâmetros e cálculo do Digest",
      "15.10 Nonce, replay, stale e limitações",
      "15.11 API Keys: finalidade e modelo de ameaça",
      "15.12 Geração, formato e distribuição",
      "15.13 Armazenamento, lookup e metadata",
      "15.14 Escopos, quotas e autorização",
      "15.15 Rotação, revogação e detecção de vazamento",
      "15.16 HMAC request signing e mecanismos relacionados",
      "15.17 Uso em API Gateways",
      "15.18 Comparação, troubleshooting e estudos de caso",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.1 Credenciais estáticas no contexto de APIs",
    "id": "15-1-credenciais-estaticas-no-contexto-de-apis"
  },
  {
    "kind": "paragraph",
    "text": "Uma credencial estática é um valor que permanece válido por um período relativamente longo e pode ser reutilizado em múltiplas chamadas. Senhas e API Keys se encaixam nessa categoria. O problema não é apenas duração: como o mesmo valor prova acesso repetidamente, qualquer cópia obtida por log, repositório, estação comprometida, proxy ou vazamento de configuração pode ser usada até expiração ou revogação."
  },
  {
    "kind": "paragraph",
    "text": "Credenciais estáticas oferecem implantação simples. Um consumidor recebe um usuário e senha ou uma chave, adiciona um header e chama a API. Não há servidor de autorização, fluxo de obtenção de token ou renovação. Essa simplicidade pode ser adequada em laboratórios, integrações restritas e sistemas legados, mas transfere responsabilidade para processos operacionais que muitas equipes negligenciam."
  },
  {
    "kind": "paragraph",
    "text": "Em uma arquitetura segura, cada credencial possui identidade individual, owner, ambiente, finalidade, escopo, data de criação, expiração, último uso, status e histórico de rotação. Compartilhar a mesma credencial entre vários sistemas destrói rastreabilidade e torna a revogação coordenada. O princípio fundamental é que simplicidade de protocolo não pode significar ausência de governança."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Credencial estática segura depende de ciclo de vida explícito.",
    "headers": [
      "Propriedade",
      "Pergunta operacional",
      "Risco se ausente"
    ],
    "rows": [
      [
        "Individualização",
        "Qual aplicação ou pessoa controla a credencial?",
        "Impossibilidade de atribuir tráfego e incidente."
      ],
      [
        "Escopo",
        "Quais APIs e operações podem ser usadas?",
        "Comprometimento amplia acesso lateral."
      ],
      [
        "Expiração",
        "Quando o valor deixa de ser aceito?",
        "Segredo abandonado permanece ativo."
      ],
      [
        "Rotação",
        "Como trocar sem indisponibilidade?",
        "Credencial nunca é renovada."
      ],
      [
        "Revogação",
        "Quanto tempo para bloquear um vazamento?",
        "Janela longa de abuso."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.2 Framework HTTP de autenticação",
    "id": "15-2-framework-http-de-autenticacao"
  },
  {
    "kind": "paragraph",
    "text": "O HTTP define um framework geral de autenticação baseado em desafios. Quando um recurso exige autenticação e o cliente não apresenta credencial aceitável, o servidor pode responder 401 Unauthorized acompanhado de um ou mais headers WWW-Authenticate. Cada desafio informa o esquema e parâmetros necessários, como realm. O cliente escolhe um esquema suportado e repete a requisição com Authorization."
  },
  {
    "kind": "paragraph",
    "text": "O nome 401 Unauthorized é historicamente confuso: na prática, representa ausência ou falha de autenticação. Depois que a identidade é autenticada, uma negativa por falta de permissão normalmente usa 403 Forbidden. Essa separação preserva semântica, facilita troubleshooting e evita que consumidores tentem trocar credenciais quando o problema real é autorização."
  },
  {
    "kind": "paragraph",
    "text": "Um gateway pode anunciar mais de um desafio ou ocultar detalhes para reduzir enumeração. Em APIs, também é comum receber credenciais preemptivamente, sem o primeiro 401. Mesmo assim, compreender o modelo de desafio é essencial para Basic e Digest, além de ajudar na interpretação de logs, clientes HTTP e bibliotecas."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/figure-01.svg",
    "alt": "Fluxo de desafio HTTP entre cliente e servidor ou gateway",
    "caption": "Figura 1 - Basic e Digest utilizam o framework de desafio definido pelo HTTP."
  },
  {
    "kind": "subhead",
    "text": "Exemplos de desafios HTTP"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Basic realm=\"api-corporativa\", charset=\"UTF-8\"\n# ou\nWWW-Authenticate: Digest realm=\"api-corporativa\",\n  nonce=\"valor-emitido-pelo-servidor\", qop=\"auth\", algorithm=SHA-256"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.3 Basic Auth: formato e fluxo",
    "id": "15-3-basic-auth-formato-e-fluxo"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic utiliza um identificador de usuário e uma senha combinados na forma user-id:password. A sequência de bytes resultante é codificada em Base64 e enviada no header Authorization com o prefixo Basic. O servidor decodifica o valor, localiza a conta e verifica a senha. Em integrações máquina a máquina, o user-id pode representar uma aplicação ou conta técnica, mas isso não transforma automaticamente o mecanismo em identidade forte de workload."
  },
  {
    "kind": "paragraph",
    "text": "O cliente pode esperar um desafio 401 ou enviar o header na primeira chamada. Muitos SDKs e ferramentas escondem esse detalhe. Em ambos os casos, a credencial é transmitida em todas as requisições, inclusive quando conexões diferentes são abertas. Isso aumenta a superfície de exposição em comparação com uma senha usada apenas para obter um token de curta duração."
  },
  {
    "kind": "paragraph",
    "text": "O realm permite ao servidor indicar o espaço de proteção. Clientes podem usar essa informação para decidir quais credenciais reenviar. Em ambientes com múltiplos hosts, redirecionamentos e proxies, a configuração precisa impedir que o Authorization seja encaminhado para destino não confiável."
  },
  {
    "kind": "subhead",
    "text": "Exemplo conceitual de Basic Auth"
  },
  {
    "kind": "code",
    "text": "# Texto lógico antes da codificação\nintegracao-faturamento:SenhaDeExemplo\n# Header HTTP\nAuthorization: Basic aW50ZWdyYWNhby1mYXR1cmFtZW50bzpTZW5oYURlRXhlbXBsbw=="
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.4 Base64 não é criptografia",
    "id": "15-4-base64-nao-e-criptografia"
  },
  {
    "kind": "paragraph",
    "text": "Base64 é uma codificação para representar bytes em caracteres seguros para transporte textual. Não utiliza chave, não oferece confidencialidade e pode ser revertida por qualquer pessoa ou ferramenta. Tratar o valor Base64 como hash ou criptografia é um erro grave. Ele protege apenas contra problemas de representação, não contra observação do tráfego."
  },
  {
    "kind": "paragraph",
    "text": "Por essa razão, Basic Auth só deve ser usado sobre TLS corretamente validado. Sem TLS, usuário e senha ficam expostos a quem captura a comunicação. Mesmo com TLS, a credencial pode aparecer em logs de debug, dumps de memória, ferramentas de observabilidade, histórico de comandos, variáveis de ambiente e configurações. O canal protegido não corrige vazamento nos endpoints ou intermediários terminadores."
  },
  {
    "kind": "paragraph",
    "text": "A codificação também não impede replay. Se um atacante obtém o header completo, pode reutilizá-lo enquanto a senha continuar válida. A proteção depende de segredo forte, rotação, detecção de anomalia, limitação de tentativas e menor privilégio."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/figure-02.svg",
    "alt": "Basic Auth atravessando codificação Base64 e um canal TLS protegido",
    "caption": "Figura 2 - O único elemento que protege a confidencialidade do Basic Auth no trânsito é o canal TLS."
  },
  {
    "kind": "subhead",
    "text": "Regra operacional"
  },
  {
    "kind": "paragraph",
    "text": "Nunca coloque Basic Auth em URL, query string, logs, tickets ou exemplos com credenciais reais. Redações visuais em screenshots não removem o valor de arquivos de configuração ou históricos de terminal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.5 Basic Auth sobre TLS e intermediários",
    "id": "15-5-basic-auth-sobre-tls-e-intermediarios"
  },
  {
    "kind": "paragraph",
    "text": "Quando existe proxy reverso ou API Gateway, TLS pode terminar antes do backend. O trecho cliente-gateway e o trecho gateway-backend são conexões independentes. Se o gateway repassa o Authorization original ao backend, a senha continua circulando internamente e pode aparecer em mais pontos de observação. Uma arquitetura melhor valida a credencial na borda e encaminha identidade interna restrita ou token de curta duração."
  },
  {
    "kind": "paragraph",
    "text": "Redirecionamentos também merecem atenção. Clientes HTTP seguros evitam encaminhar Authorization para outro host, mas comportamentos variam conforme biblioteca e configuração. Um endpoint autenticado não deve responder com redirecionamento para domínio não confiável. Regras de proxy precisam remover headers externos de identidade antes de inserir contexto validado."
  },
  {
    "kind": "paragraph",
    "text": "O servidor deve aplicar proteção contra brute force e credential stuffing. Rate limiting por conta, origem e dispositivo, bloqueio progressivo, detecção de senha vazada, monitoramento e alertas ajudam. Bloqueio permanente após poucas tentativas pode causar negação de serviço; a política precisa equilibrar segurança e disponibilidade."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.6 Armazenamento de senhas e validação",
    "id": "15-6-armazenamento-de-senhas-e-validacao"
  },
  {
    "kind": "paragraph",
    "text": "O servidor não deve armazenar senha reversível apenas para comparar com o valor recebido. Senhas de usuários humanos precisam ser protegidas por funções específicas de derivação, com salt individual e parâmetros de custo adequados. A verificação calcula novamente o derivado e compara em tempo constante. Contas técnicas podem ser migradas para chaves, certificados ou identidades de workload, evitando tratar segredo de aplicação como senha humana."
  },
  {
    "kind": "paragraph",
    "text": "Basic exige que o servidor obtenha a senha apresentada em cada chamada e a valide. Isso não significa que a senha precise existir em claro no banco. Entretanto, alguns sistemas legados delegam autenticação a diretórios ou armazenam credenciais reversíveis para integração. Esses casos aumentam impacto de comprometimento e devem ter plano de migração."
  },
  {
    "kind": "paragraph",
    "text": "Logs de autenticação devem registrar identificador, resultado, motivo categorizado, origem, correlação e policy aplicada, mas nunca a senha ou o header Authorization. Mensagens ao cliente devem evitar diferenciar usuário inexistente de senha incorreta quando isso permitir enumeração."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Armazenamento seguro reduz impacto de vazamento do repositório de credenciais.",
    "headers": [
      "Elemento",
      "Prática recomendada",
      "Evitar"
    ],
    "rows": [
      [
        "Banco de senhas",
        "Salt individual e função de derivação apropriada.",
        "Senha em claro ou criptografia reversível sem necessidade."
      ],
      [
        "Comparação",
        "Rotina constante e biblioteca consolidada.",
        "Comparações caseiras e logs de valores."
      ],
      [
        "Conta técnica",
        "Identidade individual e owner.",
        "Usuário compartilhado por vários jobs."
      ],
      [
        "Observabilidade",
        "Resultado, origem e correlação.",
        "Authorization e senha em log."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.7 Hardening e migração de Basic Auth",
    "id": "15-7-hardening-e-migracao-de-basic-auth"
  },
  {
    "kind": "paragraph",
    "text": "Basic pode ser tolerado em integração controlada quando TLS é obrigatório, a conta é individual, a senha é aleatória e longa, o acesso é limitado e existe rotação. Também deve haver plano de substituição. O mecanismo é inadequado para credenciais humanas em APIs de alto risco ou para aplicações distribuídas que não conseguem proteger segredo estático."
  },
  {
    "kind": "paragraph",
    "text": "Uma migração comum introduz OAuth 2.0 Client Credentials, mTLS ou identidade gerenciada. Durante a coexistência, o gateway aceita Basic apenas para consumidores cadastrados, registra uso por client_id e comunica prazo de retirada. O novo mecanismo é ativado paralelamente; depois que a telemetria confirma migração, a senha antiga é revogada."
  },
  {
    "kind": "paragraph",
    "text": "Não basta trocar Basic por um token de longa duração copiado em configuração. O objetivo é reduzir reutilização e superfície: tokens curtos, audience específica, escopo mínimo, emissão auditável e credencial de cliente protegida por vault ou prova assimétrica."
  },
  {
    "kind": "subhead",
    "text": "Critério de migração"
  },
  {
    "kind": "paragraph",
    "text": "Priorize consumidores com credenciais compartilhadas, ausência de rotação, acesso privilegiado, execução em dispositivos não confiáveis ou exposição pública. Esses fatores aumentam impacto e probabilidade de comprometimento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.8 Digest: motivação e desafio-resposta",
    "id": "15-8-digest-motivacao-e-desafio-resposta"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest foi criado para evitar que a senha fosse enviada diretamente ao servidor em cada requisição. O servidor envia um desafio com realm, nonce, algoritmo e opções de qualidade de proteção. O cliente combina esses valores com usuário, senha, método e URI para calcular uma resposta hash. O servidor realiza cálculo equivalente e compara o resultado."
  },
  {
    "kind": "paragraph",
    "text": "O nonce é um valor emitido pelo servidor para limitar reutilização. O cliente também pode enviar cnonce e contador nc. Com qop=auth, método e URI entram na prova, vinculando a resposta à requisição. Em qop=auth-int, o corpo da entidade também participa, embora o suporte operacional seja mais complexo."
  },
  {
    "kind": "paragraph",
    "text": "Digest melhora uma propriedade específica em relação ao Basic: a senha não aparece diretamente no wire. Porém, ele não substitui TLS. Metadados e conteúdo continuam expostos sem criptografia do canal, e ataques de downgrade, manipulação ou captura para tentativa offline ainda precisam ser considerados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/figure-03.svg",
    "alt": "Fluxo Digest com desafio, nonce e prova calculada",
    "caption": "Figura 3 - O cliente prova conhecimento de um segredo sem enviar a senha diretamente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.9 Parâmetros e cálculo do Digest",
    "id": "15-9-parametros-e-calculo-do-digest"
  },
  {
    "kind": "paragraph",
    "text": "O realm separa espaços de proteção e participa do cálculo. O nonce é gerado pelo servidor; opaque é um valor que o cliente devolve sem interpretar. algorithm informa a função de hash e possíveis variantes com -sess. qop seleciona a qualidade de proteção. nc é o contador de uso do nonce, e cnonce é um valor aleatório produzido pelo cliente."
  },
  {
    "kind": "paragraph",
    "text": "Em uma forma simplificada com qop=auth, calcula-se HA1 a partir de usuário, realm e senha; HA2 a partir do método HTTP e request-target; e response a partir de HA1, nonce, nc, cnonce, qop e HA2. A implementação deve seguir rigorosamente a especificação e usar bibliotecas testadas. Pequenas diferenças de codificação, URI, charset ou parâmetros produzem falhas difíceis de diagnosticar."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos e parâmetros precisam ser negociados de forma segura. Implementações não devem aceitar downgrade silencioso para opções fracas quando a política exige algoritmos mais fortes. Também é importante validar que o cliente responde ao mesmo realm, nonce e URI associados ao desafio."
  },
  {
    "kind": "subhead",
    "text": "Cálculo conceitual do Digest com qop=auth"
  },
  {
    "kind": "code",
    "text": "HA1 = H(username : realm : password)\nHA2 = H(method : request-target)\nresponse = H(\n  HA1 : nonce : nc : cnonce : qop : HA2\n)\nAuthorization: Digest username=\"cliente-api\", realm=\"pagamentos\",\n  nonce=\"...\", uri=\"/v1/ordens\", algorithm=SHA-256,\n  qop=auth, nc=00000001, cnonce=\"...\", response=\"...\""
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Parâmetros de Digest precisam ser validados como um conjunto coerente.",
    "headers": [
      "Parâmetro",
      "Origem",
      "Função"
    ],
    "rows": [
      [
        "realm",
        "Servidor",
        "Define o espaço de proteção e participa do cálculo."
      ],
      [
        "nonce",
        "Servidor",
        "Torna a prova dependente de um desafio e de validade temporal."
      ],
      [
        "opaque",
        "Servidor",
        "Estado opaco devolvido pelo cliente."
      ],
      [
        "qop",
        "Servidor/cliente",
        "Seleciona auth ou outra qualidade suportada."
      ],
      [
        "cnonce",
        "Cliente",
        "Adiciona aleatoriedade controlada pelo cliente."
      ],
      [
        "nc",
        "Cliente",
        "Conta usos do nonce e ajuda a detectar replay."
      ],
      [
        "response",
        "Cliente",
        "Prova hash calculada para a requisição."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.10 Nonce, replay, stale e limitações do Digest",
    "id": "15-10-nonce-replay-stale-e-limitacoes-do-digest"
  },
  {
    "kind": "paragraph",
    "text": "Um nonce seguro precisa ser imprevisível ou autenticado, possuir janela de validade e estar vinculado ao contexto necessário. O servidor pode manter estado ou codificar timestamp e MAC no valor. Quando o nonce expira, o desafio pode indicar stale=true, permitindo ao cliente repetir a operação com novo nonce sem assumir que usuário ou senha estão errados."
  },
  {
    "kind": "paragraph",
    "text": "O contador nc deve crescer para cada uso do mesmo nonce e cnonce. O servidor pode detectar repetição, mas isso exige estado ou lógica de janela. Clusters e gateways distribuídos precisam compartilhar ou validar consistentemente essas informações. Uma implementação que apenas verifica o hash e ignora contador e validade perde parte importante da proteção contra replay."
  },
  {
    "kind": "paragraph",
    "text": "Digest continua sujeito a ataques offline quando um atacante captura desafio e resposta e a senha possui baixa entropia. Ele também não oferece confidencialidade do payload, não resolve autorização, não substitui MFA e possui interoperabilidade desigual em clientes, proxies e gateways. Em APIs modernas, costuma ser mantido por compatibilidade, não como primeira escolha para novos projetos."
  },
  {
    "kind": "subhead",
    "text": "Limite de segurança"
  },
  {
    "kind": "paragraph",
    "text": "Digest protege a senha no trânsito de forma diferente de Basic, mas não transforma senha fraca em credencial forte. A captura de uma resposta pode permitir testar candidatos offline sem interagir novamente com o servidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.11 API Keys: finalidade e modelo de ameaça",
    "id": "15-11-api-keys-finalidade-e-modelo-de-ameaca"
  },
  {
    "kind": "paragraph",
    "text": "API Key é um valor atribuído a um consumidor, aplicação, projeto ou assinatura de produto. Ela permite identificar quem está usando a API, aplicar quotas, rate limiting, cobrança, analytics e políticas. Em alguns ambientes também é usada como autenticação de aplicação. Porém, a posse da chave não prova identidade humana nem estabelece, por si só, autorização de negócio."
  },
  {
    "kind": "paragraph",
    "text": "Uma chave é normalmente bearer: quem conhece o valor pode utilizá-lo. Portanto, não deve ser embutida em JavaScript público, aplicativo móvel distribuído, repositório ou firmware facilmente extraível quando o acesso associado é sensível. Em clientes públicos, a chave pode servir apenas como identificador de produto, sem ser tratada como segredo forte."
  },
  {
    "kind": "paragraph",
    "text": "O modelo de ameaça inclui vazamento em logs, query strings, ferramentas de analytics, histórico de navegador, referrer, pipelines, containers, notebooks, mensagens e suporte. Também inclui compartilhamento intencional entre equipes, cópia para ambiente errado e permanência após desligamento do owner."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.12 Geração, formato e distribuição de API Keys",
    "id": "15-12-geracao-formato-e-distribuicao-de-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "Uma API Key deve ser gerada com fonte criptograficamente segura e entropia suficiente para impedir adivinhação. Formatos legíveis podem incluir prefixo não secreto que identifique produto ou ambiente, seguido de material aleatório. O prefixo facilita roteamento, suporte e detecção de chave de teste usada em produção sem revelar o segredo completo."
  },
  {
    "kind": "paragraph",
    "text": "A chave deve ser exibida ao consumidor somente no momento de criação ou por canal seguro. Depois, a plataforma armazena uma representação protegida. E-mail, planilha e ticket não são cofres. Aplicações devem receber o valor por secret manager, pipeline protegido ou mecanismo de bootstrap, e nunca por commit em código."
  },
  {
    "kind": "paragraph",
    "text": "Chaves de produção, homologação e desenvolvimento precisam ser diferentes. A segregação reduz propagação de vazamentos e permite políticas distintas. A plataforma também pode limitar origem de rede, certificado, host, API ou operação, mas esses controles complementam e não substituem a proteção da chave."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/figure-04.svg",
    "alt": "Ciclo de vida corporativo de uma API Key da emissão à revogação",
    "caption": "Figura 4 - A emissão é apenas o início do ciclo de vida de uma API Key."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.13 Armazenamento, lookup e metadata",
    "id": "15-13-armazenamento-lookup-e-metadata"
  },
  {
    "kind": "paragraph",
    "text": "Quando a chave funciona apenas como bearer, o servidor não precisa armazenar o valor em claro. Pode armazenar hash ou MAC e comparar a apresentação. Para lookup eficiente, formatos com identificador público e segredo separado são úteis: o prefixo localiza o registro e o segredo é validado de forma segura. Isso evita varrer toda a base de hashes a cada requisição."
  },
  {
    "kind": "paragraph",
    "text": "O registro da chave deve conter owner, aplicação, produto, ambiente, scopes, quotas, estado, criação, expiração, última rotação, último uso e razão de revogação. A metadata permite decisões sem expor o segredo. Também sustenta inventário, relatórios de chaves órfãs e campanhas de rotação."
  },
  {
    "kind": "paragraph",
    "text": "Se a plataforma precisa recuperar o valor para assinar solicitações em nome do consumidor, a chave deixa de ser apenas verificadora e exige armazenamento reversível em vault ou HSM, com controles de acesso e auditoria mais fortes. Esse caso deve ser distinguido de uma chave usada somente para autenticar chamadas de entrada."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Separar identificador, segredo, verificador e metadata melhora operação e resposta a incidentes.",
    "headers": [
      "Componente",
      "Conteúdo",
      "Exposição"
    ],
    "rows": [
      [
        "key id / prefixo _",
        "Identificador público para lookup.",
        "Pode aparecer em logs e portais."
      ],
      [
        "secret",
        "Material aleatório apresentado na chamada.",
        "Só consumidor e processo de validação."
      ],
      [
        "verifier",
        "Hash ou MAC do secret.",
        "Banco protegido; não permite uso direto."
      ],
      [
        "metadata",
        "Owner, escopo, quota, status e datas.",
        "Serviços de gestão e política."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.14 Transmissão, escopos, quotas e autorização",
    "id": "15-14-transmissao-escopos-quotas-e-autorizacao"
  },
  {
    "kind": "paragraph",
    "text": "API Keys devem ser transmitidas preferencialmente em header dedicado ou Authorization com esquema definido pela plataforma. Colocá-las em query string aumenta vazamento em access logs, histórico, analytics, caches e headers Referer. TLS permanece obrigatório porque uma chave capturada pode ser reutilizada."
  },
  {
    "kind": "paragraph",
    "text": "Cada chave deve ter escopo mínimo: produto, APIs, operações, ambiente e, quando possível, dados ou tenant específicos. Quota e throttling limitam consumo e reduzem impacto de abuso, mas não são equivalentes a autorização. Uma chave com quota de mil chamadas ainda pode acessar objeto indevido se o backend não validar ownership."
  },
  {
    "kind": "paragraph",
    "text": "Para operações em nome de usuário, a API Key pode identificar a aplicação enquanto outro mecanismo autentica o usuário. Essa separação permite atribuir tráfego a dois sujeitos: cliente técnico e usuário final. O gateway deve preservar ambos no contexto e nos logs sem confundi-los."
  },
  {
    "kind": "subhead",
    "text": "Formas de transmissão de API Keys"
  },
  {
    "kind": "code",
    "text": "# Header dedicado\nX-API-Key: pk_live_7F2A...segredo...\n# Ou esquema de Authorization definido pelo provedor\nAuthorization: ApiKey pk_live_7F2A...segredo...\n# Evitar\nGET /v1/clientes?api_key=pk_live_7F2A..."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.15 Rotação, revogação e detecção de vazamento",
    "id": "15-15-rotacao-revogacao-e-deteccao-de-vazamento"
  },
  {
    "kind": "paragraph",
    "text": "Rotação sem indisponibilidade normalmente exige período de sobreposição. O consumidor cria ou recebe uma segunda chave, atualiza suas aplicações, valida tráfego com o novo valor e só então revoga a antiga. Plataformas podem permitir duas chaves ativas por assinatura. O prazo de coexistência deve ser curto e monitorado para evitar duplicação permanente."
  },
  {
    "kind": "paragraph",
    "text": "Revogação precisa ser rápida e global. Caches de gateway devem respeitar status e TTL compatíveis com o risco. Em incidentes, a equipe precisa localizar todos os ambientes e dependências que usam a chave. Isso só é possível quando cada consumidor tem credencial própria e inventário confiável."
  },
  {
    "kind": "paragraph",
    "text": "Detecção de vazamento pode usar scanners de repositório, padrões de prefixo, monitoramento de origem, aumento súbito de volume, mudança geográfica e uso fora do horário. Honeytokens ou chaves deliberadamente não utilizadas podem gerar alerta imediato quando aparecem no tráfego."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A resposta depende de inventário, individualização e capacidade de revogação.",
    "headers": [
      "Evento",
      "Ação imediata",
      "Ação posterior"
    ],
    "rows": [
      [
        "Suspeita de vazamento",
        "Desabilitar ou reduzir privilégio; preservar evidências.",
        "Investigar origem e emitir nova chave."
      ],
      [
        "Rotação planejada",
        "Ativar nova chave em paralelo.",
        "Confirmar uso e revogar antiga."
      ],
      [
        "Owner desligado",
        "Suspender credenciais associadas.",
        "Reatribuir ou remover integração."
      ],
      [
        "Chave sem uso",
        "Confirmar com owner e bloquear em teste.",
        "Eliminar ativo órfão."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.16 HMAC request signing e mecanismos relacionados",
    "id": "15-16-hmac-request-signing-e-mecanismos-relacionados"
  },
  {
    "kind": "paragraph",
    "text": "Assinatura HMAC de requisições é diferente de simplesmente enviar uma API Key. O cliente usa um segredo para calcular uma assinatura sobre método, caminho, timestamp, headers e hash do corpo. O servidor recalcula e compara. A chave pode identificar o consumidor, enquanto a assinatura vincula a prova a uma requisição específica e reduz replay quando timestamp e nonce são validados."
  },
  {
    "kind": "paragraph",
    "text": "Esse modelo é usado por algumas APIs financeiras e de nuvem, mas exige canonicalização rigorosa. Diferenças de encoding, ordem de headers, normalização de caminho e corpo produzem falhas. A segurança depende de segredo forte, janela temporal curta, comparação segura, proteção do relógio e prevenção de reutilização."
  },
  {
    "kind": "paragraph",
    "text": "HMAC não substitui TLS: sem TLS, conteúdo e metadata continuam visíveis e podem ser manipulados antes da verificação. Também não fornece não repúdio, porque cliente e servidor compartilham o mesmo segredo. Assinaturas assimétricas ou mTLS podem ser mais adequadas quando separação de responsabilidade e prova de posse são importantes."
  },
  {
    "kind": "subhead",
    "text": "Distinção importante"
  },
  {
    "kind": "paragraph",
    "text": "Uma API Key é normalmente apresentada diretamente. Em HMAC signing, o segredo não trafega; ele produz uma assinatura específica para a requisição. Os dois modelos exigem ciclos de vida e controles diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.17 Uso em API Gateways, Axway e Azure",
    "id": "15-17-uso-em-api-gateways-axway-e-azure"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway é um ponto natural para validar Basic, Digest ou API Keys, aplicar rate limiting, registrar consumo e bloquear credenciais revogadas. A política deve ocorrer antes do roteamento ao backend e precisa distinguir falha de autenticação, chave suspensa, quota excedida e ausência de autorização. O gateway também deve remover credenciais originais antes de encaminhar a requisição, sempre que o backend não precisar delas."
  },
  {
    "kind": "paragraph",
    "text": "Em produtos corporativos, a chave pode estar associada a aplicação, contrato, produto ou subscription. O gateway consulta repositório local, cache ou serviço de gestão. Caches melhoram desempenho, mas tornam revogação dependente de propagação. Para credenciais críticas, o TTL precisa ser curto ou a plataforma deve oferecer invalidação ativa."
  },
  {
    "kind": "paragraph",
    "text": "A integração com Axway API Gateway, Azure API Management e outros produtos deve ser validada conforme a versão implantada. Policies podem extrair headers, validar subscription keys, consultar vaults, aplicar quotas e transformar contexto. O desenho precisa impedir bypass direto ao backend e garantir que headers de identidade inseridos pelo gateway não possam ser forjados externamente."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/pt/figure-05.svg",
    "alt": "Validação de credencial por API Gateway com secret store e backend protegido",
    "caption": "Figura 5 - O gateway valida a credencial e encaminha contexto confiável, não o segredo original."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.18 Comparação entre Basic, Digest e API Keys",
    "id": "15-18-comparacao-entre-basic-digest-e-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "Os três mecanismos compartilham simplicidade e ausência de fluxo complexo de emissão de token, mas resolvem problemas diferentes. Basic transporta usuário e senha. Digest cria prova baseada na senha e em um desafio. API Key identifica uma aplicação ou assinatura com um valor aleatório. Nenhum deles, isoladamente, fornece autorização fina, identidade federada ou consentimento delegado."
  },
  {
    "kind": "paragraph",
    "text": "A escolha deve considerar onde a credencial pode ser protegida, quem é o sujeito, duração, necessidade de rotação e suporte dos clientes. Para novos serviços de alto risco, credenciais curtas, mTLS, OAuth 2.0 ou identidades de workload tendem a oferecer propriedades melhores. Basic, Digest e keys continuam úteis quando aplicados com escopo limitado e controles compensatórios claros."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Nenhum mecanismo elimina a necessidade de TLS, escopo, rotação e autorização.",
    "headers": [
      "Critério",
      "Basic Auth",
      "Digest",
      "API Key"
    ],
    "rows": [
      [
        "Segredo trafega diretamente",
        "Sim, dentro de Base64 e TLS.",
        "Não como senha, mas há prova reutilizável no contexto.",
        "Sim, normalmente como bearer."
      ],
      [
        "Dependência de TLS",
        "Total.",
        "Continua necessária.",
        "Total."
      ],
      [
        "Sujeito típico",
        "Usuário ou conta técnica.",
        "Usuário ou conta técnica.",
        "Aplicação, projeto ou assinatura."
      ],
      [
        "Replay após captura",
        "Possível enquanto senha for válida.",
        "Mitigado por nonce/nc quando correto.",
        "Possível enquanto chave for válida."
      ],
      [
        "Operação",
        "Simples, mas senha precisa de proteção.",
        "Mais complexa e menos interoperável.",
        "Simples, exige ciclo de vida robusto."
      ],
      [
        "Uso recomendado",
        "Legado controlado e temporário.",
        "Compatibilidade específica.",
        "Identificação e controle de aplicações."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.19 Troubleshooting orientado por evidências",
    "id": "15-19-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "Quando Basic falha, confirme se o header chegou ao ponto correto, se Base64 foi produzido a partir do charset esperado, se a senha contém caracteres especiais e se proxy ou redirecionamento removeu Authorization. Diferencie 401 por credencial inválida de 403 por falta de permissão e de 429 por quota."
  },
  {
    "kind": "paragraph",
    "text": "Em Digest, compare realm, nonce, qop, algorithm, URI e método usados no cálculo. Verifique sincronização entre nós, validade do nonce, contador nc e canonicalização do request-target. Falhas intermitentes em cluster frequentemente indicam estado de nonce não compartilhado ou chaves diferentes para autenticar o desafio."
  },
  {
    "kind": "paragraph",
    "text": "Em API Keys, investigue nome do header, ambiente, prefixo, status, expiração, escopos, quota e cache de revogação. Uma chave válida no portal pode falhar no runtime se produto, subscription ou deployment estiverem inconsistentes. Sempre correlacione logs do gateway, serviço de gestão e backend."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Diagnóstico exige identificar o ponto que produziu a resposta.",
    "headers": [
      "Sintoma",
      "Hipóteses",
      "Evidências"
    ],
    "rows": [
      [
        "Basic retorna 401",
        "senha alterada, Base64 incorreto, realm ou header removido",
        "header mascarado, conta, nó e logs de autenticação."
      ],
      [
        "Digest falha após um tempo",
        "nonce expirado, nc repetido ou stale não tratado",
        "desafio, timestamp, contador e nó do cluster."
      ],
      [
        "API Key funciona em homologação",
        "chave ou produto do ambiente errado",
        "prefixo, metadata, deployment e subscription."
      ],
      [
        "Revogada ainda funciona",
        "cache ou backend acessível diretamente",
        "TTL, invalidação e rota de bypass."
      ],
      [
        "429 inesperado",
        "quota compartilhada ou chave reutilizada",
        "owner, contadores e consumidores por chave."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.20 Estudos de caso e laboratórios",
    "id": "15-20-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - senha compartilhada por dez integrações"
  },
  {
    "kind": "paragraph",
    "text": "Dez jobs usam o mesmo usuário Basic. Um segredo aparece em um repositório e a organização não consegue atribuir o uso. A resposta cria contas individuais, restringe escopos, migra para credenciais de aplicação e revoga o usuário compartilhado após telemetria confirmar a transição."
  },
  {
    "kind": "paragraph",
    "text": "O caso mostra que o maior problema não era Base64, mas ausência de individualização e rotação. Mesmo sobre TLS, o vazamento tinha impacto amplo e baixa rastreabilidade."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Digest intermitente em cluster"
  },
  {
    "kind": "paragraph",
    "text": "Dois nós emitem nonces com chaves diferentes e o balanceador distribui chamadas sem afinidade. O cliente recebe desafio de um nó e envia a prova ao outro, que rejeita o nonce. A correção compartilha a chave de autenticação do nonce ou usa validação consistente entre nós."
  },
  {
    "kind": "paragraph",
    "text": "Capturas e logs mostram 401 sucessivos com nonces diferentes. O erro parecia senha incorreta, mas a causa estava no estado distribuído do mecanismo."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - API Key exposta em query string"
  },
  {
    "kind": "paragraph",
    "text": "Uma integração envia a chave em query. O valor aparece em logs de proxy e ferramenta de analytics. A equipe revoga a chave, remove parâmetros dos logs, muda a transmissão para header, adiciona scanners e revisa todos os consumidores."
  },
  {
    "kind": "paragraph",
    "text": "A investigação também identifica que a mesma chave era usada em produção e teste. A segregação por ambiente reduz o impacto de futuros vazamentos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratórios sugeridos"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Codifique e decodifique um valor Basic de laboratório e observe que Base64 é reversível.",
      "Configure um servidor local autorizado com desafio Basic e inspecione 401, WWW-Authenticate e Authorization.",
      "Simule o cálculo de Digest com nonce controlado e altere método ou URI para verificar a falha.",
      "Modele uma API Key com prefixo público, secret aleatório e verifier armazenado.",
      "Implemente rotação com duas chaves ativas e confirme a revogação da antiga.",
      "Compare logs de uma chave em header e em query string, usando somente valores fictícios."
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
    "text": "Basic Auth codifica usuário e senha em Base64 e envia a credencial em cada chamada. Base64 não protege o segredo; TLS, armazenamento adequado, individualização, rotação e limitação de tentativas são indispensáveis. Em gateways, a credencial deve ser validada na borda e removida antes do backend quando possível."
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest usa desafio-resposta com realm, nonce, algoritmo, qop, cnonce e contador. Ele evita transmitir a senha diretamente, mas depende de implementação rigorosa, senha forte, controle de replay e TLS. Sua complexidade e interoperabilidade fazem com que seja adotado principalmente por compatibilidade."
  },
  {
    "kind": "paragraph",
    "text": "API Keys identificam aplicações, projetos ou assinaturas e suportam quotas e analytics. Como normalmente são bearer, precisam de alta entropia, transmissão em header, armazenamento protegido, metadata, escopo, rotação e revogação rápida. Não substituem identidade de usuário nem autorização por recurso."
  },
  {
    "kind": "paragraph",
    "text": "Mecanismos estáticos devem ser avaliados pelo ciclo de vida completo. Para novos casos de alto risco, tokens curtos, mTLS, OAuth 2.0 e identidades de workload oferecem propriedades superiores. A migração deve ser baseada em telemetria e coexistência controlada."
  },
  {
    "kind": "subhead",
    "text": "Próximo passo do curso"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 16 aprofundará OAuth 2.0 completo: papéis, grants, authorization code com PKCE, client credentials, refresh tokens, scopes, segurança e aplicação em API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de credenciais estáticas",
    "id": "checklist-de-credenciais-estaticas"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Basic, Digest e API Keys são aceitos somente sobre TLS corretamente validado.",
      "Cada consumidor possui credencial individual, owner e ambiente definidos.",
      "Segredos não aparecem em URL, logs, código-fonte, tickets ou analytics.",
      "Senhas são protegidas por mecanismo de armazenamento apropriado e nunca registradas.",
      "Nonces Digest possuem validade, integridade e controle de replay.",
      "Algoritmos e qop do Digest seguem política explícita e não sofrem downgrade silencioso.",
      "API Keys possuem entropia suficiente, prefixo seguro e distribuição por canal protegido.",
      "Verifiers e metadata são separados do segredo apresentado.",
      "Escopos, quotas e rate limits não substituem autorização de objeto e domínio.",
      "Rotação permite sobreposição curta e revogação confirmada por telemetria.",
      "Caches de gateway respeitam revogação e não criam janela excessiva.",
      "O backend não é acessível diretamente para contornar a política do gateway.",
      "Alertas detectam uso anômalo, origem inesperada e chaves órfãs.",
      "Existe plano de migração para credenciais curtas ou assimétricas quando o risco exige."
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
      "Explique por que Base64 não protege Basic Auth.",
      "Descreva o fluxo 401, WWW-Authenticate e Authorization.",
      "Liste riscos de compartilhar um usuário Basic entre aplicações.",
      "Explique a função de realm, nonce, qop, cnonce e nc no Digest.",
      "Descreva como stale=true altera o comportamento do cliente.",
      "Explique por que Digest ainda precisa de TLS.",
      "Diferencie API Key, access token e identidade de usuário.",
      "Proponha um formato com key_id público e secret aleatório.",
      "Descreva armazenamento com verifier e metadata.",
      "Crie um plano de rotação sem indisponibilidade.",
      "Compare API Key direta e assinatura HMAC de requisição.",
      "Descreva troubleshooting para chave revogada que ainda funciona no gateway."
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
        "API Key",
        "Valor associado a aplicação, projeto, produto ou assinatura de API."
      ],
      [
        "Base64",
        "Codificação reversível de bytes para caracteres textuais."
      ],
      [
        "Basic Auth",
        "Esquema HTTP que transmite user-id e senha codificados em Base64."
      ],
      [
        "cnonce",
        "Nonce criado pelo cliente em HTTP Digest."
      ],
      [
        "Credential stuffing",
        "Uso automatizado de credenciais obtidas em vazamentos anteriores."
      ],
      [
        "Digest",
        "Esquema HTTP de desafio-resposta baseado em hash."
      ],
      [
        "HA1",
        "Valor derivado de usuário, realm e senha no Digest."
      ],
      [
        "HA2",
        "Valor derivado de método e request-target no Digest."
      ],
      [
        "HMAC",
        "Código de autenticação de mensagem baseado em hash e segredo compartilhado."
      ],
      [
        "key id _",
        "Identificador público usado para localizar o registro de uma chave."
      ],
      [
        "nc",
        "Contador de uso de um nonce em Digest."
      ],
      [
        "nonce",
        "Valor usado uma vez ou dentro de janela limitada para reduzir replay."
      ],
      [
        "opaque",
        "Valor do desafio Digest devolvido sem interpretação pelo cliente."
      ],
      [
        "qop",
        "Qualidade de proteção negociada no Digest."
      ],
      [
        "realm",
        "Espaço de proteção anunciado por um desafio HTTP."
      ],
      [
        "Replay",
        "Reutilização não autorizada de uma credencial ou prova capturada."
      ],
      [
        "Secret manager",
        "Serviço para armazenar, distribuir e auditar segredos."
      ],
      [
        "stale",
        "Indicação de que o nonce expirou, não necessariamente a senha."
      ],
      [
        "Verifier",
        "Representação protegida usada para validar um segredo sem armazená-lo em claro."
      ],
      [
        "WWW-Authenticate",
        "Header de resposta que anuncia desafios de autenticação HTTP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de decisão",
    "id": "anexo-a-matriz-de-decisao"
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - A opção adequada depende da capacidade de proteger segredo e do risco da operação.",
    "headers": [
      "Cenário",
      "Opção inicial",
      "Condições"
    ],
    "rows": [
      [
        "Integração legada temporária",
        "Basic Auth",
        "TLS, conta individual, senha forte, vault e prazo de migração."
      ],
      [
        "Equipamento com suporte restrito",
        "Digest",
        "Algoritmo seguro, nonce consistente, TLS e testes de interoperabilidade."
      ],
      [
        "Identificação de aplicação e quota",
        "API Key",
        "Chave individual, escopo, rotação e autorização separada."
      ],
      [
        "Serviço interno moderno",
        "OAuth 2.0 client credentials, mTLS ou federação",
        "Credencial curta, audience e identidade de workload."
      ],
      [
        "Cliente público móvel ou navegador",
        "Não confiar em API Key como segredo",
        "Backend intermediário, autenticação do usuário e controles de abuso."
      ],
      [
        "Requisição que precisa de prova específica",
        "HMAC ou assinatura assimétrica",
        "Canonicalização, timestamp, nonce e proteção de chave."
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
      "IETF. RFC 9110 - HTTP Semantics. 2022.",
      "IETF. RFC 7617 - The Basic HTTP Authentication Scheme. 2015.",
      "IETF. RFC 7616 - HTTP Digest Access Authentication. 2015.",
      "IETF. RFC 7235 - HTTP/1.1 Authentication, posteriormente consolidada no RFC 9110.",
      "OWASP. Authentication Cheat Sheet.",
      "OWASP. Password Storage Cheat Sheet.",
      "OWASP. REST Security Cheat Sheet.",
      "OWASP. Secrets Management Cheat Sheet.",
      "NIST. SP 800-63B - Authentication and Authenticator Management.",
      "Microsoft Learn. Azure API Management subscription keys e policies.",
      "Axway Documentation. API Key, HTTP Basic e políticas de autenticação no API Gateway."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Protocolos e produtos possuem detalhes de implementação e suporte específicos. Antes de adotar Basic, Digest ou API Keys, valide a documentação oficial da versão implantada e execute testes em ambiente autorizado."
  }
];
