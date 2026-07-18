import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Complete English translation of the supplied PDF; only recurring headers, footers, and physical page breaks were removed.
export const IP_ADDRESSING_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Overview",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "In the previous chapters, communication was observed as a sequence of layers: the application produces data, the transport layer organizes communication between processes and the IP protocol conducts datagrams between networks. This chapter focuses on the mechanism that allows you to identify interfaces and choose paths. Without a coherent address plan and correct routes, the TCP connection does not even reach listener of API Gateway or backend."
  },
  {
    "kind": "paragraph",
    "text": "IP addressing seems simple when reduced to a sequence as 10.20.30.40, but the actual functioning involves binary representation, prefixes, route tables, scopes, special addresses, translation, fragmentation and coexistence between two versions of the protocol. In corporate environments, these elements combine with virtual networks, balancers, firewalls, private endpoints, tunnels, datacenters and clusters. A difference of a bit in the mask can route traffic to the wrong place or produce overlay of networks difficult to diagnose."
  },
  {
    "kind": "paragraph",
    "text": "IPv4 remains widely used and its 32-bit space led to the adoption of CIDR, private addresses and NAT. IPv6 expands the address to 128 bits, modifies the header, deletes the broadcast, makes Neighbor Discovery and ICMPv6 core components and offers self-configuration mechanisms. The transition does not occur as an instant exchange: networks dual stack, DNS with records A and AAAA, Happy Eyeballs and translation mechanisms coexist for long periods."
  },
  {
    "kind": "paragraph",
    "text": "For professionals of API Gateways, the goal is to go beyond calculating subnets. It is necessary to know which address the consumer reaches, which address the gateway uses as its origin, how the backend name is resolved, which route wins, where NAT occurs, which component preserves the original IP and how the return path is established. At the end of the chapter, the reader should be able to transform symptoms such as 'working from one network, but not from another' into verifiable hypotheses."
  },
  {
    "kind": "subhead",
    "text": "How to Study This Chapter"
  },
  {
    "kind": "paragraph",
    "text": "Redo the calculations on paper and validate with tools such as ipcalc, Python ipaddress or authorized corporate calculators. In routing, always write origin, destination, corresponding prefixes, chosen route and next hop."
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
      "Explain the IP protocol function and differentiate name, address, interface, prefix, route and next hop.",
      "Interpret IPv4 addresses in decimal and binary, masks and CIDR notation.",
      "Calculate network, broadcast, host track and number of addresses of a subnet.",
      "Understand VLSM, summarization, overlapping and the principle of longest prefix match.",
      "Recognize private, public and special purpose IPv4 addresses.",
      "To relate NAT/PAT to the identity of origin and operational limits discussed in the previous chapter.",
      "Describe the format, notation and main scopes of IPv6 addresses.",
      "Explain Neighbor Discovery, Router Advertisement, SLAAC, DAD and DHCPv6.",
      "Understand dual stack, A/AAAA records, Happy Eyeballs and IPv4/IPv6 translation.",
      "Diagnose route problems, MTU, DNS, asymmetry, allowlists and address in API Gateways."
    ]
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
      "3.1 The role of IP",
      "3.2 Names, addresses, interfaces and routes",
      "3.3 IPv4 address and binary representation",
      "3.4 Masks and CIDR",
      "3.5 Calculation of subnets",
      "3.6 VLSM, summarization and overlap",
      "3.7 Network addresses, broadcast, /31 and /32",
      "3.8 Special IPv4 addresses",
      "3.9 Public, private and NAT addresses",
      "3.10 Table of routes and longest prefix match",
      "3.11 Default Gateway and asymmetric routing",
      "3.12 MTU, fragmentation and Path MTU Discovery",
      "3.13 Motivations and IPv6 header",
      "3.14 IPv6 rating",
      "3.15 Types and scopes IPv6",
      "3.16 NDP, SLAAC, DAD and DHCPv6",
      "3.17 IPv6 planning and prefix sizes",
      "3.18 IPv4/IPv6 coexistence",
      "3.19 Address in API Gateways",
      "3.20 Troubleshooting",
      "3.21 Case studies and laboratories",
      "Summary, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.1 The Role of the IP Protocol",
    "id": "o-papel-do-protocolo-ip"
  },
  {
    "kind": "paragraph",
    "text": "The Internet Protocol provides a datagram delivery service between source and destination in a set of interconnected networks. Each datagram contains source and destination addresses, and the routers analyze the destination to decide the next hop. The service is not connected: each datagram can be treated independently and the protocol does not in itself create a logical session equivalent to the TCP."
  },
  {
    "kind": "paragraph",
    "text": "The IPv4 specification makes it clear that IP does not provide end-to-end reliability, sorting, retransmission, or flow control. These properties belong to superior protocols or application. A router can discard a packet per full queue, expired TTL, no route, security policy or MTU problem. The IP layer can generate or cause ICMP messages, but does not ensure that the application receives a response."
  },
  {
    "kind": "paragraph",
    "text": "The IP address identifies an interface in a particular network context, and not necessarily a person, application or physical machine permanently. A multihome host has several interfaces and addresses; a balancer has a virtual address attended by several instances; a pod can have ephemeral address; a private endpoint associates a private address to a managed service. This distinction is important when interpreting logs and access rules."
  },
  {
    "kind": "paragraph",
    "text": "In an API call, IP appears at various points: address resolved by DNS, destination address of the front door or gateway, address used by gateway to reach backend and address observed on the return path. The same business transaction can cross multiple IP pairs due to proxies and translations."
  },
  {
    "kind": "subhead",
    "text": "Scope of Responsibility"
  },
  {
    "kind": "paragraph",
    "text": "IP tries to forward datagrams. An HTTP response 401 means that traffic has already reached an application capable of interpreting HTTP; no route or connection timeout points to previous steps."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.2 Names, Addresses, Interfaces, and Routes",
    "id": "nomes-enderecos-interfaces-e-rotas"
  },
  {
    "kind": "paragraph",
    "text": "A name like api.empresa.com is a friendly identification used by the application and the user. DNS usually associates this name with one or more IPv4 and IPv6 addresses. After resolution, the IP stack works with addresses. Changing a DNS registry does not automatically change connections already established, and the cache life span influences when new addresses are used."
  },
  {
    "kind": "paragraph",
    "text": "An address is configured in a logical or physical interface next to a prefix. The prefix tells which bits represent the network. The interface can also have multiple routes and addresses, including loopback, temporary addresses and addresses of different families. The application can listen at a specific address or at all local addresses, changing your exposure."
  },
  {
    "kind": "paragraph",
    "text": "A route describes how to reach a destination prefix. It contains, conceptually, prefix, next hop or output interface, metric and source of information. Some routes are directly connected, others are static and others arrive by dynamic protocols. The system chooses a route for each destination before transmitting the packet."
  },
  {
    "kind": "paragraph",
    "text": "The classic distinction helps in diagnosis: name indicates what is sought, address indicates where it is and route indicates how to arrive. If curl solves the wrong name, the problem is resolution or configuration. If you solve the correct IP but there is no route, the problem is in forwarding. If there is a route and the peer responds with RST, the traffic has reached an endpoint, but did not find the expected service."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-01-name-address-route.svg",
    "alt": "DNS resolves names; the routing system decides how to reach the address",
    "caption": "Figure 1 — DNS resolves names; the routing system decides how to reach the address."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.3 IPv4 Addresses and Binary Representation",
    "id": "endereco-ipv4-e-representacao-binaria"
  },
  {
    "kind": "paragraph",
    "text": "An IPv4 address has 32 bits. The usual representation divides these bits into four octetes and converts each octete to decimal, producing the dotted decimal notation. The value of each octect varies from 0 to 255 because eight bits represent 256 combinations. The 192.168.10.77 address is therefore a compact way to write four binary sequences."
  },
  {
    "kind": "paragraph",
    "text": "Subnet operations are not performed with isolated decimal numbers, but with bits. The mask separates the prefix from the bits available within the subnet. An AND operation between address and mask produces the network address. When all host bits are placed in 1, the traditional subnet broadcast is obtained."
  },
  {
    "kind": "paragraph",
    "text": "Convert some frequent values speeds up calculations. In a mask octete, the valid values are 0, 128, 192, 224, 240, 248, 252, 254 and 255 because the bits 1 need to be contiguous from the left. A mask 255.255.255.192 corresponds to 24 full bits plus two bits in the last octete, therefore /26."
  },
  {
    "kind": "paragraph",
    "text": "The historical concept of classes A, B and C help to understand ancient documents, but modern planning uses CIDR. Assuming that every address started by 10 is automatically /8 or that all 192 is /24 generates errors. The prefix shall be explicitly informed or obtained from the network configuration."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-02-ipv4-binary-prefix.svg",
    "alt": "IPv4 has 32 bits, and the mask defines the prefix boundary",
    "caption": "Figure 2 — IPv4 has 32 bits, and the mask defines the prefix boundary."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Possible values in a contiguous IPv4 mask.",
    "headers": [
      "Decimal",
      "Binary",
      "Prefix Bits in Octet"
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
    "text": "3.4 Subnet Masks and CIDR Notation",
    "id": "mascaras-de-sub-rede-e-notacao-cidr"
  },
  {
    "kind": "paragraph",
    "text": "CIDR represents the size of the prefix by a bar followed by the amount of bits 1 of the mask. 10.20.30.0/24 indicates that the first bits 24 identify the prefix and remain 8 bits for positions within the subnet. The same decimal mask is 255.255.255.0. The prefix does not only inform number of hosts; it is the unit used in assignment and routing."
  },
  {
    "kind": "paragraph",
    "text": "The adoption of CIDR replaced the rigid class model and allowed assigning blocks closer to the real need. It also allowed you to add routes. Instead of publishing hundreds of small networks separately, an organization can announce a larger prefix that contains them, provided that topology and politics allow. Aggregation reduces status in global and internal tables."
  },
  {
    "kind": "paragraph",
    "text": "The total size of an IPv4 block is 2 high to the number of bits not belonging to the prefix. A /24 contains 256 addresses; /25 contains 128; /26 contains 64; /27 contains 32. Each increment in the prefix divides the previous block by half. This relationship is safer than decorating tables without understanding the bits."
  },
  {
    "kind": "paragraph",
    "text": "CIDR is also used in firewall control lists and policies. Allow 10.20.0.0/16 grants access to 65.536 positions, not just a server. Using a broad prefix for convenience may violate the slightest privilege. On the other hand, allowing individual addresses in environments with dynamic output can cause unavailability. The design needs to align security, stability and operation."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Common IPv4 prefixes. *The rule minus two has exceptions such as /31 and /32.",
    "headers": [
      "Prefix",
      "Mask",
      "Addresses in the block",
      "Traditional Hosts*"
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
        "special use point to point"
      ],
      [
        "/32",
        "255.255.255.255",
        "1",
        "Host route"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.5 Calculating an IPv4 Subnet",
    "id": "calculo-de-uma-sub-rede-ipv4"
  },
  {
    "kind": "paragraph",
    "text": "Consider 192.168.10.77/26. The prefix /26 corresponds to 255.255.255.192. In the last octect, the size of the block is 256 minus 192, or 64. The intervals begin at 0, 64, 128 and 192. As 77 is between 64 and 127, the network address is 192.168.10.64 and the broadcast is 192.168.10.127."
  },
  {
    "kind": "paragraph",
    "text": "The traditional host range starts at the address next to the network and ends at the address prior to the broadcast: 192.168.10.65 to 192.168.10.126. There are 64 positions in the block and 62 positions traditionally attributable to hosts. This rule meets common IPv4 sub-networks, but should not be applied mechanically to /31 and /32."
  },
  {
    "kind": "paragraph",
    "text": "The same calculation can be done with binary operation. The last of the address is 01001101 and the last of the mask is 11000000. AND produces 01000000, decimal 64. For the broadcast, the prefix bits are preserved and the six host bits are placed at 1, producing 01111111, decimal 127."
  },
  {
    "kind": "paragraph",
    "text": "In throubleshooting, the calculation answers whether two interfaces are considered local. A host 192.168.10.77/26 considers 192.168.10.100 directly connected, but sends 192.168.10.130 to the gateway. If the peer was set to /24, the two sides disagree about who is in the same link. This perception asymmetry generates unanswered ARP, unexpected paths and intermittent failures."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-03-ipv4-subnet-calculation.svg",
    "alt": "Complete calculation for the address 192.168.10.77/26",
    "caption": "Figure 3 — Complete calculation for the address 192.168.10.77/26."
  },
  {
    "kind": "subhead",
    "text": "Educational Validation with Python's ipaddress Module"
  },
  {
    "kind": "code",
    "text": "import ipaddress"
  },
  {
    "kind": "code",
    "text": "iface = ipaddress.ip_interface('192.168.10.77/26')\nprint('Network:', iface.network.network_address)\nprint('Broadcast:', iface.network.broadcast_address)\nprint('Mask:', iface.network.netmask)\nprint('Total addresses:', iface.network.num_addresses)\nprint('First host:', next(iface.network.hosts()))\nprint('Last host:', list(iface.network.hosts())[-1])"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.6 VLSM, Route Summarization, and Network Overlap",
    "id": "vlsm-sumarizacao-e-sobreposicao-de-redes"
  },
  {
    "kind": "paragraph",
    "text": "Variable Length Subnet Masking allows you to use prefixes of different sizes within a plane. A network of users can receive /24, a network of servers /26 and a point-to-point link /31. Efficient allocation begins with the greatest needs, respects binary boundaries and reserves space for growth. Dividing blocks randomly creates administrative fragmentation and makes it difficult to summarize."
  },
  {
    "kind": "paragraph",
    "text": "Sumarization combines contiguous prefixes that share initial bits. The nets 10.20.0.0/24, 10.20.1.0/24, 10.20.2.0/24 and 10.20.3.0/24 can be represented by 10.20.0.0/22. The short route reduces inputs, but also covers the entire range 10.20.0.0 to 10.20.3.255. Publishing without all blocks can attract traffic to non-existent destinations or belonging to another domain."
  },
  {
    "kind": "paragraph",
    "text": "Overlay occurs when two domains use intersecting prefixes. It is frequent in mergers, VPNs and integrations with partners who have chosen the same RFC 1918 blocks. If the local and remote network use 10.0.0.0/8, the table cannot distinguish the meaning only by destination. Translation, redesign, VRFs or proxies become necessary."
  },
  {
    "kind": "paragraph",
    "text": "In hybrid API architectures, overlay can prevent a cloud gateway from reaching a backend on-premises. DNS solves 10.20.5.10, but VNet already uses 10.20.0.0/16 for another purpose and selects a local route. The error looks like firewall, but the cause is in the address plan. Documenting blocks, owners and reserves is an architectural function, not only operational."
  },
  {
    "kind": "subhead",
    "text": "Planning Rule"
  },
  {
    "kind": "paragraph",
    "text": "A good summarization is born of hierarchical allocation. Do not try to correct a fragmented plan just by creating aggregated routes that point to destinations that the next hop does not know."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.7 Network, Broadcast, /31, and /32",
    "id": "rede-broadcast-31-e-32"
  },
  {
    "kind": "paragraph",
    "text": "In a traditional multi-access IPv4 subnet, the first address represents the network and the last one represents the targeted broadcast. These addresses are not usually assigned to host interfaces. The host rule equals 2^h minus 2 derives from this historical reserve. The broadcast allows sending to all nodes of the segment, although its use is limited by routers and policies."
  },
  {
    "kind": "paragraph",
    "text": "The RFC 3021 allows prefixes /31 in point-to-point links. As there are only two endpoints and there is no need for separate network and broadcast to discover multiple hosts, the two positions can be used. This practice saves addresses, but requires support on the equipment and should be applied to the correct context, not to a common LAN."
  },
  {
    "kind": "paragraph",
    "text": "A /32 identifies a single IPv4 position. It is used on host routes, router loopbacks, specific policies and ads. Setting up a /32 in an interface does not automatically mean no communication: on-link, point-to-point or special settings can set the next hop. However, the interpretation differs from a shared subnet."
  },
  {
    "kind": "paragraph",
    "text": "Limited broadcast 255.255.255.255 remains in the local link. Broadcast directed to a subnet can be filtered for security and operation reasons. Modern applications should not depend on IP broadcast for network discovery. In IPv6, broadcast was removed and equivalent functions use multicast with scope."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.8 Special-Purpose IPv4 Addresses",
    "id": "enderecos-ipv4-de-finalidade-especial"
  },
  {
    "kind": "paragraph",
    "text": "Not every address that fits in IPv4 format is globally usable. IANA maintains a record of special purpose blocks and informs properties as allowed origin, permitted destination, forwarding and global reach. This source is more reliable than memorized lists, as new blocks can be reserved by RFCs."
  },
  {
    "kind": "paragraph",
    "text": "The 127.0.0.0/8 block is associated with loopback. Traffic intended for it must remain in the node itself; 127.0.0.1 is the best known form. 169.254.0.0/16 is used for IPv4 local link when an address is not obtained by normal configuration. It should not be routed as a corporate address between subnets."
  },
  {
    "kind": "paragraph",
    "text": "The blocks 192.0.2.0/24, 198.51.100.0/24 and 203.0.113.0/24 are reserved for documentation. Using them in diagrams avoid publishing real addresses or stimulating copying of private networks that may conflict. The 198.18.0.0/15 block is reserved for benchmarking and should not be confused with a common public address."
  },
  {
    "kind": "paragraph",
    "text": "Multicast IPv4 uses 224.0.0.0/4. 0.0.0.0 may represent unspecified address in configuration or bind contexts, and 255.255.255.255 represents limited broadcast. Semantic depends on field and operation; for example, listening in 0.0.0.0 means accepting in all local IPv4 addresses, not sending to a server called 0.0.0.0."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Important IPv4 blocks. See the IANA record for full properties.",
    "headers": [
      "Block",
      "Main purpose",
      "Observation"
    ],
    "rows": [
      [
        "10.0.0.0/8",
        "Private",
        "Not globally routable"
      ],
      [
        "172.16.0.0/12",
        "Private",
        "172.16.0.0 to 172.31.255.255"
      ],
      [
        "192.168.0.0/16",
        "Private",
        "Common internal use"
      ],
      [
        "100.64.0.0/10",
        "Shared Address Space",
        "Commonly used by CGN"
      ],
      [
        "127.0.0.0/8",
        "Loopback",
        "Stay in the knot"
      ],
      [
        "169.254.0.0/16",
        "Link-local",
        "Communication in connection"
      ],
      [
        "192.0.2.0/24",
        "Documentation",
        "TEST-NET-1"
      ],
      [
        "198.51.100.0/24",
        "Documentation",
        "TEST-NET-2"
      ],
      [
        "203.0.113.0/24",
        "Documentation",
        "TEST-NET-3"
      ],
      [
        "224.0.0.0/4",
        "Multicast",
        "Multicast Groups IPv4"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.9 Public and Private Addresses, NAT, and PAT",
    "id": "enderecos-publicos-privados-nat-e-pat"
  },
  {
    "kind": "paragraph",
    "text": "The RFC 1918 reserved three blocks for private networks: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. These addresses can be reused by different organizations and are not forwarded globally on the Internet. 'Deprived' describes routing scope, not security level. A private network still needs targeting, authentication, encryption, monitoring and access control."
  },
  {
    "kind": "paragraph",
    "text": "To access external destinations, private IPv4 networks usually use translation. NAT changes address and, in many cases, PAT also changes port to multiplexate flows. The translation status allows the answer to be associated with the internal client. This mechanism preserved public addresses, but introduced state dependence and removed transparency in order."
  },
  {
    "kind": "paragraph",
    "text": "The 100.64.0.0/10 block was reserved as a shared space for providers, especially Carrier-Grade NAT. It is not equivalent to RFC 1918 blocks and can appear between subscriber and Internet. In troubleshooting, observing 100.64/10 does not prove that the address belongs to the organization's private network; it may represent an additional translation layer."
  },
  {
    "kind": "paragraph",
    "text": "When an API receives a connection, the IP address of origin of the socket is the immediately previous address after translations and proxies. A header like X-Forwarded-For can load the chain informed by proxies, but it is application text. The gateway should remove values sent by unreliable consumers and build the header from a known string. Use raw header for authorization allows spoofing."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-04-nat-observed-address.svg",
    "alt": "NAT changes the observed source; proxy headers require explicit trust",
    "caption": "Figure 4 — NAT changes the observed source; proxy headers require explicit trust."
  },
  {
    "kind": "subhead",
    "text": "Security"
  },
  {
    "kind": "paragraph",
    "text": "Do not use the existence of a private IP as proof of identity. Address is a network signal and can be shared, translated or forged into application headers. Combine it with proper authentication and controls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.10 Routing Tables and Longest Prefix Match",
    "id": "tabela-de-rotas-e-longest-prefix-match"
  },
  {
    "kind": "paragraph",
    "text": "The route table may contain several entries that correspond to the same destination. The principle of longest prefix match selects the route with the highest number of corresponding initial bits. A /24 route is more specific than /16, which is more specific than /8. The default /0 route corresponds to any destination, but loses to any more specific valid route."
  },
  {
    "kind": "paragraph",
    "text": "Consider routes to 0.0.0.0/0, 10.0.0.0/8, 10.20.0.0/16 and 10.20.30.0/24. A package for 10.20.30.25 corresponds to four, but uses /24. If this route points to an unavailable tunnel, the presence of an alternative /16 route does not guarantee automatic fallback; the specific route continues to win as long as it remains installed and considered usable."
  },
  {
    "kind": "paragraph",
    "text": "After choosing the longest prefix, implementations can use metrics, administrative distance, politics or multiple paths between equivalent routes. These details vary, but do not replace the rule of specificity. In cloud, user-defined route tables can replace system routes and send traffic to virtual applications."
  },
  {
    "kind": "paragraph",
    "text": "A directly connected route informs that the destination is in the link and requires neighbor resolution. A gateway route sends the frame to the next hop, although the destination IP address of the datagram remains the final destination. Confusing the next hop address with IP destination makes it difficult to read Ethernet captures."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-05-longest-prefix-match.svg",
    "alt": "The most specific route wins among matching prefixes",
    "caption": "Figure 5 — The most specific route wins among matching prefixes."
  },
  {
    "kind": "subhead",
    "text": "Examples for Inspecting Local Route Decisions"
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
    "text": "3.11 Default Gateway, Return Paths, and Asymmetric Routing",
    "id": "gateway-padrao-retorno-e-roteamento-assimetrico"
  },
  {
    "kind": "paragraph",
    "text": "The default gateway is the next hop used when no more specific route matches the destination. It must be reachable according to the interface configuration or the platform's own mechanism. Setting up a gateway does not automatically teach the rest of the network how to return; the reverse path depends on the tables of the other components."
  },
  {
    "kind": "paragraph",
    "text": "Asymmetric routing occurs when back and forth cross different paths. IP does not require symmetry, but stateful firewalls, NATs and balancers often depend on observing both senses. If the request enters through one firewall and the answer comes out through another, the second has no status and can discard the traffic. The symptom is connection that starts, but does not complete or works only in some instances."
  },
  {
    "kind": "paragraph",
    "text": "On hybrid networks, VPN or ExpressRoute propagated routes can compete with local and peering routes. A more specific change in a region can attract only part of the traffic. Capture only the customer does not reveal where the return was lost; it is necessary to consult effective routes and logs at traffic points."
  },
  {
    "kind": "paragraph",
    "text": "Source NAT is sometimes used to force return to the same device, as backend responds to the translator's address. This simplifies symmetry, but hides the real origin and consumes ports. The decision shall consider observability, scale, security policy and the need to preserve addresses."
  },
  {
    "kind": "subhead",
    "text": "Key Question"
  },
  {
    "kind": "paragraph",
    "text": "It is not enough to prove that there is a route from A to B. Check how B returns to the source address actually observed after NAT, balancing and proxies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.12 MTU, Fragmentation, and Path MTU Discovery",
    "id": "mtu-fragmentacao-e-path-mtu-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Each link technology has a Maximum Transmission Unit, the largest package that can be loaded without fragmentation in that link. A path can contain links with different MTUs. VPN encapsulations, tunnels and overlays reduce available space because they add headers. Small packets work while larger responses or handshakes fail, producing MTU's known black hole."
  },
  {
    "kind": "paragraph",
    "text": "In IPv4, a router can fragment a datagram when the Don't Fragment bit is not set. The fragments are reassembled in fate. Fragmentation increases processing and loss of a fragment invalidates the complete datagram. With DF defined, the router discards and must send ICMP indicating the need for smaller package, allowing Path MTU Discovery."
  },
  {
    "kind": "paragraph",
    "text": "In IPv6, routers do not fragment packets in transit. The source node is responsible for adjusting the size and can use the Fragment extension header when needed. ICMPv6 Packet Too Big is an essential part of the operation. Blocking all ICMPv6 breaks MTU discovery and other key functions, unlike the simplistic view that ICMP serves only ping."
  },
  {
    "kind": "paragraph",
    "text": "In APIs, MTU problems can only arise with large certificates, extensive headers, uploads or larger answers. The TCP tries to relay segments that never cross, and the application records timeout. Adjust MSS in tunnels, fix MTU and allow messages ICMP required are better solutions than arbitrarily reducing payloads."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Conceptual differences of fragmentation between IPv4 and IPv6.",
    "headers": [
      "Aspect",
      "IPv4",
      "IPv6"
    ],
    "rows": [
      [
        "Router Fragmentation",
        "Possible when DF is not set",
        "Not allowed"
      ],
      [
        "Responsible for adjusting",
        "Origin and possibly routers",
        "Origin"
      ],
      [
        "Oversized packet indication",
        "ICMP Destination Unreachable / fragmentation needed",
        "ICMPv6 Packet Too Big"
      ],
      [
        "Header",
        "Fragmentation fields in the base header",
        "Fragment extension header at source"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.13 Why IPv6 Was Created",
    "id": "por-que-o-ipv6-foi-criado"
  },
  {
    "kind": "paragraph",
    "text": "IPv4 provides approximately 4,29 billion combinations, and part of space is reserved. The growth of the Internet made exhaustion predictable. CIDR, NAT and allocation policies extended the life of IPv4, but also increased complexity. IPv6 expanded the address to 128 bits and was designed to support much larger space and modern self-configuration."
  },
  {
    "kind": "paragraph",
    "text": "IPv6 is not just 'IPv4 with more numbers'. The base header has been simplified and has a fixed size of 40 bytes. Optional functions are carried in extension headers. The Hop Limit field replaces the role of TTL, Next Header chain protocols and extensions, and Flow Label allows identifying flows for consistent treatment."
  },
  {
    "kind": "paragraph",
    "text": "The IPv4 header checksum was removed from the IPv6 base header, avoiding recalculation on each router. Router fragmentation has also been removed. These decisions transfer responsibilities to endpoints and auxiliary protocols. Neighbor Discovery replaces ARP functions and adds discovery of routers, prefixes and reachability."
  },
  {
    "kind": "paragraph",
    "text": "The abundance of addresses does not eliminate the need for planning. Prefixes should be hierarchical, documented and associated with safety zones. The gain is to avoid scarcity as central motivation and reduce dependence on NAT as a conservation mechanism, not in dispensing firewalls or controls."
  },
  {
    "kind": "subhead",
    "text": "Common Misconception"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 does not automatically make a network public or unsafe. Range depends on routing and policies. NAT is not synonymous with firewall, and absence of NAT does not mean absence of protection."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.14 IPv6 Address Notation and Normalization",
    "id": "notacao-e-normalizacao-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "An IPv6 address has 128 bits, usually written as eight groups of four hexadecimal digits separated by two points. Each group represents 16 bits. Hexadecimal reduces length compared to binary, but still produces extensive texts. Compression rules allow removing zeros to the left and replacing a continuous sequence of zero groups with ::."
  },
  {
    "kind": "paragraph",
    "text": "The abbreviation :: can appear only once, because the total length needs to remain deductible. 2001:0db8:0000:0000:021a:2bff:fe3c:4d5e can be written as 2001:db8::21a:2bff:fe3c:4d5e. The RFC 5952 recommends canonical form with lower case letters, zero suppression on the left, and compression of the longer zero sequence."
  },
  {
    "kind": "paragraph",
    "text": "Used IPv6 addresses with ports need brackets to eliminate ambiguity. A URL can be https://[2001:db8::25]:8443/. Without brackets, the two address points would be confused with the port separator. In logs and settings, normalization prevents the same address from appearing in different textual forms."
  },
  {
    "kind": "paragraph",
    "text": "Link-local addresses may require a zone identifier, such as fe80::1%eth0 or fe80::1%12, to indicate the interface. The same link-local address may exist in different links. The identifier is local to the node and should not be treated as an overall part of the address."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-06-ipv6-canonical-form.svg",
    "alt": "Full representation and canonical form of an IPv6 address",
    "caption": "Figure 6 — Full representation and canonical form of an IPv6 address."
  },
  {
    "kind": "subhead",
    "text": "Normalization and Membership Test with Python"
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
    "text": "3.15 IPv6 Address Types and Scopes",
    "id": "tipos-e-escopos-de-enderecos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "IPv6 defines unicast, anycast and multicast addresses. Unicast identifies an interface or logical point and delivers to a destination. Anycast uses unicast addresses assigned to multiple interfaces; routing delivers to one of them according to topology. Multicast delivers to a group and replaces various uses of broadcast."
  },
  {
    "kind": "paragraph",
    "text": "::/128 is the unspecified address and ::1/128 is loopback. fe80::/10 identifies local link and is created in IPv6 interfaces for communication in the link. Routers don't send local link between links. Local Unique Addresses use fc00::/7; in practice, locally assigned prefixes use fd00::/8 with pseudorandom identifier to reduce collisions."
  },
  {
    "kind": "paragraph",
    "text": "The track currently associated with global unicast is within 2000::/3. Global does not mean that every address is reachable via the Internet: firewalls, policies, and ads determine connectivity. 2001:db8::/32 is reserved for documentation. ff00::/8 contains multicast, with fields indicating flags and scope."
  },
  {
    "kind": "paragraph",
    "text": "The scope is decisive. A link-local address is suitable to find the local router, but not to configure a backend on another network. A ULA can be routed internally between sites if the organization plans it. A global address can be used internally and filtered on the edge. Choosing address only by textual appearance leads to errors."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-07-ipv6-address-scopes.svg",
    "alt": "Common IPv6 prefixes and their conceptual scopes",
    "caption": "Figure 7 — Common IPv6 prefixes and their conceptual scopes."
  },
  {
    "kind": "subhead",
    "text": "IPv6 Has No Broadcast"
  },
  {
    "kind": "paragraph",
    "text": "Discovery and ads use specific multicast groups. This reduces the need to interrupt all links, but requires correct support for ICMPv6 and local multicast."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.16 Neighbor Discovery, SLAAC, DAD, and DHCPv6",
    "id": "neighbor-discovery-slaac-dad-e-dhcpv6"
  },
  {
    "kind": "paragraph",
    "text": "Neighbor Discovery Protocol uses ICMPv6 to discover routers, resolve links layer addresses, detect neighborhood changes and verify reachability. Neighbor Request and Neighbor Advertisement replace ARP functions. Router Request allows you to request ads, and Router Advertisement informs prefixes, default router, flags and parameters like MTU."
  },
  {
    "kind": "paragraph",
    "text": "Stateless Address Autoconfiguration allows a host to form addresses from the announced prefixes. The interface identifier creation method can use stable or temporary values according to privacy and operating system; MAC should not be assumed to appear at the modern address. Before using an address, Duplicate Address Detection checks that it is already in use."
  },
  {
    "kind": "paragraph",
    "text": "Router Advertisement may indicate whether the host should use DHCPv6 for additional addresses or information. DHCPv6 can operate statefully or provide parameters without assigning address. The default IPv6 route usually comes from Router Advertisement, not from a DHCPv6 option equivalent to the standard DHCPv4 gateway. This difference surprises operators who try to block RA and rely only on DHCPv6."
  },
  {
    "kind": "paragraph",
    "text": "As NDP and SLAAC depend on ICMPv6, policies that indiscriminately block ICMPv6 cause address, neighborhood and MTU failures. Security shall apply specific filtering and mechanisms such as RA Guard on appropriate networks, preserving necessary messages."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-08-ipv6-neighbor-discovery.svg",
    "alt": "Router Advertisement, address formation, and Neighbor Discovery in IPv6",
    "caption": "Figure 8 — Router Advertisement, address formation, and Neighbor Discovery in IPv6."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Central messages of Neighbor Discovery.",
    "headers": [
      "Message",
      "Origin -> typical destination",
      "Function"
    ],
    "rows": [
      [
        "Router Request",
        "Host -> multicast routers",
        "Request a router advertisement"
      ],
      [
        "Router Advertisement",
        "Router -> hosts",
        "Inform prefixes, default route and parameters"
      ],
      [
        "Neighbor Request",
        "Host -> multicast/unicast",
        "Solve neighbor or check reachability"
      ],
      [
        "Neighbor Advertisement",
        "Neighbour -> requester",
        "Informs link address and state"
      ],
      [
        "Redirect",
        "Router -> host",
        "Indicates better next hop on link"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.17 IPv6 Prefix Planning",
    "id": "planejamento-de-prefixos-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "The IPv6 architecture widely uses a 64-bit border for subnets in LANs, especially for SLAAC. This leaves 64 bits for the interface identifier. The huge number of positions should not be interpreted as waste in the IPv4; the structure favors self-configuration, stability and hierarchy."
  },
  {
    "kind": "paragraph",
    "text": "Organizations usually receive an aggregate prefix and sub-divide it by region, environment, zone and segment. A /48 offers 65.536 subnet /64. A /56 offers 256 subnets /64. The plan should reserve bits in a predictable way, avoiding filling all the space without margin. The documentation must indicate the owner, function, route and policy of each block."
  },
  {
    "kind": "paragraph",
    "text": "There are exceptions. RFC 6164 recommends /127 in point-to-point router links in certain scenarios. Addresses /128 may represent loopbacks and services. You should not transport the IPv4 rule of 'less subnet possible' to all IPv6 LANs, or blindly apply /64 to any kind of link without observing the patterns."
  },
  {
    "kind": "paragraph",
    "text": "ULAs should use pseudorandom global identifier to reduce collisions when networks are interconnected. Choosing fd00:1::/48 in all companies recreates the problem of overlapping private IPv4. Global prefixes and ULAs can coexist, but address selection and DNS need to be planned to avoid unexpected paths."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Subdivision capacity IPv6 in units /64.",
    "headers": [
      "Prefix received",
      "Quantity of /64",
      "illustrative use"
    ],
    "rows": [
      [
        "/48",
        "65.536",
        "Organization or site with wide hierarchy"
      ],
      [
        "/52",
        "4.096",
        "Regional division or large environment"
      ],
      [
        "/56",
        "256",
        "Smaller site or common delegation"
      ],
      [
        "/60",
        "16",
        "Limited environment"
      ],
      [
        "/64",
        "1",
        "Typical LAN subnet with SLAAC"
      ],
      [
        "/127",
        "2 positions",
        "Point-to-point link conforming RFC 6164"
      ],
      [
        "/128",
        "1 address",
        "Host/loopback route"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.18 IPv4 and IPv6 Coexistence",
    "id": "coexistencia-ipv4-e-ipv6"
  },
  {
    "kind": "paragraph",
    "text": "The transition occurs through coexistence. In dual stack, interfaces and services have IPv4 and IPv6 connectivity. DNS can publish records A and AAAA. The customer chooses a family according to policy, availability and performance. Operating dual stack means maintaining two routing surfaces, firewall, observability and throubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "Happy Eyeballs reduces the delay when a family is configured, but the path is degraded. The algorithm initiates coordinated attempts and uses the connection that becomes appropriate first, preventing a broken IPv6 from forcing long timeouts before fallback. As a consequence, an IPv6 defect can remain hidden because users observe success via IPv4."
  },
  {
    "kind": "paragraph",
    "text": "NAT64 allows IPv6 clients to reach servers IPv4 per translation, usually in conjunction with DNS64, which synthesizes AAAA responses from records When appropriate. Applications that carry literal addresses, depend on IPv4 on payload or validate families rigidly may fail. Application proxies can also end one family and start another."
  },
  {
    "kind": "paragraph",
    "text": "When publishing an API in dual stack, tests need to confirm TLS, allowlists, WAF, rate limiting and logs in both families. A policy that allows only the partner IPv4 does not cover your IPv6 output. DNS split-horizon can return different combinations within and outside the network."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-09-dual-stack.svg",
    "alt": "A dual-stack client can choose between A and AAAA addresses",
    "caption": "Figure 9 — A dual-stack client can choose between A and AAAA addresses."
  },
  {
    "kind": "subhead",
    "text": "Dual-Stack Diagnostics"
  },
  {
    "kind": "paragraph",
    "text": "Test explicitly curl -4 and curl -6. Generic success does not show that both families work; it can only show that the selection mechanism has avoided the faulty path."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.19 Addressing in API Gateway Architectures",
    "id": "enderecamento-em-arquiteturas-de-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "A API Gateway may have public, private or both endpoints depending on the platform and the tier. The address presented to the consumer may belong to a previous WAF, CDN, Application Gateway or load balancer. The gateway receives a connection whose source IP is often the last proxy. Preserving logical origin requires headers built by trusted components or supported proxy protocols."
  },
  {
    "kind": "paragraph",
    "text": "On the backend side, the gateway resolves the hostname according to the DNS available on your network. If backend has private endpoint, the public name usually needs to resolve to a private address by a private DNS zone or equivalent configuration. Solving for the public address when the intention was private can cause blocking, hairpin, cost or improper exposure."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, virtual network options and private endpoint depend on the tier and mode. An inbound private endpoint assigns a VNet address to private access and requires DNS to map the hostname for this address. Output integration allows you to achieve isolated backends. These two directions are different: making private input does not automatically guarantee that the gateway has a private route for all backend."
  },
  {
    "kind": "paragraph",
    "text": "In applets and gateways on-premises, interfaces can be separated by zones, VLANs and routes. The listener may be in a DMZ and backend in an internal network. Static routes, firewalls and NAT need to consider both directions. Clusters require distinguishing Administration IP, traffic IP, virtual address and instances addresses."
  },
  {
    "kind": "paragraph",
    "text": "Allowlist based on IP needs to consider effective origin. If gateway uses SNAT, backend allows gateway output addresses, not individual consumers. If the platform scale or change addresses, using incomplete list creates intermittence. Managed services can publish tracks or offer private integration to reduce dependency on variable public IPs."
  },
  {
    "kind": "paragraph",
    "text": "The socket address and the value of X-Forwarded-For have different purposes. Logs must record both with indication of trust and chain. Security policies should accept headers only from authorized proxies, overwriting external values. Geolocation or rate limiting by IP become approximate when many consumers share NAT."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/ip-addressing/en/figure-10-api-addressing-chain.svg",
    "alt": "Each hop can resolve, route, and translate addresses independently",
    "caption": "Figure 10 — Each hop can resolve, route, and translate addresses independently."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Address observation points in an API chain.",
    "headers": [
      "Element",
      "Address noted",
      "Architecture issue"
    ],
    "rows": [
      [
        "Consumer",
        "Local IP and resolved destination",
        "A/AAAA correct? Route and proxy?"
      ],
      [
        "WAF/Load Balancer",
        "Consumer IP or previous NAT",
        "Preserve source reliably?"
      ],
      [
        "API Gateway inbound",
        "Previous proxy IP",
        "Listener public/private and allowlist"
      ],
      [
        "API Gateway outbound",
        "Output IP/SNAT",
        "Backend allows this origin?"
      ],
      [
        "Backend",
        "Gateway IP or translator",
        "Return, logs and trust in headers"
      ],
      [
        "Private DNS",
        "Private IP service",
        "Linked zone and gateway resolution?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.20 Addressing and Routing Troubleshooting",
    "id": "troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The investigation begins by registering origin, nominal destination, resolved addresses, IP family, interface prefix, route table and next hop. Just saying 'do not connect to the server' omits information that determines the path. Compare the result in the client, gateway and a machine of the same subnet backend."
  },
  {
    "kind": "paragraph",
    "text": "Resolution tools show records and consulted servers. dig and nslookup show A and AAAA; Solve-DnsName provides equivalent information in Windows. Local cache, hosts file, corporate DNS and split-horizon can produce different responses. See the name from the same gateway execution environment, not just from the engineer's notebook."
  },
  {
    "kind": "paragraph",
    "text": "ip addr, ip route and ip neigh display addresses, routes and neighbors on Linux. On Windows, Get-NetIPAddress, Get-NetRoute and Get-NetNighbor perform similar function. traceroute or tracert suggest jumps, but depend on ICMP and policies and do not prove the complete path of a TCP connection. tracepath helps to observe MTU in some systems."
  },
  {
    "kind": "paragraph",
    "text": "Captures show real destination, TTL/Hop Limit, ICMP, ARP or NDP and relays. If the host sends ARP to a destination that should use gateway, the mask may be too wide. Sends to the gateway but gets no return, investigate route and politics ahead. In IPv6, Neighbor Request without Advertisement suggests local link problem or address."
  },
  {
    "kind": "paragraph",
    "text": "Clouds provide effective routes, flow logs, troubleshoot connection and private endpoint diagnostics. These tools need to be correlated with DNS configuration. A literal address test can work while the name solves incorrectly, or vice versa by SNI and certificate. Always test the path the application actually uses."
  },
  {
    "kind": "subhead",
    "text": "Observation Commands — Use Only in Authorized Environments"
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
    "caption": "Table 8 - Common symptoms and initial lines of investigation.",
    "headers": [
      "Symptoms",
      "Net hypotheses",
      "Useful evidence"
    ],
    "rows": [
      [
        "Name solves incorrect IP",
        "DNS split, cache, missing private zone",
        "dig/Resolve-DnsName in the same environment"
      ],
      [
        "No route to host",
        "Absent route, next hop, local policy",
        "Route table and ICMP"
      ],
      [
        "Works by IP, fails by name",
        "DNS, SNI, certificate, proxy",
        "Curl -v and resolution"
      ],
      [
        "IPv4, IPv6 failure",
        "Route v6, RA, firewall, DNS AAAA",
        "Curl -4/-6, ip -6 route"
      ],
      [
        "Small packets work",
        "MTU/PMTUD, ICMP locked",
        "Tracepath, catch, Packet Too Big"
      ],
      [
        "Backend sees unexpected origin",
        "NAT, proxy, SNAT",
        "Hops capture and logs"
      ],
      [
        "Return only fails",
        "Asymmetria, stateful firewall",
        "routes on both sides and flow logs"
      ],
      [
        "Part of IPs works",
        "DNS with multiple A/AAAA, allowlist partial",
        "test each address and logs"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3.21 Case Studies",
    "id": "estudos-de-caso"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 — A Private Backend Resolves to a Public Address"
  },
  {
    "kind": "paragraph",
    "text": "A gateway integrated into the private network calls backend. The hostname has a public endpoint and private endpoint, but the private DNS zone is not linked to the gateway network. The resolution returns the public address. The firewall of backend blocks public origin and the gateway records connection timeout or 403 in the edge service."
  },
  {
    "kind": "paragraph",
    "text": "The test performed by an administrator on a VM of another VNet works because that VNet has the right zone. The investigation should compare the resolution within the gateway runtime. The correction is to align private DNS, zone bond and route; add the public IP to allowlist just bypass the intended design and can expand exposure."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 — Different Masks on the Same Segment"
  },
  {
    "kind": "paragraph",
    "text": "The gateway 192.168.50.10/24 needs to reach appliance 192.168.51.20/23. For appliance, the two addresses belong to the same /23 and he tries to answer directly for ARP. For the gateway, 192.168.51.20 is out of the /24 and the request follows the router. The sides have different perceptions of the link."
  },
  {
    "kind": "paragraph",
    "text": "The capture shows request reaching appliance and ARP for 192.168.50.10 no response in the expected segment. Correction is to make prefixes coherent or adjust routing/topology. Creating firewall exceptions does not solve a subnet disagreement."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 — The Allowlist Covers Only One Gateway Address"
  },
  {
    "kind": "paragraph",
    "text": "A gateway managed service has multiple output addresses. The backend allows only one of them. Calls work when the connection uses the allowed IP and fail when the platform selects another address. The symptom seems random and increases after scale or maintenance."
  },
  {
    "kind": "paragraph",
    "text": "The backend logs show attempts from different sources. The solution is to use the complete official list, private integration or service identity mechanism, depending on the platform. Setting a rule at an occasionally observed address is not a stable strategy."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 — Broken IPv6 Hidden by Happy Eyeballs"
  },
  {
    "kind": "paragraph",
    "text": "The API publishes A and AAAA. Modern users access normally because the client tries IPv6, notices delay and uses IPv4. Monitors that force IPv6 fail. The organization believes that dual stack is healthy because the common experience does not present unavailability."
  },
  {
    "kind": "paragraph",
    "text": "Separate tests reveal absence of IPv6 return route in a firewall. Correction includes route, rules and family monitoring. Happy Eyeballs improves experience, but does not replace explicit observability."
  },
  {
    "kind": "subhead",
    "text": "Operational Principle"
  },
  {
    "kind": "paragraph",
    "text": "In connectivity issues, write the full chain of addresses before and after DNS, balancing and NAT. The logical application topology does not replace the effective path of packets."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observation Labs",
    "id": "laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "The exercises below shall be performed only on an authorised development machine or environment. They don't require net sweep. The objective is to observe the configuration itself, calculate documentation prefixes and compare IP families in a controlled service."
  },
  {
    "kind": "paragraph",
    "text": "Register the results in a table with time, interface, address, prefix, gateway, chosen route and response. The value of the laboratory is to relate the theoretical prediction to the evidence, not just execute commands."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "List machine addresses and prefixes. Identify loopback, LAN address, link-local and IPv6 when available.",
      "Choose an authorized destination and use the route get command to predict interface and next hop. Compare with capture or traceroute.",
      "Manually calculate 192.0.2.77/27 and validate with Python ipaddress. Register network, broadcast and host track.",
      "Divide 198.51.100.0/24 into four /26 and then summarize the first two networks.",
      "Solve A and AAAA of a hostname under your control. Test separately with curl -4 and curl -6.",
      "Observe ARP/neighbor table before and after accessing an authorized local host. In IPv6, identify link-local addresses.",
      "In a local laboratory, set up a 127.0.0.1 service and check that it is not reachable by another host.",
      "Use a local HTTP server with bind in 127.0.0.1 and then in 0.0.0.0. Compare listeners, maintaining adequate firewall and authorization.",
      "Make a filtered capture of an IPv4 attempt and an IPv6. Compare TTL/Hop Limit, ARP/NDP and headers.",
      "Document a fictitious API path using the documentation blocks: consumer, WAF, gateway and backend, including routes and translations."
    ]
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
      "IP offers forwarding datagrams by addresses and does not guarantee end-to-end reliability.",
      "Name, address and route answer different questions; DNS does not replace routing.",
      "IPv4 has 32 bits; masks and CIDR separate prefix and positions within the subnet.",
      "The subnet calculation depends on binary borders, not the historical class of the address.",
      "VLSM allows different sizes; summarization requires contiguous blocks and coherent property.",
      "/31 and /32 are important exceptions to the traditional host rule minus two.",
      "Private blocks are not globally routable but are not a safety mechanism.",
      "NAT changes the observed origin and creates status; proxy headers are only trusted in controlled chain.",
      "Routers choose the longest corresponding prefix; the default route is only the last feature.",
      "The return path and symmetry matter to firewalls, NATs and stateful balancers.",
      "MTU and ICMP are essential; blocking required messages can create selective failures.",
      "IPv6 has 128 bits, simplified base header, scope addresses and does not use broadcast.",
      "Neighbor Discovery, Router Advertisement, SLAAC and DAD depend on ICMPv6.",
      "Dual stack requires operation and monitoring of two families; Happy Eyeballs can hide one of them broken.",
      "In gateways, inbound address, outbound address, private DNS, SNAT and origin headers should be treated separately."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "API Diagnostic Checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Which hostname the application uses and which records Does it return to the gateway environment?",
      "What destination address was actually used?",
      "Which prefix is configured in the source interface?",
      "Which route wins by longest prefix match and what's the next hop?",
      "Is destination considered on-link or sent to gateway?",
      "Is there a return route to the source address after translation?",
      "There's NAT/SNAT and what address does the backend observe?",
      "Firewalls and allowlists cover all necessary addresses and families?",
      "Is there overlap between local networks, VPNs, VNets or partners?",
      "Does the problem occur only with an IP family?",
      "ICMP/ICMPv6 required for PMTUD and NDP is allowed?",
      "Does failure depend on the size of the packet, certificate or response?",
      "Does the private endpoint have correct private DNS and connection to the gateway network?",
      "Is X-Forwarded-For overwritten by trusted proxy or can it be sent by the consumer?",
      "Logs, capture and routes were collected at the same time and in both directions?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Review Exercises",
    "id": "exercicios"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Differentiate name, address, interface, prefix and route.",
      "Convert the last octet of the mask /27 to binary and decimal.",
      "Calculate network, broadcast and host range of 10.20.30.150/25.",
      "How many addresses are there in /22 and how many subnets /26 fit in it?",
      "Explain why classes A, B and C should not be used to infer the modern mask.",
      "Show how 10.40.0.0/24 to 10.40.3.0/24 can be summarized.",
      "Why can an RFC 1918 overlap break a VPN?",
      "Explain the exceptions of /31 and /32.",
      "Differentiate 10.0.0.0/8, 100.64.0.0/10 and 127.0.0.0/8.",
      "Why doesn't private address equal the secure network?",
      "Explain longest prefix match with standard route, /8, /16 and /24.",
      "How does asymmetric routing affect stateful firewalls?",
      "Compare IPv4 and IPv6 fragmentation.",
      "Convert 2001:0db8:0000:0000:0000:0000:0000:0025 to canonical form.",
      "Differentiate global unicast, ULA and IPv6 link-local.",
      "What NDP functions do you offer besides solving neighbors?",
      "Why doesn't DHCPv6 necessarily replace Router Advertisement?",
      "What does it solve and what can it hide?",
      "Why does an inbound private endpoint not guarantee private gateway access to backend?",
      "How to safely validate the original consumer IP behind proxies?"
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
      "A gateway solves api-interna.exemplo to 10.50.20.10, but route get points to the Internet. Describe hypotheses and corrections.",
      "The API works by 198.51.100.25, but fails by hostname. List the layers and tests still needed.",
      "Small calls work, but answers with certificate or larger headers expire on VPN. Propose MTU investigation.",
      "A partner sends requests by NAT and all users appear with the same IP. Discuss impacts on rate limiting and auditing.",
      "An API dual stack works for browsers, but the IPv6 monitor fails. Show how Happy Eyeballs influences perception."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Suggested Answers"
  },
  {
    "kind": "paragraph",
    "text": "The calculations shall demonstrate the binary border. For 10.20.30.150/25, the mask is 255.255.255.128, the block starts at 128, the network is 10.20.30.128, the broadcast is 10.20.30.255 and the traditional range ranges from .129 to .254. A /22 contains 1.024 addresses and can be divided into sixteen /26."
  },
  {
    "kind": "paragraph",
    "text": "In summarization, 10.40.0.0/24 to 10.40.3.0/24 share the first 22 bits and form 10.40.0.0/22. Longest prefix match selects the largest corresponding prefix, regardless of a default route also matches."
  },
  {
    "kind": "paragraph",
    "text": "In scenarios, strong responses separate DNS, route, policy and application. Run by non-valid IP hostname, SNI or certificate. Size problems suggest MTU/PMTUD, but they need capture and ICMP. Original IP in headers must be built by trusted proxies, never accepted directly from the consumer."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Table 9 - Essential terms of the chapter.",
    "headers": [
      "Term",
      "Concise definition"
    ],
    "rows": [
      [
        "A record",
        "DNS record that associates a name with an IPv4 address."
      ],
      [
        "AAAA record",
        "DNS record that associates a name with an IPv6 address."
      ],
      [
        "Anycast",
        "The same address announced or assigned at multiple locations; routing chooses one of them."
      ],
      [
        "Broadcast",
        "IPv4 delivery to every node in a defined domain; it does not exist in IPv6."
      ],
      [
        "CIDR",
        "Classless notation and strategy based on prefix length."
      ],
      [
        "DAD",
        "IPv6 Duplicate Address Detection."
      ],
      [
        "Default route",
        "The /0 route used when no more-specific route matches."
      ],
      [
        "Dual stack",
        "Simultaneous operation of IPv4 and IPv6."
      ],
      [
        "Default gateway",
        "The next hop for destinations without a more-specific route."
      ],
      [
        "Global unicast",
        "An IPv6 unicast address that can have global reach according to routing."
      ],
      [
        "ICMP",
        "Control and error messaging protocol associated with IP."
      ],
      [
        "Interface",
        "Logical or physical point to which addresses and routes are associated."
      ],
      [
        "Link-local",
        "Address valid only on the local link."
      ],
      [
        "Longest prefix match",
        "Selection of the most-specific matching route."
      ],
      [
        "MTU",
        "The largest unit a link carries without fragmentation."
      ],
      [
        "NAT/PAT",
        "Translation of addresses and, often, ports."
      ],
      [
        "NDP",
        "IPv6 Neighbor Discovery Protocol."
      ],
      [
        "Prefix",
        "Initial set of bits that identifies a network."
      ],
      [
        "Private endpoint",
        "Private interface or address that exposes a managed service inside a virtual network."
      ],
      [
        "RA",
        "Router Advertisement used to announce a router and IPv6 parameters."
      ],
      [
        "SLAAC",
        "Stateless autoconfiguration of an IPv6 address."
      ],
      [
        "ULA",
        "IPv6 Unique Local Address intended for internal use."
      ],
      [
        "VLSM",
        "Use of variable-length masks within the same addressing plan."
      ],
      [
        "Zone identifier",
        "Local interface identifier used with limited-scope IPv6 addresses."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official References and Recommended Reading",
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
    "text": "RFC 6890 - Special-Purpose IP Address Records: https://www.rfc-editor.org/rfc/rfc6890"
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
    "text": "Recommended Reading Order"
  },
  {
    "kind": "paragraph",
    "text": "Read RFC 4632 and RFC 1918 to consolidate corporate IPv4. Then use RFC 8200, RFC 4291 and RFC 5952 as IPv6 base. Then proceed to NDP/SLAAC and consult the IANA records whenever you find a special block."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Closing",
    "id": "encerramento"
  },
  {
    "kind": "paragraph",
    "text": "Addressing and routing form the structure that allows transportation to achieve processes. The prefix determines belonging, the route table chooses the next hop and translations can change the observed identity. IPv4 and IPv6 use common principles, but differ in format, scope, self-configuration and fragmentation treatment."
  },
  {
    "kind": "paragraph",
    "text": "In the next chapter, the study will advance to DNS, NAT, proxies and load balancers. These components transform names and paths into high availability architectures and explain why a single URL can represent dozens of addresses, regions and instances."
  }
];
