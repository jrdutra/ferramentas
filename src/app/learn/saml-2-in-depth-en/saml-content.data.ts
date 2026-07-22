import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const SAML_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "SAML federation: identity authenticated in one domain and consumed in another"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/overview.svg",
    "alt": "SAML federation between user, Service Provider, Identity Provider and local session",
    "caption": "Opening Figure - SAML connects identity domains through XML messages and explicit trust relationships."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "SAML transports security assertions between entities that have already established metadata, keys, and trust rules."
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
    "text": "Previous chapters studied OAuth 2.0, OpenID Connect, and the JOSE family. These standards dominate modern applications and APIs, but they have not completely replaced the enterprise federation mechanisms built before them. SAML 2.0 remains widely present in corporate portals, SaaS systems, academic environments, governments, banks, and cross-organization integrations that require browser-based Single Sign-On and standardized attribute exchange."
  },
  {
    "kind": "paragraph",
    "text": "SAML, short for Security Assertion Markup Language, is an XML framework for communicating authentication assertions, attributes, and authorization decisions. Its best-known use is the Web Browser SSO Profile, in which an Identity Provider authenticates the user and sends a signed SAML Assertion to the Service Provider. However, understanding the visual flow of redirection alone is insufficient. Security depends on bindings, metadata, certificates, XML signature validation, temporal conditions, audience, recipient, correlation and replay protection."
  },
  {
    "kind": "paragraph",
    "text": "Unlike a simple bearer token transported directly to an API, the SAML response is typically consumed by a specific Service Provider endpoint called an Assertion Consumer Service. The SP validates the message and creates its own local session. This separation explains why SAML is especially suited to federated login for web applications, but less natural for delegated authorization of APIs and service-to-service calls."
  },
  {
    "kind": "paragraph",
    "text": "This chapter builds a complete mental model of SAML 2.0: actors, assertions, protocol messages, bindings, profiles, metadata, NameID, attributes, signature, encryption, Single Logout, federation and integration with gateways. The focus is to enable secure design, review and troubleshooting, without reducing the standard to copying certificates between two administrative consoles."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Always separate four layers: assertion, protocol message, binding and profile. Then, follow the trust relationship described in metadata and validate each security restriction. This decomposition makes SAML much less confusing and avoids mixing transport, identity and session."
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
      "Explain the responsibilities of principal, Identity Provider, Service Provider, and SAML authorities.",
      "Distinguish assertion, protocol message, binding, profile and metadata.",
      "Describe authentication statements, attributes and authorization decisions.",
      "Detail the Web Browser SSO Profile in SP-initiated and IdP-initiated modes.",
      "Interpret AuthnRequest, Response, Assertion, Subject, Conditions and SubjectConfirmation.",
      "Compare HTTP-Redirect, HTTP-POST, HTTP-Artifact and SOAP bindings.",
      "Understand entityID, ACS, SSO Service, SLO Service, KeyDescriptor and certificate rotation.",
      "Apply secure XML Signature validation and recognize signature wrapping and replay.",
      "Understand NameID, attributes, identity mapping, SLO and IdP discovery.",
      "Compare SAML 2.0 with OpenID Connect and recognize the role of identity gateways and brokers."
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
      "19.1 SAML 2.0 Fundamentals and Components",
      "19.2 Assertions and statements",
      "19.3 Protocol messages",
      "19.4 Web Browser SSO Profile",
      "19.5 SP-initiated and IdP-initiated SSO",
      "19.6 AuthnRequest in depth",
      "19.7 Response and Assertion in depth",
      "19.8 Conditions, SubjectConfirmation and correlation",
      "19.9 SAML Bindings",
      "19.10 Metadata and trust",
      "19.11 XML Signature and encryption",
      "19.12 NameID, attributes and mapping",
      "19.13 Sessions, SLO and discovery",
      "19.14 SAML x OIDC, gateways, security and troubleshooting",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.1 SAML 2.0 Fundamentals and Components",
    "id": "19-1-saml-2-0-fundamentals-and-components"
  },
  {
    "kind": "paragraph",
    "text": "SAML organizes the federation into entities with well-defined roles. The principal is normally the user. The Identity Provider, or IdP, authenticates this principal and issues claims. The Service Provider, or SP, offers the application and trusts the assertions produced by the IdP according to a previously configured relationship. In broader scenarios, there may also be Attribute Authorities, Authentication Authorities and Policy Decision Points."
  },
  {
    "kind": "paragraph",
    "text": "The pattern is made up of complementary pieces. Core defines assertions and protocol messages. Bindings describe how these messages are transported over protocols such as HTTP or SOAP. Profiles combine assertions, messages and bindings to solve concrete use cases, such as browser SSO or Single Logout. Metadata describes entities, endpoints, supported bindings, identifiers, certificates, and other information necessary for interoperability."
  },
  {
    "kind": "paragraph",
    "text": "The trust relationship does not arise because a message contains a certificate. The SP must know in advance the entityID of the IdP and the keys accepted for signing. Likewise, the IdP needs to know the entityID of the SP, its ACS endpoints and, depending on the policy, the keys used by the SP. Metadata is the standard mechanism for distributing this information, but obtaining and updating it also needs to be authenticated and governed."
  },
  {
    "kind": "table",
    "caption": "Table 1 - SAML layers must be analyzed separately.",
    "headers": [
      "Concept",
      "Responsibility",
      "Example"
    ],
    "rows": [
      [
        "Assertion",
        "Contains statements about a subject.",
        "Authenticated user with MFA and corporate attributes."
      ],
      [
        "protocol",
        "Coordinates SAML requests and responses.",
        "AuthnRequest and Response."
      ],
      [
        "Binding",
        "Defines the transport of the message.",
        "HTTP-Redirect or HTTP-POST."
      ],
      [
        "Profile",
        "Combines rules for a use case.",
        "Web Browser SSO Profile."
      ],
      [
        "Metadata",
        "Publishes identity, endpoints, and keys.",
        "EntityDescriptor of the IdP or SP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.2 Assertions and statements",
    "id": "19-2-assertions-and-statements"
  },
  {
    "kind": "paragraph",
    "text": "A SAML Assertion is an XML structure issued by an authority and related to a subject. It has identifier, version, issue time, issuer and zero or more statements. It may also contain a signature, conditions and information on how the subject must confirm its identity to the recipient."
  },
  {
    "kind": "paragraph",
    "text": "The Authentication Statement records that an authority authenticated the subject at a given time and context. It can include SessionIndex, SessionNotOnOrAfter and AuthnContextClassRef, elements used by applications that need to distinguish password, MFA, certificate or other methods. The Attribute Statement carries name and value pairs, such as internal identifier, email, organizational unit, or groups."
  },
  {
    "kind": "paragraph",
    "text": "The Authorization Decision Statement represents an authorization decision about a resource, but is less common in modern Web SSO. In practice, many SPs use authentication attributes and context to power their own local policies. This choice preserves domain autonomy, but requires clear agreements on semantics, cardinality, namespaces, and handling of missing attributes."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/figure-01-assertion-anatomy.svg",
    "alt": "Anatomy of a SAML Assertion with issuer, subject, conditions, statements and signature",
    "caption": "Figure 1 - A secure assertion combines origin, subject, restrictions, statements and cryptographic protection."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Statements carry different semantics within the assertion.",
    "headers": [
      "statement",
      "Main statement",
      "Recurring use"
    ],
    "rows": [
      [
        "AuthnStatement",
        "How and when the user was authenticated.",
        "SSO, step-up and audit."
      ],
      [
        "AttributeStatement",
        "Attributes associated with the subject.",
        "Logical provisioning and local authorization."
      ],
      [
        "AuthzDecisionStatement",
        "Decision on action on appeal.",
        "Specific and legacy integrations."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.3 Protocol messages",
    "id": "19-3-protocol-messages"
  },
  {
    "kind": "paragraph",
    "text": "SAML protocol messages coordinate interactions between entities. AuthnRequest asks for authentication; Response carries one or more assertions or an error status; LogoutRequest and LogoutResponse participate in Single Logout; ArtifactResolve and ArtifactResponse retrieve messages by reference; AttributeQuery and AuthnQuery query specialized authorities."
  },
  {
    "kind": "paragraph",
    "text": "Each message has ID, Version, IssueInstant and, depending on the type, Destination, Consent, InResponseTo and other attributes. These fields are not decorative. The ID allows for correlation and replay protection. Destination restricts the expected endpoint. InResponseTo links a response to a previously issued request. IssueInstant assists with temporal validation and investigation of misaligned clocks."
  },
  {
    "kind": "paragraph",
    "text": "The Response status needs to be interpreted before the assertion. Success indicates that the main processing is complete, but does not override all validations. Other codes may represent requester error, reply error, authentication failed, unsupported method, unknown user, or lack of consent."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de AuthnRequest\n<samlp:AuthnRequest\n  ID=\"_a12f...\"\n  Version=\"2.0\"\n  IssueInstant=\"2026-07-15T18:20:00Z\"\n  Destination=\"https://idp.empresa.example/sso\"\n  AssertionConsumerServiceURL=\"https://app.example/saml/acs\">\n  <saml:Issuer>https://app.example/saml</saml:Issuer>\n  <samlp:NameIDPolicy AllowCreate=\"true\"/>\n</samlp:AuthnRequest>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.4 Web Browser SSO Profile",
    "id": "19-4-web-browser-sso-profile"
  },
  {
    "kind": "paragraph",
    "text": "The Web Browser SSO Profile is the most well-known use of SAML 2.0. The browser acts as an intermediary between SP and IdP. When the user accesses a protected resource, the SP creates an AuthnRequest and redirects or sends the browser to the IdP. The IdP authenticates the user, creates the Response, signs the assertion or the response itself according to the agreement and returns the result to the SP's Assertion Consumer Service."
  },
  {
    "kind": "paragraph",
    "text": "The ACS receives the message, performs structural, cryptographic and semantic validations and, if everything is correct, creates a local application session. SAML does not define how this local session should be implemented. It may use a secure cookie, server-side session or other mechanism. This means that post-login security also depends on classic controls such as Secure, HttpOnly, SameSite, expiration, rotation and fixation protection."
  },
  {
    "kind": "paragraph",
    "text": "RelayState preserves application state, such as the resource originally requested. It should not be treated as a trusted authorization channel and needs to be protected against open redirect and tampering. The implementation must only accept predicted targets or opaque values stored server-side."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/figure-02-sp-initiated-sso.svg",
    "alt": "Web Browser SSO flow initiated by Service Provider",
    "caption": "Figure 2 - In SP-initiated SSO, the Response must be correlated to the original AuthnRequest."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.5 SP-initiated and IdP-initiated SSO",
    "id": "19-5-sp-initiated-and-idp-initiated-sso"
  },
  {
    "kind": "paragraph",
    "text": "In SP-initiated SSO, the flow starts at the Service Provider. The SP creates an AuthnRequest, registers its ID, and expects a correlated response. This model allows better control of context, destination and return to the requested resource. InResponseTo validation mitigates cold-response attacks and helps associate authentication with the correct transaction."
  },
  {
    "kind": "paragraph",
    "text": "In IdP-initiated SSO, the flow starts in an IdP portal or application catalog. The IdP sends an unsolicited Response to the SP's ACS. This mode is convenient for corporate portals, but it loses correlation with an AuthnRequest. The implementation needs to compensate for this reduction in context with strict controls on issuer, audience, recipient, time, replay and allowed destinations."
  },
  {
    "kind": "paragraph",
    "text": "Some applications support both modes. In this situation, the validation code must clearly distinguish between requested and unsolicited responses. It's not safe to simply make InResponseTo optional in all cases. The policy needs to define when IdP-initiated is accepted, for which IdPs, ACSs and business flows."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The two modes require different validation policies.",
    "headers": [
      "Appearance",
      "SP-initiated",
      "IdP-initiated"
    ],
    "rows": [
      [
        "Home",
        "User accesses the SP.",
        "User leaves the IdP portal."
      ],
      [
        "AuthnRequest",
        "It exists and must be tracked.",
        "Normally absent."
      ],
      [
        "Correlation",
        "InResponseTo and local state.",
        "There is no original request."
      ],
      [
        "Additional risk",
        "Open redirect and request tampering.",
        "Replay and unsolicited response."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Table 3 - The two modes require different validation policies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.6 AuthnRequest in depth",
    "id": "19-6-authnrequest-in-depth"
  },
  {
    "kind": "paragraph",
    "text": "The AuthnRequest communicates to the IdP which SP requests authentication and, optionally, which characteristics it wants. Issuer identifies the SP. Destination points to the IdP endpoint. AssertionConsumerServiceURL or AssertionConsumerServiceIndex selects the ACS. ProtocolBinding can indicate how the Response should return. NameIDPolicy requires identifier format and may allow creation of a new pseudonym."
  },
  {
    "kind": "paragraph",
    "text": "ForceAuthn requests the IdP to reauthenticate the user even if an SSO session exists. IsPassive asks that the IdP not interact with the user; If silent authentication cannot be performed, the response should indicate appropriate failure. RequestedAuthnContext expresses requirements about authentication method or strength, but its interpretation needs to be aligned between the parties."
  },
  {
    "kind": "paragraph",
    "text": "Signing AuthnRequest may be required by policy, especially when the SP sends dynamic ACS, requests ForceAuthn, or operates in federations with strong requirements. In Redirect binding, the signature occurs over URL parameters and not over a ds:Signature element within the XML. In POST binding, the message can carry XML Signature. Confusing these two forms is a common cause of failure."
  },
  {
    "kind": "table",
    "caption": "Table 4 - AuthnRequest controls more than a simple redirect.",
    "headers": [
      "Field",
      "Function",
      "Validation or policy"
    ],
    "rows": [
      [
        "Issuer",
        "Identifies the requesting SP.",
        "Must match trusted metadata."
      ],
      [
        "Destination",
        "IdP endpoint.",
        "Exact comparison with the received endpoint."
      ],
      [
        "ACS URL/Index",
        "Response destination.",
        "Only values recorded in metadata."
      ],
      [
        "ForceAuthn",
        "Requests new authentication.",
        "Apply only as per policy."
      ],
      [
        "RequestedAuthnContext",
        "Authentication requirement.",
        "Map classes and comparison correctly."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.7 Response and Assertion in depth",
    "id": "19-7-response-and-assertion-in-depth"
  },
  {
    "kind": "paragraph",
    "text": "The Response is the protocol message delivered to the SP. It has Issuer, Status, Destination, InResponseTo and can contain assertions. In many profiles, Response and Assertion can be signed in different combinations. The SP policy must define exactly which signature is required and on which element, avoiding inconsistently accepting partially protected messages."
  },
  {
    "kind": "paragraph",
    "text": "The Assertion contains the statements consumed by the application. The SP must find the assertion authenticated by a validated signature, and not simply the first assertion with a given XPath. This rule is central against XML Signature Wrapping, an attack in which a valid signed element is moved and another malicious element is placed in the location that the application processes."
  },
  {
    "kind": "paragraph",
    "text": "A full validation also checks Issuer, Version, IssueInstant, Conditions, AudienceRestriction, SubjectConfirmationData, Recipient, NotOnOrAfter, InResponseTo, AuthnStatement, and required context. After validation, attributes must be mapped by explicit rules. The fact that an XML has been signed does not make all values suitable for the application."
  },
  {
    "kind": "code",
    "text": "Estrutura simplificada de Response e Assertion\n<samlp:Response Destination=\"https://app.example/saml/acs\"\n                    InResponseTo=\"_a12f...\">\n  <saml:Issuer>https://idp.example/metadata</saml:Issuer>\n  <samlp:Status>...</samlp:Status>\n  <saml:Assertion ID=\"_assertion123\">\n    <saml:Subject>...</saml:Subject>\n    <saml:Conditions>...</saml:Conditions>\n    <saml:AuthnStatement>...</saml:AuthnStatement>\n    <saml:AttributeStatement>...</saml:AttributeStatement>\n  </saml:Assertion>\n</samlp:Response>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.8 Conditions, SubjectConfirmation and correlation",
    "id": "19-8-conditions-subjectconfirmation-and-correlation"
  },
  {
    "kind": "paragraph",
    "text": "Conditions restrict when and where the assertion can be used. NotBefore defines the starting instant, and NotOnOrAfter defines a unique limit. AudienceRestriction indicates the entities for which the assertion was issued. The application must compare the audience with its expected identifier and use small and controlled clock tolerance, without transforming clock skew into a wide replay window."
  },
  {
    "kind": "paragraph",
    "text": "SubjectConfirmation typically uses the bearer method in Web Browser SSO. SubjectConfirmationData carries Recipient, NotOnOrAfter and InResponseTo. Recipient needs to match the ACS actually used. InResponseTo must point to a pending AuthnRequest when the flow was initiated by the SP. An already processed response must be marked as consumed to prevent replay."
  },
  {
    "kind": "paragraph",
    "text": "Correlation also involves RelayState, temporary cookies, and local state. These elements do not replace each other. InResponseTo relates the Response to the AuthnRequest; RelayState returns application context; the SP temporary session stores information about the transaction. A robust design maintains all links and removes the state after use."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/figure-03-validation-pipeline.svg",
    "alt": "Secure validation pipeline for a SAMLResponse",
    "caption": "Figure 3 - Signing is a pipeline step, not complete validation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.9 SAML Bindings",
    "id": "19-9-saml-bindings"
  },
  {
    "kind": "paragraph",
    "text": "Binding defines how a SAML message is mapped to another protocol. In HTTP-Redirect binding, the message is normally compressed with DEFLATE, encoded in Base64 and placed in the query string. It's suitable for small AuthnRequests, but has URL limits and specific signature rules around SAMLRequest, RelayState, and SigAlg."
  },
  {
    "kind": "paragraph",
    "text": "In HTTP-POST binding, the Base64 message is sent in an HTML form, usually by auto-submit. It is the most common binding to transport SAMLResponse to ACS. As the browser delivers content from one domain to another, the endpoint needs to accept POST, protect local session and fully validate the message before any redirection."
  },
  {
    "kind": "paragraph",
    "text": "HTTP-Artifact only sends a short reference via the browser. The SP exchanges the artifact for the actual message in a back-channel, typically with SOAP. This reduces assertion exposure to the user agent, but adds availability, authentication and latency to the artifact resolution service. SOAP also appears in back-channel queries and Single Logout."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/figure-04-bindings.svg",
    "alt": "SAML Bindings carrying the same message over different channels",
    "caption": "Figure 4 - Binding is transport; the profile defines how this transport participates in the use case."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Each binding has its own format and operational risks.",
    "headers": [
      "Binding",
      "Typical usage",
      "Technical point"
    ],
    "rows": [
      [
        "HTTP-Redirect",
        "AuthnRequest in the browser.",
        "DEFLATE, URL encoding and parameter signature."
      ],
      [
        "HTTP-POST",
        "SAMLResponse for ACS.",
        "HTML form with Base64 message."
      ],
      [
        "HTTP-Artifact",
        "Front-channel reference.",
        "Message resolution via back-channel."
      ],
      [
        "SOAP",
        "Consultations and direct exchange.",
        "Server-to-server channel with XML SOAP."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.10 Metadata and trust",
    "id": "19-10-metadata-and-trust"
  },
  {
    "kind": "paragraph",
    "text": "SAML Metadata describes entities through EntityDescriptor. An entityID is a stable identifier, often a URI, but does not need to be an accessible URL. Role descriptors inform whether the entity acts as an IdP, SP or other authority. Endpoints include binding, location, index, and preference. KeyDescriptor publishes certificates associated with signing or encryption."
  },
  {
    "kind": "paragraph",
    "text": "SP metadata usually contains ACS endpoints, NameID formats and certificates. IdP metadata contains SingleSignOnService, SingleLogoutService, certificates, and other resources. The consumer must only accept endpoints and keys from trusted sources. Allowing arbitrary ACS coming only from AuthnRequest can turn the IdP into a transmitter of assertions for an attacker."
  },
  {
    "kind": "paragraph",
    "text": "Certificate rotation requires overlap. The new certificate must be published before it can be used; the old one remains while messages and caches can still depend on it. Expired certificate in metadata should not be treated simplistically: the use of X.509 in SAML is often as a key container, but corporate policies may require additional validations. The important thing is to have explicit and auditable rules."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/saml-2-in-depth/en/figure-05-metadata-trust.svg",
    "alt": "SP and IdP metadata establishing trusted endpoints, identifiers and keys",
    "caption": "Figure 5 - Metadata reduces manual configuration, but needs reliable distribution chain."
  },
  {
    "kind": "code",
    "text": "Exemplo simplificado de metadata de SP\n<md:EntityDescriptor entityID=\"https://app.example/saml\">\n  <md:SPSSODescriptor AuthnRequestsSigned=\"true\"\n      protocolSupportEnumeration=\"urn:oasis:names:tc:SAML:2.0:protocol\">\n    <md:KeyDescriptor use=\"signing\">...</md:KeyDescriptor>\n    <md:AssertionConsumerService\n       Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\"\n       Location=\"https://app.example/saml/acs\"\n       index=\"0\" isDefault=\"true\"/>\n  </md:SPSSODescriptor>\n</md:EntityDescriptor>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.11 XML Signature and encryption",
    "id": "19-11-xml-signature-and-encryption"
  },
  {
    "kind": "paragraph",
    "text": "XML Signature protects the integrity and authenticity of XML elements. It references an element by ID, applies transforms, canonicalization and digest and produces SignatureValue. Canonicalization exists because semantically equivalent XML can have differences in whitespace, namespaces, and attribute ordering. The implementation must use mature libraries and a strict policy on algorithms, transforms and references."
  },
  {
    "kind": "paragraph",
    "text": "The XML Signature Wrapping attack exploits divergence between the verified element and the consumed element. The core defense is to resolve the signed reference securely, require unique IDs, reject unexpected structures, and process exactly the authenticated node. Generic XPath queries like looking for the first Assertion in the document are dangerous when they are not tied to cryptographic verification."
  },
  {
    "kind": "paragraph",
    "text": "XML Encryption allows you to encrypt the Assertion, the NameID or attributes. The IdP uses the SP's public encryption key, and the SP decrypts with its private key. Signing and encryption solve different problems: encryption protects confidentiality along the way and at intermediaries; signature protects integrity and origin. Even an encrypted assertion needs to be validated after decryption."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Cryptographic controls are complementary.",
    "headers": [
      "Cryptographic control",
      "Protects",
      "Does not replace"
    ],
    "rows": [
      [
        "Response Signature",
        "Protocol and destination message.",
        "Validation of assertion and conditions."
      ],
      [
        "Assertion Signature",
        "Declarations and restrictions.",
        "Session correlation and protection."
      ],
      [
        "EncryptedAssertion",
        "Content confidentiality.",
        "Authenticity and audience."
      ],
      [
        "TLS",
        "Channel between participants.",
        "End-to-end signature of the message."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Implementation Rule"
  },
  {
    "kind": "paragraph",
    "text": "Never implement XML Signature manually with string concatenation or improvised XPath. Use specialized library, maintain hardened XML parser, disable external entities and validate structure, IDs and references before consuming attributes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.12 NameID, attributes and identity mapping",
    "id": "19-12-nameid-attributes-and-identity-mapping"
  },
  {
    "kind": "paragraph",
    "text": "NameID identifies the subject in standardized formats. Persistent produces a stable and generally opaque identifier. Transient creates a temporary value. EmailAddress uses email, but may be unsuitable as an immutable key. Unspecified depends on bilateral agreement. The choice must consider privacy, correlation between SPs, data changes and account lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "Attributes are identified by Name and, optionally, NameFormat and FriendlyName. The SP should not rely solely on informal names such as role or group without a contract. It is necessary to define namespace, type, cardinality, authoritative origin and meaning. A directory group may not equate to a business permission, and automatic mappings may inappropriately elevate privileges."
  },
  {
    "kind": "paragraph",
    "text": "Account linking deserves care. When the SP receives a federated subject, it needs to link it to a local account. Linking via email only may allow takeover if different providers issue the same address or if email verification is not equivalent. The recommended key typically combines issuer and stable subject identifier, with controlled processes for migration."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Identifiers and attributes need a contract, not just valid XML.",
    "headers": [
      "Format/element",
      "Feature",
      "Caution"
    ],
    "rows": [
      [
        "persistent NameID",
        "Stable and opaque by relation.",
        "Preserve link during migration."
      ],
      [
        "transient NameID",
        "Temporary and non-correlated.",
        "Do not use as a permanent key."
      ],
      [
        "emailAddress",
        "Readable and familiar.",
        "It may change and not be globally unique."
      ],
      [
        "attribute",
        "Additional value on the subject.",
        "Define semantics, origin and cardinality."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.13 Sessions, Single Logout and discovery",
    "id": "19-13-sessions-single-logout-and-discovery"
  },
  {
    "kind": "paragraph",
    "text": "There are at least two distinct sessions: the user session on the IdP and the local session on the SP. The AuthnStatement can contain SessionIndex and SessionNotOnOrAfter, but the SP decides how to create and expire its cookie. Terminating the IdP session does not automatically terminate all local sessions unless Single Logout is supported and works across the chain."
  },
  {
    "kind": "paragraph",
    "text": "Single Logout coordinates LogoutRequest and LogoutResponse between participants. You can use front-channel through the browser or back-channel. In practice, partial failures are common: an unavailable SP, blocked cookie or timeout can leave sessions active. Therefore, SLO should not be treated as a substitute for short sessions, local revocation and own risk controls."
  },
  {
    "kind": "paragraph",
    "text": "IdP Discovery appears when an SP accepts multiple providers. The choice can be made by user domain, portal, discovery cookie or dedicated service. The interface should avoid phishing and confusing selection. In broad federations, aggregated metadata and discovery services need to be operated with signature, expiration, filters and governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.14 SAML 2.0 x OpenID Connect",
    "id": "19-14-saml-2-0-x-openid-connect"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 and OpenID Connect resolve federated authentication, but they have different models and ecosystems. SAML uses XML, assertions, bindings and browser profiles. OIDC uses OAuth 2.0, JSON, JWT, HTTP and Discovery/JWKS endpoints. OIDC tends to fit better into mobile applications, SPAs, APIs and modern architectures; SAML remains very strong in enterprise SaaS and legacy B2B integrations."
  },
  {
    "kind": "paragraph",
    "text": "The comparison should not be reduced to old versus new. SAML has rich metadata, mature federations, and consolidated interoperability across many enterprise products. OIDC offers better alignment with APIs, modern libraries, and JSON tokens. An organization can operate both for many years, using an identity broker to translate protocols and centralize policies."
  },
  {
    "kind": "paragraph",
    "text": "Translation between SAML and OIDC is not mere syntactic conversion. NameID, subject, attributes, AuthnContext, acr, amr, session and logout have different semantics. The broker needs explicit mappings, trust policy, and observability so that the authentication guarantee is not degraded during the transformation."
  },
  {
    "kind": "table",
    "caption": "Table 8 - The standards overlap in objective, but not in all details.",
    "headers": [
      "Appearance",
      "SAML 2.0",
      "OpenID Connect"
    ],
    "rows": [
      [
        "Format",
        "XML and XML Signature.",
        "JSON, JWT and JOSE."
      ],
      [
        "Dominant use",
        "Corporate Web SSO and B2B federation.",
        "Web, mobile apps, APIs and modern identity."
      ],
      [
        "Discovery",
        "SAML metadata.",
        "Discovery metadata and JWKS."
      ],
      [
        "Identifier",
        "NameID and attributes.",
        "sub and claims."
      ],
      [
        "Session and logout",
        "SLO for SAML messages.",
        "RP-Initiated and OIDC logout channels."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.15 SAML in API Gateways and Identity Brokers",
    "id": "19-15-saml-in-api-gateways-and-identity-brokers"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways typically secure APIs with OAuth, JWT, mTLS tokens, or technical credentials. SAML can appear in developer portal authentication, administrative console login, or as an identity broker input protocol. When a SAML application needs to call APIs, the common pattern is to exchange the federated session with an appropriate access token, and not send the SAML Assertion directly to all backends."
  },
  {
    "kind": "paragraph",
    "text": "Some gateways can validate SAML assertions, extract attributes and transform them into context or internal tokens. This capability must be used with care: the gateway needs to validate signature, issuer, audience, recipient, time and replay with the same rigor as an SP. You should also avoid turning generic attributes into broad privileges without explicit policy."
  },
  {
    "kind": "paragraph",
    "text": "In hybrid architectures, a broker can receive SAML from partners and issue OIDC/OAuth for modern applications. This bridge reduces the need for each API to understand XML Signature, but focuses trust on the broker. Logs must record external issuer, federated subject, authentication method, mappings and issued token, preserving end-to-end traceability."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.16 Threats and hardening",
    "id": "19-16-threats-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "The main threats include assertion replay, invalid signature or wrong element, unexpected issuer acceptance, inadequate audience, open ACS, XML Signature Wrapping, XML parser vulnerable to external entities, weak algorithms, tampered metadata, session theft, open redirect via RelayState and insecure attribute mapping."
  },
  {
    "kind": "paragraph",
    "text": "Hardening starts with IdP and SP allowlists, authenticated metadata, modern algorithms, accurate endpoint validation, unique IDs, replay caches, tight clock tolerance, and fail closed. The XML parser must disable DTD and external entities. The application should only process signed elements and reject messages with ambiguous structure, duplicate signatures or unexpected references."
  },
  {
    "kind": "paragraph",
    "text": "The operation also matters. Certificates need inventory, alerts, and rotation with overlap. Clocks must use reliable synchronization. Attribute and NameID changes require regression testing. Logs should not store complete assertions unnecessarily, because they may contain personal data and authentication information."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Most failures occur in validation and integration, not in the concept of SAML.",
    "headers": [
      "Threat",
      "Flaw exploited",
      "Control"
    ],
    "rows": [
      [
        "Replay",
        "Valid assertion reused.",
        "ID caching and short time windows."
      ],
      [
        "Signature wrapping",
        "Verified element differs from consumed one.",
        "Process exactly the referenced and signed node."
      ],
      [
        "ACS injection",
        "Destiny controlled by the attacker.",
        "Only endpoints registered in metadata."
      ],
      [
        "XXE",
        "Parser resolves external entity.",
        "DTD and external entities disabled."
      ],
      [
        "Privilege mapping",
        "Attribute becomes excessive permission.",
        "Explicit mapping and least privilege."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.17 Evidence-driven troubleshooting",
    "id": "19-17-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting must identify the exact point in the flow: creation of the AuthnRequest, redirection, authentication at the IdP, issuance of the Response, delivery to the ACS, cryptographic validation, attribute mapping or session creation. Browser, gateway, and application errors may appear similar, so request IDs, timestamps, entityIDs, and endpoints are essential."
  },
  {
    "kind": "paragraph",
    "text": "Messages such as invalid signature can result from incorrect certificate, canonicalization, altered XML, disallowed algorithm, or checking the wrong element. Audience invalid points to divergent entityID. Recipient mismatch indicates different ACS. Response expired could be a misaligned clock, long queue or small window. InResponseTo unknown points to lost state, multiple nodes not sharing a session, or unsolicited response."
  },
  {
    "kind": "paragraph",
    "text": "Capture tools must be used in authorized environments and with care not to expose assertions. The ideal diagnosis compares active metadata, request issued, response received, selected certificate and application configuration. In clusters, check affinity, request ID storage, and clock for all nodes."
  },
  {
    "kind": "table",
    "caption": "Table 10 - SAML diagnostics requires correlation between message, metadata and local state.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "Invalid signature",
        "Wrong key, changed XML, algorithm or reference.",
        "Certificate, SignedInfo, Reference URI and library logs."
      ],
      [
        "Audience mismatch",
        "entityID different from expected.",
        "AudienceRestriction and SP configuration."
      ],
      [
        "InResponseTo unknown",
        "Lost status or unsolicited response.",
        "Request ID, temporary cookie and cluster node."
      ],
      [
        "Assertion expired",
        "Clock skew or excessive delay.",
        "NotBefore, NotOnOrAfter and hosts time."
      ],
      [
        "User without permission",
        "Missing attribute or incorrect mapping.",
        "AttributeStatement and local policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "19.18 Case studies and labs",
    "id": "19-18-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1: A company integrates its corporate IdP with an external SaaS. SP requires persistent NameID and specific groups. The team defines two-sided metadata, signing certificates, attribute mapping, rotation window, and multi-unit user testing. The project initially failed because the email was used as an immutable key; the fix adopts stable identifier and controlled migration."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2: a banking portal accepts partners via SAML and converts the identity into internal tokens for APIs. The broker validates the assertion, applies issuer policy and AuthnContext, maps the external subject to a partner application and issues access token with restricted audience. The gateway never receives the original assertion on the backends, reducing XML exposure and centralizing federation."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3: An SP cluster experiences intermittent InResponseTo failures. The cause is local storage of the AuthnRequest on each node without shared affinity or session. The browser starts at one node and returns to another. The fix uses distributed storage of pending requests and maintains replay cache throughout the validity window."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Examine IdP and SP metadata and identify entityID, ACS, SSO, SLO and certificates. 2) Decode an AuthnRequest and a Response from the laboratory environment. 3) List all validations in addition to the signature. 4) Simulate certificate rotation with overlapping period. 5) Compare a SAML flow with Authorization Code + OIDC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 is an XML federation framework based on assertions, protocol messages, bindings, profiles and metadata. Its most common use case is Web Browser SSO between an Identity Provider and a Service Provider. The IdP authenticates the principal, issues claims, and the SP validates the message before creating its own local session."
  },
  {
    "kind": "paragraph",
    "text": "Security depends on much more than a valid signature. Issuer, audience, recipient, destination, InResponseTo, time, SubjectConfirmation, replay, XML structure and metadata need to be validated coherently. XML Signature Wrapping and insecure parsing demonstrate why mature libraries and effectively signed element processing are indispensable."
  },
  {
    "kind": "paragraph",
    "text": "SAML remains relevant in enterprise and B2B federations, while OpenID Connect is a better fit for modern applications and APIs. Identity brokers enable coexistence and translation, but need to preserve semantics and traceability. On API platforms, SAML typically authenticates users to portals or enters the broker, which then issues appropriate tokens to the APIs."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 20 will delve deeper into Identity Federation and Single Sign-On as an architecture, comparing trust domains, brokers, home realm discovery, provisioning, lifecycle and coexistence between SAML, OpenID Connect and other mechanisms."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Implementation and review checklist",
    "id": "implementation-and-review-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "EntityIDs, endpoints, and bindings come from trusted, versioned metadata.",
      "AuthnRequest IDs are unique and stored until Response correlation.",
      "ACS accepts only registered destinations and rejects messages for another recipient.",
      "The library validates XML Signature and the application consumes exactly the signed element.",
      "Issuer, audience, destination, recipient, InResponseTo and temporal conditions are checked.",
      "Processed assertions are recorded in the replay cache during the required window.",
      "XML Parser disables DTD, external entities and dangerous constructions.",
      "NameID and attributes have a semantic, cardinality and origin contract.",
      "Mappings of groups to permissions follow least privilege and have tests.",
      "Certificates have inventory, monitoring, overlay, and rollback plan.",
      "Local Session uses secure cookies and does not rely solely on Single Logout.",
      "Logs preserve correlation without storing unnecessary personal data."
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
      "Differentiate between assertion, protocol message, binding, profile and metadata.",
      "Describe the SP-initiated SSO flow and indicate where InResponseTo is validated.",
      "Explain why a valid signature is not sufficient to accept an assertion.",
      "Compare HTTP-Redirect, HTTP-POST, HTTP-Artifact and SOAP bindings.",
      "Explain the role of AudienceRestriction, Recipient and SubjectConfirmationData.",
      "Differentiate between Response signature and Assertion signature.",
      "Describe XML Signature Wrapping and the main defense rule.",
      "Propose certificate rotation without downtime.",
      "Compare persistent, transient and emailAddress NameID.",
      "Explain why SLO may partially fail.",
      "Compare SAML 2.0 and OpenID Connect in an enterprise architecture.",
      "Design a SAML to OAuth/OIDC bridge using an identity broker."
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
        "ACS",
        "Assertion Consumer Service; endpoint of the SP that receives the Response."
      ],
      [
        "Assertion",
        "XML structure with declarations about a subject."
      ],
      [
        "AttributeStatement",
        "Statement that carries attributes of the subject."
      ],
      [
        "AuthnContext",
        "Information about the authentication method or strength."
      ],
      [
        "AuthnRequest",
        "Message from the SP that requests authentication from the IdP."
      ],
      [
        "Binding",
        "Mapping SAML messages to another protocol."
      ],
      [
        "EntityID",
        "Stable identifier of a SAML entity."
      ],
      [
        "IdP",
        "Identity Provider that authenticates and issues statements."
      ],
      [
        "InResponseTo",
        "Correlation between Response and previous request."
      ],
      [
        "Metadata",
        "Entity description, roles, endpoints, bindings and keys."
      ],
      [
        "NameID",
        "Subject identifier in defined format."
      ],
      [
        "Profile",
        "Set of rules for a SAML use case."
      ],
      [
        "RelayState",
        "Application state carried by the browser flow."
      ],
      [
        "SLO",
        "Single Logout coordinated between participants."
      ],
      [
        "SP",
        "Service Provider that consumes assertions and offers the application."
      ],
      [
        "SubjectConfirmation",
        "Rules by which the subject presents the assertion."
      ],
      [
        "XML Signature Wrapping",
        "Attack that separates verified element from consumed element."
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
      "OASIS. Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Bindings for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Profiles for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Metadata for the OASIS Security Assertion Markup Language (SAML) V2.0.",
      "OASIS. Security Assertion Markup Language (SAML) V2.0 Technical Overview.",
      "OASIS. SAML V2.0 Metadata Interoperability Profile Version 1.0.",
      "W3C. XML Signature Syntax and Processing.",
      "W3C. XML Encryption Syntax and Processing.",
      "OWASP. SAML Security Cheat Sheet.",
      "NIST. Digital Identity Guidelines, when applicable to the context of authentication and federation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "SAML 2.0 is a stable standard, but products, allowed algorithms, interoperability profiles, and hardening practices continue to evolve. Before deploying, validate official documentation for the IdP, SP, gateway and library used, including signing behavior, metadata and rotation."
  }
];
