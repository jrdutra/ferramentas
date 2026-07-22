import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OWASP_API_SECURITY_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "OWASP API Security Top 10: risks connected to the complete API cycle"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/en/overview.svg",
    "alt": "OWASP API Security Top 10 Risks Connected to the API Lifecycle",
    "caption": "Opening figure - The ten risks represent classes of failures that cut across design, implementation, gateway and operation."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The gateway reduces exposure, but authorization and secure logic must exist at all layers."
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
    "text": "The previous chapter detailed Azure API Management and showed how gateways apply policies, limits, authentication, routing, and observability. This chapter broadens the view: API security is not an exclusive functionality of the gateway. The API can be perfectly protected by TLS and still allow an authenticated user to read objects from another client, modify prohibited fields, or perform an improper administrative operation."
  },
  {
    "kind": "paragraph",
    "text": "The OWASP API Security Top 10 organizes the most relevant risks for APIs in practical language. The 2023 edition highlights authorization failures in sensitive objects, authentication, properties, functions, and flows; unrestricted consumption of resources; SSRF; insecure configurations; inadequate inventory; and excessive reliance on third-party APIs. These categories help product, architecture, development, security, and operations teams build a common vocabulary."
  },
  {
    "kind": "paragraph",
    "text": "The objective is not to transform the Top 10 into a superficial checklist. Each risk represents a family of causes, operating conditions and impacts. To understand them, it is necessary to relate identity, authorization, schemas, operational limits, business behavior, network topology, external dependencies and life cycle. The chapter also differentiates preventive, detective and responsive controls, showing the specific role of API Gateways, WAFs, backends and governance processes."
  },
  {
    "kind": "paragraph",
    "text": "The examples use corporate and banking scenarios without exposing real environments. The reader should be able to recognize vulnerable patterns, formulate attack hypotheses, propose controls in multiple layers and transform findings into verifiable engineering requirements."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each category, separate four dimensions: protected asset, vulnerable condition, attacker action, and verifiable control. Then, identify which part belongs to the gateway, which belongs to the backend, and which depends on governance or process."
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
      "Explain the purpose and limitations of the OWASP API Security Top 10.",
      "Identify the differences between object, property, and role authorization.",
      "Recognize authentication failures and manage tokens, sessions and credentials.",
      "Design limits against unrestricted consumption of resources and abuse of business flows.",
      "Understand SSRF, insecure configurations, inadequate inventory, and insecure consumption of APIs.",
      "Relate each risk to controls in code, API Gateway, WAF, network, identity and observability.",
      "Apply threat modeling, security testing and CI/CD evidence to the lifecycle.",
      "Build hardening, monitoring, response and continuous improvement strategies."
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
      "25.1 Top 10 Security Model and Responsible Use",
      "25.2 API1: Broken Object Level Authorization",
      "25.3 API2: Broken Authentication",
      "25.4 API3: Broken Object Property Level Authorization",
      "25.5 API4: Unrestricted Resource Consumption",
      "25.6 API5: Broken Function Level Authorization",
      "25.7 API6: Unrestricted Access to Sensitive Business Flows",
      "25.8 API7: Server Side Request Forgery",
      "25.9 API8: Security Misconfiguration",
      "25.10 API9: Improper Inventory Management",
      "25.11 API10: Unsafe Consumption of APIs",
      "25.12 Gateway Controls and Defense in Depth",
      "25.13 Testing, observability and response",
      "25.14 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.1 Top 10 Security Model and Responsible Use",
    "id": "25-1-top-10-security-model-and-responsible-use"
  },
  {
    "kind": "paragraph",
    "text": "The Top 10 is an awareness and prioritization document, not a complete security specification. An API may be vulnerable to risks that do not appear in the list, and the absence of findings in the Top 10 does not prove security. Correct use combines threat modeling, protection requirements, architecture, testing, code review, dependency management, telemetry and incident response."
  },
  {
    "kind": "paragraph",
    "text": "APIs expose operations directly consumable by software. This increases attacker automation, enumeration speed, and ability to chain failures. Identifiers in paths, queries and payloads can be changed on a large scale; schemas allow exploring unforeseen properties; and legitimate streams can be abused without any malformed payloads. Therefore, API security requires observing intent and context, not just syntax."
  },
  {
    "kind": "paragraph",
    "text": "Defense in depth distributes responsibilities. WAF reduces known malicious traffic; the gateway validates tokens, quotas and contracts; the backend applies domain-bound authorization; the bank limits access; and observability detects anomalous patterns."
  },
  {
    "kind": "paragraph",
    "text": "None of these layers replaces the others. An edge control may be bypassed by internal traffic, while a business failure may appear perfectly valid to a generic filter."
  },
  {
    "kind": "subhead",
    "text": "Defense in Depth for APIs"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/en/figure-01-defense-in-depth.svg",
    "alt": "Consumer, WAF, API Gateway, backend and data as defense in depth layers",
    "caption": "Figure 1 - API Security is a system of complementary controls, not an isolated product."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Each layer protects a different set of decisions.",
    "headers": [
      "Layer",
      "Characteristic control",
      "Limitation"
    ],
    "rows": [
      [
        "WAF/edge",
        "Reputation, signatures, volumetric protection.",
        "Little context of domain and ownership."
      ],
      [
        "API Gateway",
        "Token, schema, quotas, routing and auditing.",
        "You don't know all the business rules."
      ],
      [
        "Backend",
        "Fine authorization, invariants and validations.",
        "It may depend on correct identity and context."
      ],
      [
        "Data / third parties",
        "Least Privilege and Exit Restriction.",
        "Does not replace application controls."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.2 API1: Broken Object Level Authorization - BOLA",
    "id": "25-2-api1-broken-object-level-authorization-bola"
  },
  {
    "kind": "paragraph",
    "text": "Broken Object Level Authorization occurs when an operation receives an object identifier and does not check whether the authenticated subject has permission on that specific object. The attacker does not need to break authentication: he uses his own account, changes an ID and tries to access an account, contract, document, order or resource belonging to another person or organization."
  },
  {
    "kind": "paragraph",
    "text": "The common mistake is to interpret authentication as authorization. Knowing who made the call does not answer whether that person can read or modify the requested object. UUIDs and random identifiers reduce predictability, but are not access control. IDs can appear in logs, links, responses, devices, or integrations, and authorization needs to be applied regardless of how difficult it is to guess."
  },
  {
    "kind": "paragraph",
    "text": "The strongest defense is to link the search to the authorized context. Instead of loading an object just by ID and checking later, the repository can search by ID, tenant and authorized subject, returning absence when the relationship does not exist. Centralized policies help, but they need to be given sufficient attributes. Tests should vary user, tenant, role, object, and HTTP method to find inconsistencies."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/en/figure-02-bola.svg",
    "alt": "Authenticated user trying to access object belonging to another client",
    "caption": "Figure 2 - Verification must relate the object to the subject and the tenant, not just validate the token."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of authorization by object"
  },
  {
    "kind": "code",
    "text": "// Vulnerable pattern\naccount = repository.findById(requestId)\nreturn account\n// Defensive pattern\naccount = repository.findByIdAndOwner(requestId, tokenSubject)\nif account == null: denyAccess()"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.3 API2: Broken Authentication",
    "id": "25-3-api2-broken-authentication"
  },
  {
    "kind": "paragraph",
    "text": "Broken Authentication brings together flaws that allow you to assume or maintain the identity of another user, application or workload. Examples include weak credentials, login endpoints without automation protection, predictable tokens, incomplete signature validation or claims, insecure password recovery, sessions that do not expire, and reusable refresh tokens without detection."
  },
  {
    "kind": "paragraph",
    "text": "In modern APIs, authentication typically involves more than one system: client, authorization server, gateway, and backend. Validation needs to confirm algorithm, signature, issuer, audience, expiration, token type and context of use. Accepting an ID Token where an access token is expected, ignoring audience or trusting in keys obtained from an unvalidated source are design flaws, not just implementation flaws."
  },
  {
    "kind": "paragraph",
    "text": "Controls include MFA for proper operations, PKCE, refresh token rotation, credential stuffing protection, attempt limiting, revocation, anomaly detection, secure secret storage, and proof of ownership when the risk warrants. Error messages must prevent account enumeration, and recovery flows must have security equivalent to the main login."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Secure authentication depends on the protocol and its complete operation.",
    "headers": [
      "Failure",
      "Impact",
      "Control"
    ],
    "rows": [
      [
        "Unvalidated issuer or audience",
        "Token from another context is accepted.",
        "Strict validation and configuration per environment."
      ],
      [
        "Refresh token without rotation",
        "Theft maintains prolonged access.",
        "Rotation and reuse detection."
      ],
      [
        "Login without protection",
        "Credential stuffing and takeover.",
        "Rate limiting, MFA and risk detection."
      ],
      [
        "Secret in code or log",
        "Customer commitment.",
        "Vault, rotation and masking."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.4 API3: Broken Object Property Level Authorization",
    "id": "25-4-api3-broken-object-property-level-authorization"
  },
  {
    "kind": "paragraph",
    "text": "This category brings together authorization failures at the level of an object's properties. When reading, the API can return fields that the user should not see. In writing, it can accept properties that the consumer should not control. The 2023 edition combines problems historically described as excessive data exposure and mass assignment."
  },
  {
    "kind": "paragraph",
    "text": "An example of an insecure read is returning the complete entity object and expecting the front-end to hide CPF, internal limit, fraud flags or administrative data. The consumer controls the request and can observe the raw response. In writing, automatically linking the received JSON to an entity allows fields such as role, status, ownerId or approved to be changed by those who do not have authorization."
  },
  {
    "kind": "paragraph",
    "text": "The solution uses specific input and output models, field allowlists, property authorization, contextual serialization and schema validation. GraphQL requires special attention because sensitive fields may exist in the schema and require their own authorization. At the gateway, validation and transformation help, but the backend must control the domain truth."
  },
  {
    "kind": "subhead",
    "text": "Payload that requires allowlist of editable properties"
  },
  {
    "kind": "code",
    "text": "{\n  \"name\": \"Example Customer\",\n  \"email\": \"cliente@example.com\",\n  \"role\": \"admin\",\n  \"approvedLimit\": 1000000\n}"
  },
  {
    "kind": "subhead",
    "text": "Rule of thumb"
  },
  {
    "kind": "paragraph",
    "text": "Never expose or automatically accept all properties of a persisted entity. API contracts should be explicit, use-case and authorization-level-driven projections."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.5 API4: Unrestricted Resource Consumption",
    "id": "25-5-api4-unrestricted-resource-consumption"
  },
  {
    "kind": "paragraph",
    "text": "APIs consume CPU, memory, threads, connections, storage, bandwidth and services charged per use. When there are no coherent limits, an attacker can cause unavailability or excessive costs by sending many requests, large payloads, complex queries, uploads, exports or operations that trigger expensive third parties."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting per request is just one part. It is necessary to control body and response size, GraphQL depth, duration, concurrency, pagination, number of items, compression, number of WebSocket connections and accumulated cost per operation. A report call can cost thousands of times more than a single reading, so uniform limits can protect the system poorly."
  },
  {
    "kind": "paragraph",
    "text": "The design must combine quotas by identity and tenant, timeouts, bulkheads, backpressure, queues, connection limits and circuit breakers. Metrics need to distinguish protective rejection from internal error. In the cloud, cost alerts and budgets also integrate protection, as abuse may first appear on the invoice before causing visible unavailability."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Consumption needs to be measured by the actual cost of the operation.",
    "headers": [
      "Feature",
      "Possible abuse",
      "Technical control"
    ],
    "rows": [
      [
        "CPU/memory",
        "Complex query, expensive regex, decompression bomb.",
        "Complexity, size and timeout."
      ],
      [
        "Connections",
        "Persistent sockets or pool exhausted.",
        "Concurrency limit and idle timeout."
      ],
      [
        "Storage",
        "Excessive uploads and logs.",
        "Quota, retention and maximum size."
      ],
      [
        "Paid service",
        "SMS, maps, AI or anti-fraud.",
        "Budget, rate per flow and approval."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.6 API5: Broken Function Level Authorization",
    "id": "25-6-api5-broken-function-level-authorization"
  },
  {
    "kind": "paragraph",
    "text": "Broken Function Level Authorization occurs when a user manages to invoke a function that should be restricted to another role, group or context. The difference for BOLA is the focus: BOLA asks if the user can access that object; BFLA asks if it can perform that function, regardless of the object."
  },
  {
    "kind": "paragraph",
    "text": "Hidden administrative endpoints, HTTP method changes, and predictable paths are common vectors. A user can exchange GET for DELETE, call /admin, reuse an operation observed in the portal or directly invoke a function that the visual interface does not display. Hiding the button or endpoint is not authorization."
  },
  {
    "kind": "paragraph",
    "text": "Controls include deny by default, per-role permissions matrix, negative testing, separation of administrative surfaces, and consistent validation across all methods. The gateway can apply scopes and roles, but domain decisions may depend on state, authority, transaction value or segregation of duties, requiring evaluation in the backend or PDP."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The three authorization levels must be tested separately.",
    "headers": [
      "Object of the decision",
      "Question",
      "Example"
    ],
    "rows": [
      [
        "Object - BALL",
        "Can this guy access this account?",
        "GET /accounts/123"
      ],
      [
        "Function - BFLA",
        "Can this guy close accounts?",
        "POST /accounts/123/close"
      ],
      [
        "Property - BOPLA",
        "Can this subject change this field?",
        "PATCH role or limit"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.7 API6: Unrestricted Access to Sensitive Business Flows",
    "id": "25-7-api6-unrestricted-access-to-sensitive-business-flows"
  },
  {
    "kind": "paragraph",
    "text": "Some streams are technically legitimate but valuable for automated abuse. Buying tickets, creating accounts, requesting credit, redeeming benefits, sending codes, reservations and comments can be exploited at scale by bots, even if each request has a valid schema and authenticated user."
  },
  {
    "kind": "paragraph",
    "text": "The problem requires modeling intention and flow economics. A generic limit per IP may fail when the attacker distributes requests. Protection may require strong identity linkage, limits per person and device, behavioral detection, queues, step-up, proof of humanity, anti-fraud rules, and specific restrictions per step."
  },
  {
    "kind": "paragraph",
    "text": "There is no universal control. The team needs to identify sensitive flows during threat modeling, estimate how they generate value for the attacker and define signs of abuse. Business logs, conversion rates, attempts per entity, and temporal patterns are more useful than just technical HTTP metrics."
  },
  {
    "kind": "subhead",
    "text": "Essential difference"
  },
  {
    "kind": "paragraph",
    "text": "Abuse of business flow can use perfectly valid requests. WAF and schema validation are rarely enough; control needs to understand the purpose of the operation and the economic identity of the actor."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.8 API7: Server Side Request Forgery - SSRF",
    "id": "25-8-api7-server-side-request-forgery-ssrf"
  },
  {
    "kind": "paragraph",
    "text": "SSRF occurs when the API fetches a remote resource using a user-influenced URL or destination without appropriate restrictions. The server has different connectivity and identity than the client, and can reach cloud metadata, internal dashboards, administrative services, loopback or private networks inaccessible directly to the attacker."
  },
  {
    "kind": "paragraph",
    "text": "Common cases include URL import, webhooks, image validation, document conversion, and callbacks. Validating the https scheme alone won't resolve it: DNS names can resolve to private addresses, redirects can change the destination, and alternative IP representations can bypass naive filters. DNS rebinding and differences between validation and connection increase the risk."
  },
  {
    "kind": "paragraph",
    "text": "The preferred defense is to allowlist specific destinations and exit routes. When arbitrary URLs are needed, use controlled resolver, blocking of private and special ranges, revalidation after redirects, DNS change protection, egress proxy, and minimal identity. The remote response must be limited in size, type and time."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of SSRF attempt"
  },
  {
    "kind": "code",
    "text": "POST /import-document\n{\n  \"url\": \"http://169.254.169.254/metadata/...\"\n}\n# The input looks like a URL, but the destination reached by the server\n# may expose internal services or infrastructure credentials."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.9 API8: Security Misconfiguration",
    "id": "25-9-api8-security-misconfiguration"
  },
  {
    "kind": "paragraph",
    "text": "Security Misconfiguration covers insecure configurations at any layer: permissive CORS, weak TLS, debug endpoints, verbose messages, default credentials, missing headers, unnecessary services, excessive permissions, public buckets, exposed administration, and inconsistent policies across environments."
  },
  {
    "kind": "paragraph",
    "text": "APIs are made up of many components and risk emerges from interactions. A gateway can validate JWT correctly, but trust a client-sent identity header. A backend can be protected at the edge and exposed directly from another address. A secure policy may exist in production, but not in the specific workspace or operation because of incorrect inheritance."
  },
  {
    "kind": "paragraph",
    "text": "The solution depends on versioned baselines, infrastructure as code, change review, configuration scanners, environment separation, secret management and post-deploy testing. Errors should be standardized without stack traces or internal details. Administrative resources need their own network and identity."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Effective configuration must be checked, not just the intended file.",
    "headers": [
      "Area",
      "Misconfiguration example",
      "Evidence"
    ],
    "rows": [
      [
        "TLS",
        "Inappropriate version or cipher.",
        "Handshake and listener configuration."
      ],
      [
        "CORS",
        "Origin reflected with credentials.",
        "Preflight and policy headers."
      ],
      [
        "Gateway",
        "Internal header entrusted without removal.",
        "Trace and effective configuration."
      ],
      [
        "Backend",
        "Public direct endpoint.",
        "DNS, authorized scan and firewall."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.10 API9: Improper Inventory Management",
    "id": "25-10-api9-improper-inventory-management"
  },
  {
    "kind": "paragraph",
    "text": "Inadequate inventory occurs when the organization does not know which APIs, versions, hosts, environments, operations, and dependencies are active. Shadow APIs, old versions, testing endpoints, and divergent documentation keep vulnerable surfaces out of the governance process."
  },
  {
    "kind": "paragraph",
    "text": "The inventory needs to list owner, data classification, consumers, version, environment, hostname, backend, authentication, depreciation date and telemetry. Traffic discovery can complement the catalog, as documentation does not prove that only known endpoints are accessible. DNS, ingress, gateways, repositories and observability must be correlated."
  },
  {
    "kind": "paragraph",
    "text": "Retired versions need to be actually retired across the entire chain. Keeping v1 unsupported for fear of breaking consumers accumulates risk. A lifecycle policy with Deprecation, Sunset, communication, evidence of use and controlled shutdown reduces orphaned surfaces."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-security-owasp-top-10/en/figure-03-api-lifecycle.svg",
    "alt": "Security accompanying design, build, deploy, run and retire in the API cycle",
    "caption": "Figure 3 - Security accompanies the API from design to retirement, with inventory as the axis of governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.11 API10: Unsafe Consumption of APIs",
    "id": "25-11-api10-unsafe-consumption-of-apis"
  },
  {
    "kind": "paragraph",
    "text": "An application may apply strict validation to external clients and rely excessively on APIs from internal partners, vendors, or services. Unsafe Consumption of APIs occurs when data and behaviors coming from these dependencies are treated as safe, allowing injection, indirect SSRF, data corruption, unavailability or chain compromise."
  },
  {
    "kind": "paragraph",
    "text": "Authenticated and encrypted communication only proves the channel and peer identity; does not guarantee that the answer is correct or non-compromising. Third-party responses need schema, size limits, timeout, semantic validation, secure handling of redirects and encoding. Client libraries, certificates, DNS, and proxy configuration also integrate the surface."
  },
  {
    "kind": "paragraph",
    "text": "Resilient architectures use controlled egress, allowlists, circuit breakers, isolation, contracts, dependency observability, and least privilege. Secrets sent to the partner must be specific and rotatable. Returned data should never be concatenated into SQL, commands, templates or URLs without appropriate treatment."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Dependencies should be treated as trust boundaries.",
    "headers": [
      "Dependency",
      "Risk",
      "Control"
    ],
    "rows": [
      [
        "Partner API",
        "Malicious or unexpected response.",
        "Schema, validation and isolation."
      ],
      [
        "Webhook received",
        "Forged origin and replay.",
        "Signature, timestamp and idempotence."
      ],
      [
        "SDK/library",
        "Compromised behavior or chain.",
        "SBOM, pinning and controlled updating."
      ],
      [
        "Internal service",
        "Side implicit trust.",
        "mTLS, authorization and egress policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.12 Gateway Controls and Defense in Depth",
    "id": "25-12-gateway-controls-and-defense-in-depth"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway is a privileged layer to apply uniform controls: authentication, token validation, schema, payload limit, quotas, rate limiting, header removal, routing, mTLS, observability and version blocking. It also provides a point of containment for incident response. However, it should not be transformed into the only domain authorization mechanism."
  },
  {
    "kind": "paragraph",
    "text": "BOLA, authorization by property, and sensitive flows typically require data that only the backend knows. The gateway can validate scopes and claims, but ownership, authority, object state and role segregation need to be evaluated in the service or in a PDP with sufficient context. The policy should deny by default and propagate identity in a non-falsifiable way."
  },
  {
    "kind": "paragraph",
    "text": "Controls also need to preserve diagnoses. Rejections must record rule, identity, operation, tenant and correlation without exposing secrets. Metrics for 401, 403, 429, schema violations and WAF blocks help detect attacks, but need to be contextualized to differentiate abuse from integration failure."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The gateway is important, but does not replace application security.",
    "headers": [
      "Risk",
      "Gateway contributes",
      "Backend/process needs to ensure"
    ],
    "rows": [
      [
        "API1 / API3 / API5",
        "Identity, scopes and contract.",
        "Ownership, role and authorized properties."
      ],
      [
        "API4/API6",
        "Limits, quotas and telemetry.",
        "Actual cost and business rules."
      ],
      [
        "API7",
        "Egress policy and URL policy when supported.",
        "Target validation and isolation."
      ],
      [
        "API8/API9",
        "Baseline and controlled publication.",
        "Inventory, lifecycle and complete configuration."
      ],
      [
        "API10",
        "mTLS, allowlist and timeout.",
        "Response validation and minimum confidence."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.13 Testing, observability and response",
    "id": "25-13-testing-observability-and-response"
  },
  {
    "kind": "paragraph",
    "text": "Security tests need to explore context, not just payloads. For authorization, use arrays with users, roles, tenants, objects, properties, states and methods. For authentication, test expired tokens, incorrect issuer, different audience, algorithms and revocation. For thresholds, measure behavior under concurrency, large payloads, and expensive operations in an authorized environment."
  },
  {
    "kind": "paragraph",
    "text": "CI/CD automation can perform OpenAPI linting, SAST, SCA, contract testing, DAST scanners, and infrastructure policies. Still, automatic findings need validation. Tools identify patterns, but they hardly understand all sensitive flows and ownership relationships. Manual reviews and threat modeling remain necessary."
  },
  {
    "kind": "paragraph",
    "text": "Observability must capture technical and business signals: identity, tenant, operation, logical object, status, latency, size, cost, rejection, backend and correlation. Alerts should look for anomalies such as ID enumeration, 403 spikes, accelerated account creation, or calls to unusual destinations. The response plan needs to allow you to revoke credentials, block routes, reduce limits, and preserve evidence."
  },
  {
    "kind": "subhead",
    "text": "Responsible testing"
  },
  {
    "kind": "paragraph",
    "text": "Offensive testing should only occur in explicitly authorized environments and scopes. Use synthetic data, controlled limits and a rollback plan to avoid impact on users and production systems."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "25.14 Case studies and labs",
    "id": "25-14-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case study 1 - BOLA in Open Finance: an endpoint queries consent by identifier. The token is valid, but the service does not verify that the consent belongs to the correct client and participant. The correction includes querying by consentId, subject and organization, in addition to cross-testing and decision logs."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 2 - Flow Abuse: A credit simulation endpoint calls paid services and allows high volume by newly created accounts. Rate limiting by IP does not work against distribution. The defense combines limit per person, device, tenant, cost per operation, behavioral detection and queues."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3 - Partner API: A document service accepts external URL and follows redirects. An allowed domain redirects to a private address. The fix uses egress proxy, final IP resolution and validation, blocking of special networks, redirect limit and maximum response."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Build an authorization matrix for object, role and property. 2) Model cost limits for three operations. 3) Review an OpenAPI specification for sensitive fields and orphaned endpoints. 4) Design an SSRF-safe egress architecture. 5) Create alerts for enumeration, abuse, and increased bounces."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "The OWASP API Security Top 10 2023 organizes risks that appear recurrently in APIs. The first categories highlight that authentication and authorization need to operate at different levels: object, property, function and business flow. Other risks deal with resource consumption, SSRF, configuration, inventory and external dependencies."
  },
  {
    "kind": "paragraph",
    "text": "Effective protection combines controls across edge, gateway, backend, data and processes. The gateway standardizes policies and reduces exposure, but it does not alone know ownership, status and business intent. Secure development, threat modeling, inventory and observability are essential."
  },
  {
    "kind": "paragraph",
    "text": "The Top 10 should guide questions and priorities, not serve as a security certificate. A mature platform transforms each risk into requirements, tests, metrics, evidence and response plans, maintaining protection throughout the API lifecycle."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves into CORS, CSP, HSTS, and other HTTP headers, showing how browser and transport policies complement the security of APIs and web applications."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "API security checklist",
    "id": "api-security-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Every operation that receives an ID checks ownership, tenant and authorization context.",
      "Input and output use explicit models and property allowlists.",
      "Tokens are validated by signature, issuer, audience, time and type.",
      "Administrative functions have deny by default and negative tests.",
      "Operations have limits on size, time, concurrency, cost and pagination.",
      "Sensitive flows have protection against automation and economic abuse.",
      "Outbound calls use allowlists, controlled egress, and special network blocking.",
      "Effective configuration is versioned, reviewed and tested after deployment.",
      "Inventory contains owner, version, environment, data, consumers and withdrawal date.",
      "Third-party responses are validated and treated as untrustworthy.",
      "Logs and traces preserve correlation without recording credentials or sensitive data.",
      "There is a process for revoking, blocking, reducing limits and responding to incidents."
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
      "Differentiate BOLA, BFLA and authorization by property with examples.",
      "Explain why UUID is not authorization control.",
      "List validations required for a JWT access token.",
      "Design limits for a report export operation.",
      "Describe how a technically valid flow can be abused by bots.",
      "Propose controls against SSRF in a URL import functionality.",
      "Identify risks of trusting an identity header from the client.",
      "Build a minimum inventory for enterprise APIs.",
      "Describe how to validate responses from a partner API.",
      "Create a telemetry strategy to detect object enumeration."
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
        "BOLA",
        "Broken Object Level Authorization; authorization failure on a specific object."
      ],
      [
        "BFLA",
        "Broken Function Level Authorization; improper access to a function or operation."
      ],
      [
        "BOPLA",
        "Broken Object Property Level Authorization; undue exposure or alteration of properties."
      ],
      [
        "Credential stuffing",
        "Automated use of leaked credentials in other services."
      ],
      [
        "Deny by default",
        "Principle of denying access when there is no explicit permission."
      ],
      [
        "Egress control",
        "Control of destinations that an application can access."
      ],
      [
        "Mass assignment",
        "Automatic binding of input fields to internal properties."
      ],
      [
        "Ownership",
        "Relationship that determines who can access or modify an object."
      ],
      [
        "Rate limiting",
        "Call frequency restriction in one window."
      ],
      [
        "Sensitive business flow",
        "Legitimate flow that produces value and can be abused at scale."
      ],
      [
        "Shadow API",
        "API active outside of official inventory or governance."
      ],
      [
        "SSRF",
        "Server Side Request Forgery; inducing the server to access inappropriate destinations."
      ],
      [
        "Threat modeling",
        "Structured analysis of assets, threats, surfaces and controls."
      ],
      [
        "Unsafe consumption",
        "Excessive reliance on data and behavior from dependent APIs."
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
      "OWASP API Security Project. OWASP API Security Top 10 - 2023.",
      "OWASP. API1:2023 - Broken Object Level Authorization.",
      "OWASP. API2:2023 - Broken Authentication.",
      "OWASP. API3:2023 - Broken Object Property Level Authorization.",
      "OWASP. API4:2023 - Unrestricted Resource Consumption.",
      "OWASP. API5:2023 - Broken Function Level Authorization.",
      "OWASP. API6:2023 - Unrestricted Access to Sensitive Business Flows.",
      "OWASP. API7:2023 - Server Side Request Forgery.",
      "OWASP. API8:2023 - Security Misconfiguration.",
      "OWASP. API9:2023 - Improper Inventory Management.",
      "OWASP. API10:2023 - Unsafe Consumption of APIs.",
      "OWASP Application Security Verification Standard and Cheat Sheet Series.",
      "NIST. Secure Software Development Framework - SSDF.",
      "IETF. RFC 9110 - HTTP Semantics."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "This chapter uses the 2023 edition of the OWASP API Security Top 10, published by the official project. The list should be revisited when new editions are released, without abandoning controls arising from risks that remain relevant."
  }
];
