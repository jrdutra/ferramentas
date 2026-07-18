import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const DNS_NAT_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter overview",
    "id": "chapter-overview"
  },
  {
    "kind": "paragraph",
    "text": "In previous chapters, we studied how an application produces a request, how TCP or UDP transport data between processes, and how IPv4 or IPv6 identify interfaces and allow routers to choose a path. This chapter adds the components that make an enterprise architecture usable at scale: DNS transforms stable names into mutable destinations; NAT translates network identities; proxies divide a communication into independent connections; and balancers select an instance from several possibilities."
  },
  {
    "kind": "paragraph",
    "text": "These mechanisms are often drawn in a single diagram as consecutive boxes, but they have different responsibilities. DNS normally participates before connection. NAT changes packet fields and maintains translation state. A proxy closes one connection and creates another, being able to interpret the application protocol. A balancer applies a selection strategy over a set of targets. The same product can perform several of these functions, which makes it essential to distinguish the concept from the implementation."
  },
  {
    "kind": "paragraph",
    "text": "In API Gateway environments, errors attributed to the application often arise before the policy is executed. A private registry may not be visible to the runtime; a DNS response may remain cached; a pool may consider an instance healthy by a cursory test; a proxy can replace the Host; a balancer can terminate TLS with a different certificate; or a SNAT may use an origin not predicted by the backend's allowlist. The final symptom could be timeout, 502, 503, certificate failure, or intermittent behavior."
  },
  {
    "kind": "paragraph",
    "text": "The goal of this chapter is to provide an end-to-end mental model. In the end, the reader should be able to locate where a decision was made, what data was changed and what evidence should be collected at each stage. The focus is not on memorizing products, but on understanding principles that apply to Axway API Gateway, Azure API Management, NGINX, HAProxy, Envoy, network appliances, ingress controllers and managed cloud services."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Name, address, connection, HTTP message and backend instance are different objects. A reliable diagnosis records the transformation between them at each jump."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Learning objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explain the DNS hierarchy, zones, delegations, and the roles of stub resolverr, recursive resolver, and authoritative server.",
      "Interpret queries, responses, codes, flags and the main types of resource records used in APIs.",
      "Relate TTL, positive cache, negative cache, and DNS changes to actual client behavior.",
      "Understand why DNS uses UDP and TCP, the role of EDNS(0), and the impact of selective blocking.",
      "Design public, private and split-horizon DNS for gateways, private endpoints and hybrid environments.",
      "Differentiate between DNSSEC, DoT, DoH and TSIG, including what each mechanism protects and what it does not.",
      "Deepen Basic NAT, NAPT/PAT, SNAT, DNAT, NAT hairpin, timeouts and port exhaustion.",
      "Distinguish forward proxy, reverse proxy, HTTP gateway and tunnel according to HTTP semantics.",
      "Compare TLS pass-through, offload, re-encryption and mTLS when there are intermediaries.",
      "Differentiate L4, L7 and DNS-based balancing, in addition to selection and affinity algorithms.",
      "Design health checks, readiness, draining, slow start and failover without producing false positives.",
      "Apply the concepts to Axway API Gateway and Azure services used in API architectures.",
      "Diagnose resolution failures, 502/503, unexpected origin, uneven distribution and SNAT exhaustion."
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
      "4.1 Four different decisions on the path to an API",
      "4.2 DNS architecture and hierarchy",
      "4.3 Zones, delegations and authority",
      "4.4 Recursive and iterative resolution",
      "4.5 DNS messages and resource records",
      "4.6 TTL, caching and propagation",
      "4.7 UDP, TCP, EDNS and encrypted DNS",
      "4.8 Private DNS, split-horizon and service discovery",
      "4.9 DNS-Based Availability and Balancing",
      "4.10 DNS Security and DNSSEC",
      "4.11 NAT in depth",
      "4.12 SNAT, DNAT, hairpin and CGNAT",
      "4.13 NAT on gateways and cloud",
      "4.14 HTTP Intermediaries",
      "4.15 Forward proxy, reverse proxy, gateway and tunnel",
      "4.16 Layer 4, Layer 7 and TLS termination",
      "4.17 Host, SNI, URL and forwarded headers",
      "4.18 Load balancing fundamentals",
      "4.19 Selection algorithms",
      "4.20 Health checks and life cycle",
      "4.21 Affinity, state and connection pooling",
      "4.22 Multi-layer architecture",
      "4.23 Application on Axway and Azure",
      "4.24 Troubleshooting",
      "4.25 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.1 Four different decisions on the path to an API",
    "id": "4-1-four-different-decisions-on-the-path-to-an-api"
  },
  {
    "kind": "paragraph",
    "text": "When an application calls https://api.empresa.com/clientes, the first decision is resolution: which address or service corresponds to the name api.empresa.com? This decision is made by the name resolution system, typically DNS, and may produce an IPv4, IPv6 address, an alias chain, or additional service information. The result may depend on the environment, the location of the resolver, the cache, and global traffic policies."
  },
  {
    "kind": "paragraph",
    "text": "The second decision is translation. When traversing a NAT, the addresses and eventually the ports of the flow are replaced. The destination may observe the IP of a firewall, cloud gateway, or SNAT pool, rather than the original IP of the application. This translation is a state-oriented network operation and is not equivalent to HTTP proxying, although both mechanisms can exist on the same equipment."
  },
  {
    "kind": "paragraph",
    "text": "The third decision is one of intermediation. A reverse proxy receives a connection from the client, interprets or forwards the message, and creates another connection to the upstream. From this point onwards there are two independent transport relationships: client-proxy and proxy-backend. Timeouts, HTTP versions, certificates, keep-alive and source addresses may be different for each leg."
  },
  {
    "kind": "paragraph",
    "text": "The fourth decision is instance selection. When there are multiple eligible destinations, a balancer chooses which one will receive the flow or request. The choice depends on the algorithm, weights, health status, affinity and locality policies. DNS, proxy and API Gateway can also do some kind of distribution, but the timing and granularity of choice are different."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Responsibilities that must be analyzed separately.",
    "headers": [
      "Mechanism",
      "Main entrance",
      "Decision or transformation",
      "Typical evidence"
    ],
    "rows": [
      [
        "DNS",
        "Name and type of record",
        "Returns resolution data",
        "dig, nslookup, Resolve-DnsName"
      ],
      [
        "NAT",
        "IP/port flow",
        "Translate origin or destination",
        "NAT table, capture, flow logs"
      ],
      [
        "proxy",
        "Connection and protocol",
        "Ends and recreates communication",
        "Access log, upstream log, headers"
      ],
      [
        "load balancer",
        "Eligible Pool",
        "Select destination",
        "Health, algorithm, backend metrics"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.2 DNS architecture and hierarchy",
    "id": "4-2-dns-architecture-and-hierarchy"
  },
  {
    "kind": "paragraph",
    "text": "The Domain Name System was designed as a distributed, hierarchical database. Instead of maintaining a central table containing all the names on the Internet, the name space is organized as an inverted tree. The top is the root, represented by a dot. Below it are top-level domains such as com, org, and br. Each branch can be delegated to different organizations, which then manage the corresponding areas."
  },
  {
    "kind": "paragraph",
    "text": "A fully qualified name, or FQDN, is made up of labels separated by periods. In api.pagamentos.empresa.com., api, payments, company and com are labels, and the period explains the root. Interfaces and tools often omit this endpoint, but the distinction between absolute name and relative name matters in zone files and in configurations that add search suffixes."
  },
  {
    "kind": "paragraph",
    "text": "The hierarchy provides administrative scalability. The organization responsible for com does not need to know the addresses of api.empresa.com; it needs to indicate which servers are authoritative by empresa.com. Similarly, the empresa.com zone can delegate pagamentos.empresa.com to another team. The resolution goes through these references until it reaches an authority capable of responding to the queried name."
  },
  {
    "kind": "paragraph",
    "text": "DNS is not just a name-IP list. It stores typed sets of data called resource record sets. A name can have A, AAAA, TXT, MX, CAA and other records. The correct answer depends on the name, class, and type requested. This model explains why a name can exist and still not have the type of registration requested."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-01-dns-hierarchy.svg",
    "alt": "DNS hierarchical tree with root, TLDs, zones and delegations",
    "caption": "Figure 1 - Authority is distributed across zones and delegations in the DNS tree."
  },
  {
    "kind": "subhead",
    "text": "Absolute name"
  },
  {
    "kind": "paragraph",
    "text": "In DNS settings, api.empresa.com and api.empresa.com. can be interpreted differently. The period indicates that the name is already complete and should not be suffixed by the current zone."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.3 Zones, delegations and authority",
    "id": "4-3-zones-delegations-and-authority"
  },
  {
    "kind": "paragraph",
    "text": "A DNS zone is the portion of the namespace administered as a unit. Zone and domain are not perfect synonyms: a domain can contain delegated subdomains that belong to other zones. The empresa.com zone, for example, can contain records for api.empresa.com and delegate partners.empresa.com. After delegation, internal partner records are kept on the servers designated for the new zone."
  },
  {
    "kind": "paragraph",
    "text": "The delegation is published by NS records on the parent side. Depending on the position of the nameservers themselves, additional records called glue may be necessary to avoid circular dependency. If empresa.com is served by ns1.empresa.com, the .com parent needs to provide the address of ns1.empresa.com along with the reference, otherwise the resolver would need to query the zone itself before knowing how to reach it."
  },
  {
    "kind": "paragraph",
    "text": "The SOA record describes administrative properties of the zone, such as primary server, contact, serial number, and timers related to transfer and negative cache. The serial is used by secondary servers to detect changes. High availability design typically publishes multiple authoritative servers to independent networks and locations, often using anycast to distribute queries."
  },
  {
    "kind": "paragraph",
    "text": "An authoritative response means that the server responds based on the zone for which it has authority, not just based on cache. The AA flag of the DNS message indicates this condition in appropriate responses. In troubleshooting, asking a recursive resolver and asking each authoritative server directly are different tests: the first reveals the customer's experience; the second helps identify divergence between servers and zone propagation."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Authority and delegation components.",
    "headers": [
      "Element",
      "Function",
      "Typical failure"
    ],
    "rows": [
      [
        "Zone",
        "DNS data administrative unit",
        "Record created in the wrong zone"
      ],
      [
        "NS Delegation",
        "Indicates authority of the child zone",
        "NS inconsistent or unavailable"
      ],
      [
        "Glue",
        "Provides address for nameserver within delegated zone",
        "Circular resolution dependency"
      ],
      [
        "serial SOA",
        "Versions the zone content",
        "Secondary does not detect update"
      ],
      [
        "Authoritative server",
        "Responds to area data",
        "Divergent responses between replicas"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.4 Recursive and iterative resolution",
    "id": "4-4-recursive-and-iterative-resolution"
  },
  {
    "kind": "paragraph",
    "text": "The application typically does not traverse the DNS hierarchy directly. It uses an operating system stub resolverr, which sends a query to the network-configured recursive resolver. The stub asks for a final response and usually activates the RD, recursion desired flag. The recursive resolver consults its cache and, when necessary, takes steps to obtain the response on behalf of the client."
  },
  {
    "kind": "paragraph",
    "text": "In iterative resolution, intermediate servers return the best information they have, usually a reference to servers in the next zone. The recursive resolver starts with a root server, receives reference to the TLD, queries the TLD, receives a referral to the authoritative server and then queries the final authoritative server. The result is cached according to the TTLs of the received RRsets."
  },
  {
    "kind": "paragraph",
    "text": "The exact path can be more complex because of CNAMEs, delegations, additional records, and DNSSEC validation. A CNAME instructs that the queried name is an alias of another name; the resolver needs to continue resolving until it gets the final type. Each link has its own TTL and can point to a zone administered by another organization or traffic provider."
  },
  {
    "kind": "paragraph",
    "text": "In corporate networks, recursive can act as a forwarder and forward queries to another resolver instead of traversing the public hierarchy. This chain is common in branch offices, VPNs, and cloud environments. It also creates dependencies: an incorrect conditional forwarding rule can cause private names to go out to the Internet or create loops between DNS servers."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-02-recursive-resolution.svg",
    "alt": "DNS resolution sequence between application, recursive resolver, root, TLD and authoritative server",
    "caption": "Figure 2 - Simplified example of recursive resolution with iterative queries."
  },
  {
    "kind": "subhead",
    "text": "Watch commands - only run in authorized environments"
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
    "text": "4.5 DNS messages and resource records",
    "id": "4-5-dns-messages-and-resource-records"
  },
  {
    "kind": "paragraph",
    "text": "The DNS message has a header and four logical sections: Question, Answer, Authority and Additional. The header includes identifier, flags and record counters. Among the relevant flags are QR, which distinguishes query and response; RD and RA, related to recursion; AA, which indicates authoritative response; TC, which signals truncation; and the response code, such as NOERROR, NXDOMAIN, or SERVFAIL."
  },
  {
    "kind": "paragraph",
    "text": "The data is transported as resource records. An RR contains name, type, class, TTL and specific data. Records with the same name, type and class form an RRset and must be treated as a set. This idea is important in DNSSEC and multiple A or AAAA records: the order presented should not be confused with selection or affinity guarantees."
  },
  {
    "kind": "paragraph",
    "text": "A and AAAA associate names with IPv4 and IPv6 addresses. CNAME creates alias for another name and has co-existence restrictions with other data on the same node. NS reports authoritative servers. SOA describes the zone. PTR is used in reverse resolution. MX directs mail. TXT transports text structured by different protocols. SRV allows you to discover the host and port of a service, while CAA informs which certificate authorities can issue certificates for the domain."
  },
  {
    "kind": "paragraph",
    "text": "Modern APIs can also find SVCB and HTTPS records, which allow you to advertise a service's properties, alternatives, and connection parameters. Support is customer and platform dependent; therefore, these records do not automatically replace A, AAAA, or reverse proxies configuration. The architect must separate the existence of the pattern from the capability actually deployed in the environment."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Frequent resource records in corporate environments.",
    "headers": [
      "Type",
      "Main data",
      "Use in API architecture"
    ],
    "rows": [
      [
        "A",
        "IPv4 address",
        "Public or private endpoint"
      ],
      [
        "YYYY",
        "IPv6 address",
        "Dual stack and IPv6 access"
      ],
      [
        "CNAME",
        "Canonical name",
        "Alias for front door, CDN or managed service"
      ],
      [
        "NS",
        "Name server",
        "Zone delegation"
      ],
      [
        "SOA",
        "Zone metadata",
        "Serial and administrative parameters"
      ],
      [
        "PTR",
        "Name associated with IP",
        "Reverse resolution and audit"
      ],
      [
        "SRV",
        "Priority, weight, port and target",
        "Service discovery on supported protocols"
      ],
      [
        "CAA",
        "Authorized CA",
        "Certificate issuance governance"
      ],
      [
        "TXT",
        "Arbitrary text",
        "Domain checks and policies"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Didactic zone file with documentation blocks"
  },
  {
    "kind": "code",
    "text": "; Educational zone example\n$ORIGIN empresa.com.\n$TTL 300\n@       IN SOA ns1.empresa.com. dnsadmin.empresa.com. (\n            2026071501  ; serial\n            3600        ; refresh\n            600         ; retry\n            1209600     ; expire\n            300 )       ; negative cache\n        IN NS  ns1.empresa.com.\n        IN NS  ns2.empresa.com.\napi     IN A   198.51.100.25\napi     IN AAAA 2001:db8:20::25\nstatus  IN CNAME api.empresa.com."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.6 TTL, caching and the meaning of propagation",
    "id": "4-6-ttl-caching-and-the-meaning-of-propagation"
  },
  {
    "kind": "paragraph",
    "text": "The TTL of a resource record tells how long the data can remain in cache. When a resolver receives an RRset with TTL 300, it can reuse it for five minutes without consulting the authority again. The value decrements in the cache and the entry expires when it reaches zero. Authoritative does not send notifications to all caches when the record changes; therefore, different clients may observe old responses until their entries expire."
  },
  {
    "kind": "paragraph",
    "text": "The expression DNS propagation is used informally, but it can hide different phenomena: zone transfer between authoritative servers, updating of a provider's servers, expiration of recursive caches, operating system cache, application cache and even connection pooling for the old address. Changing the record in the panel and confirming the new value on the authoritative server does not guarantee that an application with a cache or persistent connection will use it immediately."
  },
  {
    "kind": "paragraph",
    "text": "Low TTL reduces the potential period of stale data and is useful before migrations, but increases queries, DNS dependency, and operational burden. Furthermore, some components apply minimum, maximum values ​​or their own refresh strategies. For a planned change, the TTL must be trimmed early enough for the previous value to expire in the caches before trimming."
  },
  {
    "kind": "paragraph",
    "text": "The negative cache stores knowledge that a name does not exist, represented by NXDOMAIN, or that the name exists but does not have the requested type, often called NODATA. This optimization reduces repeat queries, but surprises teams that create a record right after a negative response. Negative cache time is derived from zone information as per current DNS rules."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-03-ttl-cache.svg",
    "alt": "TTL Timeline with Positive Cache, Negative Cache, Expiration, and Resolve",
    "caption": "Figure 3 - The cache remains valid until the TTL expires, including for negative responses."
  },
  {
    "kind": "subhead",
    "text": "Secure endpoint change"
  },
  {
    "kind": "paragraph",
    "text": "Before switching an address, lower the TTL, wait for the old TTL to expire, validate the new target, perform trimming, and keep the old target available during the transition window when possible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.7 UDP, TCP, EDNS and encrypted DNS",
    "id": "4-7-udp-tcp-edns-and-encrypted-dns"
  },
  {
    "kind": "paragraph",
    "text": "Classic DNS queries use port 53 over both UDP and TCP. UDP has a lower cost as it does not establish a connection and responds to most queries. However, DNS over TCP is not just a zone transfer mechanism: implementations need to support it for large, truncated responses and modern scenarios. A firewall that allows UDP/53 and blocks TCP/53 can create selective failures that are difficult to reproduce."
  },
  {
    "kind": "paragraph",
    "text": "In the original format, a UDP DNS message had a small practical limit. EDNS(0) adds an OPT pseudo-record by which the requester advertises resources and the UDP payload size it can receive. Exaggerated values ​​can cause IP fragmentation; Appropriate values ​​seek to balance efficiency and reliability. When the response does not fit, the server can set the TC flag and the client tries again via TCP."
  },
  {
    "kind": "paragraph",
    "text": "DNS over TLS, normally associated with port 853, and DNS over HTTPS, carried over HTTPS, protect the channel between client and resolver against observation or alteration in the path. They do not make the resolver a trusted authority by themselves, and they do not provide cryptographic authentication of zone data like DNSSEC. The organization needs to evaluate privacy, governance, filtering, and observability when enabling external resolvers or embedded DoH in applications."
  },
  {
    "kind": "paragraph",
    "text": "In corporate networks, intercepting or blocking DoH without a strategy can break applications, while releasing it indiscriminately can bypass private DNS, logging and security policies. The architectural goal should be to provide enterprise resolvers that are reliable, redundant, and compatible with the required mechanisms, while also explicitly controlling which alternative channels are allowed."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-04-dns-transports.svg",
    "alt": "Comparison of DNS UDP, TCP, EDNS, DNS over TLS and DNS over HTTPS transports",
    "caption": "Figure 4 - DNS has multiple transports; each one solves a different problem."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Failures related to DNS transport.",
    "headers": [
      "Symptom",
      "Possible cause",
      "Test"
    ],
    "rows": [
      [
        "Simple queries work, DNSSEC fails",
        "EDNS or filtered large responses",
        "dig +dnssec and capture"
      ],
      [
        "UDP works, big response fails",
        "TCP/53 blocked after TC=1",
        "dig +tcp"
      ],
      [
        "Application bypasses private DNS",
        "Own DoH or external resolve",
        "Check application DNS destination"
      ],
      [
        "Timeout only in one branch",
        "Fragmentation/MTU or DNS firewall",
        "Compare EDNS payload and path"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.8 Private DNS, split-horizon and service discovery",
    "id": "4-8-private-dns-split-horizon-and-service-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Private DNS publishes names that only certain environments should resolve to, such as corporate networks, VNets, clusters, and data centers. Access depends on which resolvers and zones are visible to the source. A private endpoint without proper DNS integration can exist and still be unusable: the application will continue to resolve the name to the public endpoint or receive NXDOMAIN."
  },
  {
    "kind": "paragraph",
    "text": "In split-horizon, the same name returns different answers depending on the resolution path. An external client can receive the public WAF address, while the internal gateway receives the private address from the backend. This technique preserves consistent names, certificates, and URLs, but requires discipline to avoid silent divergences between public and private zones."
  },
  {
    "kind": "paragraph",
    "text": "Conditional forwarding directs queries for certain suffixes to specific resolvers. In a hybrid environment, the VNet can forward corp.empresa to the datacenter, while the datacenter forwards privatelink or cloud zones to the corresponding resolver. Poorly designed symmetric rules can create loops, and missing rules can leak internal names to public resolvers."
  },
  {
    "kind": "paragraph",
    "text": "Service discovery in Kubernetes and service meshes also uses names and registries, but the lifecycles are more dynamic. A service can resolve to a virtual ClusterIP, a list of pods, or a proxy endpoint. The short TTL and the client's caching behavior become decisive. Libraries that resolve once at startup don't track changes, while proxies like Envoy can consume discovery APIs and have explicit view of endpoints."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-05-split-horizon.svg",
    "alt": "Split-horizon DNS targeting the same name for public and private endpoints",
    "caption": "Figure 5 - The same FQDN can direct public and private clients to different endpoints."
  },
  {
    "kind": "subhead",
    "text": "Private endpoint is not DNS"
  },
  {
    "kind": "paragraph",
    "text": "The endpoint provides private connectivity. The application still needs to resolve the name to the private address, have a route, and pass network and TLS policies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.9 DNS-Based Availability and Balancing",
    "id": "4-9-dns-based-availability-and-balancing"
  },
  {
    "kind": "paragraph",
    "text": "DNS can return multiple addresses or choose responses based on priority, weight, location, performance, and health policies. This technique is used for global distribution and cross-region failover. The decision occurs in the resolution; after that, the client connects directly to the returned endpoint. Therefore, the DNS service does not necessarily observe the connection or application request."
  },
  {
    "kind": "paragraph",
    "text": "The behavior depends on the recursive resolver. Geographic policies can see the address of the resolver, which may be far from the real user. The TTL controls how long the decision remains in cache. During a failure, clients with an old response may continue to try the unavailable endpoint until the cache expires or the application implements its own fallback."
  },
  {
    "kind": "paragraph",
    "text": "Multiple A or AAAA records alone do not constitute a health checking balancer. The order may vary and customers can only choose the first address. Removing a record does not terminate existing connections and does not remove the entry from all caches immediately. DNS-based load balancing must be combined with resilient endpoints and cache window-compatible monitoring."
  },
  {
    "kind": "paragraph",
    "text": "Anycast is another technique used by DNS infrastructure and global services. The same address is advertised in multiple locations and Internet routing takes the client to a nearby instance according to the BGP topology. Anycast is not DNS round robin: the response can contain a single IP, while distribution occurs at the routing layer."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Different forms of global distribution.",
    "headers": [
      "Strategy",
      "Moment of decision",
      "Advantage",
      "Limitation"
    ],
    "rows": [
      [
        "A/YYY Multiples",
        "On the client/resolver",
        "Simplicity",
        "Health and choice vary by client"
      ],
      [
        "GSLB by DNS",
        "During resolution",
        "Global distribution and failover",
        "TTL and resolver view"
      ],
      [
        "Anycast",
        "IP Routing",
        "Global endpoint with proximity",
        "Depends on ads and convergence"
      ],
      [
        "global reverse proxy",
        "With each connection/request",
        "L7, WAF and TLS control",
        "Traffic passes through the service"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.10 DNS Security and DNSSEC",
    "id": "4-10-dns-security-and-dnssec"
  },
  {
    "kind": "paragraph",
    "text": "Classic DNS was created in an environment with different trust assumptions than today. Attacks can exploit forged responses, cache poisoning, compromised servers, hijacking of resolver configuration, and altered administrative records. Random identifiers, unpredictable source ports, and additional validations increase resilience, but do not provide complete cryptographic proof of data origin."
  },
  {
    "kind": "paragraph",
    "text": "DNSSEC adds origin authentication and integrity to DNS data through signatures over RRsets and a chain of trust based on DS and DNSKEY records. A validating resolver can distinguish valid signed data, demonstrably non-existent responses, and validation failures. DNSSEC does not provide confidentiality: observers can still see names and responses in traditional DNS."
  },
  {
    "kind": "paragraph",
    "text": "Validation depends on timing, keys, signatures, and correct publishing. A poorly executed rotation or expired signature can turn an existing zone into SERVFAIL for validator clients. Therefore, DNSSEC requires specific monitoring, time synchronization and rollover procedures. The benefit is to reduce the possibility of an intermediary presenting doctored data as if it were authoritative."
  },
  {
    "kind": "paragraph",
    "text": "DNS over TLS and DNS over HTTPS protect transport to the resolver, while DNSSEC protects the authenticity of data between the signed zone and the validator. TSIG, in turn, authenticates transactions between participants who share a key, such as transfers and dynamic updates. These mechanisms are complementary and should not be treated as substitutes."
  },
  {
    "kind": "subhead",
    "text": "DNS rebinding"
  },
  {
    "kind": "paragraph",
    "text": "Applications that trust only the name received from the user may resolve initially to a public IP and then to an internal address. SSRF controls must validate effective destinations, ranges, redirects, and new resolutions, not just the hostname string."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.11 NAT in depth",
    "id": "4-11-nat-in-depth"
  },
  {
    "kind": "paragraph",
    "text": "Network Address Translation modifies addresses in IP packets as they traverse an edge device. In Basic NAT, an address from a domain is mapped to another address. In NAPT or PAT, the translation includes transport identifiers, allowing multiple internal connections to share an external address through different ports. The device maintains state to reverse the translation in return traffic."
  },
  {
    "kind": "paragraph",
    "text": "A translation changes fields covered by checksums. NAT needs to adjust the IP and transport checksums according to the protocol. Protocols that carry addresses or ports within the payload may require application-level gateways or fail because header translation does not automatically update internal data. Cryptography that protects these fields also limits the ability for transparent translation."
  },
  {
    "kind": "paragraph",
    "text": "NAT is not a firewall, although it is often on the same equipment. The fact that an incoming connection has no mapping does not replace explicit filtering policy. Port forwarding and DNAT can publish internal services; connections initiated from within create state; Firewall rules determine what should be allowed. Security should be modeled as policy, not as a side effect of addressing."
  },
  {
    "kind": "paragraph",
    "text": "The presence of NAT breaks end-to-end address transparency. Backend logs show the translated identity, and protocols that depend on the client IP need another mechanism. In HTTP, controlled proxies can insert Forwarded or X-Forwarded-For, but these headers are application metadata and can be spoofed if the edge does not remove values ​​sent by the consumer."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-06-pat-state.svg",
    "alt": "PAT state table translating internal flows to distinct public ports",
    "caption": "Figure 6 - PAT allows internal flows to share an external address through different ports."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.12 SNAT, DNAT, hairpin NAT and CGNAT",
    "id": "4-12-snat-dnat-hairpin-nat-and-cgnat"
  },
  {
    "kind": "paragraph",
    "text": "Source NAT changes the origin of the flow and is common when egress to the Internet or a partner network. Destination NAT changes the destination and is used to publish an internal service behind a virtual address. A connection can traverse both: the client reaches a VIP that is DNAT to the server, and the return can be SNAT to ensure symmetry and hide the internal topology."
  },
  {
    "kind": "paragraph",
    "text": "Hairpin NAT, also called NAT loopback, occurs when an internal client accesses the external address of a service that is also on the internal network. The device needs to translate and guide the flow back inside. Without support or correct configuration, the client can resolve the public name, send it to the firewall and receive a direct response from the server, breaking the expected state. Split DNS is often used to avoid this path."
  },
  {
    "kind": "paragraph",
    "text": "Carrier-Grade NAT allows providers to share IPv4 addresses between subscribers. In B2B architectures, this reduces the usefulness of identifying a consumer by public IP alone. Multiple customers can share the same address and the pool can change. Allowlist by IP may continue to be a connectivity requirement, but it should not be the only authentication of a sensitive API."
  },
  {
    "kind": "paragraph",
    "text": "Double NAT occurs when the flow traverses successive translations, for example, local NAT, CGNAT, and cloud NAT. Each state has its own timeouts and port limits. Troubleshooting needs to record the observed origin at each boundary; assuming the station IP will reach the backend produces incorrect rules and audits."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Translation modalities and their impacts.",
    "headers": [
      "Type",
      "Field changed",
      "Frequent use",
      "Operational risk"
    ],
    "rows": [
      [
        "SNAT",
        "Origin",
        "Gateway/API output to backend",
        "Port exhaustion and allowlist"
      ],
      [
        "DNAT",
        "Destiny",
        "VIP or service publication",
        "Asymmetric return"
      ],
      [
        "PAT/NAPT",
        "IP and port",
        "Share external address",
        "Status and timeout"
      ],
      [
        "Hairpin",
        "Internal return translation",
        "Internal access to external address",
        "Asymmetric flow"
      ],
      [
        "CGNAT",
        "Origin at the provider",
        "Share IPv4 between subscribers",
        "IP does not identify client"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.13 NAT in API Gateways and Cloud Environments",
    "id": "4-13-nat-in-api-gateways-and-cloud-environments"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway creates outbound connections to backends. Depending on the network mode, these connections may go out through the instance's own addresses, through a NAT Gateway, firewall, appliance or set of managed IPs. The backend looks at this translated source and needs to allow all possible addresses. Scaling, tier change or maintenance may change the distribution between sources documented by the platform."
  },
  {
    "kind": "paragraph",
    "text": "SNAT exhaustion occurs when too many competing connections or short connections consume the available ports for a source and destination combination. The problem is aggravated when connection pooling is disabled, timeouts maintain states for a long time or a single outgoing IP serves a large volume. Symptoms include intermittent connection failure, connect timeout, and spontaneous recovery after states expire."
  },
  {
    "kind": "paragraph",
    "text": "The solution is not just to add retries. Aggressive retries can consume even more ports. The design must reuse connections, size addresses and output ports, distribute destinations, adjust timeouts with discretion and monitor usage. When the platform offers private integration without SNAT or NAT Gateway with multiple IPs, the choice must consider source capacity and predictability."
  },
  {
    "kind": "paragraph",
    "text": "Inbound private endpoint and outbound private connectivity are different directions. A private endpoint for the gateway allows consumers to reach it privately; does not guarantee that the gateway accesses backends via private network. Each leg requires its own DNS, route, firewall, identity, and TLS."
  },
  {
    "kind": "subhead",
    "text": "SNAT Diagnosis"
  },
  {
    "kind": "paragraph",
    "text": "Collect number of new connections per second, established connections, TIME_WAIT, destinations, outgoing IPs, connect errors and platform metrics. A 502 on the gateway may be a consequence of a lack of socket/port before any response from the backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.14 HTTP Intermediaries",
    "id": "4-14-http-intermediaries"
  },
  {
    "kind": "paragraph",
    "text": "HTTP allows a chain of intermediaries. RFC 9110 distinguishes common forms such as proxy, gateway and tunnel. In practice, product vocabulary varies, but the technical question is stable: does the component interpret HTTP messages and create a new connection, or does it just forward bytes after establishing a tunnel? The answer determines which policies, logs, and transformations are possible."
  },
  {
    "kind": "paragraph",
    "text": "When a broker finishes HTTP, it receives a complete message or protocol stream, applies rules, and sends another message to the next hop. It can change Host, path, query, headers, encoding and HTTP version. The backend does not directly observe the consumer socket; observes the connection created by the intermediary. This separation explains why the IP, TLS certificate, and latency measured on the backend represent the proxy."
  },
  {
    "kind": "paragraph",
    "text": "Intermediaries improve security and governance by centralizing authentication, WAF, rate limiting, routing, and observability. At the same time, they add queues, timeouts, buffers, payload limits and points of failure. Each layer must have a clear purpose. Stacking CDN, WAF, Application Gateway, API Gateway, ingress and sidecar without defining responsibilities produces TLS duplicity, retries and contradictory rules."
  },
  {
    "kind": "paragraph",
    "text": "A proxy also modifies failure semantics. If it cannot connect to the upstream, it may return 502. If the pool is unavailable, it may return 503. If the upstream exceeds timeout, it may return 504. The code received by the client may have been created by the intermediary and not by the application. Logs correlated by request ID are essential to locate the sender."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.15 Forward proxy, reverse proxy, gateway and tunnel",
    "id": "4-15-forward-proxy-reverse-proxy-gateway-and-tunnel"
  },
  {
    "kind": "paragraph",
    "text": "The forward proxy represents clients. It is configured in the system or application and receives a destination URI. Companies use it for output control, filtering, inspection and authentication. For HTTPS, the client can use the CONNECT method to request a TCP tunnel to the destination; in this case the proxy knows the host and port, but does not necessarily interpret the encrypted HTTP. In enterprise TLS inspection, the proxy terminates TLS and issues a certificate accepted by the CA installed on the client."
  },
  {
    "kind": "paragraph",
    "text": "The reverse proxy represents servers. The client believes it is connecting to the end service, but the connection ends at the proxy, which chooses an upstream. NGINX, HAProxy, Envoy, Application Gateway, Front Door and API Gateways can act like this. The reverse proxy controls certificates, virtual hosts, path routing, compression, caching and protection, as long as the application layer is visible."
  },
  {
    "kind": "paragraph",
    "text": "The term gateway in HTTP describes an intermediary that acts as the source for the incoming connection and translates or connects to another service. An API Gateway extends this idea with security policies, quotas, transformation and API lifecycle. It can receive REST/JSON and call SOAP, JMS or other HTTP, hiding the implementation. The term should not be confused with IP routing default gateway."
  },
  {
    "kind": "paragraph",
    "text": "A tunnel forwards bytes without interpreting the protocol after its creation. TLS pass-through on an L4 balancer comes close to this model: the TLS handshake occurs with the backend. The advantage is to preserve end-to-end authentication and encryption; the limitation is that the intermediary cannot apply rules based on method, path, JWT or HTTP content."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-07-http-intermediaries.svg",
    "alt": "Comparison between forward proxy, reverse proxy, gateway and HTTP tunnel",
    "caption": "Figure 7 - Intermediaries differ by the entity represented and the level of interpretation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.16 Layer 4, Layer 7 and TLS termination",
    "id": "4-16-layer-4-layer-7-and-tls-termination"
  },
  {
    "kind": "paragraph",
    "text": "A Layer 4 balancer or proxy decides based on transport information such as address, port, and flow state. It can forward TCP or UDP without understanding the application. This approach supports varying protocols and reduces coupling to HTTP. When TLS remains intact, the certificate and negotiation belong to the backend, and the intermediary cannot inspect paths or headers."
  },
  {
    "kind": "paragraph",
    "text": "At layer 7, the component understands the application protocol. In HTTP, you can route by Host, URL, method, cookie or header; apply WAF; rewrite messages; and generate responses. For this, in HTTPS normally ends TLS. The backend connection can be HTTP, HTTPS or mTLS, forming a second session with independent parameters and trust."
  },
  {
    "kind": "paragraph",
    "text": "TLS offload removes encryption on the inside and simplifies the backend, but leaves clear text data on the network after the proxy. Re-encryption maintains TLS in both sections, but it is not end-to-end TLS: the proxy has access to the content and presents its own identity to the backend. Certificates, SNI, versions and cipher suites need to be configured on both sides."
  },
  {
    "kind": "paragraph",
    "text": "When the client uses mTLS with the proxy, the client certificate is not automatically presented to the backend. The proxy can authenticate the client and propagate attributes via headers or tokens, as long as the backend trusts this proxy exclusively and the connection is secured. RFC 9440 documents standardized headers for carrying certificate information in TLS-terminated reverse proxy scenarios, but the trust model must be explicitly secured."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-08-tls-modes.svg",
    "alt": "Comparison between TLS pass-through, offload, re-encryption and mTLS at the edge",
    "caption": "Figure 8 - Each TLS mode defines different trust boundaries."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-09-l4-l7.svg",
    "alt": "Comparison between layer 4 and layer 7 balancing",
    "caption": "Figure 9 - Layer 4 distributes flows; Layer 7 can make decisions over HTTP."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.17 Host, SNI, URL and forwarded headers",
    "id": "4-17-host-sni-url-and-forwarded-headers"
  },
  {
    "kind": "paragraph",
    "text": "Virtual hosting allows multiple services to share one address. Before sending HTTP over TLS, the client can include SNI in the ClientHello to indicate the desired hostname, allowing the TLS terminator to select certificate and configuration. After the handshake, HTTP contains the authority of the request, typically reflected in the Host in HTTP/1.1 or in the :authority pseudo-header in HTTP/2."
  },
  {
    "kind": "paragraph",
    "text": "SNI and Host belong to different layers and can diverge due to error or attack. The balancer can select certificate by SNI and route by Host. Configurations must validate allowed combinations to avoid improper forwarding. When the proxy calls the backend by a different hostname, it needs to decide whether to preserve the original host or use the upstream name. This choice affects virtual hosts, redirects, cookies, and certificate validation."
  },
  {
    "kind": "paragraph",
    "text": "Reverse proxies insert metadata such as X-Forwarded-For, X-Forwarded-Proto, and X-Forwarded-Host. RFC 7239 defines the Forwarded header as a standardized way of transporting information lost in proxying. However, any client can send headers with these names. The trusted edge must remove or reconstruct received values, and the backend must trust only known hops."
  },
  {
    "kind": "paragraph",
    "text": "The original IP can also be preserved at layer 4 by mechanisms such as PROXY protocol, when supported. This changes the expected protocol in the first bytes of the connection and needs to be enabled consistently on both sides. Sending PROXY protocol to a listener that expects TLS or HTTP results in immediate failures and invalid protocol messages."
  },
  {
    "kind": "subhead",
    "text": "Teaching example of metadata added by a trusted edge"
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
    "text": "Never blindly trust X-Forwarded-For"
  },
  {
    "kind": "paragraph",
    "text": "Define the list of trusted proxies and calculate the client from the known chain. Otherwise, the consumer can enter an arbitrary IP and influence auditing, rate limiting or authorization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.18 Load balancing fundamentals",
    "id": "4-18-load-balancing-fundamentals"
  },
  {
    "kind": "paragraph",
    "text": "Load balancing distributes work among multiple targets to utilize capacity, tolerate failures, and allow for scale. It doesn't magically speed up a single operation: a specific request is still processed by one instance. The gain arises from concurrent execution and removing endpoints that are unable to serve new requests."
  },
  {
    "kind": "paragraph",
    "text": "The set of destinations is called a pool, upstream cluster or backend set, depending on the product. Before applying an algorithm, the balancer determines which endpoints are eligible by configuration, priority, location, and health. The algorithm selects between these candidates. Therefore, an unexpected distribution could be caused not by the round robin, but by half the pool being marked as unhealthy."
  },
  {
    "kind": "paragraph",
    "text": "Balancing can occur per connection or per request. In TCP L4, a decision is usually made when the flow is created and remains until termination. In HTTP/1.1, the proxy can reuse backend connections and select per request. In HTTP/2, several requests are multiplexed into a few connections, which can change the relationship between number of connections and actual load."
  },
  {
    "kind": "paragraph",
    "text": "The scope can be local or global. A regional balancer distributes between nearby instances. A global system selects region by DNS, anycast, or edge reverse proxy. Robust architectures often combine the two layers: a global decision chooses the region and a local balancer chooses the instance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.19 Backend selection algorithms",
    "id": "4-19-backend-selection-algorithms"
  },
  {
    "kind": "paragraph",
    "text": "Round robin distributes selections in sequence and works well when servers have similar capabilities and the cost of requests is relatively homogeneous. Weighted round robin assigns different proportions, allowing a larger instance to receive more traffic or a new version to be introduced gradually. Weights do not guarantee exact percentages in small windows."
  },
  {
    "kind": "paragraph",
    "text": "Least connections chooses the destination with the fewest active connections. It is useful when connections have variable durations, but the count may not represent actual work in HTTP/2, or when a connection contains many operations. Least request and least response time seek to approximate observed load or latency, but need to avoid oscillations and decisions based on noisy metrics."
  },
  {
    "kind": "paragraph",
    "text": "Hash selects the destination based on a key, such as IP, cookie, header or identifier. It provides deterministic affinity while the set remains stable. When endpoints enter or leave, a simple hash can remap most of the keys. Consistent hashing and algorithms such as ring hash or Maglev seek to reduce remapping, being useful for caches and localized data."
  },
  {
    "kind": "paragraph",
    "text": "Power of two choices selects two random candidates and chooses the least loaded, obtaining a good distribution with less cost than examining the entire pool. Modern products also combine priority, locality, dynamic weights, outlier detection and circuit breaking. The choice must be validated with the real traffic pattern, not just an abstract definition."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-10-load-balancing-algorithms.svg",
    "alt": "Comparison between backend selection algorithms",
    "caption": "Figure 10 - Different algorithms optimize different load patterns."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Criteria for choosing the algorithm.",
    "headers": [
      "Algorithm",
      "Signal used",
      "Indicated when",
      "Caution"
    ],
    "rows": [
      [
        "Round robin",
        "Sequence",
        "Similar instances and requests",
        "Ignore current load"
      ],
      [
        "Weighted RR",
        "Static/dynamic weight",
        "Different capabilities",
        "Incorrect weights concentrate load"
      ],
      [
        "Least connections",
        "Active connections",
        "Variable duration sessions",
        "HTTP/2 distorts the metric"
      ],
      [
        "Least response time",
        "Latency and activity",
        "Variable performance",
        "May oscillate"
      ],
      [
        "Hash",
        "Request key",
        "Affinity and local cache",
        "Remapping and hotspots"
      ],
      [
        "Consistent hash",
        "Stable ring/table",
        "Reduce affinity churn",
        "More complexity"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.20 Health checks, readiness, draining and failover",
    "id": "4-20-health-checks-readiness-drainage-and-failover"
  },
  {
    "kind": "paragraph",
    "text": "Health checks determine whether an endpoint should receive traffic. A TCP check confirms that the port accepts connection, but does not prove that the application can query the database, validate tokens or respond to a critical operation. An HTTP check can verify a path, status and content. The health endpoint must reflect readiness for the traffic that will be sent, without causing excessive load or depending on irrelevant components."
  },
  {
    "kind": "paragraph",
    "text": "Liveness and readiness answer different questions. Liveness indicates whether the process should be restarted. Readiness indicates whether it is ready to receive new requests. Mixing the two can create loops: a temporarily unavailable dependency makes liveness false, the orchestrator restarts all instances, and recovery becomes even more difficult."
  },
  {
    "kind": "paragraph",
    "text": "Thresholds prevent removal on a single failure and premature return after a single success. Interval, timeout, number of failures and number of successes define the speed of detection and recovery. Very aggressive checks can generate false negatives during spikes; Slow checks keep broken instances in the pool longer."
  },
  {
    "kind": "paragraph",
    "text": "Draining removes the endpoint from new selections while allowing existing connections to terminate. Slow start increases the weight gradually after startup or recovery, avoiding sending full load to cold caches and runtimes still warming up. In deployments, readiness, pre-stop, connection draining and maximum application timeout must be coordinated to avoid resets."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-11-endpoint-health-lifecycle.svg",
    "alt": "Endpoint health lifecycle between startup, readiness, degradation, unavailability and draining",
    "caption": "Figure 11 - An endpoint cycles through states that influence eligibility and weight."
  },
  {
    "kind": "subhead",
    "text": "API Gateway health check"
  },
  {
    "kind": "paragraph",
    "text": "A port scan can mark the gateway as healthy even when the configuration repository, DNS, or critical backends are unavailable. Design checks per layer and also monitor the end-to-end experience."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.21 Affinity, state and connection pooling",
    "id": "4-21-affinity-state-and-connection-pooling"
  },
  {
    "kind": "paragraph",
    "text": "Session affinity directs related requests to the same backend, usually by cookie, IP or hash. It may be necessary for legacy systems with in-memory sessions, but it reduces distribution freedom and complicates failover. REST APIs ideally maintain session state in shared mechanisms or tokens, allowing any instance to process the call."
  },
  {
    "kind": "paragraph",
    "text": "IP affinity is fragile behind NAT and proxies, as many consumers may appear with the same origin. Mobile users can change IPs, and IPv6 can use multiple temporary addresses. Cookie-based affinity offers a more specific key, but needs to consider domain, Secure, SameSite and the behavior when the backend leaves the pool."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling reuses connections from the proxy to the upstream and reduces TCP/TLS handshakes, latency and SNAT port consumption. However, very small pools can concentrate traffic, and persistent connections can maintain a resolved address before a DNS change. The DNS refresh, connection lifetime and idle timeout policy must be compatible with failover and endpoint rotation."
  },
  {
    "kind": "paragraph",
    "text": "HTTP/2 multiplexes multiple streams into one connection. If the proxy maintains a single HTTP/2 connection per backend, connection metrics no longer represent the number of requests. The algorithm, stream limits and creation of multiple connections need to be observed. The same concern applies to gRPC, WebSocket and long polling, which have different durations and patterns."
  },
  {
    "kind": "table",
    "caption": "Table 8 - State and persistence change the distribution.",
    "headers": [
      "Mechanism",
      "Benefit",
      "Side effect"
    ],
    "rows": [
      [
        "Cookie affinity",
        "Stable session",
        "Backend dependency and failover"
      ],
      [
        "IP hash",
        "No cookie",
        "NAT concentrates clients"
      ],
      [
        "Connection pooling",
        "Less handshaking and SNAT",
        "Old connections and concentration"
      ],
      [
        "HTTP/2 multiplexing",
        "High efficiency",
        "Connection does not represent load"
      ],
      [
        "Draining",
        "Deploy without abrupt interruption",
        "Need coordinated timeout"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.22 Multi-layer architecture",
    "id": "4-22-multi-layer-architecture"
  },
  {
    "kind": "paragraph",
    "text": "An API architecture can contain DNS/GSLB, CDN or Front Door, WAF, regional load balancer, API Gateway, ingress controller, service mesh and application. Each layer can terminate TLS, generate headers, do retries and apply timeout. The design needs to define a matrix of responsibilities: who authenticates the client, who applies WAF, who selects region, who selects instance, who preserves the Host and who generates the request ID."
  },
  {
    "kind": "paragraph",
    "text": "Multi-layer retries multiply traffic. If the client, Front Door, API Gateway and service mesh try three times, a single operation can produce dozens of calls to the backend. In non-idempotent operations, this also creates functional risk. The timeout budget must decrease along the chain so that external layers still have time to process the failure and respond."
  },
  {
    "kind": "paragraph",
    "text": "Observability must record timestamps, address, hostname, protocol, originating status, selected backend, connection duration, and response duration. A correlation identifier must be created at the edge or preserved in a controlled way. Logs need to distinguish proxy status and upstream status, in addition to connect timeout, TLS error, reset and response timeout."
  },
  {
    "kind": "paragraph",
    "text": "High availability requires eliminating single points of failure at the gateway layer itself. Multiple instances behind load balancer, consistent configuration and health checks are required. Stateful components, distributed caches and configuration banks require their own design; Duplicating just the listener does not guarantee that the platform will continue to operate during dependency failure."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-12-api-request-path.svg",
    "alt": "Enterprise path of an API call between client, DNS, edge, API Gateway, balancer, and backend",
    "caption": "Figure 12 - Each hop makes decisions and can change the observed identity."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Example of division of responsibilities.",
    "headers": [
      "Layer",
      "Recommended responsibility",
      "Avoid duplication of"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "Global choice and endpoint failover",
        "Application rules"
      ],
      [
        "Edge/WAF",
        "Public protection, TLS, broad routing",
        "Business authorization"
      ],
      [
        "API Gateway",
        "Authentication, quotas, transformation, governance",
        "Improvised global balancing"
      ],
      [
        "LB/Ingress",
        "Local distribution and health",
        "Duplicate identity policies"
      ],
      [
        "Service mesh",
        "Service-to-service resilience and internal mTLS",
        "No-budget retries"
      ],
      [
        "Application",
        "Business rule and functional status",
        "Reliance on unvalidated headers"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.23 Application on Axway API Gateway and Azure",
    "id": "4-23-application-on-axway-api-gateway-and-azure"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Axway API Gateway"
  },
  {
    "kind": "paragraph",
    "text": "In a high-availability Axway deployment, multiple API Gateway instances sit behind a balancer that performs health checks and distributes the load. The balancer must preserve or correctly reconstruct host, protocol, and source identity as designed. Affinity should only be used when a resource truly depends on it; policies and shared state need to be evaluated separately."
  },
  {
    "kind": "paragraph",
    "text": "In outbound routing, filters such as Connect to URL make the gateway act as an endpoint for the client and call the configured destination, hiding the deployment hierarchy. Remote Host Settings control how the gateway connects to specific destinations, including connections, timeouts, and related parameters. DNS resolution and connection pooling can result in backend changes not being noticed immediately."
  },
  {
    "kind": "paragraph",
    "text": "When the output requires corporate proxy, the proxy configuration defines an additional intermediary. The diagnosis needs to separate gateway-proxy and proxy-destination connection. In topologies with a load balancer at the front and a proxy at the exit, the gateway is between two forms of intermediation, each with its own TLS, logs and timeouts."
  },
  {
    "kind": "paragraph",
    "text": "Maintenance operations must coordinate draining the load balancer and controlled shutdown of the instance to avoid interruption of active connections. Axway documentation also allows you to configure addresses and load balancing options in specific API Manager integrations; these parameters must be validated according to the version in use."
  },
  {
    "kind": "subhead",
    "text": "Practical application in Axway"
  },
  {
    "kind": "paragraph",
    "text": "When investigating 502 or connect timeout, record: hostname configured in the filter, DNS response seen by the process, address selected, Remote Host Settings applied, outbound proxy, connection pool and SNAT source observed by the backend."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Azure Services and API Management"
  },
  {
    "kind": "paragraph",
    "text": "Azure offers distribution services for different purposes. Traffic Manager makes decisions via DNS and the client connects directly to the returned endpoint. Azure Front Door is a global Layer 7 reverse proxy, with acceleration, TLS, routing, and WAF. Azure Load Balancer operates primarily at layer 4. Application Gateway acts as a regional layer 7 proxy for HTTP/HTTPS, with Host/path and WAF routing, as well as L4 capabilities in scenarios supported by the platform."
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management is an API management platform whose gateway enforces policies, authentication, transformation, and observability. It does not automatically replace a WAF or global distribution service. A common design positions Front Door or Application Gateway in front of the APIM, but health probes need to use the correct hostname, because virtual endpoints may not respond to probes by default IP and Host."
  },
  {
    "kind": "paragraph",
    "text": "In internal mode, APIM endpoints require accessible DNS within the VNet. Application Gateway in front of APIM needs custom probes and backend configuration compatible with the hostname and certificate. In the outbound path, APIM needs to resolve private backends and have connectivity to the corresponding network. Setting up just inbound exposure doesn't solve the backend leg."
  },
  {
    "kind": "paragraph",
    "text": "The choice between Traffic Manager and Front Door illustrates the conceptual difference: Traffic Manager responds to DNS and does not see application traffic; Front Door remains in the path as a reverse proxy. This changes observed origin, TLS, WAF, logs, failover, and routing capability."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/dns-nat-proxies-load-balancers/en/figure-13-azure-services.svg",
    "alt": "Concept map of Traffic Manager, Front Door, Load Balancer, Application Gateway and API Management",
    "caption": "Figure 13 - Azure services are differentiated by scope, layer and permanence on the path."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Conceptual mapping of Azure services.",
    "headers": [
      "Service",
      "Scope/tier",
      "Stay on the path?",
      "Main use"
    ],
    "rows": [
      [
        "Traffic Manager",
        "Global by DNS",
        "No",
        "Choose endpoint by policy and health"
      ],
      [
        "Front Door",
        "Global L7",
        "Yes",
        "Reverse proxy, WAF, TLS and acceleration"
      ],
      [
        "Load Balancer",
        "Regional L4",
        "Yes",
        "Distribute TCP/UDP streams"
      ],
      [
        "ApplicationGateway",
        "Regional L7",
        "Yes",
        "Host/path routing, WAF and TLS"
      ],
      [
        "API Management",
        "API Gateway",
        "Yes",
        "API security, policies, and governance"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.24 Systematic troubleshooting",
    "id": "4-24-systematic-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis must follow the actual call order. Start in the consumer or runtime environment that fails, not on a different workstation. Record the queried name, DNS server used, A/AAAA/CNAME response, TTL and cache. Then identify the destination address, route, NAT, TLS termination, Host, and selected backend."
  },
  {
    "kind": "paragraph",
    "text": "Compare a successful call and a failed call. Differences in resolver, IP family, returned address, SNAT source, or pool instance often reveal intermittency. For 502, determine if there was a DNS failure, connect error, TLS error, reset, or invalid response. For 503, check if the pool is missing healthy endpoints or if the policy itself caused unavailability. For 504, compare timeouts across all layers."
  },
  {
    "kind": "paragraph",
    "text": "Capture tools and logs need to be used in an authorized manner and with minimal filters. dig or Resolve-DnsName look at DNS; curl -v shows resolution, connection, TLS and HTTP; openssl s_client helps analyze SNI and chain; ss/netstat shows sockets; tcpdump/Wireshark confirms addresses and resets; Balancer metrics show health and backend selection. No single tool explains the entire chain."
  },
  {
    "kind": "paragraph",
    "text": "The goal is not just to restore service, but to produce a verifiable cause. Document the configuration that caused the failure, evidence, technical mechanism, permanent fix, and monitoring that will detect recurrence. Clearing cache, restarting gateway or increasing timeout may mask the problem without correcting the architecture."
  },
  {
    "kind": "subhead",
    "text": "Diagnostic commands - use only on authorized systems and targets"
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
    "text": "# Network and sockets\nip route get 198.51.100.25\nss -tan state established\nss -tan state time-wait"
  },
  {
    "kind": "table",
    "caption": "Table 11 - Symptoms and initial lines of investigation.",
    "headers": [
      "Symptom",
      "Priority hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "NXDOMAIN after creating record",
        "Negative cache or wrong zone",
        "SOA, negative TTL, authoritative query"
      ],
      [
        "Works by IP, fails by name",
        "DNS, SNI, Host or certificate",
        "dig, curl --resolve, s_client"
      ],
      [
        "Some customers use old endpoint",
        "TTL/cache/persistent connection",
        "Remaining TTL and connection pool"
      ],
      [
        "502 flashing",
        "Multiple DNS, upstream TLS, SNAT, reset",
        "Chosen backend and detailed error"
      ],
      [
        "503 on balancer",
        "All unhealthy or empty pool",
        "Health status and probe logs"
      ],
      [
        "504 after fixed time",
        "Timeout on a layer",
        "Status duration and issuer"
      ],
      [
        "Backend sees proxy IP",
        "Reverse proxy or SNAT",
        "Reliable headers and capture"
      ],
      [
        "Unequal distribution",
        "Keep-alive, HTTP/2, affinity, weights",
        "Backend requests and connections"
      ],
      [
        "Health green, API fails",
        "Shallow probe",
        "Test dependencies and real path"
      ],
      [
        "Only large DNS responses fail",
        "TCP/53, EDNS or fragmentation",
        "TC flag, dig +tcp, capture"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Decision tree for an API failure"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Does the name resolve in the same runtime that executes the call? Register DNS server, response, TTL and aliases.",
      "Is the resolved address the expected endpoint for this environment and IP family?",
      "Is the TCP connection created? If not, analyze route, firewall, NAT, SNAT and port capacity.",
      "Does TLS handshake end? Validate SNI, certificate, CA, hostname and mTLS on the correct leg.",
      "Does the proxy receive HTTP? Identify the component that generated the status and request ID.",
      "Does the pool have healthy endpoints and does the probe represent true readiness?",
      "Which backend was chosen and which Host/path/header was sent?",
      "Did the backend respond, reset or timeout?",
      "Did the response come back through the same NAT state and through the same layers?",
      "Does the fix eliminate the cause or just force new cache/connection?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4.25 Case studies",
    "id": "4-25-case-studies"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - DNS change without reducing TTL"
  },
  {
    "kind": "paragraph",
    "text": "A team switches the api.empresa.com record from the old balancer to the new one during a change. The previous TTL was 3600 seconds. Tests carried out directly on the authoritative system show the new address, but some consumers remain on the old endpoint for almost an hour. Restarting a station seems to solve the problem, while containerized applications maintain old connections."
  },
  {
    "kind": "paragraph",
    "text": "The cause combines valid recursive caching and connection pooling. The correct plan would be to reduce the TTL in advance, wait for expiration, keep both endpoints compatible during the transition, and watch traffic by address. The event demonstrates that an authoritative update does not equate to immediate adoption by all customers."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Internal APIM marked as unhealthy by Application Gateway"
  },
  {
    "kind": "paragraph",
    "text": "An Application Gateway uses the API Management private IP as a backend and the default probe sends incompatible Host. APIM responds only to configured hostnames, and the probe considers the backend unavailable. Users receive 502 or 503 even though APIM is operational when accessed with the correct hostname."
  },
  {
    "kind": "paragraph",
    "text": "The fix is to create custom probe with appropriate host and path, configure backend HTTP settings and guarantee resolution/certificate. The case shows that layer 7 health check needs to reproduce the expected HTTP authority and not just reach the IP."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - SNAT exhaustion caused by short connections"
  },
  {
    "kind": "paragraph",
    "text": "A gateway calls an external backend and opens a new TLS connection for almost every request. During peak, new connections begin to fail intermittently. The backend does not show saturation, and retries increase the volume even more. Metrics reveal a large amount of TIME_WAIT and port consumption on the outgoing IP."
  },
  {
    "kind": "paragraph",
    "text": "The solution involves connection pooling, keep-alive, NAT sizing, adjusting timeouts and port monitoring. Increasing the HTTP timeout does not create ports and may prolong states. The case relates concepts from the TCP and NAT chapters to API Gateway behavior."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 - Spoofed X-Forwarded-For"
  },
  {
    "kind": "paragraph",
    "text": "An API applies rate limiting by the first value of X-Forwarded-For, but the load balancer just adds the observed IP to the end of the received header. A consumer sends X-Forwarded-For with arbitrary addresses and switches the first value to bypass limit and pollute auditing."
  },
  {
    "kind": "paragraph",
    "text": "The edge must remove untrusted headers and create the chain from the observed socket. The backend must configure reliable proxies and select the correct position. Strong identity must come from authentication, not from a client-controllable header."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 5 - Uneven distribution with HTTP/2"
  },
  {
    "kind": "paragraph",
    "text": "The balancer uses least connections between three gateways. A client opens a few HTTP/2 connections and sends thousands of streams over the same connection. The connection counter does not reflect the load per request, and one instance receives a disproportionate share of the work."
  },
  {
    "kind": "paragraph",
    "text": "The investigation compares streams and requests by backend, not just sockets. The solution may involve per-request balancing on the L7 proxy, multiple connections, stream limits or an algorithm based on requests/latency. The algorithm must be compatible with the protocol."
  },
  {
    "kind": "subhead",
    "text": "Application in the banking world"
  },
  {
    "kind": "paragraph",
    "text": "In financial integrations, DNS, network origin, mTLS, and institution identification are different controls. IP allowlist reduces surface area, mTLS authenticates the entity on the channel and OAuth/JWT authorizes operations. None of them should be used as an automatic substitute for the others."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observation labs",
    "id": "observation-laboratories"
  },
  {
    "kind": "paragraph",
    "text": "Laboratories must be carried out in their own or authorized environment. Use documentation domains, local services, or lab resources. Do not scan or attempt to bypass corporate controls. Record predictions before running commands and compare with the results."
  },
  {
    "kind": "paragraph",
    "text": "For each lab, note time, resolver, DNS response, TTL, destination address, protocol, TLS terminator, Host, status, chosen server, and duration. This discipline transforms isolated commands into architectural evidence."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Query the A, AAAA, CNAME, NS, and SOA of a domain under your control. Identify authority and TTLs.",
      "Execute a normal resolution and then a direct query to the authoritative server. Compare AA, RD and RA flags.",
      "Use dig +tcp and compare with UDP. Note size, timing, and presence of EDNS.",
      "Create a record with a low TTL in the laboratory, change the value and track the remaining TTL in the cache.",
      "Test an NXDOMAIN response and observe how long it remains in cache.",
      "Configure two local names that point to the same reverse proxy and route by Host.",
      "On Docker or local network, configure NGINX/HAProxy with two backends and observe round robin and least connections.",
      "Disable a backend and check how many checks it takes to remove it from the pool.",
      "Enable keep-alive and compare the number of handshakes and sockets with new connections per request.",
      "Simulate a DNS switch while keeping the old endpoint active and document the coexistence window.",
      "Add an X-Forwarded-For header on the client and confirm that Lab Edge removes or preserves it.",
      "Design an architecture with global DNS, WAF, API Gateway and two backends, indicating who completes TLS and generates the request ID."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "DNS is a distributed and hierarchical base of RRsets, not just a directory of IPs.",
      "Zones and domains are not identical; delegations distribute authority across NS records and glue when necessary.",
      "The stub uses a recursive, which can query root, TLD and authoritative or forward to another resolver.",
      "TTL controls cache; changes do not instantly invalidate already stored entries.",
      "NXDOMAIN and typelessness can also be cached.",
      "DNS needs to work over UDP and TCP; EDNS extends capabilities and large responses may require fallback.",
      "DoT/DoH protect transportation; DNSSEC authenticates data; TSIG authenticates specific transactions.",
      "Private and split-horizon DNS require zone visibility, forwarding, and loop control.",
      "DNS balancing makes a decision before connection and is limited by TTL and resolver behavior.",
      "NAT translates stateful addresses and ports; It is not a replacement for firewall or authentication.",
      "SNAT changes the observed origin and may suffer from port exhaustion.",
      "Reverse proxy terminates one connection and creates another; a tunnel only forwards bytes after it is established.",
      "L4 decides for flow; L7 can interpret HTTP, terminate TLS, route by Host/path, and apply WAF.",
      "Forwarded and X-Forwarded-* are only trustworthy when rebuilt by known proxies.",
      "The algorithm selects among eligible endpoints; health checks define this set.",
      "Round robin, least connections and hashing meet different load patterns.",
      "Readiness, draining and slow start are necessary for avalanche-free deployment and recovery.",
      "Connection pooling reduces handshakes and SNAT, but influences DNS, distribution and failover.",
      "In Azure, Traffic Manager, Front Door, Load Balancer, Application Gateway and APIM have different roles.",
      "In Axway, inbound load balancer, routing filters, remote hosts and outbound proxy must be analyzed per leg."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Architecture checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Which FQDN does each consumer use and which zone is authoritative?",
      "Which resolvers are used by clients, gateways and backends?",
      "Are there public and private responses for the same name?",
      "What positive and negative TTLs have been set?",
      "Do UDP/53 and TCP/53 work on all required paths?",
      "Is DNSSEC validated and monitored when adopted?",
      "Which component performs SNAT and which IPs can the backend watch?",
      "Does the SNAT port capacity support peaking and timeouts?",
      "Where does each TCP/TLS connection end?",
      "Which hostname is used in SNI, Host, and certificate validation?",
      "Which headers are removed and rebuilt at the edge?",
      "Which layer chooses region and which chooses instance?",
      "Does the health check test real readiness and use correct host/path?",
      "Are there thresholds, draining and slow start?",
      "Is the algorithm suitable for HTTP/2, gRPC, WebSocket and long connections?",
      "Is affinity really necessary? Where is the state held?",
      "Do connection pools respect DNS changes and failover?",
      "Do retries and timeouts have a coordinated budget?",
      "Do logs distinguish proxy status and upstream status?",
      "Is there end-to-end request ID and metrics per backend?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Review exercises",
    "id": "review-exercises"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Differentiate between domain, zone, delegation and authoritative server.",
      "Explain why an FQDN can end with a period and the risk of omitting it in a zone file.",
      "Describe the flow between stub resolver, recursive, root, TLD, and authoritative.",
      "Differentiate recursive and iterative query.",
      "What is the difference between NXDOMAIN and NODATA?",
      "Explain the function of the AA, RD, RA and TC flags.",
      "Compare A, AAAA, CNAME, NS, SOA, PTR, SRV and CAA.",
      "Why don't multiple A records guarantee uniform balancing?",
      "Explain how TTL and connection pooling can maintain usage of an old endpoint.",
      "Why releasing only UDP/53 can break DNS?",
      "What problem does EDNS(0) solve and what risk arises with very large payloads?",
      "Compare DNSSEC, DoT, DoH and TSIG.",
      "How does split-horizon help and what operational risks does it create?",
      "Differentiate between Basic NAT, NAPT/PAT, SNAT and DNAT.",
      "Why should NAT not be treated as an authentication mechanism?",
      "Explain SNAT exhaustion and the relationship with connection pooling.",
      "Differentiate between forward proxy, reverse proxy, gateway and tunnel.",
      "Compare TLS pass-through, offload and re-encryption.",
      "Why is mTLS terminated at the proxy not automatically mTLS all the way to the backend?",
      "Differentiate between SNI and Host and explain how each participates in routing.",
      "How should trust be established in X-Forwarded-For?",
      "Compare L4, L7 and DNS balancing.",
      "When are round robin, least connections and consistent hash appropriate?",
      "Differentiate liveness, readiness and external health check.",
      "Explain how HTTP/2 can make least connections inappropriate.",
      "What is the difference between Azure Traffic Manager and Azure Front Door?",
      "Why might an Application Gateway's default probe fail against internal APIM?",
      "What elements must be collected to investigate a 502 in API Gateway?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Scenario questions"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "An API changes from 203.0.113.10 to 203.0.113.20, but 15% of clients remain at the old address. Propose hypotheses and an evidence plan.",
      "Private DNS returns 10.20.5.10 for VMs, but API Gateway resolves the public address. Draw the resolution path and the points to check.",
      "A backend allows only one outgoing IP, but the gateway uses three sources. Explain why the fault appears intermittent and propose a solution.",
      "A load balancer considers the backend healthy over TCP, but the API returns 500 per bank unavailable. Design appropriate checks.",
      "A client uses mTLS up to the WAF, and the backend needs to know the identity of the certificate. Define a reliable propagation model.",
      "A stateful application requires IP affinity, but consumers are after CGNAT. Analyze the risk and propose an alternative.",
      "An architecture has retries on the client, Front Door, APIM and service mesh. Calculate the multiplication potential and propose a budget.",
      "After enabling HTTP/2 between proxy and gateway, the distribution by least connections becomes uneven. Explain the mechanism and possible adjustments."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical glossary",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Table 12 - Chapter glossary.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Authoritative server",
        "Server that responds with authority over a zone."
      ],
      [
        "CNAME",
        "Record that defines a name as an alias of another canonical name."
      ],
      [
        "Delegation",
        "Transferring authority from one part of the DNS tree to another zone."
      ],
      [
        "DNAT",
        "Translation of the destination address or port."
      ],
      [
        "DNSSEC",
        "Extensions that provide origin authentication and integrity for DNS data."
      ],
      [
        "DoH",
        "Transporting DNS messages over HTTPS."
      ],
      [
        "DoT",
        "DNS message transport over TLS."
      ],
      [
        "EDNS(0)",
        "Extensible mechanism that advertises UDP DNS payload and capabilities."
      ],
      [
        "Forward proxy",
        "Intermediary who represents clients at destinations."
      ],
      [
        "Forwarded",
        "Standardized HTTP header for proxying metadata."
      ],
      [
        "FQDN",
        "Fully qualified domain name."
      ],
      [
        "Glue record",
        "Address provided by the parent to reach nameserver within the delegated zone."
      ],
      [
        "GSLB",
        "Global traffic distribution, often based on DNS and health."
      ],
      [
        "Hairpin NAT",
        "Translation that allows internal customers to access the external address of the internal service."
      ],
      [
        "Health check",
        "Test used to decide whether an endpoint should remain eligible."
      ],
      [
        "Least connections",
        "Algorithm that chooses the endpoint with the fewest active connections."
      ],
      [
        "NAPT/PAT",
        "Translation that includes addresses and transport ports."
      ],
      [
        "negative caching",
        "Cache for no DNS name or type."
      ],
      [
        "Recursive resolver",
        "Server that obtains the final response on behalf of the client and maintains cache."
      ],
      [
        "reverse proxy",
        "Intermediary that represents servers and selects upstream."
      ],
      [
        "RRset",
        "Set of records with the same name, class and type."
      ],
      [
        "Session affinity",
        "Mechanism that tries to keep related requests in the same backend."
      ],
      [
        "SNI",
        "Hostname indication sent during the TLS handshake."
      ],
      [
        "SNAT",
        "Translation of the origin address or port."
      ],
      [
        "Split-horizon DNS",
        "Different responses for the same name depending on the resolution environment."
      ],
      [
        "Stub resolve",
        "Local component that sends queries to a recursive resolver."
      ],
      [
        "TTL",
        "Time for which DNS data can remain cached."
      ],
      [
        "Tunnel",
        "Intermediary that forwards bytes after establishing a tunnel."
      ],
      [
        "Upstream",
        "Destination to which proxy or gateway forwards traffic."
      ],
      [
        "Zone",
        "Administered portion of the DNS namespace."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended reading",
    "id": "official-references-and-recommended-reading"
  },
  {
    "kind": "paragraph",
    "text": "The specifications below are the primary sources for the concepts presented. Old RFCs remain fundamental, but should be read together with the updates indicated on the RFC Editor page. Product documentation changes over time; Validate the version and deployment mode in use before applying a configuration."
  },
  {
    "kind": "paragraph",
    "text": "Recommended reading starts with RFC 1034 and 1035, moves on to terminology and caching, then transports and DNSSEC. For HTTP intermediaries, read the RFC 9110 architecture and Forwarded headers. Then compare load balancing documentation and official references from Axway and Azure."
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
    "text": "Next chapter"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 5 will delve deeper into HTTP/1.1, HTTP/2 and HTTP/3: message structure, semantics, persistent connections, multiplexing, header compression, QUIC and impacts on API Gateways."
  }
];
