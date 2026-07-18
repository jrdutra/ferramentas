import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const RMM_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Interface evolution according to the Richardson Maturity Model"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/overview.svg",
    "alt": "Evolution of the interface through the four levels of the Richardson Maturity Model",
    "caption": "Overview - Single endpoint, capabilities, HTTP semantics, and hypermedia form a cumulative progression of observable capabilities."
  },
  {
    "kind": "paragraph",
    "text": "Each level adds a drawing ability; the model does not certify complete compliance with REST."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "The Richardson Maturity Model, commonly abbreviated as RMM, organizes service interfaces into four levels: a message-oriented entry point, identifiable resources, semantic use of HTTP, and hypermedia controls. The model was proposed by Leonard Richardson and popularized by Martin Fowler as a didactic way to decompose some central elements of a REST approach. Its value is in allowing teams to look at concrete capabilities of the interface without relying solely on the “RESTful” label."
  },
  {
    "kind": "paragraph",
    "text": "The model, however, is not a certification standard and does not replace the architectural constraints described by Roy Fielding. An API can reach level 2 by using HTTP resources, methods, and code consistently and still maintain a conversational session on the server, prevent caching, expose implementation details, or create strong temporal coupling. Likewise, an interface can adopt links without its clients actually navigating through the transitions offered. Therefore, level and quality are not automatic synonyms."
  },
  {
    "kind": "paragraph",
    "text": "In this chapter, each level will be analyzed in depth, with examples of fictional corporate and banking APIs. The effects on contracts, consumers, API Gateways, retries, idempotency, caching, authorization, observability and evolution will be studied. The objective is not to advocate that every API must reach level 3, but to provide criteria for consciously choosing how far to advance and what properties to obtain."
  },
  {
    "kind": "paragraph",
    "text": "The analysis will also show that cross-tier migration is not just an exchange of URLs. It requires identifying resources, separating commands from representations, assigning correct semantics to methods and responses, defining hypermedia relationships, planning for compatibility, and adjusting gateway policies. In environments with many consumers, the evolution sequence needs to be measurable and reversible."
  },
  {
    "kind": "subhead",
    "text": "How to Study This Chapter Use the same business operation when going through all levels. Compare the way of addressing, the intention expressed by the method, the codes returned, the possibility of caching, the retry rules and the knowledge required from the client. Comparison better reveals what each level adds."
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
      "Explain the origin, purpose and limits of the Richardson Maturity Model.",
      "Differentiate levels 0, 1, 2 and 3 by observable properties of the interface.",
      "Recognize RPC patterns and imperative messages concentrated on an endpoint.",
      "Model stable resources without confusing resource, table, DTO and operation.",
      "Apply HTTP methods, codes, headers, cache and preconditions at level 2.",
      "Design hypermedia links and actions that represent permitted transitions.",
      "Compare RMM with REST architectural constraints and with OpenAPI.",
      "Evaluate existing APIs without turning the analysis into a superficial score.",
      "Plan incremental migration, governance and troubleshooting on API Gateways."
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
      "11.1 Origin and purpose of the model",
      "11.2 What RMM measures - and what it doesn't measure",
      "11.3 Overview of the four levels",
      "11.4 Level 0: The POX Swamp",
      "11.5 Level 0 operational standards and risks",
      "11.6 Transition from level 0 to level 1",
      "11.7 Level 1: Resources",
      "11.8 Identity, granularity and lifecycle",
      "11.9 Level 1 Limitations",
      "11.10 Transition to level 2",
      "11.11 Level 2: HTTP methods and semantics",
      "11.12 Status, headers, cache and preconditions",
      "11.13 Idempotency, retries and errors",
      "11.14 Level 2 in API Gateways",
      "11.15 Level 3: Hypermedia Controls",
      "11.16 Relationships, links and actions",
      "11.17 Types of media and hypermedia contracts",
      "11.18 Transition-driven clients",
      "11.19 Benefits, costs and pitfalls of level 3",
      "11.20 RMM versus Fielding's REST",
      "11.21 RMM, OpenAPI and governance",
      "11.22 Evaluation matrix",
      "11.23 Migration strategy",
      "11.24 Observability and troubleshooting",
      "11.25 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.1 Origin and purpose of the model",
    "id": "11-1-origin-and-purpose-of-the-model"
  },
  {
    "kind": "paragraph",
    "text": "Leonard Richardson formulated the model as a way to classify web service styles by the progressive adoption of web features. Martin Fowler popularized it in 2010 with the image of a ladder: at level 0 there is a single message-oriented entry point; at level 1 resources appear; at level 2 the interface uses HTTP methods and responses; at level 3 the representations offer hypermedia controls. The simplicity of this decomposition has made RMM useful in training, architecture reviews, and modernization discussions."
  },
  {
    "kind": "paragraph",
    "text": "The word maturity can lead to a misinterpretation. Higher level does not necessarily mean that the product, team, or domain is “more mature” in every aspect. The model describes a specific dimension of the interface. Security, availability, governance, documentation, performance, privacy, consistency and developer experience need their own assessments. A Level 2 API can be highly reliable and context-appropriate; a level 3 API may be insecure or poorly operated."
  },
  {
    "kind": "paragraph",
    "text": "The model works best as a diagnostic language. Instead of just asking “is this API REST?”, the team can ask: are there identifiable resources? Do methods express intent? Does the response use coherent statuses and headers? Does the consumer discover transitions through hypermedia? These questions produce evolving evidence and decisions."
  },
  {
    "kind": "subhead",
    "text": "Responsible use of the term maturity Use the level to describe interface capabilities, not to classify people or determine total quality. Separately record attributes such as security, compatibility, SLOs, documentation, governance and operational cost."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.2 What RMM measures - and what it doesn't measure",
    "id": "11-2-what-rmm-measures-and-what-it-doesn-t-measure"
  },
  {
    "kind": "paragraph",
    "text": "RMM mainly observes three moves: decomposing a generic operation into identifiable resources, taking advantage of HTTP's standardized semantics, and making transitions visible in the representation itself. These moves reduce some of the coupling between consumer and server because they transfer knowledge to shared Web elements: URIs, methods, codes, headers, links and relations."
  },
  {
    "kind": "paragraph",
    "text": "The model does not check all REST constraints. Client-server, stateless, cache, layered system and code on demand do not appear as independent steps. Level 2 touches on caching and uniform interface, and Level 3 approaches hypermedia as an application state driver, but full evaluation of REST requires broader architectural analysis. Therefore, Fowler describes level 3 as a step toward “REST glory,” not automatic proof of compliance."
  },
  {
    "kind": "paragraph",
    "text": "There is also no universal test to decide the level when the API mixes styles. A platform may have query endpoints at level 2, legacy commands at level 0 and a specific flow with hypermedia. In these cases, classifying the entire API by a single number hides information. The analysis must be done by surface, resource or business journey, recording exceptions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.3 Overview of the four levels",
    "id": "11-3-overview-of-the-four-levels"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-01.svg",
    "alt": "The four cumulative levels of the Richardson Maturity Model",
    "caption": "Figure 1 - RMM organizes interface capabilities into four cumulative levels, but does not measure all attributes of an API platform."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Capabilities, dependencies and risks associated with each level.",
    "headers": [
      "Level",
      "Added element",
      "Core client knowledge",
      "Characteristic risk"
    ],
    "rows": [
      [
        "0",
        "Messages about an endpoint",
        "Operations and proprietary format",
        "Central dispatcher, little shared semantics"
      ],
      [
        "1",
        "Resources and identifiers",
        "What resources exist and how to address them",
        "Resources treated only as command envelopes"
      ],
      [
        "2",
        "HTTP methods, status and headers",
        "Protocol semantics and resource contract",
        "Decorative use of inconsistent verbs or codes"
      ],
      [
        "3",
        "Hypermedia Controls",
        "Media relationships and types",
        "Links without semantics or clients that continue to encode the flow"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.4 Level 0: The POX Swamp",
    "id": "11-4-level-0-the-pox-swamp"
  },
  {
    "kind": "paragraph",
    "text": "At level 0, the service typically publishes a single endpoint and uses the message body to indicate which operation should be performed. POX stands for “Plain Old XML”, a historical expression for XML messages without taking advantage of richer Web resources; In current practice, the same structure may appear with JSON, Protobuf, or another format. The decisive aspect is not the format, but the concentration of intentions in a generic interface."
  },
  {
    "kind": "paragraph",
    "text": "A payments service could always receive POST /service-payments and distinguish operations by a field like operation. Check balance, create transfer, cancel appointment and issue statement share the same address and method. The server acts as a dispatcher: it interprets the command and forwards it to the corresponding routine. Many SOAP services, RPC over HTTP, and legacy integrations approach this level."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-02.svg",
    "alt": "Multiple intents converging on an endpoint and dispatcher at level 0",
    "caption": "Figure 2 - At level 0, the protocol carries a proprietary message and the body concentrates the intention of the operation."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of a message at level 0"
  },
  {
    "kind": "code",
    "text": "POST /payment-service HTTP/1.1\nContent-Type: application/json\n{\n  \"operation\": \"CREATE_TRANSFER\",\n  \"sourceAccount\": \"991\",\n  \"destinationAccount\": \"552\",\n  \"amount\": 120.00\n}"
  },
  {
    "kind": "paragraph",
    "text": "Level 0 is not synonymous with bad implementation. In closed scenarios, command queues, binary protocols, highly specialized operations, or compatibility with legacy systems, RPC may be a valid decision. The problem arises when the organization expects Web properties - caching, uniform semantics, visibility through intermediaries and decoupled evolution - without exposing elements that allow them to be obtained."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.5 Level 0 operational standards and risks",
    "id": "11-5-level-0-operational-standards-and-risks"
  },
  {
    "kind": "paragraph",
    "text": "The main consequence is that intermediate components see little difference between operations. An API Gateway observes multiple POSTs for the same path, and the real distinction is hidden in the body. Authorization rules, quotas, caching, metrics, and routing need to inspect content or trust proprietary fields. This increases policy costs, reduces performance and makes it difficult to correlate with tools that aggregate metrics by method and route."
  },
  {
    "kind": "paragraph",
    "text": "Retries also become risky. The POST method does not tell you whether an operation is repeatable, and the same endpoint can contain queries, idempotent commands, and non-idempotent commands. A timeout leaves the client without knowing whether the server performed the action. The solution often requires correlation identifiers, idempotency keys, or processing status, but these mechanisms need to be defined outside the basic semantics of the protocol."
  },
  {
    "kind": "paragraph",
    "text": "Errors often return 200 with an envelope containing success=false or internal codes. This practice prevents load balancers, gateways, SDKs, and observability from using the HTTP status class as a signal. It also creates ambiguity between transport failure, gateway rejection and business error. The consumer needs to interpret the body before classifying any result."
  },
  {
    "kind": "subhead",
    "text": "Level 0 Signal If the documentation starts with a list of accepted operations in an action, command, operation, or serviceName field and almost everything uses POST in the same path, the interface is probably at level 0, even when the messages are JSON and the product is called a REST API."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Typical effects of an interface concentrated at level 0.",
    "headers": [
      "Symptom",
      "Impact on the gateway",
      "Impact on the consumer"
    ],
    "rows": [
      [
        "One URI for everything",
        "Policies depend on body inspection",
        "SDK needs to know dispatcher and internal codes"
      ],
      [
        "200 for success and error",
        "Status metrics become misleading",
        "Error handling depends on the envelope"
      ],
      [
        "POST for reading and writing",
        "Cache and security cannot infer intent",
        "Retry requires specific rule per operation"
      ],
      [
        "Extensive core contract",
        "Changes affect large surface",
        "Versioning and testing become monolithic"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.6 Transition from level 0 to level 1",
    "id": "11-6-transition-from-level-0-to-level-1"
  },
  {
    "kind": "paragraph",
    "text": "The first transition consists of making explicit the entities or concepts that have an identity and life cycle. Instead of sending all messages to /service, the interface now addresses customers, accounts, transfers, appointments and statements. This change requires understanding the domain: a transfer is not just a function; it can be created, validated, confirmed, rejected, canceled and consulted over time."
  },
  {
    "kind": "paragraph",
    "text": "The migration must start with inventory. Each dispatcher operation is classified as query, create, change, command, process, or integration. Next, the team identifies which objects need a stable address, which are subordinate to others, and which represent processes. The goal is not to turn every table into an endpoint, but to find units of meaning that consumers can reference."
  },
  {
    "kind": "paragraph",
    "text": "Compatibility can be preserved with an adaptation layer. The legacy endpoint continues to accept messages and internally calls the new resource-oriented services. New consumers adopt the new surface, while metrics measure the reduction in use of the old contract. This strategy avoids a “big bang” migration and allows you to validate the modeling before removing the dispatcher."
  },
  {
    "kind": "subhead",
    "text": "Modeling Question What needs to be identified, queried, or referenced after the operation is complete? The answer often reveals a resource. A transfer request, for example, continues to exist as an auditable entity even after the initial response."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.7 Level 1: Resources",
    "id": "11-7-level-1-resources"
  },
  {
    "kind": "paragraph",
    "text": "At level 1, the interface publishes multiple resources with their own identifiers. The consumer no longer knows just a generic gateway and starts interacting with addresses that represent parts of the domain. The URI serves as an identifier, not as a complete description of the implementation. /transfers/abc can remain valid even if the service changes bank, language or topology."
  },
  {
    "kind": "paragraph",
    "text": "The model does not require level 1 to correctly use all HTTP methods. The API can continue sending POST to /customers/483/view, /transfers/abc/cancel or /accounts/991/statement. There has been progress in identification, but the intention is still partially encoded in path verbs or in the body. This characteristic explains why resources are necessary but insufficient for a semantically rich HTTP interface."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-03.svg",
    "alt": "Distinct resources with identity and scope visible at level 1",
    "caption": "Figure 3 - Distinctive capabilities make identity and scope visible, although operations may still remain imperative."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.8 Identity, granularity and lifecycle",
    "id": "11-8-identity-granularity-and-lifecycle"
  },
  {
    "kind": "paragraph",
    "text": "A resource is an identifiable abstraction, not necessarily a database row. It can represent a durable entity, a collection, a projection, a document, a process, or the result of a calculation. /limits-operacional/customer-483 may be a calculated view; /transfer-requests/abc can represent a process; /statements/account-991/2026-07 can represent a document produced for a period."
  },
  {
    "kind": "paragraph",
    "text": "Granularity should reflect cohesion and access patterns. Excessively large resources force consumers to transfer and update irrelevant data. Very fragmented resources increase round trips and composition complexity. In corporate systems, the boundary also needs to consider authorization, ownership, transactional consistency and capacity for independent evolution."
  },
  {
    "kind": "paragraph",
    "text": "Public identifiers should not expose internal keys unnecessarily. A sequential number can facilitate enumeration and reveal volume; a table key can change during migrations. The API can use opaque identifiers, business aliases, or stable URIs. The important thing is to define uniqueness, scope, permanence and behavior when the resource is removed or replaced."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Questions to model resources at level 1.",
    "headers": [
      "Decision",
      "Technical question",
      "Example"
    ],
    "rows": [
      [
        "Identity",
        "Does the resource need to be referenced later?",
        "/transferences/{id}"
      ],
      [
        "Scope",
        "Is identity global or subordinate?",
        "/accounts/{account}/schedules/{id}"
      ],
      [
        "Granularity",
        "What data changes and is authorized together?",
        "separate registration preferences"
      ],
      [
        "Life cycle",
        "What states and transitions are there?",
        "PENDING -> CONFIRMED -> SETTLED"
      ],
      [
        "Permanence",
        "Does the identifier survive internal migrations?",
        "opaque public ID"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.9 Level 1 Limitations",
    "id": "11-9-level-1-limitations"
  },
  {
    "kind": "paragraph",
    "text": "Separating resources improves observability and organization, but does not alone resolve the semantics of operations. Endpoints such as POST /transfers/abc/view and POST /transfers/abc/remove still hide properties known by HTTP. The gateway cannot infer that querying is safe or that removing should produce a certain response class. The client depends on conventions specific to each API."
  },
  {
    "kind": "paragraph",
    "text": "Another risk is creating “fake resources” just to accommodate verbs. Paths such as /createTransfer, /executePayment or /getCustomers use multiple addresses, but continue modeling functions. This interface may be clear and functional, but progress toward a uniform interface is limited. Analysis should look at the meaning of the identifier, not just count URLs."
  },
  {
    "kind": "paragraph",
    "text": "At level 1, collections and relationships can also be inconsistent. One team can use /customer/483/account and another /viewContasPorCliente?id=483. Without standards for naming, cardinality, pagination, and errors, resource expansion increases surface area without generating predictability. Governance remains necessary."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.10 Transition to level 2",
    "id": "11-10-transition-to-level-2"
  },
  {
    "kind": "paragraph",
    "text": "The second transition is to map intentions to HTTP semantics. Queries use GET or HEAD; creation usually uses POST in the collection; idempotent substitution can use PUT; removal uses DELETE; Partial updates can use PATCH when their format and semantics are defined. The method stops being just a transport field and starts communicating properties to clients and intermediaries."
  },
  {
    "kind": "paragraph",
    "text": "This migration also requires reviewing responses. Creation may return 201 Created with Location; asynchronous processing can use 202 Accepted; unsatisfied precondition may produce 412; state conflict may produce 409; validation can use Problem Details. Headers such as ETag, Cache-Control, Allow, Retry-After and Vary become part of the contract."
  },
  {
    "kind": "paragraph",
    "text": "It is not enough to replace POST with different verbs. Behavior needs to respect security, idempotency and semantics. A GET that cancels a schedule is still dangerous, even if the path appears resource-oriented. A PUT that creates additional effects on each repetition is not idempotent. Level 2 relies on observable behavior, not syntactic decoration."
  },
  {
    "kind": "subhead",
    "text": "Example of reading with HTTP semantics"
  },
  {
    "kind": "code",
    "text": "GET /transfers/abc HTTP/1.1\nAccept: application/json\nHTTP/1.1 200 OK\nContent-Type: application/json\nETag: \"v7\"\n{ \"id\": \"abc\", \"status\": \"PENDING\", \"amount\": 120.00 }"
  },
  {
    "kind": "subhead",
    "text": "Transition criteria For each operation, record: target resource, method, security property, idempotency, success response, errors, headers, cacheability, and retry policy. The table highlights where changing the verb requires a real change in behavior."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.11 Level 2: HTTP methods and semantics",
    "id": "11-11-level-2-http-methods-and-semantics"
  },
  {
    "kind": "paragraph",
    "text": "At level 2, the interface uses the HTTP vocabulary to express intentions. The semantics are shared across browsers, libraries, proxies, gateways, and observability tools. GET is safe and should not request a change of state; PUT and DELETE are idempotent; POST is flexible and normally non-idempotent; HEAD has the same semantics as GET without response content. PATCH depends on the type of patch document used."
  },
  {
    "kind": "paragraph",
    "text": "The benefit is not just aesthetic. A gateway can apply different rules for reading and writing, caches can reuse responses, SDKs can classify results by status, clients can implement retries of idempotent operations more safely, and SRE teams can group metrics by method and route. The interface becomes more visible to components that do not know the domain."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-04.svg",
    "alt": "HTTP methods and responses carrying shared semantics at level 2",
    "caption": "Figure 4 - Standardized methods and responses allow generic components to understand interaction properties."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.12 Status, headers, cache and preconditions",
    "id": "11-12-status-headers-cache-and-preconditions"
  },
  {
    "kind": "paragraph",
    "text": "Status codes classify the result of attempting to process the request. They do not replace domain details, but provide an interoperable first layer. 2xx indicates successful processing; 3xx advises redirection or reuse; 4xx indicates that the request cannot be met under the conditions presented; 5xx points to a server or intermediary failure. The choice should reflect who produced the response and the observed state."
  },
  {
    "kind": "paragraph",
    "text": "Headers expand semantics. Location identifies the created resource or the relevant location; ETag represents a version of the representation; If-Match and If-None-Match express preconditions; Cache-Control controls reuse; Retry-After guides retry; Allow reports supported methods; Vary describes which fields in the request influence the response. Ignoring these elements reduces level 2 to a table of verbs."
  },
  {
    "kind": "paragraph",
    "text": "Preconditions are especially important in enterprise APIs. Two consumers can read the v7 version of a resource and attempt to update it. Without control, the last writing overwrites the previous one. With ETag and If-Match, the server performs the change only if the version still matches. If the state has changed, it returns 412 Precondition Failed, allowing the client to reload and reconcile."
  },
  {
    "kind": "subhead",
    "text": "Precondition protected update"
  },
  {
    "kind": "code",
    "text": "PUT /preferences/customer-483 HTTP/1.1\nContent-Type: application/json\nIf-Match: \"v7\"\n{ \"language\": \"pt-BR\", \"notifications\": true }\nHTTP/1.1 412 Precondition Failed\nContent-Type: application/problem+json"
  },
  {
    "kind": "table",
    "caption": "Table 4 - Protocol elements that make the interface more operable.",
    "headers": [
      "HTTP Element",
      "Use at level 2",
      "Common fault"
    ],
    "rows": [
      [
        "201 + Location",
        "Confirm creation and inform identifier",
        "Return 200 without reference to new resource"
      ],
      [
        "202 + monitor",
        "Accept process not yet completed",
        "Treating acceptance as ultimate success"
      ],
      [
        "ETag/If-Match",
        "Prevents lost updates",
        "Generate ETag without validating preconditions"
      ],
      [
        "Cache-Control",
        "Defines reuse and revalidation",
        "Cache sensitive response without explicit policy"
      ],
      [
        "Retry-After",
        "Guide new attempt",
        "Reply 429/503 without window or strategy"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.13 Idempotency, retries and errors",
    "id": "11-13-idempotency-retries-and-errors"
  },
  {
    "kind": "paragraph",
    "text": "Idempotency means that repeating the same request produces the same intended effect on the server, although the representation of the response may vary. PUT and DELETE are defined as idempotent; POST does not receive this guarantee by default. In distributed systems, timeout does not prove that the operation failed. The client may lose the response after the server completes the command, creating a risk of duplication."
  },
  {
    "kind": "paragraph",
    "text": "For non-idempotent operations, an idempotency key can associate equivalent attempts with a single result. The server needs to define scope, expiration, payload comparison, persistence and concurrent behavior. The gateway may require the header and limit format, but business deduplication generally belongs to the service that knows the operation and its transaction."
  },
  {
    "kind": "paragraph",
    "text": "Errors must combine HTTP status and a stable representation. Problem Details, currently defined by RFC 9457, provides fields such as type, title, status, detail and instance, as well as extensions. The status classifies the result; the type identifies a problem category; extensions carry structured data. Internal messages, stack traces and sensitive data must not be exposed."
  },
  {
    "kind": "subhead",
    "text": "Structured error at level 2"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 409 Conflict\nContent-Type: application/problem+json\n{\n  \"type\": \"https://api.example/problems/invalid-state\",\n  \"title\": \"Transition not allowed\",\n  \"status\": 409,\n  \"detail\": \"The transfer has already been settled.\",\n  \"instance\": \"/transfers/abc\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Retry is not just client configuration The strategy depends on method, idempotency, failure phase and deduplication capability. Automatically repeating a financial POST after timeout without an idempotency key can duplicate effects."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.14 Level 2 in API Gateways",
    "id": "11-14-level-2-in-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways benefit directly from level 2 semantics. Policies can separate reading and writing per method, apply quotas per operation, block unpublished methods, validate Content-Type and Accept, propagate correlation IDs, produce 405 when the method is not allowed, and normalize infrastructure errors. Metrics by route template and status become more representative."
  },
  {
    "kind": "paragraph",
    "text": "The gateway, however, does not transform an API into level 2 just by rewriting paths or methods. If it receives GET and internally calls a command that changes state, the security property has been violated. If you convert every backend error into 200, you destroy semantics. If you add ETag without ensuring that the version represents the state, you create a false precondition. Responsibility needs to be shared with the service."
  },
  {
    "kind": "paragraph",
    "text": "In multi-hop architectures, you must record where each response was created. A 429 can come from the quota gateway, a 503 from the balancer, a 409 from the domain, and a 401 from the identity provider. Standardization helps the consumer, but logs and correlation headers need to preserve the source for troubleshooting."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-05.svg",
    "alt": "API Gateway enforcing policies without overriding domain semantics",
    "caption": "Figure 5 - The gateway reinforces the interface and applies cross-cutting policies; the domain semantics still belong to the API."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Use of level 2 in gateway policies.",
    "headers": [
      "Politics",
      "Adequate responsibility",
      "Antipattern"
    ],
    "rows": [
      [
        "Authentication",
        "Validate credential and context",
        "Invent thin authorization without domain data"
      ],
      [
        "Routing",
        "Map contract to upstream",
        "Mask incompatible routes without observability"
      ],
      [
        "Rate limiting",
        "Protect capacity and plans",
        "Use the same limit for light read and expensive command"
      ],
      [
        "Validation",
        "Reject invalid form of contract",
        "Accept payload and silently change meaning"
      ],
      [
        "Error transformation",
        "Normalize infrastructure and format",
        "Convert all errors to 200 or 500"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.15 Level 3: Hypermedia Controls",
    "id": "11-15-level-3-hypermedia-controls"
  },
  {
    "kind": "paragraph",
    "text": "Level 3 adds hypermedia controls to representations. In addition to returning data, the server reports relationships and transitions available in the current state. A pending transfer may offer self, confirm, and cancel links; a settled transfer can only offer self and receipt. The client does not need to construct all the URLs or maintain a complete table of states to know which actions are enabled."
  },
  {
    "kind": "paragraph",
    "text": "This approach is related to the HATEOAS principle: hypermedia as the engine of application state. “Application state” refers to the client's progress through a sequence of interactions, guided by incoming controls. The server continues to control the state of resources, while the representation describes possible paths. The Web works this way when a browser receives links and forms."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-06.svg",
    "alt": "Hypermedia controls exposing allowed transitions for a transfer",
    "caption": "Figure 6 - The representation of a pending transfer exposes only the transitions allowed at that time."
  },
  {
    "kind": "subhead",
    "text": "Conceptual representation with hypermedia controls"
  },
  {
    "kind": "code",
    "text": "{\n  \"id\": \"abc\",\n  \"status\": \"PENDING\",\n  \"amount\": 120.00,\n  \"_links\": {\n    \"self\":    { \"href\": \"/transfers/abc\" },\n    \"confirm\": { \"href\": \"/transfers/abc/confirmation\", \"method\": \"POST\" },\n    \"cancel\":  { \"href\": \"/transfers/abc/cancellation\", \"method\": \"POST\" }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.16 Relationships, links and actions",
    "id": "11-16-relationships-links-and-actions"
  },
  {
    "kind": "paragraph",
    "text": "A useful link has a destination and a semantic relationship. The self relation indicates the canonical identification of the representation; next and prev can navigate pages; collection points to the collection; item relates collection and member. Relationships registered with IANA allow shared meaning, while specific relationships can use their own URIs. The field name alone should not be the only semantic definition."
  },
  {
    "kind": "paragraph",
    "text": "Actions require more information than a href. The client may need method, content type, fields, constraints and documentation. Different hypermedia formats represent this information in different ways. There is no single mandatory format for REST; the contract must define the type of media, the relationships and how to interpret controls."
  },
  {
    "kind": "paragraph",
    "text": "Controls need to reflect authorization and status, but their absence does not replace enforcement. The server must validate every action again. A client can fabricate a request or reuse an old link. Hypermedia guides the experience and reduces invalid attempts; authorization and validation remain mandatory."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Relationships must have stable and documented meaning.",
    "headers": [
      "Relationship",
      "Possible meaning",
      "Note"
    ],
    "rows": [
      [
        "self",
        "Current representation identifier",
        "Help caching, correlation and updating"
      ],
      [
        "collection",
        "Collection the item belongs to",
        "Can guide navigation and creation"
      ],
      [
        "next/prev",
        "Pagination or sequence",
        "Prefer full links to cursor reconstruction"
      ],
      [
        "confirm",
        "Specific domain transition",
        "Define relationship by URI or media contract"
      ],
      [
        "describedby",
        "Document describing the resource",
        "Does not replace executable controls"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.17 Types of media and hypermedia contracts",
    "id": "11-17-types-of-media-and-hypermedia-contracts"
  },
  {
    "kind": "paragraph",
    "text": "Hypermedia depends on a convention that the client understands. application/json, alone, only defines the JSON syntax; it does not tell you that _links contain relationships, that actions describe forms or how URI templates should be expanded. The API can adopt a known media type, profile, or organization-specific type. The important thing is that the meaning is explicit and versionable."
  },
  {
    "kind": "paragraph",
    "text": "Specific media types can enable independent evolution of URLs, but also increase governance and tooling. SDKs, validators, gateways, and documentation need to know the format. In organizations with many teams, an internal hypermedia specification must define mandatory fields, registered relationships, templates, actions, errors, compatibility and security rules."
  },
  {
    "kind": "paragraph",
    "text": "Web Linking, defined by RFC 8288, allows you to transport links in headers and representations. URI Templates, defined by RFC 6570, allow describing parameterized destinations. These patterns can compose a solution, but they do not alone provide a complete model of actions. The choice must consider consumers’ real capabilities."
  },
  {
    "kind": "subhead",
    "text": "JSON does not have hypermedia by default A field called links is just data until the contract defines relationships, targets, cardinality, templates, and client behavior. The maturity is in the shared semantics, not the object name."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.18 Transition-driven clients",
    "id": "11-18-transition-driven-clients"
  },
  {
    "kind": "paragraph",
    "text": "A hypermedia-driven client starts with a small set of known points and navigates through relationships. It looks for rel=confirm, instead of concatenating /confirmation; interprets an available action, rather than coding that PENDING always allows confirmation. This reduces coupling to the topology and part of the flow rules."
  },
  {
    "kind": "paragraph",
    "text": "The reduction is not absolute. The client still knows relationships, media types, and domain semantics. Changing the meaning of confirm is breaking change. Removing a relationship may change functionality. Hypermedia shifts the coupling of URLs and rigid sequences to vocabularies and affordances, which need governance."
  },
  {
    "kind": "paragraph",
    "text": "Clients generated exclusively from OpenAPI tend to call static operations. To explore level 3, the runtime needs to analyze representations and choose transitions. It is possible to combine the approaches: OpenAPI describes operations and schemas, while relationships in the responses guide availability and navigation. Tests must verify both."
  },
  {
    "kind": "subhead",
    "text": "Relationship-driven client pseudocode"
  },
  {
    "kind": "code",
    "text": "transfer = GET(entrypoint).follow(\"transfer-by-id\", id=\"abc\")\nif transfer.has_relation(\"confirm\"):\n    result = transfer.follow(\"confirm\", body={\"otp\": \"...\"})\nelse:\n    show_message(\"Confirmation is not available in the current state\")"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.19 Benefits, costs and pitfalls of level 3",
    "id": "11-19-benefits-costs-and-pitfalls-of-level-3"
  },
  {
    "kind": "paragraph",
    "text": "The main benefit is that it allows the server to communicate valid transitions and change certain destinations without requiring clients to reconstruct URLs. This can improve discoverability, reduce invalid calls, facilitate long streams, and make state more explicit. In domains with relevant state machines - onboarding, payments, orders, approvals - dynamic controls can bring concrete value."
  },
  {
    "kind": "paragraph",
    "text": "The cost appears in design, documentation, libraries and testing. The team needs to define relationship vocabularies, represent actions, maintain media types and educate consumers. Enterprise tools are more mature for OpenAPI and static SDKs than for generic hypermedia clients. If consumers ignore links and continue concatenating paths, the cost is paid without getting the benefit."
  },
  {
    "kind": "paragraph",
    "text": "A common pitfall is to return all possible links, regardless of status or authorization. This turns hypermedia into a static catalog and can expose unnecessary information. Another is to use undefined relations, such as action1 or execute. It is also inappropriate to believe that links eliminate versioning: schemas, relationships and semantics continue to evolve."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The decision to adopt hypermedia depends on the domain and ecosystem.",
    "headers": [
      "Situation",
      "Level 3 tends to help",
      "Level 3 may not pay off"
    ],
    "rows": [
      [
        "Business flow",
        "Multiple states and dynamic transitions",
        "Simple and stable CRUD"
      ],
      [
        "Consumers",
        "Clients capable of interpreting relationships",
        "Strict batch integrations and generated SDKs"
      ],
      [
        "Topology",
        "Destinies and actions evolve frequently",
        "Few operations and stable URLs"
      ],
      [
        "Governance",
        "Shared vocabulary and media type",
        "Each team invents its own format"
      ],
      [
        "Operation",
        "Telemetry of relationships and transitions",
        "Links are not observed or tested"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.20 RMM versus Fielding's REST",
    "id": "11-20-rmm-versus-fielding-s-rest"
  },
  {
    "kind": "paragraph",
    "text": "The RMM is a didactic decomposition of some elements; REST is an architectural style made up of constraints. Level 1 relates to resource identification. Level 2 comes closest to uniform interface and the use of HTTP semantics. Level 3 emphasizes hypermedia controls. However, the model does not have explicit steps for client-server, stateless, cache, layered system and code on demand."
  },
  {
    "kind": "paragraph",
    "text": "An API can be at level 3 and still rely on session affinity in an instance, disable caching on all responses, expose persistence details, and require simultaneous coordination between client and server with each change. In this situation, the interface uses hypermedia, but the architecture does not achieve several expected REST properties."
  },
  {
    "kind": "paragraph",
    "text": "The reverse also requires nuance. An API at level 2 can apply client-server, stateless, cache and layers in a robust way, remaining far from the full use of hypermedia. Calling it “immature” without considering context may be less useful than recording exactly what constraints and properties are present."
  },
  {
    "kind": "table",
    "caption": "Table 8 - RMM and REST answer related but different questions.",
    "headers": [
      "Appearance",
      "Richardson Maturity Model",
      "Fielding REST"
    ],
    "rows": [
      [
        "Purpose",
        "Classify visible interface capabilities",
        "Define architectural style and emergent properties"
      ],
      [
        "Structure",
        "Four cumulative levels",
        "Combined Constraint Set"
      ],
      [
        "Focus",
        "Resources, HTTP and hypermedia",
        "Components, connectors, data, and constraints"
      ],
      [
        "Result",
        "Evaluation and evolution language",
        "Analysis of architectural properties"
      ],
      [
        "Limit",
        "Does not measure total quality or all constraints",
        "Does not prescribe a single endpoint design"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.21 RMM, OpenAPI and governance",
    "id": "11-21-rmm-openapi-and-governance"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describes HTTP operations, parameters, schemas, responses and security mechanisms. It is excellent for contract design, documentation, client generation, mocking, and testing. However, a valid description can represent any level: a single POST with operation field, multiple resources still handled by POST, a level 2 interface, or operations whose responses include hypermedia."
  },
  {
    "kind": "paragraph",
    "text": "Governance can use automatic rules to detect signs of levels: excessive concentration of POST, verbs in paths, lack of 4xx responses, creation without Location, methods incompatible with security, lack of error schemas and operations without resource tags. These rules are heuristics. The actual semantics, idempotent behavior, and quality of relationships require human review and testing."
  },
  {
    "kind": "paragraph",
    "text": "In enterprise pipelines, analysis should combine contract lint, contract testing, behavior testing, and telemetry. OpenAPI reports what has been declared; tests verify what the runtime executes; the gateway shows how consumers actually use the interface. An API can document PUT and implement non-idempotent effect; only behavior reveals the divergence."
  },
  {
    "kind": "subhead",
    "text": "Contract is not behavior OpenAPI can declare correct methods and responses while the implementation returns 200 for all errors or changes state on GET. Maturity needs to be verified by operational testing and evidence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.22 Evaluation matrix",
    "id": "11-22-evaluation-matrix"
  },
  {
    "kind": "paragraph",
    "text": "A useful review avoids reducing the interface to a grade. For each journey, record evidence, impact, and recommended action. The level can be informed, but must be accompanied by observations about REST, security and operation. The following table provides minimum questions that can be applied to an API or set of endpoints."
  },
  {
    "kind": "paragraph",
    "text": "The team must also consider weight and context. The absence of hypermedia can have low impact on an internal API with two stable consumers, while non-idempotent POST without deduplication can pose critical risk. Priority for improvement should be determined by risk and value, not just distance to level 3."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Evidence-based assessment matrix.",
    "headers": [
      "Dimension",
      "Evidence question",
      "Clue"
    ],
    "rows": [
      [
        "Endpoint",
        "Do intents converge on a single generic URI?",
        "Level 0"
      ],
      [
        "Resources",
        "Do entities and processes have a stable identity?",
        "Level 1"
      ],
      [
        "Methods",
        "Do GET, POST, PUT, PATCH and DELETE respect semantics?",
        "Level 2"
      ],
      [
        "Responses",
        "Statuses and headers allow generic interpretation?",
        "Level 2"
      ],
      [
        "Hypermedia",
        "Do representations expose current relationships and transitions?",
        "Level 3"
      ],
      [
        "Stateless",
        "Does the request depend on a previous local session?",
        "REST Constraint"
      ],
      [
        "Cache",
        "Do reusable responses have explicit policy?",
        "REST Constraint"
      ],
      [
        "Layers",
        "Does the client depend on the internal topology?",
        "REST Constraint"
      ],
      [
        "Operation",
        "Do logs distinguish gateway, API and domain?",
        "Operational quality"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Assessment Conclusion Example"
  },
  {
    "kind": "subhead",
    "text": "Journey: consultation and cancellation of appointment. Evidence: resources identified by /appointments/{id}; reading uses GET; cancellation uses POST /cancel; errors use 200 with envelope. Classification: level 1 with partial level 2 elements. Risk: inconsistent observability and retry handling. Next action: adopt DELETE or cancellation resource according to domain semantics, HTTP status and Problem Details, maintaining old route during migration."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.23 Migration strategy",
    "id": "11-23-migration-strategy"
  },
  {
    "kind": "paragraph",
    "text": "Migration must start with a journey of value and not with a total rewrite of the catalog. Select operations with high support costs, risk of duplication or difficulty in evolution. Inventory gateway consumers, volumes, payload dependencies, internal codes, and policies. Define success metrics before publishing the new interface."
  },
  {
    "kind": "paragraph",
    "text": "The new surface can coexist with the old one. An adapter translates level 0 messages to level 2 resources and methods; Old responses are preserved for legacy clients. Contracts have dates, deprecation policies and usage telemetry. Irreversible changes only occur after evidence of migration."
  },
  {
    "kind": "paragraph",
    "text": "Hypermedia should be added when there is a use case. Starting with self, next, prev and process relations links allows you to test tooling and consumers. Dynamic actions can be introduced into flows with relevant states. The team avoids creating a broad framework before demonstrating benefit."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/richardson-maturity-model/en/figure-07.svg",
    "alt": "Risk-and compatibility-driven incremental migration roadmap",
    "caption": "Figure 7 - Evolution between levels can be incremental, compatible and risk-driven."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.24 Observability and troubleshooting",
    "id": "11-24-observability-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Interface maturity changes the quality of operational signals. At level 0, metrics per POST /service aggregate all intents; It is necessary to extract operation from the body or add a business attribute. At level 1, routes distinguish resources, but actions can remain hidden. At level 2, method, route template and status offer standardized dimensions. At level 3, followed relationships can reveal transitions and journeys."
  },
  {
    "kind": "paragraph",
    "text": "Logs must record method, route template, status, latency, response source, correlation ID, consumer and resource identifier when allowed. Avoid using the concrete URI as a metric label, as high cardinality IDs degrade observability systems. Use /transfers/{id} as a dimension and preserve the identifier only in protected logs or traces."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting needs to separate contract and transport. A timeout occurs before any RMM classification; a 405 indicates that an HTTP component responded; a 409 could represent domain conflict; a 200 with internal error suggests level 0 contract or poor fit. For gateways, confirm whether the response was produced by the proxy, the policy, or the backend."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Useful symptoms when investigating interfaces at different levels.",
    "headers": [
      "Symptom",
      "Hypothesis",
      "Evidence to collect"
    ],
    "rows": [
      [
        "Everything appears as a route",
        "Level 0 Generic Endpoint",
        "operation field, extraction policy and trace"
      ],
      [
        "GET changes state",
        "Level 2 semantics violated",
        "domain logs and repeated tests"
      ],
      [
        "Retry duplicates operation",
        "POST without deduplication",
        "idempotency key and transactional records"
      ],
      [
        "Link exists but fails",
        "Outdated or unauthorized control",
        "representation, status and authorization decision"
      ],
      [
        "405 on gateway",
        "Blocked or unpublished method",
        "Allow, route and upstream configuration"
      ],
      [
        "200 with problem",
        "Legacy envelope or transformation",
        "body, policy chain and backend status"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11.25 Case studies and labs",
    "id": "11-25-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "The following exercises use a fictitious transfer domain. Run only in lab or mock environments. The objective is to observe differences in contracts and behavior; it's not reproducing real data or integrations."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case study 1 - dispatcher modernization"
  },
  {
    "kind": "paragraph",
    "text": "An API receives POST /transactions with action=CONSULT, action=CREATE and action=CANCEL. All results use 200. Propose resources, methods, and answers. Consider how to preserve old consumers, how to correlate the new transfer, and how to handle timeout after creation. Compare before and after metrics."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case study 2 - asynchronous process"
  },
  {
    "kind": "paragraph",
    "text": "A transfer may remain under review. Model the request as a resource, return 202 when processing has not yet finished, and provide a monitor. Then add self, cancel and receipt relationships depending on the state. Verify that the server rejects unauthorized actions even when the link is fabricated."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratory 1 - classification by evidence"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "List all endpoints for a test API and group by journey.",
      "Identify operations focused on body or verbs in the path.",
      "Rate each journey, not just the entire API.",
      "Record evidence of resources, methods, status, headers and hypermedia.",
      "Produce recommendations prioritized by risk and value."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - HTTP Semantics Test"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Run GET repeatedly and confirm that there is no requested effect on the domain.",
      "Repeat PUT and DELETE and observe the desired effect.",
      "Simulate concurrent update with ETag and If-Match.",
      "Cause validation, conflict, absence and unavailability; compare status and Problem Details.",
      "Inspect gateway and backend to find out which component produced each response."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - hypermedia client"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Start at an entry point and look for relationships, without concatenating paths.",
      "Only perform actions present in the representation.",
      "Change the target of a relationship on the server without modifying the client.",
      "Remove a state change transition and observe the behavior.",
      "Capture metrics of followed relationships and transition failures."
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
    "text": "The Richardson Maturity Model describes evolution at four levels. Level 0 focuses operations on messages sent to a generic endpoint. Level 1 introduces resources and identifiers. Level 2 uses HTTP semantics through methods, status, headers, cache and preconditions. Level 3 adds hypermedia controls that guide transitions in the current state."
  },
  {
    "kind": "paragraph",
    "text": "The model is useful for diagnosis and planning, but does not measure all attributes of a platform. Security, reliability, governance, performance, documentation and compatibility require their own analysis. It also does not replace the REST constraints described by Fielding. An interface can reach level 3 without obtaining all of the style's architectural properties."
  },
  {
    "kind": "paragraph",
    "text": "Evolution must be driven by risk and value. Stable resources improve identity; HTTP semantics improve interoperability and operation; Hypermedia can reduce coupling to URLs and flow rules. Each step has costs and depends on the consumer ecosystem. The goal is not to achieve a score, but to build predictable, evolving and observable interfaces."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Assessment checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Are operations concentrated on an endpoint and differentiated by body?",
      "Do domain concepts have stable resources and identifiers?",
      "Do URIs represent resources rather than function names?",
      "Do methods respect security and idempotency?",
      "Do status codes correctly identify success, client error, and server failure?",
      "Do creations, asynchronous processes, and preconditions use appropriate headers?",
      "Do errors have a structured format and do not expose sensitive data?",
      "Do retries consider idempotency and deduplication?",
      "Do representations expose links and actions with defined relationships?",
      "Do clients really interpret relationships or continue to encode URLs?",
      "Does evaluation separate RMM, REST constraints, and quality attributes?",
      "Do gateway, backend and domain preserve the same semantics?",
      "Do metrics use route templates and distinguish origin from response?",
      "Does the migration have consumer inventory, telemetry and a deprecation plan?"
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
      "Explain why using JSON and POST does not determine the level of an API.",
      "Classify an interface with multiple paths, all handled by POST, and justify.",
      "Model retrieval, creation and cancellation of transfers at levels 0, 1 and 2.",
      "Describe a situation where an API level 2 is adequate and level 3 is not suitable.",
      "Explain how ETag and If-Match contribute to a level 2 interface.",
      "Propose hypermedia relationships for a four-state approval process.",
      "Differentiate between absence of link and lack of authorization on the server.",
      "Compare RMM to stateless and REST cache constraints.",
      "Explain why OpenAPI does not certify idempotent behavior.",
      "Create a migration plan for a single endpoint used by five consumers.",
      "Describe a troubleshooting script for 200 containing internal error.",
      "Build an evidence matrix to evaluate an API at the gateway and backend."
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
    "caption": "Essential chapter glossary.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Affordance",
        "Indication of a possible action and how to execute it in the context of a representation."
      ],
      [
        "Endpoint",
        "Point of interaction exposed by an API, normally associated with URI and method."
      ],
      [
        "HATEOAS",
        "Use of hypermedia to guide application state and upcoming transitions."
      ],
      [
        "Hypermedia",
        "Media that contains controls, relationships or links capable of guiding navigation and actions."
      ],
      [
        "Idempotency",
        "Property by which equivalent repetitions produce the same intended effect."
      ],
      [
        "Link relationship",
        "Relationship that defines the meaning of a link between the context and the target."
      ],
      [
        "POX",
        "Plain Old XML; in RMM, it represents proprietary messages carried by a generic endpoint, even when the modern format is JSON."
      ],
      [
        "Problem Details",
        "Standardized format for representing Problem Detailss in HTTP APIs."
      ],
      [
        "Resource",
        "Identifiable abstraction that can have server-controlled representations and state."
      ],
      [
        "Representation",
        "Transferred data that describes the current or intended state of a resource."
      ],
      [
        "Richardson Maturity Model",
        "Four-level model to observe capability adoption, HTTP semantics, and hypermedia."
      ],
      [
        "RMM",
        "Acronym for Richardson Maturity Model."
      ],
      [
        "HTTP Semantics",
        "Shared meaning of methods, codes, headers, and other protocol elements."
      ],
      [
        "URI Template",
        "Syntax for expressing parameterized URIs that can be expanded by clients."
      ],
      [
        "WebLinking",
        "Standardized model for expressing links and relationships in web messages."
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
    "kind": "paragraph",
    "text": "The references below should be read together. Fowler's article presents the model; Fielding's dissertation provides the architectural basis of REST; the RFCs define the interoperable semantics used in the examples."
  },
  {
    "kind": "paragraph",
    "text": "[1] FOWLER, Martin. Richardson Maturity Model: steps toward the glory of REST. 2010. Available at: martinfowler.com/articles/richardsonMaturityModel.html."
  },
  {
    "kind": "paragraph",
    "text": "[2] FIELDING, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine, 2000. Chapter 5: Representational State Transfer."
  },
  {
    "kind": "paragraph",
    "text": "[3] IETF. RFC 9110 - HTTP Semantics. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[4] IETF. RFC 9111 - HTTP Caching. 2022."
  },
  {
    "kind": "paragraph",
    "text": "[5] IETF. RFC 8288 - Web Linking. 2017."
  },
  {
    "kind": "paragraph",
    "text": "[6] IETF. RFC 6570 - URI Template. 2012."
  },
  {
    "kind": "paragraph",
    "text": "[7] IETF. RFC 9457 - Problem Details for HTTP APIs. 2023."
  },
  {
    "kind": "paragraph",
    "text": "[8] IANA. Link Relations Registry. Register of standardized relationships for links."
  },
  {
    "kind": "paragraph",
    "text": "[9] OpenAPI Initiative. OpenAPI Specification. Specification for describing HTTP APIs."
  },
  {
    "kind": "paragraph",
    "text": "[10] IETF. RFC 6902 - JavaScript Object Notation (JSON) Patch. 2013."
  },
  {
    "kind": "paragraph",
    "text": "[11] IETF. RFC 7386 - JSON Merge Patch. 2014."
  },
  {
    "kind": "paragraph",
    "text": "[12] IETF. RFC 7232 - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests. 2014. Obsolete as an aggregate document, but historically relevant; the current semantics are consolidated in RFC 9110."
  },
  {
    "kind": "subhead",
    "text": "End of the chapter The next step of the course is to delve deeper into the description and governance of API contracts, connecting HTTP modeling, OpenAPI, validation, compatibility and pipeline automation."
  }
];
