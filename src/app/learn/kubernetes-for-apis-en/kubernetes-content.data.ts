import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const KUBERNETES_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Kubernetes for APIs: Reconcile State, Traffic, and Capacity"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/overview.svg",
    "alt": "Kubernetes cluster running APIs with routing, security and observability",
    "caption": "Opening figure - Kubernetes provides reconciliation and operational abstractions; the API path traverses multiple layers."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes maintains desired state by reconciliation; reliability depends on the right combination of workloads, network, capacity, security and observability."
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
    "text": "The previous chapters presented microservices, messaging, service mesh and observability. Kubernetes is the platform that often brings these elements together in production: schedules workloads, distributes configurations, exposes services, runs rollouts, enforces policies, and provides a declarative API for automation. For API teams, however, just knowing kubectl commands is not enough. It is necessary to understand how each abstraction interferes with the request path, resource consumption, workload identity and behavior during failures."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes does not automatically transform an application into a resilient system. The cluster can restart a container, but it does not know if a business operation is idempotent. You can create more replicas, but you don't know the database's connection limit. It can balance traffic between Pods, but does not fix a shallow readiness probe. The platform automates mechanisms; architecture needs to provide coherent signals, contracts, limits, and policies."
  },
  {
    "kind": "paragraph",
    "text": "This chapter walks through the cluster from control plane to Pod and connects the concepts directly to the API lifecycle. Deployments, Services, EndpointSlices, DNS, API Gateway, resources and limits, probes, autoscaling, scheduling, configuration, secrets, identity, RBAC, NetworkPolicy, storage, observability, GitOps and troubleshooting will be studied. The focus is to build an operational mental model: given a symptom observed by the consumer, what objects and evidence should be examined?"
  },
  {
    "kind": "paragraph",
    "text": "The approach considers managed and self-managed clusters, without depending on a specific provider. Examples use stable features and widely adopted standards. Additional features, controllers, and CRDs can extend Kubernetes, but must be evaluated as software with its own lifecycle, compatibility, permissions, and operational impact."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each object, differentiate spec (desired state), status (observed state), responsible controller, generated events and external dependencies. This reading is more useful than memorizing isolated commands."
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
      "Explain the cluster architecture and the function of the main components of the control plane and nodes.",
      "Relate the declarative model and the reconciliation loop to the operation of APIs.",
      "Distinguish Pod, ReplicaSet, Deployment, StatefulSet, DaemonSet, Job and CronJob.",
      "Understand Services, DNS, EndpointSlices, Ingress and API Gateway.",
      "Configure requests, limits, probes and rollout strategies coherently.",
      "Explain HPA, VPA and node autoscaling, including their dependencies and conflicts.",
      "Apply ServiceAccounts, RBAC, Pod Security Standards, NetworkPolicies and Secrets protection.",
      "Relate namespaces, quotas, scheduling and topology to isolation and availability.",
      "Integrate logs, metrics, tracing and events into cluster troubleshooting.",
      "Design a declarative, auditable, and secure delivery chain for APIs."
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
      "33.1 Kubernetes as a reconciliation system",
      "33.2 Cluster architecture",
      "33.3 Pods and container lifecycle",
      "33.4 Workload Controllers and Deployments",
      "33.5 Services, DNS and EndpointSlices",
      "33.6 Ingress and API Gateway",
      "33.7 ConfigMaps, Secrets and configuration",
      "33.8 Requests, limits and QoS",
      "33.9 Startup, readiness and liveness probes",
      "33.10 Autoscaling and capacity",
      "33.11 Scheduling, topology and availability",
      "33.12 Security, identity and network",
      "33.13 Storage and stateful workloads",
      "33.14 Observability, delivery, troubleshooting and laboratories"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.1 Kubernetes as a reconciliation system",
    "id": "33-1-kubernetes-as-a-reconciliation-system"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes is a declarative platform. The user creates or changes objects in the API, describing a desired state. Controllers observe these objects and the actual state of the cluster, calculate differences, and take actions to reduce divergence. A Deployment with three replicas is not a command to start three processes; is a persistent statement that will continue to be reconciled when Pods fail, nodes are drained, or a new version is published."
  },
  {
    "kind": "paragraph",
    "text": "This model produces an important change in reasoning. In imperative systems, automation executes steps and considers the work complete when the commands return success. In Kubernetes, accepting a manifest simply indicates that the object has passed through the API and been persisted. Actual availability depends on scheduling, image download, initialization, probes, dependencies and controller status. Therefore, pipelines need to observe conditions, not just the return of the apply."
  },
  {
    "kind": "paragraph",
    "text": "The Kubernetes API is extensible. CustomResourceDefinitions allow registering new types and controllers can implement their own semantics, forming operators. This capacity enables banks, gateways, certificates and internal platforms, but also increases the operational surface. Each CRD needs ownership, upgrade policy, RBAC, backups and understanding of what happens when its controller becomes unavailable."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "Accepted object does not mean ready workload. Read generation, observedGeneration, conditions, events and controller status to know if the desired state was actually achieved."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.2 Cluster architecture",
    "id": "33-2-cluster-architecture"
  },
  {
    "kind": "paragraph",
    "text": "A cluster has control plane and worker nodes. The kube-apiserver exposes the API and centralizes authentication, authorization, admission and persistence. etcd stores the state of the cluster. The scheduler chooses a node for Pods not yet scheduled considering resources, affinities, restrictions and plugins. The kube-controller-manager runs reconciliation loops for native objects. Providers can add cloud-controller-manager and other controllers."
  },
  {
    "kind": "paragraph",
    "text": "On nodes, the kubelet ensures that the containers described in the PodSpecs are running through a compatible container runtime. The Pod network is implemented by CNI plugins; persistence uses CSI; Device integration can use specific plugins. The proxy component or an equivalent implementation maintains Services forwarding rules. In managed clusters, some of these components are operated by the provider, but their responsibilities remain diagnostically relevant."
  },
  {
    "kind": "paragraph",
    "text": "The cluster API is a critical frontier. Every automation, operator and person with credentials can potentially change the state of the environment according to their permissions. Control plane availability affects changes and reconciliation, although existing workloads may continue processing traffic for some time. Etcd backups, access policies, auditing and recovery procedures belong to the design of the platform."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-01.svg",
    "alt": "Control plane coordinating worker nodes and workloads",
    "caption": "Figure 1 - The control plane maintains the state and coordinates the nodes; workloads run on worker nodes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.3 Pods and container lifecycle",
    "id": "33-3-pods-and-container-lifecycle"
  },
  {
    "kind": "paragraph",
    "text": "Pod is the smallest deployable unit of Kubernetes. A Pod contains one or more co-located containers, sharing network namespace and volumes defined in the PodSpec. Containers in the same Pod communicate via localhost and are scheduled together. This coupling is suitable for sidecars or auxiliaries that belong to the same life cycle; it is not a mechanism for putting multiple independent microservices on the same unit."
  },
  {
    "kind": "paragraph",
    "text": "Pods are disposable. A new Pod typically receives a new UID and IP address. Applications should not depend on the identity of a specific instance. Durable state must be on external systems or persistent volumes, and discovery must use Service or equivalent mechanisms. Kubernetes restarts containers in the same Pod according to the restartPolicy, but replacements performed by controllers generate new Pods."
  },
  {
    "kind": "paragraph",
    "text": "The cycle includes creation, scheduling, image pull, execution of init containers, container startup, probes, hooks and termination. When removing a Pod, the kubelet sends a termination signal, respects the grace period and forcefully terminates when necessary. APIs need to respond to SIGTERM, stop accepting new requests, complete work in progress on time, and close resources. Ignoring this cycle causes errors during rollouts and node drains."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Containers in the same Pod share operational destination and life cycle.",
    "headers": [
      "Element",
      "Function",
      "Use in APIs"
    ],
    "rows": [
      [
        "Init container",
        "Runs before main containers.",
        "Short and deterministic preparation; it should not replace coordinated migration."
      ],
      [
        "Sidecar",
        "Auxiliary container in the same Pod.",
        "Mesh proxy, agent, or tightly coupled adaptation."
      ],
      [
        "Ephemeral container",
        "Temporary diagnosis.",
        "Pod inspection without tools, under access control."
      ],
      [
        "Lifecycle hook",
        "Action on container events.",
        "Drainage, registration or controlled closure."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.4 Workload Controllers and Deployments",
    "id": "33-4-workload-controllers-and-deployments"
  },
  {
    "kind": "paragraph",
    "text": "Applications should not create isolated Pods for production. Workload controllers manage replicas and replacements. Deployment is the common choice for stateless APIs: it maintains ReplicaSets and performs declarative updates. StatefulSet provides stable identity and ordering for workloads that really need these properties. DaemonSet performs one copy per eligible node, while Job and CronJob represent finite, scheduled work."
  },
  {
    "kind": "paragraph",
    "text": "In rolling update, Deployment gradually creates Pods of the new revision and removes old replicas. maxSurge controls additional temporary capacity; maxUnavailable limits unavailability during rollout. These values need to be compatible with quotas, node capacity, and probe behavior. A rollout can be blocked by invalid image, lack of resources, failing readiness, or restrictive PDBs and scheduling policies."
  },
  {
    "kind": "paragraph",
    "text": "Rollback restores a previous revision of the template, but does not undo changes to the database, topics, contracts or external dependencies. Secure strategies separate schema changes, maintain compatibility during the coexistence window, and use telemetry for promotion. Canary and blue-green typically require a delivery or routing controller that divides traffic and evaluates metrics; Pure Kubernetes provides the blocks, not the entire decision policy."
  },
  {
    "kind": "subhead",
    "text": "Deployment in a nutshell for a stateless API"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: apps/v1 kind: Deployment metadata: name: clients-api spec: replicas: 3 strategy: rollingUpdate: maxSurge: 1 maxUnavailable: 0 selector: matchLabels: app: clients-api template: metadata: labels: app: clients-api spec: containers: - name: api image: registry.example/clientes-api:2.4.0 ports: - containerPort: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.5 Services, DNS and EndpointSlices",
    "id": "33-5-services-dns-and-endpointslices"
  },
  {
    "kind": "paragraph",
    "text": "Service provides a stable logical endpoint for a set of Pods selected by labels or explicit configuration. ClusterIP creates internal access; NodePort publishes a port on nodes; LoadBalancer requests integration with an external balancer when the platform offers this feature. ExternalName creates a DNS alias and does not act as a proxy. The choice should reflect topology, not momentary convenience."
  },
  {
    "kind": "paragraph",
    "text": "The cluster DNS creates names for Services. An application in the same namespace can only use the short name; in other namespaces, it uses a qualified name such as cliente-api.pagamentos.svc. The TTL, resolver behavior, connection pools, and EndpointSlices updates influence how long consumers keep old destinations. An already established connection is not automatically moved when the Pod set changes."
  },
  {
    "kind": "paragraph",
    "text": "EndpointSlices represent backend addresses associated with Services and include conditions such as ready, serving and terminating. Proxies and controllers use this information to schedule traffic. If a readiness probe fails, the Pod may continue Running, but no longer appear as a ready target. This detail explains why looking at the Pod phase alone is insufficient during incidents."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Service abstracts destinations, but network implementation remains relevant.",
    "headers": [
      "Type of Service",
      "Exhibition",
      "Note"
    ],
    "rows": [
      [
        "ClusterIP",
        "Cluster network only.",
        "Standard for internal communication."
      ],
      [
        "NodePort",
        "Port on each node.",
        "Often used as a block for balancers; requires network control."
      ],
      [
        "LoadBalancer",
        "External or internal address of the provider.",
        "Cost, health checks and customer origin depend on the implementation."
      ],
      [
        "ExternalName",
        "CNAME in the cluster's DNS.",
        "No native selector, proxy or health check."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.6 Ingress and API Gateway",
    "id": "33-6-ingress-and-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Ingress is a consolidated resource for exposing HTTP and HTTPS, but its model is limited and several behaviors depend on specific annotations for each controller. API Gateway evolves this area with explicit separation of responsibilities. GatewayClass represents an implementation; Gateway requests listeners and infrastructure; Routes, like HTTPRoute, describe how traffic is associated with Services."
  },
  {
    "kind": "paragraph",
    "text": "The separation allows the platform team to manage classes, addresses and listeners, while application teams control authorized routes. HTTPRoute offers matches by hostname, path, headers and other criteria, as well as filters and multiple backends as supported by the implementation. ReferenceGrant controls references between namespaces and reduces implicit coupling."
  },
  {
    "kind": "paragraph",
    "text": "For enterprise APIs, API Gateway can organize inbound traffic without replacing a full API Gateway. OAuth authentication, consumer quotas, monetization, advanced transformation, and developer portal can all remain on one API Management platform. The design must decide where TLS ends, where identity is validated, how the source address is preserved, and what policies are applied at each layer."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-02.svg",
    "alt": "Gateway and Route forwarding traffic through Service and EndpointSlices",
    "caption": "Figure 2 - Gateway and Route select the Service; EndpointSlices route traffic to eligible Pods."
  },
  {
    "kind": "subhead",
    "text": "Simplified HTTPRoute"
  },
  {
    "kind": "paragraph",
    "text": "apiVersion: gateway.networking.k8s.io/v1 kind: HTTPRoute metadata: name: clients spec: parentRefs: - name: gateway-corporate hostnames: - api.example.com rules: - matches: - path: type: PathPrefix value: /clientes backendRefs: - name: clients-api port: 8080"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.7 ConfigMaps, Secrets and configuration",
    "id": "33-7-configmaps-secrets-and-configuration"
  },
  {
    "kind": "paragraph",
    "text": "ConfigMap stores non-sensitive data decoupled from the image. It can be consumed as environment variables, arguments or files on volumes. Changes to variables do not update existing processes; Projected volumes may reflect changes after some time, but the application needs to reload the file. Configuration hash-controlled restarts are common to make the effective version explicit."
  },
  {
    "kind": "paragraph",
    "text": "Secret represents a small amount of sensitive data, but its existence does not guarantee complete protection. Data can simply be base64 encoded in the manifest, persisted in etcd and exposed to users with read permissions or create Pods capable of mounting it. Best practices include encryption at rest, minimal RBAC, integration with KMS or CSI providers, rotation, and preventing accidental logs."
  },
  {
    "kind": "paragraph",
    "text": "Configuration must be versioned and validated as part of the operational contract. Timeouts, URLs, flags, certificates and limits need schema, ownership and rollback strategy. Placing large files, binary artifacts, or long-lived secrets in generic objects increases risk. For APIs, invalid configuration should cause clear initialization failure, not partially functional behavior."
  },
  {
    "kind": "subhead",
    "text": "Secret is not identity"
  },
  {
    "kind": "paragraph",
    "text": "Mounting a static credential across all Pods creates difficult distribution and rotation. When possible, prefer workload identity and temporary credentials tied to the ServiceAccount or provider."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.8 Requests, limits and QoS classes",
    "id": "33-8-requests-limits-and-qos-classes"
  },
  {
    "kind": "paragraph",
    "text": "Requests express resources used by the scheduler to position Pods and are the basis for various autoscaling and capacity mechanisms. Limits restrict consumption depending on the resource and runtime. CPU above limit tends to be throttled; Memory exceeding the limit can lead to OOMKill. Too low a request causes overcommit and competition; Too high prevents scheduling and wastes reserved capacity."
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes classifies Pods into QoS classes according to requests and limits. Guaranteed requires equal requests and limits for CPU and memory for all containers. Burstable covers the other Pods with some reserve. BestEffort has no requests or limits and tends to be the first candidate under resource pressure. QoS does not replace priority, PDB or capacity; is just one of the signals used in pressure situations."
  },
  {
    "kind": "paragraph",
    "text": "For APIs, value must come from testing and telemetry. CPU usually follows throughput, while memory can depend on heap, cache, buffers, connections and payloads. Sidecars also consume resources and need to be included in the calculation. Hard limits can increase latency through throttling; Absence of limits can allow a failure to affect the entire node. The decision needs to balance isolation, efficiency, and runtime behavior."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Requests and limits are engineering parameters, not decorative values.",
    "headers": [
      "Configuration",
      "Main effect",
      "Common fault"
    ],
    "rows": [
      [
        "CPU request",
        "Logical reservation for scheduling.",
        "Too low creates contention; too high leaves Pod Pending."
      ],
      [
        "CPU limit",
        "CPU time ceiling.",
        "Throttling and high latency."
      ],
      [
        "memory request",
        "Scheduling and capacity basis.",
        "Underestimation produces pressure and evictions."
      ],
      [
        "Memory limit",
        "Container memory ceiling.",
        "OOMKill and restart."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.9 Startup, readiness and liveness probes",
    "id": "33-9-startup-readiness-and-liveness-probes"
  },
  {
    "kind": "paragraph",
    "text": "Startup probe indicates whether the application has finished starting. While it is unsuccessful, liveness and readiness can be suppressed, preventing a slow application from being restarted before it is ready. Readiness determines whether the endpoint should receive traffic; failure removes the Pod from ready targets. Liveness signals that the process is irretrievably stuck and must be restarted."
  },
  {
    "kind": "paragraph",
    "text": "Mixing these responsibilities is dangerous. A liveness probe that queries the database, DNS, or external service can restart all replicas during a downstream failure, magnifying the incident. Readiness can consider essential dependencies, but needs to avoid flapping and cascading effects. The probe response must be cheap, deterministic and have a timeout shorter than the period."
  },
  {
    "kind": "paragraph",
    "text": "During termination, the application needs to fail readiness before closing connections, allowing the balancer to stop sending new requests. preStop can help, but should not depend on arbitrary time without observation. The grace period must cover drain, long requests and telemetry flush. WebSocket, gRPC streaming and messaging consumers require their own termination logic."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-03.svg",
    "alt": "Startup, readiness and liveness probes with different responsibilities",
    "caption": "Figure 3 - Startup, readiness and liveness control different moments and decisions."
  },
  {
    "kind": "subhead",
    "text": "Example of probes with separate responsibilities"
  },
  {
    "kind": "paragraph",
    "text": "startupProbe: httpGet: path: /health/startup port: 8080 periodSeconds: 5 failureThreshold: 30 readinessProbe: httpGet: path: /health/ready port: 8080 periodSeconds: 5 timeoutSeconds: 2 livenessProbe: httpGet: path: /health/live port: 8080 periodSeconds: 10 failureThreshold: 3"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.10 Autoscaling and capacity",
    "id": "33-10-autoscaling-and-capacity"
  },
  {
    "kind": "paragraph",
    "text": "HorizontalPodAutoscaler adjusts the desired number of replicas of a scalable target based on metrics. CPU and memory can come from the resource metrics API; Custom and external metrics require adapters. The calculation uses requests as a reference in several scenarios, so missing or incorrect requests impair the behavior. ScaleUp, scaleDown, stabilizationWindow and tolerance policies reduce oscillations."
  },
  {
    "kind": "paragraph",
    "text": "VerticalPodAutoscaler recommends or applies new requests and limits according to history, depending on the mode and installed implementation. Changes may require recreating Pods. HPA and VPA can compete when they both act on the same metric, so the architecture needs to define responsibilities. Node autoscaling adds or consolidates nodes when Pods cannot be scheduled or there is idle capacity."
  },
  {
    "kind": "paragraph",
    "text": "Horizontal scaling does not remove external limits. If all replicas use the same database pool, increasing Pods may saturate connections sooner. RPS, queues, latency, or concurrency metrics often represent API demand better than CPU alone. Boot time, cache warm-up, and node provisioning speed need to factor in for peak scaling."
  },
  {
    "kind": "subhead",
    "text": "Coordinated scaling across multiple layers"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-04.svg",
    "alt": "HPA, scheduler and node capacity in a coupled system",
    "caption": "Figure 4 - HPA, scheduler and node capacity form a coupled system."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.11 Scheduling, topology and availability",
    "id": "33-11-scheduling-topology-and-availability"
  },
  {
    "kind": "paragraph",
    "text": "The scheduler filters and scores nodes according to resources, selectors, affinity, taints, tolerances and topology restrictions. nodeSelector is simple; node affinity expresses mandatory or preferred rules. Pod affinity approximates workloads, while anti-affinity and topology spread constraints distribute replicas across nodes and zones. Excessive restrictions can leave Pods Pending during crashes or expansion."
  },
  {
    "kind": "paragraph",
    "text": "Taints repel Pods without corresponding tolerance and are useful for dedicated nodes, GPUs, critical workloads or special conditions. Toleration only allows scheduling; does not guarantee preference or exclusivity. PriorityClass influences preemption, potentially removing lower priority Pods to accommodate critical work. This mechanism needs governance to not make every application a top priority."
  },
  {
    "kind": "paragraph",
    "text": "PodDisruptionBudget limits simultaneous voluntary interruptions, such as draining and maintenance, but does not protect against node or application failure. A PDB that is incompatible with the number of replicas can block upgrades. True availability combines replicas, cross-zone distribution, probes, capacity, timeouts and dependency redundancy. Having three Pods on the same node does not provide node loss tolerance."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Scheduling translates isolation and availability requirements into restrictions.",
    "headers": [
      "Mechanism",
      "Question answered",
      "Caution"
    ],
    "rows": [
      [
        "Affinity / anti-affinity",
        "Which Pods or nodes should be close together or separate?",
        "Mandatory rules may reduce eligible capacity."
      ],
      [
        "Topology spread",
        "How to distribute replicas per domain?",
        "Topology labels need to be reliable."
      ],
      [
        "Taints/tolerances",
        "Which workloads can use a given node?",
        "Toleration does not create affinity."
      ],
      [
        "PDB",
        "How many voluntary interruptions are allowed?",
        "Does not cover unintentional failures or replace replicas."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.12 Security, identity and network isolation",
    "id": "33-12-security-identity-and-network-isolation"
  },
  {
    "kind": "paragraph",
    "text": "ServiceAccount provides identity to processes in Pods when they access the Kubernetes API or integrated systems. Projected tokens are temporary, have an audience and can be linked to the Pod's lifecycle. Each workload must have a specific ServiceAccount and automountServiceAccountToken must be disabled when the token is not needed. Workload identity should not be shared between applications without reason."
  },
  {
    "kind": "paragraph",
    "text": "RBAC controls actions on API resources through Roles, ClusterRoles and bindings. Permissions such as creating Pods, updating Deployments, reading Secrets or linking roles can allow indirect escalation. The principle of least privilege requires reviewing verbs, resources, subresources, namespaces, and impersonation capabilities. Human and automation access must be audited and separated."
  },
  {
    "kind": "paragraph",
    "text": "Pod Security Standards define Privileged, Baseline, and Restricted levels for Pod security properties. Admission can apply policies per namespace. NetworkPolicy controls allowed communication between Pods and network entities, as long as the CNI plugin implements the feature. Default-deny policies, explicit egress, execution without root, read-only filesystem, seccomp and minimum capabilities reduce the impact of compromise."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-05.svg",
    "alt": "Layers of security protecting workloads and secrets",
    "caption": "Figure 5 - Effective security combines identity, authorization, Pod policies, networking, and secrets protection."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Each control protects a different surface.",
    "headers": [
      "Control",
      "Scope",
      "Example for APIs"
    ],
    "rows": [
      [
        "ServiceAccount",
        "Workload identity.",
        "API uses temporary credential to access cloud service."
      ],
      [
        "RBAC",
        "Kubernetes API.",
        "Runtime cannot list Secrets or change Deployments."
      ],
      [
        "Pod Security",
        "Pod Configuration.",
        "Without root, without privilege escalation and with seccomp."
      ],
      [
        "NetworkPolicy",
        "L3/L4 traffic between workloads.",
        "Only gateway accesses the API port; limited egress."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.13 Namespaces, quotas and multi-tenancy",
    "id": "33-13-namespaces-quotas-and-multi-tenancy"
  },
  {
    "kind": "paragraph",
    "text": "Namespaces organize names and policies, but they are not an absolute security boundary in and of themselves. Many resources, such as Roles, ResourceQuotas, and NetworkPolicies, are namespace-scoped, which allows you to delegate parts of the cluster to teams. Cluster-scoped resources, nodes, CRDs, and shared components continue to require central governance."
  },
  {
    "kind": "paragraph",
    "text": "ResourceQuota limits aggregate consumption of CPU, memory, storage and number of objects in a namespace. LimitRange defines defaults and limits per object. Quotas prevent a team from consuming all capacity, but rigid values without an adjustment process can block rollouts and incident response. Shared environments also need network isolation, RBAC, admission and tenant observability."
  },
  {
    "kind": "paragraph",
    "text": "Strong multi-tenancy may require separate clusters, virtualization, or additional mechanisms depending on risk. Namespace isolation is often suitable for teams from the same organization with partial trust; should not be assumed to be equivalent to physically independent environments. The decision needs to consider data, regulatory requirements, blast radius, cost and operating capacity."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.14 Stateful storage and workloads",
    "id": "33-14-stateful-storage-and-workloads"
  },
  {
    "kind": "paragraph",
    "text": "Volumes solve data needs within the Pod cycle, while PersistentVolume and PersistentVolumeClaim abstract storage with its own life cycle. StorageClass describes classes and dynamic provisioning. Access modes, reclaim policy, expansion, snapshots, zones and performance vary depending on the CSI driver and provider. A Bound PVC does not guarantee that the application has consistency or adequate backup."
  },
  {
    "kind": "paragraph",
    "text": "StatefulSet provides stable identity, ordering and volume templates per replica, but does not transform any database into a secure distributed system. Bank operators can automate members, failover and backup, but add critical dependency on a controller. For most stateless APIs, data must remain in external services designed for persistence, while Pods can be freely replaced."
  },
  {
    "kind": "paragraph",
    "text": "Backups need to include data, metadata, and tested restore capability. Copying manifests does not recover volumes or external state. Schema changes must be compatible with rollouts and rollback. Migration jobs need locking, idempotence and observability; Running them as each replica's init container can produce concurrency and unavailability."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.15 Observability of the cluster and APIs",
    "id": "33-15-observability-of-the-cluster-and-apis"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes produces multiple sources: component and node metrics, container and system logs, object events, audit logs, and resource status. Events are useful for scheduling, pulls, probes and admission, but they have limited retention and do not replace centralized logs. Logs need cycled storage independent of Pods and nodes to survive restarts and evictions."
  },
  {
    "kind": "paragraph",
    "text": "The application must continue emitting structured logs, metrics and traces as studied in the previous chapter. Resource attributes such as cluster, namespace, Pod, container and Deployment allow correlation. kube-state-metrics exposes state of objects; metrics-server supports the resource metrics API and autoscaling, it is not a replacement for a full observability platform. Collector can be deployed as an agent per node and as a central gateway depending on volume and requirements."
  },
  {
    "kind": "paragraph",
    "text": "Alerts should relate user symptoms to cluster signals. Increase of 5xx may coincide with Pods not ready, OOMKills, throttling, DNS, NetworkPolicy or external backend. CPU-only dashboards do not explain this chain. Traces with Pod identity, logs with trace_id and metrics per revision reduce the time to separate platform failure from application failure."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Trustworthy diagnostics combines declarative state and execution telemetry.",
    "headers": [
      "Evidence",
      "Question",
      "Tool or object"
    ],
    "rows": [
      [
        "Status and conditions",
        "Did the controller achieve what was desired?",
        "kubectl get/describe and object API."
      ],
      [
        "Events",
        "What recent decision occurred?",
        "Scheduling, pull, probe and volume events."
      ],
      [
        "Logs",
        "What did the process record?",
        "Container, sidecar and component logs."
      ],
      [
        "Metrics and traces",
        "What impact and path?",
        "Prometheus/OpenTelemetry and observability backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.16 Declarative delivery, images and supply chain",
    "id": "33-16-declarative-delivery-images-and-supply-chain"
  },
  {
    "kind": "paragraph",
    "text": "A secure chain starts with the image. The build must be reproducible, use a minimum and updated base, produce SBOM, run scanners and sign the artifact. Mutable tags make auditing difficult; digests identify exact content. The runtime must restrict registries, verify signatures according to policy, and prevent privileged containers or unapproved images."
  },
  {
    "kind": "paragraph",
    "text": "Manifests can be managed with YAML, Kustomize, Helm or equivalent tools. GitOps maintains the desired state in the repository and a controller reconciles the cluster, creating an auditable trail. This does not eliminate validation: pull requests need schema, policy-as-code, diff, testing and segregation of functions. Secrets should not be committed in clear text."
  },
  {
    "kind": "paragraph",
    "text": "Rollouts need readiness, surge strategy, temporary capacity and success metrics. Progressive delivery can pause, analyze SLOs, and promote gradually. Rollback must consider bank and contracts. A technically successful deployment, but with a functional error, will only be stopped if telemetry and promotion criteria represent the real consumer experience."
  },
  {
    "kind": "subhead",
    "text": "Declarative Delivery: From Artifact to Reconciled State"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-06.svg",
    "alt": "GitOps reconciling desired state and observed state",
    "caption": "Figure 6 - GitOps makes the desired state auditable; controllers remain responsible for convergence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.17 API Gateways, service mesh and Kubernetes",
    "id": "33-17-api-gateways-service-mesh-and-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "In Kubernetes, ingress or Gateway API takes care of ingress and routing to Services, while an API Management platform can provide catalog, authentication, quotas, policies and analytics. The gateway can run outside, at the edge of the cluster or as an internal workload. The decision affects latency, blast radius, certificate management and dependence on the cluster itself to receive traffic."
  },
  {
    "kind": "paragraph",
    "text": "Service mesh operates mainly on east-west traffic and provides workload identity, mTLS, telemetry and policies. It must not duplicate retries, timeouts and circuit breakers already existing on the client or gateway in an uncoordinated manner. The consumer - edge - API Gateway - mesh - service chain can have multiple TLS endpoints and observability; the drawing needs to document the authority of each layer."
  },
  {
    "kind": "paragraph",
    "text": "Gateways and proxies also need requests, limits, probes, PDBs and zone distribution. The fact that they are shared infrastructure increases their impact. Updates must preserve connections, routes, and policies. Distributed rate limiting counters, caches and session stores need their own architecture; they should not depend solely on the number of gateway replicas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.18 Troubleshooting APIs in Kubernetes",
    "id": "33-18-troubleshooting-apis-in-kubernetes"
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis starts with the external symptom and goes through layers. If the name does not resolve, investigate DNS and gateway address. If there is a connection timeout, validate the load balancer, listeners, NetworkPolicies and endpoints. If the gateway responds 503, examine Route, Service, EndpointSlices, and readiness. If the Pod restarts, see container status, lastState, exit code, events, limits and previous logs."
  },
  {
    "kind": "paragraph",
    "text": "Pending usually points to scheduling: insufficient resources, PVC, affinity, taints or quotas. ImagePullBackOff indicates access, name, tag, credential or registry. CrashLoopBackOff is a wait policy after repeated crashes, not the cause; the cause is in the process, configuration, probe, or dependency. OOMKilled relates to memory, while CPU throttling appears in metrics and latency without necessarily restarting the container."
  },
  {
    "kind": "paragraph",
    "text": "Tools must be used with hypothesis. kubectl describe shows events and conditions; logs --previous retrieves the previous run; port-forward isolates network path; ephemeral containers help when the image has no utilities. Captures, DNS and connectivity tests must respect authorization. Changing probe, policy or limit without evidence can hide the problem and create another incident."
  },
  {
    "kind": "subhead",
    "text": "Layer-oriented troubleshooting"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/kubernetes-for-apis/en/figure-07.svg",
    "alt": "Troubleshooting flow from Kubernetes objects to the application",
    "caption": "Figure 7 - The investigation progresses from the declared object to the application behavior and its dependencies."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Known states reduce trial and error troubleshooting.",
    "headers": [
      "Symptom",
      "Early evidence",
      "Hypotheses"
    ],
    "rows": [
      [
        "Pod Pending",
        "Events and scheduler message.",
        "Resources, affinity, taint, PVC, quota."
      ],
      [
        "CrashLoopBackOff",
        "Current/previous logs and exit code.",
        "Configuration, process, probe or dependency."
      ],
      [
        "Service without endpoints",
        "EndpointSlices and readiness.",
        "Incorrect selector or Pods not ready."
      ],
      [
        "503 on gateway",
        "Route, Service, endpoints and upstream logs.",
        "Backend unavailable, policy or timeout."
      ],
      [
        "OOMKilled",
        "lastState, limits and metrics.",
        "Heap, leak, cache, payload or low limit."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "33.19 Case studies and labs",
    "id": "33-19-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - rollout with 503: a new version starts in 70 seconds, but liveness starts after 10 seconds and restarts the container. Deployment never gets ready replicas. The fix separates startup and liveness, adjusts the grace period, and adds per-revision monitoring. The cause was not in Service, although the consumer observed 503."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - HPA increases bank error: HPA scales from 5 to 40 Pods per CPU, but each Pod opens 20 connections. The bank only supports 300 connections. The correct answer includes coherent global pool, scale limit, queue metric, and backend protection; simply increasing the cluster would magnify the failure."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - API inaccessible after default-deny: a NetworkPolicy ingress allows the gateway namespace, but the Pod selector does not match the actual labels. EndpointSlices are still ready, but packages are blocked by the CNI. The investigation compares labels, policy and traffic, without removing the entire policy permanently."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Deploy an API with Deployment, Service and HTTPRoute. 2) Simulate readiness failure and observe EndpointSlices. 3) Configure requests/limits and trigger OOM in an isolated environment. 4) Apply HPA and track metrics. 5) Create ServiceAccount, minimum RBAC and NetworkPolicy default-deny. 6) Perform rollout and rollback with review observability."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes provides a declarative API and controllers that reconcile the desired state. This abstraction allows you to automate replicas, rollouts, scheduling, configuration and exposure, but does not replace decisions about contracts, dependencies and consistency. For APIs, each object needs to be related to the request path and the signals used for operation."
  },
  {
    "kind": "paragraph",
    "text": "Pods are ephemeral; Deployments control revisions; Services and EndpointSlices provide discovery; Gateway API organizes input and routes. Requests, limits, probes, autoscaling and scheduling form a coupled system. Incoherent configurations create unavailability even when all objects appear individually valid."
  },
  {
    "kind": "paragraph",
    "text": "Security combines ServiceAccounts, RBAC, Pod Security, NetworkPolicy, secrets, supply chain and isolation. Observability combines state, events, logs, metrics and traces. Secure delivery uses immutable artifacts, validation, reconciliation, and promotion criteria. Effective troubleshooting starts from the observed state and advances through layers."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves deeper into Zero Trust applied to APIs, connecting workload identity, least privilege, segmentation, continuous verification, and distributed policies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist for APIs in Kubernetes",
    "id": "checklist-for-apis-in-kubernetes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Deployment uses immutable image, rollout and rollback strategy compatible with banks and contracts.",
      "Requests and limits were defined by testing and telemetry, including sidecars.",
      "Startup, readiness and liveness answer different questions.",
      "Service and Route have validated selectors, ports, hostnames and references.",
      "HPA uses representative metrics and respects capacity dependencies.",
      "Replicas are distributed across nodes and zones, with coherent PDB.",
      "ServiceAccount and RBAC follow least privilege; token is disabled when unnecessary.",
      "Pod Security and NetworkPolicies reduce privileges and network paths.",
      "Secrets use encryption, rotation, and minimal access.",
      "Logs, metrics, traces, events and status are correlated by revision and Pod.",
      "Pipeline validates manifests, policies, images and rollout conditions.",
      "Runbooks cover Pending, pull, crash, OOM, empty endpoints, DNS and 503."
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
      "Explain the difference between applying a manifesto and achieving the desired state.",
      "Compare Pod, Deployment, StatefulSet, DaemonSet, Job and CronJob.",
      "Describe the path DNS/Gateway/Route/Service/EndpointSlice/Pod.",
      "Explain why a Running Pod might not receive traffic.",
      "Propose requests, limits and probes for a Java API with lazy initialization.",
      "Compare HPA, VPA and node autoscaling and identify possible conflicts.",
      "Design minimal RBAC and NetworkPolicy for an API accessible only through the gateway.",
      "Explain how a PDB can block maintenance and why it does not protect against node failure.",
      "Describe a canary rollout with SLO-based promotion criteria.",
      "Build a runbook to investigate intermittent 503s after a deploy."
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
        "admission controller",
        "Step that validates or modifies objects before persistence."
      ],
      [
        "CNI",
        "Plugin interface that implements a network of containers and Pods."
      ],
      [
        "Controller",
        "Loop that reconciles observed and desired state."
      ],
      [
        "CRD",
        "API extension that registers a new resource type."
      ],
      [
        "CSI",
        "Interface for integrating storage drivers."
      ],
      [
        "Deployment",
        "Declarative update controller for generally stateless workloads."
      ],
      [
        "EndpointSlice",
        "Resource that represents network endpoints of a Service."
      ],
      [
        "Gateway API",
        "Feature family for L4/L7 routing with separate roles."
      ],
      [
        "HPA",
        "Controller that adjusts replicas horizontally by metrics."
      ],
      [
        "Namespace",
        "Logical scope for names, policies, and delegation."
      ],
      [
        "NetworkPolicy",
        "Pod communication policy implemented by the CNI."
      ],
      [
        "PDB",
        "Limit simultaneous voluntary interruptions."
      ],
      [
        "Pod",
        "Smallest deployable Kubernetes unit."
      ],
      [
        "Service",
        "Stable network abstraction for a set of backends."
      ],
      [
        "ServiceAccount",
        "Kubernetes identity intended for workloads."
      ],
      [
        "StatefulSet",
        "Controller for Pods with stable identity and ordering."
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
      "Kubernetes Documentation. Concepts, Cluster Architecture and Components.",
      "Kubernetes Documentation. Pods, Deployments, Services and EndpointSlices.",
      "Kubernetes Documentation. ConfigMaps, Secrets and Persistent Volumes.",
      "Kubernetes Documentation. Probes, Workload Autoscaling and Node Autoscaling.",
      "Kubernetes Documentation. Service Accounts, RBAC Good Practices and Pod Security Standards.",
      "Kubernetes Documentation. Network Policies, Multi-tenancy, Logging and Observability.",
      "Kubernetes Gateway API. API Overview, HTTPRoute, Security and Versioning.",
      "Cloud Native Computing Foundation. Kubernetes project and ecosystem documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Kubernetes, API Gateway, CNI/CSI plugins and managed services continually evolve. Before applying examples, validate the cluster version, implementation support, and stability state of each feature in the official documentation."
  }
];
