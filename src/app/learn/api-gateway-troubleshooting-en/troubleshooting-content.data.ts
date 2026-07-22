import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const TROUBLESHOOTING_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Evidence-Driven Troubleshooting: From Symptom to Root Cause"
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Don't change the platform through trial and error: formulate hypotheses, collect evidence and reduce the search space."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/overview.svg",
    "alt": "Hypothesis, evidence, and root cause-driven API investigation",
    "caption": "Opening figure - An efficient investigation reduces the search space through explicit evidence and hypotheses."
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
    "text": "API troubleshooting rarely starts with an accurate description. The initial report tends to be \"the API is down\", \"the token doesn't work\", \"it timed out\" or \"the gateway returned 502\". These symptoms are important, but they do not identify the cause. The same response can be produced by different components, and the same failure can appear in different ways depending on the observation point."
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway occupies a privileged and complex position: it terminates client connections, executes TLS, validates identity, applies policies, transforms messages, creates connections with backends and records telemetry. This means it can detect previous problems, produce errors of its own, or just propagate dependency failures. Investigating correctly requires separating each part of the communication and distinguishing observed evidence from a hypothesis that has not yet been confirmed."
  },
  {
    "kind": "paragraph",
    "text": "The methodology in this chapter combines layered reasoning, timeline construction, distributed correlation and change analysis. The professional learns to start with the impact and scope, confirm the path actually taken, locate the last successful step and select tools compatible with the hypothesis. The goal is not to execute all available commands, but to obtain the minimum evidence that discriminates between possible causes."
  },
  {
    "kind": "paragraph",
    "text": "Operation during incidents will also be discussed: containment, mitigation, evidence preservation, communication, remediation validation, and post-incident analysis. Mature troubleshooting doesn't end when the graph returns to normal; it records root cause, fixes detection gaps, reduces recurrence, and transforms tacit knowledge into runbooks and automation."
  },
  {
    "kind": "paragraph",
    "text": "How to study this chapter Choose a real or fictitious request and always keep the same fields: consumer, time zone, host, resolved IP, port, method, URI, request ID, trace ID, status, latency and selected backend. Redo each section asking what evidence would confirm or rule out the hypothesis."
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
      "Apply a hypothesis-and evidence-driven methodology to API incidents.",
      "Define impact, scope, timeline and correlated change before changing components.",
      "Find faults between client, DNS, network, gateway, backend and dependencies.",
      "Diagnose TCP, NAT, TLS, mTLS, HTTP, authentication and authorization issues.",
      "Distinguish errors produced by the gateway from responses propagated by the backend.",
      "Investigate policies, routing, transformations, rate limits, retries and timeouts.",
      "Use logs, metrics, traces, network captures and synthetic tests in a complementary way.",
      "Diagnose APIs in Kubernetes, service mesh and multi-region environments.",
      "Safely conduct containment, remediation, validation, and post-incident analysis.",
      "Create checklists, runbooks, and reusable evidence for support and engineering teams."
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
      "38.1 Troubleshooting as a scientific process",
      "38.2 Impact, scope, timeline and changes",
      "38.3 Layer model and real request path",
      "38.4 DNS, addressing and balancing",
      "38.5 TCP, sockets, NAT, SNAT and connectivity",
      "38.6 TLS, mTLS, certificates and trust",
      "38.7 HTTP, status codes and error semantics",
      "38.8 Authentication, authorization and identity",
      "38.9 Policies, routing and transformation at the gateway",
      "38.10 Backends, data, queues and third parties",
      "38.11 Timeouts, retries, rate limits and cascading failures",
      "38.12 Kubernetes, service mesh and cloud",
      "38.13 Logs, metrics, tracing and correlation",
      "38.14 Tools and safe evidence collection",
      "38.15 Incident, runbooks and post-incident management",
      "38.16 Case studies",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.1 Troubleshooting as a scientific process",
    "id": "38-1-troubleshooting-as-a-scientific-process"
  },
  {
    "kind": "paragraph",
    "text": "Efficient troubleshooting follows a sequence similar to the scientific method: observe the symptom, formulate hypotheses, predict what evidence would be expected, perform a controlled test, and update understanding. The value of this approach is in avoiding simultaneous changes and coincidental conclusions. Restarting a component and seeing service come back does not prove that the cause was in that component; it just shows that the restart changed the system state."
  },
  {
    "kind": "paragraph",
    "text": "A hypothesis must be specific enough to be tested. \"The network is bad\" is vague. \"Gateway is unable to open TCP connection to backend 10.20.30.40:8443 from production subnet\" is verifiable. This formulation determines the test point, tool, time, and expected evidence. If SYN receives RST, the hypothesis changes; if there is no response, another family of causes takes priority."
  },
  {
    "kind": "paragraph",
    "text": "The investigator also needs to distinguish cause, contributing condition, and symptom. An expired certificate may be the immediate cause, while lack of monitoring and manual renewal process are contributing conditions. The 502 error observed by the client is a symptom. A mature analysis records all three levels, as correcting only the certificate restores the service, but does not prevent recurrence."
  },
  {
    "kind": "paragraph",
    "text": "Rule of thumb Change one variable at a time whenever risk allows. Before taking a destructive action, capture logs, metrics, configuration state, connections, certificates, and identifiers needed to reconstruct the incident."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.2 Impact, scope, timeline and changes",
    "id": "38-2-impact-scope-timeline-and-changes"
  },
  {
    "kind": "paragraph",
    "text": "The investigation begins with the impact: which operations, consumers, regions, environments and volumes are affected? An isolated error from a client could point to credential or local configuration; a failure on all consumers after a deploy points to shared change. The scope must be refined by method, endpoint, version, tenant, product, certificate, gateway, and backend."
  },
  {
    "kind": "paragraph",
    "text": "The timeline organizes facts in order. Record perceived start, first alert, last known success, deploys, certificate rotation, DNS changes, firewall changes, escalations and mitigation actions. Use synchronized clocks and indicate time zone. Differences of just a few minutes can reverse the apparent relationship between cause and effect."
  },
  {
    "kind": "paragraph",
    "text": "Recent changes are strong candidates, but should not dominate analysis without evidence. Certificate expiration, gradual port exhaustion, queue growth and external partner changes can occur without local deployment. The investigator must compare the current state with a known baseline: configuration, policy, version, certificate, route, limits, number of connections and traffic behavior."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Initial questions quickly reduce the search space.",
    "headers": [
      "Question",
      "Useful response example",
      "Evidence"
    ],
    "rows": [
      [
        "Who is affected?",
        "Only external partners in the South region.",
        "Metrics by consumer and region."
      ],
      [
        "Since when?",
        "First error at 14:32:18 EDT.",
        "Logs and alert with timestamp."
      ],
      [
        "What changed?",
        "Policy published at 14:29.",
        "Audit log and configuration diff."
      ],
      [
        "What's your latest success?",
        "Request ID abc at 14:31:54.",
        "Complete trace and access log."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.3 Layer model and real request path",
    "id": "38-3-layer-model-and-real-request-path"
  },
  {
    "kind": "paragraph",
    "text": "The path drawn in architecture does not always correspond to the real path. DNS may return different addresses by location; a WAF can terminate TLS; API Gateway can use another proxy to reach the backend; a service mesh can insert sidecars; and the answer may go through a different route. Before completing, confirm the effective hops and connection termination points."
  },
  {
    "kind": "paragraph",
    "text": "The layer model helps locate the fault. If the name does not resolve, there is no TCP connection. If the TCP handshake fails, TLS has not started. If TLS completes and there is an HTTP 401 response, the network and encryption have already worked until a component capable of interpreting HTTP. If the gateway registers the request and the backend does not, the investigation focuses on the gateway-backend section or the policy prior to routing."
  },
  {
    "kind": "paragraph",
    "text": "The most useful technique is to identify the last evidence of success and the first evidence of failure. This boundary reduces the problem. A trace shows the gateway initiating a downstream call, but without backend span: check propagation, network or connection. The backend records the successful operation, but the client receives timeout: investigate response, buffers, return connection and external deadline."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/figure-01.svg",
    "alt": "Layered model to find where an API transaction stopped",
    "caption": "Figure 1 - The layered model organizes responsibilities and avoids investigating the application before confirming network and transport."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/figure-02.svg",
    "alt": "Observation points throughout an enterprise API call",
    "caption": "Figure 2 - Different observation points reveal different stages of the same transaction."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.4 DNS, addressing and balancing",
    "id": "38-4-dns-addressing-and-balancing"
  },
  {
    "kind": "paragraph",
    "text": "DNS failures include NXDOMAIN, SERVFAIL, resolver timeout, incorrect response, inconsistent split-horizon, outdated cache, and resolution to unsupported IP family. The test must be run from the same environment as the affected runtime. Resolving the name in the analyst's notebook does not prove that the container, pod or gateway uses the same DNS server, search domain or route."
  },
  {
    "kind": "paragraph",
    "text": "Compare response, TTL, CNAME string, A and AAAA records, and authoritative servers. In recent changes, note intermediate caches and persistent connections: changing DNS does not move already established connections. In private environments, confirm private zones, network links, and conditional forwarders. A difference between environments may indicate that the public name is being resolved where there should be a private response."
  },
  {
    "kind": "paragraph",
    "text": "When balancing, check health checks, eligible pool, algorithm, affinity and drainage. A backend may respond to the superficial health check and fail in the actual operation. Balancer and gateway logs should indicate which instance was selected. Uneven distribution may result from persistent connections, weights, sticky sessions, or a small number of clients."
  },
  {
    "kind": "paragraph",
    "text": "DNS Watch Commands # Linux / macOS dig api.company.example A dig api.company.example AAAA dig +trace api.company.example # Windows PowerShell Resolve-DnsName api.company.example -Type A Resolve-DnsName api.company.example -Server 10.0.0.10"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.5 TCP, sockets, NAT, SNAT and connectivity",
    "id": "38-5-tcp-sockets-nat-snat-and-connectivity"
  },
  {
    "kind": "paragraph",
    "text": "Connectivity must be tested by source, destination, protocol and port. Ping does not validate an API and can be blocked. The relevant test is to open TCP connection from the same network namespace as the affected component. Connection refused typically indicates RST, missing listener, or active rejection. Connect timeout suggests no response, route, firewall, or loss. Connection reset during use indicates abrupt termination by peer or intermediary."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, there are at least two independent connections: client-gateway and gateway-backend. Each has its own IPs, ports, certificates, pools and timeouts. A call may correctly arrive at the external listener and fail to obtain ephemeral port, traverse SNAT, or reuse a backend connection already closed by the other side."
  },
  {
    "kind": "paragraph",
    "text": "Exhaustion of SNAT and ephemeral ports appears as intermittent failure under load. Investigate number of destinations, rate of new connections, keep-alive, pooling, TIME_WAIT, NAT limits and distribution by outgoing IP. Packet capture and flow logs help distinguish missing SYN-ACK, RST and retransmissions. Always preserve the exact point of capture, as the same connection may appear translated in each jump."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Transport symptoms must be associated with network evidence.",
    "headers": [
      "Symptom",
      "Main hypothesis",
      "Next evidence"
    ],
    "rows": [
      [
        "Connection refused",
        "Nothing listens or there is active rejection.",
        "Capture with RST and listener state."
      ],
      [
        "Connect timeout",
        "Firewall, route, loss or destination unavailable.",
        "Retransmitted SYN and flow logs."
      ],
      [
        "Reset after a few seconds",
        "Idle timeout or peer terminated.",
        "FIN/RST and pool configuration."
      ],
      [
        "Flashing under load",
        "SNAT, backlog or ephemeral ports.",
        "Connections, TIMEWAIT and NAT metrics."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.6 TLS, mTLS, certificates and trust",
    "id": "38-6-tls-mtls-certificates-and-trust"
  },
  {
    "kind": "paragraph",
    "text": "TLS flaws require distinguishing protocol, cipher, certificate, name and trust. The client may reject an expired certificate, incomplete chain, untrusted authority, incompatible hostname, or disallowed algorithm. The server can reject TLS, cipher suite, SNI, or client certificate version. The generic \"handshake failed\" message needs to be detailed by logs and inspection tools."
  },
  {
    "kind": "paragraph",
    "text": "In mTLS, check whether the server requested the certificate, which string the client sent, whether the corresponding private key is available, and whether the identity meets the policy. Certificates may be correct in the filesystem and missing in the process due to reload failure. In HSM or Key Vault, investigate permissions, latency, key version, and connectivity."
  },
  {
    "kind": "paragraph",
    "text": "SNI selects the TLS context before the HTTP Host is processed. Testing by IP without informing SNI may return a default certificate and produce a false diagnosis. For backends, also confirm the name used by the gateway in validation: destination IP, configured hostname, sent SNI and truststore may not match."
  },
  {
    "kind": "paragraph",
    "text": "Conceptual inspection of TLS and mTLS # Inspect handshake and chain presented openssl s_client -connect api.empresa.example:443 -servername api.empresa.example -showcerts # Test with client certificate openssl s_client -connect backend.internal:8443 -servername backend.internal -cert client.pem -key client.key Operational caution Never copy private keys or real tokens for personal tools, tickets or chats. Collect only what is necessary, use authorized environments, and mask sensitive data before sharing evidence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.7 HTTP, status codes and error semantics",
    "id": "38-7-http-status-codes-and-error-semantics"
  },
  {
    "kind": "paragraph",
    "text": "HTTP status reports the result observed by a component, not necessarily the root cause. A 401 can come from the gateway, the IdP, or the backend. A 502 generally indicates that an intermediary received an invalid response or was unable to complete upstream communication, but the concrete implementation must be confirmed. A 504 indicates a timeout in the gateway role, while the client may have terminated early and the server continues processing."
  },
  {
    "kind": "paragraph",
    "text": "Compare status, headers, body and sender component. Headers such as Server, Via, Proxy-Status, request IDs and error formats help identify origin, but can be removed or standardized. Problem Details provides structure for API errors, but the type, title, status, and details fields need to be interpreted in context. Avoid relying solely on the textual message."
  },
  {
    "kind": "paragraph",
    "text": "Note method, URI, Host, Content-Type, Accept, Content-Length, Transfer-Encoding and encoding. 400 errors can result from parsing, size limit, invalid header, or transformation. 404 may indicate non-existent route, wrong version or hiding policy. 409 may represent state conflict or idempotence. 429 points limit, and Retry-After can guide retry. The 499 code is a non-standard convention used by some proxies for client who have terminated the connection."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Status codes initiate the analysis, but do not alone identify the responsible component.",
    "headers": [
      "Code",
      "Initial reading",
      "Diagnostic question"
    ],
    "rows": [
      [
        "400",
        "Invalid or rejected message.",
        "Who did the parsing and which rule failed?"
      ],
      [
        "401 / 403",
        "Missing/invalid authentication or access denied.",
        "Which component decided and with what identity?"
      ],
      [
        "429",
        "Limit exceeded.",
        "Which key, window and counter were used?"
      ],
      [
        "502 / 503 / 504",
        "Upstream failure, unavailability or timeout.",
        "Did the gateway connect, receive a response, or time out?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.8 Authentication, authorization and identity",
    "id": "38-8-authentication-authorization-and-identity"
  },
  {
    "kind": "paragraph",
    "text": "In identity issues, separate credential acquisition, validation, and authorization decision. A client may fail to obtain token; the gateway can reject subscription, issuer, audience or expiration; and the application can accept the token, but deny the operation due to scope, role, relationship with the resource or business policy. Each stage has different evidence and owners."
  },
  {
    "kind": "paragraph",
    "text": "For JWTs, confirm allowed algorithm, kid, resolved key, exact issuer, audience, exp/nbf/iat times, clock skew and token type. JWKS cache may keep old key; Poorly coordinated rotation can create a failure window. For opaque tokens, check introspection, gateway authentication, timeout, and result caching. Never conclude that the token is valid just because it can be decoded."
  },
  {
    "kind": "paragraph",
    "text": "Per-object and per-role authorization must be tested with realistic identity. A correct 403 for one user and incorrect for another may indicate claims, group mapping, tenant, ownership or context data. In federation, preserve original issuer and subject before account linking. In mTLS and DPoP, validate the link between token and presented key."
  },
  {
    "kind": "paragraph",
    "text": "Minimum evidence of identity Register issuer, audience, pseudonymized subject, client_id, scopes/roles, applied policy, decision and reason. Do not register the full token. The hash or secure identifier of the credential is usually sufficient for correlation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.9 Policies, routing and transformation at the gateway",
    "id": "38-9-policies-routing-and-transformation-at-the-gateway"
  },
  {
    "kind": "paragraph",
    "text": "Policies can reject, transform, route, cache, call external services, or terminate the flow. The order of execution is part of the behavior. An uninitialized variable, expression with unexpected type or incorrect branch can produce an error far from the apparent point. Compare the published policy with the baseline and use policy tracing when the platform allows it."
  },
  {
    "kind": "paragraph",
    "text": "In routing, confirm API, version, operation, method, host, path template, rewrite and final backend. Very generic routes can capture inappropriate calls; a slash, encoding or case sensitivity can change the match. In multi-stage gateways, the first component may modify Host, path or headers before the second."
  },
  {
    "kind": "paragraph",
    "text": "Transformations must be evaluated before and after. Record secure sizes and hashes, not sensitive payloads. JSON/XML errors can occur due to encoding, namespace, schema or optional content. Cache, retry and fallback policies can mask the original failure; temporarily disabling them requires control, approval and testing in a secure environment."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The policy section helps you locate when the flow was interrupted.",
    "headers": [
      "Policy stage",
      "Typical failure",
      "Evidence"
    ],
    "rows": [
      [
        "Inbound",
        "Token, quota or validation rejected.",
        "Policy trace and input context."
      ],
      [
        "Backend",
        "Upstream route, certificate, or connection.",
        "Selected backend and connect log."
      ],
      [
        "Outbound",
        "Transformation or response size.",
        "Original response and post-policy."
      ],
      [
        "On-error",
        "Original error masked.",
        "Internal exception before handler."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.10 Backends, data, queues and third parties",
    "id": "38-10-backends-data-queues-and-third-parties"
  },
  {
    "kind": "paragraph",
    "text": "When the gateway completes forwarding, the investigation moves to the backend and its dependencies. Differentiate queue time, processing, database, external call and serialization. Low CPU does not prove health: the service may be blocked in connection pools, locks, DNS or I/O. Saturation, queues, threads, event loop, and pools metrics are more informative."
  },
  {
    "kind": "paragraph",
    "text": "Databases may experience slow queries, lock contention, pool exhaustion, delayed replica or failover. The correct answer requires identifying the operation and transactional state. In messaging, check publish confirmation, consumer lag, redelivery, DLQ and ordering. An API may respond 202 correctly and fail later; therefore, the business identifier needs to accompany the asynchronous operation."
  },
  {
    "kind": "paragraph",
    "text": "Third-party dependencies require separating local and remote failure. Compare DNS, certificate, connect time, first byte, status, rate limit and contract. Circuit breakers may open after a sequence of failures and continue to reject even after remote recovery until the test period. The support agreement must define minimum evidence and time zones."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.11 Timeouts, retries, rate limits and cascading failures",
    "id": "38-11-timeouts-retries-rate-limits-and-cascading-failures"
  },
  {
    "kind": "paragraph",
    "text": "Timeouts need to be analyzed as a budget. The client term contains processing at the edge, gateway, backend, and dependencies. If the gateway's timeout is greater than the client's, the gateway can continue work that no one will receive. If the retry occurs close to the end of the term, it increases the load with no chance of success. Deadlines must be propagated and observed by each layer."
  },
  {
    "kind": "paragraph",
    "text": "Retries are only safe when the operation is idempotent or protected by an idempotency key. The log must indicate the attempt number, reason, delay and destination. Multi-tier retries multiply calls: three retries on the client, gateway, and backend can produce up to 27 downstream executions. Backoff and jitter reduce synchronization, but do not correct dependency without capacity."
  },
  {
    "kind": "paragraph",
    "text": "Rate limits and quotas need to reveal key, window, counter and scope. An unexpected 429 could result from shared NAT, incorrect client_id, global counter, or legacy policy. Circuit breakers, bulkheads, queues and load shedding can produce deliberate rejections to protect the system. Troubleshooting must recognize protection working correctly and not remove it without assessing the risk."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/figure-03.svg",
    "alt": "Alignment of timeouts between client, gateway, backend and dependency",
    "caption": "Figure 3 - Deadline alignment reduces useless work and makes the expired component identifiable."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.12 Kubernetes, service mesh and cloud",
    "id": "38-12-kubernetes-service-mesh-and-cloud"
  },
  {
    "kind": "paragraph",
    "text": "In Kubernetes, confirm Pod, Deployment, ReplicaSet, Service, EndpointSlice, and ingress route. A Service can exist without ready endpoints. Readiness removes Pods from balance; liveness restarts processes; startup probe protects slow startup. The Pod event, previous container state and termination reason help differentiate application failure, OOMKill, probe and eviction."
  },
  {
    "kind": "paragraph",
    "text": "Requests and limits influence throttling and scheduling. CPU throttling can increase latency without showing high total CPU. Memory over limit produces OOMKill. Internal DNS, NetworkPolicy, CNI, and kube-proxy/eBPF may affect connectivity. Tests must be done within the Pod or an authorized diagnostic Pod in the same namespace and policy."
  },
  {
    "kind": "paragraph",
    "text": "In service mesh, there are applications, sidecars or proxies per node and control plane. Check received configuration, workload certificates, clusters/endpoints, retries and authorization policies. A 503 may be generated by the proxy before reaching the service. In the cloud, include private endpoints, NSGs/security groups, route tables, SNAT, load balancers, managed identity and service limits."
  },
  {
    "kind": "paragraph",
    "text": "Collection commands in an authorized environment # Observation examples in Kubernetes kubectl get pods,svc,endpointslices -n equipe-api kubectl describe pod <pod> -n equipe-api kubectl logs <pod> -c aplicacao --previous kubectl get events -n equipe-api --sort-by=.lastTimestamp"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.13 Logs, metrics, tracing and correlation",
    "id": "38-13-logs-metrics-tracing-and-correlation"
  },
  {
    "kind": "paragraph",
    "text": "Logs show discrete events; metrics show trend and distribution; traces show path and approximate causality. No signal is enough on its own. An elevation of p99 indicates degradation, the trace shows in which span the time was spent and the log explains the specific error. Exemplars can link a metric point to a representative trace."
  },
  {
    "kind": "paragraph",
    "text": "Correlation needs to cross borders. Request ID can be generated at the edge, trace ID follows W3C Trace Context and business identifier allows reconciliation. Don't substitute one for the other. The gateway must preserve or regenerate identifiers according to policy, avoiding blindly trusting external values that allow collision or injection into logs."
  },
  {
    "kind": "paragraph",
    "text": "Uncontrolled cardinality reduces usefulness of metrics. Do not use CPF, full URL, token or request ID as a label. In logs, mask personal data and secrets. Trace sampling can hide rare failures; Tail sampling allows you to retain errors and high latencies, but depends on adequate Collector and capacity. Synchronized clocks are essential for reliable timelines."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/figure-04.svg",
    "alt": "Correlation between technical identifiers and business identifiers",
    "caption": "Figure 4 - Technical and business identifiers play complementary roles in the investigation."
  },
  {
    "kind": "paragraph",
    "text": "Tools must be chosen by hypothesis. curl or Invoke-WebRequest validate HTTP; openssl inspects TLS; dig and Resolve-DnsName look at DNS; ss, netstat and Get-NetTCPConnection show sockets; tcpdump and Wireshark analyze packets; flow logs reveal network decisions; gateway tools show policy and backend; kubectl and mesh interfaces show workload status."
  },
  {
    "kind": "paragraph",
    "text": "A packet capture must have a minimum scope, duration, and filter. Capture only in an authorized environment and protect the file, as payloads, cookies and tokens may appear in unencrypted traffic or termination endpoints. When TLS prevents content from being read, handshake metadata, sizes, times, retransmissions, and termination are still useful."
  },
  {
    "kind": "paragraph",
    "text": "Preserving evidence means recording the command, origin, time, version, filters, and file hash. Tickets must contain enough data for playback, but not secrets. For critical environments, automate diagnostic bundles that collect configurations and metrics with masking and access control."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The correct tool depends on the question you want to answer.",
    "headers": [
      "Hypothesis",
      "Suitable tool",
      "Expected evidence"
    ],
    "rows": [
      [
        "Name resolves incorrectly",
        "dig /Resolve-DnsName",
        "Response, TTL and server queried."
      ],
      [
        "TLS handshake fails",
        "openssl sclient",
        "SNI, chain, alert and version."
      ],
      [
        "Gateway does not connect",
        "tcpdump / flow logs",
        "SYN, SYN-ACK, RST or drop."
      ],
      [
        "Policy rejects",
        "Platform trace",
        "Filter, variable and error reason."
      ],
      [
        "Slow backend",
        "Trace + metrics",
        "Span, pool, query and saturation."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.15 Incident, runbooks and post-incident management",
    "id": "38-15-incident-runbooks-and-post-incident-management"
  },
  {
    "kind": "paragraph",
    "text": "During an incident, the immediate objective is to reduce impact without destroying evidence or creating additional failures. Define incident commander, channel, scribe, technical owners and update frequency. Separate containment actions, such as removing a faulty instance, from permanent fixes. Every action must record time, executor, hypothesis and result."
  },
  {
    "kind": "paragraph",
    "text": "Runbooks need to contain criteria, not just commands. A failover procedure should tell you when to run, who approves, what preconditions to check, how to validate integrity, and how to go back. Commands without context can be dangerous. Automation must be tested and produce auditable logs."
  },
  {
    "kind": "paragraph",
    "text": "Post-incident analysis reconstructs timeline, root cause, contributing conditions, detection effectiveness, and impact. Avoid attributing the cause to \"human error\" without asking why the system allowed the action, why the review did not detect it and why the blast radius was wide. Actions must be specific, with an owner, deadline and completion criteria."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/api-gateway-troubleshooting/en/figure-05.svg",
    "alt": "Incident response cycle from detection to learning",
    "caption": "Figure 5 - Restoring the service is just one step; validating and learning prevent recurrence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "38.16 Case studies",
    "id": "38-16-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - 502 after certificate rotation: Consumers arrive at the gateway, which logs TLS failure to the backend. The new certificate was installed, but the intermediate chain was not added to the gateway's truststore. Mitigation restores the previous chain; The fix adds automatic bundle validation, window overlay, and synthetic mTLS testing."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - peak intermittent timeouts: metrics show an increase in new connections and SNAT ports consumed. The gateway does not reuse connections because the backend terminates keep-alive early. The fix aligns idle timeouts, enables pooling, expands output capacity and monitors free ports. Increasing just the timeout would have worsened saturation."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - 401 in one region only: JWT validation uses JWKS cache. A region did not update the key after rotation due to failure to egress to the IdP. The token is valid, but the gateway cannot find the kid. The solution fixes connectivity, safely invalidates the cache, and adds JWKS refresh alert."
  },
  {
    "kind": "paragraph",
    "text": "Case 4 - 504 with backend completing the operation: the client expires in 5 seconds, the gateway in 30 and the backend in 25. The payment is executed, but the client repeats. The fix introduces propagated deadline, idempotence key, state query and timeout alignment."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Real cases are solved by locating the boundary between success and failure.",
    "headers": [
      "Case",
      "Latest evidence of success",
      "Root cause"
    ],
    "rows": [
      [
        "502 post-rotation",
        "Gateway received request and initiated TLS backend.",
        "Incomplete chain of trust."
      ],
      [
        "Timeout at peak",
        "SYNs go out, but available ports go down.",
        "SNAT exhaustion due to lack of reuse."
      ],
      [
        "401 regional",
        "Token signed with new kid.",
        "JWKS cache not updated by egress."
      ],
      [
        "504 with effect realized",
        "Backend confirms transaction after customer gives up.",
        "Misaligned deadlines and lack of idempotence."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting APIs and Gateways is a process guided by hypotheses, timeline and evidence. The investigator starts with impact and scope, confirms the actual path of the request, and finds the last successful step. This approach reduces trial-and-error changes and improves communication between teams."
  },
  {
    "kind": "paragraph",
    "text": "DNS, TCP, TLS, HTTP, identity, policies, backends, messaging, Kubernetes and service mesh produce their own symptoms, but they interact. Status codes and messages are clues, not evidence of causation. Logs, metrics, traces, captures and audit logs need to be correlated by time and secure identifiers."
  },
  {
    "kind": "paragraph",
    "text": "Mature operations preserve evidence, contain impact, validate corrections, and transform incidents into improvements. Runbooks, synthetic tests, expiration alerts, configuration diff, observability and automation reduce MTTR and recurrence without compromising security or integrity."
  },
  {
    "kind": "paragraph",
    "text": "Next step of the course Chapter 39 will study real cases from large companies, applying the fundamentals of architecture, security, resilience and troubleshooting to decisions and incidents known in the market."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Troubleshooting checklist",
    "id": "troubleshooting-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Impact, scope, environment, region, consumer and operation are defined.",
      "Times use explicit time zone and component clocks are synchronized.",
      "Last known success, first failure, and correlated changes were recorded.",
      "The actual request path and TLS endpoints have been confirmed.",
      "DNS, IP, port, protocol, SNI, Host and selected backend are documented.",
      "Request ID, trace ID, gateway transaction ID and business identifier were correlated.",
      "The component that produced the status or error has been identified.",
      "Policies, routes, transformations, limits, cache, retries and timeouts were evaluated.",
      "Backends, banks, queues and third parties have evidence of the same range.",
      "Collections avoid secrets and unnecessary personal data.",
      "The mitigation was validated by the entire journey and not just by health check.",
      "Root cause, contributing conditions and preventive actions have an owner and deadline."
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
      "Turn the “API is out” report into five objective screening questions.",
      "Explain how to distinguish connect timeout, read timeout and 504.",
      "Describe an investigation of 401 caused by JWT key rotation.",
      "Show how to identify whether a 502 was produced by the gateway or the backend.",
      "Propose evidence to confirm SNAT exhaustion.",
      "Set a timeout budget for the client, gateway, backend and bank.",
      "Explain why increasing retries can make an incident worse.",
      "Create a runbook for mTLS certificate near expiration.",
      "Describe how to investigate a Kubernetes Service without ready endpoints.",
      "Write a summary timeline for an incident started after a policy change."
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
    "caption": "Table 7 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Baseline",
        "Known state used for configuration and behavior comparison."
      ],
      [
        "blast radius",
        "Scope affected by a failure, change or operational action."
      ],
      [
        "Connect timeout",
        "Deadline exceeded before connection was established."
      ],
      [
        "CorrelationID",
        "Identifier used to relate events from the same transaction."
      ],
      [
        "First byte",
        "Time at which the first byte of the response is received."
      ],
      [
        "Hypothesis",
        "Testable explanation for an observed symptom."
      ],
      [
        "Mitigation",
        "Temporary action to reduce impact before definitive correction."
      ],
      [
        "Read timeout",
        "Deadline exceeded waiting for data after connection is established."
      ],
      [
        "Root cause",
        "Fundamental condition whose removal prevents the incident from recurring."
      ],
      [
        "Runbook",
        "Operational procedure with criteria, steps, validation and rollback."
      ],
      [
        "SNAT exhaustion",
        "Exhaustion of source translation ports or resources."
      ],
      [
        "Synthetic test",
        "Automated journey executed periodically to validate the service."
      ],
      [
        "Timeline",
        "Temporal sequence of facts, changes, symptoms and actions."
      ],
      [
        "Trace ID",
        "Identifier shared by the spans of a distributed transaction."
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
      "IETF. RFC 9112 - HTTP/1.1.",
      "IETF. RFC 9113 - HTTP/2.",
      "IETF. RFC 9114 - HTTP/3.",
      "IETF. RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3.",
      "IETF. RFC 9209 - The Proxy-Status HTTP Response Header Field.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "W3C. Trace Context Recommendation.",
      "OpenTelemetry. Specifications, Collector and Semantic Conventions.",
      "NIST. SP 800-115 - Technical Guide to Information Security Testing and Assessment.",
      "Kubernetes Documentation. Debugging Services, Pods and networking.",
      "Axway Documentation. API Gateway monitoring, tracing and administration.",
      "Microsoft Learn. Azure API Management diagnostics and troubleshooting."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Update note Commands, screens, metrics, and capabilities for gateways, meshes, and managed services vary by version. Before running procedures in production, validate the official documentation of the deployed version, internal runbooks, and necessary authorizations."
  }
];
