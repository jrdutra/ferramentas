import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const MTLS_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Mutual authentication in the enterprise path of an API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/overview.svg",
    "alt": "Overview of mutual authentication in the enterprise path of an API",
    "caption": "Overview - from certificate presentation to consumer authorization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "In previous chapters, certificates, PKI and X.509 trust were presented as fundamentals of API protection. This chapter delves into mutual TLS, or mTLS, the mechanism in which client and server authenticate each other during the TLS handshake. In addition to validating the server's certificate, the client presents its own credential and demonstrates that it controls the corresponding private key."
  },
  {
    "kind": "paragraph",
    "text": "In enterprise environments, mTLS is used in machine-to-machine integrations, exposing APIs to partners, communication between microservices, service meshes, administrative access, and OAuth flows with certificate-bound tokens. However, enabling the client certificate requirement is just the beginning. Actual security depends on issuance, chain of trust, extension validation, identity mapping, authorization, rotation, revocation, and observability."
  },
  {
    "kind": "paragraph",
    "text": "For professionals working with API Gateways, it is essential to understand at which point the TLS session ends. A gateway can authenticate the consumer and create a different connection to the backend; a balancer can terminate TLS before the gateway; or a fabric can establish new workload identities in internal traffic. Each hop has independent certificates, truststores, timeouts and responsibilities."
  },
  {
    "kind": "paragraph",
    "text": "The goal is not just to recognize handshake messages, but to build a complete operational model. In the end, the reader should be able to design trust policies, separate authentication from authorization, plan the credential lifecycle and investigate failures such as unknown_ca, bad_certificate, certificate_expired, missing certificate and identity divergence."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Follow the explanations with the commands and laboratories presented. Always record: who initiates the connection, who requests the certificate, which chain was presented, which truststore is used, which identity was extracted, and which authorization policy decided access."
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
      "Differentiate one-way TLS, mutual authentication and application authorization.",
      "Explain CertificateRequest, Certificate, CertificateVerify and Finished in TLS 1.3.",
      "Validate string, validity period, Key Usage, Extended Key Usage, SAN, algorithms and revocation.",
      "Design truststores and trust bundles segmented by integration domain.",
      "Map certificates to canonical identities of consumers, partners, and workloads.",
      "Apply mTLS to API Gateways, service meshes and communication with backends.",
      "Understand OAuth authentication via mTLS and certificate-bound tokens.",
      "Plan issuance, storage, rotation, revocation, and compromise response.",
      "Use OpenSSL, curl, Java and capture tools for troubleshooting.",
      "Define metrics, logs, alerts and hardening controls for operation at scale."
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
      "9.1 From one-way TLS to mTLS",
      "9.2 mTLS handshake in TLS 1.3",
      "9.3 Full client certificate validation",
      "9.4 From authentication to authorization",
      "9.5 mTLS on API Gateways",
      "9.6 mTLS between microservices and service mesh",
      "9.7 OAuth 2.0 with mutual TLS",
      "9.8 Lifecycle of certificates and keys",
      "9.9 Enterprise architectural patterns",
      "9.10 Practical configuration and diagnostic tools",
      "9.11 Frequent failures and troubleshooting method",
      "9.12 Observability, auditing and metrics",
      "9.13 Hardening and security decisions",
      "9.14 Case Study: B2B Payments Integration",
      "9.15 Technical summary and review",
      "Technical references, exercises and operational checklist"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.1 From one-way TLS to mTLS",
    "id": "9-1-from-one-way-tls-to-mtls"
  },
  {
    "kind": "paragraph",
    "text": "In the most common use of HTTPS, authentication occurs only server-to-client. The server presents its certificate, the client builds and validates a chain of trust, verifies the expected name, and participates in session key negotiation. This process protects the confidentiality and integrity of traffic and reduces the risk of the client talking to an imposter server."
  },
  {
    "kind": "paragraph",
    "text": "The client, however, typically does not present cryptographic identity during the handshake. Your authentication takes place later, within the application protocol, through a password, session, API key, OAuth token, message signature or other mechanism. mTLS adds a second authentication to the channel establishment itself: the server requests a certificate from the client, validates that certificate, and demands proof of possession of the corresponding private key."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "What is authenticated"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-01.svg",
    "alt": "Comparison between one-way TLS authentication and TLS mutual authentication",
    "caption": "Figure 1 - Conceptual comparison between unilateral TLS and mutual TLS."
  },
  {
    "kind": "paragraph",
    "text": "A client certificate does not authenticate an \"HTTP request\" in isolation; it authenticates the entity participating in the TLS session. In a persistent connection, multiple requests can share the same authenticated channel. This improves efficiency, but requires care when relating TLS identity, connection pooling, HTTP/2 multiplexing, intermediate proxies and application authorization context."
  },
  {
    "kind": "paragraph",
    "text": "Cryptographic proof occurs because the authenticated party signs data derived from the handshake transcript with its private key. The private key is not sent over the network. The certificate carries the public key and attributes signed by a certification authority, while the handshake signature demonstrates that the entity that presented the certificate controls the corresponding private key."
  },
  {
    "kind": "paragraph",
    "text": "TLS 1.3 defines separate contexts for client and server signature in the CertificateVerify message. [1]"
  },
  {
    "kind": "subhead",
    "text": "Key concept"
  },
  {
    "kind": "paragraph",
    "text": "mTLS is not just “HTTPS with two certificates”. It is a composition of three guarantees: chain of trust, proof of possession of the private key and binding of identity to the TLS session."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "What mTLS can't solve alone"
  },
  {
    "kind": "paragraph",
    "text": "Even when the certificate is valid, you still need to decide what that identity can do. Authentication responds to “who participates in the connection”; Authorization answers “what resources and operations this identity can access”. Allowing any certificate issued by a corporate CA can excessively expand the access surface if the same hierarchy issues certificates for hundreds of systems with different purposes."
  },
  {
    "kind": "paragraph",
    "text": "mTLS also does not replace input validation, rate limiting, segregation of duties, logic abuse protection, auditing, or code security. It can reduce risks from reusable credentials and rogue clients, but an authenticated consumer is still capable of sending malformed payloads, exploiting excessive permissions, or using the API outside of its intended purpose."
  },
  {
    "kind": "subhead",
    "text": "Attention"
  },
  {
    "kind": "paragraph",
    "text": "Never treat “valid certificate” as a synonym for “full access”. The validation result must feed into an explicit authorization policy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.2 mTLS handshake in TLS 1.3",
    "id": "9-2-mtls-handshake-in-tls-1-3"
  },
  {
    "kind": "paragraph",
    "text": "The TLS 1.3 handshake negotiates version, algorithms, key exchange parameters, and cryptographic material to secure the session. When the server requires authentication from the client, it sends CertificateRequest. This message informs you that a client certificate is expected and may indicate accepted certificate authorities and signing algorithms."
  },
  {
    "kind": "paragraph",
    "text": "Then the server sends its own chain, its proof of possession, and the Finished message. The client responds with its certificate chain, the CertificateVerify message, and its Finished message. The signature in CertificateVerify is calculated based on the handshake transcript, with a specific context."
  },
  {
    "kind": "paragraph",
    "text": "This prevents a signature made for another purpose from being reused as valid proof within TLS. The Finished message confirms integrity and ownership of the secrets derived from the negotiation. [1]"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "CertificateRequest and certificate selection"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-02.svg",
    "alt": "Simplified handshake sequence with mutual authentication in TLS 1.3",
    "caption": "Figure 2 - Simplified mutual authentication sequence in TLS 1.3."
  },
  {
    "kind": "paragraph",
    "text": "A client can have multiple certificates. The correct selection depends on the information sent by the server, the supported algorithms, the supported issuer, the purpose of the certificate, and the client's local policy. In automated integrations, this decision must be deterministic."
  },
  {
    "kind": "paragraph",
    "text": "An ambiguous configuration may select a wrong certificate or fail after a truststore update. The list of acceptable authorities serves as guidance, but should not be confused with final authorization. The server still needs to validate the presented string, extensions and application rules."
  },
  {
    "kind": "paragraph",
    "text": "In environments with multiple PKIs, it is common to separate trust bundles by integration domain to prevent a CA trusted for one context from being improperly accepted in another."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "CertificateVerify: proof of possession"
  },
  {
    "kind": "paragraph",
    "text": "The presence of a certificate alone does not prove that the participant controls the private key. Anyone can copy a public certificate. The CertificateVerify message contains a signature produced with the private key corresponding to the certificate's public key."
  },
  {
    "kind": "paragraph",
    "text": "The other side verifies the signature and confirms that the presenter holds the key necessary to participate in that session. This distinction is important during incidents. Leaking a public certificate does not compromise identity; the private key leak, yes."
  },
  {
    "kind": "paragraph",
    "text": "Therefore, protection of the key file, keystore, in-cluster secret, HSM, or remote signing mechanism is central."
  },
  {
    "kind": "paragraph",
    "text": "File permissions, access control, non-exportability, rotation, and auditing should be treated as primary security controls."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "TLS 1.2 and TLS 1.3"
  },
  {
    "kind": "table",
    "caption": "Table 1 - Operational comparison between TLS 1.2 and TLS 1.3.",
    "headers": [
      "Appearance",
      "TLS 1.2",
      "TLS 1.3"
    ],
    "rows": [
      [
        "Negotiation",
        "More historic options and legacy combinations.",
        "Simplified assembly and removal of old unsafe constructions."
      ],
      [
        "Customer authentication",
        "CertificateRequest, Certificate and CertificateVerify according to suite and flow.",
        "Certificate authentication with transcript and context defined for CertificateVerify."
      ],
      [
        "Latency",
        "Full handshake typically requires more exchanges.",
        "Master handshake reduces round trips."
      ],
      [
        "Algorithms",
        "Allows combinations that need explicit restriction.",
        "Removes several obsolete options, but still requires corporate policy."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Architectural decision"
  },
  {
    "kind": "paragraph",
    "text": "Supporting TLS 1.2 for compatibility does not mean enabling any legacy algorithm. The policy should restrict versions, ciphers, signatures and curves according to risk and corporate requirements. NIST SP 800-52 Rev. 2 provides TLS selection and configuration guidelines. [4]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.3 Full client certificate validation",
    "id": "9-3-full-client-certificate-validation"
  },
  {
    "kind": "paragraph",
    "text": "Validation should not be limited to checking whether the certificate is within its expiration date. The server needs to build a chain to an authorized trust anchor, verify signatures, CA restrictions, critical extensions, applicable policies, and purpose of use. The X.509 certificate profile and path validation algorithm are defined in RFC 5280, later updated and clarified by other documents. [2][5] In an enterprise API, the acceptance rule is often more restrictive than generic X.509 validation."
  },
  {
    "kind": "paragraph",
    "text": "A certificate may be cryptographically valid, but belong to a chain that was not approved for that product, have a non-standard SAN, use an incompatible purpose, have been issued for a different environment or represent a deactivated application."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Essential checks"
  },
  {
    "kind": "table",
    "caption": "Table 2 - Essential checks when validating the client certificate.",
    "headers": [
      "Verification",
      "What should be evaluated",
      "Risk when ignored"
    ],
    "rows": [
      [
        "Chain of trust",
        "Subscriptions to an explicitly trusted root or intermediate CA.",
        "Acceptance of certificates issued by unauthorized hierarchy."
      ],
      [
        "Temporal validity",
        "notBefore and notAfter, reliable clock and controlled margin.",
        "Use of an expired or not yet valid certificate."
      ],
      [
        "Basic Constraints",
        "Intermediates marked as CA and depth respected.",
        "Invalid chain construction or misuse of end certificate as CA."
      ],
      [
        "Key Usage/EKU",
        "Use of key and clientAuth compatible with the purpose.",
        "Certificate issued for another purpose used as a TLS client."
      ],
      [
        "SAN/identity",
        "Approved format, namespace and normalization.",
        "Ambiguous mapping or false positives."
      ],
      [
        "Revocation",
        "CRL, OCSP or equivalent strategy.",
        "Continuity of access after compromise."
      ],
      [
        "Algorithms",
        "Allowed signatures, curves and sizes.",
        "Reliance on weak or obsolete algorithms."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore is not an indiscriminate collection of CAs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-03.svg",
    "alt": "Client certificate validation and acceptance steps",
    "caption": "Figure 3 - Client certificate validation and acceptance steps."
  },
  {
    "kind": "paragraph",
    "text": "The truststore defines which anchors can start an accepted chain. In enterprise environments, reusing the operating system's global truststore may be inappropriate for mTLS APIs, as it often contains public authorities intended for authenticating Internet servers. For enterprise customers, it is preferable to maintain trust sets dedicated to the integration domain."
  },
  {
    "kind": "paragraph",
    "text": "It is also recommended to separate trust by context: external partners, internal applications, mesh workloads and administrative access may have different roots and policies. This segmentation reduces the impact of an improper issuance and makes it easier to revoke a hierarchy without interrupting unrelated integrations."
  },
  {
    "kind": "subhead",
    "text": "Good practice"
  },
  {
    "kind": "paragraph",
    "text": "Treat each trust bundle as a versioned security policy. Record owner, purpose, included CAs, environments, affected consumers, review date, and change process."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identity in Subject and SAN"
  },
  {
    "kind": "paragraph",
    "text": "Historically, many implementations extracted the identity from the Common Name in the Subject. In modern architectures, Subject Alternative Name is more appropriate for structured identities. The SAN can carry DNS, URI, IP address, email or other names."
  },
  {
    "kind": "paragraph",
    "text": "For workloads, corporate namespaced URIs or SPIFFE-style identities can reduce ambiguity and facilitate automated policies. The central point is not just choosing a field, but defining an identity contract. The format needs to be unique, stable, non-reusable and linked to the application lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "Names based solely on hostname may be inappropriate when the workload is ephemeral; human names can change; project identifiers can be reused. A good technical identity remains traceable to the owner and corporate inventory."
  },
  {
    "kind": "subhead",
    "text": "Namespace Conceptual Example"
  },
  {
    "kind": "paragraph",
    "text": "Example SAN URI for a workload identity:"
  },
  {
    "kind": "code",
    "text": "URI: spiffe://corp.exemplo/financeiro/pagamentos/worker-a\nTrust domain: corp.exemplo\nArea: financeiro\nProduct: pagamentos\nWorkload: worker-a"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.4 From authentication to authorization",
    "id": "9-4-from-authentication-to-authorization"
  },
  {
    "kind": "paragraph",
    "text": "After validating the certificate, the edge component must extract a canonical identity. This identity must not be the entire certificate or an unstable concatenation of fields. Typically, a primary attribute, such as SAN URI, SAN DNS, or registered identifier, is chosen and strict normalization is applied."
  },
  {
    "kind": "paragraph",
    "text": "The result is associated with a consumer or workload record. Authorization can then consider identity, route, HTTP method, environment, scope, contract, time, network origin, and additional context. In an API Gateway, the certificate can select an access plan, a list of APIs, quotas, and policies."
  },
  {
    "kind": "paragraph",
    "text": "In a service mesh, the workload identity can be used in service-to-service rules, for example: only the billing service can invoke the settlement operation."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Mapping Strategies"
  },
  {
    "kind": "table",
    "caption": "Table 3 - X.509 identity mapping strategies.",
    "headers": [
      "Strategy",
      "Advantage",
      "Limitation"
    ],
    "rows": [
      [
        "Full Subject DN",
        "Available in virtually all certificates.",
        "May vary by order, escaping and optional attributes."
      ],
      [
        "common name",
        "Simple and widely known.",
        "It can be ambiguous and is not the best field for modern identity."
      ],
      [
        "SAN DNS",
        "Suitable for identities associated with DNS names.",
        "It may confuse workload identity with location."
      ],
      [
        "SAN URI",
        "Allows structured and semantic namespace.",
        "It requires consistent governance and support."
      ],
      [
        "Thumbprint",
        "Identifies a specific issue.",
        "Changes at every rotation."
      ],
      [
        "SPKI hash",
        "It may survive reissuance with the same key.",
        "May discourage key rotation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Stable identity versus certificate instance"
  },
  {
    "kind": "paragraph",
    "text": "An application has a logical identity; a certificate is a temporary credential of that identity. Authorization should preferably be based on logical identity, while the inventory records the serial number, issuer, thumbprint, key and validity of the current issue. This allows you to rotate certificates without reconfiguring all permissions."
  },
  {
    "kind": "paragraph",
    "text": "There are cases where policy requires pinning a specific issue or key. This technique can increase control, but increases operational costs. If the rule is linked to the thumbprint, every rotation requires coordinated updating."
  },
  {
    "kind": "paragraph",
    "text": "If it is linked to the key, the cryptographic rotation is no longer transparent. Use must be conscious and reserved for scenarios where trust in the CA and attributes is not sufficient."
  },
  {
    "kind": "subhead",
    "text": "Design rule"
  },
  {
    "kind": "paragraph",
    "text": "Separate three objects: application identity, current X.509 credential, and authorization policy. Mixing these concepts creates coupling and makes the rotation riskier."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identity propagation after TLS termination"
  },
  {
    "kind": "paragraph",
    "text": "When the gateway ends the mTLS session, the backend does not directly receive the original certificate in the handshake. If the identity needs to reach the service, the gateway must propagate it reliably. Inserting a simple header such as X-Client-Cert or X-Client-Id is only safe when the backend accepts traffic exclusively from the gateway and the internal channel prevents injection or alteration by third parties."
  },
  {
    "kind": "paragraph",
    "text": "A robust approach is to remove any headers coming from the client, generate a new attribute from the validated certificate, sign or secure the context, and establish mTLS between gateway and backend. In more advanced architectures, identity can be represented in a short-lived internal token issued by a trusted component. The service needs to distinguish original client identity, gateway identity, and delegation context."
  },
  {
    "kind": "subhead",
    "text": "Recommended pipeline"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Remove externally received identity headers.",
      "Validate chain, validity, EKU, SAN and revocation.",
      "Resolve SAN URI -> corporate consumer_id.",
      "Apply authorization and quota.",
      "Create short-lived, signed internal context.",
      "Forward to backend via new mTLS channel."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.5 mTLS on API Gateways",
    "id": "9-5-mtls-on-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway is a natural point to apply mTLS in external integrations because it concentrates listeners, server certificates, client truststores, policies, logs and rate limiting. It can refuse the connection before processing HTTP, reducing exposure of APIs to consumers without trusted credentials. It also centralizes onboarding rules and segregation by domain or product."
  },
  {
    "kind": "paragraph",
    "text": "This centralization does not eliminate the need for careful design. You need to decide whether the gateway requires a certificate on the entire listener, on specific hostnames or on specific routes; how to treat clients who do not use mTLS; how to select truststores; how to publish the correct string; how to record handshake failures; and how to propagate the validated identity to internal services."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Dedicated or shared listener"
  },
  {
    "kind": "table",
    "caption": "Table 4 - mTLS listener and application alternatives.",
    "headers": [
      "Model",
      "Description",
      "When to use"
    ],
    "rows": [
      [
        "Dedicated listener",
        "Unique hostname and port require client certificate for every connection.",
        "Critical B2B integrations, strong segregation and predictable operation."
      ],
      [
        "optional mTLS",
        "The server requests a certificate, but also accepts clients without a credential.",
        "Controlled migration or mixed routes, with strict authorization."
      ],
      [
        "Policy after termination",
        "A front-end proxy collects the certificate and passes protected context to the gateway.",
        "When the TLS terminator is outside the gateway and strong operational trust exists."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Termination, re-encryption and passthrough"
  },
  {
    "kind": "paragraph",
    "text": "In TLS termination, the gateway decrypts the traffic, validates the client, and creates a new connection to the backend. This allows you to inspect HTTP and enforce API policies. In passthrough, the layer 4 gateway forwards the connection without terminating TLS; the backend performs the authentication."
  },
  {
    "kind": "paragraph",
    "text": "Passthrough preserves end-to-end authentication but limits Layer 7 capabilities in the middle. Re-encryption combines external termination with new internal TLS or mTLS. This pattern is common because it allows API control at the gateway and secures the journey to the service."
  },
  {
    "kind": "paragraph",
    "text": "It is important not to say that there is \"end-to-end mTLS\" when there are two distinct sessions. There are two trust relationships: client-gateway and gateway-backend. The identity of the original client needs to be propagated separately."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.6 mTLS between microservices and service mesh",
    "id": "9-6-mtls-between-microservices-and-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "In microservices architectures, mTLS can authenticate workloads and secure east-west traffic. A service mesh typically uses sidecar proxies or dataplane nodes to automatically establish mTLS connections. The control plane distributes identities, short-lived certificates, trust bundles, and policies."
  },
  {
    "kind": "paragraph",
    "text": "This reduces the need for each application to directly implement all TLS logic. Automation, however, does not eliminate governance. The organization needs to define the trust domain, identity of each workload, attestation process, issuance, rotation, authorization policy and limits between clusters, environments and business units."
  },
  {
    "kind": "paragraph",
    "text": "A fabric configured in permissive mode can accept plaintext and mTLS traffic simultaneously, which can maintain bypass paths during migrations."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Workload identity"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-06.svg",
    "alt": "Workload identities protected by mutual TLS in a service mesh",
    "caption": "Figure 6 - Workload identities in a service mesh."
  },
  {
    "kind": "paragraph",
    "text": "A workload identity must represent the running software, not just the node or IP address. Containers and pods are ephemeral; IPs change and can be reused. By associating the certificate with the service account, namespace, cluster and workload, the policy follows the application rather than the momentary network topology."
  },
  {
    "kind": "paragraph",
    "text": "The issuance process needs to rely on some form of attestation: platform identity, service account token, instance metadata, TPM, registered node, or other evidence. If any process can request a certificate on behalf of another workload, mTLS will just encrypt a false identity. Therefore, the security of the sender and the bootstrap is as important as the handshake."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Permissive and strict modes"
  },
  {
    "kind": "table",
    "caption": "Permissive and strict modes in a service mesh.",
    "headers": [
      "Mode",
      "Behavior",
      "Operational risk"
    ],
    "rows": [
      [
        "Permissive",
        "Accepts mTLS and plaintext connections.",
        "Facilitates migration, but can maintain silent bypass."
      ],
      [
        "Strict",
        "Requires mTLS for covered traffic.",
        "Safer; requires full inventory and compatibility."
      ],
      [
        "Disabled",
        "Does not use mTLS in that scope.",
        "Only suitable when another control offers equivalent and documented assurance."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "A secure migration can start with telemetry, identify dependencies, enable automatic issuance, apply permissive mTLS for a short period and evolve into strict mode with a defined date."
  },
  {
    "kind": "paragraph",
    "text": "Leaving the environment indefinitely permissive creates a false sense of zero trust. The goal must be measurable: percentage of authenticated connections, incompatible workloads and exceptions with a deadline. It is also necessary to validate egress."
  },
  {
    "kind": "paragraph",
    "text": "An authenticated service within the fabric can initiate connections to external destinations. Outbound policies, egress gateways, and caller identity help prevent exfiltration and make auditing more complete."
  },
  {
    "kind": "subhead",
    "text": "Attention"
  },
  {
    "kind": "paragraph",
    "text": "Automatic encryption without workload-to-workload authorization produces a protected but still excessively open network. mTLS must be combined with explicit policies on who can call whom."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.7 OAuth 2.0 with mutual TLS",
    "id": "9-7-oauth-2-0-with-mutual-tls"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 typically authenticates clients to the authorization server and issues tokens for access to resources. RFC 8705 defines two main uses of mTLS: client authentication at the token endpoint and certificate-bound access tokens. Authentication can use certificates issued by PKI or previously registered self-signed certificates, depending on the model adopted. [3] In client authentication, the authorization server validates the mTLS connection and associates the certificate with the client_id."
  },
  {
    "kind": "paragraph",
    "text": "This replaces or supplements shared secrets. Because the private key is not transmitted, the risk of reusing a static secret decreases. Still, the private key needs to be protected and the certificate registry must support rotation."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Certificate-bound tokens"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-07.svg",
    "alt": "OAuth token linked to the certificate presented in the mTLS connection",
    "caption": "Figure 7 - OAuth token linked to the mTLS certificate."
  },
  {
    "kind": "paragraph",
    "text": "A traditional bearer token can be used by whoever owns it. If it is exfiltrated, another process can present it to the resource server. A certificate-linked token includes or references the client key/certificate thumbprint."
  },
  {
    "kind": "paragraph",
    "text": "The resource server requires mTLS and verifies that the credential used in the connection matches the token binding. Thus, token and private key need to be present together. This technique reduces the value of a stolen token in isolation but introduces interoperability requirements."
  },
  {
    "kind": "paragraph",
    "text": "The authorization server, gateway and resource server need to agree on the confirmation information, the certificate presented and the way of comparison. In architectures with proxies, mTLS termination must preserve reliable evidence for the component that validates the binding."
  },
  {
    "kind": "subhead",
    "text": "Key concept"
  },
  {
    "kind": "paragraph",
    "text": "Token linked to certificate does not eliminate expiration, audience, scope and issuer validation. It adds proof of possession to the use of the token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Summary flow"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The client establishes mTLS with the authorization server and requests a token.",
      "The authorization server authenticates the client and binds the token to the presented key/certificate.",
      "The client establishes mTLS with the resource server or gateway and sends the token.",
      "The resource server validates signature, issuer, audience, expiration, scopes and certificate confirmation."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The request is only accepted when the token and proof of possession match."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "PKI versus registered self-signed certificate"
  },
  {
    "kind": "table",
    "caption": "PKI versus registered self-signed certificate.",
    "headers": [
      "Model",
      "How trust is established",
      "Implication"
    ],
    "rows": [
      [
        "PKI",
        "Chain to trusted CA and association by certificate attributes.",
        "Scale with emission governance; requires well-managed PKI."
      ],
      [
        "Registered self-signed",
        "Certificate or public key is registered directly to the OAuth client.",
        "Reduces dependence on AC, but requires coordinated updating at each rotation."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Direct registration may be suitable for a few high-criticality customers, but the cost grows with the number of integrations and environments. The decision must consider scale, automation, segregation and revocation capacity."
  },
  {
    "kind": "paragraph",
    "text": "When the gateway validates the token and finishes mTLS, it must verify binding before forwarding. Passing just the bearer token to the backend without context may be acceptable if the gateway is the trusted enforcement point and the internal channel is protected. If the backend also validates proof of possession, it needs to receive authenticated evidence of the certificate or participate directly in mTLS."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.8 Lifecycle of certificates and keys",
    "id": "9-8-lifecycle-of-certificates-and-keys"
  },
  {
    "kind": "paragraph",
    "text": "Most mTLS issues in production are operational: expired certificate, incomplete chain, incorrect clock, outdated truststore, non-overlapping rotation, inaccessible key, or non-working revocation. The design must assume that certificates expire and will be replaced. Renovation is no exception; It is a normal part of the system."
  },
  {
    "kind": "paragraph",
    "text": "A mature program maintains an inventory of certificates, owners, applications, environments, issuers, keys, expiration dates, dependencies, and policies. Alerts must begin early enough for diagnosis and change. Issuance and distribution automation reduces manual failures, but needs to include strong requestor authentication and audit trail."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Issuance and bootstrap"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-08.svg",
    "alt": "Operational lifecycle of client certificates",
    "caption": "Figure 8 - Certificate operational life cycle."
  },
  {
    "kind": "paragraph",
    "text": "The first certificate creates a bootstrap problem: how does the CA know that the requestor represents a certain application? The response may involve human approval, platform identity, one-time secret, node attestation, service account, or authenticated pipeline. The mechanism must prevent a team from requesting credentials for another product's identity."
  },
  {
    "kind": "paragraph",
    "text": "The signature request must generate the key in the most appropriate location. In many cases, the private key must remain in the workload, HSM, or key vault and only the CSR must be sent. Generating the key centrally and distributing it increases the number of places where it can leak."
  },
  {
    "kind": "paragraph",
    "text": "When export is necessary, transport needs to be secured and audited."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Rotation without downtime"
  },
  {
    "kind": "paragraph",
    "text": "Rotation must use window overlay. The server can temporarily trust the old and new credentials while the client receives the new certificate and restarts or reloads the configuration. Only after confirming the use of the new credential is the old one removed."
  },
  {
    "kind": "paragraph",
    "text": "In exchange for CA, the overlay must include old and new chain, with rollback plan. Applications need to know how to reload certificates. Some libraries load keystore only at startup; others support dynamic reloading."
  },
  {
    "kind": "paragraph",
    "text": "Coordinated restarts can generate spikes in connections and unavailability. Short-term certificates reduce the window of exposure but require highly reliable automation and observability of the renewal process."
  },
  {
    "kind": "subhead",
    "text": "Rotation pattern"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Publish new CA or chain to validators.",
      "Issue new credential for the same logical identity.",
      "Accept old and new credential during overlay.",
      "Confirm adoption by telemetry and synthetic testing.",
      "Remove old credential and revoke when applicable."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Revocation"
  },
  {
    "kind": "paragraph",
    "text": "Revoking a certificate means declaring that it should no longer be accepted before expiration. The PKI can publish CRLs or respond via OCSP. Validation needs to define behavior when the status service is unavailable: fail-open preserves availability, but can accept revoked credentials; fail-closed increases security, but can break integrations when the verifier is unavailable."
  },
  {
    "kind": "paragraph",
    "text": "In internal environments with very short certificates, some architectures prioritize rapid expiration and identity locking in the control plane. This does not eliminate the need for a strategy for immediate commitment. The choice between CRL, OCSP, local lists, trust removal, serial denylist or short issue must be documented and tested."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Private key protection"
  },
  {
    "kind": "table",
    "caption": "Private key protection.",
    "headers": [
      "Location",
      "Advantages",
      "Care"
    ],
    "rows": [
      [
        "Protected file",
        "Simple and compatible.",
        "Permissions, copies, backup, container image and logs."
      ],
      [
        "Keystore PKCS#12/JKS",
        "Integration with Java platforms.",
        "Password, distribution, reload and file access."
      ],
      [
        "Orchestrator Secret",
        "Automation and assembly in the workload.",
        "Control access to namespace, etcd, snapshots and rotation."
      ],
      [
        "HSM/KMS",
        "Key may be non-exportable and operations are audited.",
        "Latency, availability, cost and TLS compatibility."
      ],
      [
        "Sidecar/agent",
        "Abstracts application emission and rotation.",
        "Trust in the agent, local socket and workload isolation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.9 Enterprise architectural patterns",
    "id": "9-9-enterprise-architectural-patterns"
  },
  {
    "kind": "paragraph",
    "text": "There is no single mTLS topology for all cases. The design must consider trust boundaries, need for inspection, responsibility for certificates, auditing requirements, legacy, and scale. The following are recurring patterns across API platforms."
  },
  {
    "kind": "paragraph",
    "text": "The common element is making trust relationships explicit. Each TLS session has its own participants and policy. When there are proxies, balancers and gateways, the original connection ends at some point."
  },
  {
    "kind": "paragraph",
    "text": "From there, a new session can be created with another identity. Diagrams and documentation should avoid the impression that the client certificate magically traverses the entire chain."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pattern A - partner to gateway"
  },
  {
    "kind": "paragraph",
    "text": "The partner receives a client certificate and connects to a dedicated hostname. The gateway validates the chain, extracts the identity, applies quota and authorization, and records the result. The backend trusts the gateway and receives a protected internal context."
  },
  {
    "kind": "paragraph",
    "text": "This pattern is suitable for B2B, Open Finance, payment integrations, and APIs with a two-way contract. The main risk is insecure identity propagation. The backend must not accept the same header from clients that can bypass the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Network rules, internal mTLS, and context signing reduce this risk. Partner registration must link certificate, environment, contracts, contacts and rotation plan."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pattern B - gateway as backend mTLS client"
  },
  {
    "kind": "paragraph",
    "text": "The gateway uses its own credential to authenticate to each backend or domain. This identity represents the gateway, not the external partner. The backend authorizes the gateway and, when necessary, uses additional context to apply permissions from the original consumer."
  },
  {
    "kind": "paragraph",
    "text": "It is a useful pattern for consolidating egress and securing legacy services. Using the same gateway credential for all backends creates a large radius of impact. It is preferable to segment certificates by environment, cluster, domain, or product."
  },
  {
    "kind": "paragraph",
    "text": "Thus, compromising a key does not grant universal access and revocation can be targeted."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pattern C - passthrough to service"
  },
  {
    "kind": "paragraph",
    "text": "A layer 4 balancer forwards the TLS session to the service, which directly validates the client's certificate. Authentication is really between client and service, and intermediaries do not access HTTP. This pattern may be necessary when requirements require termination at the destination or when the service implements a non-HTTP protocol."
  },
  {
    "kind": "paragraph",
    "text": "The limitation is the loss of layer 7 gateway functionality such as transformation, payload validation, and content routing. Observability can also be more difficult. You can combine passthrough with layer 4 telemetry, but API policies must reside in the service or another component within the session."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pattern D - automated workload identity"
  },
  {
    "kind": "paragraph",
    "text": "The platform issues short certificates for workloads and the mesh enforces mTLS and authorization. The developer uses a logical identity, while rotation and trust bundles are managed by the control plane. This standard offers scale and reduces static credentials, but depends on platform maturity."
  },
  {
    "kind": "paragraph",
    "text": "The biggest risk is blindly trusting automation. Attestation, issuer RBAC, isolation between namespaces, agent socket protection, and approval policy need to be audited. An attacker who can request identity from another service can bypass all policies based on that identity."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.10 Practical configuration and diagnostic tools",
    "id": "9-10-practical-configuration-and-diagnostic-tools"
  },
  {
    "kind": "paragraph",
    "text": "Command-line tools help check chain, handshake, presented certificates, and failure causes. They must be used in authorized environments and with care not to expose keys in history, logs or processes. The examples below are deliberately generic and need to be adapted to your organization's operating system and policy."
  },
  {
    "kind": "paragraph",
    "text": "Effective diagnostics separates layers: DNS resolution, TCP connectivity, TLS negotiation, server validation, client certificate request, credential selection, chain validation, HTTP authorization, and API policy. Trying to resolve everything as “error 403” can hide the fact that the TLS connection was not even established."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Test with curl"
  },
  {
    "kind": "subhead",
    "text": "mTLS call example"
  },
  {
    "kind": "code",
    "text": "curl --verbose   --cert cliente.pem   --key cliente.key   --cacert ca-servidor.pem   https://api-\nparceiros.exemplo.com/v1/status"
  },
  {
    "kind": "paragraph",
    "text": "The --cert option displays the client's certificate; --key points to the private key; --cacert sets the trust used to validate the server. In production, key files must have restricted permissions. When certificate and key are in PKCS#12, the format and password protection depend on the tool and version installed."
  },
  {
    "kind": "paragraph",
    "text": "Verbose mode reveals important messages, but may print sensitive header details. Diagnostic logs should not be shared without review. The HTTP code only appears if the handshake is complete; Previous failures typically arise as TLS errors, alerts, or connection termination."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Inspection with OpenSSL"
  },
  {
    "kind": "subhead",
    "text": "Handshake inspection"
  },
  {
    "kind": "code",
    "text": "openssl s_client \\\n  -connect api-parceiros.exemplo.com:443 \\\n  -servername api-parceiros.exemplo.com \\\n  -cert cliente.pem \\\n  -key cliente.key \\\n  -CAfile cadeia-servidor.pem \\\n  -showcerts -state -tlsextdebug"
  },
  {
    "kind": "paragraph",
    "text": "Public certificates can be shared with less risk, but can still reveal internal names and organizational structure."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Truststore Java"
  },
  {
    "kind": "subhead",
    "text": "Importing a trust anchor"
  },
  {
    "kind": "code",
    "text": "keytool -importcert \\\n  -alias ca-parceiros-producao \\\n  -file ca-parceiros.pem \\\n  -keystore truststore.p12 \\\n  -storetype PKCS12"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Operational security"
  },
  {
    "kind": "paragraph",
    "text": "Never send private keys via email, chat or ticket. For diagnosis, prefer metadata, public certificates, serial, issuer, dates, thumbprint and sanitized logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.11 Frequent failures and troubleshooting method",
    "id": "9-11-frequent-failures-and-troubleshooting-method"
  },
  {
    "kind": "paragraph",
    "text": "TLS error messages vary between libraries and proxies. The same cause may appear as unknown_ca, bad_certificate, certificate_required, handshake_failure, alert certificate expired or simply connection closed. The goal of troubleshooting is not to memorize messages, but to find which check failed and on which component."
  },
  {
    "kind": "paragraph",
    "text": "A structured method reduces the risk of “fixing” the failure by disabling validations. First confirm the actual topology and TLS terminator. Then capture time, hostname, SNI, origin, TLS version, presented string and expected identity."
  },
  {
    "kind": "paragraph",
    "text": "Compare with policies and inventory. Only then change the configuration."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Failure matrix"
  },
  {
    "kind": "table",
    "caption": "Table 4 - Matrix of symptoms and diagnostic hypotheses.",
    "headers": [
      "Symptom",
      "Main hypothesis",
      "Evidence to collect"
    ],
    "rows": [
      [
        "unknownca_",
        "Issuer is not in truststore or incomplete chain.",
        "Sent string, trust bundle and issuer/subject."
      ],
      [
        "bad certificate _",
        "Certificate, signature or format rejected.",
        "Alert TLS, extensions and algorithms."
      ],
      [
        "certificate expired_",
        "Expired date or incorrect watch.",
        "notBefore/notAfter and node times."
      ],
      [
        "handshake failure_",
        "Incompatible version, cipher, curve, signature, or policy.",
        "ClientHello, ServerHello and TLS logs."
      ],
      [
        "Without certificate",
        "Client did not select credential or server did not request it.",
        "CertificateRequest and keystore configuration."
      ],
      [
        "HTTP 403 after mTLS",
        "Authentication passed, authorization or registration failed.",
        "Extracted identity, consumer id and politics. _"
      ],
      [
        "Intermittent fault",
        "Nodes with different truststores or partial rotation.",
        "Configuration per instance and observed serial."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Diagnostic roadmap"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-09.svg",
    "alt": "Diagnostic roadmap for TLS mutual failures",
    "caption": "Figure 9 - Summary troubleshooting guide."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Identify exactly where TLS ends: load balancer, WAF, gateway, ingress, sidecar, or application."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Confirm DNS, address, port and SNI; an incorrect hostname can select another certificate and policy."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Test server validation without client certificate to separate server trust and client authentication."
    ]
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Note whether CertificateRequest is sent and which issuers/algorithms are supported.",
      "Confirm that the client presents the complete chain and has access to the private key.",
      "Validate string, expiration, EKU, SAN, revocation and cryptographic policy on the terminator.",
      "After the handshake, check canonical identity, mapping, token, route, and authorization.",
      "Compare all nodes and environments; Configuration divergence is common in clusters."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "The danger of temporary bypass"
  },
  {
    "kind": "paragraph",
    "text": "Disabling certificate validation, accepting any CA, or making the certificate optional can restore connectivity, but removes the security property that mTLS is supposed to provide. Emergency changes must be explicit, limited, approved, monitored and have a reversal period. Whenever possible, correct chain, truststore, or rotation without expanding trust."
  },
  {
    "kind": "paragraph",
    "text": "A temporary exception can also become permanent through forgetfulness. Use configuration mechanisms with expiration, linked tickets, alerts, and post-incident review. Automated tests should detect listeners that no longer require a certificate or truststores that start accepting unexpected authorities."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.12 Observability, auditing and metrics",
    "id": "9-12-observability-auditing-and-metrics"
  },
  {
    "kind": "paragraph",
    "text": "Handshake failures happen before the HTTP layer and may not appear in conventional API logs. The TLS terminator must expose its own metrics and events: attempts, successes, failures by reason, negotiated version, algorithm, issuer, extracted identity and expiration proximity. Sensitive data must be minimized and protected."
  },
  {
    "kind": "paragraph",
    "text": "The audit needs to answer who accessed it, with which credential, through which gateway, at what time, which API, authorization decision and result. The serial number and thumbprint help link the event to the specific issue, while the logical identity allows you to track the consumer through rotations. Saving only the textual Subject may be insufficient."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Recommended metrics"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Rate of successful and failed mTLS handshakes by listener, partner, and reason.",
      "Distribution of TLS versions, signature algorithms and negotiated ciphersuites.",
      "Active certificates by expiration range: 90, 60, 30, 15, 7 and 1 day.",
      "Completed renewals, failures, and average new credential propagation time.",
      "Use of old certificate during rollover window.",
      "Revocation failures, OCSP/CRL unavailability and fail-open/fail-closed decisions.",
      "Unmapped identities, out-of-namespace attempts, and authorization violations.",
      "Plaintext or permissive connections in environments that should be strict."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Useful logs and minimization"
  },
  {
    "kind": "paragraph",
    "text": "It is useful to record issuer, serial, canonical SAN, validity and validation result. However, the certificate may contain internal or personal data. The log policy must define which fields are required, masking, retention and access."
  },
  {
    "kind": "paragraph",
    "text": "Private keys are never registered; complete chains rarely need to be repeated in each request. Correlation between handshake and request can be made with connection identifier, trace ID or context generated by the gateway. In HTTP/2, multiple requests share the connection, so telemetry must maintain the association without assuming a per-request handshake."
  },
  {
    "kind": "paragraph",
    "text": "In pooled proxies, it is essential to distinguish the external session from the internal session."
  },
  {
    "kind": "subhead",
    "text": "Maturity indicator"
  },
  {
    "kind": "paragraph",
    "text": "A mature platform discovers expiring certificates and unowned identities before the consumer opens an incident."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.13 Hardening and security decisions",
    "id": "9-13-hardening-and-security-decisions"
  },
  {
    "kind": "paragraph",
    "text": "mTLS hardening involves reducing algorithms, identities, and accepted paths to the minimum necessary. The policy must define TLS versions, signatures, curves, key sizes, authorities, chain depth, EKU, SAN namespace, revocation, and error handling. Default library values ​​may be too broad for a specific enterprise integration."
  },
  {
    "kind": "paragraph",
    "text": "You also need to secure the configuration. An attacker who changes the truststore or changes the client authentication mode can disable security without touching the application code. Files, secrets, pipelines and administration consoles must have access control, review and audit trail."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Hardening checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Prefer TLS 1.3 and restrict TLS 1.2 to approved compatibility needs.",
      "Disable legacy versions and algorithms according to current cryptographic policy.",
      "Use dedicated listeners or clear segregation for routes that require mTLS.",
      "Maintain minimum, specific truststores per trust domain.",
      "Require EKU and identity attributes consistent with the purpose of the certificate.",
      "Normalize and validate SAN before mapping; avoid permissive regex and partial matching.",
      "Deny valid certificates that are not mapped to an active consumer.",
      "Protect private keys and prefer short credentials with automated rotation.",
      "Test revocation, expiration, CA switch, incomplete chain, and verifier unavailability.",
      "Remove external identity headers and protect internal propagation.",
      "Record changes to truststore, TLS policy, and authorization as security changes.",
      "Monitor permissive mode and exceptions with mandatory end date."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Pinning: use with discretion"
  },
  {
    "kind": "paragraph",
    "text": "Certificate pinning restricts trust to a specific certificate, key, or set. It can reduce dependence on a broad CA, but creates operational coupling. Certificate pinning breaks on every reissuance; Key pinning allows reissue with the same key, but may discourage key rotation."
  },
  {
    "kind": "paragraph",
    "text": "Intermediate AC pinning is more flexible, but expands the accepted set. In B2B integrations, a certificate registry can be seen as operational pinning. To avoid unavailability, the system needs to allow two simultaneous credentials during rotation, record activation and deactivation dates and offer a secure update process."
  },
  {
    "kind": "paragraph",
    "text": "Pinning does not replace verification of validity, purpose and authorization."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Fail-open versus fail-closed"
  },
  {
    "kind": "paragraph",
    "text": "When a validation dependency fails, fail-closed rejects connections; fail-open maintains availability. There is no universal answer. For critical API client authentication, fail-closed typically preserves security intent."
  },
  {
    "kind": "paragraph",
    "text": "However, an unstable revocation infrastructure can cause systemic unavailability. The architecture should improve redundancy and caching rather than simply disabling verification. The decision must be risk-based, control-documented, and tested."
  },
  {
    "kind": "paragraph",
    "text": "It is possible to combine valid response caching, distributed CRLs, short certificates, emergency denylist and operational circuits. The worst-case scenario is implicit, unknown behavior that varies across products."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.14 Case Study: B2B Payments Integration",
    "id": "9-14-case-study-b2b-payments-integration"
  },
  {
    "kind": "paragraph",
    "text": "Consider a company that exposes a payments API to three partners. Each partner has production and approval applications. The platform uses a WAF, an API Gateway and internal services."
  },
  {
    "kind": "paragraph",
    "text": "The requirement is to prevent unregistered customers, link calls to the correct partner, protect OAuth tokens, and allow rotation without downtime. The solution starts with hostnames separated by environment and listeners that require a certificate. Partner PKI issues certificates with standardized SAN URI."
  },
  {
    "kind": "paragraph",
    "text": "The gateway trusts only approved CAs for that ecosystem, validates EKU clientAuth, validity, chain and revocation, and queries a consumer registry. Unmapped certificates are refused even when the chain is valid."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Identity model"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/mtls-in-depth/en/figure-10.svg",
    "alt": "B2B payments integration architecture with mutual TLS",
    "caption": "Figure 10 - B2B case study architecture."
  },
  {
    "kind": "subhead",
    "text": "Consumer identity and registration"
  },
  {
    "kind": "code",
    "text": "SAN URI:\nspiffe://b2b.exemplo/parceiro-017/app-pagamentos/producao\nconsumer_id: partner-017-payments-prod\nowner: parceiro-017\nallowed_apis: payments.create, payments.status\nrate_plan: b2b-gold\noauth_client_id: p017-payments-prod"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Request flow"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The partner establishes mTLS with the gateway using the production credential.",
      "The gateway validates the certificate and resolves the SAN URI to consumer_id.",
      "The partner presents OAuth token linked to the certificate.",
      "The gateway validates token and correspondence between confirmation and mTLS certificate.",
      "The policy checks API, method, scope, quota and environment.",
      "The gateway creates internal mTLS connection with the payments service.",
      "The partner's identity is propagated in a signed and auditable internal context.",
      "The service performs business authorization and records consumer_id and credential serial."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Planned rotation"
  },
  {
    "kind": "paragraph",
    "text": "Thirty days before the due date, the platform notifies the partner. A new certificate for the same logical identity is issued. The registration temporarily accepts both emissions."
  },
  {
    "kind": "paragraph",
    "text": "The partner installs the new credential and runs tests on the validation endpoint. Telemetry confirms that the new serial is being used. After the agreed window, the old issue is deactivated and, if necessary, revoked."
  },
  {
    "kind": "paragraph",
    "text": "If there is a change of intermediate CA, the gateway receives the new chain of trust before issuing certificates. The configuration is distributed to all nodes and validated by synthetic testing. Only then does the partner migrate."
  },
  {
    "kind": "paragraph",
    "text": "The runbook includes rollback to the previous chain during the overlay window."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Response to compromise"
  },
  {
    "kind": "paragraph",
    "text": "When the partner suspects a key leak, issuing access is immediately blocked in the registry and the certificate is revoked. Alerts look for serial usage after the incident time, abnormal origins, and associated tokens. A new key is generated, and the replacement certificate undergoes emergency onboarding."
  },
  {
    "kind": "paragraph",
    "text": "The logical identity and history remain preserved. This flow demonstrates why relying solely on exhalation is insufficient. It also shows the usefulness of separating identity, credential and authorization: blocking a compromised issue does not require deleting the consumer or recreating all API contracts."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9.15 Technical summary and review",
    "id": "9-15-technical-summary-and-review"
  },
  {
    "kind": "paragraph",
    "text": "mTLS authenticates both ends during TLS channel establishment. The X.509 chain links the public key to an identity issued by a trusted authority, while CertificateVerify demonstrates ownership of the private key. Ultimate security depends on rigorous validation, segmented truststores, canonical identity, authorization, and key protection."
  },
  {
    "kind": "paragraph",
    "text": "In API platforms, the main challenge is to transform this cryptographic mechanism into operational capacity. Gateways, service meshes, and authorization servers need to share identity models and lifecycle processes. Rotation, revocation, telemetry, troubleshooting and incident response must be designed before going into production."
  },
  {
    "kind": "subhead",
    "text": "Chapter summary"
  },
  {
    "kind": "paragraph",
    "text": "mTLS provides a strong identity for the session, but only a complete architecture transforms that identity into secure, scalable, and operable access."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Review Questions"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "What is the difference between validating a certificate and proving ownership of the private key?",
      "Why shouldn't a valid certificate automatically be granted access?",
      "What fields and X.509 extensions should be checked in a client certificate?",
      "Why might the OS truststore be too broad for B2B APIs?",
      "How to separate the logical identity of the application and the current issuance of the certificate?",
      "What changes when the gateway ends mTLS and creates another session to the backend?",
      "How do certificate-bound OAuth tokens reduce the risk of stolen token?",
      "What is the safe order to rotate a CA or certificate without downtime?",
      "What metrics detect issues before expiration?",
      "When should fail-open or fail-closed be considered in revocation validation?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Architecture exercise"
  },
  {
    "kind": "paragraph",
    "text": "Design a solution for an enterprise API consumed by ten partners and five internal services. Define: TLS termination boundaries; truststores; SAN format; consumer registration; authorization policy; identity propagation; OAuth flow; rotation; revocation; metrics; logs and troubleshooting procedure. Explain how your solution prevents a valid certificate from one partner from being used to access APIs from another contract."
  },
  {
    "kind": "paragraph",
    "text": "Then, simulate the exchange of the intermediate CA and describe the deployment sequence. Include rollover window, synthetic testing, rollback, adoption observation, and old chain retirement. The exercise must demonstrate that PKI operation is part of the architecture, not just the infrastructure."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Official references and recommended reading"
  },
  {
    "kind": "paragraph",
    "text": "The references below support the concepts of TLS 1.3 handshake, X.509 validation, OAuth authentication over mTLS, and secure TLS configuration. Normative documents can receive updates; Corporate policies must accompany applicable errata and revisions."
  },
  {
    "kind": "paragraph",
    "text": "1. RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3. https://www.rfc-editor.org/rfc/rfc8446.html - Specification of TLS 1.3 and the messages used in the handshake."
  },
  {
    "kind": "paragraph",
    "text": "2. RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile. https://www.rfc-editor.org/rfc/rfc5280.html - X.509 certificate profile and path validation algorithm."
  },
  {
    "kind": "paragraph",
    "text": "3. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens. https://www.rfc-editor.org/rfc/rfc8705.html - OAuth client authentication via mTLS and certificate-bound tokens."
  },
  {
    "kind": "paragraph",
    "text": "4. NIST SP 800-52 Rev. 2 - Guidelines for TLS Implementations. https://csrc.nist.gov/pubs/sp/800/52/r2/final - Guidelines for selecting, configuring, and securely using TLS."
  },
  {
    "kind": "paragraph",
    "text": "5. RFC 6818 - Updates to the Internet X.509 PKI Certificate and CRL Profile. https://www.rfc-editor.org/rfc/rfc6818.html - Updates and clarifications to the X.509 profile of RFC 5280."
  },
  {
    "kind": "paragraph",
    "text": "6. RFC 9618 - Updates to X.509 Policy Validation. https://www.rfc-editor.org/rfc/rfc9618.html - Updates related to X.509 certificate policy validation."
  }
];
