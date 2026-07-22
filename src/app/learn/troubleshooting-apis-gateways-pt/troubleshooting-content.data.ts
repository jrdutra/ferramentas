import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const TROUBLESHOOTING_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Troubleshooting orientado por evidências: do sintoma à causa raiz"
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Não altere a plataforma por tentativa e erro: formule hipóteses, colete evidências e reduza o espaço de busca."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/overview.svg",
    "alt": "Investigação de API orientada por hipóteses, evidências e causa raiz",
    "caption": "Figura de abertura - Uma investigação eficiente reduz o espaço de busca por meio de evidências e hipóteses explícitas."
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
    "text": "Troubleshooting de APIs raramente começa com uma descrição precisa. O relato inicial costuma ser \"a API está fora\", \"o token não funciona\", \"deu timeout\" ou \"o gateway retornou 502\". Esses sintomas são importantes, mas não identificam a causa. Uma mesma resposta pode ser produzida por componentes diferentes, e uma mesma falha pode aparecer de formas distintas conforme o ponto de observação."
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway ocupa uma posição privilegiada e complexa: termina conexões de clientes, executa TLS, valida identidade, aplica policies, transforma mensagens, cria conexões com backends e registra telemetria. Isso significa que ele pode detectar problemas anteriores, produzir erros próprios ou apenas propagar falhas de dependências. Investigar corretamente exige separar cada trecho da comunicação e distinguir evidência observada de hipótese ainda não confirmada."
  },
  {
    "kind": "paragraph",
    "text": "A metodologia deste capítulo combina raciocínio por camadas, construção de timeline, correlação distribuída e análise de mudanças. O profissional aprende a começar pelo impacto e pelo escopo, confirmar o caminho realmente percorrido, localizar a última etapa bem-sucedida e selecionar ferramentas compatíveis com a hipótese. O objetivo não é executar todos os comandos disponíveis, mas obter a evidência mínima que discrimina entre causas possíveis."
  },
  {
    "kind": "paragraph",
    "text": "Também será discutida a operação durante incidentes: contenção, mitigação, preservação de evidências, comunicação, validação da correção e análise pós-incidente. Troubleshooting maduro não termina quando o gráfico volta ao normal; ele registra a causa raiz, corrige lacunas de detecção, reduz recorrência e transforma conhecimento tácito em runbooks e automação."
  },
  {
    "kind": "paragraph",
    "text": "Como estudar este capítulo Escolha uma requisição real ou fictícia e mantenha sempre os mesmos campos: consumidor, horário com fuso, host, IP resolvido, porta, método, URI, request ID, trace ID, status, latência e backend selecionado. Refaça cada seção perguntando qual evidência confirmaria ou descartaria a hipótese."
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
      "Aplicar uma metodologia orientada por hipóteses e evidências em incidentes de APIs.",
      "Definir impacto, escopo, timeline e mudança correlacionada antes de alterar componentes.",
      "Localizar falhas entre cliente, DNS, rede, gateway, backend e dependências.",
      "Diagnosticar problemas de TCP, NAT, TLS, mTLS, HTTP, autenticação e autorização.",
      "Distinguir erros produzidos pelo gateway de respostas propagadas pelo backend.",
      "Investigar policies, roteamento, transformações, rate limits, retries e timeouts.",
      "Usar logs, métricas, traces, capturas de rede e testes sintéticos de forma complementar.",
      "Diagnosticar APIs em Kubernetes, service mesh e ambientes multi-região.",
      "Conduzir contenção, correção, validação e análise pós-incidente com segurança.",
      "Criar checklists, runbooks e evidências reutilizáveis para equipes de suporte e engenharia."
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
      "38.1 Troubleshooting como processo científico",
      "38.2 Impacto, escopo, timeline e mudanças",
      "38.3 Modelo de camadas e caminho real da requisição",
      "38.4 DNS, endereçamento e balanceamento",
      "38.5 TCP, sockets, NAT, SNAT e conectividade",
      "38.6 TLS, mTLS, certificados e confiança",
      "38.7 HTTP, status codes e semântica de erros",
      "38.8 Autenticação, autorização e identidade",
      "38.9 Policies, roteamento e transformação no gateway",
      "38.10 Backends, dados, filas e terceiros",
      "38.11 Timeouts, retries, rate limits e falhas em cascata",
      "38.12 Kubernetes, service mesh e nuvem",
      "38.13 Logs, métricas, tracing e correlação",
      "38.14 Ferramentas e coleta segura de evidências",
      "38.15 Gestão de incidentes, runbooks e pós-incidente",
      "38.16 Estudos de caso",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.1 Troubleshooting como processo científico",
    "id": "38-1-troubleshooting-como-processo-cientifico"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting eficiente segue uma sequência semelhante ao método científico: observar o sintoma, formular hipóteses, prever quais evidências seriam esperadas, executar um teste controlado e atualizar o entendimento. O valor dessa abordagem está em evitar mudanças simultâneas e conclusões por coincidência. Reiniciar um componente e ver o serviço voltar não prova que a causa estava naquele componente; apenas mostra que o reinício alterou o estado do sistema."
  },
  {
    "kind": "paragraph",
    "text": "Uma hipótese deve ser específica o suficiente para ser testada. \"A rede está ruim\" é vaga. \"O gateway não consegue abrir conexão TCP com o backend 10.20.30.40:8443 a partir da subnet de produção\" é verificável. Essa formulação determina o ponto de teste, a ferramenta, o horário e a evidência esperada. Se o SYN recebe RST, a hipótese muda; se não há resposta, outra família de causas ganha prioridade."
  },
  {
    "kind": "paragraph",
    "text": "O investigador também precisa distinguir causa, condição contribuidora e sintoma. Um certificado expirado pode ser a causa imediata, enquanto ausência de monitoramento e processo manual de renovação são condições contribuidoras. O erro 502 observado pelo cliente é um sintoma. Uma análise madura registra os três níveis, pois corrigir apenas o certificado restaura o serviço, mas não evita recorrência."
  },
  {
    "kind": "paragraph",
    "text": "Regra de ouro Altere uma variável por vez sempre que o risco permitir. Antes de executar uma ação destrutiva, capture logs, métricas, estado de configuração, conexões, certificados e identificadores necessários para reconstruir o incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.2 Impacto, escopo, timeline e mudanças",
    "id": "38-2-impacto-escopo-timeline-e-mudancas"
  },
  {
    "kind": "paragraph",
    "text": "A investigação começa pelo impacto: quais operações, consumidores, regiões, ambientes e volumes estão afetados? Um erro isolado de um cliente pode apontar para credencial ou configuração local; uma falha em todos os consumidores após um deploy aponta para mudança compartilhada. O escopo deve ser refinado por método, endpoint, versão, tenant, produto, certificado, gateway e backend."
  },
  {
    "kind": "paragraph",
    "text": "A timeline organiza fatos em ordem. Registre início percebido, primeiro alerta, último sucesso conhecido, deploys, rotação de certificados, alterações de DNS, mudanças de firewall, escalonamentos e ações de mitigação. Use relógios sincronizados e indique fuso horário. Diferenças de poucos minutos podem inverter a relação aparente entre causa e efeito."
  },
  {
    "kind": "paragraph",
    "text": "Mudanças recentes são fortes candidatas, mas não devem dominar a análise sem evidência. Expiração de certificado, esgotamento gradual de portas, crescimento de fila e alteração externa de parceiro podem ocorrer sem deploy local. O investigador deve comparar o estado atual com uma baseline conhecida: configuração, policy, versão, certificado, rota, limites, número de conexões e comportamento de tráfego."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Perguntas iniciais reduzem rapidamente o espaço de busca.",
    "headers": [
      "Pergunta",
      "Exemplo de resposta útil",
      "Evidência"
    ],
    "rows": [
      [
        "Quem é afetado?",
        "Somente parceiros externos na região Sul.",
        "Métricas por consumidor e região."
      ],
      [
        "Desde quando?",
        "Primeiro erro às 14:32:18 BRT.",
        "Logs e alerta com timestamp."
      ],
      [
        "O que mudou?",
        "Policy publicada às 14:29.",
        "Audit log e diff de configuração."
      ],
      [
        "Qual último sucesso?",
        "Request ID abc às 14:31:54.",
        "Trace completo e access log."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.3 Modelo de camadas e caminho real da requisição",
    "id": "38-3-modelo-de-camadas-e-caminho-real-da-requisicao"
  },
  {
    "kind": "paragraph",
    "text": "O caminho desenhado em arquitetura nem sempre corresponde ao caminho real. DNS pode retornar endereços diferentes por localidade; um WAF pode terminar TLS; o API Gateway pode usar outro proxy para alcançar o backend; uma service mesh pode inserir sidecars; e a resposta pode atravessar rota diferente. Antes de concluir, confirme os saltos efetivos e os pontos de terminação de conexão."
  },
  {
    "kind": "paragraph",
    "text": "O modelo de camadas ajuda a localizar a falha. Se o nome não resolve, não há conexão TCP. Se o handshake TCP falha, TLS não começou. Se TLS conclui e há resposta HTTP 401, a rede e a criptografia já funcionaram até um componente capaz de interpretar HTTP. Se o gateway registra a requisição e o backend não, a investigação concentra-se no trecho gateway-backend ou na policy anterior ao roteamento."
  },
  {
    "kind": "paragraph",
    "text": "A técnica mais útil é identificar a última evidência de sucesso e a primeira evidência de falha. Essa fronteira reduz o problema. Um trace mostra o gateway iniciando chamada downstream, mas sem span do backend: verifique propagação, rede ou conexão. O backend registra a operação com sucesso, mas o cliente recebe timeout: investigue resposta, buffers, conexão de retorno e prazo externo."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/figure-01.svg",
    "alt": "Modelo em camadas para localizar onde uma transação de API parou",
    "caption": "Figura 1 - O modelo de camadas organiza responsabilidades e evita investigar a aplicação antes de confirmar rede e transporte."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/figure-02.svg",
    "alt": "Pontos de observação ao longo de uma chamada corporativa de API",
    "caption": "Figura 2 - Pontos de observação diferentes revelam etapas diferentes da mesma transação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.4 DNS, endereçamento e balanceamento",
    "id": "38-4-dns-enderecamento-e-balanceamento"
  },
  {
    "kind": "paragraph",
    "text": "Falhas de DNS incluem NXDOMAIN, SERVFAIL, timeout do resolvedor, resposta incorreta, split-horizon inconsistente, cache desatualizado e resolução para família IP não suportada. O teste deve ser executado do mesmo ambiente do runtime afetado. Resolver o nome no notebook do analista não comprova que o container, pod ou gateway usa o mesmo servidor DNS, search domain ou rota."
  },
  {
    "kind": "paragraph",
    "text": "Compare resposta, TTL, cadeia CNAME, registros A e AAAA e servidores autoritativos. Em mudanças recentes, observe caches intermediários e conexões persistentes: alterar DNS não move conexões já estabelecidas. Em ambientes privados, confirme private zones, links de rede e forwarders condicionais. Uma diferença entre ambientes pode indicar que o nome público está sendo resolvido onde deveria existir resposta privada."
  },
  {
    "kind": "paragraph",
    "text": "No balanceamento, verifique health checks, pool elegível, algoritmo, afinidade e drenagem. Um backend pode responder ao health check superficial e falhar na operação real. Logs do balanceador e do gateway devem indicar qual instância foi selecionada. Distribuição desigual pode resultar de conexões persistentes, pesos, sticky sessions ou pequena quantidade de clientes."
  },
  {
    "kind": "paragraph",
    "text": "Comandos de observação de DNS # Linux / macOS dig api.empresa.example A dig api.empresa.example AAAA dig +trace api.empresa.example # Windows PowerShell Resolve-DnsName api.empresa.example -Type A Resolve-DnsName api.empresa.example -Server 10.0.0.10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.5 TCP, sockets, NAT, SNAT e conectividade",
    "id": "38-5-tcp-sockets-nat-snat-e-conectividade"
  },
  {
    "kind": "paragraph",
    "text": "Conectividade deve ser testada por origem, destino, protocolo e porta. Ping não valida uma API e pode ser bloqueado. O teste relevante é abrir conexão TCP a partir do mesmo namespace de rede do componente afetado. Connection refused normalmente indica RST, listener ausente ou rejeição ativa. Connect timeout sugere ausência de resposta, rota, firewall ou perda. Connection reset durante uso indica encerramento abrupto por peer ou intermediário."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, existem pelo menos duas conexões independentes: cliente-gateway e gateway-backend. Cada uma possui IPs, portas, certificados, pools e timeouts próprios. Uma chamada pode chegar corretamente ao listener externo e falhar ao obter porta efêmera, atravessar SNAT ou reutilizar uma conexão backend já encerrada pelo outro lado."
  },
  {
    "kind": "paragraph",
    "text": "Esgotamento de SNAT e portas efêmeras aparece como falha intermitente sob carga. Investigue quantidade de destinos, taxa de novas conexões, keep-alive, pooling, TIME_WAIT, limites do NAT e distribuição por IP de saída. Captura de pacotes e flow logs ajudam a distinguir ausência de SYN-ACK, RST e retransmissões. Sempre preserve o ponto exato da captura, pois a mesma conexão pode aparecer traduzida em cada salto."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Sintomas de transporte devem ser associados a evidências de rede.",
    "headers": [
      "Sintoma",
      "Hipótese principal",
      "Próxima evidência"
    ],
    "rows": [
      [
        "Connection refused",
        "Nada escuta ou há rejeição ativa.",
        "Captura com RST e estado do listener."
      ],
      [
        "Connect timeout",
        "Firewall, rota, perda ou destino indisponível.",
        "SYN retransmitido e flow logs."
      ],
      [
        "Reset após alguns segundos",
        "Idle timeout ou peer encerrou.",
        "FIN/RST e configuração de pool."
      ],
      [
        "Intermitência sob carga",
        "SNAT, backlog ou portas efêmeras.",
        "Conexões, TIMEWAIT e NAT metrics."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.6 TLS, mTLS, certificados e confiança",
    "id": "38-6-tls-mtls-certificados-e-confianca"
  },
  {
    "kind": "paragraph",
    "text": "Falhas TLS exigem distinguir protocolo, cifra, certificado, nome e confiança. O cliente pode rejeitar certificado expirado, cadeia incompleta, autoridade não confiável, hostname incompatível ou algoritmo não permitido. O servidor pode rejeitar versão de TLS, cipher suite, SNI ou certificado de cliente. A mensagem genérica \"handshake failed\" precisa ser detalhada por logs e ferramentas de inspeção."
  },
  {
    "kind": "paragraph",
    "text": "Em mTLS, verifique se o servidor solicitou certificado, qual cadeia o cliente enviou, se a chave privada correspondente está disponível e se a identidade atende à policy. Certificados podem estar corretos no filesystem e ausentes no processo por falha de reload. Em HSM ou Key Vault, investigue permissões, latência, versão da chave e conectividade."
  },
  {
    "kind": "paragraph",
    "text": "O SNI seleciona o contexto TLS antes do HTTP Host ser processado. Testar por IP sem informar SNI pode retornar certificado padrão e produzir diagnóstico falso. Para backends, confirme também o nome usado pelo gateway na validação: IP de destino, hostname configurado, SNI enviado e truststore podem não coincidir."
  },
  {
    "kind": "paragraph",
    "text": "Inspeção conceitual de TLS e mTLS # Inspecionar handshake e cadeia apresentada openssl s_client -connect api.empresa.example:443 -servername api.empresa.example -showcerts # Teste com certificado de cliente openssl s_client -connect backend.interno:8443 -servername backend.interno -cert cliente.pem -key cliente.key Cuidado operacional Nunca copie chaves privadas ou tokens reais para ferramentas pessoais, tickets ou chats. Colete apenas o necessário, use ambientes autorizados e masque dados sensíveis antes de compartilhar evidências."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.7 HTTP, status codes e semântica de erros",
    "id": "38-7-http-status-codes-e-semantica-de-erros"
  },
  {
    "kind": "paragraph",
    "text": "O status HTTP informa o resultado observado por um componente, não necessariamente a causa raiz. Um 401 pode vir do gateway, do IdP ou do backend. Um 502 geralmente indica que um intermediário recebeu resposta inválida ou não conseguiu completar a comunicação upstream, mas a implementação concreta deve ser confirmada. Um 504 indica timeout no papel de gateway, enquanto o cliente pode ter encerrado antes e o servidor continuar processando."
  },
  {
    "kind": "paragraph",
    "text": "Compare status, headers, corpo e componente emissor. Headers como Server, Via, Proxy-Status, request IDs e formatos de erro ajudam a identificar origem, mas podem ser removidos ou padronizados. Problem Details fornece estrutura para erros de API, porém o campo type, title, status e detalhes precisam ser interpretados no contexto. Evite depender apenas da mensagem textual."
  },
  {
    "kind": "paragraph",
    "text": "Observe método, URI, Host, Content-Type, Accept, Content-Length, Transfer-Encoding e encoding. Erros de 400 podem resultar de parsing, limite de tamanho, header inválido ou transformação. 404 pode indicar rota inexistente, versão errada ou política de ocultação. 409 pode representar conflito de estado ou idempotência. 429 aponta limite, e Retry-After pode orientar repetição. O código 499 é uma convenção não padronizada usada por alguns proxies para cliente que encerrou a conexão."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Status codes iniciam a análise, mas não identificam sozinhos o componente responsável.",
    "headers": [
      "Código",
      "Leitura inicial",
      "Pergunta de diagnóstico"
    ],
    "rows": [
      [
        "400",
        "Mensagem inválida ou rejeitada.",
        "Quem fez o parsing e qual regra falhou?"
      ],
      [
        "401 / 403",
        "Autenticação ausente/inválida ou acesso negado.",
        "Qual componente decidiu e com qual identidade?"
      ],
      [
        "429",
        "Limite excedido.",
        "Qual chave, janela e contador foram usados?"
      ],
      [
        "502 / 503 / 504",
        "Falha upstream, indisponibilidade ou timeout.",
        "O gateway conectou, recebeu resposta ou expirou?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.8 Autenticação, autorização e identidade",
    "id": "38-8-autenticacao-autorizacao-e-identidade"
  },
  {
    "kind": "paragraph",
    "text": "Em problemas de identidade, separe obtenção de credencial, validação e decisão de autorização. Um cliente pode falhar ao obter token; o gateway pode rejeitar assinatura, issuer, audience ou expiração; e a aplicação pode aceitar o token, mas negar a operação por escopo, papel, relação com o recurso ou política de negócio. Cada etapa possui evidências e owners diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Para JWTs, confirme algoritmo permitido, kid, chave resolvida, issuer exato, audience, tempos exp/nbf/iat, clock skew e tipo do token. Cache de JWKS pode manter chave antiga; rotação mal coordenada pode criar janela de falha. Para tokens opacos, verifique introspecção, autenticação do gateway, timeout e cache de resultado. Nunca conclua que o token é válido apenas porque pode ser decodificado."
  },
  {
    "kind": "paragraph",
    "text": "Autorização por objeto e por função deve ser testada com identidade realista. Um 403 correto para um usuário e incorreto para outro pode indicar claims, mapeamento de grupos, tenant, ownership ou dado de contexto. Em federação, preserve issuer e subject originais antes de account linking. Em mTLS e DPoP, valide o vínculo entre token e chave apresentada."
  },
  {
    "kind": "paragraph",
    "text": "Evidência mínima de identidade Registre issuer, audience, subject pseudonimizado, client_id, scopes/roles, policy aplicada, decisão e motivo. Não registre o token completo. O hash ou identificador seguro da credencial costuma ser suficiente para correlação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.9 Policies, roteamento e transformação no gateway",
    "id": "38-9-policies-roteamento-e-transformacao-no-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Policies podem rejeitar, transformar, rotear, armazenar cache, chamar serviços externos ou encerrar o fluxo. A ordem de execução é parte do comportamento. Uma variável não inicializada, expressão com tipo inesperado ou branch incorreto pode produzir erro distante do ponto aparente. Compare a policy publicada com a baseline e use tracing de policy quando a plataforma permitir."
  },
  {
    "kind": "paragraph",
    "text": "No roteamento, confirme API, versão, operação, método, host, path template, rewrite e backend final. Rotas muito genéricas podem capturar chamadas indevidas; uma barra, encoding ou case sensitivity pode alterar o match. Em gateways com múltiplos estágios, o primeiro componente pode modificar Host, path ou headers antes do segundo."
  },
  {
    "kind": "paragraph",
    "text": "Transformações devem ser avaliadas antes e depois. Registre tamanhos e hashes seguros, não payloads sensíveis. Erros de JSON/XML podem ocorrer por encoding, namespace, schema ou conteúdo opcional. Policies de cache, retry e fallback podem mascarar falha original; desativá-las temporariamente exige controle, aprovação e teste em ambiente seguro."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - A seção da policy ajuda a localizar quando o fluxo foi interrompido.",
    "headers": [
      "Etapa da policy",
      "Falha típica",
      "Evidência"
    ],
    "rows": [
      [
        "Inbound",
        "Token, quota ou validação rejeitada.",
        "Trace de policy e contexto de entrada."
      ],
      [
        "Backend",
        "Rota, certificado ou conexão upstream.",
        "Backend selecionado e connect log."
      ],
      [
        "Outbound",
        "Transformação ou tamanho da resposta.",
        "Resposta original e pós-policy."
      ],
      [
        "On-error",
        "Erro original mascarado.",
        "Exception interna antes do handler."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.10 Backends, dados, filas e terceiros",
    "id": "38-10-backends-dados-filas-e-terceiros"
  },
  {
    "kind": "paragraph",
    "text": "Quando o gateway conclui o encaminhamento, a investigação passa ao backend e suas dependências. Diferencie tempo de fila, processamento, banco de dados, chamada externa e serialização. CPU baixa não prova saúde: o serviço pode estar bloqueado em pool de conexões, locks, DNS ou I/O. Métricas de saturação, filas, threads, event loop e pools são mais informativas."
  },
  {
    "kind": "paragraph",
    "text": "Bancos de dados podem apresentar slow queries, lock contention, esgotamento de pool, réplica atrasada ou failover. A resposta correta exige identificar a operação e o estado transacional. Em mensageria, verifique publish confirm, consumer lag, redelivery, DLQ e ordering. Uma API pode responder 202 corretamente e falhar depois; por isso, o identificador de negócio precisa acompanhar a operação assíncrona."
  },
  {
    "kind": "paragraph",
    "text": "Dependências de terceiros exigem separar falha local e remota. Compare DNS, certificado, connect time, first byte, status, rate limit e contrato. Circuit breakers podem abrir após sequência de falhas e continuar rejeitando mesmo depois da recuperação remota até o período de teste. O acordo de suporte deve definir evidências mínimas e horários com fuso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.11 Timeouts, retries, rate limits e falhas em cascata",
    "id": "38-11-timeouts-retries-rate-limits-e-falhas-em-cascata"
  },
  {
    "kind": "paragraph",
    "text": "Timeouts precisam ser analisados como orçamento. O prazo do cliente contém processamento na borda, gateway, backend e dependências. Se o timeout do gateway é maior que o do cliente, o gateway pode continuar trabalho que ninguém receberá. Se o retry ocorre próximo do fim do prazo, ele aumenta carga sem chance de sucesso. Prazos devem ser propagados e observados por cada camada."
  },
  {
    "kind": "paragraph",
    "text": "Retries são seguros apenas quando a operação é idempotente ou protegida por chave de idempotência. O log deve indicar número da tentativa, motivo, atraso e destino. Retries em várias camadas multiplicam chamadas: três tentativas no cliente, gateway e backend podem produzir até 27 execuções downstream. Backoff e jitter reduzem sincronização, mas não corrigem dependência sem capacidade."
  },
  {
    "kind": "paragraph",
    "text": "Rate limits e quotas precisam revelar chave, janela, contador e escopo. Um 429 inesperado pode resultar de NAT compartilhado, client_id incorreto, contador global ou política herdada. Circuit breakers, bulkheads, filas e load shedding podem produzir rejeições deliberadas para proteger o sistema. O troubleshooting deve reconhecer proteção funcionando corretamente e não removê-la sem avaliar risco."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/figure-03.svg",
    "alt": "Alinhamento de timeouts entre cliente, gateway, backend e dependência",
    "caption": "Figura 3 - O alinhamento de prazos reduz trabalho inútil e torna o componente que expirou identificável."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.12 Kubernetes, service mesh e nuvem",
    "id": "38-12-kubernetes-service-mesh-e-nuvem"
  },
  {
    "kind": "paragraph",
    "text": "Em Kubernetes, confirme Pod, Deployment, ReplicaSet, Service, EndpointSlice e rota de entrada. Um Service pode existir sem endpoints prontos. Readiness remove Pods do balanceamento; liveness reinicia processos; startup probe protege inicialização lenta. O evento do Pod, estado anterior do container e motivo de término ajudam a diferenciar falha de aplicação, OOMKill, probe e eviction."
  },
  {
    "kind": "paragraph",
    "text": "Requests e limits influenciam throttling e scheduling. CPU throttling pode aumentar latência sem mostrar CPU total alta. Memória acima do limite produz OOMKill. DNS interno, NetworkPolicy, CNI e kube-proxy/eBPF podem afetar conectividade. Testes devem ser feitos dentro do Pod ou de um Pod de diagnóstico autorizado no mesmo namespace e policy."
  },
  {
    "kind": "paragraph",
    "text": "Em service mesh, existem aplicações, sidecars ou proxies por nó e plano de controle. Verifique configuração recebida, certificados de workload, clusters/endpoints, retries e authorization policies. Um 503 pode ser gerado pelo proxy antes de alcançar o serviço. Em nuvem, inclua private endpoints, NSGs/security groups, route tables, SNAT, load balancers, managed identity e limites do serviço."
  },
  {
    "kind": "paragraph",
    "text": "Comandos de coleta em ambiente autorizado # Exemplos de observação em Kubernetes kubectl get pods,svc,endpointslices -n equipe-api kubectl describe pod <pod> -n equipe-api kubectl logs <pod> -c aplicacao --previous kubectl get events -n equipe-api --sort-by=.lastTimestamp"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.13 Logs, métricas, tracing e correlação",
    "id": "38-13-logs-metricas-tracing-e-correlacao"
  },
  {
    "kind": "paragraph",
    "text": "Logs mostram eventos discretos; métricas mostram tendência e distribuição; traces mostram caminho e causalidade aproximada. Nenhum sinal é suficiente sozinho. Uma elevação de p99 indica degradação, o trace mostra em qual span o tempo foi gasto e o log explica o erro específico. Exemplars podem ligar um ponto de métrica a um trace representativo."
  },
  {
    "kind": "paragraph",
    "text": "A correlação precisa atravessar fronteiras. Request ID pode ser gerado na borda, trace ID segue W3C Trace Context e identificador de negócio permite reconciliação. Não substitua um pelo outro. O gateway deve preservar ou regenerar identificadores conforme política, evitando confiar cegamente em valores externos que permitam colisão ou injeção em logs."
  },
  {
    "kind": "paragraph",
    "text": "Cardinalidade descontrolada reduz utilidade de métricas. Não use CPF, URL completa, token ou request ID como label. Em logs, mascare dados pessoais e segredos. Sampling de traces pode ocultar falhas raras; tail sampling permite reter erros e latências altas, mas depende de Collector e capacidade adequados. Relógios sincronizados são indispensáveis para timelines confiáveis."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/figure-04.svg",
    "alt": "Correlação entre identificadores técnicos e identificadores de negócio",
    "caption": "Figura 4 - Identificadores técnicos e de negócio cumprem papéis complementares na investigação."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas devem ser escolhidas pela hipótese. curl ou Invoke-WebRequest validam HTTP; openssl inspeciona TLS; dig e Resolve-DnsName observam DNS; ss, netstat e Get-NetTCPConnection mostram sockets; tcpdump e Wireshark analisam pacotes; logs de flow revelam decisões de rede; ferramentas do gateway mostram policy e backend; kubectl e interfaces de mesh mostram estado de workloads."
  },
  {
    "kind": "paragraph",
    "text": "Uma captura de pacotes deve ter escopo, duração e filtro mínimos. Capture somente em ambiente autorizado e proteja o arquivo, pois payloads, cookies e tokens podem aparecer em tráfego não criptografado ou em endpoints de terminação. Quando TLS impede leitura do conteúdo, metadados de handshake, tamanhos, tempos, retransmissões e encerramento ainda são úteis."
  },
  {
    "kind": "paragraph",
    "text": "Preservar evidências significa registrar comando, origem, horário, versão, filtros e hash do arquivo. Tickets devem conter dados suficientes para reprodução, mas não segredos. Para ambientes críticos, automatize bundles de diagnóstico que coletem configurações e métricas com masking e controle de acesso."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - A ferramenta correta depende da pergunta que se pretende responder.",
    "headers": [
      "Hipótese",
      "Ferramenta adequada",
      "Evidência esperada"
    ],
    "rows": [
      [
        "Nome resolve incorretamente",
        "dig / Resolve-DnsName",
        "Resposta, TTL e servidor consultado."
      ],
      [
        "Handshake TLS falha",
        "openssl sclient",
        "SNI, cadeia, alert e versão."
      ],
      [
        "Gateway não conecta",
        "tcpdump / flow logs",
        "SYN, SYN-ACK, RST ou drop."
      ],
      [
        "Policy rejeita",
        "Trace da plataforma",
        "Filtro, variável e motivo de erro."
      ],
      [
        "Backend lento",
        "Trace + métricas",
        "Span, pool, query e saturação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.15 Gestão de incidentes, runbooks e pós-incidente",
    "id": "38-15-gestao-de-incidentes-runbooks-e-pos-incidente"
  },
  {
    "kind": "paragraph",
    "text": "Durante incidente, o objetivo imediato é reduzir impacto sem destruir evidências ou criar falhas adicionais. Defina incident commander, canal, scribe, owners técnicos e frequência de atualização. Separe ações de contenção, como retirar instância defeituosa, de correções permanentes. Toda ação deve registrar horário, executor, hipótese e resultado."
  },
  {
    "kind": "paragraph",
    "text": "Runbooks precisam conter critérios, não apenas comandos. Um procedimento de failover deve dizer quando executar, quem aprova, quais pré-condições verificar, como validar integridade e como voltar. Comandos sem contexto podem ser perigosos. Automação deve ser testada e produzir logs auditáveis."
  },
  {
    "kind": "paragraph",
    "text": "A análise pós-incidente reconstrói timeline, causa raiz, condições contribuidoras, eficácia de detecção e impacto. Evite atribuir causa a \"erro humano\" sem perguntar por que o sistema permitiu a ação, por que a revisão não detectou e por que o blast radius foi amplo. Ações devem ser específicas, com owner, prazo e critério de conclusão."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/pt/figure-05.svg",
    "alt": "Ciclo de resposta a incidente desde detecção até aprendizado",
    "caption": "Figura 5 - Restaurar o serviço é apenas uma etapa; validar e aprender evitam recorrência."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.16 Estudos de caso",
    "id": "38-16-estudos-de-caso"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - 502 após rotação de certificado: consumidores chegam ao gateway, que registra falha TLS ao backend. O certificado novo foi instalado, mas a cadeia intermediária não foi incluída no truststore do gateway. A mitigação restaura a cadeia anterior; a correção adiciona validação automática do bundle, janela de sobreposição e teste sintético de mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - timeouts intermitentes em pico: métricas mostram aumento de novas conexões e portas SNAT consumidas. O gateway não reutiliza conexões porque o backend encerra keep-alive cedo. A correção alinha idle timeouts, habilita pooling, amplia capacidade de saída e monitora portas livres. Aumentar apenas o timeout teria piorado a saturação."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - 401 apenas em uma região: a validação JWT usa cache de JWKS. Uma região não atualizou a chave após rotação por falha de egress ao IdP. O token é válido, mas o gateway não encontra o kid. A solução corrige conectividade, invalida o cache com segurança e adiciona alerta de refresh de JWKS."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - 504 com backend concluindo a operação: o cliente expira em 5 segundos, o gateway em 30 e o backend em 25. O pagamento é executado, mas o cliente repete. A correção introduz prazo propagado, chave de idempotência, consulta de estado e alinhamento de timeouts."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Casos reais são resolvidos ao localizar a fronteira entre sucesso e falha.",
    "headers": [
      "Caso",
      "Última evidência de sucesso",
      "Causa raiz"
    ],
    "rows": [
      [
        "502 pós-rotação",
        "Gateway recebeu request e iniciou TLS backend.",
        "Cadeia de confiança incompleta."
      ],
      [
        "Timeout no pico",
        "SYNs saem, mas portas disponíveis caem.",
        "Esgotamento de SNAT por falta de reuso."
      ],
      [
        "401 regional",
        "Token assinado com kid novo.",
        "Cache JWKS não atualizado por egress."
      ],
      [
        "504 com efeito realizado",
        "Backend confirma transação após cliente desistir.",
        "Prazos desalinhados e ausência de idempotência."
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
    "text": "Troubleshooting de APIs e Gateways é um processo orientado por hipóteses, timeline e evidências. O investigador começa por impacto e escopo, confirma o caminho real da requisição e localiza a última etapa bem-sucedida. Essa abordagem reduz mudanças por tentativa e erro e melhora a comunicação entre equipes."
  },
  {
    "kind": "paragraph",
    "text": "DNS, TCP, TLS, HTTP, identidade, policies, backends, mensageria, Kubernetes e service mesh produzem sintomas próprios, mas interagem. Status codes e mensagens são pistas, não provas de causa. Logs, métricas, traces, capturas e audit logs precisam ser correlacionados por horário e identificadores seguros."
  },
  {
    "kind": "paragraph",
    "text": "A operação madura preserva evidências, contém o impacto, valida correções e transforma incidentes em melhorias. Runbooks, testes sintéticos, alertas de expiração, diff de configuração, observabilidade e automação reduzem MTTR e recorrência sem comprometer segurança ou integridade."
  },
  {
    "kind": "paragraph",
    "text": "Próximo passo do curso O Capítulo 39 estudará casos reais de grandes empresas, aplicando os fundamentos de arquitetura, segurança, resiliência e troubleshooting a decisões e incidentes conhecidos do mercado."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist de troubleshooting",
    "id": "checklist-de-troubleshooting"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Impacto, escopo, ambiente, região, consumidor e operação estão definidos.",
      "Horários usam fuso explícito e os relógios dos componentes estão sincronizados.",
      "Último sucesso conhecido, primeira falha e mudanças correlacionadas foram registrados.",
      "O caminho real da requisição e os pontos de terminação TLS foram confirmados.",
      "DNS, IP, porta, protocolo, SNI, Host e backend selecionado estão documentados.",
      "Request ID, trace ID, gateway transaction ID e identificador de negócio foram correlacionados.",
      "O componente que produziu o status ou erro foi identificado.",
      "Policies, rotas, transformações, limites, cache, retries e timeouts foram avaliados.",
      "Backends, bancos, filas e terceiros possuem evidências do mesmo intervalo.",
      "Coletas evitam segredos e dados pessoais desnecessários.",
      "A mitigação foi validada por jornada completa e não apenas por health check.",
      "Causa raiz, condições contribuidoras e ações preventivas possuem owner e prazo."
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
      "Transforme o relato \"a API está fora\" em cinco perguntas objetivas de triagem.",
      "Explique como distinguir connect timeout, read timeout e 504.",
      "Descreva uma investigação de 401 causado por rotação de chave JWT.",
      "Mostre como identificar se um 502 foi produzido pelo gateway ou pelo backend.",
      "Proponha evidências para confirmar esgotamento de SNAT.",
      "Defina um orçamento de timeout para cliente, gateway, backend e banco.",
      "Explique por que aumentar retries pode piorar um incidente.",
      "Crie um runbook para certificado mTLS próximo da expiração.",
      "Descreva como investigar um Service Kubernetes sem endpoints prontos.",
      "Escreva uma timeline resumida para um incidente iniciado após mudança de policy."
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
    "caption": "Tabela 7 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Baseline",
        "Estado conhecido usado para comparação de configuração e comportamento."
      ],
      [
        "Blast radius",
        "Escopo afetado por uma falha, mudança ou ação operacional."
      ],
      [
        "Connect timeout",
        "Prazo excedido antes do estabelecimento da conexão."
      ],
      [
        "Correlation ID",
        "Identificador usado para relacionar eventos da mesma transação."
      ],
      [
        "First byte",
        "Momento em que o primeiro byte da resposta é recebido."
      ],
      [
        "Hypothesis",
        "Explicação testável para um sintoma observado."
      ],
      [
        "Mitigation",
        "Ação temporária para reduzir impacto antes da correção definitiva."
      ],
      [
        "Read timeout",
        "Prazo excedido aguardando dados após a conexão estar estabelecida."
      ],
      [
        "Root cause",
        "Condição fundamental cuja remoção evita a recorrência do incidente."
      ],
      [
        "Runbook",
        "Procedimento operacional com critérios, passos, validação e rollback."
      ],
      [
        "SNAT exhaustion",
        "Esgotamento de portas ou recursos de tradução de origem."
      ],
      [
        "Synthetic test",
        "Jornada automatizada executada periodicamente para validar o serviço."
      ],
      [
        "Timeline",
        "Sequência temporal de fatos, mudanças, sintomas e ações."
      ],
      [
        "Trace ID",
        "Identificador compartilhado pelos spans de uma transação distribuída."
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
      "IETF. RFC 9112 - HTTP/1.1.",
      "IETF. RFC 9113 - HTTP/2.",
      "IETF. RFC 9114 - HTTP/3.",
      "IETF. RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3.",
      "IETF. RFC 9209 - The Proxy-Status HTTP Response Header Field.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "W3C. Trace Context Recommendation.",
      "OpenTelemetry. Specifications, Collector and Semantic Conventions.",
      "NIST. SP 800-115 - Technical Guide to Information Security Testing and Assessment.",
      "Kubernetes Documentation. Debugging Services, Pods and networking.",
      "Axway Documentation. API Gateway monitoring, tracing and administration.",
      "Microsoft Learn. Azure API Management diagnostics and troubleshooting."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Nota de atualização Comandos, telas, métricas e capacidades de gateways, meshes e serviços gerenciados variam por versão. Antes de executar procedimentos em produção, valide a documentação oficial da versão implantada, os runbooks internos e as autorizações necessárias."
  }
];
