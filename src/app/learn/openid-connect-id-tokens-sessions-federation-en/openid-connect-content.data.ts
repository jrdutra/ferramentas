import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OPENID_CONNECT_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Federated authentication in an enterprise application"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/overview.svg",
    "alt": "OpenID Connect connecting user, Relying Party, OpenID Provider, ID Token and protected application",
    "caption": "Opening Figure - OIDC communicates a verifiable and interoperable authentication event to the client."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The ID Token proves an authentication event to the client; The access token authorizes access to the resource server."
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
    "text": "The previous chapter delved into OAuth 2.0 as a delegated authorization framework. OAuth allows a client to obtain limited authority to access a resource server, but does not, by itself, define a standardized way of communicating to the client that a user has been authenticated. OpenID Connect adds this layer of identity by using OAuth endpoints and mechanisms, introducing the openid scope, ID Token, standardized claims, UserInfo, discovery and specific validation rules."
  },
  {
    "kind": "paragraph",
    "text": "This distinction is decisive in enterprise architectures. The access token is intended for the API; the ID Token is intended for the client who initiated the authentication. A web application can validate the ID Token and create its own session, while presenting separate access tokens to the API Gateway. Forwarding the ID Token to the backend as if it were an API credential mixes up recipients, increases exposure of personal data and creates incorrect validations."
  },
  {
    "kind": "paragraph",
    "text": "OIDC also organizes issues that go beyond the first login: authentication levels, MFA, step-up, federated identity, claims consent, subject identifiers, metadata discovery, key rotation, distributed sessions and logout. In environments with multiple tenants and providers, security depends on associating each token with the correct issuer and preventing metadata or keys from one domain from being applied to another."
  },
  {
    "kind": "paragraph",
    "text": "This chapter details the Authorization Code Flow with PKCE from an OIDC perspective, the anatomy and validation of the ID Token, nonce, state, acr, amr, auth_time, UserInfo, subject identifiers, sessions and logout mechanisms. It also relates concepts to web applications, SPAs, BFFs, native applications, Axway API Gateway, Microsoft Entra and Azure API Management."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "In each flow, tag four recipients: browser, OIDC client, OpenID Provider, and API. Then, associate each artifact with the correct recipient: authorization code, ID Token, access token, refresh token, session cookie and logout token."
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
      "Explain why OpenID Connect is an identity layer built on top of OAuth 2.0.",
      "Differentiate OpenID Provider, Relying Party, End-User, Authorization Server and Resource Server.",
      "Describe the Authorization Code Flow with scope openid, state, nonce and PKCE.",
      "Interpret and validate ID Tokens, including iss, sub, aud, azp, exp, iat, nonce, auth_time, acr and amr.",
      "Distinguish ID Token, access token, refresh token, authorization code and UserInfo response.",
      "Understand requested, essential and voluntary identity scopes and claims.",
      "Design public and pairwise identifiers without using email as an immutable key.",
      "Relate acr, amr, max_age and prompt to MFA, step-up and risk policies.",
      "Distinguish session on the OpenID Provider, session on the client and authorization before APIs.",
      "Compare RP-Initiated, Front-Channel and Back-Channel Logout.",
      "Use discovery and JWKS with issuer validation, algorithms and key rotation.",
      "Diagnose OIDC failures in applications, gateways and federated environments."
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
      "17.1 OIDC as an identity layer on top of OAuth 2.0",
      "17.2 Roles, endpoints and artifacts",
      "17.3 The authentication request and the openid scope",
      "17.4 Authorization Code Flow with PKCE",
      "17.5 ID Token: purpose, format and claims",
      "17.6 Secure ID Token Validation",
      "17.7 state, nonce, PKCE, c_hash and at_hash",
      "17.8 Identity claims and scopes",
      "17.9 UserInfo Endpoint",
      "17.10 Subject identifiers: public and pairwise",
      "17.11 acr, amr, auth_time, max_age and prompt",
      "17.12 MFA, step-up and authentication context",
      "17.13 Sessions in the OP, in the RP and before APIs",
      "17.14 Logout initiated by RP",
      "17.15 Front-Channel and Back-Channel Logout",
      "17.16 Discovery, metadata and JWKS",
      "17.17 Client registration and redirect URIs",
      "17.18 Identity federation and chain of trust",
      "17.19 Multi-tenant, multiple issuers and account linking",
      "17.20 Web applications, SPA, BFF and native applications",
      "17.21 OIDC on API Gateways, Axway and Azure",
      "17.22 Threats and hardening",
      "17.23 Troubleshooting",
      "17.24 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.1 OIDC as an identity layer on top of OAuth 2.0",
    "id": "17-1-oidc-as-an-identity-layer-on-top-of-oauth-2-0"
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect defines an identity layer that allows the client to verify the user's identity based on authentication performed by an Authorization Server that also acts as an OpenID Provider. The protocol reuses the authorization endpoint, token endpoint and grants from OAuth 2.0, but adds authentication semantics and a set of messages and validations of its own."
  },
  {
    "kind": "paragraph",
    "text": "OIDC activation occurs when the request contains the openid scope. Without this value, the transaction remains OAuth and the client should not assume that they will receive an ID Token. Other scopes, such as profile, email, address and phone, request standardized sets of claims, but do not replace the openid scope."
  },
  {
    "kind": "paragraph",
    "text": "The main authentication result is the ID Token, a security assertion about the authentication event and the user identifier in the context of that issuer. The client validates this assertion and decides to create or update a local session. The ID Token is not a real-time directory lookup and does not guarantee that all attributes remain current throughout the session."
  },
  {
    "kind": "subhead",
    "text": "Essential distinction"
  },
  {
    "kind": "paragraph",
    "text": "OAuth answers “what authority was this client given to access a resource?”. OIDC answers “which user was authenticated for this client, by which issuer and under what conditions?”. A system can use both in the same transaction without confusing their tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.2 Roles, endpoints and artifacts",
    "id": "17-2-roles-endpoints-and-artifacts"
  },
  {
    "kind": "paragraph",
    "text": "The End-User is the authenticated person. The Relying Party, or RP, is the OIDC client that requests and consumes authentication. The OpenID Provider, or OP, authenticates the user and issues ID Tokens. On many platforms, the same product plays the roles of OP and Authorization Server, but the conceptual analysis continues to separate authentication for the client and authorization for APIs."
  },
  {
    "kind": "paragraph",
    "text": "The authorization endpoint interacts with the browser for login, consent, and return to the redirect URI. The token endpoint receives the authorization code via back-channel and returns tokens. The UserInfo Endpoint is a protected resource accessed with an access token. The discovery endpoint publishes metadata, and the jwks_uri references the public keys used in signature verification."
  },
  {
    "kind": "paragraph",
    "text": "Artifacts have different life cycles. The authorization code is short and single-use. The ID Token describes authentication for the RP. The access token represents authority before a resource server. The refresh token allows you to obtain new tokens according to policy. Cookies maintain sessions in the OP or RP and should not be treated as equivalent to tokens."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Each artifact has its own recipient and purpose.",
    "headers": [
      "Element",
      "Main recipient",
      "Purpose"
    ],
    "rows": [
      [
        "Authorization code",
        "Token endpoint",
        "Temporarily represent authorization and link front-channel to back-channel."
      ],
      [
        "ID Token",
        "Relying Party",
        "Communicate identity and authentication context to the client."
      ],
      [
        "Access token",
        "Resource Server/API",
        "Authorize protected operations."
      ],
      [
        "Refresh token",
        "Authorization Server",
        "Obtain new tokens without repeating the entire interaction."
      ],
      [
        "UserInfo response",
        "Relying Party",
        "Deliver authorized claims about the user."
      ],
      [
        "OP's cookie",
        "OpenID Provider",
        "Maintain the federated authentication session."
      ],
      [
        "RP cookie",
        "Client application",
        "Maintain the local application session."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-01-flow.svg",
    "alt": "Authorization Code Flow OIDC separating front-channel, back-channel and local session creation",
    "caption": "Figure 1 - The code passes through the browser, but the tokens are obtained from the token endpoint via a direct channel."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.3 Authentication request and scope openid",
    "id": "17-3-authentication-request-and-scope-openid"
  },
  {
    "kind": "paragraph",
    "text": "The OIDC request is an OAuth authorization request plus identity requirements. Usual parameters include client_id, response_type, redirect_uri, scope, state, nonce, code_challenge, and code_challenge_method. Other parameters, such as prompt, max_age, login_hint, ui_locales, and acr_values, drive the desired experience or level of authentication, as long as they are supported by the OP."
  },
  {
    "kind": "paragraph",
    "text": "The redirect_uri must match a previously registered value. Flexible comparisons, broad wildcards, and redirects derived from external headers increase the risk of code bypass and phishing. The client must generate state, nonce and code_verifier with sufficient entropy for each attempt and associate them with the local transaction before redirecting the browser."
  },
  {
    "kind": "paragraph",
    "text": "The scope parameter must contain openid. Additional scopes indicate groups of claims that the customer requests, but the OP still applies policy, consent and minimization. Requesting profile does not guarantee that all claims in the set will be returned in the ID Token; some may appear in UserInfo or be omitted."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - Authorization Request"
  },
  {
    "kind": "code",
    "text": "GET /authorize?\n  response_type=code\n  &client_id=portal-web\n  &redirect_uri=https%3A%2F%2Fportal.example%2Fcallback\n  &scope=openid%20profile%20email\n  &state=Qm9uZGluZy1mbG93LTE\n  &nonce=bm9uY2UtZm9yLWlkLXRva2Vu\n  &code_challenge=9Fq...\n  &code_challenge_method=S256 HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.4 Authorization Code Flow with PKCE",
    "id": "17-4-authorization-code-flow-with-pkce"
  },
  {
    "kind": "paragraph",
    "text": "In the recommended flow, the browser is redirected to the authorization endpoint, the OP authenticates the user and returns an authorization code to the client's redirect URI. The client validates state and sends the code to the token endpoint next to the code_verifier. A confidential client also authenticates to the token endpoint using a compatible mechanism, preferably an asymmetric credential or a method appropriate to the environment."
  },
  {
    "kind": "paragraph",
    "text": "PKCE links the code to the instance that initiated the transaction. The code_challenge was sent in the initial request and the code_verifier is only revealed in the exchange. Even if an attacker intercepts the code, he cannot exchange it without the verifier. PKCE does not replace state or nonce: each value protects a different relationship."
  },
  {
    "kind": "paragraph",
    "text": "The token endpoint response can contain ID Token, access token, token_type, expires_in and, depending on policy, refresh token. The client should not create a session just because it received HTTP 200. First it validates the response, the ID Token, the issuer, the audience, the signature, the time window, nonce and other flow requirements."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - changing the authorization code"
  },
  {
    "kind": "code",
    "text": "POST /token HTTP/1.1\nHost: id.example\nContent-Type: application/x-www-form-urlencoded\ngrant_type=authorization_code&\ncode=SplxlOBeZQQYbYS6WxSbIA&\nredirect_uri=https%3A%2F%2Fportal.example%2Fcallback&\nclient_id=portal-web&\ncode_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-02.svg",
    "alt": "Structure of an ID Token with header, payload, signature and explicit recipient",
    "caption": "Figure 2 - The ID Token is an assertion intended for the OIDC client, not a universal credential."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.5 ID Token: purpose, format and claims",
    "id": "17-5-id-token-purpose-format-and-claims"
  },
  {
    "kind": "paragraph",
    "text": "The ID Token is a JWT that contains claims about user authentication. It is signed by the OP and can, in specific scenarios, also be encrypted for the client. The signature provides integrity and authentication of the origin; does not offer confidentiality. Any sensitive claim included in a signed-only JWT can be read by whoever obtains the value."
  },
  {
    "kind": "paragraph",
    "text": "Fundamental claims include iss, which identifies the issuer; sub, which identifies the user locally to the issuer; aud, which identifies the recipient customer; exp and iat, which define validity and issuance. Depending on the flow and request, nonce, auth_time, acr, amr, azp, at_hash and c_hash appear."
  },
  {
    "kind": "paragraph",
    "text": "The client must use the iss and sub combination as a stable foreign key. Email, telephone and name are changeable attributes and can be recycled. In multi-tenant architectures, the full tenant or issuer also participates in the identity; using just sub without context can produce collisions between senders."
  },
  {
    "kind": "subhead",
    "text": "ID Token illustrative payload"
  },
  {
    "kind": "code",
    "text": "{\n  \"iss\": \"https://id.example\",\n  \"sub\": \"248289761001\",\n  \"aud\": \"portal-web\",\n  \"exp\": 1784127000,\n  \"iat\": 1784126100,\n  \"auth_time\": 1784126000,\n  \"nonce\": \"bm9uY2UtZm9yLWlkLXRva2Vu\",\n  \"acr\": \"urn:example:loa:2\",\n  \"amr\": [\"pwd\", \"otp\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "ID Token is not an access token"
  },
  {
    "kind": "paragraph",
    "text": "Even when both are JWTs and share some claims, their recipients and semantics are different. The API must validate the access token issued to its audience; the client validates the ID Token issued to its client_id."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-03.svg",
    "alt": "Mandatory chain of cryptographic, temporal and contextual ID Token validation",
    "caption": "Figure 3 - Cryptographic verification is just one step of contextual validation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.6 Secure ID Token Validation",
    "id": "17-6-secure-id-token-validation"
  },
  {
    "kind": "paragraph",
    "text": "The customer must compare this with the expected issuer accurately. It then selects a trusted key to verify the signature and restricts algorithms to those that are explicitly accepted. The alg value of the token itself cannot decide the policy alone. The kid assists with key selection, but does not replace trust in the jwks_uri associated with the issuer."
  },
  {
    "kind": "paragraph",
    "text": "The claim aud must contain the RP's client_id. When there are multiple audiences, azp identifies the authorized party and must be evaluated according to the protocol rules. exp must be in the future within clock tolerance; iat cannot be absurdly distant; auth_time is validated when the request requires maximum authentication age."
  },
  {
    "kind": "paragraph",
    "text": "If nonce was sent, the token must contain the same value associated with the local attempt. Security claims such as acr and amr should only be used when their semantics are documented and trusted by that issuer. The presence of a string similar to “mfa” does not, in itself, create an interoperable level of assurance."
  },
  {
    "kind": "paragraph",
    "text": "Mature OIDC libraries perform most of the checks, but still require correct configuration of issuer, client_id, algorithms, redirect URIs, and state storage. Decoding the JWT manually and observing claims is not equivalent to validating it."
  },
  {
    "kind": "table",
    "caption": "Table 2 - ID Token acceptance depends on cryptographic and semantic validations.",
    "headers": [
      "Verification",
      "Failure avoided",
      "Evidence"
    ],
    "rows": [
      [
        "exact iss",
        "Accept token from unauthorized issuer",
        "Issuer obtained from trusted configuration."
      ],
      [
        "Signature and alg",
        "Tampered token or improper algorithm",
        "Corresponding JWK and allowlist of algorithms."
      ],
      [
        "aud/azp",
        "Token issued to another client",
        "client_id present and consistent authorized party."
      ],
      [
        "exp/iat/auth_time",
        "Replay outside window or old session",
        "Synchronized clock and limited tolerance."
      ],
      [
        "nonce",
        "Authentication response reuse or replacement",
        "Value per transaction stored on the client."
      ],
      [
        "acr/amr",
        "Accept authentication below requirement",
        "Issuer-defined semantics and local policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.7 state, nonce, PKCE, c_hash and at_hash",
    "id": "17-7-state-nonce-pkce-c-hash-and-at-hash"
  },
  {
    "kind": "paragraph",
    "text": "state ties the authorization response to the client-initiated transaction and helps protect against CSRF and response injection. nonce binds the ID Token to the authentication request and reduces token replay. PKCE links the authorization code exchange to the instance that produced the code_challenge. The three values can coexist and should not be reused between attempts."
  },
  {
    "kind": "paragraph",
    "text": "In response types that return artifacts via the authorization endpoint, c_hash and at_hash can link, respectively, the authorization code and the access token to the ID Token. Validation uses part of the hash calculated with an algorithm related to the signature. In a pure code flow, the library may not require both, but the implementer needs to follow the rules of the response type actually used."
  },
  {
    "kind": "paragraph",
    "text": "Storing these values only in global variables or in localStorage without binding to an attempt allows collisions and attacks by concurrent tabs. The client must maintain a transaction record with issuer, client_id, redirect_uri, state, nonce, code_verifier, time and expected parameters, removing it upon success or expiration."
  },
  {
    "kind": "paragraph",
    "text": "Value What it binds Where it is validated"
  },
  {
    "kind": "table",
    "caption": "Table 3 - Correlation values protect distinct flow relationships.",
    "headers": [
      "Value",
      "What binds",
      "Where is it validated"
    ],
    "rows": [
      [
        "state",
        "Authorization request and response",
        "In the callback, before processing code or error."
      ],
      [
        "nonce",
        "Request and ID Token",
        "Inside the ID Token after signature validation."
      ],
      [
        "code_verifier",
        "Authorization request and token request",
        "In the token endpoint by the OP."
      ],
      [
        "c_hash",
        "Authorization Code and ID Token",
        "On the client when required by the response type."
      ],
      [
        "at_hash",
        "Access token and ID Token",
        "On the client when required by the response type."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.8 Identity claims and scopes",
    "id": "17-8-identity-claims-and-scopes"
  },
  {
    "kind": "paragraph",
    "text": "OIDC defines standardized claims for profile, email, address and telephone number. Scopes such as profile and email are shortcuts for requesting sets of claims. The effective response depends on the OP, consent, policy, and delivery location. A claim can appear in the ID Token, the UserInfo response, or both."
  },
  {
    "kind": "paragraph",
    "text": "The claims parameter allows you to request claims individually and indicate whether they are essential. “Essential” expresses the customer’s requirement, but does not oblige an incapable OP to manufacture the data; The transaction may fail or proceed as per support and policy. Expected values can also be reported for some claims, requiring care with interoperability."
  },
  {
    "kind": "paragraph",
    "text": "Minimization is a security and privacy property. The client should request only the necessary attributes and avoid persisting indefinite copies. Group and role claims can grow, vary between directories or represent administrative status; they should not be treated as universal substitutes for object authorization and domain rules."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - claims parameter"
  },
  {
    "kind": "code",
    "text": "{\n  \"id_token\": {\n    \"acr\": {\"essential\": true, \"values\": [\"urn:example:loa:2\"]},\n    \"email\": {\"essential\": true}\n  },\n  \"userinfo\": {\n    \"given_name\": null,\n    \"family_name\": null\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.9 UserInfo Endpoint",
    "id": "17-9-userinfo-endpoint"
  },
  {
    "kind": "paragraph",
    "text": "The UserInfo Endpoint is a protected resource that returns claims about the user associated with the access token. The client calls this endpoint with a bearer token or sender-constrained mechanism, depending on the profile adopted. The response is typically signed or unsigned JSON, depending on the OP's configuration and metadata."
  },
  {
    "kind": "paragraph",
    "text": "The client needs to validate that the UserInfo claim sub is identical to the ID Token sub. This comparison prevents claims from another user from being associated with the current session. The fact that the connection uses TLS does not eliminate this semantic validation."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo is useful when the client needs claims that should not increase the ID Token or when the OP applies selective delivery. However, each call adds network dependency and unavailability handling. The design must decide which data is required at login, which can be loaded on demand and how long it can be stored."
  },
  {
    "kind": "subhead",
    "text": "Be careful with personal data"
  },
  {
    "kind": "paragraph",
    "text": "ID Tokens and UserInfo may contain personal data. Do not record complete responses in logs, traces, or error tools. Prefer minimal identifiers, masking, and purpose-aligned retention controls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.10 Subject identifiers: public and pairwise",
    "id": "17-10-subject-identifiers-public-and-pairwise"
  },
  {
    "kind": "paragraph",
    "text": "The claim sub provides a locally unique identifier that is never reassigned within the issuer. In public mode, the same user tends to receive the same sub for different clients. In pairwise mode, the OP calculates a different identifier per customer sector, reducing the possibility of correlating the user between independent applications."
  },
  {
    "kind": "paragraph",
    "text": "Pairwise subject identifiers are relevant for privacy, but require account linking, support, and migration planning. Two customers from the same sector can share the same sub as per OP's policy; clients from different sectors receive different values even for the same person."
  },
  {
    "kind": "paragraph",
    "text": "The application database must persist issuer and sub as a federated key, maintaining attributes such as email in updateable fields. When there is an issuer migration, tenant merger or subject strategy change, the association needs an explicit procedure and additional proof; it should not be inferred from email coincidence alone."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The subject identifier must balance stability and privacy.",
    "headers": [
      "Strategy",
      "Advantage",
      "Operational attention"
    ],
    "rows": [
      [
        "Public subject",
        "Facilitates correlation between clients of the same issuer.",
        "Increases possibility of tracking between applications."
      ],
      [
        "Pairwise subject",
        "Reduces correlation between client sectors.",
        "Requires sector identifier and linking planning."
      ],
      [
        "Email as key",
        "Sounds simple for business.",
        "It is changeable, can be recycled and is not a secure identifier."
      ],
      [
        "iss + sub",
        "Stable federated identity in the issuer domain.",
        "Needs to be preserved in migrations and multi-tenant."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.11 acr, amr, auth_time, max_age and prompt",
    "id": "17-11-acr-amr-auth-time-max-age-and-prompt"
  },
  {
    "kind": "paragraph",
    "text": "acr represents an achieved authentication class or context, according to the vocabulary of the issuer or a profile. amr lists methods used, such as password, OTP, biometrics or hardware, but the values and combinations need to be interpreted according to the OP's documentation. auth_time records when active authentication occurred."
  },
  {
    "kind": "paragraph",
    "text": "The client can use max_age to require authentication to be no older than a certain threshold. When max_age is requested, auth_time becomes essential for verification. prompt controls interaction: none attempts silent authentication; login forces new authentication; consent forces new consent decision; select_account requests account selection, as supported."
  },
  {
    "kind": "paragraph",
    "text": "acr_values expresses preference for authentication contexts. In high-risk operations, the customer can start a new flow with a stronger requirement. The policy should not rely solely on parameters sent by the front end; the OP and the client need to validate that the returned context satisfies the operation rule."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Claims and parameters describe recency and authentication context.",
    "headers": [
      "Claim/parameter",
      "Meaning",
      "Typical usage"
    ],
    "rows": [
      [
        "acr",
        "Authentication context class achieved",
        "Compare with the level required by the operation."
      ],
      [
        "amr",
        "Methods used in authentication",
        "Issuer-specific auditing and policies."
      ],
      [
        "auth_time",
        "Active authentication instant",
        "Validate max_age and recency."
      ],
      [
        "max_age",
        "Maximum acceptable authentication age",
        "Force reauthentication for sensitive operation."
      ],
      [
        "prompt",
        "Requested interaction behavior",
        "none, login, consent or select account."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.12 MFA, step-up and authentication context",
    "id": "17-12-mfa-step-up-and-authentication-context"
  },
  {
    "kind": "paragraph",
    "text": "MFA means using independent factors, not just two steps of the same factor. RP typically does not implement authenticators; it requests or checks a context issued by the OP. For a high-risk operation, the client may initiate step-up and require re-authentication with acr or equivalent policy."
  },
  {
    "kind": "paragraph",
    "text": "The decision must consider the authentication already carried out, the current risk, the device, the resource and the time since the last test. A user may have a valid SSO session on the OP, but still need additional authentication to authorize payment, change credentials, or access sensitive data."
  },
  {
    "kind": "paragraph",
    "text": "The step-up result needs to be linked to the appropriate operation or session. Accepting an old ID Token that contained MFA, without evaluating auth_time and the transaction context, allows undue reuse. In critical systems, business confirmation may require controls beyond OIDC, such as transactional signature or independent approval."
  },
  {
    "kind": "subhead",
    "text": "Assurance principle"
  },
  {
    "kind": "paragraph",
    "text": "Don't treat acr and amr as universal strings. Define which values each issuer can issue, what they mean, how they are audited and which operations accept each level. In federations, this mapping needs to be part of the trust agreement."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-04.svg",
    "alt": "OpenID Provider Sessions, Relying Party, OAuth Tokens, and API State",
    "caption": "Figure 4 - SSO, local session and API authorization are related but independent states."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.13 Sessions in the OP, in the RP and before APIs",
    "id": "17-13-sessions-in-the-op-in-the-rp-and-before-apis"
  },
  {
    "kind": "paragraph",
    "text": "The session in OP allows Single Sign-On between clients that trust the same provider. It is usually represented by a cookie under the OP's domain. When another RP sends an authorization request, the OP can reuse the existing authentication, as long as policy, prompt and max_age allow it."
  },
  {
    "kind": "paragraph",
    "text": "The RP session is created by the application after validating the ID Token. In a traditional or BFF web application, an HttpOnly, Secure, and SameSite cookie references state on the server. In pure SPA, libraries can maintain tokens in the browser, which increases the importance of XSS protection and reduces confidentiality guarantees of secrets."
  },
  {
    "kind": "paragraph",
    "text": "The API normally validates access tokens with each call and does not know the OP's cookie or the RP's cookie. Expiring the local session prevents further actions by the browser, but does not necessarily revoke access tokens already issued. Likewise, revoking a refresh token does not automatically clear all session cookies."
  },
  {
    "kind": "paragraph",
    "text": "Session design needs to define absolute and inactivity times, renewal, rotation, revocation, reauthentication, and behavior across multiple devices. The “leave everywhere” experience requires inventory and coordination between sessions and tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.14 RP-Initiated Logout",
    "id": "17-14-rp-initiated-logout"
  },
  {
    "kind": "paragraph",
    "text": "In RP-Initiated Logout, the client redirects the browser to the OP's logout endpoint. Common parameters include id_token_hint, post_logout_redirect_uri, client_id, and state, depending on provider support and rules. The post_logout_redirect_uri must be previously registered to avoid open redirection."
  },
  {
    "kind": "paragraph",
    "text": "id_token_hint helps the OP to identify the session and the client, but should not be treated as an access token. state can correlate post-logout return and secure navigation. The RP must clean up its local session regardless of whether the final redirection occurs, preventing a network failure from keeping the user apparently authenticated to the application."
  },
  {
    "kind": "paragraph",
    "text": "Logout initiated by the RP does not alone guarantee that all other applications connected to the OP are closed. The OP can offer front-channel or back-channel propagation. The product policy needs to make it clear whether “exit” means terminating just the current application, the provider session, or all known sessions."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - RP-Initiated Logout"
  },
  {
    "kind": "code",
    "text": "GET /logout?\n  id_token_hint=eyJ...\n  &post_logout_redirect_uri=https%3A%2F%2Fportal.example%2Fsigned-out\n  &state=bG9nb3V0LXRyYW5zYWN0aW9u HTTP/1.1\nHost: id.example"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-05.svg",
    "alt": "Comparison between RP-Initiated, Front-Channel, Back-Channel Logout and Local Session",
    "caption": "Figure 5 - Logout mechanisms differ by channel used and browser dependency."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.15 Front-Channel and Back-Channel Logout",
    "id": "17-15-front-channel-and-back-channel-logout"
  },
  {
    "kind": "paragraph",
    "text": "Front-Channel Logout uses the user agent to load logout URLs from RPs. The mechanism is simple and compatible with web applications, but it depends on the browser, cookies and the completion of navigation. Restrictions on third-party cookies and iframes may reduce reliability in some environments."
  },
  {
    "kind": "paragraph",
    "text": "Back-Channel Logout sends a direct request from the OP to the endpoint registered by the RP. The body contains a signed logout token, with specific events and identifiers such as sid or sub. The RP validates issuer, audience, signature, time, jti and event before invalidating the corresponding session. The endpoint must be idempotent, resilient and not dependent on browser cookies."
  },
  {
    "kind": "paragraph",
    "text": "Session Management and state polling can also detect changes, but the design should prefer final, ecosystem-supported mechanisms. No logout replaces short token expiration, revocation where applicable, and continued authorization for high-risk operations."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Logout needs to be designed as state propagation, not as a single redirect.",
    "headers": [
      "Mechanism",
      "Channel",
      "Strengths",
      "Limitations"
    ],
    "rows": [
      [
        "RP-Initiated",
        "Browser from RP to OP",
        "Explicit exit experience.",
        "It does not propagate itself to all RPs."
      ],
      [
        "Front-Channel",
        "Browser from OP to RPs",
        "Direct web implementation.",
        "Depends on user agent, cookies and network."
      ],
      [
        "Back-Channel",
        "OP calls RP endpoint",
        "It is not browser dependent; more deterministic.",
        "It requires endpoint, validation and resilient treatment."
      ],
      [
        "Local expiration",
        "RP-controlled",
        "Always available and simple.",
        "Does not log out the OP or other RPs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.16 Discovery, metadata and JWKS",
    "id": "17-16-discovery-metadata-and-jwks"
  },
  {
    "kind": "paragraph",
    "text": "OIDC Discovery publishes a configuration document to a well-known address derived from the issuer. The document informs authorization_endpoint, token_endpoint, userinfo_endpoint, jwks_uri, end_session_endpoint when available, response types, scopes, claims, client authentication methods and supported algorithms."
  },
  {
    "kind": "paragraph",
    "text": "The client must initiate discovery from a previously trusted issuer and verify that the issuer published in the document matches exactly what is expected. You should not accept an issuer freely provided by the user and, from there, fetch metadata without policy, as this allows SSRF, mix-up and trust in unauthorized providers."
  },
  {
    "kind": "paragraph",
    "text": "jwks_uri publishes public keys. Libraries cache and use kid to select the key. Rotation requires an overlap period: tokens signed with the previous key may still be valid while the new key is already published. On kid failure, the client can update JWKS in a controlled manner, avoiding network loops caused by malicious tokens."
  },
  {
    "kind": "subhead",
    "text": "Illustrative excerpt - OpenID Provider Metadata"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.example\",\n  \"authorization_endpoint\": \"https://id.example/authorize\",\n  \"token_endpoint\": \"https://id.example/token\",\n  \"userinfo_endpoint\": \"https://id.example/userinfo\",\n  \"jwks_uri\": \"https://id.example/jwks.json\",\n  \"end_session_endpoint\": \"https://id.example/logout\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"ES256\"]\n}"
  },
  {
    "kind": "subhead",
    "text": "Metadata is security configuration"
  },
  {
    "kind": "paragraph",
    "text": "Discovery reduces manual configuration, but does not make any endpoint trustworthy. The root issuer must come from a validated configuration, allowlist, or federation chain; redirects and jwks_uri remain subject to network and policy restrictions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.17 Client registration and redirect URIs",
    "id": "17-17-client-registration-and-redirect-uris"
  },
  {
    "kind": "paragraph",
    "text": "The OP needs to know each client: client_id, application type, redirect URIs, post-logout redirect URIs, authentication methods, keys, scopes and policies. Public clients cannot maintain reliable secrecy; Sensitive customers need to protect credentials and prefer asymmetric authentication when the risk warrants it."
  },
  {
    "kind": "paragraph",
    "text": "Redirect URIs must be accurate and use HTTPS, except handled exceptions for native app loopback. Custom URI schemes require collision protection and preference for app links or universal links when available. Wildcards and broad prefix matching can allow the authorization code to be delivered to an attacker-controlled destination."
  },
  {
    "kind": "paragraph",
    "text": "Dynamic logging can automate ecosystems, but expands administrative footprint. Software statements, policies, registrant authentication, metadata validation and lifecycle management become necessary. In typical enterprise environments, catalog-and pipeline-governed logging offers greater predictability."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Client classification determines possible controls, not just the application name.",
    "headers": [
      "Client type",
      "Credential storage",
      "Recommendation"
    ],
    "rows": [
      [
        "Web server / BFF",
        "Can protect secret or key on server",
        "Code + PKCE and strong authentication on the token endpoint."
      ],
      [
        "SPA in the browser",
        "Does not have a reliable secret",
        "Code + PKCE; reduce tokens in the browser and evaluate BFF."
      ],
      [
        "Native app",
        "Uses system storage but is public client",
        "Code + PKCE with external browser and secure redirect."
      ],
      [
        "Confidential daemon",
        "Can use key, certificate or workload identity",
        "Client Credentials for APIs; OIDC only when there is a user."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openid-connect-id-tokens-sessions-federation/en/figure-06.svg",
    "alt": "Federated chain of trust between Relying Party, metadata, keys, policies and OpenID Provider",
    "caption": "Figure 6 - Federation relies on an explicit chain of metadata, keys, policies, and governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.18 Identity federation and chain of trust",
    "id": "17-18-identity-federation-and-chain-of-trust"
  },
  {
    "kind": "paragraph",
    "text": "Federation allows an application to trust authentication performed by another domain. In a bilateral relationship, the RP directly configures issuer, metadata, keys and rules. In multilateral federations, entities and trust anchors can publish signed statements and policies that allow the chain of trust to be resolved in a scalable way."
  },
  {
    "kind": "paragraph",
    "text": "Technical trust does not replace organizational agreement. It is necessary to define onboarding, ownership, assurance, incident response, key rotation, availability, privacy, claims semantics and shutdown. An OP can issue cryptographically valid tokens and still provide attributes that are incompatible with the RP's policy."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Federation 1.0 formalizes trust chains and metadata policies for ecosystems with many entities. Adoption must consider product maturity, sector profile and real need. In a company with few issuers, explicit configuration may be simpler; In government, financial or healthcare ecosystems, multilateral federation can reduce bilateral agreements."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.19 Multi-tenant, multiple issuers and account linking",
    "id": "17-19-multi-tenant-multiple-issuers-and-account-linking"
  },
  {
    "kind": "paragraph",
    "text": "Multi-tenant applications can accept users from multiple directories. Validation needs to determine the authorized issuer for each tenant and prevent a valid key from one tenant from authenticating identities in another. “Common” or equivalent endpoints facilitate initial discovery, but the final token must be associated with the concrete issuer and tenancy policy."
  },
  {
    "kind": "paragraph",
    "text": "Account linking connects federated identities to a local account. The process must require an already authenticated session and a new proof at the second provider, with protection against CSRF and clear confirmation. Automatically linking accounts because they have the same email allows account takeover when domains or addresses are recycled."
  },
  {
    "kind": "paragraph",
    "text": "In migrations, preserve the history between old issuer, old sub and new identity by governed mapping table. Audit logs need to record which federated identity was used, which local account resulted from the link, and who authorized the link."
  },
  {
    "kind": "subhead",
    "text": "Multi-emitter rule"
  },
  {
    "kind": "paragraph",
    "text": "Never choose the validation key just for the kid without first fixing the trusted issuer. The same kid can exist on different domains, and metadata from one issuer should not validate tokens from another."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.20 Web applications, SPA, BFF and native applications",
    "id": "17-20-web-applications-spa-bff-and-native-applications"
  },
  {
    "kind": "paragraph",
    "text": "Backend web applications can maintain tokens and credentials on the server and expose only a protected session cookie to the browser. This model reduces the JavaScript exfiltration surface, but requires protection against CSRF, session fixation, cookie theft, and state scalability issues."
  },
  {
    "kind": "paragraph",
    "text": "SPAs are public clients. Authorization Code with PKCE replaces implicit flow as the modern approach, but tokens remain accessible to the browser context if stored on the front-end. Content Security Policy, dependency reduction, XSS protection, short tokens, and careful storage are required. The BFF standard transfers token handling to the server and offers the browser an origin-restricted session."
  },
  {
    "kind": "paragraph",
    "text": "Native apps should use external browser or system authentication session, not built-in webview that captures credentials. Redirects use app links, universal links or loopback depending on the platform. PKCE is mandatory in modern practice, and refresh tokens must be rotated and stored in the system's secure mechanism when supported."
  },
  {
    "kind": "table",
    "caption": "Table 8 - The flow is similar, but the execution location changes the threat model.",
    "headers": [
      "Architecture",
      "Where are the tokens?",
      "Dominant risk"
    ],
    "rows": [
      [
        "Web server",
        "Client backend",
        "Session, CSRF, client credential and server access."
      ],
      [
        "SPA",
        "Browser context",
        "XSS, malicious extension and token persistence."
      ],
      [
        "BFF",
        "Backend; browser receives cookie",
        "CSRF, BFF session and backend trust."
      ],
      [
        "Native app",
        "Device storage",
        "Malware, redirect hijacking and compromised device."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.21 OIDC on API Gateways, Axway and Azure",
    "id": "17-21-oidc-on-api-gateways-axway-and-azure"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway can act as a Relying Party to authenticate portal or console users, as an OpenID Provider in specific architectures or as a PEP that validates access tokens issued by the same ecosystem. These roles must be configured separately. Validating ID Token at an API Gateway does not correct the error of using the wrong token; the API continues to need an access token intended for its audience."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, OIDC filters and services allow you to act as a provider or relying party, create and validate ID Tokens and integrate OAuth flows. The design must separate interactive login policies from API protection policies, maintain governed stores and certificates and validate issuer, audience, nonce and claims according to the role played."
  },
  {
    "kind": "paragraph",
    "text": "In Microsoft Entra, registered applications receive client_id, redirect URIs, and token settings. Azure API Management typically secures APIs by validating access tokens with validate-jwt or validate-azure-ad-token. The policy can use OpenID configuration to obtain issuer and keys, but must require appropriate audience and claims; simple cryptographic validation does not replace authorization."
  },
  {
    "kind": "paragraph",
    "text": "In developer portals and administrative consoles, OIDC can provide SSO. For runtime calls, the gateway must preserve user and application identity in a controlled manner, remove equivalent external headers and, when necessary, issue or obtain appropriate credentials for the backend."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - APIM validating API access token"
  },
  {
    "kind": "code",
    "text": "<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://id.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>api://payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scp\" match=\"any\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "The gateway does not replace the OIDC client"
  },
  {
    "kind": "paragraph",
    "text": "The client application validates the ID Token and maintains the user session. The gateway protects APIs by validating access tokens and enforcing policies. Mixing these responsibilities produces wrong audiences and unnecessary exposure of claims."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.22 Threats and hardening",
    "id": "17-22-threats-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Authorization Code injection occurs when a code obtained in another transaction is inserted into the client's callback. state, PKCE, nonce, issuer validation and mix-up rules reduce risk. Redirect URI open or flexible registration allows code bypass. XSS can steal tokens in SPAs, while CSRF can trigger callbacks or logout in inappropriate context."
  },
  {
    "kind": "paragraph",
    "text": "Token substitution occurs when an ID Token or access token valid for another client, issuer or purpose is accepted. The defense is strict validation of issuer, audience, azp, type and context. Unexpected algorithms, keys obtained from the URL indicated by the token and global kid cache create cryptographic and multi-issuer flaws."
  },
  {
    "kind": "paragraph",
    "text": "Login CSRF associates the victim's session with the attacker's account, causing the victim to operate under the wrong identity. State per transaction, session correlation and account confirmation reduce risk. Automatic account linking via email is another form of mistaken identity."
  },
  {
    "kind": "paragraph",
    "text": "Logout also has threats: open redirection, partial wipe, logout token replay, and session denial. post_logout_redirect_uri must be registered; logout tokens need signature, audience, events, jti and time; Endpoints must be idempotent and limit abuse."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Secure OIDC depends on links between transactions, issuers, clients and artifacts.",
    "headers": [
      "Threat",
      "Implementation error",
      "Main control"
    ],
    "rows": [
      [
        "Issuer mix-up",
        "Process a response without fixing the expected OP",
        "Per-transaction issuer, reliable metadata, and exact validation."
      ],
      [
        "Code injection",
        "Accept a code not bound to the attempt",
        "PKCE, state, nonce and correlated callback."
      ],
      [
        "Token substitution",
        "Accept JWT from another audience or type",
        "aud, azp, typ, issuer and purpose of the token."
      ],
      [
        "Login CSRF",
        "Create session with non-user initiated response",
        "Strong state and transaction record."
      ],
      [
        "XSS in SPA",
        "Tokens accessible to compromised script",
        "BFF, CSP, script reduction and short token."
      ],
      [
        "Improper account linking",
        "Link by matching email",
        "Reauthentication with both identities and explicit confirmation."
      ],
      [
        "Logout replay",
        "Accept repeated or old logout token",
        "jti, exp/iat, signature and idempotence."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.23 Evidence-driven troubleshooting",
    "id": "17-23-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis must separate front-channel, token endpoint, ID Token validation, session creation and API access. An error in the callback could be a divergent state, incorrect redirect URI or expired code. An error in the token endpoint could be client authentication, PKCE, code reuse or clock. A successful login followed by a 401 on the API usually points to a missing access token, wrong audience, or gateway policy."
  },
  {
    "kind": "paragraph",
    "text": "Collect correlation ID, expected issuer, client_id, normalized redirect URI, response_type, scopes, timestamps, kid, algorithm, audiences and result of each validation. Never register full tokens, authorization codes, code_verifiers, secrets or cookies. For analysis, use synthetic claims or controlled irreversible hashes."
  },
  {
    "kind": "paragraph",
    "text": "Intermittent issues after key rotation may indicate JWKS caching, nodes with divergent clocks, or no overlap. Failures in only one tenant suggest issuer, consent, claims or tenancy policy. Logout that works in one application and not in another must be analyzed by channel type, sid/sub, registered endpoint and local state of the RP."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Symptoms must be associated with the exact stage of the flow.",
    "headers": [
      "Symptom",
      "Priority hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "invalid_state",
        "Transaction lost, cookie blocked, duplicate callback",
        "state issued and received, with a correlated session."
      ],
      [
        "invalid_grant in token endpoint",
        "Expired/reused code, redirect or divergent verifier",
        "Time, redirect_uri, and verifier hash."
      ],
      [
        "Invalid signature",
        "new kid, wrong issuer, JWKS cache",
        "Metadata, current JWKS and clock."
      ],
      [
        "Invalid audience",
        "ID Token issued to another client_id",
        "aud, azp and client_id configured."
      ],
      [
        "invalid_nonce",
        "Response from another attempt or replay",
        "nonce stored per transaction."
      ],
      [
        "Login works, API returns 401",
        "Access token missing, expired or wrong audience",
        "Authorization header and gateway policy."
      ],
      [
        "Partial logout",
        "Mechanism not propagated or RP did not clear session",
        "sid/sub, endpoint and logout logs."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Telemetry checklist without credentials exposure"
  },
  {
    "kind": "code",
    "text": "Secure diagnostic logging:\n- transaction_id and correlation_id\n- expected issuer and client_id\n- normalized redirect_uri\n- state_match, nonce_match, and pkce_result\n- alg, kid, aud, azp, and timestamps without the raw token\n- session created, renewed, or invalidated\n- OP error code and responding stage"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17.24 Case studies",
    "id": "17-24-case-studies"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - ID Token accepted by the API"
  },
  {
    "kind": "paragraph",
    "text": "A portal sends the ID Token in the Authorization header to the API Gateway. The token has a valid signature and aud equal to the portal's client_id, not the API. The gateway is configured to only check signature and expiration, so it accepts the call. The backend starts to trust a token destined for another component and without resource scopes."
  },
  {
    "kind": "paragraph",
    "text": "The fix is to request an access token for the API audience, validate issuer, audience, type and scopes on the gateway and keep the ID Token only on the client. The migration should look at existing consumers and prevent both types from being accepted indefinitely."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Intermittent failure after key rotation"
  },
  {
    "kind": "paragraph",
    "text": "The OP starts signing new tokens with another kid, but an application node keeps JWKS in cache for an excessive period of time. Some users receive tokens with the new key and fail; others continue to authenticate with old tokens. Restarting the node seems to fix it temporarily."
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis compares kid, serving node and cache age. The solution includes cache with controlled refresh on unknown kid, key override by issuer, observability and updated OIDC library. You should not fetch the key URL provided by the token."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Account takeover by automatic linking"
  },
  {
    "kind": "paragraph",
    "text": "An application automatically links a new federated identity to the local account when the email matches. A domain releases an old address, which is assigned to someone else. The new owner authenticates with the OP and receives access to the historical account."
  },
  {
    "kind": "paragraph",
    "text": "The fix requires iss + sub as identity, explicit linking process with reauthentication and confirmation, user alerts, and audit trail. E-mail remains a contact attribute, not proof of identity continuity."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 - Logout closes the portal, but does not close other applications"
  },
  {
    "kind": "paragraph",
    "text": "The portal clears its cookie and calls the OP's logout endpoint, but another RP keeps the local session active. The “global logout” expectation was not documented and the OP did not send front-channel or back-channel logout."
  },
  {
    "kind": "paragraph",
    "text": "The design is revised to register back-channel endpoints, issue sid, validate logout tokens and define unavailability behavior. The interface now distinguishes “exit this application” from “close corporate session”."
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
    "text": "Lab 1 - complete OIDC flow"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use an authorized laboratory provider and client.",
      "Capture the authorization request without recording real credentials.",
      "Identify state, nonce, code_challenge, code and token response.",
      "Validate the ID Token with library and compare iss, aud, nonce and time."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - validation matrix"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Create synthetic tokens or fixtures signed with a lab key.",
      "Wrong issuer test, wrong audience, expiration, divergent nonce and something not allowed.",
      "Record which validation rejected each token.",
      "Confirm that the client does not create session after any failure."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - UserInfo and minimization"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Request openid, profile and email in a test environment.",
      "Compare ID Token and UserInfo claims.",
      "Validate that sub is the same in both answers.",
      "Reduce scopes and observe which data is not delivered."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 4 - session and logout"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Create two lab RPs under the same OP.",
      "Observe SSO and differentiate cookies from OP and RPs.",
      "Test local logout, RP-Initiated and, if supported, back-channel.",
      "Record which sessions remain active in each scenario."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 5 - JWKS rotation"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publish two lab keys and change the active key.",
      "Note cache, kid, and acceptance of old tokens.",
      "Controlled refresh test on unknown kid.",
      "Set overlay window and crash alerts."
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
    "text": "OpenID Connect adds interoperable authentication to OAuth 2.0. The openid scope activates the protocol, and the ID Token communicates an authentication event to the Relying Party. The access token continues to be used for the API. Confusing the two artifacts is an architectural flaw, even though they are both JWTs."
  },
  {
    "kind": "paragraph",
    "text": "Authorization Code Flow with PKCE uses state, nonce and code_verifier to protect different relationships. The client validates issuer, signature, algorithm, audience, azp, time, nonce and assurance requirements before creating session. Claims like acr, amr and auth_time are only useful when their semantics are known."
  },
  {
    "kind": "paragraph",
    "text": "UserInfo delivers authorized claims and must maintain the same ID Token sub. The federated identity must be persisted by iss + sub; Email is not an immutable key. Public and pairwise subjects offer different correlation and privacy properties."
  },
  {
    "kind": "paragraph",
    "text": "OP session, RP session and API tokens are independent states. Logout requires explicit policy and can use RP-Initiated, Front-Channel or Back-Channel. Discovery and JWKS make configuration and rotation easier, but the root issuer and chain of trust need to be controlled."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, OIDC protects portal and application logins, while APIs typically require access tokens. Axway and Azure offer resources for discovery and validation, but configuration of audience, claims and authorization remains the responsibility of the architecture."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 18 will delve deeper into JWT, JWS, JWE, and JOSE: serialization, algorithms, key identifiers, JWKS, rotation, validation, token encryption, and implementation pitfalls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "OpenID Connect Checklist",
    "id": "openid-connect-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The openid scope is only present in OIDC authentication flows.",
      "The client uses Authorization Code with PKCE and exact redirect URI.",
      "state, nonce and code_verifier are unique per transaction and removed after use.",
      "The issuer is configured or resolved by authorized chain of trust.",
      "The signature is validated with the allowed algorithm and correct JWKS key.",
      "aud and azp are compared to the expected client_id.",
      "exp, iat and auth_time use synchronized clock and limited tolerance.",
      "The ID Token remains on the client and does not replace the API access token.",
      "UserInfo sub is compared to the ID Token sub.",
      "The federated account uses iss+sub, not email, as the foreign key.",
      "acr and amr have semantics documented by issuer.",
      "OP and RP cookies have protection, expiration and renewal policy.",
      "Local logout, RP-Initiated, front-channel and back-channel have defined behavior.",
      "Discovery and JWKS have cache, controlled refresh and network protection.",
      "Multi-tenant validates concrete issuer and tenancy policy.",
      "Logs do not store tokens, codes, secrets, verifiers or cookies.",
      "OIDC libraries are kept up to date and tested with negative cases."
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
      "Explain why OAuth 2.0 is not, in isolation, a login protocol.",
      "Differentiate OP, RP, Authorization Server and Resource Server.",
      "Describe the role of scope openid, state, nonce and PKCE.",
      "List the mandatory validations of an ID Token.",
      "Explain when azp needs to be analyzed.",
      "Compare ID Token, access token and UserInfo response.",
      "Explain why iss + sub is better than email for account linking.",
      "Compare public and pairwise subject identifiers.",
      "Model step-up using max_age, auth_time and acr.",
      "Differentiate session in OP, session in RP and access token validity.",
      "Compare RP-Initiated, Front-Channel and Back-Channel Logout.",
      "Describe how to handle JWKS rotation without restarting applications.",
      "Propose a multi-tenant policy that avoids issuer mix-up.",
      "Explain why the gateway must validate access token, not ID Token.",
      "Create a troubleshooting script for invalid_state and invalid_grant."
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
    "caption": "Table 11 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "acr",
        "Authentication Context Class Reference; authentication context class."
      ],
      [
        "amr",
        "Authentication Methods References; methods used in authentication."
      ],
      [
        "auth_time",
        "Time at which active user authentication occurred."
      ],
      [
        "Authorization Code",
        "Short artifact exchanged on token endpoint."
      ],
      [
        "azp",
        "Authorized Party; authorized client when aud contains multiple values."
      ],
      [
        "Back-Channel Logout",
        "Direct logout from the OP to the RP endpoint."
      ],
      [
        "c_hash",
        "Hash that links authorization code to the ID Token in applicable flows."
      ],
      [
        "Discovery",
        "Mechanism for obtaining metadata from the OpenID Provider."
      ],
      [
        "End-User",
        "Person authenticated by the OpenID Provider."
      ],
      [
        "Front-Channel Logout",
        "Logout propagated by the browser between OP and RPs."
      ],
      [
        "ID Token",
        "JWT intended for the RP to communicate the authentication event."
      ],
      [
        "iss",
        "Issuer; token issuer identifier."
      ],
      [
        "JWKS",
        "JSON set of public keys for cryptographic validation."
      ],
      [
        "max_age",
        "Maximum acceptable authentication age."
      ],
      [
        "nonce",
        "Value that links authentication request and ID Token."
      ],
      [
        "OpenID Provider",
        "Entity that authenticates the user and issues ID Tokens."
      ],
      [
        "Pairwise subject",
        "different sub by customer sector to reduce correlation."
      ],
      [
        "prompt",
        "Parameter that controls interaction such as none, login or consent."
      ],
      [
        "Public subject",
        "sub reused between clients according to issuer policy."
      ],
      [
        "Relying Party",
        "OIDC client that trusts OP authentication."
      ],
      [
        "RP-Initiated Logout",
        "Client-initiated logout request."
      ],
      [
        "sid",
        "Session identifier used in logout mechanisms."
      ],
      [
        "sub",
        "Subject Identifier; user identifier in the issuer."
      ],
      [
        "UserInfo",
        "Protected endpoint that returns authorized claims from the user."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - OIDC Architecture Matrix",
    "id": "annex-a-oidc-architecture-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 12 - The choice depends on the platform, risk, experience and capacity of the provider.",
    "headers": [
      "Scenario",
      "Initial architecture",
      "Essential controls"
    ],
    "rows": [
      [
        "Corporate web application",
        "Code + PKCE with server-side session",
        "client authentication, secure cookie, CSRF, nonce and logout."
      ],
      [
        "Low-risk SPA",
        "Code + PKCE",
        "CSP, short token, no secret and XSS protection."
      ],
      [
        "Higher-risk SPA",
        "BFF + Code + PKCE",
        "tokens in the backend, HttpOnly cookie and CSRF."
      ],
      [
        "Native app",
        "Code + PKCE with external browser",
        "app/universal link, secure storage and refresh rotation."
      ],
      [
        "Multi-tenant portal",
        "Issuer by tenant and explicit policy",
        "aud/azp, tenancy, consent and secure account linking."
      ],
      [
        "Step-up operation",
        "New authorization request with assurance",
        "max_age, acr, auth_time and link to operation."
      ],
      [
        "SSO with corporate logout",
        "OP session + RP-Initiated + back-channel",
        "sid, logout token, idempotence and observability."
      ],
      [
        "multilateral federation",
        "OpenID Federation or sector profile",
        "trust anchors, metadata policies and governance."
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
      "OpenID Foundation. OpenID Connect Core 1.0 incorporating errata set 2.",
      "OpenID Foundation. OpenID Connect Discovery 1.0 incorporating errata set 2.",
      "OpenID Foundation. OpenID Connect RP-Initiated Logout 1.0. 2022.",
      "OpenID Foundation. OpenID Connect Front-Channel Logout 1.0. 2022.",
      "OpenID Foundation. OpenID Connect Back-Channel Logout 1.0, with errata incorporated. 2023.",
      "OpenID Foundation. OpenID Connect Session Management 1.0. 2022.",
      "OpenID Foundation. OpenID Federation 1.0. 2026.",
      "IETF. RFC 6749 - The OAuth 2.0 Authorization Framework. 2012.",
      "IETF. RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients. 2015.",
      "IETF. RFC 7519 - JSON Web Token. 2015.",
      "IETF. RFC 8414 - OAuth 2.0 Authorization Server Metadata. 2018.",
      "IETF. RFC 8252 - OAuth 2.0 for Native apps. 2017.",
      "IETF. RFC 8725 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification. 2022.",
      "IETF. RFC 9700 - Best Current Practice for OAuth 2.0 Security. 2025.",
      "Microsoft Learn. Microsoft identity platform and OpenID Connect protocol.",
      "Microsoft Learn. Azure API Management validate-jwt and validate-azure-ad-token policies.",
      "Axway Documentation. API Gateway and OpenID Connect; OpenID Connect filters.",
      "OWASP. OAuth 2.0 Security Cheat Sheet and Session Management Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "OIDC is an evolving set of specifications and profiles. Before deploying discovery, logout, federation, or assurance claims, confirm the version supported by the provider, library, and gateway. Internet-Drafts and proprietary extensions do not automatically replace final specifications."
  }
];
