import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 15, 2026',
  publishedIso: '2026-07-15',
  modifiedIso: '2026-07-15T00:00:00-03:00'
};

export const NETWORK_TOOL_ARTICLES: ToolArticle[] = [
  {
    ...publication,
    slug: 'ipv4-cidr-subnet-range-calculation-guide',
    toolName: 'IPv4 CIDR Range Calculator',
    toolRoute: '/ipv4-range-calculator',
    title: 'IPv4 CIDR Explained: Subnet Masks and IP Ranges',
    description: 'Learn IPv4 history, binary addressing, subnet masks and CIDR calculations, including network, broadcast and usable ranges for /24, /22 and other prefixes.',
    keywords: 'IPv4 CIDR calculator, IP range calculator, subnet mask explained, CIDR notation, network address, broadcast address, IPv4 subnetting, /24 subnet, /22 subnet',
    category: 'Networking',
    image: '/assets/articles/ipv4-cidr-calculator-cover.png',
    imageAlt: 'Futuristic IPv4 address divided into four binary octets and branching into organized CIDR subnet ranges',
    imageWidth: 1672,
    imageHeight: 941,
    readingTime: '24 min read',
    introduction: [
      'Every device that communicates through an IPv4 network depends on two related ideas: an address identifies where an interface belongs, and a prefix tells routers which part of that address represents a network. Home routers, cloud virtual networks, corporate VLANs, VPNs, firewalls, container platforms and Internet service providers all use this network-and-host division.',
      'An address such as 192.168.6.130 is incomplete for routing analysis unless its prefix is known. With /24 it belongs to the range 192.168.6.0 through 192.168.6.255; with /22 it belongs to the larger range 192.168.4.0 through 192.168.7.255. The digits did not change, but the boundary between network bits and host bits did.',
      'This article develops the idea from the origin of the Internet Protocol through binary arithmetic, classful networks, subnet masks, CIDR, private ranges and modern routing. You can verify every worked example with the utily.tools IPv4 CIDR Range Calculator while following the reasoning.'
    ],
    theoryTitle: 'From interconnected networks to a 32-bit address',
    theory: [
      'IP means Internet Protocol. It was designed to move independent datagrams across interconnected packet-switched networks, even when those underlying networks used different technologies. IP supplies addressing, forwarding and fragmentation rules, but it deliberately does not promise delivery, ordering or retransmission; protocols such as TCP add reliability when an application needs it.',
      'The January 1980 specification in RFC 760 and the September 1981 specification in RFC 791 describe Internet Protocol version 4. The version number is carried in a four-bit field at the beginning of every IP header so a receiver can identify the header format. IPv4 is therefore the protocol whose Version field has value 4, not simply a marketing name for a fourth consumer release.',
      'RFC 791 defines an IPv4 address as four octets, or 32 bits. An octet is exactly eight bits. For human readability, the four octets are written as decimal numbers separated by periods, producing dotted-decimal notation such as 203.0.113.42. The binary value remains what routers process; the decimal form is a convenient representation.',
      'IPv4 provides 2^32 distinct bit patterns, equal to 4,294,967,296 addresses. That once seemed extremely large, but global growth, inefficient early allocation and routing-table pressure exposed its limits. CIDR made allocation far more flexible and enabled route aggregation, while IPv6 later expanded addresses from 32 to 128 bits.'
    ],
    technicalIntroduction: [
      'A CIDR calculation is a boundary calculation over a 32-bit unsigned value. The prefix length says how many most-significant bits are fixed as the network portion. All remaining bits form the host portion and can vary from all zeroes to all ones inside the block.',
      'The calculation is deterministic: construct a contiguous subnet mask, retain the network bits, clear the host bits for the first address and set every host bit for the last address. Decimal notation hides this structure, so understanding the binary form makes every prefix from /0 to /32 predictable.'
    ],
    technicalPoints: [
      {
        title: 'Why an octet has values from 0 to 255',
        paragraphs: [
          'Eight binary positions have weights 128, 64, 32, 16, 8, 4, 2 and 1. When every bit is zero the value is 0. When every bit is one, their sum is 255. There are 256 possible combinations because 2^8 equals 256, but the values are numbered from 0 through 255. Decimal 256 requires a ninth bit and therefore cannot fit in one IPv4 octet.'
        ]
      },
      {
        title: 'Prefix length and subnet mask',
        paragraphs: [
          'A /22 prefix means that the first 22 bits are network bits and the remaining 10 are host bits. Its mask is twenty-two ones followed by ten zeroes, which becomes 255.255.252.0 in dotted decimal. A valid CIDR mask is contiguous: once a zero appears, every following bit is also zero.'
        ]
      },
      {
        title: 'Network, broadcast and usable hosts',
        paragraphs: [
          'The network address has every host bit set to zero. The directed broadcast address has every host bit set to one. In traditional subnets through /30, those two endpoints are reserved, so usable hosts begin one address after the network and end one address before the broadcast. RFC 3021 gives /31 point-to-point links different semantics, and /32 identifies one host route.'
        ]
      },
      {
        title: 'Block size and alignment',
        paragraphs: [
          'With p prefix bits, the number of host bits is 32 - p and the block contains 2^(32-p) addresses. CIDR blocks are aligned to their own size. A /22 contains 1,024 addresses, so valid boundaries occur every four values in the third octet: 0, 4, 8, 12 and so on.'
        ]
      }
    ],
    examples: [
      { title: 'Cloud virtual networks', description: 'A platform team divides a private /16 into smaller application, database and management subnets without overlapping address ranges.' },
      { title: 'Firewall and access-control rules', description: 'A security rule permits one CIDR prefix rather than maintaining hundreds of individual addresses, making the intended trust boundary explicit.' },
      { title: 'Routing and aggregation', description: 'An ISP or enterprise advertises one aligned aggregate that covers several contiguous child networks, reducing routing-table entries.' },
      { title: 'Incident investigation', description: 'An operator checks whether a source address belongs to an expected subnet and identifies the exact network and broadcast boundaries.' }
    ],
    conclusion: [
      'IPv4 subnetting becomes much easier once dotted decimal is translated back into its 32-bit structure. The prefix fixes the network bits, the remaining host bits determine a power-of-two block, and the all-zero and all-one host patterns define its boundaries. /24 and /22 are therefore not arbitrary labels: they are precise statements about how many bits belong to the network.',
      'In my view, binary subnetting is worth understanding even when a calculator performs the arithmetic. The theory lets you detect overlapping networks, incorrect firewall ranges and allocation waste before they become production incidents. Use the utily.tools IPv4 CIDR Range Calculator to explore different addresses and prefixes, then continue with the other articles on utily.tools for deeper explanations of the standards behind everyday developer tools.'
    ]
  }
];
