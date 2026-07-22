import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const SERVICE_MESH_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Service mesh: a communication layer between workloads"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/overview.svg",
    "alt": "Control plane distributing identity, routes and policies to inter-service proxies",
    "caption": "Opening figure - Service mesh introduces a uniform operational layer between services."
  },
  {
    "kind": "paragraph",
    "text": "The data plane transparently applies controls to east-west traffic."
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
    "text": "In previous chapters, the API Gateway was studied as a controlled point of exposure, authentication, policies and observability of traffic entering or leaving a domain. In microservices architectures, however, much of the communication occurs within the environment, between workloads that change addresses, scale horizontally and depend on multiple services. Manually applying TLS, retries, metrics, authorization and balancing to each application generates duplication, inconsistency and high maintenance costs."
  },
  {
    "kind": "paragraph",
    "text": "A service mesh creates an infrastructure layer to handle this east-west traffic. The central idea is to separate business logic from communication functions. Proxies or equivalent components intercept connections, apply policies, and produce telemetry. A control plane observes the environment and distributes configuration to data plane components. This way, security and network behavior can be managed in a relatively uniform way without embedding a specific library in each language."
  },
  {
    "kind": "paragraph",
    "text": "This abstraction does not eliminate the network or automatically solve all distributed problems. On the contrary: it adds components, certificates, routing rules and new dependencies. An incorrect retry configuration can multiply load; an authorization policy can disrupt legitimate traffic; a proxy can mask the source of latency; and a poorly coordinated update of the control plane can produce configuration divergence. Adoption needs to be driven by real problems and accompanied by operational capacity."
  },
  {
    "kind": "paragraph",
    "text": "This chapter delves into service mesh concepts and compares three important pieces of the ecosystem. Istio offers a broad control plane and two data plane models: sidecar and ambient. Linkerd emphasizes operational simplicity and uses its own microproxy written in Rust. Envoy is a high-performance proxy used as a data plane by Istio and several platforms, and can also act on independent gateways and proxies."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each resource in the mesh, identify where the decision is declared, which component distributes the configuration, where it is executed in the traffic path, and what evidence supports the behavior. This sequence reduces diagnostics based solely on manifests or dashboards."
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
      "Explain the problem that a service mesh seeks to solve and its architectural costs.",
      "Distinguish north-south and east-west traffic, beyond the borders between gateway and mesh.",
      "Describe control plane, data plane, sidecar, ztunnel and proxy waypoint.",
      "Understand mTLS across workloads, service identity, and principal-based authorization.",
      "Apply traffic splitting, retries, timeouts, circuit breaking and fault injection with critical sense.",
      "Interpret the Istio's architecture in sidecar mode and ambient mode.",
      "Interpret Linkerd's architecture, its microproxies and identity and discovery components.",
      "Explain listeners, filters, routes, clusters, endpoints and xDS in Envoy.",
      "Relate service mesh to API Gateway, GAMMA, multi-cluster and observability.",
      "Diagnose injection, mTLS, protocol, route, policy and capacity failures."
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
      "29.1 The problem of communication between services; 29.2 What is service mesh; 29.3 North-south x east-west; 29.4 Control plane and data plane; 29.5 Traffic interception; 29.6 Identity and mTLS; 29.7 Authorization; 29.8 Traffic management; 29.9 Resilience; 29.10 Observability; 29.11 Istio; 29.12 Sidecar mode; 29.13 Ambient mode; 29.14 Linkerd; 29.15 Envoy; 29.16xDS; 29.17 API and GAMMA gateway; 29.18 Multi-cluster; 29.19 Egress; 29.20 Performance; 29.21 Security; 29.22 Operation and upgrades; 29.23 Troubleshooting; 29.24 Case studies and laboratories; summary, checklist, exercises, glossary and references."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.1 The problem of communication between services",
    "id": "29-1-the-problem-of-communication-between-services"
  },
  {
    "kind": "paragraph",
    "text": "A monolithic application executes internal calls within the same process. In a distributed architecture, the call becomes network communication and depends on DNS, sockets, balancing, TLS, timeouts, queues, retries and observability. The semantics of a local function do not match the semantics of a remote call: the response may be delayed, the request may have been processed even if the client receives timeout, and the destination may change during execution."
  },
  {
    "kind": "paragraph",
    "text": "When each team implements these concerns in their own libraries, divergent versions, incompatible configurations, and governance difficulties arise. A Java service may use a different retry policy than a Go service; a legacy workload may not emit metrics; another may maintain static certificates for years. Mesh seeks to shift some of these responsibilities to the infrastructure, offering uniform behavior across applications."
  },
  {
    "kind": "paragraph",
    "text": "The benefit is greater when there are many services, multiple languages, high volume of changes, and strong identity and observability requirements. In small environments, the overhead of installing, operating, and updating a mesh can outweigh the gain. The decision must consider real complexity, team maturity, traffic criticality and troubleshooting capacity."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.2 What is service mesh",
    "id": "29-2-what-is-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Service mesh is a layer dedicated to communication between services. It is not a single protocol and does not replace Kubernetes, API Gateway or business logic. In its most common form, it consists of a distributed data plane and a control plane. The data plan participates directly in connections; the control plane calculates and distributes state, policies, and identity."
  },
  {
    "kind": "paragraph",
    "text": "The mesh can provide service discovery, balancing, mTLS, authorization, retries, timeouts, circuit breaking, traffic splitting, telemetry and tracing integration. Not every implementation offers every feature, and not every feature should be enabled indiscriminately. For example, automatic retries are useful for transient failures, but dangerous for non-idempotent operations."
  },
  {
    "kind": "paragraph",
    "text": "Transparency is an operational property, not an absence of effects. The application may not know the proxy, but it suffers the timeouts, resets, headers, latency and policies applied by it. Therefore, architecture, SRE and development need to share a mental model of the real path of the request."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/figure-01-control-data-plane.svg",
    "alt": "Separation between service mesh control plane and data plane",
    "caption": "Figure 1 - The control plan distributes decisions; the data plane applies these decisions to traffic."
  },
  {
    "kind": "paragraph",
    "text": "North-south traffic crosses the edge of the environment: external consumer to API Gateway, ingress or application. East-west traffic occurs between services within the environment or between internal domains. API Gateway focuses exposure, products, consumers, customer authentication, quotas, and transformation at the edge. The service mesh concentrates communication between workloads, service identity, telemetry and distributed policy."
  },
  {
    "kind": "paragraph",
    "text": "Borders can overlap. Istio and Envoy can also implement ingress and egress gateways. An API Gateway can be inside the mesh and receive mTLS like any workload. The architectural mistake is to assume that one technology automatically replaces another. The correct question is which governance plan, which audience and which type of contract each component controls."
  },
  {
    "kind": "paragraph",
    "text": "On a banking platform, for example, APIM or Axway can authenticate the application and apply quotas to external traffic, while mesh authenticates the gateway as a workload and controls which internal services can be called. User identity and workload identity are distinct contexts and may need to be propagated simultaneously."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Gateway and mesh can coexist with complementary responsibilities.",
    "headers": [
      "Component",
      "Main focus",
      "Examples of liability"
    ],
    "rows": [
      [
        "API Gateway",
        "API exposure and governance.",
        "Products, consumers, OAuth, quotas, transformation and portal."
      ],
      [
        "Ingress Gateway",
        "Traffic entry into the cluster.",
        "TLS, host, path and initial routing."
      ],
      [
        "Service Mesh",
        "East-west communication.",
        "mTLS, workload policy, retries, telemetry and traffic split."
      ],
      [
        "Egress Gateway",
        "Controlled output.",
        "Policy, auditing and stable origin to external destinations."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "The data plane needs to execute decisions with low latency and high availability. It intercepts connections, recognizes protocol, selects destinations, establishes TLS, applies filters and exports metrics. As it participates in each request, CPU, memory, configuration or update failures in the data plane directly affect traffic."
  },
  {
    "kind": "paragraph",
    "text": "The control plane looks at services, endpoints, identities, and declarative resources. From there, it produces configuration for the proxies. In Istio, istiod consolidates identity discovery, configuration, and issuance. In Linkerd, services such as destination and identity fulfill specific roles. In the Envoy ecosystem, control planes use xDS APIs to publish listeners, routes, clusters, endpoints, and secrets."
  },
  {
    "kind": "paragraph",
    "text": "The separation reduces dependence on the control plane during each request. Proxies typically continue using the last known good configuration if the control plane becomes temporarily unavailable. However, changes to endpoints, certificates or policies no longer propagate. Therefore, control plane health and data plane convergence need to be monitored separately."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.5 Traffic interception: sidecar, CNI and dataplanes per node",
    "id": "29-5-traffic-interception-sidecar-cni-and-dataplanes-per-node"
  },
  {
    "kind": "paragraph",
    "text": "In the sidecar model, each pod receives an additional proxy. iptables or eBPF rules redirect inbound and outbound traffic to this proxy. The benefit is isolation per workload and L7 capacity close to the application. The cost includes CPU and memory per pod, increased startup time, need for injection, and lifecycle coordination between application and proxy."
  },
  {
    "kind": "paragraph",
    "text": "A CNI plugin can install redirection rules outside the init container, reducing privileges in the pod. Still, the operator needs to know excluded ports, probes, traffic from the proxy itself and conditions under which a connection bypasses the mesh. Marking a namespace as injected does not prove that all current pods have been sidecarred; Existing pods need to be recreated."
  },
  {
    "kind": "paragraph",
    "text": "In Istio's ambient model, one ztunnel per node provides secure connectivity and L4 policies. Workloads that need L7 resources can use Envoy-based waypoint proxies. This reduces the need for a sidecar in each pod, but introduces another operational topology and requires understanding which controls are applied to the ztunnel and which depend on the waypoint."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/figure-02-sidecar-ambient.svg",
    "alt": "Istio data plan sidecar and ambient models",
    "caption": "Figure 2 - Istio offers sidecars per pod or an ambient data plan split into L4 and L7."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.6 Workload identity and automatic mTLS",
    "id": "29-6-workload-identity-and-automatic-mtls"
  },
  {
    "kind": "paragraph",
    "text": "The security of a mesh starts with the identity of the workload. Instead of just trusting the IP address, the proxy presents a certificate linked to an environmental identity, often derived from namespace and ServiceAccount. The peer validates the string, expected name, and associated policies. This way, the authorization can remain valid even when the pod address changes."
  },
  {
    "kind": "paragraph",
    "text": "mTLS provides confidentiality, integrity, and mutual authentication between proxies. It does not, by itself, prove which end user initiated the operation. To preserve business context, the service can continue validating access tokens, claims or other identity elements. The mesh protects communication and identifies the workload; the application decides what that user or process can do in the domain."
  },
  {
    "kind": "paragraph",
    "text": "Certificate operations require attention to trust anchors, issuers, duration, renewal and clock. Linkerd, for example, links certificates to ServiceAccount and uses short-lived certificates in proxies. Istio can issue identities using your CA or integrate with an external PKI. In multi-cluster, the trust strategy determines which identities are recognized across environments."
  },
  {
    "kind": "subhead",
    "text": "mTLS is not full authorization"
  },
  {
    "kind": "paragraph",
    "text": "An authenticated connection tells you who the remote workload is. You still need to declare which identities can access which service, port, method, or path. Without an authorization policy, encryption can protect unauthorized traffic."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.7 Service authorization and L4/L7 policy",
    "id": "29-7-service-authorization-and-l4-l7-policy"
  },
  {
    "kind": "paragraph",
    "text": "L4 policies evaluate properties such as source identity, namespace, port, and transport protocol. They are efficient and work even when the proxy does not interpret HTTP. L7 policies can consider method, path, host, headers and claims. This level offers greater granularity, but relies on protocol awareness and a component capable of running application filters."
  },
  {
    "kind": "paragraph",
    "text": "In Istio environment, L4 authorization can be applied in ztunnel, while L7 rules depend on waypoint. In sidecar mode, the pod's Envoy performs both levels. In Linkerd, the inbound proxy enforces authorization policies, and policy resources can define allowed servers, routes, and identities. The design should start with default deny for sensitive surfaces and explicit exceptions."
  },
  {
    "kind": "paragraph",
    "text": "An incorrect policy can create complete unavailability. Therefore, gradual deployment, audit mode when available, integration tests and denial metrics are essential. The rule must be reviewed together with the application contract: allowing GET on a path does not equate to authorizing any business operation accessible via that path."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.8 Traffic management and progressive delivery",
    "id": "29-8-traffic-management-and-progressive-delivery"
  },
  {
    "kind": "paragraph",
    "text": "The mesh can divide traffic between versions, apply canary, mirroring, affinity, header routing, and identity-based selection. These capabilities help perform progressive delivery without incorporating routing logic into each application. The declarative rule is converted by the control plane into a configuration distributed to the proxies."
  },
  {
    "kind": "paragraph",
    "text": "Traffic splitting needs to consider unit balancing and persistence. A 90/10 rule typically distributes requests, not users or business transactions. On long connections, HTTP/2 or gRPC streaming, few connections can concentrate a lot of traffic. Per-request and per-connection metrics must be analyzed before concluding that the split has reached the planned ratio."
  },
  {
    "kind": "paragraph",
    "text": "Additionally, header routing can create dependency on metadata that crosses trust boundaries. Headers used for canary or tenant must be produced by trusted or validated components. Allowing any customer to choose a privileged version may bypass rollout controls."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/figure-03-traffic-management.svg",
    "alt": "Traffic management transforming declarative rule into weighted division",
    "caption": "Figure 3 - Declarative intent only produces the expected result when the proxy has correct endpoints and metrics."
  },
  {
    "kind": "paragraph",
    "text": "Timeout defines how long the caller agrees to wait. Retry creates a new attempt after a failure considered transient. Circuit breaking limits connections, pending requests or errors to prevent saturation. Fault injection introduces delay or controlled failure to test resilience. These mechanisms are powerful, but they interact in a non-linear way."
  },
  {
    "kind": "paragraph",
    "text": "A retry configured on the client, sidecar proxy, and gateway can multiply attempts. Three layers with two additional retries can produce up to twenty-seven executions in a three-service chain. Therefore, retry budgets, idempotence, propagated deadlines and tentative observability are essential. The retry point must be chosen consciously."
  },
  {
    "kind": "paragraph",
    "text": "Proxy circuit breakers protect transport resources, but do not replace business limits or queuing mechanisms. Fault injection must be restricted to controlled environments, users or percentages. A broad rule in production can simulate a real failure and make it difficult to distinguish between experiment and incident."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Resilience requires coordinated boundaries between application, gateway and mesh.",
    "headers": [
      "Mechanism",
      "Objective",
      "Risk of incorrect configuration"
    ],
    "rows": [
      [
        "Timeout",
        "Limit waiting and free up resources.",
        "Short deadline interrupts valid operations; Long term amplifies queues."
      ],
      [
        "Retry",
        "Recover transient failures.",
        "Storm of attempts and duplication of operations."
      ],
      [
        "circuit breaking",
        "Contain saturation and cascade failure.",
        "Premature rejections or divergent state between proxies."
      ],
      [
        "Fault injection",
        "Validate resilience.",
        "Unintended impact on real traffic."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.10 Observability: metrics, logs and tracing",
    "id": "29-10-observability-metrics-logs-and-tracing"
  },
  {
    "kind": "paragraph",
    "text": "As the proxy observes traffic uniformly, the mesh can produce metrics for request rate, error rate, latency, bytes, connections and TLS status without modifying each application. This uniformity is valuable in multilingual environments. However, the proxy sees the protocol and transport, not necessarily the complete semantics of the business."
  },
  {
    "kind": "paragraph",
    "text": "Metrics need to distinguish source and destination reporter, workload, namespace, route and response. Excessive cardinality can make the metrics system expensive or unstable. Access logs are useful for detailed investigation, but can contain sensitive tokens, personal IDs, and payloads if the formats are not controlled."
  },
  {
    "kind": "paragraph",
    "text": "Distributed tracing typically depends on context propagation across the application. The proxy can generate spans and measure communication, but it cannot alone infer the relationship between asynchronous calls or internal tasks. The ideal design combines application spans with infrastructure spans, using consistent correlation IDs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.11 Istio: architecture and components",
    "id": "29-11-istio-architecture-and-components"
  },
  {
    "kind": "paragraph",
    "text": "Istio logically separates data plane and control plane. In sidecar mode, Envoy proxies are injected into pods and mediate traffic. istiod observes Kubernetes resources and mesh configurations, performs service discovery, converts rules into xDS configuration, and participates in issuing identities to proxies."
  },
  {
    "kind": "paragraph",
    "text": "Features like VirtualService and DestinationRule have historically been used for routing and destination policies. Adopting Kubernetes Gateway API increases standardization of ingress and mesh resources. Regardless of the declarative API, the operator needs to verify the configuration actually received by Envoy: clusters, routes, listeners and endpoints."
  },
  {
    "kind": "paragraph",
    "text": "Istio offers ingress and egress gateways, integration with telemetry, authorization, extension by filters and Wasm and multi-cluster deployment models. This breadth brings flexibility and also a large operating surface. Profiles, control plane reviews and canary upgrades help reduce upgrade risk."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.12 Istio sidecar mode",
    "id": "29-12-istio-sidecar-mode"
  },
  {
    "kind": "paragraph",
    "text": "In sidecar mode, each meshed workload receives an Envoy. The outbound proxy resolves destinations, applies routes and policies, and opens a connection to the destination's inbound proxy. The inbound proxy validates identity and applies authorization. As each pod has a dedicated data plane, L7 resources and extensions can be applied in a granular manner."
  },
  {
    "kind": "paragraph",
    "text": "The operational cost appears in total memory, CPU, startup time, number of connections to the control plane and shutdown coordination. The application may start before the proxy is ready or terminate before draining connections. Lifecycle hooks, probes and holdApplicationUntilProxyStarts configurations need to be evaluated depending on the environment."
  },
  {
    "kind": "paragraph",
    "text": "Automatic injection depends on labels or annotations and an admission webhook. Webhook failures can prevent pod creation. Deleting ports incorrectly can bypass mTLS or generate loops. Therefore, a mesh readiness check must observe both the application pod and the presence and state of the sidecar."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.13 Istio ambient mode: ztunnel and waypoint",
    "id": "29-13-istio-ambient-mode-ztunnel-and-waypoint"
  },
  {
    "kind": "paragraph",
    "text": "Ambient mode seeks to reduce the need for sidecars per workload. A node-run ztunnel captures traffic from workloads subscribed to the mesh, provides mTLS, identity, telemetry and L4 policy. When an application needs routing, authorization, or L7 observability, an Envoy-based proxy waypoint can be associated with the relevant service or identity."
  },
  {
    "kind": "paragraph",
    "text": "The L4/L7 split allows you to adopt basic security at a lower cost per pod and add advanced features only where needed. However, troubleshooting changes: the path can pass through the source ztunnel, waypoint and destination ztunnel. It is necessary to identify which component should process the policy and where the connection was interrupted."
  },
  {
    "kind": "paragraph",
    "text": "Sidecar and ambient can coexist in the same mesh. This capability facilitates gradual migration, but requires testing flows between modes, equivalent policies, and telemetry behavior. A workload should not be ambiguously enrolled simultaneously in both modes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.14 Linkerd: architecture and principles",
    "id": "29-14-linkerd-architecture-and-principles"
  },
  {
    "kind": "paragraph",
    "text": "Linkerd also separates control plane and data plane. Your data plane uses a transparent microproxy written in Rust, designed specifically for service mesh. The proxy is injected as a sidecar, intercepts TCP and recognizes HTTP, HTTP/2, gRPC and WebSocket. The focus of the project is to offer essential resources with relatively simple operation and low consumption."
  },
  {
    "kind": "paragraph",
    "text": "In the control plane, the destination service provides discovery, expected destination identity, policy and route information. The identity service works as a certificate authority and issues certificates to proxies. The proxy injector modifies pods marked for injection. Extensions like viz add dashboard and observability components."
  },
  {
    "kind": "paragraph",
    "text": "In a meshed connection, the outbound proxy performs discovery, load balancing, retries and timeouts; the inbound proxy applies authorization. mTLS is automatic between meshed pods, with certificates linked to the ServiceAccount and renewed by the proxy. The operator still needs to take care of trust anchor and issuer rotation and trust between clusters."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The choice depends on requirements, maturity and operational model.",
    "headers": [
      "Appearance",
      "Istio",
      "Linkerd"
    ],
    "rows": [
      [
        "Data plan",
        "Envoy sidecar or ambient with ztunnel/waypoint.",
        "Own microproxy in Rust as a sidecar."
      ],
      [
        "Control plane",
        "istiod and associated components/gateways.",
        "destination, identity, injector and extensions."
      ],
      [
        "Functional scope",
        "Wide set of L4/L7 and extensibility.",
        "Emphasis on simplicity and essential functions."
      ],
      [
        "Adoption",
        "Great flexibility and larger operating surface.",
        "Lower initial complexity, with resource trade-offs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.15 Envoy: proxy, filters and upstreams",
    "id": "29-15-envoy-proxy-filters-and-upstreams"
  },
  {
    "kind": "paragraph",
    "text": "Envoy is a high-performance proxy written in C++ and designed for distributed architectures. It can act as a sidecar, gateway, edge proxy or universal data plane. On Istio, Envoy executes much of the L4 and L7 policies. Other control planes also use it through the xDS APIs."
  },
  {
    "kind": "paragraph",
    "text": "A listener accepts connections on an address and port. Filter chains choose network and transport filters according to connection properties, such as SNI. For HTTP, the HTTP connection manager performs filtering, routing, and observability. Routes select virtual hosts, clusters, and actions. Clusters represent logical groups of upstreams, and endpoints are the actual instances."
  },
  {
    "kind": "paragraph",
    "text": "Envoy maintains connection pools, performs health checking, service discovery and load balancing. Features such as outlier detection, circuit breaking, overload manager and draining are important in production. The flexibility of filters is powerful, but Lua or Wasm extensions need to be treated as trusted code and subject to governance."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/figure-04-envoy-model.svg",
    "alt": "Listener, filters, route, and cluster in the Envoy internal model",
    "caption": "Figure 4 - Listener, filters, route and cluster form the logical path of a request in Envoy."
  },
  {
    "kind": "paragraph",
    "text": "xDS is the set of APIs used to dynamically configure Envoy. LDS publishes listeners, RDS publishes routes, CDS publishes clusters, EDS publishes endpoints and SDS publishes secrets. The Aggregated Discovery Service allows you to transport multiple types over a gRPC relationship. The control plane needs to maintain version, nonce, ACK/NACK and consistency between related resources."
  },
  {
    "kind": "paragraph",
    "text": "Dynamic configuration avoids restarting proxies with each change, but creates a distributed system of convergence. A proxy can reject an invalid configuration and continue using the previous one. NACK logs and synchronization status must be monitored. Declaring a resource in Kubernetes does not guarantee that all proxies have applied the expected version."
  },
  {
    "kind": "paragraph",
    "text": "In troubleshooting, it is useful to compare the declared intent, the state calculated by the control plane, and the actual proxy configuration. Istio tools like proxy-status and proxy-config materialize this approach. In own control planes, Envoy administrative APIs and config dumps fulfill a similar role."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.17 API and GAMMA gateway for service mesh",
    "id": "29-17-api-and-gamma-gateway-for-service-mesh"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes Gateway API was designed as an evolution of the ingress and load balancing APIs, with explicit separation of roles. The GAMMA initiative extends its use to service mesh. Instead of associating an HTTPRoute only with a north-south Gateway, a mesh route can be associated directly with a Service and control east-west traffic."
  },
  {
    "kind": "paragraph",
    "text": "Standardization reduces dependence on specific CRDs and facilitates conceptual portability. Still, each implementation has a level of compliance and extended capabilities. The operator must check which fields belong to the Standard channel, which are Experimental and which behaviors depend on the mesh used."
  },
  {
    "kind": "paragraph",
    "text": "Gateway API does not eliminate the need to understand the data plane. It standardizes declarative intent. The result continues to depend on the controller, the translation for proxy configuration and the convergence of endpoints."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of mesh route with API/GAMMA Gateway"
  },
  {
    "kind": "code",
    "text": "apiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata:\n  name: pedidos-canary\nspec:\n  parentRefs:\n  - group: \"\"\n    kind: Service\n    name: pedidos\n  rules:\n  - backendRefs:\n    - name: pedidos-v1\n      port: 8080\n      weight: 90\n    - name: pedidos-v2\n      port: 8080\n      weight: 10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.18 Multi-cluster and multiple networks",
    "id": "29-18-multi-cluster-and-multiple-networks"
  },
  {
    "kind": "paragraph",
    "text": "A multi-cluster mesh needs to resolve discovery, identity, connectivity and policy between environments. Clusters may share a flat network or require gateways to traverse different networks. The design also needs to decide whether there will be a single control plane, primary-remote control planes, or independent control planes with federated trust."
  },
  {
    "kind": "paragraph",
    "text": "Sharing trust anchor simplifies identity recognition but expands the trust boundary. Different trust domains can be federated with explicit rules. Failover between clusters needs to consider data consistency, latency, capacity and locality-aware load balancing. Redirecting traffic without preparing dependencies may just move the failure."
  },
  {
    "kind": "paragraph",
    "text": "Linkerd offers multi-cluster components and requires inter-cluster trust planning. Istio supports several topologies and east-west gateways. In both DNS, ServiceExport/ServiceImport, routes and health need to be observed together."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/service-mesh-istio-linkerd-envoy/en/figure-05-multicluster.svg",
    "alt": "Service mesh connecting services and gateways across multiple clusters",
    "caption": "Figure 5 - Multi-cluster adds identity, discovery, connectivity and failover to the equation."
  },
  {
    "kind": "paragraph",
    "text": "Traffic to banks, SaaS and external APIs should not be ignored by the mesh design. An egress gateway can centralize network origin, policy, TLS, and auditing. The benefit is greatest when targets require IP allowlisting or inspection. The cost is to create an additional point of capacity and availability."
  },
  {
    "kind": "paragraph",
    "text": "Service entries or equivalent resources register external destinations in the mesh model. This allows you to apply routing and telemetry, but does not transform an external service into a reliable workload. Certificates, DNS, and egress policies remain the responsibility of the architecture."
  },
  {
    "kind": "paragraph",
    "text": "Blocking any unknown destinations reduces exfiltration, but may break uninventoried dependencies. Safe adoption begins with observation, inventory and classification, followed by gradual enforcement."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.20 Performance, capacity and cost",
    "id": "29-20-performance-capacity-and-cost"
  },
  {
    "kind": "paragraph",
    "text": "Mesh adds processing, connections, encryption and telemetry. The latency per hop may be small, but a long chain accumulates cost. CPU and memory depend on rate, payload size, protocol, number of routes, metrics, access logs and extensions. Generic benchmarks do not replace tests with the real profile of the application."
  },
  {
    "kind": "paragraph",
    "text": "In the sidecar model, consumption is multiplied by the number of pods. In ambient, part of the cost is shared per node and per waypoint. This changes the capacity planning unit. Proxies also maintain pools and buffers; Improper limits can cause OOM, CPU throttling, or internal queues."
  },
  {
    "kind": "paragraph",
    "text": "The control plane needs to scale with the number of proxies and configuration changes. Massive endpoint updates can cause distribution spikes. Sharding, revisions and controlled rollout reduce blast radius. Convergence time and config size metrics help identify unsustainable growth."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.21 Security and threat model",
    "id": "29-21-security-and-threat-model"
  },
  {
    "kind": "paragraph",
    "text": "Mesh improves security by providing uniform identity and encryption, but it also becomes critical infrastructure. Compromising the control plane may allow malicious routes or policies to be distributed. Compromising CA credentials can affect the entire trust. Administrative APIs, webhooks, secrets, and service accounts require least privilege and segmentation."
  },
  {
    "kind": "paragraph",
    "text": "Proxies process untrusted traffic and configurable extensions. Custom filters, Wasm and scripts must have supply chain, review and signature. Debug endpoints and config dumps can reveal internal names, routes, certificates or headers. They should not be exposed indiscriminately."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust in mesh means verifying identity, applying explicit authorization, and maintaining telemetry, not just enabling mTLS. Policies should restrict lateral movement and separate namespaces, environments, and domains. Security needs to include traffic that bypasses the proxy, such as probes, excluded ports, and host networking."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.22 Operation, upgrades and governance",
    "id": "29-22-operation-upgrades-and-governance"
  },
  {
    "kind": "paragraph",
    "text": "Operating a mesh requires version management of the control plane, proxies and CRDs. Updates must respect compatibility matrices. Istio supports revisions to run parallel control planes and gradually migrate namespaces. Linkerd offers upgrade procedures and health checks. Standalone Envoy can use hot restart or draining depending on the deployment model."
  },
  {
    "kind": "paragraph",
    "text": "GitOps helps audit manifests, but does not replace runtime state validation. Quality gates can perform lint, dry-run, policy tests and route comparison. Shared resources need clear ownership: platform maintains the mesh; Domain teams maintain routes and policies within governed boundaries."
  },
  {
    "kind": "paragraph",
    "text": "Mesh removal must also be planned. Uninjecting sidecars, removing CNI, removing CRDs, and changing network policies out of order can disrupt traffic. A healthy exit plan demonstrates that the application does not accidentally rely on undocumented behavior."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "29.23 Actual path-oriented troubleshooting",
    "id": "29-23-actual-path-oriented-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis must start with the question: which path should the connection take? Identify source application, outbound proxy or ztunnel, waypoint or intermediate gateway, inbound proxy and destination application. Then check DNS, endpoints, proxy synchronization, TLS, policy, route, cluster, health and application response."
  },
  {
    "kind": "paragraph",
    "text": "503 errors can mean missing endpoints, circuit break, upstream reset, connection refused or policy. TLS failures can result from trust domain, expected identity, expired certificate or plaintext traffic. A timeout can be in the application, sidecar, gateway, or upstream. The error text and the component that produced it are essential evidence."
  },
  {
    "kind": "paragraph",
    "text": "Compare the two sides. If the source proxy sent request but the destination did not register connection, investigate network and mTLS. If the inbound proxy accepted but the application did not receive it, investigate port and redirection. If the application responded and the client received a reset, observe draining, timeout and connection back."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The diagnosis must correlate intention, control plan, proxy and application.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Useful evidence"
    ],
    "rows": [
      [
        "Pod without sidecar",
        "Label, webhook, namespace, or old pod.",
        "Pod spec, events and injector logs."
      ],
      [
        "503 on proxy",
        "No endpoint, reset, circuit breaker or missing cluster.",
        "Config dump, endpoints, response flags and upstream logs."
      ],
      [
        "mTLS fails",
        "Trust, SAN, identity or clock.",
        "Certificate, trust domain and handshake logs."
      ],
      [
        "Route not applied",
        "Invalid resource, NACK or outdated proxy.",
        "Sync status, ACK/NACK and effective config."
      ],
      [
        "High latency",
        "Retry, queue, proxy CPU or slow upstream.",
        "Hop tracing, retries and saturation metrics."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1 - A gateway calls three internal microservices. After enabling retries in the mesh, tail latency increases and the backend saturates during partial failures. Investigation shows simultaneous retries in the SDK, gateway, and sidecar. The correction centralizes the policy, propagates deadlines and limits the retry budget."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 2 - A namespace is migrated to Istio environment. mTLS L4 works, but a per-path policy is not applied. The team discovers that the service did not have an associated waypoint. The solution is to deploy waypoint, review the L7 policy and validate the path with telemetry."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 3 - Two Linkerd clusters need to communicate. Connection fails after issuer rotation. The analysis separates shared trust anchor, issuer from each cluster, proxy certificates and multicluster components, identifying a chain that is not updated in the remote cluster."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Inject two services into a mesh and validate mTLS and identity. 2) Configure 90/10 between two versions and compare requests and connections. 3) Apply timeout and retry only to one layer and observe traces. 4) Generate a policy denial and identify the proxy that responded. 5) Inspect an Envoy's listeners, routes, clusters and endpoints."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Service mesh transfers communication functions to an infrastructure layer, offering identity, mTLS, policy, routing and observability to east-west traffic. The model depends on the separation between the control plane, which calculates and distributes configuration, and the data plane, which participates in connections."
  },
  {
    "kind": "paragraph",
    "text": "Istio offers sidecar mode with Envoy per pod and ambient mode with ztunnel L4 and waypoint L7. Linkerd uses its own microproxies in Rust and a control plane with discovery and identity. Envoy provides the base proxy, filters, clusters, and xDS configuration used across multiple platforms."
  },
  {
    "kind": "paragraph",
    "text": "Mesh does not replace API Gateway, application security or distributed best practices. Retries, timeouts and circuit breakers need to be coordinated. mTLS identifies workloads, but does not replace authorization or user identity. Proxy observability needs to be combined with application metrics and tracing."
  },
  {
    "kind": "paragraph",
    "text": "Successful adoption requires capacity, governance, controlled upgrades and path-based troubleshooting. Value appears when the organization reduces inconsistency and improves security and observability without hiding network effects."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves deeper into microservices and integration patterns, connecting mesh networking capabilities to decomposition decisions, synchronous and asynchronous communication, consistency, and domain resiliency."
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
      "The problem that justifies the mesh is documented and measurable.",
      "Gateway, ingress, egress and mesh have delimited responsibilities.",
      "Control plane and data plane have independent SLOs and monitoring.",
      "All expected workloads are actually subscribed to the mesh.",
      "Trust anchors, issuers and certificate rotation are governed.",
      "Policies L4 and L7 were tested with real identities and controlled default deny.",
      "Timeouts, retries and circuit breakers are coordinated with the application and gateway.",
      "Traffic splitting was validated by request, connection and business impact.",
      "Metrics and logs prevent excessive cardinality and sensitive data.",
      "Upgrades use canary, review, or gradual rollout with rollback.",
      "Declared configuration is compared with the effective configuration of the proxies.",
      "The multi-cluster plan considers trust, networking, failover, and consistency.",
      "There is a procedure to bypass or remove the mesh in an emergency."
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
      "Differentiate north-south and east-west and explain where gateway and mesh meet.",
      "Describe the configuration flow from the control plane to the proxy.",
      "Compare Istio's sidecar mode and ambient mode.",
      "Explain the function of ztunnel and waypoint.",
      "Describe how Linkerd issues identity and enforces mTLS.",
      "Explain listeners, filter chains, routes and clusters in Envoy.",
      "Propose a retry strategy that avoids multiplication between layers.",
      "Define an authorization policy based on workload identity.",
      "Explain how Gateway API/GAMMA represents mesh routes.",
      "Design a multi-cluster topology and identify its trust boundaries.",
      "Create a troubleshooting plan for error 503 after changing the route.",
      "Discuss when not to adopt a service mesh."
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
        "Ambient mode",
        "Istio data plane model without mandatory sidecar in each pod."
      ],
      [
        "Control plane",
        "Component that calculates and distributes configuration, identity and policy."
      ],
      [
        "Data plan",
        "Proxies or components that directly process traffic."
      ],
      [
        "East-west",
        "Traffic between internal services or domains."
      ],
      [
        "Envoy",
        "High-performance L4/L7 proxy used in meshes and gateways."
      ],
      [
        "GAMMA",
        "Initiative to use the Kubernetes Gateway API in service mesh."
      ],
      [
        "Istiod",
        "Central component of the Istio control plane."
      ],
      [
        "mTLS",
        "TLS with mutual authentication between peers."
      ],
      [
        "north-south",
        "Traffic that crosses the edge of the environment."
      ],
      [
        "Sidecar",
        "Proxy running alongside the application in the same pod."
      ],
      [
        "Service identity",
        "Cryptographic identity associated with the workload."
      ],
      [
        "Traffic split",
        "Weighted distribution of traffic between destinations."
      ],
      [
        "Trust domain",
        "Trusted identities administrative space."
      ],
      [
        "Waypoint proxy",
        "L7 proxy used in the Istio environment for services or workloads."
      ],
      [
        "xDS",
        "Envoy family of dynamic configuration APIs."
      ],
      [
        "ztunnel",
        "Istio data plane environment per-node proxy."
      ]
    ]
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Istio Documentation. Architecture; Sidecar or environment?; Ambient data plan; Security and Traffic Management.",
      "Linkerd Documentation. Architecture; Automatic mTLS; Authorization Policy; Multi-cluster communication.",
      "Envoy Proxy Documentation. Architecture Overview; Listeners; HTTP routing; Cluster Manager; xDS APIs; Overload Manager.",
      "Kubernetes SIG Network. API Gateway; API Gateway for Service Mesh; GAMMA Initiative.",
      "CNCF. Service Mesh Interface and cloud native architecture materials.",
      "IETF. RFC 8446 - The Transport Layer Security Protocol Version 1.3.",
      "OpenTelemetry Documentation. Distributed Tracing and semantic conventions for HTTP and RPC."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Istio, Linkerd, Envoy and Gateway API continually evolve. Validate the official documentation of the deployed version before applying manifests, policies, upgrade procedures or sidecar, ambient, API Gateway and multi-cluster support decisions."
  }
];
