import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const GRAPHQL_GRPC_WEBSOCKET_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Three models, three semantics: query, RPC and persistent channel"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/en/overview.svg",
    "alt": "GraphQL, gRPC and WebSocket combined in a modern API architecture",
    "caption": "Opening figure - The chapter compares three styles often combined in API and integration architectures."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Choosing the right interface requires aligning data model, coupling, latency, streaming, and governance."
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
    "text": "So far, the course has covered classic HTTP communication, REST modeling and the formal description of contracts using OpenAPI. These elements remain central to corporate platforms, but they do not cover all integration issues. Distributed systems often need to solve flexible querying of data graphs, efficient communication between services, and real-time event delivery. It is in this space that GraphQL, gRPC and WebSocket gain relevance."
  },
  {
    "kind": "paragraph",
    "text": "Although the three names appear frequently in modern discussions, they are not direct alternatives to each other. GraphQL is a schema-driven query language and execution model. gRPC is a strongly typed remote procedure call framework, generally supported by Protocol Buffers and HTTP/2. WebSocket is a protocol for maintaining a persistent bidirectional channel, leaving the application semantics to a higher layer. Comparing them just by performance or popularity leads to superficial decisions."
  },
  {
    "kind": "paragraph",
    "text": "Mature architectures look at what problem needs to be solved: aggregate query for front-end, low-latency internal communication, one-or two-way streaming, push to rich interfaces, or mediation through gateways. They also look at governance, security, observability, caching, adoption curve, tooling and legacy compatibility. In many scenarios, the best solution is not to choose a single model, but to combine more than one of them with well-defined roles."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents fundamentals, semantics, operational patterns, pitfalls and selection criteria. The objective is to allow the reader to understand how each technology works, recognize when it fits well and identify operating risks in gateways, service meshes and corporate platforms."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "When reading each technology, answer four questions: what is the exposed contract, who controls the evolution of the schema or interface, how observability is carried out and which intermediaries can correctly participate in the flow. This discipline avoids treating solutions of different natures as if they were just alternative payload formats."
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
      "Distinguish the responsibilities of GraphQL, gRPC and WebSocket and avoid simplistic comparisons.",
      "Explain the GraphQL schema model, execution, and resolution.",
      "Understand queries, mutations, subscriptions, types, fragments and introspection.",
      "Recognize issues such as overfetching, underfetching, N+1, excessive depth and query complexity.",
      "Explain the gRPC service model, the function of Protocol Buffers, and the four calling patterns.",
      "Relate gRPC to HTTP/2, multiplexing, deadlines, metadata, status codes and streaming.",
      "Describe the WebSocket upgrade handshake, frames, ping/pong, and termination.",
      "Analyze scale, affinity, authentication and observability in persistent connections.",
      "Compare implications of caching, versioning, gateways, firewalls and balancers.",
      "Apply practical criteria to choose and combine these technologies in enterprise architectures."
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
      "13.1 Why does this chapter exist after OpenAPI",
      "13.2 GraphQL: Overview and Motivation",
      "13.3 Schema, types, queries, mutations and subscriptions",
      "13.4 Resolvers, batching, N+1 and federation",
      "13.5 Security, governance and observability in GraphQL",
      "13.6 gRPC: Overview and Protocol Buffers",
      "13.7 Call patterns, deadlines and streaming",
      "13.8 Security, mesh and governance in gRPC",
      "13.9 WebSocket: handshake, frames and lifecycle",
      "13.10 Operation, scalability and security in WebSocket",
      "13.11 Practical comparison between GraphQL, gRPC and WebSocket",
      "13.12 Use in API Gateways, case studies, summary, exercises and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.1 Why this chapter comes after OpenAPI",
    "id": "13-1-why-this-chapter-comes-after-openapi"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describes resource-or operation-oriented HTTP APIs very well. However, it does not represent as naturally a queryable graph as GraphQL, binary RPC calls and bidirectional streaming as in gRPC, nor a message-oriented persistent channel like WebSocket. The reader who has mastered OpenAPI already has an excellent basis for contracts, HTTP semantics and governance; now you need to understand where these foundations remain valid and where new models require another way of thinking."
  },
  {
    "kind": "paragraph",
    "text": "In terms of architecture, this chapter is an expansion of the repertoire and not a negation of what has been studied before. REST remains very strong for public exposure and integration between organizations. What changes is that certain practical needs - such as screens that require very varied aggregations, internal microservices with high cadence and applications that depend on real-time push - can be better met by different models."
  },
  {
    "kind": "paragraph",
    "text": "It is also important to understand the difference between interface technology and transport technology. GraphQL typically uses HTTP, but its contract semantics are not the same as REST. gRPC uses HTTP/2 as a base, but presents the developer with the abstraction of methods and messages. WebSocket is born from an HTTP handshake, but then abandons the request/response logic to operate with full-duplex frames. This distinction avoids incorrect conclusions about caching, security and troubleshooting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.2 GraphQL: Overview and Motivation",
    "id": "13-2-graphql-overview-and-motivation"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL emerged to offer consumers greater control over the form of data returned. Instead of the API exposing a large collection of endpoints with pre-formatted responses, it publishes a typed schema and allows the client to declare, in a query, exactly which fields they want to obtain. This reduces underfetching, when the client needs to call multiple endpoints to assemble a screen, and can reduce overfetching, when the response contains a lot of data that is irrelevant to that specific case."
  },
  {
    "kind": "paragraph",
    "text": "The model is particularly attractive in front-end experiences with multiple composition variations: web, mobile, partners, analytical dashboards and different journeys on the same domain. A GraphQL-based gateway or BFF can gather data from multiple APIs and databases, leaving the task of composing the result to the resolution layer. This flexibility, however, shifts complexity to the server, which needs to validate, execute, limit costs and observe the behavior of incoming queries."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL is not an arbitrary database access language. The contract continues to be defined by the provider, via schema, and execution is controlled by resolvers. This means that the fact that the client chooses fields does not eliminate the need for governance. On the contrary: authentication, authorization by field, depth limits, disabling introspection in some scenarios, persisted queries and protections against abuse become essential in corporate environments."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The main change in GraphQL is the contract model, not just the syntax.",
    "headers": [
      "Aspect",
      "traditional REST",
      "GraphQL"
    ],
    "rows": [
      [
        "Main unit",
        "Resources and endpoints.",
        "Typed schema and operations on a logical endpoint."
      ],
      [
        "Response shape",
        "Predominantly defined by the server.",
        "Selected by the client within the schema."
      ],
      [
        "Evolution",
        "New representation, new fields or new endpoints.",
        "Schema evolution with deprecation of fields and types."
      ],
      [
        "Characteristic risk",
        "Underfetching or exploding endpoints.",
        "Expensive queries, N+1 and complexity control."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.3 Schema, types, queries, mutations and subscriptions",
    "id": "13-3-schema-types-queries-mutations-and-subscriptions"
  },
  {
    "kind": "paragraph",
    "text": "The GraphQL schema describes scalar types, objects, enums, interfaces, unions, inputs, and root operations. The Query operation represents reading; Mutation represents state changes; Subscription represents asynchronous receipt of events under an ongoing relationship. The schema functions as a data contract and also as an introspection point for tools, type generation and development experience."
  },
  {
    "kind": "paragraph",
    "text": "A Query is structured as a declarative document in which the consumer specifies the desired fields. Fragments allow you to reuse selections, aliases rename fields in the response, and variables separate the document from dynamic values. In Mutation, the consumer invokes a server-defined state change, with clear input types. In Subscription, the client subscribes to a stream that will be issued over time, typically via WebSocket or equivalent technology."
  },
  {
    "kind": "paragraph",
    "text": "Despite the compact appearance, the execution is not trivial. Each schema field can be associated with a resolver. A simple operation, from the client's point of view, can cause the server to trigger multiple backends. Therefore, the schema needs to be designed with discipline. Very generic types, fields that hide heavy operations and the lack of boundaries between domains make the contract difficult to operate."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/en/figure-01.svg",
    "alt": "GraphQL Runtime executing a tree of resolvers based on the requested operation",
    "caption": "Figure 1 - The GraphQL runtime executes a tree of resolvers based on the requested operation."
  },
  {
    "kind": "subhead",
    "text": "GraphQL query example"
  },
  {
    "kind": "code",
    "text": "query DetailedCustomer($id: ID!) {\n  customer(id: $id) {\n    id\n    name\n    currentBalance\n    orders(limit: 5) {\n      number\n      totalAmount\n    }\n  }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.4 Resolvers, batching, N+1 and federation",
    "id": "13-4-resolvers-batching-n-1-and-federation"
  },
  {
    "kind": "paragraph",
    "text": "Resolvers are functions responsible for producing the value of a field. In a customer object, for example, the current balance field can come from a banking core, while orders can come from a transactional API. This granularity is powerful, but it also creates the classic N+1 problem: when fetching a list of customers and, for each one, fetching additional data from another source, the server can trigger an excessive number of calls."
  },
  {
    "kind": "paragraph",
    "text": "Typical mitigation involves short-lived batching and caching within the scope of the request. Libraries like DataLoader group multiple logical requests into a single fetch to the backend. The architecture team should also question whether the schema design induces inefficient access. In some cases, the problem cannot be resolved with execution techniques alone; it requires revising the model and introducing more appropriate fields or aggregates."
  },
  {
    "kind": "paragraph",
    "text": "In large organizations, GraphQL federation allows you to compose a supergraph from subgraphs maintained by different teams. This approach improves autonomy, but introduces more sophisticated governance: ownership of types and fields, secure composition, supergraph versioning, routing, distributed observability and protection against cardinality explosion. Without these practices, the federation may trade endpoint coupling for schema coupling."
  },
  {
    "kind": "subhead",
    "text": "Critical operating point"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL does not eliminate calls between systems; it often hides them behind the execution tree. In troubleshooting, correlate the query received with the resolvers triggered, the backends consulted and the total cost of the operation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.5 Security, governance and observability in GraphQL",
    "id": "13-5-security-governance-and-observability-in-graphql"
  },
  {
    "kind": "paragraph",
    "text": "Security in GraphQL goes beyond controlling endpoint authentication. As the client chooses the form of the query, the server needs to limit depth, cardinality and computational cost. Recursive queries, abusive use of fragments, improperly exposed introspection and attempts to enumerate fields are relevant vectors. Persisted queries reduce risk by only allowing documents previously registered and identified by hash."
  },
  {
    "kind": "paragraph",
    "text": "Authorization can occur at multiple levels: operation, type, field and even returned value. It is common for the same type to have fields with different sensitivities, such as balance, limit, masked CPF or complete history. Policy needs to be explicit, testable, and observable. In gateways, a useful practice is to propagate identity and context to the GraphQL server, while fine-grained field control remains at the runtime or in a PDP connected to it."
  },
  {
    "kind": "paragraph",
    "text": "Observability also changes. In REST, the endpoint path already tells you a lot. In GraphQL, several different operations can travel through the same endpoint. Therefore, operation names, persisted query hash, calculated cost, depth, time to resolve and downstream calls become essential metrics. Logging the literal query requires care with privacy and the volume of logs."
  },
  {
    "kind": "table",
    "caption": "Table 2 - In GraphQL, schema governance and execution governance go hand in hand.",
    "headers": [
      "Control",
      "Objective",
      "Practical example"
    ],
    "rows": [
      [
        "Depth limit",
        "Avoid excessive browsing.",
        "Reject queries above a defined threshold."
      ],
      [
        "Complexity calculation",
        "Control estimated cost.",
        "Assign weights to expensive fields."
      ],
      [
        "Persisted query",
        "Reduce attack surface and payload.",
        "Only accept previously registered hashes."
      ],
      [
        "Authorization by field",
        "Protect sensitive data.",
        "Financial fields require additional scope."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.6 gRPC: Overview and Protocol Buffers",
    "id": "13-6-grpc-overview-and-protocol-buffers"
  },
  {
    "kind": "paragraph",
    "text": "gRPC is a modern RPC framework that emphasizes typed contracts, code generation, and efficient communication. Instead of modeling resources and representations as in REST, the provider defines services and methods in .proto files. These files describe messages, fields, and operations, and tools generate client and server stubs in several languages."
  },
  {
    "kind": "paragraph",
    "text": "Protocol Buffers, or Protobuf, is the serialization mechanism most associated with gRPC. It encodes compact, typed binary messages, with evolution based on field numbers. This produces smaller payloads and efficient parsing, especially useful in internal microservices communication. The performance gain, however, should not be romanticized: it depends on the use case, the network, the language, the size of the messages and the real cost of the business logic."
  },
  {
    "kind": "paragraph",
    "text": "The coupling to the contract is more explicit than in purely textual integrations. This is positive for type safety and productivity, but it requires discipline in evolution: fields should not have their numbers reused, reservations need to be applied when something is removed, and errors should be handled within gRPC semantics, which distinguishes transport status and application status."
  },
  {
    "kind": "subhead",
    "text": ".proto definition example"
  },
  {
    "kind": "code",
    "text": "syntax = \"proto3\";\nservice CustomerService {\n  rpc GetCustomer (CustomerRequest) returns (CustomerResponse);\n  rpc ListEvents (EventsRequest) returns (stream EventResponse);\n}\nmessage CustomerRequest { string id = 1; }\nmessage CustomerResponse { string id = 1; string name = 2; }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.7 Call patterns, deadlines and streaming",
    "id": "13-7-call-patterns-deadlines-and-streaming"
  },
  {
    "kind": "paragraph",
    "text": "gRPC offers four main standards. In unary, a request produces a response. On the streaming server, the client sends a request and receives a sequence of responses. In client streaming, the client sends several messages before receiving the consolidated result. In two-way streaming, both sides exchange messages continuously, with no fixed one-to-one relationship between sending and receiving."
  },
  {
    "kind": "paragraph",
    "text": "These standards operate over HTTP/2, leveraging multiplexing, compressed headers, and full-duplex streaming on a per-stream basis. Still, the developer needs to understand concepts specific to gRPC, such as deadlines, cancellation, metadata and status codes. Deadline is especially important in production: without it, calls can remain pending beyond reason, consuming resources and degrading entire dependency chains."
  },
  {
    "kind": "paragraph",
    "text": "Error handling also changes nuances. A successful gRPC response on transport can carry application statuses such as NOT_FOUND, PERMISSION_DENIED, or UNAVAILABLE. Observability and retries need to consider these differences. In enterprise environments, it is common to partially or fully translate gRPC calls to HTTP/JSON at the edge, preserving gRPC only between internal services."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/en/figure-02.svg",
    "alt": "Four gRPC calling patterns: unary, server streaming, client streaming, and bidirectional",
    "caption": "Figure 2 - The gRPC contract supports everything from simple calls to full two-way streaming."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The efficiency of gRPC depends on operational discipline, not just the use of Protobuf.",
    "headers": [
      "Theme",
      "Best practice",
      "Risk if ignored"
    ],
    "rows": [
      [
        "Deadlines",
        "Set deadlines per method and propagate context.",
        "Trapped calls and cascading saturation."
      ],
      [
        "Versioning",
        "Evolve messages with optional fields and reservations.",
        "Binary compatibility break."
      ],
      [
        "Status codes",
        "Map application status carefully.",
        "Incorrect retries or confusing diagnoses."
      ],
      [
        "Streaming",
        "Control backpressure and cancellation.",
        "Excessive memory and queue consumption."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.8 Security, mesh and governance in gRPC",
    "id": "13-8-security-mesh-and-governance-in-grpc"
  },
  {
    "kind": "paragraph",
    "text": "As gRPC is often adopted in east-west communication, it often appears alongside service meshes. In this context, mTLS, workload identity, retries, circuit breaking and telemetry can be applied by the mesh or sidecar, while the service maintains method semantics. This simplifies certain controls, but also introduces additional layers into the diagnosis."
  },
  {
    "kind": "paragraph",
    "text": "In security, the .proto contract must be treated as a governed artifact. Administrative methods, dangerous operations and messages with sensitive data need explicit authorization control. The presence of internal connection does not imply automatic trust. Additionally, some proxies and gateways have limited support for more advanced gRPC features, especially when streaming or trailers are involved."
  },
  {
    "kind": "paragraph",
    "text": "Governance includes service catalog, .proto linting, naming policies, versioning, compatibility, distributed tracing, and contract testing. In integration scenarios with front-end teams, it must be evaluated whether the organization wants to expose gRPC directly, use gRPC-Web or translate to HTTP/JSON. Each choice changes tooling, browser security, and intermediary capabilities."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.9 WebSocket: handshake, frames and lifecycle",
    "id": "13-9-websocket-handshake-frames-and-lifecycle"
  },
  {
    "kind": "paragraph",
    "text": "WebSocket is a standardized protocol for persistent full-duplex communication between client and server. The process starts with an HTTP request containing Upgrade: websocket and other specific headers. If the server accepts, it responds with status 101 Switching Protocols and the connection starts to operate with WebSocket frames. From then on, there is no longer the classic semantics of a request followed by a single response."
  },
  {
    "kind": "paragraph",
    "text": "The protocol is valuable in applications that require low latency and server-to-client push, such as real-time dashboards, chats, order tracking, operational notifications and observability dashboards. It does not, by itself, define the semantics of the message. The application can send JSON, binary, typed envelopes or more elaborate protocols over the channel. This provides flexibility, but also requires internal standardization."
  },
  {
    "kind": "paragraph",
    "text": "The lifecycle of a WebSocket connection includes initial authentication, opening, exchanging frames, maintaining liveness by ping/pong and controlled termination. On horizontally scaled platforms, the design needs to consider affinity, fan-out, event distribution and state synchronization. It is common to use a broker or pub/sub behind the WebSocket server to decouple event emission from connection maintenance."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/en/figure-03.svg",
    "alt": "WebSocket lifecycle from HTTP upgrade to connection closure",
    "caption": "Figure 3 - HTTP only participates in the establishment; the rest of the cycle already belongs to the WebSocket protocol."
  },
  {
    "kind": "subhead",
    "text": "Opening handshake summary example"
  },
  {
    "kind": "code",
    "text": "GET /stream HTTP/1.1\nHost: api.company.example\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==\nSec-WebSocket-Version: 13"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.10 Operation, scalability and security in WebSocket",
    "id": "13-10-operation-scalability-and-security-in-websocket"
  },
  {
    "kind": "paragraph",
    "text": "Operating thousands or millions of persistent connections is very different from operating short HTTP requests. The infrastructure needs to support long open sockets, coherent timeouts, protection against slow clients and backpressure mechanisms. Proxies, firewalls and balancers must be configured to not terminate the connection due to undue inactivity. Additionally, metrics such as active connections, message rate, bytes per connection, and closure reasons become essential."
  },
  {
    "kind": "paragraph",
    "text": "Authentication usually occurs in the initial handshake or in a first application message. Tokens expire, and the renewal strategy needs to be planned. You also need to decide how to handle dynamic authorization: an open connection should not guarantee eternal permission for all future events. In some scenarios, the server needs to re-evaluate the client context when publishing sensitive events."
  },
  {
    "kind": "paragraph",
    "text": "From a security perspective, WebSocket expands the importance of origin validation, payload control, frame size limitation, secure serialization and topic segregation. As the connection persists, an authorization or fan-out error can quickly leak a large volume of information. Structured logs, connection IDs, user identity correlation, and closure trails help with troubleshooting."
  },
  {
    "kind": "subhead",
    "text": "Common trap"
  },
  {
    "kind": "paragraph",
    "text": "Using WebSocket just because the application looks \"modern\" can increase operational costs unnecessarily. If the use case is simple one-way notification, SSE or well-designed polling may be sufficient. Choose for required behavior, not for novelty."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.11 Practical comparison between GraphQL, gRPC and WebSocket",
    "id": "13-11-practical-comparison-between-graphql-grpc-and-websocket"
  },
  {
    "kind": "paragraph",
    "text": "The most useful comparison doesn't ask which technology is better in the abstract, but which semantics best matches the problem. GraphQL is strong when the challenge is to provide the consumer with query flexibility over a complex data model. gRPC is strong when the focus is typed integration between services, especially with high volume, low latency and streaming. WebSocket is strong when the main problem is keeping a channel open for continuous exchange of events or messages."
  },
  {
    "kind": "paragraph",
    "text": "These forces come with costs. GraphQL requires fine-grained schema and execution governance. gRPC requires specific tooling, .proto contracts and understanding of HTTP/2 and its own statuses. WebSocket requires careful operation of persistent connections, affinity, and publishing channels. In return, each elegantly solves problems that would be more difficult or less natural in a purely REST model."
  },
  {
    "kind": "paragraph",
    "text": "Hybrid architectures are common. A digital bank can expose REST/JSON or GraphQL to digital channels, use gRPC across internal domain services, and employ WebSocket to update investment positions in real time at the client interface. The important thing is that the organization has clear architectural criteria and does not allow the uncontrolled proliferation of incompatible standards."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The best choice criterion is the nature of the problem and the operation.",
    "headers": [
      "Criterion",
      "GraphQL",
      "gRPC",
      "WebSocket"
    ],
    "rows": [
      [
        "Core problem",
        "Flexible data query.",
        "Typed and efficient RPC.",
        "Persistent and full-duplex channel."
      ],
      [
        "Contract",
        "GraphQL Schema.",
        ".proto/service and messages.",
        "Externally defined application contract."
      ],
      [
        "Common transport",
        "HTTP.",
        "HTTP/2.",
        "WebSocket protocol after HTTP upgrade."
      ],
      [
        "Streaming",
        "Subscriptions as per implementation.",
        "Native in several modes.",
        "Native on the channel."
      ],
      [
        "Cache and intermediaries",
        "Less trivial than REST.",
        "Variable support in gateways.",
        "Very different from traditional HTTP."
      ],
      [
        "Recurring use",
        "BFFs and data aggregation.",
        "Microservices and internal integration.",
        "Real time, chat and notifications."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/graphql-grpc-websocket/en/figure-04.svg",
    "alt": "Semantic comparison between GraphQL, gRPC and WebSocket in a hybrid architecture",
    "caption": "Figure 4 - Many platforms combine more than one of these technologies with complementary roles."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.12 API Gateways, case studies and enterprise application",
    "id": "13-12-api-gateways-case-studies-and-enterprise-application"
  },
  {
    "kind": "paragraph",
    "text": "Traditional gateways were designed primarily for HTTP/REST, authentication, transformation, routing, and edge policies. When an organization adopts GraphQL, gRPC or WebSocket, it must check to what extent the gateway can understand the protocol or semantics of the application. In some cases, the gateway acts in a technology-aware manner; in others, it operates only as a proxy or TLS terminator."
  },
  {
    "kind": "paragraph",
    "text": "For GraphQL, mature platforms can apply authentication, WAF, rate limiting, and basic observability at the edge, while fine-grain governance of schema and execution remains on the GraphQL server. For gRPC, support needs to consider end-to-end HTTP/2, trailers, and streaming. For WebSocket, the gateway needs to handle upgrade, long timeouts, affinity, and policies suited to persistent connections. Across Axway, Azure APIM, Envoy, and other products, the level of support varies by feature and version."
  },
  {
    "kind": "paragraph",
    "text": "As a case study, imagine an investment platform. The mobile application uses GraphQL to create a dashboard and portfolio. Internal compute and consolidation microservices exchange data over gRPC. The real-time quote module publishes events via WebSocket to connected clients. The architecture is coherent because each choice responds to a different behavior, and not an attempt to standardize everything in a single mechanism."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.13 Troubleshooting and diagnostics",
    "id": "13-13-troubleshooting-and-diagnostics"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting GraphQL, gRPC and WebSocket requires separating transport, protocol and application semantics. In GraphQL, an HTTP 200 response may carry business errors in the errors array, while in gRPC the transport may be healthy and the final status indicates PERMISSION_DENIED, DEADLINE_EXCEEDED, or UNAVAILABLE. In WebSocket, the analysis needs to consider handshake, connection permanence, ping/pong, closing codes and application messages."
  },
  {
    "kind": "paragraph",
    "text": "Tools and evidence also change. In GraphQL, operation names, calculated complexity, time to resolve, and correlation with backends are more useful than just looking at the URL. In gRPC, method logs, metadata, deadlines, trailers, metrics by status code and traces by stream help locate bottlenecks. In WebSocket, count of open connections, message rate, fan-out, average duration, bytes per client and close codes point to scaling problems and anomalous behavior."
  },
  {
    "kind": "paragraph",
    "text": "From a gateway and network perspective, it is important to know that failures can occur before the application technology comes into play. A proxy without full HTTP/2 support can degrade gRPC. An aggressive timeout balancer can bring down stable WebSockets. A generic WAF policy can interfere with GraphQL payloads. The correct layer of the problem needs to be identified to avoid random code changes."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The correct symptom depends on the semantics of each technology.",
    "headers": [
      "Technology",
      "Symptom",
      "Initial hypotheses"
    ],
    "rows": [
      [
        "GraphQL",
        "Slow query or partial error.",
        "Expensive resolver, N+1, slow backend or complexity limit."
      ],
      [
        "gRPC",
        "Deadline exceeded.",
        "Short deadline, saturated backend, stuck stream or loss of capacity."
      ],
      [
        "WebSocket",
        "Frequent disconnections.",
        "Idle timeout, missing affinity, inadequate ping/pong or unstable network."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.14 Case studies and labs",
    "id": "13-14-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case study 1: a service portal needs to consolidate profile, products, limits and last interactions on a single mobile screen. The team opts for GraphQL to allow the front-end to select only the data needed for each journey. The gain comes from flexibility, but the server needs to introduce batching, persisted queries and authorization per field to avoid cost explosion and exposure of sensitive data."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2: a set of payments microservices needs to exchange small messages with high cadence and strong typing. The team adopts gRPC with Protobuf between internal services, while maintaining REST at the edge for external partners. Success depends on .proto file management, coherent deadlines, mTLS, distributed observability and adequate translation when calls need to traverse gateway layers."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3: A real-time quoting platform sends continuous updates to operational dashboards and mobile apps. The push channel is implemented with WebSocket, while the initial position query still uses HTTP. The design is only sustainable because there is an event broker, horizontal scalability, session affinity, identification of connections and a clear reauthentication policy when the token expires."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Build a GraphQL query with fragments and observe the resolver tree. 2) Define a gRPC service with a unary method and another streaming method and test deadlines. 3) Open a WebSocket, send messages, simulate ping/pong and observe the close handshake. 4) In all cases, collect evidence from logs, metrics and traces."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13.15 Architectural decision criteria",
    "id": "13-15-architectural-decision-criteria"
  },
  {
    "kind": "paragraph",
    "text": "The decision between these technologies must be institutionalized as a set of criteria. Useful questions include: Does the consumer need to choose fields dynamically? Is there a great diversity of screens and aggregations? Is the traffic predominantly service-to-service and does it require typed contracts? Does the use case involve continuous streaming or push of events? Do current gateways support the protocol natively? Does the team have the maturity to operate the chosen model?"
  },
  {
    "kind": "paragraph",
    "text": "Criteria don't work if they are just technical. It is necessary to consider team onboarding, generation of SDKs, support capacity, training, security posture, observability cost, troubleshooting curve and adherence to corporate standards. A theoretically excellent technology may be inadequate if the organization does not have the processes and tools to operate it safely."
  },
  {
    "kind": "paragraph",
    "text": "Finally, the decision needs to be revisited periodically. Gateway products, service meshes, cloud platforms, and libraries evolve. What was unfeasible in an old version may become simple later. Still, technology change should never occur just because the market changes focus; it needs to generate measurable operational or business benefit."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "GraphQL, gRPC and WebSocket expand the integration repertoire, but do not compete on the same semantic plane. GraphQL is schema-driven and flexible querying; gRPC is oriented towards services, methods and typed messages; WebSocket is oriented around a full-duplex persistent channel over which the application defines its own semantics."
  },
  {
    "kind": "paragraph",
    "text": "The correct architectural decision needs to consider the business problem, the form of the contract, latency and streaming requirements, governance capacity, gateway support and the operational maturity of the organization. Choices made solely for theoretical performance or market trends tend to fail when met with real-world observability, security, and maintainability."
  },
  {
    "kind": "paragraph",
    "text": "In corporate environments, it is common to combine these models with REST and OpenAPI. This combination works well when ownership, contract standards, security policies and troubleshooting criteria are explicit. The main gain of the chapter is to allow the reader to recognize the appropriate role of each technology in a modern API platform."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "With the alternative communication models presented, the next chapter returns to the security and governance axis to differentiate authentication and authorization, an indispensable conceptual basis before moving on to credentials, OAuth 2.0, OpenID Connect and tokens."
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
      "The choice between GraphQL, gRPC and WebSocket was made based on the required behavior, not just technological preference.",
      "The published contract is clearly identified: GraphQL schema, .proto or application protocol over WebSocket.",
      "There is an authentication, authorization and auditing strategy compatible with the chosen model.",
      "Observability tools capture the right granularity: GraphQL operation, gRPC method, or WebSocket event/message.",
      "Network brokers and gateway correctly support upgrade, HTTP/2, streaming, trailers, or persistent connections.",
      "The versioning and evolution model was defined for schema, messages and clients.",
      "There is protection against abuse: query complexity, streaming limits, quotas and backpressure.",
      "Troubleshooting considers the entire chain: client, gateway, technology runtime, backends and transport."
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
      "Explain why GraphQL isn't just \"REST with a single endpoint.\"",
      "Differentiate between underfetching, overfetching and N+1 in GraphQL.",
      "Describe the four gRPC calling patterns and give a use case for each.",
      "Explain the role of deadlines in gRPC and the risks of ignoring them.",
      "Describe what changes in the connection after WebSocket status 101.",
      "Compare the operational requirements of WebSocket and traditional HTTP.",
      "Propose an architecture that uses REST or GraphQL at the edge, gRPC between services, and WebSocket for events.",
      "List important security controls for a publicly exposed GraphQL server.",
      "Explain when a gateway acts in a protocol-aware manner and when it acts only as a generic proxy.",
      "Discuss why the most useful comparison between these technologies should be guided by the semantics of the problem."
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
    "caption": "Table 5 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Alias",
        "GraphQL feature to rename a field in the response."
      ],
      [
        "Batching",
        "Grouping of multiple logical searches into a more efficient call to the backend."
      ],
      [
        "Bidirectional streaming",
        "Seamless two-way message exchange in gRPC."
      ],
      [
        "Deadline",
        "Maximum accepted timeframe for completing a gRPC call."
      ],
      [
        "GraphQL Federation",
        "Composition of a supergraph from subgraphs maintained by different teams."
      ],
      [
        "Fragment",
        "Reusable field selection snippet in GraphQL."
      ],
      [
        "Introspection",
        "Ability to query your own GraphQL schema."
      ],
      [
        "Persisted query",
        "Query previously registered and normally referenced by hash."
      ],
      [
        "Protocol Buffers",
        "Typed binary serialization format frequently used in gRPC."
      ],
      [
        "Resolver",
        "Function that produces the value of a field in the GraphQL runtime."
      ],
      [
        "Sec-WebSocket-Key",
        "Header used in the WebSocket handshake."
      ],
      [
        "Server streaming",
        "Pattern in which the client makes a request and receives multiple responses in gRPC."
      ],
      [
        "Subscription",
        "GraphQL operation for continuous delivery of events to the consumer."
      ],
      [
        "Trailer",
        "Metadata sent at the end of an HTTP/2 stream, relevant in gRPC."
      ],
      [
        "Upgrade",
        "HTTP mechanism used for initial transition to the WebSocket protocol."
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
      "GraphQL Foundation. GraphQL Specification.",
      "GraphQL Foundation. GraphQL over HTTP Specification.",
      "gRPC Authors. gRPC Documentation.",
      "Protocol Buffers Documentation.",
      "IETF. RFC 6455 - The WebSocket Protocol.",
      "IETF. RFC 8441 - Bootstrapping WebSockets with HTTP/2.",
      "Microsoft Learn. Guidance for GraphQL, gRPC and WebSocket in Azure services.",
      "Envoy Proxy Documentation. gRPC, WebSocket and HTTP/2 support.",
      "OWASP. GraphQL Cheat Sheet and API Security Top 10."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Tools, gateways, and meshes evolve quickly. Before publishing policies or architectural decisions, validate the specific version of the product deployed in your organization supports GraphQL, gRPC, HTTP/2, streaming, and WebSocket."
  }
];
