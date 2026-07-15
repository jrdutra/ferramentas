import { ArticleDeepDive } from './tool-article.model';

export const NETWORK_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  'ipv4-cidr-subnet-range-calculation-guide': {
    readingTime: '32 min read',
    deepDiveSections: [
      {
        title: 'How IP emerged and why the protocol is called IPv4',
        paragraphs: [
          'Early packet networks could move data inside their own systems, but connecting heterogeneous networks required a common layer above each local technology. The Internet Protocol was created to carry datagrams from a source to a destination through gateways, now called routers. RFC 760 states that its 1980 text was based on five earlier editions of the ARPA Internet Protocol specification; RFC 791 then standardized the familiar September 1981 design.',
          'The first four bits of an IP header are the Version field. RFC 760 and RFC 791 both state that their header format is version 4. This is the precise origin of “IPv4”: receivers see the value 4 and interpret the remaining header accordingly. The number reflects protocol-format evolution during the research process, not four generations of the public Internet.',
          'Version number 5 was later associated with the experimental Internet Stream Protocol, whose ST-II specification says that ST uses IP Version Number 5. It did not replace IPv4. The standardized successor was named IPv6; RFC 8200 describes IPv6 as the successor to IPv4 and expands addresses from 32 to 128 bits.'
        ],
        table: {
          caption: 'Selected milestones in IP addressing',
          headers: ['Date', 'Document', 'Importance'],
          rows: [
            ['January 1980', 'RFC 760', 'DoD Internet Protocol specification describing version 4'],
            ['September 1981', 'RFC 791', 'Foundational IPv4 specification with 32-bit addresses'],
            ['August 1985', 'RFC 950', 'Standardized address masks and subnetting'],
            ['September 1993', 'RFC 1519', 'Introduced the CIDR assignment and aggregation strategy'],
            ['February 1996', 'RFC 1918', 'Reserved three address blocks for private internets'],
            ['December 2000', 'RFC 3021', 'Standardized /31 use on point-to-point links'],
            ['August 2006', 'RFC 4632', 'Current CIDR address assignment and aggregation plan'],
            ['July 2017', 'RFC 8200', 'Current base IPv6 specification']
          ]
        }
      },
      {
        title: 'What IP does — and what it intentionally does not do',
        paragraphs: [
          'IPv4 is a network-layer, connectionless datagram protocol. A sender places a source address, destination address and upper-layer protocol identifier in a header, and routers independently forward the datagram toward the destination. Each router may select a next hop from its routing table; the path is not reserved in advance.',
          'RFC 791 does not promise reliability, acknowledgements, retransmission, ordering or flow control. A datagram may be lost, duplicated, delayed or delivered out of order. TCP can provide an ordered reliable byte stream above IP, while UDP exposes a lightweight datagram service. Separating these responsibilities allowed the same IP layer to support many applications and link technologies.'
        ],
        items: [
          { name: 'Address', description: 'Identifies the source and destination used by the network layer.' },
          { name: 'Prefix', description: 'Identifies a contiguous block used for routing and subnet membership.' },
          { name: 'Route', description: 'Describes how a router should forward traffic toward a destination prefix.' },
          { name: 'Datagram', description: 'The complete IPv4 header and its carried upper-layer data.' },
          { name: 'Time to Live', description: 'A field reduced by routers so forwarding loops cannot circulate a datagram forever.' }
        ]
      },
      {
        title: 'Bits, octets and the meaning of 0 through 255',
        paragraphs: [
          'A bit has two states, conventionally written 0 and 1. Eight bits form an octet, so an octet has 2^8, or 256, distinct patterns. Numbering begins at zero; consequently the smallest value is 0 and the largest is 255. Saying that an IPv4 octet “goes to 256” is a common off-by-one mistake: 256 is the count of possible values, not a representable eight-bit value.',
          'IPv4 concatenates four octets into one 32-bit unsigned number. The address 192.168.1.10 is therefore shorthand for four binary groups. Periods are display separators and consume no bits in the address. A router can treat the complete address as one number or compare its most-significant bits against a prefix.'
        ],
        table: {
          caption: 'The eight positions in one IPv4 octet',
          headers: ['Bit position', '7', '6', '5', '4', '3', '2', '1', '0'],
          rows: [
            ['Power of two', '2^7', '2^6', '2^5', '2^4', '2^3', '2^2', '2^1', '2^0'],
            ['Decimal weight', '128', '64', '32', '16', '8', '4', '2', '1'],
            ['All bits set', '128', '64', '32', '16', '8', '4', '2', '1'],
            ['Running total', '128', '192', '224', '240', '248', '252', '254', '255']
          ]
        }
      },
      {
        title: 'Dotted decimal is only a human-readable projection',
        paragraphs: [
          'Each decimal octet can be converted by adding the weights of its one bits. Decimal 192 equals 128 + 64, so its binary form is 11000000. Decimal 168 equals 128 + 32 + 8, producing 10101000. Decimal 10 equals 8 + 2, producing 00001010.',
          'For example, 192.168.1.10 becomes 11000000.10101000.00000001.00001010. Keeping leading zeroes in the binary view is essential because every octet always occupies eight positions. Decimal notation may omit those zeroes; the underlying address cannot.'
        ],
        table: {
          caption: 'Binary expansion of 192.168.1.10',
          headers: ['Decimal octet', 'Binary octet', 'Selected weights'],
          rows: [
            ['192', '11000000', '128 + 64'],
            ['168', '10101000', '128 + 32 + 8'],
            ['1', '00000001', '1'],
            ['10', '00001010', '8 + 2']
          ]
        }
      },
      {
        title: 'From classful networks to subnet masks',
        paragraphs: [
          'RFC 791 originally described class A, B and C unicast formats. Their leading bits implied a fixed network length: class A used an /8-style boundary, class B /16 and class C /24. Class D became multicast and class E was reserved. This was easy to infer from an address but offered only a few allocation sizes.',
          'The classful model wasted space. An organization too large for one class C block could be assigned a class B block containing 65,536 addresses even when it needed only a few thousand. RFC 950 introduced subnet masks so an organization could divide its assigned network internally, but global allocation and routing still needed a classless solution.',
          'Class terminology remains useful for history and appears in old documentation, yet RFC 1812 calls the distinction among class A, B and C no longer important. Modern routing uses an explicit prefix length, not an inferred class.'
        ],
        table: {
          caption: 'Historical classful IPv4 formats',
          headers: ['Class', 'Leading bits', 'Historical boundary', 'Historical purpose'],
          rows: [
            ['A', '0', '/8', 'Very large unicast networks'],
            ['B', '10', '/16', 'Medium unicast networks'],
            ['C', '110', '/24', 'Smaller unicast networks'],
            ['D', '1110', 'No network/host split', 'Multicast groups'],
            ['E', '1111', 'No network/host split', 'Reserved or experimental space']
          ]
        }
      },
      {
        title: 'Why CIDR was necessary',
        paragraphs: [
          'By the early 1990s the Internet faced rapid depletion of class B network numbers, explosive growth in global routing tables and eventual exhaustion of the 32-bit address space. RFC 1519 introduced Classless Inter-Domain Routing in 1993 as a short-to-medium-term response. RFC 4632 later replaced it with the current address assignment and aggregation plan.',
          'CIDR makes the network length explicit with slash notation. The value after the slash ranges from 0 through 32 and counts significant high-order bits. 192.168.6.0/24 fixes the first 24 bits. 192.168.4.0/22 fixes only 22, so it covers four adjacent /24 networks.',
          'Because prefixes may be allocated in topology-aligned blocks, an upstream provider can advertise one aggregate instead of many customer routes. This is route summarization: fewer routing-table entries describe the same reachable address space, provided that the component networks are contiguous and correctly aligned.'
        ]
      },
      {
        title: 'Subnet masks, wildcard masks and prefix arithmetic',
        paragraphs: [
          'A subnet mask is a 32-bit value containing p consecutive ones followed by 32 - p zeroes. The ones preserve network bits and the zeroes identify host positions. A bitwise AND between an address and its mask therefore produces the network address.',
          'A wildcard mask is the bitwise complement of the subnet mask: every one becomes zero and every zero becomes one. It directly shows the range of host variation. For /22 the subnet mask is 255.255.252.0 and the wildcard is 0.0.3.255.',
          'The address count is 2^(32-p). For traditional prefixes through /30, the commonly usable host count is that result minus two. A block boundary is always a multiple of its block size in the 32-bit address space; this alignment rule is why arbitrary start and end values cannot be expressed as one CIDR prefix.'
        ],
        table: {
          caption: 'Common IPv4 CIDR prefixes and block sizes',
          headers: ['Prefix', 'Subnet mask', 'Host bits', 'Total addresses', 'Traditional usable hosts'],
          rows: [
            ['/8', '255.0.0.0', '24', '16,777,216', '16,777,214'],
            ['/12', '255.240.0.0', '20', '1,048,576', '1,048,574'],
            ['/16', '255.255.0.0', '16', '65,536', '65,534'],
            ['/20', '255.255.240.0', '12', '4,096', '4,094'],
            ['/21', '255.255.248.0', '11', '2,048', '2,046'],
            ['/22', '255.255.252.0', '10', '1,024', '1,022'],
            ['/23', '255.255.254.0', '9', '512', '510'],
            ['/24', '255.255.255.0', '8', '256', '254'],
            ['/25', '255.255.255.128', '7', '128', '126'],
            ['/26', '255.255.255.192', '6', '64', '62'],
            ['/27', '255.255.255.224', '5', '32', '30'],
            ['/28', '255.255.255.240', '4', '16', '14'],
            ['/29', '255.255.255.248', '3', '8', '6'],
            ['/30', '255.255.255.252', '2', '4', '2'],
            ['/31', '255.255.255.254', '1', '2', '2 on point-to-point links'],
            ['/32', '255.255.255.255', '0', '1', '1 host route']
          ]
        }
      },
      {
        title: 'Worked example: calculating 192.168.6.130/24',
        paragraphs: [
          'A /24 fixes the first three octets and leaves eight host bits. The mask is 255.255.255.0. Applying it to 192.168.6.130 preserves 192.168.6 and clears the final octet, so the network address is 192.168.6.0.',
          'Eight host bits provide 2^8 = 256 addresses. Setting all host bits to one makes the last octet 255, so the broadcast address is 192.168.6.255. Under traditional subnet semantics, usable hosts run from 192.168.6.1 through 192.168.6.254, a total of 254.',
          'The important detail is that /24 does not mean “the last number may reach 256.” It means that 24 bits are fixed and the remaining eight can form 256 patterns numbered 0 through 255.'
        ],
        table: {
          caption: '192.168.6.130/24 result',
          headers: ['Property', 'Value'],
          rows: [
            ['Subnet mask', '255.255.255.0'],
            ['Wildcard mask', '0.0.0.255'],
            ['Network address', '192.168.6.0'],
            ['Broadcast address', '192.168.6.255'],
            ['Usable range', '192.168.6.1 – 192.168.6.254'],
            ['Total / usable', '256 / 254']
          ]
        }
      },
      {
        title: 'Worked example: why 192.168.6.130/22 begins at 192.168.4.0',
        paragraphs: [
          'A /22 leaves ten host bits and contains 2^10 = 1,024 addresses. Its mask is 255.255.252.0. In the third octet, decimal 252 is binary 11111100, so the final two bits of that octet belong to the host portion together with all eight bits of the fourth octet.',
          'Two host bits in the third octet create groups of four: 0–3, 4–7, 8–11 and so on. The input third octet is 6, which falls in the 4–7 group. Clearing the host bits gives 4 and setting them gives 7. The fourth octet ranges from 0 through 255.',
          'Therefore the complete block is 192.168.4.0 through 192.168.7.255. The traditional usable host range is 192.168.4.1 through 192.168.7.254. This crossing of dotted-decimal boundaries is exactly why memorizing only /24 behavior is insufficient.'
        ],
        table: {
          caption: '192.168.6.130/22 result',
          headers: ['Property', 'Value'],
          rows: [
            ['Subnet mask', '255.255.252.0'],
            ['Wildcard mask', '0.0.3.255'],
            ['Third-octet block size', '4'],
            ['Network address', '192.168.4.0'],
            ['Broadcast address', '192.168.7.255'],
            ['Usable range', '192.168.4.1 – 192.168.7.254'],
            ['Total / usable', '1,024 / 1,022']
          ]
        }
      },
      {
        title: 'The special meanings of network, broadcast, /31 and /32',
        paragraphs: [
          'In conventional IPv4 subnetting, an all-zero host field denotes the network itself and an all-one host field denotes the directed broadcast. These conventions explain the familiar subtraction of two addresses from a subnet. The limited broadcast 255.255.255.255 is a separate special destination restricted to the local network.',
          'A point-to-point link has exactly two endpoints and no meaningful set of additional hosts to broadcast to. RFC 3021 therefore requires both addresses of a /31 to be interpreted as host addresses on such a link, halving the address consumption compared with /30. A /32 has no host bits and represents exactly one address, commonly called a host route.',
          'A calculator can display the numerical low and high endpoints for every prefix, but operational meaning still depends on context. /31 semantics apply to point-to-point links, and broadcast behavior can be restricted by router policy for security reasons.'
        ]
      },
      {
        title: 'Private, shared and special-purpose address ranges',
        paragraphs: [
          'Not every syntactically valid IPv4 address is globally reachable unicast space. RFC 1918 reserves three blocks for private internets. Organizations can reuse them without coordinating with IANA, but the addresses are not globally unique and should not be routed across inter-enterprise links.',
          'IANA maintains the authoritative special-purpose registry. It includes loopback, link-local, shared carrier-grade NAT space, documentation blocks, benchmarking ranges, multicast and reserved space. A CIDR calculation tells you the mathematical boundaries; it does not by itself tell you whether a block is public, private, forwardable or appropriate for a particular purpose.'
        ],
        table: {
          caption: 'Frequently encountered IPv4 special ranges',
          headers: ['Range', 'Purpose', 'Key caution'],
          rows: [
            ['10.0.0.0/8', 'RFC 1918 private use', 'Not globally reachable'],
            ['172.16.0.0/12', 'RFC 1918 private use', 'Only 172.16 through 172.31 are private'],
            ['192.168.0.0/16', 'RFC 1918 private use', 'Common in home and enterprise LANs'],
            ['100.64.0.0/10', 'Shared address space', 'Used for carrier-grade NAT; not ordinary RFC 1918 space'],
            ['127.0.0.0/8', 'Loopback', 'Must not appear outside a host'],
            ['169.254.0.0/16', 'IPv4 link-local', 'Not forwarded beyond the local link'],
            ['192.0.2.0/24', 'TEST-NET-1 documentation', 'Use in examples, not public operation'],
            ['198.51.100.0/24', 'TEST-NET-2 documentation', 'Use in examples, not public operation'],
            ['203.0.113.0/24', 'TEST-NET-3 documentation', 'Use in examples, not public operation'],
            ['224.0.0.0/4', 'Multicast', 'Identifies groups rather than unicast hosts'],
            ['255.255.255.255/32', 'Limited broadcast', 'Must not be routed beyond the local network']
          ]
        }
      },
      {
        title: 'Longest-prefix matching and route aggregation',
        paragraphs: [
          'A destination may match several routes. For example, 192.168.6.130 matches 0.0.0.0/0, 192.168.0.0/16 and 192.168.6.0/24. A router chooses the matching route with the greatest prefix length because it is the most specific description of the destination. The /24 wins over /16 and /0.',
          'Aggregation works in the opposite direction: several aligned, contiguous specific prefixes can be represented by a shorter common prefix. Four /24 networks from 192.168.4.0/24 through 192.168.7.0/24 aggregate into 192.168.4.0/22. An apparently similar set beginning at 192.168.5.0 cannot form one /22 because the start is not aligned to a four-/24 boundary.',
          'More-specific routes can intentionally override an aggregate, but they also create security and stability concerns when advertised incorrectly. Prefix filters, route-origin authorization and careful address planning matter because routing follows the most specific accepted route.'
        ]
      },
      {
        title: 'Subnet planning, VLSM and common mistakes',
        paragraphs: [
          'Variable Length Subnet Masking allocates different prefix sizes according to actual need. A practical plan usually places the largest subnets first, aligns each allocation to its block size, reserves room for growth and documents infrastructure addresses. Every child prefix must remain inside its parent and must not overlap another child.',
          'Common failures include confusing address count with usable host count, treating every 172.x.x.x address as private, entering a non-contiguous mask, forgetting /31 semantics, choosing an unaligned network boundary and assuming that a mathematically valid range is globally routable. Another frequent mistake is using decimal intuition without checking which bits cross an octet boundary.',
          'The utily.tools IPv4 CIDR Range Calculator exposes the network, broadcast, usable endpoints, subnet mask, wildcard mask and counts together. Use those results as a verification aid, then apply the operational rules of the network where the block will be deployed.'
        ]
      }
    ],
    references: [
      { title: 'RFC 760: DoD Standard Internet Protocol', url: 'https://www.rfc-editor.org/info/rfc760', publisher: 'RFC Editor / DARPA' },
      { title: 'RFC 791: Internet Protocol', url: 'https://www.rfc-editor.org/info/rfc791', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 950: Internet Standard Subnetting Procedure', url: 'https://www.rfc-editor.org/info/rfc950', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1519: Classless Inter-Domain Routing', url: 'https://www.rfc-editor.org/info/rfc1519', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 4632: CIDR Address Assignment and Aggregation Plan', url: 'https://www.rfc-editor.org/info/rfc4632', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1918: Address Allocation for Private Internets', url: 'https://www.rfc-editor.org/info/rfc1918', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1812: Requirements for IP Version 4 Routers', url: 'https://www.rfc-editor.org/info/rfc1812', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 3021: Using 31-Bit Prefixes on IPv4 Point-to-Point Links', url: 'https://www.rfc-editor.org/info/rfc3021', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 5737: IPv4 Address Blocks for Documentation', url: 'https://www.rfc-editor.org/info/rfc5737', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 8200: Internet Protocol, Version 6 Specification', url: 'https://www.rfc-editor.org/info/rfc8200', publisher: 'IETF / RFC Editor' },
      { title: 'IANA IPv4 Special-Purpose Address Space', url: 'https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml', publisher: 'IANA' }
    ]
  }
};
