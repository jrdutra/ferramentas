import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OAUTH_2_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "OAuth 2.0 delegation: authorization without sharing the user's password"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/overview.svg",
    "alt": "OAuth 2.0 delegating authority between user, client, authorization server, gateway and API",
    "caption": "Opening Figure - OAuth delegates limited authority without making the client the owner of the user's credentials."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The client is granted limited authority to access an API; User authentication and API authorization remain separate decisions."
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
    "text": "Previous chapters separated identity, authentication, authorization, and static credentials. Now the course delves into the OAuth 2.0 framework, created to allow a client to obtain limited authority to access a protected resource. The central idea is to replace the direct sharing of credentials with temporary artifacts, with controlled audience, scope, duration and context."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 is not a single, closed protocol. It is a family of roles, endpoints, grants, client types, token formats, and extensions. The security of a deployment depends on the correct composition of these elements. An Authorization Code flow can be robust when it uses PKCE, strict redirect URI, and state protection, but it can be vulnerable when it accepts broad redirects, mixes issuers, or exposes codes and tokens in logs."
  },
  {
    "kind": "paragraph",
    "text": "The original specification remains important, but modern practice is also guided by later documents. Security Best Current Practice consolidates operational experiences, advises against insecure modes and reinforces PKCE, exact URI redirect, mix-up protection, refresh token restriction and replay defense. Extensions such as PAR, JAR, RAR, mTLS, DPoP, resource metadata and token exchange address higher risk scenarios and corporate integrations."
  },
  {
    "kind": "paragraph",
    "text": "This chapter goes through the complete cycle: client registration, authorization request, token issuance and use, renewal, revocation, introspection, delegation between services and enforcement in API Gateway. The goal is to allow the reader to design and diagnose real flows without confusing user authentication, client authentication, consent, resource authorization, and token validation."
  },
  {
    "kind": "subhead",
    "text": "Specification status"
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.1 remains an Internet-Draft in 2026. It consolidates modern practices, but does not automatically replace published RFCs. For regulatory decisions, use current RFCs and OAuth 2.0 Security Best Current Practice, checking the current draft version for additional guidance only."
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
      "Explain the delegation problem solved by OAuth 2.0 and its limits.",
      "Distinguish resource owner, client, authorization server and resource server.",
      "Differentiate authorization endpoint, token endpoint, introspection, revocation and metadata.",
      "Sort public and confidential clients and choose authentication compatible with their ability to protect keys.",
      "Describe Authorization Code with PKCE and the state, nonce, issuer and redirect URI controls.",
      "Apply Client Credentials, Device Authorization Grant and refresh tokens in appropriate scenarios.",
      "Distinguish grants, codes, access tokens, refresh tokens and ID tokens.",
      "Design scopes, audiences, resource indicators, consent and detailed authorization.",
      "Understand opaque tokens, JWTs, introspection, revocation, and access token profiles.",
      "Apply PAR, JAR, JARM, RAR, mTLS, DPoP and token exchange according to risk.",
      "Integrate OAuth with API Gateways, Axway API Gateway and Azure API Management.",
      "Diagnose invalid_request, invalid_client, invalid_grant, invalid_token and insufficient_scope."
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
      "16.1 The problem that OAuth 2.0 solves",
      "16.2 Roles and trust boundaries",
      "16.3 Endpoints, metadata and channels",
      "16.4 Registration, client types and redirect URIs",
      "16.5 Grants, flows and token types",
      "16.6 Authorization Code in depth",
      "16.7 PKCE and interception protection",
      "16.8 State, nonce, issuer and mix-up protection",
      "16.9 Confidential client authentication",
      "16.10 Web applications, SPAs, native apps, and BFF",
      "16.11 Client Credentials",
      "16.12 Device Authorization Grant",
      "16.13 Refresh tokens, rotation and reuse",
      "16.14 Access tokens, scopes, audience and resource indicators",
      "16.15 Opaque tokens, introspection and revocation",
      "16.16 JWT access tokens and validation",
      "16.17 Consent, least privilege and Rich Authorization Requests",
      "16.18 PAR, JAR and JARM",
      "16.19 Sender-constrained tokens with mTLS and DPoP",
      "16.20 Token Exchange and on-behalf-of",
      "16.21 Metadata of the authorization server and protected resource",
      "16.22 OAuth on API Gateways, Axway and Azure",
      "16.23 Threats and hardening",
      "16.24 Evidence-driven troubleshooting",
      "16.25 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.1 The problem that OAuth 2.0 solves",
    "id": "16-1-the-problem-that-oauth-2-0-solves"
  },
  {
    "kind": "paragraph",
    "text": "Before delegation frameworks, it was common for an application to ask for a user's password to access another system. This practice gave the client excessive power, prevented limiting operations, made selective revocation difficult and exposed reusable credentials. If the client were compromised, the attacker could act as the user on any interface that accepted the same password."
  },
  {
    "kind": "paragraph",
    "text": "OAuth replaces this sharing with a grant of authority. The client requests authorization for a purpose; The authorization server authenticates the user when necessary, applies policies and issues an access token destined for the resource server. The client receives only the capability represented by the token, not the user's primary credential."
  },
  {
    "kind": "paragraph",
    "text": "The framework does not alone define how the user authenticates, how the API models object permissions or how the token must be formatted. It also does not transform an access token into proof of login for the client. OpenID Connect meets the need to communicate user authentication to the client, while the API remains responsible for fine-grained authorization and business rules."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "OAuth answers: “how does a client obtain and present limited authority for a resource?” It does not answer itself: “who is the user for the interface?”, “does the user own this object?” or “is this transaction allowed by the domain?”."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/figure-01-roles.svg",
    "alt": "OAuth roles and their communication and trust channels",
    "caption": "Figure 1 - Roles are logical responsibilities; a product can implement more than one role, but the boundaries must remain explicit."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.2 Roles and trust boundaries",
    "id": "16-2-roles-and-trust-boundaries"
  },
  {
    "kind": "paragraph",
    "text": "The resource owner is the entity capable of granting access to the resource. In many flows it is a person, but it can also be an organization or administrative policy. The client is the application that requests access. He does not automatically own the data and should not be given more authority than is necessary for his role."
  },
  {
    "kind": "paragraph",
    "text": "The authorization server authenticates the resource owner when applicable, evaluates the request, records consent or policy, and issues tokens. The resource server is the API that accepts access tokens and decides whether the operation is allowed. On an enterprise platform, the API Gateway can act as part of the resource server by validating the token and applying cross-cutting controls, while the backend retains domain decisions."
  },
  {
    "kind": "paragraph",
    "text": "Logical roles do not necessarily equate to separate processes. The same product can host authorization and resources, and a gateway can intermediate multiple APIs. Even so, issuer, audience, keys, endpoints and responsibilities must be distinct to prevent a token issued for one service from being improperly accepted by another."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Each role has its own controls and evidence.",
    "headers": [
      "Paper",
      "Main responsibility",
      "Common drawing error"
    ],
    "rows": [
      [
        "Resource owner",
        "grants authority over resources",
        "treat consent as unrestricted authorization."
      ],
      [
        "Client",
        "request and use tokens",
        "store secret in application unable to protect it."
      ],
      [
        "Authorization server",
        "issues tokens and publishes metadata",
        "issue wide audience and accept flexible redirect URI."
      ],
      [
        "Resource server",
        "validates token and authorizes operation",
        "accept JWT only because the signature is valid."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.3 Endpoints, metadata and channels",
    "id": "16-3-endpoints-metadata-and-channels"
  },
  {
    "kind": "paragraph",
    "text": "The authorization endpoint receives requests through the user agent and conducts interaction with the resource owner. The token endpoint is accessed directly by the client to exchange grants for tokens. This separation creates two channels: front-channel, exposed to browser, history, extensions and redirects; and back-channel, protected by TLS and used for direct requests between client and authorization server."
  },
  {
    "kind": "paragraph",
    "text": "Optional endpoints expand operation and interoperability. Introspection allows the resource server to query the state of a token. Revocation allows you to invalidate refresh tokens and, depending on the implementation, access tokens. PAR receives authorization parameters in advance via back-channel. Metadata describes issuer, endpoints, authentication methods, algorithms and supported capabilities."
  },
  {
    "kind": "paragraph",
    "text": "Endpoint URLs are security data. The client must not construct them by concatenation or accept metadata from an untrusted source. The returned issuer must match the configured issuer. TLS, hostname validation, and reliable DNS resolution remain essential because OAuth protects authority, not replaces channel security."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Endpoints have different exposures and controls.",
    "headers": [
      "Endpoint",
      "Typical channel",
      "Purpose"
    ],
    "rows": [
      [
        "Authorization",
        "front-channel",
        "user interaction and authorization code issuance."
      ],
      [
        "Token",
        "back-channel",
        "grant exchange and client authentication."
      ],
      [
        "Introspection",
        "back-channel",
        "activity query and token attributes."
      ],
      [
        "Revocation",
        "back-channel",
        "token invalidation as per policy."
      ],
      [
        "PAR",
        "back-channel",
        "protected registration of authorization parameters."
      ],
      [
        "Metadata",
        "source-authenticated read",
        "discovery of endpoints and capabilities."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.4 Registration, client types and redirect URIs",
    "id": "16-4-registration-client-types-and-redirect-uris"
  },
  {
    "kind": "paragraph",
    "text": "The registry associates client_id, redirect URIs, application type, contacts, keys, authentication methods and allowed grants. The client_id is a public identifier, not a secret. Security depends on the correct link between the identifier and registered properties, especially redirect URIs and cryptographic material."
  },
  {
    "kind": "paragraph",
    "text": "Sensitive clients can keep credentials under control, such as backend web applications or services. Public clients run in environments where the user or attacker can extract the software and its values, such as SPAs and native applications. Inserting client_secret into a JavaScript, mobile package, or distributed application does not make the confidential client; the secret becomes copiable."
  },
  {
    "kind": "paragraph",
    "text": "Redirect URI must be compared by exact match, except for very specific rules for native application loopback. Wildcards, prefix matching and open redirectors allow bypassing codes. Each environment must have its own URIs, and the application must validate the return route before starting any local session."
  },
  {
    "kind": "subhead",
    "text": "Public client secrecy"
  },
  {
    "kind": "paragraph",
    "text": "A value embedded in a SPA, mobile application, or distributed binary must be considered public. Adequate protection comes from PKCE, strict redirect URI, operating system, BFF when applicable, and token restriction - not from trying to hide a client_secret."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.5 Grants, flows and token types",
    "id": "16-5-grants-flows-and-token-types"
  },
  {
    "kind": "paragraph",
    "text": "Grant is the representation of an authorization used by the client to obtain an access token. Authorization Code, refresh token, client credentials and device code are examples. “Flow” describes the complete sequence of interactions. Confusing grant with token leads to inaccurate logs and policies: the authorization code is short, single-use and intended for the token endpoint; the access token is presented to the API."
  },
  {
    "kind": "paragraph",
    "text": "The access token represents authority for a resource server. The refresh token allows you to request new access tokens and must be restricted to the authorization server. The ID token belongs to OpenID Connect and communicates facts about authentication to the client; should not be used as an access token. Each artifact has a different recipient, useful life and protection."
  },
  {
    "kind": "paragraph",
    "text": "Old Implicit Grant and Resource Owner Password Credentials should not be chosen for new projects. The first exposes tokens on the front-channel and has lost its justification with PKCE; the second delivers user credentials to the client and prevents many modern controls. Migrations should prioritize Authorization Code with PKCE or appropriate machine-to-machine flows."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Artifacts are not interchangeable.",
    "headers": [
      "Artifact",
      "Recipient",
      "Operating property"
    ],
    "rows": [
      [
        "Authorization code",
        "token endpoint",
        "short, single-use, and client-bound/redirect URI/PKCE."
      ],
      [
        "Access token",
        "resource server",
        "temporary authority, audience and scope."
      ],
      [
        "Refresh token",
        "authorization server",
        "relative long-term credential; requires protection and rotation."
      ],
      [
        "ID token",
        "OIDC client",
        "assertion about authentication, not generic API credential."
      ],
      [
        "device_code",
        "token endpoint",
        "controlled polling for limited device."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/figure-02.svg",
    "alt": "Authorization Code with PKCE using front-channel and back-channel",
    "caption": "Figure 2 - PKCE links the exchange of the authorization code to a proof created by the customer."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.6 Authorization Code in depth",
    "id": "16-6-authorization-code-in-depth"
  },
  {
    "kind": "paragraph",
    "text": "The client creates an authorization request containing response_type=code, client_id, redirect_uri, scope, state and PKCE parameters. The browser is redirected to the authorization server, where the user can be authenticated and the policy evaluated. If successful, the authorization server returns an authorization code for the registered redirect URI."
  },
  {
    "kind": "paragraph",
    "text": "The client receives the code and exchanges it in the token endpoint. This direct request includes grant_type=authorization_code, code, redirect_uri, and code_verifier. Confidential clients also authenticate themselves. The server checks one-time usage, term, client, redirect URI and PKCE before issuing tokens."
  },
  {
    "kind": "paragraph",
    "text": "The code must not carry reusable authority or be sent to APIs. It exists to reduce token exposure in the front-channel and allow validations in the back-channel. Logs, analytics tools, error pages and referrers should not record the value. After the switch, the application must remove sensitive parameters from the URL and establish its own session state in a secure way."
  },
  {
    "kind": "subhead",
    "text": "Authorization request - illustrative values"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=payments-portal\n  &redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n  &scope=payments.read%20payments.write\n  &state=valor-aleatorio\n  &code_challenge=base64url-sha256-verifier\n  &code_challenge_method=S256"
  },
  {
    "kind": "subhead",
    "text": "Exchange of code for tokens"
  },
  {
    "kind": "code",
    "text": "POST /token\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code\n&code=AUTHORIZATION_CODE\n&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback\n&client_id=payments-portal\n&code_verifier=INSTANCE_RANDOM_SECRET"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.7 PKCE and interception protection",
    "id": "16-7-pkce-and-interception-protection"
  },
  {
    "kind": "paragraph",
    "text": "PKCE starts with a random, high-entropy, and trial-unique code_verifier. The client calculates code_challenge = BASE64URL(SHA256(code_verifier)) and sends the challenge to the authorization endpoint. When changing the code, it displays the original verifier. The authorization server recalculates the challenge and requires matching."
  },
  {
    "kind": "paragraph",
    "text": "If an attacker intercepts the authorization code, he will not be able to exchange it without the verifier. Method S256 must be used; plain exists for restricted compatibility and does not offer the same protection against observation as challenge. PKCE does not replace state, exact redirect URI, TLS, or confidential client authentication. It solves a specific threat: authorization code interception and injection."
  },
  {
    "kind": "paragraph",
    "text": "PKCE must also be required for confidential clients when using Authorization Code. In addition to standardizing the flow, it protects against attacks in which code obtained in another context is injected into the client session. The verifier must not be reused and must be associated with the same transaction that contains state and redirect URI."
  },
  {
    "kind": "table",
    "caption": "Table 4 - PKCE is a per-transaction proof, not a permanent credential.",
    "headers": [
      "Element",
      "Where does it appear",
      "Requirement"
    ],
    "rows": [
      [
        "code_verifier",
        "token request",
        "random, secret during the transaction and not reused."
      ],
      [
        "code_challenge",
        "authorization request",
        "derived from verifier by S256."
      ],
      [
        "code_challenge_method",
        "authorization request",
        "S256 for new systems."
      ],
      [
        "Bond",
        "client status",
        "same attempt, client_id, redirect URI and code."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.8 State, nonce, issuer and mix-up protection",
    "id": "16-8-state-nonce-issuer-and-mix-up-protection"
  },
  {
    "kind": "paragraph",
    "text": "State ties the authorization response to the session that initiated the request and helps prevent CSRF. It must be unpredictable, single-use and locally associated with the issuer, redirect URI, PKCE and user intent. Treating state only as a signed return URL may leave the session without adequate protection against unsolicited responses."
  },
  {
    "kind": "paragraph",
    "text": "Nonce belongs to OpenID Connect and links the ID token to the authentication request. It does not replace state in securing the OAuth flow. On clients using OIDC, both may be required: state protects the redirect and nonce is validated within the ID token."
  },
  {
    "kind": "paragraph",
    "text": "Authorization server mix-up attacks exploit clients that talk to multiple issuers and do not link the response to the correct issuer. The client must use trusted metadata, validate the iss parameter when supported, and send the code only to the issuer token endpoint associated with the transaction. Never select the token endpoint based on unvalidated response data."
  },
  {
    "kind": "subhead",
    "text": "Minimum transactional state"
  },
  {
    "kind": "paragraph",
    "text": "Store, tentatively: expected issuer, client_id, redirect URI, state, code_verifier, nonce when there is OIDC, requested scopes and time. Consume the record once and expire quickly."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.9 Confidential client authentication",
    "id": "16-9-confidential-client-authentication"
  },
  {
    "kind": "paragraph",
    "text": "The token endpoint needs to distinguish the client presenting the grant. client_secret_basic is simple, but relies on symmetric secret and secure transport. client_secret_post puts the secret in the body and increases log risk; should be avoided when the Basic method is supported. Secrets need vault storage, rotation, ownership, and scope per environment."
  },
  {
    "kind": "paragraph",
    "text": "private_key_jwt uses a JWT assertion signed by the client's private key. The authorization server validates issuer/subject, audience, expiration, unique identifier and signature. The private key is not sent, and rotation can be managed by JWKS. The mechanism requires jti replay prevention and strict audience validation of the token endpoint."
  },
  {
    "kind": "paragraph",
    "text": "mTLS client authentication links authentication to the certificate presented in the TLS connection. Can use traditional PKI or registered certificate. In environments with proxies, it must be clear where TLS ends and how the identity of the certificate is preserved. Strong client authentication does not eliminate the need for PKCE in the Authorization Code."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The method must correspond to the customer's actual capacity.",
    "headers": [
      "Method",
      "Material",
      "Advantage",
      "Caution"
    ],
    "rows": [
      [
        "client_secret_basic",
        "symmetric secret",
        "broad support",
        "rotation, logs and sharing."
      ],
      [
        "private_key_jwt",
        "private key",
        "does not send secrets; good automation",
        "jti, audience and JWKS rotation."
      ],
      [
        "mTLS client authentication",
        "certificate and key",
        "strong connection to the channel",
        "TLS termination and certificate cycling."
      ],
      [
        "none",
        "no authentication",
        "suitable for public customers",
        "require PKCE and secure redirect URI."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.10 Web applications, SPAs, native apps, and BFF",
    "id": "16-10-web-applications-spas-native-apps-and-bff"
  },
  {
    "kind": "paragraph",
    "text": "Traditional web applications maintain code and credentials on the server. The browser only receives a protected session cookie, while the backend runs Authorization Code, stores tokens and calls APIs. This separation reduces exposure of tokens to JavaScript, but requires protection against CSRF, fixation, XSS and session theft."
  },
  {
    "kind": "paragraph",
    "text": "SPAs are public clients. Authorization Code with PKCE is the modern flow, but access tokens stored in the browser are still exposed to XSS and extensions. A Backend for Frontend can receive the code, maintain tokens on the server and expose only HttpOnly, Secure and SameSite cookies to the browser. BFF adds state and infrastructure but reduces the token footprint."
  },
  {
    "kind": "paragraph",
    "text": "Native applications use external browsers and redirect URIs based on app links, universal links, custom schemes or loopback. Embedded webviews degrade security and SSO experience. The system must prevent another application from capturing the redirect URI and always combine the return mechanism with PKCE."
  },
  {
    "kind": "table",
    "caption": "Table 6 - The architecture changes where the token is exposed.",
    "headers": [
      "Type",
      "Classification",
      "Preferred Storage",
      "Flow"
    ],
    "rows": [
      [
        "Web with backend",
        "confidential",
        "tokens on the server; browser session cookie",
        "Authorization Code + PKCE."
      ],
      [
        "pure SPA",
        "public",
        "memory when possible; minimize persistence",
        "Authorization Code + PKCE."
      ],
      [
        "SPA with BFF",
        "Confidential BFF",
        "tokens on BFF; protected cookie",
        "Authorization Code + PKCE."
      ],
      [
        "Native App",
        "public",
        "secure system storage",
        "Authorization Code + PKCE and external browser."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.11 Client Credentials",
    "id": "16-11-client-credentials"
  },
  {
    "kind": "paragraph",
    "text": "Client Credentials are used when the client acts on its own behalf, without a human resource owner in the transaction. The client authenticates to the token endpoint and receives an access token associated with the application identity. It is suitable for services, jobs and automations that have their own permissions."
  },
  {
    "kind": "paragraph",
    "text": "Grant should not be used to simulate users or transport arbitrary user_id. Authorization must be based on the application principal, its tenant, owner, and application permissions. If one service needs to preserve user context when calling another, on-behalf-of or token exchange is more suitable."
  },
  {
    "kind": "paragraph",
    "text": "Because the token can open broad access, static credentials should be replaced with private_key_jwt, mTLS, managed identity, or workload federation when possible. Application scopes need to be separated from delegated scopes to prevent an app-only token from being confused with user authority."
  },
  {
    "kind": "subhead",
    "text": "Client Credentials - conceptual example"
  },
  {
    "kind": "code",
    "text": "POST /token\nAuthorization: Basic base64(client_id:client_secret)\nContent-Type: application/x-www-form-urlencoded\ngrant_type=client_credentials\n&scope=settlements.process"
  },
  {
    "kind": "subhead",
    "text": "Review question"
  },
  {
    "kind": "paragraph",
    "text": "If the operation needs to know “which user authorized?”, Client Credentials alone do not provide that answer. The main thing is the application."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.12 Device Authorization Grant",
    "id": "16-12-device-authorization-grant"
  },
  {
    "kind": "paragraph",
    "text": "The Device Authorization Grant supports devices with limited input or without a convenient browser. The client requests device_code and user_code, presents the user with a verification_uri, and starts polling the token endpoint. The user completes authentication and authorization on another browser-capable device."
  },
  {
    "kind": "paragraph",
    "text": "The client must respect interval, expires_in and errors such as authorization_pending and slow_down. Aggressive polling creates load and can cause blocking. The user_code needs to be short enough to type, but protected by rate limiting, expiration, and binding to high-entropy device_code."
  },
  {
    "kind": "paragraph",
    "text": "The flow should not be used as a shortcut for applications that already have a suitable browser. The interface must clearly show which device and operation is being authorized, reducing phishing attacks in which a code sent by a third party is entered by the victim."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The flow separates the requesting device from the authentication channel.",
    "headers": [
      "Step",
      "Artifact",
      "Control"
    ],
    "rows": [
      [
        "Home",
        "device_code + user_code",
        "secret device_code; short and expirable user_code."
      ],
      [
        "Interaction",
        "verification_uri",
        "display customer context and prevent phishing."
      ],
      [
        "Polling",
        "device_code",
        "respect interval and slow_down."
      ],
      [
        "Conclusion",
        "access/refresh token",
        "bind to customer and approved policy."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/figure-03.svg",
    "alt": "Lifecycle of grants, access tokens and refresh tokens",
    "caption": "Figure 3 - Tokens have different life cycles and revocation decisions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.13 Refresh tokens, rotation and reuse",
    "id": "16-13-refresh-tokens-rotation-and-reuse"
  },
  {
    "kind": "paragraph",
    "text": "Refresh token is a high-value credential because it allows you to obtain new access tokens without repeating the entire interaction. It should only be sent to the token endpoint, protected in suitable storage and limited to the client and the original authorization. Short access tokens reduce exposure; refresh tokens maintain controlled continuity."
  },
  {
    "kind": "paragraph",
    "text": "For public customers, BCP recommends sender-constrained or rotated refresh tokens. In rotation, each use produces a new refresh token and invalidates the previous one. If an old token reappears, the server detects possible theft and revokes the corresponding family or authorization. The implementation needs to handle concurrency and missed responses without creating false positives."
  },
  {
    "kind": "paragraph",
    "text": "Absolute expiration, expiration due to inactivity, revocation due to logout, password change, withdrawal of consent and risk must be defined. “Refresh token never expires” transfers all control to perfect revocation, something difficult in distributed systems. The client should treat invalid_grant as a need for reauthorization, not as a reason to repeat indefinitely."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Refresh token needs its own policy.",
    "headers": [
      "Control",
      "Objective",
      "Operational decision"
    ],
    "rows": [
      [
        "Rotation",
        "detect reuse",
        "revoke family and log incident when old token reappears."
      ],
      [
        "Sender constraint",
        "bind to a key",
        "validate mTLS/DPoP on each renewal."
      ],
      [
        "Absolute expiration",
        "limit total duration",
        "require new authorization after a defined period."
      ],
      [
        "Inactivity",
        "close abandoned authorizations",
        "renew only while there is legitimate use."
      ],
      [
        "Revocation",
        "respond to risk and shutdown",
        "propagate quickly and audit motif."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.14 Access tokens, scopes, audience and resource indicators",
    "id": "16-14-access-tokens-scopes-audience-and-resource-indicators"
  },
  {
    "kind": "paragraph",
    "text": "Access token must only be accepted by the resource server for which it was issued. Wide audience turns a token into a reusable pass between APIs. Resource Indicators allow the client to declare the intended resource during authorization or token request, helping the authorization server to issue specific tokens."
  },
  {
    "kind": "paragraph",
    "text": "Scope represents authority requested and granted, but its semantics must be documented. Scopes like read and write are simple, but can be ambiguous on large platforms. Domain, operation and resource names help: payments.read, payments.create and conciliacao.execute. Scope does not replace object, tenant, or domain state authorization."
  },
  {
    "kind": "paragraph",
    "text": "The resource server validates the audience, scope and context of the request. An API should not accept a token because it contains “admin” without checking the issuer, type and origin of the claim. Authorization claims need to have governance: who issues them, when they change, how they are revoked, and which service has the authority to interpret them."
  },
  {
    "kind": "subhead",
    "text": "Resource Indicator - conceptual example"
  },
  {
    "kind": "code",
    "text": "GET /authorize?response_type=code\n  &client_id=app\n  &resource=https%3A%2F%2Fapi.payments.example\n  &scope=payments.read"
  },
  {
    "kind": "table",
    "caption": "Table 9 - Technical validation and business authorization are complementary.",
    "headers": [
      "Element",
      "Validation question"
    ],
    "rows": [
      [
        "audience",
        "was this token issued for this API or gateway?"
      ],
      [
        "scope",
        "Does the authority granted include the operation?"
      ],
      [
        "subject/client",
        "Who is the principal and which application operates?"
      ],
      [
        "tenant",
        "do principal and resource belong to the permitted context?"
      ],
      [
        "token type",
        "is the artifact an expected access token, not ID token or another JWT?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.15 Opaque tokens, introspection and revocation",
    "id": "16-15-opaque-tokens-introspection-and-revocation"
  },
  {
    "kind": "paragraph",
    "text": "Opaque token does not reveal structure to the client or resource server. The API queries the authorization server by introspection or uses distributed local state. This approach facilitates immediate revocation and minimizes claim exposure, but creates dependencies on availability, latency, API authentication and caching policy."
  },
  {
    "kind": "paragraph",
    "text": "Introspection returns active and authorized attributes for the requester. active=false should be normal response for invalid, expired, revoked or unknown token, without revealing details. The endpoint needs to authenticate resource servers and limit what data each one can query. Cache reduces load, but increases the window between revocation and enforcement."
  },
  {
    "kind": "paragraph",
    "text": "Revocation allows the client to request invalidation. The successful response should not reveal whether the token existed. Revoking refresh token normally terminates the ability to renew; Access tokens already issued can continue until they expire if they are self-contained. High-risk architectures combine short TTL, introspection, revocation or denylist events."
  },
  {
    "kind": "subhead",
    "text": "Introspection - simplified example"
  },
  {
    "kind": "code",
    "text": "POST /introspect\nAuthorization: Basic <resource-server-credential>\nContent-Type: application/x-www-form-urlencoded\ntoken=OPAQUE_TOKEN\nHTTP/1.1 200 OK\n{\n  \"active\": true,\n  \"client_id\": \"portal\",\n  \"scope\": \"payments.read\",\n  \"exp\": 1770000000\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.16 JWT access tokens and validation",
    "id": "16-16-jwt-access-tokens-and-validation"
  },
  {
    "kind": "paragraph",
    "text": "JWT allows the resource server to locally validate signatures and claims, reducing calls to the authorization server. The JWT access token profile standardizes claims and useful types, but the API still needs to know issuer, audience, algorithms and trusted keys. Decoding Base64URL is not validating."
  },
  {
    "kind": "paragraph",
    "text": "Validation must fix allowed algorithms, locate the key by the kid in trusted JWKS, check signature, issuer, audience, expiration, not-before when present and expected type. The resource server must reject tokens issued for other use, even if the same key signs ID tokens. typ and profile rules help prevent confusion between JWT types."
  },
  {
    "kind": "paragraph",
    "text": "Key rotation requires caching and controlled updating. When unknown kid appears, the gateway can update JWKS, but must not allow the token to point to an arbitrary key URL. Temporary metadata failure should not immediately invalidate all still trusted keys; at the same time, excessive caches delay compromised key removal."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Valid signature is just one of the checks.",
    "headers": [
      "Validation",
      "Failure to avoid"
    ],
    "rows": [
      [
        "signature and fixed algorithm",
        "altered token or algorithm confusion."
      ],
      [
        "exact issuer",
        "untrusted domain token."
      ],
      [
        "audience",
        "reuse in another API."
      ],
      [
        "exp/nbf/clock",
        "use outside the permitted window."
      ],
      [
        "type/profile",
        "confusion between access token, ID token and other JWTs."
      ],
      [
        "scopes and claims",
        "operation beyond the authority granted."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Unencrypted content"
  },
  {
    "kind": "paragraph",
    "text": "A signed JWT typically protects integrity, not confidentiality. Avoid unnecessary PII and data. The token passes through clients, proxies, gateways, tools and logs; treat it as sensitive credential."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.17 Consent, least privilege and Rich Authorization Requests",
    "id": "16-17-consent-least-privilege-and-rich-authorization-requests"
  },
  {
    "kind": "paragraph",
    "text": "Consent is a decision interface, not a substitute for policy. In corporate environments, some permissions are approved by administrators or contracts, while others depend on the user. The screen must identify customer, data, actions, duration and consequences, avoiding incomprehensible technical scopes."
  },
  {
    "kind": "paragraph",
    "text": "Least privilege starts with the definition of scopes and continues on the resource server. Requesting all scopes “to avoid new consent” increases the impact of leaks. Incremental authorization allows you to request additional authority only when the functionality is used. The authorization server can grant subset and the client needs to verify the response."
  },
  {
    "kind": "paragraph",
    "text": "Rich Authorization Requests represent structured details such as amount, currency, account, and transaction type. This allows for more precise authorizations than scope strings, especially on payments and financial data. The authorization object must be validated, signed or protected according to the adopted profile and must not be accepted as free data sent by the client to the API."
  },
  {
    "kind": "subhead",
    "text": "Rich Authorization Request - teaching example"
  },
  {
    "kind": "code",
    "text": "{\n  \"authorization_details\": [{\n    \"type\": \"payment_initiation\",\n    \"instructedAmount\": {\"currency\": \"BRL\", \"amount\": \"150.00\"},\n    \"creditorAccount\": {\"iban\": \"EXAMPLE\"}\n  }]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.18 PAR, JAR and JARM",
    "id": "16-18-par-jar-and-jarm"
  },
  {
    "kind": "paragraph",
    "text": "Pushed Authorization Requests allow the client to send parameters to the authorization server via back-channel and receive short-lived request_uri. The browser only carries the reference. This reduces manipulation, exposure, and URL length, and allows for client authentication prior to user interaction."
  },
  {
    "kind": "paragraph",
    "text": "JWT-Secured Authorization Request represents the request in a signed and, optionally, encrypted JWT. The authorization server validates the integrity and origin of the parameters. PAR and JAR can be combined: the client sends a signed request object to the PAR endpoint and uses the request_uri in the authorization endpoint."
  },
  {
    "kind": "paragraph",
    "text": "JARM secures the authorization response in a signed or encrypted JWT. Instead of relying solely on loose parameters in the redirect, the client validates issuer, audience, signature and time. These mechanisms increase complexity and key management, which is why they are more common in financial profiles, regulated ecosystems and high-risk integrations."
  },
  {
    "kind": "table",
    "caption": "Table 11 - Mechanisms protect different stages of the front-channel.",
    "headers": [
      "Mechanism",
      "Protects",
      "Benefit"
    ],
    "rows": [
      [
        "PAR",
        "sending parameters",
        "authenticated back-channel and shortened URL."
      ],
      [
        "JAR",
        "request content",
        "integrity, origin and possible confidentiality."
      ],
      [
        "JARM",
        "authorization response",
        "verifiable signature, issuer and audience."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/figure-04.svg",
    "alt": "Comparison between bearer token and sender-constrained token",
    "caption": "Figure 4 - Proof-of-possession reduces the utility of a copied token."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.19 Sender-constrained tokens with mTLS and DPoP",
    "id": "16-19-sender-constrained-tokens-with-mtls-and-dpop"
  },
  {
    "kind": "paragraph",
    "text": "Bearer token works like bearer money: whoever obtains the value can present it. Sender-constrained token binds the access token to a client key. The resource server requires, in addition to the token, corresponding proof of ownership. The goal is to reduce replay after leaks in logs, proxies, memory or side channels."
  },
  {
    "kind": "paragraph",
    "text": "With mTLS, the authorization server associates the token with the client's certificate and the resource server verifies the certificate presented in the connection. The claim cnf can load thumbprint. The architecture needs to ensure that the API observes the correct TLS identity even when there are load balancers or gateways terminating connections."
  },
  {
    "kind": "paragraph",
    "text": "DPoP uses a proof JWT signed by the client in each request, containing HTTP method, URI, time, unique identifier and link to the access token. The API validates signature, htm, htu, iat, jti, key and ath. DPoP is application layer protection and does not replace TLS. Server nonce and jti cache can strengthen replay defense according to risk."
  },
  {
    "kind": "table",
    "caption": "Table 12 - The choice depends on client, infrastructure and risk.",
    "headers": [
      "Mechanism",
      "Bond",
      "Strong point",
      "Challenge"
    ],
    "rows": [
      [
        "mTLS",
        "certificate on connection",
        "strong for controlled customers and services",
        "proxies, PKI and TLS termination."
      ],
      [
        "DPoP",
        "key and proof upon request",
        "applicable without client certificate",
        "URI, clock, jti and key validation."
      ],
      [
        "Bearer",
        "none",
        "simplicity and compatibility",
        "replay after token copy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.20 Token Exchange and on-behalf-of",
    "id": "16-20-token-exchange-and-on-behalf-of"
  },
  {
    "kind": "paragraph",
    "text": "In service architectures, the first backend may need to call another while retaining some of the original authority. Forwarding the same access token to all services broadens audiences and exposes the credential. Token Exchange allows you to exchange a subject token for another token appropriate to the next resource."
  },
  {
    "kind": "paragraph",
    "text": "The new token can represent the user, the actor service, or both. Actor claims help record the chain. The policy should limit which clients can exchange tokens, which audiences can be solicited, and which scopes can be preserved. The exchange must not elevate privilege beyond the entry token and the actor's authority."
  },
  {
    "kind": "paragraph",
    "text": "On-behalf-of is an implementation of delegation where a service acts on behalf of the user. Logs need to preserve user, initial client, intermediate service and effective authorization. If a call passes through several trust domains, each issue must be treated as a new decision, not as a simple copy of headers."
  },
  {
    "kind": "table",
    "caption": "Table 13 - Preserve context without indiscriminately reusing authority.",
    "headers": [
      "Strategy",
      "Advantage",
      "Risk"
    ],
    "rows": [
      [
        "Forward original token",
        "simple",
        "wide audience, leakage and coupling."
      ],
      [
        "Token Exchange",
        "specific token per hop",
        "policy complexity and correlation."
      ],
      [
        "Service credential only",
        "separates backend",
        "loses user context when it is needed."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.21 Metadata of the authorization server and protected resource",
    "id": "16-21-metadata-of-the-authorization-server-and-protected-resource"
  },
  {
    "kind": "paragraph",
    "text": "Authorization Server Metadata publishes issuer, endpoints, authentication methods, grants, scopes and algorithms. Clients must obtain the source document configured and validate consistency between issuer and URL. Metadata simplifies rotation and interoperability, but it should not turn discovery into automatic trust."
  },
  {
    "kind": "paragraph",
    "text": "Protected Resource Metadata allows an API to publish resource identifiers, related authorization servers, scopes, and supported presentation methods. This helps clients and authorization servers understand how to obtain tokens for a resource and improves WWW-Authenticate challenges."
  },
  {
    "kind": "paragraph",
    "text": "Metadata must be versioned and monitored as part of the platform. Changes to endpoint, algorithm or issuer can break all clients. Cache needs to respect availability without freezing configuration indefinitely. Internal, external and approval environments must have separate documents to prevent mixing of trust."
  },
  {
    "kind": "subhead",
    "text": "Authorization Server Metadata - illustrative excerpt"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"code_challenge_methods_supported\": [\"S256\"]\n}"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/oauth-2-flows-tokens-security/en/figure-05.svg",
    "alt": "OAuth in enterprise architecture with API Gateway and backend",
    "caption": "Figure 5 - The gateway acts as transversal enforcement; domain authorization remains in the backend."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.22 OAuth on API Gateways, Axway and Azure",
    "id": "16-22-oauth-on-api-gateways-axway-and-azure"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways can validate access tokens, query introspection, require scopes, enforce quota by client_id, and propagate trusted context. Before inserting internal headers, the gateway must remove client-supplied versions. The backend must accept these headers only from an authenticated connection coming from the gateway."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, validate-jwt and validate-azure-ad-token can validate tokens before the backend. Policies can require issuer, audience and claims, while authentication-managed-identity allows the gateway to obtain token for a compatible backend. Configuring the developer portal for OAuth facilitates testing, but does not replace policy enforcement."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, OAuth filters and services can implement authorization server, token validation, client authentication, and resource server policies. The topology needs to record which component issues, which validates, where keys are stored and how revocation and rotation are handled. As versions and licenses change, validate the installed product documentation."
  },
  {
    "kind": "subhead",
    "text": "Azure API Management - conceptual policy"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-expiration-time=\"true\"\n              require-signed-tokens=\"true\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences><audience>api://payments</audience></audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\"><value>payments.read</value></claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Division of responsibility"
  },
  {
    "kind": "paragraph",
    "text": "The gateway validates issuer, audience, signature, time, scopes and transversal requirements. The backend continues checking tenant, ownership, transaction status, business limits and object authorization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.23 Threats and hardening",
    "id": "16-23-threats-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Authorization Code interception is reduced by PKCE. CSRF and CSRF login require state and transactional binding. Mix-up requires association with the issuer. Redirect URI manipulation requires exact comparison. Token leakage requires TLS, log hygiene, correct headers, secure storage and TTL reduction. Token replay may require sender constraint."
  },
  {
    "kind": "paragraph",
    "text": "Open redirectors on the client or authorization server increase code bypass. Referrer, history and analytics can capture front-channel parameters. Query string tokens leak easily and should not be used as a normal form of presentation. Access tokens must follow Authorization header and responses need proper Cache-Control."
  },
  {
    "kind": "paragraph",
    "text": "Authorization servers must protect endpoints against brute force, credential stuffing, request flooding and user_code abuse. Clients need to validate all responses and not display internal details. Resource servers must limit algorithms, validate audiences and not trust claims without namespace and governance. Every implementation requires an inventory of clients, owners, grants, redirect URIs and keys."
  },
  {
    "kind": "table",
    "caption": "Table 14 - Controls must produce observable evidence.",
    "headers": [
      "Threat",
      "Main control",
      "Evidence"
    ],
    "rows": [
      [
        "Code interception",
        "PKCE S256 and single-use code",
        "verifier failures and reuse."
      ],
      [
        "CSRF/login injection",
        "session-bound state",
        "state absent, divergent or consumed."
      ],
      [
        "AS mix-up",
        "linked issuer and metadata",
        "response issuer and token endpoint used."
      ],
      [
        "Token replay",
        "TTL, mTLS/DPoP and detection",
        "jti, thumbprint and origin."
      ],
      [
        "Refresh token theft",
        "rotation and reuse detection",
        "revoked family and risk event."
      ],
      [
        "Redirect abuse",
        "exact comparison and without open redirect",
        "Registered URI and received URI."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Inadvisable practices"
  },
  {
    "kind": "paragraph",
    "text": "Do not use Implicit Grant or Resource Owner Password Credentials in new projects. Do not store client_secret in public client. Do not accept redirect URI by prefix. Do not treat ID token as access token. Don't accept JWT just because it “decoded without error”."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.24 Evidence-driven troubleshooting",
    "id": "16-24-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Diagnosis begins by identifying the endpoint and step. Error in authorization endpoint involves parameters, session, policy and redirect URI. Token endpoint error involves client authentication, code, verifier, grant and clock. API error involves presentation, validation and authorization. Mixing these steps turns invalid_grant into “Invalid JWT” or 403 into “login failure”."
  },
  {
    "kind": "paragraph",
    "text": "Collect correlation ID, expected issuer, client_id, grant_type, normalized redirect URI, scopes, audience, kid, time and status without registering tokens or codes. Compare the clock of the components. Confirm metadata and JWKS accessed by the runtime, not just the operator's notebook. In proxy environments, record hostname, TLS, and actual destination."
  },
  {
    "kind": "paragraph",
    "text": "For intermittency, investigate key rotation, multiple nodes with divergent caching, concurrent authorization code or refresh token reuse, load balancing without session affinity, and DNS. Reproduce with a single controlled flow and synthetic tokens. A token may work on one gateway and fail on another due to different configuration or cache."
  },
  {
    "kind": "table",
    "caption": "Table 15 - Classify the step before changing policies.",
    "headers": [
      "Error",
      "Initial hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "invalid_request",
        "missing, duplicate or incompatible parameter",
        "normalized request and metadata."
      ],
      [
        "invalid_client",
        "method, secret, certificate or assertion",
        "client_id, auth method, jti and certificate thumbprint."
      ],
      [
        "invalid_grant",
        "expired/used code, PKCE, redirect URI or refresh revoked",
        "transaction status and usage history."
      ],
      [
        "invalid_token",
        "signature, issuer, audience, time or revocation",
        "internal reason code and kid."
      ],
      [
        "insufficient_scope",
        "valid token no authority required",
        "scope granted and operation policy."
      ],
      [
        "401/403 divergent",
        "different layers responded",
        "Via, Server, request-id and correlated logs."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Stable external error; Detailed cause remains in the secure log"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm=\"payments\",\n  error=\"invalid_token\"\nContent-Type: application/problem+json\n{\n  \"type\": \"https://errors.example/oauth/invalid-token\",\n  \"status\": 401,\n  \"correlationId\": \"corr-8f12\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16.25 Case studies",
    "id": "16-25-case-studies"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - SPA with built-in secret"
  },
  {
    "kind": "paragraph",
    "text": "A SPA sends client_secret in the token request. The value is visible in the bundle and can be copied by any user. The fix is to register the client as public, use Authorization Code with PKCE and exact redirect URI. If the risk of tokens in the browser is high, adopt BFF and cookie protected."
  },
  {
    "kind": "paragraph",
    "text": "The investigation also checks CORS, token storage, XSS, logout, and renewal. Just removing the secret does not resolve exposure of refresh token or access token persisted in localStorage."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Token accepted by wrong API"
  },
  {
    "kind": "paragraph",
    "text": "Two APIs trust the same issuer and key, but one of them does not validate audience. A token issued for reporting is accepted for payments. The fix is to require specific audience and separate scopes. In critical systems, resource indicators and resource tokens reduce the possibility of cross-reuse."
  },
  {
    "kind": "paragraph",
    "text": "Security contract tests must send valid tokens to neighboring audiences and expect rejection. This negative check needs to exist on gateway and backend when both validate tokens."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Refresh token reused after timeout"
  },
  {
    "kind": "paragraph",
    "text": "The client uses a refresh token, receives timeout and repeats the call. The first processing had issued a new token; repetition looks like theft and the family is revoked. The solution combines operational idempotence, controlled tolerance window or client logic that serializes renewal and handles lost responses."
  },
  {
    "kind": "paragraph",
    "text": "A wide tolerance weakens reuse detection. The decision must consider risk, network and ability to correlate attempts. Logs need to record family, predecessor token, client and result without storing the raw value."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 - Gateway validates, backend rejects"
  },
  {
    "kind": "paragraph",
    "text": "The gateway accepts the token for its own audience and forwards it to the backend, which expects the token intended for it. The architecture needs to choose: backend trusts the context propagated by the gateway in an authenticated channel, or gateway obtains a new token for the backend using managed identity, client credentials or token exchange."
  },
  {
    "kind": "paragraph",
    "text": "Forwarding the original token is only correct when the backend is the resource server for that audience. The decision must be documented in the security contract and tested with multiple APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observation labs",
    "id": "observation-labs"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 1 - Authorization Code with PKCE"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use a laboratory authorization server or authorized simulator.",
      "Generate random verifier and S256 challenge.",
      "Run the correct flow and record only synthetic values.",
      "Repeat with wrong verifier, divergent state, reused code and changed redirect URI.",
      "Classify each error by step and endpoint."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - audience and scope validation"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure two APIs with different audiences.",
      "Issue token for API A and try to use it on API B.",
      "Test scope missing, expired and alternative issuer.",
      "Compare external response and internal reason code."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - introspection and cache"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use opaque lab and introspection token endpoints.",
      "Measure no-cache and short-cache latency.",
      "Revoke the token and watch the window until rejection.",
      "Document the decision between availability and speed of revocation."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 4 - refresh token rotation"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Obtain a synthetic refresh token.",
      "Renew and confirm issuance of successor.",
      "Reuse the predecessor and observe family policy.",
      "Simulate two competing renewals and analyze the result."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 5 - policy at the gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Configure issuer, audience and scope in lab gateway.",
      "Unknown kid test and JWKS update.",
      "Remove client-sent identity headers.",
      "Only propagate validated claims and compare with backend authorization."
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
    "text": "OAuth 2.0 is a delegation framework. Resource owner, client, authorization server and resource server have different responsibilities. Authorization endpoint and token endpoint use different channels, and each artifact - code, access token, refresh token and ID token - has its own recipient and lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "Authorization Code with PKCE is the modern basis for user-based applications. PKCE protects against interception, state links the transaction, nonce belongs to the OIDC and issuer protects multi-issuer clients. Public clients do not have reliable secrets; confidential clients can use secret, private_key_jwt or mTLS."
  },
  {
    "kind": "paragraph",
    "text": "Client Credentials represent the application, Device Authorization meets limited input and refresh tokens require rotation or sender constraints. Access tokens need a minimum audience and scope. Opaque tokens favor central control; JWTs favor local validation, but require full verification and key management."
  },
  {
    "kind": "paragraph",
    "text": "PAR, JAR, JARM and RAR strengthen requests and responses; mTLS and DPoP reduce replay; Token Exchange controls delegation between services. API Gateways apply cross-cutting validation, while backends preserve domain authorization. Security depends on inventory, least privilege, exact redirect URI, log hygiene, observability, and negative testing."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 17 will delve deeper into OpenID Connect: ID Token, UserInfo, nonce, acr, amr, federated authentication, sessions, logout, and secure application integration with identity providers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "OAuth 2.0 Checklist",
    "id": "oauth-2-0-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Each client has explicitly registered owner, type, redirect URIs and grants.",
      "Authorization Code uses PKCE S256, including for confidential clients.",
      "State is random, single-use and linked to issuer, redirect URI and verifier.",
      "Public clients do not depend on client_secret.",
      "Redirect URIs use exact matching and do not contain open redirectors.",
      "Implicit and password grants are not used on new projects.",
      "Access tokens have minimal audience and scopes.",
      "ID token is not accepted as an access token.",
      "Refresh tokens have rotation, sender constraint or equivalent policy.",
      "JWTs validate signature, algorithm, issuer, audience, type and time.",
      "Introspection is authenticated and has revocation-aware caching.",
      "Tokens do not appear in URLs, logs, analytics or error messages.",
      "mTLS or DPoP is considered for high replay risk.",
      "Gateway and backend have explicit authorization division.",
      "Rotation of JWKS, certificates and client credentials is tested.",
      "OAuth errors are correlatable without revealing sensitive details.",
      "Customers, grants, consents and tokens have a termination process."
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
      "Explain why OAuth 2.0 is not, on its own, a user authentication protocol.",
      "Differentiate authorization code, access token, refresh token and ID token.",
      "Describe Authorization Code checks with PKCE.",
      "Explain why state and PKCE are not substitutes for each other.",
      "Rate a SPA and justify why its client_secret is not trustworthy.",
      "Compare client_secret_basic, private_key_jwt and mTLS.",
      "Model Client Credentials for a userless job.",
      "Explain reuse detection in refresh token rotation.",
      "Compare opaque token with JWT on revocation and availability.",
      "List mandatory validations of a JWT access token.",
      "Explain audience and resource indicators on a platform with multiple APIs.",
      "Compare PAR, JAR and JARM.",
      "Differentiate between mTLS-bound token and DPoP-bound token.",
      "Propose Token Exchange for three services while preserving the user.",
      "Create a troubleshooting script for intermittent invalid_grant."
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
    "caption": "Table 16 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Access token",
        "Credential presented to the resource server to exercise authority."
      ],
      [
        "Authorization code",
        "Short, single-use grant exchanged on the token endpoint."
      ],
      [
        "Authorization server",
        "Component that evaluates authorization and issues tokens."
      ],
      [
        "Bearer token",
        "Token usable by any holder of the value."
      ],
      [
        "Client",
        "Application that requests and uses authority."
      ],
      [
        "Client Credentials",
        "Grant in which the application acts on its own behalf."
      ],
      [
        "Confidential client",
        "Client capable of protecting authentication credentials."
      ],
      [
        "device_code",
        "Artifact used in Device Authorization Grant polling."
      ],
      [
        "DPoP",
        "Proof by request that links token to a key."
      ],
      [
        "Grant",
        "Authorization representation used to obtain token."
      ],
      [
        "Introspection",
        "Authenticated query on activity and token attributes."
      ],
      [
        "JAR",
        "Protected authorization request in JWT."
      ],
      [
        "JARM",
        "Protected authorization response in JWT."
      ],
      [
        "JWT access token",
        "Access token structured and signed according to profile."
      ],
      [
        "PAR",
        "Sending parameters in advance via back-channel."
      ],
      [
        "PKCE",
        "Proof that links the code exchange to the client instance."
      ],
      [
        "Public client",
        "Client unable to reliably maintain secrecy."
      ],
      [
        "Refresh token",
        "Credential used to obtain new access tokens."
      ],
      [
        "Resource owner",
        "Entity capable of granting access to the resource."
      ],
      [
        "Resource server",
        "API that accepts access tokens and protects resources."
      ],
      [
        "Scope",
        "Textual representation of authority requested or granted."
      ],
      [
        "Sender-constrained token",
        "Token tied to proof of a customer key."
      ],
      [
        "State",
        "Value that links request and response and helps against CSRF."
      ],
      [
        "Token Exchange",
        "Grant to exchange a token for another suitable for a new context."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Flow choice matrix",
    "id": "annex-a-flow-choice-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 17 - The final choice depends on platform, risk and customer capacity.",
    "headers": [
      "Scenario",
      "Initial flow",
      "Essential controls"
    ],
    "rows": [
      [
        "Web application with user",
        "Authorization Code + PKCE",
        "confidential client, state, cookie protected and exact redirect URI."
      ],
      [
        "pure SPA",
        "Authorization Code + PKCE",
        "public client, XSS hardening, short token and no secret."
      ],
      [
        "Higher risk spa",
        "BFF + Authorization Code + PKCE",
        "server-side tokens, CSRF and HttpOnly/SameSite cookie."
      ],
      [
        "Native App",
        "Authorization Code + PKCE",
        "external browser, app/universal link and system storage."
      ],
      [
        "Service to service",
        "Client Credentials",
        "private_key_jwt, mTLS or workload identity; minimum audience."
      ],
      [
        "Limited device",
        "Device Authorization Grant",
        "Expirable user_code, controlled polling and anti-phishing."
      ],
      [
        "Service chain",
        "Token Exchange / on-behalf-of",
        "audience per hop, actor and correlation."
      ],
      [
        "Regulated ecosystem",
        "Code + PKCE + PAR/JAR/JARM",
        "RAR, sender constraint, signature and reinforced auditing."
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
      "IETF. RFC 6749 - The OAuth 2.0 Authorization Framework. 2012.",
      "IETF. RFC 6750 - OAuth 2.0 Bearer Token Usage. 2012.",
      "IETF. RFC 7009 - OAuth 2.0 Token Revocation. 2013.",
      "IETF. RFC 7519 - JSON Web Token (JWT). 2015.",
      "IETF. RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients. 2015.",
      "IETF. RFC 7662 - OAuth 2.0 Token Introspection. 2015.",
      "IETF. RFC 8252 - OAuth 2.0 for Native Apps. 2017.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8628 - OAuth 2.0 Device Authorization Grant. 2019.",
      "IETF. RFC 8693 - OAuth 2.0 Token Exchange. 2020.",
      "IETF. RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound access tokens. 2020.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9101 - JWT-Secured Authorization Request. 2021.",
      "IETF. RFC 9126 - Pushed Authorization Requests. 2021.",
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 access tokens. 2021.",
      "IETF. RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification. 2022.",
      "IETF. RFC 9396 - OAuth 2.0 Rich Authorization Requests. 2023.",
      "IETF. RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession. 2023.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "IETF. RFC 9701 - JWT Response for OAuth Token Introspection. 2025.",
      "IETF. RFC 9728 - OAuth 2.0 Protected Resource Metadata. 2025.",
      "IETF OAuth Working Group. The OAuth 2.1 Authorization Framework - Internet-Draft, version consulted in 2026.",
      "Microsoft Learn. Azure API Management authentication, validate-jwt, validate-azure-ad-token, and managed identity policies.",
      "Axway Documentation. OAuth 2.0 services, client authentication and token validation on API Gateway.",
      "OpenID Foundation. Financial-grade API Security Profile and OpenID Connect specifications, when applicable to the ecosystem."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "OAuth evolves through RFCs, Best Current Practices, profiles and drafts. Before deploying a flow or policy, validate the current specification, product version documentation, and behavior in an authorized environment. Treat Internet-Drafts as work in progress, not as automatic replacements for RFCs."
  }
];
