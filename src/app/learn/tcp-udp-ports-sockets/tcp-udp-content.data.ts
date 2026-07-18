import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Complete English translation of FAAC Chapter 2.
export const TCP_UDP_CHAPTER_BLOCKS_EN: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Introduction",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "In the previous chapter, the transport layer appeared as a step in the path taken by an API request. Now it will be studied in detail. TCP and UDP sit between the application and IP: they receive data produced by processes, identify communication points by ports and offer transport services with different characteristics. This position explains why an API can fail before any HTTP methods are processed."
  },
  {
    "kind": "paragraph",
    "text": "For those who operate the Gateways API, understanding transport is essential because the gateway participates in at least two network relationships: it receives connections from consumers and creates connections for the backends. These relationships are independent. A call may correctly arrive at the external listener and still fail when the gateway tries to open or reuse a socket for the internal service. Timeouts, resets, acceptance queues, pools, ephemeral ports and states like TIME_WAIT therefore become part of the daily diagnostics."
  },
  {
    "kind": "paragraph",
    "text": "The chapter combines the contemporary specification of TCP, consolidated in RFC 9293, the classic definition of UDP in RFC 768, the port registration procedures of RFC 6335, and the POSIX-standardized sockets interface. Operational concepts present on corporate platforms are also listed, such as persistent connections, idle timeout, SNAT exhaustion and failure tracking in Axway API Gateway and Azure API Management."
  },
  {
    "kind": "paragraph",
    "text": "The goal is not to memorize all fields or states, but to build an accurate mental model. In the end, the reader should be able to observe an error such as connection refused, connection reset, connect timeout or read timeout and formulate coherent technical hypotheses about where the communication stopped and what evidence should be collected."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Follow the explanations with a packet capture or with the commands presented in the lab. TCP is easier to understand when SYN, ACK, sequence numbers, windows, and shutdown stop being abstractions and become observable events."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Learning Objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explain the function of the transport layer and the port multiplexing process.",
      "Differentiate between socket, connection, application session, port and endpoint.",
      "Describe the three-way handshake, byte stream, sequence numbers, ACKs, and TCP retransmissions.",
      "Distinguish between flow control and congestion control.",
      "Understand FIN, RST, half-close, TIME_WAIT and their operational impacts.",
      "Explain the characteristics of UDP and recognize when guarantees need to be implemented by the application.",
      "Understand known, registered, and ephemeral ports, including bind and port conflicts.",
      "Relate pooling, keep-alive, NAT/SNAT and port exhaustion to failures in gateways.",
      "Apply tools and symptoms to investigate transport issues in enterprise APIs."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Chapter structure"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "2.1 The transport layer and its relationship with APIs",
      "2.2 Multiplexing, endpoints and connection tuples",
      "2.3 Sockets as an operating system abstraction",
      "2.4 TCP: Reliable byte stream service",
      "2.5 Three-way handshake",
      "2.6 Sequence numbers, ACKs and retransmission",
      "2.7 Flow control",
      "2.8 Congestion control",
      "2.9 Closing, FIN, RST and TIME_WAIT",
      "2.10 Timers, timeouts, keep-alive and pooling",
      "2.11 UDP: datagram transport",
      "2.12 TCP or UDP: choice criteria",
      "2.13 Ports, IANA registries and ephemeral ports",
      "2.14 NAT, SNAT and port exhaustion",
      "2.15 TCP in API Gateways",
      "2.16 Troubleshooting and tools",
      "2.17 Case studies",
      "2.18 Observation laboratories",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.1 The Transport Layer and Its Relationship to APIs",
    "id": "camada-transporte"
  },
  {
    "kind": "paragraph",
    "text": "The IP protocol delivers packets between network interfaces identified by addresses, but it does not alone identify which process should receive the data within the computer. A server can simultaneously run a gateway, a database, a monitoring agent, and administrative services on the same IP address. The transport layer adds service identifiers - the ports - and allows the operating system to deliver each incoming unit to the correct process."
  },
  {
    "kind": "paragraph",
    "text": "The transport layer also defines the type of service offered to the application. TCP provides a logical connection, an ordered stream of bytes, loss detection, retransmission, flow control, and congestion control. UDP offers independent datagrams with minimal mechanism: ports, size and checksum. This difference does not mean that UDP is defective; means that the application chooses which guarantees are needed and where they will be implemented."
  },
  {
    "kind": "paragraph",
    "text": "In HTTP/1.1 and HTTP/2 APIs, the traditional transport is TCP. The application writes bytes to a socket and TCP decides how to segment them, transmit them, acknowledge them, and retransmit them. HTTP does not receive information that a particular IP segment has been lost; it only sees a flow that takes longer or a connection that ends. This separation of responsibilities simplifies the application, but can hide the cause of latencies and timeouts."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 uses QUIC, which operates over UDP. QUIC implements, in user space, several properties associated with reliable transport, including secure establishment, loss recovery, and congestion control. Therefore, saying that HTTP/3 uses UDP does not mean that it accepts uncontrolled data loss; means that the guarantees were built into another layer."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "IP tries to carry packets to the host. TCP or UDP identify processes by ports. The application interprets the content. In a failure, first determine which of these responsibilities the evidence points to."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-1-en.svg",
    "alt": "Multiplexing processes by addresses and ports",
    "caption": "Figure 1 - Multiplexing of processes by addresses and ports."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.2 Multiplexing, endpoints and connection tuples",
    "id": "multiplexacao"
  },
  {
    "kind": "paragraph",
    "text": "A transport endpoint is typically represented by the IP address and port combination. The 10.20.30.40:443 endpoint identifies an interface and port on that host, but does not identify a specific connection on its own. A server can maintain thousands of simultaneous connections on port 443 because each client uses a different source address and port."
  },
  {
    "kind": "paragraph",
    "text": "A TCP connection is distinguished by the combination of protocol, source IP, source port, destination IP, and destination port. This identification is often called a 5-tuple; when the protocol is implicit, we talk about 4-tuple. Thus, two clients can access the same gateway address and port without conflict, and a single client can open multiple connections using different ephemeral ports."
  },
  {
    "kind": "paragraph",
    "text": "Multiplexing is the process of combining data from multiple processes into a shared network infrastructure. Demultiplexing is the reverse process: upon receiving a segment, the operating system examines protocol, addresses, and ports to find the corresponding socket. In UDP, the association may be less specific depending on how socket was bound; In TCP, each established connection has a precise identity."
  },
  {
    "kind": "paragraph",
    "text": "The direction of the fields also matters. In a capture made on the client, port 443 appears as the destination in the sending and as the origin in the response. In a capture on gateway, the connection to backend can use another source port, another IP and even another security protocol. The diagnosis must always indicate the observation point to avoid interpreting the tuple backwards."
  },
  {
    "kind": "subhead",
    "text": "Example of distinct tuples"
  },
  {
    "kind": "code",
    "text": "Connection A: TCP 192.0.2.10:51021 -> 203.0.113.20:443\nConnection B: TCP 192.0.2.10:51022 -> 203.0.113.20:443\nConnection C: TCP 192.0.2.11:49800 -> 203.0.113.20:443"
  },
  {
    "kind": "code",
    "text": "They all arrive at the same listener, but they are independent flows."
  },
  {
    "kind": "subhead",
    "text": "Application in logs"
  },
  {
    "kind": "paragraph",
    "text": "When correlating logs from firewall, balancer, and gateway, preserve source IP and port. IP alone may not be sufficient in environments with NAT, proxies and high volume of connections."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.3 Sockets as an operating system abstraction",
    "id": "sockets"
  },
  {
    "kind": "paragraph",
    "text": "Socket is not a protocol transmitted over the network. It is an abstraction offered by the operating system so that processes can use communication services. On POSIX-compliant systems, socket() creates a descriptor; bind() associates a local address; listen() marks a stream socket as a connection listener; accept() removes a pending connection from the queue and creates a new connected socket; connect() initiates an association with a remote endpoint."
  },
  {
    "kind": "paragraph",
    "text": "On a TCP server, the listening socket remains associated with the published port. Each successful call to accept() produces another descriptor dedicated to one connection. This distinction is important: closing an accepted socket terminates only that client, while closing the listening socket prevents new connections. Gateway processes use more sophisticated variations, with multiple threads, event loops or processes, but the principle remains."
  },
  {
    "kind": "paragraph",
    "text": "A socket has kernel-managed send and receive buffers. When the application calls send(), the bytes can only be copied to the local buffer; this does not mean that the peer has already received or processed them. Likewise, recv() may return only part of the requested content. TCP-based applications need to delimit messages at the protocol level, because TCP preserves byte order, not send() call boundaries."
  },
  {
    "kind": "paragraph",
    "text": "Sockets can be blocking or non-blocking. In blocking mode, an operation can wait for data, buffer space, or completion. In non-blocking mode, the application receives a state that indicates that it should try again and uses mechanisms such as select, poll, epoll or IO completion ports. High-performance Gateways avoid reserving a blocked thread for each connection and use event-driven or pools ​​controlled models."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-2-en.svg",
    "alt": "Conceptual operations of sockets on the client and server",
    "caption": "Figure 2 - Conceptual operations of sockets on the client and server."
  },
  {
    "kind": "subhead",
    "text": "Pseudocode - real code must handle concurrency and errors"
  },
  {
    "kind": "code",
    "text": "# Conceptual flow of a TCP server\nlisten_fd = socket(AF_INET, SOCK_STREAM, 0)\nbind(listen_fd, '0.0.0.0:8443')\nlisten(listen_fd, backlog)"
  },
  {
    "kind": "code",
    "text": "while active:\n    client_fd = accept(listen_fd)\n    handle_connection(client_fd)\n    close(client_fd)"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "0.0.0 is not a remote target"
    ]
  },
  {
    "kind": "paragraph",
    "text": "When binding to 0.0.0.0, the process requests to listen on all supported local IPv4 interfaces. Consumers should not use 0.0.0.0 as the API destination address."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.4 TCP: Reliable byte stream service",
    "id": "tcp"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9293 consolidates the modern Transmission Control Protocol specification. TCP is connection-oriented: before normal data exchange, endpoints establish common state. The protocol provides full-duplex communication, so each side can send and receive simultaneously. Each direction has its own sequence of bytes, windows and acknowledgments."
  },
  {
    "kind": "paragraph",
    "text": "The unit delivered to the application is a stream of bytes. If an application calls send() twice, the receiver can read the data in a single call or in several parts. TCP does not maintain the logical boundaries of JSON, HTTP, or any other message. Application protocols resolve framing using explicit size, delimiters, headers or rules of their own; HTTP/1.1, for example, uses Content-Length, chunked transfer, or closure in defined contexts."
  },
  {
    "kind": "paragraph",
    "text": "Reliability means that TCP tries to deliver bytes unduplicated and in order as long as the connection remains viable. The sender assigns sequence numbers, the receiver acknowledges the next expected byte, and unacknowledged segments can be retransmitted. If communication becomes impossible, the application receives an error; TCP cannot guarantee success in the face of permanent peer or network failure."
  },
  {
    "kind": "paragraph",
    "text": "The TCP header contains ports, sequence and recognition numbers, flags, window, checksum and options. The window field participates in flow control. Flags such as SYN, ACK, FIN and RST control the connection cycle. Options negotiated in the handshake can inform Maximum Segment Size, Window Scale, timestamps and support Selective Acknowledgment."
  },
  {
    "kind": "paragraph",
    "text": "TCP does not know about HTTP requests, tokens or REST methods. It transports bytes. A connection can remain healthy while the application is frozen and produces no response; in this case, connect() has already completed, but the consumer may experience a read timeout. Separating connectivity from application processing is one of the most useful distinctions in troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Relevant TCP header fields and functions.",
    "headers": [
      "Element",
      "Main function"
    ],
    "rows": [
      [
        "Source/destination port",
        "Identify transport endpoints"
      ],
      [
        "Sequence Number",
        "Position bytes in the stream"
      ],
      [
        "Acknowledgment Number",
        "Indicate the next expected byte"
      ],
      [
        "Flags",
        "Control opening, confirmation, reset and closing"
      ],
      [
        "Window",
        "Advertise reception capacity"
      ],
      [
        "Checksum",
        "Detect segment corruption"
      ],
      [
        "Options",
        "Negotiate extensions such as MSS, SACK, WS and timestamps"
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
    "text": "The normal establishment of a TCP connection uses three segments. The initiator sends SYN with a starting sequence number. The receiver responds SYN+ACK, acknowledging the received SYN and presenting its own initial number. The initiator concludes with ACK. After this exchange, both sides have enough state to transport bytes in both directions."
  },
  {
    "kind": "paragraph",
    "text": "The handshake is not just for asking if the port is open. It synchronizes sequence spaces and allows you to negotiate options that will affect the entire connection. MSS limits the size of the TCP payload that the peer intends to receive in a segment; Window Scale expands window advertising capacity; SACK Permitted enables selective acknowledgments; Timestamps aid RTT measurement and protect against problematic reuse of numbers."
  },
  {
    "kind": "paragraph",
    "text": "When there is no process listening on the destination port, the host usually responds with RST, producing connection refused on the client. When a firewall silently drops the SYN, there is no immediate response; the client retransmits and eventually reaches connect timeout. These symptoms appear similar to the user, but point to different network behaviors."
  },
  {
    "kind": "paragraph",
    "text": "The SYN backlog and accept queue also influence availability. The kernel must track connections being established and completed connections that are still waiting for the application to call accept(). Under overload, attack, or when the application cannot accept quickly enough, queues may saturate. The result can be dropped SYNs, delays, resets or intermittent failures even when the process appears to be active."
  },
  {
    "kind": "paragraph",
    "text": "Handshake latency contributes to the total time of a call, especially on distant networks or when new connections are created for each request. Connection reuse avoids repeating the TCP handshake and, when TLS is present, also reduces cryptographic negotiations. This is why keep-alive and connection pooling have an important impact on throughput and latency."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-3-en.svg",
    "alt": "Normal establishment of a TCP connection",
    "caption": "Figure 3 - Normal establishment of a TCP connection."
  },
  {
    "kind": "subhead",
    "text": "Connect timeout vs. read timeout"
  },
  {
    "kind": "paragraph",
    "text": "Connect timeout occurs before the connection is established. Read timeout occurs after there is a connection, but the expected data does not arrive on time. Settings and causal hypotheses are different."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.6 Sequence numbers, ACKs and retransmission",
    "id": "sequencia"
  },
  {
    "kind": "paragraph",
    "text": "TCP numbers bytes, not packets. If a segment carries 500 bytes from the number 1000, the next expected byte is 1500. The receiver uses the acknowledgment field to communicate this value. Traditional ACKs are cumulative: ACK 2000 confirms that all bytes before 2000 were received continuously, even if later segments arrived out of order."
  },
  {
    "kind": "paragraph",
    "text": "Losses can be detected by timer or by pattern of ACKs. The sender maintains an estimate of the round-trip time and calculates a retransmission timeout according to the algorithm standardized in RFC 6298. When the deadline expires without confirmation, data is retransmitted and the timer is adjusted. Repeated Timeouts typically causes backoff, increasing the interval to avoid worsening congestion."
  },
  {
    "kind": "paragraph",
    "text": "Duplicate ACKs may indicate that an intermediate segment was missing while later segments arrived. Fast retransmit algorithms allow retransmitting before the RTO under certain conditions. With Selective Acknowledgment, the receiver reports received blocks out of order, allowing the sender to retransmit specific losses rather than repeating a larger track."
  },
  {
    "kind": "paragraph",
    "text": "Retransmission improves reliability but increases latency. An API may experience HTTP error-free response time spikes when the transport layer recovers losses. Application-only metrics may show a slow request; Packet capture or system metrics can reveal retransmissions, duplicate ACKs and RTT variation."
  },
  {
    "kind": "paragraph",
    "text": "The checksum detects corruption during transport, but is not a cryptographic mechanism. It does not protect against malicious alteration and does not replace TLS. Its purpose is to detect accidental errors in the segment and addresses considered by the pseudo-header. Security integrity must be provided by appropriate cryptographic protocols."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-4-en.svg",
    "alt": "Cumulative ACK and retransmission of a gap in the stream",
    "caption": "Figure 4 - Cumulative ACK and retransmission of a gap in the flow."
  },
  {
    "kind": "subhead",
    "text": "Capture reading"
  },
  {
    "kind": "paragraph",
    "text": "A retransmission observed on gateway does not automatically prove that gateway caused the loss. The capture shows the observation point. Compare both sides of the path when the exact location of the loss is important."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.7 Flow control",
    "id": "fluxo"
  },
  {
    "kind": "paragraph",
    "text": "Flow control protects the receiver against a sender that is faster than its ability to consume data. The receiver announces a receive window, normally derived from the available space on your buffer. The sender limits the number of unacknowledged bytes so as not to exceed this window. If the receiving application stops reading, buffer may fill up and the window will shrink."
  },
  {
    "kind": "paragraph",
    "text": "When the receiver announces window zero, the sender stops normal sending and uses the persist mechanism to periodically check whether the window has opened again. A connection may remain established, but with no application progress. In diagnostics, zero window and window full indicate pressure on the receiving side, not necessarily path congestion."
  },
  {
    "kind": "paragraph",
    "text": "The original window field is 16 bits long. In networks with a large bandwidth x delay product, this limit may prevent full use of the path. The Window Scale option, currently defined in RFC 7323, negotiates a factor in SYN to represent larger windows. The option must be negotiated during establishment; is not activated mid-connection."
  },
  {
    "kind": "paragraph",
    "text": "Too small Buffers can limit throughput, while excessive buffers can increase latency and memory. The tuning depends on the operating system, RTT, volume and traffic pattern. Changing global parameters without measuring can exchange one problem for another. In gateways, there are also buffers and limits in the application layer, so it is necessary to distinguish between TCP window and HTTP buffering."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-5-en.svg",
    "alt": "Independent reception and congestion thresholds",
    "caption": "Figure 5 - Independent reception and congestion limits."
  },
  {
    "kind": "subhead",
    "text": "rwnd is not a rate limit"
  },
  {
    "kind": "paragraph",
    "text": "The TCP window controls bytes in flight according to the receiver's capacity. API rate limiting controls requests according to a business or protection policy. They are mechanisms of different layers and units."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.8 Congestion control",
    "id": "congestionamento"
  },
  {
    "kind": "paragraph",
    "text": "Congestion control protects the shared network. Even if the receiver has large buffer, the path may not support a burst of data. TCP maintains a congestion window at the sender and limits the bytes in flight to the smallest value between cwnd and receive window. Thus, flow control protects the destination and congestion control protects the path."
  },
  {
    "kind": "paragraph",
    "text": "RFC 5681 describes classic interconnected algorithms: slow start, congestion avoidance, fast retransmit and fast recovery. Slow start starts with a limited window and increases rapidly as ACKs return. Despite the name, growth can be exponential per round trip. When reaching a threshold or observing loss, the algorithm switches to more conservative behavior."
  },
  {
    "kind": "paragraph",
    "text": "Congestion avoidance generally follows the idea of additive scaling and multiplicative scaling: the window grows gradually when the network appears healthy and shrinks significantly at signs of congestion. Modern implementations may use algorithms like CUBIC, BBR, or specific variants, but they still need to co-exist responsibly with other streams."
  },
  {
    "kind": "paragraph",
    "text": "Loss is not the only possible sign. Explicit Congestion Notification allows devices to mark packets instead of discarding them when end-to-end support is available. Queuing, bufferbloat, and jitter also affect latency. An API can transfer little content and still suffer because it shares the path with larger flows or because the bottleneck queue has grown."
  },
  {
    "kind": "paragraph",
    "text": "In data centers and clouds, short RTT times make bursts and microbursts relevant. The aggregate throughput of gateways may be limited by CPU, encryption, connections, or network. Before increasing application limits, it is necessary to verify that the transport layer is reacting to real congestion and that the architecture appropriately distributes traffic."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Performance and recovery concepts in TCP.",
    "headers": [
      "Concept",
      "Question answered",
      "Typical signal"
    ],
    "rows": [
      [
        "Receive window",
        "Can the receiver store more bytes?",
        "Reduced window or zero window"
      ],
      [
        "Congestion window",
        "Does the network appear to support more bytes in flight?",
        "Growth and reduction according to ACKs/losses"
      ],
      [
        "RTT",
        "How long does confirmation take?",
        "Latency variation"
      ],
      [
        "RTO",
        "When to consider unconfirmed data as lost?",
        "Retransmission after timeout"
      ],
      [
        "SACK",
        "Which out-of-order blocks have already arrived?",
        "More selective recovery"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.9 Closing, FIN, RST and TIME_WAIT",
    "id": "encerramento-tcp"
  },
  {
    "kind": "paragraph",
    "text": "TCP is full-duplex, so each direction can be terminated separately. FIN states that the sender will not send new bytes in that direction, but can still receive data. The peer recognizes the FIN with ACK and, when it also finishes sending, transmits its own FIN. Normal termination may therefore involve four segments."
  },
  {
    "kind": "paragraph",
    "text": "Half-close is the state in which one side has terminated its sending direction but continues to receive. Some applications use this behavior to indicate the end of input and wait for results. Persistent HTTP typically delimits messages without relying on closure, as closing the connection would prevent reuse."
  },
  {
    "kind": "paragraph",
    "text": "RST abruptly terminates the connection and indicates that the expected state does not exist or that an endpoint has decided to abort. Connection reset by peer can occur when the application closes a socket with pending data, a broker removes state, a process restarts, or a thread arrives for a connection that is no longer known. Identifying who sent the RST is decisive."
  },
  {
    "kind": "paragraph",
    "text": "TIME_WAIT is a state normally maintained by the side that performed the active close and sent the final ACK. It allows you to absorb delayed segments from the previous connection and retransmit the final ACK if necessary. The duration depends on the implementation and relates to the maximum segment lifetime. TIME_WAIT is not leakage by definition; It is part of the secure operation of TCP."
  },
  {
    "kind": "paragraph",
    "text": "Large amount of TIME_WAIT may indicate high opening and closing rate. The problem isn't just memory: ephemeral ports can be temporarily unavailable to the same destination, especially with NAT. Reusing connections is generally healthier than trying to eliminate state by aggressively tuning operating system parameters."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-6-en.svg",
    "alt": "Normal shutdown and stay in TIME_WAIT",
    "caption": "Figure 6 - Normal shutdown and stay in TIME_WAIT."
  },
  {
    "kind": "subhead",
    "text": "RST is not an HTTP status code"
  },
  {
    "kind": "paragraph",
    "text": "A reset occurs at the transport layer. The consumer may not receive any HTTP response, or an intermediary may convert the failure to 502/503. Differentiate the TCP event from the representation generated by a gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.10 Timers, timeouts, keep-alive and pooling",
    "id": "timers"
  },
  {
    "kind": "paragraph",
    "text": "Timeout is a wait policy applied at a specific point. Connect timeout limits establishment; read or response timeout limits waiting for data after connection; write timeout limits send progress; idle timeout closes inactive connections; request timeout can span multiple steps. Products and libraries use different names, so the documentation must indicate exactly the clock started and the event that ends it."
  },
  {
    "kind": "paragraph",
    "text": "TCP keepalive is an operating system mechanism for detecting unreachable peers on idle connections, usually with long default values. HTTP keep-alive or persistent connection means reusing the connection for multiple messages. They are related concepts, but not equivalent. An HTTP connection can be persistent without frequent TCP keepalive probes."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling maintains a pool of connections ready for a given destination. The pool reduces handshakes, CPU usage, latency and port consumption. However, it requires limits, connection validation, idle timeout and strategy for connections that the peer closed silently. A connection removed from pool may be stale, producing a reset or failure on the first write."
  },
  {
    "kind": "paragraph",
    "text": "Timeouts need to be aligned between hops. If the balancer terminates idle connections within 60 seconds and gateway believes they remain valid for five minutes, pool can reuse sockets that have already been removed by the broker. If the client's timeout is smaller than the timeout of the gateway, the gateway can continue processing an operation whose consumer has already given up, with the risk of retries and duplication."
  },
  {
    "kind": "paragraph",
    "text": "Retries should not be automatically added to every crash. An operation may have been processed in backend even if the response was lost or the client timed out. Idempotent methods and operations allow for safer strategies; Financial operations need idempotence keys, correlation, and explicit rules before repetition."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Timeouts must be named by the step they control.",
    "headers": [
      "Timeout",
      "Typical start",
      "Example of cause"
    ],
    "rows": [
      [
        "DNS timeout",
        "Name query",
        "Resolve unavailable or blocked route"
      ],
      [
        "Connect timeout",
        "Sending SYN/connection",
        "Firewall discarding, route or backlog"
      ],
      [
        "TLS handshake timeout",
        "After TCP, during TLS",
        "Certificate, algorithm or slow peer"
      ],
      [
        "Read/response timeout",
        "After sending the request",
        "Backend slow, deadlock or loss recovered"
      ],
      [
        "Idle timeout",
        "No bytes per period",
        "Persistent connection with no activity"
      ],
      [
        "Pool acquire timeout",
        "Waiting for connection from pool",
        "Pool saturated or leaking"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Axway and persistent connections"
  },
  {
    "kind": "paragraph",
    "text": "The Axway API Gateway documentation allows you to configure remote hosts and idle timeout for persistent connections. The value must be consistent with firewalls, balancers and backends that participate in the same hop."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.11 UDP: datagram transport",
    "id": "udp"
  },
  {
    "kind": "paragraph",
    "text": "UDP was defined to provide datagram communication with minimal mechanism. Each send produces a preserved message unit: a recvfrom() receives a datagram, not an arbitrary piece of stream as in TCP. The header has source and destination ports, length and checksum. Simplicity reduces state and overhead, but does not provide reliable connection."
  },
  {
    "kind": "paragraph",
    "text": "UDP does not guarantee delivery, order, duplicate elimination, or congestion control. Datagrams may be lost, repeated, or arrive out of order. If the application needs these properties, it must implement them or use a protocol over UDP that provides them. This responsibility includes timers, identifiers, retransmission, rate control, and fragmentation handling."
  },
  {
    "kind": "paragraph",
    "text": "The size of the message is important. A large datagram may require IP fragmentation or exceed the path MTU, increasing risk of loss. Robust applications avoid relying on fragmentation and design accordingly. In networks with filters, UDP may also behave differently than TCP, because devices maintain temporary state based on handshakeless flows."
  },
  {
    "kind": "paragraph",
    "text": "DNS is a classic example of a protocol that uses UDP for common queries and may use TCP in specific situations. QUIC uses UDP as a substrate, but implements connection, encryption, streams, recovery and congestion. Real-time voice and video applications may prefer to discard delayed data rather than wait for retransmission, but they still need to control rate and deal with loss."
  },
  {
    "kind": "paragraph",
    "text": "UDP has a checksum for error detection, but it does not authenticate the sender. As there is no handshake equivalent to TCP, address spoofing and amplification need to be considered in the design of public services. Protocols must validate requests, limit responses, and follow abuse prevention practices."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-7-en.svg",
    "alt": "Comparison of services offered at application level",
    "caption": "Figure 7 - Comparison of services offered at application level."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Classic 8-byte UDP header.",
    "headers": [
      "UDP field",
      "Size",
      "Purpose"
    ],
    "rows": [
      [
        "Source Port",
        "16 bits",
        "Source port; may be zero in permitted contexts"
      ],
      [
        "Destination Port",
        "16 bits",
        "Target process port"
      ],
      [
        "Length",
        "16 bits",
        "Header and data length"
      ],
      [
        "Checksum",
        "16 bits",
        "Error detection about pseudo-header, header and data"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.12 TCP or UDP: choice criteria",
    "id": "escolha"
  },
  {
    "kind": "paragraph",
    "text": "The choice should not be based solely on phrases like TCP is secure and UDP is fast. TCP does not provide cryptographic security, and UDP is not automatically faster in any application. The central criteria is the required service: reliable and ordered flow, independent datagrams, tolerance for delayed data, control over retransmission, mobility, stream multiplexing and infrastructure compatibility."
  },
  {
    "kind": "paragraph",
    "text": "For traditional REST APIs, TCP remains natural because HTTP/1.1 and HTTP/2 were designed on top of reliable flow. The cost of establishing a connection can be amortized with pooling. For HTTP/3, QUIC was built on top of UDP to reduce transport limitations and integrate security, but this does not make a simple UDP application equivalent to TCP."
  },
  {
    "kind": "paragraph",
    "text": "In real time, information can quickly lose value. A delayed audio packet can be worse than a small gap, and indiscriminate retransmission can increase latency. In file transfer or financial transactions, correct delivery and confirmation are essential. Even so, business semantics like exactly once are not automatically provided by TCP; application needs idempotence and persistence."
  },
  {
    "kind": "paragraph",
    "text": "Infrastructure also influences. Firewalls, NATs, proxies, and observability may treat UDP differently. Before choosing, validate path support, behavior under loss, security strategy, MTU limits, and operation tools. Enterprise architecture needs to consider not just laboratory performance, but governance and diagnostic capability."
  },
  {
    "kind": "subhead",
    "text": "Exactly once"
  },
  {
    "kind": "paragraph",
    "text": "TCP guarantees an unduplicated stream of bytes within a connection, but it does not guarantee that a business operation is executed exactly once in the face of retries, failures and reconnections. This property requires design in application."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.13 Ports, IANA registries and ephemeral ports",
    "id": "portas"
  },
  {
    "kind": "paragraph",
    "text": "Ports are 16-bit numbers, so they range from 0 to 65535. IANA maintains the Service Name and Transport Protocol Port Number Registry and RFC 6335 describes management procedures. The range 0-1023 is traditionally called System Ports or Well-Known Ports; 1024-49151 corresponds to User or Registered Ports; 49152-65535 is Dynamic and/or Private Ports."
  },
  {
    "kind": "paragraph",
    "text": "Registration does not mean that a port is technically reserved on all systems, nor does using a known number make the corresponding protocol appear. A process may attempt to listen on a different port, subject to permissions and policies. Registration promotes interoperability and discoverability, but security must validate protocol and identity, not just port number."
  },
  {
    "kind": "paragraph",
    "text": "Ephemeral ports are chosen by the operating system for outgoing connections. The effective range may vary by platform and configuration, even though the IANA dynamic range is a reference. When a client opens connection to 443, it is typically assigned a temporary local port. The local and remote pair must remain unique as long as the connection and certain related states exist. bind() can associate socket with a specific address, all interfaces or a chosen port. Address already in use error can occur when another socket already occupies the combination or when reuse rules do not allow new association. SO_REUSEADDR and similar options have system-dependent semantics and should not be used as a generic solution without understanding the effect."
  },
  {
    "kind": "paragraph",
    "text": "Listening on all interfaces increases the exposure surface. An administrative service that should only be on loopback or internal network may be accidentally published. Firewalls are still required, but the principle of least exposure recommends binding listeners only to the required addresses and documenting each open port."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Port ranges according to the classification used in the IANA registry.",
    "headers": [
      "Range",
      "IANA Classification",
      "Typical usage"
    ],
    "rows": [
      [
        "0-1023",
        "System / Well-Known",
        "Broadly standardized services; privileges may be required"
      ],
      [
        "1024-49151",
        "User / Registered",
        "Registered applications and services"
      ],
      [
        "49152-65535",
        "Dynamic/Private",
        "Dynamic allocation and private use"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Port 443 does not prove HTTPS"
  },
  {
    "kind": "paragraph",
    "text": "A process can accept any protocol on port 443, and HTTPS can be configured on another port. The port creates an operating convention; the negotiation and observed bytes determine the actual protocol."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.14 NAT, SNAT and port exhaustion",
    "id": "nat-snat"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifies addresses and often ports to allow multiple flows to share one address. On outbound connections, Source NAT replaces the private address and source port with a public or intermediate combination. The equipment maintains state to return responses to the correct flow."
  },
  {
    "kind": "paragraph",
    "text": "Since the port is part of the connection's identity, the translator has a finite inventory per address and reuse rules. Many simultaneous connections or high open-close rates to the same destination can consume available ports. States held after closure, such as TIME_WAIT or NAT retention times, delay reuse."
  },
  {
    "kind": "paragraph",
    "text": "The common symptom is intermittency: some connections work and new connections to the same host and port fail until resources are freed. The application can log connect timeout, socket exception or 5xx generated by an intermediary. Increasing timeout does not create ports and may worsen pressure by keeping resources busy longer."
  },
  {
    "kind": "paragraph",
    "text": "The first fixes are architectural: reuse connections, scale pools, reduce unnecessary creation, distribute destinations when legitimate, and use private connectivity or platform-sized NAT. Adding IPs expands inventory, but may only postpone the problem if the connection pattern remains inefficient."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, calls to backends can consume SNAT ports depending on topology and destination. The official documentation describes intermittent failures and strategies such as NAT Gateway in supported scenarios, multiple IPs of backend, and repetitive open mitigation. Connection, destination and rate metrics help confirm the hypothesis."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/capitulo-02-figura-8-en.svg",
    "alt": "gateway connections and pressure on output ports",
    "caption": "Figure 8 - gateway connections and pressure on output ports."
  },
  {
    "kind": "subhead",
    "text": "Operating signal"
  },
  {
    "kind": "paragraph",
    "text": "If failures grow with the rate of new connections, concentrate on the same destination, and disappear after load shedding, investigate pooling and SNAT. Still, confirm with metrics and captures before concluding."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.15 TCP in API Gateways",
    "id": "api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "A gateway HTTP acts as a proxy and terminates a consumer connection. It interprets the message and, to forward it, uses another connection to backend. Even when both hops use TCP 443, they are sockets, sequence numbers, certificates, timeouts, and independent states. gateway does not simply extend the same TCP stream to the service."
  },
  {
    "kind": "paragraph",
    "text": "On the frontside, concerns include listener capacity, SYN backlog, connection limit, external TLS, client keep-alive, and protection against slow connections. On the backside, gateway needs to resolve the name of backend, acquire or open connection from pool, negotiate internal TLS when applicable, send the request and wait for a response. A backend failure can be converted to 502, 503 or 504 depending on the platform and stage."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling in gateway must consider destination by host, IP, port, protocol and security configuration. DNS changes, certificate rotation, and balancing can interact with existing connections. DNS TTL does not automatically terminate sockets already connected; an address change affects new connections, while persistent connections can remain at the old destination until closed."
  },
  {
    "kind": "paragraph",
    "text": "Idle timeout needs to be intermediary compatible. If firewall removes state before gateway, a connection apparently available on pool may fail. Health checks partially validate availability and do not guarantee that every business request will work. Circuit breakers and retries must be used with idempotence and telemetry semantics."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, remote host settings allow you to control properties of persistent connections, including idle timeout. In Azure API Management, tracing, diagnostics, and metrics help separate policy processing failures from connectivity and SNAT failures. In both cases, the engineer must identify whether the error occurred before listener, in inbound processing, in the outbound connection or after backend responded."
  },
  {
    "kind": "table",
    "caption": "Table 6 - A request can traverse several independent connections.",
    "headers": [
      "Hop",
      "independent state",
      "Representative faults"
    ],
    "rows": [
      [
        "Consumer -> edge/gateway",
        "External TCP, TLS and keep-alive",
        "SYN blocked, client reset, slow handshake"
      ],
      [
        "Gateway -> backend",
        "Pool, DNS, TCP, TLS and internal timeout",
        "Connect timeout, stale connection, reset, SNAT"
      ],
      [
        "Backend -> dependencies",
        "Sockets application-specific",
        "Pool bank exhausted, queue, slow downstream"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Troubleshooting question"
  },
  {
    "kind": "paragraph",
    "text": "Was the client able to establish TCP with the public address? Did gateway receive the request? Has the gateway acquired a connection for the backend? Did backend send any response bytes? These questions break the problem down into observable steps."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.16 Troubleshooting and tools",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Transport troubleshooting begins by defining the symptom and point of observation. Connection refused indicates immediate rejection, usually by RST. Connect timeout indicates failure to complete on time. Connection reset indicates abrupt termination of an existing or established connection. Read timeout indicates that the application waited for data after connecting. No route to host points to network routing or signaling."
  },
  {
    "kind": "paragraph",
    "text": "sockets commands show local state. ss -lntp identifies listeners TCP and processes; ss -ant shows connections and states; lsof -i relates descriptors and network; netstat may exist on older systems. On Windows, Get-NetTCPConnection and netstat -ano provide equivalent information. The absence of listener in the expected address must be resolved before investigating HTTP. curl -v displays resolution, connection attempt, TLS and HTTP. Time can be separated with metric options. nc or Test-NetConnection help test port opening, but success only proves TCP connection; does not validate protocol, certificate, authentication or business rules. openssl s_client is useful in TLS chapter to inspect handshake and chain. tcpdump and Wireshark allow you to observe SYN, SYN+ACK, ACK, FIN, RST, retransmissions, windows and RTT. Captures must be made with authorization, filtering and data protection. Payloads may contain sensitive information. Always record time, interfaces, direction and topology to correlate events."
  },
  {
    "kind": "paragraph",
    "text": "Logs from gateway complete the capture. A package shows transportation; the trace shows policies and enforcement decisions. Metrics reveal temporal pattern: active connections, rate of new connections, backend errors, pool saturation and latency. A robust investigation combines evidence rather than relying on a single error message."
  },
  {
    "kind": "subhead",
    "text": "Observation commands - adapt to system and environment policies"
  },
  {
    "kind": "code",
    "text": "# Linux - listeners and connections\nss -lntp\nss -ant state time-wait\nss -s\nlsof -nP -iTCP:8443 -sTCP:LISTEN"
  },
  {
    "kind": "code",
    "text": "# Client tests\ncurl -v --connect-timeout 5 https://api.exemplo.com/health\nnc -vz api.exemplo.com 443"
  },
  {
    "kind": "code",
    "text": "# Authorized capture\nsudo tcpdump -i any -nn 'tcp port 443 and host 10.20.30.40'"
  },
  {
    "kind": "table",
    "caption": "Table 7 - Initial mapping between symptoms and hypotheses.",
    "headers": [
      "Symptom",
      "Probable evidence",
      "Initial hypotheses"
    ],
    "rows": [
      [
        "Connection refused",
        "RST after SYN",
        "No listener, bad port, active rejection"
      ],
      [
        "Connect timeout",
        "SYN relayed with no response",
        "Firewall drop, route, unavailable peer, queue"
      ],
      [
        "Reset by peer",
        "RST in connection",
        "Application aborted, stale pool, intermediary removed status"
      ],
      [
        "Read timeout",
        "Connection established without sufficient response",
        "Backend slow, dependency stuck, loss or zero window"
      ],
      [
        "Address already in use",
        "bind fails",
        "Existing Listener, conflict or status/reuse"
      ],
      [
        "Too many open files",
        "Failed to create/accept socket",
        "Descriptor limit or leakage"
      ],
      [
        "Many TIME_WAIT",
        "High active closing rate",
        "No pooling, retries, short connections"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.17 Case studies",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - Public API works, but backend returns intermittent 504"
  },
  {
    "kind": "paragraph",
    "text": "The consumer establishes TCP and TLS with gateway and sends the request. The inbound trace confirms authentication and routing. However, at peak times, gateway does not receive a response from backend on time and generates 504. The first conclusion should not be that gateway is slow; the code represents timeout in the upstream hop."
  },
  {
    "kind": "paragraph",
    "text": "The investigation correlates backend latency, pool connections, and captures. It is found that new connections are opened excessively because the backend responds with frequent closing. The connection rate increases, output ports become pressured and some connects take time. The fix includes aligning keep-alive, reusing connections, and measuring the SNAT limit instead of just increasing the timeout response."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Connection reset errors after idle period"
  },
  {
    "kind": "paragraph",
    "text": "The pool of gateway maintains connections for five minutes, but an intermediate firewall removes inactive connections after sixty seconds. When a new request arrives, gateway selects a socket that it considers valid. The first send finds a non-existent state on firewall or on the peer and is reset."
  },
  {
    "kind": "paragraph",
    "text": "The fix is to align idle timeouts and set validation or recycling before the lower limit of the path. TCP keepalive can help in some scenarios, but it is no substitute for coherent configuration. Captures on both sides show that the reset is produced after the idle period, confirming the relationship with the stale state."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Duplicate operations after client timeout"
  },
  {
    "kind": "paragraph",
    "text": "The client submits a create operation and times out in ten seconds. gateway and backend continue processing, and the transaction is confirmed on the second eleven. The client interprets timeout as a failure and repeats the call, creating a duplicate effect. TCP guaranteed the transport of each attempt; he does not know the logical identity of the operation."
  },
  {
    "kind": "paragraph",
    "text": "The solution involves idempotence key, status query, correlation and semantic-based retry policy. The timeouts chain must also be designed so that internal components do not continue indefinitely after consumer abandonment. This case demonstrates why transportation reliability does not equate to business reliability."
  },
  {
    "kind": "subhead",
    "text": "Operating principle"
  },
  {
    "kind": "paragraph",
    "text": "Before changing a timeout, describe which step is timing out, whether the operation can continue on the server, and what the retry behavior will be. A higher number can hide saturation and magnify impacts."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2.18 Observation laboratories",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "The labs below are safe to run on a development machine or authorized environment. The goal is to observe behavior, not perform load testing. Only use addresses and services under your control. Captures of corporate environments require authorization and appropriate data processing."
  },
  {
    "kind": "paragraph",
    "text": "In the first lab, run a small local server, connect, and watch the creation of socket. In the second, compare connection refused and timeout using controlled targets. In the third, observe states ESTABLISHED and TIME_WAIT. The exact result varies by operating system, firewall, and version, and this variation is part of the learning process."
  },
  {
    "kind": "subhead",
    "text": "Local TCP Server in Python"
  },
  {
    "kind": "code",
    "text": "# tcp_server.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "HOST, PORT = '127.0.0.1', 9090\nwith socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:\n    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n    server.bind((HOST, PORT))\n    server.listen(10)\n    print(f'Listening on {HOST}:{PORT}')\n    conn, addr = server.accept()\n    with conn:\n        print('Client:', addr)\n        data = conn.recv(4096)\n        conn.sendall(b'RECEIVED: ' + data)"
  },
  {
    "kind": "subhead",
    "text": "Local TCP Client in Python"
  },
  {
    "kind": "code",
    "text": "# tcp_client.py\nimport socket"
  },
  {
    "kind": "code",
    "text": "with socket.create_connection(('127.0.0.1', 9090), timeout=3) as sock:\n    sock.sendall(b'hello gateway')\n    print(sock.recv(4096).decode())"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Before starting the server, run the client and log the error. Check if the system responds with connection refused.",
      "Start the server, run ss -lntp or netstat -ano and identify listener on port 9090.",
      "Run the client and observe the ESTABLISHED connection during a pause added to the code.",
      "Capture only the local port and identify SYN, SYN+ACK, ACK, data, FIN and ACKs.",
      "Change the server to sleep before response and set timeout short on the client. Note that the connection has been established, but the reading has timed out.",
      "Repeat several sequential connections and observe TIME_WAIT. Then modify the client to reuse a connection in a simple protocol and compare."
    ]
  },
  {
    "kind": "subhead",
    "text": "Don't confuse port testing with API testing"
  },
  {
    "kind": "paragraph",
    "text": "nc or Test-NetConnection demonstrate that TCP handshake was possible. An API can still fail TLS, HTTP, authentication, policies, or backend. Explicitly record the validated level."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Summary",
    "id": "resumo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The transport layer delivers data to processes through ports and offers different services to the application.",
      "Socket is an operating system abstraction; TCP connection is a distributed state between endpoints.",
      "TCP transports reliable and ordered stream of bytes using sequence, ACK, retransmission, flow control, and congestion.",
      "The three-way handshake synchronizes state and trades options; failures before and after it produce different symptoms.",
      "Receive window protects the receiver; congestion window protects the network.",
      "FIN ends a direction normally; RST aborts; TIME_WAIT protects against delayed segments and loss of final ACK.",
      "UDP preserves datagrams but does not provide delivery, ordering, or retransmission; Superior protocols can add guarantees.",
      "Ephemeral ports and SNAT translations are finite resources. Pooling and reuse reduce pressure and latency.",
      "A gateway maintains independent connections to clients and backends. Each hop has its own states, timeouts and failure causes.",
      "Effective diagnostics combine symptoms, socket states, packet capture, gateway logs, and metrics."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Diagnostic checklist for APIs"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Did the name resolve to the expected IP?",
      "Is there a route to the address and port?",
      "Is there SYN+ACK or RST? Has connect ended?",
      "Which side sent FIN or RST?",
      "The connection was established, but there was no response?",
      "Are there retransmissions, zero window or high RTT?",
      "Is listener active at the correct address? Are the queues saturated?",
      "Did the gateway fail on the frontside or backside?",
      "Does the pool have healthy, available connections?",
      "Does the rate of new connections or TIME_WAIT suggest a lack of reuse?",
      "Are there signs of ephemeral or SNAT port exhaustion?",
      "Are Timeouts between client, gateway, firewall and backend aligned?",
      "Is Retry safe to operate and is there idempotence?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Fixation exercises",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explain why a server can serve thousands of clients on the same port 443.",
      "Differentiate between listening socket and connected socket created by accept().",
      "Why don't two send() calls necessarily correspond to two recv() calls on the peer?",
      "Describe the three-way handshake and the function of initial sequence numbers.",
      "Compare connection refused and connect timeout in terms of observable packets.",
      "Explain the difference between cumulative ACK, retransmission timeout and SACK.",
      "Differentiate between receive window and congestion window.",
      "Why might many TIME_WAIT states appear on a gateway or HTTP client?",
      "Explain the difference between TCP keepalive and HTTP persistent connection.",
      "What guarantees does UDP not provide and why might this be acceptable?",
      "What are ephemeral ports and how do they participate in outbound connections?",
      "How does connection pooling help reduce SNAT exhaustion?",
      "Why increasing timeout may not resolve ports exhausted failure?",
      "Explain why a request that reached gateway might fail before reaching backend.",
      "Why does TCP not guarantee that a payment transaction is executed exactly once?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Scenario Questions"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "A consumer receives 502 only on the first call after a few minutes of no traffic; the second call works. Propose hypotheses and evidence to confirm stale connection.",
      "During peak, new calls to the same backend fail, but already established connections continue. Relate the scenario to ports/SNAT and describe short and long term measures.",
      "The client times out after 5 seconds, but backend records success after 7 seconds. Describe retry risks and a design with idempotence.",
      "An nc test for port 443 works, but curl fails. List layers not yet validated by port testing.",
      "A capture shows repeated SYNs with no response. Another shows SYN followed immediately by RST. Explain the operational difference."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Guiding answers"
  },
  {
    "kind": "paragraph",
    "text": "Answers should demonstrate layered reasoning, not just isolated terms. In question 1, the server port is shared because connections are distinguished by the tuple of addresses and ports. In question 2, listener receives new connections and accept() creates independent descriptors for each client. In question 3, TCP is a stream of bytes and does not preserve write boundaries."
  },
  {
    "kind": "paragraph",
    "text": "In failure questions, connection refused is associated with active rejection, often RST, while timeout usually indicates no response by the deadline. Pooling reduces new connections, but needs to deal with sockets stale. SNAT exhaustion is confirmed by correlation between rate, target, metrics and failures; it should not be assumed just by a generic message."
  },
  {
    "kind": "paragraph",
    "text": "In business matters, TCP commits bytes within a connection, not the durable result of a transaction. If the response is lost, the client may not know whether the operation was completed. Idempotency keys, state records, and queries allow you to safely retry or recover."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Table 8 - Essential terms of the chapter.",
    "headers": [
      "Term",
      "Brief definition"
    ],
    "rows": [
      [
        "ACK",
        "Acknowledgment that reports the next expected byte in the TCP stream."
      ],
      [
        "Backlog",
        "Queue associated with pending or completed connections awaiting acceptance."
      ],
      [
        "cwnd",
        "Congestion window maintained by the sender."
      ],
      [
        "Datagram",
        "Message unit preserved by UDP."
      ],
      [
        "Endpoint",
        "Combination of address and port on one side of communication."
      ],
      [
        "FIN",
        "Normal termination flag for a TCP flow direction."
      ],
      [
        "5-tuple",
        "Protocol, source IP/port and destination IP/port."
      ],
      [
        "MSS",
        "Largest amount of TCP data that the peer advertises to receive on a segment."
      ],
      [
        "Ephemeral port",
        "Temporary local port chosen for communication, normally outgoing."
      ],
      [
        "RST",
        "Flag that aborts or rejects TCP connection status."
      ],
      [
        "RTO",
        "Timer used to decide retransmission due to lack of confirmation."
      ],
      [
        "RTT",
        "Round-trip time between submission and confirmation noted."
      ],
      [
        "rwnd",
        "Window announced by the receiver for flow control."
      ],
      [
        "SACK",
        "Mechanism that reports blocks received out of order."
      ],
      [
        "SNAT",
        "Translation of the address and, in general, the port of origin."
      ],
      [
        "Socket",
        "Operating system abstraction used by processes for communication."
      ],
      [
        "TIME_WAIT",
        "Temporary state after active shutdown for shutdown safety and delayed segments."
      ],
      [
        "UDP",
        "Transport by datagrams with minimal mechanism and no delivery/order guarantees."
      ],
      [
        "Zero Window",
        "Announcement that the receiver has no available buffer space."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended reading",
    "id": "referencias"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9293 - Transmission Control Protocol (TCP): https://www.rfc-editor.org/rfc/rfc9293 RFC 768 - User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768 RFC 5681 - TCP Congestion Control: https://www.rfc-editor.org/rfc/rfc5681 RFC 6298 - Computing TCP Retransmission Timer: https://www.rfc-editor.org/rfc/rfc6298 RFC 7323 - TCP Extensions for High Performance: https://www.rfc-editor.org/rfc/rfc7323 RFC 8304 - Transport Features of UDP and UDP-Lite: https://www.rfc-editor.org/rfc/rfc8304 RFC 6335 - IANA Procedures for Service Names and Port Numbers: https://www.rfc-editor.org/rfc/rfc6335 IANA - Service Name and Transport Protocol Port Number Registry: https://www.iana.org/assignments/service-names-port-numbers/ The Open Group - socket(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/socket.html The Open Group - bind(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/bind.html The Open Group - listen(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/listen.html The Open Group - accept(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/accept.html The Open Group - connect(): https://pubs.opengroup.org/onlinepubs/9699919799/functions/connect.html Microsoft - Troubleshooting client response timeouts and errors with Azure API Management: https://learn.microsoft.com/en-us/azure/api-management/troubleshoot-response-timeout-and-errors Microsoft - Source Network Address Translation for outbound connections: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-outbound-connections Microsoft - Debug APIs in Azure API Management using request tracing: https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-api-inspector Axway - Configure remote host settings: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_remote_hosts/index.html Axway - Introduction to API Gateway administration: https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/admin_intro/index.html"
  },
  {
    "kind": "subhead",
    "text": "Recommended reading order"
  },
  {
    "kind": "paragraph",
    "text": "Start with RFC 9293, using this chapter as a map. Then read RFC 5681 and RFC 6298 for performance and recovery. Consult RFC 6335 and the IANA registry when studying ports. Use Axway and Azure documentation to relate fundamentals to platform configurations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Closing",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "TCP, UDP, ports and sockets form the bridge between application processes and the IP network. They explain how thousands of consumers share a listener, how bytes are committed and reclaimed, why connections remain in states after closing, and how finite output resources can cause bursting."
  },
  {
    "kind": "paragraph",
    "text": "In the next chapter, the study advances to IP addressing, subnets, IPv4, IPv6 and routing. These concepts will allow you to understand how packets choose paths, why private networks need translation, and how gateways reaches backends distributed across data centers, clouds, and clusters."
  }
];
