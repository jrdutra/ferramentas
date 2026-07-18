import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.
export const ENDERECAMENTO_IP_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "Nos capítulos anteriores, a comunicação foi observada como uma sequência de camadas: a aplicação produz dados, a camada de transporte organiza a comunicação entre processos e o protocolo IP conduz datagramas entre redes. Este capítulo se concentra no mecanismo que permite identificar interfaces e escolher caminhos. Sem um plano de endereçamento coerente e rotas corretas, a conexão TCP sequer alcança o listener do API Gateway ou do backend."
  },
  {
    "kind": "paragraph",
    "text": "Endereçamento IP parece simples quando reduzido a uma sequência como 10.20.30.40, mas o funcionamento real envolve representação binária, prefixos, tabelas de rotas, escopos, endereços especiais, tradução, fragmentação e coexistência entre duas versões do protocolo. Em ambientes corporativos, esses elementos se combinam com redes virtuais, balanceadores, firewalls, private endpoints, túneis, datacenters e clusters. Uma diferença de um bit na máscara pode encaminhar tráfego ao lugar errado ou produzir sobreposição de redes difícil de diagnosticar."
  },
  {
    "kind": "paragraph",
    "text": "O IPv4 permanece amplamente utilizado e seu espaço de 32 bits levou à adoção de CIDR, endereços privados e NAT. O IPv6 amplia o endereço para 128 bits, modifica o cabeçalho, elimina o broadcast, torna Neighbor Discovery e ICMPv6 componentes centrais e oferece mecanismos próprios de autoconfiguração. A transição não ocorre como uma troca instantânea: redes dual stack, DNS com registros A e AAAA, Happy Eyeballs e mecanismos de tradução convivem durante longos períodos."
  },
  {
    "kind": "paragraph",
    "text": "Para profissionais de API Gateways, o objetivo é ir além de calcular sub-redes. É necessário saber qual endereço o consumidor alcança, qual endereço o gateway usa como origem, como o nome do backend é resolvido, qual rota vence, onde ocorre NAT, qual componente preserva o IP original e como o caminho de retorno é estabelecido. Ao final do capítulo, o leitor deverá conseguir transformar sintomas como 'funciona de uma rede, mas não de outra' em hipóteses verificáveis."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Refaça os cálculos em papel e valide com ferramentas como ipcalc, Python ipaddress ou calculadoras corporativas autorizadas. Em roteamento, sempre escreva origem, destino, prefixos correspondentes, rota escolhida e próximo salto."
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
      "Explicar a função do protocolo IP e diferenciar nome, endereço, interface, prefixo, rota e próximo salto.",
      "Interpretar endereços IPv4 em decimal e binário, máscaras e notação CIDR.",
      "Calcular rede, broadcast, faixa de hosts e quantidade de endereços de uma sub-rede.",
      "Compreender VLSM, sumarização, sobreposição e o princípio de longest prefix match.",
      "Reconhecer endereços IPv4 privados, públicos e de finalidade especial.",
      "Relacionar NAT/PAT à identidade de origem e aos limites operacionais discutidos no capítulo anterior.",
      "Descrever o formato, a notação e os principais escopos de endereços IPv6.",
      "Explicar Neighbor Discovery, Router Advertisement, SLAAC, DAD e DHCPv6.",
      "Compreender dual stack, registros A/AAAA, Happy Eyeballs e tradução IPv4/IPv6.",
      "Diagnosticar problemas de rotas, MTU, DNS, assimetria, allowlists e endereçamento em API Gateways."
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
      "3.1 O papel do IP",
      "3.2 Nomes, endereços, interfaces e rotas",
      "3.3 Endereço IPv4 e representação binária",
      "3.4 Máscaras e CIDR",
      "3.5 Cálculo de sub-redes",
      "3.6 VLSM, sumarização e sobreposição",
      "3.7 Endereços de rede, broadcast, /31 e /32",
      "3.8 Endereços IPv4 especiais",
      "3.9 Endereços públicos, privados e NAT",
      "3.10 Tabela de rotas e longest prefix match",
      "3.11 Gateway padrão e roteamento assimétrico",
      "3.12 MTU, fragmentação e Path MTU Discovery",
      "3.13 Motivações e cabeçalho do IPv6",
      "3.14 Notação IPv6",
      "3.15 Tipos e escopos IPv6",
      "3.16 NDP, SLAAC, DAD e DHCPv6",
      "3.17 Planejamento IPv6 e tamanhos de prefixo",
      "3.18 Coexistência IPv4/IPv6",
      "3.19 Endereçamento em API Gateways",
      "3.20 Troubleshooting",
      "3.21 Estudos de caso e laboratórios",
      "Resumo, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.1 O papel do protocolo IP",
    "id": "o-papel-do-protocolo-ip"
  },
  {
    "kind": "paragraph",
    "text": "O Internet Protocol fornece um serviço de entrega de datagramas entre origem e destino em um conjunto de redes interconectadas. Cada datagrama contém endereços de origem e destino, e os roteadores analisam o destino para decidir o próximo salto. O serviço é não orientado a conexão: cada datagrama pode ser tratado de forma independente e o protocolo não cria, por si só, uma sessão lógica equivalente ao TCP."
  },
  {
    "kind": "paragraph",
    "text": "A especificação do IPv4 deixa claro que IP não fornece confiabilidade fim a fim, ordenação, retransmissão ou controle de fluxo. Essas propriedades pertencem a protocolos superiores ou à aplicação. Um roteador pode descartar um pacote por fila cheia, TTL expirado, ausência de rota, política de segurança ou problema de MTU. A camada IP pode gerar ou provocar mensagens ICMP, mas não garante que a aplicação receba uma resposta."
  },
  {
    "kind": "paragraph",
    "text": "O endereço IP identifica uma interface em determinado contexto de rede, e não necessariamente uma pessoa, aplicação ou máquina física de forma permanente. Um host multihomed possui várias interfaces e endereços; um balanceador apresenta um endereço virtual atendido por várias instâncias; um pod pode ter endereço efêmero; um private endpoint associa um endereço privado a um serviço gerenciado. Essa distinção é importante ao interpretar logs e regras de acesso."
  },
  {
    "kind": "paragraph",
    "text": "Em uma chamada de API, o IP aparece em vários pontos: endereço resolvido pelo DNS, endereço de destino do front door ou gateway, endereço usado pelo gateway para alcançar o backend e endereço observado no caminho de retorno. A mesma transação de negócio pode atravessar múltiplos pares de IPs devido a proxies e traduções."
  },
  {
    "kind": "subhead",
    "text": "Limite de responsabilidade"
  },
  {
    "kind": "paragraph",
    "text": "IP tenta encaminhar datagramas. Uma resposta HTTP 401 significa que o tráfego já alcançou uma aplicação capaz de interpretar HTTP; ausência de rota ou timeout de conexão aponta para etapas anteriores."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.2 Nomes, endereços, interfaces e rotas",
    "id": "nomes-enderecos-interfaces-e-rotas"
  },
  {
    "kind": "paragraph",
    "text": "Um nome como api.empresa.com é uma identificação amigável usada pela aplicação e pelo usuário. O DNS normalmente associa esse nome a um ou mais endereços IPv4 e IPv6. Depois da resolução, a pilha IP trabalha com endereços. Alterar um registro DNS não altera automaticamente conexões já estabelecidas, e o tempo de vida do cache influencia quando novos endereços passam a ser usados."
  },
  {
    "kind": "paragraph",
    "text": "Um endereço é configurado em uma interface lógica ou física junto a um prefixo. O prefixo informa quais bits representam a rede. A interface também pode possuir várias rotas e endereços, incluindo loopback, endereços temporários e endereços de diferentes famílias. A aplicação pode escutar em um endereço específico ou em todos os endereços locais, alterando sua exposição."
  },
  {
    "kind": "paragraph",
    "text": "Uma rota descreve como alcançar um prefixo de destino. Ela contém, de forma conceitual, prefixo, próximo salto ou interface de saída, métrica e origem da informação. Algumas rotas são diretamente conectadas, outras são estáticas e outras chegam por protocolos dinâmicos. O sistema escolhe uma rota para cada destino antes de transmitir o pacote."
  },
  {
    "kind": "paragraph",
    "text": "A distinção clássica ajuda no diagnóstico: nome indica o que se procura, endereço indica onde está e rota indica como chegar. Se curl resolve o nome errado, o problema é de resolução ou configuração. Se resolve o IP correto mas não existe rota, o problema está no encaminhamento. Se existe rota e o peer responde com RST, o tráfego chegou a um endpoint, mas não encontrou o serviço esperado."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-01-name-address-route.svg",
    "alt": "DNS resolve nomes; o sistema de roteamento decide como alcançar o endereço",
    "caption": "Figura 1 - DNS resolve nomes; o sistema de roteamento decide como alcançar o endereço."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.3 Endereço IPv4 e representação binária",
    "id": "endereco-ipv4-e-representacao-binaria"
  },
  {
    "kind": "paragraph",
    "text": "Um endereço IPv4 possui 32 bits. A representação habitual divide esses bits em quatro octetos e converte cada octeto para decimal, produzindo a notação dotted decimal. O valor de cada octeto varia de 0 a 255 porque oito bits representam 256 combinações. O endereço 192.168.10.77 é, portanto, uma forma compacta de escrever quatro sequências binárias."
  },
  {
    "kind": "paragraph",
    "text": "Operações de sub-rede não são realizadas com os números decimais isolados, mas com bits. A máscara separa o prefixo dos bits disponíveis dentro da sub-rede. Uma operação AND entre endereço e máscara produz o endereço de rede. Quando todos os bits de host são colocados em 1, obtém-se o broadcast da sub-rede tradicional."
  },
  {
    "kind": "paragraph",
    "text": "Converter alguns valores frequentes acelera cálculos. Em um octeto de máscara, os valores válidos são 0, 128, 192, 224, 240, 248, 252, 254 e 255 porque os bits 1 precisam ser contíguos a partir da esquerda. Uma máscara 255.255.255.192 corresponde a 24 bits completos mais dois bits no último octeto, portanto /26."
  },
  {
    "kind": "paragraph",
    "text": "O conceito histórico de classes A, B e C ajuda a entender documentos antigos, mas o planejamento moderno usa CIDR. Presumir que todo endereço iniciado por 10 é automaticamente /8 ou que todo 192 é /24 gera erros. O prefixo deve ser informado explicitamente ou obtido da configuração de rede."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-02-ipv4-binary-prefix.svg",
    "alt": "O IPv4 possui 32 bits e a máscara define a fronteira do prefixo",
    "caption": "Figura 2 - O IPv4 possui 32 bits e a máscara define a fronteira do prefixo."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Valores possíveis em um octeto de máscara IPv4 contígua.",
    "headers": [
      "Decimal",
      "Binário",
      "Bits de prefixo no octeto"
    ],
    "rows": [
      [
        "0",
        "00000000",
        "0"
      ],
      [
        "128",
        "10000000",
        "1"
      ],
      [
        "192",
        "11000000",
        "2"
      ],
      [
        "224",
        "11100000",
        "3"
      ],
      [
        "240",
        "11110000",
        "4"
      ],
      [
        "248",
        "11111000",
        "5"
      ],
      [
        "252",
        "11111100",
        "6"
      ],
      [
        "254",
        "11111110",
        "7"
      ],
      [
        "255",
        "11111111",
        "8"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.4 Máscaras de sub-rede e notação CIDR",
    "id": "mascaras-de-sub-rede-e-notacao-cidr"
  },
  {
    "kind": "paragraph",
    "text": "CIDR representa o tamanho do prefixo por uma barra seguida da quantidade de bits 1 da máscara. 10.20.30.0/24 indica que os 24 primeiros bits identificam o prefixo e restam 8 bits para posições dentro da sub-rede. A mesma máscara em decimal é 255.255.255.0. O prefixo não informa apenas quantidade de hosts; ele é a unidade usada em atribuição e roteamento."
  },
  {
    "kind": "paragraph",
    "text": "A adoção de CIDR substituiu o modelo rígido de classes e permitiu atribuir blocos mais próximos da necessidade real. Também permitiu agregar rotas. Em vez de publicar centenas de redes pequenas separadamente, uma organização pode anunciar um prefixo maior que as contém, desde que a topologia e a política permitam. A agregação reduz estado nas tabelas globais e internas."
  },
  {
    "kind": "paragraph",
    "text": "O tamanho total de um bloco IPv4 é 2 elevado ao número de bits não pertencentes ao prefixo. Um /24 contém 256 endereços; /25 contém 128; /26 contém 64; /27 contém 32. Cada incremento no prefixo divide o bloco anterior pela metade. Essa relação é mais segura do que decorar tabelas sem compreender os bits."
  },
  {
    "kind": "paragraph",
    "text": "CIDR também é usado em listas de controle e políticas de firewall. Permitir 10.20.0.0/16 concede acesso a 65.536 posições, não apenas a um servidor. Usar prefixo amplo por conveniência pode violar o menor privilégio. Por outro lado, permitir endereços individuais em ambientes com saída dinâmica pode causar indisponibilidade. O desenho precisa alinhar segurança, estabilidade e operação."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Prefixos IPv4 frequentes. *A regra menos dois possui exceções como /31 e /32.",
    "headers": [
      "Prefixo",
      "Máscara",
      "Endereços no bloco",
      "Hosts tradicionais*"
    ],
    "rows": [
      [
        "/24",
        "255.255.255.0",
        "256",
        "254"
      ],
      [
        "/25",
        "255.255.255.128",
        "128",
        "126"
      ],
      [
        "/26",
        "255.255.255.192",
        "64",
        "62"
      ],
      [
        "/27",
        "255.255.255.224",
        "32",
        "30"
      ],
      [
        "/28",
        "255.255.255.240",
        "16",
        "14"
      ],
      [
        "/29",
        "255.255.255.248",
        "8",
        "6"
      ],
      [
        "/30",
        "255.255.255.252",
        "4",
        "2"
      ],
      [
        "/31",
        "255.255.255.254",
        "2",
        "uso especial ponto a ponto"
      ],
      [
        "/32",
        "255.255.255.255",
        "1",
        "rota de host"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.5 Cálculo de uma sub-rede IPv4",
    "id": "calculo-de-uma-sub-rede-ipv4"
  },
  {
    "kind": "paragraph",
    "text": "Considere 192.168.10.77/26. O prefixo /26 corresponde a 255.255.255.192. No último octeto, o tamanho do bloco é 256 menos 192, ou 64. Os intervalos começam em 0, 64, 128 e 192. Como 77 está entre 64 e 127, o endereço de rede é 192.168.10.64 e o broadcast é 192.168.10.127."
  },
  {
    "kind": "paragraph",
    "text": "A faixa de hosts tradicional começa no endereço seguinte à rede e termina no endereço anterior ao broadcast: 192.168.10.65 a 192.168.10.126. Existem 64 posições no bloco e 62 posições tradicionalmente atribuíveis a hosts. Essa regra atende sub-redes multiacesso IPv4 comuns, mas não deve ser aplicada mecanicamente a /31 e /32."
  },
  {
    "kind": "paragraph",
    "text": "O mesmo cálculo pode ser feito com operação binária. O último octeto do endereço é 01001101 e o da máscara é 11000000. O AND produz 01000000, decimal 64. Para o broadcast, preservam-se os bits de prefixo e colocam-se os seis bits de host em 1, produzindo 01111111, decimal 127."
  },
  {
    "kind": "paragraph",
    "text": "Em troubleshooting, o cálculo responde se duas interfaces consideram-se locais. Um host 192.168.10.77/26 considera 192.168.10.100 diretamente conectado, mas envia 192.168.10.130 ao gateway. Se o peer foi configurado com /24, os dois lados discordam sobre quem está no mesmo enlace. Essa assimetria de percepção gera ARP sem resposta, caminhos inesperados e falhas intermitentes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-03-ipv4-subnet-calculation.svg",
    "alt": "Cálculo completo do endereço 192.168.10.77/26",
    "caption": "Figura 3 - Cálculo completo do endereço 192.168.10.77/26."
  },
  {
    "kind": "subhead",
    "text": "Validação didática com o módulo ipaddress do Python"
  },
  {
    "kind": "code",
    "text": "import ipaddress"
  },
  {
    "kind": "code",
    "text": "iface = ipaddress.ip_interface('192.168.10.77/26')\nprint('Rede:', iface.network.network_address)\nprint('Broadcast:', iface.network.broadcast_address)\nprint('Máscara:', iface.network.netmask)\nprint('Quantidade total:', iface.network.num_addresses)\nprint('Primeiro host:', next(iface.network.hosts()))\nprint('Último host:', list(iface.network.hosts())[-1])"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.6 VLSM, sumarização e sobreposição de redes",
    "id": "vlsm-sumarizacao-e-sobreposicao-de-redes"
  },
  {
    "kind": "paragraph",
    "text": "Variable Length Subnet Masking permite utilizar prefixos de tamanhos diferentes dentro de um plano. Uma rede de usuários pode receber /24, uma rede de servidores /26 e um enlace ponto a ponto /31. A alocação eficiente começa pelas maiores necessidades, respeita fronteiras binárias e reserva espaço para crescimento. Dividir blocos aleatoriamente cria fragmentação administrativa e dificulta sumarização."
  },
  {
    "kind": "paragraph",
    "text": "Sumarização combina prefixos contíguos que compartilham bits iniciais. As redes 10.20.0.0/24, 10.20.1.0/24, 10.20.2.0/24 e 10.20.3.0/24 podem ser representadas por 10.20.0.0/22. A rota resumida reduz entradas, mas também cobre todo o intervalo 10.20.0.0 a 10.20.3.255. Publicá-la sem possuir todos os blocos pode atrair tráfego para destinos inexistentes ou pertencentes a outro domínio."
  },
  {
    "kind": "paragraph",
    "text": "Sobreposição ocorre quando dois domínios utilizam prefixos que se intersectam. É frequente em fusões, VPNs e integrações com parceiros que escolheram os mesmos blocos RFC 1918. Se a rede local e a remota usam 10.0.0.0/8, a tabela não consegue distinguir o significado apenas pelo destino. Tradução, redesign, VRFs ou proxies tornam-se necessários."
  },
  {
    "kind": "paragraph",
    "text": "Em arquiteturas de APIs híbridas, sobreposição pode impedir que um gateway em nuvem alcance um backend on-premises. O DNS resolve 10.20.5.10, mas a VNet já usa 10.20.0.0/16 para outra finalidade e seleciona uma rota local. O erro parece firewall, porém a causa está no plano de endereçamento. Documentar blocos, proprietários e reservas é uma função arquitetural, não apenas operacional."
  },
  {
    "kind": "subhead",
    "text": "Regra de planejamento"
  },
  {
    "kind": "paragraph",
    "text": "Uma boa sumarização nasce de alocação hierárquica. Não tente corrigir um plano fragmentado apenas criando rotas agregadas que apontam para destinos que o próximo salto não conhece."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.7 Rede, broadcast, /31 e /32",
    "id": "rede-broadcast-31-e-32"
  },
  {
    "kind": "paragraph",
    "text": "Em uma sub-rede IPv4 multiacesso tradicional, o primeiro endereço representa a rede e o último representa o broadcast direcionado. Esses endereços não são normalmente atribuídos a interfaces de hosts. A regra de hosts igual a 2^h menos 2 deriva dessa reserva histórica. O broadcast permite enviar a todos os nós do segmento, embora seu uso seja limitado por roteadores e políticas."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 3021 permite prefixos /31 em enlaces ponto a ponto. Como há apenas dois endpoints e não existe necessidade de rede e broadcast separados para descoberta de múltiplos hosts, as duas posições podem ser usadas. Essa prática economiza endereços, mas requer suporte nos equipamentos e deve ser aplicada ao contexto correto, não a uma LAN comum."
  },
  {
    "kind": "paragraph",
    "text": "Um /32 identifica uma única posição IPv4. Ele é usado em rotas de host, loopbacks de roteadores, políticas e anúncios específicos. Configurar um /32 em uma interface não significa automaticamente ausência de comunicação: rotas on-link, point-to-point ou configurações especiais podem definir o próximo salto. Contudo, a interpretação difere de uma sub-rede compartilhada."
  },
  {
    "kind": "paragraph",
    "text": "Broadcast limitado 255.255.255.255 permanece no enlace local. Broadcast direcionado para uma sub-rede pode ser filtrado por razões de segurança e operação. Aplicações modernas não devem depender de broadcast IP para descoberta entre redes. Em IPv6, broadcast foi removido e funções equivalentes utilizam multicast com escopo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.8 Endereços IPv4 de finalidade especial",
    "id": "enderecos-ipv4-de-finalidade-especial"
  },
  {
    "kind": "paragraph",
    "text": "Nem todo endereço que cabe no formato IPv4 é globalmente utilizável. A IANA mantém um registro de blocos de finalidade especial e informa propriedades como origem permitida, destino permitido, encaminhamento e alcance global. Essa fonte é mais confiável do que listas memorizadas, pois novos blocos podem ser reservados por RFCs."
  },
  {
    "kind": "paragraph",
    "text": "O bloco 127.0.0.0/8 é associado a loopback. Tráfego destinado a ele deve permanecer no próprio nó; 127.0.0.1 é a forma mais conhecida. 169.254.0.0/16 é usado para link-local IPv4 quando um endereço não é obtido por configuração normal. Ele não deve ser roteado como endereço corporativo entre sub-redes."
  },
  {
    "kind": "paragraph",
    "text": "Os blocos 192.0.2.0/24, 198.51.100.0/24 e 203.0.113.0/24 são reservados para documentação. Usá-los em diagramas evita publicar endereços reais ou estimular cópia de redes privadas que podem conflitar. O bloco 198.18.0.0/15 é reservado para benchmarking e não deve ser confundido com endereço público comum."
  },
  {
    "kind": "paragraph",
    "text": "Multicast IPv4 usa 224.0.0.0/4. 0.0.0.0 pode representar endereço não especificado em contextos de configuração ou bind, e 255.255.255.255 representa broadcast limitado. A semântica depende do campo e da operação; por exemplo, escutar em 0.0.0.0 significa aceitar em todos os endereços IPv4 locais, não enviar para um servidor chamado 0.0.0.0."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Blocos IPv4 importantes. Consulte o registro IANA para propriedades completas.",
    "headers": [
      "Bloco",
      "Finalidade principal",
      "Observação"
    ],
    "rows": [
      [
        "10.0.0.0/8",
        "Privado",
        "Não globalmente roteável"
      ],
      [
        "172.16.0.0/12",
        "Privado",
        "172.16.0.0 a 172.31.255.255"
      ],
      [
        "192.168.0.0/16",
        "Privado",
        "Uso interno comum"
      ],
      [
        "100.64.0.0/10",
        "Shared Address Space",
        "Frequentemente usado por CGN"
      ],
      [
        "127.0.0.0/8",
        "Loopback",
        "Permanece no nó"
      ],
      [
        "169.254.0.0/16",
        "Link-local",
        "Comunicação no enlace"
      ],
      [
        "192.0.2.0/24",
        "Documentação",
        "TEST-NET-1"
      ],
      [
        "198.51.100.0/24",
        "Documentação",
        "TEST-NET-2"
      ],
      [
        "203.0.113.0/24",
        "Documentação",
        "TEST-NET-3"
      ],
      [
        "224.0.0.0/4",
        "Multicast",
        "Grupos multicast IPv4"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.9 Endereços públicos, privados, NAT e PAT",
    "id": "enderecos-publicos-privados-nat-e-pat"
  },
  {
    "kind": "paragraph",
    "text": "A RFC 1918 reservou três blocos para redes privadas: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. Esses endereços podem ser reutilizados por organizações diferentes e não são encaminhados globalmente na Internet. 'Privado' descreve escopo de roteamento, não nível de segurança. Uma rede privada ainda precisa de segmentação, autenticação, criptografia, monitoramento e controle de acesso."
  },
  {
    "kind": "paragraph",
    "text": "Para acessar destinos externos, redes IPv4 privadas normalmente utilizam tradução. NAT altera endereço e, em muitos casos, PAT também altera porta para multiplexar fluxos. O estado de tradução permite que a resposta seja associada ao cliente interno. Esse mecanismo preservou endereços públicos, mas introduziu dependência de estado e removeu transparência fim a fim."
  },
  {
    "kind": "paragraph",
    "text": "O bloco 100.64.0.0/10 foi reservado como espaço compartilhado para provedores, especialmente Carrier-Grade NAT. Ele não é equivalente aos blocos RFC 1918 e pode aparecer entre o assinante e a Internet. Em troubleshooting, observar 100.64/10 não prova que o endereço pertence à rede privada da organização; pode representar uma camada adicional de tradução."
  },
  {
    "kind": "paragraph",
    "text": "Quando uma API recebe uma conexão, o endereço IP de origem do socket é o endereço imediatamente anterior após as traduções e proxies. Um cabeçalho como X-Forwarded-For pode carregar a cadeia informada por proxies, mas é texto de aplicação. O gateway deve remover valores enviados por consumidores não confiáveis e construir o cabeçalho a partir de uma cadeia conhecida. Usar o cabeçalho bruto para autorização permite spoofing."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-04-nat-observed-address.svg",
    "alt": "NAT altera a origem observada; cabeçalhos de proxy exigem confiança explícita",
    "caption": "Figura 4 - NAT altera a origem observada; cabeçalhos de proxy exigem confiança explícita."
  },
  {
    "kind": "subhead",
    "text": "Segurança"
  },
  {
    "kind": "paragraph",
    "text": "Não use a existência de um IP privado como prova de identidade. Endereço é sinal de rede e pode ser compartilhado, traduzido ou forjado em cabeçalhos de aplicação. Combine-o com autenticação e controles adequados."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.10 Tabela de rotas e longest prefix match",
    "id": "tabela-de-rotas-e-longest-prefix-match"
  },
  {
    "kind": "paragraph",
    "text": "A tabela de rotas pode conter várias entradas que correspondem ao mesmo destino. O princípio de longest prefix match seleciona a rota com o maior número de bits iniciais correspondentes. Uma rota /24 é mais específica do que /16, que é mais específica do que /8. A rota padrão /0 corresponde a qualquer destino, mas perde para qualquer rota mais específica válida."
  },
  {
    "kind": "paragraph",
    "text": "Considere rotas para 0.0.0.0/0, 10.0.0.0/8, 10.20.0.0/16 e 10.20.30.0/24. Um pacote destinado a 10.20.30.25 corresponde às quatro, mas utiliza /24. Se essa rota aponta para um túnel indisponível, a presença de uma rota /16 alternativa não garante fallback automático; a rota específica continua vencendo enquanto permanecer instalada e considerada utilizável."
  },
  {
    "kind": "paragraph",
    "text": "Depois de escolher o prefixo mais longo, implementações podem usar métrica, distância administrativa, política ou múltiplos caminhos entre rotas equivalentes. Esses detalhes variam, mas não substituem a regra de especificidade. Em cloud, route tables definidas pelo usuário podem substituir rotas de sistema e enviar tráfego a appliances virtuais."
  },
  {
    "kind": "paragraph",
    "text": "Uma rota diretamente conectada informa que o destino está no enlace e exige resolução de vizinho. Uma rota via gateway envia o quadro ao próximo salto, embora o endereço IP de destino do datagrama continue sendo o destino final. Confundir endereço do próximo salto com destino IP dificulta a leitura de capturas Ethernet."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-05-longest-prefix-match.svg",
    "alt": "A rota mais específica vence entre os prefixos correspondentes",
    "caption": "Figura 5 - A rota mais específica vence entre os prefixos correspondentes."
  },
  {
    "kind": "subhead",
    "text": "Exemplos para consultar a decisão de rota local"
  },
  {
    "kind": "code",
    "text": "# Linux\nip route get 10.20.30.25\nip route show"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nGet-NetRoute -AddressFamily IPv4 | Sort-Object DestinationPrefix\nTest-NetConnection 10.20.30.25 -Port 443 -InformationLevel Detailed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.11 Gateway padrão, retorno e roteamento assimétrico",
    "id": "gateway-padrao-retorno-e-roteamento-assimetrico"
  },
  {
    "kind": "paragraph",
    "text": "O gateway padrão é o próximo salto usado quando nenhuma rota mais específica corresponde ao destino. Ele deve estar alcançável conforme a configuração da interface ou por mecanismo próprio da plataforma. Configurar um gateway não ensina automaticamente ao restante da rede como retornar; o caminho inverso depende das tabelas dos demais componentes."
  },
  {
    "kind": "paragraph",
    "text": "Roteamento assimétrico ocorre quando ida e volta atravessam caminhos diferentes. IP não exige simetria, mas firewalls stateful, NATs e balanceadores frequentemente dependem de observar ambos os sentidos. Se a requisição entra por um firewall e a resposta sai por outro, o segundo não possui estado e pode descartar o tráfego. O sintoma é conexão que inicia, mas não completa ou funciona apenas em algumas instâncias."
  },
  {
    "kind": "paragraph",
    "text": "Em redes híbridas, rotas propagadas por VPN ou ExpressRoute podem competir com rotas locais e de peering. Uma alteração mais específica em uma região pode atrair somente parte do tráfego. Capturar apenas no cliente não revela onde o retorno se perdeu; é necessário consultar rotas efetivas e logs nos pontos de trânsito."
  },
  {
    "kind": "paragraph",
    "text": "Source NAT às vezes é usado para forçar retorno ao mesmo dispositivo, pois o backend responde ao endereço do tradutor. Isso simplifica simetria, mas esconde a origem real e consome portas. A decisão deve considerar observabilidade, escala, política de segurança e necessidade de preservar endereços."
  },
  {
    "kind": "subhead",
    "text": "Pergunta decisiva"
  },
  {
    "kind": "paragraph",
    "text": "Não basta provar que existe rota de A para B. Verifique como B retorna para o endereço de origem realmente observado depois de NAT, balanceamento e proxies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.12 MTU, fragmentação e Path MTU Discovery",
    "id": "mtu-fragmentacao-e-path-mtu-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Cada tecnologia de enlace possui uma Maximum Transmission Unit, o maior pacote que pode ser carregado sem fragmentação naquele enlace. Um caminho pode conter enlaces com MTUs diferentes. Encapsulamentos de VPN, túneis e overlays reduzem o espaço disponível porque acrescentam cabeçalhos. Pacotes pequenos funcionam enquanto respostas ou handshakes maiores falham, produzindo o conhecido black hole de MTU."
  },
  {
    "kind": "paragraph",
    "text": "No IPv4, um roteador pode fragmentar um datagrama quando o bit Don't Fragment não está definido. Os fragmentos são remontados no destino. Fragmentação aumenta processamento e perda de um fragmento invalida o datagrama completo. Com DF definido, o roteador descarta e deve enviar ICMP indicando a necessidade de pacote menor, permitindo Path MTU Discovery."
  },
  {
    "kind": "paragraph",
    "text": "No IPv6, roteadores não fragmentam pacotes em trânsito. O nó de origem é responsável por ajustar o tamanho e pode usar o Fragment extension header quando necessário. ICMPv6 Packet Too Big é parte essencial do funcionamento. Bloquear todo ICMPv6 quebra descoberta de MTU e outras funções fundamentais, diferentemente da visão simplista de que ICMP serve apenas a ping."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs, problemas de MTU podem surgir somente com certificados grandes, cabeçalhos extensos, uploads ou respostas maiores. O TCP tenta retransmitir segmentos que nunca atravessam, e a aplicação registra timeout. Ajustar MSS em túneis, corrigir MTU e permitir mensagens ICMP necessárias são soluções melhores do que reduzir arbitrariamente payloads."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Diferenças conceituais de fragmentação entre IPv4 e IPv6.",
    "headers": [
      "Aspecto",
      "IPv4",
      "IPv6"
    ],
    "rows": [
      [
        "Fragmentação por roteador",
        "Possível quando DF não está definido",
        "Não permitida"
      ],
      [
        "Responsável por ajustar",
        "Origem e possivelmente roteadores",
        "Origem"
      ],
      [
        "Sinal de pacote grande",
        "ICMP Destination Unreachable / fragmentation needed",
        "ICMPv6 Packet Too Big"
      ],
      [
        "Cabeçalho",
        "Campos de fragmentação no cabeçalho base",
        "Fragment extension header na origem"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.13 Por que o IPv6 foi criado",
    "id": "por-que-o-ipv6-foi-criado"
  },
  {
    "kind": "paragraph",
    "text": "O IPv4 fornece aproximadamente 4,29 bilhões de combinações, e parte do espaço é reservada. O crescimento da Internet tornou o esgotamento previsível. CIDR, NAT e políticas de alocação estenderam a vida do IPv4, mas também aumentaram complexidade. O IPv6 expandiu o endereço para 128 bits e foi projetado para suportar um espaço muito maior e autoconfiguração moderna."
  },
  {
    "kind": "paragraph",
    "text": "O IPv6 não é apenas 'IPv4 com mais números'. O cabeçalho base foi simplificado e possui tamanho fixo de 40 bytes. Funções opcionais são transportadas em extension headers. O campo Hop Limit substitui o papel do TTL, Next Header encadeia protocolos e extensões, e Flow Label permite identificar fluxos para tratamento consistente."
  },
  {
    "kind": "paragraph",
    "text": "O checksum do cabeçalho IPv4 foi removido do cabeçalho base IPv6, evitando recálculo em cada roteador. A fragmentação por roteadores também foi removida. Essas decisões transferem responsabilidades para endpoints e protocolos auxiliares. Neighbor Discovery substitui funções do ARP e adiciona descoberta de roteadores, prefixos e alcançabilidade."
  },
  {
    "kind": "paragraph",
    "text": "A abundância de endereços não elimina a necessidade de planejamento. Prefixos devem ser hierárquicos, documentados e associados a zonas de segurança. O ganho está em evitar a escassez como motivação central e reduzir dependência de NAT como mecanismo de conservação, não em dispensar firewalls ou controles."
  },
  {
    "kind": "subhead",
    "text": "Equívoco comum"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 não torna uma rede automaticamente pública ou insegura. Alcance depende de roteamento e políticas. NAT não é sinônimo de firewall, e ausência de NAT não significa ausência de proteção."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.14 Notação e normalização de endereços IPv6",
    "id": "notacao-e-normalizacao-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "Um endereço IPv6 possui 128 bits, normalmente escritos como oito grupos de quatro dígitos hexadecimais separados por dois pontos. Cada grupo representa 16 bits. O hexadecimal reduz o comprimento em comparação ao binário, mas ainda produz textos extensos. Regras de compressão permitem remover zeros à esquerda e substituir uma sequência contínua de grupos zero por ::."
  },
  {
    "kind": "paragraph",
    "text": "A abreviação :: pode aparecer apenas uma vez, pois o comprimento total precisa permanecer dedutível. 2001:0db8:0000:0000:021a:2bff:fe3c:4d5e pode ser escrito como 2001:db8::21a:2bff:fe3c:4d5e. A RFC 5952 recomenda forma canônica com letras minúsculas, supressão de zeros à esquerda e compressão da sequência de zeros mais longa."
  },
  {
    "kind": "paragraph",
    "text": "Endereços IPv6 usados com portas precisam de colchetes para eliminar ambiguidade. Uma URL pode ser https://[2001:db8::25]:8443/. Sem colchetes, os dois pontos do endereço seriam confundidos com o separador de porta. Em logs e configurações, a normalização evita que o mesmo endereço apareça em formas textuais diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Endereços link-local podem exigir um zone identifier, como fe80::1%eth0 ou fe80::1%12, para indicar a interface. O mesmo endereço link-local pode existir em enlaces distintos. O identificador é local ao nó e não deve ser tratado como parte global do endereço."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-06-ipv6-canonical-form.svg",
    "alt": "Representação completa e forma canônica de um endereço IPv6",
    "caption": "Figura 6 - Representação completa e forma canônica de um endereço IPv6."
  },
  {
    "kind": "subhead",
    "text": "Normalização e teste de pertencimento com Python"
  },
  {
    "kind": "code",
    "text": "from ipaddress import IPv6Address, IPv6Network"
  },
  {
    "kind": "code",
    "text": "a = IPv6Address('2001:0db8:0000:0000:021a:2bff:fe3c:4d5e')\nprint(a.compressed)\nprint(a.exploded)\nprint(a in IPv6Network('2001:db8::/32'))"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.15 Tipos e escopos de endereços IPv6",
    "id": "tipos-e-escopos-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 define endereços unicast, anycast e multicast. Unicast identifica uma interface ou ponto lógico e entrega a um destino. Anycast utiliza endereços da forma unicast atribuídos a múltiplas interfaces; o roteamento entrega a uma delas conforme a topologia. Multicast entrega a um grupo e substitui vários usos de broadcast."
  },
  {
    "kind": "paragraph",
    "text": "::/128 é o endereço não especificado e ::1/128 é loopback. fe80::/10 identifica link-local e é criado em interfaces IPv6 para comunicação no enlace. Roteadores não encaminham link-local entre enlaces. Unique Local Addresses usam fc00::/7; na prática, prefixos localmente atribuídos usam fd00::/8 com identificador pseudoaleatório para reduzir colisões."
  },
  {
    "kind": "paragraph",
    "text": "A faixa atualmente associada a global unicast está dentro de 2000::/3. Global não significa que todo endereço seja alcançável pela Internet: firewalls, políticas e anúncios determinam conectividade. 2001:db8::/32 é reservado para documentação. ff00::/8 contém multicast, com campos que indicam flags e escopo."
  },
  {
    "kind": "paragraph",
    "text": "O escopo é decisivo. Um endereço link-local é adequado para descobrir o roteador local, mas não para configurar um backend em outra rede. Um ULA pode ser roteado internamente entre sites se a organização o planejar. Um endereço global pode ser usado internamente e filtrado na borda. Escolher endereço apenas pela aparência textual leva a erros."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-07-ipv6-address-scopes.svg",
    "alt": "Prefixos IPv6 frequentes e seus escopos conceituais",
    "caption": "Figura 7 - Prefixos IPv6 frequentes e seus escopos conceituais."
  },
  {
    "kind": "subhead",
    "text": "IPv6 não possui broadcast"
  },
  {
    "kind": "paragraph",
    "text": "Descoberta e anúncios usam grupos multicast específicos. Isso reduz a necessidade de interromper todos os nós do enlace, mas exige suporte correto a ICMPv6 e multicast local."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.16 Neighbor Discovery, SLAAC, DAD e DHCPv6",
    "id": "neighbor-discovery-slaac-dad-e-dhcpv6"
  },
  {
    "kind": "paragraph",
    "text": "Neighbor Discovery Protocol usa ICMPv6 para descobrir roteadores, resolver endereços de camada de enlace, detectar mudanças de vizinhança e verificar alcançabilidade. Neighbor Solicitation e Neighbor Advertisement substituem funções do ARP. Router Solicitation permite solicitar anúncios, e Router Advertisement informa prefixos, roteador padrão, flags e parâmetros como MTU."
  },
  {
    "kind": "paragraph",
    "text": "Stateless Address Autoconfiguration permite que um host forme endereços a partir dos prefixos anunciados. O método de criação do identificador de interface pode usar valores estáveis ou temporários conforme privacidade e sistema operacional; não se deve presumir que o MAC apareça no endereço moderno. Antes de usar um endereço, Duplicate Address Detection verifica se ele já está em uso."
  },
  {
    "kind": "paragraph",
    "text": "Router Advertisement pode indicar se o host deve usar DHCPv6 para endereços ou informações adicionais. DHCPv6 pode operar de forma stateful ou fornecer parâmetros sem atribuir endereço. A rota padrão IPv6 vem normalmente de Router Advertisement, não de uma opção DHCPv6 equivalente ao gateway padrão do DHCPv4. Essa diferença surpreende operadores que tentam bloquear RA e depender apenas de DHCPv6."
  },
  {
    "kind": "paragraph",
    "text": "Como NDP e SLAAC dependem de ICMPv6, políticas que bloqueiam indiscriminadamente ICMPv6 provocam falhas de endereço, vizinhança e MTU. Segurança deve aplicar filtragem específica e mecanismos como RA Guard em redes adequadas, preservando mensagens necessárias."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-08-ipv6-neighbor-discovery.svg",
    "alt": "Router Advertisement, formação de endereço e descoberta de vizinhos no IPv6",
    "caption": "Figura 8 - Router Advertisement, formação de endereço e descoberta de vizinhos no IPv6."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Mensagens centrais do Neighbor Discovery.",
    "headers": [
      "Mensagem",
      "Origem -> destino típico",
      "Função"
    ],
    "rows": [
      [
        "Router Solicitation",
        "Host -> roteadores multicast",
        "Solicita anúncio de roteador"
      ],
      [
        "Router Advertisement",
        "Roteador -> hosts",
        "Informa prefixos, rota padrão e parâmetros"
      ],
      [
        "Neighbor Solicitation",
        "Host -> multicast/unicast",
        "Resolve vizinho ou verifica alcançabilidade"
      ],
      [
        "Neighbor Advertisement",
        "Vizinho -> solicitante",
        "Informa endereço de enlace e estado"
      ],
      [
        "Redirect",
        "Roteador -> host",
        "Indica próximo salto melhor no enlace"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.17 Planejamento de prefixos IPv6",
    "id": "planejamento-de-prefixos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "A arquitetura IPv6 utiliza amplamente uma fronteira de 64 bits para sub-redes em LANs, especialmente para SLAAC. Isso deixa 64 bits para o identificador de interface. O enorme número de posições não deve ser interpretado como desperdício no sentido IPv4; a estrutura favorece autoconfiguração, estabilidade e hierarquia."
  },
  {
    "kind": "paragraph",
    "text": "Organizações normalmente recebem um prefixo agregado e o subdividem por região, ambiente, zona e segmento. Um /48 oferece 65.536 sub-redes /64. Um /56 oferece 256 sub-redes /64. O plano deve reservar bits de forma previsível, evitando preencher todo o espaço sem margem. A documentação precisa indicar proprietário, função, rota e política de cada bloco."
  },
  {
    "kind": "paragraph",
    "text": "Existem exceções. A RFC 6164 recomenda /127 em enlaces ponto a ponto de roteadores em certos cenários. Endereços /128 podem representar loopbacks e serviços. Não se deve transportar a regra IPv4 de 'menor sub-rede possível' para todas as LANs IPv6, nem aplicar /64 cegamente a qualquer tipo de enlace sem observar os padrões."
  },
  {
    "kind": "paragraph",
    "text": "ULAs devem usar identificador global pseudoaleatório para reduzir colisões quando redes são interconectadas. Escolher fd00:1::/48 em todas as empresas recria o problema de sobreposição do IPv4 privado. Prefixos globais e ULAs podem coexistir, mas seleção de endereço e DNS precisam ser planejados para evitar caminhos inesperados."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Capacidade de subdivisão IPv6 em unidades /64.",
    "headers": [
      "Prefixo recebido",
      "Quantidade de /64",
      "Uso ilustrativo"
    ],
    "rows": [
      [
        "/48",
        "65.536",
        "Organização ou site com ampla hierarquia"
      ],
      [
        "/52",
        "4.096",
        "Divisão regional ou grande ambiente"
      ],
      [
        "/56",
        "256",
        "Site menor ou delegação comum"
      ],
      [
        "/60",
        "16",
        "Ambiente limitado"
      ],
      [
        "/64",
        "1",
        "Sub-rede LAN típica com SLAAC"
      ],
      [
        "/127",
        "2 posições",
        "Enlace ponto a ponto conforme RFC 6164"
      ],
      [
        "/128",
        "1 endereço",
        "Rota de host/loopback"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.18 Coexistência IPv4 e IPv6",
    "id": "coexistencia-ipv4-e-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "A transição ocorre por coexistência. Em dual stack, interfaces e serviços possuem conectividade IPv4 e IPv6. O DNS pode publicar registros A e AAAA. O cliente escolhe uma família conforme política, disponibilidade e desempenho. Operar dual stack significa manter duas superfícies de roteamento, firewall, observabilidade e troubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "Happy Eyeballs reduz a demora quando uma família está configurada, mas o caminho está degradado. O algoritmo inicia tentativas de forma coordenada e utiliza a conexão que se torna adequada primeiro, evitando que um IPv6 quebrado force longos timeouts antes do fallback. Como consequência, um defeito IPv6 pode permanecer oculto porque usuários observam sucesso via IPv4."
  },
  {
    "kind": "paragraph",
    "text": "NAT64 permite que clientes IPv6 alcancem servidores IPv4 por tradução, normalmente em conjunto com DNS64, que sintetiza respostas AAAA a partir de registros A quando apropriado. Aplicações que carregam endereços literais, dependem de IPv4 no payload ou validam famílias de forma rígida podem falhar. Proxies de aplicação também podem terminar uma família e iniciar outra."
  },
  {
    "kind": "paragraph",
    "text": "Ao publicar uma API em dual stack, testes precisam confirmar TLS, allowlists, WAF, rate limiting e logs em ambas as famílias. Uma política que permite apenas o IPv4 do parceiro não cobre sua saída IPv6. DNS split-horizon pode retornar combinações diferentes dentro e fora da rede."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-09-dual-stack.svg",
    "alt": "Um cliente dual stack pode escolher entre endereços A e AAAA",
    "caption": "Figura 9 - Um cliente dual stack pode escolher entre endereços A e AAAA."
  },
  {
    "kind": "subhead",
    "text": "Diagnóstico dual stack"
  },
  {
    "kind": "paragraph",
    "text": "Teste explicitamente curl -4 e curl -6. Sucesso genérico não demonstra que ambas as famílias funcionam; pode apenas mostrar que o mecanismo de seleção evitou o caminho defeituoso."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.19 Endereçamento em arquiteturas de API Gateway",
    "id": "enderecamento-em-arquiteturas-de-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um API Gateway pode possuir endpoints públicos, privados ou ambos, dependendo da plataforma e do tier. O endereço apresentado ao consumidor pode pertencer a um WAF, CDN, Application Gateway ou load balancer anterior. O gateway recebe uma conexão cujo IP de origem é frequentemente o último proxy. Preservar a origem lógica exige cabeçalhos construídos por componentes confiáveis ou protocolos de proxy suportados."
  },
  {
    "kind": "paragraph",
    "text": "No lado de backend, o gateway resolve o hostname conforme o DNS disponível em sua rede. Se o backend possui private endpoint, o nome público costuma precisar resolver para um endereço privado por uma zona DNS privada ou configuração equivalente. Resolver para o endereço público quando a intenção era privada pode causar bloqueio, hairpin, custo ou exposição indevida."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, opções de rede virtual e private endpoint dependem do tier e do modo. Um private endpoint inbound atribui um endereço da VNet ao acesso privado e exige DNS que mapeie o hostname para esse endereço. Integração de saída permite alcançar backends isolados. Essas duas direções são diferentes: tornar a entrada privada não garante automaticamente que o gateway possua rota privada para todo backend."
  },
  {
    "kind": "paragraph",
    "text": "Em appliances e gateways on-premises, interfaces podem ser separadas por zonas, VLANs e rotas. O listener pode estar em uma DMZ e o backend em rede interna. Rotas estáticas, firewalls e NAT precisam considerar os dois sentidos. Clusters exigem distinguir IP de administração, IP de tráfego, endereço virtual e endereços das instâncias."
  },
  {
    "kind": "paragraph",
    "text": "Allowlist baseada em IP precisa considerar origem efetiva. Se o gateway usa SNAT, o backend permite os endereços de saída do gateway, não os consumidores individuais. Se a plataforma escala ou muda endereços, usar lista incompleta cria intermitência. Serviços gerenciados podem publicar faixas ou oferecer integração privada para reduzir dependência de IPs públicos variáveis."
  },
  {
    "kind": "paragraph",
    "text": "O endereço do socket e o valor de X-Forwarded-For têm finalidades diferentes. Logs devem registrar ambos com indicação de confiança e cadeia. Políticas de segurança devem aceitar cabeçalhos somente de proxies autorizados, sobrescrevendo valores externos. Geolocalização ou rate limiting por IP tornam-se aproximados quando muitos consumidores compartilham NAT."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/pt/figure-10-api-addressing-chain.svg",
    "alt": "Cada hop pode resolver, rotear e traduzir endereços de forma independente",
    "caption": "Figura 10 - Cada hop pode resolver, rotear e traduzir endereços de forma independente."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Pontos de observação de endereços em uma cadeia de APIs.",
    "headers": [
      "Elemento",
      "Endereço observado",
      "Questão de arquitetura"
    ],
    "rows": [
      [
        "Consumidor",
        "IP local e destino resolvido",
        "A/AAAA correto? Rota e proxy?"
      ],
      [
        "WAF/Load Balancer",
        "IP do consumidor ou NAT anterior",
        "Preserva origem de forma confiável?"
      ],
      [
        "API Gateway inbound",
        "IP do proxy anterior",
        "Listener público/privado e allowlist"
      ],
      [
        "API Gateway outbound",
        "IP/SNAT de saída",
        "Backend permite essa origem?"
      ],
      [
        "Backend",
        "IP do gateway ou tradutor",
        "Retorno, logs e confiança em cabeçalhos"
      ],
      [
        "DNS privado",
        "IP privado do serviço",
        "Zona vinculada e resolução no gateway?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.20 Troubleshooting de endereçamento e roteamento",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "A investigação começa registrando origem, destino nominal, endereços resolvidos, família IP, prefixo da interface, tabela de rotas e próximo salto. Dizer apenas 'não conecta ao servidor' omite informações que determinam o caminho. Compare o resultado no cliente, no gateway e em uma máquina da mesma sub-rede do backend."
  },
  {
    "kind": "paragraph",
    "text": "Ferramentas de resolução mostram registros e servidores consultados. dig e nslookup exibem A e AAAA; Resolve-DnsName oferece informação equivalente no Windows. Cache local, hosts file, DNS corporativo e split-horizon podem produzir respostas diferentes. Consulte o nome a partir do mesmo ambiente de execução do gateway, não apenas do notebook do engenheiro."
  },
  {
    "kind": "paragraph",
    "text": "ip addr, ip route e ip neigh exibem endereços, rotas e vizinhos em Linux. No Windows, Get-NetIPAddress, Get-NetRoute e Get-NetNeighbor cumprem função semelhante. traceroute ou tracert sugerem saltos, mas dependem de ICMP e políticas e não provam o caminho completo de uma conexão TCP. tracepath ajuda a observar MTU em alguns sistemas."
  },
  {
    "kind": "paragraph",
    "text": "Capturas mostram destino real, TTL/Hop Limit, ICMP, ARP ou NDP e retransmissões. Se o host envia ARP para um destino que deveria usar gateway, a máscara pode estar ampla demais. Se envia ao gateway mas não recebe retorno, investigue rota e política adiante. Em IPv6, Neighbor Solicitation sem Advertisement sugere problema local de enlace ou endereço."
  },
  {
    "kind": "paragraph",
    "text": "Clouds fornecem effective routes, flow logs, connection troubleshoot e diagnósticos de private endpoint. Essas ferramentas precisam ser correlacionadas com configuração de DNS. Um teste por endereço literal pode funcionar enquanto o nome resolve incorretamente, ou vice-versa por SNI e certificado. Sempre teste o caminho que a aplicação realmente usa."
  },
  {
    "kind": "subhead",
    "text": "Comandos de observação - use somente em ambientes autorizados"
  },
  {
    "kind": "code",
    "text": "# Linux\nip -br addr\nip route\nip route get 10.20.30.25\nip neigh\ndig A api.exemplo.com\ndig AAAA api.exemplo.com\ncurl -4 -v https://api.exemplo.com/health\ncurl -6 -v https://api.exemplo.com/health\ntracepath api.exemplo.com"
  },
  {
    "kind": "code",
    "text": "# Windows PowerShell\nGet-NetIPAddress\nGet-NetRoute\nGet-NetNeighbor\nResolve-DnsName api.exemplo.com -Type A\nResolve-DnsName api.exemplo.com -Type AAAA\nTest-NetConnection api.exemplo.com -Port 443 -InformationLevel Detailed"
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Sintomas comuns e linhas iniciais de investigação.",
    "headers": [
      "Sintoma",
      "Hipóteses de rede",
      "Evidências úteis"
    ],
    "rows": [
      [
        "Nome resolve IP incorreto",
        "DNS split, cache, zona privada ausente",
        "dig/Resolve-DnsName no mesmo ambiente"
      ],
      [
        "No route to host",
        "Rota ausente, next hop, política local",
        "Tabela de rotas e ICMP"
      ],
      [
        "Funciona por IP, falha por nome",
        "DNS, SNI, certificado, proxy",
        "curl -v e resolução"
      ],
      [
        "Funciona IPv4, falha IPv6",
        "Rota v6, RA, firewall, DNS AAAA",
        "curl -4/-6, ip -6 route"
      ],
      [
        "Pacotes pequenos funcionam",
        "MTU/PMTUD, ICMP bloqueado",
        "tracepath, captura, Packet Too Big"
      ],
      [
        "Backend vê origem inesperada",
        "NAT, proxy, SNAT",
        "captura e logs dos hops"
      ],
      [
        "Somente retorno falha",
        "Assimetria, firewall stateful",
        "rotas nos dois lados e flow logs"
      ],
      [
        "Parte dos IPs funciona",
        "DNS com múltiplos A/AAAA, allowlist parcial",
        "testar cada endereço e logs"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.21 Estudos de caso",
    "id": "estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - Backend privado resolve para endereço público"
  },
  {
    "kind": "paragraph",
    "text": "Um gateway integrado à rede privada chama backend. O hostname possui endpoint público e private endpoint, mas a zona DNS privada não está vinculada à rede do gateway. A resolução retorna o endereço público. O firewall do backend bloqueia origem pública e o gateway registra connect timeout ou 403 no serviço de borda."
  },
  {
    "kind": "paragraph",
    "text": "O teste feito por um administrador em uma VM de outra VNet funciona porque aquela VNet possui a zona correta. A investigação deve comparar a resolução dentro do runtime do gateway. A correção é alinhar DNS privado, vínculo de zona e rota; adicionar o IP público à allowlist apenas contorna o desenho pretendido e pode ampliar exposição."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Máscaras diferentes no mesmo segmento"
  },
  {
    "kind": "paragraph",
    "text": "O gateway 192.168.50.10/24 precisa alcançar o appliance 192.168.51.20/23. Para o appliance, os dois endereços pertencem ao mesmo /23 e ele tenta responder diretamente por ARP. Para o gateway, 192.168.51.20 está fora do /24 e a requisição segue ao roteador. Os lados possuem percepções diferentes do enlace."
  },
  {
    "kind": "paragraph",
    "text": "A captura mostra requisição chegando ao appliance e ARP por 192.168.50.10 sem resposta no segmento esperado. A correção é tornar prefixos coerentes ou ajustar roteamento/topologia. Criar exceções de firewall não resolve uma discordância de sub-rede."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Allowlist cobre somente um endereço do gateway"
  },
  {
    "kind": "paragraph",
    "text": "Um serviço gerenciado de gateway possui múltiplos endereços de saída. O backend permite apenas um deles. Chamadas funcionam quando a conexão usa o IP permitido e falham quando a plataforma seleciona outro endereço. O sintoma parece aleatório e aumenta após escala ou manutenção."
  },
  {
    "kind": "paragraph",
    "text": "Os logs do backend mostram tentativas de origens diferentes. A solução é usar a lista oficial completa, integração privada ou mecanismo de identidade de serviço, conforme a plataforma. Fixar regra em um endereço observado ocasionalmente não é uma estratégia estável."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 4 - IPv6 quebrado escondido por Happy Eyeballs"
  },
  {
    "kind": "paragraph",
    "text": "A API publica A e AAAA. Usuários modernos acessam normalmente porque o cliente tenta IPv6, percebe atraso e utiliza IPv4. Monitores que forçam IPv6 falham. A organização acredita que dual stack está saudável porque a experiência comum não apresenta indisponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "Testes separados revelam ausência de rota de retorno IPv6 em um firewall. A correção inclui rota, regras e monitoramento por família. Happy Eyeballs melhora experiência, mas não substitui observabilidade explícita."
  },
  {
    "kind": "subhead",
    "text": "Princípio operacional"
  },
  {
    "kind": "paragraph",
    "text": "Em problemas de conectividade, escreva a cadeia completa de endereços antes e depois de DNS, balanceamento e NAT. A topologia lógica da aplicação não substitui o caminho efetivo dos pacotes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Laboratórios de observação",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Os exercícios abaixo devem ser executados apenas em máquina de desenvolvimento ou ambiente autorizado. Eles não exigem varredura de redes. O objetivo é observar a própria configuração, calcular prefixos de documentação e comparar famílias IP em um serviço controlado."
  },
  {
    "kind": "paragraph",
    "text": "Registre os resultados em uma tabela com horário, interface, endereço, prefixo, gateway, rota escolhida e resposta. O valor do laboratório está em relacionar a previsão teórica com a evidência, não apenas executar comandos."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Liste endereços e prefixos da máquina. Identifique loopback, endereço de LAN, link-local e IPv6 quando disponível.",
      "Escolha um destino autorizado e use o comando de route get para prever interface e próximo salto. Compare com captura ou traceroute.",
      "Calcule manualmente 192.0.2.77/27 e valide com Python ipaddress. Registre rede, broadcast e faixa de hosts.",
      "Divida 198.51.100.0/24 em quatro /26 e depois sumarize as duas primeiras redes.",
      "Resolva A e AAAA de um hostname sob seu controle. Teste separadamente com curl -4 e curl -6.",
      "Observe tabela ARP/neighbor antes e depois de acessar um host local autorizado. Em IPv6, identifique endereços link-local.",
      "Em um laboratório local, configure um serviço em 127.0.0.1 e verifique que ele não é alcançável por outro host.",
      "Use um servidor HTTP local com bind em 127.0.0.1 e depois em 0.0.0.0. Compare listeners, mantendo firewall e autorização adequados.",
      "Faça uma captura filtrada de uma tentativa IPv4 e uma IPv6. Compare TTL/Hop Limit, ARP/NDP e cabeçalhos.",
      "Documente um caminho de API fictício usando os blocos de documentação: consumidor, WAF, gateway e backend, incluindo rotas e traduções."
    ]
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
      "IP oferece encaminhamento de datagramas por endereços e não garante confiabilidade fim a fim.",
      "Nome, endereço e rota respondem a perguntas diferentes; DNS não substitui roteamento.",
      "IPv4 possui 32 bits; máscaras e CIDR separam prefixo e posições dentro da sub-rede.",
      "O cálculo de sub-rede depende de fronteiras binárias, não da classe histórica do endereço.",
      "VLSM permite tamanhos diferentes; sumarização exige blocos contíguos e propriedade coerente.",
      "/31 e /32 são exceções importantes à regra tradicional de hosts menos dois.",
      "Blocos privados não são globalmente roteáveis, mas não constituem mecanismo de segurança.",
      "NAT altera a origem observada e cria estado; cabeçalhos de proxy somente são confiáveis em cadeia controlada.",
      "Roteadores escolhem o prefixo correspondente mais longo; a rota padrão é apenas o último recurso.",
      "O caminho de retorno e a simetria importam para firewalls, NATs e balanceadores stateful.",
      "MTU e ICMP são essenciais; bloquear mensagens necessárias pode criar falhas seletivas.",
      "IPv6 possui 128 bits, cabeçalho base simplificado, endereços por escopo e não usa broadcast.",
      "Neighbor Discovery, Router Advertisement, SLAAC e DAD dependem de ICMPv6.",
      "Dual stack exige operação e monitoramento de duas famílias; Happy Eyeballs pode esconder uma delas quebrada.",
      "Em gateways, endereço inbound, endereço outbound, DNS privado, SNAT e cabeçalhos de origem devem ser tratados separadamente."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de diagnóstico para APIs"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Qual hostname a aplicação usa e quais registros A/AAAA ele retorna no ambiente do gateway?",
      "Qual endereço de destino foi realmente usado?",
      "Qual prefixo está configurado na interface de origem?",
      "Qual rota vence por longest prefix match e qual é o próximo salto?",
      "O destino é considerado on-link ou enviado ao gateway?",
      "Existe rota de retorno para o endereço de origem após tradução?",
      "Há NAT/SNAT e qual endereço o backend observa?",
      "Firewalls e allowlists cobrem todos os endereços e famílias necessários?",
      "Há sobreposição entre redes locais, VPNs, VNets ou parceiros?",
      "O problema ocorre somente com uma família IP?",
      "ICMP/ICMPv6 necessário para PMTUD e NDP está permitido?",
      "A falha depende do tamanho do pacote, certificado ou resposta?",
      "O private endpoint possui DNS privado correto e vínculo com a rede do gateway?",
      "X-Forwarded-For é sobrescrito por proxy confiável ou pode ser enviado pelo consumidor?",
      "Logs, captura e rotas foram coletados no mesmo horário e nos dois sentidos?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de fixação",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Diferencie nome, endereço, interface, prefixo e rota.",
      "Converta o último octeto da máscara /27 para binário e decimal.",
      "Calcule rede, broadcast e faixa de hosts de 10.20.30.150/25.",
      "Quantos endereços existem em /22 e quantas sub-redes /26 cabem nele?",
      "Explique por que classes A, B e C não devem ser usadas para inferir a máscara moderna.",
      "Mostre como 10.40.0.0/24 a 10.40.3.0/24 podem ser sumarizadas.",
      "Por que uma sobreposição RFC 1918 pode quebrar uma VPN?",
      "Explique as exceções de /31 e /32.",
      "Diferencie 10.0.0.0/8, 100.64.0.0/10 e 127.0.0.0/8.",
      "Por que endereço privado não equivale a rede segura?",
      "Explique longest prefix match com rota padrão, /8, /16 e /24.",
      "Como roteamento assimétrico afeta firewalls stateful?",
      "Compare fragmentação IPv4 e IPv6.",
      "Converta 2001:0db8:0000:0000:0000:0000:0000:0025 para forma canônica.",
      "Diferencie global unicast, ULA e link-local IPv6.",
      "Quais funções NDP oferece além de resolver vizinhos?",
      "Por que DHCPv6 não substitui necessariamente Router Advertisement?",
      "O que Happy Eyeballs resolve e o que ele pode esconder?",
      "Por que um private endpoint inbound não garante acesso privado do gateway ao backend?",
      "Como validar com segurança o IP original do consumidor atrás de proxies?"
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
      "Um gateway resolve api-interna.exemplo para 10.50.20.10, mas route get aponta para a Internet. Descreva hipóteses e correções.",
      "A API funciona por 198.51.100.25, mas falha pelo hostname. Liste as camadas e testes ainda necessários.",
      "Chamadas pequenas funcionam, mas respostas com certificado ou cabeçalhos maiores expiram em VPN. Proponha investigação de MTU.",
      "Um parceiro envia requisições por NAT e todos os usuários aparecem com o mesmo IP. Discuta impactos em rate limiting e auditoria.",
      "Uma API dual stack funciona para navegadores, mas o monitor IPv6 falha. Mostre como Happy Eyeballs influencia a percepção."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Respostas orientativas"
  },
  {
    "kind": "paragraph",
    "text": "Os cálculos devem demonstrar a fronteira binária. Para 10.20.30.150/25, a máscara é 255.255.255.128, o bloco começa em 128, a rede é 10.20.30.128, o broadcast é 10.20.30.255 e a faixa tradicional vai de .129 a .254. Um /22 contém 1.024 endereços e pode ser dividido em dezesseis /26."
  },
  {
    "kind": "paragraph",
    "text": "Na sumarização, 10.40.0.0/24 a 10.40.3.0/24 compartilham os primeiros 22 bits e formam 10.40.0.0/22. Longest prefix match seleciona o maior prefixo correspondente, independentemente de uma rota padrão também corresponder."
  },
  {
    "kind": "paragraph",
    "text": "Nos cenários, respostas fortes separam DNS, rota, política e aplicação. Funcionar por IP não valida hostname, SNI ou certificado. Problemas por tamanho sugerem MTU/PMTUD, mas precisam de captura e ICMP. IP original em cabeçalhos deve ser construído por proxies confiáveis, nunca aceito diretamente do consumidor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Termos essenciais do capítulo.",
    "headers": [
      "Termo",
      "Definição resumida"
    ],
    "rows": [
      [
        "A record",
        "Registro DNS que associa nome a endereço IPv4."
      ],
      [
        "AAAA record",
        "Registro DNS que associa nome a endereço IPv6."
      ],
      [
        "Anycast",
        "Mesmo endereço anunciado/atribuído em múltiplos pontos; roteamento escolhe um deles."
      ],
      [
        "Broadcast",
        "Entrega IPv4 a todos os nós de um domínio definido; não existe em IPv6."
      ],
      [
        "CIDR",
        "Notação e estratégia classless baseada em tamanho de prefixo."
      ],
      [
        "DAD",
        "Duplicate Address Detection do IPv6."
      ],
      [
        "Default route",
        "Rota /0 usada quando nenhuma mais específica corresponde."
      ],
      [
        "Dual stack",
        "Operação simultânea de IPv4 e IPv6."
      ],
      [
        "Gateway padrão",
        "Próximo salto para destinos sem rota mais específica."
      ],
      [
        "Global unicast",
        "Endereço IPv6 unicast com possibilidade de alcance global conforme roteamento."
      ],
      [
        "ICMP",
        "Protocolo de mensagens de controle e erro associado ao IP."
      ],
      [
        "Interface",
        "Ponto lógico ou físico ao qual endereços e rotas são associados."
      ],
      [
        "Link-local",
        "Endereço válido apenas no enlace local."
      ],
      [
        "Longest prefix match",
        "Seleção da rota correspondente mais específica."
      ],
      [
        "MTU",
        "Maior unidade que um enlace carrega sem fragmentação."
      ],
      [
        "NAT/PAT",
        "Tradução de endereços e, frequentemente, portas."
      ],
      [
        "NDP",
        "Neighbor Discovery Protocol do IPv6."
      ],
      [
        "Prefixo",
        "Conjunto inicial de bits que identifica uma rede."
      ],
      [
        "Private endpoint",
        "Interface/endereço privado que expõe serviço gerenciado dentro de rede virtual."
      ],
      [
        "RA",
        "Router Advertisement usado para informar roteador e parâmetros IPv6."
      ],
      [
        "SLAAC",
        "Autoconfiguração stateless de endereço IPv6."
      ],
      [
        "ULA",
        "Unique Local Address IPv6, destinado a uso interno."
      ],
      [
        "VLSM",
        "Uso de máscaras de tamanhos variáveis no mesmo plano."
      ],
      [
        "Zone identifier",
        "Identificador local de interface usado com endereços IPv6 de escopo limitado."
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
    "kind": "paragraph",
    "text": "RFC 791 - Internet Protocol: https://www.rfc-editor.org/rfc/rfc791"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4632 - Classless Inter-domain Routing (CIDR): https://www.rfc-editor.org/rfc/rfc4632"
  },
  {
    "kind": "paragraph",
    "text": "RFC 1918 - Address Allocation for Private Internets: https://www.rfc-editor.org/rfc/rfc1918"
  },
  {
    "kind": "paragraph",
    "text": "RFC 3021 - Using 31-Bit Prefixes on IPv4 Point-to-Point Links: https://www.rfc-editor.org/rfc/rfc3021"
  },
  {
    "kind": "paragraph",
    "text": "RFC 3927 - Dynamic Configuration of IPv4 Link-Local Addresses: https://www.rfc-editor.org/rfc/rfc3927"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5737 - IPv4 Address Blocks Reserved for Documentation: https://www.rfc-editor.org/rfc/rfc5737"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6598 - Shared Address Space: https://www.rfc-editor.org/rfc/rfc6598"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6890 - Special-Purpose IP Address Registries: https://www.rfc-editor.org/rfc/rfc6890"
  },
  {
    "kind": "paragraph",
    "text": "IANA - IPv4 Special-Purpose Address Registry: https://www.iana.org/assignments/iana-ipv4-special-registry/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8200 - Internet Protocol, Version 6 (IPv6) Specification: https://www.rfc-editor.org/rfc/rfc8200"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4291 - IPv6 Addressing Architecture: https://www.rfc-editor.org/rfc/rfc4291"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5952 - IPv6 Text Representation: https://www.rfc-editor.org/rfc/rfc5952"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4193 - Unique Local IPv6 Unicast Addresses: https://www.rfc-editor.org/rfc/rfc4193"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4861 - Neighbor Discovery for IPv6: https://www.rfc-editor.org/rfc/rfc4861"
  },
  {
    "kind": "paragraph",
    "text": "RFC 4862 - IPv6 Stateless Address Autoconfiguration: https://www.rfc-editor.org/rfc/rfc4862"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6164 - IPv6 Prefix Length for Inter-Router Links: https://www.rfc-editor.org/rfc/rfc6164"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8415 - DHCP for IPv6: https://www.rfc-editor.org/rfc/rfc8415"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8201 - Path MTU Discovery for IPv6: https://www.rfc-editor.org/rfc/rfc8201"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8305 - Happy Eyeballs Version 2: https://www.rfc-editor.org/rfc/rfc8305"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6146 - Stateful NAT64: https://www.rfc-editor.org/rfc/rfc6146"
  },
  {
    "kind": "paragraph",
    "text": "RFC 6147 - DNS64: https://www.rfc-editor.org/rfc/rfc6147"
  },
  {
    "kind": "paragraph",
    "text": "IANA - IPv6 Special-Purpose Address Registry: https://www.iana.org/assignments/iana-ipv6-special-registry/"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Azure API Management virtual network concepts: https://learn.microsoft.com/en-us/azure/api-management/virtual-network-concepts"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Set up inbound private endpoint for Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/private-endpoint"
  },
  {
    "kind": "paragraph",
    "text": "Microsoft - Deploy API Management in an internal virtual network: https://learn.microsoft.com/en-us/azure/api-management/api-management-using-with-internal-vnet"
  },
  {
    "kind": "subhead",
    "text": "Ordem recomendada de leitura"
  },
  {
    "kind": "paragraph",
    "text": "Leia RFC 4632 e RFC 1918 para consolidar IPv4 corporativo. Em seguida, use RFC 8200, RFC 4291 e RFC 5952 como base IPv6. Depois avance para NDP/SLAAC e consulte os registros IANA sempre que encontrar um bloco especial."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Encerramento",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "Endereçamento e roteamento formam a estrutura que permite ao transporte alcançar processos. O prefixo determina pertencimento, a tabela de rotas escolhe o próximo salto e traduções podem alterar a identidade observada. IPv4 e IPv6 utilizam princípios comuns, mas diferem em formato, escopos, autoconfiguração e tratamento de fragmentação."
  },
  {
    "kind": "paragraph",
    "text": "No próximo capítulo, o estudo avançará para DNS, NAT, proxies e balanceadores de carga. Esses componentes transformam nomes e caminhos em arquiteturas de alta disponibilidade e explicam por que uma única URL pode representar dezenas de endereços, regiões e instâncias."
  }
];
