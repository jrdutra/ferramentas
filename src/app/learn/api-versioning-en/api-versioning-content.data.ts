import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const API_VERSIONING_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Controlled evolution: change without surprising consumers"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/en/overview.svg",
    "alt": "Contract, change, coexistence, depreciation and retirement as stages of API evolution",
    "caption": "Opening figure - Safe evolution transforms change into an observable and governed process."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Compatibility is perceived by the consumer; versioning is just a coordination mechanism."
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
    "text": "In the previous chapter, rate limiting, quotas and throttling were presented as part of an API's operational contract. Reducing a limit, changing the consumption unit, or modifying the behavior of a 429 response can break consumers even when no JSON fields have changed. This observation leads to the central theme of this chapter: an API is compliant when it continues to meet legitimate consumer expectations, not just when the OpenAPI file can still be parsed."
  },
  {
    "kind": "paragraph",
    "text": "API Versioning is often reduced to the choice between putting v1 in the path, in a header or in a parameter. This choice is important, but it only represents the visible part. The real problem is coordinating evolution in a distributed system: contracts have been published, SDKs have been generated, applications have incorporated behaviors and integrations may be outside the direct control of the provider. Changing the API now requires impact analysis, communication, coexistence and evidence of migration."
  },
  {
    "kind": "paragraph",
    "text": "The life cycle expands this analysis. A version needs to be born with stability criteria, become active, receive corrections, communicate changes, go into depreciation and eventually be withdrawn. Without governance, versions accumulate at the gateway, vulnerabilities remain in old contracts, and consumers only discover retirement when traffic fails."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents compatibility models, change taxonomy, version selection strategies, schema evolution, versioning in REST, GraphQL, gRPC and events, versions and revisions in Azure API Management, depreciation with Deprecation and Sunset headers, telemetry, contract testing and the expand-migrate-contract pattern."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each change, answer: who produces the data, who interprets it, what past behavior was promised, which consumers still depend on it, and what evidence demonstrates the change is safe. Avoid classifying changes just by the appearance of the diff."
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
      "Explain why API evolution is a distributed contract problem and not just a code problem.",
      "Distinguish syntactic, structural, semantic, behavioral and operational compatibility.",
      "Classify changes in requests, responses, schemas, errors, security and limits.",
      "Critically apply semantic versioning to remote APIs.",
      "Compare versioning by path, query string, header, media type and data.",
      "Plan coexistence, migration and retirement of versions in API Gateways.",
      "Differentiate public version, revision, implementation release and specification version.",
      "Use Deprecation, Sunset, changelogs and migration guides.",
      "Apply semantic diff, contract tests, telemetry and quality gates.",
      "Diagnose incorrect routing, contract drift and consumers stuck on old versions."
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
      "28.1 Why APIs need to evolve; 28.2 Public contract; 28.3 Compatibility dimensions; 28.4 Data direction; 28.5 Taxonomy of changes; 28.6 SemVer; 28.7 Version dimensions; 28.8Path; 28.9 Query, header and media type; 28.10 Versions by date; 28.11 Choice criteria; 28.12 Schemas and enums; 28.13 Operations, errors, security and limits; 28.14 REST, GraphQL, gRPC and events; 28.15 Persistent data; 28.16 Coexistence; 28.17 Azure APIM; 28.18 Life cycle; 28.19 Depreciation and Sunset; 28.20 Communication; 28.21 Telemetry; 28.22 Diff and tests; 28.23 Expand-migrate-contract; 28.24 Gateway and troubleshooting; 28.25 Case studies and laboratories."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.1 Why APIs need to evolve",
    "id": "28-1-why-apis-need-to-evolve"
  },
  {
    "kind": "paragraph",
    "text": "APIs evolve because the domain changes. New regulatory rules, products, channels, partners, and security requirements require additional information or different behaviors. There are also technical reasons: correcting modeling, improving performance, replacing dependencies, adopting new formats and eliminating vulnerabilities. Freezing an interface forever transfers costs to the backend, which starts maintaining adaptations and exceptions indefinitely."
  },
  {
    "kind": "paragraph",
    "text": "At the same time, a published API creates dependency. The consumer can compile an SDK, persist responses, validate enums as closed sets, use an HTTP status for flow control, or assume certain ordering. These assumptions do not always appear in the formal contract. A small change to the provider can be disruptive for applications that have incorporated the previous behavior."
  },
  {
    "kind": "paragraph",
    "text": "Safe evolution separates internal change from observable change. Refactoring classes, changing databases or moving the service between clusters does not require a new version when the contract and promised features remain. Changing a mandatory field, removing an accepted value or changing operation semantics affects the public interface, even if the URL remains the same."
  },
  {
    "kind": "subhead",
    "text": "Architecture principle"
  },
  {
    "kind": "paragraph",
    "text": "New deployment does not automatically imply new public version. A new public version is required when the observable contract changes in an incompatible way or when the organization needs to explicitly offer different behaviors."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.2 The public contract of an API",
    "id": "28-2-the-public-contract-of-an-api"
  },
  {
    "kind": "paragraph",
    "text": "The public contract includes everything that the consumer can observe and is authorized to trust. Paths, methods, parameters, schemas, status, headers, media types and security requirements form the explicit part. Agreed latency, limits, ordering, consistency, idempotence, retry policy and availability window can form an equally relevant operational part."
  },
  {
    "kind": "paragraph",
    "text": "The agreement is not limited to the OpenAPI document. It also exists in the gateway, deployment, portal, SDKs, and actual production behavior. When these representations diverge, contract drift arises. Comparing the new proposal only with an outdated file produces false security; the baseline must match the actually published and supported version."
  },
  {
    "kind": "paragraph",
    "text": "The consumer does not need to know internal details, but they do need predictability. The provider can change the implementation freely while preserving semantics and guarantees. The boundary between internal freedom and external commitment is the essence of a mature versioning strategy."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.3 Compatibility dimensions",
    "id": "28-3-compatibility-dimensions"
  },
  {
    "kind": "paragraph",
    "text": "Syntactic compatibility means that the message can still be parsed. Structural compatibility indicates that types, properties, and constraints remain accepted. Semantic compatibility requires that the meaning remains. Behavioral compatibility looks at effects, transitions, and errors. Operational compatibility includes performance, availability, limits, and features necessary for the consumer to meet their own objectives."
  },
  {
    "kind": "paragraph",
    "text": "An API can remain structurally compatible and break semantically: the field remains a string, but the same value starts to mean another state. It can also maintain semantics and fail operationally when pagination decreases, the rate limit is reduced or the timeout grows beyond the consumer's journey. Contract diff is necessary but not sufficient."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Compatibility needs to be evaluated across several dimensions.",
    "headers": [
      "Dimension",
      "Verification question",
      "Break example"
    ],
    "rows": [
      [
        "Syntactics",
        "Can the message still be read?",
        "Media type removed or invalid payload."
      ],
      [
        "Structural",
        "Are types and restrictions still compatible?",
        "Field changes from string to integer."
      ],
      [
        "Semantics",
        "Did the meaning remain?",
        "The same value now represents another state."
      ],
      [
        "Behavioral",
        "Effects, order and errors remain?",
        "POST, previously idempotent, now duplicates."
      ],
      [
        "Operational",
        "SLA, limits and volume remain viable?",
        "Maximum page or reduced quota."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.4 Data direction and consumer perspective",
    "id": "28-4-data-direction-and-consumer-perspective"
  },
  {
    "kind": "paragraph",
    "text": "The same change can have the opposite impact depending on the direction of the data. In a request, the consumer produces and the provider interprets. Making provider validation more permissive generally preserves old requests; making it more restrictive may reject them. In a response, the provider produces and the consumer interprets; adding possibilities may require tolerance that the client does not have."
  },
  {
    "kind": "paragraph",
    "text": "Adding enum value to request is often supported for existing consumers because they can continue to send known values. Adding value to response may break clients that mapped the set as closed. Diff tools need to know this direction; Generic rules like “addition is compatible” produce false negatives."
  },
  {
    "kind": "paragraph",
    "text": "Callbacks, webhooks and events reverse traditional roles. The organization that normally acts as a server starts producing messages consumed by third parties. The review needs to clearly record who produces and who interprets each element."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/en/figure-01-data-direction.svg",
    "alt": "Compatibility analyzed according to the direction of data between consumer and provider",
    "caption": "Figure 1 - The direction of the data changes the compatibility rating."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.5 Taxonomy of changes",
    "id": "28-5-taxonomy-of-changes"
  },
  {
    "kind": "paragraph",
    "text": "Additive changes add elements without removing existing ones: new operation, optional field or additional media type. They are usually compatible, but they are not automatically safe. Additional field in response may break strict deserializers; new enum value can reach a switch without default case; new route may collide with generic route on the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Restrictive changes reduce the set of accepted messages. Making a field mandatory, decreasing maxLength, eliminating enum or accepting fewer formats tends to break previously valid requests. Substitutive changes swap one element for another, such as renaming a property, path, or OAuth scope. Behavioral changes preserve structure, but alter rules, side effects, consistency, ordering or error policy."
  },
  {
    "kind": "paragraph",
    "text": "The classification must record direction, range and mitigation. A change can be compatible for requests and incompatible for responses; safe for tolerant clients and risky for generated SDKs; acceptable in preview and inadequate in production."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Practical taxonomy for reviewing changes.",
    "headers": [
      "Category",
      "Example",
      "Main risk"
    ],
    "rows": [
      [
        "Additive",
        "New optional property in response.",
        "Client rejects unknown fields."
      ],
      [
        "Restrictive",
        "Previously optional field becomes required.",
        "Existing requests fail."
      ],
      [
        "Substitute",
        "Rename clientId to id.",
        "Code and SDK need to change."
      ],
      [
        "Behavioral",
        "Change default ordering.",
        "Pagination and results are no longer stable."
      ],
      [
        "Operational",
        "Reduce timeout, quota or rate limit.",
        "Consumer does not complete their journey."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.6 Semantic versioning and its limits",
    "id": "28-6-semantic-versioning-and-its-limits"
  },
  {
    "kind": "paragraph",
    "text": "Semantic Versioning uses MAJOR.MINOR.PATCH. The major increases when there is an incompatible change in the public API; minor when there is compatible functionality; patch when there is a compatible patch. The model is valuable because it forces you to declare a public interface and assigns meaning to the number change."
  },
  {
    "kind": "paragraph",
    "text": "In remote APIs, SemVer needs critical thinking. The consumer does not necessarily choose an exact version of the server as they choose a library. The provider can continuously deploy under the same endpoint, and operational characteristics are also part of the experience. Publishing 1.4.3 to info.version does not determine how the gateway will select the version."
  },
  {
    "kind": "paragraph",
    "text": "Many organizations expose only the major, as v1, and treat minor and patch as compatible releases under the same interface. This approach reduces endpoint proliferation, but requires strict discipline in compatibility classification. SemVer does not replace deprecation, support or migration policy."
  },
  {
    "kind": "table",
    "caption": "Table 3 - SemVer communicates intent, but depends on clear compatibility rules.",
    "headers": [
      "Number",
      "Intention",
      "Possible use in APIs"
    ],
    "rows": [
      [
        "MAJOR",
        "Incompatible change.",
        "New selectable interface: v1 to v2."
      ],
      [
        "MINOR",
        "Supported functionality.",
        "Compatible release under the same major."
      ],
      [
        "PATCH",
        "Compatible fix.",
        "Implementation correction without new public contract."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.7 Public version, contract, implementation and specification",
    "id": "28-7-public-version-contract-implementation-and-specification"
  },
  {
    "kind": "paragraph",
    "text": "A mature architecture distinguishes different numbers. The public version identifies a consumer-selectable interface. The contract version identifies a revision of the OpenAPI document or schema. The implementation version identifies the build or release of the backend. The version of the specification, such as OpenAPI 3.1, tells you which dialect describes the document."
  },
  {
    "kind": "paragraph",
    "text": "These numbers change for different reasons. The backend can receive multiple deployments without changing the public version. The contract can correct a description without changing the runtime. Migrating the description from OpenAPI 3.0 to 3.1 does not require creating v2. Confusing dimensions produces unstable URLs and makes auditing difficult."
  },
  {
    "kind": "paragraph",
    "text": "Logs and metrics must record requested public version, gateway revision, backend build and contract checksum. This correlation allows you to investigate when responses seemingly from the same API came from different implementations."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Do not treat all numbers as a single version.",
    "headers": [
      "Dimension",
      "Example",
      "Usage"
    ],
    "rows": [
      [
        "Public version",
        "v2",
        "Consumer, portal and routing."
      ],
      [
        "Contract",
        "2.3.0",
        "Diff, testing, catalog and governance."
      ],
      [
        "Implementation",
        "build 2026.07.16.4",
        "Deployment, rollback and observability."
      ],
      [
        "Specification",
        "openapi: 3.1.1",
        "Parser, editor and generators."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.8 Versioning in the URI path",
    "id": "28-8-versioning-in-the-uri-path"
  },
  {
    "kind": "paragraph",
    "text": "Path versioning places the identifier in a visible part of the URI, such as /v1/clientes. It is simple to understand, appears in logs without header inspection, and is usually easily routed through gateways. It also allows documentation and policies separated by base path."
  },
  {
    "kind": "paragraph",
    "text": "The main disadvantage is making the version part of the resource identity. /v1/clientes/10 and /v2/clientes/10 are different URIs, even though they represent the same entity. Links, caches and integrations need to be updated. The pattern works best when only incompatible major changes generate new path."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must prevent ambiguities, such as /v1beta colliding with /v1, and must define the behavior of unversioned paths. Silently redirecting to the newer version can be dangerous; explicit rejection or documented default version are more predictable choices."
  },
  {
    "kind": "subhead",
    "text": "Example version on path"
  },
  {
    "kind": "code",
    "text": "GET /v2/clientes/123 HTTP/1.1\nHost: api.empresa.example\nAccept: application/json"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.9 Query string, header and media type",
    "id": "28-9-query-string-header-and-media-type"
  },
  {
    "kind": "paragraph",
    "text": "The query string expresses the version as a parameter, for example ?api-version=2026-07-01. Preserves the path and is common in services that version by date. Gateways and caches need to include the parameter in the key and prevent unknown values from being silently ignored."
  },
  {
    "kind": "paragraph",
    "text": "A dedicated header, like Api-Version: 2, keeps the URI stable and makes the negotiation explicit. The disadvantage is less visibility in simple tools and logs that do not record headers. WAF, CORS, proxies and observability need to preserve the field correctly."
  },
  {
    "kind": "paragraph",
    "text": "Versioning by media type uses Accept, such as application/vnd.empresa.cliente-v2+json. It combines representation format and version and aligns with content negotiation. However, it increases tooling complexity and requires Vary: Accept when the response changes depending on the header."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/en/figure-02-version-selection.svg",
    "alt": "Strategies for selecting versions by path, query, header and media type",
    "caption": "Figure 2 - Selection strategies have trade-offs in visibility, cache and operation."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The choice must work across the entire technical chain.",
    "headers": [
      "Mechanism",
      "Advantage",
      "Caution"
    ],
    "rows": [
      [
        "Path",
        "Visible and simple to route.",
        "It changes the URI and tends to proliferate."
      ],
      [
        "Query",
        "Good for versions by date.",
        "Cache and links must preserve the parameter."
      ],
      [
        "Header",
        "Keep the path steady.",
        "Lower visibility and greater dependence on tooling."
      ],
      [
        "media type",
        "Negotiates version and representation.",
        "Complexity of clients and caches."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Versions by date, such as 2026-07-01, communicate a temporal baseline rather than a major sequence. They are useful on platforms with many coordinated changes or when the consumer needs to fix known behavior on a certain date. The date does not necessarily mean deployment date; it represents a published contract and must be immutable once made available."
  },
  {
    "kind": "paragraph",
    "text": "Another approach combines major release with stability levels: alpha, beta and stable. Alpha supports frequent changes and limited support; beta signals greater maturity, but can still evolve; stable offers compatibility and support commitments. These labels only have value when there are clear promotion and withdrawal criteria."
  },
  {
    "kind": "paragraph",
    "text": "Releases by date and stability labels do not eliminate the need for compatibility. They simply better express the lifecycle model chosen by the organization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.11 Criteria for choosing a strategy",
    "id": "28-11-criteria-for-choosing-a-strategy"
  },
  {
    "kind": "paragraph",
    "text": "There is no universally better mechanism. The decision needs to consider consumers, caching, observability, portals, SDKs, infrastructure, corporate policies and operation capacity. Path tends to favor simplicity; header and media type favor stable URI; query works well for date baselines. Organizational consistency is more important than individual preference."
  },
  {
    "kind": "paragraph",
    "text": "The strategy also needs to define missing, unknown, and retired versions. The gateway must respond in a predictable way, with a standardized error message and link to documentation. Silent fallback to the closest version can mask failures and produce incorrect behavior."
  },
  {
    "kind": "paragraph",
    "text": "When different teams adopt incompatible mechanisms, the cost appears in the portal, customers, and observability. An enterprise standard must allow for justified exceptions, but must maintain common compatibility, lifecycle, and depreciation criteria."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.12 Evolution of schemas, fields, enums and nullability",
    "id": "28-12-evolution-of-schemas-fields-enums-and-nullability"
  },
  {
    "kind": "paragraph",
    "text": "Adding an optional field to a request is usually supported because old clients simply don't send it. Making it mandatory breaks existing messages. In response, adding field may break strict clients. Removing a field, changing type, decreasing limits or changing nullability tends to be incompatible."
  },
  {
    "kind": "paragraph",
    "text": "Enums require special attention. In request, adding value accepted by the server does not force old clients to use it. In response, the new value may break SDKs that generated closed enum. An evolution policy must define whether consumers need to ignore unknown values or map an UNKNOWN state."
  },
  {
    "kind": "paragraph",
    "text": "JSON Schema, OpenAPI, and SDK generators can interpret missing, null, and empty values differently. Changing a field from nullable to non-nullable, changing default or omitting properties can affect logic even when the nominal type remains the same."
  },
  {
    "kind": "table",
    "caption": "Table 6 - The message direction changes the compatibility analysis.",
    "headers": [
      "Change",
      "Request",
      "Response"
    ],
    "rows": [
      [
        "Add optional field",
        "Generally compatible.",
        "Conditional: client must tolerate strangers."
      ],
      [
        "Make field required",
        "Breaker.",
        "It can break parsing and expectations."
      ],
      [
        "Add enum",
        "Generally compatible.",
        "Risky for clients with closed enum."
      ],
      [
        "Change type",
        "Breaker.",
        "Breaker."
      ],
      [
        "Change nullability",
        "Normally disruptive.",
        "It can break validation and logic."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Add operation is generally supported, but may collide with generic routes. Removing or renaming path or method is breaking. Making a parameter mandatory, changing query location to header, changing encoding or eliminating media type requires coordinated migration."
  },
  {
    "kind": "paragraph",
    "text": "HTTP status and error templates are part of the contract. Changing 404 to 200 with empty body, changing 409 to 422, or replacing error structure can break retry, observability, and flow control. The provider must maintain stable codes or provide a new version with clear migration guidance."
  },
  {
    "kind": "paragraph",
    "text": "Security changes are often incompatible: require new OAuth scope, change audience, remove API key, require mTLS or change request signature. The same goes for rate limits, quotas, timeouts and paging. The public version must reflect changes that make existing consumers unviable, even if the payload remains identical."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.14 Versioning in REST, GraphQL, gRPC and events",
    "id": "28-14-versioning-in-rest-graphql-grpc-and-events"
  },
  {
    "kind": "paragraph",
    "text": "In REST, versions often appear in the path, query, header or media type. In GraphQL, evolution usually occurs in the schema itself by adding and deprecating fields; creating /v2 for any changes eliminates some of the flexibility of the model. Incompatible fields can coexist temporarily, with @deprecated and per-operation telemetry."
  },
  {
    "kind": "paragraph",
    "text": "In gRPC and Protocol Buffers, compatibility depends on field numbers. Removed fields must be marked as reserved and old numbers cannot be reused. Packages and services may include major in the nomenclature when there is a breakdown. Binary compatibility needs to be tested against clients generated in previous versions."
  },
  {
    "kind": "paragraph",
    "text": "Events and messaging require special attention because messages may remain stored. The consumer can process old events after a new version is published. Strategies include schema registry, backward/forward compatibility, envelope versioning and tolerant consumers. Updating producer and consumer simultaneously is rarely secure in distributed environments."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.15 Persistent data and migrations",
    "id": "28-15-persistent-data-and-migrations"
  },
  {
    "kind": "paragraph",
    "text": "API changes often depend on changes in the database. Adding mandatory field in v2 may require backfilling of historical records. Changing an identifier or normalizing an entity can affect links, events, and caches. Migration needs to consider old data, rollback and coexistence between application versions."
  },
  {
    "kind": "paragraph",
    "text": "The expand-and-contract pattern also applies to the bank: first add new column or structure without removing the old one; then write in both formats or backfill; then migrate readers; finally remove the old structure when there are no dependents. Instant exchanges increase risk because code and data rarely change atomically across the entire platform."
  },
  {
    "kind": "paragraph",
    "text": "When v1 and v2 need to read and write the same domain, the organization must define source of truth, transformation, and consistency. Adapters in the gateway resolve superficial differences; Deep semantic changes belong to the domain or dedicated compatibility services."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.16 Coexistence of versions and adapters",
    "id": "28-16-coexistence-of-versions-and-adapters"
  },
  {
    "kind": "paragraph",
    "text": "Coexistence allows consumers to migrate at different paces. The gateway can route v1 and v2 to separate backends, to the same implementation with internal branches, or to a facade that adapts contracts. Each option has a cost. Separate backends increase isolation but duplicate operations; shared implementation reduces infrastructure but accumulates conditionals; adapters work well for representation differences, but not for incompatible business rules."
  },
  {
    "kind": "paragraph",
    "text": "An old version shouldn't stay around indefinitely just because it still gets traffic. The provider needs to measure consumers, classify criticality, define deadline and offer migration support. Without sunset, versions become permanent products and expand the attack surface."
  },
  {
    "kind": "paragraph",
    "text": "Policies, caching, authentication, observability, and SLAs may differ by version. The version set needs to record recommended version, state, owner, documentation and replacement relationship."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.17 Versions and revisions in Azure API Management",
    "id": "28-17-versions-and-revisions-in-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, versions group related APIs and allow you to expose incompatible interfaces by path, query, or header. They are appropriate when consumers need to explicitly select different contracts. Each version can have its own operations, policies, products and documentation."
  },
  {
    "kind": "paragraph",
    "text": "Revisions solve another problem: changing and testing an API without creating a new public version. A revision can receive non-breaking changes, be tested separately, and then become current. The changelog can be published to consumers. Revision is not a substitute for versioning when the contract is incompatible."
  },
  {
    "kind": "paragraph",
    "text": "The rule of thumb is simple: non-breaking change can be prepared as a revision and promoted to the current version; Breaking change requires new version and migration plan. The pipeline needs to prevent an experimental review from becoming current without testing and approval."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Version, revision and release solve different problems.",
    "headers": [
      "Concept",
      "When to use",
      "Effect on the consumer"
    ],
    "rows": [
      [
        "Version",
        "Incompatible contract or different behavior.",
        "Selects version by explicit engine."
      ],
      [
        "Revision",
        "Change controlled under the same public version.",
        "Normally it keeps calling the same version."
      ],
      [
        "Release/build",
        "Internal implementation change.",
        "No public selection required."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.18 Lifecycle states and governance",
    "id": "28-18-lifecycle-states-and-governance"
  },
  {
    "kind": "paragraph",
    "text": "A version needs clear states. Design indicates contract under review; preview allows pilots and admits changes; active offers support and SLA; deprecated informs that the version is no longer recommended; sunset sets withdrawal date; retired indicates that the traffic is no longer served."
  },
  {
    "kind": "paragraph",
    "text": "Every transition needs entry and exit criteria. To become active, for example, the contract must be published, policies tested, capacity validated and owner defined. To be deprecated, there must be a functional replacement, migration guide and deadline. To withdraw, telemetry needs to demonstrate absence or formal acceptance from remaining consumers."
  },
  {
    "kind": "paragraph",
    "text": "Governance must prevent orphaned versions: without owner, without documentation, without observability or with certificate and unmaintained dependencies."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/en/figure-03-lifecycle.svg",
    "alt": "Governed lifecycle of an API version",
    "caption": "Figure 3 - Life cycle transforms version into governed and auditable object."
  },
  {
    "kind": "paragraph",
    "text": "Depreciation does not mean immediate termination. It communicates that the feature or version is no longer recommended and may be removed in the future. The consumer needs a replacement, deadline, justification and migration documentation. The sunset date represents the moment after which the resource tends to stop responding."
  },
  {
    "kind": "paragraph",
    "text": "The Deprecation header allows you to signal that the resource will be or has already been deprecated. The relation deprecation link may point to additional documentation. The Sunset header tells you when the URI is likely to become unavailable. These signals complement portal, email and changelog; They do not replace active consumer management."
  },
  {
    "kind": "paragraph",
    "text": "The Sunset date must not be earlier than the depreciation date. The gateway can insert these headers per version, but the configuration needs to be consistent with the actual catalog and retirement plan."
  },
  {
    "kind": "subhead",
    "text": "Example of Depreciation Signaling"
  },
  {
    "kind": "code",
    "text": "HTTP/1.1 200 OK\nDeprecation: @1782863999\nSunset: Wed, 30 Jun 2027 23:59:59 GMT\nLink: <https://developer.example/migrations/v2>; rel=\"deprecation\""
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.20 Communication, changelog and migration guide",
    "id": "28-20-communication-changelog-and-migration-guide"
  },
  {
    "kind": "paragraph",
    "text": "Effective communication answers what changed, why it changed, who is affected, when the version will be retired and how to migrate. The changelog should be consumer-oriented, not a list of commits. The guide needs to show field mapping, status differences, new security requirements, and before/after examples."
  },
  {
    "kind": "paragraph",
    "text": "Critical consumers may require direct contact, approval window and follow-up. Generic notifications on the portal are insufficient when the version participates in payments, Open Finance or regulated journeys. The organization must record confirmation, risks and exceptions."
  },
  {
    "kind": "paragraph",
    "text": "The portal must indicate recommended version, status of others, documentation, SDKs, changelog and dates. Broken links or conflicting documentation reduce confidence and prolong migrations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.21 Consumer inventory and telemetry",
    "id": "28-21-consumer-inventory-and-telemetry"
  },
  {
    "kind": "paragraph",
    "text": "It is not possible to safely remove what is not measured. The inventory must identify application, owner, tenant, environment, version used, criticality and volume. Isolated IP is insufficient in environments with NAT, proxies and shared pools. client_id, subscription key, certificate, or workload identity are better keys."
  },
  {
    "kind": "paragraph",
    "text": "Telemetry needs to cover periodic traffic and seasonal journeys. One version may appear inactive for days and only be used at the monthly close. Useful metrics include calls by version, unique consumers, errors, operations used, last activity, and migration percentage."
  },
  {
    "kind": "paragraph",
    "text": "Logs must preserve the requested version and the effectively routed version. When the gateway applies default or rewrite, the difference needs to be visible to avoid misdiagnosis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.22 Semantic diff, contract tests and quality gates",
    "id": "28-22-semantic-diff-contract-tests-and-quality-gates"
  },
  {
    "kind": "paragraph",
    "text": "Textual diff identifies changed lines, but does not understand impact. Semantic diff interprets operations, schemas, data direction, required, enums and restrictions. Still, tools don't capture every behavioral change. Human review needs to analyze semantics, security, and operation."
  },
  {
    "kind": "paragraph",
    "text": "The pipeline must validate syntax, linting, corporate rules, diff against the published baseline, contract testing, consumer testing, and exception approval. The baseline cannot just be the main branch; it must represent the artifact actually in production."
  },
  {
    "kind": "paragraph",
    "text": "Consumer-driven contract testing helps reveal concrete dependencies, but does not replace the provider's contract. A good strategy combines OpenAPI or official schema, compatibility testing and real telemetry."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Automation reduces risk, but needs context and review.",
    "headers": [
      "Quality gate",
      "Objective",
      "Fault detected"
    ],
    "rows": [
      [
        "Parser and linter",
        "Ensure valid and consistent contract.",
        "Structural error or pattern violation."
      ],
      [
        "Semantic diff",
        "Classify impact of the change.",
        "Removal, restriction, or incompatible enum."
      ],
      [
        "Contract tests",
        "Check implementation against contract.",
        "Runtime deviates from the specification."
      ],
      [
        "Consumer tests",
        "Validate real expectations.",
        "Client breaks despite apparently safe diff."
      ],
      [
        "Telemetry",
        "Confirm adoption and use.",
        "Consumer still stuck on the old version."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "The expand-migrate-contract pattern prevents instant switching. In the expansion phase, the provider accepts old and new: it adds a field, endpoint or format without removing the existing one. In migration, consumers are moved gradually, with telemetry and support. In contraction, the old element is removed only when there are no relevant dependents."
  },
  {
    "kind": "paragraph",
    "text": "To rename a mandatory field, for example, the server can accept both names, temporarily respond with both and record which form each consumer uses. After everyone migrates, the old name is deprecated and removed in the new major or defined compatibility window."
  },
  {
    "kind": "paragraph",
    "text": "The pattern temporarily increases complexity, but reduces risk, facilitates rollback and eliminates the need to synchronize deployments of all consumers."
  },
  {
    "kind": "subhead",
    "text": "Expand, migrate and contract"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-versioning/en/figure-04-expand-migrate-contract.svg",
    "alt": "Safe evolution through expand, migrate and contract phases",
    "caption": "Figure 4 - Safe evolution uses temporary coexistence and evidence of migration."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.24 API Gateways, routing and troubleshooting",
    "id": "28-24-api-gateways-routing-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The gateway is a natural version selection point, but it should not hide incompatible semantics. Policies can extract path, query or header version, validate values, route to backend, insert deprecation headers and record telemetry. The order of policies needs to be predictable: identify version before caching, specific authentication and routing."
  },
  {
    "kind": "paragraph",
    "text": "Common failures include unexpected default version, incorrect rewrite, cache shared between versions, policy inherited only in part, backend v2 receiving v1 traffic and documentation pointing to another base URL. Logs must record the received version, resolved version, chosen backend, revision and contract checksum."
  },
  {
    "kind": "paragraph",
    "text": "When troubleshooting, reproduce the request with all selection elements and compare gateway, portal, OpenAPI and backend. A 404 could mean a non-existent operation in the version, an unpublished route or a misconfigured version set. A 200 with an old payload may indicate incorrect caching or routing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "28.25 Case studies and labs",
    "id": "28-25-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1: A customer API needs to replace idCliente with customerId. The team uses temporary expansion, accepts both in requests, responds with both during migration, measures usage and publishes v2 only when other incompatible changes justify a new major."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2: a payments API now requires mTLS and a new audience. As the change affects consumer credentials and infrastructure, the team creates v2, maintains v1 for a defined period, distributes certificates in approval and uses Deprecation and Sunset in production."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3: In Azure APIM, a description fix and new optional field are prepared as v2 revision. After testing, the revision becomes current without creating v3. Months later, an incompatible contract change generates v3 in the same version set."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Compare two OpenAPI documents and classify the changes. 2) Configure versioning by path and header on a laboratory gateway. 3) Simulate Deprecation and Sunset. 4) Create telemetry by version and consumer. 5) Run an expand-migrate-contract migration with renamed field."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "API Versioning is a coordination mechanism for observable changes. The objective is not to generate numbers, but to allow evolution with controlled risk. Compatibility needs to be analyzed in the syntactic, structural, semantic, behavioral and operational dimensions."
  },
  {
    "kind": "paragraph",
    "text": "The direction of the data changes the classification of changes. Strategies based on path, query, header, media type or data have trade-offs and need to work across the entire chain. Public version, revision, release and specification version are different dimensions."
  },
  {
    "kind": "paragraph",
    "text": "The lifecycle turns depreciation and retirement into auditable processes. Deprecation and Sunset improve communication at runtime, but inventory, telemetry, migration guides and adoption confirmation determine security. Semantic diff, tests and expand-migrate-contract reduce risk without preventing evolution."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "With versions and lifecycle governed, the next chapter delves into Service Mesh, including Istio, Linkerd, and Envoy, and shows how policies, identity, and observability are applied to inter-service communication."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "API Versioning Checklist",
    "id": "api-versioning-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The baseline corresponds to the contract actually published and supported.",
      "The change was analyzed in syntactic, structural, semantic, behavioral and operational dimensions.",
      "Data direction and behavior of SDKs were considered.",
      "New version is created only when there is incompatibility or explicit need for coexistence.",
      "The selection mechanism works across client, cache, WAF, gateway, portal, and observability.",
      "Public version, revision, build and specification version are separated.",
      "Depreciation offers a substitute, guide, deadline, owner and support channel.",
      "Deprecation, Sunset, portal and catalog are consistent.",
      "The inventory identifies consumers by application or identity, not just by IP.",
      "The pipeline runs parser, linter, diff, testing and passing exceptions.",
      "Withdrawal has evidence, communication and recovery plan."
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
      "Explain why adding a field to response can be breaking.",
      "Differentiate between structural, semantic and operational compatibility.",
      "Classify enum addition into request and response.",
      "Differentiate public version, contract, revision, build and version of the OpenAPI Specification.",
      "Compare path, query, header, media type and version by date.",
      "Explain when a revision is preferable to a new version in Azure APIM.",
      "Write HTTP response with Deprecation, Sunset and Link to migration guide.",
      "Describe an expand-migrate-contract plan to rename required field.",
      "Propose metrics to decide whether v1 can be removed.",
      "Describe how to investigate when v2 returns behavior from v1."
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
    "caption": "Table 9 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Backwards compatibility",
        "Ability for existing consumers to continue operating after a change."
      ],
      [
        "Baseline",
        "Reference contract or behavior used in the comparison."
      ],
      [
        "Breaking changes",
        "Change incompatible with supported expectations."
      ],
      [
        "Changelog",
        "Consumer-oriented recording of published changes."
      ],
      [
        "Compatibility window",
        "Period of coexistence and migration between contracts."
      ],
      [
        "Contract drift",
        "Divergence between description, gateway and runtime."
      ],
      [
        "Deprecation",
        "Signaling that an interface is not recommended and may be removed."
      ],
      [
        "Expand-migrate-contract",
        "Strategy of introducing compatibility, migrating and removing the old one."
      ],
      [
        "Revision",
        "Change tracked under the same public version."
      ],
      [
        "Semantic diff",
        "Comparison that interprets the impact of the contract."
      ],
      [
        "SemVer",
        "MAJOR.MINOR.PATCH semantic versioning."
      ],
      [
        "Sunset",
        "Moment after which a resource tends to stop responding."
      ],
      [
        "Version set",
        "Group of related versions of an API."
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
      "IETF. RFC 8594 - The Sunset HTTP Header Field.",
      "IETF. RFC 9745 - The Deprecation HTTP Response Header Field.",
      "Microsoft Learn. Versions in Azure API Management.",
      "Microsoft Learn. Revisions in Azure API Management.",
      "Google Cloud API Design Guide. AIP-185: API Versioning.",
      "Semantic Versioning Specification 2.0.0.",
      "OpenAPI Initiative. OpenAPI Specification 3.1.",
      "Protocol Buffers Documentation. Updating a Message Type.",
      "GraphQL Specification and schema deprecation practices."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Standards, managed services, and tools evolve. Before automating version sets, revisions, depreciation or semantic diff, validate the official documentation of the deployed version and test the behavior in an authorized environment."
  }
];
