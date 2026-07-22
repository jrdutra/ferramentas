import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const MICROSERVICES_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Microservices: local autonomy with explicit coordination"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/en/overview.svg",
    "alt": "Channel integrating order, payment and inventory domains with proprietary data",
    "caption": "Figure of openness - Service autonomy depends on clear boundaries and governed integration."
  },
  {
    "kind": "subhead",
    "text": "Mature integration"
  },
  {
    "kind": "paragraph",
    "text": "Contracts, consistency, idempotence, observability and ownership are as important as the division of services."
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
    "text": "Microservices are often described as small applications that communicate via APIs. This definition is insufficient. Microservices architecture is, first and foremost, a way of organizing systems and teams around business capabilities, evolution autonomy and explicit boundaries of responsibility. The technical division only produces benefits when it accompanies data ownership, contracts, operation and life cycle."
  },
  {
    "kind": "paragraph",
    "text": "A monolithic application can have well-defined modules, low dependency and excellent evolvability. A set of distributed services can instead form a distributed monolith: each change requires coordination between multiple teams, synchronous calls are chained, banks are shared, and a local failure brings down the entire journey. Therefore, microservices should not be adopted as a goal in itself, but as a response to concrete needs for organizational scale, isolation and speed of change."
  },
  {
    "kind": "paragraph",
    "text": "Integration is the point at which autonomy meets distributed reality. Services need to exchange commands, queries and events; coordinate processes that cross domains; deal with duplicate and out-of-order messages; maintain consistency without a global transaction; apply timeouts and retries without multiplying load; and produce sufficient operational evidence to investigate failures. Patterns like Saga, Transactional Outbox, Idempotent Consumer, API Composition, CQRS, and Event Sourcing exist to make these decisions explicit."
  },
  {
    "kind": "paragraph",
    "text": "This chapter presents the fundamentals of decomposition and the main integration patterns. The focus is not to recommend a single architecture, but to provide a mental model for evaluating trade-offs. Each pattern solves a specific problem and introduces new costs. Maturity lies in recognizing these trade-offs, measuring real behavior and avoiding distributed complexity when a simpler design would suffice."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each pattern, identify the problem it solves, the guarantees it actually provides, the new failure states it introduces, and what operational evidence you will need. Never adopt a pattern just because it appears on reference diagrams."
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
      "Explain microservices as socio-technical architecture, not just code division.",
      "Differentiate business capability, subdomain, bounded context, service and component.",
      "Evaluate data decomposition, cohesion, coupling and ownership criteria.",
      "Compare synchronous, asynchronous communication, commands, queries and events.",
      "Understand local consistency, eventual consistency, and distributed transaction limits.",
      "Apply Saga by choreography and orchestration with business offsets.",
      "Explain Transactional Outbox, CDC, Inbox and Idempotent Consumer.",
      "Distinguish API Composition, CQRS, materialized views and Event Sourcing.",
      "Design contracts, idempotence, retries, deadlines and prevention of cascading failures.",
      "Plan legacy migration, observability and troubleshooting in distributed journeys."
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
      "30.1 Microservices as sociotechnical architecture",
      "30.2 Decomposition by domain and bounded contexts",
      "30.3 Size, cohesion, coupling and autonomy",
      "30.4 Data by service and transactional boundaries",
      "30.5 Synchronous and asynchronous communication",
      "30.6 Contracts, commands, queries and events",
      "30.7 Distributed consistency and transactions",
      "30.8 Saga: choreography and orchestration",
      "30.9 Transactional Outbox, CDC and Inbox",
      "30.10 Idempotence, ordering and delivery",
      "30.11 API Composition and Aggregation",
      "30.12 CQRS and materialized views",
      "30.13 Event Sourcing",
      "30.14 Resilience and cascade prevention",
      "30.15 Service discovery, gateway and mesh",
      "30.16 Observability and correlation",
      "30.17 Security between services",
      "30.18 Monolith Migration and Strangler Fig",
      "30.19 Testing, governance and internal platform",
      "30.20 Antipatterns, troubleshooting and case studies",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.1 Microservices as sociotechnical architecture",
    "id": "30-1-microservices-as-sociotechnical-architecture"
  },
  {
    "kind": "paragraph",
    "text": "A microservices architecture organizes a system as a set of independently deployable services aligned to business capabilities and maintained by teams that take end-to-end responsibility. This responsibility includes code, data, security, observability, availability, and contract evolution. Deploy independence is an important indicator, but it is not absolute: platform changes, incompatible contracts and shared events still require governed coordination."
  },
  {
    "kind": "paragraph",
    "text": "The term sociotechnical is important because the structure of the software reflects the communication structure of teams. If five teams need to simultaneously change the same service, the technical boundary probably does not correspond to real ownership. If a single team maintains dozens of closely coupled services, the division can generate cost without autonomy. Architecture needs to align domain, organization and operation."
  },
  {
    "kind": "paragraph",
    "text": "Microservices also change the failure model. Calls that were once local functions become network operations, subject to latency, loss, timeout, duplication and partial unavailability. The system must accept that a journey can be in intermediate states. Complexity does not disappear; it moves to contracts, integration, consistency and observability."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The objective is not to maximize the quantity of services, but to minimize the cost of change within coherent boundaries. A service is only truly autonomous when its team controls behavior, data, deployment and operation without continually relying on coordinated changes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.2 Decomposition by domain and bounded contexts",
    "id": "30-2-decomposition-by-domain-and-bounded-contexts"
  },
  {
    "kind": "paragraph",
    "text": "The decomposition by business capability seeks to separate what the organization does, and not just technical layers. Payments, registration, credit, fraud and notifications have different rules, vocabulary, data and rates of change. Domain-Driven Design helps you recognize subdomains and bounded contexts, within which terms have consistent meaning."
  },
  {
    "kind": "paragraph",
    "text": "A bounded context is not automatically a microservice. It can be initially implemented as a module and, as needed, divided into services. The important relationship is semantic: each context has its own model and translates concepts by integrating with others. A Customer in the relationship context may not have the same set of attributes or invariants as a Borrower in the credit context."
  },
  {
    "kind": "paragraph",
    "text": "The boundary must reduce changes that cross contexts. When a business rule requires frequent changes to two services, this may indicate incorrect division or an inappropriate contract. Event storming, journey analysis, dependency matrix and change history help discover better boundaries than separation by tables or isolated entities."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/en/figure-01-bounded-contexts.svg",
    "alt": "Decomposition of microservices by business capabilities and bounded contexts",
    "caption": "Figure 1 - The decomposition follows the language and rules of the domain, not just bank entities."
  },
  {
    "kind": "paragraph",
    "text": "There is no ideal number of lines, endpoints or people to define a microservice. Small is a consequence of cohesive responsibility, not a numerical goal. A service can encapsulate a complex capability and still be adequate. Splitting too much increases traffic, contracts, deployments, observability and failure states."
  },
  {
    "kind": "paragraph",
    "text": "Cohesion measures how much internal responsibilities change together. Coupling measures how much a change requires external knowledge or alteration. The design seeks high cohesion within the service and reduced coupling between services. Temporal coupling occurs when two components need to be available at the same time; data coupling arises when sharing schema or internal interpretation; Sequence coupling appears when calls must occur in strict order."
  },
  {
    "kind": "paragraph",
    "text": "Autonomy does not mean the absence of standards. Services can share platform, observability, security libraries, and contract conventions. Be careful not to create a common domain library that forces everyone to evolve at the same pace. Share stable technical capabilities and preserve business decisions within responsible contexts."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The quality of the boundary is observed by the behavior of changes.",
    "headers": [
      "Dimension",
      "healthy sign",
      "Warning sign"
    ],
    "rows": [
      [
        "Cohesion",
        "Related changes remain in the same service.",
        "A simple feature changes many services."
      ],
      [
        "Data",
        "Clear ownership and access agreements.",
        "Direct writing to another domain's database."
      ],
      [
        "Deploy",
        "Versions can be deployed independently.",
        "Mandatory release train for all changes."
      ],
      [
        "Operation",
        "Team observes and supports your ability.",
        "Responsibility fragmented between several areas."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "The database per service principle establishes that a service controls its data and that other components access this information by contract, not by shared tables. This does not require one physical server per service; what is important is logical ownership and the impossibility of ungoverned external changes. Separate schemes, distinct permissions, and independent migration pipelines help reinforce the boundary."
  },
  {
    "kind": "paragraph",
    "text": "Sharing a database seems simple at first, but it allows joins and updates that cross domains, making the schema an implicit contract. A column change now requires extensive coordination, and business invariants can be violated by consumers writing directly. The autonomy of the service is only apparent."
  },
  {
    "kind": "paragraph",
    "text": "The consequence is that ACID transactions typically end at the service boundary. Cross-service processes need to accept eventual consistency or use explicit coordination. This does not mean accepting incorrect data; it means modeling intermediate states, defining local invariants, communicating transitions, and offering reconciliation mechanisms."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.5 Synchronous and asynchronous communication",
    "id": "30-5-synchronous-and-asynchronous-communication"
  },
  {
    "kind": "paragraph",
    "text": "In synchronous communication, the consumer sends a request and waits for a response. HTTP/REST and gRPC are frequent examples. The model is simple for operations that require immediate results, but creates temporal coupling: consumer, network, intermediaries and provider need to be available within the same time frame. Long chains multiply latency and probability of failure."
  },
  {
    "kind": "paragraph",
    "text": "In asynchronous communication, the producer publishes a message without depending on the consumer's immediate completion. Brokers and distributed logs decouple availability and allow spikes to be absorbed. The cost is greater state complexity: the operation may be accepted but not yet processed; messages can be repeated; consumers may delay; and the user needs a mechanism to check progress or receive notification."
  },
  {
    "kind": "paragraph",
    "text": "The choice must follow the semantics of the business. A balance inquiry may require an immediate response. Sending a notification can be asynchronous. A payment can start synchronously, return an identifier, and complete by events. Mature systems combine models rather than imposing a single style on all journeys."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/en/figure-02-sync-async.svg",
    "alt": "Comparison between synchronous and asynchronous integration",
    "caption": "Figure 2 - Synchronous couples availability; asynchronous introduces states and further processing."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The communication model changes guarantees and operational experience.",
    "headers": [
      "Criterion",
      "Synchronous",
      "Asynchronous"
    ],
    "rows": [
      [
        "Result",
        "Available in the answer.",
        "Completed later."
      ],
      [
        "Temporal coupling",
        "Bigger.",
        "Smallest between producer and consumer."
      ],
      [
        "Failure",
        "Visible immediately to the caller.",
        "Requires retry, DLQ and reconciliation."
      ],
      [
        "Peaks",
        "They pressure the provider directly.",
        "They can be damped by queue or log."
      ],
      [
        "Experience",
        "Simple request/response flow.",
        "Status, callback, event or polling."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.6 Contracts, commands, queries and events",
    "id": "30-6-contracts-commands-queries-and-events"
  },
  {
    "kind": "paragraph",
    "text": "A command expresses intent to change state, such as AuthorizePayment. A query requests information without changing the observable state. An event states that something relevant has already occurred, such as Authorized Payment. Mixing these semantics produces confusing contracts. An event should not be a disguised order for a single consumer, and a command should not be published as a fait accompli."
  },
  {
    "kind": "paragraph",
    "text": "Domain events represent relevant facts within a bounded context. Integration events are contracts published for other contexts and can have a more stable, filtered and governed format. Not every internal event must cross the border. Publishing too much detail couples consumers to the implementation."
  },
  {
    "kind": "paragraph",
    "text": "Contracts need to define schema, version, producer identity, correlation key, timestamp, repetition semantics and evolution policy. In synchronous communication, OpenAPI or Protobuf help to formalize. In events, AsyncAPI, registry schemas and compatibility tests reduce breaking changes."
  },
  {
    "kind": "subhead",
    "text": "Onboarding event conceptual envelope"
  },
  {
    "kind": "code",
    "text": "{\n  \"eventId\": \"0c02d9d2-...\",\n  \"eventType\": \"PaymentAuthorized\",\n  \"occurredAt\": \"2026-07-16T11:42:00Z\",\n  \"aggregateId\": \"pag-84219\",\n  \"correlationId\": \"ord-19384\",\n  \"version\": 3,\n  \"data\": { \"amount\": 125.40, \"currency\": \"BRL\" }\n}\n30.7 Consistência distribuída e transações"
  },
  {
    "kind": "paragraph",
    "text": "A local transaction protects invariants within a service. When a process crosses multiple services, a global ACID transaction would require distributed coordination, participant availability, and commit protocol. In modern architectures, this cost and coupling often makes eventual consistency with tradeoffs and reconciliation preferable."
  },
  {
    "kind": "paragraph",
    "text": "Eventual consistency does not mean the absence of rules. The system defines which invariants need to be immediate and which can converge. A debit cannot exceed the available balance within the service that controls the account. The analytical projection or status displayed in another context can be updated a few seconds later."
  },
  {
    "kind": "paragraph",
    "text": "Distributed processes need to model states such as PENDING, RESERVED, AUTHORIZED, FAILED, and COMPENSATED. These states make progress observable and allow for safe retry. Hiding the wait behind a long transaction or cascading synchronous calls does not eliminate distribution; it just makes it more fragile."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.8 Saga: choreography and orchestration",
    "id": "30-8-saga-choreography-and-orchestration"
  },
  {
    "kind": "paragraph",
    "text": "A Saga coordinates a sequence of local transactions. Each step confirms its own state and triggers the next one. If a later step fails, compensatory actions attempt to undo or neutralize previous effects. Clearing is a business operation, not a perfect technical rollback: canceling a reservation or issuing a refund leaves auditable records and may have its own rules."
  },
  {
    "kind": "paragraph",
    "text": "In choreography, services react to each other's events. The model reduces a central coordinator, but the flow can become difficult to visualize when many events form implicit dependencies. In orchestration, a component maintains the state of the process and sends commands to participants. This improves observability and flow control, but the orchestrator needs to remain focused on coordination, without absorbing internal rules from all domains."
  },
  {
    "kind": "paragraph",
    "text": "Saga must provide for timeout, repetition, out-of-order messages, compensation that also fails and manual intervention. The process state needs to be persisted. A financial journey can go into analysis or reconciliation instead of attempting infinite retries. Correct design includes operational owner and recovery procedure."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/en/figure-03-saga.svg",
    "alt": "Saga as a sequence of local transactions and compensations",
    "caption": "Figure 3 - Saga preserves progress through local transactions and explicit compensation."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The choice depends on the complexity and need for process control.",
    "headers": [
      "Model",
      "Advantage",
      "Risk"
    ],
    "rows": [
      [
        "Choreography",
        "Low coupling to a coordinator and natural reaction to facts.",
        "Emergent flow, difficult to track and control."
      ],
      [
        "Orchestration",
        "Explicit state and sequence; better operational visibility.",
        "Coordinator may concentrate undue logic."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Dual write occurs when a service needs to update its database and publish a message. If you write first and fail before publishing, the state changes without an event. If you publish first and fail before recording, consumers observe a fact that does not exist. A distributed transaction between bank and broker could do the trick, but is often not desirable or supported."
  },
  {
    "kind": "paragraph",
    "text": "The Transactional Outbox pattern writes the business change and an event record in the same local transaction. A relay publishes pending records to the broker. This relay can poll or use Change Data Capture to observe the bank log. After publishing, mark or remove the entry. Since failures between publishing and tagging can generate duplicates, consumers need to be idempotent."
  },
  {
    "kind": "paragraph",
    "text": "The Inbox standard records received messages and their processing status. It helps deduplicate and provides operational trail. Outbox and Inbox do not create exactly-once delivery in the absolute sense; they provide a means to achieve equivalent effects once when combined with idempotence, stable keys, and local transactions."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/microservices-integration-patterns/en/figure-04-transactional-outbox.svg",
    "alt": "Transactional Outbox connecting service, local bank and broker",
    "caption": "Figure 4 - The outbox closes the gap between local commit and publication, but does not eliminate duplicates."
  },
  {
    "kind": "paragraph",
    "text": "An idempotent operation can be repeated without producing additional effects beyond the first valid result. In APIs, an idempotency key allows creation retries to return the result of the original operation. In messaging, the consumer stores the processed eventId or business key and avoids repeating effects."
  },
  {
    "kind": "paragraph",
    "text": "At-most-once may miss messages, but avoids repetition. At-least-once favors delivery, accepting duplicates. Exactly-once is typically a guarantee limited to specific broker or transactional processing boundaries; does not mean that an external effect, such as billing or email, will never be repeated. The architecture must clearly explain the warranty boundary."
  },
  {
    "kind": "paragraph",
    "text": "Ordering is also contextual. Brokers usually preserve order only within a partition or key. For an aggregate, use consistent key, version number, and string validation. When events arrive out of order, the consumer can wait, reject, reprocess, or rebuild the projection. The strategy needs to be defined, not improvised during an incident."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Reliable delivery combines protocol, persistence and business semantics.",
    "headers": [
      "Problem",
      "Control",
      "Note"
    ],
    "rows": [
      [
        "POST retry",
        "Idempotency-Key + persisted result.",
        "The key must have an associated scope, validity and payload."
      ],
      [
        "Duplicate event",
        "Inbox or deduplication table.",
        "The write must occur in the same transaction as the local effect."
      ],
      [
        "Out of order",
        "Aggregate ID + version.",
        "Global order is often expensive and unnecessary."
      ],
      [
        "Poison message",
        "Limited attempts + DLQ.",
        "DLQ requires ownership, alerting and controlled reprocessing."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.11 API Composition and Aggregation",
    "id": "30-11-api-composition-and-aggregation"
  },
  {
    "kind": "paragraph",
    "text": "When data belongs to different services, a screen or report cannot perform direct joins to their databases. The API Composition pattern queries multiple services and combines the responses. A BFF, specialized gateway, or composition service can take on this role. GraphQL can also serve as a composition layer when schema and resolvers are governed."
  },
  {
    "kind": "paragraph",
    "text": "Synchronous composition inherits the availability and latency of all dependencies. It is necessary to define deadlines, partial responses, cache, fallback and maximum number of fan-outs. A page that queries ten services sequentially tends to be slow and fragile. Parallelism helps with latency, but increases concurrency and can put pressure on backends."
  },
  {
    "kind": "paragraph",
    "text": "When the query is frequent and does not require strictly current data, an asynchronous materialized view may be better. Events update a read model prepared for the journey. The choice between real-time compounding and forward projection depends on freshness, update cost, volume, and tolerance for inconsistency."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.12 CQRS and materialized views",
    "id": "30-12-cqrs-and-materialized-views"
  },
  {
    "kind": "paragraph",
    "text": "Command Query Responsibility Segregation separates writing and reading models. The command side protects invariants and processes intents. The query side offers templates optimized for consumers' needs. The separation can exist only in the code or involve different banks, schemas and services."
  },
  {
    "kind": "paragraph",
    "text": "CQRS is useful when writing and reading have very different models, large load asymmetry, or specific query needs. It is not a requirement for microservices. In simple systems, separating everything increases code, synchronization, and operation without commensurate benefit."
  },
  {
    "kind": "paragraph",
    "text": "Materialized views are projections updated by events. They accept some delay and need a reconstruction strategy, projector versioning, handling of old events and divergence checking. The authoritative origin remains in the service responsible for writing; the projection is a derived model."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.13 Event Sourcing",
    "id": "30-13-event-sourcing"
  },
  {
    "kind": "paragraph",
    "text": "Event Sourcing persists the sequence of events that represent state changes, rather than recording just the current state. The state of an aggregate is reconstructed by applying these events. The model offers complete history and allows new projections, but requires rigorous schema discipline, invariants and evolution."
  },
  {
    "kind": "paragraph",
    "text": "Stored events are immutable facts. Correcting an error usually means adding a new event, not editing the past. Snapshots can reduce reconstruction cost. Projections are derived and can be remade. The logic that interprets old events needs to remain compatible or use upcasters and controlled migrations."
  },
  {
    "kind": "paragraph",
    "text": "Event Sourcing is often confused with publishing integration events. A system can use outbox and events without being event sourced. Adopting Event Sourcing just to get audited may be excessive. It makes more sense when the sequence of decisions is a central part of the domain and the reconstructability justifies the complexity."
  },
  {
    "kind": "subhead",
    "text": "Architectural care"
  },
  {
    "kind": "paragraph",
    "text": "CQRS, Event Sourcing and microservices are independent standards. They can be combined, but none automatically require the others. Unnecessary joint adoption creates a platform that is difficult to develop, test, and operate."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.14 Resilience and prevention of cascading failures",
    "id": "30-14-resilience-and-prevention-of-cascading-failures"
  },
  {
    "kind": "paragraph",
    "text": "Timeouts limit how much a dependency can consume from the request budget. Deadlines must be propagated so that downstream services do not continue working after the client has already given up. Retries are only safe for idempotent or key-protected operations. They need backoff, jitter, retry limit and global budget."
  },
  {
    "kind": "paragraph",
    "text": "Circuit breakers temporarily interrupt calls to a dependency with a high failure rate. Bulkheads isolate pools, queues, or resources to prevent one component from consuming all capacity. Load shedding rejects work when the system cannot process it within the SLO. These controls reduce cascades, but aggressive configuration can cause unnecessary rejection."
  },
  {
    "kind": "paragraph",
    "text": "Multi-layer retries can multiply calls. If the client, gateway, mesh, and SDK all try three times, a single operation can produce dozens of attempts. The policy must be owned, consider idempotence and use telemetry. Resilience is not about hiding failures indefinitely; is to preserve capacity and produce predictable behavior."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.15 Service discovery, API Gateway and service mesh",
    "id": "30-15-service-discovery-api-gateway-and-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Service discovery resolves logical names for available instances. In Kubernetes, Services and DNS provide this abstraction. In other environments, registries or balancers fulfill a similar role. The client must not depend on ephemeral IPs. Health, readiness and draining need to be coherent to avoid sending to instances that are unable to serve."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways protect and govern north-south traffic, offering exposure, authentication, quotas and mediation. Service meshes apply identity, mTLS, routing, and observability to east-west traffic. The limits are not absolute, but duplication of retries, rate limits and transformation between layers should be avoided."
  },
  {
    "kind": "paragraph",
    "text": "The integration needs to preserve context: correlation ID, trace context, user identity when necessary, workload identity and deadline. Propagating all headers without allowlist is also dangerous. Each hop must define which attributes are trusted and which need to be removed or rebuilt."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.16 Observability and distributed correlation",
    "id": "30-16-observability-and-distributed-correlation"
  },
  {
    "kind": "paragraph",
    "text": "In a distributed journey, a business error can cross APIs, queues, consumers and compensations. Isolated logs per service are not enough. Trace IDs, correlation IDs, causation IDs, event IDs and aggregate IDs need to be used consistently to reconstruct history."
  },
  {
    "kind": "paragraph",
    "text": "Metrics must combine technical and business signals: latency, error, saturation, backlog, message age, retry rate, DLQ, pending sagas, offsets, projection divergence and time to complete the journey. An empty queue does not prove that the process is healthy if messages were discarded or incorrectly redirected."
  },
  {
    "kind": "paragraph",
    "text": "Synchronous tracing follows the context between calls. In asynchronous, the producer injects context into the message and the consumer creates a new related span. Retention and cardinality need to be controlled. Payloads and personal data should not be copied in full to logs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.17 Security between services",
    "id": "30-17-security-between-services"
  },
  {
    "kind": "paragraph",
    "text": "Security must distinguish the identity of the user, the client application and the workload that executes the call. mTLS authenticates transport peers, but does not replace business authorization. Tokens can carry delegation, while workload identities protect internal communication. The service needs to validate audience, issuer, scopes and expected context."
  },
  {
    "kind": "paragraph",
    "text": "Events also require control. Topics, queues and schemas have production and consumption policies. A compromised consumer should not read all domains. Sensitive data needs minimization, encryption and proper retention. Keys and secrets must not circulate in payloads or correlation headers."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust applied to microservices involves authenticating each relationship, authorizing by least privilege and observing behavior. Relying on everything on the internal network perpetuates lateral movement. At the same time, excessively centralized policies can block autonomy; the platform must offer secure standards and automation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.18 Monolith Migration and Strangler Fig",
    "id": "30-18-monolith-migration-and-strangler-fig"
  },
  {
    "kind": "paragraph",
    "text": "Migrating a monolith by complete rewrite concentrates risk and defers value. The Strangler Fig pattern introduces a routing layer and gradually replaces capabilities. New functionalities can be born outside the monolith, while existing functionalities are extracted by vertical business slices."
  },
  {
    "kind": "paragraph",
    "text": "Before extracting, it is useful to modularize internally, map dependencies, and establish tests. Extraction must include data, operation and ownership, not just endpoints. Change Data Capture, anti-corruption layers and temporary synchronization can support transition, but need time to be removed."
  },
  {
    "kind": "paragraph",
    "text": "A successful migration step reduces net coupling. If the new service continues reading and writing tables from the monolith, it depends on the same release and does not have its own observability, there was only physical distribution. Exit criteria should include domain, data, deploy, operation and independent contracts."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.19 Testing, governance and internal platform",
    "id": "30-19-testing-governance-and-internal-platform"
  },
  {
    "kind": "paragraph",
    "text": "Unit testing remains important, but does not cover distributed contracts. Consumer-driven contract tests verify consumer expectations without demanding the entire environment. Integration tests validate broker, bank and adapters. End-to-end tests must cover few critical journeys because they are expensive and fragile."
  },
  {
    "kind": "paragraph",
    "text": "In events, schema and compatibility tests need to observe data direction. An added field can break strict consumers. Replay tests verify that new projectors process historical events. Chaos engineering and failure tests evaluate timeout, retry, partial unavailability and recovery."
  },
  {
    "kind": "paragraph",
    "text": "An Internal Developer Platform can offer templates, pipelines, observability, identity, secrets, policies and catalogs. The objective is to reduce undifferentiated work, not to impose a rigid framework. Golden paths should be easy to use and allow for governed exceptions when the domain requires it."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.20 Common antipatterns",
    "id": "30-20-common-antipatterns"
  },
  {
    "kind": "paragraph",
    "text": "Distributed monolith occurs when services need to be deployed together, share database and call each other in sequence for any operation. Network complexity is added without autonomy. Another anti-pattern is the nanoservice, too small to justify its own contract, deployment and operation."
  },
  {
    "kind": "paragraph",
    "text": "Chatty services exchange many small messages to set up an operation. Shared domain libraries spread rules and create coordinated upgrades. Generic events with huge payloads make all consumers dependent on the internal model. A queue used as a permanent bank without a replay and retention strategy also generates risk."
  },
  {
    "kind": "paragraph",
    "text": "Centralizing all logic in a gateway, ESB or orchestrator recreates an integration monolith. The platform must apply cross-cutting concerns, while business rules remain across domains. Fixing an antipattern starts with measuring dependencies and frequency of changes, not just redrawing diagrams."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "30.21 Journey-oriented troubleshooting",
    "id": "30-21-journey-oriented-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Diagnosis begins with the journey and its identifier. Determine which command started the process, which services participated, which events were published, which local states were committed, and which step is awaiting completion. The absence of an HTTP response does not mean that work did not occur; a timeout may have occurred after the commit."
  },
  {
    "kind": "paragraph",
    "text": "In synchronous flows, compare deadlines, retries, status and traces per hop. In asynchronous flows, check offset, backlog, consumer group, retries, DLQ, deduplication, and order by key. In sagas, examine orchestrator status, pending offsets, and local transactions. The diagnosis needs to separate transient failure, contract error and business rule violation."
  },
  {
    "kind": "paragraph",
    "text": "Reprocessing must be controlled. Resending a message without understanding idempotence may result in double billing or notification. Operational tools need to record who reprocessed, when, which consumer version was used, and what result occurred. Reconciliation is part of the delivered product, not an improvised activity."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Troubleshooting must reconstruct states and messages, not just HTTP responses.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "Pending order",
        "Event not published, consumer stopped or compensation waiting.",
        "Outbox, broker, consumer lag and state of the saga."
      ],
      [
        "Double billing",
        "Retry without idempotence or deduplication fails.",
        "Idempotency key, eventId and transactional history."
      ],
      [
        "Divergent projection",
        "Event lost, out of order, or incompatible projector.",
        "Versions, offsets, replay and aggregate version."
      ],
      [
        "Cascading latency",
        "Fan-out, multiple retries or dependency timeout.",
        "Trace, budgets, attempts and saturation."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Case study 1 - A commerce platform creates an order, reserves stock and authorizes payment. The initial flow uses three chained synchronous calls and fails on spikes. Evolution adopts an orchestrated Saga, persisted states, outbox and compensations. The API returns 202 with process identifier and offers status query."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 2 - A service publishes PaymentConfirmed after updating the bank. Intermittent failures between commit and publish cause stuck requests. The implementation of Transactional Outbox and CDC closes the gap. Consumer adds Inbox and idempotent key to tolerate duplicates."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3 - A dashboard queries six services and presents high latency. The analysis shows sequential fan-out and data with a tolerance of a few seconds. The team creates a materialized view updated by events, reducing dependencies on the critical path and maintaining the replay process for reconstruction."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Model an Order Saga and identify tradeoffs. 2) Implement an outbox in a relational database and simulate failure after commit. 3) Create idempotent consumer with eventId. 4) Compare API Composition with a materialized view. 5) Simulate out-of-order messages using aggregate version."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Microservices organize autonomy around business capabilities, data and ownership. The number of services does not define maturity. Coherent boundaries, independent deployment and operational responsibility are more important indicators than physical size."
  },
  {
    "kind": "paragraph",
    "text": "Integration makes distribution costs explicit. Synchronous communication creates temporal coupling; Asynchronous communication introduces states, duplicates, and the need for reconciliation. Commands, queries and events have different semantics and must be defined clearly."
  },
  {
    "kind": "paragraph",
    "text": "Saga coordinates local transactions and clearings. Transactional Outbox resolves dual write within the service boundary, while Inbox and idempotence reduce duplicate effects. CQRS, materialized views and Event Sourcing are optional patterns, useful only when their benefits justify the complexity."
  },
  {
    "kind": "paragraph",
    "text": "Resilience, security, and observability need to be designed in from the beginning. Timeouts, retries, DLQ, tracing, correlation and reprocessing tools are part of the product. Gradual legacy migration should reduce real coupling and avoid just turning a monolith into several dependent processes."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves into messaging with Kafka, RabbitMQ, AMQP and JMS, detailing brokers, queues, topics, partitions, acknowledgements, consumer groups, retention and operation of asynchronous platforms."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Architecture and integration checklist",
    "id": "architecture-and-integration-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The decomposition follows business capabilities and bounded contexts, not just tables or technical layers.",
      "Each service has clear ownership of data, contract, deployment and operation.",
      "The choice of synchronous or asynchronous is aligned with business experience and guarantees.",
      "Commands, queries and events are semantically distinguished.",
      "Immediate invariants remain within local transactions.",
      "Distributed processes model intermediate states and reconciliation.",
      "Sagas have compensation, timeout, persistence and operational owner.",
      "Dual writes use outbox, CDC or equivalent mechanism.",
      "Consumers are idempotent and tolerate duplicates and reprocessing.",
      "Order is defined by aggregate or key when necessary.",
      "Retries have backoff, jitter, budget and protection against multiplication between layers.",
      "Contracts have schema, version and compatibility tests.",
      "Logs, metrics and traces allow you to reconstruct the end-to-end journey.",
      "Migrations reduce dependencies and have clear exit criteria."
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
      "Explain why microservices are a sociotechnical decision.",
      "Differentiate subdomain, bounded context, service and component.",
      "Identify signs of a distributed monolith.",
      "Compare synchronous and asynchronous communication on availability and user experience.",
      "Differentiate command, query, domain event and integration event.",
      "Model one Saga by choreography and another by orchestration for the same process.",
      "Explain the dual write problem and how the outbox mitigates it.",
      "Describe idempotence in a creation API and an event consumer.",
      "Compare API Composition and materialized view.",
      "Explain when CQRS and Event Sourcing should not be used.",
      "Propose a Strangler migration strategy for a legacy module.",
      "Create a troubleshooting script for a stuck after payment saga."
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
    "caption": "Table 6 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Aggregate",
        "Set of objects protected by a consistency boundary."
      ],
      [
        "API Composition",
        "Querying multiple services with aggregation of responses."
      ],
      [
        "Bounded Context",
        "Boundary at which a model and its language have consistent meaning."
      ],
      [
        "CDC",
        "Change Data Capture; captures changes from the database log or engine."
      ],
      [
        "Choreography",
        "Distributed coordination by reaction to events."
      ],
      [
        "CQRS",
        "Separation between command and query models."
      ],
      [
        "Event Sourcing",
        "State persistence as a sequence of immutable events."
      ],
      [
        "Idempotence",
        "Property of repeating an operation without additional effects."
      ],
      [
        "Inbox",
        "Local record of received and processed messages."
      ],
      [
        "Materialized View",
        "Pre-calculated projection for efficient reading."
      ],
      [
        "Distributed monolith",
        "Physically separate but tightly coupled services."
      ],
      [
        "Orchestration",
        "Coordination by component that maintains process state and sequence."
      ],
      [
        "Outbox",
        "Local table or log used to publish events after business commits."
      ],
      [
        "Saga",
        "Sequence of local transactions with compensatory actions."
      ],
      [
        "Strangler Fig",
        "Gradual migration that replaces parts of a legacy system."
      ],
      [
        "Transactional boundary",
        "Threshold at which a local transaction protects invariants."
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
      "Evans, Eric. Domain-Driven Design: Tackling Complexity in the Heart of Software.",
      "Fowler, Martin. Patterns of Enterprise Application Architecture and articles on microservices, CQRS and Strangler Fig.",
      "Newman, Sam. Building Microservices.",
      "Richardson, Chris. Microservices Patterns.",
      "Hohpe, Gregor; Woolf, Bobby. Enterprise Integration Patterns.",
      "Kleppmann, Martin. Designing Data-Intensive Applications.",
      "Microsoft. Cloud Design Patterns: Saga, CQRS, Retry, Circuit Breaker, Competing Consumers and Materialized View.",
      "AWS Prescriptive Guidance. Transactional Outbox, Saga and decomposition patterns.",
      "CloudEvents Specification and AsyncAPI Specification.",
      "OpenTelemetry Documentation. Context propagation and distributed tracing."
    ]
  },
  {
    "kind": "subhead",
    "text": "Application note"
  },
  {
    "kind": "paragraph",
    "text": "Integration standards are decision tools, not universal requirements. Before adopting Saga, CQRS, Event Sourcing, Outbox or a messaging platform, validate the real problem, operational capacity and recovery path in an authorized environment."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Pattern selection matrix",
    "id": "annex-a-pattern-selection-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 7 - The standard is chosen based on the need and acceptable operational cost.",
    "headers": [
      "Need",
      "Candidate pattern",
      "Validation question"
    ],
    "rows": [
      [
        "Coordinate process between services",
        "Saga",
        "Are compensations and intermediate states modeled?"
      ],
      [
        "Update database and publish event",
        "Transactional Outbox",
        "Does the consumer tolerate duplicates and is the relay observable?"
      ],
      [
        "Query data from multiple domains",
        "API Composition",
        "Are latency and fan-out availability acceptable?"
      ],
      [
        "Reading with a very different model",
        "CQRS/Materialized View",
        "Is the projection delay and reconstruction bearable?"
      ],
      [
        "Preserve complete sequence of decisions",
        "Event Sourcing",
        "Does the domain really need replay and immutable history?"
      ],
      [
        "Migrate legacy functionality gradually",
        "Strangler Fig",
        "Does the new frontier eliminate old data and deployment dependencies?"
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Which business capability owns the decision and data?",
      "Which invariants need to be immediate and which can converge?",
      "Does the consumer need an immediate response or can they follow a process?",
      "How will duplicates, out-of-order messages and retries be handled?",
      "What is the observable state of the journey during partial failures?",
      "Who reprocesses, reconciles and authorizes manual interventions?",
      "How do contracts and schemas evolve without coordinating all consumers?",
      "What logs, metrics and traces prove that the process ended correctly?",
      "How can the design be simplified or reversed if the cost outweighs the benefit?"
    ]
  }
];
