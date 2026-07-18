import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Complete Portuguese transcription of FAAC Chapter 2.
export const TCP_UDP_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "No capítulo anterior, a camada de transporte apareceu como uma etapa do caminho percorrido por uma requisição de API. Agora ela será estudada de forma detalhada. TCP e UDP ficam entre a aplicação e o IP: recebem dados produzidos por processos, identificam os pontos de comunicação por portas e oferecem serviços de transporte com características diferentes. Essa posição explica por que uma API pode falhar antes que qualquer método HTTP seja processado."
  },
  {
    "kind": "paragraph",
    "text": "Para quem opera API Gateways, entender transporte é essencial porque o gateway participa de pelo menos duas relações de rede: recebe conexões dos consumidores e cria conexões para os backends. Essas relações são independentes. Uma chamada pode chegar corretamente ao listener externo e ainda falhar quando o gateway tenta abrir ou reutilizar um socket para o serviço interno. Timeouts, resets, filas de aceitação, pools, portas efêmeras e estados como TIME_WAIT tornam-se, portanto, parte do diagnóstico diário."
  },
  {
    "kind": "paragraph",
    "text": "O capítulo combina a especificação contemporânea do TCP, consolidada na RFC 9293, a definição clássica do UDP na RFC 768, os procedimentos de registro de portas da RFC 6335 e a interface de sockets padronizada pelo POSIX. Também são relacionados conceitos operacionais presentes em plataformas corporativas, como conexões persistentes, idle timeout, esgotamento de SNAT e rastreamento de falhas no Axway API Gateway e no Azure API Management."
  },
  {
    "kind": "paragraph",
    "text": "O objetivo não é memorizar todos os campos ou estados, mas construir um modelo mental preciso. Ao final, o leitor deverá conseguir observar um erro como connection refused, connection reset, connect timeout ou read timeout e formular hipóteses técnicas coerentes sobre onde a comunicação parou e quais evidências devem ser coletadas."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Acompanhe as explicações com uma captura de pacotes ou com os comandos apresentados no laboratório. O TCP é mais fácil de compreender quando SYN, ACK, números de sequência, janelas e encerramento deixam de ser abstrações e passam a ser eventos observáveis."
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
      "Explicar a função da camada de transporte e o processo de multiplexação por portas.",
      "Diferenciar socket, conexão, sessão de aplicação, porta e endpoint.",
      "Descrever o three-way handshake, o fluxo de bytes, números de sequência, ACKs e retransmissões do TCP.",
      "Distinguir controle de fluxo e controle de congestionamento.",
      "Compreender FIN, RST, half-close, TIME_WAIT e seus impactos operacionais.",
      "Explicar as características do UDP e reconhecer quando as garantias precisam ser implementadas pela aplicação.",
      "Entender portas conhecidas, registradas e efêmeras, incluindo bind e conflitos de porta.",
      "Relacionar pooling, keep-alive, NAT/SNAT e esgotamento de portas a falhas em gateways.",
      "Aplicar ferramentas e sintomas para investigar problemas de transporte em APIs corporativas."
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
      "2.1 A camada de transporte e sua relação com APIs",
      "2.2 Multiplexação, endpoints e tuplas de conexão",
      "2.3 Sockets como abstração do sistema operacional",
      "2.4 TCP: serviço confiável de fluxo de bytes",
      "2.5 Three-way handshake",
      "2.6 Números de sequência, ACKs e retransmissão",
      "2.7 Controle de fluxo",
      "2.8 Controle de congestionamento",
      "2.9 Encerramento, FIN, RST e TIME_WAIT",
      "2.10 Timers, timeouts, keep-alive e pooling",
      "2.11 UDP: transporte por datagramas",
      "2.12 TCP ou UDP: critérios de escolha",
      "2.13 Portas, registros IANA e portas efêmeras",
      "2.14 NAT, SNAT e esgotamento de portas",
      "2.15 TCP em API Gateways",
      "2.16 Troubleshooting e ferramentas",
      "2.17 Estudos de caso",
      "2.18 Laboratórios de observação",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.1 A camada de transporte e sua relação com APIs",
    "id": "camada-transporte"
  },
  {
    "kind": "paragraph",
    "text": "O protocolo IP entrega pacotes entre interfaces de rede identificadas por endereços, mas não identifica sozinho qual processo deve receber os dados dentro do computador. Um servidor pode executar simultaneamente um gateway, um banco de dados, um agente de monitoramento e serviços administrativos no mesmo endereço IP. A camada de transporte acrescenta identificadores de serviço -as portas - e permite que o sistema operacional entregue cada unidade recebida ao processo correto."
  },
  {
    "kind": "paragraph",
    "text": "A camada de transporte também define o tipo de serviço oferecido à aplicação. TCP oferece uma conexão lógica, um fluxo ordenado de bytes, detecção de perdas, retransmissão, controle de fluxo e controle de congestionamento. UDP oferece datagramas independentes com mecanismo mínimo: portas, tamanho e checksum. Essa diferença não significa que UDP seja defeituoso; significa que a aplicação escolhe quais garantias são necessárias e onde elas serão implementadas."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs HTTP/1.1 e HTTP/2, o transporte tradicional é TCP. A aplicação escreve bytes em um socket e o TCP decide como segmentá-los, transmiti-los, confirmá-los e retransmiti-los. O HTTP não recebe a informação de que um determinado segmento IP foi perdido; ele enxerga apenas um fluxo que demora mais ou uma conexão que termina. Essa separação de responsabilidades simplifica a aplicação, mas pode esconder a causa de latências e timeouts."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utiliza QUIC, que opera sobre UDP. QUIC implementa, no espaço de usuário, várias propriedades associadas a transportes confiáveis, incluindo estabelecimento seguro, recuperação de perdas e controle de congestionamento. Portanto, dizer que HTTP/3 usa UDP não significa que ele aceite perda descontrolada de dados; significa que as garantias foram construídas em outra camada."
  },
  {
    "kind": "subhead",
    "text": "Modelo mental"
  },
  {
    "kind": "paragraph",
    "text": "IP tenta levar pacotes ao host. TCP ou UDP identificam processos por portas. A aplicação interpreta o conteúdo. Em uma falha, determine primeiro em qual dessas responsabilidades a evidência aponta."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-1.svg",
    "alt": "Multiplexação de processos por endereços e portas",
    "caption": "Figura 1 - Multiplexação de processos por endereços e portas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.2 Multiplexação, endpoints e tuplas de conexão",
    "id": "multiplexacao"
  },
  {
    "kind": "paragraph",
    "text": "Um endpoint de transporte é normalmente representado pela combinação de endereço IP e porta. O endpoint 10.20.30.40:443 identifica uma interface e uma porta naquele host, mas não identifica sozinho uma conexão específica. Um servidor pode manter milhares de conexões simultâneas na porta 443 porque cada cliente utiliza um endereço e uma porta de origem diferentes."
  },
  {
    "kind": "paragraph",
    "text": "Uma conexão TCP é distinguida pela combinação de protocolo, IP de origem, porta de origem, IP de destino e porta de destino. Essa identificação é frequentemente chamada de 5-tuple; quando o protocolo está implícito, fala-se em 4-tuple. Assim, dois clientes podem acessar o mesmo endereço e a mesma porta do gateway sem conflito, e um único cliente pode abrir várias conexões usando portas efêmeras distintas."
  },
  {
    "kind": "paragraph",
    "text": "Multiplexação é o processo de combinar dados de vários processos em uma infraestrutura de rede compartilhada. Demultiplexação é o processo inverso: ao receber um segmento, o sistema operacional examina protocolo, endereços e portas para localizar o socket correspondente. Em UDP, a associação pode ser menos específica dependendo de como o socket foi ligado; em TCP, cada conexão estabelecida possui uma identidade precisa."
  },
  {
    "kind": "paragraph",
    "text": "A direção dos campos também importa. Em uma captura feita no cliente, a porta 443 aparece como destino no envio e como origem na resposta. Em uma captura no gateway, a conexão com o backend pode usar outra porta de origem, outro IP e até outro protocolo de segurança. O diagnóstico deve sempre indicar o ponto de observação para evitar interpretar a tupla ao contrário."
  },
  {
    "kind": "subhead",
    "text": "Exemplo de tuplas distintas"
  },
  {
    "kind": "code",
    "text": "Conexão A: TCP 192.0.2.10:51021 -> 203.0.113.20:443\nConexão B: TCP 192.0.2.10:51022 -> 203.0.113.20:443\nConexão C: TCP 192.0.2.11:49800 -> 203.0.113.20:443"
  },
  {
    "kind": "code",
    "text": "Todas chegam ao mesmo listener, mas são fluxos independentes."
  },
  {
    "kind": "subhead",
    "text": "Aplicação em logs"
  },
  {
    "kind": "paragraph",
    "text": "Ao correlacionar logs de firewall, balanceador e gateway, preserve IP e porta de origem. Apenas o IP pode não ser suficiente em ambientes com NAT, proxies e alto volume de conexões."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.3 Sockets como abstração do sistema operacional",
    "id": "sockets"
  },
  {
    "kind": "paragraph",
    "text": "Socket não é um protocolo transmitido pela rede. É uma abstração oferecida pelo sistema operacional para que processos usem serviços de comunicação. Em sistemas compatíveis com POSIX, socket() cria um descritor; bind() associa um endereço local; listen() marca um socket de fluxo como receptor de conexões; accept() retira uma conexão pendente da fila e cria um novo socket conectado; connect() inicia uma associação com um endpoint remoto."
  },
  {
    "kind": "paragraph",
    "text": "No servidor TCP, o socket de escuta permanece associado à porta publicada. Cada chamada bem-sucedida de accept() produz outro descritor dedicado a uma conexão. Essa distinção é importante: fechar um socket aceito termina apenas aquele cliente, enquanto fechar o socket de escuta impede novas conexões. Processos de gateway usam variações mais sofisticadas, com múltiplas threads, event loops ou processos, mas o princípio permanece."
  },
  {
    "kind": "paragraph",
    "text": "Um socket possui buffers de envio e recepção administrados pelo kernel. Quando a aplicação chama send(), os bytes podem ser apenas copiados para o buffer local; isso não significa que o peer já os recebeu ou processou. Da mesma forma, recv() pode retornar apenas parte do conteúdo solicitado. Aplicações baseadas em TCP precisam delimitar mensagens no nível do protocolo, porque o TCP preserva a ordem dos bytes, não as fronteiras das chamadas send()."
  },
  {
    "kind": "paragraph",
    "text": "Sockets podem ser bloqueantes ou não bloqueantes. No modo bloqueante, uma operação pode aguardar dados, espaço de buffer ou conclusão. No modo não bloqueante, a aplicação recebe um estado que indica que deve tentar novamente e utiliza mecanismos como select, poll, epoll ou IO completion ports. Gateways de alto desempenho evitam reservar uma thread bloqueada para cada conexão e usam modelos orientados a eventos ou pools controlados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-2.svg",
    "alt": "Operações conceituais de sockets no cliente e no servidor",
    "caption": "Figura 2 - Operações conceituais de sockets no cliente e no servidor."
  },
  {
    "kind": "subhead",
    "text": "Pseudocódigo - o código real deve tratar concorrência e erros"
  },
  {
    "kind": "code",
    "text": "# Fluxo conceitual de um servidor TCP\nfd_escuta = socket(AF_INET, SOCK_STREAM, 0)\nbind(fd_escuta, '0.0.0.0:8443')\nlisten(fd_escuta, backlog)"
  },
  {
    "kind": "code",
    "text": "while ativo:\n    fd_cliente = accept(fd_escuta)\n    tratar_conexao(fd_cliente)\n    close(fd_cliente)"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "0.0.0 não é um destino remoto"
    ]
  },
  {
    "kind": "paragraph",
    "text": "Ao fazer bind em 0.0.0.0, o processo solicita escuta em todas as interfaces IPv4 locais compatíveis. Consumidores não devem usar 0.0.0.0 como endereço de destino da API."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.4 TCP: serviço confiável de fluxo de bytes",
    "id": "tcp"
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9293 consolida a especificação moderna do Transmission Control Protocol. TCP é orientado a conexão: antes da troca normal de dados, os endpoints estabelecem estado comum. O protocolo fornece comunicação full-duplex, portanto cada lado pode enviar e receber simultaneamente. Cada direção possui sua própria sequência de bytes, janelas e confirmações."
  },
  {
    "kind": "paragraph",
    "text": "A unidade entregue à aplicação é um fluxo de bytes. Se uma aplicação chama send() duas vezes, o receptor pode ler os dados em uma única chamada ou em várias partes. TCP não mantém os limites lógicos de JSON, HTTP ou qualquer outra mensagem. Protocolos de aplicação resolvem enquadramento usando tamanho explícito, delimitadores, headers ou regras próprias; HTTP/1.1, por exemplo, usa Content-Length, transferência em chunks ou encerramento em contextos definidos."
  },
  {
    "kind": "paragraph",
    "text": "Confiabilidade significa que o TCP tenta entregar os bytes sem duplicação e na ordem, enquanto a conexão permanecer viável. O emissor atribui números de sequência, o receptor confirma o próximo byte esperado e segmentos não confirmados podem ser retransmitidos. Se a comunicação se tornar impossível, a aplicação recebe erro; TCP não pode garantir sucesso diante de falha permanente do peer ou da rede."
  },
  {
    "kind": "paragraph",
    "text": "O header TCP contém portas, números de sequência e reconhecimento, flags, janela, checksum e opções. O campo de janela participa do controle de fluxo. Flags como SYN, ACK, FIN e RST controlam o ciclo da conexão. Opções negociadas no handshake podem informar Maximum Segment Size, Window Scale, timestamps e suporte a Selective Acknowledgment."
  },
  {
    "kind": "paragraph",
    "text": "TCP não conhece requisições HTTP, tokens ou métodos REST. Ele transporta bytes. Uma conexão pode permanecer saudável enquanto a aplicação está travada e não produz resposta; nesse caso, o connect() já ocorreu, mas o consumidor pode experimentar read timeout. Separar conectividade de processamento da aplicação é uma das distinções mais úteis no troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Campos e funções relevantes do header TCP.",
    "headers": [
      "Elemento",
      "Função principal"
    ],
    "rows": [
      [
        "Porta origem/destino",
        "Identificar endpoints de transporte"
      ],
      [
        "Sequence Number",
        "Posicionar bytes no fluxo"
      ],
      [
        "Acknowledgment Number",
        "Indicar o próximo byte esperado"
      ],
      [
        "Flags",
        "Controlar abertura, confirmação, reset e encerramento"
      ],
      [
        "Window",
        "Anunciar capacidade de recepção"
      ],
      [
        "Checksum",
        "Detectar corrupção no segmento"
      ],
      [
        "Options",
        "Negociar extensões como MSS, SACK, WS e timestamps"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.5 Three-way handshake",
    "id": "handshake"
  },
  {
    "kind": "paragraph",
    "text": "O estabelecimento normal de uma conexão TCP utiliza três segmentos. O iniciador envia SYN com um número de sequência inicial. O receptor responde SYN+ACK, reconhecendo o SYN recebido e apresentando seu próprio número inicial. O iniciador conclui com ACK. Depois desse intercâmbio, os dois lados possuem estado suficiente para transportar bytes nas duas direções."
  },
  {
    "kind": "paragraph",
    "text": "O handshake não serve apenas para perguntar se a porta está aberta. Ele sincroniza espaços de sequência e permite negociar opções que afetarão a conexão inteira. MSS limita o tamanho do payload TCP que o peer pretende receber em um segmento; Window Scale amplia a capacidade de anúncio de janela; SACK Permitted habilita confirmações seletivas; timestamps auxiliam medição de RTT e proteção contra reutilização problemática de números."
  },
  {
    "kind": "paragraph",
    "text": "Quando não existe processo escutando na porta de destino, o host geralmente responde com RST, produzindo connection refused no cliente. Quando um firewall descarta silenciosamente o SYN, não há resposta imediata; o cliente retransmite e eventualmente atinge connect timeout. Esses sintomas parecem semelhantes para o usuário, mas apontam para comportamentos de rede diferentes."
  },
  {
    "kind": "paragraph",
    "text": "SYN backlog e accept queue também influenciam disponibilidade. O kernel precisa acompanhar conexões em estabelecimento e conexões concluídas que ainda aguardam accept() pela aplicação. Sob sobrecarga, ataque ou aplicação incapaz de aceitar rapidamente, filas podem saturar. O resultado pode ser perda de SYN, atrasos, resets ou falhas intermitentes mesmo com o processo aparentemente ativo."
  },
  {
    "kind": "paragraph",
    "text": "A latência do handshake contribui para o tempo total de uma chamada, especialmente em redes distantes ou quando novas conexões são criadas para cada requisição. Reutilização de conexões evita repetir o handshake TCP e, quando há TLS, também reduz negociações criptográficas. É por isso que keep-alive e connection pooling têm impacto importante em throughput e latência."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-3.svg",
    "alt": "Estabelecimento normal de uma conexão TCP",
    "caption": "Figura 3 - Estabelecimento normal de uma conexão TCP."
  },
  {
    "kind": "subhead",
    "text": "Connect timeout x read timeout"
  },
  {
    "kind": "paragraph",
    "text": "Connect timeout ocorre antes de a conexão ser estabelecida. Read timeout ocorre depois que existe conexão, mas os dados esperados não chegam no prazo. Configurações e hipóteses de causa são diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.6 Números de sequência, ACKs e retransmissão",
    "id": "sequencia"
  },
  {
    "kind": "paragraph",
    "text": "TCP numera bytes, não pacotes. Se um segmento carrega 500 bytes a partir do número 1000, o próximo byte esperado é 1500. O receptor usa o campo de acknowledgment para comunicar esse valor. ACKs tradicionais são cumulativos: ACK 2000 confirma que todos os bytes anteriores a 2000 foram recebidos de forma contínua, mesmo que segmentos posteriores já tenham chegado fora de ordem."
  },
  {
    "kind": "paragraph",
    "text": "Perdas podem ser detectadas por temporizador ou por padrão de ACKs. O emissor mantém uma estimativa do round-trip time e calcula um retransmission timeout conforme o algoritmo padronizado na RFC 6298. Quando o prazo expira sem confirmação, dados são retransmitidos e o temporizador é ajustado. Timeouts repetidos normalmente provocam backoff, aumentando o intervalo para evitar agravar congestionamento."
  },
  {
    "kind": "paragraph",
    "text": "ACKs duplicados podem indicar que um segmento intermediário faltou enquanto segmentos posteriores chegaram. Algoritmos de fast retransmit permitem retransmitir antes do RTO em determinadas condições. Com Selective Acknowledgment, o receptor informa blocos recebidos fora de ordem, permitindo que o emissor retransmita perdas específicas em vez de repetir uma faixa maior."
  },
  {
    "kind": "paragraph",
    "text": "Retransmissão melhora confiabilidade, mas aumenta latência. Uma API pode apresentar picos de tempo de resposta sem erro HTTP quando a camada de transporte recupera perdas. Métricas apenas da aplicação podem mostrar uma requisição lenta; captura de pacotes ou métricas do sistema podem revelar retransmissions, duplicate ACKs e variação de RTT."
  },
  {
    "kind": "paragraph",
    "text": "O checksum detecta corrupção durante o transporte, mas não é mecanismo criptográfico. Ele não protege contra alteração maliciosa e não substitui TLS. Sua finalidade é detectar erros acidentais no segmento e nos endereços considerados pelo pseudo-header. Integridade de segurança deve ser fornecida por protocolos criptográficos apropriados."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-4.svg",
    "alt": "ACK cumulativo e retransmissão de uma lacuna no fluxo",
    "caption": "Figura 4 - ACK cumulativo e retransmissão de uma lacuna no fluxo."
  },
  {
    "kind": "subhead",
    "text": "Leitura de captura"
  },
  {
    "kind": "paragraph",
    "text": "Uma retransmissão observada no gateway não prova automaticamente que o gateway causou a perda. A captura mostra o ponto de observação. Compare ambos os lados do caminho quando a localização exata da perda for importante."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.7 Controle de fluxo",
    "id": "fluxo"
  },
  {
    "kind": "paragraph",
    "text": "Controle de fluxo protege o receptor contra um emissor mais rápido do que sua capacidade de consumir dados. O receptor anuncia uma receive window, normalmente derivada do espaço disponível em seu buffer. O emissor limita a quantidade de bytes não confirmados para não ultrapassar essa janela. Se a aplicação receptora deixa de ler, o buffer pode encher e a janela diminuir."
  },
  {
    "kind": "paragraph",
    "text": "Quando o receptor anuncia janela zero, o emissor interrompe o envio normal e utiliza o mecanismo de persist para verificar periodicamente se a janela voltou a abrir. Uma conexão pode permanecer estabelecida, mas sem progresso de aplicação. Em diagnósticos, zero window e window full indicam pressão no lado receptor, não necessariamente congestionamento do caminho."
  },
  {
    "kind": "paragraph",
    "text": "O campo original de janela possui 16 bits. Em redes com grande produto largura de banda x atraso, esse limite pode impedir o uso completo do caminho. A opção Window Scale, definida atualmente na RFC 7323, negocia um fator no SYN para representar janelas maiores. A opção deve ser negociada durante o estabelecimento; não é ativada no meio da conexão."
  },
  {
    "kind": "paragraph",
    "text": "Buffers muito pequenos podem limitar throughput, enquanto buffers excessivos podem elevar latência e memória. O ajuste depende do sistema operacional, RTT, volume e padrão de tráfego. Alterar parâmetros globais sem medir pode trocar um problema por outro. Em gateways, também existem buffers e limites na camada de aplicação, portanto é necessário distinguir janela TCP de buffering HTTP."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-5.svg",
    "alt": "Limites independentes de recepção e congestionamento",
    "caption": "Figura 5 - Limites independentes de recepção e congestionamento."
  },
  {
    "kind": "subhead",
    "text": "rwnd não é rate limit"
  },
  {
    "kind": "paragraph",
    "text": "A janela TCP controla bytes em voo conforme a capacidade do receptor. Rate limiting de API controla requisições segundo uma política de negócio ou proteção. São mecanismos de camadas e unidades diferentes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.8 Controle de congestionamento",
    "id": "congestionamento"
  },
  {
    "kind": "paragraph",
    "text": "Controle de congestionamento protege a rede compartilhada. Mesmo que o receptor possua grande buffer, o caminho pode não suportar uma rajada de dados. TCP mantém uma congestion window no emissor e limita os bytes em voo pelo menor valor entre cwnd e receive window. Assim, controle de fluxo protege o destino e controle de congestionamento protege o caminho."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 5681 descreve algoritmos clássicos interligados: slow start, congestion avoidance, fast retransmit e fast recovery. Slow start começa com uma janela limitada e aumenta rapidamente à medida que ACKs retornam. Apesar do nome, o crescimento pode ser exponencial por round trip. Ao atingir um limiar ou observar perda, o algoritmo passa a comportamento mais conservador."
  },
  {
    "kind": "paragraph",
    "text": "Congestion avoidance geralmente segue a ideia de aumento aditivo e redução multiplicativa: a janela cresce gradualmente quando a rede parece saudável e diminui de forma significativa diante de sinais de congestionamento. Implementações modernas podem usar algoritmos como CUBIC, BBR ou variantes específicas, mas continuam precisando coexistir de forma responsável com outros fluxos."
  },
  {
    "kind": "paragraph",
    "text": "Perda não é o único sinal possível. Explicit Congestion Notification permite que equipamentos marquem pacotes em vez de descartá-los quando há suporte ponta a ponta. Filas, bufferbloat e jitter também afetam latência. Uma API pode transferir pouco conteúdo e ainda sofrer porque compartilha o caminho com fluxos maiores ou porque a fila do gargalo cresceu."
  },
  {
    "kind": "paragraph",
    "text": "Em data centers e nuvens, pequenos tempos de RTT tornam rajadas e microbursts relevantes. O throughput agregado de gateways pode ser limitado por CPU, criptografia, conexões ou rede. Antes de aumentar limites de aplicação, é necessário verificar se a camada de transporte está reagindo a congestionamento real e se a arquitetura distribui adequadamente o tráfego."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Conceitos de desempenho e recuperação no TCP.",
    "headers": [
      "Conceito",
      "Pergunta respondida",
      "Sinal típico"
    ],
    "rows": [
      [
        "Receive window",
        "O receptor consegue armazenar mais bytes?",
        "Janela reduzida ou zero window"
      ],
      [
        "Congestion window",
        "A rede aparenta suportar mais bytes em voo?",
        "Crescimento e redução conforme ACKs/perdas"
      ],
      [
        "RTT",
        "Quanto tempo a confirmação leva?",
        "Variação de latência"
      ],
      [
        "RTO",
        "Quando considerar dados não confirmados como perdidos?",
        "Retransmissão após timeout"
      ],
      [
        "SACK",
        "Quais blocos fora de ordem já chegaram?",
        "Recuperação mais seletiva"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.9 Encerramento, FIN, RST e TIME_WAIT",
    "id": "encerramento-tcp"
  },
  {
    "kind": "paragraph",
    "text": "TCP é full-duplex, por isso cada direção pode ser encerrada separadamente. FIN informa que o emissor não enviará novos bytes naquela direção, mas ainda pode receber dados. O peer reconhece o FIN com ACK e, quando também termina seu envio, transmite seu próprio FIN. O encerramento normal pode, portanto, envolver quatro segmentos."
  },
  {
    "kind": "paragraph",
    "text": "Half-close é o estado em que um lado encerrou sua direção de envio, mas continua recebendo. Algumas aplicações usam esse comportamento para indicar fim da entrada e aguardar resultado. HTTP persistente normalmente delimita mensagens sem depender do fechamento, pois fechar a conexão impediria seu reaproveitamento."
  },
  {
    "kind": "paragraph",
    "text": "RST encerra a conexão de forma abrupta e indica que o estado esperado não existe ou que um endpoint decidiu abortar. Connection reset by peer pode ocorrer quando a aplicação fecha um socket com dados pendentes, um intermediário remove estado, um processo reinicia ou um segmento chega para uma conexão que já não é conhecida. Identificar quem enviou o RST é decisivo."
  },
  {
    "kind": "paragraph",
    "text": "TIME_WAIT é um estado mantido normalmente pelo lado que realizou o fechamento ativo e enviou o ACK final. Ele permite absorver segmentos atrasados da conexão anterior e retransmitir o ACK final se necessário. A duração depende da implementação e se relaciona ao maximum segment lifetime. TIME_WAIT não é vazamento por definição; é parte do funcionamento seguro do TCP."
  },
  {
    "kind": "paragraph",
    "text": "Grande quantidade de TIME_WAIT pode indicar alta taxa de abertura e fechamento. O problema não é apenas memória: portas efêmeras podem ficar temporariamente indisponíveis para o mesmo destino, especialmente com NAT. Reutilizar conexões é geralmente mais saudável do que tentar eliminar estados ajustando parâmetros agressivos do sistema operacional."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-6.svg",
    "alt": "Encerramento normal e permanência em TIME_WAIT",
    "caption": "Figura 6 - Encerramento normal e permanência em TIME_WAIT."
  },
  {
    "kind": "subhead",
    "text": "RST não é código HTTP"
  },
  {
    "kind": "paragraph",
    "text": "Um reset ocorre na camada de transporte. O consumidor pode não receber qualquer resposta HTTP, ou um intermediário pode converter a falha em 502/503. Diferencie o evento TCP da representação gerada por um gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.10 Timers, timeouts, keep-alive e pooling",
    "id": "timers"
  },
  {
    "kind": "paragraph",
    "text": "Timeout é uma política de espera aplicada em um ponto específico. Connect timeout limita o estabelecimento; read ou response timeout limita a espera por dados depois da conexão; write timeout limita progresso de envio; idle timeout encerra conexões sem atividade; request timeout pode abranger várias etapas. Produtos e bibliotecas usam nomes diferentes, portanto a documentação deve indicar exatamente o relógio iniciado e o evento que o encerra."
  },
  {
    "kind": "paragraph",
    "text": "TCP keepalive é um mecanismo do sistema operacional para detectar peers inacessíveis em conexões ociosas, geralmente com valores padrão longos. HTTP keep-alive ou persistent connection significa reutilizar a conexão para múltiplas mensagens. São conceitos relacionados, mas não equivalentes. Uma conexão HTTP pode ser persistente sem probes TCP keepalive frequentes."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling mantém um conjunto de conexões prontas para determinado destino. O pool reduz handshakes, uso de CPU, latência e consumo de portas. Porém, exige limites, validação de conexões, idle timeout e estratégia para conexões que o peer fechou silenciosamente. Uma conexão retirada do pool pode estar stale, produzindo reset ou falha na primeira escrita."
  },
  {
    "kind": "paragraph",
    "text": "Timeouts precisam ser alinhados entre hops. Se o balanceador encerra conexões ociosas em 60 segundos e o gateway acredita que elas permanecem válidas por cinco minutos, o pool pode reutilizar sockets que já foram removidos pelo intermediário. Se o timeout do cliente é menor que o timeout do gateway, o gateway pode continuar processando uma operação cujo consumidor já desistiu, com risco de retries e duplicidade."
  },
  {
    "kind": "paragraph",
    "text": "Retries não devem ser adicionados automaticamente a toda falha. Uma operação pode ter sido processada no backend mesmo que a resposta tenha se perdido ou que o cliente tenha expirado. Métodos e operações idempotentes permitem estratégias mais seguras; operações financeiras precisam de chaves de idempotência, correlação e regras explícitas antes de repetição."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - Timeouts precisam ser nomeados pela etapa que controlam.",
    "headers": [
      "Timeout",
      "Início típico",
      "Exemplo de causa"
    ],
    "rows": [
      [
        "DNS timeout",
        "Consulta de nome",
        "Resolver indisponível ou rota bloqueada"
      ],
      [
        "Connect timeout",
        "Envio do SYN/conexão",
        "Firewall descartando, rota ou backlog"
      ],
      [
        "TLS handshake timeout",
        "Após TCP, durante TLS",
        "Certificado, algoritmo ou peer lento"
      ],
      [
        "Read/response timeout",
        "Após envio da requisição",
        "Backend lento, deadlock ou perda recuperada"
      ],
      [
        "Idle timeout",
        "Sem bytes por período",
        "Conexão persistente sem atividade"
      ],
      [
        "Pool acquire timeout",
        "Espera por conexão do pool",
        "Pool saturado ou vazamento"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Axway e conexões persistentes"
  },
  {
    "kind": "paragraph",
    "text": "A documentação do Axway API Gateway permite configurar remote hosts e idle timeout para conexões persistentes. O valor deve ser coerente com firewalls, balanceadores e backends que participam do mesmo hop."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.11 UDP: transporte por datagramas",
    "id": "udp"
  },
  {
    "kind": "paragraph",
    "text": "UDP foi definido para oferecer comunicação por datagramas com mecanismo mínimo. Cada envio produz uma unidade de mensagem preservada: um recvfrom() recebe um datagrama, não um trecho arbitrário de fluxo como no TCP. O header possui portas de origem e destino, comprimento e checksum. A simplicidade reduz estado e sobrecarga, mas não fornece conexão confiável."
  },
  {
    "kind": "paragraph",
    "text": "UDP não garante entrega, ordem, eliminação de duplicatas ou controle de congestionamento. Datagramas podem ser perdidos, repetidos ou chegar fora de ordem. Se a aplicação precisa dessas propriedades, deve implementá-las ou utilizar um protocolo sobre UDP que as forneça. Essa responsabilidade inclui temporizadores, identificadores, retransmissão, controle de taxa e tratamento de fragmentação."
  },
  {
    "kind": "paragraph",
    "text": "O tamanho da mensagem é importante. Um datagrama grande pode exigir fragmentação IP ou exceder o path MTU, aumentando risco de perda. Aplicações robustas evitam depender de fragmentação e projetam tamanhos adequados. Em redes com filtros, UDP também pode ter comportamento diferente de TCP, porque dispositivos mantêm estado temporário baseado em fluxos sem handshake."
  },
  {
    "kind": "paragraph",
    "text": "DNS é um exemplo clássico de protocolo que usa UDP para consultas comuns e pode usar TCP em situações específicas. QUIC utiliza UDP como substrato, mas implementa conexão, criptografia, streams, recuperação e congestionamento. Aplicações de voz e vídeo em tempo real podem preferir descartar dados atrasados em vez de aguardar retransmissão, mas ainda precisam controlar taxa e lidar com perda."
  },
  {
    "kind": "paragraph",
    "text": "UDP possui checksum para detecção de erro, porém não autentica o emissor. Como não há handshake equivalente ao TCP, falsificação de endereço e amplificação precisam ser consideradas no desenho de serviços públicos. Protocolos devem validar pedidos, limitar respostas e seguir práticas de prevenção de abuso."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-7.svg",
    "alt": "Comparação dos serviços oferecidos ao nível da aplicação",
    "caption": "Figura 7 - Comparação dos serviços oferecidos ao nível da aplicação."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - Header UDP clássico de 8 bytes.",
    "headers": [
      "Campo UDP",
      "Tamanho",
      "Finalidade"
    ],
    "rows": [
      [
        "Source Port",
        "16 bits",
        "Porta de origem; pode ser zero em contextos permitidos"
      ],
      [
        "Destination Port",
        "16 bits",
        "Porta do processo de destino"
      ],
      [
        "Length",
        "16 bits",
        "Comprimento do header e dos dados"
      ],
      [
        "Checksum",
        "16 bits",
        "Detecção de erro sobre pseudo-header, header e dados"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.12 TCP ou UDP: critérios de escolha",
    "id": "escolha"
  },
  {
    "kind": "paragraph",
    "text": "A escolha não deve ser baseada apenas em frases como TCP é seguro e UDP é rápido. TCP não fornece segurança criptográfica, e UDP não é automaticamente mais rápido em qualquer aplicação. O critério central é o serviço necessário: fluxo confiável e ordenado, datagramas independentes, tolerância a dados atrasados, controle sobre retransmissão, mobilidade, multiplexação de streams e compatibilidade com infraestrutura."
  },
  {
    "kind": "paragraph",
    "text": "Para APIs REST tradicionais, TCP continua natural porque HTTP/1.1 e HTTP/2 foram projetados sobre fluxo confiável. O custo de estabelecer conexão pode ser amortizado com pooling. Para HTTP/3, QUIC foi criado sobre UDP para reduzir limitações de transporte e integrar segurança, mas isso não transforma uma aplicação UDP simples em equivalente ao TCP."
  },
  {
    "kind": "paragraph",
    "text": "Em tempo real, a informação pode perder valor rapidamente. Um pacote de áudio atrasado pode ser pior do que um pequeno intervalo, e retransmissão indiscriminada pode aumentar latência. Em transferência de arquivos ou operações financeiras, a entrega correta e a confirmação são essenciais. Mesmo assim, semântica de negócio como exatamente uma vez não é fornecida automaticamente pelo TCP; a aplicação precisa de idempotência e persistência."
  },
  {
    "kind": "paragraph",
    "text": "Infraestrutura também influencia. Firewalls, NATs, proxies e observabilidade podem tratar UDP de forma diferente. Antes de escolher, valide suporte no caminho, comportamento sob perda, estratégia de segurança, limites de MTU e ferramentas de operação. Arquitetura corporativa precisa considerar não apenas desempenho de laboratório, mas governança e capacidade de diagnóstico."
  },
  {
    "kind": "subhead",
    "text": "Exatamente uma vez"
  },
  {
    "kind": "paragraph",
    "text": "TCP garante um fluxo de bytes sem duplicação dentro de uma conexão, mas não garante que uma operação de negócio seja executada exatamente uma vez diante de retries, falhas e reconexões. Essa propriedade exige desenho na aplicação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.13 Portas, registros IANA e portas efêmeras",
    "id": "portas"
  },
  {
    "kind": "paragraph",
    "text": "Portas são números de 16 bits, portanto variam de 0 a 65535. A IANA mantém o Service Name and Transport Protocol Port Number Registry e a RFC 6335 descreve procedimentos de gestão. O intervalo 0-1023 é tradicionalmente chamado de System Ports ou Well-Known Ports; 1024-49151 corresponde a User ou Registered Ports; 49152-65535 é Dynamic and/or Private Ports."
  },
  {
    "kind": "paragraph",
    "text": "O registro não significa que uma porta esteja tecnicamente reservada em todos os sistemas, nem que usar um número conhecido faça o protocolo correspondente aparecer. Um processo pode tentar escutar em uma porta diferente, sujeito a permissões e políticas. O registro promove interoperabilidade e descoberta, mas a segurança deve validar protocolo e identidade, não apenas o número da porta."
  },
  {
    "kind": "paragraph",
    "text": "Portas efêmeras são escolhidas pelo sistema operacional para conexões de saída. O intervalo efetivo pode variar por plataforma e configuração, mesmo que a faixa dinâmica da IANA seja referência. Quando um cliente abre conexão para 443, ele normalmente recebe uma porta local temporária. O par local e remoto precisa permanecer único enquanto a conexão e certos estados relacionados existem. bind() pode associar o socket a um endereço específico, a todas as interfaces ou a uma porta escolhida. Erro address already in use pode ocorrer quando outro socket já ocupa a combinação ou quando regras de reutilização não permitem nova associação. SO_REUSEADDR e opções semelhantes têm semântica dependente do sistema e não devem ser usadas como solução genérica sem compreender o efeito."
  },
  {
    "kind": "paragraph",
    "text": "Escutar em todas as interfaces aumenta a superfície de exposição. Um serviço administrativo que deveria estar apenas em loopback ou rede interna pode ser publicado acidentalmente. Firewalls continuam necessários, mas o princípio de menor exposição recomenda ligar listeners somente aos endereços exigidos e documentar cada porta aberta."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Faixas de portas segundo a classificação usada no registro IANA.",
    "headers": [
      "Faixa",
      "Classificação IANA",
      "Uso típico"
    ],
    "rows": [
      [
        "0-1023",
        "System / Well-Known",
        "Serviços amplamente padronizados; privilégios podem ser exigidos"
      ],
      [
        "1024-49151",
        "User / Registered",
        "Aplicações e serviços registrados"
      ],
      [
        "49152-65535",
        "Dynamic / Private",
        "Alocação dinâmica e uso privado"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Porta 443 não prova HTTPS"
  },
  {
    "kind": "paragraph",
    "text": "Um processo pode aceitar qualquer protocolo na porta 443, e HTTPS pode ser configurado em outra porta. A porta cria uma convenção operacional; a negociação e os bytes observados determinam o protocolo real."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.14 NAT, SNAT e esgotamento de portas",
    "id": "nat-snat"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifica endereços e, frequentemente, portas para permitir que múltiplos fluxos compartilhem um endereço. Em conexões de saída, Source NAT substitui o endereço privado e a porta de origem por uma combinação pública ou intermediária. O equipamento mantém estado para devolver as respostas ao fluxo correto."
  },
  {
    "kind": "paragraph",
    "text": "Como a porta faz parte da identidade da conexão, o tradutor possui inventário finito por endereço e pelas regras de reutilização. Muitas conexões simultâneas ou alta taxa de abre-fecha para o mesmo destino podem consumir portas disponíveis. Estados mantidos após o fechamento, como TIME_WAIT ou tempos de retenção do NAT, atrasam reutilização."
  },
  {
    "kind": "paragraph",
    "text": "O sintoma comum é intermitência: algumas conexões funcionam e novas conexões ao mesmo host e porta falham até que recursos sejam liberados. A aplicação pode registrar connect timeout, socket exception ou 5xx gerado por um intermediário. Aumentar timeout não cria portas e pode piorar pressão ao manter recursos ocupados por mais tempo."
  },
  {
    "kind": "paragraph",
    "text": "As primeiras correções são arquiteturais: reutilizar conexões, dimensionar pools, reduzir criação desnecessária, distribuir destinos quando legítimo e usar conectividade privada ou NAT dimensionado conforme a plataforma. Adicionar IPs expande inventário, mas pode apenas adiar o problema se o padrão de conexão continuar ineficiente."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, chamadas a backends podem consumir portas SNAT conforme topologia e destino. A documentação oficial descreve falhas intermitentes e estratégias como NAT Gateway em cenários compatíveis, múltiplos IPs de backend e redução de abertura repetitiva. Métricas de conexões, destino e taxa ajudam a confirmar a hipótese."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-8.svg",
    "alt": "Conexões do gateway e pressão sobre portas de saída",
    "caption": "Figura 8 - Conexões do gateway e pressão sobre portas de saída."
  },
  {
    "kind": "subhead",
    "text": "Sinal operacional"
  },
  {
    "kind": "paragraph",
    "text": "Se falhas crescem com a taxa de novas conexões, concentram-se no mesmo destino e desaparecem após redução de carga, investigue pooling e SNAT. Ainda assim, confirme com métricas e capturas antes de concluir."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.15 TCP em API Gateways",
    "id": "api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Um gateway HTTP atua como proxy e termina uma conexão do consumidor. Ele interpreta a mensagem e, para encaminhá-la, utiliza outra conexão até o backend. Mesmo quando ambos os hops usam TCP 443, são sockets, números de sequência, certificados, timeouts e estados independentes. O gateway não simplesmente estende o mesmo fluxo TCP até o serviço."
  },
  {
    "kind": "paragraph",
    "text": "No frontside, preocupações incluem capacidade do listener, SYN backlog, limite de conexões, TLS externo, keep-alive do cliente e proteção contra conexões lentas. No backside, o gateway precisa resolver o nome do backend, adquirir ou abrir conexão do pool, negociar TLS interno quando aplicável, enviar a requisição e aguardar resposta. Uma falha de backend pode ser convertida em 502, 503 ou 504 conforme a plataforma e a etapa."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling no gateway deve considerar destino por host, IP, porta, protocolo e configuração de segurança. Mudanças de DNS, rotação de certificados e balanceamento podem interagir com conexões existentes. TTL de DNS não encerra automaticamente sockets já conectados; uma mudança de endereço afeta novas conexões, enquanto conexões persistentes podem continuar no destino antigo até serem fechadas."
  },
  {
    "kind": "paragraph",
    "text": "Idle timeout precisa ser compatível com intermediários. Se o firewall remove estado antes do gateway, uma conexão aparentemente disponível no pool pode falhar. Health checks validam disponibilidade de forma parcial e não garantem que toda requisição de negócio funcionará. Circuit breakers e retries devem ser usados com semântica de idempotência e telemetria."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, remote host settings permitem controlar propriedades de conexões persistentes, incluindo idle timeout. No Azure API Management, tracing, diagnósticos e métricas ajudam a separar falhas de processamento de políticas de falhas de conectividade e de SNAT. Em ambos, o engenheiro deve identificar se o erro ocorreu antes do listener, no processamento inbound, na conexão outbound ou após o backend responder."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Uma requisição pode atravessar várias conexões independentes.",
    "headers": [
      "Hop",
      "Estado independente",
      "Falhas representativas"
    ],
    "rows": [
      [
        "Consumidor -> borda/gateway",
        "TCP, TLS e keep-alive externos",
        "SYN bloqueado, reset do cliente, handshake lento"
      ],
      [
        "Gateway -> backend",
        "Pool, DNS, TCP, TLS e timeout interno",
        "Connect timeout, stale connection, reset, SNAT"
      ],
      [
        "Backend -> dependências",
        "Sockets próprios da aplicação",
        "Pool de banco esgotado, fila, downstream lento"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Pergunta de troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "O cliente conseguiu estabelecer TCP com o endereço público? O gateway recebeu a requisição? O gateway adquiriu uma conexão para o backend? O backend enviou algum byte de resposta? Essas perguntas dividem o problema em etapas observáveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.16 Troubleshooting e ferramentas",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting de transporte começa pela definição do sintoma e do ponto de observação. Connection refused indica rejeição imediata, normalmente por RST. Connect timeout indica ausência de conclusão no prazo. Connection reset indica encerramento abrupto de uma conexão existente ou em estabelecimento. Read timeout indica que a aplicação esperou dados depois de conectar. No route to host aponta para roteamento ou sinalização de rede."
  },
  {
    "kind": "paragraph",
    "text": "Comandos de sockets mostram estado local. ss -lntp identifica listeners TCP e processos; ss -ant mostra conexões e estados; lsof -i relaciona descritores e rede; netstat pode existir em sistemas mais antigos. Em Windows, Get-NetTCPConnection e netstat -ano fornecem informações equivalentes. A ausência de listener no endereço esperado deve ser resolvida antes de investigar HTTP. curl -v exibe resolução, tentativa de conexão, TLS e HTTP. O tempo pode ser separado com opções de métricas. nc ou Test-NetConnection ajudam a testar abertura de porta, mas sucesso apenas prova conexão TCP; não valida protocolo, certificado, autenticação ou regra de negócio. openssl s_client é útil no capítulo de TLS para inspecionar handshake e cadeia. tcpdump e Wireshark permitem observar SYN, SYN+ACK, ACK, FIN, RST, retransmissões, janelas e RTT. Capturas devem ser feitas com autorização, filtragem e proteção de dados. Payloads podem conter informações sensíveis. Sempre registre horário, interfaces, direção e topologia para correlacionar eventos."
  },
  {
    "kind": "paragraph",
    "text": "Logs do gateway completam a captura. Um pacote mostra transporte; o trace mostra políticas e decisões de aplicação. Métricas revelam padrão temporal: conexões ativas, taxa de novas conexões, erros de backend, saturação de pool e latência. Uma investigação robusta combina evidências em vez de confiar em uma única mensagem de erro."
  },
  {
    "kind": "subhead",
    "text": "Comandos de observação - adapte ao sistema e às políticas do ambiente"
  },
  {
    "kind": "code",
    "text": "# Linux - listeners e conexões\nss -lntp\nss -ant state time-wait\nss -s\nlsof -nP -iTCP:8443 -sTCP:LISTEN"
  },
  {
    "kind": "code",
    "text": "# Testes de cliente\ncurl -v --connect-timeout 5 https://api.exemplo.com/health\nnc -vz api.exemplo.com 443"
  },
  {
    "kind": "code",
    "text": "# Captura autorizada\nsudo tcpdump -i any -nn 'tcp port 443 and host 10.20.30.40'"
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - Mapeamento inicial entre sintomas e hipóteses.",
    "headers": [
      "Sintoma",
      "Evidência provável",
      "Hipóteses iniciais"
    ],
    "rows": [
      [
        "Connection refused",
        "RST após SYN",
        "Sem listener, porta incorreta, rejeição ativa"
      ],
      [
        "Connect timeout",
        "SYN retransmitido sem resposta",
        "Firewall drop, rota, peer indisponível, fila"
      ],
      [
        "Reset by peer",
        "RST em conexão",
        "Aplicação abortou, stale pool, intermediário removeu estado"
      ],
      [
        "Read timeout",
        "Conexão estabelecida sem resposta suficiente",
        "Backend lento, dependência travada, perda ou janela zero"
      ],
      [
        "Address already in use",
        "bind falha",
        "Listener existente, conflito ou estado/reuso"
      ],
      [
        "Too many open files",
        "Falha ao criar/aceitar socket",
        "Limite de descritores ou vazamento"
      ],
      [
        "Muitos TIME_WAIT",
        "Alta taxa de fechamento ativo",
        "Sem pooling, retries, conexões curtas"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.17 Estudos de caso",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 1 - API pública funciona, mas o backend retorna 504 intermitente"
  },
  {
    "kind": "paragraph",
    "text": "O consumidor estabelece TCP e TLS com o gateway e envia a requisição. O trace inbound confirma autenticação e roteamento. Entretanto, em horários de pico, o gateway não recebe resposta do backend dentro do prazo e gera 504. A primeira conclusão não deve ser que o gateway está lento; o código representa timeout no hop de upstream."
  },
  {
    "kind": "paragraph",
    "text": "A investigação correlaciona latência do backend, conexões do pool e capturas. Verifica-se que novas conexões são abertas em excesso porque o backend responde com fechamento frequente. A taxa de conexões aumenta, portas de saída ficam pressionadas e alguns connects demoram. A correção inclui alinhar keep-alive, reutilizar conexões e medir o limite de SNAT, em vez de apenas aumentar o response timeout."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 2 - Erros connection reset após período ocioso"
  },
  {
    "kind": "paragraph",
    "text": "O pool do gateway mantém conexões por cinco minutos, mas um firewall intermediário remove conexões inativas após sessenta segundos. Quando uma nova requisição chega, o gateway seleciona um socket que considera válido. O primeiro envio encontra estado inexistente no firewall ou no peer e recebe reset."
  },
  {
    "kind": "paragraph",
    "text": "A correção é alinhar idle timeouts e configurar validação ou reciclagem antes do limite inferior do caminho. TCP keepalive pode ajudar em alguns cenários, mas não substitui configuração coerente. Capturas nos dois lados mostram que o reset é produzido depois do período de ociosidade, confirmando a relação com estado stale."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Caso 3 - Duplicidade após timeout do cliente"
  },
  {
    "kind": "paragraph",
    "text": "O cliente envia uma operação de criação e expira em dez segundos. O gateway e o backend continuam processando, e a transação é confirmada no segundo onze. O cliente interpreta o timeout como falha e repete a chamada, criando efeito duplicado. TCP garantiu o transporte de cada tentativa; ele não conhece a identidade lógica da operação."
  },
  {
    "kind": "paragraph",
    "text": "A solução envolve chave de idempotência, consulta de status, correlação e política de retry baseada na semântica. A cadeia de timeouts também deve ser projetada para que componentes internos não continuem indefinidamente após abandono do consumidor. Esse caso demonstra por que confiabilidade de transporte não equivale a confiabilidade de negócio."
  },
  {
    "kind": "subhead",
    "text": "Princípio de operação"
  },
  {
    "kind": "paragraph",
    "text": "Antes de alterar um timeout, descreva qual etapa está excedendo o prazo, se a operação pode continuar no servidor e qual será o comportamento de retry. Um número maior pode esconder saturação e ampliar impactos."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.18 Laboratórios de observação",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Os laboratórios abaixo são seguros para execução em uma máquina de desenvolvimento ou ambiente autorizado. O objetivo é observar comportamento, não realizar teste de carga. Use apenas endereços e serviços sob seu controle. Capturas de ambientes corporativos exigem autorização e tratamento adequado de dados."
  },
  {
    "kind": "paragraph",
    "text": "No primeiro laboratório, execute um pequeno servidor local, conecte-se e observe a criação do socket. No segundo, compare conexão recusada e timeout usando destinos controlados. No terceiro, observe estados ESTABLISHED e TIME_WAIT. O resultado exato varia por sistema operacional, firewall e versão, e essa variação faz parte do aprendizado."
  },
  {
    "kind": "subhead",
    "text": "Servidor TCP local em Python"
  },
  {
    "kind": "code",
    "text": "# servidor_tcp.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "HOST, PORT = '127.0.0.1', 9090\nwith socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:\n    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n    server.bind((HOST, PORT))\n    server.listen(10)\n    print(f'Escutando em {HOST}:{PORT}')\n    conn, addr = server.accept()\n    with conn:\n        print('Cliente:', addr)\n        data = conn.recv(4096)\n        conn.sendall(b'RECEBIDO: ' + data)"
  },
  {
    "kind": "subhead",
    "text": "Cliente TCP local em Python"
  },
  {
    "kind": "code",
    "text": "# cliente_tcp.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "with socket.create_connection(('127.0.0.1', 9090), timeout=3) as sock:\n    sock.sendall(b'ola gateway')\n    print(sock.recv(4096).decode())"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Antes de iniciar o servidor, execute o cliente e registre o erro. Verifique se o sistema responde com connection refused.",
      "Inicie o servidor, execute ss -lntp ou netstat -ano e identifique o listener na porta 9090.",
      "Execute o cliente e observe a conexão ESTABLISHED durante uma pausa adicionada ao código.",
      "Capture apenas a porta local e identifique SYN, SYN+ACK, ACK, dados, FIN e ACKs.",
      "Altere o servidor para dormir antes da resposta e configure timeout curto no cliente. Observe que a conexão foi estabelecida, mas a leitura expirou.",
      "Repita várias conexões sequenciais e observe TIME_WAIT. Depois modifique o cliente para reutilizar uma conexão em um protocolo simples e compare."
    ]
  },
  {
    "kind": "subhead",
    "text": "Não confunda teste de porta com teste de API"
  },
  {
    "kind": "paragraph",
    "text": "nc ou Test-NetConnection demonstram que o handshake TCP foi possível. Uma API ainda pode falhar em TLS, HTTP, autenticação, políticas ou backend. Registre explicitamente o nível validado."
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
      "A camada de transporte entrega dados a processos por meio de portas e oferece serviços diferentes à aplicação.",
      "Socket é uma abstração do sistema operacional; conexão TCP é um estado distribuído entre endpoints.",
      "TCP transporta fluxo de bytes confiável e ordenado, usando sequência, ACK, retransmissão, controle de fluxo e congestionamento.",
      "O three-way handshake sincroniza estado e negocia opções; falhas antes e depois dele produzem sintomas diferentes.",
      "Receive window protege o receptor; congestion window protege a rede.",
      "FIN encerra uma direção normalmente; RST aborta; TIME_WAIT protege contra segmentos atrasados e perda do ACK final.",
      "UDP preserva datagramas, mas não fornece entrega, ordem ou retransmissão; protocolos superiores podem acrescentar garantias.",
      "Portas efêmeras e traduções SNAT são recursos finitos. Pooling e reutilização reduzem pressão e latência.",
      "Um gateway mantém conexões independentes com clientes e backends. Cada hop possui estados, timeouts e causas de falha próprios.",
      "Diagnóstico eficaz combina sintomas, estados de socket, captura de pacotes, logs do gateway e métricas."
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
      "O nome foi resolvido para o IP esperado?",
      "Existe rota até o endereço e a porta?",
      "Há SYN+ACK ou RST? O connect terminou?",
      "Qual lado enviou FIN ou RST?",
      "A conexão foi estabelecida, mas faltou resposta?",
      "Existem retransmissões, zero window ou RTT elevado?",
      "O listener está ativo no endereço correto? As filas estão saturadas?",
      "O gateway falhou no frontside ou no backside?",
      "O pool possui conexões disponíveis e saudáveis?",
      "A taxa de novas conexões ou TIME_WAIT sugere ausência de reutilização?",
      "Há sinais de esgotamento de portas efêmeras ou SNAT?",
      "Timeouts entre cliente, gateway, firewall e backend estão alinhados?",
      "Retry é seguro para a operação e existe idempotência?"
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
      "Explique por que um servidor pode atender milhares de clientes na mesma porta 443.",
      "Diferencie socket de escuta e socket conectado criado por accept().",
      "Por que duas chamadas send() não correspondem necessariamente a duas chamadas recv() no peer?",
      "Descreva o three-way handshake e a função dos números de sequência iniciais.",
      "Compare connection refused e connect timeout em termos de pacotes observáveis.",
      "Explique a diferença entre ACK cumulativo, retransmission timeout e SACK.",
      "Diferencie receive window e congestion window.",
      "Por que muitos estados TIME_WAIT podem aparecer em um gateway ou cliente HTTP?",
      "Explique a diferença entre TCP keepalive e HTTP persistent connection.",
      "Quais garantias o UDP não fornece e por que isso pode ser aceitável?",
      "O que são portas efêmeras e como participam de conexões de saída?",
      "Como connection pooling ajuda a reduzir esgotamento de SNAT?",
      "Por que aumentar timeout pode não resolver falha de portas esgotadas?",
      "Explique por que uma requisição que chegou ao gateway pode falhar antes de alcançar o backend.",
      "Por que TCP não garante que uma operação de pagamento seja executada exatamente uma vez?"
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
      "Um consumidor recebe 502 somente na primeira chamada após alguns minutos sem tráfego; a segunda chamada funciona. Proponha hipóteses e evidências para confirmar conexão stale.",
      "Durante pico, novas chamadas ao mesmo backend falham, mas conexões já estabelecidas continuam. Relacione o cenário a portas/SNAT e descreva medidas de curto e longo prazo.",
      "O cliente expira após 5 segundos, mas o backend registra sucesso após 7 segundos. Descreva riscos de retry e um desenho com idempotência.",
      "Um teste nc para a porta 443 funciona, mas curl falha. Liste camadas ainda não validadas pelo teste de porta.",
      "Uma captura mostra SYN repetidos sem resposta. Outra mostra SYN seguido imediatamente de RST. Explique a diferença operacional."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Respostas orientativas"
  },
  {
    "kind": "paragraph",
    "text": "As respostas devem demonstrar raciocínio por camadas, não apenas termos isolados. Na questão 1, a porta do servidor é compartilhada porque conexões são distinguidas pela tupla de endereços e portas. Na questão 2, o listener recebe novas conexões e accept() cria descritores independentes para cada cliente. Na questão 3, TCP é fluxo de bytes e não preserva fronteiras de escrita."
  },
  {
    "kind": "paragraph",
    "text": "Nas questões de falha, connection refused está associado a rejeição ativa, frequentemente RST, enquanto timeout normalmente indica ausência de resposta até o prazo. Pooling reduz novas conexões, mas precisa lidar com sockets stale. Esgotamento de SNAT é confirmado por correlação entre taxa, destino, métricas e falhas; não deve ser presumido apenas por uma mensagem genérica."
  },
  {
    "kind": "paragraph",
    "text": "Nas questões de negócio, TCP confirma bytes dentro de uma conexão, não o resultado durável de uma transação. Se a resposta se perde, o cliente pode não saber se a operação foi concluída. Chaves de idempotência, registros de estado e consultas permitem repetir ou recuperar com segurança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - Termos essenciais do capítulo.",
    "headers": [
      "Termo",
      "Definição resumida"
    ],
    "rows": [
      [
        "ACK",
        "Confirmação que informa o próximo byte esperado no fluxo TCP."
      ],
      [
        "Backlog",
        "Fila associada a conexões pendentes ou concluídas aguardando aceitação."
      ],
      [
        "cwnd",
        "Janela de congestionamento mantida pelo emissor."
      ],
      [
        "Datagrama",
        "Unidade de mensagem preservada por UDP."
      ],
      [
        "Endpoint",
        "Combinação de endereço e porta em um lado da comunicação."
      ],
      [
        "FIN",
        "Flag de encerramento normal de uma direção do fluxo TCP."
      ],
      [
        "5-tuple",
        "Protocolo, IP/porta de origem e IP/porta de destino."
      ],
      [
        "MSS",
        "Maior quantidade de dados TCP que o peer anuncia receber em um segmento."
      ],
      [
        "Porta efêmera",
        "Porta local temporária escolhida para uma comunicação, normalmente de saída."
      ],
      [
        "RST",
        "Flag que aborta ou rejeita estado de conexão TCP."
      ],
      [
        "RTO",
        "Temporizador usado para decidir retransmissão por ausência de confirmação."
      ],
      [
        "RTT",
        "Tempo de ida e volta entre envio e confirmação observada."
      ],
      [
        "rwnd",
        "Janela anunciada pelo receptor para controle de fluxo."
      ],
      [
        "SACK",
        "Mecanismo que informa blocos recebidos fora de ordem."
      ],
      [
        "SNAT",
        "Tradução do endereço e, em geral, da porta de origem."
      ],
      [
        "Socket",
        "Abstração do sistema operacional usada por processos para comunicação."
      ],
      [
        "TIME_WAIT",
        "Estado temporário após fechamento ativo para segurança do encerramento e segmentos atrasados."
      ],
      [
        "UDP",
        "Transporte por datagramas com mecanismo mínimo e sem garantias de entrega/ordem."
      ],
      [
        "Zero Window",
        "Anúncio de que o receptor não possui espaço de buffer disponível."
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
    "text": "RFC 9293 - Transmission Control Protocol (TCP): https://www.rfc-editor.org/rfc/rfc9293 RFC 768 - User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768 RFC 5681 - TCP Congestion Control: https://www.rfc-editor.org/rfc/rfc5681 RFC 6298 - Computing TCP Retransmission Timer: https://www.rfc-editor.org/rfc/rfc6298 RFC 7323 - TCP Extensions for High Performance: https://www.rfc-editor.org/rfc/rfc7323 RFC 8304 - Transport Features of UDP and UDP-Lite: https://www.rfc-editor.org/rfc/rfc8304 RFC 6335 - IANA Procedures for Service Names and Port Numbers: https://www.rfc-editor.org/rfc/rfc6335 IANA - Service Name and Transport Protocol Port Number Registry: https://www.iana.org/assignments/service-names-port-numbers/ The Open Group - socket(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/socket.html The Open Group - bind(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/bind.html The Open Group - listen(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/listen.html The Open Group - accept(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/accept.html The Open Group - connect(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/connect.html Microsoft - Troubleshooting client response timeouts and errors with Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/troubleshoot-response-timeout-and-errors Microsoft - Source Network Address Translation for outbound connections: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-outbound-connections Microsoft - Debug APIs in Azure API Management using request tracing: https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-api-inspector Axway - Configure remote host settings: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_remote_hosts/index.html Axway - Introduction to API Gateway administration: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/admin_intro/index.html"
  },
  {
    "kind": "subhead",
    "text": "Ordem recomendada de leitura"
  },
  {
    "kind": "paragraph",
    "text": "Comece pela RFC 9293, usando este capítulo como mapa. Depois leia RFC 5681 e RFC 6298 para desempenho e recuperação. Consulte RFC 6335 e o registro IANA ao estudar portas. Use as documentações de Axway e Azure para relacionar os fundamentos às configurações da plataforma."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Encerramento",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "TCP, UDP, portas e sockets formam a ponte entre processos de aplicação e a rede IP. Eles explicam como milhares de consumidores compartilham um listener, como bytes são confirmados e recuperados, por que conexões permanecem em estados após o fechamento e como recursos finitos de saída podem provocar intermitência."
  },
  {
    "kind": "paragraph",
    "text": "No próximo capítulo, o estudo avança para endereçamento IP, sub-redes, IPv4, IPv6 e roteamento. Esses conceitos permitirão entender como os pacotes escolhem caminhos, por que redes privadas precisam de tradução e como gateways alcançam backends distribuídos entre datacenters, nuvens e clusters."
  }
];
