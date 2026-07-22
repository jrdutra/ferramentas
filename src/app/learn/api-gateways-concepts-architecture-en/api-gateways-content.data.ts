import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const API_GATEWAYS_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "From consumer to backend: Centralized control across the API path"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/overview.svg",
    "alt": "API Gateway mediating consumers, edge, policies and backend services",
    "caption": "Opening figure - API Gateway occupies a mediating position between consumers and backends."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The gateway divides a call into two independent relationships: consumer-gateway and gateway-backend."
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
    "text": "The previous chapters built the necessary foundations to understand how an API Gateway actually works. Addressing, DNS, TCP, HTTP, TLS, certificates, authentication, authorization, OAuth, OpenID Connect, JWT, SAML and federation are not peripheral topics to the gateway: they are mechanisms that it frequently terminates, validates, transforms, registers or forwards. This chapter brings this knowledge together into a coherent architecture."
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway is often presented as a simple box that sits in front of services. This representation is useful in high-level diagrams, but insufficient for operation. In practice, the gateway maintains listeners, terminates connections, selects APIs, executes policies, queries repositories, applies limits, creates connections with backends, transforms messages and produces telemetry. Each call goes through different states, and a failure can happen before any business code is executed."
  },
  {
    "kind": "paragraph",
    "text": "The architecture also includes elements that do not directly participate in each request. Control planes distribute configurations, management planes organize the life cycle, portals serve developers, banks store metadata and analytical components aggregate events. A robust design needs to distinguish these plans and decide how the runtime behaves when some management component is unavailable."
  },
  {
    "kind": "paragraph",
    "text": "The goal of this chapter is to provide a complete, product-independent mental model. Concepts will be related to architectures found in commercial gateways, managed services, programmable proxies and hybrid platforms. The next chapters will go into policies, Axway API Gateway and Azure API Management; Therefore, this material emphasizes responsibilities, boundaries, and architectural decisions that remain valid across different implementations."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Follow each section by drawing two arrows: consumer to gateway and gateway to backend. For each arrow, record DNS, IP, port, TLS, protocol, timeout, identity, and telemetry. This separation avoids attributing to the backend a failure that occurred in the listener or attributing to the consumer a failure created in the output segment."
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
      "Define API Gateway and differentiate it from proxy, load balancer, WAF, ingress controller and service mesh.",
      "Explain the separation between data plane, control plane, management plane and developer plane.",
      "Describe the complete cycle of a request from listener to backend and response.",
      "Understand routing, policies, transformation, authentication, quotas, caching and observability.",
      "Compare centralized, domain, layered, regional, hybrid, and managed topologies.",
      "Design high availability, fault tolerance, configuration consistency and operational continuity.",
      "Relate TLS, mTLS, certificates, connection pools, health checks, retries and circuit breakers to the gateway.",
      "Analyze multitenancy, isolation, governance and API lifecycle.",
      "Scale capacity based on connections, throughput, latency, CPU, memory, and external dependencies.",
      "Diagnose failures by stage and build correlated evidence between consumer, gateway and backend."
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
      "21.1 What is an API Gateway",
      "21.2 What an API Gateway is not",
      "21.3 Data, control, management and developer plans",
      "21.4 Anatomy of a request at the gateway",
      "21.5 Listeners, virtual hosts and API selection",
      "21.6 Policy engine and processing chain",
      "21.7 Routing, discovery and connectivity with backends",
      "21.8 Security at entry and exit",
      "21.9 Traffic control, protection and caching",
      "21.10 Topologies and deployment models",
      "21.11 High availability and consistency",
      "21.12 State, sessions and external dependencies",
      "21.13 Observability, auditing and correlation",
      "21.14 Governance, portal and lifecycle",
      "21.15 Performance and capacity planning",
      "21.16 Faults, antipatterns and troubleshooting",
      "21.17 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.1 What is an API Gateway",
    "id": "21-1-what-is-an-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway is a mediation component that receives calls from consumers on a controlled set of endpoints and routes them to backend services according to security, traffic, transformation, and routing rules. It serves as a policy enforcement point in the message path. Centralizing controls reduces duplication between services, improves consistency, and allows backends to be protected from direct exposure."
  },
  {
    "kind": "paragraph",
    "text": "The word gateway indicates context change. The component doesn't just forward bytes; it can terminate a TLS connection, interpret HTTP, validate credentials, convert an external identity to internal context, select an API version, transform headers, call an authorization service, and create a new connection to the backend. Therefore, consumer-gateway and gateway-backend are independent relationships."
  },
  {
    "kind": "paragraph",
    "text": "In terms of architecture, the gateway acts mainly on the data plane. With each request, it makes decisions based on published configuration and runtime data. These decisions need to be fast, deterministic and observable. The gateway should not rely on a slow remote call for every simple policy, nor should it become a single point of failure that blocks the entire platform."
  },
  {
    "kind": "paragraph",
    "text": "An API platform can include multiple gateways. An external gateway protects public APIs; another serves internal integrations; a third is in a specific region; Dedicated gateways can be used by regulated domains. The definition is functional: all are points of mediation and policy, even though the products, topologies and responsibilities vary."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "The gateway is not just an address. It is a runtime that transforms an incoming call into a policy decision and a new call to a selected destination."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.2 What an API Gateway is not",
    "id": "21-2-what-an-api-gateway-is-not"
  },
  {
    "kind": "paragraph",
    "text": "A reverse proxy accepts connections on behalf of upstream servers and forwards messages. Every API Gateway runs some form of reverse proxy, but not every reverse proxy offers cataloging, publishing, subscription, analytics, delegated authentication, or lifecycle governance. The gateway concept adds a layer of product and policy on top of basic intermediation."
  },
  {
    "kind": "paragraph",
    "text": "A load balancer distributes connections or requests among eligible destinations. The gateway can also balance backends, but its role is not limited to that. It comprises the API, consumer identity, called operation, and associated policies. An L4 balancer can choose an instance without interpreting HTTP; a gateway typically operates at L7, although it depends on surrounding L4 components."
  },
  {
    "kind": "paragraph",
    "text": "A WAF looks for attack patterns in web traffic. It complements the gateway, but does not replace business authorization, token validation, application quotas or contract transformation. An ingress controller publishes services from a Kubernetes cluster and can have gateway capabilities; A service mesh controls traffic between workloads and can have ingress and egress gateways. Boundaries overlap, but governance and exposure responsibilities need to remain clear."
  },
  {
    "kind": "paragraph",
    "text": "Finally, the gateway must not become a backend in disguise. When domain logic, complex business rules, and extensive orchestrations are rolled up into policies, the platform becomes difficult to test, version, and evolve. The gateway must perform mediation and cross-cutting controls; the logic that defines the business continues to belong to the responsible services."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Close concepts should not be treated as synonyms.",
    "headers": [
      "Component",
      "Main responsibility",
      "Relationship with the gateway"
    ],
    "rows": [
      [
        "reverse proxy",
        "Terminate and recreate connections to upstreams.",
        "It is a base capability of the gateway."
      ],
      [
        "load balancer",
        "Distribute flow between destinations.",
        "It can exist before, inside or after the gateway."
      ],
      [
        "WAF",
        "Detect and block generic web attacks.",
        "Complements specific API policies."
      ],
      [
        "Ingress controller",
        "Publish services from a cluster.",
        "You can implement or integrate a gateway."
      ],
      [
        "Service mesh",
        "Control communication between workloads.",
        "Complements the gateway in the internal mesh."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.3 Data, control, management and developer plans",
    "id": "21-3-data-control-management-and-developer-plans"
  },
  {
    "kind": "paragraph",
    "text": "The data plane is the set of runtimes that process traffic. It maintains listeners, connections, route tables, compiled policies, caches, and upstream pools. Your priority is availability and low latency. A problem in the portal or configuration database should not interrupt already published calls, as long as the runtime has a valid and sufficient copy of the configuration."
  },
  {
    "kind": "paragraph",
    "text": "The control plane transforms intention into distributed configuration. It receives definitions of APIs, policies, certificates, endpoints and parameters, validates consistency and publishes state to the runtimes. Depending on the platform, this distribution occurs via push, pull, shared database, files, administrative APIs or dynamic configuration mechanisms. The design needs to handle versioning, application confirmation and rollback."
  },
  {
    "kind": "paragraph",
    "text": "The management plan concentrates administrative and governance operations: creation of APIs, environment control, administrative RBAC, auditing, catalog, reports and CI/CD automation. The developer plan serves consumers and producers through a portal, documentation, credentials, products, plans and analytics. These plans may be on the same product, but have different security and availability requirements."
  },
  {
    "kind": "paragraph",
    "text": "Separation protects the runtime from excessive coupling. It also improves security: the administrative interface does not need to be exposed on the same network or port as API traffic. In regulated environments, changes to the control plane may require approval, artifact signing, segregation of duties and an auditable trail before reaching the data plane."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/figure-01-platform-planes.svg",
    "alt": "Data, control, management and developer plans for an API platform",
    "caption": "Figure 1 - The API platform has plans with different responsibilities and criticalities."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.4 Anatomy of a request at the gateway",
    "id": "21-4-anatomy-of-a-request-at-the-gateway"
  },
  {
    "kind": "paragraph",
    "text": "The journey starts before the gateway. The consumer resolves a name, selects an address, establishes TCP or QUIC, and negotiates TLS. A balancer or front door can receive the connection before the gateway. When the runtime finally accepts the message, it needs to associate it with a listener and an API definition based on SNI, Host, method, path, headers, or other properties."
  },
  {
    "kind": "paragraph",
    "text": "After selection, the gateway runs a chain of processing. Some steps are common: size and format validation, authentication, authorization, quotas, transformation, enrichment, routing, and observability. Order matters. Applying a transformation before validating signature may change protected content; consulting a backend before authorizing can leak information due to response time; Registering payloads before masking data may violate privacy."
  },
  {
    "kind": "paragraph",
    "text": "In the output leg, the gateway resolves the backend name, chooses route and source address, opens or reuses a connection, negotiates TLS and sends the transformed request. The response traverses return policies, can be converted, filtered, cached, and logged. Only then is it returned via the input connection. The two sides may use different versions of HTTP, different certificates, and different timeouts."
  },
  {
    "kind": "paragraph",
    "text": "An operational architecture must make this sequence visible. Logs with only final status do not tell you where the failure occurred. The runtime needs to expose stage, policy, route ID, chosen upstream, connection time, response time and rejection reason without revealing secrets."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/figure-02-request-pipeline.svg",
    "alt": "Pipeline for processing a request in API Gateway",
    "caption": "Figure 2 - A call is processed by stages that can accept, transform, forward or interrupt the flow."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.5 Listeners, virtual hosts and API selection",
    "id": "21-5-listeners-virtual-hosts-and-api-selection"
  },
  {
    "kind": "paragraph",
    "text": "A listener associates the runtime with addresses and ports on which it will accept connections. It can listen on a specific IP, on all interfaces, or on virtual addresses provided by a load balancer. The listener defines allowed protocols, TLS versions, certificates, connection limits, and HTTP options. Misconfiguration can make the API appear unavailable even when the policies are correct."
  },
  {
    "kind": "paragraph",
    "text": "Virtual hosts allow multiple APIs to share an address and port, differentiated by name. In HTTPS, SNI participates in certificate selection during the TLS handshake; then, the Host header or HTTP authority identifies the logical destination of the request. SNI and Host usually coincide, but they are not the same object. Mismatches can cause incorrect certificate, unexpected routing, or security rejection."
  },
  {
    "kind": "paragraph",
    "text": "API selection usually uses method and path after choosing the host. Rules need to be deterministic. Overlapping paths, wide wildcards, ambiguous versions, and trailing slash differences can route a call to the wrong policy. It is recommended to test the route table as a contract, including negative cases and conflicts."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must also normalize inputs carefully. URL decoding, handling of duplicate slashes, case sensitivity and header normalization can affect security. If the gateway and backend interpret the path differently, an attacker can exploit the discrepancy to bypass authorization or caching."
  },
  {
    "kind": "subhead",
    "text": "API Selection Conceptual Example"
  },
  {
    "kind": "paragraph",
    "text": "Input received SNI: api.empresa.example Host: api.empresa.example Method: GET Path: /clientes/v2/123 Logical selection Listener HTTPS 443 Virtual host api.empresa.example API cliente-v2 Operation get-client"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.6 Policy engine and processing chain",
    "id": "21-6-policy-engine-and-processing-chain"
  },
  {
    "kind": "paragraph",
    "text": "The policy engine is the part of the gateway that evaluates rules about the request and response. A policy can be declarative, such as validating JWT with a specific issuer and audience, or procedural, such as executing a script. Different products use graphical flows, XML, YAML, proprietary languages, or threaded filters. Regardless of the form, the policy needs to have known inputs, outputs, failures, and side effects."
  },
  {
    "kind": "paragraph",
    "text": "Cross-cutting policies include authentication, authorization, rate limiting, quotas, CORS, schema validation, transformation, masking, caching, routing, retries and logging. The execution order must be designed. For example, authentication typically precedes per-consumer quotas; size validation must occur before expensive parsing; Log sanitization must occur before issuing the audit event."
  },
  {
    "kind": "paragraph",
    "text": "The gateway needs to distinguish between technical failures and business decisions. An invalid signature can generate 401; insufficient_scope, 403; limit exceeded, 429; backend unavailable, 503; connection or protocol error, 502. Standardized responses improve customer experience and observability, but should not hide the internal cause in administrative logs."
  },
  {
    "kind": "paragraph",
    "text": "Scripts and extensions offer flexibility but increase risk. Arbitrary code can block threads, consume memory, leak secrets, or create dependencies that are difficult to govern. Prefer native and declarative capabilities for common controls; Use extensions only when there is a review, testing, limits and maintenance strategy."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Policies need to be evaluated by operational effect, not just functionality.",
    "headers": [
      "Category",
      "Examples",
      "Architecture question"
    ],
    "rows": [
      [
        "Security",
        "JWT, mTLS, API Key, authorization.",
        "Is the decision local or does it depend on an external service?"
      ],
      [
        "Traffic",
        "Rate limit, quota, spike arrest.",
        "Is the state per node, cluster, or global service?"
      ],
      [
        "Mediation",
        "Headers, JSON/XML, versioning.",
        "Does the transformation preserve semantics and signature?"
      ],
      [
        "Resilience",
        "Timeout, retry, circuit breaker.",
        "Is the operation idempotent and safe to repeat?"
      ],
      [
        "Observability",
        "Logs, metrics, traces, auditing.",
        "How to correlate inbound and outbound?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.7 Routing, discovery and connectivity with backends",
    "id": "21-7-routing-discovery-and-connectivity-with-backends"
  },
  {
    "kind": "paragraph",
    "text": "Routing turns the logical API into a physical destination. The destination can be a fixed URL, a pool of servers, a DNS-discovered service, a private endpoint, a Kubernetes cluster, or a managed function. The gateway must decide how to resolve names, how long to cache responses, when to reevaluate endpoints, and how to react to health changes."
  },
  {
    "kind": "paragraph",
    "text": "The connection to the backend is independent of the incoming connection. The gateway uses a source address and port, possibly subject to SNAT, allowlists, and port exhaustion. It can reuse connections by pooling, negotiate HTTP/2, send SNI different from the Host and present client certificate in mTLS. All these details need to be aligned with the backend's expectations."
  },
  {
    "kind": "paragraph",
    "text": "Health checks indicate whether a destination is eligible, but do not guarantee that all operations will work. A cursory test on /health may return success while critical dependencies are unavailable. Readiness must represent real capacity to receive traffic. Draining is necessary during deployments to prevent new requests from being sent to a terminating instance."
  },
  {
    "kind": "paragraph",
    "text": "Retries and circuit breakers improve resilience when applied carefully. Automatically repeating a non-idempotent operation may duplicate payment or resource creation. The gateway needs to consider method, idempotency key, failure stage and remaining budget time. Circuit breakers must protect the system without transforming a local problem into prolonged unavailability due to aggressive configuration."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Outbound connectivity concentrates most of the 502 and 503 problems.",
    "headers": [
      "Element",
      "Function",
      "Typical failure"
    ],
    "rows": [
      [
        "dns/discovery",
        "Find current endpoints.",
        "Stale cache or missing private resolution."
      ],
      [
        "Connection pool",
        "Reuse transportation and reduce handshakes.",
        "Idle connections closed by the peer."
      ],
      [
        "Health check",
        "Remove incapable targets.",
        "False positive due to superficial test."
      ],
      [
        "Retry",
        "Recover transient failures.",
        "Duplication or storm of calls."
      ],
      [
        "circuit breaker",
        "Contain persistent failures.",
        "Improper opening or slow recovery."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.8 Security at entry and exit",
    "id": "21-8-security-at-entry-and-exit"
  },
  {
    "kind": "paragraph",
    "text": "On entry, the gateway typically terminates TLS, validates the server's certificate, and in mTLS, verifies the client's certificate. It then interprets application mechanisms such as Basic Auth, API Key, OAuth access token, JWT or SAML converted by a broker. Authentication identifies the principal; authorization decides whether it can call the operation and access the requested resource."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must not automatically trust identity headers received from the Internet. Headers such as X-User, X-Roles or X-Client-ID need to be removed or overwritten before propagating internal context. Otherwise, the consumer may forge identity. The trusted context must arise from a validated mechanism and be protected in the output segment, preferably by TLS and authentication between workloads."
  },
  {
    "kind": "paragraph",
    "text": "At the exit, the gateway can present its own identity to the backend using mTLS, managed identity, token exchange or technical credential. This identity represents the gateway or consumer application, depending on the model. Preserving only a generic identity simplifies integration, but can reduce fine-grained auditing and authorization. Propagating the original token increases context, but exposes the backend to external semantics and can expand the trust surface."
  },
  {
    "kind": "paragraph",
    "text": "Secrets, keys and certificates must be obtained from appropriate repositories, rotated and audited. Clear text configuration, Authorization logs, and unrestricted export of private keys are serious flaws. The runtime needs to continue operating during rotations, accepting controlled periods of overlap when necessary."
  },
  {
    "kind": "subhead",
    "text": "Trust boundary"
  },
  {
    "kind": "paragraph",
    "text": "The gateway protects the backend only when direct access is blocked or tightly controlled. If the service continues to be exposed via another route, gateway policies can be bypassed."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.9 Traffic control, protection and caching",
    "id": "21-9-traffic-control-protection-and-caching"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting controls the speed of calls within a window; quota controls accumulated consumption in a period; throttling describes the reduction or rejection of traffic when thresholds are reached; spike arrest smoothes spikes. Terms vary between products, but the architecture needs to define counting key, granularity, state storage, and behavior when the counting service fails."
  },
  {
    "kind": "paragraph",
    "text": "Counting by IP address is insufficient in environments with NAT and proxies. Counting by application ID, subscription, subject, tenant or operation produces control that is more aligned with the contract. In clusters, local limits per node may allow for higher-than-expected aggregate consumption. Global limits require distributed coordination and add latency and dependency."
  },
  {
    "kind": "paragraph",
    "text": "Caching reduces latency and load, but needs to respect HTTP semantics, identity and privacy. The cache key can include method, URL, query, negotiation headers, and consumer context. Storing custom response without varying by user can leak data. The gateway must also define invalidation, TTL, error handling, and behavior during backend unavailability."
  },
  {
    "kind": "paragraph",
    "text": "Size, timeout, parsing, and concurrency protections must occur before expensive operations. Too low thresholds break valid cases; Very high limits allow memory and CPU abuse. The platform must publish values, measure bounces and adjust based on real traffic."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Traffic controls depend on key, state and semantics.",
    "headers": [
      "Control",
      "Possible key",
      "Important decision"
    ],
    "rows": [
      [
        "Rate limit",
        "client + API + operation.",
        "Fixed, sliding or token bucket window."
      ],
      [
        "Quota",
        "subscription + period.",
        "Behavior when reaching the total."
      ],
      [
        "Competition",
        "backend + route.",
        "Queue, bounce or backpressure."
      ],
      [
        "Cache",
        "URI + headers + identity.",
        "Variation, TTL and sensitive data."
      ],
      [
        "Payload",
        "operation + content-type.",
        "Size before and after decompression."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.10 Topologies and deployment models",
    "id": "21-10-topologies-and-deployment-models"
  },
  {
    "kind": "paragraph",
    "text": "In the centralized topology, a shared cluster publishes APIs from multiple areas. The model simplifies governance and operations, but can create a change queue, wide blast radius, and common capacity limits. The platform needs multitenancy, configuration isolation, and clear processes to prevent one team from impacting another."
  },
  {
    "kind": "paragraph",
    "text": "Gateways by domain or product bring ownership closer to the runtime and reduce blast radius. On the other hand, they increase the number of instances, costs, updating and risk of divergent standards. A federated model can combine a central standards and automation platform with runtimes delegated to domains."
  },
  {
    "kind": "paragraph",
    "text": "Layered architectures use external gateway at the edge and internal gateways close to services. The external layer concentrates protection against the Internet, partner identity and public contracts; the internal one controls traffic between zones and domains. It is necessary to avoid duplication of policies and accumulated latency. Each layer must have explicit responsibility."
  },
  {
    "kind": "paragraph",
    "text": "Managed models transfer operation of part of the infrastructure to the provider. Self-hosted models offer greater network control and customization. Hybrid architectures maintain central control plane and data plane in data centers, clusters or private regions. The choice depends on connectivity, sovereignty, latency, compliance, staffing and continuity requirements."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/figure-03-gateway-topologies.svg",
    "alt": "Centralized, per-domain, tiered, and hybrid API Gateway topologies",
    "caption": "Figure 3 - The topology must balance centralization, autonomy, isolation and operational cost."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.11 High availability and consistency",
    "id": "21-11-high-availability-and-consistency"
  },
  {
    "kind": "paragraph",
    "text": "High availability starts with the data plane. Multiple instances must receive traffic via load balancer or equivalent routing. Instances need to be replaceable, with local minimum state and reproducible configuration. The loss of a node cannot interrupt the entire service or require prolonged manual recovery."
  },
  {
    "kind": "paragraph",
    "text": "The control plane also needs to be resilient, but its unavailability can have a different impact. If the gateways already have a valid configuration, they can continue processing calls while new publications are blocked. This degraded mode is desirable. The risk arises when the runtime consults the control plane on every request or does not maintain sufficient local configuration."
  },
  {
    "kind": "paragraph",
    "text": "Configuration distribution needs versioning and confirmation. A partial post may leave us with different policies. The system must identify the active version in each instance, reject invalid artifacts, apply changes atomically when possible and allow rollback. Configuration canary reduces risk by exposing a small portion of traffic before full propagation."
  },
  {
    "kind": "paragraph",
    "text": "Regional high availability requires deciding on DNS, global traffic, key replication, quotas, caches and subscription data. Active-active increases capacity and reduces recovery time, but requires consistency and prevention of double counting. Active-passive simplifies some states, but requires frequent testing so that the passive environment is truly ready."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/figure-04-high-availability.svg",
    "alt": "High availability data plane and control plane architecture",
    "caption": "Figure 4 - Runtime continuity should not depend on a single instance or the administrative portal."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.12 State, sessions and external dependencies",
    "id": "21-12-state-sessions-and-external-dependencies"
  },
  {
    "kind": "paragraph",
    "text": "Gateways work best when request processing is predominantly stateless. However, several policies introduce state: quotas, distributed rate limits, caches, sessions, nonces, revocation lists and circuit breakers. The architecture needs to identify where this state lives, how it is replicated, what consistency is required, and what happens when the repository becomes unavailable."
  },
  {
    "kind": "paragraph",
    "text": "External dependencies include identity providers, introspection endpoints, PDPs, banks, secret services, DNS, PKI, and analytics systems. Calling a remote service on every request increases latency and composite availability. Controlled caches, local JWT validation, precompiled decisions, and short timeouts can reduce risk, as long as revocation and updating are considered."
  },
  {
    "kind": "paragraph",
    "text": "The failure policy needs to be explicit. Fail-open allows traffic when a control is unavailable; fail-closed blocks. For authorization and credential validation, fail-closed is often necessary. For non-critical telemetry, the runtime can store events temporarily or discard them in a controlled way to preserve availability. There is no single rule; there is a criticality classification."
  },
  {
    "kind": "paragraph",
    "text": "Gateway sessions should be avoided when they are not necessary. Affinity can reduce scaling flexibility and make recovery difficult. When a protocol requires connection state, such as WebSocket, this state must be treated as an explicit part of the architecture, with draining, reconnection and event distribution."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Each external dependency increases the gateway's composite availability.",
    "headers": [
      "Dependency",
      "Usage",
      "Resilience strategy"
    ],
    "rows": [
      [
        "IdP/JWKS",
        "Validate tokens and keys.",
        "Cache with controlled refresh and rotation."
      ],
      [
        "PDP",
        "Authorization decision.",
        "Short timeout, caching at risk and fail-closed."
      ],
      [
        "Redis/counter",
        "Global quotas and rate limits.",
        "Cluster, known degradation and metrics."
      ],
      [
        "secret store",
        "Credentials and certificates.",
        "Secure cache, rotation and minimal access."
      ],
      [
        "Analytics",
        "Events and reports.",
        "Asynchronous buffering and backpressure."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.13 Observability, auditing and correlation",
    "id": "21-13-observability-auditing-and-correlation"
  },
  {
    "kind": "paragraph",
    "text": "Gateway observability needs to show what happened at each leg. Inbound metrics measure connections, requests, status and latency perceived by the consumer. Outbound metrics measure resolution, connection, handshake, time to first byte, and backend response. The difference between the two helps identify policy costs and internal waiting."
  },
  {
    "kind": "paragraph",
    "text": "Logs must record timestamp, API, operation, version, consumer, identity, failure policy, route ID, upstream, status and relevant times. Secrets and personal data need to be masked. The gateway should not register Authorization, cookies or full payload by default. Administrative auditing must be separate from access logs and record who changed configuration, what changed and when it came into effect."
  },
  {
    "kind": "paragraph",
    "text": "Distributed tracing connects consumer, gateway and backend. The gateway must preserve or generate trace context according to the organization's policy, creating spans for internal processing and outbound calls. When multiple proxies exist, each layer needs to contribute without overwriting the correlation. Proprietary request IDs can still be useful, but they must coexist with tracing standards."
  },
  {
    "kind": "paragraph",
    "text": "Cardinality is a risk. Placing subject, full URL or query values in metric labels can explode time series and cost. High cardinality data belongs to logs or traces. Metrics must use controlled dimensions such as API, operation, status class, region, and backend pool."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateways-architecture/en/figure-05-observability.svg",
    "alt": "Correlation and observability between inbound and outbound gateway connections",
    "caption": "Figure 5 - The correlation needs to accompany the call on the two connections maintained by the gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.14 Governance, portal and lifecycle",
    "id": "21-14-governance-portal-and-lifecycle"
  },
  {
    "kind": "paragraph",
    "text": "The gateway is part of a platform, not the complete lifecycle. Producers need to register APIs, publish contracts, define ownership, environments, versions, products and policies. Consumers need to discover documentation, request access, obtain credentials and track consumption. The developer portal materializes part of this relationship, but depends on reliable processes and data."
  },
  {
    "kind": "paragraph",
    "text": "Governance must be automated in the pipeline. OpenAPI, policies, certificates, backend configurations, and tests can be versioned as code. Linting, security validation, contract diff, and cross-environment promotion reduce manual changes. The gateway administrative interface should not be the only place where the truth exists."
  },
  {
    "kind": "paragraph",
    "text": "The life cycle includes draft, review, publication, operation, depreciation, and retirement. The gateway needs to allow coexistence of versions, sunset communication and measurement of still active consumers. Removing a route without telemetry and without a migration plan turns governance into unavailability."
  },
  {
    "kind": "paragraph",
    "text": "Products and plans group APIs with business or operational rules. A subscription can link consumer, credential, quota and set of operations. These objects need ownership, expiration, rotation and auditing. Orphaned credentials are as significant a risk as orphaned APIs."
  },
  {
    "kind": "subhead",
    "text": "Practical governance"
  },
  {
    "kind": "paragraph",
    "text": "The configuration published on the gateway must be pipeline-reproducible, peer-reviewable, and associated with a contract. Exclusively manual changes make auditing, rollback and consistency between environments difficult."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.15 Performance and capacity planning",
    "id": "21-15-performance-and-capacity-planning"
  },
  {
    "kind": "paragraph",
    "text": "Gateway performance cannot be summarized in requests per second. The cost depends on payload size, TLS, cryptographic algorithm, number of policies, transformations, external calls, logging, compression, protocols and backend latency. Two APIs with the same RPS can consume very different resources."
  },
  {
    "kind": "paragraph",
    "text": "Connections are a dimension of their own. A gateway can receive many short connections, few multiplexed HTTP/2 connections, or thousands of persistent WebSockets. Limits on file descriptors, buffers, ephemeral ports, pools and timeouts need to be dimensioned. The CPU may run low as the system exhausts sockets or buffer memory."
  },
  {
    "kind": "paragraph",
    "text": "Load tests must reproduce real distribution of operations, authentication, sizes, errors and think time. Testing just a simple route in a loop gives you a lab number, not production capacity. It is necessary to observe percentiles of latency, saturation, queues, retransmissions, garbage collection, connections and external dependencies."
  },
  {
    "kind": "paragraph",
    "text": "Planning includes headroom for failures. If the cluster only supports normal load with all nodes, losing one instance causes saturation. Capacity must consider maintenance, deployment, peaking, growth and regional failover. Autoscaling helps, but has delay; the system needs to survive until new instances are ready and warmed up."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Capacity is multidimensional and needs representative testing.",
    "headers": [
      "Dimension",
      "Indicators",
      "Capacity question"
    ],
    "rows": [
      [
        "Traffic",
        "RPS, bytes/s, operations.",
        "What is the actual call mix?"
      ],
      [
        "Connections",
        "active, new/s, reuse.",
        "Is there pooling, HTTP/2 or WebSocket?"
      ],
      [
        "CPU",
        "encryption, parsing, scripting.",
        "Which policies dominate the cost?"
      ],
      [
        "Memory",
        "buffers, cache, payloads.",
        "What is the worst simultaneous size?"
      ],
      [
        "Dependencies",
        "latency and external error.",
        "Does the gateway saturate waiting for third parties?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.16 Faults, antipatterns and troubleshooting",
    "id": "21-16-faults-antipatterns-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "A 404 error can be produced because the host did not match, the route was not found, the version does not exist, or the backend returned 404. A 401 could come from the gateway, the IdP, a custom policy, or the service. A 502 typically indicates failure to talk to upstream, but may involve invalid DNS, TCP, TLS, HTTP, or a closed connection. The investigation needs to locate the sender of the response."
  },
  {
    "kind": "paragraph",
    "text": "The most common antipattern is to treat the gateway as an opaque box. Without stage metrics and access to correlated logs, teams change policies, timeouts, and backends by trial. Another anti-pattern is to accumulate business logic at the gateway, creating long and fragile flows. It is also dangerous to publish all APIs to a cluster without isolation or fault containment capabilities."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting must follow layers. First confirm DNS and address. Then TCP connection, TLS, listener and API selection. Then examine authentication, authorization, quotas, and transformations. Only then investigate route, backend DNS, outgoing connection and upstream response. The capture needs to indicate the observation point, because the IP and port change when traversing the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Configuration changes are a major source of incidents. Record active version, publication time and difference from the previous version. If only a few nodes are in error, suspect partial propagation, cache, or local state. If the problem appears after certificate rotation, check truststores, chains, SNI and validity overlap."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The final code is just the beginning of the diagnosis.",
    "headers": [
      "Symptom",
      "Steps to check",
      "Useful evidence"
    ],
    "rows": [
      [
        "Connection refused",
        "listener, firewall, IP/port.",
        "SYN/RST, listening socket, node health."
      ],
      [
        "TLS handshake failed",
        "certificate, SNI, trust, version.",
        "TLS alert and string presented."
      ],
      [
        "401 / 403",
        "credential, claims, policy and PDP.",
        "issuer, audience, scope and policy ID."
      ],
      [
        "429",
        "count key and state.",
        "counter, window, node and consumer."
      ],
      [
        "502/503",
        "route, DNS, pool, connect and health.",
        "chosen upstream and outbound times."
      ],
      [
        "High latency",
        "queue, foreign policy, backend.",
        "spans and time decomposition."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Operational troubleshooting checklist"
  },
  {
    "kind": "paragraph",
    "text": "Minimum diagnostic route 1. Resolve name and confirm destination. 2. Test TCP and TLS up to the listener. 3. Confirm host, method, path and selected API. 4. Identify policy that you accepted or rejected. 5. Confirm chosen route and upstream. 6. Measure DNS, connect, TLS and backend time. 7. Correlate response with configuration version."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "21.17 Case studies and labs",
    "id": "21-17-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - External and internal gateway: an institution exposes APIs to partners through an edge gateway and forwards calls to an internal gateway close to the services. The external gateway validates partner certificate and access token; the internal one applies authorization by domain and routes to private backends. The design works when each layer has distinct responsibility and the correlation crosses both."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - Partial configuration: After a publish, half of the calls return 401. The balancer distributes traffic between four nodes, but two did not receive the new JWKS key. The configuration version recorded per instance reveals the divergence. The incident demonstrates the need for atomic publishing, commit, and configuration health, not just process health."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - Output exhaustion: the gateway receives traffic normally, but starts to return 502 in spikes. CPU and memory are stable. Socket metrics show a large number of short connections and ports in TIME_WAIT due to the absence of pooling. Adjusting keep-alive, limits and SNAT strategy resolves the cause, which was not in HTTP policies."
  },
  {
    "kind": "paragraph",
    "text": "Case 4 - Authorization dependency: all requests consult a remote PDP. When the PDP experiences latency, the gateway accumulates threads and increases the response time of unrelated APIs. The solution combines timeout, bulkhead, low-risk decision caching and discrete scaling, preserving fail-closed for sensitive operations."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Set up a simple reverse proxy and watch both connections. 2) Simulate backend DNS failure and compare with unavailable listener. 3) Apply a JWT policy and record the rejection stage. 4) Test pooling, retries and timeouts with a slow backend. 5) Publish two configuration versions and check rollback."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway is a mediation and policy enforcement runtime between consumers and backends. It ends one transport relationship and creates another, being able to change identity, protocol, headers, format and destination. This position concentrates security and governance value, but also creates operational criticality."
  },
  {
    "kind": "paragraph",
    "text": "A mature platform separates data plane, control plane, management plane and developer plane. The runtime must remain available with a valid configuration even during management failures. Publications must be versioned, confirmed and reversible. Topology, high availability and distributed state need to be defined explicitly."
  },
  {
    "kind": "paragraph",
    "text": "The request cycle includes listener, API selection, policies, routing, outbound connection and response processing. Security, traffic, caching, resilience and observability depend on the order and state of these steps. Reliable diagnosis separates inbound and outbound and locates the component that produced the decision."
  },
  {
    "kind": "paragraph",
    "text": "The gateway does not replace business logic, WAF, load balancer, service mesh or complete governance. It integrates with these components. The right architecture balances centralization, autonomy, isolation, capacity and continuity. The next chapter will delve deeper into the policies executed by the gateway engine."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 22 will delve deeper into Gateway Policies: structure, order of execution, context variables, authentication, authorization, transformation, routing, resiliency, scripts, error handling, and good governance practices."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "API Gateway Architecture Checklist",
    "id": "api-gateway-architecture-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The responsibilities of the gateway are differentiated from WAF, load balancer, ingress and service mesh.",
      "Data plane, control plane, management plane and developer plane have defined boundaries and SLAs.",
      "The unavailability of the management plan does not interrupt traffic already published.",
      "Listeners, SNI, Host, paths and selection rules are deterministic and tested.",
      "The order of policies prevents bypass, unnecessary cost and data leakage.",
      "Direct access to backends is blocked or tightly controlled.",
      "Outbound connections, DNS, SNAT, pooling, health checks and timeouts are dimensioned.",
      "Retries are only applied when the operation can be safely repeated.",
      "Rate limits and quotas have known key, scope, and state storage.",
      "Caches vary by identity and do not store sensitive data insecurely.",
      "Configurations are versioned, pipelined, committed, and reversible.",
      "Logs, metrics and traces correlate inbound, policies and outbound.",
      "The cluster supports node loss and has headroom for spikes and failover.",
      "External dependencies have timeout, failure strategy and observability.",
      "There are runbooks for 401, 403, 429, 502, 503, TLS, and latency."
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
      "Explain why consumer-gateway and gateway-backend are independent connections.",
      "Differentiate between API Gateway, reverse proxy, WAF, load balancer and service mesh.",
      "Describe the four logical planes of an API platform.",
      "Assemble the processing sequence for a request and justify the order of policies.",
      "Explain how SNI and Host participate in API selection.",
      "Compare centralized, domain, layered, and hybrid topologies.",
      "Propose high availability architecture that survives loss of control plane.",
      "Discuss when local JWT validation is preferable to remote introspection.",
      "Explain how pooling and SNAT affect connectivity to backends.",
      "Propose metrics to separate gateway latency and backend latency.",
      "Analyze the risks of storing extensive business logic in policies.",
      "Create a script to investigate intermittent 502 responses in just one region."
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
        "API Gateway",
        "Runtime for mediation and policy enforcement between consumers and backends."
      ],
      [
        "Control plane",
        "Plan that distributes configuration and desired state to runtimes."
      ],
      [
        "Data plan",
        "Plan that processes the actual traffic of the APIs."
      ],
      [
        "Developer portal",
        "Discovery, documentation, onboarding and consumption interface."
      ],
      [
        "Drain",
        "Process of stopping new requests before terminating an instance."
      ],
      [
        "Egress",
        "Outbound traffic from the gateway towards the backend."
      ],
      [
        "Fail-closed",
        "Behavior that blocks when a critical control fails."
      ],
      [
        "Fail-open",
        "Behavior that allows continuity when a control fails."
      ],
      [
        "Entrance",
        "Traffic that enters the runtime via the listener."
      ],
      [
        "listener",
        "Local endpoint that accepts connections and protocols."
      ],
      [
        "Management plan",
        "Administrative plan for publication, catalog and governance."
      ],
      [
        "Policy",
        "Rule executed upon request, response or error."
      ],
      [
        "route",
        "Mapping between logical API and backend target."
      ],
      [
        "SNAT",
        "Translation of the address and port of origin in the outgoing segment."
      ],
      [
        "Upstream",
        "Destination server or pool called by the gateway."
      ],
      [
        "virtual host",
        "Logical host identity sharing address and port."
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
      "IETF. RFC 9111 - HTTP Caching.",
      "IETF. RFC 8446 - The Transport Layer Security Protocol Version 1.3.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "NIST. SP 800-204 - Security Strategies for Microservices-based Application Systems.",
      "NIST. SP 800-207 - Zero Trust Architecture.",
      "OpenAPI Initiative. OpenAPI Specification.",
      "Microsoft Azure Architecture Center. API Gateway pattern.",
      "Envoy Proxy Documentation. Architecture overview and HTTP filters.",
      "OWASP. API Security Top 10.",
      "CNCF. Gateway API and service mesh architectural materials."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Gateway products evolve at their own pace. When applying the concepts to a specific platform, confirm the documentation for the deployed version, especially for protocols, policies, clustering, limits, identity integration, and high availability behavior."
  }
];
