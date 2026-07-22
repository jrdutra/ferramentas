import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const CASE_STUDIES_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Real cases: architecture, operation, failures and decisions at scale"
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The value of the case study is in the reasoning and trade-offs; Copying the solution without context is a risk."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/en/overview.svg",
    "alt": "Real cases connecting architectural decisions to production problems",
    "caption": "Opening figure - Cases connect architectural decisions to problems observed in production."
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
    "text": "The previous chapters studied protocols, gateways, security, messaging, observability, Kubernetes, Zero Trust and availability in a conceptual and technical way. This chapter changes the perspective: instead of presenting an isolated technology, it looks at how large organizations have documented real problems and the decisions they have made to operate at scale. The intention is to bring theory and practice closer together without transforming public stories into universal recipes."
  },
  {
    "kind": "paragraph",
    "text": "Case studies from global companies are useful because they expose trade-offs that rarely appear in tutorials. A gateway may need to abandon a blocking model; retries can amplify a failure; a versioning scheme needs to balance evolution and stability; an event backbone needs to preserve retention and parallelism; an internal portal needs to reduce tool fragmentation. Each decision responds to a specific context of volume, organization, legacy and operational maturity."
  },
  {
    "kind": "paragraph",
    "text": "At the same time, public sources are incomplete. Engineering articles feature excerpts, typically written after a successful project or significant incident. Costs, failed attempts, trading restrictions and security details may be omitted. Therefore, the reader must extract principles, not copy topologies. The correct question is: what property of the system led to the decision and how does this property appear in my environment?"
  },
  {
    "kind": "paragraph",
    "text": "The selected cases cover Netflix, Amazon/AWS, Stripe, Shopify, LinkedIn, Google, GitHub and Spotify. They were chosen because they have primary technical publications and because they connect several course topics: API Gateway, load shedding, idempotence, versioning, GraphQL, Kafka, SRE, gRPC, OpenAPI, developer portals and incident analysis."
  },
  {
    "kind": "paragraph",
    "text": "How to study this chapter For each company, write five lines: context, problem, decision, result, and transfer limit. Then, convert the lesson into a testable hypothesis for a banking or corporate environment. This practice avoids copying solutions without understanding the mechanism that made them effective."
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
      "Read engineering publications as partial and contextualized evidence.",
      "Relate large company decisions to the fundamentals of APIs and distributed systems.",
      "Analyze evolution of gateways, resilience strategies and overload protection.",
      "Understand real practices of idempotence, versioning and rate limiting.",
      "Relate GraphQL, Kafka, gRPC, SRE and developer portals to organizational problems.",
      "Extract recurring patterns without confusing correlation with causality.",
      "Assess when a case is transferable to banking, regulated or hybrid environments.",
      "Turn a public lesson into a controlled experiment, technical standard, and runbook."
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
      "39.1 How to interpret public cases rigorously",
      "39.2 Netflix: evolution of the Zuul gateway",
      "39.3 Amazon/AWS: retries, idempotence, isolation and stability",
      "39.4 Stripe: Predictable APIs, versioning and rate limiting",
      "39.5 Shopify: GraphQL and cost throttling",
      "39.6 LinkedIn: Kafka as a data backbone",
      "39.7 Google: SRE, overload and gRPC",
      "39.8 GitHub: versioning by date, OpenAPI and SDKs",
      "39.9 Spotify: internal platform and service discovery incident",
      "39.10 Cross-sectional comparison and application to banks",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.1 How to interpret public cases rigorously",
    "id": "39-1-how-to-interpret-public-cases-rigorously"
  },
  {
    "kind": "paragraph",
    "text": "A public case needs to be read as a time frame. The architecture described may have been replaced, expanded, or split after publication. Furthermore, the same term can mean different things between companies. Gateway, platform, cell, domain and service are context-dependent words. The reader must record the date, the primary source, the scale described and the objective of the text before generalizing any conclusion."
  },
  {
    "kind": "paragraph",
    "text": "The analysis must separate published fact from inference. If a company says it has migrated a gateway to asynchronous I/O, that's a fact. Concluding that every blocking gateway is inadequate is an incorrect inference. The problem may only have arisen under a certain connection profile, number of sources or cost per thread. Good case studies explain the relationship between symptom, mechanism and decision."
  },
  {
    "kind": "paragraph",
    "text": "It is also necessary to note survivorship bias. Published solutions have typically worked well enough to merit an article, but that doesn't mean they're the only ones possible. In a smaller organization, a simpler architecture can produce better availability by reducing required components and skills. Technical scale and organizational scale need to be considered together."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/en/figure-01.svg",
    "alt": "Framework for analyzing context, problem, decision and outcome of a public case",
    "caption": "Figure 1 - Context and limits are as important as the solution described."
  },
  {
    "kind": "table",
    "caption": "Table 1 - A technical case should be interrogated, not just admired.",
    "headers": [
      "Question",
      "Evidence desired",
      "Risk of ignoring"
    ],
    "rows": [
      [
        "What was the problem?",
        "Symptom, impact and restrictions.",
        "Copy technology unnecessarily."
      ],
      [
        "What was the scale?",
        "Volume, cardinality, regions and teams.",
        "Oversize or undersize."
      ],
      [
        "What was the trade-off?",
        "Cost, complexity and remaining failures.",
        "Treat gain as free."
      ],
      [
        "What changed afterwards?",
        "Date and continuity of architecture.",
        "Adopt already replaced solution."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.2 Netflix: evolution of the Zuul gateway",
    "id": "39-2-netflix-evolution-of-the-zuul-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Netflix published Zuul as an edge service used to receive traffic, apply filters, route calls, and secure cloud systems. The first generation was built on a synchronous and blocking model. As traffic volume and diversity grew, the company built Zuul 2 on top of an asynchronous, non-blocking Netty-based architecture, fundamentally changing the gateway concurrency model."
  },
  {
    "kind": "paragraph",
    "text": "The lesson is not simply that asynchronous is superior. The gain appears when a large number of connections spend a significant part of their time waiting for I/O. In this scenario, reserving a thread per connection or request can increase costs and make capacity control difficult. Migration also increases the complexity of programming, debugging, and context propagation. Netflix needed to address filters, observability and operational compatibility within the new model."
  },
  {
    "kind": "paragraph",
    "text": "Later publications show that optimization continued. The adoption of HTTP/2 multiplexing for origins reduced connection churn, and prioritized load shedding mechanisms were implemented at the gateway layer to preserve more important services during overload. This demonstrates that the edge is not just routing: it can be a strategic point of protection, traffic classification and failure containment."
  },
  {
    "kind": "paragraph",
    "text": "Transferable lesson On high-volume gateways, measure open connections, reuse, queues, blocked time, churn, and saturation before choosing the concurrency model. The I/O architecture must respond to the real traffic profile, and load shedding must be defined by business criticality."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.3 Amazon/AWS: retries, idempotence, isolation and stability",
    "id": "39-3-amazon-aws-retries-idempotence-isolation-and-stability"
  },
  {
    "kind": "paragraph",
    "text": "The Amazon Builders Library documents a pragmatic view of reliability in distributed systems. Timeouts are necessary to limit work and prevent indefinite waiting, but incorrect values produce false errors or keep resources tied up. Retries recover transient failures, but they also multiply load precisely when the destination may be degraded. Therefore, the recommendation combines limited attempts, exponential backoff, jitter and idempotent operations."
  },
  {
    "kind": "paragraph",
    "text": "Idempotence allows the client to repeat a request without duplicating the intended effect. In creation or payment operations, the company advocates identifying the caller's intent by a stable key and persisting the associated result. This pattern is safer than trying to infer duplicity from content alone. It also requires defining retention window, parameter conflict and behavior after timeout between processing and response."
  },
  {
    "kind": "paragraph",
    "text": "Other texts describe load shedding, static stability, dependency isolation and shuffle sharding. The common principle is to reduce the impact radius. A statically stable system continues to serve with known state when a control dependency becomes unavailable. Shuffle sharding distributes customers across different subsets of resources, decreasing the likelihood of two consumers sharing exactly the same fault domain. These standards trade maximum efficiency for containment and predictability."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Reliability comes from the combination of mechanisms, not a single retry.",
    "headers": [
      "Standard",
      "Problem attacked",
      "Trade-off"
    ],
    "rows": [
      [
        "Backoff + jitter",
        "Synchronization of retries and peaks.",
        "Increased latency for recovery."
      ],
      [
        "Idempotence",
        "Doubling of effects after retry.",
        "Additional state and conflict rules."
      ],
      [
        "Load shedding",
        "Collapse due to overload.",
        "Some traffic is rejected."
      ],
      [
        "shuffle sharding",
        "Blast radius between tenants.",
        "Less shared capacity."
      ],
      [
        "static stability",
        "Control dependency unavailable.",
        "Status may be temporarily out of date."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.4 Stripe: Predictable APIs, versioning and rate limiting",
    "id": "39-4-stripe-predictable-apis-versioning-and-rate-limiting"
  },
  {
    "kind": "paragraph",
    "text": "Stripe has published practices that treat the API as long-term infrastructure. In idempotence, the company proposes client-supplied keys to make safe retries in effect operations. The server associates the key with an execution and returns the corresponding result on further attempts. The standard reduces the risk of double charges when the network fails after processing but before the response reaches the consumer."
  },
  {
    "kind": "paragraph",
    "text": "In versioning, Stripe describes a strategy in which integrations remain associated with compatible versions as the platform evolves. The goal is to enable internal changes and new behaviors without forcing coordinated migration of all customers. This requires a layer capable of applying transformations or behaviors per version, clear documentation, and strict governance to avoid an unmanageable compatibility matrix."
  },
  {
    "kind": "paragraph",
    "text": "The company also describes multiple limiters: request rate limiters, concurrent request limiters, fleet usage load shedders and worker utilization load shedders. The important lesson is that a single window of requests per second does not protect all dimensions. A long call can consume competition; a specific worker can saturate; one operation may be more expensive than another. Effective protection combines rate, competition, and usage limits."
  },
  {
    "kind": "paragraph",
    "text": "Idempotency Conceptual Pattern POST /v1/payments Idempotency-Key: 7b89f6c2-..."
  },
  {
    "kind": "paragraph",
    "text": "# Repeating the same intent with the same key # should either recover the previous result or reject # incompatible parameters for the existing key."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.5 Shopify: GraphQL and cost throttling",
    "id": "39-5-shopify-graphql-and-cost-throttling"
  },
  {
    "kind": "paragraph",
    "text": "Shopify adopts cost-calculated throttling in its GraphQL Admin API. Instead of counting each query as an equivalent unit, the system assigns points to the requested fields and connections. The app and store combination receives a bucket with capacity and restore rate. Simpler queries consume fewer points; broad or deeply connected queries consume more."
  },
  {
    "kind": "paragraph",
    "text": "This model responds to a specific characteristic of GraphQL: the same URL can represent operations with very different costs. A traditional rate limit per request does not distinguish between a small query and an operation that traverses thousands of objects. The estimated cost allows you to protect the server and, at the same time, provide predictability to the consumer. The response informs the requested cost, actual cost and state of the bucket, allowing the client to adapt."
  },
  {
    "kind": "paragraph",
    "text": "Shopify also advises using bulk operations for large data sets. This shifts long work to asynchronous execution and prevents the client from trying to bypass limits with aggressive pagination. The transferable lesson is to separate low-latency online interactions from analytical or massive workloads, offering a suitable interface for each profile."
  },
  {
    "kind": "paragraph",
    "text": "Transferable lesson When the cost of an operation varies greatly, limit by weight or complexity, not just by number of requests. Expose the consumer to enough information to reduce cost or migrate to asynchronous processing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.6 LinkedIn: Kafka as a data backbone",
    "id": "39-6-linkedin-kafka-as-a-data-backbone"
  },
  {
    "kind": "paragraph",
    "text": "Kafka was born at LinkedIn to collect and deliver large volumes of data with low latency. Company publications describe the evolution of an environment that went beyond the limits of a centralized bank and needed to integrate specialized systems. The abstraction chosen was a distributed, partitioned and replicated log, in which producers add records and consumers maintain their own position through offsets."
  },
  {
    "kind": "paragraph",
    "text": "Retention differentiates Kafka from traditional throwaway queues. Consumers can reprocess data, create new insights, and advance at independent speeds. Partitions provide parallelism and ordering by key within a partition. These properties made it possible to use Kafka as a messaging backbone, ingestion for batch processing and feeding for streaming systems."
  },
  {
    "kind": "paragraph",
    "text": "The organizational lesson is as important as the technical one. A central backbone reduces point-to-point integrations, but creates a critical platform that requires ownership, capacity, schema governance, quotas, isolation, and specialized operation. Turning Kafka into the data circulatory system increases its importance and blast radius. The company invested in the ecosystem and tools around the broker, not just the cluster."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.7 Google: SRE, overload and gRPC",
    "id": "39-7-google-sre-overload-and-grpc"
  },
  {
    "kind": "paragraph",
    "text": "Google's Site Reliability Engineering model made the relationship between software engineering and operations explicit. The SRE Book emphasizes SLIs, SLOs, actionable alerts, playbooks, postmortems, and toil reduction. In overload and cascading failures, the material shows that planned capacity is not enough: loss of replicas, retries and queues can create positive feedback and bring down components that are still healthy."
  },
  {
    "kind": "paragraph",
    "text": "The answer involves multi-layered protection: concurrency limits, load shedding, backpressure, timeouts, controlled retries and degradation. Monitoring needs to represent user experience and internal saturation. A recurring lesson is that the system should reject work early when it cannot fulfill it, preserving latency and capacity for accepted requests."
  },
  {
    "kind": "paragraph",
    "text": "In communication between services, gRPC was created based on Google's experience with Stubby, an RPC infrastructure used to connect a large number of microservices. Typed contracts, streaming, deadlines, health checking and integration with tracing demonstrate how the protocol carries production practices. The gain doesn't just come from binary serialization; comes from the standardization of behavior between clients and servers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.8 GitHub: versioning by date, OpenAPI and SDKs",
    "id": "39-8-github-versioning-by-date-openapi-and-sdks"
  },
  {
    "kind": "paragraph",
    "text": "GitHub introduced date versioning to its REST API to continue evolving the contract without surprising existing integrations. The consumer informs the desired version in a header and receives a migration period for new versions. This choice separates feature identity from version selection and turns the date into a milestone of supported behavior."
  },
  {
    "kind": "paragraph",
    "text": "The company also published an OpenAPI description of its REST API. In addition to documentation, the contract now allows generation, validation and automation. In its SDKs, GitHub described replacing manual route definitions with generation from documentation and structured descriptions. This reduces drift, but makes contract and pipeline quality a critical part of the product."
  },
  {
    "kind": "paragraph",
    "text": "The lesson is that versioning and machine-readable contracts need to go hand in hand. A version is not just a value in the header: it needs to be reflected in documentation, examples, generated code, tests and telemetry. Automation reduces manual work, but quickly propagates contract errors; therefore, validation and review remain essential."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.9 Spotify: internal platform and service discovery incident",
    "id": "39-9-spotify-internal-platform-and-service-discovery-incident"
  },
  {
    "kind": "paragraph",
    "text": "Spotify created Backstage to unify tools, services, and documentation into a consistent experience for developers. The portal allows you to locate ownership, create components from templates and integrate CI/CD, documentation, cloud resources and observability. The problem addressed was not just technical: the autonomy of many teams had produced fragmentation of tools and difficulty in discovering who operated each service."
  },
  {
    "kind": "paragraph",
    "text": "The value of the case lies in the idea of the platform as an internal product. Templates and plugins reduce variability without eliminating autonomy. A developer is given a standard path for creating services, while platform teams maintain guardrails, catalogs, and integrations. This turns governance into user experience, rather than relying solely on documents and manual reviews."
  },
  {
    "kind": "paragraph",
    "text": "In 2022, Spotify published an incident in which an outage in Traffic Director, combined with a bug in a gRPC client library, affected login. The report highlights compound failures: an external dependency degraded, and customer behavior amplified the impact. The lesson is to review failure modes of discovery and control planes, test fallback, limit critical dependencies, and look at shared libraries as part of the architecture."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/en/figure-02.svg",
    "alt": "Recurring patterns of isolation, control, evolution and observability",
    "caption": "Figure 2 - Isolation, control, evolution and observability appear repeatedly because they address fundamental properties of distributed systems."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.10 Cross-sectional comparison of cases",
    "id": "39-10-cross-sectional-comparison-of-cases"
  },
  {
    "kind": "table",
    "caption": "Table 3 - Technology changes; control and governance mechanisms are repeated.",
    "headers": [
      "Company",
      "Core problem",
      "Main pattern",
      "Transfer Care"
    ],
    "rows": [
      [
        "Netflix",
        "High volume edge.",
        "Asynchronous I/O, H2 and load shedding.",
        "Complexity of the reactive model."
      ],
      [
        "Amazon/AWS",
        "Transient faults and overload.",
        "Jitter, idempotence, isolation and stability.",
        "More status and reserved capacity."
      ],
      [
        "Stripe",
        "Long-term financial API.",
        "Idempotence, versioning and multiple limiters.",
        "Compatibility matrix."
      ],
      [
        "Shopify",
        "Heterogeneous GraphQL queries.",
        "Rate limit by cost and bulk operations.",
        "Cost calculation needs to be transparent."
      ],
      [
        "LinkedIn",
        "Data integration at scale.",
        "Distributed log and Kafka ecosystem.",
        "Backbone becomes critical infrastructure."
      ],
      [
        "Google",
        "Reliable operation and standardized RPC.",
        "SLOs, load shedding, deadlines and gRPC.",
        "It requires culture and tooling."
      ],
      [
        "GitHub",
        "Secure public API evolution.",
        "Version by date and OpenAPI contracts.",
        "Automation propagates contract errors."
      ],
      [
        "Spotify",
        "Internal fragmentation and dependencies.",
        "Developer portal and incident analysis.",
        "Portal does not replace real ownership."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "39.11 Application in banking architectures",
    "id": "39-11-application-in-banking-architectures"
  },
  {
    "kind": "paragraph",
    "text": "Banking environments share several properties with cases: high volume, cash-intensive operations, legacy integrations, multiple consumers, regulatory requirements, and low tolerance for inconsistency. The most direct application is idempotence in payments, transfers and initiations. A key needs to represent the consumer's intention and be verified against relevant parameters, avoiding duplication without masking really different requests."
  },
  {
    "kind": "paragraph",
    "text": "At the edge, lessons from Netflix, Stripe and Shopify help design gateways with limits by criticality, competition and cost. Balance, payment, and authentication APIs should not compete head-to-head with analytical queries. Load shedding and priorities need to be defined with the business, accompanied by predictable responses and observability that shows who was rejected and why."
  },
  {
    "kind": "paragraph",
    "text": "For data and integration, the LinkedIn experience demonstrates the value of an event log, but banks need to add rigorous schema governance, retention, encryption, reconciliation, and segregation. The case of Spotify reinforces the importance of catalogue, ownership and standardized paths. Google's model shows that SLOs, playbooks, and postmortems need to be part of the daily operation, not an occasional activity after major incidents."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/real-world-enterprise-case-studies/en/figure-03.svg",
    "alt": "Flow of adopting a lesson by hypothesis, experiment and governance",
    "caption": "Figure 3 - A case should only become a standard after hypothesis, experiment and governance."
  },
  {
    "kind": "paragraph",
    "text": "The first anti-pattern is imaginary scaling: adopting dozens of components because a global company uses them, even if the volume, staff, and local requirements don't justify it. Each additional service creates deploy, patch, observability, backup, security and operational knowledge. Complexity should only be purchased when it solves a measured constraint."
  },
  {
    "kind": "paragraph",
    "text": "The second anti-pattern is copying the component and ignoring the ecosystem. Kafka without governance, service mesh without observability, gateway without capacity planning and developer portal without ownership become showcases. Large companies typically invest in libraries, templates, testing, operations and specialized teams around the core technology."
  },
  {
    "kind": "paragraph",
    "text": "The third anti-pattern is copying the final state. Publications show an architecture after years of evolution. The reader organization needs to build an incremental path, with metrics and reversibility. The best outcome may be to just adopt the principle - such as idempotence, isolation, or catalog - with a simpler implementation."
  },
  {
    "kind": "paragraph",
    "text": "Transfer rule Copy the problem first, then the mechanism, and only lastly the technology. If the local problem does not produce the same architectural pressure, the solution probably should not be the same."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "The cases show that large platforms evolve due to concrete pressure: excessive connections, transient failures, long-term contracts, variable cost queries, data integration, overload, tooling fragmentation and control dependencies. The answers combine architecture, operations and governance."
  },
  {
    "kind": "paragraph",
    "text": "Netflix highlights the edge as a point of protection and competition. Amazon highlights idempotence, jitter, isolation, and stability. Stripe and GitHub treat APIs as long-lasting contracts. Shopify demonstrates cost-driven limitation. LinkedIn shows the power and risk of an events backbone. Google connects SRE and standardized RPC. Spotify showcases internal platform and transparent learning from incidents."
  },
  {
    "kind": "paragraph",
    "text": "The main skill is not memorizing product names. It involves recognizing mechanisms: reducing blast radius, rejecting early, making retries safe, evolving contracts, measuring costs, standardizing interfaces and transforming operations into engineering. These mechanisms can be implemented in different ways depending on the context."
  },
  {
    "kind": "paragraph",
    "text": "The chapter prepares the final project, in which the reader must combine course principles into a complete API platform. The cases function as a repertoire to justify decisions, but each project choice will need to declare context, trade-off, evidence and operation plan."
  },
  {
    "kind": "paragraph",
    "text": "Next step of the course Chapter 40 consolidates all training into a final project: designing and justifying a complete API platform, including architecture, security, governance, observability, operation and evolution."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist to analyze new cases",
    "id": "checklist-to-analyze-new-cases"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Is the source primary and identifies date, authors and context?",
      "Are the problem, scale and constraints explicit?",
      "Does the solution solve a known mechanism or just introduce technology?",
      "Have remaining costs, limits and failures been considered?",
      "Is the architecture still current or has it been replaced?",
      "Is there evidence of results beyond qualitative perception?",
      "Does the local environment have the same load, risk and maturity profile?",
      "Is it possible to test the lesson on a small scale and with rollback?",
      "Are ownership, observability, security and operation included?",
      "Does the internal decision record why the case is applicable and where it is not?"
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
      "Explain why migration from Zuul to asynchronous I/O should not be copied without measuring the wait and concurrency profile.",
      "Design a retry policy with timeout, backoff, jitter and idempotency for a payments API.",
      "Compare Stripe and GitHub versioning and propose a policy for a public banking API.",
      "Model a rate limit per cost for an extract GraphQL API.",
      "Explain what additional controls would be needed to use Kafka as a bank's backbone.",
      "Relate Google and Netflix load shedding to priority classes in API Gateway.",
      "Propose an internal catalog inspired by Backstage with ownership, OpenAPI, SLO and runbook.",
      "Choose a case from the chapter and write an adoption experiment with success and rollback metrics.",
      "List three unpublished aspects that could change your architectural decision.",
      "Build a transfer matrix with context, benefit, risk, prerequisites and evidence."
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
    "caption": "Table 4 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "blast radius",
        "Set of users, services or data affected by a failure."
      ],
      [
        "Case study",
        "Contextualized report of problem, decision and result."
      ],
      [
        "cell",
        "Isolated unit of capacity and failure that serves workload subset."
      ],
      [
        "Developer portal",
        "Interface that brings together catalog, templates, documentation and internal tools."
      ],
      [
        "Fleet",
        "Set of instances that perform the same function."
      ],
      [
        "Load shedding",
        "Controlled rejection of work to preserve the system."
      ],
      [
        "Machine-readable contracts",
        "Structured contract interpretable by tools, such as OpenAPI."
      ],
      [
        "Postmortem",
        "Structured incident analysis with a focus on learning and prevention."
      ],
      [
        "shuffle sharding",
        "Isolation by partially overlapping subsets of resources."
      ],
      [
        "static stability",
        "Ability to continue operating with known state when control dependencies fail."
      ],
      [
        "Survivorship bias",
        "Tendency to only observe solutions that have been published or maintained."
      ],
      [
        "Transferability",
        "Degree to which a lesson can be applied to another context."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical references and primary cases",
    "id": "technical-references-and-primary-cases"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Netflix Technology Blog. Announcing Zuul: Edge Service in the Cloud.",
      "Netflix Technology Blog. Zuul 2: The Netflix Journey to Asynchronous, Non-Blocking Systems.",
      "Netflix Technology Blog. Curbing Connection Churn in Zuul.",
      "Netflix Technology Blog. Enhancing Netflix Reliability with Service-Level Prioritized Load Shedding.",
      "Amazon Builders Library. Timeouts, retries, and backoffs with jitter.",
      "Amazon Builders Library. Making retries safe with idempotent APIs.",
      "Amazon Builders Library. Using load shedding to avoid overload.",
      "Amazon Builders Library. Static stability using Availability Zones.",
      "Amazon Builders Library. Workload isolation using shuffle-sharding.",
      "Stripe Engineering. Designing robust and predictable APIs with idempotency.",
      "Stripe Engineering. APIs as infrastructure: future-proofing Stripe with versioning.",
      "Stripe Engineering. Scaling your API with rate limiters.",
      "Shopify Developers. API rate limits and GraphQL calculated query cost.",
      "LinkedIn Engineering. Kafka at LinkedIn: Current and Future; Running Kafka at Scale.",
      "Google SREBook. Monitoring Distributed Systems; Handling Overload; Addressing Cascading Failures.",
      "gRPC Authors. About gRPC and its origins in Google Stubby.",
      "GitHub Blog. Enabling the future of GitHub REST API with API versioning.",
      "GitHub Blog. Introducing GitHub OpenAPI Description; Our move to generated SDKs.",
      "Spotify Engineering. What the Heck is Backstage Anyway?; How We Use Backstage at Spotify.",
      "Spotify Engineering. Incident Report: Spotify Outage on March 8, 2022."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Methodological note The cases were constructed only with public and primary information. They do not represent the complete or current architecture of each company. Before using any lesson as a template, validate the date, context, and most recent documentation."
  }
];
