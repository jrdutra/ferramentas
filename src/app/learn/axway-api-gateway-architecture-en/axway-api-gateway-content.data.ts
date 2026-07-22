import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const AXWAY_GATEWAY_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "From configuration in Policy Studio to distributed processing at runtime"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/overview.svg",
    "alt": "Axway platform with design, administration, execution, persistence and operation",
    "caption": "Opening figure - The platform combines design tools, centralized administration, policy runtime, and persistence and observability components."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway combines administrative topology, versionable configuration and high-performance policy runtime."
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
    "text": "The previous chapter studied gateway policies as executable units of security, transformation, routing, and observability. Now the focus turns to a concrete corporate implementation: the Axway API Gateway. The product materializes these concepts through administrative domains, groups, gateway instances, Node Managers, Policy Studio, web operation tools and data repositories used by policies and the API Manager."
  },
  {
    "kind": "paragraph",
    "text": "Understanding architecture requires separating three views. The first is the design vision, in which teams build policy circuits, listeners, services, certificates, KPS and environment configurations. The second is the administrative view, where the domain controls groups, instances, deployments, and operational access. The third is the runtime view, in which a message enters through a listener, receives context, goes through filters, can query repositories, calls a backend and produces a response, logs and metrics."
  },
  {
    "kind": "paragraph",
    "text": "In banking and large-scale environments, the gateway is rarely alone. It typically operates behind balancers, in external and internal zones, with metrics banks, Cassandra, identity services, HSMs, directories, enterprise observability, and distributed backends. A failure in any of these dependencies may appear to the consumer as a timeout, 502, 401, reset or policy error. Therefore, the operator needs to master both the tool and the network, HTTP, TLS and identity fundamentals studied in previous chapters."
  },
  {
    "kind": "paragraph",
    "text": "This chapter is not intended to replace documentation for a specific product version. Its goal is to build a stable mental model for architecture, operation, deployment, high availability, performance and troubleshooting. Menu names and configuration details may vary between releases, but the concepts of domain, groups, instances, administration, and policy enforcement remain fundamental."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Follow each section distinguishing administrative plan, traffic runtime and persistence. When troubleshooting, explicitly write which component is being observed: Policy Studio, Admin Node Manager, Node Manager, gateway instance, API Manager, Cassandra, metrics database or backend."
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
      "Explain the relationship between domain, groups, instances, Node Managers and Admin Node Manager.",
      "Distinguish Policy Studio, API Gateway Manager, API Manager and Traffic Monitor.",
      "Describe how configurations are modeled, validated, deployed, and activated at runtime.",
      "Explain listeners, services, policy circuits, filters and message context.",
      "Relate API Manager to API Gateway without confusing the two products.",
      "Understand the role of KPS, Cassandra, metric banks and configuration files.",
      "Design high availability, horizontal scalability, multi-zone and multiple data centers.",
      "Apply TLS, mTLS, OAuth, API keys, certificates, and HSMs in the product context.",
      "Interpret logs, metrics, Traffic Monitor and traces for diagnosis.",
      "Plan performance, capacity, container deployment and operational hardening."
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
      "23.1 Product positioning and main components",
      "23.2 Domain, groups and instances",
      "23.3 Admin Node Manager and Node Managers",
      "23.4 Policy Studio and configuration model",
      "23.5 Runtime: listeners, services, circuits and filters",
      "23.6 Message context and execution flow",
      "23.7 API Manager over API Gateway",
      "23.8 KPS, Cassandra and metrics banks",
      "23.9 Deployment, promotion and rollback",
      "23.10 High availability and scalability",
      "23.11 Zone topologies and multiple data centers",
      "23.12 TLS, mTLS, PKI and encryption",
      "23.13 Authentication, OAuth and API keys",
      "23.14 Routing, connecting to backends and resilience",
      "23.15 Observability and Traffic Monitor",
      "23.16 Performance and capacity",
      "23.17 Containers and OpenShift",
      "23.18 Administrative security and hardening",
      "23.19 Troubleshooting and case studies",
      "Summary, checklist, laboratories, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.1 Product positioning and main components",
    "id": "23-1-product-positioning-and-main-components"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway is a mediation and security runtime for API and service traffic. It receives messages on configured listeners, interprets supported protocols, runs filter chains, and forwards calls to destinations. The product can operate as a reverse proxy, security enforcement point, message transformer, router and observability point. Its capabilities are not concentrated in a single executable: it is organized by design, administration, runtime and persistence tools."
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio is the main development and configuration tool. API Gateway Manager is the web interface for managing topology, tracking instances, logs and traffic. The Admin Node Manager centralizes domain management operations, while Node Managers administer components on the corresponding hosts and groups. API Gateway instances run business traffic. API Manager adds publishing, virtualization, application, consumer, key, portal, and lifecycle capabilities on top of the gateway runtime."
  },
  {
    "kind": "paragraph",
    "text": "This separation allows you to evolve policies without coupling traffic to the administrative console. It also requires discipline: administrative ports must be segregated, access must be protected by RBAC, configurations must be versioned and external dependencies must be monitored. In production, the runtime must continue processing traffic even when design tools are turned off; however, administrative changes and operations depend on the health of the management domain."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Components with different functions within the platform.",
    "headers": [
      "Component",
      "Main responsibility",
      "Operational question"
    ],
    "rows": [
      [
        "Policy Studio",
        "Develop and configure policies, listeners, certificates and environment.",
        "What configuration was created and validated?"
      ],
      [
        "Admin Node Manager",
        "Central domain administration.",
        "Is the administrative plan available?"
      ],
      [
        "Node Manager",
        "Manage instances and components on the host or group.",
        "Does the node receive and apply operations?"
      ],
      [
        "API Gateway instance",
        "Execute traffic and policy circuits.",
        "Did the request reach the runtime?"
      ],
      [
        "API Gateway Manager",
        "Monitor topology, logs, metrics and traffic.",
        "What evidence did the runtime produce?"
      ],
      [
        "API Manager",
        "Manage APIs, consumers and publishing.",
        "How was the API virtualized and exposed?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.2 Domain, groups and instances",
    "id": "23-2-domain-groups-and-instances"
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway domain is the administrative boundary that brings groups and instances together under a common management structure. The domain has an Admin Node Manager and can contain multiple groups. A group represents a logical unit of deployment and administration, often aligned to a role, zone, environment, or set of instances. Within each group, gateway instances perform configurations and process traffic."
  },
  {
    "kind": "paragraph",
    "text": "Organization into groups avoids treating each instance as an isolated configuration. When a configuration is deployed to a group, the instances in that group must operate coherently. This is essential in clusters behind a balancer: any eligible node must recognize the same listeners, certificates, policies, routes, and environment references, barring explicitly parameterized differences."
  },
  {
    "kind": "paragraph",
    "text": "Domain should not be confused with DNS domain or business domain. This is a unit of the product. It should also not be assumed that all groups in a domain receive the same configuration. It is possible to organize external, internal, administrative or specialized groups, with different responsibilities and exposures. The choice influences blast radius, governance and promotion process."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/figure-01-domain-topology.svg",
    "alt": "Axway domain with Admin Node Manager, groups, Node Managers and instances",
    "caption": "Figure 1 - The domain organizes central administration, groups, Node Managers and runtime instances."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "Group is logical unit of implementation; instance is execution process; Node Manager manages components; Admin Node Manager coordinates the domain. Confusing these levels leads to wrong-target deployments and inaccurate diagnoses."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.3 Admin Node Manager and Node Managers",
    "id": "23-3-admin-node-manager-and-node-managers"
  },
  {
    "kind": "paragraph",
    "text": "The Admin Node Manager, often abbreviated as ANM, is the central administrative server for the domain. Tools like Policy Studio and API Gateway Manager connect to the administrative plane through it. The ANM coordinates topology, deployment and management operations, and therefore must be protected as a critical component. Its unavailability can prevent changes and certain administrative operations, even if gateway instances continue to serve traffic with the configuration already active."
  },
  {
    "kind": "paragraph",
    "text": "Node Managers perform management functions on hosts or groups and communicate with the Admin Node Manager. The separation allows ANM to maintain central vision while local operations are performed by Node Managers. In large topologies, the health of this communication is as important as the health of the gateway instances. Certificate, port, DNS, firewall, or version issues can impede administration without immediately affecting business traffic."
  },
  {
    "kind": "paragraph",
    "text": "High administrative availability requires specific planning. It's not enough to place the API listener behind a load balancer. The management channel uses its own ports and flows and needs an HA, backup, recovery and segregation strategy. Access to ANM should be restricted to administrative networks, least privileged accounts, and strong authentication. Administrative logs need to be preserved for auditing."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Management availability and traffic availability are different dimensions.",
    "headers": [
      "Observed failure",
      "Business traffic",
      "Administration",
      "Hypothesis"
    ],
    "rows": [
      [
        "ANM unavailable",
        "You can continue with config active.",
        "Deployment and topology may fail.",
        "Failure in the administrative plan."
      ],
      [
        "Isolated Node Manager",
        "Instance can remain active.",
        "Local operations are not enough.",
        "Network, certificate, or local process."
      ],
      [
        "Gateway instance stopped",
        "Node does not serve traffic.",
        "May appear offline.",
        "Process, JVM, resources or configuration."
      ],
      [
        "Administrative port blocked",
        "APIs can respond.",
        "Policy Studio/Manager fails.",
        "Firewall or management route."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.4 Policy Studio and the configuration model",
    "id": "23-4-policy-studio-and-the-configuration-model"
  },
  {
    "kind": "paragraph",
    "text": "Policy Studio offers a structured view of the gateway project. It configures policy circuits, filters, listeners, services, certificates, stores, alerts, KPS, environment resources and references to external systems. The tool should not be treated just as a visual editor: what it produces is executable infrastructure, with dependencies, order of filters, variables and side effects that need review and testing."
  },
  {
    "kind": "paragraph",
    "text": "A well-designed policy has clear inputs, outputs and responsibilities. Authentication filters must establish predictable attributes; authorization filters must consume trusted identity; routing filters must have a defined URL and timeout; error filters must produce consistent responses. Reusable subcircuits reduce duplication, but can increase the blast radius of changes. Therefore, reuse requires versioning and a contract."
  },
  {
    "kind": "paragraph",
    "text": "Configuration and environment data should be separated whenever possible. Backend URLs, certificate aliases, credentials, hostnames, timeouts, and per-environment parameters should not require manual editing of core logic. This separation makes it easier to promote the same artifact between development, approval and production, reducing drift and human risk."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - policy circuit"
  },
  {
    "kind": "paragraph",
    "text": "# Conceptual structure of a policy Home -> Correlation ID -> Channel and method validation -> Authentication -> Authorization -> Rate limit / quota -> Controlled transformation -> Routing to backend -> Response normalization -> Audit and metrics -> End"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.5 Runtime: listeners, services, circuits and filters",
    "id": "23-5-runtime-listeners-services-circuits-and-filters"
  },
  {
    "kind": "paragraph",
    "text": "At runtime, the listener is the entry point associated with the address, port, protocol, and TLS parameters. When a connection arrives, the gateway negotiates transport and security, identifies the applicable service, and creates the message context. The selected service directs execution to a policy circuit. The circuit is composed of filters connected according to success, failure and explicit branch paths."
  },
  {
    "kind": "paragraph",
    "text": "Filters are processing units: validate certificate, extract header, query KPS, call service, verify JWT, transform XML/JSON, record log or define a message. Each filter reads and writes attributes from the message context. The final behavior depends on the order and paths. An apparently simple filter can consume body, block thread, access network or produce response, changing performance and semantics."
  },
  {
    "kind": "paragraph",
    "text": "Circuits can call subcircuits and share logic. This modularity helps standardize authentication, auditing, and error. However, implicit dependencies on attributes generated by another circuit make the configuration fragile. A subcircuit should document which attributes it requires, which it produces, and how it signals failures. Without this contract, small changes generate regressions that are difficult to locate."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/figure-02-runtime-request.svg",
    "alt": "Listener, service, policy circuit, routing and response path at runtime",
    "caption": "Figure 2 - The runtime converts an incoming connection into filtering, routing and observable response execution."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.6 Message context and execution flow",
    "id": "23-6-message-context-and-execution-flow"
  },
  {
    "kind": "paragraph",
    "text": "The message context is the working memory of the transaction. It contains properties of the request, connection, authentication, certificates, headers, body, destination, response and intermediate attributes created by filters. Many decisions in Policy Studio are expressed as selectors or references to context attributes. This offers flexibility, but requires standardization of names and types."
  },
  {
    "kind": "paragraph",
    "text": "An attribute can only exist in a certain path. If authentication fails before creating the subject, an audit filter cannot assume that the attribute is present. If a call is served by cache, attributes generated when routing to the backend may not exist. Robust policies handle absence, empty values, and unexpected types explicitly."
  },
  {
    "kind": "paragraph",
    "text": "Context is also a security boundary. Headers received from the consumer should not be directly promoted to the trusted identity. The gateway must remove or overwrite attributes that will be propagated to the backend. Sensitive data, such as tokens, passwords and keys, should not be included in traces indiscriminately. The operator needs to balance diagnosis and information protection."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Context is powerful, but needs contract and security hygiene.",
    "headers": [
      "Attribute Type",
      "Example",
      "Caution"
    ],
    "rows": [
      [
        "Transport",
        "IP, port, TLS, certificate.",
        "NAT and proxies change the observed origin."
      ],
      [
        "HTTP",
        "Method, URI, headers, body.",
        "Body can be stream and have memory limit."
      ],
      [
        "Identity",
        "subject, client_id, scopes.",
        "Only after reliable validation."
      ],
      [
        "Routing",
        "Final URL, timeout, pool.",
        "Do not register secrets present in the URL."
      ],
      [
        "Observability",
        "correlation ID, time, status.",
        "Preserve consistency across all paths."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.7 API Manager over API Gateway",
    "id": "23-7-api-manager-over-api-gateway"
  },
  {
    "kind": "paragraph",
    "text": "API Manager is an API management layer built on top of the API Gateway runtime. It adds concepts such as virtualized APIs, consumer applications, credentials, plans, publishing, catalog and portal. The Gateway continues to be the mechanism that executes policies and serves traffic. This relationship explains why API Manager installation and configuration depends on a domain and available gateway instances."
  },
  {
    "kind": "paragraph",
    "text": "Virtualizing an API turns an imported or defined contract into a published interface on the gateway. The process associates frontend, backend, security, quotas, policies, and catalog metadata. Changes made in API Manager can generate or update artifacts that will be executed by the gateway. Therefore, teams should avoid manually editing components managed by API Manager without understanding how future synchronizations behave."
  },
  {
    "kind": "paragraph",
    "text": "API Manager also uses its own persistence, often supported by Cassandra for data from applications, organizations, APIs and credentials. The health of the runtime and the health of the management plane can diverge. An existing API may continue to respond while registration or publication operations fail due to Cassandra unavailability. The diagnosis must separate API consumption, API management and data storage from the management plan."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Management plane and runtime cooperate, but are not the same layer.",
    "headers": [
      "Object",
      "API Manager",
      "API Gateway runtime"
    ],
    "rows": [
      [
        "Virtualized API",
        "Defines publishing, frontend and policies.",
        "Performs listener, circuits and routing."
      ],
      [
        "Application",
        "Represents consumer and credentials.",
        "Validates credential during the call."
      ],
      [
        "Quota/plan",
        "Configure consumption rule.",
        "Applies counters and decision."
      ],
      [
        "Portal/catalog",
        "Facilitates discovery and onboarding.",
        "Does not participate in every call."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.8 KPS, Cassandra and metrics banks",
    "id": "23-8-kps-cassandra-and-metrics-banks"
  },
  {
    "kind": "paragraph",
    "text": "Key Property Store, or KPS, is a table of data queried by policies. It is suitable for information that is read frequently and changed less frequently, such as mappings, parameters, lists, and auxiliary data. KPS should not be used as a generic replacement for a domain transactional bank. Queries and indexes need to reflect the actual access patterns of policies."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra is used by API Manager and can also support data from KPS and other components depending on the configuration. Because it is distributed, the bank offers scalability and fault tolerance, but requires specialized operations: consistency, replication, repair, compression, disk space, heap, latency and cluster health directly influence the management plan and dependent policies."
  },
  {
    "kind": "paragraph",
    "text": "Metrics and reports can use supported relational databases. This repository has a different profile than Cassandra and KPS. Metric bank unavailability can degrade reporting and visibility without necessarily impeding traffic. However, synchronous logging configurations or poorly designed dependencies can turn observability into a bottleneck. The objective is for metrics collection to be controlled and for the platform to have planned retention and purging."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/figure-03-data-stores.svg",
    "alt": "Runtime gateway connected to KPS, Cassandra and metrics database",
    "caption": "Figure 3 - Different stores serve different purposes: policy execution, management and observability."
  },
  {
    "kind": "subhead",
    "text": "Architecture rule"
  },
  {
    "kind": "paragraph",
    "text": "Do not place data in KPS or Cassandra that requires strong transactions, arbitrary queries or updates per request without evaluating the impact. The store must be chosen based on consistency and access standards, not just because it already exists on the platform."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.9 Deployment, promotion and rollback",
    "id": "23-9-deployment-promotion-and-rollback"
  },
  {
    "kind": "paragraph",
    "text": "Deploying a configuration means transferring validated artifacts to the domain and activating them in the chosen groups or instances. In mature environments, this operation must be automated by pipeline, linked to versioning and accompanied by evidence. Manually exporting and importing configurations without traceability increases drift and makes rollback difficult."
  },
  {
    "kind": "paragraph",
    "text": "Cross-environment promotion must separate specific logic and data. The same project can reference variables, aliases and endpoints parameterized by environment. Before deployment, pipelines must perform static validation, policy tests, certificate verification and compatibility with the runtime version. After deployment, smoke tests need to cover listeners, authentication, routes, errors and observability."
  },
  {
    "kind": "paragraph",
    "text": "Rollback is not just reinstalling a previous file. If the change created structures in KPS, changed certificates, changed schema in Cassandra, or updated external dependencies, restoring the configuration alone may be insufficient. The plan must describe artifacts, data, sequence, and return criteria. In groups with multiple instances, zero downtime requires coordination to prevent them all from reloading or stopping simultaneously."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/figure-04-deployment-cycle.svg",
    "alt": "Configuration cycle between Policy Studio, Admin Node Manager, Node Managers and instances",
    "caption": "Figure 4 - The deployment cycle needs to be controlled from design to runtime activation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.10 High availability and scalability",
    "id": "23-10-high-availability-and-scalability"
  },
  {
    "kind": "paragraph",
    "text": "High traffic availability is achieved by running multiple instances behind a balancer or equivalent mechanism. Each instance needs to be able to serve the same API with coherent configuration and dependencies. Health checks must distinguish live process, active listener and actual readiness to call backends. A cursory test may leave a node in the pool without access to KPS, Cassandra, DNS, or a critical service."
  },
  {
    "kind": "paragraph",
    "text": "Horizontal scalability works best when policies are stateless or use appropriate distributed stores. Local state, unshared cache, and improper affinity can produce inconsistent behavior. When some function requires stickiness, the reason must be explicit and the impact on failover must be tested. The preference should be for node-independent identity, quota, and session whenever possible."
  },
  {
    "kind": "paragraph",
    "text": "Administrative high availability is a separate dimension. The Admin Node Manager can be configured with an HA strategy, and the administrative channel uses a different port from business traffic. Backup of configuration, data, certificates and essential files is also part of availability. HA without the ability to recover credentials and configuration after disaster is incomplete."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/axway-api-gateway-architecture/en/figure-05-high-availability.svg",
    "alt": "Load balancer with multiple gateways and administrative high availability",
    "caption": "Figure 5 - Traffic balancing and administrative availability require their own designs."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.11 Zone topologies and multiple data centers",
    "id": "23-11-zone-topologies-and-multiple-data-centers"
  },
  {
    "kind": "paragraph",
    "text": "Organizations often separate gateways into external and internal zones. The outer zone receives consumer traffic and applies edge controls; the internal zone performs additional mediation or accesses protected systems. Communication between zones must be authenticated, limited, and observable. Replicating all policies in both layers increases latency and makes ownership difficult; each zone must have clear responsibility."
  },
  {
    "kind": "paragraph",
    "text": "In multiple data centers, the design needs to decide which components are local and which data is replicated. Runtime gateways can operate close to consumers and backends, while management, Cassandra, metrics, and catalog require consistency and recovery strategy. Latency between data centers should not be ignored in KPS, introspection, policy calls or distributed databases."
  },
  {
    "kind": "paragraph",
    "text": "Failover between sites needs to be exercised. DNS, GSLB, certificates, routes, firewall, replication, and survivable site capacity are all part of the test. It is not enough to confirm that the process goes up in the second datacenter; it is necessary to prove that consumers resolve to the correct address, that credentials remain valid and that quotas, APIs and management data are consistent."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The topology must balance isolation, latency, consistency and operability.",
    "headers": [
      "Topology",
      "Advantage",
      "Main risk"
    ],
    "rows": [
      [
        "Single site, multiple nodes",
        "Simplicity and local HA.",
        "Datacenter failure."
      ],
      [
        "External + internal groups",
        "Separation of zones and responsibilities.",
        "Duplication of policies and latency."
      ],
      [
        "Active/passive multi-DC",
        "Simpler recovery.",
        "Idle capacity and poorly tested failover."
      ],
      [
        "Active/active multi-DC",
        "Distribution and lower RTO.",
        "Consistency, complex routing and operation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.12 TLS, mTLS, PKI and encryption",
    "id": "23-12-tls-mtls-pki-and-encryption"
  },
  {
    "kind": "paragraph",
    "text": "HTTPS listeners rely on server certificates, private keys, cryptographic suites, and truststores. The gateway can terminate TLS from the consumer and initiate new TLS connection to the backend. These two snippets are independent: certificate, version, SNI, hostname verification, truststore and mTLS can be different. Troubleshooting needs to indicate in which part the handshake failed."
  },
  {
    "kind": "paragraph",
    "text": "In mTLS inbound, the listener requests the client's certificate and validates string and properties. The policy can then map the certificate to an identity, but it should prefer SAN and explicit rules rather than just trusting the CN. In outbound, the gateway can present certificate to the backend. Incorrect alias, incomplete string, unavailable key, or missing permission on the HSM causes failure before HTTP."
  },
  {
    "kind": "paragraph",
    "text": "In environments with HSM or cryptographic acceleration, key operations are delegated to the device or provider. This increases key protection, but introduces session, driver, network, and capacity dependencies. Monitoring must include latency and module availability. Certificate rotation needs to be rehearsed to avoid interruption due to reload, alias or outdated truststore."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Each channel has its own cryptographic identity and chain of trust.",
    "headers": [
      "Excerpt",
      "Gateway acts as",
      "Critical Settings"
    ],
    "rows": [
      [
        "Client -> Gateway",
        "TLS server.",
        "Certificate, listener, client trust, suites."
      ],
      [
        "Gateway -> Backend",
        "TLS client.",
        "Truststore, SNI, hostname, client certificate."
      ],
      [
        "Administration",
        "Server/client management.",
        "Administrative and RBAC certificates."
      ],
      [
        "HSM",
        "Protected key consumer.",
        "Provider, session, slot, PIN and capacity."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.13 Authentication, OAuth and API keys",
    "id": "23-13-authentication-oauth-and-api-keys"
  },
  {
    "kind": "paragraph",
    "text": "The gateway offers filters and settings for various authentication mechanisms. API keys can be stored or consulted in KPS and linked to applications managed by API Manager. OAuth tokens can be validated locally, queried by introspection or issued when the gateway acts as an authorization server, depending on the architecture. Certificates, LDAP, Kerberos and custom mechanisms can also participate in policies."
  },
  {
    "kind": "paragraph",
    "text": "The choice must preserve separation between authentication and authorization. Validating a key or token establishes client and subject; does not mean that any operation is released. The circuit needs to check scopes, roles, contract, product, quota, tenant and context. Identity propagated to the backend must be signed, protected by mTLS, or accepted only from trusted networks."
  },
  {
    "kind": "paragraph",
    "text": "Caching of keys, introspection and metadata improves performance, but changes revocation time. The policy must document TTL, failure behavior and consistency. Fail-open authentication is usually inappropriate. If the identity service does not respond, allowing the call can turn unavailability into a security bypass."
  },
  {
    "kind": "subhead",
    "text": "Authentication and authorization conceptual pipeline"
  },
  {
    "kind": "paragraph",
    "text": "# Conceptual security flow extract credential validate integrity and validity resolve client and subject check audience and scopes query quota or plan apply contextual authorization remove untrusted headers propagate trusted identity to backend"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.14 Routing, backends and resilience",
    "id": "23-14-routing-backends-and-resilience"
  },
  {
    "kind": "paragraph",
    "text": "Outbound routing transforms a logical decision into a real connection with a backend. The policy defines URL, method, headers, TLS, timeout, pooling and response handling. DNS, IP route, firewall, NAT and certificate remain relevant. A routing filter error can be caused by a missing route, exhausted pool, connect timeout, read timeout, hostname mismatch or server reset."
  },
  {
    "kind": "paragraph",
    "text": "Connection pools reduce handshake costs, but require limits, keep-alive, idle timeout and validation. If the backend closes connections before the gateway, reuse can produce intermittent resets. If the gateway opens too many connections, it may exhaust ephemeral or SNAT ports. Pool and socket metrics must be correlated with throughput and latency."
  },
  {
    "kind": "paragraph",
    "text": "Retry should only be applied to idempotent operations or those protected by an idempotency key. Repeating a financial transfer after a read timeout may double the effect. Circuit breaker, fallback and balancing must consider business semantics. Resilience is not simply trying again; is to contain failures without multiplying load or corrupting state."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The error presented by the gateway must be broken down by layer.",
    "headers": [
      "Symptom",
      "Probable layer",
      "Evidence"
    ],
    "rows": [
      [
        "Connect timeout",
        "Backend network or listener.",
        "SYN, route, firewall, pool."
      ],
      [
        "Read timeout",
        "Slow backend or blocked response.",
        "Upstream time and trace."
      ],
      [
        "Connection reset",
        "Peer or intermediary closed connection.",
        "Capture TCP and backend logs."
      ],
      [
        "502 from gateway",
        "Failed to get valid response.",
        "Traffic Monitor, trace and routing filter."
      ],
      [
        "TLS outbound error",
        "Trust, SNI, hostname or certificate.",
        "Handshake and string presented."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.15 Observability, logs and Traffic Monitor",
    "id": "23-15-observability-logs-and-traffic-monitor"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway Manager provides operational insight into instances, logs, and traffic. Traffic Monitor records message details as per configuration and can help reconstruct the path of a transaction. Trace Log reveals execution and diagnostic messages. Aggregated metrics allow you to observe throughput, status, latency and health. Each source has a different cost and purpose."
  },
  {
    "kind": "paragraph",
    "text": "Detailed traffic monitoring can consume CPU, I/O, database and storage. At high volume, registering full payload is expensive and risky. The strategy must select events, mask data, limit size, and define retention. High-level tracing should be temporary and applied to the smallest scope possible. Observability cannot compromise the availability it aims to explain."
  },
  {
    "kind": "paragraph",
    "text": "End-to-end correlation must use an identifier created or validated at the beginning of the policy and propagated to the backend. Gateway logs need to record API, operation, client, subject when allowed, group, instance, backend, status, latency and failure reason. For security investigation, preserve administrative events, configuration changes, and console authentications."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Each source answers a different operational question.",
    "headers": [
      "Source",
      "Granularity",
      "Usage"
    ],
    "rows": [
      [
        "Trace Log",
        "Execution and diagnosis details.",
        "Investigate policies, filters and exceptions."
      ],
      [
        "Traffic Monitor",
        "Transaction and message as per configuration.",
        "Reconstruct calls and responses."
      ],
      [
        "Metrics",
        "Temporal aggregates.",
        "Capacity, SLA and trends."
      ],
      [
        "Audit/admin logs",
        "Management actions.",
        "Governance and investigation."
      ],
      [
        "Open logging/SIEM",
        "Exported events.",
        "Corporate correlation and retention."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.16 Performance and capacity planning",
    "id": "23-16-performance-and-capacity-planning"
  },
  {
    "kind": "paragraph",
    "text": "Performance depends on CPU, memory, garbage collection, threads, sockets, encryption, message size, policy complexity and dependency latency. A policy that only validates a header has a different profile than one that performs XML transformation, digital signature, external call and detailed logging. Capacity planning must use representative workload, not just abstract requests per second."
  },
  {
    "kind": "paragraph",
    "text": "Synchronous network filters increase latency and consume resources while waiting. KPS and Cassandra queries need indexes and proximity. Large transformations may require buffering. Asymmetric encryption and TLS handshake are more expensive than connection reuse. Performance analysis needs to decompose time inside the gateway and time spent on external services."
  },
  {
    "kind": "paragraph",
    "text": "Tuning without evidence can make the system worse. Increasing heap too much prolongs pauses; increasing threads can increase contention; Widening pools can put pressure on backends and SNAT. The correct process establishes a baseline, measures percentiles, identifies a bottleneck, changes a variable and repeats the test. Traffic Monitor and trace configurations must be included in the scenarios, because they change the runtime cost."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Capacity planning requires runtime metrics and dependencies.",
    "headers": [
      "Dimension",
      "Metric",
      "Interpretation"
    ],
    "rows": [
      [
        "CPU",
        "use, queue, steal.",
        "Computational policies and cryptography."
      ],
      [
        "Memory",
        "heap, GC, RSS.",
        "Buffering, leaks and volume of objects."
      ],
      [
        "Connections",
        "active, pool, errors.",
        "TCP/TLS and backend capability."
      ],
      [
        "Latency",
        "p50, p95, p99.",
        "Slow tails and dependencies."
      ],
      [
        "stores",
        "latency and KPS/Cassandra error.",
        "Impact of persistence on policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.17 Containers, Kubernetes and OpenShift",
    "id": "23-17-containers-kubernetes-and-openshift"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway can be deployed in containerized architectures, including Kubernetes and OpenShift, following product references. Containerizing does not eliminate the concepts of domain, configuration, secrets, persistence and HA. The difference is that instances become ephemeral, scaled by orchestrator and subject to probes, requests, limits, volumes and configuration distribution mechanisms."
  },
  {
    "kind": "paragraph",
    "text": "Images must be immutable and configurations promoted in a reproducible way. Certificates and credentials must be entered via secrets or vault integrations, not written to the image. Readiness needs to confirm that the gateway is actually ready to receive traffic; liveness cannot restart the pod due to transient slowness of a backend. PreStop and termination grace period help drain connections."
  },
  {
    "kind": "paragraph",
    "text": "Cassandra and metric banks require their own design and should not be treated as pod details. Scaling gateway without observing dependency limits can only increase pressure. In OpenShift, SCCs, routes, services, NetworkPolicies, storage and observability need to be aligned with the reference and corporate policies."
  },
  {
    "kind": "subhead",
    "text": "Attention in containers"
  },
  {
    "kind": "paragraph",
    "text": "CPU-only Horizontal Pod Autoscaling may react late to backend latency or connections. Combine business metrics, connections, queue and capacity of dependent systems. Scaling the gateway does not create capacity in the banking core."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.18 Administrative security and hardening",
    "id": "23-18-administrative-security-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "The administrative plan must be isolated from public traffic. ANM ports, Node Managers and consoles must not be exposed to the Internet. RBAC must separate policy development, implementation, operation, auditing and security administration. Shared accounts compromise traceability. Default credentials and secrets in files need to be removed or protected depending on the version."
  },
  {
    "kind": "paragraph",
    "text": "Hardening includes patching, supported versions, administrative TLS, certificate rotation, file protection, least OS privilege, limiting access to Cassandra and banks, encrypted backup, and SIEM integration. Custom configurations must be inventoried so they do not disappear or break during upgrades."
  },
  {
    "kind": "paragraph",
    "text": "Upgrade is a compatibility project. Custom policies, scripts, filters, libraries, drivers, HSM, Cassandra, metrics database and operating system need to be evaluated. The environment must be tested with realistic traffic and rollback. Maintaining an old release without support increases security risks and makes integration with modern dependencies difficult."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Hardening combines product, operating system, network and process.",
    "headers": [
      "Control",
      "Objective",
      "Evidence"
    ],
    "rows": [
      [
        "RBAC",
        "Least administrative privilege.",
        "Profiles, groups and periodic review."
      ],
      [
        "Network segregation",
        "Secure management ports.",
        "Firewall, routes and bastion."
      ],
      [
        "Secrets management",
        "Avoid exposure in project and logs.",
        "Vault, aliases and rotation."
      ],
      [
        "Patch/upgrade",
        "Fix vulnerabilities and maintain support.",
        "Inventory and calendar."
      ],
      [
        "Audit",
        "Track change and access.",
        "Immutable logs and SIEM."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.19 Layer-oriented troubleshooting",
    "id": "23-19-layer-oriented-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "An efficient investigation begins by classifying the problem. If the name does not resolve, the policy has not yet participated. If TCP does not establish, examine route, firewall and listener. If TLS fails, examine certificate, SNI and trust. If the request enters Traffic Monitor and fails a filter, analyze the message context and policy path. If the routing filter starts and the backend does not respond, proceed to the outbound connection."
  },
  {
    "kind": "paragraph",
    "text": "The observation point is essential. Consumer, balancer, external gateway, internal gateway, and backend logs describe different connections. NAT and proxies change IP and port. The timestamp needs to be synchronized. Correlation ID must be preserved. Without these elements, teams may compare disparate transactions and incorrectly conclude that the gateway missed a message."
  },
  {
    "kind": "paragraph",
    "text": "Avoid enabling cluster-wide max trace during peak. Reproduce in a controlled environment or limit per instance and window. Collect policy configuration, deployed version, group, instance, logs, metrics, capture when authorized, and evidence from the backend. Then formulate testable hypotheses instead of changing multiple timeouts simultaneously."
  },
  {
    "kind": "table",
    "caption": "Table 11 - Layered diagnosis reduces trial and error.",
    "headers": [
      "Step",
      "Test",
      "Interpretation"
    ],
    "rows": [
      [
        "DNS",
        "Resolve frontend and backend on the gateway host.",
        "Name, split DNS and cache."
      ],
      [
        "TCP",
        "Test connection to the required ports.",
        "Route, firewall and listener."
      ],
      [
        "TLS",
        "Inspect handshake and chain.",
        "Trust, SNI, hostname and mTLS."
      ],
      [
        "Policy",
        "Find filter and executed path.",
        "Context, condition and exception."
      ],
      [
        "Backend",
        "Correlate incoming call.",
        "Gateway called or terminated early."
      ],
      [
        "Persistence",
        "Check KPS, Cassandra and metrics.",
        "External dependence of the flow."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "23.20 Case studies",
    "id": "23-20-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1 - 502 intermittent after increased traffic. Traffic Monitor shows that the policy reaches the routing filter, but some connections are reset. Metrics reveal reuse of connections maintained longer than the backend's idle timeout. The fix aligns keep-alive and pool validation; increasing read timeout would not solve the cause."
  },
  {
    "kind": "paragraph",
    "text": "Case Study 2 - Policy Studio fails to deploy, but APIs continue to respond. The error is restricted to the administrative port between the station and the Admin Node Manager. The business listener is healthy. The separation of plans avoids greater unavailability and directs the investigation to firewall, administrative certificate and ANM service."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3 - New application registration fails in API Manager while existing APIs remain active. Cassandra introduces latency and unavailable nodes. The runtime has data already loaded, but the management plane is unable to persist the operation. The incident requires a distributed banking team, not a change in the frontend policy."
  },
  {
    "kind": "paragraph",
    "text": "Case study 4 - After outbound certificate rotation, only one node fails. The balancer distributes calls between two instances, and the failure appears random. The comparison shows truststore or alias not updated in a group member's effective configuration. The solution is to fix the promotion and validate consistency between instances."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Axway API Gateway organizes runtime and administration across domains, groups, instances, Node Managers and a central Admin Node Manager. Policy Studio models the configuration; API Gateway Manager provides operation and observability; Gateway instances run listeners, policy circuits, and routing. API Manager adds management of APIs and consumers on top of this runtime."
  },
  {
    "kind": "paragraph",
    "text": "How a call works depends on message context, filters, stores, network, TLS, identity and backends. KPS, Cassandra and metrics banks have different purposes and should not be treated as a single repository. Deployment, HA, multi-DC and containers require reproducible configuration and clear separation between administrative plane and business traffic."
  },
  {
    "kind": "paragraph",
    "text": "Operating the platform securely requires RBAC, segregation of administrative ports, certificate management, controlled observability, capacity planning and disciplined upgrade. Troubleshooting must follow layers and observation points, preserving correlation ID and evidence for each component."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves deeper into Azure API Management (APIM), allowing you to compare a cloud-managed platform with the architecture and operation studied in Axway API Gateway."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Operational checklist",
    "id": "operational-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The domain, groups, instances, Node Managers and ANM are documented and inventoried.",
      "Administrative ports are segregated and protected by RBAC and management network.",
      "Policies have ownership, versioning, testing and message context attribute contracts.",
      "Configuration and environment data are separated and pipelined.",
      "KPS, Cassandra and metrics database have monitoring, backup and capacity.",
      "Health checks verify real readiness without overloading dependencies.",
      "Inbound, outbound and administrative TLS have rotation and controlled truststores.",
      "Pools, timeouts, retries and circuit breakers respect the semantics of the operations.",
      "Traffic Monitor and trace have defined scope, masking, and retention.",
      "Capacity was tested with representative workload and latency percentiles.",
      "Containers have adequate readiness, liveness, drain, secrets and limits.",
      "Upgrades include custom policies, drivers, HSM, stores and rollback.",
      "Troubleshooting runbooks separate DNS, TCP, TLS, policy, backend and persistence."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Labs and exercises",
    "id": "labs-and-exercises"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Draw a domain with two groups and two instances per group, indicating ANM, Node Managers and administrative flows.",
      "Create a conceptual authentication, authorization, KPS, routing and error policy; document produced and consumed attributes.",
      "Simulate ANM failure and explain what can continue to work at runtime.",
      "Differentiate a Cassandra failure in API Manager from an outbound connection failure to the backend.",
      "Propose a zero-downtime deployment strategy for a group with four instances.",
      "List evidence to investigate an intermittent 502 on just one node.",
      "Design external/internal zone topology with distinct responsibilities.",
      "Explain how to validate inbound and outbound mTLS certificate rotation.",
      "Propose a minimum set of metrics for gateway capacity planning.",
      "Describe how to migrate the platform to OpenShift without embedding secrets in the image."
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
    "caption": "Table 12 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Admin Node Manager (ANM)",
        "Central administration component for an API Gateway domain."
      ],
      [
        "API Gateway Manager",
        "Web console for administration, monitoring, logs and topology."
      ],
      [
        "API Manager",
        "API, application, consumer and publishing management layer on the gateway."
      ],
      [
        "Domain",
        "Administrative border that brings together groups and instances."
      ],
      [
        "Filter",
        "Processing unit used in a policy circuit."
      ],
      [
        "Group",
        "Logical unit for instance deployment and administration."
      ],
      [
        "Instance",
        "API Gateway process that runs traffic."
      ],
      [
        "KPS",
        "Key Property Store queried by policies for auxiliary data."
      ],
      [
        "Message context",
        "Set of attributes and messages maintained during the transaction."
      ],
      [
        "Node Manager",
        "Instance and service management component on a node or group."
      ],
      [
        "Policy circuit",
        "Flow of filters connected by success and failure paths."
      ],
      [
        "Policy Studio",
        "API Gateway development and configuration tool."
      ],
      [
        "Traffic Monitor",
        "Traffic and transaction view available in API Gateway Manager."
      ],
      [
        "Virtualized API",
        "API published and mediated by API Manager/API Gateway."
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
      "Axway Documentation. API Gateway groups and domains.",
      "Axway Documentation. Configure Admin Node Manager high availability.",
      "Axway Documentation. Administer API Gateway and manage operations.",
      "Axway Documentation. Develop policies and Policy Studio configuration.",
      "Axway Documentation. Key Property Store overview and configuration.",
      "Axway Documentation. Monitoring, Traffic Monitor, logging and metrics.",
      "Axway Documentation. Configure API Manager and virtualize APIs.",
      "Axway Documentation. Administrator Apache Cassandra for API Management.",
      "Axway Documentation. API Management multi-datacenter configuration.",
      "Axway Documentation. Container reference architectures for Kubernetes and OpenShift.",
      "Axway Documentation. Performance tuning and system requirements."
    ]
  },
  {
    "kind": "subhead",
    "text": "Release note"
  },
  {
    "kind": "paragraph",
    "text": "The product evolves through releases and patches. Before applying commands, ports, parameters or procedures, validate the official documentation corresponding to the installed version, operating system, bank, deployment mode and licensed components in the environment."
  }
];
