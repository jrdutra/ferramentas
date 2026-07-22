import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const GATEWAY_POLICIES_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Policies such as control, protection, and mediation executable pipeline"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/en/overview.svg",
    "alt": "Programmable policy pipeline between API Gateway input and response",
    "caption": "Opening figure - Policies transform the gateway into a programmable control and mediation pipeline."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "A policy is infrastructure code: order, dependencies, side effects and failure handling determine its behavior."
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
    "text": "The previous chapter introduced API Gateway as a specialized intermediary that terminates connections, applies controls, selects routes, and creates a new relationship with the backend. This chapter delves into the mechanism that makes this behavior programmable: gateway policies. A policy represents a decision or transformation unit executed at a certain point in the flow. Authentication, token validation, rate limiting, caching, payload transformation, routing and observability can be implemented by chained policies."
  },
  {
    "kind": "paragraph",
    "text": "In a simple demonstration, policies look like independent blocks that can be dragged or written in XML, YAML, JSON, or a graphical language. In production, however, they form a distributed program. The order changes the result; one policy produces context consumed by the next; external calls introduce latency and availability; reading the body can consume streams; retries can multiply effects; and a failure can terminate the request before the backend is reached."
  },
  {
    "kind": "paragraph",
    "text": "Policies are also part of the security model. A precedence error can allow traffic before authorization, log tokens in the clear, apply quota to the wrong identifier, or transform a signed message and invalidate its integrity. Therefore, policy design requires the same care as software engineering: clear responsibilities, testing, review, versioning, observability, rollback and change control."
  },
  {
    "kind": "paragraph",
    "text": "The goal of this chapter is to build a product-agnostic mental model and relate it to implementations such as Axway API Gateway, Azure API Management, and filter-based proxies. In the end, the reader should be able to design a pipeline, justify its order, predict failure effects, identify external dependencies and diagnose in which policy a call was changed or rejected."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each policy, record five elements: input, execution condition, effect, produced state and failure behavior. Then analyze how it interacts with previous and subsequent policies. This method turns a visual string into a comprehensible program."
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
      "Explain policy as an executable unit of decision, control or transformation in the data plan.",
      "Distinguish inbound, backend, outbound and on-error sections, recognizing equivalents in different products.",
      "Analyze order, dependencies, short-circuit, context variables and side effects.",
      "Design authentication, authorization, validation, throttling, caching, transformation and routing policies.",
      "Understand retries, timeouts, circuit breaker, fallback and idempotence.",
      "Recognize risks of body reading, buffering, header manipulation and external calls.",
      "Build consistent error handling without hiding the technical cause.",
      "Apply logs, metrics, traces, correlation and auditing at the policy level.",
      "Organize reuse, inheritance, scopes, fragments, templates and parameters.",
      "Apply CI/CD, testing, review, segregation of duties, and rollback to gateway policies."
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
      "22.1 What is a policy",
      "22.2 Execution model and sections",
      "22.3 Order, context and short-circuit",
      "22.4 Scopes, inheritance and precedence",
      "22.5 Authentication and identity policies",
      "22.6 Authorization and external decisions",
      "22.7 Validation of messages and contracts",
      "22.8 Rate limiting, quotas and throttling",
      "22.9 Transformation of headers, URL and payload",
      "22.10 Routing and backend selection",
      "22.11 Cache and coherence",
      "22.12 Resilience and external calls",
      "22.13 Error handling",
      "22.14 Observability and auditing",
      "22.15 Reuse and governance",
      "22.16 Testing, CI/CD and troubleshooting",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.1 What is a policy",
    "id": "22-1-what-is-a-policy"
  },
  {
    "kind": "paragraph",
    "text": "A policy is a rule executed by the gateway on a request, response, connection or context. It can observe data, produce variables, allow or deny continuity, modify the message, call an external service, change the destination or generate a response without forwarding the request. In graphic products, the policy can be represented by connected filters; on declarative platforms, by configuration elements executed in sequence."
  },
  {
    "kind": "paragraph",
    "text": "Policy should not be confused with abstract organizational policy. A rule like “only partner applications with an active contract can access the API” is a business or security policy. To execute it, the gateway can combine several technical policies: validate certificate, extract client_id, consult a PDP, check contract status, record decision and apply quota. The pipeline is the operational implementation of the rule."
  },
  {
    "kind": "paragraph",
    "text": "Policies can be local, when they only use the context already available, or remote, when they consult IdP, introspection endpoint, bank, cache, authorization service or anti-fraud system. Remote polices increase power, but also introduce network dependency, timeout, retry, authentication between components and the risk of cascading unavailability."
  },
  {
    "kind": "table",
    "caption": "Table 1 - A policy must have an explicit objective and observable effect.",
    "headers": [
      "Class",
      "Examples",
      "Dominant effect"
    ],
    "rows": [
      [
        "Security",
        "JWT, mTLS, API key, authorization.",
        "Allow, deny or enrich identity."
      ],
      [
        "Traffic",
        "Rate limit, quota, spike arrest.",
        "Control volume and competition."
      ],
      [
        "Mediation",
        "Headers, payload, protocol.",
        "Change representation or context."
      ],
      [
        "Routing",
        "Backend, version, region, canary.",
        "Choose destination and strategy."
      ],
      [
        "Operation",
        "Logs, metrics, tracing, auditing.",
        "Produce evidence and telemetry."
      ],
      [
        "Resilience",
        "Timeout, retry, circuit breaker.",
        "Contain failures and protect dependencies."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.2 Execution model and sections",
    "id": "22-2-execution-model-and-sections"
  },
  {
    "kind": "paragraph",
    "text": "Gateway platforms often divide the pipeline into phases. In inbound, the request is received and can be authenticated, validated, limited and transformed. In the backend phase, the gateway prepares and executes the call to the upstream. In outbound, it processes the response, removes data, adds headers, normalizes errors or stores cache. On failures, an on-error section or equivalent produces specific handling."
  },
  {
    "kind": "paragraph",
    "text": "These phases are logical, not universal. One product can represent everything as a tree of filters, another as declarative sections, and another as HTTP filters connected to the listener. The architect must map the concept to the product without assuming perfect equivalence. The decisive point is knowing where the message is, whether the backend has already been called and what context remains available."
  },
  {
    "kind": "paragraph",
    "text": "A policy can short-circuit and produce a response immediately. An invalid_token validation may return 401; an exceeded rate limit may return 429; a cache hit can return 200 without accessing the backend. Therefore, “the gateway received the call” does not mean that the backend was called. Logs from each phase need to make this decision visible."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/en/figure-01-policy-phases.svg",
    "alt": "Inbound, backend, outbound and on-error phases of the policy pipeline",
    "caption": "Figure 1 - The pipeline has phases, but any one can terminate or divert the flow."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.3 Order, context and short-circuit",
    "id": "22-3-order-context-and-short-circuit"
  },
  {
    "kind": "paragraph",
    "text": "The order of execution is part of the semantics. Correlating the request before any rejection ensures that 401 and 429 responses also have request IDs. Authenticate before authorizing provides identity to the decision policy. Validating payload size before parsing avoids wasting CPU on abusive messages. Applying transformation before validation may be correct when the gateway normalizes a legacy format, but dangerous when it hides invalid input."
  },
  {
    "kind": "paragraph",
    "text": "Policies exchange information through an execution context. This context can contain method, URL, headers, certificate, identity, variables, partial response, current error and metrics. Variables must have predictable names, a known type, and a documented scope. Reusing generic names like token, user or result in different fragments increases collisions and makes troubleshooting difficult."
  },
  {
    "kind": "paragraph",
    "text": "Short-circuit is useful to reject early and save backend. However, the response needs to preserve observability, CORS when applicable, security headers and error format. Otherwise, calls rejected by the gateway behave differently than responses produced by the backend, confusing consumers and monitors."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/en/figure-02-policy-order.svg",
    "alt": "Correlation, authentication, authorization, limits, transformation and routing order",
    "caption": "Figure 2 - The sequence needs to reflect dependencies and protection objectives."
  },
  {
    "kind": "subhead",
    "text": "Review question"
  },
  {
    "kind": "paragraph",
    "text": "If two policies are swapped, does the behavior change? If the answer is yes, this dependency must be documented and covered by testing. If the team doesn't know how to respond, the pipeline is not yet sufficiently understood."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.4 Scopes, inheritance and precedence",
    "id": "22-4-scopes-inheritance-and-precedence"
  },
  {
    "kind": "paragraph",
    "text": "Policies can be applied at different scopes: global, workspace, product, API, version, operation or specific instance. Broad scopes reduce duplication and ensure minimal controls, while narrow scopes allow specialized behavior. Risk appears when inheritance and precedence are not clear. An API may imagine that it has replaced a global policy when, in reality, it has just added another step."
  },
  {
    "kind": "paragraph",
    "text": "Inheritance should be used for enterprise invariants: correlation, minimal headers, secret protection, essential logs, and mandatory controls. Business rules, specific routing and payload transformation typically belong to scopes closer to the API. The more business logic is placed globally, the greater the blast radius of a change."
  },
  {
    "kind": "paragraph",
    "text": "Fragments and templates need to receive explicit parameters and avoid hidden dependencies on global variables. A change to a reused fragment can affect hundreds of APIs. Therefore, references must be versioned, tested by consumers and released gradually."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The correct scope balances consistency and autonomy.",
    "headers": [
      "Scope",
      "Proper use",
      "Risk"
    ],
    "rows": [
      [
        "Global",
        "Invariant corporate controls.",
        "Change with large blast radius."
      ],
      [
        "Product / workspace",
        "Policies common to a domain or channel.",
        "Coupling between different APIs."
      ],
      [
        "API",
        "Contract and security of that interface.",
        "Duplication if there are no fragments."
      ],
      [
        "Operation",
        "Specific exceptions and fine semantics.",
        "Fragmented and difficult to audit configuration."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.5 Authentication and identity policies",
    "id": "22-5-authentication-and-identity-policies"
  },
  {
    "kind": "paragraph",
    "text": "Authentication polices verify the presented credential and establish a trusted identity. This may involve API key, Basic Auth, client certificate, opaque access token, JWT or custom credentials. The result should not just be a boolean. The pipeline needs to produce normalized context: subject, client, issuer, audience, scopes, authentication method and assurance level."
  },
  {
    "kind": "paragraph",
    "text": "In JWT validation, the policy must check signature, allowed algorithm, issuer, audience, expiration and required claims. Just decoding the token does not authenticate anyone. For opaque tokens, the policy can query introspection, with controlled caching and short timeout. For mTLS, the identity must not be derived solely from the CN without trust rules, SAN, and certificate chain."
  },
  {
    "kind": "paragraph",
    "text": "Credentials should not be logged. When the gateway propagates identity to the backend via headers, it must remove equivalent headers sent by the consumer and write trusted values. The backend needs to accept these headers only from an authenticated network or gateway identity; otherwise, the consumer may forge the context."
  },
  {
    "kind": "subhead",
    "text": "Pseudocode - identity establishment and propagation"
  },
  {
    "kind": "paragraph",
    "text": "# Conceptual authentication flow remove_header_unreliable(\"X-Authenticated-Subject\") credential = extract_credential(request) identity = validate(credential) if identity.invalida: return 401 context.subject = identity.subject context.client_id = identity.client_id add_header_backend(\"X-Authenticated-Subject\", context.subject)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.6 Authorization and external decisions",
    "id": "22-6-authorization-and-external-decisions"
  },
  {
    "kind": "paragraph",
    "text": "Authorization responds to whether the identity can perform the action on the resource in that context. Simple policies check scopes, roles or claims. Advanced cases query a Policy Decision Point, sending attributes of the subject, resource, action and environment. The gateway policy acts as a PEP: collects data, requests a decision, applies allow or deny and records evidence."
  },
  {
    "kind": "paragraph",
    "text": "An external authorization call needs a stable contract, mutual authentication, timeout, circuit breaker and fail-open or fail-closed decision. For sensitive operations, fail-closed is the safe rule: if the PDP does not respond, access is denied. For non-critical telemetry, a policy may fail in a degraded way. This choice should be explicit and risk-approved, not accidentally decided by the tool's default behavior."
  },
  {
    "kind": "paragraph",
    "text": "Decisions can be cached when attributes and validity allow. The cache key must include all elements that influence the decision. Caching only by user, ignoring resource, action or tenant, creates incorrect authorization. Invalidation also needs to consider change of role, revocation and termination of contract."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Authorization must balance expressiveness, latency and availability.",
    "headers": [
      "Strategy",
      "Advantage",
      "Technical caution"
    ],
    "rows": [
      [
        "Local scopes/roles",
        "Low latency and simplicity.",
        "May be insufficient for dynamic context."
      ],
      [
        "External PDP",
        "Centralizes complex decisions.",
        "Availability, timeout and cache."
      ],
      [
        "Hybrid policy",
        "Local pre-filter and external decision.",
        "Consistency between two layers."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.7 Validation of messages and contracts",
    "id": "22-7-validation-of-messages-and-contracts"
  },
  {
    "kind": "paragraph",
    "text": "Validation policies check method, Content-Type, size, schema, mandatory fields, parameters and restrictions. Early validation protects the backend and makes errors consistent. OpenAPI can provide part of the contract, but not every business rule must be transferred to the gateway. Complex validations, dependent on the state of the domain, belong to the responsible service."
  },
  {
    "kind": "paragraph",
    "text": "Validating JSON or XML requires parsing and can consume memory. The gateway must impose a size limit before loading the body. On large streams, uploads and downloads, complete buffering can destroy performance. Policies that need to read the body must document whether they preserve the stream for later steps."
  },
  {
    "kind": "paragraph",
    "text": "Validation in detect or log-only mode can help with migration, but should not become a permanent state. If the organization collects violations without blocking, it needs time and criteria to activate enforcement. Otherwise, the declared contract and actual traffic continue to diverge."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The gateway protects the contract; the backend preserves domain truth.",
    "headers": [
      "Layer",
      "Examples",
      "Preferred location"
    ],
    "rows": [
      [
        "Syntax",
        "Well-formed JSON, valid XML.",
        "Gateway."
      ],
      [
        "Contract",
        "Schema, types, required, size.",
        "Gateway and backend testing."
      ],
      [
        "Simple semantics",
        "Ranges, enums, formats.",
        "Gateway or backend depending on ownership."
      ],
      [
        "Domain rule",
        "Balance, eligibility, state transition.",
        "Domain backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.8 Rate limiting, quotas and throttling",
    "id": "22-8-rate-limiting-quotas-and-throttling"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting restricts the number of events in a window; quota controls consumption accumulated over a longer period; throttling regulates speed or concurrency to protect capacity. Although terms vary between products, the policy needs to define unit, key, algorithm, window, response and distributed scope."
  },
  {
    "kind": "paragraph",
    "text": "The position in the pipeline changes the objective. Limiting by IP before authentication reduces volumetric attacks. Limit by client_id after authentication applies commercial plan or contract. Limiting by operation protects expensive endpoints. Many platforms combine layers, but each counter increases cost and dependency on shared state."
  },
  {
    "kind": "paragraph",
    "text": "On distributed gateways, local counters may allow the aggregate total to exceed the limit. Global counters require shared service and introduce latency. The architecture must declare whether the limit is approximate or strict. The 429 response should include guidance such as Retry-After when possible and not reveal unnecessary internal details."
  },
  {
    "kind": "subhead",
    "text": "Further deepening"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 27 will be dedicated to Rate Limiting, Quotas and Throttling. Here, the focus is on understanding how these policies participate in the pipeline and interact with identity, distributed state, and error handling."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.9 Transformation of headers, URL and payload",
    "id": "22-9-transformation-of-headers-url-and-payload"
  },
  {
    "kind": "paragraph",
    "text": "Transformation policies adapt consumers and backends: add or remove headers, rewrite paths, convert query parameters, change Content-Type or transform JSON and XML. They are useful for modernizing legacies and maintaining stable contracts, but they can create invisible coupling. The backend now depends on a message that no consumer sends directly."
  },
  {
    "kind": "paragraph",
    "text": "Security and identity headers require special rules. The gateway must remove untrusted values before inserting its own. Hop-by-hop headers should not be propagated as end-to-end headers. Host and SNI need to be handled consciously, as an incorrect rewrite may reach the wrong virtual host or cause certificate failure."
  },
  {
    "kind": "paragraph",
    "text": "Payload transformations cost CPU and memory and can change signature, hash or idempotency key. If a message is signed by the consumer, any change invalidates the signature, unless the model foresees a new signature by the gateway. Transformations must be small, tested and observable; Extensive business logic at the gateway becomes an integration monolith that is difficult to evolve."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of declarative policies"
  },
  {
    "kind": "paragraph",
    "text": "<inbound> <set-header name=\"X-Correlation-ID\" exists-action=\"skip\"> <value>@(Guid.NewGuid().ToString())</value> </set-header> <rewrite-uri template=\"/clientes/{id}\" /> <set-backend-service base-url=\"https://backend.interno\" /> </inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.10 Routing and backend selection",
    "id": "22-10-routing-and-backend-selection"
  },
  {
    "kind": "paragraph",
    "text": "Routing policies choose backend, version, region, cluster, tenant or canary implementation. The decision can use path, header, claim, weight, health, latency or external configuration. Routing is different from authorization: a consumer can be authorized and still be sent to the wrong backend if precedence rules are ambiguous."
  },
  {
    "kind": "paragraph",
    "text": "Canary and blue-green require affinity when the experience needs to remain consistent across calls. The gateway must record which variant was chosen and propagate identifier for tracing. Cross-region fallback needs to consider data residency, consistency, and idempotence. Automatically sending a write to another region after timeout can duplicate transactions."
  },
  {
    "kind": "paragraph",
    "text": "Backend discovery may depend on DNS, service registry, or static configuration. Policies should not perform customized resolution for each request without caching and limits. The control plane must distribute destinations securely, while the data plane continues to process traffic even during temporary unavailability of the management plane."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Routing needs to be explainable in logs and traces.",
    "headers": [
      "Decision",
      "input signal",
      "Evidence needed"
    ],
    "rows": [
      [
        "Version",
        "Path, header or query.",
        "Version requested and route applied."
      ],
      [
        "Canary",
        "Weight, cookie or client_id.",
        "Selected variant and reason."
      ],
      [
        "Region",
        "Locality, health and politics.",
        "Chosen region and fallback."
      ],
      [
        "Tenant",
        "Claim or host.",
        "Tenant validated and isolated backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.11 Cache and coherence",
    "id": "22-11-cache-and-coherence"
  },
  {
    "kind": "paragraph",
    "text": "Cache policies can reduce latency and backend load, but require understanding HTTP semantics and the data contract. The key must include method, normalized URI, and all relevant variations such as tenant, language, Accept, and authorization. Caching private response without separating consumers can cause serious leakage."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must respect Cache-Control, Vary, and invalidation rules when applicable. In authenticated APIs, the cache often needs to be private on a per-consumer basis or limited to truly public data. A cache hit should also produce logs and metrics; otherwise, the backend will look healthy because it receives less traffic, while consumers may be receiving stale content."
  },
  {
    "kind": "paragraph",
    "text": "Cache does not universally fix slow backend. It changes consistency and behavior on failure. Stale-while-revalidate and fallback with old data may be valid for catalog, but inappropriate for balance or authorization. The policy needs to reflect the criticality of the domain."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.12 Resilience and external calls",
    "id": "22-12-resilience-and-external-calls"
  },
  {
    "kind": "paragraph",
    "text": "Timeout limits how long the gateway waits. Retry repeats an operation under specific conditions. Circuit breaker stops calls when the dependency has persistent failures. Fallback produces alternative response or uses another source. These mechanisms must be designed in conjunction with the total latency budget and idempotence of the method."
  },
  {
    "kind": "paragraph",
    "text": "Retrying GET can be safe in many cases, but not automatically. A poorly designed GET can trigger side effects. Retry in POST can duplicate transactions without key idempotency and backend deduplication. It is also necessary to avoid multiplication between layers: client, gateway, mesh and backend can repeat simultaneously and turn a small failure into a storm."
  },
  {
    "kind": "paragraph",
    "text": "Auxiliary calls made by policies - introspection, PDP, vault, anti-fraud - need smaller timeouts than the main budget. The gateway must distinguish business API failure from policy dependency failure. Without this distinction, an unavailability of the authorization service appears as a generic 500 and hinders operational response."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/gateway-policies/en/figure-03-resilience.svg",
    "alt": "Coordination between timeout, retry, circuit breaker and fallback",
    "caption": "Figure 3 - Resilience requires coordination between mechanisms and layers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.13 Error handling and standardized responses",
    "id": "22-13-error-handling-and-standardized-responses"
  },
  {
    "kind": "paragraph",
    "text": "Error policies convert internal failures into stable consumer responses. They must preserve the correct status, a business or platform error code, secure message, correlation ID, and documentation. The treatment cannot transform any failure into 200 nor hide the difference between authentication, authorization, limitation, timeout and unavailability."
  },
  {
    "kind": "paragraph",
    "text": "A standardized response should avoid sensitive details such as stack trace, cluster name, file path, SQL, internal endpoint, or token content. At the same time, internal logs need to maintain the cause, policy, time and dependency involved. The consumer receives a safe view; the operation receives sufficient evidence."
  },
  {
    "kind": "paragraph",
    "text": "Errors produced before the backend need to apply common headers, including CORS when necessary. Otherwise, the browser may hide the real error due to CORS failure. It is also important to prevent the error policy from failing when trying to read variables that were not created, generating a second exception that masks the first."
  },
  {
    "kind": "code",
    "text": "Standardized error response example\n{\n  \"type\": \"https://api.empresa.example/errors/rate-limit\",\n  \"title\": \"Request limit exceeded\",\n  \"status\": 429,\n  \"detail\": \"Try again after the indicated period.\",\n  \"correlationId\": \"8f4d9c2a-...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.14 Observability and audit at policy level",
    "id": "22-14-observability-and-audit-at-policy-level"
  },
  {
    "kind": "paragraph",
    "text": "Gateway observability needs to answer which policies they executed, how much time they took, and what decision they made. An access log with status and total duration is necessary, but insufficient. Remote police must measure latency and results. Rate limit must register anonymized key and counter. Routing must register selected backend. Authentication must record method and reason for failure without exposing credentials."
  },
  {
    "kind": "paragraph",
    "text": "Distributed tracing must create or preserve trace context and generate spans for backend calls and policy dependencies. A transformation policy can add useful attributes, but cardinality needs to be controlled. client_id, API, operation, version and result are useful dimensions; Full payload and personal identifiers should not become metric labels."
  },
  {
    "kind": "paragraph",
    "text": "Audit differs from operational log. It records administrative changes and sensitive decisions with integrity, retention and controlled access. Who changed a global policy, who approved it, which version was deployed, and which APIs were affected are essential information for investigation and compliance."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Logs, metrics, traces and audit answer different questions.",
    "headers": [
      "Evidence",
      "Example",
      "Usage"
    ],
    "rows": [
      [
        "Access log",
        "API, operation, status, duration.",
        "Traffic diagnosis."
      ],
      [
        "Metric",
        "Failures due to policy, external latency.",
        "Alerts and capacity."
      ],
      [
        "Trace",
        "Gateway, PDP and backend spans.",
        "End-to-end analysis."
      ],
      [
        "Audit",
        "Author, version, approval and deployment.",
        "Governance and compliance."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.15 Reuse, fragments and governance",
    "id": "22-15-reuse-fragments-and-governance"
  },
  {
    "kind": "paragraph",
    "text": "Reuse reduces duplication, but needs to be controlled as a library. Fragments must have a contract, version, owner, examples, tests and changelog. A JWT validation fragment, for example, must declare issuers, audiences, algorithms, produced variables and error format. Without this, each API becomes dependent on implicit behavior."
  },
  {
    "kind": "paragraph",
    "text": "Governance must separate mandatory, recommended and optional policies. Mandatory requirements can be applied globally or checked in the pipeline. Recommended are adaptable templates. Options cover specific cases. Exceptions require justification and deadline; otherwise, the platform accumulates permanent settings that no one understands."
  },
  {
    "kind": "paragraph",
    "text": "Segregation of duties prevents a single person from changing authentication, publishing, and approving their own change in production. Git repository, pull requests, automatic validation, environments and controlled promotion transform policy into infrastructure as code. The portal or visual editor may continue to exist, but manual changes need to be reconciled with the source of truth."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "22.16 Testing, CI/CD and troubleshooting",
    "id": "22-16-testing-ci-cd-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Policy tests must cover happy path, missing credential, invalid_token, insufficient permission, limit exceeded, unavailable backend, external timeout and malformed response. Unit or mock tests validate expressions and fragments; integration tests run the actual gateway; load testing reveals cost of parsing, remote calls, and distributed state."
  },
  {
    "kind": "paragraph",
    "text": "The CI/CD pipeline can validate syntax, schema, references, secrets, prohibited policies, minimum order and presence of observability. Then, deploy it to a test environment, run automated cases, and promote an immutable artifact. Canary on the gateway itself reduces risk, but needs fast rollback and comparable metrics."
  },
  {
    "kind": "paragraph",
    "text": "When troubleshooting, first identify whether the call reached the listener and which API/operation was selected. Then go through the pipeline: correlation ID, authentication, authorization, rate limit, transformation, route, backend call, outbound and on-error. Avoid starting with the backend when the gateway responded without forwarding the request."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The diagnosis must locate the exact decision within the pipeline.",
    "headers": [
      "Symptom",
      "Policy hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "401 unexpected",
        "Issuer, audience, watch, header removed.",
        "Tokenless authentication trace in clear."
      ],
      [
        "403 flashing",
        "Decision cache, tenant or dynamic attribute.",
        "PDP decision ID and cache key."
      ],
      [
        "429 in a few orders",
        "Incorrect key or global counter.",
        "Boundary and scope identifier."
      ],
      [
        "502/504",
        "Route, timeout, retry or backend.",
        "Backend chosen and times per attempt."
      ],
      [
        "Empty payload",
        "Body consumed by transformation.",
        "Policy logs and size before/after."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Case Studies",
    "id": "case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Case study 1 - Valid token, incorrect authorization: the gateway validates JWT signature and expiration, but does not verify audience. A token issued to another API is accepted. The correction is not just adding a condition; is to review the corporate fragment, add negative tests, identify affected APIs and promote new version in a controlled way."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2 - Retries storm: client, gateway and service mesh repeat the same call. During backend degradation, each original request generates multiple attempts, exhausting connections. The redesign defines a single retry owner, total budget, conditions per method and circuit breaker based on error and latency."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3 - Forged Identity Header: The backend trusts X-User-ID, but the gateway preserves the value sent by the client when there is no token. The attacker injects the header. The fix always removes the external header, produces new value only after authentication, and restricts the backend to mTLS connections coming from the gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Policies are the program run by the data plane. They observe, decide, transform, call dependencies and can close the flow. The final behavior depends on order, context, scopes, inheritance, and failure handling."
  },
  {
    "kind": "paragraph",
    "text": "A robust pipeline authenticates and authorizes with explicit criteria, validates messages without assuming domain rules, controls traffic with correct keys, transforms only what is necessary, routes in an explainable way and applies caching and resilience according to the semantics of the operation."
  },
  {
    "kind": "paragraph",
    "text": "Policies need to be treated like code: versioned source, review, testing, CI/CD, observability, auditing, rollback and ownership. The visual editor is just one form of authoring; does not eliminate dependencies or side effects."
  },
  {
    "kind": "paragraph",
    "text": "Efficient troubleshooting moves through the pipeline with correlation ID and evidence per step. The central question is no longer “did the gateway fail?” and becomes “which policy made which decision, with which inputs and in how long?”."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 23 will delve deeper into the architecture and operation of the Axway API Gateway, relating concepts from this chapter to Policy Studio, filters, circuits, groups, instances, caches, configuration and platform operation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Policy review checklist",
    "id": "policy-review-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Each policy has a documented objective, owner, input, output and failure behavior.",
      "Pipeline order reflects dependencies and is covered by tests.",
      "Headers and identity variables cannot be forged by the consumer.",
      "Tokens, secrets, and personal data are removed from logs.",
      "External calls have timeout, authentication, metrics and fail-open/fail-closed decision.",
      "Limits use key, scope and counter consistent with the objective.",
      "Transformations preserve contract, streaming, signature and idempotence.",
      "Retries have a unique budget, condition and owner.",
      "Errors maintain correct status, secure format and correlation ID.",
      "Fragments are versioned, tested and have a known blast radius.",
      "Changes go through Git, review, validation, promotion and rollback.",
      "Logs, metrics, traces and auditing allow you to reconstruct decisions."
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
      "Design a pipeline for JWT-protected API and explain the order of policies.",
      "Compare applying rate limit before and after authentication.",
      "Explain why a body reading policy can affect later steps.",
      "Propose treatment for unavailability of an external PDP.",
      "Describe retry risks in a POST operation.",
      "Set a secure cache key for authenticated multi-tenant API.",
      "Explain how to prevent forged identity header.",
      "Propose global, API and operation scopes for different policies.",
      "Create a test matrix for expired token, incorrect audience, and missing scope.",
      "Describe a troubleshooting script for error 502 produced on the gateway."
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
        "Backend section",
        "Phase that prepares or executes the call to the upstream."
      ],
      [
        "circuit breaker",
        "Mechanism that interrupts calls when a dependency is degraded."
      ],
      [
        "Context",
        "State available during pipeline execution."
      ],
      [
        "Fail-closed",
        "Deny the operation when the decision engine fails."
      ],
      [
        "Fail-open",
        "Allow or degrade operation when a control fails."
      ],
      [
        "Fragment",
        "Reusable policy configuration snippet."
      ],
      [
        "Inbound",
        "Processing phase of the received request."
      ],
      [
        "On-error",
        "Flow executed when pipeline failure occurs."
      ],
      [
        "Outbound",
        "Response processing phase."
      ],
      [
        "PDP",
        "Component that calculates authorization decision."
      ],
      [
        "PEP",
        "Point that applies an authorization decision."
      ],
      [
        "Policy expression",
        "Expression evaluated at runtime to produce condition or value."
      ],
      [
        "Short circuit",
        "Early termination of the flow with its own response."
      ],
      [
        "Spike arrest",
        "Burst control to smooth out traffic spikes."
      ],
      [
        "Throttling",
        "Regulation of speed or concurrency of requests."
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
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9209 - The Proxy-Status HTTP Response Header Field.",
      "Microsoft Learn. Policies in Azure API Management.",
      "Microsoft Learn. Azure API Management policy references and policy expressions.",
      "Microsoft Learn. Validate-content, choose, retry, cache-lookup and set-variable references.",
      "Axway Documentation Portal. API Gateway, Policy Studio and policy filters.",
      "Envoy Proxy Documentation. HTTP filters, external authorization and rate limiting.",
      "OWASP. API Security Top 10 - 2023 Edition.",
      "OpenTelemetry. Trace Context and semantic conventions for HTTP."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "The syntax, availability, and scope of policies vary by product, edition, and version. Before applying examples, validate the official documentation of the deployed platform and run tests in an authorized environment."
  }
];
