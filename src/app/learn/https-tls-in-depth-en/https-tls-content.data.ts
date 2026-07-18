import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const HTTPS_TLS_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-01-https-stack.svg",
    "alt": "HTTPS as HTTP running over TLS and TCP in the communication stack",
    "caption": "Figure 6.1 - HTTPS as a composition of HTTP over TLS and TCP."
  },
  {
    "kind": "paragraph",
    "text": "This chapter explains how TLS secures API calls, how HTTPS is constructed, how certificates and chains of trust work, what differences matter between TLS 1.2 and TLS 1.3, and how these concepts appear in enterprise API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter objectives",
    "id": "chapter-objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Understand the difference between HTTP, HTTPS, TLS, SSL, digital certificate, private key and chain of trust.",
      "Understand the security objectives of TLS: confidentiality, integrity, authentication and, when well configured, forward secrecy.",
      "Read the TLS 1.2 and TLS 1.3 handshake flow without treating the process as a black box.",
      "Identify the role of SNI, ALPN, cipher suites, TLS extensions, X.509 certificates, truststores, keystores and certificate rotation.",
      "Understand gateway deployment modes: TLS termination, TLS re-encryption, TLS pass-through and mTLS.",
      "Diagnose common TLS errors in API Gateways, balancers, proxies, private networks, and enterprise backends."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter mind map",
    "id": "chapter-mind-map"
  },
  {
    "kind": "paragraph",
    "text": "TLS should not be studied just as \"that browser lock\". In corporate APIs, he participates in architecture, operation, security, observability and governance decisions. A TLS problem may prevent the request from reaching the gateway; can cause the gateway to reject a client; can prevent the gateway from trusting the backend; or it can create a false sense of security when the connection is encrypted but the server's identity is not validated correctly."
  },
  {
    "kind": "paragraph",
    "text": "This chapter follows a practical order: first we explain the problem that TLS solves; then we analyze the cryptographic components; then we open the handshake; then we go into certificates; Finally, we apply everything to the world of API Gateways, including troubleshooting and operation. The objective is not to memorize commands, but to build a mental model that allows you to diagnose failures and design safe configurations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "The problem that HTTPS solves",
    "id": "the-problem-that-https-solves"
  },
  {
    "kind": "paragraph",
    "text": "On the original Internet, application protocols like HTTP traveled in clear text. This means that any intermediary capable of observing packets could read methods, URIs, headers, cookies, tokens, personal data and responses. In a modern corporate network, the path between client and server can traverse Wi-Fi, proxies, balancers, firewalls, providers, private networks, NATs, dedicated links and cloud environments. Without a cryptographic layer, each of these points could be a location for interception or alteration of data."
  },
  {
    "kind": "paragraph",
    "text": "HTTPS solves this problem by running HTTP over TLS. HTTP continues to define the semantics of the application: GET, POST, status 200, status 401, headers, content, cache and negotiation. TLS sits below, creating a secure channel over transport. This separation is important because many API failures are diagnosed at the wrong level. A certificate error, for example, occurs before any OAuth policy is executed on the gateway. A 401 error, on the other hand, typically occurs after TLS has already been successfully negotiated."
  },
  {
    "kind": "paragraph",
    "text": "In banking and Open Finance environments, HTTPS is not just good practice. It is part of the minimum protection surface for sensitive data, tokens, credentials and transactional operations. Even when the network is private, transport encryption reduces the impact of incorrect configurations, improper access to intermediate segments and man-in-the-middle attacks. The correct question is often not \"do we need HTTPS?\" but rather \"where should TLS end, which identities will be validated, and how will certificates be governed?\" It is also essential to understand that HTTPS does not authenticate the end user, does not authorize the operation and does not validate business rules. It secures the channel and typically authenticates the server to the client. User authentication, scope authorization, JWT validation, message signing and consent are upper layers. This distinction avoids a common mistake: believing that an API is secure just because it responds over HTTPS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS, SSL and the evolution of the protocol",
    "id": "tls-ssl-and-the-evolution-of-the-protocol"
  },
  {
    "kind": "paragraph",
    "text": "The term SSL still appears in many interfaces, documentation and market conversations, but technically SSL is an old family of protocols. The modern successor is TLS, Transport Layer Security. SSL 2.0 and SSL 3.0 were abandoned due to security issues, and older versions of TLS also became discouraged over time. In legacy product documentation, \"SSL certificate\" often just means \"certificate used in TLS\"."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.0 and TLS 1.1 were part of the history of the secure web, but today they should not be used in modern environments. TLS 1.2 is still widely available, especially for compatibility with older clients, legacy libraries and B2B integrations. TLS 1.3, defined in RFC 8446, simplified the protocol, removed insecure options, reduced handshake latency, and encrypted more metadata from the negotiation process. This makes it a preferred choice for new architectures when compatibility allows."
  },
  {
    "kind": "paragraph",
    "text": "The evolution of TLS shows an important lesson for architects: cryptographic configuration is not static. An algorithm considered acceptable at one point may become inadequate years later. Ciphers, versions, key sizes, modes of operation, renegotiation, compression, and revocation protocols evolve. Therefore, corporate platforms need an inventory, baseline policy and periodic review process."
  },
  {
    "kind": "paragraph",
    "text": "In API Gateways, this evolution appears concretely. The gateway may need to accept TLS 1.2 from external clients for compatibility, but use TLS 1.3 on more modern internal connections. It may be necessary to disable old ciphers, restrict protocols, align configurations with corporate security policies, and ensure that balancers, WAFs, proxies, and backends do not keep a weak link in the path."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS security objectives",
    "id": "tls-security-objectives"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-02-tls-objectives.svg",
    "alt": "Confidentiality, integrity and authenticity as fundamental objectives of TLS",
    "caption": "Figure 6.2 - The fundamental objectives of TLS."
  },
  {
    "kind": "paragraph",
    "text": "TLS was designed to protect applications against improper reading, data alteration and message forgery during transport. In practical terms, it offers confidentiality, integrity and authentication. Confidentiality means that an observer on the network should not be able to read protected content. Integrity means that a change in the bytes transmitted must be detected. Authentication means that one party can verify the identity of the other, usually the client verifying the server."
  },
  {
    "kind": "paragraph",
    "text": "These objectives are achieved by a combination of asymmetric encryption, symmetric encryption, message authentication, key derivation, certificates and validation rules. Asymmetric encryption is used during the handshake to authenticate identities and establish secrets. Then, for performance, application data protection uses symmetric encryption. This division is fundamental: asymmetric algorithms are flexible for key exchange and signing, but expensive; Symmetric algorithms are efficient for protecting large volumes of data."
  },
  {
    "kind": "paragraph",
    "text": "A very relevant additional objective is forward secrecy. In configurations with ephemeral key exchange, such as ECDHE, future compromise of the server's private key does not allow automatic decryption of old traffic captured in the past. This is crucial for high-risk environments, because an attacker can capture traffic today and try to decrypt it years later if they obtain a private key. TLS 1.3 was designed with this principle in a much more consistent way."
  },
  {
    "kind": "paragraph",
    "text": "Despite all these benefits, TLS does not protect against everything. It does not prevent an authorized client from abusing the API, does not fix poorly designed authorization, does not validate payloads, does not replace rate limiting, does not resolve token leaks on the client, and does not protect data after it is decrypted at the gateway or backend. In other words, TLS is a necessary but insufficient layer within an API security architecture."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Symmetric and asymmetric cryptography, hashes, and AEAD",
    "id": "symmetric-and-asymmetric-cryptography-hashes-and-aead"
  },
  {
    "kind": "paragraph",
    "text": "To understand TLS, it is necessary to understand four families of cryptographic primitives. Symmetric encryption uses the same key to encrypt and decrypt. It is fast and suitable for application data. Modern examples include AES-GCM and ChaCha20-Poly1305. Asymmetric encryption uses a pair of keys: one private and one public. It is used for signing, verifying, and establishing secrets, but not for encrypting the entire flow of a high-volume API."
  },
  {
    "kind": "paragraph",
    "text": "Hash functions produce a fixed-length digest from input data. In TLS, hashes appear in signatures, key derivation, and integrity checks. A good cryptographic hash must be resistant to collisions and preimages. However, hash alone does not prove identity or authenticity of origin. For authenticity, it is necessary to combine key and appropriate algorithm, such as HMAC, or use digital signatures with private key."
  },
  {
    "kind": "paragraph",
    "text": "AEAD, Authenticated Encryption with Associated Data, is a modern construct that combines confidentiality and integrity in one operation. Instead of encrypting and then applying a separate MAC in an error-prone manner, AEAD modes authenticate protected content and associated data. TLS 1.3 requires the use of AEAD suites, simplifying the model and avoiding many historical problems related to old ways."
  },
  {
    "kind": "paragraph",
    "text": "In everyday gateways, these primitives appear in the lists of cipher suites. When a security team demands to remove 3DES, RC4, weak CBC or RSA key exchange, the motivation lies in this cryptographic basis. A cipher suite is not just a long name: it represents choices about key exchange algorithm, authentication, symmetric encryption and hashing. Bad choices can enable known attacks or reduce guarantees such as forward secrecy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS handshake: overview",
    "id": "tls-handshake-overview"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-03-tls12-handshake.svg",
    "alt": "Message flow between client and server during a TLS 1.2 handshake",
    "caption": "Figure 6.3 - Simplified TLS 1.2 handshake flow."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-04-tls13-handshake.svg",
    "alt": "Simplified and reduced message flow during a TLS 1.3 handshake",
    "caption": "Figure 6.4 - Simplified TLS 1.3 handshake flow."
  },
  {
    "kind": "paragraph",
    "text": "The TLS handshake is the process by which client and server combine security parameters, authenticate identities, and derive keys to secure the communication. Before the handshake, there is only one common transport connection, usually TCP. After the handshake, the application data is protected by the TLS record protocol. If the handshake fails, no HTTP request reaches the application server or gateway policies."
  },
  {
    "kind": "paragraph",
    "text": "During the handshake, the client sends a ClientHello with supported versions, cryptographic suites, extensions, and random values. Among the most important extensions for modern APIs are SNI, which reports the name of the intended server, and ALPN, which allows negotiating application protocols such as http/1.1 or h2. The server responds by choosing compatible parameters and presenting a certificate that will be validated by the client."
  },
  {
    "kind": "paragraph",
    "text": "After exchanging parameters, the parties derive session keys. These keys are different from the certificate's private key. The server's private key is not used to encrypt all data; it is used to authenticate the handshake, proving that the server controls the presented identity. This distinction helps to understand why capturing a session key compromises a specific connection, while capturing the private key compromises the server's identity and, depending on the protocol and configuration, can have broader impacts."
  },
  {
    "kind": "paragraph",
    "text": "In troubleshooting, the exact step of the handshake in which the failure occurred is extremely valuable. A failure before ServerHello suggests incompatibility of versions, ciphers or extensions. A failure after the certificate may indicate chain, truststore, hostname, validity or revocation issues. A failure at the end of the handshake could involve key exchange, signing, mTLS or middleboxes interfering with the flow."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.2 in operational depth",
    "id": "tls-1-2-in-operational-depth"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.2, originally defined in RFC 5246 and later impacted by newer security recommendations, remains common in corporate environments. It allows many combinations of cipher suites and key exchange modes. This flexibility helped with historical compatibility, but also made insecure configurations more likely. The quality of a TLS 1.2 installation strongly depends on the baseline configured on the server, gateway and clients."
  },
  {
    "kind": "paragraph",
    "text": "In TLS 1.2, the choice of cipher suite carries more information than in TLS 1.3. A suite may indicate RSA for key exchange, ECDHE for ephemeral exchange, authentication algorithm, symmetric algorithm and integrity mode. Suites with static RSA key exchange, for example, do not provide forward secrecy in the same way as ECDHE. Therefore, many organizations restrict TLS 1.2 to suites with ECDHE and AEAD."
  },
  {
    "kind": "paragraph",
    "text": "Another historical point of TLS 1.2 is renegotiation. Renegotiation was a source of problems and complexity, especially with HTTP/2 and middleware. In modern architectures, you should avoid relying on renegotiation to request a client certificate after the connection is already established. For mTLS, the clearest design is to require the certificate in the initial handshake at well-defined points in the architecture."
  },
  {
    "kind": "paragraph",
    "text": "On API Gateways, TLS 1.2 appears when legacy clients, external partners, mainframes, old buses, or outdated libraries do not support TLS 1.3. In these cases, the architect's role is to reduce the risk surface: allow only strong suites, disable compression, prohibit obsolete protocols, validate certificates correctly and plan the evolution of clients to a more modern baseline."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS 1.3: essential changes",
    "id": "tls-1-3-essential-changes"
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3, specified in RFC 8446, is not just an incremental version. It redesigned important parts of the protocol, removed historically problematic algorithms and modes, and reduced the number of messages needed to establish a secure connection. The central idea was to maintain the objectives of TLS, but eliminate options that created complexity and operational risks."
  },
  {
    "kind": "paragraph",
    "text": "An important difference is that TLS 1.3 encrypts more parts of the handshake. After ServerHello, many messages that were previously visible now travel protected. This reduces metadata exposure and makes certain forms of passive inspection more difficult. Key exchange has also been modernized to rely on ephemeral mechanisms, favoring forward secrecy by default."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 also simplifies cipher suites. The suites now mainly indicate the AEAD algorithm and the hash, while key exchange groups and signatures are negotiated by separate extensions. This reduces ambiguities and makes configurations easier to understand. The practical consequence is that many cipher suite names in TLS 1.3 appear shorter, but the handshake still negotiates several security elements."
  },
  {
    "kind": "paragraph",
    "text": "Reducing round trips improves latency, especially for geographically distant calls, public APIs, and mobile clients. There is also 0-RTT data in TLS 1.3, but its use requires caution because 0-RTT data may be susceptible to replay. In transactional, financial or state-changing APIs, 0-RTT should be evaluated with extreme caution and typically avoided for non-idempotent operations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "X.509 digital certificates",
    "id": "x-509-digital-certificates"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-05-certificate-chain.svg",
    "alt": "Chain of trust formed by root, intermediate and server certificate",
    "caption": "Figure 6.5 - Certificate chain and validation by the client."
  },
  {
    "kind": "paragraph",
    "text": "An X.509 digital certificate associates an identity with a public key. In the context of HTTPS, it allows the server to present verifiable proof to the client that it is authorized to impersonate a given DNS name. The certificate contains fields such as subject, issuer, validity, public key, extensions, key uses and alternative names. Today, for checking hostnames, the Subject Alternative Name field is the central point."
  },
  {
    "kind": "paragraph",
    "text": "The private key corresponding to the certificate must remain under the exclusive control of the entity presenting the certificate. When a gateway presents a certificate to api.empresa.com, it needs to have access to the corresponding private key. If this key is leaked, an attacker can impersonate the server while the certificate is accepted by clients. Therefore, protection of private keys, HSMs, vaults, permissions and rotation are operational topics as important as the certificate file itself."
  },
  {
    "kind": "paragraph",
    "text": "Certificates are valid for a period of time. An expired certificate should be rejected by correct clients because the trust assigned to it has ended. Certificates can also have restricted uses. Extensions such as Key Usage and Extended Key Usage indicate whether a key can be used for server authentication, client authentication, signing, or other purposes. Ignoring these fields may allow misuse of certificates."
  },
  {
    "kind": "paragraph",
    "text": "In corporate APIs, it is common to deal with public certificates issued by public CAs, internal certificates issued by corporate PKI and partner certificates. Each type requires different governance. Public certificates are best suited for endpoints exposed to the Internet. Internal certificates can protect traffic between data centers, VNets and backends. Partner certificates are common in mTLS and B2B integrations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chain of trust and validation",
    "id": "chain-of-trust-and-validation"
  },
  {
    "kind": "paragraph",
    "text": "Validating a certificate does not just mean checking if it exists. The client needs to build a certification chain up to a trusted root authority present in its truststore. Typically, the server sends the final certificate and one or more intermediate certificates. The root generally does not need to be sent, as it should already be in the client's trusted repository. If an intermediary is missing, wrong or expired, validation may fail."
  },
  {
    "kind": "paragraph",
    "text": "Validation also requires checking the name. If the client accesses https://api.empresa.com, the certificate must contain this name in its Subject Alternative Names or be covered by a valid rule, such as an appropriate wildcard. A certificate issued for portal.empresa.com does not authenticate api.empresa.com. This error is common in environments with multiple domains, migrations and custom domains on API Management platforms."
  },
  {
    "kind": "paragraph",
    "text": "Another aspect is temporal validity. The client and server clock must be correct. Systems with broken NTP may reject valid certificates or accept inconsistent states. In containers, VMs, appliances and on-premises environments, time synchronization and silent requirements for TLS, Kerberos, OAuth, logs and auditing."
  },
  {
    "kind": "paragraph",
    "text": "Revocation validation is more complex. CRLs and OCSP allow you to check whether a certificate has been revoked before the end of its validity. In practice, policies vary: some clients do strict checking, others accept temporary OCSP failures, and some gateways rely on configured lists. For regulated environments, the decision between fail-open and fail-closed needs to be explicit, as it affects availability and security."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "SNI, ALPN and TLS extensions",
    "id": "sni-alpn-and-tls-extensions"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-06-sni-alpn.svg",
    "alt": "SNI and ALPN in ClientHello for certificate and protocol selection",
    "caption": "Figure 6.6 - SNI and ALPN in ClientHello."
  },
  {
    "kind": "paragraph",
    "text": "SNI, Server Name Indication, is a TLS extension that allows the client to enter the name of the server they wish to access in ClientHello. This is necessary because many domains can share the same IP and the same port 443. Without SNI, the server would have difficulty choosing which certificate to present before knowing the HTTP host, as the HTTP host only appears within the protected communication after the handshake."
  },
  {
    "kind": "paragraph",
    "text": "On gateways and balancers, SNI is used for certificate selection, routing, and multi-domain coexistence. An SNI error can cause the server to present the wrong certificate, resulting in hostname validation failure. It can also cause a balancer to send the connection to the wrong pool. When the test with IP works, but with hostname it fails, or when curl needs --resolve to simulate DNS, SNI should enter the analysis."
  },
  {
    "kind": "paragraph",
    "text": "ALPN, Application-Layer Protocol Negotiation, allows the client and server to negotiate which application protocol will be used within TLS, such as http/1.1 or h2. This was essential for HTTP/2 over TLS. Without ALPN, the client could establish a secure channel, but there would be no clear agreement on how to interpret the application bytes."
  },
  {
    "kind": "paragraph",
    "text": "TLS extensions are the mechanism by which the protocol evolves without breaking basic compatibility. Supported Versions, Signature Algorithms, Supported Groups, Key Share, SNI, ALPN and other extensions carry important information. In real-world problems, old middleboxes can interfere with unknown extensions, creating failures that appear \"mysterious\". Therefore, openssl diagnostics, gateway logs and network captures are valuable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS record protocol and application data",
    "id": "tls-record-protocol-and-application-data"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-07-record-protocol.svg",
    "alt": "Protection of an HTTP message by fragmentation in records and AEAD encryption",
    "caption": "Figure 6.7 - Data protection by TLS record protocol."
  },
  {
    "kind": "paragraph",
    "text": "After the handshake ends, TLS starts protecting application data through the record protocol. HTTP is not sent as clear text over the network; it is fragmented into records, protected by session keys, and transmitted over TCP. To an external observer, methods, headers and body are inaccessible, although some metadata, such as IPs, ports and approximate traffic size, may still be observable."
  },
  {
    "kind": "paragraph",
    "text": "The record protocol separates the cryptographic agreement from the data transport. This allows the application to write bytes to the secure channel without worrying about every encryption detail. However, it also creates important limits for troubleshooting. A tool that captures packets without keys cannot see HTTP inside TLS. To inspect content, it is necessary to terminate TLS at an authorized point, use application logs or configure test environments with exportable keys in a controlled manner."
  },
  {
    "kind": "paragraph",
    "text": "In API Gateways, this layer is the point at which traffic stops being opaque. If the gateway terminates TLS, it now sees HTTP and can apply policies, validate JWT, transform payloads, mask fields and record logs. If the gateway only forwards TLS via pass-through, it does not see HTTP content and its policy capabilities are limited to layer 4 information or SNI."
  },
  {
    "kind": "paragraph",
    "text": "This difference impacts architecture. A company that wants to apply per-route rate limiting, validate OAuth scopes, transform JSON, block sensitive fields, or log URI audits needs to terminate TLS before or within the component that performs these functions. On the other hand, pass-through can be chosen when policy requires that the gateway not have access to the content, or when mTLS must occur directly between client and backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS Modes in API Gateways",
    "id": "tls-modes-in-api-gateways"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-08-gateway-tls-modes.svg",
    "alt": "TLS termination, re-encryption and pass-through on gateways and balancers",
    "caption": "Figure 6.8 - Common TLS modes on gateways and balancers."
  },
  {
    "kind": "paragraph",
    "text": "The most common mode on API and TLS termination platforms. In this model, the client establishes TLS with the gateway or balancer. The component ends the session, decrypts the traffic and processes HTTP. From there, it can forward to the backend via internal HTTP or via a new HTTPS connection. Although simple, this model requires recognizing that the gateway becomes a point of high trust, as it sees the content clearly in memory."
  },
  {
    "kind": "paragraph",
    "text": "TLS re-encryption creates two independent TLS sessions: one from the client to the gateway and one from the gateway to the backend. This design is very common in corporate environments because it allows the gateway to apply HTTP policies without giving up encryption on the internal part. The frontend certificate authenticates the gateway to the client; The backend certificate authenticates the backend to the gateway. Truststores and keystores can be different on each leg."
  },
  {
    "kind": "paragraph",
    "text": "TLS pass-through, in turn, preserves the end-to-end TLS session between client and backend. A Layer 4 balancer or gateway can forward bytes without decrypting. This reduces content exposure in the intermediary, but also reduces your ability to make HTTP-based decisions. There may be routing via SNI, but authorization policies, JSON validation and transformations are not possible without terminating TLS."
  },
  {
    "kind": "paragraph",
    "text": "In some environments, there are hybrid combinations. An external balancer terminates TLS and re-encrypts for the gateway; gateway terminates again and re-encrypts for backends; or a WAF is before the gateway. Each termination creates a new trust boundary and requires deciding who validates what. A secure architecture must document these boundaries, the certificates used, the truststores involved, and what logs exist at each point."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Mutual TLS: introductory overview",
    "id": "mutual-tls-introductory-overview"
  },
  {
    "kind": "paragraph",
    "text": "mTLS, or mTLS, is the use of TLS with two-way authentication. In regular HTTPS, the client validates the server's certificate. In mTLS, the server also requests and validates a certificate from the client. This allows you to authenticate an application, organization, device or partner through PKI. In B2B APIs, Open Finance, banking integrations and high-trust systems, mTLS is often used as a strong channel authentication layer."
  },
  {
    "kind": "paragraph",
    "text": "It is important to separate mTLS from business authorization. A client certificate can prove that the call came from a trusted technical entity, but not necessarily that that entity can perform any operations. In mature architectures, mTLS authenticates the technical channel or client, while OAuth, JWT, scopes, consents, and policies define application authorization. The common mistake is to treat the certificate as full permission."
  },
  {
    "kind": "paragraph",
    "text": "From an operational point of view, mTLS requires a model for issuing, distributing, rotating and revoking client certificates. The gateway needs to trust the CA that issued the certificates, validate the chain and possibly check attributes such as subject, SAN, serial number, thumbprint, OU or specific policies. In many products, these attributes can be copied into policy context and used in routing or authorization decisions."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents mTLS only as an application of TLS. A future chapter should delve deeper into the topic with complete flows, onboarding models, relationship with OAuth 2.0, transport certificates versus signing certificates, identity propagation issues and risks of accepting certificates without strong validation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "HTTPS, HSTS and redirection",
    "id": "https-hsts-and-redirection"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS secures a connection when it is used. But there is an initial problem: if the user or system tries to access HTTP by mistake, the first call may travel without protection before receiving a redirection to HTTPS. In browsers, HSTS, defined in RFC 6797, allows a website to declare that it should only be accessed over secure connections for a period of time. The browser will now refuse HTTP attempts to that host while the policy is in effect."
  },
  {
    "kind": "paragraph",
    "text": "In server-to-server APIs, HSTS typically has less impact than in browsers, because programmatic clients must be configured directly with HTTPS. Still, HTTP to HTTPS redirects in APIs deserve caution. Many clients do not resend sensitive methods, bodies, or headers correctly after redirection. For APIs, the ideal is to publish contracts in HTTPS and reject HTTP instead of relying on redirects for transactional flows."
  },
  {
    "kind": "paragraph",
    "text": "HSTS can also create operational risks if incorrectly configured with includeSubDomains and long max-ages on wide domains. Since browsers memorize the policy, a certificate failure on subdomains can render services inaccessible to affected users. The use of preload increases liability even further by distributing the policy into lists built into browsers."
  },
  {
    "kind": "paragraph",
    "text": "For API Gateways, the practical decision is to ensure that public endpoints only accept HTTPS, that certificates are correct, that redirects are avoided in sensitive API flows, and that header policies are applied consistently when there are portals, documentation, consoles or web interfaces associated with the platform."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cipher suites, versions and secure baseline",
    "id": "cipher-suites-versions-and-secure-baseline"
  },
  {
    "kind": "paragraph",
    "text": "Configuring TLS involves choosing allowed versions, key exchange algorithms, signatures, elliptical groups, cipher suites, session parameters, and validation behavior. A secure baseline should reflect current recommendations, regulatory requirements, customer compatibility, and product capabilities. Allowing everything for compatibility is a risky decision; Blocking anything that isn't the latest can break partners and legacy systems."
  },
  {
    "kind": "paragraph",
    "text": "RFC 9325 consolidated modern recommendations for secure use of TLS and DTLS. She advises against old protocols and advises avoiding weak suites. NIST SP 800-52 Rev. 2 also provides guidelines for selecting and configuring TLS in contexts that follow NIST-recommended algorithms. These references are useful for building a corporate policy, but the concrete implementation depends on the product: gateway, load balancer, WAF, application server, client SDK and operating system."
  },
  {
    "kind": "paragraph",
    "text": "For corporate APIs, the baseline definition must be documented per environment. For example: public endpoints accept TLS 1.2 and 1.3, with preference for TLS 1.3; TLS 1.2 is restricted to ECDHE suites with AEAD; internal backends require certificate validation; production certificates use approved keys and algorithms; Obsolete protocols are disabled. This policy must be tested with automated tools and continuously monitored."
  },
  {
    "kind": "paragraph",
    "text": "At the same time, a TLS policy needs to consider the migration journey. If a critical partner is still using the old library, the organization needs to decide whether to create a temporary exception, isolate the partner on a dedicated endpoint, apply risk tradeoffs, or require an upgrade. Mixing exceptions into the main endpoint can degrade everyone's security. Segmenting by domain, host, product, or gateway can help control this risk."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Session, resumption and performance",
    "id": "session-resumption-and-performance"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-09-session-resumption.svg",
    "alt": "TLS session resumption with ticket or PSK and reduced handshake",
    "caption": "Figure 6.9 - TLS session resumption and operational cost."
  },
  {
    "kind": "paragraph",
    "text": "The TLS handshake consumes CPU and adds latency. In high volume APIs, especially with short connections, this can be significant. To reduce cost, TLS offers session resumption mechanisms. In TLS 1.2, there are session IDs and session tickets. In TLS 1.3, resumption uses PSKs derived from previous handshakes. The objective is to avoid repeating the entire cryptographic cost of a new connection when the parties already share secure material."
  },
  {
    "kind": "paragraph",
    "text": "Resumption improves performance, but has operational implications. In gateway clusters, multiple instances may need to share ticket keys or maintain session state for resumption to work after balancing. If each instance has different material, the resume may fail and the client will perform a complete handshake. This does not usually break functionality, but it increases latency and CPU. During traffic peaks, this detail can become a bottleneck."
  },
  {
    "kind": "paragraph",
    "text": "Connection pooling also reduces costs. A client that maintains persistent HTTPS connections avoids repeated handshakes. Gateways often maintain pools for backends, reusing connections when possible. The design of timeouts, keep-alive, idle timeout, max connections and retries directly influences the number of handshakes and the stability of the environment."
  },
  {
    "kind": "paragraph",
    "text": "The search for performance cannot compromise security. Tickets with excessive lifetime, careless sharing of keys between instances and 0-RTT in non-idempotent operations can introduce risks. The recommendation is to treat resumption as controlled optimization: measure, configure limits, monitor metrics and validate behavior in failover and scalability scenarios."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificates on corporate platforms",
    "id": "certificates-on-corporate-platforms"
  },
  {
    "kind": "paragraph",
    "text": "On an API platform, certificates appear in several places. On the frontend, the gateway presents a certificate to clients. On the backend, the gateway validates the certificate of internal servers. In mTLS, the gateway can require client certificates and also present its own certificate to the backend. Additionally, portals, consoles, agents, analytics and internal integrations can have separate certificates."
  },
  {
    "kind": "paragraph",
    "text": "The concept of keystore and truststore helps organize. A keystore contains identities that the component presents, usually certificate and private key. A truststore contains trusted CAs or certificates used to validate the other end. Confusing the two is a frequent source of error. Importing the backend certificate into the gateway's keystore does not make the gateway trust it; to trust, it needs to be in the truststore or have its CA trusted."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, custom domains can use certificates associated with the exposed endpoint, including integration with Azure Key Vault in supported scenarios. For backends, the platform also needs to validate TLS and can work with certificates according to configurations and policies. In hybrid and self-hosted gateway architectures, private networks, private DNS and local truststores also come into play."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, certificate and key management is also central to HTTPS interfaces, trusted certificates, outbound connections and policies. The professional needs to know where the certificate presented to the client is, which CAs are trusted by backends and how policies extract or validate certificate attributes when mTLS is used. The difference between interface configuration error, trusted certificate error and policy error needs to be clear."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS observability and troubleshooting",
    "id": "tls-observability-and-troubleshooting"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-10-troubleshooting-tree.svg",
    "alt": "Troubleshooting tree to classify HTTPS failures by layer",
    "caption": "Figure 6.10 - Troubleshooting tree for HTTPS failures."
  },
  {
    "kind": "paragraph",
    "text": "TLS troubleshooting must follow a layered sequence. First, confirm DNS, IP and port. Then, check whether the TCP connection is established. Then, test the TLS handshake, observing version, cipher, presented certificate, chain, SNI and ALPN. Only then does it make sense to analyze HTTP status and gateway policies. Skipping steps leads to wrong conclusions, such as investigating OAuth when the real fault is expired certificate."
  },
  {
    "kind": "paragraph",
    "text": "Tools like openssl s_client, curl -v, gateway logs, load balancer logs, tcpdump, and Wireshark help locate the fault. With openssl, it is possible to enter servername to test SNI, display string, force versions and observe ciphers. With curl, it is possible to see negotiation, certificate and HTTP response. In corporate environments, access to captures may be restricted, so structured gateway logs and handshake metrics become even more important."
  },
  {
    "kind": "paragraph",
    "text": "Common errors include certificate expired, self-signed certificate in chain, unable to get local issuer certificate, hostname mismatch, protocol version alert, handshake failure, unknown CA, bad certificate, connection reset, and timeout. Each error points to a different layer. Unknown CA suggests truststore; hostname mismatch suggests certificate or DNS/SNI; handshake failure may indicate incompatibility of cipher, version or client certificate requirement."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, diagnosis needs to distinguish frontend and backend. A client may fail to connect to the gateway due to a problem with the public certificate. The gateway may connect to the client, execute policies, and then fail to call the backend due to a missing trusted certificate. Without separating these two legs, the team can change the wrong certificate or change a policy that is not involved in the problem."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Historical attacks and risks",
    "id": "historical-attacks-and-risks"
  },
  {
    "kind": "paragraph",
    "text": "The history of TLS includes several attacks and implementation failures that led to changes in the protocol and recommendations. Attacks against legacy SSL and TLS exploited downgrade, block modes, compression, renegotiation, weak ciphers, padding oracles, and library bugs. Even when the protocol is mathematically strong, a bad configuration or a vulnerable implementation can break the expected protection."
  },
  {
    "kind": "paragraph",
    "text": "Downgrade is a classic risk: an attacker tries to force client and server to use weaker versions or algorithms. Modern protocols include protections, but the server baseline still matters. If obsolete protocols remain enabled, the attack surface grows. Therefore, TLS hardening typically starts by removing SSL, TLS 1.0, TLS 1.1, and obsolete ciphers."
  },
  {
    "kind": "paragraph",
    "text": "Man-in-the-middle attacks remain relevant when clients disable certificate validation, accept any certificate, ignore hostname or install inappropriate CAs. In development, it is common to use insecure flags to \"make it work\". The problem arises when this pattern migrates to production or to shared libraries. Correct certificate validation is an essential part of TLS, not an optional detail."
  },
  {
    "kind": "paragraph",
    "text": "In APIs, another risk is data exposure after TLS termination. If the gateway terminates TLS and sends pure HTTP to the backend over a wide and poorly controlled network, part of the protection is lost. If logs record Authorization headers, tokens or sensitive payloads, encryption in transit does not prevent leakage due to poorly designed observability. Transport security needs to be aligned with application and data security."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Certificate lifecycle",
    "id": "certificate-lifecycle"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/https-tls/en/figure-11-certificate-lifecycle.svg",
    "alt": "Operational cycle of certificates from inventory to rotation",
    "caption": "Figure 6.11 - Certificate operational life cycle."
  },
  {
    "kind": "paragraph",
    "text": "Certificates have a life cycle: request, validation, issuance, installation, monitoring, renewal, rotation, revocation and disposal. In large environments, the challenge is not to manually issue a certificate, but to maintain hundreds or thousands of certificates correct, up-to-date, and linked to the right systems. Renewal failures cause serious incidents because they can bring down entire endpoints."
  },
  {
    "kind": "paragraph",
    "text": "A good process starts with inventory. The organization needs to know which certificates exist, where they are installed, which domains they cover, when they expire, who is responsible, which CA issued them, which private key corresponds, and which systems depend on them. Without inventory, renewal becomes a response to the crisis. With inventory, it is possible to automate alerts, rotation and auditing."
  },
  {
    "kind": "paragraph",
    "text": "ACME, defined in RFC 8555, popularized certificate automation for Web PKI. In corporate environments, automation can involve Key Vaults, HSMs, internal PKI, pipelines, secret managers and integrations with gateways. The objective is to reduce manual intervention, standardize validation and minimize expiration windows. Even when ACME is not used, the operating principle remains valid: certificates need automation and governance."
  },
  {
    "kind": "paragraph",
    "text": "Rotation requires planning to avoid losing customers. In mTLS, for example, exchanging CA or client certificates may require temporary trust override, early distribution, and compatibility windows. On backends, exchanging certificates may require updating gateway truststores. In custom domains, changing certificates may require reloading listeners or validating that the complete chain is being presented."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Application in banking and finance",
    "id": "application-in-banking-and-finance"
  },
  {
    "kind": "paragraph",
    "text": "Financial institutions use TLS to secure digital channels, internal APIs, B2B integrations, Open Finance, payments, authentication, and cross-domain security traffic. Criticality comes from the combination of sensitive data, regulatory risk, financial impact and operational dependence. A TLS failure can result in unavailability, partner rejection, audit failure, or information exposure."
  },
  {
    "kind": "paragraph",
    "text": "In banking environments, it is common to separate transport certificates, signing certificates and application credentials. A TLS certificate authenticates the channel. A signing certificate can sign payloads or objects. An OAuth token can represent consent, scope and authorization. Mixing these roles creates confusing architectures. Each artifact must have its own purpose, issuing authority, life cycle and controls."
  },
  {
    "kind": "paragraph",
    "text": "Gateways such as Axway and Azure API Management appear as enforcement points. They can require strong TLS on the frontend, validate client certificates, validate JWT, apply throttling, route by product, mask logs, and call backends over internal TLS. The platform, however, is only secure if configured with correct chains, clear policies and sufficient observability for auditing."
  },
  {
    "kind": "paragraph",
    "text": "Professionals who master TLS can talk better with network, security, infrastructure, development and architecture teams. He can explain why a wildcard certificate can increase the impact of leaks, why the wrong truststore causes only one leg to fail, why SNI matters in custom domains, why TLS termination changes the trust boundary and why mTLS does not replace business authorization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical reference tables",
    "id": "technical-reference-tables"
  },
  {
    "kind": "paragraph",
    "text": "The following tables condense decisions that frequently appear in API projects. They do not replace reading the specifications, but they help organize reasoning during architecture design and troubleshooting."
  },
  {
    "kind": "table",
    "caption": "Table 1 — Essential TLS concepts in APIs.",
    "headers": [
      "Concept",
      "What does it mean",
      "Practical impact on APIs"
    ],
    "rows": [
      [
        "HTTPS",
        "HTTP runs over TLS.",
        "Protects API calls in transit, but does not replace authorization or token validation."
      ],
      [
        "TLS termination",
        "Intermediary terminates the client's TLS session.",
        "Allows HTTP policies, logs and transformations at the gateway."
      ],
      [
        "TLS re-encryption",
        "Intermediary creates a second TLS session for the backend.",
        "Keeps internal traffic encrypted and separates frontend/backend trust."
      ],
      [
        "TLS pass-through",
        "Intermediary forwards bytes without decrypting.",
        "Preserves end-to-end encryption, but limits HTTP policies at the gateway."
      ],
      [
        "mTLS",
        "Client and server present certificates.",
        "Authenticates technical client or partner, but does not replace application authorization."
      ],
      [
        "SNI",
        "Server name entered in ClientHello.",
        "Allows you to select certificate and route multiple domains on the same IP."
      ],
      [
        "ALPN",
        "Negotiation of the application protocol within TLS.",
        "Allows you to choose HTTP/2 or HTTP/1.1 in the handshake."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Table 2 — Symptoms, likely causes, and investigation of HTTPS failures.",
    "headers": [
      "Observed failure",
      "Probable cause",
      "How to investigate"
    ],
    "rows": [
      [
        "certificate has expired",
        "Certificate out of date.",
        "Check certificate presented by the endpoint, chain and systems clock."
      ],
      [
        "hostname mismatch",
        "Name accessed does not appear in the SAN of the certificate.",
        "Check DNS, SNI, custom domain and Subject Alternative Name."
      ],
      [
        "unable to get local issuer certificate",
        "Incomplete chain or missing CA in truststore.",
        "Check sent intermediaries and trusted CAs on the client/gateway."
      ],
      [
        "handshake failure",
        "Incompatible version, cipher, client certificate or extension.",
        "Force versions/ciphers into test and analyze TLS logs."
      ],
      [
        "unknownca",
        "Certificate presented was issued by an unreliable CA.",
        "Import correct CA into appropriate truststore or use public/validated CA."
      ],
      [
        "connection reset during handshake",
        "Intermediary closed connection, wrong SNI, LB policy or mTLS requirement.",
        "Test with explicit SNI and compare frontend/backend."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Table 3 — Architectural decisions and precautions.",
    "headers": [
      "Architectural decision",
      "When it makes sense",
      "Risk or caution"
    ],
    "rows": [
      [
        "Accept TLS 1.2 and 1.3",
        "Compatibility with corporate customers and partners.",
        "Restrict TLS 1.2 to strong suites and plan migration."
      ],
      [
        "Require TLS 1.3 only",
        "Controlled ecosystem and modern customers.",
        "May break old libraries and B2B partners."
      ],
      [
        "Use wildcard certificate",
        "Many subdomains under the same domain.",
        "Key leaks impact several services."
      ],
      [
        "Use certificates per domain",
        "Risk separation and granular governance.",
        "Greater volume of certificates to operate."
      ],
      [
        "Terminate TLS on gateway",
        "Need for HTTP policies and observability.",
        "Gateway sees the content decrypted and needs to be highly protected."
      ],
      [
        "Pass-through to backend",
        "Requires end-to-end encryption without intermediate inspection.",
        "Less API Management control down the road."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Practical diagnostic examples",
    "id": "practical-diagnostic-examples"
  },
  {
    "kind": "paragraph",
    "text": "The examples below are illustrative. They must be adapted to the environment, as host names, certificates, paths and policies vary. The objective is to show how to separate layers during the investigation."
  },
  {
    "kind": "subhead",
    "text": "Test the certificate presented with SNI"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -showcerts"
  },
  {
    "kind": "subhead",
    "text": "Fork TLS 1.2 to compare compatibility"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_2"
  },
  {
    "kind": "subhead",
    "text": "Force TLS 1.3 to validate support"
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -tls1_3"
  },
  {
    "kind": "subhead",
    "text": "View details of the HTTP call and TLS negotiation with curl"
  },
  {
    "kind": "code",
    "text": "curl -v https://api.exemplo.com/clientes"
  },
  {
    "kind": "subhead",
    "text": "Test a host with a specific IP while preserving SNI/Host"
  },
  {
    "kind": "code",
    "text": "curl -v --resolve api.exemplo.com:443:203.0.113.10 https://api.exemplo.com/health"
  },
  {
    "kind": "subhead",
    "text": "Check dates for a certificate saved on file"
  },
  {
    "kind": "code",
    "text": "openssl x509 -in certificado.pem -noout -subject -issuer -dates -ext subjectAltName"
  },
  {
    "kind": "paragraph",
    "text": "In gateways, a successful external test does not prove that the backend is correct. It only proves that the client was able to negotiate TLS with the external endpoint and receive some response. To validate the internal leg, it is necessary to test from the gateway itself or from an origin with the same route, DNS, truststore and exit policy. This separation is essential in environments with VNets, private endpoints, corporate proxies and outbound firewalls."
  },
  {
    "kind": "paragraph",
    "text": "When mTLS is present, the test must also present a certificate and client key. A failure without a certificate can be expected. A certificate failure may indicate an untrustworthy CA, an expired certificate, an incorrect EKU, an incomplete chain, or a policy that does not recognize the expected attribute. Gateway logs must indicate whether the failure occurred in the handshake or in the policy after the handshake."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Case Studies",
    "id": "case-studies"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - Custom domain in API Management presents wrong certificate"
  },
  {
    "kind": "paragraph",
    "text": "A team publishes api.empresa.com in API Management with several custom domains. Some clients receive hostname mismatch error. The first suspicion lies with OAuth, because the API also returns 401 in some scenarios. Correct investigation with openssl s_client using -servername shows that for a given network path, the endpoint presents the portal.empresa.com certificate."
  },
  {
    "kind": "paragraph",
    "text": "The likely cause is incorrect configuration of SNI, custom domain or balancer prior to APIM. The correction is not in the JWT nor in the authorization policy. It is in the association between hostname, certificate and listener. This case shows why separating TLS from HTTP avoids wasted time."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Gateway calls HTTPS backend and fails with unknown CA"
  },
  {
    "kind": "paragraph",
    "text": "The external client can connect to the gateway and authenticate normally. The gateway policy, however, fails to call the backend with a certificate error. The team changes the frontend certificate, but the problem continues. The real fault is in the gateway-backend leg, not the client-gateway leg."
  },
  {
    "kind": "paragraph",
    "text": "The solution is to import the correct backend CA or chain into the truststore used by the gateway's outbound connection, or amend the backend certificate to use a trusted CA. It is also necessary to verify that the name used in the internal URL matches the SAN of the backend certificate."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Legacy partner does not support modern baseline"
  },
  {
    "kind": "paragraph",
    "text": "An organization disables TLS 1.0 and TLS 1.1 and restricts TLS 1.2 to modern suites. An old partner is no longer able to call the API. Technically, the change is correct, but operationally it needs a migration plan, communication and a controlled exception window."
  },
  {
    "kind": "paragraph",
    "text": "A mature approach is to isolate temporary exceptions on dedicated endpoints, with monitoring, deadline, risk compensation and responsible owner. Reopening weak ciphers on the primary endpoint for all clients increases the overall platform risk."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 - Certificate expires in an internal environment"
  },
  {
    "kind": "paragraph",
    "text": "An internal TLS-protected backend expires over the weekend. The gateway now returns 502 or 500 to external clients, although the gateway's public certificate is valid. The incident occurs because the inventory of internal certificates was not integrated with corporate monitoring."
  },
  {
    "kind": "paragraph",
    "text": "The lesson is that internal certificates must receive the same operational rigor as public certificates. Expiration monitoring, assignees, early rotation and alerts in correct channels reduce preventable incidents."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Suggested labs",
    "id": "suggested-labs"
  },
  {
    "kind": "paragraph",
    "text": "Laboratories must be run in a study environment, without using certificates or production keys. The goal is to observe the behavior of TLS under controlled conditions."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Upload a local HTTPS server with a self-signed certificate and observe how curl and the browser reject the chain due to lack of trust.",
      "Create a local CA, issue a certificate to api.local, add the CA to the client truststore and compare the result.",
      "Test the same endpoint with and without SNI using openssl s_client and observe the certificate returned.",
      "Configure a reverse proxy terminating TLS and forwarding HTTP to a local backend. Then change to re-encryption and compare logs.",
      "Force different ciphers or TLS versions on client and server to cause controlled handshake failure.",
      "Simulate certificate expiration in a local environment and observe error messages on the client, proxy and application.",
      "Configure mTLS in the laboratory and test three scenarios: without a client certificate, with a certificate issued by an untrustworthy CA, and with a valid certificate."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "TLS architecture checklist for APIs",
    "id": "tls-architecture-checklist-for-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "All public endpoints use HTTPS and do not rely on HTTP with redirection for API operations.",
      "TLS 1.0, TLS 1.1, SSLv2 and SSLv3 are disabled.",
      "TLS 1.2, when accepted, is restricted to strong suites with forward secrecy and AEAD.",
      "TLS 1.3 is enabled when supported by clients and the platform.",
      "Certificates have correct SAN, complete chain and monitored validity.",
      "Private keys are protected, with restricted access and, when applicable, HSM or Key Vault.",
      "Frontend, backend, and mTLS truststores are documented separately.",
      "SNI and ALPN are tested on endpoints that host multiple domains or support HTTP/2.",
      "The architecture documents where TLS ends and where traffic becomes unencrypted.",
      "Logs do not record tokens, secrets, private keys, or sensitive payloads without masking.",
      "Certificate renewal and rotation have a process, person responsible and expiration alerts.",
      "Exceptions for legacy customers are temporary, isolated, and risk-approved."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS is the combination of HTTP and TLS. HTTP defines the semantics of the API; TLS secures the channel. This separation allows you to correctly diagnose whether a failure occurred before HTTP, during the handshake, in certificate validation, in the gateway policy or in the backend."
  },
  {
    "kind": "paragraph",
    "text": "TLS offers confidentiality, integrity and authentication. With modern configurations, it also provides forward secrecy. These guarantees depend on versions, cipher suites, certificates, truststores, hostname validation and private key protection."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 simplifies and strengthens the protocol compared to TLS 1.2, but TLS 1.2 still exists for compatibility. The architect's role is to define secure baselines, manage exceptions and plan evolution."
  },
  {
    "kind": "paragraph",
    "text": "X.509 certificates and chains of trust are central. The customer needs to validate CA, intermediaries, validity, hostname, key usage and, depending on policy, revocation. In API Gateways, there are different certificates for frontend, backend and mTLS clients."
  },
  {
    "kind": "paragraph",
    "text": "The operation of TLS is as important as the theory. Inventory, monitoring, rotation, automation and troubleshooting in layers prevent incidents and reduce resolution time."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossary"
  },
  {
    "kind": "table",
    "caption": "Table 4 — Chapter glossary.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "TLS",
        "Transport security protocol used to secure applications such as HTTP."
      ],
      [
        "HTTPS",
        "HTTP runs over TLS."
      ],
      [
        "X.509 Certificate",
        "Digital document that associates identity with the public key and is signed by a CA."
      ],
      [
        "CA",
        "Certification Authority, entity that issues certificates and participates in the chain of trust."
      ],
      [
        "Truststore",
        "Repository of trusted CAs/certificates used to validate the other end."
      ],
      [
        "Keystore",
        "Repository of local identities, typically certificate and private key."
      ],
      [
        "SNI",
        "TLS extension that informs the server name in ClientHello."
      ],
      [
        "ALPN",
        "TLS extension to negotiate the application protocol, such as HTTP/2."
      ],
      [
        "cipher suite",
        "Set of algorithms used by the TLS session, especially in TLS 1.2."
      ],
      [
        "Forward secrecy",
        "Property past traffic remains protected even if a future private key is leaked."
      ],
      [
        "OCSP",
        "Protocol for checking certificate revocation status."
      ],
      [
        "HSTS",
        "HTTP mechanism for instructing browsers to only use secure connections to a host."
      ],
      [
        "mTLS",
        "TLS with mutual authentication using certificates."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercises",
    "id": "exercises"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Explain why HTTPS does not replace OAuth 2.0, JWT or scope authorization.",
      "Describe the path of an HTTPS call to a backend when the gateway uses TLS re-encryption.",
      "Differentiate keystore and truststore using an example of client, gateway and backend.",
      "Explain the role of SNI in an environment with several custom domains on the same IP.",
      "Explain how ALPN influences HTTP/2 over TLS.",
      "Compare TLS 1.2 and TLS 1.3 from a security and latency perspective.",
      "Why can 0-RTT in TLS 1.3 be dangerous for transactional operations?",
      "A client receives hostname mismatch. List at least five possible causes.",
      "The gateway returns an error when calling the HTTPS backend, but clients connect to the gateway normally. Which leg should be investigated?",
      "Explain why internal certificates also need expiration monitoring.",
      "Create a TLS baseline policy for a public API that needs to support legacy enterprise clients.",
      "Explain when TLS pass-through may be appropriate and what gateway capabilities are lost."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Essay questions for review",
    "id": "essay-questions-for-review"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Imagine that a financial institution has public APIs, internal APIs and partner APIs. Propose a certificate strategy separating frontend, backend and mTLS. Indicate which truststores would be required and which risks you would monitor.",
      "You need to disable TLS 1.0 and TLS 1.1 on a gateway used by legacy partners. Describe the technical and operational plan to reduce risk without causing unexpected downtime.",
      "Explain how you would investigate an intermittent TLS failure that only occurs when traffic passes through a certain balancer. What evidence would you collect?",
      "One team claims they don't need internal TLS because the network is private. Present technical arguments for and against this decision, considering cost, risk and observability."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: Certificate Transparency and improper issuance",
    "id": "deep-dive-certificate-transparency-and-improper-issuance"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Transparency (CT) emerged to reduce the risk of certificates issued improperly by certification authorities. The idea is to publicly record issued certificates in auditable logs, allowing domain owners, browsers and researchers to detect suspicious certificates. CT does not replace normal string validation; it adds a layer of transparency to the Web PKI ecosystem."
  },
  {
    "kind": "paragraph",
    "text": "For enterprise architectures, CT is most relevant in public certificates used by endpoints exposed to the Internet. If a public CA improperly issues a certificate for a company domain, the existence of that certificate may appear in CT logs. Monitoring these logs helps detect domain misuse, issuance errors, or impersonation attempts."
  },
  {
    "kind": "paragraph",
    "text": "In internal certificates issued by private PKI, CT does not normally apply in the same way, as these certificates are not part of the public Web PKI. In this case, equivalent controls depend on internal inventory, CA audit, approval trails, separation of functions and monitoring of certificates issued by the organization itself."
  },
  {
    "kind": "paragraph",
    "text": "On API platforms, CT should be viewed as part of domain governance. The team responsible for APIs needs to know which public domains exist, which certificates were issued for them, who approved the issuance, where they are installed and when they expire. Without this vision, a technical certificate can become a brand risk, fraud or unavailability."
  },
  {
    "kind": "table",
    "caption": "Table 5 — Certificate Transparency and issuance controls.",
    "headers": [
      "Control",
      "Objective",
      "Application in APIs"
    ],
    "rows": [
      [
        "CT monitoring",
        "Detect unexpected public certificates.",
        "Alert suspicious issue for api.empresa.com or subdomains."
      ],
      [
        "Domain inventory",
        "Know which hostnames exist and who owns them.",
        "Avoid custom domains without a clear responsible person."
      ],
      [
        "Issuance approval",
        "Control who can request certificates.",
        "Reduce emission risk outside the corporate process."
      ],
      [
        "Internal CA Audit",
        "Govern private certificates.",
        "Control certificates used in backends and mTLS."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: certificate pinning",
    "id": "deep-dive-certificate-pinning"
  },
  {
    "kind": "paragraph",
    "text": "Certificate pinning is the practice of restricting a client to accepting only a specific certificate, a specific public key, or a limited set of issuers, rather than generally trusting the system's truststore. The motivation is to reduce the impact of compromised CAs or improperly issued certificates. However, pinning increases operational risk, as a legitimate certificate exchange can break customers if the pin is not updated correctly."
  },
  {
    "kind": "paragraph",
    "text": "In mobile applications, pinning has already been used to make interception difficult by local proxies or CAs installed on the device. In B2B integrations, some organizations do a form of pinning using the thumbprint of the partner's certificate. This model may be simple to implement, but it tends to generate renewal incidents. When the certificate expires and is replaced, the thumbprint changes, and calls fail."
  },
  {
    "kind": "paragraph",
    "text": "A more flexible alternative is to trust a controlled CA or a set of intermediate CAs, rather than pinning the final certificate. Another approach is public key pinning, which allows you to renew the certificate while preserving the same key, although reusing keys for long periods also has disadvantages. In general, pinning should be a conscious decision, documented and accompanied by a rotation plan."
  },
  {
    "kind": "paragraph",
    "text": "In the context of API Gateways, pinning can appear in clients that call the gateway, in backends called by the gateway, or in policies that compare certificates. The practical recommendation is to avoid rigid dependencies on the default certificate of managed platforms and to use domains/custom certificates under the organization's control when external clients rely heavily on the TLS identity."
  },
  {
    "kind": "table",
    "caption": "Table 6 — Certificate pinning strategies.",
    "headers": [
      "Strategy",
      "Advantage",
      "Caution"
    ],
    "rows": [
      [
        "Pin by final certificate",
        "Very specific control.",
        "Breaks with any renewal that changes the certificate."
      ],
      [
        "Pin by public key",
        "Allows you to renew a certificate with the same key.",
        "Prolonged key reuse reduces cryptographic hygiene."
      ],
      [
        "Pin by CA/intermediary",
        "More flexible for renovations.",
        "Trusts all valid certificates from that authority."
      ],
      [
        "Corporate truststore",
        "Scalable and governable model.",
        "Requires strong internal PKI governance."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: Java, truststore and common errors in corporate clients",
    "id": "deep-dive-java-truststore-and-common-errors-in-corporate-clients"
  },
  {
    "kind": "paragraph",
    "text": "Many enterprise systems that consume APIs run on Java. In these environments, TLS validation depends on the truststore used by the JVM or application. A common error occurs when the certificate works in the browser, but fails in the Java application. This can happen because the browser uses the operating system's truststore, while the JVM uses another set of CAs."
  },
  {
    "kind": "paragraph",
    "text": "The PKIX path building failed error typically indicates that the JVM was unable to build a chain of trust to a known CA. The solution should not be to disable TLS validation. The correct path is to import the correct CA into the appropriate truststore, correct the chain sent by the server or use a certificate issued by a CA already trusted by the JVM. In production, accepting all certificates is a serious vulnerability."
  },
  {
    "kind": "paragraph",
    "text": "It is also common to have a hostname problem. Even if the CA is trusted, the certificate must match the name used in the URL. If the application calls https://10.0.0.5 but the certificate was issued to api.interno.empresa, validation should fail. The solution is to call for the correct hostname, adjust DNS or issue a certificate with an appropriate SAN, do not ignore hostname verifier."
  },
  {
    "kind": "paragraph",
    "text": "In gateways that call Java backends or Java clients that call gateways, understanding these details reduces incidents. The team can explain why importing a certificate on one server does not affect another, why containers can have different truststores than the host machine and why JDK updates can change trusted CAs."
  },
  {
    "kind": "subhead",
    "text": "List CAs in a Java truststore"
  },
  {
    "kind": "code",
    "text": "keytool -list -keystore cacerts -storepass changeit"
  },
  {
    "kind": "subhead",
    "text": "Import a corporate CA into a laboratory truststore"
  },
  {
    "kind": "code",
    "text": "keytool -importcert -file ca-corporativa.pem -alias ca-corporativa -keystore truststore.jks"
  },
  {
    "kind": "subhead",
    "text": "Test Java handshake with detailed logs"
  },
  {
    "kind": "code",
    "text": "java -Djavax.net.debug=ssl,handshake -jar cliente.jar"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: TLS in Kubernetes, Ingress and Service Mesh",
    "id": "deep-dive-tls-in-kubernetes-ingress-and-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "In Kubernetes, TLS can terminate at several points: at the external load balancer, at the ingress controller, at the service mesh sidecar, at the pod itself, or at a combination of these points. Each termination changes the trust boundary and changes where policies can be applied. If Ingress ends TLS, it sees HTTP. If the mesh does mTLS between sidecars, the application can receive local traffic without dealing directly with certificates."
  },
  {
    "kind": "paragraph",
    "text": "Ingress controllers like NGINX, Envoy and others usually select certificates by SNI and forward them to internal services. Certificates can be managed by Kubernetes secrets, operators or integrations with external managers. The operational challenge is to ensure that secrets are protected, renewed, replicated correctly and associated with the correct host."
  },
  {
    "kind": "paragraph",
    "text": "Service Mesh adds internal mTLS between workloads, often with automatic issuance of short certificates. This model helps with internal Zero Trust, but does not eliminate the need for TLS at the edge. It also introduces a mesh CA, workload identity policies, and proprietary observability. Architects must map the difference between the external identity of the API and the internal identity of the workloads."
  },
  {
    "kind": "paragraph",
    "text": "When an API Gateway is before the cluster, the architecture can have external TLS at the gateway, re-encryption for Ingress and mTLS inside the mesh. This is powerful, but complex. Flow documentation, DNS names, certificates and endpoints become mandatory for troubleshooting and auditing."
  },
  {
    "kind": "table",
    "caption": "Table 7 — TLS endpoints on Kubernetes and enterprise platforms.",
    "headers": [
      "termination point",
      "What do you see",
      "Common usage"
    ],
    "rows": [
      [
        "External load balancer",
        "You can only see TLS or finish and see HTTP.",
        "Public exhibition and regional distribution."
      ],
      [
        "Ingress controller",
        "Normally see HTTP after finishing TLS.",
        "Routing by host/path within the cluster."
      ],
      [
        "API Gateway",
        "See HTTP and API context when TLS ends.",
        "Policies, security, analytics and monetization."
      ],
      [
        "Service mesh sidecar",
        "Protects east-west traffic between workloads.",
        "Internal mTLS and service identity."
      ],
      [
        "Application",
        "Full control within the code.",
        "Specific scenarios, but increases the responsibility of the development team."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: TLS, enterprise proxies, and inspection",
    "id": "deep-dive-tls-enterprise-proxies-and-inspection"
  },
  {
    "kind": "paragraph",
    "text": "Corporate proxies can operate in different ways. A simple proxy can just forward HTTPS connections using CONNECT, without inspecting the content. A proxy with TLS inspection acts as an intermediate authority: it terminates TLS with the client, creates another TLS connection with the destination, and presents the client with a certificate dynamically generated by a corporate CA installed on the device. This model allows inspection, but completely changes the chain of trust perceived by the customer."
  },
  {
    "kind": "paragraph",
    "text": "For company-managed browsers, this may be acceptable as per policy. For B2B APIs, external clients, and mTLS, inspection can break the flow. A pinning client may reject the certificate generated by the proxy. An mTLS flow may fail because the proxy does not have the client certificate or is unable to pass authentication in an equivalent way. Applications may fail if the corporate CA is not in the correct truststore."
  },
  {
    "kind": "paragraph",
    "text": "The presence of a proxy also affects troubleshooting. The certificate seen by the client may not be the actual gateway certificate. The source IP may change. The handshake with the destination can be done by the proxy, not by the original client. In incidents, it is necessary to identify whether there is TLS inspection along the way and compare tests from inside and outside the corporate network."
  },
  {
    "kind": "paragraph",
    "text": "For sensitive APIs, many organizations define inspection exclusion lists or dedicated channels. The decision involves defensive security, privacy, compliance, stability and strong authentication requirements. The technical point is that TLS stops being end-to-end when there is intermediate inspection, even if each section still uses TLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: mTLS and identity propagation",
    "id": "deep-dive-mtls-and-identity-propagation"
  },
  {
    "kind": "paragraph",
    "text": "When the gateway authenticates a client over mTLS, a question arises: how does this identity get to the backend? One option is for the gateway to make the decision locally and forward only an already authorized request. Another option is to propagate certificate attributes in internal headers. A third is to issue or exchange a token that represents the verified identity. Every choice has risks."
  },
  {
    "kind": "paragraph",
    "text": "Propagating certificates or attributes by header requires strongly securing the stretch between gateway and backend. The backend needs to trust that only the gateway can insert those headers. Otherwise, a client could forge X-Client-Cert or similar fields. Therefore, when identity headers are used, there must be network control, removal/rewriting of headers at the gateway, and ideally internal TLS or mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Swapping channel identity for token is a more explicit model. The gateway validates the certificate, applies rules, and calls the backend with an internal JWT, delegation token, or signed context. This brings identity closer to a format that backends understand better. On the other hand, it creates an additional responsibility: protecting the issuance, signature, validity and audience of this internal token."
  },
  {
    "kind": "paragraph",
    "text": "In financial environments, it is common to combine mTLS with OAuth. The certificate authenticates the technical client and helps link the channel; the token carries scopes, consents and authorization context. This separation improves auditability and avoids giving the certificate more power than it should have."
  },
  {
    "kind": "table",
    "caption": "Table 8 — mTLS identity propagation models.",
    "headers": [
      "propagation model",
      "Benefit",
      "Main risk"
    ],
    "rows": [
      [
        "Decision only at the gateway",
        "Backends become simple.",
        "Backend completely depends on the gateway for security context."
      ],
      [
        "Headers with certificate attributes",
        "Easy to integrate.",
        "Forge headers if the internal path is not protected."
      ],
      [
        "Signed internal token",
        "Explicit and verifiable context.",
        "Requires token issuance and validation governance."
      ],
      [
        "mTLS straight to the backend",
        "Backend validates client directly.",
        "Increases coupling and operational complexity."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: audit policies and evidence",
    "id": "deep-dive-audit-policies-and-evidence"
  },
  {
    "kind": "paragraph",
    "text": "In regulated environments, it is not enough to configure TLS correctly; It is necessary to prove that the configuration is correct. Evidence may include certificate inventory, expiration reports, version and cipher baselines, scan results, change logs, exception approvals, and incident logs. Without evidence, correct technical practice may be difficult to defend in an audit."
  },
  {
    "kind": "paragraph",
    "text": "The evidence must differentiate frontend, backend and mTLS. A report that only shows the domain's public certificate does not prove that internal connections to the backend validate certificates. Likewise, a list of registered client certificates does not prove that the policy actually requires mTLS on the right endpoint. The granularity of the evidence must follow the architecture."
  },
  {
    "kind": "paragraph",
    "text": "Auditing also needs to record exceptions. If a partner uses legacy cipher for a specified period, the exception must have justification, approver, expiration date, compensatory controls and remediation plan. Exceptions without a deadline become an informal baseline and weaken the security posture."
  },
  {
    "kind": "paragraph",
    "text": "A good practice is to transform TLS requirements into automated controls. Pipelines can validate certificates before deployment; scanners can check endpoints; alerts can warn of expiration; policies-as-code can prevent weak configurations; and dashboards can show adherence by product, environment and domain."
  },
  {
    "kind": "table",
    "caption": "Table 9 — Evidence for TLS audit.",
    "headers": [
      "Evidence",
      "Question that answers"
    ],
    "rows": [
      [
        "Certificate inventory",
        "What certificates exist and when do they expire?"
      ],
      [
        "Baseline TLS approved",
        "What versions and ciphers are allowed?"
      ],
      [
        "Scan result",
        "Does the exposed endpoint follow the baseline?"
      ],
      [
        "Change log",
        "Who changed the TLS certificate or policy?"
      ],
      [
        "Exception log",
        "Why is a legacy client still accepted?"
      ],
      [
        "TLS backend testing",
        "Does the gateway correctly validate the internal server?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Deep dive: frequent anti-patterns",
    "id": "deep-dive-frequent-anti-patterns"
  },
  {
    "kind": "subhead",
    "text": "Disable certificate validation to resolve incident"
  },
  {
    "kind": "paragraph",
    "text": "It might make the call work, but it removes server authentication and makes room for man-in-the-middle. The correct solution is to adjust the chain, truststore, hostname or certificate."
  },
  {
    "kind": "subhead",
    "text": "Use the same wildcard certificate in all environments"
  },
  {
    "kind": "paragraph",
    "text": "It increases the impact of leaks and makes insulation difficult. Development, approval and production environments must have separate governance."
  },
  {
    "kind": "subhead",
    "text": "Trust any unscoped internal CA"
  },
  {
    "kind": "paragraph",
    "text": "A truststore that is too broad may accept improper certificates. The trust must be sufficient for the use case, not unlimited."
  },
  {
    "kind": "subhead",
    "text": "Renew certificate without validating full chain"
  },
  {
    "kind": "paragraph",
    "text": "The final certificate may be correct, but the missing intermediate causes clients to fail. Always test string presented by the endpoint."
  },
  {
    "kind": "subhead",
    "text": "Confusing transport certificate with API authorization"
  },
  {
    "kind": "paragraph",
    "text": "TLS authenticates the channel or technical entity. Operation permissions still need a policy, token, scope or business rule."
  },
  {
    "kind": "subhead",
    "text": "Investigate 401 before testing handshake"
  },
  {
    "kind": "paragraph",
    "text": "If the handshake fails, there is no HTTP or 401. Troubleshooting needs to follow layers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended reading",
    "id": "official-references-and-recommended-reading"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3 - https://www.rfc-editor.org/info/rfc8446/ RFC 9325 - Recommendations for Secure Use of TLS and DTLS - https://datatracker.ietf.org/doc/rfc9325/ RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile - https://www.rfc-editor.org/info/rfc5280/ RFC 6066 - Transport Layer Security (TLS) Extensions - SNI - https://datatracker.ietf.org/doc/html/rfc6066 RFC 7301 - TLS Application-Layer Protocol Negotiation Extension - https://datatracker.ietf.org/doc/html/rfc7301 RFC 6960 - Online Certificate Status Protocol - OCSP - https://www.rfc-editor.org/info/rfc6960/ RFC 6797 - HTTP Strict Transport Security (HSTS) - https://www.rfc-editor.org/info/rfc6797/ RFC 8555 - Automatic Certificate Management Environment (ACME) - https://datatracker.ietf.org/doc/html/rfc8555/ NIST SP 800-52 Rev. 2 - Guidelines for TLS Implementations - https://csrc.nist.gov/pubs/sp/800/52/r2/final Microsoft Learn - Configure custom domain name for Azure API Management - https://learn.microsoft.com/en-us/azure/api-management/configure-custom-domain Microsoft Learn - Secure APIs using client certificate authentication in Azure API Management - https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-mutual-certificates-for-clients Axway Documentation - Manage certificates and keys - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apigtw_admin/ general_certificates/index.html Axway Documentation - Configure HTTP services and HTTPS interfaces - https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_gw_instances/ general_services/index.html"
  }
];
