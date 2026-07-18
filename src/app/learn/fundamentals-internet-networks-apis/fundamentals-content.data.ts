import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Complete English translation of the Portuguese source article.
export const FUNDAMENTALS_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Presentation",
    "id": "apresentacao"
  },
  {
    "kind": "paragraph",
    "text": "Corporate APIs appear, at first glance, as a technology concentrated in the application layer: a consumer sends a request, a service executes an operation and returns a response. However, this view hides an extensive chain of mechanisms. Before an HTTP method reaches the backend, the host name needs to be resolved, packets need to be routed, a connection must be established, cryptographic parameters need to be negotiated, and security policies can be evaluated at different components of the infrastructure."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents this chain progressively. The goal is not to immediately transform the reader into an expert in networks but to provide a sufficiently precise mental model for understanding where a call may fail, which component has each responsibility, and why technologies such as TLS, OAuth, JWT, mTLS, and API Gateways depend on prior foundations. In subsequent chapters, each of these areas will be explored in depth."
  },
  {
    "kind": "paragraph",
    "text": "The approach combines historical context, protocol theory, and practical application in corporate environments. Whenever possible, the text relates concepts to platforms like Axway API Gateway and Azure API Management. Examples use a fictitious banking client API to demonstrate the complete communication path without exposing details of real-world environments."
  },
  {
    "kind": "subhead",
    "text": "How to Study This Chapter"
  },
  {
    "kind": "paragraph",
    "text": "Read the sections sequentially in your first pass. Then, read again following the end-to-end diagram and try to classify each possible failure by layer where it occurs. This practice prepares troubleshooting reasoning used by gateway teams and integration teams."
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
      "Distinguish between Internet, Web, HTTP, API, and API REST, avoiding the use of these terms as synonyms.",
      "Explain how technical standards are defined by organizations such as the IETF, RFC Editor, NIST,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "IEEE, W3C, OpenID Foundation, and OpenAPI Initiative."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Understand encapsulation, addressing, routing, ports, connections, name resolution,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "and cryptographic protection at a conceptual level."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Describe the complete path of an HTTPS request from the consumer to a backend"
    ]
  },
  {
    "kind": "paragraph",
    "text": "protected by an API Gateway."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Identify the typical responsibilities of firewalls, load balancers, proxies, gateways, identity"
    ]
  },
  {
    "kind": "paragraph",
    "text": "providers, and backend services."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use the layered model to organize investigations of DNS, TCP, TLS, and HTTP errors,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "authentication, routing, and application errors."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Chapter Structure"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "1.1 Why Network Foundations Matter for APIs",
      "1.2 Internet, Web and API: Different Concepts",
      "1.3 Historical Evolution of the Internet to Platform APIs",
      "1.4 Ecosystem of Standardization",
      "1.5 RFCs: How Protocols Are Documented",
      "1.6 Network Communication and Encapsulation",
      "1.7 OSI Model and TCP/IP Model",
      "1.8 IP Addressing and Routing",
      "1.9 DNS Resolution and Name Resolution",
      "1.10 TCP, UDP, Ports and Sockets",
      "1.11 NAT, Firewall, Proxy and Load Balancing",
      "1.12 TLS, HTTPS and Trust",
      "1.13 Anatomy of an HTTP Message",
      "1.14 REST and the Concept of Resource",
      "1.15 API Gateway and API Platform",
      "1.16 End-to-End Journey",
      "1.17 Layered Troubleshooting",
      "1.18 Application in Corporate and Banking Environments",
      "Summary, Exercises, Glossary and References"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.1 Why Network Foundations Matter for APIs",
    "id": "por-que-importa"
  },
  {
    "kind": "paragraph",
    "text": "A team of API Gateways works at the intersection between development, infrastructure, identity, and security. The gateway receives application messages but availability of this entry point depends on elements that exist before the application: DNS, routes, addresses, ports, connections, and certificates. That's why an observed error such as 'the API is not responding' can have causes completely different, from a name that does not resolve to a policy rejecting a token."
  },
  {
    "kind": "paragraph",
    "text": "The same HTTP response may hide distinct origins. A 502 code could indicate the gateway failed to establish communication with the backend; a 401 typically relates to authentication but can be produced by the gateway, identity provider, or service; a timeout can occur at the consumer, load balancer, gateway, or backend. Without a layered view, diagnosis tends to turn into trial and error."
  },
  {
    "kind": "paragraph",
    "text": "Fundamental knowledge also improves architectural decisions. By understanding where confidentiality is guaranteed, the architect can differentiate transport security from message integrity. By understanding connections and sessions, they can evaluate effects of keep-alive, pooling, and TLS termination. By understanding DNS resolution, they can design failover, multiple environments, and service discovery strategies with fewer incorrect assumptions."
  },
  {
    "kind": "paragraph",
    "text": "In this material, the term 'fundamentals' does not mean superficial content. It means studying the mechanisms that support more visible technologies such as OAuth 2.0, JWT, OpenID Connect, mTLS, and gateway policies. These concepts will be easier to understand when it is clear what happens before, during, and after a request transmission."
  },
  {
    "kind": "subhead",
    "text": "On the job"
  },
  {
    "kind": "paragraph",
    "text": "When a consumer reports a timeout, the initial question should not just be 'which gateway policy failed?'. First, determine if DNS resolution, TCP establishment, TLS negotiation, and the request reaching the gateway listener occurred. Only then proceed to HTTP, authentication, and routing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.2 Internet, Web and API: Different Concepts",
    "id": "conceitos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Internet"
  },
  {
    "kind": "paragraph",
    "text": "The Internet is a global infrastructure formed by interconnecting independent networks. Each organization can operate its own links, routers, autonomous systems, and policies, but communication is possible because participants adopt common protocols. The term 'internet' in the generic sense means a network of networks; 'Internet', with an uppercase initial, usually refers to the public global system that uses the IP family of protocols."
  },
  {
    "kind": "paragraph",
    "text": "The functioning of the Internet is decentralized. There is no single central server directing all messages. Telecommunications operators, cloud providers, companies, universities, and governments manage parts of the infrastructure. Routing between these parts allows packets to traverse multiple networks until reaching their destination. This characteristic explains why latency, packet loss, and asymmetric paths can vary even when the client and server do not change."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "World Wide Web"
  },
  {
    "kind": "paragraph",
    "text": "The Web is a system of interconnected resources that uses the Internet as its infrastructure. It was conceived around resource identifiers, representations transferred between clients and servers, and links connecting documents. Popular browsers and web servers popularized HTTP, but the Internet existed before the Web and continues to transport many protocols not belonging to the Web."
  },
  {
    "kind": "paragraph",
    "text": "Saying an API is accessed via the Web generally means it uses technologies associated with the Web, especially URI, HTTP, and formats such as JSON. This does not transform every API into a web page. The interface can be consumed by mobile apps, batch systems, devices, microservices, or partners without any browser interaction."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "API and RESTful API"
  },
  {
    "kind": "paragraph",
    "text": "An API is an interface created to allow one software to utilize the capabilities offered by another software. The interface defines operations, expected data, responses, errors, and usage rules. APIs exist at different levels: local libraries, operating systems, databases, messaging interfaces, and remote interfaces. Therefore, an API is not synonymous with HTTP nor REST."
  },
  {
    "kind": "paragraph",
    "text": "A RESTful API is a remote interface designed according to the principles of the REST architectural style and typically exposed over HTTP. In market practice, many interfaces are called REST only because they use JSON and HTTP methods. A more rigorous evaluation also observes resource identification, method semantics, absence of session state on the server, caching, and layered architecture."
  },
  {
    "kind": "subhead",
    "text": "Essential distinction"
  },
  {
    "kind": "paragraph",
    "text": "The Internet is the infrastructure of networks. The Web is a system built upon this infrastructure. HTTP is an application protocol. An API is a contract between software systems. REST is an architectural style. These concepts relate but are not equivalent."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.3 Historical Evolution: From Packet Switching to API Platforms",
    "id": "evolucao"
  },
  {
    "kind": "paragraph",
    "text": "The earliest computer networks were often constructed for specific environments and had little interoperability. Research in packet switching introduced the idea of dividing data into smaller units that could traverse the network via shared paths. Instead of reserving a dedicated physical circuit throughout communication, the network could use its capacity statistically and reconstruct the data at the destination."
  },
  {
    "kind": "paragraph",
    "text": "The ARPANET, operational since 1969, was one of the projects demonstrating the viability of this approach in long-distance networks. It was not the modern Internet but provided technical and organizational experience for subsequent evolution. The next challenge was not just to connect computers within a single network but to allow different networks to communicate without requiring a unique physical technology."
  },
  {
    "kind": "paragraph",
    "text": "The TCP/IP suite emerged to resolve this interconnection problem. The IP layer provides a mechanism for addressing and delivering datagrams between networks, while transport protocols such as TCP provide additional properties to applications. The adoption of TCP/IP by the ARPANET in 1983 is traditionally considered a milestone in consolidating the modern Internet."
  },
  {
    "kind": "paragraph",
    "text": "By the late 1980s and early 1990s, the Web added a layer for resource publication and navigation. URI, HTTP, and HTML formed a simple, extensible, and distributed system."
  },
  {
    "kind": "paragraph",
    "text": "With the growth of dynamic applications, HTTP began to transport not only documents for people but data between systems."
  },
  {
    "kind": "paragraph",
    "text": "In the early 2000s, service-oriented architectures and web APIs gained importance in corporate integration. REST became popular for aligning with the already widespread infrastructure of the Web. Subsequently, cloud computing, microservices, mobile applications, and partner ecosystems increased the number of APIs and consumers, creating a need for governance, protection, and observability at scale."
  },
  {
    "kind": "paragraph",
    "text": "It is within this context that modern API management platforms emerged. An API Gateway began to function as a controlled point of exposure and mediation, while management plane components handled configuration, cataloging, publication, analytics, and the lifecycle. Products such as Axway API Gateway and Azure API Management represent corporate implementations of this evolution."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/timeline-api-platforms-en.svg",
    "alt": "Timeline from ARPANET to API Platforms",
    "caption": "Figure 1 - Simplified timeline of network infrastructure leading up to API platforms."
  },
  {
    "kind": "subhead",
    "text": "Critical Reading"
  },
  {
    "kind": "paragraph",
    "text": "The evolution did not occur as a complete replacement. Old and new technologies coexist. HTTP/1.1 remains present alongside HTTP/2 and HTTP/3; TLS 1.2 can still coexist with TLS 1.3; legacy systems may be exposed by modern gateways. Corporate architecture requires understanding these combinations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.4 Standardization Ecosystem and Technical References",
    "id": "padroes"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "IETF and RFC Editor"
  },
  {
    "kind": "paragraph",
    "text": "The Internet Engineering Task Force (IETF) is an open community responsible for developing many standards used in the Internet. Work is organized into groups that discuss technical problems, analyze proposals, and produce documents. Protocols such as HTTP, TLS, DNS, TCP, OAuth 2.0, and various security mechanisms are defined or updated within this ecosystem."
  },
  {
    "kind": "paragraph",
    "text": "The RFC Editor publishes and maintains the series of RFCs. An RFC receives a permanent number and is not edited after publication. When an specification needs to be corrected or replaced, a new RFC is published and records its relationship with previous documents, for example \"updates\" or \"obsoletes\". This characteristic is important: when researching a protocol, professionals should verify if the found RFC is still current."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NIST, W3C, IEEE and other organizations"
  },
  {
    "kind": "paragraph",
    "text": "The National Institute of Standards and Technology (NIST) publishes widely used standards in security, cryptography, identity, and risk management. Although an institution from the United States, its publications influence organizations across multiple countries. For APIs, documents from NIST help organize protection controls during development, deployment, and operation."
  },
  {
    "kind": "paragraph",
    "text": "The World Wide Web Consortium (W3C) produces standards related to the web platform, including technologies used by browsers. The Institute of Electrical and Electronics Engineers (IEEE) maintains important standards at the physical and link layers, such as Ethernet and Wi-Fi families. These standards are below HTTP but directly affect connectivity, capacity, and network behavior."
  },
  {
    "kind": "paragraph",
    "text": "The OpenID Foundation maintains specifications related to identity, including OpenID Connect and profiles used in financial ecosystems. The OpenAPI Initiative maintains the OpenAPI specification, which is used for describing HTTP contracts in a readable manner by both people and tools. OASIS maintains standards such as SAML. Each organization acts within its domain, and corporate projects frequently combine specifications from multiple sources."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "How to evaluate the authority of a document"
  },
  {
    "kind": "paragraph",
    "text": "Manufacturer documentation explains how a product implements a standard but does not replace the normative specification. To understand Azure APIM behavior, consult Microsoft; for Axway API Gateway, consult Axway. However, to understand HTTP semantics, consult the applicable RFC. This distinction avoids conflating product decisions with protocol requirements."
  },
  {
    "kind": "paragraph",
    "text": "An efficient study strategy comprises three levels. First, a didactic introduction establishes vocabulary. Second, the official specification clarifies normative requirements and edge cases. Finally, product documentation demonstrates how to configure or observe that behavior in an implementation-specific manner. This sequence reduces the risk of learning only procedures without understanding fundamentals."
  },
  {
    "kind": "subhead",
    "text": "Rule of thumb"
  },
  {
    "kind": "paragraph",
    "text": "To answer 'what does the protocol allow?', look at the specification. To answer 'how does the product implement or configure this?', look at manufacturer documentation. To answer 'which control is recommended?', consult security and risk guides such as NIST and OWASP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.5 RFCs: How Protocols Are Documented and Evolve",
    "id": "rfcs"
  },
  {
    "kind": "paragraph",
    "text": "RFC stands for Request for Comments, a historical name that has remained even when parts of the series began registering consolidated standards. Not all RFCs are Internet Standards. There exist documents in different tracks and categories, including Standards Track, Best Current Practice, Informational, and Experimental. Therefore, citing only a number without verifying its status can lead to incorrect conclusions."
  },
  {
    "kind": "paragraph",
    "text": "Before publication, proposals from IETF typically circulate as Internet-Drafts. A draft is a temporary document: it may change, expire, or never become an RFC. During analysis, participants discuss interoperability, security, clarity, and implementation experience. The goal is not merely to produce a polished description but to allow independent implementations to communicate correctly."
  },
  {
    "kind": "paragraph",
    "text": "RFCs use normative words such as MUST, MUST NOT, SHOULD, and MAY according to specific conventions. In a technical reading, these words indicate different levels of obligation. MUST describes an essential requirement for conformity; SHOULD allows justified exceptions; MAY indicates permitted optionality. Informal translations may soften these differences and alter interpretation."
  },
  {
    "kind": "paragraph",
    "text": "The evolution of HTTP highlights the importance of tracking document relationships. Older RFCs may remain heavily cited despite being superseded. Modern HTTP semantics are consolidated in RFC 9110, while transport versions have their own documents. TCP also received a more recent consolidation specification in RFC 9293, which supersedes the historic RFC 793."
  },
  {
    "kind": "paragraph",
    "text": "When studying an RFC, start with the summary, status, relationship to other documents, and abstract. Then identify terminology, operational model, normative requirements, and security section. You do not need to memorize the entire document. The initial goal is to learn how to locate the formal source of a query and interpret the relevant excerpt in the correct context."
  },
  {
    "kind": "subhead",
    "text": "Simplified regulatory vocabulary"
  },
  {
    "kind": "code",
    "text": "MUST requirement mandatory\nMUST NOT prohibited behavior\nSHOULD recommended, unless justified by technical reasons\nMAY optional per specification"
  },
  {
    "kind": "subhead",
    "text": "Example investigation"
  },
  {
    "kind": "paragraph",
    "text": "When encountering a configuration that accepts TLS 1.0, do not conclude based solely on the product's screen showing it as recommended. Verify the standard, current security guidelines, and organizational policy. Technical capability to configure does not equate to a secure decision."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.6 Network Communication, Packets, and Encapsulation",
    "id": "camadas"
  },
  {
    "kind": "paragraph",
    "text": "Applications work with meaningful messages for business: a request to consult a client, a JSON response, or an access token. However, the network infrastructure must transport these data through means with size limits, address specifications, and own rules. Each layer adds control information to the content received from the upper layer. This process is called encapsulation."
  },
  {
    "kind": "paragraph",
    "text": "In an HTTP call over TLS and TCP, the application produces bytes of an HTTP message. TLS organizes these bytes into protected records. TCP treats the flow as a reliable sequence and creates segments. IP appends source and destination addresses to datagrams. The link technology creates appropriate frames for the local medium, such as Ethernet or Wi-Fi. At the destination, each layer removes and interprets its header before passing the content to the upper layer."
  },
  {
    "kind": "paragraph",
    "text": "This separation allows independent evolution. The same HTTP application can operate over different physical networks, and the same link can transport different upper-layer protocols. This explains why diagnostic tools show distinct views: a packet capture might display addresses and ports, while gateway logs reveal HTTP methods, paths, and headers."
  },
  {
    "kind": "paragraph",
    "text": "The size of data matters. Interfaces have a Maximum Transmission Unit (MTU), and larger messages need to be split or adjusted to fit the path's limits. MTU issues and fragmentation can produce hard-to-detect symptoms, such as connections working for small messages but failing with large certificates, extensive headers, or uploads."
  },
  {
    "kind": "paragraph",
    "text": "Encapsulation does not mean that all layers are equally visible in each component. A router primarily routes based on IP information. A layer 4 load balancer may use IP and port information. A layer 7 proxy interprets HTTP. A gateway can inspect the method, URI, token, and body. The higher the operational layer, the greater the semantic understanding of the message, and typically the higher the processing cost."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/encapsulamento-api-en.svg",
    "alt": "Five Layers Encapsulating an HTTP Request",
    "caption": "Figure 2 - Simplified View of TLS-Protected HTTP Call Encapsulation."
  },
  {
    "kind": "subhead",
    "text": "Relation to Observability"
  },
  {
    "kind": "paragraph",
    "text": "Application logs, gateway logs, distributed traces, and packet captures observe at different levels. A complete investigation may require correlating timestamps, address, port, SNI, HTTP method, correlation ID, and trace ID."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.7 OSI Model and TCP/IP Model",
    "id": "modelos"
  },
  {
    "kind": "paragraph",
    "text": "Layered models are conceptual tools. They help separate responsibilities and organize reasoning, but do not perfectly represent all details of an implementation. The OSI model describes seven layers: physical, link, network, transport, session, presentation, and application. The TCP/IP model is often presented with four or five layers, grouping functions in a manner closer to the Internet architecture."
  },
  {
    "kind": "paragraph",
    "text": "In API practice, the most cited layers are network, transport, and application. IP belongs to the network layer; TCP and UDP belong to the transport layer; HTTP, DNS, and identity protocols appear at the application layer. TLS is frequently positioned between application and transport, although its classification varies depending on the model used. The important thing is to understand its function rather than just disputing which layer number it occupies."
  },
  {
    "kind": "paragraph",
    "text": "The OSI model is useful for troubleshooting because it encourages an order of operations. First, do we have physical or virtual connectivity? Next, can the address be reached? Does the transport port accept connections? Is TLS negotiation complete? Is the HTTP message valid? Is authentication accepted? Does the business rule work? This path reduces investigations that start from complex policies when the problem is a missing route."
  },
  {
    "kind": "paragraph",
    "text": "Terms like 'layer 4 balancer' and 'layer 7 proxy' derive from this vocabulary. A layer 4 device primarily makes decisions based on transport address and port information. A layer 7 component interprets the application protocol and can route by host, path, or header. An API Gateway is typically a layer 7 component, although it depends on resources from lower layers."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Approximate Mapping between OSI and TCP/IP.",
    "headers": [
      "OSI",
      "TCP/IP approximate",
      "Examples in the context of APIs"
    ],
    "rows": [
      [
        "Layer 7 Application",
        "Application Layer",
        "HTTP, DNS, OAuth, OpenID Connect"
      ],
      [
        "Layer 6 Presentation",
        "Application Layer",
        "JSON, encoding, serialization, TLS in some models"
      ],
      [
        "Layer 5 Session",
        "Application Layer",
        "Logical sessions, negotiation, and context"
      ],
      [
        "4 Transporte",
        "Transporte",
        "TCP, UDP, QUIC"
      ],
      [
        "3 Network",
        "Internet",
        "IPv4, IPv6, routing"
      ],
      [
        "2 Link",
        "Network access",
        "Ethernet, Wi-Fi, VLAN"
      ],
      [
        "1 Physical",
        "Network access",
        "Cable, fiber, radio"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.8 IP Addressing and Routing",
    "id": "enderecamento"
  },
  {
    "kind": "paragraph",
    "text": "The IP protocol provides logical addressing and datagram delivery between networks. An address identifies a network interface in a given context of the network, not necessarily a person, application or machine permanently. Devices may have multiple addresses, addresses can change, and intermediary mechanisms may translate sources and destinations."
  },
  {
    "kind": "paragraph",
    "text": "IPv4 uses 32-bit addresses and is typically represented by four decimal numbers. IPv6 uses 128 bits and hexadecimal representation, offering much larger space and other architectural improvements. In corporate networks, private IPv4 continues to be common, while IPv6 can appear increasingly in external environments, cloud, and modern networks. An API may publish DNS records for both families."
  },
  {
    "kind": "paragraph",
    "text": "A mask or prefix identifies which part of the address corresponds to the network. When the destination is outside the local network, the host sends the datagram to the default gateway. Routers consult their tables and forward the packet hop-by-hop. Each router decides the next path; it does not need to know API logic, only enough information to reach the target network."
  },
  {
    "kind": "paragraph",
    "text": "Routing differs from API routing. The former occurs in IP infrastructure and chooses paths between networks. The latter happens at proxies and gateways and may choose a backend based on host, path, version, header or policy. An IP routing failure prevents connection before the gateway analyzes HTTP; an API routing failure occurs after the message has already reached the gateway."
  },
  {
    "kind": "paragraph",
    "text": "In cloud and data centers, routes can be influenced by virtual networks, subnets, tunnels, security appliances, and output rules. Being in the same company does not guarantee direct connectivity. Architects should treat network path, DNS resolution, firewall rules, and output dependencies as explicit parts of the design."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of addressing"
  },
  {
    "kind": "code",
    "text": "Example private IPv4: 10.20.30.40/24\nApproximate network: 10.20.30.0/24\nDefault gateway: 10.20.30.1\nExternal destination: forwarded to the gateway"
  },
  {
    "kind": "subhead",
    "text": "Diagnosis"
  },
  {
    "kind": "paragraph",
    "text": "If the name resolves but the connection times out without a response, investigate IP path, firewall, routing, and listener. If the connection is immediately refused, the target may be reachable but with no service listening on that port or due to active rejection."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.9 DNS Resolution and Name Resolution",
    "id": "dns"
  },
  {
    "kind": "paragraph",
    "text": "The Domain Name System (DNS) allows using hierarchical names instead of relying on fixed IP addresses. In a URL like https://api.exemplo.com,, the host api.exemplo.com needs to be resolved to an address that the client can reach. This resolution may involve local cache, corporate resolver, recursive servers, and authoritative servers."
  },
  {
    "kind": "paragraph",
    "text": "DNS is distributed and hierarchical. The zone responsible for a domain publishes records that describe how names should be resolved. A records associate names with IPv4 addresses; AAAA records associate them with IPv6 addresses; CNAME creates an alias for another name; TXT records transport textual information used by various mechanisms; SRV can indicate services and ports. In API architectures, CNAMEs are common to decouple the public address from physical or provider infrastructure."
  },
  {
    "kind": "paragraph",
    "text": "The Time To Live (TTL) dictates how long a response may remain in cache. A high TTL reduces queries and can improve efficiency but makes changes slower for consumers still holding outdated data. A low TTL accelerates transitions but increases queries and does not eliminate all intermediate caches. Migration and disaster recovery strategies must consider this behavior."
  },
  {
    "kind": "paragraph",
    "text": "Split-horizon DNS occurs when the same name returns different responses based on the origin of the query. An internal consumer may receive a private address, while an external consumer receives a public endpoint. This technique is useful but can cause confusion if tests conducted over different networks produce distinct results."
  },
  {
    "kind": "paragraph",
    "text": "DNS also relates to TLS. The client typically validates whether the certificate presented by the server is valid for the requested name. Therefore, pointing a name to another endpoint alone is insufficient; the endpoint must present a compatible certificate and respond appropriately to the expected host or SNI (Server Name Indication). Certificate and name failures often occur together during migrations."
  },
  {
    "kind": "subhead",
    "text": "Example of resolution and connection verification"
  },
  {
    "kind": "code",
    "text": "$ nslookup api.exemplo.com\nName: api.exemplo.com\nAddress: 203.0.113.20\n$ curl -v https://api.exemplo.com/clientes\n* Host api.exemplo.com:443 was resolved\n* Connected to api.exemplo.com (...) port 443"
  },
  {
    "kind": "subhead",
    "text": "Caution point"
  },
  {
    "kind": "paragraph",
    "text": "A successful ping does not confirm that an API is available. ICMP may be blocked, and the API depends on DNS, routing, port, TLS, and HTTP. Similarly, a blocked ping does not prove that HTTPS service is unavailable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.10 TCP, UDP, Ports and Sockets",
    "id": "transporte"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TCP"
  },
  {
    "kind": "paragraph",
    "text": "TCP provides a reliable and ordered byte stream between two endpoints. Before data exchange, a connection is established through a three-way handshake: SYN, SYN-ACK, and ACK. The connection maintains sequence numbers, confirms receptions, and retransmits data as needed. These properties simplify the work of protocols such as HTTP/1.1 and HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "Reliability comes with cost. TCP must manage state, window sizes, retransmissions, and congestion control. Packet losses can increase latency even when the application receives all bytes at the end. Persistent connections and pools avoid repeating handshakes for each request but require careful configuration of timeouts and limits in clients, gateways, and backends."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "UDP and QUIC"
  },
  {
    "kind": "paragraph",
    "text": "UDP offers datagrams without the establishment of connections and without guarantees of delivery or order within the protocol itself. This does not mean that applications on UDP are necessarily unreliable; they can implement necessary mechanisms. DNS traditionally uses UDP in many queries, with alternatives and extensions for other scenarios."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/3 utilizes QUIC, which operates over UDP and incorporates transport and security resources. The choice allows reducing some setup costs and avoiding certain blocking effects between flows. However, the key point for a gateway professional in this chapter is to recognize that modern HTTP does not exclusively depend on TCP in all versions."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Ports and Sockets"
  },
  {
    "kind": "paragraph",
    "text": "A port identifies a logical communication point on the host. HTTPS typically uses 443 and 80 by convention, but services can operate on other ports. The IP address and port pair identify a transport endpoint; combined with source and destination endpoints and protocol, it forms a communication identification."
  },
  {
    "kind": "paragraph",
    "text": "Socket is an abstraction used by the operating system to allow applications to send and receive data. A server creates a socket, associates an address and port, and passes listening for connections. If the process is not listening, the client may receive a connection refused error. If a firewall silently discards packets, the client tends to wait until a timeout."
  },
  {
    "kind": "subhead",
    "text": "Distinct connections in the path"
  },
  {
    "kind": "code",
    "text": "Client 10.1.5.20:53144 -> Gateway 10.2.8.10:443\nephemeral port of the service\nGateway 10.2.8.10:48720 -> Backend 10.3.9.15:8443\nnew backend listener connection"
  },
  {
    "kind": "subhead",
    "text": "Architectural implications"
  },
  {
    "kind": "paragraph",
    "text": "The client-gateway and gateway-backend connections are typically independent. The gateway can terminate TLS, reuse backend connections, and apply different timeouts. This explains why a problem may exist only on one side."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.11 NAT, firewall, reverse proxy, and load balancer",
    "id": "intermediarios"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "NAT"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifies address information, often including port information, during traffic passage. NAT allows private addresses to use a smaller set of public addresses and is common in corporate networks and cloud environments. As a result, the observed server address may be the intermediate device's address rather than the consumer's original address."
  },
  {
    "kind": "paragraph",
    "text": "To preserve application-layer source information, proxies can add headers such as Forwarded or X-Forwarded-For. These headers require a chain of trust: accepting values directly from any client allows tampering. The border component should remove or overwrite untrusted values before passing the information."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Firewall"
  },
  {
    "kind": "paragraph",
    "text": "Firewalls apply rules to permit, reject, or discard traffic based on criteria such as address, port, protocol, and connection state. Application firewalls can analyze upper-layer protocols. In API environments, different layers of firewalls may exist at the consumer, network, public edge, cluster, and host levels."
  },
  {
    "kind": "paragraph",
    "text": "A firewall release must consider direction, origin, destination, port, and protocol. Requests like 'allow the API' are insufficient. Additionally, the normal return often depends on connection state, and traffic to identity providers, certificate validation services, or external services may also require specific rules."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Forward proxy, reverse proxy, and load balancer"
  },
  {
    "kind": "paragraph",
    "text": "A forward proxy, often simply called a proxy or egress proxy, acts on behalf of the client. The browser, operating system, or application knows about the intermediary and sends it a request intended for another server. The proxy decides whether to permit the outbound connection, connects to the destination, and returns the response to the consumer. Organizations use forward proxies for Internet access control, auditing, filtering, caching, and egress policy enforcement. To the destination server, the connection usually appears to originate from the proxy, which hides or replaces the client network address."
  },
  {
    "kind": "paragraph",
    "text": "A reverse proxy receives requests in the name of internal servers. It can terminate TLS, apply rules, normalize headers, compress responses, and hide backend topology. An API Gateway has a reverse-proxy feature but adds API management, security, and governance-specific functions."
  },
  {
    "kind": "paragraph",
    "text": "With a reverse proxy, the consumer believes it is communicating with the published service itself. DNS points the API name to the proxy, and the proxy chooses which internal server receives the call. A forward proxy therefore represents clients and controls outbound traffic, whereas a reverse proxy represents servers and controls inbound traffic. Both can forward HTTP and manipulate headers, but they sit on opposite sides of the relationship and rely on different trust roots."
  },
  {
    "kind": "table",
    "caption": "Comparison between a forward proxy and a reverse proxy.",
    "headers": [
      "Aspect",
      "Forward proxy",
      "Reverse proxy"
    ],
    "rows": [
      ["Represents", "A client or a network of clients", "A server or a set of backends"],
      ["Primary flow", "Outbound traffic from the network to external services", "Inbound traffic from consumers to published services"],
      ["Who knows about it", "The client is normally configured to use it", "The client accesses the service name and may not notice the intermediary"],
      ["What it hides", "The source and topology of the client network", "The location and number of internal servers"],
      ["Frequent uses", "Egress, filtering, auditing, and caching", "TLS termination, routing, load balancing, WAF, and backend protection"],
      ["Relationship to APIs", "Controls which external APIs consumers may call", "Publishes internal APIs and routes calls to the correct backends"]
    ]
  },
  {
    "kind": "paragraph",
    "text": "With HTTPS, a forward proxy can create only a TCP tunnel using CONNECT, without reading the protected HTTP traffic, or it can perform TLS inspection when managed client devices trust a corporate CA. The latter is a sensitive operation that creates two TLS sessions and requires governance. A reverse proxy can use pass-through mode and preserve TLS to the backend, terminate TLS and forward HTTP internally, or terminate and re-encrypt the call in a separate TLS session. These modes are not equivalent and must be explicit in the trust diagram."
  },
  {
    "kind": "paragraph",
    "text": "Load balancers distribute traffic across multiple instances to increase capacity and availability. Algorithms may consider round-robin, active connections, weights, latency, or affinity. Health checks determine which instances can receive traffic. A service may appear available in a local test but fail externally if the load balancer considers all unhealthy instances."
  },
  {
    "kind": "subhead",
    "text": "Common error"
  },
  {
    "kind": "paragraph",
    "text": "Terminating TLS at the balancer does not necessarily mean that the segment up to the gateway is unprotected; re-encryption may occur. The design should register each hop, where TLS terminates, which certificate is validated, and which context headers are trustworthy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.12 TLS, HTTPS, and trust establishment",
    "id": "seguranca"
  },
  {
    "kind": "subhead",
    "text": "What TLS protects — and what remains outside its scope"
  },
  {
    "kind": "paragraph",
    "text": "TLS protects communication against unintended reading, alteration, and forgery within the considered threat model. HTTPS is HTTP transported over a protected channel by TLS. The protocol negotiates cryptographic parameters, authenticates at least the server in common configurations, and establishes keys used to protect transmitted data."
  },
  {
    "kind": "paragraph",
    "text": "After the handshake, TLS records use session keys and authenticated encryption to provide confidentiality and integrity for bytes in transit on that hop. A network observer can still infer metadata such as IP addresses, ports, connection volume, and duration. TLS also does not correct broken authorization, malicious payloads, compromised endpoints, secrets written to logs, or data already decrypted by the application. It protects the channel between two termination points; it does not by itself establish that the complete business journey is secure."
  },
  {
    "kind": "subhead",
    "text": "How the handshake establishes trust and keys"
  },
  {
    "kind": "paragraph",
    "text": "The server presents a certificate associating a public key with identities, typically DNS names. The client verifies the signature, validity period, certificate chain, permitted usage, and name match. Trust depends on accepted certification authorities by the client. In corporate environments, certificates may be issued by public authorities or internal PKIs."
  },
  {
    "kind": "paragraph",
    "text": "At the start, ClientHello advertises supported versions, cipher suites, key-exchange groups, and extensions. SNI carries the expected name so a shared address can select the correct certificate; ALPN negotiates HTTP/1.1, HTTP/2, or another application protocol. The server responds with the selected parameters, its certificate chain, and proof that it possesses the private key. An ephemeral exchange, normally ECDHE in modern TLS, produces the secret from which session keys are derived without transmitting those keys over the network. Finished messages authenticate the handshake transcript and detect tampering with the negotiation."
  },
  {
    "kind": "paragraph",
    "text": "During the handshake, the client and server negotiate compatible versions and algorithms. TLS 1.3 simplified and modernized parts of the protocol compared to previous versions. The application should only send sensitive information after the channel is established and validated. If negotiation fails, no gateway HTTP policy can be executed because the application message has not yet been received."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 removed obsolete cryptographic options, reduced plaintext handshake messages, and normally completes a new handshake in one round trip. Session resumption with PSKs or tickets reduces cost and latency, but tickets and their protection keys also need expiration and rotation. The 0-RTT mode can send data before a new handshake finishes, but it permits replay under certain conditions; it should therefore be restricted to truly safe and idempotent operations or remain disabled for sensitive APIs."
  },
  {
    "kind": "subhead",
    "text": "mTLS: mutual authentication at the channel"
  },
  {
    "kind": "paragraph",
    "text": "mTLS adds client authentication at the TLS level. In addition to validating the server's certificate, the server requests and validates a certificate presented by the client. This is common in B2B and financial integrations. mTLS authenticates a technical identity linked to the certificate; business authorization may still depend on tokens, scopes, contracts, and context."
  },
  {
    "kind": "paragraph",
    "text": "When mTLS is required, the server sends CertificateRequest with information about acceptable CAs and algorithms. The client presents its chain and produces CertificateVerify, a signature over the transcript proving possession of the corresponding private key—sending a copied certificate alone is not enough. The server validates the chain, validity, key usage, policies, and, where applicable, revocation; it then maps the subject, SAN, fingerprint, or registered data to a technical identity. That mapping must be explicit and auditable."
  },
  {
    "kind": "paragraph",
    "text": "mTLS operations depend on a lifecycle: secure issuance, private-key storage, chain distribution, renewal before expiration, rotation without downtime, and revocation when a partner or workload is no longer trusted. Different clients should not indiscriminately share the same key. In service meshes and internal communication, workload identities and automation can reduce manual work, but they do not eliminate the need to define which CA is trusted for which purpose."
  },
  {
    "kind": "paragraph",
    "text": "mTLS does not replace OAuth, JWT, or resource authorization. The certificate primarily answers which system possesses the key and participates in the channel; a token can represent a user, consent, audience, and scopes. In combined architectures, the gateway first associates the certificate with an authorized client, then validates the token and enforces business policies. Binding a token to the certificate, when supported by the adopted profile, also reduces the value of a stolen token outside the authorized channel."
  },
  {
    "kind": "paragraph",
    "text": "TLS can terminate at multiple points. An external connection might end with a WAF or load balancer, followed by another TLS connection to the API Gateway. The API Gateway could create a third connection to the backend. Each segment has its own handshake, configuration, truststore, certificate, and risk profile. Simply stating 'the API uses HTTPS' is insufficient to understand the architecture."
  },
  {
    "kind": "subhead",
    "text": "Example of TLS hops"
  },
  {
    "kind": "code",
    "text": "Client --TLS 1--> Load Balancer --TLS 2--> API Gateway --TLS 3--> Backend\ncertificate public internal mTLS optional\nEach arrow represents a connection and potentially different validation."
  },
  {
    "kind": "subhead",
    "text": "Handshake diagnosis"
  },
  {
    "kind": "paragraph",
    "text": "Messages like certificate unknown, hostname mismatch, unknown CA, expired certificate, no shared cipher or protocol version point to different classes of failures. Capturing the error and identifying the hop are essential."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.13 Anatomy of an HTTP Message",
    "id": "http"
  },
  {
    "kind": "paragraph",
    "text": "HTTP follows a request-response model. The request contains methods, targets, headers (when applicable), and content. The response contains status codes, headers, and content. HTTP defines semantics: a method is not just a word, and a code is not just a number. Clients, caches, proxies, and gateways make decisions based on these meanings."
  },
  {
    "kind": "paragraph",
    "text": "The GET method requests a representation and is considered safe and idempotent in the protocol model. POST sends content for processing defined by the resource. PUT associates with creating or replacing state at the target and is idempotent. DELETE requests removal and also has idempotent semantics, though response and observable effects may vary. PATCH applies partial modifications according to the format used."
  },
  {
    "kind": "paragraph",
    "text": "Headers carry metadata. Host or :authority identifies the destination authority; Content-Type describes the type of content sent; Accept indicates accepted representations; Authorization carries application credentials; Cache-Control directs caching; traceparent can propagate tracing context. Gateways frequently validate, remove, add, or transform headers."
  },
  {
    "kind": "paragraph",
    "text": "Status codes 2xx indicate success; 3xx handle redirections; 4xx indicate that the request cannot be fulfilled under the presented conditions; 5xx indicate server-side or intermediary failures. The code should be interpreted with the body, headers, emitting component, and context. A 404 could mean an absent backend resource or unpublished gateway route."
  },
  {
    "kind": "paragraph",
    "text": "HTTP is stateless in the sense that each request must contain the necessary information for its interpretation. Applications can build sessions using cookies or tokens, but this occurs above the basic semantics of the protocol. Corporate APIs typically prefer explicit tokens and per-request context to facilitate distribution and scalability."
  },
  {
    "kind": "code",
    "text": "Simplified HTTP Request and Response\nGET /v1/clientes/123 HTTP/1.1\nHost: api.exemplo.com\nAccept: application/json\nAuthorization: Bearer <token>\nX-Correlation-ID: 7ad3c8c0\nHTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nX-Correlation-ID: 7ad3c8c0\n{\n    \"id\": 123,\n    \"nome\": \"Cliente de Exemplo\"\n}"
  },
  {
    "kind": "table",
    "caption": "Table 2 - Initial Interpretation of Common Status Codes in Gateways.",
    "headers": [
      "Code",
      "Initial Interpretation",
      "Possible origin in APIs"
    ],
    "rows": [
      [
        "200",
        "Operation completed",
        "Backend or synthesized response by the gateway"
      ],
      [
        "400",
        "Invalid request",
        "Schema, parameter, header, or syntax issue"
      ],
      [
        "401",
        "Unauthorized",
        "Token absent/invalid or certificate not associated"
      ],
      [
        "403",
        "Authorized without permission",
        "Scope, role, contract, or policy issue"
      ],
      [
        "404",
        "Resource or route not found",
        "Gateway, backend or incorrect version"
      ],
      [
        "429",
        "Rate limit exceeded",
        "Rate limit or quota"
      ],
      [
        "502",
        "Invalid upstream response",
        "Gateway-backend failure"
      ],
      [
        "503",
        "Service unavailable",
        "No healthy instances or capacity protection"
      ],
      [
        "504",
        "Upstream timeout",
        "Backend did not respond in time"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.14 REST and the Concept of Resource",
    "id": "rest"
  },
  {
    "kind": "paragraph",
    "text": "REST was defined by Roy Fielding as an architectural style for distributed hypermedia systems. An architectural style is a set of constraints that produce certain properties. REST combines client-server, stateless, caching, uniform interface, layered system, and optional demand-driven coding. The desired result includes scalability, visibility, and independent evolution of components."
  },
  {
    "kind": "paragraph",
    "text": "The central concept is the resource. A resource represents something that can be identified: a customer, an account, a payment, a contract, or a collection. Consumers interact with representations of the resource, such as JSON or XML. The URI identifies the resource; the method expresses the intent; headers and content complete the message. This separation avoids drawing the interface only as disguised procedure calls."
  },
  {
    "kind": "paragraph",
    "text": "Stateless means that the server should not depend on hidden session context between requests to interpret the next operation. Each request brings the necessary context. This facilitates distribution across instances and increases visibility, but can increase message size. Access tokens are an example of explicitly transported contextual information."
  },
  {
    "kind": "paragraph",
    "text": "The uniform interface limits variations and allows intermediaries to understand the communication. Correct method semantics and self-describing representations and hypermedia make up part of the model. Many commercial APIs adopt only a subset of these restrictions. It is useful to recognize the difference between REST as defined academically and the colloquial use of \"REST API\"."
  },
  {
    "kind": "paragraph",
    "text": "Layered system allows inserting proxies, caches, gateways, and balancers without requiring the consumer to know the entire topology. This constraint directly connects to the world of API Gateways: the client calls a public authority and does not need to know which microservice, cluster, or datacenter processes the operation."
  },
  {
    "kind": "subhead",
    "text": "Example of resource-oriented modeling"
  },
  {
    "kind": "code",
    "text": "GET /clientes/123 retrieve customer representation\nPUT /clientes/123 replace state according to contract\nPATCH /clientes/123 apply partial change\nDELETE /clientes/123 request removal\nGET /clientes/123/contas navigate sub-resources"
  },
  {
    "kind": "subhead",
    "text": "Be careful with verbs in the URI"
  },
  {
    "kind": "paragraph",
    "text": "Routes such as /consultarCliente or /deletarCliente make the interface resemble RPC. While not all uses are automatically incorrect, the design should be intentional and coherent with the chosen style."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.15 API Gateway and API Platform",
    "id": "gateway"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway is a specialized intermediary that receives consumer calls and forwards them to backend services. Along the way, it applies policies related to security, traffic, mediation, routing, and observability. This position allows for standardizing controls without duplicating all implementations in each service."
  },
  {
    "kind": "paragraph",
    "text": "The gateway should not be confused with the entire API Management platform. The platform may include management planes, catalogs, developer portals, analytics, product management, subscriptions, credentials, and lifecycle management. The gateway is the runtime or data plane component that processes traffic. Different products use their own names and separations, but the conceptual distinction is useful."
  },
  {
    "kind": "paragraph",
    "text": "Gateway security can include API key validation, JWTs, OAuth 2.0, mTLS, signature verification, allow lists, and protection against malformed content. Traffic control can include rate limiting, quotas, spike arrest, and circuit breaking. Mediation may transform headers, paths, and formats. Observability collects logs, metrics, and traces for operation and auditing."
  },
  {
    "kind": "paragraph",
    "text": "Centralization brings benefits and risks. Consistent policies increase governance, but the gateway can become a critical capacity and availability point. Excessively complex rules elevate latency and complicate maintenance. Deep business logic in the gateway creates coupling and reduces responsibility clarity. The design should maintain balance between cross-cutting controls and backend domain."
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway provides API management, delivery, and security features with policies and administration components. Azure API Management offers a managed platform with gateway, management plane, and portal. Despite product differences, the fundamentals of this chapter apply to both: listeners, certificates, DNS, upstreams, HTTP policies, identity, logs, and capacity."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-responsabilidades-en.svg",
    "alt": "Consumers, API Gateway responsibilities, and backend responsibilities",
    "caption": "Figure 3 - Typically cross-cutting responsibilities are concentrated in the API Gateway."
  },
  {
    "kind": "subhead",
    "text": "Responsibility Boundary"
  },
  {
    "kind": "paragraph",
    "text": "The gateway can validate that a token contains the appropriate scope, but the backend remains responsible for authorization rules tied to the data and domain, such as verifying whether the authenticated client may access that specific account."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.16 End-to-End Journey of an API Call",
    "id": "jornada"
  },
  {
    "kind": "paragraph",
    "text": "Consider a corporate application that sends GET https://api.exemplo.com/v1/clientes/123. Before sending the message, the client library interprets the URI, identifies the HTTPS scheme, host, default port 443, and path. It performs name resolution, possibly using caches from the process, operating system, and configured resolver."
  },
  {
    "kind": "paragraph",
    "text": "After obtaining an address, the client initiates a transport connection. In HTTP/1.1 or HTTP/2 over TCP, a three-way handshake occurs. Then, the TLS handshake begins. The client informs capabilities, version, and server name; the endpoint presents the certificate and negotiates keys. If validation fails, the operation terminates before an useful HTTP request exists for the gateway."
  },
  {
    "kind": "paragraph",
    "text": "With the channel established, the client sends method, path, headers, and body. A border component may receive the connection, apply application firewall rules, limit size, and forward the message. The API Gateway selects the published API based on host, path, method, and configuration. Policies can validate client certificate, token, scope, schema, and consumption limits."
  },
  {
    "kind": "paragraph",
    "text": "If the request is accepted, the gateway determines the backend, builds or reuses a connection, and sends an upstream message. The backend performs additional authentication or domain authorization, queries dependencies, and produces response. The gateway receives this response, may transform it, remove internal headers, record metrics, and return it to the consumer."
  },
  {
    "kind": "paragraph",
    "text": "Responses traverse independent connections. The backend does not necessarily know the original client address, nor does the client know the backend address. Controlled headers can propagate correlation IDs, technical identity, and origin information. Each hop must have clear contracts to avoid spoofing, loss of context, and exposure of internal details."
  },
  {
    "kind": "paragraph",
    "text": "In case of failure, the component detecting the problem may generate the response. A 401 can be produced by the gateway policy without calling the backend. A 502 can result from upstream connection failure. A 500 can come from the backend and only traverse through the gateway. Identifying the real sender is one of the key troubleshooting skills."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jornada-requisicao-api-en.svg",
    "alt": "Steps in a client HTTPS call to data",
    "caption": "Figure 4 - Main components along the end-to-end journey."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Detailed sequence"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The application constructs URI, headers, content, and its timeout settings.",
      "The host is resolved by DNS; the client chooses one of the returned addresses.",
      "Routing and network rules allow or prevent reaching the endpoint.",
      "TCP or QUIC connection is established.",
      "TLS negotiates parameters, validates certificates, and creates session keys.",
      "The border receives the request and may apply initial protection.",
      "The gateway identifies the API and executes ingress policies.",
      "Credentials are locally validated or with identity systems.",
      "The gateway selects the upstream and forwards the request.",
      "The backend executes business rules and accesses dependencies.",
      "The response returns to the gateway, which applies egress policies.",
      "Metrics, logs, and traces are recorded; the response returns to the client."
    ]
  },
  {
    "kind": "subhead",
    "text": "Operational Question"
  },
  {
    "kind": "paragraph",
    "text": "Which of these steps did the call stop at? This question is more useful than 'The API is down?' because it transforms a broad symptom into verifiable hypotheses."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.17 Layered Troubleshooting",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Efficient troubleshooting starts with evidence, not changes. Record timestamps in time zone, endpoint, consumer, method, correlation ID, code, duration, and full message. Compare calls that fail with those that work. Recent DNS changes, certificate updates, route adjustments, policy modifications, backend reboots, or credential refreshes help prioritize hypotheses but do not replace validation."
  },
  {
    "kind": "paragraph",
    "text": "Investigation can proceed from bottom to top. First, does the name resolve to the expected address? Second, is connectivity established to the port? Third, did TLS handshake complete and validate certificate? Fourth, does HTTP request reach API Gateway? Fifth, which policy or route is selected? Sixth, does upstream respond? Seventh, does business rule conclude? This order avoids analyzing payloads when connections do not exist."
  },
  {
    "kind": "paragraph",
    "text": "It's also necessary to observe chain timeouts. The consumer timeout should be consistent with the edge, gateway, and backend timeouts. If the gateway waits 60 seconds but the load balancer times out in 30, the effective limit is 30. Automatic retries can multiply load and transform latency into unavailability. Timeouts, retries, and circuit breakers need to be designed together."
  },
  {
    "kind": "paragraph",
    "text": "Logs should allow correlation between hops. A stable correlation ID facilitates transaction tracking while trace IDs and spans show dependencies and duration. Be cautious with sensitive data: tokens, private certificates, passwords, and personal payloads should not be indiscriminately logged. Observability requires balancing diagnosis, security, privacy, and cost."
  },
  {
    "kind": "paragraph",
    "text": "The gateway offers a privileged point of observation but does not see everything. If TLS handshake fails before the listener, there may be no policy log. If backend accepts connection internally, the gateway only observes timeouts. If client cancels request, backend can continue processing. Interpretation requires combining sources."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Initial troubleshooting matrix.",
    "headers": [
      "Layer/Stage",
      "Test or Evidence",
      "Common Failures"
    ],
    "rows": [
      [
        "DNS",
        "nslookup/dig, cache, expected record",
        "NXDOMAIN, old IP, split DNS"
      ],
      [
        "Network",
        "route, firewall, connection to port",
        "timeout, reset, connection refused"
      ],
      [
        "TLS",
        "openssl/curl -v, chain and name",
        "Unknown CA, expired, mismatch"
      ],
      [
        "HTTP",
        "method, path, headers, size",
        "400, 404, 405, 413"
      ],
      [
        "Gateway",
        "policy trace, selected API",
        "401, 403, 429, incorrect route"
      ],
      [
        "Upstream",
        "pool, health check, backend connection",
        "502, 503, 504"
      ],
      [
        "Application Layer",
        "logs, trace, database and dependencies",
        "500, sluggishness, business rule"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Best practice"
  },
  {
    "kind": "paragraph",
    "text": "Before restarting a component, preserve evidence. Restarts can alleviate symptoms and erase useful state for analysis in critical environments, follow incident management, change control, and communication procedures defined by the organization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1.18 Application in Corporate and Banking Environments",
    "id": "pratica"
  },
  {
    "kind": "paragraph",
    "text": "Financial institutions operate APIs with high confidentiality, integrity, availability, traceability, and segregation requirements. A call may traverse public internet, private networks, security zones, multiple gateways, identity providers, legacy systems, and cloud platforms. Each boundary adds controls and also operational complexity."
  },
  {
    "kind": "paragraph",
    "text": "mTLS is frequently used to authenticate technical participants and establish trust between organizations or internal layers. OAuth 2.0 and tokens can represent delegated authorization, scopes, and client context. The use of both together is not simple redundancy: mTLS protects and authenticates the technical channel/participant, while tokens may carry application authorization and consent as per the ecosystem."
  },
  {
    "kind": "paragraph",
    "text": "Corporate gateways apply common patterns to avoid each backend implementing validation of certificates, rate limiting, quotas, and logging differently. However, policies should be versioned, tested, and observed like software. A change in truststore, algorithm, timeout, or transformation can affect many APIs at once."
  },
  {
    "kind": "paragraph",
    "text": "Hybrid architectures may use an on-premises gateway and another in the cloud. A request may pass through Axway at the corporate edge and Azure APIM near services in Azure, or vice versa depending on the design. In these cases, it is essential to define which layer authenticates, authorizes, which headers can traverse, where TLS terminates, and how correlation IDs are preserved."
  },
  {
    "kind": "paragraph",
    "text": "API risk does not limit to external attacks. Incorrect configuration, incomplete inventory, excessive credentials, insecure dependencies, and third-party API consumption may expose data and operations. The OWASP API Security Top 10 and NIST SP 800-228 provide structures for studying vulnerabilities and controls in pre-runtime and runtime phases."
  },
  {
    "kind": "paragraph",
    "text": "Understanding layers also improves communication between teams. Instead of attributing a generic failure to the gateway, networks can confirm path and firewall; security can validate certificates and trust; identity can analyze tokens; platform can verify policies and upstream; application can investigate business rules. A common vocabulary reduces resolution time."
  },
  {
    "kind": "subhead",
    "text": "Simplified banking scenario"
  },
  {
    "kind": "paragraph",
    "text": "Partner presents mTLS certificate to the gateway. The gateway validates the chain, validity, and registered identity. It then validates the access token and its scopes. The backend also verifies authorization on the requested resource. Logs record the transaction without storing secrets."
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
      "APIs depend on a chain formed by DNS, network, transport, TLS, HTTP, gateway, and"
    ]
  },
  {
    "kind": "paragraph",
    "text": "backend."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Internet, Web, HTTP, API, and REST are related concepts but distinct entities.",
      "The IETF and RFC Editor define and publish many protocols; manufacturers document their"
    ]
  },
  {
    "kind": "paragraph",
    "text": "implementations."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Encapsulation separates responsibilities and allows layers to evolve"
    ]
  },
  {
    "kind": "paragraph",
    "text": "relatively independently."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "DNS associates names with resolution information; IP handles addressing and routing; TCP"
    ]
  },
  {
    "kind": "paragraph",
    "text": "provides a reliable byte stream; TLS protects the channel; HTTP defines application messages and semantics."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "An API Gateway is the data plane that applies policies and routes traffic; API Management"
    ]
  },
  {
    "kind": "paragraph",
    "text": "encompasses a broader lifecycle."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Client-to-gateway and gateway-to-backend connections are independent and may have different certificates,"
    ]
  },
  {
    "kind": "paragraph",
    "text": "timeouts, and failure modes."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Layered troubleshooting begins with evidence and identifies the exact stage where the"
    ]
  },
  {
    "kind": "paragraph",
    "text": "transaction stopped."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Review Questions",
    "id": "questoes"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explain why Internet and Web are not synonymous.",
      "What is the difference between an API and a REST API?",
      "Why does the manufacturer's documentation not replace an RFC?",
      "What occurs during encapsulation and decapsulation?",
      "How does the layer model aid in fault investigation?",
      "What is the difference between IP routing and API routing?",
      "How does DNS TTL influence migrations and failover?",
      "Why a refused connection and timeout suggest different hypotheses?",
      "What is the difference between the client-gateway and gateway-backend connections?",
      "What does TLS protect and what it doesn't solve alone?",
      "Why can mTLS and OAuth be used together?",
      "How to interpret an HTTP code produced by the gateway instead of the backend?",
      "Which responsibilities are appropriate for the gateway and which should remain in the backend?",
      "How do unaligned timeouts between components affect a call?",
      "Describe, in order, the complete HTTPS request lifecycle journey."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Case Studies",
    "id": "casos"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - Certificate swapped during migration"
  },
  {
    "kind": "paragraph",
    "text": "A team changes the CNAME of api.exemplo.com to a new load balancer. Some consumers access normally while others receive hostname or untrusted chain errors. DNS seems correct in tests conducted by the responsible team."
  },
  {
    "kind": "paragraph",
    "text": "Analyze possible causes considering DNS cache, split-horizon, SNI, certificate presented by the new endpoint, intermediate chain and different truststores. List evidence you would collect before reconfiguring DNS again."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Intermittent 504"
  },
  {
    "kind": "paragraph",
    "text": "An API exhibits intermittent 504 during peak hours. The backend logs some completed operations after 40 seconds, but the gateway has a timeout of 30 seconds. The client performs two automatic retries."
  },
  {
    "kind": "paragraph",
    "text": "Explain how timeouts and retries can increase load and produce duplicate operations. Propose a set of analyses involving latency, idempotence, gateway capacity, gateway limit, and consumer behavior."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Only 401 in One Environment"
  },
  {
    "kind": "paragraph",
    "text": "The same token works on the sandbox environment, but receives a 401 error in production. The format of the token seems correct and the API has the same path in both environments."
  },
  {
    "kind": "paragraph",
    "text": "Investigate possible differences in issuer, audience, signature key, clock skew, scope, policy, mTLS chain, and API product. Explain what data can be securely recorded to compare the two executions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Essential Glossary",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Term",
      "Definition within the context of the chapter"
    ],
    "rows": [
      [
        "API",
        "An interface that defines how software components may use capabilities provided by another component."
      ],
      [
        "API Gateway",
        "A specialized intermediary that receives, protects, mediates, and forwards API calls."
      ],
      [
        "Backend/Upstream",
        "The destination service to which the gateway forwards the request."
      ],
      [
        "DNS",
        "Distributed name system used for resolving names and other associated data."
      ],
      [
        "Encapsulation",
        "Process in which each layer adds control information to the data."
      ],
      [
        "Endpoint",
        "A point of communication identified by information such as scheme, host, port, and path."
      ],
      [
        "HTTP",
        "Application Protocol with a request/response model and standardized semantics."
      ],
      [
        "IP",
        "The protocol responsible for addressing and forwarding datagrams between networks."
      ],
      [
        "mTLS",
        "Transport Layer Security (TLS) with client certificate authentication, in addition to server authentication."
      ],
      [
        "Reverse proxy",
        "An intermediary that receives requests on behalf of internal servers."
      ],
      [
        "Representational State Transfer (REST)",
        "A style of architectural pattern for distributed hypermedia systems."
      ],
      [
        "RFC",
        "Published document in the Request for Comments series, which may register standards, practices, or informational material."
      ],
      [
        "Socket",
        "An abstraction used by applications to communicate over a network."
      ],
      [
        "TCP",
        "A protocol that provides reliable and ordered byte stream transmission."
      ],
      [
        "TLS",
        "A protocol that secures communications and establishes cryptographic trust."
      ],
      [
        "Uniform Resource Identifier (URI)",
        "Compact identifier for an abstract or physical resource."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended readings",
    "id": "referencias"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "IETF - About RFCs. https://www.ietf.org/process/rfcs/ - Overview of the role of RFCs and the IETF process.",
      "RFC Editor. https://www.rfc-editor.org/ - Research and status of RFCs.",
      "RFC 9293 - Transmission Control Protocol. https://www.rfc-editor.org/rfc/rfc9293 - Consolidated specification of TCP.",
      "RFC 8200 - IPv6 Specification. https://www.rfc-editor.org/rfc/rfc8200 - IPv6 specification.",
      "RFC 1034 - DNS Concepts and Facilities. https://www.rfc-editor.org/rfc/rfc1034 - Conceptual foundations of the DNS.",
      "RFC 1035 - DNS Implementation and Specification. https://www.rfc-editor.org/rfc/rfc1035 - Format and operation of the DNS.",
      "RFC 3986 - URI Generic Syntax. https://www.rfc-editor.org/rfc/rfc3986 - Generic syntax for URIs.",
      "RFC 9110 - HTTP Semantics. https://www.rfc-editor.org/rfc/rfc9110 - Modern semantics for HTTP.",
      "RFC 9112 - HTTP/1.1. https://www.rfc-editor.org/rfc/rfc9112 - HTTP/1.1 Messages and Connections.",
      "RFC 9113 - HTTP/2. https://www.rfc-editor.org/rfc/rfc9113 - HTTP/2 Specification.",
      "RFC 9114 - HTTP/3. https://www.rfc-editor.org/rfc/rfc9114 - HTTP/3 Specification.",
      "RFC 8446 - TLS 1.3. https://www.rfc-editor.org/rfc/rfc8446 - TLS 1.3 Specification.",
      "Roy Fielding - REST Architectural Style. https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm - Chapter of the dissertation describing REST.",
      "NIST SP 800-228. https://csrc.nist.gov/pubs/sp/800/228/final - Guidelines for API Security in Cloud-Native Systems.",
      "OWASP API Security Project. https://owasp.org/www-project-api-security/ - Risks and security materials for APIs.",
      "Microsoft - Azure API Management concepts. https://learn.microsoft.com/azure/api-management/api-management-key-concepts - Concepts and components of Azure API Management.",
      "Microsoft - API Management gateway overview. https://learn.microsoft.com/azure/api-management/api-management-gateways-overview - Role of the gateway in the data plane.",
      "Axway - Introduction to API Gateway. https://docs.axway.com/bundle/axway-open-docs/page/docs/api_mgmt_overview/api_mgmt_components/apigateway/index.html - Official Overview of Axway API Gateway."
    ]
  }
];
