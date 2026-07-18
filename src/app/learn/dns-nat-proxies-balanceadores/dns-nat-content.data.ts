import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.
export const DNS_NAT_PT_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Nos capítulos anteriores, estudamos como uma aplicação produz uma requisição, como TCP ou UDP transportam dados entre processos e como IPv4 ou IPv6 identificam interfaces e permitem que roteadores escolham um caminho. Este capítulo adiciona os componentes que tornam uma arquitetura corporativa utilizável em escala: o DNS transforma nomes estáveis em destinos mutáveis; o NAT traduz identidades de rede; proxies dividem uma comunicação em conexões independentes; e balanceadores selecionam uma instância entre várias possibilidades."
  },
  {
    "kind": "paragraph",
    "text": "Esses mecanismos são frequentemente desenhados em um único diagrama como caixas consecutivas, mas possuem responsabilidades diferentes. DNS normalmente participa antes da conexão. NAT altera campos de pacotes e mantém estado de tradução. Um proxy encerra uma conexão e cria outra, podendo interpretar o protocolo de aplicação. Um balanceador aplica uma estratégia de seleção sobre um conjunto de destinos. Um mesmo produto pode executar várias dessas funções, o que torna indispensável distinguir o conceito da implementação."
  },
  {
    "kind": "paragraph",
    "text": "Em ambientes de API Gateway, erros atribuídos à aplicação frequentemente surgem antes da política ser executada. Um registro privado pode não estar visível ao runtime; uma resposta DNS pode permanecer em cache; um pool pode considerar uma instância saudável por um teste superficial; um proxy pode substituir o Host; um balanceador pode terminar TLS com um certificado diferente; ou um SNAT pode usar uma origem não prevista pela allowlist do backend. O sintoma final pode ser timeout, 502, 503, falha de certificado ou comportamento intermitente."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo deste capítulo é fornecer um modelo mental ponta a ponta. Ao final, o leitor deverá saber localizar onde uma decisão foi tomada, quais dados foram alterados e quais evidências devem ser coletadas em cada etapa. O foco não é decorar produtos, e sim entender princípios que se aplicam a Axway API Gateway, Azure API Management, NGINX, HAProxy, Envoy, appliances de rede, ingress controllers e serviços gerenciados de nuvem."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Nome, endereço, conexão, mensagem HTTP e instância de backend são objetos diferentes. Um diagnóstico confiável registra a transformação entre eles em cada salto."
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
      "Explicar a hierarquia do DNS, zonas, delegações e os papéis de stub resolver, resolvedor recursivo e servidor autoritativo.",
      "Interpretar consultas, respostas, códigos, flags e os principais tipos de resource record usados em APIs.",
      "Relacionar TTL, cache positivo, cache negativo e mudanças de DNS ao comportamento real dos clientes.",
      "Compreender por que DNS utiliza UDP e TCP, o papel de EDNS(0) e o impacto de bloqueios seletivos.",
      "Projetar DNS público, privado e split-horizon para gateways, private endpoints e ambientes híbridos.",
      "Diferenciar DNSSEC, DoT, DoH e TSIG, incluindo o que cada mecanismo protege e o que não protege.",
      "Aprofundar Basic NAT, NAPT/PAT, SNAT, DNAT, hairpin NAT, timeouts e esgotamento de portas.",
      "Distinguir forward proxy, reverse proxy, gateway HTTP e túnel conforme a semântica do HTTP.",
      "Comparar TLS pass-through, offload, re-encryption e mTLS quando existem intermediários.",
      "Diferenciar balanceamento L4, L7 e baseado em DNS, além de algoritmos de seleção e afinidade.",
      "Projetar health checks, readiness, drenagem, slow start e failover sem produzir falsos positivos.",
      "Aplicar os conceitos a Axway API Gateway e aos serviços Azure usados em arquiteturas de APIs.",
      "Diagnosticar falhas de resolução, 502/503, origem inesperada, distribuição desigual e esgotamento de SNAT."
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
      "4.1 Quatro decisões diferentes no caminho de uma API",
      "4.2 Arquitetura e hierarquia do DNS",
      "4.3 Zonas, delegações e autoridade",
      "4.4 Resolução recursiva e iterativa",
      "4.5 Mensagens DNS e resource records",
      "4.6 TTL, caching e propagação",
      "4.7 UDP, TCP, EDNS e DNS criptografado",
      "4.8 DNS privado, split-horizon e service discovery",
      "4.9 Disponibilidade e balanceamento baseado em DNS",
      "4.10 Segurança do DNS e DNSSEC",
      "4.11 NAT em profundidade",
      "4.12 SNAT, DNAT, hairpin e CGNAT",
      "4.13 NAT em gateways e nuvem",
      "4.14 Intermediários HTTP",
      "4.15 Forward proxy, reverse proxy, gateway e túnel",
      "4.16 Camada 4, camada 7 e terminação TLS",
      "4.17 Host, SNI, URL e cabeçalhos encaminhados",
      "4.18 Fundamentos de load balancing",
      "4.19 Algoritmos de seleção",
      "4.20 Health checks e ciclo de vida",
      "4.21 Afinidade, estado e connection pooling",
      "4.22 Arquitetura com múltiplas camadas",
      "4.23 Aplicação em Axway e Azure",
      "4.24 Troubleshooting",
      "4.25 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.1 Quatro decisões diferentes no caminho de uma API",
    "id": "4-1-quatro-decisoes-diferentes-no-caminho-de-uma-api"
  },
  {
    "kind": "paragraph",
    "text": "Quando uma aplicação chama https://api.empresa.com/clientes, a primeira decisão é de resolução: qual endereço ou serviço corresponde ao nome api.empresa.com? Essa decisão é realizada pelo sistema de resolução de nomes, normalmente DNS, e pode produzir um endereço IPv4, IPv6, uma cadeia de aliases ou informações adicionais de serviço. O resultado pode depender do ambiente, da localização do resolvedor, do cache e de políticas de tráfego global."
  },
  {
    "kind": "paragraph",
    "text": "A segunda decisão é de tradução. Ao atravessar um NAT, os endereços e eventualmente as portas do fluxo são substituídos. O destino pode observar o IP de um firewall, gateway de nuvem ou pool de SNAT, e não o IP original da aplicação. Essa tradução é uma operação de rede orientada por estado e não equivale a proxy HTTP, embora os dois mecanismos possam existir no mesmo equipamento."
  },
  {
    "kind": "paragraph",
    "text": "A terceira decisão é de intermediação. Um reverse proxy recebe uma conexão do cliente, interpreta ou encaminha a mensagem e cria outra conexão para o upstream. A partir desse ponto existem duas relações de transporte independentes: cliente-proxy e proxy-backend. Timeouts, versões de HTTP, certificados, keep-alive e endereços de origem podem ser diferentes em cada trecho."
  },
  {
    "kind": "paragraph",
    "text": "A quarta decisão é de seleção de instância. Quando existem múltiplos destinos elegíveis, um balanceador escolhe qual receberá o fluxo ou requisição. A escolha depende do algoritmo, dos pesos, do estado de saúde, de afinidade e de políticas de localidade. DNS, proxy e API Gateway também podem fazer algum tipo de distribuição, mas o momento e a granularidade da escolha são diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Responsabilidades que devem ser analisadas separadamente.",
    "headers": [
      "Mecanismo",
      "Entrada principal",
      "Decisão ou transformação",
      "Evidência típica"
    ],
    "rows": [
      [
        "DNS",
        "Nome e tipo de registro",
        "Retorna dados de resolução",
        "dig, nslookup, Resolve-DnsName"
      ],
      [
        "NAT",
        "Fluxo IP/porta",
        "Traduz origem ou destino",
        "Tabela NAT, captura, flow logs"
      ],
      [
        "Proxy",
        "Conexão e protocolo",
        "Termina e recria comunicação",
        "Access log, upstream log, headers"
      ],
      [
        "Load balancer",
        "Pool elegível",
        "Seleciona destino",
        "Health, algoritmo, backend metrics"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.2 Arquitetura e hierarquia do DNS",
    "id": "4-2-arquitetura-e-hierarquia-do-dns"
  },
  {
    "kind": "paragraph",
    "text": "O Domain Name System foi projetado como uma base de dados distribuída e hierárquica. Em vez de manter uma tabela central contendo todos os nomes da Internet, o espaço de nomes é organizado como uma árvore invertida. O topo é a raiz, representada por um ponto. Abaixo dela estão domínios de primeiro nível, como com, org e br. Cada ramo pode ser delegado a organizações diferentes, que passam a administrar as zonas correspondentes."
  },
  {
    "kind": "paragraph",
    "text": "Um nome totalmente qualificado, ou FQDN, é formado por labels separadas por pontos. Em api.pagamentos.empresa.com., api, pagamentos, empresa e com são labels, e o ponto final explicita a raiz. Interfaces e ferramentas frequentemente omitem esse ponto final, mas a distinção entre nome absoluto e nome relativo importa em arquivos de zona e em configurações que acrescentam sufixos de pesquisa."
  },
  {
    "kind": "paragraph",
    "text": "A hierarquia fornece escalabilidade administrativa. A organização responsável por com não precisa conhecer os endereços de api.empresa.com; ela precisa indicar quais servidores são autoritativos por empresa.com. Da mesma forma, a zona empresa.com pode delegar pagamentos.empresa.com a outra equipe. A resolução percorre essas referências até alcançar uma autoridade capaz de responder sobre o nome consultado."
  },
  {
    "kind": "paragraph",
    "text": "O DNS não é apenas uma lista nome-IP. Ele armazena conjuntos tipados de dados chamados resource record sets. Um nome pode possuir registros A, AAAA, TXT, MX, CAA e outros. A resposta correta depende do nome, da classe e do tipo solicitado. Esse modelo explica por que um nome pode existir e ainda assim não possuir o tipo de registro pedido."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-01-dns-hierarchy.svg",
    "alt": "Árvore hierárquica do DNS com raiz, TLDs, zonas e delegações",
    "caption": "Figura 1 - A autoridade é distribuída por zonas e delegações na árvore DNS."
  },
  {
    "kind": "subhead",
    "text": "Nome absoluto"
  },
  {
    "kind": "paragraph",
    "text": "Em configurações de DNS, api.empresa.com e api.empresa.com. podem ser interpretados de forma diferente. O ponto final indica que o nome já está completo e não deve receber o sufixo da zona atual."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.3 Zonas, delegações e autoridade",
    "id": "4-3-zonas-delegacoes-e-autoridade"
  },
  {
    "kind": "paragraph",
    "text": "Uma zona DNS é a porção do espaço de nomes administrada como uma unidade. Zona e domínio não são sinônimos perfeitos: um domínio pode conter subdomínios delegados que pertencem a outras zonas. A zona empresa.com, por exemplo, pode conter registros de api.empresa.com e delegar parceiros.empresa.com. Após a delegação, os registros internos de parceiros passam a ser mantidos nos servidores indicados para a nova zona."
  },
  {
    "kind": "paragraph",
    "text": "A delegação é publicada por registros NS no lado pai. Dependendo da posição dos próprios servidores de nomes, registros adicionais chamados glue podem ser necessários para evitar dependência circular. Se empresa.com é atendido por ns1.empresa.com, o pai com precisa fornecer o endereço de ns1.empresa.com junto à referência, caso contrário o resolvedor precisaria consultar a própria zona antes de saber como alcançá-la."
  },
  {
    "kind": "paragraph",
    "text": "O registro SOA descreve propriedades administrativas da zona, como servidor principal, contato, número serial e temporizadores relacionados à transferência e ao cache negativo. O serial é usado por servidores secundários para detectar alterações. O desenho de alta disponibilidade normalmente publica múltiplos servidores autoritativos em redes e localidades independentes, frequentemente usando anycast para distribuir consultas."
  },
  {
    "kind": "paragraph",
    "text": "Uma resposta autoritativa significa que o servidor responde com base na zona pela qual possui autoridade, não apenas com base em cache. A flag AA da mensagem DNS indica essa condição em respostas apropriadas. Em troubleshooting, perguntar a um resolvedor recursivo e perguntar diretamente a cada autoritativo são testes diferentes: o primeiro revela a experiência do cliente; o segundo ajuda a identificar divergência entre servidores e propagação de zona."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Componentes de autoridade e delegação.",
    "headers": [
      "Elemento",
      "Função",
      "Falha típica"
    ],
    "rows": [
      [
        "Zona",
        "Unidade administrativa de dados DNS",
        "Registro criado na zona errada"
      ],
      [
        "Delegação NS",
        "Indica autoridade da zona filha",
        "NS inconsistente ou indisponível"
      ],
      [
        "Glue",
        "Fornece endereço para nameserver dentro da zona delegada",
        "Dependência circular de resolução"
      ],
      [
        "SOA serial",
        "Versiona o conteúdo da zona",
        "Secundário não detecta atualização"
      ],
      [
        "Servidor autoritativo",
        "Responde pelos dados da zona",
        "Respostas divergentes entre réplicas"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.4 Resolução recursiva e iterativa",
    "id": "4-4-resolucao-recursiva-e-iterativa"
  },
  {
    "kind": "paragraph",
    "text": "A aplicação normalmente não percorre a hierarquia DNS diretamente. Ela utiliza um stub resolver do sistema operacional, que envia uma consulta ao resolvedor recursivo configurado pela rede. O stub pede uma resposta final e costuma ativar a flag RD, recursion desired. O resolvedor recursivo consulta seu cache e, quando necessário, realiza as etapas para obter a resposta em nome do cliente."
  },
  {
    "kind": "paragraph",
    "text": "Na resolução iterativa, servidores intermediários retornam a melhor informação que possuem, geralmente uma referência aos servidores da próxima zona. O recursivo começa por uma raiz, recebe referência ao TLD, consulta o TLD, recebe referência ao autoritativo e então consulta a zona final. O resultado é armazenado em cache conforme os TTLs dos RRsets recebidos."
  },
  {
    "kind": "paragraph",
    "text": "O caminho exato pode ser mais complexo por causa de CNAMEs, delegações, registros adicionais e validação DNSSEC. Um CNAME instrui que o nome consultado é um alias de outro nome; o resolvedor precisa continuar a resolução até obter o tipo final. Cada elo possui TTL próprio e pode apontar a uma zona administrada por outra organização ou provedor de tráfego."
  },
  {
    "kind": "paragraph",
    "text": "Em redes corporativas, o recursivo pode atuar como forwarder e encaminhar consultas a outro resolvedor em vez de percorrer a hierarquia pública. Essa cadeia é comum em filiais, VPNs e ambientes de nuvem. Ela também cria dependências: uma regra de encaminhamento condicional incorreta pode fazer nomes privados seguirem para a Internet ou criar loops entre servidores DNS."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-02-recursive-resolution.svg",
    "alt": "Sequência de resolução DNS entre aplicação, resolvedor recursivo, raiz, TLD e servidor autoritativo",
    "caption": "Figura 2 - Exemplo simplificado de resolução recursiva com consultas iterativas."
  },
  {
    "kind": "subhead",
    "text": "Comandos de observação - execute apenas em ambientes autorizados"
  },
  {
    "kind": "code",
    "text": "# Linux / macOS\ndig api.empresa.com A\ndig api.empresa.com AAAA\ndig +trace api.empresa.com\ndig @ns1.exemplo.net api.empresa.com A +norecurse"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nResolve-DnsName api.empresa.com -Type A\nResolve-DnsName api.empresa.com -Type AAAA\nResolve-DnsName api.empresa.com -Server 10.0.0.10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.5 Mensagens DNS e resource records",
    "id": "4-5-mensagens-dns-e-resource-records"
  },
  {
    "kind": "paragraph",
    "text": "A mensagem DNS possui cabeçalho e quatro seções lógicas: Question, Answer, Authority e Additional. O cabeçalho inclui identificador, flags e contadores de registros. Entre as flags relevantes estão QR, que distingue consulta e resposta; RD e RA, relacionadas à recursão; AA, que indica resposta autoritativa; TC, que sinaliza truncamento; e o código de resposta, como NOERROR, NXDOMAIN ou SERVFAIL."
  },
  {
    "kind": "paragraph",
    "text": "Os dados são transportados como resource records. Um RR contém nome, tipo, classe, TTL e dados específicos. Registros com mesmo nome, tipo e classe formam um RRset e devem ser tratados como conjunto. Essa ideia é importante em DNSSEC e em múltiplos registros A ou AAAA: a ordem apresentada não deve ser confundida com garantia de seleção ou afinidade."
  },
  {
    "kind": "paragraph",
    "text": "A e AAAA associam nomes a endereços IPv4 e IPv6. CNAME cria alias para outro nome e possui restrições de coexistência com outros dados no mesmo nó. NS informa servidores autoritativos. SOA descreve a zona. PTR é usado em resolução reversa. MX direciona correio. TXT transporta texto estruturado por diferentes protocolos. SRV permite descobrir host e porta de um serviço, enquanto CAA informa quais autoridades certificadoras podem emitir certificados para o domínio."
  },
  {
    "kind": "paragraph",
    "text": "APIs modernas também podem encontrar registros SVCB e HTTPS, que permitem anunciar propriedades de um serviço, alternativas e parâmetros de conexão. O suporte depende do cliente e da plataforma; por isso, esses registros não substituem automaticamente A, AAAA ou a configuração de reverse proxies. O arquiteto deve separar a existência do padrão da capacidade efetivamente implantada no ambiente."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Resource records frequentes em ambientes corporativos.",
    "headers": [
      "Tipo",
      "Dados principais",
      "Uso em arquitetura de APIs"
    ],
    "rows": [
      [
        "A",
        "Endereço IPv4",
        "Endpoint público ou privado"
      ],
      [
        "AAAA",
        "Endereço IPv6",
        "Dual stack e acesso IPv6"
      ],
      [
        "CNAME",
        "Nome canônico",
        "Alias para front door, CDN ou serviço gerenciado"
      ],
      [
        "NS",
        "Servidor de nomes",
        "Delegação da zona"
      ],
      [
        "SOA",
        "Metadados da zona",
        "Serial e parâmetros administrativos"
      ],
      [
        "PTR",
        "Nome associado ao IP",
        "Resolução reversa e auditoria"
      ],
      [
        "SRV",
        "Prioridade, peso, porta e alvo",
        "Service discovery em protocolos compatíveis"
      ],
      [
        "CAA",
        "CA autorizada",
        "Governança de emissão de certificados"
      ],
      [
        "TXT",
        "Texto arbitrário",
        "Verificações de domínio e políticas"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Arquivo de zona didático com blocos de documentação"
  },
  {
    "kind": "code",
    "text": "; Exemplo didático de zona\n$ORIGIN empresa.com.\n$TTL 300\n@       IN SOA ns1.empresa.com. dnsadmin.empresa.com. (\n            2026071501  ; serial\n            3600        ; refresh\n            600         ; retry\n            1209600     ; expire\n            300 )       ; negative cache\n        IN NS  ns1.empresa.com.\n        IN NS  ns2.empresa.com.\napi     IN A   198.51.100.25\napi     IN AAAA 2001:db8:20::25\nstatus  IN CNAME api.empresa.com."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.6 TTL, caching e o significado de propagação",
    "id": "4-6-ttl-caching-e-o-significado-de-propagacao"
  },
  {
    "kind": "paragraph",
    "text": "O TTL de um resource record informa por quanto tempo o dado pode permanecer em cache. Quando um resolvedor recebe um RRset com TTL 300, ele pode reutilizá-lo por cinco minutos sem consultar novamente a autoridade. O valor diminui no cache e a entrada expira ao chegar a zero. O autoritativo não envia notificações a todos os caches quando o registro muda; por isso, clientes diferentes podem observar respostas antigas até que suas entradas expirem."
  },
  {
    "kind": "paragraph",
    "text": "A expressão propagação DNS é usada de forma informal, mas pode ocultar fenômenos distintos: transferência de zona entre autoritativos, atualização de servidores de um provedor, expiração de caches recursivos, cache do sistema operacional, cache da aplicação e até connection pooling para o endereço antigo. Alterar o registro no painel e confirmar o novo valor no autoritativo não garante que uma aplicação com cache ou conexão persistente o utilize imediatamente."
  },
  {
    "kind": "paragraph",
    "text": "TTL baixo reduz o período potencial de dados antigos e é útil antes de migrações, mas aumenta consultas, dependência do DNS e carga operacional. Além disso, alguns componentes aplicam valores mínimos, máximos ou estratégias próprias de refresh. Para uma mudança planejada, o TTL deve ser reduzido com antecedência suficiente para que o valor anterior expire nos caches antes do corte."
  },
  {
    "kind": "paragraph",
    "text": "O cache negativo armazena conhecimento de que um nome não existe, representado por NXDOMAIN, ou de que o nome existe mas não possui o tipo solicitado, frequentemente chamado NODATA. Essa otimização reduz consultas repetidas, mas surpreende equipes que criam um registro logo após uma resposta negativa. O tempo de cache negativo é derivado das informações da zona conforme as regras atuais do DNS."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-03-ttl-cache.svg",
    "alt": "Linha do tempo de TTL com cache positivo, cache negativo, expiração e nova resolução",
    "caption": "Figura 3 - O cache permanece válido até o TTL expirar, inclusive para respostas negativas."
  },
  {
    "kind": "subhead",
    "text": "Mudança segura de endpoint"
  },
  {
    "kind": "paragraph",
    "text": "Antes de trocar um endereço, reduza o TTL, aguarde o TTL antigo expirar, valide o novo destino, execute o corte e mantenha o destino anterior disponível durante a janela de transição quando possível."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.7 UDP, TCP, EDNS e DNS criptografado",
    "id": "4-7-udp-tcp-edns-e-dns-criptografado"
  },
  {
    "kind": "paragraph",
    "text": "Consultas DNS clássicas utilizam a porta 53 tanto sobre UDP quanto sobre TCP. UDP possui menor custo por não estabelecer conexão e atende grande parte das consultas. Entretanto, DNS sobre TCP não é apenas um mecanismo de transferência de zona: implementações precisam suportá-lo para respostas grandes, truncadas e cenários modernos. Um firewall que libera UDP/53 e bloqueia TCP/53 pode criar falhas seletivas difíceis de reproduzir."
  },
  {
    "kind": "paragraph",
    "text": "No formato original, uma mensagem UDP DNS possuía limite prático pequeno. EDNS(0) adiciona um pseudo-registro OPT pelo qual o solicitante anuncia recursos e o tamanho de payload UDP que consegue receber. Valores exagerados podem causar fragmentação IP; valores adequados procuram equilibrar eficiência e confiabilidade. Quando a resposta não cabe, o servidor pode definir a flag TC e o cliente tenta novamente por TCP."
  },
  {
    "kind": "paragraph",
    "text": "DNS over TLS, normalmente associado à porta 853, e DNS over HTTPS, transportado em HTTPS, protegem o canal entre cliente e resolvedor contra observação ou alteração no percurso. Eles não transformam o resolvedor em autoridade confiável por si mesmos e não fornecem autenticação criptográfica dos dados de zona como DNSSEC. A organização precisa avaliar privacidade, governança, filtragem e observabilidade ao permitir resolvers externos ou DoH embutido em aplicações."
  },
  {
    "kind": "paragraph",
    "text": "Em redes corporativas, interceptar ou bloquear DoH sem uma estratégia pode quebrar aplicações, enquanto liberá-lo indiscriminadamente pode contornar DNS privado, logging e políticas de segurança. O objetivo arquitetural deve ser oferecer resolvedores corporativos confiáveis, redundantes e compatíveis com os mecanismos necessários, além de controlar explicitamente quais canais alternativos são permitidos."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-04-dns-transports.svg",
    "alt": "Comparação dos transportes DNS UDP, TCP, EDNS, DNS over TLS e DNS over HTTPS",
    "caption": "Figura 4 - DNS possui múltiplos transportes; cada um resolve um problema diferente."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Falhas relacionadas ao transporte DNS.",
    "headers": [
      "Sintoma",
      "Possível causa",
      "Teste"
    ],
    "rows": [
      [
        "Consultas simples funcionam, DNSSEC falha",
        "EDNS ou respostas grandes filtradas",
        "dig +dnssec e captura"
      ],
      [
        "UDP funciona, resposta grande falha",
        "TCP/53 bloqueado após TC=1",
        "dig +tcp"
      ],
      [
        "Aplicação ignora DNS privado",
        "DoH próprio ou resolver externo",
        "Verificar destino DNS da aplicação"
      ],
      [
        "Timeout somente em uma filial",
        "Fragmentação/MTU ou firewall DNS",
        "Comparar payload EDNS e caminho"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.8 DNS privado, split-horizon e service discovery",
    "id": "4-8-dns-privado-split-horizon-e-service-discovery"
  },
  {
    "kind": "paragraph",
    "text": "DNS privado publica nomes que somente determinados ambientes devem resolver, como redes corporativas, VNets, clusters e datacenters. O acesso depende de quais resolvedores e zonas estão visíveis à origem. Um private endpoint sem integração DNS adequada pode existir e ainda ser inutilizável: a aplicação continuará resolvendo o nome para o endpoint público ou receberá NXDOMAIN."
  },
  {
    "kind": "paragraph",
    "text": "No split-horizon, o mesmo nome retorna respostas diferentes conforme o caminho de resolução. Um cliente externo pode receber o endereço do WAF público, enquanto o gateway interno recebe o endereço privado do backend. Essa técnica preserva nomes consistentes, certificados e URLs, mas exige disciplina para evitar divergências silenciosas entre zonas pública e privada."
  },
  {
    "kind": "paragraph",
    "text": "Encaminhamento condicional direciona consultas de certos sufixos a resolvers específicos. Em ambiente híbrido, a VNet pode encaminhar corp.empresa para o datacenter, enquanto o datacenter encaminha privatelink ou zonas de nuvem ao resolver correspondente. Regras simétricas mal planejadas podem criar loops, e regras ausentes podem vazar nomes internos para resolvers públicos."
  },
  {
    "kind": "paragraph",
    "text": "Service discovery em Kubernetes e service meshes também utiliza nomes e registros, mas os ciclos de vida são mais dinâmicos. Um serviço pode resolver para um ClusterIP virtual, uma lista de pods ou um endpoint de proxy. O TTL curto e o comportamento de cache do cliente tornam-se decisivos. Bibliotecas que resolvem uma vez no startup não acompanham mudanças, enquanto proxies como Envoy podem consumir APIs de descoberta e possuir visão explícita dos endpoints."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-05-split-horizon.svg",
    "alt": "Split-horizon DNS direcionando o mesmo nome para endpoints público e privado",
    "caption": "Figura 5 - O mesmo FQDN pode direcionar clientes públicos e privados a endpoints diferentes."
  },
  {
    "kind": "subhead",
    "text": "Private endpoint não é DNS"
  },
  {
    "kind": "paragraph",
    "text": "O endpoint fornece conectividade privada. A aplicação ainda precisa resolver o nome para o endereço privado, possuir rota e passar pelas políticas de rede e TLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.9 Disponibilidade e balanceamento baseado em DNS",
    "id": "4-9-disponibilidade-e-balanceamento-baseado-em-dns"
  },
  {
    "kind": "paragraph",
    "text": "O DNS pode retornar múltiplos endereços ou escolher respostas com base em políticas de prioridade, peso, localização, desempenho e saúde. Essa técnica é usada para distribuição global e failover entre regiões. A decisão ocorre na resolução; depois dela, o cliente conecta diretamente ao endpoint retornado. Portanto, o serviço DNS não observa necessariamente a conexão ou a requisição da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "O comportamento depende do resolvedor recursivo. Políticas geográficas podem enxergar o endereço do resolvedor, que pode estar distante do usuário real. O TTL controla por quanto tempo a decisão permanece em cache. Durante uma falha, clientes com resposta antiga podem continuar tentando o endpoint indisponível até que o cache expire ou a aplicação implemente fallback próprio."
  },
  {
    "kind": "paragraph",
    "text": "Múltiplos registros A ou AAAA não constituem, isoladamente, um balanceador com health checking. A ordem pode variar e clientes podem escolher apenas o primeiro endereço. Retirar um registro não encerra conexões existentes e não remove a entrada de todos os caches imediatamente. DNS-based load balancing deve ser combinado com endpoints resilientes e monitoramento compatível com a janela de cache."
  },
  {
    "kind": "paragraph",
    "text": "Anycast é outra técnica usada por infraestrutura DNS e serviços globais. O mesmo endereço é anunciado em múltiplas localidades e o roteamento da Internet conduz o cliente a uma instância próxima conforme a topologia BGP. Anycast não é round robin de DNS: a resposta pode conter um único IP, enquanto a distribuição ocorre na camada de roteamento."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Formas diferentes de distribuição global.",
    "headers": [
      "Estratégia",
      "Momento da decisão",
      "Vantagem",
      "Limitação"
    ],
    "rows": [
      [
        "Múltiplos A/AAAA",
        "No cliente/resolvedor",
        "Simplicidade",
        "Saúde e escolha variam por cliente"
      ],
      [
        "GSLB por DNS",
        "Durante resolução",
        "Distribuição global e failover",
        "TTL e visão do resolver"
      ],
      [
        "Anycast",
        "Roteamento IP",
        "Endpoint global com proximidade",
        "Depende de anúncios e convergência"
      ],
      [
        "Reverse proxy global",
        "A cada conexão/requisição",
        "Controle L7, WAF e TLS",
        "Tráfego passa pelo serviço"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.10 Segurança do DNS e DNSSEC",
    "id": "4-10-seguranca-do-dns-e-dnssec"
  },
  {
    "kind": "paragraph",
    "text": "O DNS clássico foi criado em um ambiente com pressupostos de confiança diferentes dos atuais. Ataques podem explorar respostas forjadas, cache poisoning, servidores comprometidos, sequestro de configuração do resolver e registros administrativos alterados. Identificadores aleatórios, portas de origem imprevisíveis e validações adicionais aumentam a resistência, mas não fornecem prova criptográfica completa da origem dos dados."
  },
  {
    "kind": "paragraph",
    "text": "DNSSEC acrescenta autenticação de origem e integridade aos dados DNS por meio de assinaturas sobre RRsets e uma cadeia de confiança baseada em registros DS e DNSKEY. Um resolvedor validador consegue distinguir dados assinados válidos, respostas comprovadamente inexistentes e falhas de validação. DNSSEC não fornece confidencialidade: observadores ainda podem ver nomes e respostas em DNS tradicional."
  },
  {
    "kind": "paragraph",
    "text": "A validação depende de tempo, chaves, assinaturas e publicação correta. Uma rotação mal executada ou assinatura expirada pode transformar uma zona existente em SERVFAIL para clientes validadores. Por isso, DNSSEC exige monitoramento específico, sincronização de tempo e procedimentos de rollover. O benefício é reduzir a possibilidade de um intermediário apresentar dados adulterados como se fossem autoritativos."
  },
  {
    "kind": "paragraph",
    "text": "DNS over TLS e DNS over HTTPS protegem o transporte até o resolvedor, enquanto DNSSEC protege a autenticidade dos dados entre a zona assinada e o validador. TSIG, por sua vez, autentica transações entre participantes que compartilham uma chave, como transferências e atualizações dinâmicas. Esses mecanismos são complementares e não devem ser tratados como substitutos."
  },
  {
    "kind": "subhead",
    "text": "DNS rebinding"
  },
  {
    "kind": "paragraph",
    "text": "Aplicações que confiam apenas no nome recebido do usuário podem resolver inicialmente para um IP público e depois para um endereço interno. Controles de SSRF devem validar destinos efetivos, faixas, redirecionamentos e novas resoluções, não apenas a string do hostname."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.11 NAT em profundidade",
    "id": "4-11-nat-em-profundidade"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifica endereços em pacotes IP ao atravessar um dispositivo de borda. No Basic NAT, um endereço de um domínio é mapeado para outro endereço. No NAPT ou PAT, a tradução inclui identificadores de transporte, permitindo que várias conexões internas compartilhem um endereço externo por meio de portas diferentes. O dispositivo mantém estado para reverter a tradução no tráfego de retorno."
  },
  {
    "kind": "paragraph",
    "text": "Uma tradução altera campos cobertos por checksums. O NAT precisa ajustar os checksums de IP e transporte conforme o protocolo. Protocolos que carregam endereços ou portas dentro do payload podem exigir application-level gateways ou falhar, porque a tradução do cabeçalho não atualiza automaticamente dados internos. Criptografia que protege esses campos também limita a capacidade de tradução transparente."
  },
  {
    "kind": "paragraph",
    "text": "NAT não é firewall, embora frequentemente esteja no mesmo equipamento. O fato de uma conexão de entrada não possuir mapeamento não substitui política explícita de filtragem. Port forwarding e DNAT podem publicar serviços internos; conexões iniciadas de dentro criam estado; regras de firewall determinam o que deve ser permitido. Segurança deve ser modelada como política, não como efeito colateral do endereçamento."
  },
  {
    "kind": "paragraph",
    "text": "A presença de NAT quebra a transparência fim a fim do endereço. Logs do backend mostram a identidade traduzida, e protocolos que dependem do IP do cliente precisam de outro mecanismo. Em HTTP, proxies controlados podem inserir Forwarded ou X-Forwarded-For, mas esses cabeçalhos são metadados de aplicação e podem ser falsificados se a borda não remover valores enviados pelo consumidor."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-06-pat-state.svg",
    "alt": "Tabela de estado PAT traduzindo fluxos internos para portas públicas distintas",
    "caption": "Figura 6 - PAT permite que fluxos internos compartilhem um endereço externo por portas distintas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.12 SNAT, DNAT, hairpin NAT e CGNAT",
    "id": "4-12-snat-dnat-hairpin-nat-e-cgnat"
  },
  {
    "kind": "paragraph",
    "text": "Source NAT altera a origem do fluxo e é comum na saída para Internet ou para uma rede parceira. Destination NAT altera o destino e é usado para publicar um serviço interno atrás de um endereço virtual. Uma conexão pode atravessar ambos: o cliente alcança um VIP que sofre DNAT para o servidor, e o retorno pode sofrer SNAT para garantir simetria e ocultar a topologia interna."
  },
  {
    "kind": "paragraph",
    "text": "Hairpin NAT, também chamado NAT loopback, ocorre quando um cliente interno acessa o endereço externo de um serviço que também está na rede interna. O dispositivo precisa traduzir e conduzir o fluxo de volta para dentro. Sem suporte ou configuração correta, o cliente pode resolver o nome público, enviar ao firewall e receber retorno direto do servidor, quebrando o estado esperado. Split DNS é frequentemente usado para evitar esse caminho."
  },
  {
    "kind": "paragraph",
    "text": "Carrier-Grade NAT permite que provedores compartilhem endereços IPv4 entre assinantes. Em arquiteturas B2B, isso reduz a utilidade de identificar um consumidor apenas pelo IP público. Vários clientes podem compartilhar o mesmo endereço e o conjunto pode mudar. Allowlist por IP pode continuar sendo requisito de conectividade, mas não deve ser a única autenticação de uma API sensível."
  },
  {
    "kind": "paragraph",
    "text": "Double NAT ocorre quando o fluxo atravessa traduções sucessivas, por exemplo, NAT local, CGNAT e NAT de nuvem. Cada estado possui seus próprios timeouts e limites de portas. Troubleshooting precisa registrar a origem observada em cada fronteira; presumir que o IP da estação chegará ao backend produz regras e auditorias incorretas."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Modalidades de tradução e seus impactos.",
    "headers": [
      "Tipo",
      "Campo alterado",
      "Uso frequente",
      "Risco operacional"
    ],
    "rows": [
      [
        "SNAT",
        "Origem",
        "Saída de gateway/API para backend",
        "Esgotamento de portas e allowlist"
      ],
      [
        "DNAT",
        "Destino",
        "VIP ou publicação de serviço",
        "Retorno assimétrico"
      ],
      [
        "PAT/NAPT",
        "IP e porta",
        "Compartilhar endereço externo",
        "Estado e timeout"
      ],
      [
        "Hairpin",
        "Tradução de retorno interno",
        "Acesso interno ao endereço externo",
        "Fluxo assimétrico"
      ],
      [
        "CGNAT",
        "Origem no provedor",
        "Compartilhar IPv4 entre assinantes",
        "IP não identifica cliente"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.13 NAT em API Gateways e ambientes de nuvem",
    "id": "4-13-nat-em-api-gateways-e-ambientes-de-nuvem"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway cria conexões outbound para backends. Dependendo do modo de rede, essas conexões podem sair por endereços próprios da instância, por um NAT Gateway, firewall, appliance ou conjunto de IPs gerenciados. O backend observa essa origem traduzida e precisa permitir todos os endereços possíveis. Escala, mudança de tier ou manutenção podem alterar a distribuição entre origens documentadas pela plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Esgotamento de SNAT ocorre quando muitas conexões concorrentes ou conexões curtas consomem as portas disponíveis para uma combinação de origem e destino. O problema é agravado quando connection pooling está desabilitado, timeouts mantêm estados por muito tempo ou um único IP de saída atende grande volume. Sintomas incluem falha intermitente de conexão, connect timeout e recuperação espontânea após estados expirarem."
  },
  {
    "kind": "paragraph",
    "text": "A solução não é apenas adicionar retries. Retentativas agressivas podem consumir ainda mais portas. O desenho deve reutilizar conexões, dimensionar endereços e portas de saída, distribuir destinos, ajustar timeouts com critério e monitorar utilização. Quando a plataforma oferece integração privada sem SNAT ou NAT Gateway com múltiplos IPs, a escolha deve considerar capacidade e previsibilidade de origem."
  },
  {
    "kind": "paragraph",
    "text": "Inbound private endpoint e outbound private connectivity são direções diferentes. Um private endpoint para o gateway permite que consumidores o alcancem privadamente; não garante que o gateway acesse backends por rede privada. Cada perna exige DNS, rota, firewall, identidade e TLS próprios."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico de SNAT"
  },
  {
    "kind": "paragraph",
    "text": "Colete número de conexões novas por segundo, conexões estabelecidas, TIME_WAIT, destinos, IPs de saída, erros de connect e métricas da plataforma. Um 502 no gateway pode ser consequência de falta de socket/porta antes de qualquer resposta do backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.14 Intermediários HTTP",
    "id": "4-14-intermediarios-http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP permite uma cadeia de intermediários. A RFC 9110 distingue formas comuns como proxy, gateway e tunnel. Na prática, o vocabulário de produtos varia, mas a pergunta técnica é estável: o componente interpreta mensagens HTTP e cria uma nova conexão, ou apenas encaminha bytes após estabelecer um túnel? A resposta determina quais políticas, logs e transformações são possíveis."
  },
  {
    "kind": "paragraph",
    "text": "Quando um intermediário termina HTTP, ele recebe uma mensagem completa ou um fluxo protocolar, aplica regras e envia outra mensagem ao próximo salto. Ele pode alterar Host, path, query, headers, codificação e versão de HTTP. O backend não observa diretamente o socket do consumidor; observa a conexão criada pelo intermediário. Essa separação explica por que o IP, certificado TLS e latência medidos no backend representam o proxy."
  },
  {
    "kind": "paragraph",
    "text": "Intermediários melhoram segurança e governança ao centralizar autenticação, WAF, rate limiting, roteamento e observabilidade. Ao mesmo tempo, adicionam filas, timeouts, buffers, limites de payload e pontos de falha. Cada camada deve possuir propósito claro. Empilhar CDN, WAF, Application Gateway, API Gateway, ingress e sidecar sem definir responsabilidades produz duplicidade de TLS, retries e regras contraditórias."
  },
  {
    "kind": "paragraph",
    "text": "Um proxy também modifica a semântica de falha. Se não consegue conectar ao upstream, pode retornar 502. Se o pool está indisponível, pode retornar 503. Se o upstream excede timeout, pode retornar 504. O código recebido pelo cliente pode ter sido criado pelo intermediário e não pela aplicação. Logs correlacionados por request ID são essenciais para localizar o emissor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.15 Forward proxy, reverse proxy, gateway e túnel",
    "id": "4-15-forward-proxy-reverse-proxy-gateway-e-tunel"
  },
  {
    "kind": "paragraph",
    "text": "O forward proxy representa clientes. Ele é configurado no sistema ou aplicação e recebe uma URI de destino. Empresas o utilizam para controle de saída, filtragem, inspeção e autenticação. Para HTTPS, o cliente pode usar o método CONNECT para solicitar um túnel TCP até o destino; nesse caso o proxy conhece host e porta, mas não necessariamente interpreta o HTTP criptografado. Em inspeção TLS corporativa, o proxy termina TLS e emite um certificado aceito pela CA instalada no cliente."
  },
  {
    "kind": "paragraph",
    "text": "O reverse proxy representa servidores. O cliente acredita estar conectando ao serviço final, mas a conexão termina no proxy, que escolhe um upstream. NGINX, HAProxy, Envoy, Application Gateway, Front Door e API Gateways podem atuar assim. O reverse proxy controla certificados, virtual hosts, roteamento por path, compressão, cache e proteção, desde que a camada de aplicação esteja visível."
  },
  {
    "kind": "paragraph",
    "text": "O termo gateway em HTTP descreve um intermediário que atua como origem para a conexão de entrada e traduz ou conecta a outro serviço. Um API Gateway amplia essa ideia com políticas de segurança, quotas, transformação e ciclo de vida de APIs. Ele pode receber REST/JSON e chamar SOAP, JMS ou outro HTTP, ocultando a implementação. O termo não deve ser confundido com gateway padrão de roteamento IP."
  },
  {
    "kind": "paragraph",
    "text": "Um túnel encaminha bytes sem interpretar o protocolo após sua criação. TLS pass-through em um balanceador L4 se aproxima desse modelo: o handshake TLS ocorre com o backend. A vantagem é preservar autenticação e criptografia ponta a ponta; a limitação é que o intermediário não consegue aplicar regras baseadas em método, path, JWT ou conteúdo HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-07-http-intermediaries.svg",
    "alt": "Comparação entre forward proxy, reverse proxy, gateway e túnel HTTP",
    "caption": "Figura 7 - Intermediários se diferenciam pela entidade representada e pelo nível de interpretação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.16 Camada 4, camada 7 e terminação TLS",
    "id": "4-16-camada-4-camada-7-e-terminacao-tls"
  },
  {
    "kind": "paragraph",
    "text": "Um balanceador ou proxy de camada 4 decide com base em informações de transporte, como endereço, porta e estado do fluxo. Ele pode encaminhar TCP ou UDP sem compreender a aplicação. Essa abordagem suporta protocolos variados e reduz acoplamento ao HTTP. Quando TLS permanece intacto, o certificado e a negociação pertencem ao backend, e o intermediário não consegue inspecionar paths ou headers."
  },
  {
    "kind": "paragraph",
    "text": "Na camada 7, o componente compreende o protocolo de aplicação. Em HTTP, pode rotear por Host, URL, método, cookie ou header; aplicar WAF; reescrever mensagens; e gerar respostas. Para isso, em HTTPS normalmente termina TLS. A conexão de backend pode ser HTTP, HTTPS ou mTLS, formando uma segunda sessão com parâmetros e confiança independentes."
  },
  {
    "kind": "paragraph",
    "text": "TLS offload remove criptografia no trecho interno e simplifica o backend, mas deixa dados em texto claro na rede após o proxy. Re-encryption mantém TLS nos dois trechos, porém não é TLS ponta a ponta: o proxy tem acesso ao conteúdo e apresenta sua própria identidade ao backend. Certificados, SNI, versões e cipher suites precisam ser configurados em ambos os lados."
  },
  {
    "kind": "paragraph",
    "text": "Quando o cliente usa mTLS com o proxy, o certificado do cliente não é automaticamente apresentado ao backend. O proxy pode autenticar o cliente e propagar atributos por headers ou tokens, desde que o backend confie exclusivamente nesse proxy e a conexão seja protegida. A RFC 9440 documenta headers padronizados para transportar informações de certificado em cenários de reverse proxy com terminação TLS, mas o modelo de confiança precisa ser explicitamente protegido."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-08-tls-modes.svg",
    "alt": "Comparação entre TLS pass-through, offload, re-encryption e mTLS na borda",
    "caption": "Figura 8 - Cada modo de TLS define fronteiras de confiança diferentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-09-l4-l7.svg",
    "alt": "Comparação entre balanceamento de camada 4 e camada 7",
    "caption": "Figura 9 - Camada 4 distribui fluxos; camada 7 pode tomar decisões sobre HTTP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.17 Host, SNI, URL e cabeçalhos encaminhados",
    "id": "4-17-host-sni-url-e-cabecalhos-encaminhados"
  },
  {
    "kind": "paragraph",
    "text": "Virtual hosting permite que vários serviços compartilhem um endereço. Antes de enviar HTTP sobre TLS, o cliente pode incluir SNI no ClientHello para indicar o hostname desejado, permitindo que o terminador TLS selecione certificado e configuração. Depois do handshake, o HTTP contém a autoridade da requisição, normalmente refletida no Host em HTTP/1.1 ou no pseudo-header :authority em HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "SNI e Host pertencem a camadas diferentes e podem divergir por erro ou ataque. O balanceador pode selecionar certificado por SNI e rota por Host. Configurações devem validar combinações permitidas para evitar encaminhamento indevido. Quando o proxy chama o backend por hostname diferente, precisa decidir se preserva o Host original ou usa o nome do upstream. Essa escolha afeta virtual hosts, redirects, cookies e validação de certificado."
  },
  {
    "kind": "paragraph",
    "text": "Reverse proxies inserem metadados como X-Forwarded-For, X-Forwarded-Proto e X-Forwarded-Host. A RFC 7239 define o header Forwarded como forma padronizada de transportar informações perdidas no proxying. Entretanto, qualquer cliente pode enviar headers com esses nomes. A borda confiável deve remover ou reconstruir valores recebidos e o backend deve confiar apenas em hops conhecidos."
  },
  {
    "kind": "paragraph",
    "text": "O IP original também pode ser preservado em camada 4 por mecanismos como PROXY protocol, quando suportados. Isso altera o protocolo esperado no primeiro bytes da conexão e precisa ser habilitado de forma consistente nos dois lados. Enviar PROXY protocol a um listener que espera TLS ou HTTP resulta em falhas imediatas e mensagens de protocolo inválido."
  },
  {
    "kind": "subhead",
    "text": "Exemplo didático de metadados adicionados por uma borda confiável"
  },
  {
    "kind": "code",
    "text": "GET /clientes/123 HTTP/1.1"
  },
  {
    "kind": "code",
    "text": "Host: api.empresa.com"
  },
  {
    "kind": "code",
    "text": "Forwarded: for=192.0.2.60;proto=https;host=api.empresa.com"
  },
  {
    "kind": "code",
    "text": "X-Forwarded-For: 192.0.2.60"
  },
  {
    "kind": "code",
    "text": "X-Forwarded-Proto: https"
  },
  {
    "kind": "code",
    "text": "X-Request-Id: 9f2a7b1d"
  },
  {
    "kind": "subhead",
    "text": "Nunca confie cegamente em X-Forwarded-For"
  },
  {
    "kind": "paragraph",
    "text": "Defina a lista de proxies confiáveis e calcule o cliente a partir da cadeia conhecida. Caso contrário, o consumidor pode inserir um IP arbitrário e influenciar auditoria, rate limiting ou autorização."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.18 Fundamentos de load balancing",
    "id": "4-18-fundamentos-de-load-balancing"
  },
  {
    "kind": "paragraph",
    "text": "Load balancing distribui trabalho entre múltiplos destinos para utilizar capacidade, tolerar falhas e permitir escala. Ele não acelera uma única operação por mágica: uma requisição específica ainda é processada por uma instância. O ganho surge da execução concorrente e da remoção de endpoints incapazes de atender novas solicitações."
  },
  {
    "kind": "paragraph",
    "text": "O conjunto de destinos é chamado pool, upstream cluster ou backend set, conforme o produto. Antes de aplicar um algoritmo, o balanceador determina quais endpoints são elegíveis por configuração, prioridade, localidade e saúde. O algoritmo seleciona entre esses candidatos. Portanto, uma distribuição inesperada pode ser causada não pelo round robin, mas por metade do pool estar marcada como unhealthy."
  },
  {
    "kind": "paragraph",
    "text": "Balanceamento pode ocorrer por conexão ou por requisição. Em TCP L4, uma decisão costuma ser tomada quando o fluxo é criado e permanece até o encerramento. Em HTTP/1.1, o proxy pode reutilizar conexões de backend e selecionar por requisição. Em HTTP/2, várias requisições são multiplexadas em poucas conexões, o que pode alterar a relação entre número de conexões e carga real."
  },
  {
    "kind": "paragraph",
    "text": "O escopo pode ser local ou global. Um balanceador regional distribui entre instâncias próximas. Um sistema global seleciona região por DNS, anycast ou reverse proxy de borda. Arquiteturas robustas frequentemente combinam as duas camadas: uma decisão global escolhe a região e um balanceador local escolhe a instância."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.19 Algoritmos de seleção de backend",
    "id": "4-19-algoritmos-de-selecao-de-backend"
  },
  {
    "kind": "paragraph",
    "text": "Round robin distribui seleções em sequência e funciona bem quando servidores possuem capacidades semelhantes e o custo das requisições é relativamente homogêneo. Weighted round robin atribui proporções diferentes, permitindo que uma instância maior receba mais tráfego ou que uma nova versão seja introduzida gradualmente. Pesos não garantem percentuais exatos em janelas pequenas."
  },
  {
    "kind": "paragraph",
    "text": "Least connections escolhe o destino com menos conexões ativas. É útil quando conexões possuem durações variáveis, mas a contagem pode não representar trabalho real em HTTP/2 ou quando uma conexão contém muitas operações. Least request e least response time procuram aproximar carga ou latência observada, porém precisam evitar oscilações e decisões baseadas em métricas ruidosas."
  },
  {
    "kind": "paragraph",
    "text": "Hash seleciona o destino a partir de uma chave, como IP, cookie, header ou identificador. Ele fornece afinidade determinística enquanto o conjunto permanece estável. Quando endpoints entram ou saem, um hash simples pode remapear grande parte das chaves. Consistent hashing e algoritmos como ring hash ou Maglev procuram reduzir remapeamento, sendo úteis para caches e dados localizados."
  },
  {
    "kind": "paragraph",
    "text": "Power of two choices seleciona dois candidatos aleatórios e escolhe o menos carregado, obtendo boa distribuição com menor custo que examinar todo o pool. Produtos modernos também combinam prioridade, localidade, pesos dinâmicos, outlier detection e circuit breaking. A escolha deve ser validada com o padrão real de tráfego, não apenas com uma definição abstrata."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-10-load-balancing-algorithms.svg",
    "alt": "Comparação entre algoritmos de seleção de backend",
    "caption": "Figura 10 - Algoritmos diferentes otimizam padrões de carga diferentes."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Critérios para escolha do algoritmo.",
    "headers": [
      "Algoritmo",
      "Sinal usado",
      "Indicado quando",
      "Cuidado"
    ],
    "rows": [
      [
        "Round robin",
        "Sequência",
        "Instâncias e requisições semelhantes",
        "Ignora carga atual"
      ],
      [
        "Weighted RR",
        "Peso estático/dinâmico",
        "Capacidades diferentes",
        "Pesos incorretos concentram carga"
      ],
      [
        "Least connections",
        "Conexões ativas",
        "Sessões de duração variável",
        "HTTP/2 distorce a métrica"
      ],
      [
        "Least response time",
        "Latência e atividade",
        "Desempenho variável",
        "Pode oscilar"
      ],
      [
        "Hash",
        "Chave da requisição",
        "Afinidade e cache local",
        "Remapeamento e hotspots"
      ],
      [
        "Consistent hash",
        "Anel/tabela estável",
        "Reduzir churn de afinidade",
        "Mais complexidade"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.20 Health checks, readiness, drenagem e failover",
    "id": "4-20-health-checks-readiness-drenagem-e-failover"
  },
  {
    "kind": "paragraph",
    "text": "Health checks determinam se um endpoint deve receber tráfego. Um TCP check confirma que a porta aceita conexão, mas não prova que a aplicação consegue consultar banco, validar tokens ou responder uma operação crítica. Um HTTP check pode verificar um path, status e conteúdo. O endpoint de saúde deve refletir readiness para o tráfego que será enviado, sem causar carga excessiva ou depender de componentes irrelevantes."
  },
  {
    "kind": "paragraph",
    "text": "Liveness e readiness respondem a perguntas diferentes. Liveness indica se o processo deve ser reiniciado. Readiness indica se está pronto para receber novas requisições. Misturar os dois pode criar loops: uma dependência temporariamente indisponível torna liveness falso, o orquestrador reinicia todas as instâncias, e a recuperação fica ainda mais difícil."
  },
  {
    "kind": "paragraph",
    "text": "Thresholds evitam remoção por uma falha isolada e retorno prematuro após um único sucesso. Intervalo, timeout, número de falhas e número de sucessos definem a velocidade de detecção e recuperação. Checks muito agressivos podem gerar falsos negativos durante picos; checks lentos mantêm instâncias quebradas no pool por mais tempo."
  },
  {
    "kind": "paragraph",
    "text": "Drenagem remove o endpoint de novas seleções enquanto permite que conexões existentes terminem. Slow start aumenta o peso gradualmente após startup ou recuperação, evitando enviar carga total a caches frios e runtimes ainda aquecendo. Em deploys, readiness, pre-stop, connection draining e timeout máximo da aplicação devem ser coordenados para evitar resets."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-11-endpoint-health-lifecycle.svg",
    "alt": "Ciclo de vida de saúde de um endpoint entre inicialização, readiness, degradação, indisponibilidade e drenagem",
    "caption": "Figura 11 - Um endpoint percorre estados que influenciam elegibilidade e peso."
  },
  {
    "kind": "subhead",
    "text": "Health check de API Gateway"
  },
  {
    "kind": "paragraph",
    "text": "Uma verificação de porta pode marcar o gateway como saudável mesmo quando o repositório de configuração, DNS ou backends críticos estão indisponíveis. Projete checks por camada e monitore também a experiência ponta a ponta."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.21 Afinidade, estado e connection pooling",
    "id": "4-21-afinidade-estado-e-connection-pooling"
  },
  {
    "kind": "paragraph",
    "text": "Session affinity direciona requisições relacionadas ao mesmo backend, normalmente por cookie, IP ou hash. Ela pode ser necessária para sistemas legados com sessão em memória, mas reduz liberdade de distribuição e complica failover. APIs REST idealmente mantêm estado de sessão em mecanismos compartilhados ou tokens, permitindo que qualquer instância processe a chamada."
  },
  {
    "kind": "paragraph",
    "text": "Afinidade por IP é frágil atrás de NAT e proxies, pois muitos consumidores podem aparecer com a mesma origem. Usuários móveis podem mudar de IP, e IPv6 pode utilizar múltiplos endereços temporários. Cookie-based affinity oferece chave mais específica, mas precisa considerar domínio, Secure, SameSite e o comportamento quando o backend sai do pool."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling reutiliza conexões do proxy para o upstream e reduz handshakes TCP/TLS, latência e consumo de portas SNAT. Porém, pools muito pequenos podem concentrar tráfego, e conexões persistentes podem manter um endereço resolvido antes de uma mudança DNS. A política de refresh DNS, lifetime das conexões e idle timeout precisa ser compatível com failover e rotação de endpoints."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 multiplexa diversas streams em uma conexão. Se o proxy mantiver uma única conexão HTTP/2 por backend, métricas de conexões deixam de representar a quantidade de requisições. O algoritmo, os limites de streams e a criação de múltiplas conexões precisam ser observados. A mesma preocupação vale para gRPC, WebSocket e long polling, que possuem durações e padrões distintos."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Estado e persistência alteram a distribuição.",
    "headers": [
      "Mecanismo",
      "Benefício",
      "Efeito colateral"
    ],
    "rows": [
      [
        "Cookie affinity",
        "Sessão estável",
        "Dependência de backend e failover"
      ],
      [
        "IP hash",
        "Sem cookie",
        "NAT concentra clientes"
      ],
      [
        "Connection pooling",
        "Menos handshake e SNAT",
        "Conexões antigas e concentração"
      ],
      [
        "HTTP/2 multiplexing",
        "Alta eficiência",
        "Conexão não representa carga"
      ],
      [
        "Draining",
        "Deploy sem interrupção abrupta",
        "Precisa de timeout coordenado"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.22 Arquitetura com múltiplas camadas",
    "id": "4-22-arquitetura-com-multiplas-camadas"
  },
  {
    "kind": "paragraph",
    "text": "Uma arquitetura de API pode conter DNS/GSLB, CDN ou Front Door, WAF, load balancer regional, API Gateway, ingress controller, service mesh e aplicação. Cada camada pode terminar TLS, gerar headers, fazer retries e aplicar timeout. O desenho precisa definir uma matriz de responsabilidades: quem autentica o cliente, quem aplica WAF, quem seleciona região, quem seleciona instância, quem preserva o Host e quem gera o request ID."
  },
  {
    "kind": "paragraph",
    "text": "Retries em múltiplas camadas multiplicam tráfego. Se cliente, Front Door, API Gateway e service mesh tentam três vezes, uma única operação pode produzir dezenas de chamadas ao backend. Em operações não idempotentes, isso também cria risco funcional. O orçamento de timeout deve diminuir ao longo da cadeia para que camadas externas ainda tenham tempo de processar a falha e responder."
  },
  {
    "kind": "paragraph",
    "text": "A observabilidade deve registrar timestamps, endereço, hostname, protocolo, status originado, backend selecionado, duração de conexão e duração de resposta. Um identificador de correlação deve ser criado na borda ou preservado de forma controlada. Logs precisam distinguir status do proxy e status do upstream, além de connect timeout, TLS error, reset e response timeout."
  },
  {
    "kind": "paragraph",
    "text": "Alta disponibilidade exige eliminar single points of failure na própria camada de gateway. Múltiplas instâncias atrás de load balancer, configuração consistente e health checks são necessários. Componentes stateful, caches distribuídos e bancos de configuração precisam de desenho próprio; duplicar apenas o listener não garante que a plataforma continue operando durante falha de dependência."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-12-api-request-path.svg",
    "alt": "Caminho corporativo de uma chamada de API entre cliente, DNS, borda, API Gateway, balanceador e backend",
    "caption": "Figura 12 - Cada salto toma decisões e pode alterar a identidade observada."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Exemplo de divisão de responsabilidades.",
    "headers": [
      "Camada",
      "Responsabilidade recomendada",
      "Evitar duplicidade de"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "Escolha global e failover de endpoint",
        "Regras de aplicação"
      ],
      [
        "Borda/WAF",
        "Proteção pública, TLS, roteamento amplo",
        "Autorização de negócio"
      ],
      [
        "API Gateway",
        "Autenticação, quotas, transformação, governança",
        "Balanceamento global improvisado"
      ],
      [
        "LB/Ingress",
        "Distribuição local e health",
        "Políticas de identidade duplicadas"
      ],
      [
        "Service mesh",
        "Resiliência service-to-service e mTLS interno",
        "Retries sem orçamento"
      ],
      [
        "Aplicação",
        "Regra de negócio e estado funcional",
        "Confiança em headers não validados"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.23 Aplicação em Axway API Gateway e Azure",
    "id": "4-23-aplicacao-em-axway-api-gateway-e-azure"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Axway API Gateway"
  },
  {
    "kind": "paragraph",
    "text": "Em uma implantação Axway de alta disponibilidade, múltiplas instâncias de API Gateway ficam atrás de um balanceador que executa health checks e distribui a carga. O balanceador deve preservar ou reconstruir corretamente host, protocolo e identidade de origem conforme o desenho. Afinidade deve ser usada somente quando um recurso realmente depende dela; políticas e estado compartilhado precisam ser avaliados separadamente."
  },
  {
    "kind": "paragraph",
    "text": "No roteamento outbound, filtros como Connect to URL fazem o gateway atuar como endpoint para o cliente e chamar o destino configurado, ocultando a hierarquia de implantação. Remote Host Settings controlam como o gateway se conecta a destinos específicos, incluindo conexões, timeouts e parâmetros relacionados. A resolução DNS e o pool de conexões podem fazer com que alterações de backend não sejam percebidas imediatamente."
  },
  {
    "kind": "paragraph",
    "text": "Quando a saída exige proxy corporativo, a configuração de proxy define um intermediário adicional. O diagnóstico precisa separar conexão gateway-proxy e proxy-destino. Em topologias com load balancer na frente e proxy na saída, o gateway está entre duas formas de intermediação, cada uma com TLS, logs e timeouts próprios."
  },
  {
    "kind": "paragraph",
    "text": "Operações de manutenção devem coordenar drenagem no load balancer e shutdown controlado da instância para evitar interrupção de conexões ativas. A documentação da Axway também permite configurar endereços e opções de load balancing em integrações específicas do API Manager; esses parâmetros devem ser validados conforme a versão em uso."
  },
  {
    "kind": "subhead",
    "text": "Aplicação prática em Axway"
  },
  {
    "kind": "paragraph",
    "text": "Ao investigar 502 ou connect timeout, registre: hostname configurado no filtro, resposta DNS vista pelo processo, endereço selecionado, Remote Host Settings aplicadas, proxy outbound, pool de conexões e origem SNAT observada pelo backend."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Serviços Azure e API Management"
  },
  {
    "kind": "paragraph",
    "text": "Azure oferece serviços de distribuição com propósitos diferentes. Traffic Manager toma decisões por DNS e o cliente conecta diretamente ao endpoint retornado. Azure Front Door é um reverse proxy global de camada 7, com aceleração, TLS, roteamento e WAF. Azure Load Balancer opera principalmente em camada 4. Application Gateway atua como proxy regional de camada 7 para HTTP/HTTPS, com roteamento por Host/path e WAF, além de capacidades L4 em cenários suportados pela plataforma."
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management é uma plataforma de gerenciamento de APIs cujo gateway aplica políticas, autenticação, transformação e observabilidade. Ele não substitui automaticamente um WAF ou serviço de distribuição global. Um desenho comum posiciona Front Door ou Application Gateway diante do APIM, mas health probes precisam utilizar o hostname correto, porque endpoints virtuais podem não responder a probes por IP e Host padrão."
  },
  {
    "kind": "paragraph",
    "text": "Em modo interno, os endpoints do APIM exigem DNS acessível dentro da VNet. Application Gateway na frente do APIM precisa de custom probes e configuração de backend compatível com o hostname e certificado. No caminho outbound, o APIM precisa resolver backends privados e possuir conectividade à rede correspondente. Configurar apenas a exposição inbound não resolve a perna de backend."
  },
  {
    "kind": "paragraph",
    "text": "A escolha entre Traffic Manager e Front Door ilustra a diferença conceitual: Traffic Manager responde DNS e não vê o tráfego da aplicação; Front Door permanece no caminho como reverse proxy. Isso altera origem observada, TLS, WAF, logs, failover e capacidade de roteamento."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/pt/figure-13-azure-services.svg",
    "alt": "Mapa conceitual de Traffic Manager, Front Door, Load Balancer, Application Gateway e API Management",
    "caption": "Figura 13 - Serviços Azure se diferenciam por escopo, camada e permanência no caminho."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Mapeamento conceitual de serviços Azure.",
    "headers": [
      "Serviço",
      "Escopo/camada",
      "Permanece no caminho?",
      "Uso principal"
    ],
    "rows": [
      [
        "Traffic Manager",
        "Global por DNS",
        "Não",
        "Escolher endpoint por política e saúde"
      ],
      [
        "Front Door",
        "Global L7",
        "Sim",
        "Reverse proxy, WAF, TLS e aceleração"
      ],
      [
        "Load Balancer",
        "Regional L4",
        "Sim",
        "Distribuir fluxos TCP/UDP"
      ],
      [
        "Application Gateway",
        "Regional L7",
        "Sim",
        "Host/path routing, WAF e TLS"
      ],
      [
        "API Management",
        "API Gateway",
        "Sim",
        "Segurança, políticas e governança de APIs"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.24 Troubleshooting sistemático",
    "id": "4-24-troubleshooting-sistematico"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico deve seguir a ordem real da chamada. Comece no ambiente do consumidor ou do runtime que falha, não em uma estação diferente. Registre o nome consultado, servidor DNS utilizado, resposta A/AAAA/CNAME, TTL e cache. Em seguida, identifique o endereço de destino, rota, NAT, terminação TLS, Host e backend selecionado."
  },
  {
    "kind": "paragraph",
    "text": "Compare uma chamada bem-sucedida e uma chamada com falha. Diferenças em resolvedor, família IP, endereço retornado, origem SNAT ou instância de pool costumam revelar intermitência. Para 502, determine se houve falha DNS, connect error, TLS error, reset ou resposta inválida. Para 503, verifique se o pool está sem endpoints saudáveis ou se a própria política gerou indisponibilidade. Para 504, compare timeouts em todas as camadas."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas de captura e logs precisam ser usadas de forma autorizada e com filtros mínimos. dig ou Resolve-DnsName observam DNS; curl -v mostra resolução, conexão, TLS e HTTP; openssl s_client ajuda a analisar SNI e cadeia; ss/netstat mostra sockets; tcpdump/Wireshark confirma endereços e resets; métricas do balanceador mostram health e backend selection. Nenhuma ferramenta isolada explica toda a cadeia."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo não é apenas restaurar o serviço, mas produzir uma causa verificável. Documente a configuração que gerou a falha, evidências, mecanismo técnico, correção permanente e monitoramento que detectará recorrência. Limpar cache, reiniciar gateway ou aumentar timeout pode mascarar o problema sem corrigir a arquitetura."
  },
  {
    "kind": "subhead",
    "text": "Comandos de diagnóstico - use apenas em sistemas e destinos autorizados"
  },
  {
    "kind": "code",
    "text": "# DNS\ndig api.empresa.com A +noall +answer\ndig api.empresa.com AAAA +noall +answer\ndig api.empresa.com +tcp\ndig api.empresa.com +dnssec"
  },
  {
    "kind": "code",
    "text": "# HTTP/TLS\ncurl -v --resolve api.empresa.com:443:198.51.100.25 https://api.empresa.com/health\nopenssl s_client -connect 198.51.100.25:443 -servername api.empresa.com"
  },
  {
    "kind": "code",
    "text": "# Rede e sockets\nip route get 198.51.100.25\nss -tan state established\nss -tan state time-wait"
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - Sintomas e linhas iniciais de investigação.",
    "headers": [
      "Sintoma",
      "Hipóteses prioritárias",
      "Evidências"
    ],
    "rows": [
      [
        "NXDOMAIN após criar registro",
        "Cache negativo ou zona errada",
        "SOA, TTL negativo, consulta autoritativa"
      ],
      [
        "Funciona por IP, falha por nome",
        "DNS, SNI, Host ou certificado",
        "dig, curl --resolve, s_client"
      ],
      [
        "Alguns clientes usam endpoint antigo",
        "TTL/cache/conexão persistente",
        "TTL restante e pool de conexões"
      ],
      [
        "502 intermitente",
        "DNS múltiplo, TLS upstream, SNAT, reset",
        "Backend escolhido e erro detalhado"
      ],
      [
        "503 no balanceador",
        "Todos unhealthy ou pool vazio",
        "Status de health e probe logs"
      ],
      [
        "504 após tempo fixo",
        "Timeout em uma camada",
        "Duração e emissor do status"
      ],
      [
        "Backend vê IP do proxy",
        "Reverse proxy ou SNAT",
        "Headers confiáveis e captura"
      ],
      [
        "Distribuição desigual",
        "Keep-alive, HTTP/2, afinidade, pesos",
        "Requisições por backend e conexões"
      ],
      [
        "Health verde, API falha",
        "Probe superficial",
        "Testar dependências e path real"
      ],
      [
        "Somente respostas grandes DNS falham",
        "TCP/53, EDNS ou fragmentação",
        "TC flag, dig +tcp, captura"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Árvore de decisão para uma falha de API"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "O nome resolve no mesmo runtime que executa a chamada? Registre servidor DNS, resposta, TTL e aliases.",
      "O endereço resolvido é o endpoint esperado para esse ambiente e família IP?",
      "A conexão TCP é criada? Caso não, analise rota, firewall, NAT, SNAT e capacidade de portas.",
      "O handshake TLS termina? Valide SNI, certificado, CA, hostname e mTLS na perna correta.",
      "O proxy recebe HTTP? Identifique o componente que gerou o status e o request ID.",
      "O pool possui endpoints saudáveis e o probe representa readiness real?",
      "Qual backend foi escolhido e qual Host/path/header foi enviado?",
      "O backend respondeu, resetou ou excedeu timeout?",
      "A resposta retornou pelo mesmo estado de NAT e pelas mesmas camadas?",
      "A correção elimina a causa ou apenas força novo cache/conexão?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.25 Estudos de caso",
    "id": "4-25-estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Alteração de DNS sem reduzir TTL"
  },
  {
    "kind": "paragraph",
    "text": "Uma equipe troca o registro api.empresa.com do balanceador antigo para o novo durante uma mudança. O TTL anterior era de 3600 segundos. Testes feitos diretamente no autoritativo mostram o endereço novo, mas parte dos consumidores continua no endpoint antigo por quase uma hora. Reiniciar uma estação parece resolver, enquanto aplicações em contêiner mantêm conexões antigas."
  },
  {
    "kind": "paragraph",
    "text": "A causa combina cache recursivo válido e connection pooling. O plano correto seria reduzir o TTL com antecedência, aguardar expiração, manter os dois endpoints compatíveis durante a transição e observar tráfego por endereço. O evento demonstra que atualização autoritativa não equivale a adoção imediata por todos os clientes."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - APIM interno marcado como unhealthy pelo Application Gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um Application Gateway utiliza o IP privado do API Management como backend e o probe padrão envia Host incompatível. O APIM responde somente aos hostnames configurados, e o probe considera o backend indisponível. Usuários recebem 502 ou 503 mesmo que o APIM esteja operacional quando acessado com o hostname correto."
  },
  {
    "kind": "paragraph",
    "text": "A correção é criar custom probe com host e path adequados, configurar backend HTTP settings e garantir resolução/certificado. O caso mostra que health check de camada 7 precisa reproduzir a autoridade HTTP esperada e não apenas alcançar o IP."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Esgotamento de SNAT causado por conexões curtas"
  },
  {
    "kind": "paragraph",
    "text": "Um gateway chama um backend externo e abre nova conexão TLS para quase toda requisição. Durante pico, novas conexões começam a falhar de forma intermitente. O backend não mostra saturação, e retries elevam ainda mais o volume. Métricas revelam grande quantidade de TIME_WAIT e consumo de portas no IP de saída."
  },
  {
    "kind": "paragraph",
    "text": "A solução envolve connection pooling, keep-alive, dimensionamento de NAT, ajuste de timeouts e monitoramento de portas. Aumentar o timeout HTTP não cria portas e pode prolongar estados. O caso relaciona conceitos dos capítulos de TCP e NAT ao comportamento do API Gateway."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - X-Forwarded-For falsificado"
  },
  {
    "kind": "paragraph",
    "text": "Uma API aplica rate limiting pelo primeiro valor de X-Forwarded-For, mas o load balancer apenas acrescenta o IP observado ao final do header recebido. Um consumidor envia X-Forwarded-For com endereços arbitrários e alterna o primeiro valor para contornar limite e poluir auditoria."
  },
  {
    "kind": "paragraph",
    "text": "A borda deve remover headers não confiáveis e criar a cadeia a partir do socket observado. O backend deve configurar proxies confiáveis e selecionar a posição correta. Identidade forte deve vir de autenticação, não de um header controlável pelo cliente."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 5 - Distribuição desigual com HTTP/2"
  },
  {
    "kind": "paragraph",
    "text": "O balanceador usa least connections entre três gateways. Um cliente abre poucas conexões HTTP/2 e envia milhares de streams pela mesma conexão. O contador de conexões não reflete a carga por requisição, e uma instância recebe parcela desproporcional do trabalho."
  },
  {
    "kind": "paragraph",
    "text": "A investigação compara streams e requisições por backend, não apenas sockets. A solução pode envolver balanceamento por requisição no proxy L7, múltiplas conexões, limites de streams ou algoritmo baseado em requests/latência. O algoritmo deve ser compatível com o protocolo."
  },
  {
    "kind": "subhead",
    "text": "Aplicação no mundo bancário"
  },
  {
    "kind": "paragraph",
    "text": "Em integrações financeiras, DNS, origem de rede, mTLS e identificação da instituição são controles diferentes. Allowlist de IP reduz superfície, mTLS autentica a entidade no canal e OAuth/JWT autoriza operações. Nenhum deles deve ser usado como substituto automático dos demais."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratórios de observação",
    "id": "laboratorios-de-observacao"
  },
  {
    "kind": "paragraph",
    "text": "Os laboratórios devem ser executados em ambiente próprio ou autorizado. Use domínios de documentação, serviços locais ou recursos de laboratório. Não faça varredura nem tente contornar controles corporativos. Registre previsões antes de executar comandos e compare com os resultados."
  },
  {
    "kind": "paragraph",
    "text": "Para cada laboratório, anote horário, resolvedor, resposta DNS, TTL, endereço de destino, protocolo, terminador TLS, Host, status, servidor escolhido e duração. Essa disciplina transforma comandos isolados em evidência arquitetural."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Consulte A, AAAA, CNAME, NS e SOA de um domínio sob seu controle. Identifique autoridade e TTLs.",
      "Execute uma resolução normal e depois uma consulta direta ao autoritativo. Compare flags AA, RD e RA.",
      "Use dig +tcp e compare com UDP. Observe tamanho, tempo e presença de EDNS.",
      "Crie em laboratório um registro com TTL baixo, altere o valor e acompanhe o TTL restante no cache.",
      "Teste uma resposta NXDOMAIN e observe por quanto tempo ela permanece em cache.",
      "Configure dois nomes locais que apontem para o mesmo reverse proxy e roteie por Host.",
      "Em Docker ou rede local, configure NGINX/HAProxy com dois backends e observe round robin e least connections.",
      "Desative um backend e verifique quantos checks são necessários para removê-lo do pool.",
      "Habilite keep-alive e compare número de handshakes e sockets com conexões novas por requisição.",
      "Simule uma troca de DNS mantendo o endpoint antigo ativo e documente a janela de coexistência.",
      "Adicione um header X-Forwarded-For no cliente e confirme se a borda de laboratório o remove ou preserva.",
      "Desenhe uma arquitetura com DNS global, WAF, API Gateway e dois backends, indicando quem termina TLS e gera o request ID."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "DNS é uma base distribuída e hierárquica de RRsets, não apenas uma agenda de IPs.",
      "Zonas e domínios não são idênticos; delegações distribuem autoridade por registros NS e glue quando necessário.",
      "O stub usa um recursivo, que pode consultar raiz, TLD e autoritativo ou encaminhar a outro resolvedor.",
      "TTL controla cache; mudanças não invalidam instantaneamente entradas já armazenadas.",
      "NXDOMAIN e ausência de tipo também podem ser armazenados em cache.",
      "DNS precisa funcionar sobre UDP e TCP; EDNS amplia capacidades e respostas grandes podem exigir fallback.",
      "DoT/DoH protegem transporte; DNSSEC autentica dados; TSIG autentica transações específicas.",
      "DNS privado e split-horizon exigem visibilidade de zona, forwarding e controle de loops.",
      "Balanceamento por DNS toma decisão antes da conexão e é limitado por TTL e comportamento do resolver.",
      "NAT traduz endereços e portas com estado; não é substituto de firewall ou autenticação.",
      "SNAT altera a origem observada e pode sofrer esgotamento de portas.",
      "Reverse proxy termina uma conexão e cria outra; um túnel apenas encaminha bytes após ser estabelecido.",
      "L4 decide por fluxo; L7 pode interpretar HTTP, terminar TLS, rotear por Host/path e aplicar WAF.",
      "Forwarded e X-Forwarded-* só são confiáveis quando reconstruídos por proxies conhecidos.",
      "O algoritmo seleciona entre endpoints elegíveis; health checks definem esse conjunto.",
      "Round robin, least connections e hashing atendem padrões diferentes de carga.",
      "Readiness, draining e slow start são necessários para deploy e recuperação sem avalanche.",
      "Connection pooling reduz handshakes e SNAT, mas influencia DNS, distribuição e failover.",
      "Em Azure, Traffic Manager, Front Door, Load Balancer, Application Gateway e APIM possuem papéis distintos.",
      "Em Axway, load balancer inbound, filtros de roteamento, remote hosts e proxy outbound devem ser analisados por perna."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de arquitetura"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Qual FQDN cada consumidor usa e qual zona é autoritativa?",
      "Quais resolvers são usados por clientes, gateways e backends?",
      "Existem respostas públicas e privadas para o mesmo nome?",
      "Quais TTLs positivos e negativos foram definidos?",
      "UDP/53 e TCP/53 funcionam em todos os caminhos necessários?",
      "DNSSEC é validado e monitorado quando adotado?",
      "Qual componente executa SNAT e quais IPs podem ser observados pelo backend?",
      "A capacidade de portas SNAT suporta o pico e os timeouts?",
      "Onde cada conexão TCP/TLS termina?",
      "Qual hostname é usado em SNI, Host e validação de certificado?",
      "Quais headers são removidos e reconstruídos na borda?",
      "Qual camada escolhe região e qual escolhe instância?",
      "O health check testa readiness real e usa Host/path corretos?",
      "Há thresholds, draining e slow start?",
      "O algoritmo é adequado para HTTP/2, gRPC, WebSocket e conexões longas?",
      "Afinidade é realmente necessária? Onde o estado é mantido?",
      "Connection pools respeitam alterações DNS e failover?",
      "Retries e timeouts possuem orçamento coordenado?",
      "Logs distinguem status do proxy e status do upstream?",
      "Existe request ID ponta a ponta e métricas por backend?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de fixação",
    "id": "exercicios-de-fixacao"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Diferencie domínio, zona, delegação e servidor autoritativo.",
      "Explique por que um FQDN pode terminar com ponto e o risco de omiti-lo em arquivo de zona.",
      "Descreva o fluxo entre stub resolver, recursivo, raiz, TLD e autoritativo.",
      "Diferencie consulta recursiva e iterativa.",
      "Qual é a diferença entre NXDOMAIN e NODATA?",
      "Explique a função das flags AA, RD, RA e TC.",
      "Compare A, AAAA, CNAME, NS, SOA, PTR, SRV e CAA.",
      "Por que múltiplos registros A não garantem balanceamento uniforme?",
      "Explique como TTL e connection pooling podem manter uso de um endpoint antigo.",
      "Por que liberar somente UDP/53 pode quebrar DNS?",
      "Qual problema EDNS(0) resolve e qual risco surge com payloads muito grandes?",
      "Compare DNSSEC, DoT, DoH e TSIG.",
      "Como split-horizon ajuda e quais riscos operacionais cria?",
      "Diferencie Basic NAT, NAPT/PAT, SNAT e DNAT.",
      "Por que NAT não deve ser tratado como mecanismo de autenticação?",
      "Explique esgotamento de SNAT e a relação com connection pooling.",
      "Diferencie forward proxy, reverse proxy, gateway e túnel.",
      "Compare TLS pass-through, offload e re-encryption.",
      "Por que mTLS terminado no proxy não é automaticamente mTLS até o backend?",
      "Diferencie SNI e Host e explique como cada um participa do roteamento.",
      "Como deve ser estabelecida a confiança em X-Forwarded-For?",
      "Compare balanceamento L4, L7 e por DNS.",
      "Quando round robin, least connections e consistent hash são apropriados?",
      "Diferencie liveness, readiness e health check externo.",
      "Explique como HTTP/2 pode tornar least connections inadequado.",
      "Qual a diferença entre Azure Traffic Manager e Azure Front Door?",
      "Por que o probe padrão de um Application Gateway pode falhar contra APIM interno?",
      "Quais elementos devem ser coletados para investigar um 502 no API Gateway?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Questões de cenário"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Uma API muda de 203.0.113.10 para 203.0.113.20, mas 15% dos clientes continuam no endereço antigo. Proponha hipóteses e um plano de evidências.",
      "O DNS privado retorna 10.20.5.10 para VMs, mas o API Gateway resolve o endereço público. Desenhe o caminho de resolução e os pontos a verificar.",
      "Um backend permite apenas um IP de saída, porém o gateway usa três origens. Explique por que a falha parece intermitente e proponha solução.",
      "Um load balancer considera o backend saudável por TCP, mas a API retorna 500 por banco indisponível. Projete checks adequados.",
      "Um cliente usa mTLS até o WAF, e o backend precisa conhecer a identidade do certificado. Defina um modelo de propagação confiável.",
      "Uma aplicação stateful exige affinity por IP, mas consumidores estão atrás de CGNAT. Analise o risco e proponha alternativa.",
      "Uma arquitetura possui retries no cliente, Front Door, APIM e service mesh. Calcule o potencial de multiplicação e proponha orçamento.",
      "Após habilitar HTTP/2 entre proxy e gateway, a distribuição por least connections fica desigual. Explique o mecanismo e possíveis ajustes."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário técnico",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - Glossário do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "Authoritative server",
        "Servidor que responde com autoridade sobre uma zona."
      ],
      [
        "CNAME",
        "Registro que define um nome como alias de outro nome canônico."
      ],
      [
        "Delegação",
        "Transferência de autoridade de uma parte da árvore DNS para outra zona."
      ],
      [
        "DNAT",
        "Tradução do endereço ou porta de destino."
      ],
      [
        "DNSSEC",
        "Extensões que fornecem autenticação de origem e integridade para dados DNS."
      ],
      [
        "DoH",
        "Transporte de mensagens DNS sobre HTTPS."
      ],
      [
        "DoT",
        "Transporte de mensagens DNS sobre TLS."
      ],
      [
        "EDNS(0)",
        "Mecanismo extensível que anuncia capacidades e payload UDP DNS."
      ],
      [
        "Forward proxy",
        "Intermediário que representa clientes diante de destinos."
      ],
      [
        "Forwarded",
        "Header HTTP padronizado para metadados de proxying."
      ],
      [
        "FQDN",
        "Nome de domínio totalmente qualificado."
      ],
      [
        "Glue record",
        "Endereço fornecido pelo pai para alcançar nameserver dentro da zona delegada."
      ],
      [
        "GSLB",
        "Distribuição global de tráfego, frequentemente baseada em DNS e saúde."
      ],
      [
        "Hairpin NAT",
        "Tradução que permite a cliente interno acessar o endereço externo de serviço interno."
      ],
      [
        "Health check",
        "Teste usado para decidir se um endpoint deve permanecer elegível."
      ],
      [
        "Least connections",
        "Algoritmo que escolhe o endpoint com menos conexões ativas."
      ],
      [
        "NAPT/PAT",
        "Tradução que inclui endereços e portas de transporte."
      ],
      [
        "Negative caching",
        "Cache de inexistência de nome ou tipo DNS."
      ],
      [
        "Recursive resolver",
        "Servidor que obtém a resposta final em nome do cliente e mantém cache."
      ],
      [
        "Reverse proxy",
        "Intermediário que representa servidores e seleciona upstream."
      ],
      [
        "RRset",
        "Conjunto de registros com mesmo nome, classe e tipo."
      ],
      [
        "Session affinity",
        "Mecanismo que tenta manter requisições relacionadas no mesmo backend."
      ],
      [
        "SNI",
        "Indicação de hostname enviada durante o handshake TLS."
      ],
      [
        "SNAT",
        "Tradução do endereço ou porta de origem."
      ],
      [
        "Split-horizon DNS",
        "Respostas diferentes para o mesmo nome conforme o ambiente de resolução."
      ],
      [
        "Stub resolver",
        "Componente local que envia consultas a um resolvedor recursivo."
      ],
      [
        "TTL",
        "Tempo pelo qual dados DNS podem permanecer em cache."
      ],
      [
        "Tunnel",
        "Intermediário que encaminha bytes após estabelecer um túnel."
      ],
      [
        "Upstream",
        "Destino ao qual proxy ou gateway encaminha tráfego."
      ],
      [
        "Zone",
        "Porção administrada do espaço de nomes DNS."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências oficiais e leituras recomendadas",
    "id": "referencias-oficiais-e-leituras-recomendadas"
  },
  {
    "kind": "paragraph",
    "text": "As especificações abaixo são as fontes primárias para os conceitos apresentados. RFCs antigas continuam fundamentais, mas devem ser lidas junto às atualizações indicadas na página do RFC Editor. Documentações de produto mudam com o tempo; valide a versão e o modo de implantação em uso antes de aplicar uma configuração."
  },
  {
    "kind": "paragraph",
    "text": "A leitura recomendada começa por RFC 1034 e 1035, segue para terminologia e caching, depois transportes e DNSSEC. Para intermediários HTTP, leia a arquitetura da RFC 9110 e os headers Forwarded. Em seguida, compare as documentações de load balancing e as referências oficiais de Axway e Azure."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "RFC 1034 - Domain Names: Concepts and Facilities",
      "RFC 1035 - Domain Names: Implementation and Specification",
      "RFC 2308 - Negative Caching of DNS Queries",
      "RFC 6891 - Extension Mechanisms for DNS (EDNS(0))",
      "RFC 7766 - DNS Transport over TCP",
      "RFC 9499 - DNS Terminology",
      "RFC 4033 - DNS Security Introduction and Requirements",
      "RFC 4034 - Resource Records for DNSSEC",
      "RFC 4035 - DNSSEC Protocol Modifications",
      "RFC 7858 - DNS over TLS",
      "RFC 8484 - DNS Queries over HTTPS",
      "RFC 3022 - Traditional IP Network Address Translator",
      "RFC 4787 - NAT Behavioral Requirements for UDP",
      "RFC 5382 - NAT Behavioral Requirements for TCP",
      "RFC 9110 - HTTP Semantics",
      "RFC 7239 - Forwarded HTTP Extension",
      "RFC 9440 - Client-Cert HTTP Header Field",
      "IANA - Service Name and Port Number Registry",
      "IANA - Technical requirements for authoritative name servers",
      "NGINX - HTTP Load Balancing",
      "Envoy - Load Balancing Overview",
      "Axway - Configure API Gateway High Availability",
      "Axway - Routing Filters",
      "Axway - Remote Host Settings",
      "Axway - Configure Proxy Servers",
      "Azure Load Balancer Overview",
      "Azure Application Gateway Overview",
      "Azure Traffic Manager Overview",
      "Azure Front Door Overview",
      "Azure API Management Virtual Network Concepts",
      "Integrate API Management internal VNet with Application Gateway",
      "Azure Load Balancing Options"
    ]
  },
  {
    "kind": "subhead",
    "text": "Próximo capítulo"
  },
  {
    "kind": "paragraph",
    "text": "O Capítulo 5 aprofundará HTTP/1.1, HTTP/2 e HTTP/3: estrutura de mensagens, semântica, conexões persistentes, multiplexação, compressão de cabeçalhos, QUIC e impactos em API Gateways."
  }
];
