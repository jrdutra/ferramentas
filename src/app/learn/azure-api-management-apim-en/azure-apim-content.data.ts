import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const AZURE_APIM_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "From publishing to Azure to distributed enforcement at the gateway"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/en/overview.svg",
    "alt": "Management plan, managed gateway, developer portal, self-hosted gateway and observability in APIM",
    "caption": "Opening figure - APIM brings together management plan, gateways and consumer experience under a single platform."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "APIM separates governance, publishing and traffic operations, but each tier and network decision changes capabilities and limits."
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
    "text": "The previous chapter studied the Axway API Gateway architecture, separating design, administrative domain, runtime instances, persistence and operation. Azure API Management, known as APIM, solves a similar set of problems in a managed service model in Azure. It combines a management plane exposed by portal and APIs, a gateway responsible for traffic, publishing capabilities, and a consumer portal."
  },
  {
    "kind": "paragraph",
    "text": "The managed feature reduces product installation and maintenance tasks, but does not eliminate architectural decisions. Choosing tier, network topology, capacity, region, identity model, policies, certificates, developer portal and high availability strategy remains the organization's responsibility. The cloud abstracts part of the infrastructure; it does not replace design, governance and troubleshooting."
  },
  {
    "kind": "paragraph",
    "text": "APIM has also evolved for hybrid and federated scenarios. In addition to the managed gateway, the platform offers a self-hosted gateway to run in containers outside the managed service and workspaces to decentralize the administration of APIs on a shared infrastructure. As the availability of these resources varies depending on tier, gateway and region, decisions must be verified in the official documentation and in the current resource matrix."
  },
  {
    "kind": "paragraph",
    "text": "This chapter builds a complete mental model: components, configuration objects, policy processing, contract import, security, networks, scalability, observability, automation and recurring failures. The goal is not to just teach portal clicks, but to allow the reader to reason about runtime behavior and design a sustainable enterprise platform."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Always separate three questions: what belongs to the management plane, what is executed by the gateway in the request path and what belongs to the consumer ecosystem. Then, identify in which tier and type of gateway the functionality is available."
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
      "Explain the logical architecture of Azure API Management and its main components.",
      "Distinguish between management plane, managed gateway, self-hosted gateway, workspace gateway and developer portal.",
      "Understand the model of APIs, operations, backends, products, subscriptions, users and groups.",
      "Explain sections, scopes, inheritance and order of execution of policies.",
      "Design authentication, mTLS, certificates, managed identities and integration with Microsoft Entra ID.",
      "Compare public connectivity, VNet, private endpoint and hybrid topologies.",
      "Plan scale units, availability zones, multi-region and recovery.",
      "Apply observability with Azure Monitor, Application Insights, logs and tracing.",
      "Automate configuration with ARM, Bicep, Terraform, REST, CLI and pipelines.",
      "Diagnose policy, network, certificate, backend, capacity and publishing failures."
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
      "24.1 Positioning and logical architecture",
      "24.2 Management plane, gateway and developer portal",
      "24.3 Tiers, gateways and selection criteria",
      "24.4 APIM Resource Model",
      "24.5 Importing and publishing APIs",
      "24.6 Policies: sections, order and context",
      "24.7 Scopes, inheritance and basis",
      "24.8 Named values and policy expressions",
      "24.9 Identity, subscriptions and authorization",
      "24.10 TLS, mTLS, certificates and Key Vault",
      "24.11 Networks, VNet, Private Link and private backends",
      "24.12 High availability, zones and multi-region",
      "24.13 Backends, resilience, cache and limits",
      "24.14 Workspaces and federated governance",
      "24.15 Developer portal, products and onboarding",
      "24.16 Observability and troubleshooting",
      "24.17 Automation, CI/CD and infrastructure as code",
      "24.18 Security, hardening and case studies",
      "Summary, checklist, laboratories, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.1 Positioning and logical architecture",
    "id": "24-1-positioning-and-logical-architecture"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management is an API management platform that receives traffic through a gateway, applies policies, and forwards the call to a backend. Around this runtime, the platform offers registration and import of APIs, products, subscriptions, users, groups, analytics, developer portal and administrative interfaces. The service does not necessarily host the business logic: it creates a governed facade in front of backends that can be in Azure, in data centers, in other clouds or in SaaS services."
  },
  {
    "kind": "paragraph",
    "text": "The gateway is the data plane. It terminates connections, selects API and operation, executes policies, calls the backend and processes the response. The management plane is used to create or change configuration via Azure portal, REST, ARM, Bicep, Terraform, PowerShell, or CLI. The developer portal organizes discovery, documentation, testing, and onboarding. This separation allows configuration to be administered centrally while traffic runs through managed or distributed gateways."
  },
  {
    "kind": "paragraph",
    "text": "The most important mental model is not to confuse the Azure resource with the traffic endpoint. An APIM instance has administrative resources, gateway endpoints and, depending on configuration, portal, management API and other hostnames. DNS, certificates, firewall, and monitoring may be different for each endpoint. A failure in the administrative portal does not automatically mean a failure in the gateway, and the reverse is also true."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/en/figure-01-logical-architecture.svg",
    "alt": "Consumers, gateway, backends, management plane and developer portal in Azure API Management",
    "caption": "Figure 1 - The gateway is in the path of traffic; management plan and portal have different responsibilities."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Components must be monitored and protected according to their function.",
    "headers": [
      "Component",
      "Responsibility",
      "Typical evidence"
    ],
    "rows": [
      [
        "Management plan",
        "Provision and configure the service.",
        "Activity Log, deployments, administrative API."
      ],
      [
        "Managed gateway",
        "Execute policies and forward calls.",
        "Gateway logs, metrics and traces."
      ],
      [
        "Self-hosted gateway",
        "Execute data plane in a container outside the managed service.",
        "Local logs and telemetry sent to Azure."
      ],
      [
        "Workspace gateway",
        "Runtime associated with a workspace.",
        "Workspace metrics and configuration."
      ],
      [
        "Developer portal",
        "Documentation, products, registration and testing.",
        "Publication, content and identity of the portal."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.2 Management plane, gateway and developer portal",
    "id": "24-2-management-plane-gateway-and-developer-portal"
  },
  {
    "kind": "paragraph",
    "text": "The management plan stores and distributes the service configuration: APIs, operations, policies, backends, named values, certificates, products, subscriptions and diagnostics. Changes are made as Azure management operations and may take some time to reach all runtimes. This means that completed deploy and full propagation are not exactly the same event. Pipelines must include post-deploy validation and synthetic testing."
  },
  {
    "kind": "paragraph",
    "text": "The managed gateway is operated by Microsoft and processes traffic according to tier and topology. It should be treated as a distributed component: scale units, regions and zones affect capacity and resilience. The gateway has a health endpoint that can be used for monitoring and availability validations. However, a platform health check does not replace a synthetic transaction that exercises DNS, TLS, policy, identity and backend."
  },
  {
    "kind": "paragraph",
    "text": "The developer portal is a separate application from the API itself. It allows consumers to discover APIs grouped into products, read documentation, test operations and request subscriptions. The portal experience depends on content publishing, allowed identities, CORS configuration, and gateway availability. In regulated environments, you must carefully review what is displayed, which samples contain data, and how external users are invited or removed."
  },
  {
    "kind": "subhead",
    "text": "Operational separation"
  },
  {
    "kind": "paragraph",
    "text": "An unavailability of the management plan can prevent changes without immediately dropping existing traffic. A gateway failure affects consumers even if the portal and Azure Resource Manager are accessible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.3 Tiers, gateways and selection criteria",
    "id": "24-3-tiers-gateways-and-selection-criteria"
  },
  {
    "kind": "paragraph",
    "text": "APIM has families of tiers with different characteristics of capacity, network, scale, high availability and governance resources. The classic family includes Developer, Basic, Standard and Premium, in addition to the Consumption model. The v2 family modernizes Basic, Standard and Premium options. As feature availability varies and changes over time, the architecture must use the official matrix as a source of truth, and not assumptions based solely on the tier name."
  },
  {
    "kind": "paragraph",
    "text": "The Developer tier is aimed at non-productive scenarios and should not be chosen as a basis for availability. Production tiers need to be selected according to throughput, SLA, private connectivity, zones, multi-region, workspaces, self-hosted gateway and compliance requirements. Consumption uses a serverless model appropriate to specific loads, but has operational and functionality differences that need to be evaluated."
  },
  {
    "kind": "paragraph",
    "text": "The self-hosted gateway is a container associated with an APIM instance, running on customer infrastructure, such as Kubernetes, OpenShift, on-premises or another cloud. It maintains central management in Azure and brings the data plane closer to the backends or consumers. This architecture requires outbound connectivity for configuration synchronization and, when enabled, sending telemetry. It also requires local responsibility for container capacity, update, security and availability."
  },
  {
    "kind": "paragraph",
    "text": "Workspaces allow you to delegate API administration and product to teams, maintaining shared infrastructure. They have their own resources and gateways within the supported model. Workspaces are not just folders: they introduce administration, ownership and runtime limits that need to be incorporated into the governance design."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The type of gateway changes the operational and responsibility model.",
    "headers": [
      "Option",
      "Typical usage",
      "Critical responsibility"
    ],
    "rows": [
      [
        "Managed gateway",
        "Managed exposure on Azure.",
        "Choose tier, scale, network and regions."
      ],
      [
        "Self-hosted gateway",
        "On-prem, multicloud and backend proximity.",
        "Operate container, capacity and connectivity."
      ],
      [
        "Workspace gateway",
        "Team runtime in federated governance.",
        "Define workspace ownership and limits."
      ],
      [
        "Consumption",
        "Elastic load and consumption model.",
        "Validate limitations and scaling behavior."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.4 APIM Resource Model",
    "id": "24-4-apim-resource-model"
  },
  {
    "kind": "paragraph",
    "text": "An API in APIM is a managed facade. It has name, display name, path, protocols, subscription requirements and operations. Each operation defines a method and URL template, and may have its own parameters, representations and policies. The backend identifies the actual destination and can encapsulate URL, credentials, circuit breaker, pool or other properties depending on available resources."
  },
  {
    "kind": "paragraph",
    "text": "Products group APIs and define a consumption unit. A product may require a subscription, have terms and associate quotas or policies. Subscriptions generate access credentials, normally a primary key and a secondary key, which facilitate rotation. Users and groups control who accesses products through the portal. This model is useful for onboarding, but should not be confused with fine business authorization."
  },
  {
    "kind": "paragraph",
    "text": "Named values store reusable parameters in policies. They can contain simple values, secret values, or references to Key Vault, depending on the configuration. Certificates represent certificates used in hostnames, client validation, or backend authentication. Loggers and diagnostics connect the gateway to observability targets. The design must treat these resources as code and maintain ownership, naming and lifecycle."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Administrative resources have different responsibilities.",
    "headers": [
      "Object",
      "Function",
      "Common mistake"
    ],
    "rows": [
      [
        "API",
        "Group operations under a facade.",
        "Mixing incompatible domains and lifecycles."
      ],
      [
        "operation",
        "Define method and logical route.",
        "Ambiguous or ungoverned templates."
      ],
      [
        "Backend",
        "Represent the target and its configuration.",
        "Duplicate URL and credentials in policies."
      ],
      [
        "Product",
        "Package APIs for consumption.",
        "Use product as business authorization."
      ],
      [
        "Subscription",
        "Identify consumption and provide key.",
        "Share key between applications."
      ],
      [
        "Named value",
        "Parameterize policies and secrets.",
        "Write secret directly to XML."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.5 Importing and publishing APIs",
    "id": "24-5-importing-and-publishing-apis"
  },
  {
    "kind": "paragraph",
    "text": "APIM can create or import APIs from sources such as OpenAPI, WSDL, OData, Azure Compute Services, WebSocket, GraphQL, and gRPC backends, as currently supported by the service and tier. Import speeds up registration, but does not automatically transform a fragile contract into a governed API. Paths, operation IDs, schemas, security, servers, examples and descriptions need to be reviewed before publishing."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI is the most common option for HTTP APIs. The import process creates operations and metadata, but certain extents, limits, and versions of the specification may have restrictions. For SOAP, a WSDL can be imported as a pass-through or used in REST conversion scenarios. GraphQL and WebSocket have their own models and policies that apply differently. The pipeline must validate the API type and test the actual behavior at the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Publishing an API involves more than importing it. It is necessary to configure the URL base, backend, policies, security, product, subscription, documentation, versioning, revision and observability. Revisions allow you to test changes under the same public version; versions represent distinct interfaces for consumers. The promotion must be automated and accompanied by smoke tests."
  },
  {
    "kind": "subhead",
    "text": "Conceptual pipeline - API publishing to APIM"
  },
  {
    "kind": "code",
    "text": "# Conceptual publishing flow\nValidated contract\n  -> API import or update\n  -> backend and named values configuration\n  -> policy application by scope\n  -> product association\n  -> gateway tests\n  -> publishing to the developer portal\n  -> observability and rollout"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.6 Policies: sections, order and context",
    "id": "24-6-policies-sections-order-and-context"
  },
  {
    "kind": "paragraph",
    "text": "Policies are XML documents executed by the gateway. The configuration is divided into inbound, backend, outbound and on-error. Inbound processes the request before forwarding: authentication, rate limit, rewrite, validation and transformation are common examples. Backend controls interaction with the destination, including forwarding and retries. Outbound processes the response. On-error is executed when failure occurs and allows you to standardize error, record telemetry or implement controlled paths."
  },
  {
    "kind": "paragraph",
    "text": "The order of statements is semantic. A JWT validation performed after a sensitive send-request does not protect the call already made. A rewrite before the correct selection of operation can change the context. A return-response stops execution and produces an immediate response. If a failure occurs, remaining steps from the normal sections are skipped and execution goes to on-error."
  },
  {
    "kind": "paragraph",
    "text": "Policy expressions use limited C# to evaluate context, headers, variables, and results. They are powerful and can introduce complex logic. The gateway must not turn into a monolithic application written in XML. Policies need to remain short, testable and focused on cross-cutting concerns. Extensive business logic belongs to the backend or a specific component."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/en/figure-02-policy-pipeline.svg",
    "alt": "APIM inbound, backend, outbound and on-error pipeline",
    "caption": "Figure 2 - The gateway executes statements in sequence and switches to on-error when a failure occurs."
  },
  {
    "kind": "code",
    "text": "Simplified example - policy XML\n<policies>\n  <inbound>\n    <base />\n    <set-variable name=\"correlationId\"\n                  value=\"@(context.Request.Headers.GetValueOrDefault(\"x-correlation-id\", Guid.NewGuid().ToString()))\" />\n    <validate-jwt header-name=\"Authorization\" failed-validation-httpcode=\"401\">\n      <openid-config url=\"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration\" />\n    </validate-jwt>\n  </inbound>\n  <backend>\n    <base />\n    <forward-request timeout=\"30\" />\n  </backend>\n  <outbound><base /></outbound>\n  <on-error><base /></on-error>\n</policies>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.7 Scopes, inheritance and basis",
    "id": "24-7-scopes-inheritance-and-basis"
  },
  {
    "kind": "paragraph",
    "text": "Policies can be applied to scopes such as global, workspace, product, API and operation, depending on the resource and type of gateway. The composition allows imposing general controls and specializing rules close to the operation. The base element includes policies inherited from the higher scope. Where base is placed defines when the inherited chain executes relative to statements in the current scope."
  },
  {
    "kind": "paragraph",
    "text": "Omitting base can break inheritance and allow an API to no longer receive authentication, logging or globally defined limits. On the other hand, blindly inheriting all policies can produce duplication, incorrect order, or unexpected impact. Mature governance defines which controls are mandatory and how exceptions are approved."
  },
  {
    "kind": "paragraph",
    "text": "The product scope must be used with care because an API can be associated with multiple products or be called by subscription in a different scope. Business authorization should not depend solely on the presence of a product. Global and workspace help implement baseline, while API and operation specialize behavior. Each policy must declare the expected scope and its dependencies."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Scope defines the reach and risk of a policy change.",
    "headers": [
      "Scope",
      "Typical application",
      "Caution"
    ],
    "rows": [
      [
        "Global",
        "Security and observability baseline.",
        "Wide blast radius."
      ],
      [
        "Workspace",
        "Common rules for a federated team.",
        "Coherence with central baseline."
      ],
      [
        "Product",
        "Consumption limits and rules.",
        "Multiple membership and subscription."
      ],
      [
        "API",
        "Contract and backend of an API.",
        "Do not duplicate global policy."
      ],
      [
        "operation",
        "Exception or specific semantics.",
        "Avoid excessive fragmentation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.8 Named values and policy expressions",
    "id": "24-8-named-values-and-policy-expressions"
  },
  {
    "kind": "paragraph",
    "text": "Named values allow you to replace repeated literals with managed names, such as URLs, audiences, timeouts, flags and keys. Secret values can be protected and references to Azure Key Vault reduce the need to store sensitive material in APIM. Still, Key Vault access policy, managed identity, and connectivity need to be monitored. External reference does not eliminate operational dependency."
  },
  {
    "kind": "paragraph",
    "text": "Policy expressions access context.Request, context.Response, context.API, context.Operation, context.Subscription and variables. They can process strings, dates, JSON, certificates and claims within the allowed set. Because errors in expressions occur at runtime, pipelines must test for positive, negative paths, and missing values. Use of GetValueOrDefault is preferable when a header may not exist."
  },
  {
    "kind": "paragraph",
    "text": "Policy fragments allow reuse, but require versioning and ownership. A change in shared shard can affect many APIs. It is recommended to maintain catalog, unit or functional tests, peer review and progressive rollout. Named values must have stable names and not incorporate the environment in a confusing way."
  },
  {
    "kind": "subhead",
    "text": "Secret is not common configuration"
  },
  {
    "kind": "paragraph",
    "text": "Never register keys, tokens, passwords or certificates directly in policy, repository or trace. Use secret named values, Key Vault, managed identities and log masking."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.9 Identity, subscriptions and authorization",
    "id": "24-9-identity-subscriptions-and-authorization"
  },
  {
    "kind": "paragraph",
    "text": "APIM can require subscription keys, validate JWTs, authenticate clients by certificate, use Basic in legacy integrations and obtain tokens for backends. Subscription key identifies a subscription and enables quotas or analytics, but does not replace strong user identity or business authorization. Keys must be separated by application, rotated and protected against leakage."
  },
  {
    "kind": "paragraph",
    "text": "validate-jwt and validate-azure-ad-token are used to validate tokens according to issuer, audience, subscription and claims. The policy must verify the elements required by the contract, not just accept any token issued by a tenant. After validation, claims can be used for simple decisions or sent to an external PDP. Complex authorizations should avoid extensive lists encoded in XML."
  },
  {
    "kind": "paragraph",
    "text": "Managed identity allows the gateway to obtain Microsoft Entra ID access tokens to access protected backends and resources without storing client secrets. The authentication-managed-identity policy requests and keeps the token cached until expiration. You must grant permissions to the correct identity and ensure connectivity to the resource. In environments with user-assigned identities, the design must document which identity each backend uses."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Mechanisms can be combined; they solve different problems.",
    "headers": [
      "Mechanism",
      "What does it prove",
      "Proper use"
    ],
    "rows": [
      [
        "Subscription key",
        "Possession of a subscription key.",
        "Measurement, onboarding and basic access."
      ],
      [
        "JWT/OAuth",
        "Token issued and claims validated.",
        "User or application APIs."
      ],
      [
        "Client certificate",
        "Possession of the associated private key.",
        "mTLS and B2B partners."
      ],
      [
        "Managed identity",
        "APIM Azure Identity.",
        "Gateway authentication on the backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.10 TLS, mTLS, certificates and Key Vault",
    "id": "24-10-tls-mtls-certificates-and-key-vault"
  },
  {
    "kind": "paragraph",
    "text": "The gateway terminates TLS on the published hostname. Custom domains allow you to use your own corporate names and certificates. Azure Key Vault is recommended for managing hostname certificates and facilitating renewal, as long as the managed identity has access and the reference remains valid. The operation needs to monitor expiration, chain, name, secret version, and update in APIM."
  },
  {
    "kind": "paragraph",
    "text": "mTLS can be applied at the input to authenticate consumers by certificate and at the output to authenticate the APIM against the backend. Upon entry, the gateway needs to negotiate and validate the certificate according to the topology. Previous proxies may change the way the certificate is presented and need to be considered. In the output, the client certificate is associated or referenced by policy and must contain a usable private key."
  },
  {
    "kind": "paragraph",
    "text": "Self-signed certificates or private chains require explicit installation and trust. Troubleshooting must separate TLS negotiation failure, chain failure, hostname mismatch, policy expiration and rejection. Certificate renewal without testing may cause unavailability when the new material does not contain the expected string or format."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example - certificates in policy"
  },
  {
    "kind": "code",
    "text": "<authentication-certificate thumbprint=\"{{backend-client-cert-thumbprint}}\" />\n<!-- Simplified client certificate validation -->\n<choose>\n  <when condition=\"@(context.Request.Certificate == null)\">\n    <return-response>\n      <set-status code=\"401\" reason=\"Client certificate required\" />\n    </return-response>\n  </when>\n</choose>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.11 Networks, VNet, Private Link and private backends",
    "id": "24-11-networks-vnet-private-link-and-private-backends"
  },
  {
    "kind": "paragraph",
    "text": "APIM network architecture needs to distinguish inbound access to the gateway and outbound connectivity to the backend. A private endpoint creates a private entry to the gateway endpoint via Azure Private Link. It does not, by itself, provide a private route from the APIM to the backends. To achieve private services, the gateway needs tier-compliant outbound connectivity, such as VNet integration or injection, peering, private DNS, and appropriate routes."
  },
  {
    "kind": "paragraph",
    "text": "In classic tiers that support VNet, external mode keeps the gateway externally accessible while allowing it to reach network resources; internal mode publishes endpoints to the virtual network and requires a back layer or private access. In v2 tiers, integration and private endpoint models have their own characteristics. As differences are significant, the choice needs to be validated in the documentation of the adopted tier family."
  },
  {
    "kind": "paragraph",
    "text": "DNS is a frequent dependency. The gateway needs to resolve backend hostnames, identity endpoints, Key Vault, and telemetry services. A private endpoint without the correct private DNS zone can resolve to a public address. UDRs, NSGs, firewalls, and TLS inspection can block control or data calls. Tests must record origin, destination, resolution and effective route."
  },
  {
    "kind": "paragraph",
    "text": "In March 2026, Microsoft removed the gateway's trusted service connectivity mechanism for certain Azure services in the data plane. Architectures that relied on this bypass need to use explicit network connectivity. This change reinforces a general principle: implicit connectivity and firewall exceptions should be treated as versioned and monitored dependencies."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/en/figure-03-private-network.svg",
    "alt": "Private entry into APIM and private access to backends",
    "caption": "Figure 3 - Private ingress and private backend access are different network issues."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Network diagnosis needs to observe the actual point of execution.",
    "headers": [
      "Symptom",
      "Verification"
    ],
    "rows": [
      [
        "Gateway responds, backend times out",
        "Backend DNS, egress route, NSG, firewall and port."
      ],
      [
        "Private endpoint exists, but access uses public IP",
        "Private DNS zone, VNet bond, and cache."
      ],
      [
        "Works on portal, fails on gateway",
        "Network origin and identity are different."
      ],
      [
        "Custom domain does not update",
        "Access to Key Vault, managed identity and certificate version."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.12 High availability, zones and multi-region",
    "id": "24-12-high-availability-zones-and-multi-region"
  },
  {
    "kind": "paragraph",
    "text": "Scale in APIM is expressed by units, tier capacity and, in some models, elastic behavior. Adding drives increases capacity and can contribute to redundancy. The Capacity metric should be interpreted along with latency, requests, logical CPU, heavy policies and backend dependencies. Load testing is essential because throughput varies depending on payload, TLS, policy and cache."
  },
  {
    "kind": "paragraph",
    "text": "Availability zones protect against zone failure in supported regions and tiers. The redundancy recommendation must consider a minimum number of units and automatic or configured distribution according to the service. Zones do not protect against regional failure, global configuration error, or unavailable backend. Multi-region adds regional gateways to an instance and can reduce latency and improve resiliency, but requires routing design, certificates, backends, and shared data."
  },
  {
    "kind": "paragraph",
    "text": "A multi-region deployment needs to decide how the consumer chooses the region, typically with DNS or global inbound service. Policies and configuration are distributed, but backends can have different topologies. Named values and regional routes need to be explicit. Failover must be tested, including the possibility of an APIM region being healthy while the regional backend is unavailable."
  },
  {
    "kind": "paragraph",
    "text": "Self-hosted gateways add another dimension: they can maintain processing close to the backend even when low-latency connectivity to Azure is degraded, within supported synchronization and health limits. The organization is responsible for replicas, probes, updating, and cluster resources."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/azure-api-management-apim/en/figure-04-availability.svg",
    "alt": "Scale units, availability zones, multi-region and self-hosted gateway",
    "caption": "Figure 4 - Capacity, zone, region and hybrid gateway resolve different classes of failure."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.13 Backends, resilience, cache and limits",
    "id": "24-13-backends-resilience-cache-and-limits"
  },
  {
    "kind": "paragraph",
    "text": "Backends should be defined as reusable resources when multiple APIs share target, credentials, or parameters. Policies like set-backend-service select the backend. Retries need to be used with discretion: repeating a non-idempotent operation can double the effect. APIM retry executes child policies according to condition and count; it does not automatically make operation safe."
  },
  {
    "kind": "paragraph",
    "text": "Timeouts need to form an end-to-end budget. The consumer timeout must be greater than necessary for the gateway and backend, but not so high as to maintain resources indefinitely. Auxiliary call by send-request is also time consuming. Circuit breaker and backend pools, when available in the adopted model, help contain failures, but require coherent thresholds and observability."
  },
  {
    "kind": "paragraph",
    "text": "Caching can reduce latency and load, but only appropriate responses should be stored. Custom data, tokens, sensitive headers, and per-user variations require correct keys and rules. Rate limit controls bursts or rate per window; quota controls accumulated volume. Policies can use subscription, IP, claim or another key, but cardinality and distribution need to be evaluated."
  },
  {
    "kind": "paragraph",
    "text": "The gateway should not compensate indefinitely for a poorly sized backend. Retries, caching, and throttling are resilience controls, not replacements for capacity and correctness. An aggressive policy can amplify failures: synchronized retries increase load, payload logging consumes resources and extensive transformations increase latency."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Resilience needs to consider semantics and behavior in failure.",
    "headers": [
      "Control",
      "Benefit",
      "Risk"
    ],
    "rows": [
      [
        "Retry",
        "Recover transient failure.",
        "Duplicity and storm of retries."
      ],
      [
        "Cache",
        "Reduce latency and load.",
        "Leak or outdated answer."
      ],
      [
        "Rate limit",
        "Contain rate in short window.",
        "Incorrect key groups consumers."
      ],
      [
        "Quota",
        "Control accumulated consumption.",
        "Unexpected period blocking."
      ],
      [
        "Timeout",
        "Limit waiting and resources.",
        "Premature cuts or stuck connections."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.14 Workspaces and federated governance",
    "id": "24-14-workspaces-and-federated-governance"
  },
  {
    "kind": "paragraph",
    "text": "Workspaces were created to allow decentralized teams to administer and publish APIs to a shared APIM infrastructure. A workspace contains supported APIs, products, subscriptions, and other resources, with separate administrative access and associated gateway. This allows for a federated model: the central platform operates infrastructure and baseline; Domain teams control the lifecycle of their APIs."
  },
  {
    "kind": "paragraph",
    "text": "The benefit comes with new frontiers. Global, workspace and local polices need to be composed without bypass. Naming, tags, ownership, diagnostics, costs and limits must be standardized. Teams should not be granted service-wide permissions when only one workspace is needed. At the same time, the platform needs to avoid excessive centralization that turns each change into an operational queue."
  },
  {
    "kind": "paragraph",
    "text": "Workspaces do not mean complete physical isolation. Depending on the tier and gateway, infrastructure resources and limits may be shared. The compliance assessment must check data plane, logs, identities, network and blast radius. The feature evolves quickly and its matrix needs to be reviewed before architectural commitments."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Federation requires explicit responsibilities.",
    "headers": [
      "Responsible",
      "Suggested functions"
    ],
    "rows": [
      [
        "Central platform",
        "Landing zone, tier, network, identity, baseline, observability and guardrails."
      ],
      [
        "Domain Team",
        "Contracts, backends, specific policies, products and functional support."
      ],
      [
        "Security",
        "Token standards, certificates, logging and exception approval."
      ],
      [
        "SRE/Operation",
        "Capacity, incidents, SLOs, failover tests and runbooks."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.15 Developer portal, products and onboarding",
    "id": "24-15-developer-portal-products-and-onboarding"
  },
  {
    "kind": "paragraph",
    "text": "The developer portal transforms the technical catalog into a consumer experience. APIs are presented directly or within products, with documentation, examples and a test console. Consumers can create an account, request a subscription and obtain keys according to the configured workflow. In external APIs, terms of use, contact, limits and support processes need to be visible."
  },
  {
    "kind": "paragraph",
    "text": "Products must represent coherent offerings, not just arbitrary groupings. A product can differentiate between sandbox and production, partner and internal, or service levels. Product policies may apply quota, but business contracts and authorization remain at appropriate layers. The portal should avoid publishing internal endpoints, sensitive headers, or actual payloads in examples."
  },
  {
    "kind": "paragraph",
    "text": "Portal customization needs to be versioned and tested. Identity, domain, CORS, or content changes can prevent onboarding even if the gateway is healthy. API Center can complement multigateway enterprise discovery, while the APIM developer portal remains focused on consuming the APIs managed on that platform."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.16 Observability and troubleshooting",
    "id": "24-16-observability-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "APIM exposes metrics and resource logs through Azure Monitor and can integrate diagnostics with Application Insights. Metrics show volume, latency, capacity, and response codes. Gateway logs allow you to investigate request, operation, backend, policy and error. Application Insights adds correlation and distributed analysis when the backend also participates in the trace."
  },
  {
    "kind": "paragraph",
    "text": "Observability needs to balance detail and security. Payload logging can capture personal data, tokens and secrets. Headers must be allowlisted and masked. Sampling reduces cost, but can hide rare errors. Correlation IDs need to be propagated to the backend and returned to the consumer when appropriate. The policy trace can add customized events to traces and telemetry according to configuration."
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis must separate the error generated by the APIM from the error returned by the backend. A 401 can come from validate-jwt, subscription, mTLS or business service. A 502 can indicate DNS, TLS, or backend connection failure, but also invalid response transformation. The LastError context in on-error provides source, reason, message, scope, section and path, useful for classifying the failed step."
  },
  {
    "kind": "paragraph",
    "text": "Test traces are useful, but they should be protected and not used as a substitute for continuous telemetry. Health checks validate the gateway; synthetic transactions validate the journey. Dashboards should separate total latency, backend time and policy time to avoid blaming the wrong component."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Each telemetry source responds to a different layer.",
    "headers": [
      "Signal",
      "Question answered"
    ],
    "rows": [
      [
        "Gateway requests and status",
        "What volume and what responses did the consumer receive?"
      ],
      [
        "Backend duration",
        "How much time was spent on the target service?"
      ],
      [
        "Capacity",
        "Does the gateway approach the tier/unit limit?"
      ],
      [
        "Application Insights",
        "Which dependency, trace and exception participated?"
      ],
      [
        "Activity Log",
        "Who changed the resource or administrative setting?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.17 Automation, CI/CD and infrastructure as code",
    "id": "24-17-automation-ci-cd-and-infrastructure-as-code"
  },
  {
    "kind": "paragraph",
    "text": "Manual configuration through the portal is useful for learning and diagnostics, but it should not be the main way to promote environments. APIM can be administered by ARM, Bicep, Terraform, REST, PowerShell and CLI. Contracts, policies, named values, backends, products and diagnostics must be versioned. Secrets should go in via secure references, not the repository."
  },
  {
    "kind": "paragraph",
    "text": "Pipelines need to separate platform infrastructure and API content when ownership is different. A central team can provision instance, network, identities and logs; Domain teams publish APIs and policies within guardrails. XML Lint, OpenAPI validation, contract diff, policy tests, smoke tests and change approval reduce regressions."
  },
  {
    "kind": "paragraph",
    "text": "Revisions allow you to test a change without immediately changing the public version. After validation, a revision becomes current. Versions allow coexistence of incompatible contracts. Rollback must consider which configuration may have been propagated and which consumers may have observed the change. Backup and restore, when applicable to the tier and model, do not replace source code and automated reconstruction."
  },
  {
    "kind": "code",
    "text": "Drift between the portal and repository is a risk. Azure Policy, RBAC, locks, and pipelines help reduce untracked changes. When\nan emergency correction is made manually, it must be reconciled with the code immediately.\nConceptual example - API Management as code\n# Suggested repository structure\ninfra/\n  apim.bicep\n  networking.bicep\n  diagnostics.bicep\napis/\n  customers/openapi.yaml\n  customers/policies/\n    api-policy.xml\n    operations/\nshared/\n  policy-fragments/\n  naming-and-standards.md"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "24.18 Security, hardening and case studies",
    "id": "24-18-security-hardening-and-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Hardening starts by reducing exposure. Management plan must use least privilege RBAC, PIM, and audit trails. Gateway must only accept protocols, cipher suites and hostnames necessary within the service's capabilities. Public network access must be disabled when the private architecture is validated. Custom domains, certificates and DNS need ownership and automated renewal."
  },
  {
    "kind": "paragraph",
    "text": "Global policies must enforce authentication baselines, headers, limits and logging, but exceptions must be explicit. Named values and certificates should use Key Vault when appropriate. Traces and logs cannot record credentials. Administrative APIs and portals must be secured separately from the gateway endpoint. Dependencies such as Entra ID, Key Vault, Application Insights and DNS need monitoring."
  },
  {
    "kind": "paragraph",
    "text": "Case study 1: A public API uses Azure Front Door with WAF in front of APIM, private endpoint on the gateway and private backends. Front Door provides global entry and L7 protection; APIM performs OAuth, quotas, and transformation. The design needs to guarantee private DNS, cross-layer certificate and secure preservation of the original IP."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2: a company maintains OpenShift backends on-premises and uses a self-hosted gateway in the cluster. Azure maintains configuration and catalog, while traffic remains local. The operation needs to scale replicas, use mTLS, guarantee 443 output for synchronization, and monitor container versions."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3: Payments, credit and registration teams use workspaces. The central platform applies baseline and observability, while each domain manages APIs and products. The main risk is that a workspace policy ignores inheritance or creates inconsistent behavior; Automatic tests verify mandatory bases and standards."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "With Axway and Azure APIM studied, the next chapter delves into API Security according to the OWASP API Security Top 10, connecting concrete threats to gateway, application, identity and operation controls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management separates management plane, data plane, and consumption experience. The gateway executes policies and forwards traffic; the management plan manages the configuration; The developer portal organizes discovery and onboarding. Managed, self-hosted and workspace gateways serve different topologies and transfer different operational responsibilities."
  },
  {
    "kind": "paragraph",
    "text": "The resource model combines APIs, operations, backends, products, subscriptions, named values, certificates and diagnostics. Policies are executed in inbound, backend, outbound and on-error, with scopes and inheritance controlled on a per-base basis. The order of statements is part of the behavior and needs testing."
  },
  {
    "kind": "paragraph",
    "text": "Network and availability depend on tier. Private endpoint protects input, while backend connectivity requires output design. Scale units, zones and multi-regions resolve different classes of failure. Managed identity, Key Vault, TLS and mTLS reduce secrets, but depend on permissions and connectivity."
  },
  {
    "kind": "paragraph",
    "text": "Mature operation requires observability, automation, drift control, contract testing, capacity, and runbooks. APIM is managed, but the organization remains responsible for architecture, policies, identity, data, backends and customer experience."
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
      "The tier and gateway type were chosen based on the current resource matrix and required SLA.",
      "Input to the gateway and output to backends have a separate and documented network design.",
      "DNS, certificates, custom domains and private endpoints have testing and ownership.",
      "Global and workspace policies use the basis and have a formal exception process.",
      "Subscription keys are not used as a substitute for identity and business authorization.",
      "Managed identities have only necessary permissions and do not rely on implicit firewall bypass.",
      "Named values, secrets and certificates use appropriate storage and rotation.",
      "Timeouts, retries, cache, rate limits and quotas were tested in failure scenarios.",
      "Metrics, logs, Application Insights, and synthetic transactions cover the journey.",
      "Configuration is versioned and published via pipeline with smoke test and rollback plan.",
      "High availability includes backends, identity, DNS, global ingress, and recovery process.",
      "Developer portal and products expose only approved documentation and examples."
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
      "Import an OpenAPI and identify generated APIs, operations and backend.",
      "Create inbound, outbound and on-error policies and observe the order of execution.",
      "Apply a global and an API policy using base; test the effect of omitting foundation in the laboratory.",
      "Configure a named value and replace a policy literal.",
      "Validate a JWT and differentiate 401 from 403 in controlled responses.",
      "Use managed identity to authenticate APIM to a protected backend.",
      "Configure a custom domain with a Key Vault certificate in a test environment.",
      "Design a topology with Front Door, private endpoint and private backend, indicating DNS and routes.",
      "Create a dashboard with requests, status, backend duration and capacity.",
      "Simulate backend timeout and capture LastError in on-error.",
      "Model a workspace with platform and domain responsibilities.",
      "Write a conceptual import, policy, test, and publish pipeline."
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
    "caption": "Table 10 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "API Management instances",
        "Azure resource that brings together configuration, gateway, and management capabilities."
      ],
      [
        "Backend",
        "Resource representing the destination called by the gateway."
      ],
      [
        "Base policy",
        "Element that includes policies inherited from the higher scope."
      ],
      [
        "Capacity",
        "Metric that indicates relative utilization of gateway capacity."
      ],
      [
        "Developer portal",
        "Discovery, documentation, testing and onboarding portal."
      ],
      [
        "Diagnosis",
        "Telemetry emission configuration for logger or destination."
      ],
      [
        "Managed gateway",
        "Data plane operated by Microsoft."
      ],
      [
        "Managed identity",
        "Identity Login administered by Azure for access without static secret."
      ],
      [
        "Named value",
        "Reusable parameter used in policies."
      ],
      [
        "operation",
        "Combination of method and URL template within an API."
      ],
      [
        "Policy expression",
        "Limited C# expression evaluated at policy runtime."
      ],
      [
        "Product",
        "API package offered to consumers."
      ],
      [
        "Review",
        "Review of an API under the same public version."
      ],
      [
        "Self-hosted gateway",
        "APIM gateway running as a container in the customer's infrastructure."
      ],
      [
        "Subscription",
        "Consumer entity that can have primary and secondary keys."
      ],
      [
        "Workspace",
        "Administrative boundary for federated API management."
      ],
      [
        "Workspace gateway",
        "Gateway associated with a workspace's runtime."
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
      "Microsoft Learn. Azure API Management - Overview and key concepts. Updated in 2025.",
      "Microsoft Learn. API Gateway in Azure API Management. Updated May 2026.",
      "Microsoft Learn. Azure API Management v2 tiers. Updated March 2026.",
      "Microsoft Learn. Feature-based comparison of Azure API Management tiers. Updated in 2026.",
      "Microsoft Learn. Policies in Azure API Management. Updated May 2026.",
      "Microsoft Learn. Workspaces in Azure API Management. Updated June 2026.",
      "Microsoft Learn. Self-hosted gateway overview and support policies. Updated in 2026.",
      "Microsoft Learn. Set up inbound private endpoint for Azure API Management. Updated June 2026.",
      "Microsoft Learn. Reliability in Azure API Management and multi-region deployment.",
      "Microsoft Learn. Use managed identities in Azure API Management. Updated April 2026.",
      "Microsoft Learn. Integrate Azure API Management with Application Insights. Updated March 2026.",
      "Microsoft Learn. Observability in Azure API Management. Updated June 2026.",
      "Microsoft Learn. Import OpenAPI and SOAP APIs into Azure API Management.",
      "Microsoft Azure Well-Architected Framework. Service guide for Azure API Management."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management evolves frequently. Tiers, regions, limits, workspaces, gateways and policies can change. Before implementing a decision, validate the official documentation and resource matrix for the selected region and tier."
  }
];
