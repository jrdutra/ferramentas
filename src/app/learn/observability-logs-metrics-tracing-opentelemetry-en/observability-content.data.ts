import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OBSERVABILITY_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Observability: Correlating signals to explain actual behavior"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/overview.svg",
    "alt": "Logs, metrics and traces converging in shared context",
    "caption": "Opening figure - Logs, metrics and traces gain value when they share context and semantics."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Isolated signs show symptoms; correlation by context allows you to reconstruct cause, impact and dependencies."
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
    "text": "Previous chapters have shown that an API transaction can traverse DNS, balancers, gateways, service meshes, services, banks and messaging systems. When something fails, no single component sees the entire journey. Observability is the discipline that transforms signals emitted by these components into the ability to understand the internal state of the system, reconstruct causality and evaluate impact for consumers and business processes."
  },
  {
    "kind": "paragraph",
    "text": "Logs, metrics, and distributed tracing are often called the pillars of observability. The expression is useful, but it can lead to a fragmented interpretation. The value isn't in storing three types of data in different tools; is to correlate them by service identity, environment, version, request, trace and business context. A metric indicates that latency has increased, a trace locates the responsible step, and a log explains the specific error."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry provides APIs, SDKs, semantic conventions, protocols, and a vendor-agnostic Collector to produce, process, and export telemetry. It does not replace the observability backend. Its role is to standardize instrumentation and transport, reducing dependence on proprietary agents and allowing consistent signals to be sent to different destinations."
  },
  {
    "kind": "paragraph",
    "text": "This chapter delves into observability theory, the design of logs and metrics, the anatomy of traces and spans, context propagation, OTLP, Collector, semantic conventions, sampling, exemplars, SLOs, security, cardinality control and troubleshooting. The focus remains on enterprise APIs, gateways and distributed architectures."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Choose a single business journey – for example, create payment – and track how it appears across all three signals. Ask which identity describes the service, how context traverses each hop, which attributes are stable, and how the diagnosis would change if one of the signals were missing."
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
      "Differentiate between monitoring, telemetry, observability, diagnosis and auditing.",
      "Design structured logs, useful metrics, and distributed traces with consistent context.",
      "Explain trace, span, span context, resource, event, link, status and baggage.",
      "Understand W3C Trace Context, traceparent, tracestate, and interprotocol propagation.",
      "Describe APIs, SDKs, auto-instrumentation, OTLP and OpenTelemetry Collector.",
      "Apply semantic conventions and control high cardinality attributes.",
      "Compare head sampling, parent-based sampling and tail sampling.",
      "Relate exemplars, logs and traces to metrics and SLOs.",
      "Design resilient, safe and economically sustainable pipelines.",
      "Diagnose instrumentation failures and correlation gaps in API Gateways and microservices."
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
      "32.1 Observability, monitoring and telemetry",
      "32.2 Signals and correlation",
      "32.3 Structured logs",
      "32.4 Metrics and cardinality",
      "32.5 Distributed tracing and spans",
      "32.6 Context propagation and baggage",
      "32.7 OpenTelemetry: API, SDK and instrumentation",
      "32.8 OTLP and OpenTelemetry Collector",
      "32.9 Semantic conventions and Resources",
      "32.10 Sampling and exemplars",
      "32.11 SLI, SLO, alerts and dashboards",
      "32.12 Observability in gateways, Kubernetes and messaging",
      "32.13 Security, privacy, costs and troubleshooting",
      "Summary, checklist, laboratories, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.1 Observability, monitoring and telemetry",
    "id": "32-1-observability-monitoring-and-telemetry"
  },
  {
    "kind": "paragraph",
    "text": "Telemetry is the set of data emitted by the system: event records, measurements, traces, profiles and other signals. Monitoring uses part of this data to monitor known conditions, compare values with limits and trigger alerts. Observability is a broader property: the ability to infer internal state and answer novel questions from available external signals."
  },
  {
    "kind": "paragraph",
    "text": "A system can be intensely monitored and still be poorly observable. Dozens of CPU, memory, and availability dashboards don't explain why only consumers in one region receive 502 when querying a specific backend. Observability requires context, correlation, appropriate granularity, and a data architecture that allows you to navigate from aggregate symptom to individual evidence."
  },
  {
    "kind": "paragraph",
    "text": "Auditing has a different objective. An audit log records actions relevant to security and compliance, preserving authorship, integrity, and retention. It can participate in investigations, but should not be confused with diagnostic log. Mixing the two uses leads to too much sensitive data in operational tools or incomplete audit trails."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The concepts complement each other, but meet different objectives.",
    "headers": [
      "Concept",
      "Main question",
      "Example"
    ],
    "rows": [
      [
        "Telemetry",
        "What signals did the system send?",
        "Logs, metrics, traces and profiles."
      ],
      [
        "Monitoring",
        "Did a known condition occur?",
        "Error rate above threshold."
      ],
      [
        "Observability",
        "What explains this behavior?",
        "Correlate route, version, backend and trace."
      ],
      [
        "Audit",
        "Who did what, when and under what authority?",
        "Change of policy or access to sensitive data."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.2 Logs, metrics and traces as correlated signals",
    "id": "32-2-logs-metrics-and-traces-as-correlated-signals"
  },
  {
    "kind": "paragraph",
    "text": "Logs record discrete events with detailed context. Metrics represent aggregate measurements and are powerful for trends, alerts, and capacity. Traces represent the causal path of an operation through processes and services. Each signal has different costs, query models and granularities; none of them are sufficient for all diagnoses."
  },
  {
    "kind": "paragraph",
    "text": "Correlation depends on common attributes. Resource identifies the entity that produced the telemetry, such as service, instance, pod, cluster, and environment. Trace ID and Span ID connect logs to a specific run. Semantic attributes standardize concepts such as HTTP method, route, messaging system, database and error code. Without consistency, dashboards and queries became sets of exceptions per team."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry also treats baggage and profiles as adjacent signals or mechanisms. Baggage propagates key-value pairs across the distributed context; profiles record resource usage at the code level and are evolving in the ecosystem. In this chapter, the focus remains on the three signals most present in APIs, without ignoring that modern architecture can correlate them with other data."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/figure-01-signals.svg",
    "alt": "Logs, metrics and traces correlated by shared context",
    "caption": "Figure 1 - Signals gain operational value when they describe the same entity and the same journey."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.3 Structured logs and operational events",
    "id": "32-3-structured-logs-and-operational-events"
  },
  {
    "kind": "paragraph",
    "text": "A structured log represents the event as typed fields or key-value pairs, typically serialized in JSON or the agent's native format. Instead of just writing \"payment failed\", the record includes timestamp, severity, service, environment, version, operation, error code, trace_id, span_id, and allowed business identifiers. This framework improves automatic filtering, aggregation, and correlation."
  },
  {
    "kind": "paragraph",
    "text": "Severity must reflect the capacity for action. DEBUG and TRACE help in controlled environments; INFO records relevant operational events; WARN indicates degradation or unexpected condition that did not interrupt operation; ERROR records failure of an action; FATAL or equivalent indicates inability to continue. Logging every exception as ERROR creates noise and destroys the value of the alert."
  },
  {
    "kind": "paragraph",
    "text": "Logs need to avoid unnecessary personal data, tokens, cookies, secrets, full payloads and financial numbers. Further masking is not a sufficient defense, because the data may have already been transported or persisted. The correct design starts at the source, with allowlist of fields, data classification, proportional retention and restricted access."
  },
  {
    "kind": "subhead",
    "text": "Example of a structured and correlatable event"
  },
  {
    "kind": "code",
    "text": "{\n  \"timestamp\": \"2026-07-16T11:42:31.052Z\",\n  \"severity\": \"ERROR\",\n  \"service.name\": \"payments-api\",\n  \"deployment.environment.name\": \"production\",\n  \"http.route\": \"/payments/{id}/confirmation\",\n  \"error.type\": \"BackendTimeout\",\n  \"trace_id\": \"4bf92f3577b34da6a3ce929d0e0e4736\",\n  \"span_id\": \"00f067aa0ba902b7\"\n}"
  },
  {
    "kind": "table",
    "caption": "Table 2 - Useful logs are drawn as an operational contract.",
    "headers": [
      "Good practice",
      "Reason",
      "Antipattern"
    ],
    "rows": [
      [
        "Stable fields",
        "Enable reusable queries and alerts.",
        "Free messages with different formats."
      ],
      [
        "Reliable timestamp",
        "Orders events and facilitates correlation.",
        "Divergent clocks without synchronization."
      ],
      [
        "Trace and span IDs",
        "Connect the event to the trace.",
        "Correlation ID created only in one service."
      ],
      [
        "Writing at the source",
        "Prevents exposure of secrets and PII.",
        "Remove data only in the logs backend."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.4 Metrics, instruments, aggregations and cardinality",
    "id": "32-4-metrics-instruments-aggregations-and-cardinality"
  },
  {
    "kind": "paragraph",
    "text": "Metrics represent numerical observations aggregated over time. Counters accumulate events, such as requests and errors. Histograms distribute values, such as duration and payload size, into ranges or representations suitable for the backend. Gauges record a current value, such as open connections or queue depth. UpDownCounters represent quantities that increase and decrease."
  },
  {
    "kind": "paragraph",
    "text": "The choice of instrument defines how the measurement can be aggregated. A request duration should not be recorded as just an average, because the average hides tails. Histograms allow you to consult percentiles and distribution. Still, incorrectly aggregated percentiles can produce erroneous conclusions; It is necessary to understand the backend model and the time window."
  },
  {
    "kind": "paragraph",
    "text": "Cardinality is the number of distinct combinations of attributes. Adding user_id, order_id, full URL, or trace_id as a metric label creates almost unlimited series, increases memory and cost, and can crash the pipeline. Metrics should use limited, stable dimensions such as normalized route, method, status class, region, and version. Individual evidence remains in logs or traces."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The instrument needs to represent the semantics of the measurement.",
    "headers": [
      "Instrument/form",
      "Typical usage",
      "Example in APIs"
    ],
    "rows": [
      [
        "Counter",
        "Events that only grow.",
        "Requests, errors and retries."
      ],
      [
        "Histogram",
        "Distribution of values.",
        "Duration, request size and queue."
      ],
      [
        "Gauge",
        "Value observed at the moment.",
        "Open WebSocket connections."
      ],
      [
        "UpDownCounter",
        "Quantity that rises and falls.",
        "Operations in progress."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Cardinality rule"
  },
  {
    "kind": "paragraph",
    "text": "Metric attributes must answer aggregate questions. Practically unique identifiers belong to logs and traces. Before adding a dimension, estimate how many different values it can take per environment, service, and retention window."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.5 Distributed tracing, traces and spans",
    "id": "32-5-distributed-tracing-traces-and-spans"
  },
  {
    "kind": "paragraph",
    "text": "A trace represents a distributed operation, such as an API call that crosses gateway, service, messaging and bank. Each step is represented by a span, with name, time interval, context, attributes, events, status and relationships with other spans. The framework allows you to observe total latency, critical path, and triggered dependencies."
  },
  {
    "kind": "paragraph",
    "text": "SpanKind describes the role of the span as SERVER, CLIENT, PRODUCER, CONSUMER, or INTERNAL. Classification helps you understand boundaries and calculate metrics from traces. Events record specific occurrences within the span, as an exception. Links relate spans that do not have a single parent-child hierarchy, a common situation in asynchronous and fan-out processing."
  },
  {
    "kind": "paragraph",
    "text": "The span name must have low cardinality and reflect the operation, not the concrete identifier. In HTTP, a normalized route is preferable to the full URL. In messaging, the name of the destination and the operation help to reconstruct production and consumption. The trace must not be transformed into indiscriminate storage of payloads; attributes and events obey the same privacy rules as logs."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/figure-02-trace.svg",
    "alt": "Distributed trace decomposing latency between gateway, service and dependencies",
    "caption": "Figure 2 - A trace shows the decomposition of latency and the critical path of the transaction."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.6 Context propagation, W3C Trace Context and Baggage",
    "id": "32-6-context-propagation-w3c-trace-context-and-baggage"
  },
  {
    "kind": "paragraph",
    "text": "For spans from different processes to belong to the same trace, the context needs to cross the network boundary. The W3C Trace Context standardizes the traceparent and tracestate headers for HTTP. traceparent carries version, trace ID, parent ID and flags. tracestate transports vendor-specific information in an interoperable manner. Instrumentations must extract the incoming context and inject it into outgoing calls."
  },
  {
    "kind": "paragraph",
    "text": "In gRPC, messaging, and proprietary protocols, the same principle is applied by metadata or message properties. Propagation must respect trust boundaries: accepting external IDs without validation or copying all baggage to internal systems can introduce abuse, leakage and increased payload."
  },
  {
    "kind": "paragraph",
    "text": "Baggage carries application context in key-value pairs. He must not transport secrets, personal data or high cardinality information without justification. As it can cross many services, a small field is multiplied by the entire journey. Baggage also does not replace authorization; the application should not trust a propagated claim just because it arrived in the context."
  },
  {
    "kind": "subhead",
    "text": "Distributed Context Conceptual Example"
  },
  {
    "kind": "code",
    "text": "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\ntracestate: vendorname=opaque-value\nbaggage: tenant.tier=premium,region.origin=br-south"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.7 OpenTelemetry: API, SDK and instrumentation",
    "id": "32-7-opentelemetry-api-sdk-and-instrumentation"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separates API and SDK. The API is used by libraries and applications to create instruments without depending on a specific implementation. The SDK implements sampling, processing, aggregation and export. This separation allows a library to be instrumented without requiring the consumer to send data to a specific supplier."
  },
  {
    "kind": "paragraph",
    "text": "Manual instrumentation is suitable for business operations and sections that generic instrumentation does not understand. Self-instrumentation uses agents, bytecode, monkey patching, eBPF or equivalent mechanisms to capture frameworks and libraries with little code change. The combination is usually superior: automatic for infrastructure coverage and manual for business semantics."
  },
  {
    "kind": "paragraph",
    "text": "Instrumenting does not mean generating as much data as possible. Each span, attribute, log and series has a cost. The team must define a telemetry strategy: which journeys are critical, which attributes are required, which conventions are stable, which signals will be derived, and how instrumentation will be tested alongside the code."
  },
  {
    "kind": "table",
    "caption": "Table 4 - OpenTelemetry separates instrumentation contract and pipeline execution.",
    "headers": [
      "Component",
      "Responsibility",
      "Example"
    ],
    "rows": [
      [
        "API",
        "Surface used by instrumentation.",
        "Tracer, Meter and Logger APIs."
      ],
      [
        "SDK",
        "Processes and exports the signal.",
        "Sampler, SpanProcessor and MetricReader."
      ],
      [
        "Instrumentation Library",
        "Captures a framework or library.",
        "HTTP client, JDBC, gRPC or Kafka."
      ],
      [
        "Auto-instrumentation",
        "Applies instrumentation without extensive code changes.",
        "Java agent or equivalent mechanism."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.8 OTLP and OpenTelemetry Collector",
    "id": "32-8-otlp-and-opentelemetry-collector"
  },
  {
    "kind": "paragraph",
    "text": "OTLP is OpenTelemetry's native protocol for transporting telemetry. It can operate over gRPC or HTTP and has templates for traces, metrics and logs. The protocol reduces the need for different formats per vendor, but does not eliminate network decisions, authentication, compression, queuing, retry, and loss protection."
  },
  {
    "kind": "paragraph",
    "text": "The OpenTelemetry Collector receives, processes, and exports telemetry. Receivers accept OTLP and other formats. Processors apply batching, filtering, transformation, enrichment, sampling and memory protection. Exporters send data to backends. Extensions provide auxiliary capabilities such as health checks and authentication. Pipelines are declared by sign."
  },
  {
    "kind": "paragraph",
    "text": "The Collector can be deployed as an agent close to the application, a central gateway per cluster or region, or a combination in layers. The agent pattern reduces hops and collects local data; The gateway pattern centralizes backend processing and credentials. The design must consider availability, persistent queues, isolation per tenant, scalability and the risk of making the Collector a single point of failure."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/figure-03-collector.svg",
    "alt": "OpenTelemetry Collector processing signals between receivers, processors and exporters",
    "caption": "Figure 3 - Collector decouples applications from backends and applies processing in pipelines."
  },
  {
    "kind": "subhead",
    "text": "Collector pipeline summary example"
  },
  {
    "kind": "code",
    "text": "receivers:\n  otlp:\n    protocols:\n      grpc: {}\n      http: {}\nprocessors:\n  memory_limiter:\n    limit_mib: 1024\n  batch: {}\nexporters:\n  otlp/backend:\n    endpoint: observability.internal:4317\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, batch]\n      exporters: [otlp/backend]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.9 Semantic conventions, Resource and attribute governance",
    "id": "32-9-semantic-conventions-resource-and-attribute-governance"
  },
  {
    "kind": "paragraph",
    "text": "Semantic conventions define common names, types, and meanings for attributes, span names, metrics, and units. Without these conventions, each team could register an HTTP method as method, httpMethod or verb, making corporate dashboards unfeasible. Standardization allows you to consult services written in different languages with the same logic."
  },
  {
    "kind": "paragraph",
    "text": "Resource describes the entity that produced the telemetry. Attributes like service.name, service.version, deployment.environment.name, host, container, and Kubernetes help you locate the source. Resource should not be confused with operation attributes: service.name describes the issuer; http.route describes the request."
  },
  {
    "kind": "paragraph",
    "text": "Not all semantic conventions have the same level of stability. Governance must record the adopted version, track experimental changes, and prevent silent renames. Tel Weaver and schema tools can help organizations validate telemetry contracts, but the discipline starts with a clear catalog of allowed attributes."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Semantic conventions make telemetry interoperable.",
    "headers": [
      "Category",
      "Attribute examples",
      "Caution"
    ],
    "rows": [
      [
        "Resource",
        "service.name, service.version, k8s.cluster.name",
        "Stable values per entity."
      ],
      [
        "HTTP",
        "http.request.method, http.route, http.response.statuscode",
        "Use normalized route."
      ],
      [
        "RPC",
        "rpc.system, rpc.service, rpc.method",
        "Monitor the stability of the convention."
      ],
      [
        "Messaging",
        "messaging.system, destination and operation",
        "Avoid unique IDs as labels."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.10 Sampling, controlled loss and preservation of useful traces",
    "id": "32-10-sampling-controlled-loss-and-preservation-of-useful-traces"
  },
  {
    "kind": "paragraph",
    "text": "Sampling reduces trace volume. Head sampling decides at the beginning, using probability, parent context or local rules. It's cheap and fast, but you don't know the end result. A rare error can be ruled out before it happens. Parent-based sampling helps maintain consistency between child spans and the trace decision."
  },
  {
    "kind": "paragraph",
    "text": "Tail sampling decides after gathering enough spans in the Collector or backend. It can preserve traces with errors, high latency, or specific attributes. On the other hand, it requires memory, waiting, consistent routing of spans of the same trace and capacity planning. A distributed deployment without trace affinity may make incomplete decisions."
  },
  {
    "kind": "paragraph",
    "text": "The policy must reflect objectives: maintaining 100% errors, traces above SLO, representative samples per route and a small percentage of healthy traffic. Sampling does not correct poorly designed telemetry. Even discarded traces can contribute to derived metrics, depending on the point at which aggregation occurs."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/figure-04-sampling.svg",
    "alt": "Comparison between head sampling and tail sampling",
    "caption": "Figure 4 - Head and tail sampling have different costs and decision capabilities."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.11 Exemplars and correlation between metrics, logs and traces",
    "id": "32-11-exemplars-and-correlation-between-metrics-logs-and-traces"
  },
  {
    "kind": "paragraph",
    "text": "Exemplary associates a metric observation with a representative trace or context. By observing a high latency bucket, the operator can open a real trace that contributed to that value. This navigation reduces the jump between aggregated view and individual evidence, especially in latency tail incidents."
  },
  {
    "kind": "paragraph",
    "text": "Logs can also carry trace_id and span_id. The ideal correlation allows you to navigate from an alert to the series, from the series to an exemplar, from the exemplar to the trace, and from the span to logs of the same execution. This experience relies on consistent instrumentation, time synchronization, compliant retention, and cross-backend integration."
  },
  {
    "kind": "paragraph",
    "text": "Correlation should not be used to copy all data for all signals. Metrics remain aggregated; traces remain selective; logs continue events. The objective is to maintain common navigation keys and semantics, preserving the economic and operational advantages of each model."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.12 SLI, SLO, error budget and alerts",
    "id": "32-12-sli-slo-error-budget-and-alerts"
  },
  {
    "kind": "paragraph",
    "text": "SLI is a measurement of observed behavior, such as the proportion of valid requests that complete successfully below a latency threshold. SLO sets the target to a window, for example 99.9% in 30 days. The error budget represents the number of failures tolerated before exceeding the target. This approach connects telemetry to user expectation."
  },
  {
    "kind": "paragraph",
    "text": "Infrastructure-only alerts produce many false positives and false negatives. High CPU may be normal; Low CPU can coexist with complete unavailability due to DNS error. Burn rate alerts observe how quickly the error budget is consumed and can combine short and long windows to balance speed and stability."
  },
  {
    "kind": "paragraph",
    "text": "Dashboards must follow operational questions. For APIs, the golden signals - latency, traffic, errors and saturation - are a good starting point. However, route, consumer, region, version, and backend need to be controlled dimensions. Panels without owner, SLO and associated action become decoration."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/observability-logs-metrics-tracing-opentelemetry/en/figure-05-slo.svg",
    "alt": "Telemetry transformed into SLI, SLO and burn rate alert",
    "caption": "Figure 5 - Telemetry only becomes reliability when it feeds objectives and decisions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.13 Observability in API Gateways, Kubernetes and messaging",
    "id": "32-13-observability-in-api-gateways-kubernetes-and-messaging"
  },
  {
    "kind": "paragraph",
    "text": "API Gateway must register the edge view and the upstream view separately. Total duration, time to backend, status produced by the gateway, upstream status, policy that failed, route, consumer and trace context are different evidence. A 502 needs to indicate whether there was a DNS failure, connect timeout, TLS, reset, or invalid response from the backend."
  },
  {
    "kind": "paragraph",
    "text": "In Kubernetes, Resources and infrastructure attributes connect the logical service to cluster, namespace, workload, pod, container, and node. Collector can enrich telemetry with environmental metadata. The design needs to tolerate ephemeral pods, rollouts, and IP changes without treating the instance as a permanent identity."
  },
  {
    "kind": "paragraph",
    "text": "In messaging, causality may not form a simple tree. Production, storage, consumption, retries and DLQ occur at different times. Links and semantic attributes help relate messages. Lag metrics, message age, redelivery rate and queue depth complement traces, but need to be interpreted within the broker's semantics."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Each layer has its own signals, but the journey needs to remain correlatable.",
    "headers": [
      "Layer",
      "Essential metrics",
      "Detailed evidence"
    ],
    "rows": [
      [
        "Gateway",
        "Requests, latency, errors, upstream time, TLS failures.",
        "Trace through policy and routing logs."
      ],
      [
        "Kubernetes",
        "CPU, memory, restarts, throttling, availability.",
        "Resource attributes, events and pod logs."
      ],
      [
        "Messaging",
        "Lag, depth, throughput, age, redelivery.",
        "Producer/consumer spans and message IDs controlled."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.14 Security, privacy and integrity of telemetry",
    "id": "32-14-security-privacy-and-integrity-of-telemetry"
  },
  {
    "kind": "paragraph",
    "text": "Telemetry is a sensitive asset. It can reveal internal topology, service names, versions, failures, user identifiers, and security decisions. The pipeline must use authentication, encryption in transit, tenant segregation, access controls, retention, and administration trail. Collectors should not accept data from any source without validation."
  },
  {
    "kind": "paragraph",
    "text": "Trace context propagation crosses external borders and needs policy. Received IDs can be accepted, regenerated or related by links depending on the risk and need for correlation. Baggage must be filtered. Authentication logs need to avoid tokens and credentials; SQL or HTTP attributes should not log sensitive values by default."
  },
  {
    "kind": "paragraph",
    "text": "Integrity also matters. An attacker may attempt to hide activity by reducing telemetry, flooding the pipeline, or injecting misleading fields. Limits, mutual authentication, schema validation, monitoring the Collector itself, and immutable storage for auditing reduce this risk."
  },
  {
    "kind": "subhead",
    "text": "Telemetry is not an LGPD-free area"
  },
  {
    "kind": "paragraph",
    "text": "Observational data remains subject to purpose, minimization, retention, access and security. A trace ID may not identify a person on its own, but logs and baggage often carry context that makes correlation possible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.15 Pipeline costs, retention, cardinality and capacity",
    "id": "32-15-pipeline-costs-retention-cardinality-and-capacity"
  },
  {
    "kind": "paragraph",
    "text": "Observability costs CPU, memory, network, storage, indexing and querying. The cost arises in the instrumentation and is multiplied by volume, cardinality and retention. An application that adds five high cardinality attributes can increase series and indexes much more than the traffic growth suggests."
  },
  {
    "kind": "paragraph",
    "text": "The strategy must define retention tiers, sampling, compression, aggregation and signal routing. Debug logs may remain for a few days; aggregated metrics can have long retention; full traces can be sampled; Auditing follows its own policy. Collector allows you to filter, transform, and forward data to different destinations before paying the full cost on the backend."
  },
  {
    "kind": "paragraph",
    "text": "The pipeline also needs SLO. Internal queues, dropped spans, export failures, memory denials, processing time and Collector CPU usage must be monitored. An observability platform that silently loses data can lead teams to incorrect conclusions during incidents."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.16 Observability troubleshooting",
    "id": "32-16-observability-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "When a trace is broken, check the propagation first. Did the client inject traceparent? Did the gateway preserve or recreate the context? Did the service library extract the header? Did asynchronous calls load the correct context? A failure at any hop creates separate traces, even if all components are instrumented."
  },
  {
    "kind": "paragraph",
    "text": "When metrics disappear, investigate the instrument, views, temporality, export interval, filters, and cardinality. In logs, check parsing, timestamp, multiline, encoding and severity mapping. In the Collector, examine health, queues, memory limiter, batch, retries and exporter errors. The pipeline itself needs to emit telemetry to be diagnosed."
  },
  {
    "kind": "paragraph",
    "text": "Time differences produce spans with impossible order and logs outside the window. Clock synchronization is a basic requirement. It is also common for empty or inconsistent service names to group different applications together on the backend. A checklist of Resources and semantic conventions must be part of the deployment."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Diagnosis begins by separating generation, propagation, processing and storage.",
    "headers": [
      "Symptom",
      "Hypothesis",
      "Evidence"
    ],
    "rows": [
      [
        "Split trace",
        "Context not propagated or incompatible format.",
        "Headers/metadata at each jump."
      ],
      [
        "Missing spans",
        "Sampling, shutdown without flush or exporter failing.",
        "SDK logs and Collector metrics."
      ],
      [
        "Metric explodes",
        "High cardinality attribute.",
        "Count of series per label."
      ],
      [
        "Uncorrelated logs",
        "traceid/spanid not injected.",
        "Appender configuration and active context."
      ],
      [
        "Collector discards data",
        "Memory limit, queue full or backend unavailable.",
        "Internal telemetry and exporter errors."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "32.17 Case studies and labs",
    "id": "32-17-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case Study 1: Consumers intermittently receive 504 on a banking API. The latency metric only shows increase on one route. An exemplar opens a trace whose gateway span consumes little time, but the backend span remains close to timeout. The logs from the same trace indicate an exhausted connection pool. Correlation avoids changing gateway policies unnecessarily."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2: After a rollout, the cost of metrics increases tenfold. Investigation shows that a new version added customer_id as a histogram attribute. The fix removes the identifier from the metric and preserves it only in sampled spans and authorized logs. The incident demonstrates why telemetry needs contract review."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3: Kafka messages appear as separate traces from the original request. The producer created spans, but did not inject context into the message headers. After correcting the propagation and using links in the consumer when appropriate, the platform begins to reconstruct the asynchronous journey without forcing an incorrect hierarchy."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Instrument an API with self-instrumentation and a manual business span. 2) Propagate traceparent through the gateway and confirm trace continuity. 3) Configure a Collector with OTLP receiver, memory_limiter, batch and two exporters. 4) Create a metric with low cardinality and associate exemplars. 5) Simulate error, timeout and asynchronous message and compare the three signals."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Observability is the ability to explain the internal behavior of systems based on external signals. Logs, metrics and traces have different models and must be correlated by Resource, distributed context and semantic conventions. The quality of the correlation is more important than the quantity of data."
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry separates APIs, SDKs, instrumentations, OTLP protocol and Collector. This architecture enables vendor-agnostic instrumentation, centralized processing, and export to multiple backends. The Collector, however, needs to be designed as a critical component, with its own capacity, queues, security and telemetry."
  },
  {
    "kind": "paragraph",
    "text": "Sampling, exemplars, SLOs and alerts transform signals into decisions. Cardinality, privacy and cost need to be addressed by design. In gateways, Kubernetes, and messaging, each layer produces specific evidence, but the full journey only appears when context and semantics cross all boundaries."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves deeper into Kubernetes for APIs, connecting workloads, Services, Ingress/Gateway API, probes, autoscaling, security and operations to the observability practices presented here."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Observability checklist",
    "id": "observability-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Each service defines service.name, version, environment, and ownership consistently.",
      "Logs are structured, correlatable, and do not contain secrets or unnecessary personal data.",
      "Metrics use correct instruments and low cardinality attributes.",
      "Spans describe stable operations, dependencies, errors, and timing without copying entire payloads.",
      "Trace context is propagated across HTTP, gRPC and messaging, respecting trust boundaries.",
      "Semantic conventions and their stability are governed as a contract.",
      "Sampling preserves errors, high latency and healthy traffic representation.",
      "Collector has memory limiter, batch, queues, retries, health checks and internal telemetry.",
      "Dashboards and alerts are linked to SLIs, SLOs, owners and known actions.",
      "Costs, retention, cardinality, and privacy are reviewed before production."
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
      "Differentiate between telemetry, monitoring, observability and auditing.",
      "Explain why trace_id is inappropriate as a metric label.",
      "Describe Resource, span, event, link, status and baggage.",
      "Explain traceparent and tracestate in a distributed HTTP call.",
      "Compare manual instrumentation and self-instrumentation.",
      "Design a Collector pipeline with receivers, processors and exporters.",
      "Compare head sampling and tail sampling.",
      "Explain how exemplars connect metrics and traces.",
      "Propose an availability SLI and a latency SLI for an API.",
      "List controls to prevent exposure of tokens and PII in telemetry.",
      "Describe how to diagnose a broken trace between gateway and backend.",
      "Propose a laboratory to correlate HTTP request, message and asynchronous processing."
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
        "attribute",
        "Key-value pair associated with Resource, span, metric or log."
      ],
      [
        "Baggage",
        "Application context propagated between processes."
      ],
      [
        "Exemplar",
        "Metric observation associated with a trace or representative context."
      ],
      [
        "Head sampling",
        "Sampling decision made at the beginning of the trace."
      ],
      [
        "LogRecord",
        "Log record model in OpenTelemetry."
      ],
      [
        "OTLP",
        "OpenTelemetry native transport protocol."
      ],
      [
        "Resource",
        "Entity that produces telemetry."
      ],
      [
        "Semantic conventions",
        "Standard names and meanings for telemetry."
      ],
      [
        "SLI",
        "Quantitative indicator of observed behavior."
      ],
      [
        "SLO",
        "Goal set for an SLI in a window."
      ],
      [
        "Span",
        "Unit of work timed within a trace."
      ],
      [
        "Tail sampling",
        "Sampling decision after observing trace spans."
      ],
      [
        "Trace",
        "Causal representation of a distributed operation."
      ],
      [
        "Trace Context",
        "W3C Distributed Context Propagation Standard."
      ],
      [
        "View",
        "Configuration that changes metric aggregation and attributes in the SDK."
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
      "OpenTelemetry. What is OpenTelemetry? and Observability Primer.",
      "OpenTelemetry. Concepts: Signals, Traces, Metrics, Logs, Baggage and Context Propagation.",
      "OpenTelemetry Specification. Overview, Tracing, Metrics and Logs.",
      "OpenTelemetry Semantic Conventions.",
      "OpenTelemetry Collector: Architecture, Configuration, Deployment Patterns and Scaling.",
      "W3C. Trace Context Level 2.",
      "W3C. Baggage.",
      "Google SRE. Service Level Objectives and Error Budgets.",
      "CNCF. OpenTelemetry project documentation."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "OpenTelemetry evolves sign by sign, and semantic conventions can be stable or experimental. Before standardizing attributes, exporters or declarative configuration, validate the status of the adopted version and test migrations in a controlled environment."
  }
];
