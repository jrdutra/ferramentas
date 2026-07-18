import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const AUTHENTICATION_AUTHORIZATION_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "From identity to access decision in a corporate API"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/en/overview.svg",
    "alt": "Identity, credential, authentication, token, session, and authorization chain in an enterprise API",
    "caption": "Opening figure - Access security is a chain of contextualized proofs, assertions and decisions."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Authenticate proves who or what is calling; authorize decides what this identity can do now."
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
    "text": "The previous chapter expanded the communication repertoire by introducing GraphQL, gRPC and WebSocket. Regardless of the protocol or style adopted, any corporate interface needs to answer two fundamental questions: who or what is making the call and what that identity can do in that context. An API should not accept an operation just because the message arrived via HTTPS or contains a header called Authorization. It is necessary to identify the caller, validate the evidence presented, understand in whose name the operation is performed and apply a coherent policy to the requested resource."
  },
  {
    "kind": "paragraph",
    "text": "Identity in APIs involves people, applications, devices and workloads. These subjects have different life cycles, registration forms and credentials. A user can authenticate with multiple factors; an application can use certificate, asymmetric key or federation; a pod can be assigned a short identity by attestation from the environment. Treating everyone as username and password produces static secrets, low traceability and excessive authorizations."
  },
  {
    "kind": "paragraph",
    "text": "Authentication and authorization are separate responsibilities. Authentication establishes that a credential matches an identity under a certain level of trust. Authorization evaluates whether this identity can perform a specific action on a resource, considering scope, tenant, attributes, relationship, risk and domain state. Strong authentication cannot compensate for a broad or non-existent authorization policy."
  },
  {
    "kind": "paragraph",
    "text": "This chapter builds the conceptual foundation for later chapters on credentials, OAuth 2.0, OpenID Connect, and tokens. The limits between authentication and authorization, identity elements, sessions, claims, RBAC/ABAC/ReBAC/PBAC models, delegation, workload identity, PEP/PDP architecture, 401/403 responses, observability and application in API Gateways will be studied. Basic Auth, Digest, API Keys and OAuth appear only at the level necessary to establish conceptual differences; its details will be deepened in the following chapters."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "In each example, identify subject, principal, credential, authenticator, issuer, audience, resource, policy and enforcement point. This decomposition avoids the generic conclusion that “the token is valid” when the access decision is still incorrect."
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
      "Differentiate identity, subject, principal, credential, authenticator, session, token and claim.",
      "Separate authentication, authorization, delegation, federation and auditing.",
      "Distinguish human identities, applications, devices and workloads.",
      "Evaluate API keys, Basic, cookies, secrets, certificates, tokens and proof-of-possession mechanisms.",
      "Validate JWTs considering algorithm, key, issuer, audience, time, type and policy.",
      "Understand the role of OAuth 2.0 and OpenID Connect without confusing access token with proof of login.",
      "Compare RBAC, ABAC, ReBAC, and attribute-and context-oriented policies.",
      "Design PEP, PDP, PIP and PAP in architectures with gateway and services.",
      "Apply workload identity, managed identity, federation and SPIFFE in machine-to-machine integrations.",
      "Diagnose 401, 403 errors, rejected tokens, missing claims and divergent decisions between gateway and backend."
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
      "14.1 Identity as the foundation of access control",
      "14.2 Vocabulary: subject, principal, credential and session",
      "14.3 Authentication, authorization, delegation and audit",
      "14.4 Human identities, applications, devices and workloads",
      "14.5 Registration, link and identity life cycle",
      "14.6 User Factors and Authenticators",
      "14.7 Application credentials and proof-of-possession",
      "14.8 API keys: usefulness and limitations",
      "14.9 HTTP Basic and static credentials",
      "14.10 Sessions, cookies, CORS and CSRF",
      "14.11 Opaque, structured, bearer and sender-constrained tokens",
      "14.12 Claims, issuer, subject, audience, scopes and roles",
      "14.13 JWT: structure and secure validation",
      "14.14 OAuth 2.0 and OpenID Connect: conceptual limits",
      "14.15 RBAC, ABAC, ReBAC and PBAC authorization models",
      "14.16 PEP, PDP, PIP and PAP",
      "14.17 Delegation, impersonation and on-behalf-of",
      "14.18 Workload identity and zero trust",
      "14.19 Identity in API Gateways, Axway and Azure",
      "14.20 Responses 401, 403 and insufficient_scope",
      "14.21 Logs, auditing, privacy and correlation",
      "14.22 Threats and hardening",
      "14.23 Evidence-driven troubleshooting",
      "14.24 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.1 Identity as the foundation of access control",
    "id": "14-1-identity-as-the-foundation-of-access-control"
  },
  {
    "kind": "paragraph",
    "text": "An API exposes business capabilities, data, and transitions. To protect them, the system needs to associate each request with a trusted principal. The principal is the operational identity used in the decision: a person, an application, a device, a workload or a combination, such as “application X acting on behalf of user Y”. Without this association, rate limits, audit trails, and authorizations become approximations based on IP or shared secrets."
  },
  {
    "kind": "paragraph",
    "text": "Identity is not synonymous with textual name. An email, client_id or SPIFFE ID is an identifier; trust arises from the process that links this identifier to a credential and the validation performed on each use. Two systems can use the same text and have different trust domains. Therefore, the identifier needs to be interpreted according to the issuer, tenant, type of subject and registration policy."
  },
  {
    "kind": "paragraph",
    "text": "In intermediary architectures, each hop can authenticate different identities. The balancer can authenticate the gateway certificate; the gateway can validate the consumer's access token; the backend can receive propagated claims or a new token issued to the internal segment. The design must state where identity is established, transformed, reduced or replaced."
  },
  {
    "kind": "subhead",
    "text": "Architecture rule"
  },
  {
    "kind": "paragraph",
    "text": "Never use just a value provided by the client itself, such as X-User-Id or X-Role, as proof of identity. The data must come from a validated credential or be inserted by a trusted intermediary that removes any external values."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.2 Subject, principal, credential, authenticator and session",
    "id": "14-2-subject-principal-credential-authenticator-and-session"
  },
  {
    "kind": "paragraph",
    "text": "The subject is the entity about which a statement is made. In human authentication, it can be a registered person. In an integration, it could be a service. The principal is the representation of this entity within the security system. The same person can have different principals in different tenants; An application can operate as its own principal or act on behalf of a user."
  },
  {
    "kind": "paragraph",
    "text": "Credential is the material used to demonstrate control or link: password, private key, certificate, client secret, physical authenticator, session cookie or token. The authenticator is the mechanism that contains or produces the proof. In digital identity terminology, the authentication process verifies that the claimant controls one or more authenticators linked to the subscriber."
  },
  {
    "kind": "paragraph",
    "text": "Session is state created after authentication to avoid repeating the complete process in each interaction. Tokens can represent session, delegation or authorization, but they are not automatically the same thing. A browser session can exist at the identity provider while the API receives independent, short-lived access tokens."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Close terms have different responsibilities.",
    "headers": [
      "Term",
      "Question answered",
      "Example"
    ],
    "rows": [
      [
        "Identifier",
        "How is the entity named?",
        "sub, client id, SPIFFE ID. _"
      ],
      [
        "Credential",
        "What material is presented?",
        "password, key, certificate, token."
      ],
      [
        "Authentication",
        "Is the proof valid for this identity?",
        "MFA, subscription, mTLS."
      ],
      [
        "Session",
        "What temporary state was created?",
        "secure cookie or session on the IdP."
      ],
      [
        "Authorization",
        "Is the action permitted in this context?",
        "scope, role, attribute and domain rule."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/en/figure-01.svg",
    "alt": "Authenticated identity undergoing a contextual authorization decision",
    "caption": "Figure 1 - An authenticated identity still needs to undergo a contextual authorization decision."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.3 Authentication, authorization, delegation and audit",
    "id": "14-3-authentication-authorization-delegation-and-audit"
  },
  {
    "kind": "paragraph",
    "text": "Authentication validates a proof. Authorization decides access. Delegation allows a client to obtain limited authority to act on behalf of another subject. Federation allows a domain to accept assertions produced by another trusted domain. Audit records enough facts to reconstruct who did what, on which resource, with what decision and what result."
  },
  {
    "kind": "paragraph",
    "text": "These functions can occur in different components. An identity provider authenticates the user; an authorization server issues an access token; API Gateway validates the token and applies cross-cutting policies; the backend checks fine authorization related to the resource state. Focusing every decision on the gateway may require domain data that it does not have; concentrating everything on the backend doubles controls and reduces governance."
  },
  {
    "kind": "paragraph",
    "text": "The design must separate decision and enforcement. A policy can be evaluated locally by the gateway, by a central service, or in conjunction with the backend. Regardless of the model, the request must carry verifiable context and the decision must be recordable. Invisible identity transformations create confusion in incidents and audits."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The functions are linked, but should not be confused.",
    "headers": [
      "Function",
      "Primary input",
      "Exit"
    ],
    "rows": [
      [
        "Authentication",
        "credential, proof and context",
        "authenticated principal and trust level."
      ],
      [
        "Authorization",
        "principal, action, resource and attributes",
        "allow, deny or require additional condition."
      ],
      [
        "Delegation",
        "consent or authority granted",
        "limited token to act on behalf of another."
      ],
      [
        "Federation",
        "assertion of another domain",
        "identity accepted according to trust policy."
      ],
      [
        "Audit",
        "events and decisions",
        "correlated and investigateable trail."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.4 Human identities, applications, devices and workloads",
    "id": "14-4-human-identities-applications-devices-and-workloads"
  },
  {
    "kind": "paragraph",
    "text": "Human identities have characteristics such as employment, personal account, consent, recovery and multi-factor authentication. The risk includes phishing, session hijacking, account sharing, and use after shutdown. Authorization usually considers function, unit, relationship with the resource and actions carried out in one's own name."
  },
  {
    "kind": "paragraph",
    "text": "Applications and workloads are non-human identities. They do not enter a password or respond to a second factor. They require provisioned credentials, environment attestation, or federation. The life cycle must follow deployment, rotation, change of owner and deactivation. A secret without an owner and without expiration is an operational and security debt."
  },
  {
    "kind": "paragraph",
    "text": "Devices can provide posture, registration, or hardware-protected key signals. Device identity does not replace user or application identity; it adds context. A request can simultaneously involve the user, OAuth client, device and workload that runs the backend. Claims and logs need to preserve these layers without collapsing them into a single field."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Each identity class requires its own controls.",
    "headers": [
      "Type",
      "Typical identifier",
      "Preferred credential",
      "Lifecycle risk"
    ],
    "rows": [
      [
        "Human",
        "subject by tenant",
        "phishing-resistant MFA when applicable",
        "shutdown, recovery and session."
      ],
      [
        "Application",
        "client id / service principal _",
        "asymmetric key or federation",
        "orphan secret and broad permissions."
      ],
      [
        "Workload",
        "service account / SPIFFE ID",
        "short credential issued by attestation",
        "ephemeral replica and shared identity."
      ],
      [
        "Device",
        "device ID and key",
        "protected key and registry",
        "loss, cloning or outdated posture."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.5 Registration, link and identity life cycle",
    "id": "14-5-registration-link-and-identity-life-cycle"
  },
  {
    "kind": "paragraph",
    "text": "Secure authentication starts before login. The registry needs to establish who can create the identity, which attributes are trusted, who is the owner and how the link will be revoked. In human identities, this may involve identity proofing and HR processes. In applications, it involves registration, technical owner, environment, purpose, repository and approval of permissions."
  },
  {
    "kind": "paragraph",
    "text": "The lifecycle includes creation, activation, change, suspension, recovery, rotation, and termination. Control should not depend solely on removing a credential: roles, grants, sessions, refresh tokens, certificates and associations in catalogs also need to be invalidated. Deactivating the account without closing sessions can maintain access for hours or days."
  },
  {
    "kind": "paragraph",
    "text": "Shared identities eliminate accountability. When multiple systems use the same client_id and secret, it is impossible to accurately assign traffic, enforce least privilege, or remove just one consumer. Identity individualization enables per-application quotas, policies, telemetry, and incident response."
  },
  {
    "kind": "subhead",
    "text": "Minimum registration control"
  },
  {
    "kind": "paragraph",
    "text": "Every application identity must have owner, purpose, environment, review date, credential mechanism, approved permissions and deactivation procedure. The absence of any item shall prevent promotion to production."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.6 User Factors and Authenticators",
    "id": "14-6-user-factors-and-authenticators"
  },
  {
    "kind": "paragraph",
    "text": "Authentication factors are often grouped into something the user knows, has, or is. The number of factors is not enough to determine resistance: two memorized secrets are not equivalent to two independent factors. It is also necessary to evaluate resistance to phishing, replay, authenticator theft, recovery and binding between session and context."
  },
  {
    "kind": "paragraph",
    "text": "In APIs accessed by interactive applications, user authentication typically occurs at the identity provider, not directly at the business endpoint. The API receives a resulting assertion or access token. This allows you to centralize MFA, risk, and session policies, while the API focuses on validating the token and authorizing the resource."
  },
  {
    "kind": "paragraph",
    "text": "The authentication level may vary per action. Querying low-risk data can use existing session; Changing the limit or registering a beneficiary may require a step-up. Claims such as acr and amr can carry information about the method, but the consumer must only interpret values ​​documented by the issuer and appropriate to the policy."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Factors and signs must be evaluated according to the risk of the journey.",
    "headers": [
      "Category",
      "Example",
      "Note"
    ],
    "rows": [
      [
        "Knowledge",
        "password or PIN",
        "vulnerable to phishing, reuse and leakage."
      ],
      [
        "Possession",
        "security key or authenticator app",
        "Security depends on protection and binding."
      ],
      [
        "Inherence",
        "biometrics",
        "typically unlocks an authenticator; requires care with privacy."
      ],
      [
        "Context",
        "device, network, risk",
        "it is an additional sign, not a universal isolated factor."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.7 Application credentials and proof-of-possession",
    "id": "14-7-application-credentials-and-proof-of-possession"
  },
  {
    "kind": "paragraph",
    "text": "Applications can use shared secret, certificate, private key, message signature, mTLS, or identity federation. Secrets are simple, but any copy allows impersonation. Asymmetric keys reduce secret distribution: the private key remains on the client and the verifier uses the public key or certificate."
  },
  {
    "kind": "paragraph",
    "text": "Proof-of-possession means that the client demonstrates control of the key, not just presenting a copiable value. mTLS ties authentication to the certificate used in the channel. DPoP adds signed proof at the HTTP level and can bind tokens to a key. These mechanisms reduce replay of stolen tokens, but require validation of nonce, method, URI, thumbprint and time window according to the protocol."
  },
  {
    "kind": "paragraph",
    "text": "Workload federation avoids storing long-lived secrets. An external environment presents a short assertion from its provider; The target domain validates issuer, subject and conditions and issues a local token. The trust must be restricted to specific subjects and audiences, never to any token issued by the provider."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Application credentials must prioritize proof-of-possession and automation.",
    "headers": [
      "Mechanism",
      "Material at the customer",
      "Advantage",
      "Caution"
    ],
    "rows": [
      [
        "Client secret",
        "copiable secret",
        "broad support",
        "rotation, pouring and distribution."
      ],
      [
        "Certificate / private key",
        "asymmetric key",
        "cryptographic proof and public key separation",
        "key protection and certificate cycle."
      ],
      [
        "mTLS",
        "certificate in handshake",
        "channel authentication and token binding possible",
        "TLS termination and proxies."
      ],
      [
        "Federation",
        "short environmental assertion",
        "no local static secret",
        "trust policy needs to be specific."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.8 API keys: usefulness and limitations",
    "id": "14-8-api-keys-usefulness-and-limitations"
  },
  {
    "kind": "paragraph",
    "text": "An API key is a secret or semi-secret identifier associated with a consumer, product or plan. It is useful for metering, quotas, abuse discovery, and traffic separation. However, it does not automatically represent a strong identity. If copied, it can be reused by any party, and many implementations have no audience, short expiration, or proof of ownership."
  },
  {
    "kind": "paragraph",
    "text": "API keys should not be sent in a query string, because URLs appear in logs, history, analytics and refereers. Prefer dedicated header or Authorization as per contract. The value must be treated as a secret: stored securely, displayed only once, rotatable and never fully recorded."
  },
  {
    "kind": "paragraph",
    "text": "In low-risk public APIs, a key can complement controls. In sensitive operations, it must be combined with appropriate authentication and authorization. The gateway can validate the key and apply plan, but the backend still needs to authorize the resource when identity or business context matters."
  },
  {
    "kind": "subhead",
    "text": "Header transport example"
  },
  {
    "kind": "code",
    "text": "GET /catalog/products HTTP/1.1\nHost: api.company.example\nX-API-Key: <secret-value>"
  },
  {
    "kind": "subhead",
    "text": "Antipattern"
  },
  {
    "kind": "paragraph",
    "text": "Do not use GET /recurso?api_key=secret. The URL can be registered by proxies, servers, APM tools and browsers, expanding the exposure surface."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.9 HTTP Basic and static credentials",
    "id": "14-9-http-basic-and-static-credentials"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Basic transports a Base64 encoded identifier and password. Base64 is not encryption; the mechanism relies on TLS for confidentiality. The header can be resent on each request and, when a credential is shared, any leakage allows use until rotation."
  },
  {
    "kind": "paragraph",
    "text": "Basic still appears in legacy integrations and administrative endpoints. Use should be limited to protected channels, individual credentials, minimum scope, rate limiting and rotation. Never reuse a human directory password as an integration password. A service credential must have its own lifecycle and owner."
  },
  {
    "kind": "paragraph",
    "text": "The migration can accept Basic and token during controlled window, register remaining consumers and retire the old mechanism. Just converting username/password into a token at the gateway without improving registration, rotation and authorization preserves the original fragility."
  },
  {
    "kind": "subhead",
    "text": "Conceptual framework"
  },
  {
    "kind": "code",
    "text": "Authorization: Basic base64(client-id:secret)\n# The decoded content remains a reusable secret."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.10 Sessions, cookies, CORS and CSRF",
    "id": "14-10-sessions-cookies-cors-and-csrf"
  },
  {
    "kind": "paragraph",
    "text": "Browser applications often use session cookies. The browser automatically sends them to the corresponding domain, which creates the risk of cross-site request forgery when a malicious origin induces an authenticated request. SameSite, anti-CSRF tokens, Origin validation and appropriate methods reduce risk; CORS is not a complete protection mechanism against CSRF."
  },
  {
    "kind": "paragraph",
    "text": "Session cookies must use Secure, HttpOnly when they do not need to be read by JavaScript, minimum Domain/Path scope, and architecturally compatible SameSite policy. The session identifier must be unpredictable and rotated upon authentication or elevation of privilege. Logout needs to terminate state on the server when the session is stateful."
  },
  {
    "kind": "paragraph",
    "text": "In SPAs, storing bearer tokens in localStorage increases the impact of XSS. A backend-for-frontend architecture can maintain tokens on the server and expose only protected session cookies to the browser. The choice depends on the threat model, but the design needs to consider XSS, CSRF, exfiltration, refresh and multiple tabs."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Browser sessions require controls beyond initial authentication.",
    "headers": [
      "Control",
      "Risk treated",
      "Note"
    ],
    "rows": [
      [
        "Secure",
        "sending on non-TLS channel",
        "does not protect against compromised script or server."
      ],
      [
        "HttpOnly",
        "reading by JavaScript",
        "reduces direct exfiltration by XSS."
      ],
      [
        "SameSite",
        "cross-site shipping",
        "needs to support federated login and legitimate flows."
      ],
      [
        "Origin/CSRF token",
        "induced request",
        "the server must validate on effective operations."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.11 Opaque, structured, bearer and sender-constrained tokens",
    "id": "14-11-opaque-structured-bearer-and-sender-constrained-tokens"
  },
  {
    "kind": "paragraph",
    "text": "An opaque token does not reveal meaning to the client. The resource server queries introspection or local state to discover activity, subject, scope and expiration. This facilitates revocation and reduces exposure of claims, but introduces dependence on network, cache and availability of the authorization server."
  },
  {
    "kind": "paragraph",
    "text": "A structured token, such as JWT, carries locally verifiable claims. This reduces calls per request, but immediate revocation is more difficult and the content can be copied during its validity. Signature guarantees integrity and origin, not confidentiality. The payload of a JWS is normally just encoded and can be read."
  },
  {
    "kind": "paragraph",
    "text": "Bearer token grants access to whoever holds it. Sender-constrained token requires additional proof of legitimate client, such as mTLS or DPoP. Binding reduces replay, but does not eliminate the need for short expiration, correct audience, minimum scope and protection of the issuing endpoint."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Possession format and model are different decisions.",
    "headers": [
      "Type",
      "Validation",
      "Advantage",
      "Limitation"
    ],
    "rows": [
      [
        "Opaque",
        "introspection or local storage",
        "revocation and little exposure",
        "latency and core dependency."
      ],
      [
        "JWT signed",
        "public key and claims",
        "local validation and interoperability",
        "replay and revocation until expired."
      ],
      [
        "Bearer",
        "possession of value",
        "simplicity",
        "theft allows reuse."
      ],
      [
        "Sender-constrained",
        "token plus proof of key",
        "reduces replay by third parties",
        "greater operational complexity."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.12 Claims, issuer, subject, audience, scopes and roles",
    "id": "14-12-claims-issuer-subject-audience-scopes-and-roles"
  },
  {
    "kind": "paragraph",
    "text": "Claims are statements about the token, subject, client or context. iss identifies the issuer; sub identifies the subject in the issuer's domain; aud indicates the intended recipient; exp, nbf and iat establish time; jti can identify the token. The iss + sub combination is safer than interpreting sub alone."
  },
  {
    "kind": "paragraph",
    "text": "Scope represents delegated authority in terms understandable by the resource server. Role usually represents a role assigned to a user or application. Permission or entitlement can express more specific capabilities. Mixing everyone into the same camp makes politics ambiguous. The organization needs to define vocabulary, namespace and semantics."
  },
  {
    "kind": "paragraph",
    "text": "Claims must not carry unnecessary or sensitive data. Tokens pass through clients, gateways, logs and tools. When the backend needs dynamic information, it can search data by identifier or use an attribute service. Very large claims increase headers, latency and exposure risk."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Claims need explicit semantics and validation.",
    "headers": [
      "claim",
      "Meaning",
      "Validation"
    ],
    "rows": [
      [
        "iss",
        "who issued",
        "exact comparison with trusted issuer."
      ],
      [
        "sub",
        "subject at the issuer",
        "interpret along with iss and type of identity."
      ],
      [
        "aud",
        "recipient resource",
        "must include the expected API."
      ],
      [
        "exp/nbf",
        "time window",
        "use reliable clock and limited skew."
      ],
      [
        "scope",
        "delegated authority",
        "require only the scopes necessary for the operation."
      ],
      [
        "azp/clientid_",
        "authorized customer",
        "distinguish user application."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/en/figure-02.svg",
    "alt": "Token validation chain leading to access policy",
    "caption": "Figure 2 - Signing is just one step in validating a token."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.13 JWT: structure, signature, encryption and secure validation",
    "id": "14-13-jwt-structure-signature-encryption-and-secure-validation"
  },
  {
    "kind": "paragraph",
    "text": "JWT is a claims format that can be protected by JWS or JWE. In a signed JWT, header, payload and signature are encoded in separate segments. The header indicates cryptographic parameters; the payload contains claims; the signature protects integrity. JWE adds encryption, but it should not be introduced just to hide excessive data design."
  },
  {
    "kind": "paragraph",
    "text": "Validation needs to fix accepted algorithms and reject unexpected combinations. The verifier should not blindly trust alg or key URLs provided by the token. Keys must come from trusted configuration or metadata, with caching, rotation, and protection against confusion between symmetric and asymmetric keys."
  },
  {
    "kind": "paragraph",
    "text": "In addition to the signature, validate issuer, audience, exp, nbf, token type and mandatory claims. A valid ID token for an OpenID Connect client must not be accepted as an access token by an API. Explicit typing, distinct rules, and separate audiences reduce substitution between contexts."
  },
  {
    "kind": "subhead",
    "text": "Didactic example of access token claims"
  },
  {
    "kind": "code",
    "text": "HEADER\n{ \"alg\": \"RS256\", \"typ\": \"at+jwt\", \"kid\": \"key-2026-01\" }\nPAYLOAD\n{\n  \"iss\": \"https://id.company.example\",\n  \"sub\": \"app:reconciliation\",\n  \"aud\": \"https://api.company.example/pagamentos\",\n  \"scope\": \"payments.read\",\n  \"iat\": 1784130000,\n  \"exp\": 1784130300\n}"
  },
  {
    "kind": "subhead",
    "text": "Minimum validation"
  },
  {
    "kind": "paragraph",
    "text": "Accepting only a valid signature without checking iss, aud, time and type is equivalent to accepting credentials issued to other systems. Each API needs to declare exactly which issuers, audiences, algorithms and claims are allowed."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.14 OAuth 2.0 and OpenID Connect: conceptual limits",
    "id": "14-14-oauth-2-0-and-openid-connect-conceptual-limits"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 is a delegated authorization framework. It defines roles and mechanisms for a client to obtain an access token and access a resource server with limited authority. OAuth does not alone define how the user was authenticated nor does it guarantee that an access token contains human identity. Client Credentials, for example, represent application access on its own behalf."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect adds an authentication layer on top of OAuth 2.0. The ID token communicates claims about user authentication to the client, and the UserInfo Endpoint can provide additional data. The ID token is intended for the client and should not be sent as a generic credential for APIs, unless there is an explicit contract and an appropriate profile."
  },
  {
    "kind": "paragraph",
    "text": "The API must validate access token intended for it. The client validates ID token intended for it. Confusing the two can allow token substitution. The next chapters will delve deeper into authorization code, PKCE, client credentials, refresh, consent, metadata, introspection and modern security according to OAuth Security BCP."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Identity artifacts have different audiences and uses.",
    "headers": [
      "Artifact",
      "Recipient",
      "Purpose"
    ],
    "rows": [
      [
        "Access token",
        "resource server/API",
        "authorize access to resources."
      ],
      [
        "ID token",
        "OpenID Connect client",
        "inform user authentication result."
      ],
      [
        "Refresh token",
        "authorization server",
        "obtain new access tokens as per policy."
      ],
      [
        "Authorization code",
        "endpoint token by client",
        "short-term intermediate exchange."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.15 Authorization models: RBAC, ABAC, ReBAC and PBAC",
    "id": "14-15-authorization-models-rbac-abac-rebac-and-pbac"
  },
  {
    "kind": "paragraph",
    "text": "RBAC assigns roles to principals and permissions to roles. It's simple for stable organizational roles, but overly granular roles produce explosion and broad roles violate least privilege. The “analyst” role does not answer on its own whether the user can consult any account or just those in their portfolio."
  },
  {
    "kind": "paragraph",
    "text": "ABAC evaluates attributes of the subject, resource, action and environment. Can combine unit, classification, tenant, time, device and risk. Flexibility increases the need for reliable data, clear semantics, and testing. Outdated or manipulable attributes make the policy insecure."
  },
  {
    "kind": "paragraph",
    "text": "ReBAC uses relationships, such as owner, member, responsible or manager. It is useful when access depends on the subject's position in a graph. PBAC is a broad term for policy-based decisions, often combining roles, attributes, and relationships. In real systems, hybrid models are common."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Models can be combined by layer and risk.",
    "headers": [
      "Model",
      "Basis of the decision",
      "Proper use",
      "Risk"
    ],
    "rows": [
      [
        "RBAC",
        "function or role",
        "stable organizational permissions",
        "role explosion and excess privilege."
      ],
      [
        "ABAC",
        "attributes and context",
        "contextual and multitenant rules",
        "incorrect attributes and complex policy."
      ],
      [
        "ReBAC",
        "relationships between entities",
        "owner, team, portfolio and share",
        "outdated graph or expensive query."
      ],
      [
        "PBAC",
        "declarative policy",
        "centralized combination of signals",
        "dependence on PDP and governance."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/en/figure-03.svg",
    "alt": "Decision architecture with PEP, PDP, PIP, PAP and protected resource",
    "caption": "Figure 3 - Enforcement can remain at the gateway or service while the decision uses external policy and attributes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.16 PEP, PDP, PIP and PAP",
    "id": "14-16-pep-pdp-pip-and-pap"
  },
  {
    "kind": "paragraph",
    "text": "The Policy Enforcement Point intercepts the operation and applies the decision. API Gateway is a natural PEP for authentication, scope, quota and cross-cutting rules. The backend also acts as PEP for domain authorization. Policy Decision Point evaluates policies and returns a decision, possibly with obligations such as masking fields or requiring step-up."
  },
  {
    "kind": "paragraph",
    "text": "The Policy Information Point provides attributes: user data, tenant, relationship, resource classification, or risk. The Policy Administration Point is where policies are created, reviewed, versioned and published. Separating these roles allows for governance, but adds latency, availability and consistency as architectural requirements."
  },
  {
    "kind": "paragraph",
    "text": "Centralized decisions need caching and fail behavior strategies. Fail-open can expose data when the PDP fails; fail-closed may cause unavailability. The choice depends on the risk of the operation. Critical policies must have testing, versioning, rollback and observability equivalent to production code."
  },
  {
    "kind": "subhead",
    "text": "Recommended division"
  },
  {
    "kind": "paragraph",
    "text": "Use the gateway to validate credentials and apply controls independent of domain state. Keep in service decisions that depend on ownership, balance, transaction status, or rules that change with the business."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.17 Delegation, impersonation and on-behalf-of",
    "id": "14-17-delegation-impersonation-and-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "Delegation grants limited authority to a client to act on behalf of a subject. The token needs to distinguish user, client and delegated scope. Registering only the user hides which application performed the action; registering only the application loses the person who authorized it. Logs must preserve both when the flow involves both."
  },
  {
    "kind": "paragraph",
    "text": "Impersonation is stronger: one component takes on the identity of another. It must be rare, explicitly authorized and audited, as it eliminates boundaries. In administrative tools, the interface needs to indicate that the operator is acting as another user and record the original actor, reason and duration."
  },
  {
    "kind": "paragraph",
    "text": "On-behalf-of occurs when one service calls another while maintaining user context. Forwarding the same token to all backends expands audience and exposure. Token exchange or issuance of a specific token for the next resource reduces privilege and allows representing the chain of actors in a controlled way."
  },
  {
    "kind": "table",
    "caption": "Table 11 - The actor's identity must not disappear during delegation.",
    "headers": [
      "Scenario",
      "Identities that must appear",
      "Control"
    ],
    "rows": [
      [
        "App on behalf of the user",
        "user + client",
        "delegated scopes and consent/policy."
      ],
      [
        "Service on behalf of the user",
        "user + calling service",
        "specific audience and actor chain."
      ],
      [
        "App-only",
        "application/workload",
        "application and owner permissions."
      ],
      [
        "Administrative impersonation",
        "operator + assumed subject",
        "approval, deadline, reason and reinforced audit."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/authentication-authorization/en/figure-04.svg",
    "alt": "Workload identity with attestation and short credentials",
    "caption": "Figure 4 - Attestation and short credentials reduce persistent secrets in workloads."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.18 Workload identity and zero trust",
    "id": "14-18-workload-identity-and-zero-trust"
  },
  {
    "kind": "paragraph",
    "text": "Workload identity represents running software. In the cloud, it can be principal service or managed identity. In Kubernetes, you can use federated service accounts. In SPIFFE, the workload receives a SPIFFE ID and verifiable identity documents through the Workload API. The goal is to link credentials to the actual process environment and lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "Zero trust does not mean distrusting everything in the abstract; means not granting implicit trust just by network location. Each access must evaluate identity, resource and context. Being inside the VNet or cluster does not replace authentication. Network segmentation remains useful, but it works alongside identity."
  },
  {
    "kind": "paragraph",
    "text": "Short, automatically rotated credentials narrow the window for abuse. The service should not be able to export a long-lived credential when the platform can issue tokens on demand. Authorization needs to limit audience and permissions; a managed identity without a secret can still be dangerous if it has an administrator role."
  },
  {
    "kind": "table",
    "caption": "Table 12 - Workload identity must follow the platform and execution cycle.",
    "headers": [
      "Technology",
      "Identity",
      "Emission",
      "Usage"
    ],
    "rows": [
      [
        "Managed identity",
        "managed core service",
        "Azure platform issues tokens",
        "access to resources that trust Microsoft Entra."
      ],
      [
        "Workload federation",
        "mapped external subject",
        "exchange assertion for local token",
        "CI/CD, Kubernetes and multi-cloud without secret."
      ],
      [
        "SPIFFE/SPIRE",
        "SPIFFE ID",
        "Short SVID via attestation",
        "mTLS or JWT across workloads."
      ],
      [
        "Static service account",
        "service account",
        "secret or persistent token",
        "legacy; requires rotation and restraint."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.19 Identity in API Gateways, Axway and Azure",
    "id": "14-19-identity-in-api-gateways-axway-and-azure"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway can extract credentials, validate API key, certificate or JWT, apply scopes, query external identity and propagate context to the backend. The policy should remove client-supplied identity headers and insert only validation-derived values. The backend should trust these headers only when the connection comes from the authorized gateway."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, policies such as validate-jwt and validate-azure-ad-token validate tokens and can require issuer, audience, and claims. The configuration needs to use correct metadata and issuer keys, log failures without exposing token, and separate gateway authorization from domain rules. Managed identity can be used by the gateway or backend to obtain tokens without static secrets in supported scenarios."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, OAuth filters, OpenID Connect, and JWT verification can participate in policies. The design must declare whether the gateway acts as an authorization server, client or resource server. As products and versions vary, the policy needs to be tested with real authorized tokens, key rotation, and error scenarios."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of policy in Azure API Management"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://pagamentos</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"any\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Operational attention"
  },
  {
    "kind": "paragraph",
    "text": "JWT validation depends on metadata, key cache and rotation. Test the behavior when the kid changes, the metadata becomes unavailable, the clock diverges, or the token has multiple audiences."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.20 Responses 401, 403 and insufficient_scope",
    "id": "14-20-responses-401-403-and-insufficient-scope"
  },
  {
    "kind": "paragraph",
    "text": "HTTP 401 indicates that the request does not have valid authentication credentials for the resource. The response must use WWW-Authenticate when applicable, providing the schema and secure parameters. The code does not necessarily mean “non-existent user”; may represent missing, expired token, invalid subscription, or incorrect audience."
  },
  {
    "kind": "paragraph",
    "text": "HTTP 403 indicates that the server understands the request and refuses to serve it. It can occur when the identity is valid but does not have permission. On some sensitive resources, the server may prefer 404 to not reveal existence, as long as the behavior is consistent and documented."
  },
  {
    "kind": "paragraph",
    "text": "When using bearer tokens, errors such as invalid_token and insufficient_scope help the client, but details should not reveal keys, internal rules or existence of data. The gateway and backend need to internally record the exact cause and expose a stable, correlatable, and safe error to the consumer."
  },
  {
    "kind": "table",
    "caption": "Table 13 - External status must preserve semantics; the internal log preserves diagnosis.",
    "headers": [
      "Situation",
      "Probable status",
      "Internal evidence"
    ],
    "rows": [
      [
        "Missing or invalid token",
        "401",
        "validation reason and expected issuer/audience."
      ],
      [
        "Valid token without permission",
        "403",
        "scope, role or rule denied."
      ],
      [
        "Deliberately hidden feature",
        "404 possible",
        "registered policy decision."
      ],
      [
        "Rate limit exceeded",
        "429",
        "identity, plan, limit and window."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "External response without sensitive details"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"pagamentos\", error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.example/problems/authentication\",\n  \"title\": \"Invalid or missing credential\",\n  \"status\": 401,\n  \"correlationId\": \"9c0f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.21 Logs, auditing, privacy and correlation",
    "id": "14-21-logs-auditing-privacy-and-correlation"
  },
  {
    "kind": "paragraph",
    "text": "Access logs must record principal, identity type, client, issuer, audience, operation, resource, decision, policy version and correlation ID. Do not register bearer token, secret, password, cookie or complete key. When an identifier is sensitive, use pseudonymization or controlled stable hashing as needed for investigation."
  },
  {
    "kind": "paragraph",
    "text": "The audit needs to distinguish successful authentication, denied authorization, and infrastructure failure. A 401 for expired token is different from an error when fetching metadata. A 403 from the gateway is different from a 403 from the backend. Fields like decision_source and response_origin reduce guesswork-based investigations."
  },
  {
    "kind": "paragraph",
    "text": "Retention and access to logs must respect privacy and purpose. Profile claims should not be copied in full for all events. Register only attributes necessary for security, support, and compliance. Administrative trails of policy and grant changes are as important as call logs."
  },
  {
    "kind": "table",
    "caption": "Table 14 - Useful audit records identity and decision without leaking credentials.",
    "headers": [
      "Field",
      "Example",
      "Caution"
    ],
    "rows": [
      [
        "principal_id",
        "iss + normalized sub",
        "do not use changeable email as unique key."
      ],
      [
        "clientid_",
        "calling application",
        "preserve in delegated streams."
      ],
      [
        "auth method_",
        "mTLS, JWT, session",
        "do not record credential material."
      ],
      [
        "decision",
        "permit/deny",
        "include policy and point you decided."
      ],
      [
        "correlation id _",
        "end-to-end identifier",
        "validate and normalize external value."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.22 Threats and hardening",
    "id": "14-22-threats-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Credential stuffing and password spraying exploit reused passwords. Phishing captures session or factor. Secret leakage exposes application credentials in repositories and pipelines. Token replay reuses bearer tokens. Confusion attacks make a system accept tokens from another context. Broken Object Level Authorization allows access to another user's resource even with a valid token."
  },
  {
    "kind": "paragraph",
    "text": "Hardening starts with least privilege, short credentials, automatic rotation, and audience separation. JWTs must follow good algorithm, typing and validation practices. Redirect URIs, clients and scopes need to be restricted. Sessions and refresh tokens must have revocation and anomaly detection according to risk."
  },
  {
    "kind": "paragraph",
    "text": "Authorization must occur on every object and function, not just the generic endpoint. Listing /contas with scope contatos.read does not guarantee that the subject can see all returned accounts. The backend needs to filter by relationship and prevent manipulated IDs from bypassing the rule."
  },
  {
    "kind": "table",
    "caption": "Table 15 - Valid tokens do not eliminate authorization and lifecycle failures.",
    "headers": [
      "Threat",
      "Flaw exploited",
      "Primary control"
    ],
    "rows": [
      [
        "Token replay",
        "copyable bearer",
        "TLS, short expiration and sender constraint when necessary."
      ],
      [
        "Token substitution",
        "audience/type not validated",
        "aud, iss, typ and rules separated by token."
      ],
      [
        "BALL",
        "object without ownership check",
        "authorization per object in the service."
      ],
      [
        "Secret leakage",
        "persistent credential in code",
        "vault, federation and scanning."
      ],
      [
        "Privilege creep",
        "accumulated grants",
        "periodic review and lifecycle."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.23 Evidence-driven troubleshooting",
    "id": "14-23-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The investigation begins by identifying who produced the response. Check if the request reached the gateway, if there was a credential, which policy was executed and if the backend was called. A 401 generated at the edge will not appear in the application log. A 403 from the backend may occur after the gateway accepts the token."
  },
  {
    "kind": "paragraph",
    "text": "For JWT, extract headers and claims only in a secure environment, without pasting production tokens on external websites. Compare iss, aud, exp, nbf, typ, kid, scopes and client_id with the configuration. Confirm gateway clock, OpenID discovery, JWKS, and key rotation. Valid subscription with wrong audience should continue to be rejected."
  },
  {
    "kind": "paragraph",
    "text": "For authorization, reproduce with the same principal and resource. Check attributes, tenant, ownership, policy version and cache. A newly granted permission may not appear due to replication delay or old token. Issuing a new token may be necessary when claims are incorporated at the time of issuance."
  },
  {
    "kind": "table",
    "caption": "Table 16 - Diagnosis needs to correlate credential, decision and response point.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "401 flashing",
        "expiration, clock skew, key rotation",
        "timestamps, kid, JWKS and gateway node."
      ],
      [
        "403 only on some IDs",
        "ownership or tenant",
        "resource, principal, and domain rule."
      ],
      [
        "Works on portal, script fails",
        "audience, client type or credential",
        "compared tokens and flow used."
      ],
      [
        "Gateway accepts, backend rejects",
        "propagation or divergent policy",
        "reliable headers, internal audience and logs of both hops."
      ],
      [
        "After grant still denies",
        "old token/cache",
        "iat, policy version, and attribute TTL."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14.24 Case studies and labs",
    "id": "14-24-case-studies-and-labs"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - access token accepted as ID token"
  },
  {
    "kind": "paragraph",
    "text": "A SPA uses the access token returned by the provider to establish the user's local session, reading sub and email without validating audience or type. A token destined for another API is presented and accepted by the application. The signature is valid, but the token was not issued to that client."
  },
  {
    "kind": "paragraph",
    "text": "The fix separates ID token and access token validation, requires proper audience and nonce, and uses the protocol library. The case shows that valid encryption does not replace context of use."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - gateway authorizes, backend exposes object from another client"
  },
  {
    "kind": "paragraph",
    "text": "The gateway requires scope contas.read and forwards GET /contas/{id}. The backend searches for the ID without checking the link with the subject. An authenticated consumer changes the ID and reads another customer's account. The authentication and scope are correct, but there is Broken Object Level Authorization."
  },
  {
    "kind": "paragraph",
    "text": "The fix applies per-object authorization in the domain and registers principal, tenant, and resource. The gateway continues validating token and scope, but does not attempt to infer ownership without reliable data."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - secret shared between twenty applications"
  },
  {
    "kind": "paragraph",
    "text": "Twenty jobs use the same client_id and secret. After a leak, the organization needs to rotate everyone simultaneously and is unable to identify the person responsible for the traffic. The migration creates individual identity, owner, scope and quota per job, followed by revocation of the shared secret."
  },
  {
    "kind": "paragraph",
    "text": "The gain is not just cryptographic. Individualization allows for least privilege, auditing, deprecation, and incident response on a per-consumer basis."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 1 - validate claims from a synthetic JWT"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Generate a laboratory JWT with issuer, audience, exp and scope controlled.",
      "Validate the signature with a local key and then change aud, exp and typ.",
      "Confirm that each change is rejected by specific rule.",
      "Only register synthetic headers and claims, never real production tokens."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - authorization matrix"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Model read, create, approve, and cancel operations.",
      "List roles, attributes, relationships and necessary conditions.",
      "Implement allow and deny cases with automated testing.",
      "Include attempt to access object from another tenant."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - policy at the gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure an authorized gateway or simulator to require audience and scope.",
      "Send tokens that are missing, expired, from another issuer and without scope.",
      "Compare 401 and 403 and record which layer responded.",
      "Change the signing key and observe the caching and rotation behavior."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 4 - inventory of workload identities"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "List service principals, managed identities, service accounts, and secrets for a lab environment.",
      "Associate owner, resource, permissions and expiration.",
      "Identify static credentials replaceable by federation or managed identity.",
      "Define deactivation process and test revocation."
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
    "text": "Identity is the basis of access control, but it depends on registration, credentials, validation and life cycle. Identifier is not proof. Authentication establishes a principal under a given context; authorization decides an action on a resource. Delegation, federation and audit complete the chain."
  },
  {
    "kind": "paragraph",
    "text": "APIs can use API keys, Basic, sessions, opaque tokens, JWTs, mTLS and proofs of possession. Each mechanism has limits. Bearer tokens are reusable by whoever obtains them; sender-constrained tokens reduce replay. Signed JWT is not encrypted and needs validation of issuer, audience, time, type, algorithm and claims."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 handles delegated authorization; OpenID Connect adds authentication for customers. Access token, ID token and refresh token have different recipients and purposes. Authorization can combine RBAC, ABAC, ReBAC, and centralized policies, but domain and object rules remain the responsibility of the service."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways function as PEP for cross-cutting controls and can validate tokens, certificates and keys. The architecture needs to preserve user and application identity, prevent forged headers, record the origin of the decision, and use short-lived workload identities. Effective security requires least privilege, rotation, observability, and deniability testing."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 15 will delve deeper into Basic Auth, Digest and API Keys, analyzing credential transmission, HTTP challenges, secret storage, replay, rotation, application identification and limitations of these mechanisms in enterprise APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Identity and access checklist",
    "id": "identity-and-access-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Each call can be associated with an individual principal and a known owner.",
      "Authentication is separate from operation and object authorization.",
      "Issuer, audience, type, algorithm and time are explicitly validated.",
      "Access token and ID token are not interchangeable.",
      "API keys and secrets do not appear in URLs, logs or source code.",
      "Application credentials have rotation and revision date.",
      "Scopes, roles, permissions and attributes have documented semantics.",
      "The gateway removes external identity headers before entering trusted context.",
      "The backend applies fine-grained authorization when it depends on state or ownership.",
      "401 and 403 preserve semantics and do not reveal sensitive details.",
      "Logs record principal, client, decision, resource, policy and correlation without tokens.",
      "Workloads use short credentials or federation when possible.",
      "Policies have positive and negative tests, versioning and rollback.",
      "Inventory and shutdown process include grants, sessions, tokens, and certificates."
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
      "Differentiate between subject, principal, identifier, credential and token.",
      "Explain why strong authentication does not fix Broken Object Level Authorization.",
      "Compare API key, client secret, certificate and workload federation.",
      "Explain why a valid signature is not enough to accept a JWT.",
      "Differentiate access token, ID token and refresh token.",
      "Model authorization of a transfer using role, attributes and ownership.",
      "Describe when 401, 403, and 404 can be used.",
      "Explain the role of PEP, PDP, PIP and PAP.",
      "Propose logs for a delegated call while preserving user and application.",
      "Create migration plan from Basic to asymmetric credential or token.",
      "List controls against bearer token replay.",
      "Describe troubleshooting for token accepted at the gateway and rejected at the backend."
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
    "caption": "Table 17 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "ABAC",
        "Authorization based on subject, resource, action and environment attributes."
      ],
      [
        "Access token",
        "Credential used by a client to access a resource server."
      ],
      [
        "API key",
        "Value associated with the consumer or plan; does not imply strong identity in and of itself."
      ],
      [
        "Audience",
        "Recipient to whom a token was issued."
      ],
      [
        "Authentication",
        "Process of validating proof linked to an identity."
      ],
      [
        "Authorization",
        "Decision on action permitted to a principal on which resource."
      ],
      [
        "Bearer token",
        "Token usable by whoever owns the value."
      ],
      [
        "claim",
        "Affirmation carried in token or assertion."
      ],
      [
        "Credential",
        "Material used to demonstrate control or identity linkage."
      ],
      [
        "Delegation",
        "Limited concession to act on behalf of another subject."
      ],
      [
        "Federation",
        "Acceptance of identities or assertions from another trusted domain."
      ],
      [
        "ID token",
        "OpenID Connect token intended for the client to communicate authentication."
      ],
      [
        "Issuer",
        "Entity that issues and signs the token or assertion."
      ],
      [
        "JWT",
        "Compact format for claims protected by JWS or JWE."
      ],
      [
        "PDP",
        "Component that evaluates policy and produces decision."
      ],
      [
        "PEP",
        "Component that applies the decision to access."
      ],
      [
        "Main",
        "Operational representation of an identity in the system."
      ],
      [
        "RBAC",
        "Role-based authorization."
      ],
      [
        "ReBAC",
        "Relationship-based authorization."
      ],
      [
        "Scope",
        "Delegated authority expressed for an access token."
      ],
      [
        "Sender-constrained token",
        "Token tied to proof of a client key."
      ],
      [
        "Workload identity",
        "Non-human identity assigned to running software."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Mechanism choice matrix",
    "id": "annex-a-mechanism-choice-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 18 - The final choice depends on risk, consumers and infrastructure.",
    "headers": [
      "Scenario",
      "Starting mechanism",
      "Additional controls"
    ],
    "rows": [
      [
        "Low-risk public API with quota",
        "API key",
        "TLS, rotation, rate limiting and monitoring."
      ],
      [
        "Controlled legacy integration",
        "Basic temporary",
        "individual credential, TLS, vault and migration plan."
      ],
      [
        "User in web application",
        "OIDC + session or tokens",
        "MFA, CSRF/XSS, audience and object authorization."
      ],
      [
        "Service to service",
        "client credentials, mTLS or federation",
        "minimum scope, audience, rotation and owner."
      ],
      [
        "Workload in Azure",
        "managed identity",
        "Minimal RBAC and sign-in logs."
      ],
      [
        "Multi-cloud workload/Kubernetes",
        "workload federation or SPIFFE",
        "specific trust, short credential and attestation."
      ],
      [
        "High-risk API",
        "sender-constrained token + contextual policy",
        "mTLS/DPoP, step-up, detection and enhanced auditing."
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
      "IETF. RFC 6750 - OAuth 2.0 Bearer Token Usage. 2012.",
      "IETF. RFC 7519 - JSON Web Token (JWT). 2015.",
      "IETF. RFC 7662 - OAuth 2.0 Token Introspection. 2015.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens. 2020.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 Access Tokens. 2021.",
      "IETF. RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession. 2023.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "IETF. RFC 9728 - OAuth 2.0 Protected Resource Metadata. 2025.",
      "OpenID Foundation. OpenID Connect Core 1.0, Second Errata Set.",
      "NIST. SP 800-63-4 - Digital Identity Guidelines. 2025.",
      "NIST. SP 800-63B-4 - Authentication and Authenticator Management. 2025.",
      "NIST. SP 800-207 - Zero Trust Architecture. 2020.",
      "SPIFFE. SPIFFE Concepts, Workload API and SVID Specifications.",
      "Microsoft Learn. Microsoft Enter workload identities and managed identities.",
      "Microsoft Learn. Azure API Management validate-jwt and validate-azure-ad-token policies.",
      "Axway Documentation. OAuth 2.0, OpenID Connect and JWT verification on API Gateway.",
      "OWASP. API Security Top 10 - 2023 Edition."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Protocols, libraries, products, and identity policies evolve. Before implementing any flow or policy, validate the current specifications, product version and behavior in an authorized environment."
  }
];
