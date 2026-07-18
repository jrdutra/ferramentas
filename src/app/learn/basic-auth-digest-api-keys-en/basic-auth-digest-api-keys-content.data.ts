import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const BASIC_AUTH_DIGEST_API_KEYS_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Three credential mechanisms with very different properties"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/overview.svg",
    "alt": "Basic Auth, Digest and API Key as credential mechanisms with different properties",
    "caption": "Opening figure - Basic, Digest and API Keys seem simple, but they require complete credential management."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "They all rely on TLS, secret management, least privilege, rotation, and observability for secure use."
  },
  {
    "kind": "paragraph",
    "text": "In-depth edition - study material and professional reference"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "The previous chapter separated authentication and authorization and showed that an identity only becomes useful when there is a proof, a principal and an access decision. Now the course delves into three historically important mechanisms still found in corporate APIs: HTTP Basic, HTTP Digest and API Keys. They appear in legacy integrations, automations, SaaS products, gateways, appliances and internal systems that need simple onboarding."
  },
  {
    "kind": "paragraph",
    "text": "Operational simplicity is the main reason for its persistence, but it also creates pitfalls. Basic Auth sends a reusable credential on every call and relies entirely on TLS for confidentiality. Digest avoids transmitting the password directly and uses challenge-response, but remains sensitive to weak passwords, poorly controlled replay, and interoperability limitations. API Keys identify applications and consumption plans, but are often treated as if they were a strong user identity or as sufficient authorization for any operation."
  },
  {
    "kind": "paragraph",
    "text": "The three mechanisms are static or long-lived credentials when compared to short tokens. Therefore, security cannot be limited to the header format. It is necessary to consider generation, storage, log exposure, rotation, revocation, scope, quotas, segregation by environment, auditing and incident response. A leaked strong key remains a valid credential until the platform detects and revokes it."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents the HTTP authentication framework, the detailed Basic and Digest flow, the API Keys management architecture and the application in API Gateways. The goal is to allow the reader to recognize when these mechanisms are acceptable, which compensatory controls are indispensable, and when migration to OAuth 2.0, mTLS, or workload identities should be prioritized."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each mechanism, track the credential from issuance to revocation. Ask where the secret exists in the open, who gets to reuse it, how the gateway identifies the consumer, how the backend receives context, and how long an exposure would remain valid."
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
      "Explain the HTTP framework of challenges and the role of 401, WWW-Authenticate and Authorization.",
      "Describe Basic Auth encoding and differentiate Base64 from encryption.",
      "Analyze risks of exposure, replay, sharing and storage of passwords.",
      "Understand the HTTP Digest challenge-response and its main parameters.",
      "Explain realm, nonce, opaque, qop, nc, cnonce, algorithm and stale.",
      "Recognize practical and security limitations of Digest in modern APIs.",
      "Distinguish API Key from user identity, OAuth token and HMAC signature.",
      "Design key generation, storage, scope, quota, rotation and revocation.",
      "Apply credential validation to API Gateways without propagating secrets to the backend.",
      "Plan migration from static credentials to short-lived or proof-of-possession mechanisms."
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
      "15.1 Static credentials in the context of APIs",
      "15.2 HTTP Authentication Framework",
      "15.3 Basic Auth: format and flow",
      "15.4 Base64 is not encryption",
      "15.5 Basic Auth over TLS and intermediaries",
      "15.6 Password storage and validation",
      "15.7 Hardening and migration from Basic",
      "15.8 Digest: motivation and challenge-response",
      "15.9 Digest parameters and calculation",
      "15.10 Nonce, replay, stale and limitations",
      "15.11 API Keys: purpose and threat model",
      "15.12 Generation, format and distribution",
      "15.13 Storage, lookup and metadata",
      "15.14 Scopes, quotas and authorization",
      "15.15 Rotation, revocation and leak detection",
      "15.16 HMAC request signing and related mechanisms",
      "15.17 Use in API Gateways",
      "15.18 Comparison, troubleshooting and case studies",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.1 Static credentials in the context of APIs",
    "id": "15-1-static-credentials-in-the-context-of-apis"
  },
  {
    "kind": "paragraph",
    "text": "A static credential is a value that remains valid for a relatively long time and can be reused across multiple calls. Passwords and API Keys fall into this category. The problem is not just duration: because the same value proves access repeatedly, any copy obtained by log, repository, compromised station, proxy, or configuration leak can be used until expiration or revocation."
  },
  {
    "kind": "paragraph",
    "text": "Static credentials offer simple deployment. A consumer receives a username and password or a key, adds a header and calls the API. There is no authorization server, token obtaining flow, or renewal. This simplicity may be appropriate in labs, tight integrations, and legacy systems, but it shifts responsibility to operational processes that many teams neglect."
  },
  {
    "kind": "paragraph",
    "text": "In a secure architecture, each credential has an individual identity, owner, environment, purpose, scope, creation date, expiration, last use, status and rotation history. Sharing the same credential across multiple systems destroys traceability and makes coordinated revocation difficult. The fundamental principle is that simplicity of protocol cannot mean the absence of governance."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Secure static credential depends on explicit lifecycle.",
    "headers": [
      "Property",
      "Operational question",
      "Risk if absent"
    ],
    "rows": [
      [
        "Individualization",
        "Which application or person controls the credential?",
        "Inability to assign traffic and incident."
      ],
      [
        "Scope",
        "What APIs and operations can be used?",
        "Commitment expands lateral access."
      ],
      [
        "Expiration",
        "When does the value stop being accepted?",
        "Abandoned secret remains active."
      ],
      [
        "Rotation",
        "How to exchange without unavailability?",
        "Credential is never renewed."
      ],
      [
        "Revocation",
        "How long to block a leak?",
        "Long window of abuse."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.2 HTTP Authentication Framework",
    "id": "15-2-http-authentication-framework"
  },
  {
    "kind": "paragraph",
    "text": "HTTP defines a general challenge-based authentication framework. When a resource requires authentication and the client does not present an acceptable credential, the server may respond 401 Unauthorized accompanied by one or more WWW-Authenticate headers. Each challenge reports the required schema and parameters, such as realm. The client chooses a supported schema and repeats the request with Authorization."
  },
  {
    "kind": "paragraph",
    "text": "The name 401 Unauthorized is historically confusing: in practice, it represents the absence or failure of authentication. Once the identity is authenticated, a denial for lack of permission typically uses 403 Forbidden. This separation preserves semantics, facilitates troubleshooting and prevents consumers from trying to exchange credentials when the real problem is authorization."
  },
  {
    "kind": "paragraph",
    "text": "A gateway may advertise more than one challenge or hide details to reduce enumeration. In APIs, it is also common to receive credentials preemptively, without the first 401. Still, understanding the challenge model is essential for Basic and Digest, as well as helping with the interpretation of logs, HTTP clients, and libraries."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/figure-01.svg",
    "alt": "HTTP challenge flow between client and server or gateway",
    "caption": "Figure 1 - Basic and Digest use the challenge framework defined by HTTP."
  },
  {
    "kind": "subhead",
    "text": "Examples of HTTP challenges"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Basic realm=\"corporate-api\", charset=\"UTF-8\"\n# or\nWWW-Authenticate: Digest realm=\"corporate-api\",\n  nonce=\"server-issued-value\", qop=\"auth\", algorithm=SHA-256"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.3 Basic Auth: format and flow",
    "id": "15-3-basic-auth-format-and-flow"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic uses a user identifier and password combined in the form user-id:password. The resulting byte sequence is Base64 encoded and sent in the Authorization header with the Basic prefix. The server decrypts the value, finds the account, and verifies the password. In machine-to-machine integrations, the user-id can represent an application or technical account, but this does not automatically transform the mechanism into a strong workload identity."
  },
  {
    "kind": "paragraph",
    "text": "The client can expect a 401 challenge or send the header on the first call. Many SDKs and tools hide this detail. In both cases, the credential is transmitted in all requests, including when different connections are opened. This increases the exposure surface compared to a password used only to obtain a short-lived token."
  },
  {
    "kind": "paragraph",
    "text": "The realm allows the server to indicate the protection space. Clients can use this information to decide which credentials to resend. In environments with multiple hosts, redirects and proxies, the configuration needs to prevent Authorization from being forwarded to an untrusted destination."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of Basic Auth"
  },
  {
    "kind": "code",
    "text": "# Logical text before encoding\nbilling-integration:ExamplePassword\n# HTTP header\nAuthorization: Basic aW50ZWdyYWNhby1mYXR1cmFtZW50bzpTZW5oYURlRXhlbXBsbw=="
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.4 Base64 is not encryption",
    "id": "15-4-base64-is-not-encryption"
  },
  {
    "kind": "paragraph",
    "text": "Base64 is an encoding for representing bytes in characters safe for textual transport. It does not use a key, does not offer confidentiality and can be reversed by any person or tool. Treating the Base64 value as a hash or encryption is a serious error. It only protects against impersonation problems, not traffic observation."
  },
  {
    "kind": "paragraph",
    "text": "For this reason, Basic Auth should only be used over correctly validated TLS. Without TLS, username and password are exposed to whoever captures the communication. Even with TLS, the credential can appear in debug logs, memory dumps, observability tools, command history, environment variables, and configurations. The protected channel does not correct leakage at endpoints or intermediary terminators."
  },
  {
    "kind": "paragraph",
    "text": "Coding also does not prevent replay. If an attacker obtains the full header, he can reuse it as long as the password remains valid. Protection relies on strong secrecy, rotation, anomaly detection, retry limiting, and least privilege."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/figure-02.svg",
    "alt": "Basic Auth traversing Base64 encoding and a TLS secured channel",
    "caption": "Figure 2 - The only element that protects the confidentiality of Basic Auth in transit is the TLS channel."
  },
  {
    "kind": "subhead",
    "text": "Operating rule"
  },
  {
    "kind": "paragraph",
    "text": "Never put Basic Auth in URL, query string, logs, tickets or examples with real credentials. Visual redactions in screenshots do not remove the value of configuration files or terminal histories."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.5 Basic Auth over TLS and intermediaries",
    "id": "15-5-basic-auth-over-tls-and-intermediaries"
  },
  {
    "kind": "paragraph",
    "text": "When there is reverse proxy or API Gateway, TLS can finish before the backend. The client-gateway leg and the gateway-backend leg are independent connections. If the gateway passes the original Authorization to the backend, the password continues to circulate internally and may appear in more observation points. A better architecture validates the credential at the edge and forwards restricted internal identity or short-lived token."
  },
  {
    "kind": "paragraph",
    "text": "Redirects also deserve attention. Secure HTTP clients avoid forwarding Authorization to another host, but behaviors vary by library and configuration. An authenticated endpoint should not respond with redirection to an untrusted domain. Proxy rules need to remove external identity headers before inserting validated context."
  },
  {
    "kind": "paragraph",
    "text": "The server must apply protection against brute force and credential stuffing. Rate limiting by account, source and device, progressive blocking, leaked password detection, monitoring and alerts help. Permanent blocking after a few attempts may cause denial of service; policy needs to balance security and availability."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.6 Password storage and validation",
    "id": "15-6-password-storage-and-validation"
  },
  {
    "kind": "paragraph",
    "text": "The server should not store reversible password just to compare with the received value. Human user passwords need to be protected by specific derivation functions, with individual salt and appropriate cost parameters. The check recalculates the derivative and compares in constant time. Technical accounts can be migrated to keys, certificates or workload identities, avoiding treating application secrets as human passwords."
  },
  {
    "kind": "paragraph",
    "text": "Basic requires the server to obtain the password presented on each call and validate it. This does not mean that the password needs to be clear at the bank. However, some legacy systems delegate authentication to directories or store reversible credentials for integration. These cases increase the impact of compromise and must have a migration plan."
  },
  {
    "kind": "paragraph",
    "text": "Authentication logs must record identifier, result, categorized reason, origin, correlation and applied policy, but never the password or the Authorization header. Messages to the client should avoid differentiating a non-existent user from an incorrect password when this allows enumeration."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Secure storage reduces the impact of credential store leaks.",
    "headers": [
      "Element",
      "Best practice",
      "Avoid"
    ],
    "rows": [
      [
        "Password bank",
        "Individual salt and appropriate bypass function.",
        "Clear password or reversible encryption without need."
      ],
      [
        "Comparison",
        "Constant routine and consolidated library.",
        "Home comparisons and value logs."
      ],
      [
        "Technical account",
        "Individual identity and owner.",
        "User shared by multiple jobs."
      ],
      [
        "Observability",
        "Result, origin and correlation.",
        "Authorization and password in log."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.7 Basic Auth hardening and migration",
    "id": "15-7-basic-auth-hardening-and-migration"
  },
  {
    "kind": "paragraph",
    "text": "Basic can be tolerated in controlled integration when TLS is required, the account is individual, the password is random and long, access is limited, and there is rotation. There must also be a replacement plan. The mechanism is unsuitable for human credentials in high-risk APIs or for distributed applications that cannot protect static secrets."
  },
  {
    "kind": "paragraph",
    "text": "A common migration introduces OAuth 2.0 Client Credentials, mTLS, or managed identity. During coexistence, the gateway accepts Basic only for registered consumers, records usage by client_id and communicates withdrawal deadline. The new mechanism is activated in parallel; After telemetry confirms migration, the old password is revoked."
  },
  {
    "kind": "paragraph",
    "text": "It is not enough to replace Basic Auth with a long-lived token copied in configuration. The objective is to reduce reuse and surface area: short tokens, specific audience, minimum scope, auditable issuance and client credentials protected by vault or asymmetric proof."
  },
  {
    "kind": "subhead",
    "text": "Migration criteria"
  },
  {
    "kind": "paragraph",
    "text": "Prioritize consumers with shared credentials, lack of rotation, privileged access, running on untrusted devices, or public exposure. These factors increase the impact and probability of compromise."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.8 Digest: motivation and challenge-response",
    "id": "15-8-digest-motivation-and-challenge-response"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest was created to prevent the password from being sent directly to the server with each request. The server sends a challenge with realm, nonce, algorithm and protection quality options. The client combines these values ​​with username, password, method, and URI to calculate a hashed response. The server performs equivalent calculation and compares the result."
  },
  {
    "kind": "paragraph",
    "text": "The nonce is a value issued by the server to limit reuse. Customer can also send cnonce and nc counter. With qop=auth, method and URI enter the test, linking the response to the request. In qop=auth-int, the entity body also participates, although the operational support is more complex."
  },
  {
    "kind": "paragraph",
    "text": "Digest improves a specific property in relation to Basic: the password does not appear directly in the wire. However, it does not replace TLS. Metadata and content remain exposed without channel encryption, and downgrade, manipulation or capture-for-offline attacks still need to be considered."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/figure-03.svg",
    "alt": "Digest flow with challenge, nonce and calculated proof",
    "caption": "Figure 3 - The client proves knowledge of a secret without sending the password directly."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.9 Digest parameters and calculation",
    "id": "15-9-digest-parameters-and-calculation"
  },
  {
    "kind": "paragraph",
    "text": "The realm separates protection spaces and participates in the calculation. The nonce is generated by the server; opaque is a value that the client returns without interpreting. algorithm reports the hash function and possible variants with -sess. qop selects the protection quality. nc is the nonce usage counter, and cnonce is a random value produced by the client."
  },
  {
    "kind": "paragraph",
    "text": "In a simplified form with qop=auth, HA1 is calculated from user, realm and password; HA2 from the HTTP method and request-target; and response from HA1, nonce, nc, cnonce, qop and HA2. The implementation must strictly follow the specification and use tested libraries. Small differences in encoding, URI, charset, or parameters produce faults that are difficult to diagnose."
  },
  {
    "kind": "paragraph",
    "text": "Algorithms and parameters need to be negotiated securely. Implementations should not accept silent downgrades for weak options when policy requires stronger algorithms. It is also important to validate that the client responds to the same realm, nonce, and URI associated with the challenge."
  },
  {
    "kind": "subhead",
    "text": "Digest conceptual calculation with qop=auth"
  },
  {
    "kind": "code",
    "text": "HA1 = H(username : realm : password)\nHA2 = H(method : request-target)\nresponse = H(\n  HA1 : nonce : nc : cnonce : qop : HA2\n)\nAuthorization: Digest username=\"api-client\", realm=\"payments\",\n  nonce=\"...\", uri=\"/v1/orders\", algorithm=SHA-256,\n  qop=auth, nc=00000001, cnonce=\"...\", response=\"...\""
  },
  {
    "kind": "table",
    "caption": "Table 3 - Digest parameters need to be validated as a coherent set.",
    "headers": [
      "Parameter",
      "Origin",
      "Function"
    ],
    "rows": [
      [
        "realm",
        "Server",
        "Defines the protection space and participates in the calculation."
      ],
      [
        "nonce",
        "Server",
        "It makes the test dependent on a challenge and temporal validity."
      ],
      [
        "opaque",
        "Server",
        "Opaque state returned by customer."
      ],
      [
        "qop",
        "Server/client",
        "Select auth or other supported quality."
      ],
      [
        "cnonce",
        "Customer",
        "Adds client-controlled randomness."
      ],
      [
        "nc",
        "Customer",
        "Counts nonce uses and helps detect replay."
      ],
      [
        "response",
        "Customer",
        "Hash proof calculated for the request."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.10 Nonce, replay, stale and Digest limitations",
    "id": "15-10-nonce-replay-stale-and-digest-limitations"
  },
  {
    "kind": "paragraph",
    "text": "A secure nonce needs to be unpredictable or authenticated, have a validity window and be linked to the necessary context. The server can maintain state or encode timestamp and MAC into the value. When the nonce expires, the challenge can indicate stale=true, allowing the client to repeat the operation with a new nonce without assuming that the username or password is wrong."
  },
  {
    "kind": "paragraph",
    "text": "The nc counter must grow for each use of the same nonce and cnonce. The server can detect replay, but this requires state or window logic. Distributed clusters and gateways need to consistently share or validate this information. An implementation that only checks the hash and ignores counter and validity loses an important part of replay protection."
  },
  {
    "kind": "paragraph",
    "text": "Digest remains subject to offline attacks when an attacker captures challenge and response and the password has low entropy. It also does not offer payload confidentiality, does not resolve authorization, does not replace MFA, and has uneven interoperability across clients, proxies, and gateways. In modern APIs, it is often maintained for compatibility, not as a first choice for new projects."
  },
  {
    "kind": "subhead",
    "text": "Safety limit"
  },
  {
    "kind": "paragraph",
    "text": "Digest protects the password in transit differently than Basic, but does not transform a weak password into a strong credential. Capturing a response can allow you to test candidates offline without interacting with the server again."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.11 API Keys: purpose and threat model",
    "id": "15-11-api-keys-purpose-and-threat-model"
  },
  {
    "kind": "paragraph",
    "text": "API Key is a value assigned to a consumer, application, project or product subscription. It allows you to identify who is using the API, apply quotas, rate limiting, billing, analytics and policies. In some environments it is also used as application authentication. However, possession of the key does not prove human identity or establish, in itself, business authorization."
  },
  {
    "kind": "paragraph",
    "text": "A key is normally a bearer: anyone who knows the value can use it. Therefore, it should not be embedded in a public JavaScript, distributed mobile application, repository, or easily extractable firmware when the associated access is sensitive. In public clients, the key can only serve as a product identifier, without being treated as a strong secret."
  },
  {
    "kind": "paragraph",
    "text": "The threat model includes leaks in logs, query strings, analytics tools, browser history, referrer, pipelines, containers, notebooks, messages and support. It also includes intentional sharing between teams, copying to the wrong environment and remaining after the owner is terminated."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.12 Generation, format and distribution of API Keys",
    "id": "15-12-generation-format-and-distribution-of-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "An API Key must be generated with a cryptographically secure source and sufficient entropy to prevent guessing. Human-readable formats may include a non-secret prefix that identifies product or environment, followed by random material. The prefix facilitates routing, support, and detection of test key used in production without revealing the full secret."
  },
  {
    "kind": "paragraph",
    "text": "The key must only be displayed to the consumer at the time of creation or via a secure channel. Then, the platform stores a protected representation. Email, spreadsheet and ticket are not safes. Applications must receive the value via secret manager, protected pipeline or bootstrap mechanism, and never via code commit."
  },
  {
    "kind": "paragraph",
    "text": "Production, staging, and development keys need to be different. Segregation reduces the spread of leaks and allows for different policies. The platform can also limit network origin, certificate, host, API, or operation, but these controls complement and do not replace key protection."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/figure-04.svg",
    "alt": "Corporate lifecycle of an API Key from issuance to revocation",
    "caption": "Figure 4 - Issuance is just the beginning of the life cycle of an API Key."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.13 Storage, lookup and metadata",
    "id": "15-13-storage-lookup-and-metadata"
  },
  {
    "kind": "paragraph",
    "text": "When the key only functions as a bearer, the server does not need to store the value in the clear. Can store hash or MAC and compare presentation. For efficient lookup, formats with public identifier and separate secret are useful: the prefix locates the record and the secret is validated securely. This avoids scanning the entire hash base with each request."
  },
  {
    "kind": "paragraph",
    "text": "The key record must contain owner, application, product, environment, scopes, quotas, state, creation, expiration, last rotation, last use and revocation reason. Metadata allows decisions without exposing the secret. It also supports inventory, orphan key reporting, and rotation campaigns."
  },
  {
    "kind": "paragraph",
    "text": "If the platform needs to retrieve the value to sign requests on behalf of the consumer, the key is no longer just a verification key and requires reversible storage in a vault or HSM, with stronger access and audit controls. This case must be distinguished from a key used only to authenticate incoming calls."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Separating identifier, secret, verifier and metadata improves operation and incident response.",
    "headers": [
      "Component",
      "Content",
      "Exhibition"
    ],
    "rows": [
      [
        "key id/prefix_",
        "Public identifier for lookup.",
        "It may appear in logs and portals."
      ],
      [
        "secret",
        "Random material presented on the call.",
        "Consumer only and validation process."
      ],
      [
        "verifier",
        "Hash or MAC of the secret.",
        "Protected bank; does not allow direct use."
      ],
      [
        "metadata",
        "Owner, scope, quota, status and dates.",
        "Management and policy services."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.14 Transmission, scopes, quotas and authorization",
    "id": "15-14-transmission-scopes-quotas-and-authorization"
  },
  {
    "kind": "paragraph",
    "text": "API Keys must preferably be transmitted in a dedicated header or Authorization with a scheme defined by the platform. Putting them in a query string increases leaks in access logs, history, analytics, caches and Referer headers. TLS remains mandatory because a captured key can be reused."
  },
  {
    "kind": "paragraph",
    "text": "Each key must have a minimum scope: product, APIs, operations, environment and, when possible, specific data or tenant. Quota and throttling limit consumption and reduce the impact of abuse, but are not equivalent to authorization. A key with a quota of a thousand calls can still access an improper object if the backend does not validate ownership."
  },
  {
    "kind": "paragraph",
    "text": "For username operations, the API Key can identify the application while another mechanism authenticates the user. This separation allows traffic to be assigned to two subjects: technical customer and end user. The gateway must preserve both in context and in logs without confusing them."
  },
  {
    "kind": "subhead",
    "text": "Methods of transmitting API Keys"
  },
  {
    "kind": "code",
    "text": "# Dedicated header\nX-API-Key: pk_live_7F2A...secret...\n# Or an Authorization scheme defined by the provider\nAuthorization: ApiKey pk_live_7F2A...secret...\n# Avoid\nGET /v1/customers?api_key=pk_live_7F2A..."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.15 Rotation, revocation and leak detection",
    "id": "15-15-rotation-revocation-and-leak-detection"
  },
  {
    "kind": "paragraph",
    "text": "Rotation without downtime typically requires overlap period. The consumer creates or receives a second key, updates their applications, validates traffic with the new value and only then revokes the old one. Platforms may allow two active keys per subscription. The coexistence period must be short and monitored to avoid permanent duplication."
  },
  {
    "kind": "paragraph",
    "text": "Revocation needs to be quick and global. Gateway caches must respect risk-compatible status and TTL. In incidents, the team needs to find all environments and dependencies that use the key. This is only possible when each consumer has their own credentials and reliable inventory."
  },
  {
    "kind": "paragraph",
    "text": "Leak detection can use repository scanners, prefix patterns, origin monitoring, sudden volume increase, geographic change, and after-hours usage. Honeytokens or deliberately unused keys can generate immediate alerts when they appear in traffic."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The answer depends on inventory, individualization and revocation capacity.",
    "headers": [
      "Event",
      "Immediate action",
      "Further action"
    ],
    "rows": [
      [
        "Suspected leak",
        "Disable or reduce privilege; preserve evidence.",
        "Investigate origin and issue new key."
      ],
      [
        "Planned rotation",
        "Activate new key in parallel.",
        "Confirm use and revoke old."
      ],
      [
        "Owner offline",
        "Suspend associated credentials.",
        "Reassign or remove integration."
      ],
      [
        "Unused key",
        "Confirm with owner and block in test.",
        "Delete orphan asset."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.16 HMAC request signing and related mechanisms",
    "id": "15-16-hmac-request-signing-and-related-mechanisms"
  },
  {
    "kind": "paragraph",
    "text": "HMAC signing of requests is different from simply sending an API Key. The client uses a secret to calculate a signature over the method, path, timestamp, headers and body hash. The server recalculates and compares. The key can identify the consumer, while the signature links the proof to a specific request and reduces replay when timestamp and nonce are validated."
  },
  {
    "kind": "paragraph",
    "text": "This model is used by some financial and cloud APIs, but requires strict canonicalization. Differences in encoding, header order, path and body normalization produce failures. Security depends on strong secrecy, short temporal window, secure comparison, clock protection, and reuse prevention."
  },
  {
    "kind": "paragraph",
    "text": "HMAC does not replace TLS: without TLS, content and metadata remain visible and can be manipulated before verification. It also does not provide non-repudiation, because client and server share the same secret. Asymmetric signatures or mTLS may be more appropriate when separation of responsibility and proof of ownership are important."
  },
  {
    "kind": "subhead",
    "text": "Important distinction"
  },
  {
    "kind": "paragraph",
    "text": "An API Key is typically presented directly. In HMAC signing, the secret does not travel; it produces a specific signature for the request. The two models require different life cycles and controls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.17 Use in API Gateways, Axway and Azure",
    "id": "15-17-use-in-api-gateways-axway-and-azure"
  },
  {
    "kind": "paragraph",
    "text": "The API Gateway is a natural point to validate Basic, Digest or API Keys, apply rate limiting, record consumption and block revoked credentials. The policy must occur before routing to the backend and must distinguish authentication failure, suspended key, quota exceeded, and lack of authorization. The gateway must also remove original credentials before forwarding the request, whenever the backend does not need them."
  },
  {
    "kind": "paragraph",
    "text": "In corporate products, the key can be associated with an application, contract, product or subscription. The gateway queries the local repository, cache, or management service. Caches improve performance, but make revocation dependent on propagation. For critical credentials, the TTL needs to be short or the platform must offer active invalidation."
  },
  {
    "kind": "paragraph",
    "text": "Integration with Axway API Gateway, Azure API Management and other products must be validated according to the version deployed. Policies can extract headers, validate subscription keys, query vaults, apply quotas and transform context. The design needs to prevent direct bypass to the backend and ensure that identity headers inserted by the gateway cannot be forged externally."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/basic-auth-digest-api-keys/en/figure-05.svg",
    "alt": "Credential validation via API Gateway with secret store and protected backend",
    "caption": "Figure 5 - The gateway validates the credential and forwards trusted context, not the original secret."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.18 Comparison between Basic, Digest and API Keys",
    "id": "15-18-comparison-between-basic-digest-and-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "The three mechanisms share simplicity and lack of complex token issuance flow, but solve different problems. Basic transports username and password. Digest creates proof based on the password and a challenge. API Key identifies an application or subscription with a random value. None of them, in isolation, provide fine-grained authorization, federated identity, or delegated consent."
  },
  {
    "kind": "paragraph",
    "text": "The choice must consider where the credential can be protected, who is the subject, duration, need for rotation and client support. For new high-risk services, short-lived credentials, mTLS, OAuth 2.0, or workload identities tend to offer better properties. Basic, Digest, and keys remain useful when applied with limited scope and clear compensating controls."
  },
  {
    "kind": "table",
    "caption": "Table 6 - No mechanism eliminates the need for TLS, scope, rotation and authorization.",
    "headers": [
      "Criterion",
      "Basic Auth",
      "Digest",
      "API Key"
    ],
    "rows": [
      [
        "Secret travels directly",
        "Yes, within Base64 and TLS.",
        "Not as a password, but there is reusable proof in context.",
        "Yes, normally as a bearer."
      ],
      [
        "TLS Dependency",
        "Total.",
        "It remains necessary.",
        "Total."
      ],
      [
        "Typical subject",
        "User or technical account.",
        "User or technical account.",
        "Application, project or subscription."
      ],
      [
        "Replay after capture",
        "Possible as long as password is valid.",
        "Mitigated by nonce/nc when correct.",
        "Possible as long as key is valid."
      ],
      [
        "Operation",
        "Simple, but password needs protection.",
        "More complex and less interoperable.",
        "Simple, it requires a robust life cycle."
      ],
      [
        "Recommended use",
        "Controlled and temporary legacy.",
        "Specific compatibility.",
        "Identification and control of applications."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.19 Evidence-driven troubleshooting",
    "id": "15-19-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "When Basic fails, confirm that the header reached the correct point, that Base64 was produced from the expected charset, that the password contains special characters, and that the proxy or redirect removed Authorization. Differentiate between 401 for invalid credential and 403 for lack of permission and 429 for quota."
  },
  {
    "kind": "paragraph",
    "text": "In Digest, compare realm, nonce, qop, algorithm, URI and method used in the calculation. Check synchronization between nodes, nonce validity, nc counter and request-target canonicalization. Intermittent cluster failures often indicate unshared nonce state or different keys to authenticate the challenge."
  },
  {
    "kind": "paragraph",
    "text": "In API Keys, investigate header name, environment, prefix, status, expiration, scopes, quota, and revocation cache. A valid portal key may fail at runtime if the product, subscription, or deployment are inconsistent. Always correlate logs from the gateway, management service and backend."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Diagnosis requires identifying the point that produced the response.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "Basic returns 401",
        "password changed, Base64 incorrect, realm or header removed",
        "masked header, account, node and authentication logs."
      ],
      [
        "Digest fails after a while",
        "expired nonce, repeated nc or unhandled stale",
        "challenge, timestamp, counter and cluster node."
      ],
      [
        "API Key works in staging",
        "key or product from the wrong environment",
        "prefix, metadata, deployment and subscription."
      ],
      [
        "Repealed still works",
        "cache or directly accessible backend",
        "TTL, invalidation and bypass route."
      ],
      [
        "429 unexpected",
        "shared quota or reused key",
        "owner, counters and consumers by key."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15.20 Case studies and labs",
    "id": "15-20-case-studies-and-labs"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - password shared by ten integrations"
  },
  {
    "kind": "paragraph",
    "text": "Ten jobs use the same Basic user. A secret appears in a repository and the organization is unable to attribute usage. The response creates individual accounts, restricts scopes, migrates to application credentials, and revokes the shared user after telemetry confirms the transition."
  },
  {
    "kind": "paragraph",
    "text": "The case shows that the biggest problem was not Base64, but the lack of individualization and rotation. Even regarding TLS, the leak had a broad impact and low traceability."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Intermittent cluster digest"
  },
  {
    "kind": "paragraph",
    "text": "Two nodes issue nonces with different keys and the balancer distributes calls without affinity. The client receives a challenge from one node and sends the proof to the other, which rejects the nonce. The fix shares the nonce authentication key or uses consistent validation across nodes."
  },
  {
    "kind": "paragraph",
    "text": "Captures and logs show successive 401s with different nonces. The error looked like incorrect password, but the cause was in the distributed state of the engine."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - API Key exposed in query string"
  },
  {
    "kind": "paragraph",
    "text": "An integration sends the key in query. The value appears in proxy logs and analytics tool. The team revokes the key, removes parameters from the logs, changes transmission to header, adds scanners, and reviews all consumers."
  },
  {
    "kind": "paragraph",
    "text": "The investigation also identifies that the same key was used in production and test. Segregation by environment reduces the impact of future leaks."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Suggested labs"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Encode and decode a lab Basic value and note that Base64 is reversible.",
      "Configure an authorized local server with Basic challenge and inspect 401, WWW-Authenticate and Authorization.",
      "Simulate the Digest calculation with controlled nonce and change method or URI to verify the failure.",
      "Model an API Key with public prefix, random secret and stored verifier.",
      "Implement rotation with two active keys and confirm revocation of the old one.",
      "Compare logs for a key in header and query string, using only dummy values."
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
    "text": "Basic Auth encodes username and password in Base64 and sends the credential on each call. Base64 does not protect the secret; TLS, adequate storage, individualization, rotation and limitation of attempts are essential. On gateways, the credential should be validated at the edge and removed before the backend when possible."
  },
  {
    "kind": "paragraph",
    "text": "HTTP Digest uses challenge-response with realm, nonce, algorithm, qop, cnonce and counter. It avoids transmitting the password directly, but relies on strict implementation, strong password, replay control, and TLS. Its complexity and interoperability mean that it is adopted mainly for compatibility."
  },
  {
    "kind": "paragraph",
    "text": "API Keys identify applications, projects or subscriptions and support quotas and analytics. As they are normally bearers, they need high entropy, header transmission, protected storage, metadata, scope, rotation and fast revocation. They do not replace user identity or authorization for a resource."
  },
  {
    "kind": "paragraph",
    "text": "Static mechanisms must be evaluated for the complete life cycle. For new high-risk cases, short tokens, mTLS, OAuth 2.0, and workload identities offer superior properties. Migration must be based on telemetry and controlled coexistence."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 16 will delve into the complete OAuth 2.0: roles, grants, authorization code with PKCE, client credentials, refresh tokens, scopes, security and application in API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Static credentials checklist",
    "id": "static-credentials-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Basic, Digest and API Keys are only accepted over correctly validated TLS.",
      "Each consumer has an individual credential, owner and defined environment.",
      "Secrets do not appear in URLs, logs, source code, tickets, or analytics.",
      "Passwords are protected by appropriate storage mechanism and never recorded.",
      "Nonces Digest have validity, integrity and replay control.",
      "Digest algorithms and qop follow explicit policy and are not silently downgraded.",
      "API Keys have sufficient entropy, secure prefix and distribution over a protected channel.",
      "Verifiers and metadata are separate from the presented secret.",
      "Scopes, quotas and rate limits do not replace object and domain authorization.",
      "Rotation allows for short overlap and telemetry-confirmed revocation.",
      "Gateway caches respect revocation and do not create excessive windowing.",
      "The backend is not directly accessible to bypass the gateway policy.",
      "Alerts detect anomalous usage, unexpected origin, and orphaned keys.",
      "There is a migration plan for short or asymmetric credentials when the risk requires it."
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
    "ordered": false,
    "items": [
      "Explain why Base64 does not protect Basic Auth.",
      "Describe the 401, WWW-Authenticate and Authorization flow.",
      "List risks of sharing a Basic user between applications.",
      "Explain the role of realm, nonce, qop, cnonce and nc in Digest.",
      "Describe how stale=true changes client behavior.",
      "Explain why Digest still needs TLS.",
      "Differentiate between API Key, access token and user identity.",
      "Propose a format with public key_id and random secret.",
      "Describe storage with verifier and metadata.",
      "Create a rotation plan without downtime.",
      "Compare direct API Key and request HMAC signature.",
      "Describe troubleshooting for revoked key that still works on the gateway."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossary"
  },
  {
    "kind": "table",
    "caption": "Table 8 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "API Key",
        "Value associated with the application, project, product or API subscription."
      ],
      [
        "Base64",
        "Reversible byte encoding for textual characters."
      ],
      [
        "Basic Auth",
        "HTTP scheme that transmits Base64 encoded user-id and password."
      ],
      [
        "cnonce",
        "Nonce created by the client in HTTP Digest."
      ],
      [
        "Credential stuffing",
        "Automated use of credentials obtained from previous leaks."
      ],
      [
        "Digest",
        "Hash-based HTTP challenge-response scheme."
      ],
      [
        "HA1",
        "Value derived from user, realm and password in Digest."
      ],
      [
        "HA2",
        "Value derived from method and request-target in Digest."
      ],
      [
        "HMAC",
        "Hash-based message authentication code and shared secret."
      ],
      [
        "keyid_",
        "Public identifier used to locate the record for a key."
      ],
      [
        "nc",
        "Counter of use of a nonce in Digest."
      ],
      [
        "nonce",
        "Value used once or within a limited window to reduce replay."
      ],
      [
        "opaque",
        "Digest challenge value returned without interpretation by the customer."
      ],
      [
        "qop",
        "Quality of protection negotiated in the Digest."
      ],
      [
        "realm",
        "Protection space announced by an HTTP challenge."
      ],
      [
        "Replay",
        "Unauthorized reuse of a captured credential or evidence."
      ],
      [
        "Secret manager",
        "Service for storing, distributing and auditing secrets."
      ],
      [
        "stale",
        "Indication that the nonce has expired, not necessarily the password."
      ],
      [
        "Verifier",
        "Protected representation used to validate a secret without storing it in the clear."
      ],
      [
        "WWW-Authenticate",
        "Response header that announces HTTP authentication challenges."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Decision matrix",
    "id": "annex-a-decision-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 9 - The appropriate option depends on the ability to protect secrecy and the risk of the operation.",
    "headers": [
      "Scenario",
      "Home option",
      "Conditions"
    ],
    "rows": [
      [
        "Temporary legacy integration",
        "Basic Auth",
        "TLS, individual account, strong password, vault and migration deadline."
      ],
      [
        "Equipment with restricted support",
        "Digest",
        "Secure algorithm, consistent nonce, TLS and interoperability testing."
      ],
      [
        "Application ID and quota",
        "API Key",
        "Individual key, scope, rotation and separate authorization."
      ],
      [
        "Modern in-house service",
        "OAuth 2.0 client credentials, mTLS or federation",
        "Short credential, audience, and workload identity."
      ],
      [
        "Public mobile client or browser",
        "Do not trust API Key as a secret",
        "Intermediate backend, user authentication and abuse controls."
      ],
      [
        "Request that requires specific proof",
        "HMAC or asymmetric signature",
        "Canonicalization, timestamp, nonce and key protection."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical references",
    "id": "technical-references"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "IETF. RFC 9110 - HTTP Semantics. 2022.",
      "IETF. RFC 7617 - The Basic HTTP Authentication Scheme. 2015.",
      "IETF. RFC 7616 - HTTP Digest Access Authentication. 2015.",
      "IETF. RFC 7235 - HTTP/1.1 Authentication, later consolidated in RFC 9110.",
      "OWASP. Authentication Cheat Sheet.",
      "OWASP. Password Storage Cheat Sheet.",
      "OWASP. REST Security Cheat Sheet.",
      "OWASP. Secrets Management Cheat Sheet.",
      "NIST. SP 800-63B - Authentication and Authenticator Management.",
      "Microsoft Learn. Azure API Management subscription keys and policies.",
      "Axway Documentation. API Key, HTTP Basic and authentication policies in API Gateway."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Protocols and products have specific implementation and support details. Before adopting Basic, Digest or API Keys, validate the official documentation of the deployed version and run tests in an authorized environment."
  }
];
