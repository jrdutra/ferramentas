import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OPEN_FINANCE_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Open Finance Brasil: consent, institutional trust and standardized APIs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/en/overview.svg",
    "alt": "Customer authorizing secure sharing between financial institutions via APIs",
    "caption": "Opening figure - The journey combines customer choice, trust between participants and standardized APIs."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The customer controls consent, while regulated participants preserve security, interoperability, evidence, and end-to-end accountability."
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
    "text": "Brazilian Open Finance is a regulated infrastructure for sharing data and financial services through APIs. Its proposal goes beyond opening banking information: the customer can authorize one institution to receive data held by another, initiate payment services and use this information in credit journeys, financial management, investments and other products. The value of the ecosystem arises from the combination of information portability, competition, innovation and control by the holder."
  },
  {
    "kind": "paragraph",
    "text": "The architecture is technically demanding because it connects independent institutions into a common web of trust. It's not enough to publish a REST API. It is necessary to identify participants, secure transport, authenticate the customer, record consent, issue tokens, limit scopes, standardize payloads, ensure non-repudiation and produce evidence for monitoring and auditing. A single layer error can impede the journey or, worse, expose high-value data."
  },
  {
    "kind": "paragraph",
    "text": "The Brazilian model has evolved from Open Banking to a broader scope of Open Finance. The implementation phases have historically organized open data, registration and transactional data, payment initiation and expansion to other financial products. In 2026, the ecosystem continues to evolve through standards, manuals, technical agenda and new capabilities; Therefore, professionals must distinguish stable principles from specific API versions and operational rules."
  },
  {
    "kind": "paragraph",
    "text": "This chapter connects the course's previous knowledge - OAuth 2.0, OpenID Connect, mTLS, JWT, gateways, security, observability and high availability - to the Brazilian context. The focus is to build an end-to-end mental model, useful for architecture, development, support and troubleshooting in participating institutions."
  },
  {
    "kind": "paragraph",
    "text": "How to study this chapter Walk through each flow by identifying four different objects: consent, authentication session, access token, and API call. They are related, but they are not equivalent. In production, each one has its own life cycle, identifiers and evidence."
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
      "Differentiate Open Banking and Open Finance in the Brazilian context.",
      "Explain the roles of customer, receiver, transmitter, initiator and account holder.",
      "Describe the journey of consent, authentication, confirmation, and sharing.",
      "Relate Directory, certificates, OAuth 2.0, OIDC, FAPI-BR and mTLS.",
      "Understand API categories, versioning, idempotence and error handling.",
      "Analyze payment initiation without confusing journey, authorization and settlement.",
      "Apply principles of privacy, finality, minimization and revocation.",
      "Design gateways, observability, high availability and incident response.",
      "Diagnose redirection, certificates, tokens, consent and API failures."
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
      "35.1 Open Banking, Open Finance and data portability",
      "35.2 Evolution and regulatory framework",
      "35.3 Participants, roles and boundaries of responsibility",
      "35.4 Consent and customer experience",
      "35.5 Directory, trust and institutional identity",
      "35.6 FAPI-BR, OAuth 2.0, OIDC and mTLS",
      "35.7 Categories of APIs and contracts",
      "35.8 Initiating payments",
      "35.9 Security, privacy and fraud prevention",
      "35.10 Gateway, observability and availability",
      "35.11 Certification and monitoring",
      "35.12 Customer experience and redirects",
      "35.13 Data quality, semantics and lifecycle",
      "35.14 Non-functional requirements and capacity",
      "35.15 Versioning and change management",
      "35.16 End-to-end troubleshooting",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.1 Open Banking, Open Finance and data portability",
    "id": "35-1-open-banking-open-finance-and-data-portability"
  },
  {
    "kind": "paragraph",
    "text": "Open Banking broadly describes the controlled opening of banking data and services. Open Finance extends this principle to a more comprehensive set of financial products and relationships. In Brazil, the name evolved because the scope began to include data and services that go beyond current accounts and cards, including credit, investments, exchange, insurance and pensions, in accordance with applicable regulations and manuals."
  },
  {
    "kind": "paragraph",
    "text": "The name change does not eliminate the original architecture. The core continues to be standardized sharing via APIs, upon customer authorization when the data is personal or protected. The customer chooses who receives it, where the data comes from, for what purpose and for how long. The receiving institution does not receive unrestricted access to the account; receives only the data or services covered by the consent and authorized scope."
  },
  {
    "kind": "paragraph",
    "text": "Data portability does not mean permanently copying your entire financial life to a central repository. The architecture is distributed: data remains in the institutions that hold it and is transmitted, on demand, to authorized participants. This characteristic reduces centralization, but requires availability, interoperability and operational consistency among many organizations."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The terms are related, but are not perfect synonyms.",
    "headers": [
      "Concept",
      "Emphasis",
      "Example"
    ],
    "rows": [
      [
        "Open Banking",
        "Banking data and services.",
        "Accounts, cards, credit and payments."
      ],
      [
        "Open Finance",
        "Broader financial ecosystem.",
        "Investments, insurance, exchange and pensions, according to the current scope."
      ],
      [
        "Open API",
        "Published interface with access rules.",
        "Standardized API for financial data or service."
      ],
      [
        "Information portability",
        "Client controls the movement of data.",
        "Share history to get better proposal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.2 Evolution and regulatory framework",
    "id": "35-2-evolution-and-regulatory-framework"
  },
  {
    "kind": "paragraph",
    "text": "The Brazilian implementation was organized in stages. The first concentrated open data on products, channels and services. The second introduced sharing of registration and transactional data through consent. The third incorporated initiation of payments and forwarding of proposals. The fourth expanded the scope to other financial products. This division is useful as a historical overview, although the current ecosystem is maintained by an ongoing evolutionary agenda."
  },
  {
    "kind": "paragraph",
    "text": "The central framework is Joint Resolution No. 1, of May 4, 2020, later amended by other standards. The Central Bank publishes technical and operational manuals that detail APIs, customer experience, security, services, scope and monitoring. In 2026, new regulatory instructions continued to update these manuals, which reinforces the need to consult the current version before implementing or promoting changes."
  },
  {
    "kind": "paragraph",
    "text": "The Governance Structure coordinates specifications, directory, certifications, monitoring and common processes. Institutions remain responsible for their systems, data, authentication, security and regulatory compliance. Shared governance does not transfer individual responsibility for protection failures or unavailability."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The phases explain the evolution, but the current operation is continuous and versioned.",
    "headers": [
      "Historical stage",
      "Predominant content",
      "Architectural impact"
    ],
    "rows": [
      [
        "Open data",
        "Products, rates, channels and features.",
        "Public APIs, catalog and standardization."
      ],
      [
        "Customer data",
        "Registration and transactions with consent.",
        "OAuth, identity, scope and privacy."
      ],
      [
        "Services",
        "Initiation of payments and other journeys.",
        "Idempotence, status, anti-fraud and high availability."
      ],
      [
        "Expansion",
        "Other products and financial data.",
        "More domains, versions and cross-industry integration."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.3 Participants, roles and boundaries of responsibility",
    "id": "35-3-participants-roles-and-boundaries-of-responsibility"
  },
  {
    "kind": "paragraph",
    "text": "The same institution can play more than one role. As a transmitter, it provides data it maintains. As a receiver, it receives authorized data to offer services. As the payment transaction initiator, you lead the journey and send an authorized order without holding the funds. As the account holder, you authenticate the customer, validate the authorization and execute the payment in accordance with the applicable rules."
  },
  {
    "kind": "paragraph",
    "text": "Roles should be modeled by function, not just by brand. A conglomerate may have distinct legal entities, each with its own certificates, registrations and responsibilities. Routing and authorization must respect the exact participant, the environment, the organization and the registered software, avoiding assuming that every component of a financial group automatically shares the same identity."
  },
  {
    "kind": "paragraph",
    "text": "There are also common components such as directory, certification tools, monitoring, and specification portals. These services create interoperability, but do not replace each participant's internal controls. The institution must ensure that its APIs, portals, certificates, credentials and processes are up to date and operational."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The diagnosis must record the role each institution played in the transaction.",
    "headers": [
      "Paper",
      "Main responsibility",
      "Operational evidence"
    ],
    "rows": [
      [
        "Data transmitter",
        "Make authorized and standardized data available.",
        "Consent, token and call logs."
      ],
      [
        "Data Receiver",
        "Request and use data according to purpose.",
        "Record of the journey and legal basis."
      ],
      [
        "Payment Initiator",
        "Create the journey and convey the order.",
        "Consent, idempotence and status."
      ],
      [
        "Account holder",
        "Authenticate and execute payment.",
        "Confirmation, anti-fraud and return."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.4 Consent and customer experience",
    "id": "35-4-consent-and-customer-experience"
  },
  {
    "kind": "paragraph",
    "text": "Consent is an explicit authorization for specific purposes and conditions. It should not be confused with authentication. Authentication proves the customer's identity to the institution; consent records the decision about data or services. The journey needs to allow the customer to understand who will receive the data, which categories will be shared, for how long and for what purpose."
  },
  {
    "kind": "paragraph",
    "text": "The experience typically begins at the receiving institution. The customer selects the originating institution and is redirected to a channel controlled by it. In this environment, it authenticates with the usual mechanisms and confirms authorization. It then returns to the receiving institution, which completes the token exchange and initiates calls. The receiver must not collect the password used on the transmitter."
  },
  {
    "kind": "paragraph",
    "text": "Revocation and expiration are part of the lifecycle. Terminating consent prevents new calls supported by it, but does not automatically delete data already received when there is an obligation or other legal basis for retention. Data governance needs to separate permission to collect, purpose of use, retention, anonymization and disposal."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/en/figure-01.svg",
    "alt": "Consent, authentication and API call as independent steps",
    "caption": "Figure 1 - Consent, authentication and API call are related but independent steps."
  },
  {
    "kind": "paragraph",
    "text": "Security rule The password or authentication factor of the originating bank must only be entered in the environment controlled by that institution. The receiving institution works with redirection, consent and tokens, not with capturing banking credentials."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.5 Directory, trust and institutional identity",
    "id": "35-5-directory-trust-and-institutional-identity"
  },
  {
    "kind": "paragraph",
    "text": "The ecosystem depends on a trust infrastructure capable of answering who the participant is, what functions they perform, what software has been registered, which endpoints belong to them and which certificates are associated with the identity. The Directory plays a central role in this discovery and in establishing verifiable relationships between organizations."
  },
  {
    "kind": "paragraph",
    "text": "Certificates and keys need to be treated as production assets. Rotation, expiration, revocation, chain of trust, and association to the correct environment must be monitored. A cryptographically valid certificate may be inappropriate if it is tied to another organization, another software, or another purpose. Therefore, identity validation does not end at the signature; includes metadata and ecosystem records."
  },
  {
    "kind": "paragraph",
    "text": "Trust is also versioned. Changes to certificates, endpoints, software profiles, and participants need to propagate without windows of inconsistency. Approval and production environments must not share secrets or certificates indiscriminately."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/en/figure-02.svg",
    "alt": "Directory and institutional trust connecting participants through cryptography and protocols",
    "caption": "Figure 2 - Institutional trust combines registration, encryption, protocols and operational evidence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.6 FAPI-BR, OAuth 2.0, OpenID Connect and mTLS",
    "id": "35-6-fapi-br-oauth-2-0-openid-connect-and-mtls"
  },
  {
    "kind": "paragraph",
    "text": "Financial APIs handle high-risk data and operations. The Brazilian security profile, known as FAPI-BR, adds requirements to OAuth 2.0 and OpenID Connect to reduce code interception, parameter tampering, fake clients and token reuse. The current profile must be consulted because versions and coexistence periods are part of the technical evolution of the ecosystem."
  },
  {
    "kind": "paragraph",
    "text": "The journey involves authorization server, registered client and resource server. The client initiates an authorization; the server authenticates the user and links the transaction to consent; then, it issues tokens for access to the APIs. Mechanisms such as PKCE, signed parameters, push authorization, strong client authentication, and certificate-bound tokens can participate in the profile, depending on the applicable version."
  },
  {
    "kind": "paragraph",
    "text": "mTLS secures the transport and can also bind the token to the client certificate. In this model, stealing the token is not enough: the attacker would also need to demonstrate possession of the corresponding private key. The gateway must validate the chain, identity, association with the registered software and confirmation present in the token, in addition to issuer, audience, expiration and scopes."
  },
  {
    "kind": "paragraph",
    "text": "OpenID Connect supports authentication and delivery of identity claims in the authorization flow. However, data APIs must validate access tokens, not use ID Tokens as generic substitutes. Separation between user authentication, client authorization, and resource access remains essential."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Security is made up of layers; no single mechanism solves the entire problem.",
    "headers": [
      "Layer",
      "Mechanism",
      "Responsibility"
    ],
    "rows": [
      [
        "Transport",
        "TLS and mTLS",
        "Cutting-edge confidentiality, integrity and identity."
      ],
      [
        "Authorization",
        "OAuth 2.0 / FAPI-BR",
        "Delegation, tokens, scopes and flow protection."
      ],
      [
        "Identity",
        "OpenID Connect",
        "Authentication and claims about the user."
      ],
      [
        "Message",
        "JWT/JWS/JWE",
        "Signature, integrity and possible confidentiality."
      ],
      [
        "Ecosystem",
        "Directory and certificates",
        "Institutional identity and trusted discovery."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.7 Categories of APIs and contracts",
    "id": "35-7-categories-of-apis-and-contracts"
  },
  {
    "kind": "paragraph",
    "text": "The Open Finance catalog organizes APIs by data and service groups. Among the recurring categories are channels and products, registration data, accounts, cards, credit operations, investments, foreign exchange, insurance, pensions, consents, resources and payments. Availability and exact version must be checked in the current official catalogue."
  },
  {
    "kind": "paragraph",
    "text": "Specifications standardize names, fields, types, pagination, headers, errors, and non-functional requirements. This reduces ambiguities between institutions, but does not eliminate differences in source data. Legacy systems can represent dates, balances, contracts and holders in different ways. The adaptation layer must preserve semantics, not just convert field names."
  },
  {
    "kind": "paragraph",
    "text": "Versioning requires planned coexistence. An institution may need to support more than one version during migrations, perform compliance testing, and communicate changes to consumers. The gateway helps with routing, but actual compatibility depends on backend, contract, documentation, and observability."
  },
  {
    "kind": "paragraph",
    "text": "Conceptual example of GET data call /open-banking/accounts/vX/accounts/{accountId}/balances HTTP/1.1 Host: api.instituicao.example Authorization: Bearer <access-token> X-Fapi-Interaction-Id: <uuid> Accept: application/json # The exact path and headers depend on the current version of the specification."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.8 Initiating payments",
    "id": "35-8-initiating-payments"
  },
  {
    "kind": "paragraph",
    "text": "Payment initiation allows an authorized institution to create the experience and transmit the order to the institution where the customer maintains the account. The initiator does not need to hold the funds. The customer chooses the account, authenticates as the holder and confirms the operation. Financial execution occurs in the arrangement and in the providers involved, while the initiator monitors states and presents the result."
  },
  {
    "kind": "paragraph",
    "text": "From an API perspective, the journey requires idempotence, correlation and a state machine. Repeating a timeout request cannot create duplicate payments. The idempotence identifier must be associated with the content and a defined window. Intermediate states should be treated as part of the contract: pending, accepted, rejected, completed or canceled may require further consultation or notification."
  },
  {
    "kind": "paragraph",
    "text": "Anti-fraud security doesn't go away. Holder and initiator apply their own controls, respecting the regulated experience. Signals such as device, behavior, risk, value, payee, and history can lead to further authentication or rejection. The architecture needs to avoid leaking details that help attackers calibrate attempts."
  },
  {
    "kind": "subhead",
    "text": "Payment initiation: separation between journey and movement of funds"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/en/figure-03.svg",
    "alt": "Payment initiator orchestrating journey executed by holding institution",
    "caption": "Figure 3 - The initiator orchestrates the journey, but the holding institution executes the movement of funds."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.9 Security, privacy and fraud prevention",
    "id": "35-9-security-privacy-and-fraud-prevention"
  },
  {
    "kind": "paragraph",
    "text": "Financial data has high value and can reveal income, habits, indirect location, relationships and financial health. The minimization principle requires requesting only categories necessary for the purpose presented. The receiver must prevent incompatible secondary use, limit internal access, and record who queried or processed the data."
  },
  {
    "kind": "paragraph",
    "text": "The LGPD applies alongside sectoral regulations. Consent in Open Finance is a specific operational and regulatory mechanism, but subsequent processing still needs to respect purpose, transparency, security and the rights of the holder. Secrets, tokens, certificates, and payloads should not appear in their entirety in logs, support tools, or test environments."
  },
  {
    "kind": "paragraph",
    "text": "Threats include phishing during redirection, fake applications, token theft, consent abuse, resource enumeration, payment fraud, replay, SSRF, and certificate compromise. Effective controls combine validation of redirect URIs, mTLS, short tokens, restricted audience, idempotence, behavioral detection, and rapid incident response."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Each threat needs preventive control and verifiable evidence.",
    "headers": [
      "Threat",
      "Main control",
      "Evidence"
    ],
    "rows": [
      [
        "Fake app or participant",
        "Directory, certificates and client validation.",
        "Registered identity and software."
      ],
      [
        "Stolen Token",
        "mTLS/sender-constrained, audience and short expiration.",
        "Binding failure or anomalous use."
      ],
      [
        "Abusive consent",
        "Purpose, scope, term and revocation.",
        "Record of the journey and screens presented."
      ],
      [
        "Double payment",
        "Idempotence and state machine.",
        "Same key and same content."
      ],
      [
        "Log leak",
        "Masking and minimization.",
        "Logs without tokens or complete sensitive data."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.10 API Gateway, observability and high availability",
    "id": "35-10-api-gateway-observability-and-high-availability"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway concentrates transport controls, certificate validation, tokens, rate limiting, routing, transformation and auditing. However, it should not assume consent business rules alone. The backend needs to check the link between resource, client, holder and scope. Otherwise, a misconfiguration on the gateway could open unauthorized access."
  },
  {
    "kind": "paragraph",
    "text": "Observability must correlate interaction ID, consent ID, client ID, organization, token, API version, endpoint, status, latency and backend. Tokens and personal data must be masked. Aggregated metrics reveal availability and performance; traces help separate time across the gateway, authorization server, adapter, and legacy."
  },
  {
    "kind": "paragraph",
    "text": "High availability is a systemic requirement. An institution can be healthy internally and still fail due to DNS, certificate, directory, authorization dependency or backend. Timeouts, retries and circuit breakers need to consider idempotence and the nature of the operation. Repeat reading can be safe; Repeating payment creation without the correct key can be disastrous."
  },
  {
    "kind": "subhead",
    "text": "Edge architecture for regulated APIs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/open-finance-open-banking-brazil/en/figure-04.svg",
    "alt": "API Gateway applying edge controls across an end-to-end authorized journey",
    "caption": "Figure 4 - The gateway applies edge controls, while business consent and authorization remain end-to-end."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.11 Certification, monitoring and compliance",
    "id": "35-11-certification-monitoring-and-compliance"
  },
  {
    "kind": "paragraph",
    "text": "The ecosystem uses functional and security certification mechanisms to increase interoperability. Passing tests does not guarantee permanent operation: changes to versions, certificates, dependencies and infrastructure can introduce regressions. Therefore, compliance needs to be integrated into CI/CD, with automated testing and validation before each promotion."
  },
  {
    "kind": "paragraph",
    "text": "Common monitoring and indicators allow identifying unavailability, degradation and differences in behavior between participants. In 2026, the Central Bank updated monitoring and security manuals, reinforcing periodic review of configurations, exposed services and authentication and authorization controls. The team must follow standards and an evolutionary agenda, not just the internal backlog."
  },
  {
    "kind": "paragraph",
    "text": "Evidence of compliance includes published configuration, API version, active certificate, test results, journey logs, metrics, incidents, and remediation plans. The absence of an auditable trail turns technical problems into regulatory risks."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.12 Customer experience and redirects",
    "id": "35-12-customer-experience-and-redirects"
  },
  {
    "kind": "paragraph",
    "text": "Customer experience is part of the operational protocol. Redirects between apps and browsers need to preserve context without exposing credentials. The interface must make it clear which institution receives the data, which transmits it, which data will be used and for how long. Visual ambiguity increases the risk of phishing and journey abandonment."
  },
  {
    "kind": "paragraph",
    "text": "App-to-app and web-to-app journeys require deep links, universal links, or equivalent mechanisms configured with the correct domain and application. The state parameter protects the correlation and helps prevent session rollover. The application must handle cancellation, return without code, expiration, device change and journey resumption in a predictable manner."
  },
  {
    "kind": "paragraph",
    "text": "Authentication occurs in the environment of the transmitting or holding institution. The receiver must not imitate the other bank's screen or ask for your password. Error messages also need to avoid internal terms and inform the customer which step failed without revealing security details."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Secure experience needs to predict error and cancellation paths.",
    "headers": [
      "Situation",
      "Expected treatment",
      "Risk avoided"
    ],
    "rows": [
      [
        "User cancels",
        "Return controlled state and do not create consent.",
        "Phantom consent."
      ],
      [
        "Invalid deep link",
        "Block return and guide new attempt.",
        "Redirect hijacking."
      ],
      [
        "divergent state",
        "Reject the answer.",
        "CSRF and session switching."
      ],
      [
        "Session expired",
        "Restart authorization with clear context.",
        "Use of stale session."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.13 Data quality, semantics and lifecycle",
    "id": "35-13-data-quality-semantics-and-lifecycle"
  },
  {
    "kind": "paragraph",
    "text": "Interoperability doesn't just mean valid JSON. Fields need to retain meaning across institutions. Available balance, blocked balance, limit, contract date and contract status may have different rules in the source systems. The adapter must apply the semantics of the specification and document limitations, avoiding filling fields with approximate values just to satisfy the schema."
  },
  {
    "kind": "paragraph",
    "text": "Quality includes completeness, consistency, timeliness, uniqueness and traceability. When data does not exist or does not apply, the representation must follow the contract. Null, missing field, zero and empty string are not equivalent. Systematic mapping errors can produce incorrect credit decisions even when the API is available."
  },
  {
    "kind": "paragraph",
    "text": "The receiver also needs to govern the data after collection. It must record origin, consent, purpose, date of acquisition, transformations and retention rules. When consent expires or is revoked, further collections cease; The processing of data already received must follow legal, contractual obligations and disposal policies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.14 Non-functional requirements and capacity",
    "id": "35-14-non-functional-requirements-and-capacity"
  },
  {
    "kind": "paragraph",
    "text": "Ecosystem specifications include non-functional requirements such as availability, latency, traffic limits, monitoring, and error behavior. These parameters vary by API group and version. Capacity planning must consider bursts of consents, aggregators querying multiple institutions, monthly closures, and new regulatory functionality."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting needs to protect the platform without disrupting legitimate consumers. Boundary key can combine organization, software, consent, token and API. Local counters are simple, but can allow overflow in multiple instances; global counters improve consistency and add latency and dependency."
  },
  {
    "kind": "paragraph",
    "text": "The availability strategy should include independent zones, certificate renewal, key rotation, configuration replication, and contingency testing. The goal is not just to keep the endpoint responding, but to preserve authentication, authorization, up-to-date data, and trusted status during partial failures."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Technical availability without quality or safety does not represent success.",
    "headers": [
      "Dimension",
      "Indicator",
      "Operational question"
    ],
    "rows": [
      [
        "Availability",
        "Success by API and participant.",
        "Is the full journey available?"
      ],
      [
        "Latency",
        "Percentiles by endpoint and backend.",
        "Where is time being consumed?"
      ],
      [
        "Capacity",
        "RPS, competition and queues.",
        "Is there room for bursts and retries?"
      ],
      [
        "Quality",
        "Missing fields and discrepancies.",
        "Is the answer semantically correct?"
      ],
      [
        "Security",
        "Token failures, mTLS and fraud.",
        "Is the control blocking the right risk?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.15 Versioning and change management",
    "id": "35-15-versioning-and-change-management"
  },
  {
    "kind": "paragraph",
    "text": "The catalog differentiates current versions, candidates and periods of coexistence. A new version may change schemas, endpoints, security requirements, or non-functional rules. The institution needs to inventory consumers and internal dependencies, update mocks, contracts, gateways, backends and observability before the mandatory date."
  },
  {
    "kind": "paragraph",
    "text": "Changes must enter the pipeline. Linting, contract testing, functional testing, certification, security and performance need to be run with the same configuration that will reach production. Manual exceptions must have a deadline and responsible person. The documentation must inform which version is active, which is retired and how to identify remaining traffic."
  },
  {
    "kind": "paragraph",
    "text": "Periods of coexistence should not become indefinite support. Telemetry by version, organization and software helps confirm migration. Withdrawal should only occur when regulatory requirements, communication and technical evidence are aligned."
  },
  {
    "kind": "paragraph",
    "text": "Change governance Treat standard, manual, specification and gateway configuration as versioned artifacts. A regulatory change only ends when code, certificates, tests, documentation, monitoring and runbooks have also been updated."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.16 End-to-end troubleshooting",
    "id": "35-16-end-to-end-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Open Finance failures need to be classified by stage. If the institution does not appear for selection, investigate the directory, registration and discovery. If the redirect fails, check the redirect URI, state, browser, application and deep link. If the token is not issued, evaluate authorization, PKCE, client authentication, certificate, and consent. If the API returns 401 or 403, validate issuer, audience, scope, binding and resource."
  },
  {
    "kind": "paragraph",
    "text": "mTLS errors require inspection of string, validity, hostname, presented certificate, truststore, and identity association. Timeouts can be in DNS, TCP, TLS, authorization server, gateway, adapter or legacy. Interaction ID must accompany the investigation between organizations, preserving minimal data and avoiding sending complete tokens in tickets."
  },
  {
    "kind": "paragraph",
    "text": "In payments, differentiate between creation, authorization, execution and status query errors. A customer timeout does not prove financial failure. Before retrying, query the status using the contract identifiers. The runbook should say when retry is allowed, when reconciliation is mandatory, and when manual intervention is required."
  },
  {
    "kind": "table",
    "caption": "Table 6 - The diagnosis starts with the step, not with the product selected by the user.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Priority evidence"
    ],
    "rows": [
      [
        "Institution does not appear",
        "Directory, registry, cache or environment.",
        "Participant registration and discovery."
      ],
      [
        "Redirect failed",
        "Divergent URI, state, app link or session.",
        "Authorization request and channel logs."
      ],
      [
        "invalidclient",
        "Certificate, private_key_jwt or registration.",
        "Software metadata and identity."
      ],
      [
        "401 on API",
        "Invalid token, audience or mTLS binding.",
        "Claims, certificate and gateway logs."
      ],
      [
        "Double payment",
        "Missing idempotence or incorrect retry.",
        "Key, payload and status history."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "35.17 Case studies and labs",
    "id": "35-17-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1 - Financial Aggregator: A receiving institution obtains consent for accounts and cards held at two banks. The backend normalizes the data and presents a consolidated view. The main risk is not just availability; is to preserve meaning, currency, dates, ownership, and purpose when combining different sources."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2 - Pix initiation: the customer starts the journey on a third-party application, authenticates with the holding bank and confirms the payment. The initiator receives pending status after timeout. The correct strategy is to query the resource by identifier and reconcile the state, not create a second order without checking idempotence."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3 - Certificate Rotation: The new certificate was published, but a gateway instance maintained the old truststore. Some calls fail intermittently. The investigation combines fingerprint, listener node, time, cache and configuration rollout."
  },
  {
    "kind": "paragraph",
    "text": "Suggested Labs 1) Design a journey with separate consent, authorization, and API. 2) Validate a conceptual JWT with issuer, audience, expiration and certificate confirmation. 3) Simulate an mTLS failure and record evidence per layer. 4) Model states and idempotence of a payment initiation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Open Finance Brasil is a regulated and distributed infrastructure that combines customer choice, institutional identity, consent, authentication, tokens and standardized APIs. Open Banking represents the origin and part of the scope; Open Finance expands the vision to other financial products and services."
  },
  {
    "kind": "paragraph",
    "text": "Security depends on layers: Directory, certificates, mTLS, OAuth 2.0, OpenID Connect, FAPI-BR, contracts, monitoring and internal controls. Consent does not replace authentication, and token does not replace business authorization. The institution must validate all relationships up to the requested resource."
  },
  {
    "kind": "paragraph",
    "text": "Operating the ecosystem requires versioning, certification, observability, high availability, privacy and coordinated incident response. As standards and manuals continue to evolve, architects and operators need to treat official documentation and regulatory agendas as production dependencies."
  },
  {
    "kind": "paragraph",
    "text": "Next step of the course The next chapter delves deeper into the LGPD applied to APIs, connecting legal and technical foundations of purpose, minimization, holder rights, security, retention and data governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Architecture and operation checklist",
    "id": "architecture-and-operation-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Roles of receiver, transmitter, initiator, and holder are explicitly identified.",
      "Consent, authentication, token and API call have their own correlation and lifecycle.",
      "Directory, certificates, endpoints and software statements are up to date.",
      "Issuer, audience, scopes, expiration and token binding are validated.",
      "Logs do not expose tokens, credentials, or complete financial data.",
      "Idempotency and reconciliation are defined for payment transactions.",
      "Versioning and coexistence periods are handled at the gateway and backend.",
      "Runbooks cover DNS, TLS, mTLS, OAuth, consent, API, and legacy.",
      "Certification and regression testing are part of the pipeline.",
      "Standards, manuals and evolutionary agenda are monitored by defined responsible parties."
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
      "Differentiate Open Banking and Open Finance in the Brazilian context.",
      "Explain why consent and authentication are different objects.",
      "Describe the flow between receiving institution, transmitter and client.",
      "Explain the role of the Directory in trust between participants.",
      "List FAPI-BR, OAuth 2.0, OIDC and mTLS.",
      "Explain why ID Token should not be used as a generic access token.",
      "Model an idempotence strategy for payment initiation.",
      "List evidence needed to diagnose a 401 failure.",
      "Propose metrics and logs for an account data API.",
      "Describe the impacts of an incomplete certificate rotation."
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
        "Consent",
        "Explicit authorization from the customer for a determined purpose, scope and duration."
      ],
      [
        "Account holder",
        "Institution that maintains the account and executes the authorized transaction."
      ],
      [
        "Directory",
        "Participant registration and discovery infrastructure, software and certificates."
      ],
      [
        "FAPI-BR",
        "Brazilian security profile for financial APIs based on the FAPI ecosystem."
      ],
      [
        "Payment Initiator",
        "Participant who starts the journey without holding the funds."
      ],
      [
        "InteractionID",
        "Correlation identifier used in API interactions."
      ],
      [
        "Open Banking",
        "Regulated opening of data and banking services."
      ],
      [
        "Open Finance",
        "Expanding sharing for a more comprehensive financial ecosystem."
      ],
      [
        "Data Receiver",
        "Participant who receives data as authorized by the client."
      ],
      [
        "Data transmitter",
        "Participant who provides data he maintains."
      ],
      [
        "mTLS",
        "Mutual TLS, with certificate authentication on both sides."
      ],
      [
        "Sender-constrained token",
        "Token whose use depends on proof of the associated key."
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
      "Central Bank of Brazil. Open Finance - overview, security, customers and participants.",
      "Joint Resolution No. 1, of May 4, 2020, and subsequent amendments.",
      "Central Bank of Brazil. Open Finance APIs Manual - current version.",
      "Central Bank of Brazil. Open Finance Security Manual - current version.",
      "Central Bank of Brazil. Customer Experience Manual - current version.",
      "Central Bank of Brazil. Open Finance Monitoring Manual - current version.",
      "Open Finance Brazil. Developer Area and API Catalog.",
      "Open Finance Brazil. Financial-grade API Security Profile - FAPI-BR.",
      "IETF and OpenID Foundation. OAuth 2.0, OpenID Connect, PKCE, PAR, JAR, JARM and FAPI.",
      "Law No. 13,709/2018 - General Personal Data Protection Law."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Update note This chapter presents principles and architecture based on official sources consulted in July 2026. Before implementing, always confirm the current version of the standards, manuals, APIs, security profiles and coexistence periods published by the Central Bank and the Open Finance Governance Structure."
  }
];
