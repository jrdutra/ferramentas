import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const REST_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "REST path of an enterprise operation"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/en/overview.svg",
    "alt": "REST path from a consumer enterprise operation to persistence",
    "caption": "Overview - the client expresses an intention about a resource; gateway, domain and persistence preserve the semantics of the operation."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The client selects a resource and an operation without knowing the internal implementation.",
      "The gateway validates context, enforces limits, and forwards a semantically correct HTTP message.",
      "The service changes or queries the state of the domain and returns a representation of the result."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "REST is often presented as a collection of conventions for creating HTTP endpoints, but its origin is architectural. The term describes a set of constraints applied to distributed hypermedia systems to induce properties such as scalability, simplicity, independent evolution, visibility of interactions and efficient use of intermediaries. An API can use JSON, HTTP methods, and organized paths without complying with all of these constraints; Therefore, distinguishing \"HTTP API\" from \"REST architecture\" avoids decisions based on labels alone."
  },
  {
    "kind": "paragraph",
    "text": "In this chapter, the focus is on the link between architecture and practice. The constraints will be studied based on the work of Roy Fielding, but each concept will be connected to the everyday design of corporate APIs: resource identification, method semantics, idempotency, caching, concurrency, pagination, errors, versioning, documentation, security and operation in gateways. The goal is not to impose a unique aesthetic, but rather to show how seemingly small decisions affect consumers, observability and long-term evolution."
  },
  {
    "kind": "paragraph",
    "text": "Modern HTTP has its own semantics, consolidated mainly in RFC 9110. REST benefits from this semantics, but is not reduced to it. Likewise, OpenAPI describes HTTP API contracts, but a well-formed OpenAPI description does not automatically transform an interface into REST. Throughout the material, these limits will be explained so that the reader knows which norm or principle is the basis for each choice."
  },
  {
    "kind": "paragraph",
    "text": "In banking and corporate environments, an API is rarely accessed directly. It can traverse WAF, balancer, API Gateway, service mesh and identity services. These intermediaries alter connections, apply policies and produce their own responses. A robust REST design needs to preserve semantics and traceability even when the message traverses multiple layers and different teams are responsible for each piece."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Read the sections on constraints and uniform interface first. Then use the methods and status tables as a design reference. In the labs, compare the behavior observed on the client, gateway and backend; the same response may have been produced by different components."
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
      "Explain REST as an architectural style and differentiate its constraints from market conventions.",
      "Distinguish resource, state, representation, identifier, operation and endpoint.",
      "Apply the uniform interface to the design of URIs, methods, headers, status codes and links.",
      "Analyze security, idempotency and cache without confusing these concepts.",
      "Design collections, pagination, filters, ordering, partial update and asynchronous operations.",
      "Standardize errors with Problem Details and control concurrency by HTTP preconditions.",
      "Plan compatibility and versioning, avoiding unnecessarily destructive changes.",
      "Use OpenAPI, contract testing, observability, and gateway policies as governance mechanisms.",
      "Diagnose REST failures by distinguishing transport, protocol, gateway, contract and domain problems."
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
      "10.1 REST as an architectural style",
      "10.2 Style properties and constraints",
      "10.3 Client-server and separation of responsibilities",
      "10.4 Stateless and request context",
      "10.5 Cache and reuse of responses",
      "10.6 Uniform interface",
      "10.7 Layered systems and code on demand",
      "10.8 Resource, State, and Representation",
      "10.9 Resource identification and URI design",
      "10.10 Semantics of HTTP methods",
      "10.11 Security, Idempotency, and Retries",
      "10.12 Status codes",
      "10.13 Negotiation of content and formats",
      "10.14 PUT, PATCH and updates",
      "10.15 Collections, filters, sorting and pagination",
      "10.16 Errors with Problem Details",
      "10.17 Conditional Caching, ETag, and Concurrency",
      "10.18 Asynchronous operations",
      "10.19 Compatibility and versioning",
      "10.20 Hypermedia and discovery",
      "10.21 OpenAPI and contract-driven design",
      "10.22 Security and authorization",
      "10.23 API Gateways and corporate policies",
      "10.24 Observability and troubleshooting",
      "10.25 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.1 REST as an architectural style",
    "id": "10-1-rest-as-an-architectural-style"
  },
  {
    "kind": "paragraph",
    "text": "Representational State Transfer was introduced by Roy Fielding as an architectural style for distributed hypermedia systems. A style is not a library, a protocol, or a data format. It defines a named set of constraints on components, connectors, and data, and these constraints induce certain architectural properties. This definition is important because it allows you to analyze a solution by its structural decisions, not just by its external syntax."
  },
  {
    "kind": "paragraph",
    "text": "In market practice, \"REST API\" has come to designate almost any HTTP API that uses apparent resources and JSON. This simplification can be useful in informal conversations, but it produces confusion when discussing caching, hypermedia, evolution and coupling. An interface with endpoints such as /executarQuery and /processarPagamento can work correctly over HTTP, but is closer to RPC. The problem is not using RPC when it meets the context; the problem is assigning REST properties to an architecture that was not designed with its constraints."
  },
  {
    "kind": "paragraph",
    "text": "The value of REST is in the emergent properties. Separating client and server allows independent evolution; self-contained messages increase visibility; cache reduces interactions; uniform interface simplifies intermediaries; Layers enable scalability and cross-cutting policies. Each benefit has a cost. Stateless transfers context to messages or shared storage; uniform interface limits specific operations; Hypermedia requires models and clients capable of interpreting relationships."
  },
  {
    "kind": "paragraph",
    "text": "Therefore, good practices must be evaluated by their effect on the system. Using nouns in URIs is a resource-consistent heuristic, but it is not the essence of REST. Using all HTTP codes does not guarantee good semantics. A mature API defines stable resources, uses protocol semantics predictably, and explicitly documents where domain needs require different decisions."
  },
  {
    "kind": "subhead",
    "text": "Architecture question"
  },
  {
    "kind": "paragraph",
    "text": "Before asking \"which endpoint should I create?\", ask: what is the resource, who controls its state, what representation will be transferred, and what evolution, cache, and visibility properties are needed?"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.2 Style properties and constraints",
    "id": "10-2-style-properties-and-constraints"
  },
  {
    "kind": "paragraph",
    "text": "Fielding derives REST by combining known constraints: client-server, stateless, cache, uniform interface, layered system and, optionally, code on demand. None of these constraints alone define REST. A client-server system can maintain a session with the server; a stateless service can expose RPC operations; a cacheable application may not have a uniform interface. The style arises from the composition of the set."
  },
  {
    "kind": "paragraph",
    "text": "Desired properties include interaction performance, component scalability, interface simplicity, modifiability, visibility, portability, and reliability. There is tension between them. Caching can improve performance and scalability, but it introduces the risk of stale data. Layering increases flexibility and security, but adds latency. Uniform interface simplifies the overall architecture, but may be less efficient for a highly specialized operation."
  },
  {
    "kind": "paragraph",
    "text": "Enterprise architecture requires making these tradeoffs explicit. A quote API can accept few seconds of staleness and use aggressive caching. A financial transfer operation needs stricter consistency, authorization and idempotency. Both can use HTTP, but their representation, precondition and response policies will be different."
  },
  {
    "kind": "paragraph",
    "text": "The correct decision is not to apply a list mechanically. It consists of understanding the purpose of each constraint, preserving shared semantics and documenting exceptions. When a team introduces session server, for example, it should recognize the impact on balancing, recovery, and scalability, rather than claiming that the system remains stateless just because it uses tokens."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/en/figure-01.svg",
    "alt": "The architectural constraints that, combined, form the REST style",
    "caption": "Figure 1 - REST results from the combination of architectural constraints, not from an isolated convention."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.3 Client-server and separation of responsibilities",
    "id": "10-3-client-server-and-separation-of-responsibilities"
  },
  {
    "kind": "paragraph",
    "text": "The client-server constraint separates interface and experience concerns from storage and business rule concerns. The client knows the interaction contract; the server controls the resources and their internal evolution. This division allows web, mobile, batch and partner applications to reuse capabilities from the same domain without sharing the backend implementation."
  },
  {
    "kind": "paragraph",
    "text": "Separation does not mean absence of coupling. The client still depends on the semantics of representations, identifiers and possible transitions. An API that directly exposes internal tables or class names transfers implementation decisions to consumers. Internal changes become public changes, reducing the independence the constraint was intended to create."
  },
  {
    "kind": "paragraph",
    "text": "On enterprise platforms, API Gateway and BFF add nuance. The gateway acts as an intermediary and should not absorb domain rules just because it is a central point. A BFF can adapt granularity and representation for a specific channel, but needs to avoid copying the entire business model. The appropriate boundary maintains cross-cutting policies at the gateway and domain decisions at the responsible service."
  },
  {
    "kind": "paragraph",
    "text": "A good assessment looks at the direction of the facilities. The consumer must depend on a stable contract; the service can change bank, language, algorithm or topology without changing this contract. When internal change requires simultaneous updating of all clients, the separation exists only physically, not architecturally."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.4 Stateless and request context",
    "id": "10-4-stateless-and-request-context"
  },
  {
    "kind": "paragraph",
    "text": "Stateless means that each request contains the information necessary to be understood and processed, and that the server does not depend on application session context stored between requests from the same client. The server obviously maintains state of resources, configurations, keys and business data. The constraint refers to the conversational state of the client-server interaction, not the lack of persistence."
  },
  {
    "kind": "paragraph",
    "text": "Tokens, cookies, and headers can carry context, but using a token does not automatically make the API stateless. If the token references a mutable session held in local memory of an instance, the next request may depend on affinity. On the other hand, a session identifier stored in a shared repository reduces dependency on the instance, but still represents session state on the server. The design must be described accurately."
  },
  {
    "kind": "paragraph",
    "text": "The main operational advantage is that it allows any compatible instance to process any request. This makes balancing, autoscaling, and recovery easier. It also improves visibility because the message contains enough context for auditing. The cost is increasing the size of requests and requiring authorization, correlation, and preferences to be resent or derived from shared data."
  },
  {
    "kind": "paragraph",
    "text": "In multistep operations, the domain often needs to persist progress. This does not violate stateless if progress is modeled as a resource, for example /solicitacoes-transferencia/abc, and not as implicit memory of a conversation tied to a server. Turning a process into a resource makes the state observable, queryable and recoverable."
  },
  {
    "kind": "subhead",
    "text": "Stateless does not mean \"without state\""
  },
  {
    "kind": "paragraph",
    "text": "The server maintains the state of resources. The constraint avoids relying on hidden conversational state between requests. Modeling a journey as a persistent resource is often more scalable and auditable than maintaining an implicit session."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.5 Cache and reuse of responses",
    "id": "10-5-cache-and-reuse-of-responses"
  },
  {
    "kind": "paragraph",
    "text": "Cache constraint requires responses to indicate whether they can be reused. In HTTP, directives like Cache-Control, validators like ETag, and expiration rules allow clients and intermediaries to avoid unnecessary transfers and processing. Caching reduces latency and load, but is only secure when the response semantics and variation by user, authorization, and content are correctly declared."
  },
  {
    "kind": "paragraph",
    "text": "A custom response should not be stored in a shared cache without adequate controls. Cache-Control: private restricts reuse to private cache; no-store requests that the message not be stored; Vary tells you which headers change the representation. The absence of this information can cause leakage between users or inconsistent behavior, especially when CDN, reverse proxy and gateway participate in the path."
  },
  {
    "kind": "paragraph",
    "text": "Not every API should disable caching by default. Catalogs, public parameters, reference rates, and metadata can benefit from revalidation. Even when the representation changes frequently, a conditional GET with If-None-Match can return 304 without a body. This preserves correction and saves bandwidth."
  },
  {
    "kind": "paragraph",
    "text": "The team needs to define who controls policy. The backend knows the semantics of the resource; the gateway can apply limits or supplement headers, but it should not invent validity of data that it does not know. Centralized policies must be contractually parameterized and tested with real caches to avoid broad rules that change the behavior of different APIs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.6 Uniform interface",
    "id": "10-6-uniform-interface"
  },
  {
    "kind": "paragraph",
    "text": "The uniform interface is the central feature of REST and has four aspects: resource identification; manipulation by representations; self-contained messages; and hypermedia as a driver of application state. The goal is to reduce coupling through common semantics that can be understood by clients, servers, and intermediaries."
  },
  {
    "kind": "paragraph",
    "text": "Identifying resources means using stable identifiers for concepts, not necessarily for database rows. Manipulation by representations means that the client receives or sends a representation and the server interprets this representation according to the method and the contract. Self-contained messages use method, URI, headers, status and media type to inform how they should be processed."
  },
  {
    "kind": "paragraph",
    "text": "Hypermedia adds possible relationships and actions to representation. Instead of the client building all the paths from external knowledge, the server can provide links and controls based on the current state. This practice is less common in enterprise APIs, but its idea remains valuable: the server should guide valid transitions and reduce navigation rules coded outside the contract."
  },
  {
    "kind": "paragraph",
    "text": "Uniformity does not mean that all APIs have the same resources. It means that the interaction uses elements with shared meaning. GET should not be redefined as a destructive operation, 404 should not mean temporary unavailability and Content-Type should not be omitted when the body depends on interpretation. The more the API respects common semantics, the less special knowledge the consumer needs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.7 Layered systems and code on demand",
    "id": "10-7-layered-systems-and-code-on-demand"
  },
  {
    "kind": "paragraph",
    "text": "The layered system constraint allows intermediaries to be inserted without the client needing to know the entire topology. Proxies, caches, gateways, service meshes, and balancers can receive an interaction and forward it. Each component sees only its immediate neighbors and applies local responsibilities. This property is fundamental in corporate environments, where security, routing and observability are distributed."
  },
  {
    "kind": "paragraph",
    "text": "Layering also creates the risk of losing context. An intermediary can replace Host, terminate TLS, change cache, remove headers or produce its own response. Therefore, the design needs to define identity propagation, trace context, original address and correlation. Architectural transparency should not turn into operational invisibility: logs need to show which layer made each decision."
  },
  {
    "kind": "paragraph",
    "text": "Code on demand is the only optional constraint of REST. It allows the server to send executable code to extend the client, much like web scripting. In integration APIs, this mechanism is rare and generally undesirable for security, predictability, and governance reasons. Its absence does not prevent the architecture from being REST."
  },
  {
    "kind": "paragraph",
    "text": "In API Gateways, the layer must enforce policies and adapt infrastructure details, but the semantics of the resource must remain coherent. A gateway that converts all errors to 200 or turns GET into a side-effect operation breaks the uniform interface and hampers tools, caches and consumers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.8 Resource, State, and Representation",
    "id": "10-8-resource-state-and-representation"
  },
  {
    "kind": "paragraph",
    "text": "Resource is an identifiable conceptual abstraction: customer, account, payment, proposal, limit or request. The resource may change over time, but its identity remains. State is the current condition of this resource in the domain. Representation is a sequence of bytes accompanied by metadata that describes some view of that state, such as JSON, XML, CSV, or image."
  },
  {
    "kind": "paragraph",
    "text": "Confusing resource with representation leads to overly format-oriented endpoints. /cliente.json can be useful in specific contexts, but normally the format is negotiated by media type. Confusing resource with table also limits evolution: an account can aggregate data from multiple sources and expose only authorized properties, without reflecting the internal structure."
  },
  {
    "kind": "paragraph",
    "text": "The representation does not need to contain the entire state. It can be summarized, expanded, localized or filtered according to authorization and use case. The contract must make it clear which fields are data, metadata, links and calculated information. Missing fields also have semantics: they can mean not applicable, unauthorized, or unsolicited, and this distinction must be documented."
  },
  {
    "kind": "paragraph",
    "text": "In banking systems, the same resource can have different representations for the customer, attendant and auditor. The identifier remains, but each channel receives attributes compatible with its purpose and permission. This approach is safer than returning a complete object and expecting the consumer to ignore sensitive fields."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/en/figure-02.svg",
    "alt": "Relationship between resource, state and representations in different formats",
    "caption": "Figure 2 - The resource has an identity; Representations convey views of the state in specific formats."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.9 Resource identification and URI design",
    "id": "10-9-resource-identification-and-uri-design"
  },
  {
    "kind": "paragraph",
    "text": "URIs must identify resources in a stable and predictable way. Plural collection names, such as /customers and /payments, are a useful, although not normative, convention. The key aspect is to preserve meaning and avoid incorporating volatile implementation details. Paths do not need to reproduce the hierarchy of internal tables, packages, or services."
  },
  {
    "kind": "paragraph",
    "text": "Relationships can be expressed by sub-resources when there is a clear dependency: /clientes/123/accounts. However, very deep paths increase coupling and make reuse difficult. If account 456 has its own identity, /accounts/456 can be the canonical identifier, while the collection under client serves as a form of navigation or filter."
  },
  {
    "kind": "paragraph",
    "text": "Query parameters represent selection, search, pagination, ordering or projection. They are not inferior to path segments; have different semantic roles. /payments?status=pending selects a view of the collection, while /payments/abc identifies a member. The team must define normalization, encoding, case sensitivity, and behavior of unknown parameters."
  },
  {
    "kind": "paragraph",
    "text": "Avoid verbs that duplicate methods, such as /obterCliente or /deletarPagamento. Domain operations that don't naturally fit into CRUD can be modeled as action or process resources, for example POST /accounts/123/locks. This modeling creates an identifiable record of the block and allows for auditing, querying, and idempotency."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Examples of identifying resources and different intentions.",
    "headers": [
      "Situation",
      "Preferable URI",
      "Reason"
    ],
    "rows": [
      [
        "Account collection",
        "/accounts",
        "Identifies the resource set."
      ],
      [
        "Specific account",
        "/accounts/123",
        "Stable member identity."
      ],
      [
        "Filter",
        "/accounts?status=active",
        "Selects a view from the collection."
      ],
      [
        "Auditable action",
        "POST /accounts/123/blocks",
        "Models the action as resource creation."
      ],
      [
        "Avoid",
        "/executeBloqueioConta?id=123",
        "Mixes RPC, parameter and operation in an unstable name."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.10 Semantics of HTTP methods",
    "id": "10-10-semantics-of-http-methods"
  },
  {
    "kind": "paragraph",
    "text": "HTTP methods carry shared semantics. GET requests the transfer of a representation; HEAD gets equivalent metadata without the content; POST asks the target resource to process the representation according to its semantics; PUT replaces the state of the representation in the identifier; DELETE requests removal from association; PATCH applies a partial modification; OPTIONS describes communication options."
  },
  {
    "kind": "paragraph",
    "text": "The method is not just a decorative field. Caches, proxies, libraries and replay mechanisms make decisions based on it. A GET with a relevant side effect can be triggered by prefetch, crawler or revalidation. A POST treated as idempotent without an idempotency key can duplicate transactions when the client retries after a timeout."
  },
  {
    "kind": "paragraph",
    "text": "PUT is normally directed to a known URI. The client sends the desired representation and, depending on the contract, creates or replaces the resource. POST is often used when the server selects the identifier or when the semantics are not simple substitution. The distinction must be observable in the contract, not just in implementation."
  },
  {
    "kind": "paragraph",
    "text": "HEAD and OPTIONS are often overlooked. HEAD can support existence checking and validators as long as the headers match the GET. OPTIONS can support CORS and capability discovery, but does not replace formal documentation. TRACE is generally disabled in production by security policy and is rarely useful in business APIs."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Semantic properties of HTTP methods. Idempotency describes the intended effect, not the literal equality of responses.",
    "headers": [
      "Method",
      "Insurance",
      "Idempotent",
      "Typical usage",
      "Frequently answered"
    ],
    "rows": [
      [
        "GET",
        "Yes",
        "Yes",
        "Read resource or collection",
        "200, 206, 304, 404"
      ],
      [
        "HEAD",
        "Yes",
        "Yes",
        "Read metadata without content",
        "200, 304, 404"
      ],
      [
        "POST",
        "No",
        "Not by default",
        "Create member or process command",
        "201, 202, 200, 409"
      ],
      [
        "PUT",
        "No",
        "Yes",
        "Create/replace on known URI",
        "200, 201, 204, 412"
      ],
      [
        "PATCH",
        "No",
        "Depends on the format",
        "Apply partial change",
        "200, 204, 409, 412"
      ],
      [
        "DELETE",
        "No",
        "Yes in intention",
        "Remove association/resource",
        "202, 204, 404"
      ],
      [
        "OPTIONS",
        "Yes",
        "Yes",
        "Options and CORS",
        "200, 204"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.11 Security, Idempotency, and Retries",
    "id": "10-11-security-idempotency-and-retries"
  },
  {
    "kind": "paragraph",
    "text": "A secure method is defined as read-only in the client's intent. This does not prevent incidental effects such as logs, metrics or technical charges, as long as the client has not requested a change in state for that interaction. GET and HEAD are safe; POST, PUT, PATCH and DELETE are not. Semantic security is relevant for automation, preloading, and navigation."
  },
  {
    "kind": "paragraph",
    "text": "Idempotency means that multiple identical requests have the same intended effect as a single request. PUT and DELETE are idempotent in intent, although responses may vary: the first DELETE may return 204 and the second 404. The property helps clients and intermediaries decide whether an operation can be retried after transport failure."
  },
  {
    "kind": "paragraph",
    "text": "POST can gain safe retry via idempotency key. The client sends a unique identifier per logical attempt; the server stores the associated result and returns the same operation when it receives the key again with compatible content. The key must have a defined scope, deadline, collision rules and persistence. Only body deduplication can join equal legitimate transactions."
  },
  {
    "kind": "paragraph",
    "text": "Ambiguous timeout is a critical scenario. The client does not know whether the server processed the request before the connection failed. In payments, blindly repeating can double debt. A robust design combines business identifier, idempotency key, status query and reconciliation. The gateway can validate presence and key format, but deduplication needs to reach the layer that controls the business effect."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.12 Status codes and response semantics",
    "id": "10-12-status-codes-and-response-semantics"
  },
  {
    "kind": "paragraph",
    "text": "Status codes classify the result of attempting to process the request. Class 2xx indicates success, 3xx redirection or use of stored representation, 4xx condition attributed to the request or client and 5xx failure of the server or intermediary. The choice should represent the state of the protocol, while the body details the problem domain."
  },
  {
    "kind": "paragraph",
    "text": "200 is appropriate when there is representation of success. 201 indicates creation and should normally accompany Location. 202 informs you that processing was accepted, not completed. 204 indicates success without content. Using 200 for all situations and putting success=false in the JSON prevents generic infrastructure, metrics, and clients from correctly interpreting the response."
  },
  {
    "kind": "paragraph",
    "text": "Between 4xx, 400 represents a syntactically or semantically invalid request in general; 401 requires valid authentication; 403 indicates that the identity is understood, but the action is not allowed; 404 reports that the resource was not found or cannot be revealed; 409 represents conflict with the current state; 412 indicates precondition failure; 422 can represent content that is well-formed but not semantically processable."
  },
  {
    "kind": "paragraph",
    "text": "At 5xx, 500 covers unexpected failure of the responding component; 502 indicates invalid response from upstream; 503 represents temporary unavailability and may include Retry-After; 504 indicates timeout waiting upstream. In a layered architecture, it is essential to record which component produced the code. A 502 from the gateway should not be confused with a response from the backend."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Frequent codes in corporate APIs and interpretation errors.",
    "headers": [
      "Code",
      "Recommended use",
      "Common mistake"
    ],
    "rows": [
      [
        "200 OK",
        "Operation completed with representation",
        "Used to hide errors on the body."
      ],
      [
        "201 Created",
        "New resource created; Location recommended",
        "Return without resource identifier."
      ],
      [
        "202 Accepted",
        "Asynchronous processing started",
        "Interpret it as the conclusion of the deal."
      ],
      [
        "204 No Content",
        "Success without a body",
        "Send JSON along with 204."
      ],
      [
        "400 Bad Request",
        "Invalid message or general parameters",
        "Use for any domain rule."
      ],
      [
        "401 Unauthorized",
        "Missing or invalid credential",
        "Use when the user is authenticated without permission."
      ],
      [
        "403 Forbidden",
        "Identity without authorization",
        "Reveal sensitive policy details."
      ],
      [
        "409 Conflict",
        "Conflict with current state",
        "Use in place of precondition 412."
      ],
      [
        "429 Too Many Requests",
        "Limit exceeded",
        "Do not inform window or Retry-After."
      ],
      [
        "503 Service Unavailable",
        "Temporary unavailability",
        "Use for permanent failure of contract."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.13 Negotiation of content and formats",
    "id": "10-13-negotiation-of-content-and-formats"
  },
  {
    "kind": "paragraph",
    "text": "Content-Type describes the type of content sent. Accept expresses acceptable formats for the response. When the server cannot produce compatible format, 406 can be used; when it does not support the received body, 415 is appropriate. The media type is part of the semantics and should not be inferred solely from the URI extension."
  },
  {
    "kind": "paragraph",
    "text": "JSON is common for simplicity and ecosystem, but it has decisions that need to be contracted: representation of dates, monetary values, large numbers, null, enums, property names and precision. Financial values ​​should not depend on binary floating point without explicit strategy. An amount can be modeled with a textual decimal or integer minimum unit accompanied by the currency."
  },
  {
    "kind": "paragraph",
    "text": "Negotiation can also involve language, compression and profiles. Accept-Language allows for language preferences, while Content-Encoding describes compression. Vary headers need to reflect dimensions that alter the response so that caches do not reuse incompatible representation."
  },
  {
    "kind": "paragraph",
    "text": "Specific media types can evolve contracts with greater precision, but increase operational complexity. For many organizations, application/json with clear versioning and documentation is sufficient. The important thing is not to mix multiple incompatible structures under the same type without discrimination mechanism and contract testing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.14 PUT, PATCH and partial updates",
    "id": "10-14-put-patch-and-partial-updates"
  },
  {
    "kind": "paragraph",
    "text": "PUT represents replacement of the representation state in the target URI. If the contract allows omitted fields with the meaning of preservation, the operation ceases to be a clear replacement and becomes closer to a patch. To avoid data loss, the server must document required, read-only fields, default values, and missing property behavior."
  },
  {
    "kind": "paragraph",
    "text": "PATCH applies a set of changes and its behavior depends on the media type. JSON Patch describes operations such as add, remove, replace and test on paths; JSON Merge Patch uses a resource-like document, where null has stripping semantics. These formats solve different problems and must be chosen consciously."
  },
  {
    "kind": "paragraph",
    "text": "Partial update increases authorization risk per property. A client authorized to edit a nickname may attempt to change the limit, status or ownership. The server needs to validate permissions at the field level and silently ignoring unauthorized properties is rarely a good choice as it masks errors and attacks. Returning explicit problem is more auditable."
  },
  {
    "kind": "paragraph",
    "text": "PUT and PATCH must be combined with preconditions when concurrency is relevant. Without If-Match, two consumers can read the same version and the latter overwrites changes from the former. Validators turn this condition into a detectable conflict and allow the client to reload the state before trying again."
  },
  {
    "kind": "code",
    "text": "# Conceptual JSON Patch example\nPATCH /customers/123\nContent-Type: application/json-patch+json\nIf-Match: \"v12\"\n[\n  {\"op\": \"replace\", \"path\": \"/nickname\", \"value\": \"Primary account\"},\n  {\"op\": \"test\", \"path\": \"/status\", \"value\": \"ACTIVE\"}\n]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.15 Collections, filters, sorting and pagination",
    "id": "10-15-collections-filters-sorting-and-pagination"
  },
  {
    "kind": "paragraph",
    "text": "Collections need to remain usable as volume grows. Returning all records works in the lab, but produces latency, memory consumption, and risk of unavailability. The API must define default size, maximum allowed and behavior when the client requests a value above the limit. Limits need to exist on the backend, not just the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Offset pagination is simple and allows you to jump to a position, but you can repeat or omit items when the set changes between pages. Cursor pagination uses an opaque position derived from sorting and tends to provide better continuity in changing data. The cursor must not expose internal details that impede progress or allow undue manipulation."
  },
  {
    "kind": "paragraph",
    "text": "Filters and sorting need to be restricted to supported fields. Accepting arbitrary expressions can create expensive queries or injection. The API must document operators, multiple values, timezone, case sensitivity and AND/OR combination. The gateway can limit query size, but the service must control semantic cost."
  },
  {
    "kind": "paragraph",
    "text": "Pagination metadata can appear in the body or in links. Reporting next is more reliable than asking the client to calculate the next cursor. Accurate totals can be expensive and inconsistent across large sets; the contract must distinguish exact, estimated or missing total. On screens, sometimes \"there's more\" is enough."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Paging strategies and their commitments.",
    "headers": [
      "Strategy",
      "Advantages",
      "Limitations",
      "Indicated use"
    ],
    "rows": [
      [
        "Offset/limit",
        "Simple; allows jumps",
        "Unstable under insertions; high offsets can be expensive",
        "Moderated reports and sets"
      ],
      [
        "Numbered page",
        "Familiar to UI",
        "Same limitations as offset",
        "Human navigation"
      ],
      [
        "Cursor",
        "Continuity and performance",
        "Does not allow arbitrary jumping; cursor must be opaque",
        "Feeds and large collections"
      ],
      [
        "Keyset",
        "Efficient query by sorted key",
        "Requires stable and composite ordering",
        "High volume transactional data"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.16 Standard errors with Problem Details",
    "id": "10-16-standard-errors-with-problem-details"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9457 defines Problem Details to carry machine-readable errors without creating a new format for each API. The basic members are type, title, status, detail, and instance. The type identifies a problem class by URI; the detail explains the specific occurrence; instance identifies the occurrence when appropriate. Extensions can add domain fields."
  },
  {
    "kind": "paragraph",
    "text": "The status in the body does not replace the HTTP code; it helps when the object is stored or travels through context that separates metadata. The type must not be mutable free text. An organization-controlled URI can document meaning, fields, and recommended actions. Clients should treat unknown extensions tolerantly."
  },
  {
    "kind": "paragraph",
    "text": "Validation errors can include a collection of violations with path, code, and message. Do not include stack trace, SQL query, server name, or policy details. The external response must support correction without exposing implementation. The correlation identifier allows support to find internal details in protected logs."
  },
  {
    "kind": "paragraph",
    "text": "Standardization reduces special code on consumers and improves observability. The gateway can convert its own technical failures to the same format, but must preserve origin and category. An authentication problem generated by the gateway must not use the same type of business rule generated by the backend."
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.company.example/problems/account-blocked\",\n  \"title\": \"The account does not allow transactions\",\n  \"status\": 409,\n  \"detail\": \"Account 123 is blocked for debits.\",\n  \"instance\": \"/occurrences/req-7f2a\",\n  \"code\": \"ACCOUNT_BLOCKED\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Public error and internal diagnosis"
  },
  {
    "kind": "paragraph",
    "text": "The response must be stable and secure. Internal logs can contain stack trace and technical context, linked by request ID. Do not convey internal details to the consumer just to facilitate support."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.17 Conditional Caching, ETag, and Concurrency",
    "id": "10-17-conditional-caching-etag-and-concurrency"
  },
  {
    "kind": "paragraph",
    "text": "Validators allow you to check whether a representation has changed. ETag is an identifier assigned to the version of the representation; Last-Modified uses modification date. On reads, If-None-Match may result in 304 Not Modified. On changes, If-Match requires that the current version matches the submitted validator and prevents silent overwrite."
  },
  {
    "kind": "paragraph",
    "text": "Strong ETag indicates byte-to-byte equivalence according to the protocol rules; Weak ETag indicates sufficient semantic equivalence for caching, but not for some range operations. The API should avoid computing expensive hashing of large bodies when a domain version or persistence identifier already provides adequate validator."
  },
  {
    "kind": "paragraph",
    "text": "Optimistic concurrency control is especially important in registrations and configurations. The client reads v7, changes it and sends If-Match: \"v7\". If another process has already produced v8, the server returns 412. The client then decides whether to reload, merge, or abandon. This decision should not be automatically overridden by the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Preconditions also protect creation. If-None-Match: * can request the operation to occur only if the resource does not exist. This mechanism is useful when the client knows the URI and wants to avoid accidental substitution. Semantics must be tested across all intermediaries to ensure that headers are preserved."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/en/figure-03.svg",
    "alt": "Conditional reading and optimistic concurrency control with ETag",
    "caption": "Figure 3 - Validators allow revalidation and optimistic concurrency control without a server session."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.18 Asynchronous operations and long processes",
    "id": "10-18-asynchronous-operations-and-long-processes"
  },
  {
    "kind": "paragraph",
    "text": "An operation that requires minutes should not keep the connection open indefinitely. The server can accept the request, create an operation resource, and return 202 with Location for querying. The resource represents progress, results, failures and timestamps, allowing the consumer to resume monitoring after disconnection."
  },
  {
    "kind": "paragraph",
    "text": "The operation status must have a clear lifecycle: received, processing, completed, failed, canceled or expired. Percentage should only be used when it has meaning. For stages without a reliable forecast, inform the current stage. The result can be embedded, linked or made available as a separate resource."
  },
  {
    "kind": "paragraph",
    "text": "Retry-After guides when to query again, but the client must use backoff and limits. Webhooks can reduce polling, but they introduce authentication, at-least-once delivery, retry, and destination validation. An architecture can combine queryable resource with webhook, ensuring recovery when notification fails."
  },
  {
    "kind": "paragraph",
    "text": "Asynchronous operations also need idempotency. Repeating the creation after timeout should return the same logical operation when the key is equal. The gateway can impose short connection timeouts without canceling processing on the backend; therefore, status and correlation must survive termination of the original connection."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.19 Compatibility and versioning",
    "id": "10-19-compatibility-and-versioning"
  },
  {
    "kind": "paragraph",
    "text": "Versioning is a consequence of incompatible changes, not a goal in itself. Adding optional field is often supported for tolerant clients, while removing field, changing type, renaming enum, or changing meaning can break clients. The organization needs to define its compatibility policy and test it automatically."
  },
  {
    "kind": "paragraph",
    "text": "Version in path, like /v1, is visible and easy to route, but makes version a part of all identifiers. Version by header or media type preserves URI, but may be less obvious and require specific support. No strategy eliminates the need for governance, cataloging, deprecation, and migration."
  },
  {
    "kind": "paragraph",
    "text": "Avoid creating v2 by any addition. Multiple simultaneous versions increase security, operation and data costs. Evolution techniques include additive fields, defaults, tolerance of unknowns, controlled expansion, and temporary compatibility endpoints. Semantic changes need to be documented even when the schema remains the same."
  },
  {
    "kind": "paragraph",
    "text": "Deprecation must be observable. The team needs to identify consumers, communicate deadlines, measure traffic and provide a testing environment. Standardized deprecation headers and links to documentation can complement communication. Shutting down a version just based on the date, without confirming the migration of critical flows, is an operational risk."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Compatibility depends on consumer behavior, not just the schema.",
    "headers": [
      "Change",
      "Do you tend to be compatible?",
      "Note"
    ],
    "rows": [
      [
        "Add optional field",
        "Yes",
        "Clients should ignore unknown fields."
      ],
      [
        "Add enum received by client",
        "Maybe not",
        "Clients with a closed switch may fail."
      ],
      [
        "Remove or rename field",
        "No",
        "Requires migration or versioning."
      ],
      [
        "Increase maximum limit",
        "Generally",
        "May affect performance and validations."
      ],
      [
        "Make optional field mandatory",
        "No",
        "Break existing requests."
      ],
      [
        "Change meaning without changing schema",
        "No",
        "It is a semantic break that is difficult to detect."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Table 5 - Compatibility depends on consumer behavior, not just the schema."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.20 Hypermedia and transition discovery",
    "id": "10-20-hypermedia-and-transition-discovery"
  },
  {
    "kind": "paragraph",
    "text": "Hypermedia as a driver of application state means that representations include controls that guide possible actions. A pending payment may display a link to cancel; a completed payment may display a link to the receipt. The consumer follows known relationships instead of constructing URIs from external rules."
  },
  {
    "kind": "paragraph",
    "text": "The benefit is to reduce coupling to the path structure and allow the server to vary transitions depending on state and authorization. The cost is to define media types, relationships and clients capable of interpreting controls. In simple internal integrations, the payoff may not justify a full implementation, but links are still useful for navigation and discovery."
  },
  {
    "kind": "paragraph",
    "text": "Links do not replace authorization. The absence of a link can guide interface, but the server needs to reject disallowed calls. Likewise, presenting a link does not guarantee that the operation will remain valid, as the state may change before use. The client must address conflicts and preconditions."
  },
  {
    "kind": "paragraph",
    "text": "A pragmatic approach includes links to related resources, pagination, asynchronous operation, issue documentation, and deprecation. Relationships must have stable names and documented meaning. Returning only URLs with no explicit relationship forces the client to interpret strings and loses part of the hypermedia value."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.21 OpenAPI and contract-driven design",
    "id": "10-21-openapi-and-contract-driven-design"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI provides machine-and human-readable description for HTTP APIs. Version 3.2.0 extends the specification while maintaining the objective of describing operations, parameters, bodies, responses, security and reusable components. The document can support generation of documentation, mocks, validation, SDKs and tests, but it needs to remain aligned to the runtime."
  },
  {
    "kind": "paragraph",
    "text": "In contract-first design, teams define semantics and examples before or in parallel with implementation. This allows for consumer review, security, and architecture. Code-first can speed up small services, but it tends to capture implementation details and produce less intentional contracts. Both approaches require pipeline that detects divergence."
  },
  {
    "kind": "paragraph",
    "text": "Schemas must represent real constraints: required, formats, limits, enums, nullability and composition. Examples need to be valid and varied, including errors. Descriptions must not repeat the field name; they must explain meaning, unity, origin and rules. Operations need stable identifiers for tools and governance."
  },
  {
    "kind": "paragraph",
    "text": "A complete specification does not guarantee a good API. You can carefully document inconsistent endpoints. Reviews should combine structural validation, corporate standards lint, compatibility testing, and human semantic analysis. The published contract also needs to indicate SLA policy, limits, authentication, support and lifecycle."
  },
  {
    "kind": "code",
    "text": "openapi: 3.2.0\ninfo:\n  title: Accounts API\n  version: 1.4.0\npaths:\n  /accounts/{accountId}:\n    get:\n      operationId: getAccount\n      parameters:\n        - name: accountId\n          in: path\n          required: true\n          schema: { type: string }\n      responses:\n        \"200\":\n          description: Account found\n        \"404\":\n          description: Account not found"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.22 Security and authorization in REST APIs",
    "id": "10-22-security-and-authorization-in-rest-apis"
  },
  {
    "kind": "paragraph",
    "text": "REST does not define authentication or authorization. APIs typically use TLS, OAuth 2.0, OpenID Connect, mTLS, signatures, or enterprise mechanisms. Security needs to be enforced by resource, operation, and ownership. Authenticating a client does not mean authorizing access to any object."
  },
  {
    "kind": "paragraph",
    "text": "Broken Object Level Authorization occurs when the server accepts an identifier and does not verify whether the identity can access that object. Protection must be at the domain or authorization layer, not just hiding IDs. Non-sequential identifiers reduce enumeration, but do not replace verification."
  },
  {
    "kind": "paragraph",
    "text": "Mass assignment and property authorization arise when the API automatically links the body to internal entities. The contract must use specific input templates and allowable lists. Fields such as profile, limit, owner and status cannot be changed just because they appear in JSON."
  },
  {
    "kind": "paragraph",
    "text": "Consumption limits, external URL validation, SSRF protection, maximum body size, timeouts and business flow controls are also required. The gateway is suitable for authentication, quotas and general filters; Decisions like \"this user can use this account at this time\" depend on the domain context."
  },
  {
    "kind": "subhead",
    "text": "Authorization principle"
  },
  {
    "kind": "paragraph",
    "text": "Validate the identity, role, specific resource, operation, and changed properties. Checking only at the endpoint level is insufficient for objects with different owners and rules."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.23 REST in API Gateways and Enterprise Policies",
    "id": "10-23-rest-in-api-gateways-and-enterprise-policies"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway receives an HTTP message and can terminate TLS, authenticate, validate token, apply quota, transform headers, route, and log metrics. It is part of the layered system and must preserve the semantics of the contract. Policies need to distinguish consumer, gateway, and backend errors so as not to turn all failures into indistinguishable responses."
  },
  {
    "kind": "paragraph",
    "text": "Schema validation at the gateway blocks invalid messages before the backend, but must use the same contract version. Divergence between specification, policy and code produces false negatives or different acceptances per environment. The pipeline must publish contract and configuration as related artifacts, with end-to-end testing."
  },
  {
    "kind": "paragraph",
    "text": "Transformations are useful for compatibility and mediation, but they create a second implementation of the API. Changes to names, defaults and types need to be tracked. Extensive gateway transformations tend to hide backend debt and make troubleshooting difficult, especially when logs do not show a message before and after the policy."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting can use consumer, application, operation or resource as key. Global limit per IP can punish users behind NAT. Retry-After and quota headers help clients, but should not expose sensitive details. The gateway also needs to protect its connections to backends by pooling, timeouts and circuit breaking without unduly changing business code."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rest-architecture/en/figure-04.svg",
    "alt": "REST on an enterprise platform with cross-cutting policies in API Gateway",
    "caption": "Figure 4 - The gateway applies transversal policies; the service remains responsible for the semantics of the resource."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.24 Observability and troubleshooting",
    "id": "10-24-observability-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting must localize the layer before discussing endpoint design. DNS, connect timeout, or TLS handshake failure occurs before REST semantics. A 401 may be produced by the gateway; a 404 can come from routing or the backend; a 504 may indicate that the gateway waited beyond the limit for an upstream. Logs need to identify the producer of the response."
  },
  {
    "kind": "paragraph",
    "text": "Register method, route template, status, duration, size, consumer, operation and correlation ID. Avoid registering tokens, personal data and complete bodies unnecessarily. The /clientes/{id} template is more useful for aggregated metrics than the URI with each identifier. Traces must propagate context to internal dependencies."
  },
  {
    "kind": "paragraph",
    "text": "Metrics by code need to be interpreted semantically. Growth of 409 may indicate expected competition or rule regression; 429 may be protection working; 404 could be malicious enumeration or catalog failure. Combine metrics with structured logs, traces and configuration change events."
  },
  {
    "kind": "paragraph",
    "text": "To reproduce issues, preserve method, URI, relevant headers, sanitized body, timestamp, and environment. Compare the message observed by the gateway with the one received at the backend. Tools like curl allow you to control headers and show negotiation, but tests must respect authorization and environment policies."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Initial classification of symptoms in an API architecture.",
    "headers": [
      "Symptom",
      "Probable layer",
      "Early evidence"
    ],
    "rows": [
      [
        "Name doesn't work",
        "DNS",
        "Query the resolver used by the runtime."
      ],
      [
        "Connection refused",
        "TCP/listener",
        "IP, port, firewall and listening process."
      ],
      [
        "Certificate failure",
        "TLS",
        "SNI, string, hostname and truststore."
      ],
      [
        "401 before backend",
        "Gateway/identity",
        "Authentication and issuer/audience log."
      ],
      [
        "404 for one route only",
        "Gateway or application",
        "Published template and backend access log."
      ],
      [
        "409/412",
        "Domain/precondition",
        "Resource version and If-Match headers."
      ],
      [
        "429",
        "Consumption policy",
        "Quota Key, Window and Retry-After."
      ],
      [
        "502/504",
        "Gateway/upstream",
        "Connect/read timeout and pool status."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10.25 Case studies and labs",
    "id": "10-25-case-studies-and-labs"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - Payment creation after timeout"
  },
  {
    "kind": "paragraph",
    "text": "An application sends POST/payments and receives timeout. The backend completed the debit, but the response was lost between gateway and client. The application repeats the request and creates a second payment. The problem is not just timeout; it is the absence of identity for the logical attempt. The contract should require an idempotency key and provide a resource queryable by business identifier."
  },
  {
    "kind": "paragraph",
    "text": "The investigation must correlate request IDs, idempotency key, payment identifier and ledger events. The gateway may have ended the wait at 30 seconds while the backend ended at 32. The fix includes reducing latency, aligning timeouts, and implementing deduplication in the layer that controls the financial effect."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - Lost Update in a Record"
  },
  {
    "kind": "paragraph",
    "text": "Two channels read version 5 from a client. One changes address and another phone number. Both send complete PUT. The second overwrites the change in the first because there is no precondition. The API appears to be successful, but lost data. ETag and If-Match would allow detecting the divergent version and returning 412."
  },
  {
    "kind": "paragraph",
    "text": "The solution also requires deciding whether full PUT is appropriate or whether partial operations better represent the intentions. PATCH reduces the area of ​​conflict, but does not eliminate competition. Validators are still required when two changes affect the same property or rule."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - Unstable pagination"
  },
  {
    "kind": "paragraph",
    "text": "A query uses offset with ordering by date. Between page 1 and page 2, new records are inserted at the beginning. Some items are repeated and others do not appear. For a transactional feed, a cursor based on date and identifier offers stable position, as long as the ordering is complete and the cursor is validated."
  },
  {
    "kind": "paragraph",
    "text": "The contract must state whether the view is a snapshot or a changing flow. Totals may differ. For auditing, you may need to create a time-sliced ​​report resource; for operational navigation, eventual consistency may be acceptable."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 1 - Semantics and preconditions"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Run GET on a resource and record ETag, Cache-Control, Content-Type, and status.",
      "Repeat with If-None-Match and check if the server returns 304 without impersonation.",
      "Send update with correct If-Match and observe the new validator.",
      "Retry using the old validator and confirm 412 or documented behavior.",
      "Compare gateway and backend logs to identify header preservation."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - Contract and errors"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Validate an OpenAPI document with a tool authorized by the organization.",
      "Create examples of 400, 401, 403, 404, 409, 412, 429, and 503 in Problem Details format.",
      "Confirm that no errors expose stack trace, token, internal host, or personal data.",
      "Check that type, code and correlation ID remain stable between environments.",
      "Test whether the gateway preserves Content-Type application/problem+json."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - Pagination and cost"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Generate test set with concurrent insertions and compare offset with cursor.",
      "Measure latency for increasing offsets and for keyset paging.",
      "Try unsupported filters and sorting and confirm predictable rejection.",
      "Validate maximum page size limit on the gateway and backend.",
      "Document the meaning of total, next, and expired cursor."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "REST is an architectural style formed by constraints that produce properties for distributed systems. API design should start with resources, representations, and shared semantics, not a list of endpoints. HTTP offers methods, codes, headers, cache and preconditions that allow you to express intentions in an interoperable way."
  },
  {
    "kind": "paragraph",
    "text": "Good practices are not isolated aesthetic rules. Stable URIs, correct methods, idempotency, standardized errors, paging, compatibility, and observability reduce coupling and operational failures. API Gateways enforce cross-cutting policies, but they do not replace domain authorization or fix semantically fragile contracts."
  },
  {
    "kind": "paragraph",
    "text": "A mature enterprise API is predictable for consumers and operable for teams. It tells you when responses can be reused, protects concurrent updates, exposes long processes as resources, evolves compliantly, and records enough evidence to locate failures at each layer."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Project checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Do resources have stable identity and do not directly reflect internal tables?",
      "Do methods and codes maintain HTTP semantics?",
      "Are GET and HEAD safe and do repeatable operations have an idempotency strategy?",
      "Are input fields explicitly allowed and authorized?",
      "Have Cache-Control, ETag, Vary and preconditions been evaluated?",
      "Do collections have limits, pagination, and stable ordering?",
      "Errors use consistent format without sensitive details?",
      "Long operations expose status and recovery resource?",
      "Are changes subject to compatibility analysis and consumer inventory?",
      "Are OpenAPI, gateway and implementation validated in the same pipeline?",
      "Do logs and traces identify which component produced the response?"
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Review exercises"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explain why using JSON and HTTP methods is not enough to characterize REST.",
      "Differentiate between resource state and session state.",
      "Give an example where POST needs idempotency key.",
      "Compare 409 Conflict and 412 Precondition Failed.",
      "Model a card block request as a resource, indicating URI, method, and responses.",
      "Set a pagination policy for statements with concurrent new releases.",
      "Create a Problem Details for daily limit exceeded without exposing sensitive internal rule.",
      "List schema changes that can break clients even without removing endpoints.",
      "Explain which responsibilities belong to the gateway and which remain with the service.",
      "Describe a diagnostic roadmap for 504 observed by the consumer."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Glossary"
  },
  {
    "kind": "table",
    "caption": "Table 7 - Essential glossary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "cache validator",
        "Metadata used to check whether a representation has changed, such as ETag."
      ],
      [
        "Client-server",
        "Separation of responsibilities between consumer interface and resource provider."
      ],
      [
        "Cursor",
        "Opaque token representing position in a paged collection."
      ],
      [
        "ETag",
        "Value that identifies an impersonation version for cache and preconditions."
      ],
      [
        "HATEOAS",
        "Use of hypermedia to guide application state transitions."
      ],
      [
        "Idempotency",
        "Property of multiple equal requests producing the same intended effect."
      ],
      [
        "Uniform interface",
        "Common semantics for identifying and manipulating resources by self-contained messages."
      ],
      [
        "media type",
        "Content format and semantic identifier."
      ],
      [
        "Precondition",
        "Condition expressed by headers such as If-Match before executing the operation."
      ],
      [
        "Problem Details",
        "Format standardized by RFC 9457 for errors in HTTP APIs."
      ],
      [
        "Representation",
        "Sequence of bytes and metadata that express a view of the state of a resource."
      ],
      [
        "Feature",
        "Identifiable abstraction whose state can be represented and manipulated."
      ],
      [
        "REST",
        "Representational state transfer architectural style."
      ],
      [
        "Insurance",
        "Method whose intent is read-only, such as GET."
      ],
      [
        "Stateless",
        "Constraint that avoids dependency on hidden conversational state between requests."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Technical references"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "FIELDING, Roy T. Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine, 2000. Chapter 5: Representational State Transfer.",
      "IETF. RFC 9110 - HTTP Semantics. 2022.",
      "IETF. RFC 9111 - HTTP Caching. 2022.",
      "IETF. RFC 3986 - Uniform Resource Identifier: Generic Syntax. 2005.",
      "IETF. RFC 8259 - The JavaScript Object Notation Data Interchange Format. 2017.",
      "IETF. RFC 5789 - PATCH Method for HTTP. 2010.",
      "IETF. RFC 6902 - JavaScript Object Notation Patch. 2013.",
      "IETF. RFC 7386 - JSON Merge Patch. 2014.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs. 2023.",
      "IETF. RFC 6585 - Additional HTTP Status Codes. 2012.",
      "OpenAPI Initiative. OpenAPI Specification 3.2.0. 2025.",
      "OWASP. API Security Top 10 - 2023 Edition.",
      "OWASP. Top 10 Web Application Security Risks - 2025 Edition."
    ]
  },
  {
    "kind": "subhead",
    "text": "Closing"
  },
  {
    "kind": "paragraph",
    "text": "In the next chapter, the course can delve deeper into HTTP semantics and contract modeling, or move on to authentication and authorization mechanisms according to the official FAAC sequence. The concepts in this chapter will remain the foundation for any style of HTTP API."
  }
];
