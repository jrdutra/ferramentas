import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const ZERO_TRUST_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Zero Trust for APIs: Explicitly check and decide on a per-request basis"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/overview.svg",
    "alt": "API request crossing identity, risk, policy and enforcement verification",
    "caption": "Opening figure - Access to an API is a dynamic decision based on the subject, the resource, the context and the current policy."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "No location grants implicit trust; each access must be authenticated, authorized, limited and continually evaluated."
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
    "text": "Traditional security architecture was built around network boundaries. Users, servers and applications located within a corporate network received, explicitly or implicitly, a greater level of trust. This model lost effectiveness as APIs began to connect clouds, partners, mobile devices, suppliers, SaaS applications, data centers and ephemeral workloads. The origin of a connection remains relevant as a signal, but is no longer sufficient to decide whether an operation should be authorized."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust is a set of principles and an architectural strategy based on eliminating implicit trust. Resources are protected individually or in small groups; subjects and devices are identified; access decisions use current policies and information; communications are protected; and telemetry is used to continually improve posture. The objective is not to distrust people in a generic way, but to prevent location, ownership or past authentication from producing broad and permanent authorization."
  },
  {
    "kind": "paragraph",
    "text": "APIs are a natural point to apply Zero Trust because they already materialize operations, identities, data and policies. An API Gateway can act as a Policy Enforcement Point at the edge, while service meshes apply controls between workloads. Identity providers issue credentials and tokens; posture mechanisms provide context; policy drivers make decisions; and observability records what happened. However, purchasing a gateway, enabling mTLS, or requiring MFA does not alone create a Zero Trust architecture."
  },
  {
    "kind": "paragraph",
    "text": "This chapter connects the fundamentals of identity, OAuth, mTLS, API Gateways, policies, service mesh, Kubernetes and observability studied previously. The focus is technical and operational: how to model subjects and resources, how to evaluate each request, how to limit privileges, how to reduce lateral movement, how to handle failures in decision components and how to evolve the deployment without interrupting critical integrations."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each flow, identify: subject, resource, action, context, identity source, decision engine, enforcement point and recorded evidence. This decomposition transforms the term Zero Trust into verifiable architecture."
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
      "Explain Zero Trust without reducing it to product, VPN, mTLS or multi-factor authentication.",
      "Relate the principles of NIST SP 800-207 to the design of corporate APIs.",
      "Distinguish Policy Engine, Policy Administrator, Policy Enforcement Point, PDP, PIP and PAP.",
      "Model human identities, applications, workloads, devices and sessions.",
      "Apply contextual authorization and least privilege to API operations and data.",
      "Understand bearer tokens, pegged tokens, mTLS, and DPoP in the context of replay reduction.",
      "Design Zero Trust controls in API Gateways, service meshes and Kubernetes.",
      "Combine microsegmentation, controlled egress, data protection and observability.",
      "Define availability, caching, fail-open, and fail-closed strategies for policy decisions.",
      "Plan a maturity journey with metrics, testing, governance and adaptive response."
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
      "34.1 What Zero Trust is and isn’t",
      "34.2 Logical principles and components",
      "34.3 Protected resources, subjects and surfaces",
      "34.4 Decision by request and dynamic trust",
      "34.5 Human identity, application, workload and device",
      "34.6 Tokens, mTLS and proof of ownership",
      "34.7 Granular authorization and policy architecture",
      "34.8 API Gateways as enforcement points",
      "34.9 Service mesh, Kubernetes and east-west traffic",
      "34.10 Microsegmentation, egress and data protection",
      "34.11 Telemetry, risk and adaptive response",
      "34.12 Availability, governance, maturity and troubleshooting",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.1 What Zero Trust is and isn’t",
    "id": "34-1-what-zero-trust-is-and-isn-t"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust is a security model, a set of design principles, and a coordinated management strategy. Its premise is that threats can exist within and outside traditional boundaries and that no element should be given implicit trust solely by location, ownership or organizational relationship. Protection moves from broad network segments to specific users, devices, workloads, applications, data and resources."
  },
  {
    "kind": "paragraph",
    "text": "The term does not mean blocking everything, manually re-authenticating the user with every click, or completely eliminating private networks. It means that each access needs to be supported by identity, policy and context sufficient for the risk of that action. A request to read public data and an irreversible financial transaction do not necessarily require the same authentication strength, the same set of signals or the same authorization validity time."
  },
  {
    "kind": "paragraph",
    "text": "There is also no single product called Zero Trust. Identity providers, gateways, service meshes, EDRs, policy engines, data catalogs, SIEMs and observability platforms can participate in the architecture. Value arises from the coherent integration between these components, the quality of policies, the coverage of resources and the ability to measure and react to deviations."
  },
  {
    "kind": "paragraph",
    "text": "An internal network can still reduce exposure, and a firewall remains useful. The mistake is to transform presence on this network into sufficient proof of identity and authorization. Similarly, mTLS authenticates the ends of a channel, but does not itself define whether service A can perform operation X on resource Y on behalf of user Z."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Zero Trust should be understood as an architecture and process, not as a product brand.",
    "headers": [
      "Affirmation",
      "Assessment",
      "Explanation"
    ],
    "rows": [
      [
        "Zero Trust is the total absence of trust.",
        "Incorrect.",
        "Trust is no longer implicit and becomes explicitly assessed and limited."
      ],
      [
        "VPN implements Zero Trust.",
        "Incomplete.",
        "VPN creates connectivity; does not guarantee granular authorization or continuous assessment."
      ],
      [
        "mTLS is sufficient.",
        "Incorrect.",
        "Authenticates peers, but needs policies, business identity and data controls."
      ],
      [
        "Every request must be evaluated.",
        "Correct as a principle.",
        "The assessment can use local decisions, secure caching, and current signals as per risk."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.2 Logical principles and components",
    "id": "34-2-logical-principles-and-components"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-207 describes principles that can be applied directly to APIs: resources and services are treated as assets; all communication is protected regardless of location; access is granted per session and with least privilege; decisions consider identity, asset status, behavior and context; and the organization collects information to continually improve posture."
  },
  {
    "kind": "paragraph",
    "text": "In NIST's logical architecture, the Policy Engine makes the decision to grant, deny, or revoke access. The Policy Administrator executes this decision, for example by configuring or terminating a session. The Policy Enforcement Point enables, monitors, and terminates the connection between the subject and the resource. On an API platform, the gateway, a mesh proxy, a sidecar or the backend itself can play the role of enforcement."
  },
  {
    "kind": "paragraph",
    "text": "Authorization terminology used in software architectures often complements this model with PDP, PEP, PIP, and PAP. Policy Decision Point evaluates the policy; the Policy Information Point provides attributes; the Policy Administration Point administers policies; and the Policy Enforcement Point enforces the decision. Names vary between products, but responsibilities need to remain clear to avoid blind spots and conflicting decisions."
  },
  {
    "kind": "paragraph",
    "text": "A decision can be binary, but advanced architectures also generate obligations: require step-up, mask fields, reduce transactional limit, activate reinforced logging, impose specific rate limit or forward the operation for approval. These obligations need to be supported by enforcement and audited as part of the outcome."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-01.svg",
    "alt": "Policy Decision Point separate from Policy Enforcement Point and powered by signals",
    "caption": "Figure 1 - Decision-making and enforcement are distinct functions, fed by multiple signal sources."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.3 Protected resources, subjects and surfaces",
    "id": "34-3-protected-resources-subjects-and-surfaces"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust starts by identifying the resources that truly need protection. In APIs, the resource is not just the hostname or the endpoint. It can be an operation, a record, a sensitive field, a dataset, a queue, a secret, a signing key, or an administrative function. The more precise the classification, the more granular the policy can be."
  },
  {
    "kind": "paragraph",
    "text": "The subject also needs to be modeled correctly. The same request can carry the identity of the end user, the client application and the intermediate workload. In delegated flows, the backend needs to distinguish who is acting and on whose behalf. Losing this distinction produces generic tokens, incomplete logs, and excessive privileges."
  },
  {
    "kind": "paragraph",
    "text": "The protected surface includes public interfaces, B2B integrations, internal APIs, administrative endpoints, messaging channels, and external dependencies. The inventory must list owner, processed data, authentication method, exposure, consumers, criticality and policies. Unknown, old, or test APIs are difficult to bring into a Zero Trust strategy because they have no risk context or governed lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "Data classification influences the decision. An authenticated consumer can receive basic fields but not full financial data. A workload authorized to read one record may not have permission to export thousands of records. The principle of least privilege needs to cover volume, purpose, time, context, and object properties."
  },
  {
    "kind": "subhead",
    "text": "Different identities participate in the same call"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-02.svg",
    "alt": "Effective identity composed of user, application, workload and device",
    "caption": "Figure 2 - The effective identity of a call is made up of several layers, not just the user."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.4 Decision by request and dynamic trust",
    "id": "34-4-decision-by-request-and-dynamic-trust"
  },
  {
    "kind": "paragraph",
    "text": "In an API, the practical decision unit is typically the request or a short session associated with a limited set of operations. The gateway identifies the subject, validates the credential, extracts claims, queries attributes when necessary and evaluates the policy applicable to the method, path, resource and context. Authorization should not be inferred merely because a previous connection was accepted."
  },
  {
    "kind": "paragraph",
    "text": "Dynamic confidence means that the outcome can change when the signals change. A user authenticated with MFA may lose access if the device is compromised, the location becomes incompatible, the token is revoked, or the session risk increases. In critical applications, sensitive actions may require re-authentication, additional proof, or out-of-band confirmation."
  },
  {
    "kind": "paragraph",
    "text": "Continuous evaluation does not imply that each call depends on dozens of remote services. Policies can be compiled and distributed to local PDPs; attributes can have short TTLs; low-risk decisions can be cached; and revocation events can invalidate state. The challenge is to balance timeliness, availability, latency and security."
  },
  {
    "kind": "paragraph",
    "text": "The design needs to specify behavior when signals are unavailable. A public query API may operate in a degraded fashion, while a high-value transfer must deny access if the PDP, anti-fraud service, or posture confirmation cannot be queried. Fail-open and fail-closed are decisions per class of operation, not global options."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-03.svg",
    "alt": "Sequence of identification, context, decision and enforcement",
    "caption": "Figure 3 - Authorization is a sequence of identification, contextual assessment, decision and enforcement."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.5 Human identity, application, workload and device",
    "id": "34-5-human-identity-application-workload-and-device"
  },
  {
    "kind": "paragraph",
    "text": "Human identity is typically established by an identity provider with multi-factor authentication and risk policies. The resulting token must have an appropriate issuer, subject, audience, scopes, time and authentication level. Corporate groups are useful, but often too broad for fine-grained authorization; attributes of function, unit, relationship and context can complement the decision."
  },
  {
    "kind": "paragraph",
    "text": "The client application is also a subject. In OAuth 2.0, the client_id identifies the registered software and the client type influences the available controls. Confidential clients authenticate to the token endpoint; Public customers depend on PKCE and environmental protection. In B2B integrations, the identity of the organization and partner system must be separated from the identity of the end user."
  },
  {
    "kind": "paragraph",
    "text": "Workload identity avoids static credentials shared between services. Short-lived certificates, SPIFFE IDs, managed identities, and tokens designed for service accounts allow you to bind the call to the running instance or service. In Kubernetes, ServiceAccounts and identity federation with the cloud reduce the need for permanent secrets in Pods."
  },
  {
    "kind": "paragraph",
    "text": "The device provides additional signals: logging, integrity, versioning, encryption, EDR posture, and compliance. These signals should not be confused with the user's identity. A valid person on an unmanaged device can be granted limited access; a valid workload on a compromised node may require quarantine. Mature policies combine the dimensions without transforming one of them into absolute trust."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Zero Trust combines identities and signals without assuming that a single attribute is sufficient.",
    "headers": [
      "Identity",
      "Examples of evidence",
      "Use in politics"
    ],
    "rows": [
      [
        "User",
        "sub, acr, amr, groups, risk.",
        "Allowed actions, step-up and segregation of duties."
      ],
      [
        "Application",
        "clientid, certificate, software statement.",
        "Consumer, channel, quotas and scopes."
      ],
      [
        "Workload",
        "SPIFFE ID, managed identity, ServiceAccount.",
        "Calls between services and access to backends."
      ],
      [
        "Device",
        "registration, posture, EDR, version.",
        "Adaptive access and privilege reduction."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.6 Tokens, mTLS and proof of ownership",
    "id": "34-6-tokens-mtls-and-proof-of-ownership"
  },
  {
    "kind": "paragraph",
    "text": "Bearer tokens are used by whoever owns them. If they are copied from compromised logs, memory, browser or channel, they can be reused until they expire or are revoked. Therefore, they need protected transport, secure storage, restricted audience, minimum scopes and short lifespan. Zero Trust does not eliminate bearer tokens, but it reduces their scope and assumes that leaks are possible."
  },
  {
    "kind": "paragraph",
    "text": "Sender-constrained tokens bind token usage to a cryptographic key. In OAuth, mTLS can bind the token to the client certificate, while DPoP uses an application-level signed proof and binds the token to a public key. The resource server validates not only the token, but also the demonstration of possession of the corresponding key."
  },
  {
    "kind": "paragraph",
    "text": "mTLS is especially suited to server-to-server integrations, workloads, and environments with operational PKI. DPoP can be used by clients who are unable to conveniently present TLS certificates. Both reduce the value of a stolen token, but do not prevent misuse by a compromised legitimate client nor do they replace authorization and replay protection of the operation itself."
  },
  {
    "kind": "paragraph",
    "text": "In high-risk APIs, proof-of-possession must be combined with idempotence, message signing when necessary, specific audience and anomaly detection. Broad tokens, long duration, and indiscriminate propagation between microservices contradict least privilege, even if they are cryptographically linked."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-04.svg",
    "alt": "Token linked to a cryptographic key for proof of ownership",
    "caption": "Figure 4 - Linking the token to a key adds a cryptographic condition for its use."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Proof of Possession improves token replay resistance, but requires correct validation and operation.",
    "headers": [
      "Mechanism",
      "Evidence presented",
      "Typical usage",
      "Caution"
    ],
    "rows": [
      [
        "Bearer",
        "Just the token.",
        "General APIs and common OAuth flows.",
        "Strict leakage protection."
      ],
      [
        "OAuth mTLS",
        "Client certificate in TLS.",
        "B2B and workloads with PKI.",
        "Certificate lifecycle and TLS termination."
      ],
      [
        "DPoP",
        "Proof JWT signed by request.",
        "Application clients and HTTP APIs.",
        "Validation of htm, htu, iat, jti and nonce when used."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.7 Granular authorization and policy architecture",
    "id": "34-7-granular-authorization-and-policy-architecture"
  },
  {
    "kind": "paragraph",
    "text": "RBAC is useful for stable responsibilities, but is rarely sufficient alone for complex APIs. ABAC allows you to combine attributes of the subject, resource, action and environment. ReBAC represents relationships, such as principal, representative or member of an organization. Policies can combine these models as long as they remain understandable, testable, and auditable."
  },
  {
    "kind": "paragraph",
    "text": "The architecture needs to define where the decision occurs. A gateway can query a central PDP, use local policy-as-code, or combine decisions. The backend remains responsible for rules that depend on the business state and for preventing direct access that bypasses the gateway. In a service mesh, authorization between workloads can occur in the proxy, while object authorization remains in the application."
  },
  {
    "kind": "paragraph",
    "text": "PIPs provide directory attributes, CMDB, device inventory, data classifiers, risk, and context. The PAP manages policies and their lifecycle. For production, policies need versioning, review, unit testing, simulations with historical traffic, approval, gradual rollout and rollback."
  },
  {
    "kind": "paragraph",
    "text": "The result of the decision must be explainable. Logs do not need to expose the entire policy, but should record decision identifier, policy version, subject, resource, action, result and main reason. This evidence is essential for auditing, troubleshooting and incident investigation."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-05.svg",
    "alt": "Governed chain of attributes, policy, decision and enforcement",
    "caption": "Figure 5 - Authorization depends on non-circumvent enforcement and a governed chain of policies and attributes."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of policy-as-code"
  },
  {
    "kind": "paragraph",
    "text": "package api.transferencias default allow := false allow if { input.subject.assurance >= 2 input.subject.tenant == input.resource.tenant \"transfer:write\" in input.token.scopes input.transaction.amount <= input.subject.daily_limit input.device.compliant == true }"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.8 API Gateways as enforcement points",
    "id": "34-8-api-gateways-as-enforcement-points"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway is a natural PEP for north-south traffic. It can terminate TLS, validate tokens, verify certificates, query PDPs, apply rate limits, remove external credentials, propagate controlled identity, and record decisions. Its central position facilitates consistency, but does not authorize turning the gateway into the sole security component."
  },
  {
    "kind": "paragraph",
    "text": "The gateway must validate issuer, audience, signature, time, token type and mandatory claims. Generic policies based only on token presence generate a false sense of protection. The route must be associated with an explicit authorization policy, and administrative endpoints must have even more restrictive controls."
  },
  {
    "kind": "paragraph",
    "text": "The identity propagated to the backend needs to be protected against spoofing. Internal headers must be removed from the external request and recreated by the gateway; the channel to the backend must be authenticated; and the service needs to accept these headers only from authorized sources. Alternatively, the gateway can exchange the token for a specific audience token or use workload credentials."
  },
  {
    "kind": "paragraph",
    "text": "High availability requires evaluating gateway dependencies: introspection, JWKS, PDP, KPS, directories, and risk services. Caches must respect expiration, revocation and versioning. Metrics should separate authentication failures, policy denials, PDP unavailability, backend error, and threshold blocks."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The gateway needs to produce diagnostics per step, without returning sensitive details to the consumer.",
    "headers": [
      "Step at the gateway",
      "Zero Trust Control",
      "Fault that must be differentiated"
    ],
    "rows": [
      [
        "TLS/mTLS",
        "Protected channel and peer identity.",
        "Invalid certificate, SNI, CA or revocation."
      ],
      [
        "Token",
        "Issuer, audience, signature, time and cnf.",
        "Invalid, expired or unlinked token."
      ],
      [
        "Politics",
        "Subject + action + resource + context.",
        "Legitimate denial or PDP unavailable."
      ],
      [
        "Propagation",
        "Headers or controlled internal token.",
        "Spoofing, wrong audience or excessive claims."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.9 Service mesh, Kubernetes and east-west traffic",
    "id": "34-9-service-mesh-kubernetes-and-east-west-traffic"
  },
  {
    "kind": "paragraph",
    "text": "Edge security does not prevent lateral movement if internal services trust any source on the network. A service mesh can provide automatic mTLS, workload identity, and L4/L7 authorization between services. Each call becomes associated with the workload identity, regardless of the ephemeral IP or the node on which the Pod is running."
  },
  {
    "kind": "paragraph",
    "text": "In Kubernetes, identity can come from ServiceAccounts and be federated with cloud providers. Pods should not share long-lived static credentials. RBAC controls actions on the cluster's API, while mesh policies and NetworkPolicies control workload communications. These mechanisms act on different planes and need to be designed together."
  },
  {
    "kind": "paragraph",
    "text": "The mesh policy can restrict which workloads call which service, port, method, or path. For authorization on behalf of the user, the proxy can evaluate propagated claims, but origin and integrity must be guaranteed. The backend remains necessary for decisions based on objects, balances, relationships or business state."
  },
  {
    "kind": "paragraph",
    "text": "Gradual adoption should avoid the belief that permissive mode is an end state. First, the traffic would be inventoried; then, mTLS and identity are enabled; then explicit policies replace broad permissions. Telemetry helps detect hidden dependencies before blocking."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-06.svg",
    "alt": "Service mesh enforcing identity and policies across workloads",
    "caption": "Figure 6 - The mesh reduces implicit trust between workloads and allows enforcement close to the service."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.10 Microsegmentation, egress and data protection",
    "id": "34-10-microsegmentation-egress-and-data-protection"
  },
  {
    "kind": "paragraph",
    "text": "Microsegmentation limits communication paths to reduce attack surface and impact radius. In APIs, segmentation can use workload identity, namespace, domain, sensitivity, and purpose, rather than relying solely on IP addresses. NetworkPolicies, mesh policies, firewalls and internal gateways can cooperate, as long as ownership and precedence are defined."
  },
  {
    "kind": "paragraph",
    "text": "Controlled egress is an important part of the model. A compromised workload must not be able to access any Internet destination, cloud metadata, or internal service. Egress gateways, name and identity allowlists, controlled DNS, proxies, and monitoring help limit exfiltration and SSRF. Rules must consider resolution, redirects, private IPs, protocols and destination changes."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust is resource and data driven. Encryption in transit and at rest is necessary, but policies also need to control minimization, masking, finalization, retention, and export. An API that returns unnecessary fields or allows unlimited pagination may violate least privilege even with strong authentication."
  },
  {
    "kind": "paragraph",
    "text": "Secrets, keys, and certificates must have scope, rotation, and usage track. Access can be mediated by identity-aware proxies, secret stores and managed identities. Credentials shared between services prevent selective assignment and revocation, increasing the impact radius of a compromise."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Microsegmentation is just one layer of a resource-oriented strategy.",
    "headers": [
      "Layer",
      "Objective",
      "Control example"
    ],
    "rows": [
      [
        "Network",
        "Reduce possible paths.",
        "NetworkPolicy, firewall and egress gateway."
      ],
      [
        "Identity",
        "Link call to verifiable subject.",
        "mTLS, workload identity and token."
      ],
      [
        "Application",
        "Restrict action and object.",
        "ABAC, ReBAC and resource authorization."
      ],
      [
        "Data",
        "Minimize exposure and impact.",
        "Masking, classification and export limits."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.11 Telemetry, risk and adaptive response",
    "id": "34-11-telemetry-risk-and-adaptive-response"
  },
  {
    "kind": "paragraph",
    "text": "Adaptive decisions depend on reliable telemetry. IdP, gateway, mesh, endpoint, WAF, SIEM and application produce signals that may indicate anomaly: location changes, unusual volume, object enumeration, repeated failures, degraded device posture, new certificate or non-standard access. These signals need to be normalized, correlated, and evaluated with latency compatible with the use case."
  },
  {
    "kind": "paragraph",
    "text": "The answer doesn't have to be just blocking. The architecture may require MFA, reduce scopes, rate limit, disable export, mark the session for review, or revoke credentials. The choice must consider the impact and reliability of the detector. Overly aggressive controls without feedback create unavailability and encourage permanent exceptions."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust Observability needs to record decisions, not just traffic. Useful metrics include per-policy allow/deny ratio, PDP latency, cache hit, attributeless decisions, propagation failures, stale credential usage, mTLS coverage, uninventoried flows, and revocation time. Traces help identify which PEP or backend made the final decision."
  },
  {
    "kind": "paragraph",
    "text": "Privacy and security of the signals themselves need to be considered. Authorization logs can contain identifiers, groups, risk, and context. Collection must be minimized, protected by access and retention, and never include full tokens, private keys, or unnecessary sensitive data."
  },
  {
    "kind": "subhead",
    "text": "Continuous scanning is not indiscriminate surveillance"
  },
  {
    "kind": "paragraph",
    "text": "Collection must be proportional, finalistic and protected. Zero Trust requires sufficient signals for decisions and investigation, but does not justify recording credentials, sensitive payloads or attributes without operational need."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.12 Availability and failures of trust components",
    "id": "34-12-availability-and-failures-of-trust-components"
  },
  {
    "kind": "paragraph",
    "text": "A Zero Trust architecture adds critical components to the path: IdP, JWKS, introspection, PDP, PIP, risk service, and certificate infrastructure. Each dependency needs SLO, redundancy, timeout, cache, fallback and runbook. A secure policy that makes all APIs unavailable due to simple failure is operationally incomplete."
  },
  {
    "kind": "paragraph",
    "text": "Public key caching is usually secure when respecting rotation and identifiers. Decision caching is more delicate because attributes and risk can change. The cache must include subject, resource, action, relevant context, policy version, and TTL. Revocation events may invalidate decisions before expiration."
  },
  {
    "kind": "paragraph",
    "text": "Fail-open may be acceptable for public or low-impact operations, as long as the degraded mode is explicit and monitored. Fail-closed is appropriate for financial, administrative or sensitive data operations. Between extremes, the organization may offer limited reading, freeze changes, or require an alternate channel."
  },
  {
    "kind": "paragraph",
    "text": "Recovery needs to be tested. Certificate rotation, IdP unavailability, policy rollback, cache loss and issuer change are continuity scenarios. Controlled exercises show whether the team can distinguish legitimate denial from infrastructure failure."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Availability and security need to be modeled together.",
    "headers": [
      "Dependency",
      "Risk",
      "Strategy"
    ],
    "rows": [
      [
        "JWKS/PKI",
        "Key unavailable or incorrect rotation.",
        "Caching, key rollover and monitoring."
      ],
      [
        "PDP",
        "Latency or unavailability.",
        "Local instances, timeout and degradation policy."
      ],
      [
        "PIP/risk",
        "Missing or outdated attribute.",
        "TTL, signal quality and conservative decision."
      ],
      [
        "IdP",
        "Login or issue failure.",
        "Redundancy, existing short sessions and continuity plan."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.13 Governance and maturity journey",
    "id": "34-13-governance-and-maturity-journey"
  },
  {
    "kind": "paragraph",
    "text": "Adopting Zero Trust is a journey of transformation, not a one-off project. A practical starting point is to inventory resources, identities, flows and policies; remove shared credentials; centralize identity; secure communications; make decisions explicit; and expand observability. The exact order depends on the organization's risk and capacity."
  },
  {
    "kind": "paragraph",
    "text": "Maturity models help organize work into pillars. CISA Zero Trust Maturity Model 2.0 works with identity, devices, networks, applications and workloads, data, visibility/analytics, and automation/orchestration. For APIs, these pillars translate into strong identity, posture, microsegmentation, gateway policies, data protection, telemetry, and automatic response."
  },
  {
    "kind": "paragraph",
    "text": "Exceptions need an owner, justification, scope, deadline and compensation. Policies and attributes must have catalogue, versioning and test evidence. Maturity metrics should measure coverage and results: percentage of inventoried APIs, restricted audience tokens, workloads without static credentials, mTLS traffic, explicit policies, revocation time and improper access incidents."
  },
  {
    "kind": "paragraph",
    "text": "The strategy must avoid big bang. An observation mode identifies flows; policies are applied to controlled groups; denials are analyzed; and coverage grows per domain. Security results need to be combined with latency, availability and customer experience metrics."
  },
  {
    "kind": "subhead",
    "text": "Evolution of maturity: from isolated controls to adaptive decisions"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-07.svg",
    "alt": "Coordinated Pillars of Zero Trust Maturity",
    "caption": "Figure 7 - Maturity grows through coordination between pillars, not through the isolated optimization of a product."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.14 Troubleshooting and investigation",
    "id": "34-14-troubleshooting-and-investigation"
  },
  {
    "kind": "paragraph",
    "text": "A Zero Trust denial can be created in multiple layers: certificate, token, posture, policy, rate limit, mesh or business rule. Troubleshooting begins by identifying the PEP that responded, the decision_id and the stage of the failure. The consumer must receive a safe answer; details remain in protected logs."
  },
  {
    "kind": "paragraph",
    "text": "In authentication, check certificate chain, issuer, audience, signature, time, nonce and binding. In authorization, compare subject, action, resource, context, provided attributes, and policy version. In mesh, confirm workload identity, mTLS mode and applied rule. In Kubernetes, validate ServiceAccount, labels, namespace, and NetworkPolicy."
  },
  {
    "kind": "paragraph",
    "text": "Incorrect clocks, old caches, incomplete rotation, removed headers, wrong audiences, and missing attributes produce intermittent incidents. Distributed traces must preserve correlation without propagating tokens. When an external PDP participates, its latency and result must appear as span or event."
  },
  {
    "kind": "paragraph",
    "text": "The investigation should avoid disabling broad controls as a first attempt. A temporary bypass needs to be minimal, approved, monitored and removed. Otherwise, the organization turns troubleshooting into creating security debt."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/zero-trust-applied-to-apis/en/figure-08.svg",
    "alt": "Investigation following identity, context, policy, enforcement and resource",
    "caption": "Figure 8 - The investigation follows the chain of identity, context, policy, enforcement and resource."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The HTTP response is just the final symptom; the evidence needs to localize the decision.",
    "headers": [
      "Symptom",
      "Initial hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "401 after rotation",
        "Old JWKS, incorrect AC or clock skew.",
        "kid, string, cache, dates and IdP logs."
      ],
      [
        "403 only on one route",
        "Policy/scope/audience or object authorization.",
        "decisionid, policyid, claims and resource."
      ],
      [
        "Intermittent fault",
        "Regional PDP, cache, risk signal or propagation.",
        "latency per instance and full trace."
      ],
      [
        "Internal service blocked",
        "Workload identity or mesh policy.",
        "SPIFFE ID, certificate, labels and L7 rule."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "34.15 Case studies and labs",
    "id": "34-15-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - B2B integration: a partner uses OAuth Client Credentials with mTLS. The access token has a specific audience and minimum scopes; the gateway validates the certificate and token binding; the backend receives a controlled internal identity. The rotation occurs with overlapping certificates and telemetry identifies consumers still stuck with the old material."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - microservices in Kubernetes: workloads receive short identities and communicate via service mesh with mTLS. Policies allow only necessary flows and NetworkPolicies limit network paths. End user identity is propagated in a verifiable form only where necessary; Object decisions remain in the domain service."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - adaptive financial transaction: a common transfer is authorized with a valid MFA session, compliant device and daily limit. When the risk increases, the PDP requires step-up and reduces the maximum value. The result, signals, and policy version are audited without logging the token or full payload."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Model subject, resource, action and context for three APIs. 2) Implement a deny-by-default policy in a test environment. 3) Compare bearer token and DPoP/mTLS. 4) Configure workload authorization in service mesh. 5) Simulate PDP unavailability and validate degraded mode. 6) Build a coverage, decisions and latency dashboard."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust eliminates implicit trust based solely on network, ownership, or past authentication. Protection focuses on explicit resources and decisions. In APIs, this means identifying subjects, classifying data, validating credentials, evaluating context, applying authorization by action and object, and continuously observing the result."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways, service meshes and backends play complementary enforcement roles. mTLS authenticates peers; linked tokens reduce replay; RBAC, ABAC and ReBAC express policies; workload identity replaces static secrets; microsegmentation reduces lateral movement; and telemetry supports adaptive response. No single control implements Zero Trust."
  },
  {
    "kind": "paragraph",
    "text": "The architecture needs to be available, governable and explainable. Policies, attributes and caches have a life cycle; critical dependencies require SLO and fallback; denials must be investigable; and adoption needs to advance gradually by risk and ownership. Maturity is measured by coverage and effective reduction of privilege and impact radius."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter applies the fundamentals of APIs, identity, security and governance to the Open Finance and Open Banking Brasil ecosystem, in which federated trust, consent, certificates, security standards and high availability are central requirements."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Zero Trust Checklist for APIs",
    "id": "zero-trust-checklist-for-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "APIs, operations, data, owners and consumers are inventoried and classified.",
      "No network location is used as sufficient proof of authorization.",
      "User, client, workload and device are separate and correlatable identities.",
      "Tokens have a minimum audience, scope and useful life; static credentials are controlled exceptions.",
      "mTLS or DPoP is applied where the reduction in replay justifies the operational cost.",
      "Policies evaluate subject, action, resource and context and have deny-by-default when appropriate.",
      "PEPs are non-circumventable and backends maintain business and object authorization.",
      "Workloads use short identities; service mesh and NetworkPolicies reduce lateral movement.",
      "Egress, secrets, data, and exports are controlled by purpose and least privilege.",
      "Decisions, policy_id, version, latency, and reasons are observable without recording secrets.",
      "IdP, PDP, PIP, JWKS and PKI failures have degradation mode and runbook tested.",
      "The maturity journey has coverage, deadline, owner and exception removal metrics."
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
      "Explain why a private network should not grant automatic authorization to an API.",
      "Map Policy Engine, Policy Administrator and PEP into a gateway and service mesh architecture.",
      "Differentiate user identity, application, workload and device in a single call.",
      "Compare bearer token, OAuth mTLS and DPoP from a replay and operation point of view.",
      "Design an ABAC policy for consulting and changing financial data.",
      "Define fail-open, fail-closed, and degraded behavior for three classes of operation.",
      "Propose microsegmentation and controlled egress for an API in Kubernetes.",
      "Describe which signals should be recorded to explain an access decision.",
      "Create a migration plan from static credentials to workload identity.",
      "Define Zero Trust maturity indicators for an enterprise API platform."
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
        "Continuous verification",
        "Recurrent use of current signals to maintain, limit or revoke access."
      ],
      [
        "Deny-by-default",
        "Posture in which access not explicitly permitted is denied."
      ],
      [
        "DPoP",
        "OAuth proof of ownership mechanism at the application level."
      ],
      [
        "Fail-closed",
        "Behavior that denies access when the safe decision cannot be obtained."
      ],
      [
        "Fail-open",
        "Behavior that allows access on failure, applicable only to explicitly accepted risks."
      ],
      [
        "Microsegmentation",
        "Granular restriction of communication paths to reduce lateral movement."
      ],
      [
        "PAP",
        "Point responsible for administration and policy life cycle."
      ],
      [
        "PDP",
        "Component that evaluates the policy and produces an authorization decision."
      ],
      [
        "PEP",
        "Component that applies the access decision to traffic or resource."
      ],
      [
        "PIP",
        "Source of attributes and context used by the decision."
      ],
      [
        "Policy Administrator",
        "Component that executes the Policy Engine decision and establishes or terminates access."
      ],
      [
        "Policy Engine",
        "Logical component that decides to grant, deny or revoke access."
      ],
      [
        "Sender-constrained token",
        "Token whose use requires proof-of-possession of a linked key."
      ],
      [
        "Step-up authentication",
        "Stronger authentication requirement for action or high risk."
      ],
      [
        "Workload identity",
        "Identity assigned to software, service, or execution instance."
      ],
      [
        "Zero Trust Architecture",
        "Architecture that eliminates implicit trust and protects resources with explicit decisions."
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
      "NIST SP 800-207 - Zero Trust Architecture. 2020.",
      "NIST SP 800-207A - A Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Location Environments. 2023.",
      "CISA - Zero Trust Maturity Model, Version 2.0. 2023.",
      "NIST SP 800-204B - Attribute-based Access Control for Microservices-based Applications Using a Service Mesh. 2021.",
      "NIST SP 800-204C - Implementation of DevSecOps for a Microservices-based Application with a Service Mesh. 2022.",
      "IETF RFC 6750 - OAuth 2.0 Bearer Token Usage.",
      "IETF RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound access tokens.",
      "IETF RFC 9449 - OAuth 2.0 Demonstrating Proof of Possession at the Application Layer (DPoP).",
      "OpenID Foundation - OpenID Connect Core and related specifications.",
      "SPIFFE Project - SPIFFE and SPIRE specifications and documentation.",
      "Kubernetes Documentation - Service Accounts, RBAC, Network Policies and Pod Security.",
      "Istio Documentation - Security, PeerAuthentication and AuthorizationPolicy."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust is an evolutionary strategy and depends on the product version, threat model and regulatory context. Before applying the examples, validate the official specifications, gateway, fabric, identity provider, and deployed platform support."
  }
];
