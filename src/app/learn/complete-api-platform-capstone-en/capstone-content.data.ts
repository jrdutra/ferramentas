import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const CAPSTONE_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Integrative project: from contract to resilient operation"
  },
  {
    "kind": "subhead",
    "text": "Ultimate goal"
  },
  {
    "kind": "paragraph",
    "text": "Build a demonstrable, secure, observable and operable platform, with documented decisions and reproducible tests."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/en/overview.svg",
    "alt": "Complete API platform connecting design, protection, execution and operation",
    "caption": "Opening figure - The project connects course disciplines into an end-to-end operable platform."
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
    "text": "This chapter transforms the fundamentals and practices studied throughout the course into a complete technical project. The goal is not just to publish an API that responds correctly, but to build a small platform capable of demonstrating contract design, edge protection, identity, authorization, synchronous and asynchronous integration, automated deployment, observability, resilience, governance, and operation. The result must be able to be explained, tested and reproduced by another team."
  },
  {
    "kind": "paragraph",
    "text": "The proposed scenario represents a fictitious financial institution called Banco Horizonte. The organization wants to provide APIs for querying customers and accounts, initiating payments and receiving notifications. Internal consumers, digital channels and partners will have different access profiles. The platform must meet security and privacy requirements similar to those of real corporate environments, without using production data or credentials."
  },
  {
    "kind": "paragraph",
    "text": "The project is intentionally modular. It is possible to implement a minimum version in a local environment with containers and evolve to Kubernetes, service mesh, message broker and distributed observability. This progression prevents the infrastructure from hiding essential concepts. Each step must introduce a clear capability and objective evidence that it works."
  },
  {
    "kind": "paragraph",
    "text": "The evaluation considers both the final product and the architectural reasoning. Diagrams, ADRs, OpenAPI contracts, threat models, pipelines, dashboards, tests and runbooks are part of the project. A platform without documentation and diagnostic capabilities is not considered complete, even if its basic calls are working."
  },
  {
    "kind": "paragraph",
    "text": "How to use this chapter Treat the chapter as a running script. In each section, record decisions, hypotheses, and evidence. Whenever a specific tool is not available, replace it with an equivalent one, preserving the architectural concept and documenting the trade-off."
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
      "Design a complete API platform based on functional and non-functional requirements.",
      "Transform business domains into coherent and versionable OpenAPI contracts.",
      "Apply OAuth 2.0, OpenID Connect, mTLS, API Keys and authorization according to the consumer's profile.",
      "Configure an API Gateway with security, routing, transformation, limits and observability policies.",
      "Implement synchronous, asynchronous integration, idempotence, Outbox and failure handling.",
      "Deploy services in Kubernetes with probes, autoscaling, security and rollout strategy.",
      "Instrument logs, metrics and traces with OpenTelemetry and define SLIs and SLOs.",
      "Plan high availability, backup, recovery, disaster testing and troubleshooting.",
      "Produce documentation, automation and acceptance criteria that allow auditing and maintenance."
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
      "40.1 Scenario, scope and restrictions",
      "40.2 Reference architecture",
      "40.3 Functional and non-functional requirements",
      "40.4 Domains, APIs and contracts",
      "40.5 Identity and security",
      "40.6 API Gateway and policies",
      "40.7 Microservices, data and messaging",
      "40.8 Kubernetes, service mesh and networking",
      "40.9 Observability and SRE",
      "40.10 CI/CD, IaC and governance",
      "40.11 High availability and recovery",
      "40.12 Implementation phases",
      "40.13 Acceptance criteria",
      "40.14 Deliverables, demonstration and evaluation",
      "40.15 Laboratories, troubleshooting and future evolution"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.1 Scenario, scope and restrictions",
    "id": "40-1-scenario-scope-and-restrictions"
  },
  {
    "kind": "paragraph",
    "text": "Banco Horizonte needs to expose a platform to three classes of consumers. The mobile app queries the customer's own data and initiates payments. Internal systems query accounts and publish update events. External partners access limited operations through credentials, consent and rate limiting policies. The design must clearly differentiate human identity, client application and workload that performs each service."
  },
  {
    "kind": "paragraph",
    "text": "The first version of the project must contain four business capabilities: customer registration and consultation, account and balance consultation, idempotent initiation of payments and publication of status events. The technical scope includes a gateway, an identity provider, at least two domain services, a database, a broker or event log, OpenTelemetry instrumentation, and an automated delivery conveyor."
  },
  {
    "kind": "paragraph",
    "text": "Constraints exist to encourage realistic decisions. Personal data must be fictitious and minimized. Secrets cannot be versioned in the repository. The environment needs to be reproducible by code. Every write operation must support idempotence. Dependency failures should produce controlled responses. Logs cannot record complete tokens, passwords, keys, or sensitive payloads."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The project must prove capabilities, not just present components.",
    "headers": [
      "Dimension",
      "Minimum scope",
      "Expected evidence"
    ],
    "rows": [
      [
        "Business",
        "Customers, accounts, payments and events.",
        "Journeys demonstrated end to end."
      ],
      [
        "Security",
        "OAuth/OIDC, authorization, TLS and secrets.",
        "Positive and negative tests."
      ],
      [
        "Operation",
        "Logs, metrics, traces and alerts.",
        "Dashboard and correlated trace."
      ],
      [
        "Delivery",
        "Pipeline, IaC and versioning.",
        "Automatically recreated environment."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.2 Reference architecture",
    "id": "40-2-reference-architecture"
  },
  {
    "kind": "paragraph",
    "text": "The reference architecture separates edge, identity, domains, data, and operations. At the edge, DNS and balancing forward traffic to API Gateway. The gateway terminates TLS, validates credentials, applies policies, and routes to internal services. The identity provider issues tokens to users and applications. Customer, Accounts, and Payments services maintain their own responsibilities and avoid sharing tables directly."
  },
  {
    "kind": "paragraph",
    "text": "Synchronous communication uses HTTP/JSON or gRPC depending on the laboratory objective. Payment and registration update events are published in Kafka, RabbitMQ or equivalent broker. The notifications service consumes events and demonstrates temporal decoupling. A cache can be introduced for read data as long as the invalidation policy is explicit."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/en/figure-01.svg",
    "alt": "Complete logical architecture of the final project API platform",
    "caption": "Figure 1 - Logical architecture of the project; Concrete products may vary without changing responsibilities."
  },
  {
    "kind": "paragraph",
    "text": "Architectural rule Each component must exist for a verifiable reason. Don't add service mesh, cache, broker or additional bank just to increase the number of technologies. Complexity needs to solve a documented need."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.3 Functional and non-functional requirements",
    "id": "40-3-functional-and-non-functional-requirements"
  },
  {
    "kind": "paragraph",
    "text": "Functional requirements describe observable business behaviors. The consumer must consult an authorized customer, list associated accounts, obtain balance and initiate a payment. The payment needs to receive an idempotency key, produce a stable identifier, and evolve through controlled states. A status query must return the same result regardless of the instance answering the call."
  },
  {
    "kind": "paragraph",
    "text": "Non-functional requirements determine quality and operability. Define target availability, percentile latency, throughput, payload limits, rate per consumer, RTO, RPO, log and event retention, privacy criteria, and traceability requirements. Even in the laboratory, explicit numbers allow you to test and discuss trade-offs."
  },
  {
    "kind": "paragraph",
    "text": "Requirements must be measurable. Instead of writing the API must be fast, set for example p95 less than 300 ms for queries without degraded dependency. Instead of the platform must be secure, list checks: tokens with valid issuer and audience, least privilege, external secrets, logs without sensitive data, and authenticated internal communication."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Non-functional requirements must generate tests and evidence.",
    "headers": [
      "Category",
      "Requirement example",
      "How to check"
    ],
    "rows": [
      [
        "Latency",
        "p95 of GET /accounts below 300 ms.",
        "Load testing and dashboard."
      ],
      [
        "Availability",
        "99.9% monthly SLO for queries.",
        "Success metric per window."
      ],
      [
        "Recovery",
        "RPO of 5 min and RTO of 30 min.",
        "Restoration exercise."
      ],
      [
        "Security",
        "Every protected call has identity and scope.",
        "Negative tests and audit."
      ],
      [
        "Privacy",
        "Logs without full CPF, tokens or secrets.",
        "Scanner and sample review."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.4 Domains, APIs and contracts",
    "id": "40-4-domains-apis-and-contracts"
  },
  {
    "kind": "paragraph",
    "text": "Decomposition starts with the domain, not the endpoints. Customer represents registration identity and preferences. Account represents financial link and available balance. Payment represents intent, validation, execution and completion. Notification represents communication derived from events. Each domain must have a clear owner, model and data boundary."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI contracts need to define resources, methods, parameters, schemas, examples, errors and security. The design should use coherent HTTP semantics: GET for reading, POST for intent creation, PUT or PATCH only when the semantics are clear and status codes are stable. Errors must use a standardized envelope with code, secure message, correlation ID and appropriate details."
  },
  {
    "kind": "paragraph",
    "text": "Contract evolution needs to be automatically tested. Incompatible changes require a new version or formal process. Fields added to responses must consider strict consumers. Enums, nullability, formats and limits are part of the contract. The portal must publish documentation, examples and changelog."
  },
  {
    "kind": "paragraph",
    "text": "Minimum snippet of the openapi payments contract: 3.1.0 info: title: Payments API version: 1.0.0 paths: /payments: post: operationId: initiatePayment parameters: - in: header name: Idempotency-Key required: true schema: { type: string, minLength: 16 } responses: '202': { description: Payment accepted for processing } '409': { description: Key idempotence in conflict }"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/en/figure-02.svg",
    "alt": "Contract-driven cycle from implementation to evolution",
    "caption": "Figure 2 - The contract guides implementation, publication, operation and evolution."
  },
  {
    "kind": "paragraph",
    "text": "The design must separate user authentication, application authentication, and workload identity. The mobile application uses Authorization Code with PKCE and OpenID Connect. Machine-to-machine integrations use Client Credentials, preferably with strong client authentication. Internal workloads are assigned their own identity and do not reuse human credentials."
  },
  {
    "kind": "paragraph",
    "text": "The gateway validates signature, issuer, audience, time and scopes of the access token. The backend remains responsible for object authorization and business rules. A valid token does not guarantee access to any account; the service needs to verify the relationship between subject, consent and requested resource. This division demonstrates defense in depth."
  },
  {
    "kind": "paragraph",
    "text": "Secrets must remain in a secret manager or equivalent solution. Certificates and keys need planned rotation. External APIs use TLS; Sensitive integrations can use mTLS and linked tokens. The threat model should cover BOLA, broken authentication, SSRF, stream abuse, unrestricted consumption, and data exposure."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The credential must correspond to the type of subject and the risk.",
    "headers": [
      "Flow",
      "Main identity",
      "Essential control"
    ],
    "rows": [
      [
        "Mobile -> API",
        "User + public client.",
        "OIDC, PKCE, state, nonce and scopes."
      ],
      [
        "Partner -> API",
        "Confidential application.",
        "Client Credentials, mTLS and quota."
      ],
      [
        "Service -> service",
        "Workload.",
        "Short identity, mTLS and policy."
      ],
      [
        "Operator -> platform",
        "Administrative person.",
        "MFA, RBAC and audit."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.6 API Gateway and policies",
    "id": "40-6-api-gateway-and-policies"
  },
  {
    "kind": "paragraph",
    "text": "The API Gateway is the controlled point of entry, but it should not contain all the business logic. The inbound pipeline validates TLS, authentication, coarse-grained authorization, schema, payload size, rate limit and correlation. The backend section selects destination and applies timeout. The output removes internal headers, standardizes responses, and records telemetry. Error flow turns technical failures into consistent responses."
  },
  {
    "kind": "paragraph",
    "text": "Policies need to be organized by scope and reuse. Global rules take care of correlation and basic security; product policies address quotas; API policies validate contracts; operating policies cover specific exceptions. Changes go through versioning, review and automated testing. The project must demonstrate at least one invalid_token lock, one controlled 429, one secure transformation, and one fallback or circuit breaker."
  },
  {
    "kind": "paragraph",
    "text": "Gateway logs must record route, consumer, status, latency, backend and correlation ID, without capturing secrets. Metrics distinguish errors produced at the edge from backend errors. A trace should show gateway and downstream services in the same tree."
  },
  {
    "kind": "paragraph",
    "text": "Conceptual pipeline of inbound policies: - validate-jwt: issuer, audience, signature, exp - require-scope: payments.write - rate-limit: 20 req/s per client_id - validate-content: OpenAPI - set-correlation-id backend: - timeout: 2s - route: payment-service outbound: - remove-internal-headers - emit-telemetry on-error: - map-error-to-problem-details"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.7 Microservices, data and messaging",
    "id": "40-7-microservices-data-and-messaging"
  },
  {
    "kind": "paragraph",
    "text": "Each service has its own data model and exposes contracts instead of tables. The payments service records the intention and publishes an event without relying on a distributed transaction between bank and broker. The Transactional Outbox pattern records event and state in the same local transaction; a later process publishes the event and schedules delivery."
  },
  {
    "kind": "paragraph",
    "text": "Consumers need to be idempotent. The notifications service keeps Inbox or processed messages log. Retries use backoff and jitter, and unprocessed messages go to DLQ with enough context for investigation. Ordering is required only by business key, such as paymentId, avoiding an unnecessary global bottleneck."
  },
  {
    "kind": "paragraph",
    "text": "Aggregate queries can use the Composition API or a materialized view. CQRS and Event Sourcing are optional extensions; They should only be included when the student can explain their cost. The minimum design needs to explicitly demonstrate eventual consistency and a reconciliation strategy for disagreements."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Distributed patterns need to be proven by failure tests.",
    "headers": [
      "Standard",
      "Problem solved",
      "Evidence in the project"
    ],
    "rows": [
      [
        "Idempotency Key",
        "Safe repetition of commands.",
        "Same result for valid replay."
      ],
      [
        "Outbox",
        "Atomicity between state and event.",
        "Event published after local commit."
      ],
      [
        "Inbox",
        "Consumer deduplication.",
        "Repeated message does not double the effect."
      ],
      [
        "DLQ",
        "Isolation of non-transient faults.",
        "Inspectable and reprocessable message."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.8 Kubernetes, service mesh and networking",
    "id": "40-8-kubernetes-service-mesh-and-networking"
  },
  {
    "kind": "paragraph",
    "text": "Services must be packaged in immutable images and run as a non-privileged user. Deployments define replicas, strategy, requests, limits and probes. Readiness is only true when the instance can receive traffic; liveness detects real crash; startup protects slow startups. PodDisruptionBudget and topology spread reduce concentration in a single fault domain."
  },
  {
    "kind": "paragraph",
    "text": "Internal DNS and services provide discovery. NetworkPolicies restrict communication, egress and access to banks. Ingress or Gateway API exposes only the external gateway. Secrets are assembled or obtained by workload identity, avoiding fixed credentials in manifests. HPA can scale by CPU and, preferably, by demand-related metrics."
  },
  {
    "kind": "paragraph",
    "text": "An optional service mesh enforces mTLS and east-west authorization. The project must compare benefit and cost: sidecars or ambient mesh consume resources and add another layer of diagnosis. Adoption is valid when there are clear requirements for workload identity, telemetry, and uniform control."
  },
  {
    "kind": "paragraph",
    "text": "Summary workload manifest apiVersion: apps/v1 kind: Deployment metadata: { name: pago-service } spec: replicas: 3 template: spec: containers: - name: app image: registry/pagamento-service:1.0.0 resources: requests: { cpu: 200m, memory: 256Mi } limits: { cpu: 500m, memory: 512Mi } readinessProbe: httpGet: { path: /health/ready, port: 8080 } livenessProbe: httpGet: { path: /health/live, port: 8080 }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.9 Observability and SRE",
    "id": "40-9-observability-and-sre"
  },
  {
    "kind": "paragraph",
    "text": "All components emit structured logs, metrics and traces. The correlation ID follows the journey, while W3C Trace Context propagates traceparent between gateway, services and consumers. The OpenTelemetry Collector receives signals and removes sensitive attributes before export. Semantic conventions are adopted for HTTP, messaging, banking and Kubernetes resources."
  },
  {
    "kind": "paragraph",
    "text": "Define consumer-aligned SLIs: success rate, latency, availability, and freshness of asynchronous processing. An SLO for payment can combine acceptance of intent and completion within a window. Alerts must use burn rate and perceived symptoms, avoiding notification due to any CPU variation."
  },
  {
    "kind": "paragraph",
    "text": "The demo must include a complete trace, a golden signals dashboard and an exercised alert. Introduce a controlled failure, such as backend latency or broker unavailability, and show how the system degrades, which policies operate and what evidence allows you to locate the cause."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Golden signals transform the platform into an investigationable system.",
    "headers": [
      "Signal",
      "Key metric",
      "Question answered"
    ],
    "rows": [
      [
        "Traffic",
        "requests/s and messages/s.",
        "How much work is enough?"
      ],
      [
        "Errors",
        "rate by code and origin.",
        "Where and how does it fail?"
      ],
      [
        "Latency",
        "p50, p95 and p99.",
        "Who notices slowness?"
      ],
      [
        "Saturation",
        "CPU, queues, connections and lag.",
        "Which resource is close to the limit?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.10 CI/CD, infrastructure as code and governance",
    "id": "40-10-ci-cd-infrastructure-as-code-and-governance"
  },
  {
    "kind": "paragraph",
    "text": "The repository must separate code, contracts, infrastructure and documentation in an understandable way. Pull requests run OpenAPI lint, unit tests, contract tests, SAST, dependency analysis, image build and manifest verification. Promotion to environments uses immutable artifacts, not reconstruction."
  },
  {
    "kind": "paragraph",
    "text": "Infrastructure as code creates network, cluster, gateway, observability and identities. GitOps can reconcile cluster manifests. Secrets remain outside of Git and are referenced by names or identities. The pipeline generates SBOM, signs images when possible, and blocks vulnerable components above the defined threshold."
  },
  {
    "kind": "paragraph",
    "text": "Governance should not impede autonomy without reason. Templates, policy fragments, observability libraries and golden paths reduce repetitive decisions. Exceptions have owner, justification, deadline and compensation. ADRs record choices such as REST versus gRPC, broker used, versioning strategy, and authentication model."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/complete-api-platform-capstone/en/figure-03.svg",
    "alt": "Project phases with acceptance criteria and stored evidence",
    "caption": "Figure 3 - Each phase must end with acceptance criteria and stored evidence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.11 High availability, continuity and recovery",
    "id": "40-11-high-availability-continuity-and-recovery"
  },
  {
    "kind": "paragraph",
    "text": "The platform must tolerate loss of an instance without noticeable interruption. Replicas are distributed among nodes or zones. The gateway and services are stateless whenever possible. Persistent state uses replication and tested backups. Critical dependencies have timeouts, bulkheads and concurrency limits."
  },
  {
    "kind": "paragraph",
    "text": "RTO and RPO guide the recovery strategy. A backup that has never been restored is not evidence of recovery. The laboratory must perform at least one test: Pod removal, backend unavailability, broker restart or restoration of a base in an isolated environment. The result must be documented with time, observed loss and corrective actions."
  },
  {
    "kind": "paragraph",
    "text": "Failover cannot create financial duplicity. Idempotence, fencing and reconciliation are essential. The continuity plan includes contacts, declaration criteria, runbooks, communication and controlled feedback. High availability without human operation capabilities remains fragile."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.12 Implementation phases",
    "id": "40-12-implementation-phases"
  },
  {
    "kind": "table",
    "caption": "Table 6 - The project evolves by demonstrable capacity, not by number of components.",
    "headers": [
      "Phase",
      "Key deliverables",
      "Acceptance framework"
    ],
    "rows": [
      [
        "1. Foundation",
        "Repositories, ADRs, OpenAPI, local environment and CI.",
        "Validated contract and reproducible build."
      ],
      [
        "2. Edge and identity",
        "Gateway, IdP, TLS, JWT, scopes and rate limits.",
        "Authorized hours and proven blocks."
      ],
      [
        "3. Domain and events",
        "Services, bank, idempotence, Outbox and consumer.",
        "Smooth payment and event flow."
      ],
      [
        "4. Platform",
        "Kubernetes, observability, SLO, IaC and DR.",
        "Failure injected, diagnosed and recovered."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "In the foundation phase, prioritize domain and contract clarity. The edge phase adds security before increasing the number of services. The third phase introduces distributed consistency and messaging. The final phase hardens operation, observability, and recovery. This order reduces the chance of ending up with sophisticated infrastructure and an incomplete business flow."
  },
  {
    "kind": "paragraph",
    "text": "Each phase should have a short, automatable demo. Smoke test scripts, request collections and synthetic data speed up validation. The documentation needs to indicate commands, prerequisites and expected result. A person who was not involved in development should be able to execute the script."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.13 Technical acceptance criteria",
    "id": "40-13-technical-acceptance-criteria"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Valid, documented, versioned OpenAPI contracts with no unapproved incompatible changes.",
      "Authentication and authorization work for user, partner and workload; Negative tests produce correct answers.",
      "Gateway applies validation, rate limit, correlation, timeout and error handling without exposing internal data.",
      "Payment is idempotent, persists state and publishes event reliably.",
      "Consumer supports duplicates, retry and DLQ; there is a reprocessing procedure.",
      "Workloads have requests, limits, probes, rollout and network policy.",
      "Logs, metrics and traces allow you to locate an end-to-end failure.",
      "Pipeline performs tests, scans and reproducible deployment; Infrastructure is created by code.",
      "There is SLO, tested alert, restored backup and critical incident runbook.",
      "Documentation describes architecture, trade-offs, risks, costs and future evolution."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.14 Deliverables, demonstration and evaluation",
    "id": "40-14-deliverables-demonstration-and-evaluation"
  },
  {
    "kind": "paragraph",
    "text": "The final package must contain a context diagram, container diagram, authentication and payment flows, OpenAPI contracts, .proto files if used, event model, ADRs, threat model, manifests or charts, infrastructure as code, pipelines, dashboards, alerts, runbooks and test reports. Isolated captures do not replace versioned artifacts."
  },
  {
    "kind": "paragraph",
    "text": "The suggested demonstration lasts fifteen to twenty minutes. First, introduce the problem and the architecture. Then perform an authorized journey, a blocked attempt, an idempotent retry, and an event consumption. Then, inject a fault, browse metrics and traces, apply recovery, and show the final state. Close with limitations and next steps."
  },
  {
    "kind": "paragraph",
    "text": "The assessment must balance functionality, security, reliability, observability, automation and clarity. A smaller but coherent and well-tested solution is worth more than an extensive architecture without evidence. Conscious decisions not to use a certain technology are also valid when justified."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Suggested rubric for evaluating the final project.",
    "headers": [
      "Dimension",
      "Suggested weight",
      "Assessment question"
    ],
    "rows": [
      [
        "Architecture and contracts",
        "20%",
        "Are the boundaries and interfaces coherent?"
      ],
      [
        "Security and privacy",
        "20%",
        "Are identities, data and secrets protected?"
      ],
      [
        "Reliability and data",
        "20%",
        "Are failures, duplicates and recovery handled?"
      ],
      [
        "Operation and observability",
        "20%",
        "Is it possible to detect, explain and respond?"
      ],
      [
        "Automation and documentation",
        "20%",
        "Can another team reproduce and maintain it?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "40.15 Troubleshooting and final labs",
    "id": "40-15-troubleshooting-and-final-labs"
  },
  {
    "kind": "paragraph",
    "text": "The final laboratory must cause failures at different layers: incorrect DNS, untrusted certificate, token with wrong audience, poorly ordered gateway policy, backend timeout, Pod without readiness, unavailable broker and consumer with lag. For each case, write hypothesis, evidence, confirmatory test, and correction. The goal is to demonstrate method, not just quickly find the answer."
  },
  {
    "kind": "paragraph",
    "text": "A second sequence must test abuse and limits: payload above permitted, invalid enum, BOLA, payment repetition, request burst, secret exposed in log and slow query. Record how gateway, backend, banking, and observability respond. Defenses need to fail safely and produce sufficient signal for operation."
  },
  {
    "kind": "paragraph",
    "text": "As an evolution, the project can receive GraphQL for channel composition, gRPC between services, WebSocket for notifications, multi-cluster, active-active, Open Finance or adaptive Zero Trust policies. Each extension must preserve the course principle: understand responsibilities, contracts, risks and evidence before adding complexity."
  },
  {
    "kind": "paragraph",
    "text": "Course closure An API platform is a socio-technical system: protocols, code, infrastructure, security, operations, governance and people need to work together. The final project is successful when it makes these relationships explicit and demonstrable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Final delivery checklist",
    "id": "final-delivery-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Scenario, scope, constraints and requirements are documented.",
      "Architecture has updated diagrams and ADRs.",
      "APIs, events and errors have versioned contracts.",
      "Identities, scopes, consents and authorization rules are explicit.",
      "Gateway and policies are in code, tested, and observable.",
      "Idempotence, Outbox, Inbox, retries and DLQ were exercised.",
      "Kubernetes has security, probes, resources, rollout, and network policies.",
      "Logs, metrics, traces, SLOs and alerts were demonstrated.",
      "Pipelines, IaC, SBOM and rollback strategy are available.",
      "Backup, restore, failover and runbooks have been tested.",
      "Personal data is fictitious, minimized and protected.",
      "The demo can be run by someone else using the documentation."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Consolidation Exercises",
    "id": "consolidation-exercises"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Design the minimal architecture and identify all trust boundaries.",
      "Define scopes and object authorization rules for customers, accounts, and payments.",
      "Model the state of a payment and indicate where idempotence is applied.",
      "Write the PaymentUpdated event contract and evolution policy.",
      "Propose SLOs and alerts for inquiries and payment initiation.",
      "Define one failure that should result in 502, another in 503, and another in 504.",
      "Create a rollback plan for an incompatible API version.",
      "Describe how to restore the bank and reconcile events after disaster.",
      "List which controls belong to the gateway, the backend, the mesh, and the platform.",
      "Present three future extensions and the operating cost of each."
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
    "caption": "Table 8 - Essential vocabulary of the final project.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "ADR",
        "Record of an architectural decision, context, alternatives and consequences."
      ],
      [
        "golden path",
        "Standardized and supported way to build and operate services."
      ],
      [
        "Idempotency Key",
        "Identifier used to repeat a command without duplicating its effect."
      ],
      [
        "Outbox",
        "Pattern that records state and event in the same local transaction."
      ],
      [
        "PDP/PEP",
        "Decision components and application of access policies."
      ],
      [
        "RPO/RTO",
        "Limits on data loss and recovery time."
      ],
      [
        "SLI/SLO",
        "Measured and objective indicator of reliability."
      ],
      [
        "SBOM",
        "Inventory of software components present in an artifact."
      ],
      [
        "threat model",
        "Analysis of assets, threats, surfaces and controls."
      ],
      [
        "Trace Context",
        "Distributed tracing context propagation pattern."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical references for execution",
    "id": "technical-references-for-execution"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "OpenAPI Initiative. OpenAPI Specification 3.1.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. OAuth 2.0, PKCE and OAuth 2.0 Security Best Current Practice.",
      "OpenID Foundation. OpenID Connect Core.",
      "OWASP. API Security Top 10 and Application Security Verification Standard.",
      "Kubernetes Documentation. Workloads, Services, Security and API Gateway.",
      "OpenTelemetry Documentation. Signals, Collector and Semantic Conventions.",
      "NIST SP 800-207. Zero Trust Architecture.",
      "NIST Secure Software Development Framework.",
      "Official documentation from the chosen gateway, broker, bank and identity provider."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Final note Tools and services change; the evaluated principles remain. Register versions, validate the official documentation of the environment used and preserve scripts and evidence so that the project remains reproducible."
  }
];
