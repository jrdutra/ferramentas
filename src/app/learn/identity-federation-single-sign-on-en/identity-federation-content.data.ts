import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const IDENTITY_FEDERATION_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "One authentication, multiple applications and trusted domains"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/en/overview.svg",
    "alt": "User authenticated by an Identity Provider accessing multiple applications in trusted domains",
    "caption": "Opening figure - Federation connects identity domains; SSO reduces repeat challenges without eliminating local sessions."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Federation transfers trust between domains; SSO reuses an authentication session under controlled rules."
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
    "text": "Previous chapters introduced OAuth 2.0, OpenID Connect, JWT/JOSE, and SAML 2.0. Each technology solves part of the problem: access delegation, modern authentication, token protection, or exchange of assertions between organizations. This chapter brings these pieces together into a broader architectural vision: how independent identity domains establish trust and how authentication performed at one point can be reused across multiple applications."
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation is a trust arrangement in which one domain accepts identity claims produced by another domain. Single Sign-On is the experience in which the user accesses multiple applications without repeating the authentication challenge with each access. The concepts are related, but they are not equivalent. It's possible to have SSO within a single domain without federation, and it's possible to federate identities without providing a seamless SSO experience."
  },
  {
    "kind": "paragraph",
    "text": "The real complexity arises when multiple sessions, protocols, keys, certificates, identifiers, policies, and lifecycles coexist. The Identity Provider session is not the same as the application session. A token issued to an API does not necessarily represent the browser session. Logging out of a layer does not automatically log out of the others. Poorly designed account linking can link the wrong identities. Outdated metadata can break the entire federation."
  },
  {
    "kind": "paragraph",
    "text": "This chapter delves into trust domains, topologies, identity brokers, SAML and OIDC federation, sessions, logout, step-up authentication, multitenancy, B2B/B2C, account linking, workload federation, security, privacy, high availability and integration with API Gateways. The objective is to offer a mental model that allows you to design, operate and diagnose complex corporate federations."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "In each flow, separate four elements: the session at the identity provider, the assertion or token transported, the local session created by the application, and the authorization policy applied to the resource. Many SSO issues arise when these layers are treated as one thing."
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
      "Distinguish federated identity, SSO, provisioning, synchronization and delegation.",
      "Explain trust domains, IdP, SP, RP, broker, directory and authority attributes.",
      "Compare direct trust, hub-and-spoke, multilateral and dynamic federation.",
      "Understand the session layers in the IdP, application, browser, and APIs.",
      "Relate SAML 2.0, OpenID Connect, and other protocols to federation use cases.",
      "Design metadata, keys, certificates, endpoints, claims and identifiers in a governed manner.",
      "Evaluate account linking, public/pairwise identifiers and risks of undue correlation.",
      "Apply MFA, step-up, assurance level, acr and amr in federated journeys.",
      "Understand identity brokering, protocol translation and B2B/B2C/multitenant federation.",
      "Diagnose login loops, logout failures, clock skew, audience, issuer, metadata and session."
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
      "20.1 Federated identity and SSO: different concepts",
      "20.2 Identity domains and trust boundaries",
      "20.3 Roles: IdP, SP, RP, broker and attribute authority",
      "20.4 Federated trust topologies",
      "20.5 SSO and multiple session layers",
      "20.6 Federation with SAML 2.0 and OpenID Connect",
      "20.7 Metadata, keys, certificates and discovery",
      "20.8 Onboarding, lifecycle and partner governance",
      "20.9 Identifiers, claims and account linking",
      "20.10 MFA, step-up and guarantee levels",
      "20.11 Logout and closing sessions",
      "20.12 Identity broker and protocol translation",
      "20.13 Multitenancy, B2B, B2C and workforce identity",
      "20.14 Workload federation and token exchange",
      "20.15 Security, privacy and threats",
      "20.16 High availability and disaster recovery",
      "20.17 Integration with API Gateways",
      "20.18 Observability, auditing and troubleshooting",
      "20.19 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.1 Federated identity and SSO: different concepts",
    "id": "20-1-federated-identity-and-sso-different-concepts"
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation is the establishment of a trust relationship between distinct administrative domains. A domain authenticates the subject and produces an assertion; another domain accepts this assertion and creates a local or temporary principal. The assertion consumer does not need to know the password, biometric factor, or device used in the original authentication. It trusts the sender's process and the conditions of the message received."
  },
  {
    "kind": "paragraph",
    "text": "Single Sign-On describes an experience: after authenticating once, the user accesses additional applications without completely repeating the challenge. SSO typically relies on a central session in the IdP. When a new application redirects the browser to this IdP, the existing session allows it to issue a new assertion. Even so, each application maintains its own session, its own expiration rules and independent authorization."
  },
  {
    "kind": "paragraph",
    "text": "Provisioning and synchronization are different problems. SCIM, directories, and IAM processes can create accounts and groups before the first login; Federation allows you to authenticate and transport attributes at the time of access. An organization can use just-in-time provisioning during first login, but this does not eliminate the need to govern shutdown, role changes, and access revocation."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Related concepts, but with different responsibilities.",
    "headers": [
      "Concept",
      "Main question",
      "Example"
    ],
    "rows": [
      [
        "Federation",
        "Which issuer does the application trust?",
        "Company A accepts assertions from Company B's IdP."
      ],
      [
        "SSO",
        "Does the user need to authenticate again?",
        "A session on the IdP serves multiple applications."
      ],
      [
        "Provisioning",
        "Does the account exist and have attributes?",
        "SCIM creates the user and groups in the SaaS."
      ],
      [
        "Delegation",
        "Who acts on whose behalf?",
        "Application accesses API on behalf of the user."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.2 Identity domains and trust boundaries",
    "id": "20-2-identity-domains-and-trust-boundaries"
  },
  {
    "kind": "paragraph",
    "text": "An identity domain is the administrative set that controls registration, authentication, lifecycle, policies, credentials and attributes of a population. In a federation, the consuming domain accepts that another domain performs part of these responsibilities. This acceptance needs to be explicit: which issuers are trustworthy, which algorithms are allowed, which claims can guide authorization and which authentication levels are sufficient for each operation."
  },
  {
    "kind": "paragraph",
    "text": "The trust boundary does not necessarily coincide with the network. An IdP can be in the cloud, the SP in a data center and the user in a public network. Trust is cryptographic and administrative: keys, certificates, metadata, contracts, audits, and incident response procedures support the relationship. Placing components in the same VNet or VPN does not replace validation of issuer, audience, signature and temporal conditions."
  },
  {
    "kind": "paragraph",
    "text": "Federated domains also need to align semantics. A partner's role=admin attribute should not automatically grant local administration. External claims need to be mapped to internal concepts under a controlled policy. The federation consumer remains responsible for authorizing access to their resource."
  },
  {
    "kind": "subhead",
    "text": "Confidence Threshold"
  },
  {
    "kind": "paragraph",
    "text": "Accepting an identity assertion does not mean delegating the entire authorization policy to the issuer. The consuming domain must decide which external statements are trusted, how they will be transformed, and what local actions they can enable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.3 Roles: IdP, SP, RP, broker and attribute authority",
    "id": "20-3-roles-idp-sp-rp-broker-and-attribute-authority"
  },
  {
    "kind": "paragraph",
    "text": "The Identity Provider authenticates the subject and issues identity information. In SAML, the consuming application is traditionally called Service Provider. In OpenID Connect, it is called Relying Party. The names change, but the function is similar: trust the sender, validate the message and create a session or local identity."
  },
  {
    "kind": "paragraph",
    "text": "An identity broker positions itself between multiple providers and multiple applications. It receives assertions from one domain, applies protocol transformation and claims, and issues a new assertion to another domain. The broker reduces the number of point-to-point integrations, but becomes a critical component: it concentrates keys, policies, availability, logs and the impact of incorrect configuration."
  },
  {
    "kind": "paragraph",
    "text": "An attribute authority is a trusted source of additional attributes, which may not come from the main IdP. In modern architectures, this function can be performed by directories, profile APIs, entitlement mechanisms or policy information points. Using dynamic attributes requires attention to freshness, consistency, and privacy."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/en/figure-01-federation-flow.svg",
    "alt": "Conceptual flow of federation and SSO between user, application, provider and local session",
    "caption": "Figure 1 - The application creates its own session after validating the federated assertion."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.4 Federated trust topologies",
    "id": "20-4-federated-trust-topologies"
  },
  {
    "kind": "paragraph",
    "text": "In direct trust, each application individually configures the partner IdP. The model is simple for a few relationships, but scales poorly: each certificate, endpoint or claim change needs to be coordinated with multiple systems. In large ecosystems, the number of integrations grows rapidly and security consistency decreases."
  },
  {
    "kind": "paragraph",
    "text": "In the hub-and-spoke model, a broker or federation gateway centralizes relationships. IdPs trust the broker and so do applications. The broker normalizes protocols and attributes, enforces policies, and provides a more stable interface. The operational advantage is significant, but requires high availability and strict governance, as a failure affects multiple journeys."
  },
  {
    "kind": "paragraph",
    "text": "Multilateral federations use an aggregated authority or metadata to distribute trust among many participants. The academic sector and regulated ecosystems are common examples. In dynamic models, entities build chains of trust and query signed statements. These arrangements reduce manual configuration but increase validation and governance complexity."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/en/figure-02-trust-topologies.svg",
    "alt": "Comparison between direct trust and hub-and-spoke topology with broker",
    "caption": "Figure 2 - Topology defines how trust relationships are distributed and operated."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.5 SSO and multiple session layers",
    "id": "20-5-sso-and-multiple-session-layers"
  },
  {
    "kind": "paragraph",
    "text": "SSO is often explained as a single session, but the actual architecture contains several. The IdP has a central authentication session, usually represented by a cookie. Each application creates its local session after validating the assertion. APIs can receive separate access tokens, with their own audience and expiration. The browser maintains cookies and context, but is not the final authority on any of these sessions."
  },
  {
    "kind": "paragraph",
    "text": "When the user accesses a second application, it redirects to the IdP. If the central session is still valid and the policy allows it, the IdP issues a new assertion without asking for credentials. This is SSO. The second application still needs to validate issuer, audience, nonce or InResponseTo, temporal conditions and signature, and only then create its own session."
  },
  {
    "kind": "paragraph",
    "text": "Timing policies may differ. The IdP can maintain a session for eight hours, while a financial application requires reauthentication every fifteen minutes for sensitive actions. Another system might accept session for one hour but require MFA for a transfer. SSO does not eliminate step-up authentication or risk controls."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/en/figure-03-session-layers.svg",
    "alt": "Independent session layers of IdP, application, browser and access token",
    "caption": "Figure 3 - Central session, local session and tokens have independent life cycles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.6 Federation with SAML 2.0 and OpenID Connect",
    "id": "20-6-federation-with-saml-2-0-and-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 is widely used in enterprise SSO and integration with enterprise web applications. It transports XML assertions through bindings such as HTTP-Redirect and HTTP-POST. Metadata describes entity IDs, endpoints, certificates and capabilities. The model is mature, but requires care with XML signing, canonicalization, Destination, AudienceRestriction, Recipient and InResponseTo."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect uses OAuth 2.0 as a foundation and introduces ID Token, Discovery, UserInfo, identity scopes, and session and logout mechanisms. It fits naturally into modern web applications, SPAs, mobile, and JSON-oriented architectures. Validation needs to consider issuer, audience, azp, nonce, exp, iat, signature and algorithm."
  },
  {
    "kind": "paragraph",
    "text": "The choice should not be treated as an abstract dispute. SAML may be the best option for legacy enterprise SaaS and workforce federation; OIDC is often preferred in modern applications and digital experiences. Identity brokers allow a SAML partner to access an OIDC application or vice versa, as long as the transformation preserves context and security."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Protocols have similar roles, but different ecosystems and mechanisms.",
    "headers": [
      "Appearance",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Format",
        "XML and assertions.",
        "JSON/JWT and ID Token."
      ],
      [
        "Typical applications",
        "Enterprise SSO and SaaS.",
        "Modern web, mobile, SPA and BFF."
      ],
      [
        "Discovery",
        "XML metadata.",
        "Discovery document and JWKS."
      ],
      [
        "Session and logout",
        "SLO profile and bindings.",
        "RP-Initiated, front-channel and back-channel."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.7 Metadata, keys, certificates and discovery",
    "id": "20-7-metadata-keys-certificates-and-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Federation relies on trusted configuration of identifiers, endpoints, and keys. In SAML, XML metadata can contain entityID, SingleSignOnService, AssertionConsumerService, SingleLogoutService, and certificates. In OIDC, the Discovery document publishes authorization_endpoint, token_endpoint, jwks_uri, issuer, and supported resources."
  },
  {
    "kind": "paragraph",
    "text": "Keys and certificates need planned rotation. The exchange must support rollover: the new key is published before it is used, and the old key remains available until tokens or assertions issued with it expire. Instantaneous rotation without coexistence window causes distributed failures that are difficult to recover from."
  },
  {
    "kind": "paragraph",
    "text": "Metadata should not be consumed without validation. URLs, TLS, metadata signature, document origin, cache, and update frequency need to be defined. In federation with partners, changes must go through a change management process, technical contacts and prior testing."
  },
  {
    "kind": "subhead",
    "text": "OIDC metadata summary example"
  },
  {
    "kind": "code",
    "text": "{\n  \"issuer\": \"https://id.empresa.example\",\n  \"authorization_endpoint\": \"https://id.empresa.example/authorize\",\n  \"token_endpoint\": \"https://id.empresa.example/token\",\n  \"jwks_uri\": \"https://id.empresa.example/.well-known/jwks.json\",\n  \"id_token_signing_alg_values_supported\": [\"RS256\", \"PS256\"]\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.8 Onboarding, lifecycle and partner governance",
    "id": "20-8-onboarding-lifecycle-and-partner-governance"
  },
  {
    "kind": "paragraph",
    "text": "A secure federation starts before the first message. Onboarding must identify responsible parties, domains, environments, endpoints, certificates, claims, audiences, authentication levels, incident contacts, maintenance windows and shutdown criteria. Test environments need to use separate entities and keys from production."
  },
  {
    "kind": "paragraph",
    "text": "The federation contract must define who is responsible for proof of identity, the user lifecycle, and the quality of attributes. If an employee leaves the partner company, how long does it take for access to be revoked? If a certificate is leaked, what is the emergency procedure? If an attribute changes meaning, how will consuming applications be protected?"
  },
  {
    "kind": "paragraph",
    "text": "Governance needs to inventory active relationships, algorithms, certificates, last authentications, dependent applications, and expiration dates. Forgotten federations pose a risk: old keys, abandoned endpoints and unowned accounts remain as access paths."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Federation is a lifecycle relationship, not just an initial configuration.",
    "headers": [
      "Phase",
      "Essential activities",
      "Evidence"
    ],
    "rows": [
      [
        "Onboarding",
        "Metadata exchange, testing, mapping and approval.",
        "Checklist and approval result."
      ],
      [
        "Operation",
        "Monitoring, rotation and support.",
        "Valid metrics, alerts and contacts."
      ],
      [
        "Change",
        "New certificate, endpoint or claim.",
        "Coexistence and rollback plan."
      ],
      [
        "Offboarding",
        "Blocking, trust removal and auditing.",
        "Closing confirmation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.9 Identifiers, claims and account linking",
    "id": "20-9-identifiers-claims-and-account-linking"
  },
  {
    "kind": "paragraph",
    "text": "The federated identifier must be stable, unique within the correct context and unlikely to be reused. Email may change, be recycled or have aliases; therefore, it should not be the only link key. In OIDC, the issuer + subject pair identifies the user. In SAML, NameID and attributes must be interpreted within the issuing entity and the agreed format."
  },
  {
    "kind": "paragraph",
    "text": "Account linking associates an external identity with an existing local account. The process is sensitive: automatic linking via email can allow takeover when domains or addresses are reused. The link must require sufficient proof of control of both identities, or follow a verified administrative process."
  },
  {
    "kind": "paragraph",
    "text": "Pairwise identifiers reduce correlation between applications, as the same user receives different subjects for each sector or client. This technique improves privacy, but requires a support and auditing strategy. Claims must be minimized: the application must only receive the attributes necessary for the declared purpose."
  },
  {
    "kind": "subhead",
    "text": "Account linking risk"
  },
  {
    "kind": "paragraph",
    "text": "Never treat email matches as universal proof that two identities belong to the same person. The link needs to consider issuer, domain verification, address lifecycle and additional controlled proof."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.10 MFA, step-up and guarantee levels",
    "id": "20-10-mfa-step-up-and-guarantee-levels"
  },
  {
    "kind": "paragraph",
    "text": "Federation needs to transport not only who was authenticated, but how and when. Sensitive applications may require multi-factor, phishing-resistant authentication, or recent reauthentication. In OIDC, acr, amr, and auth_time help express context. In SAML, AuthnContextClassRef and SessionIndex fulfill a related role."
  },
  {
    "kind": "paragraph",
    "text": "Step-up occurs when an existing session is insufficient for a higher risk operation. The application requests a new authentication level from the IdP, possibly with MFA. The result must be validated; it is not enough to trust that the user was redirected. Policies need to define which levels are accepted for each journey."
  },
  {
    "kind": "paragraph",
    "text": "Assurance level also depends on initial registration, credential management and the device. A strong factor applied to a poorly verified identity does not produce a high guarantee. In regulated ecosystems, levels need to be defined in an objective and auditable way."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.11 Logout and closing sessions",
    "id": "20-11-logout-and-closing-sessions"
  },
  {
    "kind": "paragraph",
    "text": "Federated logout is difficult because there are multiple independent sessions. Closing the local session removes access to the application, but the central session on the IdP can remain active. Upon return, the user can be silently authenticated. Closing the IdP session may not reach all applications, especially when third-party cookies are blocked or when an application is unavailable."
  },
  {
    "kind": "paragraph",
    "text": "SAML Single Logout coordinates LogoutRequest and LogoutResponse between participants. OIDC defines RP-Initiated Logout, front-channel and back-channel. Back-channel is more reliable for notifying servers without relying on the browser, but requires authenticated endpoints and robust processing. No mechanism automatically revokes all access tokens already issued, unless there is integration with revocation or introspection."
  },
  {
    "kind": "paragraph",
    "text": "The design needs to distinguish interface logout, local session termination, IdP termination, and token revocation. In high-risk applications, it may be necessary to record a list of active sessions, issue revocation events, and reduce the lifetime of tokens."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.12 Identity broker and protocol translation",
    "id": "20-12-identity-broker-and-protocol-translation"
  },
  {
    "kind": "paragraph",
    "text": "The broker reduces point-to-point integrations and creates an abstraction layer. It can receive SAML from a partner, convert the identity to an internal session, and issue OIDC for modern applications. You can also consolidate social IdPs, workforce and B2B partners. The translation, however, should not invent a context that does not exist in the origin."
  },
  {
    "kind": "paragraph",
    "text": "Claims and authentication levels need to be normalized carefully. A SAML AuthnContext should not be automatically converted to high acr without explicit mapping. External groups can be converted to intermediate attributes, but final authorization must remain under the control of the consuming domain."
  },
  {
    "kind": "paragraph",
    "text": "The broker also centralizes IdP discovery, home realm discovery, risk policies, MFA, account linking and session. This improves consistency but increases operational criticality. The architecture must provide for scalability, protected keys, tenant segregation and disaster recovery."
  },
  {
    "kind": "subhead",
    "text": "Identity broker as translation and policy point"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/identity-federation-sso/en/figure-04-identity-broker.svg",
    "alt": "Identity broker normalizing trust, protocols, claims and sessions",
    "caption": "Figure 4 - The broker normalizes trust and protocols, but does not eliminate application responsibility."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.13 Multitenancy, B2B, B2C and workforce identity",
    "id": "20-13-multitenancy-b2b-b2c-and-workforce-identity"
  },
  {
    "kind": "paragraph",
    "text": "Workforce identity serves employees and internal third parties; B2B integrates identities of partner organizations; B2C serves consumers on a large scale. Models may share technology, but they have different risks, attributes and experiences. A corporate employee-friendly MFA policy may be unfeasible for millions of consumers; a department claim may not exist in B2C."
  },
  {
    "kind": "paragraph",
    "text": "In multitenant environments, issuer, tenant and audience need to be rigorously validated. Accepting tokens from any tenant without allowlist may allow improper access. Applications need to decide whether to trust a common authority, specific tenants or a broker that applies admission policy."
  },
  {
    "kind": "paragraph",
    "text": "Home realm discovery selects the correct IdP based on domain, invitation, tenant, or user choice. Discovery must not be vulnerable to spoofing or forwarding to untrusted issuers. B2B invitations must expire and be tied to the expected identity."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Different populations require different identity policies.",
    "headers": [
      "Population",
      "Features",
      "Critical Control"
    ],
    "rows": [
      [
        "workforce",
        "Corporate directory and HR cycle.",
        "Fast shutdown and strong MFA."
      ],
      [
        "B2B",
        "Users managed by the partner.",
        "Allowlist of IdPs and trust agreement."
      ],
      [
        "B2C",
        "High scale and account recovery.",
        "Fraud and privacy protection."
      ],
      [
        "Workloads",
        "Userless processes and services.",
        "Short credentials and environment attestation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.14 Workload federation and token exchange",
    "id": "20-14-workload-federation-and-token-exchange"
  },
  {
    "kind": "paragraph",
    "text": "Federation is not limited to users. Cloud workloads, clusters, and pipelines can exchange identities without storing permanent secrets. An external issuer presents an assertion to the security token service, which verifies the source and issues short credentials for the destination domain. This model is used in workload identity federation and cross-cloud integrations."
  },
  {
    "kind": "paragraph",
    "text": "Token Exchange allows you to transform one token into another suitable for the next resource or domain. The new token should reduce audience, scope and lifetime, preserving subject and actor when necessary. The transformation should not expand privileges. Logs need to record delegation chain for auditing."
  },
  {
    "kind": "paragraph",
    "text": "In microservices, user identity and service identity can coexist. The backend needs to know whether the operation was performed by an autonomous application or on behalf of a user. Claims like sub, client_id and actor help, but the semantics need to be standardized."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.15 Security, privacy and threats",
    "id": "20-15-security-privacy-and-threats"
  },
  {
    "kind": "paragraph",
    "text": "Federation concentrates high-impact risks. If the IdP key is compromised, an attacker can issue assertions to multiple applications. If the application does not validate audience or issuer, it may accept tokens intended for another service. If RelayState, redirect_uri, or ACS are manipulated, responses may be diverted. Replay occurs when a valid assertion is reused outside of the expected window or context."
  },
  {
    "kind": "paragraph",
    "text": "Mix-up attacks exploit confusion between issuers or endpoints. Signature wrapping in SAML exploits differences between the signed element and the processed element. Weak algorithms, unauthenticated metadata, excessive clock skew, and old keys expand the surface. Defense requires strict validation, mature libraries, emitter logic pinning, and monitoring."
  },
  {
    "kind": "paragraph",
    "text": "Privacy requires minimization of claims, consent where applicable, limited retention and protection against correlation. A broker that centralizes all authentications has a broad view of user behavior. Logs should avoid storing full tokens and sensitive data unnecessarily."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Federated trust needs to be limited by local validations and policies.",
    "headers": [
      "Threat",
      "Typical failure",
      "Control"
    ],
    "rows": [
      [
        "Replay",
        "Reused assertion.",
        "Nonce, InResponseTo, jti, short window and usage cache."
      ],
      [
        "Issuer confusion",
        "Token accepted from the wrong issuer.",
        "Allowlist and exact issuer validation."
      ],
      [
        "Audience mismatch",
        "Token intended for another service.",
        "Validate aud and azp when applicable."
      ],
      [
        "Key compromise",
        "Fraudulent issuance on a scale.",
        "HSM, rotation, revocation and incident response."
      ],
      [
        "Claim injection",
        "External attribute becomes internal privilege.",
        "Explicit mapping and local authorization."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.16 High availability and disaster recovery",
    "id": "20-16-high-availability-and-disaster-recovery"
  },
  {
    "kind": "paragraph",
    "text": "The IdP and broker are on the login critical path. An outage can block several applications at the same time. The architecture needs to consider multiple instances, balancing, session storage, key replication, DNS, health checks and regional failure survivability."
  },
  {
    "kind": "paragraph",
    "text": "Disaster recovery must test not only the endpoint, but also the issuer, metadata, certificates and cookies. Changing issuer during failover breaks validation. Using the same issuer in different regions requires consistent coordination of keys and state. Sessions can be lost without preventing new login as long as the trusted domain remains stable."
  },
  {
    "kind": "paragraph",
    "text": "Applications need to define behavior when the IdP is unavailable. Already established sessions may continue for some time, but new authentications will fail. Manual authentication bypass should not be used as an impromptu contingency."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.17 Integration with API Gateways",
    "id": "20-17-integration-with-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways participate in the federation as token consumers, enforcement points or translation intermediaries. A gateway can validate OIDC/OAuth access tokens, convert identity to internal headers, apply policies per claim and issue internal token to the backend. It could also be behind a SAML or OIDC authenticated portal."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must not blindly accept identity headers from the Internet. Information like X-User or X-Roles needs to be removed at the edge and recreated only after validation. Trust between gateway and backend must be protected by mTLS, controlled network or sender-constrained token."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway and Azure API Management, implementation can include JWT validation, introspection, policies, certificates, products, and signatures. The design needs to separate portal authentication, API consumer authentication, and backend identity. These identities can be different on the same journey."
  },
  {
    "kind": "subhead",
    "text": "Good practice at the gateway"
  },
  {
    "kind": "paragraph",
    "text": "Propagate only necessary and standardized claims to the backend. Record issuer, subject, client, tenant, authentication method, and policy decision, but never expose or record complete tokens without operational need."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.18 Observability, auditing and troubleshooting",
    "id": "20-18-observability-auditing-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Federation troubleshooting needs to rebuild the chain: initial application, redirection, selected IdP, existing session, authentication request, issued response, validation, local session creation, and API access. Each step has its own IDs, timestamps and logs. Correlation avoids attributing an error produced by the application or the gateway to the IdP."
  },
  {
    "kind": "paragraph",
    "text": "Login loops typically indicate that the application did not preserve state/RelayState, was unable to create a local cookie, rejected the assertion or redirected back to the IdP. Intermittent errors can arise from clock skew, unpropagated key rotation, session affinity, divergent metadata, or SameSite cookies."
  },
  {
    "kind": "paragraph",
    "text": "Audit must record authentication, result, IdP, guarantee level, application, tenant, pseudonymized subject when possible, session creation and closure, link change and access decision. Metrics of success rate, latency, MFA, failures by issuer and certificate expiration help anticipate incidents."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Federated diagnosis requires evidence from all layers.",
    "headers": [
      "Symptom",
      "Evidence to collect",
      "Hypotheses"
    ],
    "rows": [
      [
        "Login Loop",
        "state/RelayState, cookies and application logs.",
        "Local session not created or response rejected."
      ],
      [
        "Invalid audience",
        "expected audience and metadata.",
        "Incorrect application or environment."
      ],
      [
        "Invalid signature",
        "kid, certificate, JWKS and schedule.",
        "Incomplete rotation or wrong transmitter."
      ],
      [
        "Partial logout",
        "local sessions, IdP and tokens.",
        "Uncoordinated layers."
      ],
      [
        "Duplicate user",
        "issuer, subject, NameID and mapping.",
        "Account linking or unstable identifier."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "20.19 Case studies and labs",
    "id": "20-19-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case study 1 - Corporate SaaS: employees access an external system via SAML. The corporate IdP authenticates with MFA and sends persistent NameID and controlled groups. SaaS creates local session and maps groups to their own roles. Governance includes certificate rotation, offboarding, and SLO testing."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 2 - B2B Portal: Partners use their own IdPs. A central broker accepts SAML or OIDC, normalizes subject, tenant and assurance, and issues internal token. The portal uses OIDC, while API Gateway validates access tokens and enforces quotas per organization. Partners are permitted by allowlist and trust agreement."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3 - Workload federation: an external cloud pipeline obtains short identity by environment attestation and exchanges this assertion for a corporate domain token. No permanent secrets are stored. The audience is restricted to the deployment service and the token expires within a few minutes."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Design the sessions of an SSO flow with two applications. 2) Compare SAML metadata and Discovery OIDC. 3) Simulate key rotation with overlap. 4) Create a matrix of external claims and internal roles. 5) Investigate a login loop using state, cookies and logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Identity Federation transfers trust between domains; Single Sign-On reuses a central authentication to reduce repeated challenges. The concepts are related, but not equivalent. Provisioning, delegation, and authorization remain separate responsibilities."
  },
  {
    "kind": "paragraph",
    "text": "The federated architecture is supported by issuers, consumer applications, brokers, metadata, keys, certificates, claims and policies. Each application maintains a local session, while the IdP maintains a central session. Logout and revocation need to coordinate multiple independent layers."
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 and OpenID Connect offer mature mechanisms for federation. The choice depends on the ecosystem, type of application and operational capacity. Identity brokers simplify integrations and translate protocols, but concentrate risk and availability."
  },
  {
    "kind": "paragraph",
    "text": "Security requires strict validation of issuer, audience, signature, time, nonce, InResponseTo and context. External claims must be mapped, not accepted as local privileges. Governance, observability, high availability and lifecycle management determine the actual quality of the federation."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "With the fundamentals of identity, authentication and federation consolidated, the next chapter begins the platform layer: API Gateways, their data and control planes, architectural responsibilities and role in API security and governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Federation and SSO checklist",
    "id": "federation-and-sso-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The trust domains, issuers and consumer applications are inventoried.",
      "Issuer, audience, endpoints and identifiers are validated accurately.",
      "Metadata and keys have trusted origin, cache, and rotation with overlap.",
      "External claims are minimized, normalized and mapped to internal concepts.",
      "Account linking requires controlled proof and does not rely solely on email.",
      "The policy defines MFA, step-up, auth_time, and guarantee levels per journey.",
      "IdP session, application session and tokens have coherent lifetimes.",
      "Local logout, central logout and token revocation are documented separately.",
      "Brokers have high availability, tenant segregation and key protection.",
      "B2B federations have owner, incident contact, offboarding and review date.",
      "Gateways remove untrusted identity headers and propagate only normalized claims.",
      "Logs and metrics allow you to correlate login, issuance, validation, session and API access."
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
      "Differentiate between federated identity, SSO, provisioning and delegation.",
      "Explain why SSO does not mean a single technical session.",
      "Compare direct trust and hub-and-spoke with identity broker.",
      "Describe how SAML and OIDC represent issuer, audience, and session.",
      "Explain why account linking via email can be insecure.",
      "Propose a step-up flow for a sensitive financial transaction.",
      "Differentiate between local logout, IdP logout and access token revocation.",
      "Design a multitenant B2B federation with partner allowlist.",
      "Explain how workload identity federation eliminates static secrets.",
      "List the evidence needed to diagnose a login loop."
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
    "caption": "Table 7 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Account linking",
        "Controlled association between external identities and a local account."
      ],
      [
        "attribute authority",
        "Reliable source of additional attributes about a subject."
      ],
      [
        "Federation",
        "Trust relationship between identity domains."
      ],
      [
        "Home realm discovery",
        "Process of selecting the appropriate IdP for the user or tenant."
      ],
      [
        "Identity broker",
        "Intermediary that normalizes trust, protocols, claims and sessions."
      ],
      [
        "IdP",
        "Identity Provider that authenticates the subject and issues assertions."
      ],
      [
        "JIT provisioning",
        "Local account creation during the first federated login."
      ],
      [
        "Pairwise identifier",
        "Different identifier of the same user for each customer or sector."
      ],
      [
        "Relying Party",
        "OIDC application that trusts the OpenID Provider."
      ],
      [
        "Service Provider",
        "SAML application that consumes assertions from the IdP."
      ],
      [
        "Single Logout",
        "Coordination of closing sessions between participants."
      ],
      [
        "Single Sign-On",
        "Experience accessing multiple applications with authentication reuse."
      ],
      [
        "Step-up authentication",
        "Additional authentication to raise the level of assurance."
      ],
      [
        "Trust domain",
        "Administrative domain that controls identities and trust policies."
      ],
      [
        "Workload federation",
        "Identity exchange between environments without permanent secret."
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
      "OASIS. Security Assertion Markup Language (SAML) V2.0 Core, Bindings, Profiles and Metadata.",
      "OpenID Foundation. OpenID Connect Core 1.0.",
      "OpenID Foundation. OpenID Connect Discovery 1.0.",
      "OpenID Foundation. RP-Initiated Logout, Front-Channel Logout and Back-Channel Logout.",
      "IETF. RFC 8693 - OAuth 2.0 Token Exchange.",
      "IETF. RFC 7644 - System for Cross-domain Identity Management: Protocol.",
      "NIST. Digital Identity Guidelines.",
      "OWASP. Authentication, SAML Security and OAuth Security Cheat Sheets.",
      "Microsoft Learn. Identity Federation, external identities and workload identity federation.",
      "SPIFFE Project. SPIFFE and SPIRE specifications and documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Protocols, browsers, cookie policies and identity products evolve. Before deploying federation, validate the official documentation of the version used, the allowed algorithms, the logout behavior and the capabilities of the gateway or broker in the authorized environment."
  }
];
