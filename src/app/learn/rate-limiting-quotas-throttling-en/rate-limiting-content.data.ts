import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const RATE_LIMITING_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Consumption control on multiple time scales"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/en/overview.svg",
    "alt": "Rate limit, quota, throttling and fairness as complementary controls",
    "caption": "Opening figure - Frequency, accumulated budget and operational reaction are related but distinct concepts."
  },
  {
    "kind": "subhead",
    "text": "Fundamental question"
  },
  {
    "kind": "paragraph",
    "text": "Who can consume how much, in which window, at what cost and what behavior occurs when the budget ends?"
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
    "text": "In previous chapters, the gateway was studied as a point of security, routing, transformation and observability. This chapter delves into a responsibility that seems simple, but becomes complex when the platform serves thousands of consumers, multiple regions and backends with different costs: controlling consumption without destroying the legitimate user experience."
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting, quotas and throttling are often used interchangeably. This simplification hides important decisions. Rate limiting controls frequency in short windows; quota controls a budget accumulated over longer periods or even throughout the life of the subscription; Throttling describes the reaction applied when the policy identifies excess, such as rejecting, delaying, queuing, degrading, or redirecting. An architecture can combine all three mechanisms."
  },
  {
    "kind": "paragraph",
    "text": "Control should also not be reduced to requests per minute. One call can cost much more than another: generating a report, consulting extensive history, processing a file, running AI inference or triggering a business transaction. Modern limits consider weighted units, bytes, tokens, concurrency, and downstream cost. The accounting key can be subscription, application, user, tenant, IP, operation or a composition of these elements."
  },
  {
    "kind": "paragraph",
    "text": "The goal is to build an accurate mental model for design and troubleshooting. The reader will learn algorithms, HTTP semantics, distributed state, application in gateways, client behavior, tests and metrics. In the end, you should be able to explain not only which number was configured, but why the limit exists, where it is counted, what precision is possible and how the consumer should react."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each policy, record six elements: objective, key, cost unit, window, algorithm, and overflow reaction. The absence of any of these elements makes the configuration ambiguous and makes testing, communication and auditing difficult."
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
      "Differentiate between rate limiting, quota, throttling, concurrency, load shedding and protection against abuse.",
      "Explain fixed window, sliding window, token bucket, leaky bucket and GCRA.",
      "Define accounting keys consistent with identity, product, tenant and operation.",
      "Model weighted costs per call, byte, token, or downstream resource.",
      "Understand local, global, hierarchical and distributed limits.",
      "Interpret 429, Retry-After, and threshold informational headers.",
      "Design retries with backoff, jitter and idempotence.",
      "Apply policies on Axway API Gateway, Azure API Management and modern proxies.",
      "Scale limits based on capacity, SLOs, burst and real behavior.",
      "Diagnose unexpected rejections, overshoot, hot keys and divergent counters."
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
      "27.1 Concepts and objectives; 27.2 Keys, units and scopes; 27.3 Fixed window; 27.4 Sliding window; 27.5 Token bucket; 27.6 Leaky bucket and GCRA; 27.7 Competition and backpressure; 27.8 Local and global limits; 27.9 Distributed state; 27.10 Hierarchical policies; 27.11 HTTP Semantics; 27.12 Customer behavior; 27.13 Security and abuse; 27.14 Dimensioning; 27.15 Azure APIM; 27.16 Axway and Envoy; 27.17 Observability; 27.18 Tests; 27.19 Troubleshooting; case studies, summary, exercises and references."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.1 Concepts: rate limit, quota and throttling",
    "id": "27-1-concepts-rate-limit-quota-and-throttling"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting is a flow policy. It establishes how many units can be consumed during a short window, for example 20 requests per second or 600 units per minute. Its main role is to absorb spikes, reduce destructive gusts and preserve capacity for other consumers. The policy can allow for controlled bursting without abandoning a sustainable average rate."
  },
  {
    "kind": "paragraph",
    "text": "Quota is a budget policy. It counts consumption over a longer horizon: calls per day, bytes per month, transactions per billing cycle or AI tokens per subscription. A quota can be renewable, lifetime or linked to a commercial plan. Unlike rate limiting, it does not need to control the fine temporal shape of the traffic; a consumer can quickly spend a quota that is still available."
  },
  {
    "kind": "paragraph",
    "text": "Throttling is the containment action. The most common way in APIs is to respond to 429 Too Many Requests, but internal systems can queue, delay, reduce quality, limit parallelism, or forward to alternative capacity. The choice needs to consider latency, idempotency and cost. Delaying synchronous requests for too long often just transfers pressure to sockets, threads, and queues."
  },
  {
    "kind": "paragraph",
    "text": "These controls do not replace capacity planning, WAF, DDoS protection or authorization. Rate limiting per IP, for example, can reduce brute force, but is fragile in the face of shared NAT, botnets or origin rotation. A robust defense combines layered identity, behavior, reputation, and boundaries."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The policy must separate budget, speed and reaction.",
    "headers": [
      "Concept",
      "Question answered",
      "Typical horizon",
      "Reaction"
    ],
    "rows": [
      [
        "Rate limit",
        "How often can you consume it?",
        "Seconds or minutes.",
        "429, short delay or shed."
      ],
      [
        "Quota",
        "How much can you consume in total?",
        "Hours, days, months or lifetime.",
        "Block until renewal or upgrade."
      ],
      [
        "Throttling",
        "What to do when exceeding?",
        "Immediate and operational.",
        "Reject, queue, degrade, or redirect."
      ],
      [
        "Competition limit",
        "How many jobs can be left in flight?",
        "While operations last.",
        "Do not accept more work."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.2 Keys, cost units and scopes",
    "id": "27-2-keys-cost-units-and-scopes"
  },
  {
    "kind": "paragraph",
    "text": "The key identifies the subject being counted. Limiting just by IP address is simple, but it can penalize thousands of users behind the same NAT and allow evasion due to IP rotation. After authentication, keys such as subscription key, client_id, subject, tenant or mTLS certificate usually better represent the consumer. In B2B flows, a tenant + application + operation composition offers more precise isolation."
  },
  {
    "kind": "paragraph",
    "text": "The cost unit defines what the counter represents. The simplest model assigns cost 1 to each call. In heterogeneous APIs, this equality is misleading. A query by ID and an export of millions of records should not use the same unit. It is possible to weight by operation, payload size, lines processed, estimated duration, downstream calls or tokens consumed."
  },
  {
    "kind": "paragraph",
    "text": "The scope indicates where the rule applies: global, product, API, operation, region, tenant or backend. Overlapping rules need explicit semantics. A call can pass the global protection limit, the commercial plan limit, and a specific expensive operation limit. In general, the request should be declined when any mandatory budget is exhausted."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The correct key depends on the boundary of responsibility.",
    "headers": [
      "Key",
      "Advantage",
      "Risk/caution"
    ],
    "rows": [
      [
        "source IP",
        "Available before authentication.",
        "Shared NAT, proxies and IP evasion."
      ],
      [
        "Subscription key",
        "Aligns consumption with the API plan.",
        "Key shared by many users."
      ],
      [
        "client_id",
        "Identifies OAuth application.",
        "Does not separate users of the same application."
      ],
      [
        "sub/user",
        "Fairness per end user.",
        "Requires validated token and stable identity."
      ],
      [
        "tenant + operation",
        "Corporate and cost isolation.",
        "Cardinality and hot keys."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.3 Fixed window counter",
    "id": "27-3-fixed-window-counter"
  },
  {
    "kind": "paragraph",
    "text": "The fixed window counter divides time into discrete blocks. A 100 calls per minute rule maintains a counter for each minute on the clock or for each period starting at a reference instant. The implementation is simple: calculate the window, atomically increment the key and compare with the limit. The status expires at the end of the period."
  },
  {
    "kind": "paragraph",
    "text": "The main limitation is the boundary burst. A consumer might send 100 calls in the last few seconds of one window and another 100 immediately at the beginning of the next. Although each window respects the limit, the infrastructure observes 200 calls in a few seconds. This behavior is acceptable in some products and dangerous in burst-sensitive backends."
  },
  {
    "kind": "paragraph",
    "text": "Fixed window is suitable for long quotas and budgets where simplicity and auditability matter more than smoothness. For very short-term protection, it is usually combined with a token bucket, sliding window or competition limit."
  },
  {
    "kind": "code",
    "text": "Conceptual fixed window pseudocode\nwindow_id = floor(now_epoch_seconds / window_seconds)\nkey = \"rl:\" + consumer_id + \":\" + window_id\ncount = atomic_increment(key)\nset_expiry_if_first_increment(key, window_seconds)\nallow = count <= limit"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.4 Sliding window: exact log and approximate counter",
    "id": "27-4-sliding-window-exact-log-and-approximate-counter"
  },
  {
    "kind": "paragraph",
    "text": "The sliding window considers the interval immediately prior to the current instant. In the log variant, each consumption records a timestamp; Before deciding, the system removes old events and counts the remaining ones. Accuracy is high, but state grows with traffic and operations on temporal collections can get expensive."
  },
  {
    "kind": "paragraph",
    "text": "The counter variant approximates the window using the counter from the current period and a weighted fraction from the previous period. It reduces memory and cost, but may admit small inaccuracy. Distributed products still accumulate propagation delay and concurrency, so the word \"sliding\" does not mean absolute mathematical accuracy."
  },
  {
    "kind": "paragraph",
    "text": "The choice must be guided by risk. Login and anti-fraud operations can justify greater accuracy. High-volume read APIs may prefer fast approximation. The important thing is to document the overshoot tolerance and validate the behavior under real burst."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Accuracy, cost and burst are inseparable trade-offs.",
    "headers": [
      "Algorithm",
      "State",
      "Accuracy",
      "Behavior"
    ],
    "rows": [
      [
        "Sliding log",
        "Timestamp per event.",
        "High.",
        "Exact movable window, high cost."
      ],
      [
        "Sliding counter",
        "Adjacent window counters.",
        "Approximate.",
        "Softens borders with little state."
      ],
      [
        "Fixed window",
        "One counter per period.",
        "Exact per block, not per moving range.",
        "Can double burst on the border."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.5 Token bucket",
    "id": "27-5-token-bucket"
  },
  {
    "kind": "paragraph",
    "text": "The token bucket models accumulative capacity. A bucket has maximum capacity B and receives tokens at rate r. Each request consumes c tokens. If there is a balance, it passes immediately; if there is not, the policy applies throttling. While the consumer is idle, tokens accumulate to B, allowing for a controlled initial burst."
  },
  {
    "kind": "paragraph",
    "text": "The rate r governs the average sustainable consumption, while B defines the tolerated burst. A bucket with capacity 20 and replenishing 10 tokens per second can accept 20 instant calls after idle and then sustain approximately 10 per second. Expensive operations can consume more than one token, turning the algorithm into a weighted limiter."
  },
  {
    "kind": "paragraph",
    "text": "In distributed implementation, continuous replenishment is usually calculated in a lazy way: upon receiving a request, the system determines how many tokens should have been replenished since the last update, limits the maximum to B and performs atomic consumption. Clocks, concurrency, and partitioning need to be handled carefully."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/en/figure-01-token-bucket.svg",
    "alt": "Token bucket with burst capacity and sustainable average rate",
    "caption": "Figure 1 - The token bucket allows limited burst without abandoning the configured average rate."
  },
  {
    "kind": "code",
    "text": "Conceptual lazy refill logic\nelapsed = now - last_refill\navailable = min(B, stored_tokens + elapsed * refill_rate)\nif available >= request_cost:\n    available -= request_cost\n    decision = ALLOW\nelse:\n    decision = THROTTLE"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.6 Leaky bucket and GCRA",
    "id": "27-6-leaky-bucket-and-gcra"
  },
  {
    "kind": "paragraph",
    "text": "The leaky bucket represents a queue that drains at an approximately constant rate. Requests enter the container and leave in a smoothed manner. When the queue is full, new entries are rejected. Unlike the token bucket, whose classic objective is to allow bursting to accumulated capacity, the leaky bucket emphasizes regularity of output."
  },
  {
    "kind": "paragraph",
    "text": "This smoothing can be useful in asynchronous integration, but in synchronous APIs queuing needs to be limited. Keeping requests waiting takes up connections, memory and timeouts. It is often better to reject early with clear information so that the customer can try again in a controlled manner."
  },
  {
    "kind": "paragraph",
    "text": "The Generic Cell Rate Algorithm, or GCRA, represents a mathematical way of checking temporal compliance through a theoretical arrival time. It is efficient and appears in implementations that need to model rate and burst tolerance without storing each event. For the architect, the central point is to understand that different algorithms can produce different decisions with the same commercial label of \"10 per second\"."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.7 Concurrency limit, backpressure and load shedding",
    "id": "27-7-concurrency-limit-backpressure-and-load-shedding"
  },
  {
    "kind": "paragraph",
    "text": "Rate per unit time does not directly control in-flight work. Ten calls per second may be safe if they last 20 ms and disastrous if each lasts 30 seconds. The concurrency limit protects threads, connections, pools, and queues by restricting how many operations they can execute simultaneously."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure is the ability of a component to signal that the consumer should slow down. In synchronous HTTP, 429, 503 and Retry-After are common signals. In streaming and messaging, the protocol can control windows, credits or confirmation. Load shedding is the deliberate refusal of work to preserve the health of the system; must prioritize critical operations and reject early before consuming expensive resources."
  },
  {
    "kind": "paragraph",
    "text": "Adaptive limiters look at latency, queues, and errors to adjust admission. They can react better to varying capacity, but require control stability and reliable metrics. A poorly calibrated adaptive policy oscillates, reduces throughput unnecessarily, or increases load at the wrong time."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Limiting frequency and limiting concurrency solve different problems.",
    "headers": [
      "Control",
      "Protected variable",
      "When to use"
    ],
    "rows": [
      [
        "Rate limit",
        "Arrivals by time.",
        "Burst and fairness of consumption."
      ],
      [
        "Competition limit",
        "Simultaneous work.",
        "Slow operations, pools and downstream calls."
      ],
      [
        "queue bound",
        "Items waiting.",
        "Absorb microbursts with limited hold."
      ],
      [
        "Load shedding",
        "Global capacity.",
        "Severe degradation and preservation of the core."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.8 Local and global limits",
    "id": "27-8-local-and-global-limits"
  },
  {
    "kind": "paragraph",
    "text": "A local boundary maintains state within each gateway, process, or connection. It is fast, resilient to network failures, and suitable for initial containment. However, in a cluster with N instances, a limit of 100 per second on each node can allow approximately N times this amount when traffic is distributed."
  },
  {
    "kind": "paragraph",
    "text": "A global boundary queries or updates shared state. It offers a consolidated view by consumer, product or tenant, but adds latency and dependency on a critical service. The design needs to choose failure behavior: fail-open preserves availability and can exceed the limit; fail-closed preserves protection and can block legitimate traffic."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/en/figure-02-local-global.svg",
    "alt": "Per-instance local limits and shared global limit",
    "caption": "Figure 2 - Local limits are fast; Global boundaries coordinate the set, at the cost of consistency and availability."
  },
  {
    "kind": "paragraph",
    "text": "Distributed counters face concurrency, replication, and partitioning. If each node maintains cache and synchronizes periodically, multiple nodes can admit requests based on the same balance. If every decision relies on synchronous writing to central storage, accuracy improves, but latency and the risk of bottlenecking increase."
  },
  {
    "kind": "paragraph",
    "text": "Atomic operations, scripts running on the data server, key sharding, and expiration are common techniques. Hot keys arise when many requests share the same identity, such as a large partner or a global boundary. Distributing this key without losing semantics requires budget partitioning, approximate counters, or hierarchical aggregation."
  },
  {
    "kind": "paragraph",
    "text": "Overshoot must be treated as a design property. Product documentation may warn that distributed limits are not completely accurate. The architecture needs to define tolerance: a query API can accept small overshoot; a financial or licensing quota may require subsequent reconciliation and auditable trail."
  },
  {
    "kind": "subhead",
    "text": "Don't promise impossible accuracy"
  },
  {
    "kind": "paragraph",
    "text": "In clusters and distributed regions, \"100 calls\" may mean an operational target with tolerance. Record the algorithm, accounting point, synchronization frequency, and maximum accepted overshoot."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.10 Hierarchical policies and multiple windows",
    "id": "27-10-hierarchical-policies-and-multiple-windows"
  },
  {
    "kind": "paragraph",
    "text": "A single window is rarely enough. A consumer can make 60,000 calls per hour and still send them all within a few seconds. Therefore, mature policies combine windows: 50 per second, 1,000 per minute and 50 thousand per day. Each protects a different aspect: burst, stability and budget."
  },
  {
    "kind": "paragraph",
    "text": "Hierarchical boundaries distribute capacity into levels. There may be a global budget for the platform, a portion per product, another per tenant and a rule per user. This design prevents a large consumer from exhausting all capacity, but creates a risk of underutilization if reserves are tight. In advanced systems, idle capacity can be borrowed with maximum limits and priority."
  },
  {
    "kind": "paragraph",
    "text": "The composition needs to be explained to the consumer. The closest limit to running out may be more useful than publishing dozens of counters. Internally, metrics should indicate which rule won the decision, its key and its scope."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/rate-limiting-quotas-throttling/en/figure-03-layered-control.svg",
    "alt": "Layered containment policies from the edge to the backend",
    "caption": "Figure 3 - Layered containment reduces cost and improves the accuracy of the key used."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.11 HTTP Semantics: 429, Retry-After and Limit Fields",
    "id": "27-11-http-semantics-429-retry-after-and-limit-fields"
  },
  {
    "kind": "paragraph",
    "text": "The 429 Too Many Requests status reports that the customer has sent too many requests within a period of time. The response must be produced by the component that knows the policy and needs to be distinguished from 401, 403, 503 and timeouts. A 429 without rule identification, without correlation and without recovery guidance turns a protection mechanism into a source of incidents."
  },
  {
    "kind": "paragraph",
    "text": "The Retry-After field can carry a number of seconds or an HTTP date. The client should treat it as a minimum guideline before repeating, considering clock, idempotence and own budget. When multiple limits apply, the response should reflect the effective restriction, not just the easiest counter to obtain."
  },
  {
    "kind": "paragraph",
    "text": "X-RateLimit-* headers are widely used, but do not have universal semantics. As of May 2026, the IETF work on RateLimit fields is still Internet-Draft and defines RateLimit-Policy and RateLimit; therefore, it should be treated as an evolving specification. Adoption needs to be versioned and tested with customers, without presenting the draft as a published RFC."
  },
  {
    "kind": "code",
    "text": "Recommended response when exceeding a short-term limit\nHTTP/1.1 429 Too Many Requests\nContent-Type: application/problem+json\nRetry-After: 20\n{\n  \"type\": \"https://api.empresa.example/problems/rate-limit\",\n  \"title\": \"Call limit exceeded\",\n  \"status\": 429,\n  \"detail\": \"Wait before retrying the operation.\",\n  \"policy\": \"client-read-burst\",\n  \"traceId\": \"7b2f...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.12 Correct customer behavior",
    "id": "27-12-correct-customer-behavior"
  },
  {
    "kind": "paragraph",
    "text": "The client must respect Retry-After when present and apply exponential backoff with jitter to prevent thousands of instances from returning at the same time. The backoff must have a maximum limit, number of attempts and time budget. Infinite retry converts a short outage into a prolonged storm."
  },
  {
    "kind": "paragraph",
    "text": "Non-idempotent operations require care. If the client does not know whether the server processed the request, repeating it can duplicate the effects. Idempotency-Key, business identifiers and state query reduce this risk. For 429 received before the backend, the operation was probably not performed, but this property must be guaranteed and documented by the gateway."
  },
  {
    "kind": "paragraph",
    "text": "Co-op customers can also control their own rate before receiving rejections. An SDK can implement local token bucketing based on the published contract. This behavior reduces wasted latency, but does not eliminate server enforcement, because clients may be outdated, misconfigured, or malicious."
  },
  {
    "kind": "code",
    "text": "Exponential backoff with jitter - pseudocode\ndelay = retry_after if present else min(base * 2**attempt, max_delay)\ndelay = random_between(delay * 0.5, delay * 1.5)\nsleep(delay)\nretry_only_if(operation_is_safe_or_idempotent)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.13 Security, abuse and limits per sensitive flow",
    "id": "27-13-security-abuse-and-limits-per-sensitive-flow"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting is an important control against brute force, credential stuffing, enumeration, scraping and abuse of business flows. However, the limit needs to be specific to the attack. Login can combine IP, account and device; password recovery should limit requests by identity and destination; stock query may require rules per product and application."
  },
  {
    "kind": "paragraph",
    "text": "Overly predictable thresholds can be used to discover valid identifiers or trigger logical denial of service against a victim. Locking an account after just a few attempts allows an attacker to prevent legitimate access. Progressive mechanisms, additional challenges and risk signals are often better than absolute blockages."
  },
  {
    "kind": "paragraph",
    "text": "The count must happen early enough to protect resources, but after enough validation to obtain the correct key. A coarse layer per IP may precede authentication; a thin layer per user comes after token validation. Huge payloads need connection and size limits before any expensive parsing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.14 Boundary sizing",
    "id": "27-14-boundary-sizing"
  },
  {
    "kind": "paragraph",
    "text": "A number should not be born of personal preference. The process starts with the sustainable capacity of the backend, latency SLO, safety margin and burst patterns. The useful capacity needs to discount internal traffic, retries, health checks, batch tasks and partial failures. It is then distributed across consumer classes and operations."
  },
  {
    "kind": "paragraph",
    "text": "Traffic percentiles are more useful than isolated averages. It is necessary to observe requests per second, competition, duration, bytes, error rate and downstream fan-out. An endpoint that generates five internal calls must consume a compatible budget. In monetized APIs, the commercial plan must continue to respect physical capacity."
  },
  {
    "kind": "paragraph",
    "text": "The deployment must begin in observation or shadow mode, recording decisions without blocking. Then, gradual enforcement is applied by percentage, environment or pilot consumer. Alerts need to distinguish limit approach, expected contract rejection and platform anomaly."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Limits should derive from observed capacity and business policy.",
    "headers": [
      "Entry",
      "Design question",
      "Evidence"
    ],
    "rows": [
      [
        "Capacity",
        "How much does the backend sustain with SLO?",
        "Load testing and production metrics."
      ],
      [
        "Burst",
        "What gust is tolerable?",
        "Token bucket, queue and downstream pool."
      ],
      [
        "Fairness",
        "How to divide between consumers?",
        "Plans, tenants, priorities and history."
      ],
      [
        "Margin",
        "How much to reserve for crashes and retries?",
        "Degraded scenarios and capacity model."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.15 Azure API Management",
    "id": "27-15-azure-api-management"
  },
  {
    "kind": "paragraph",
    "text": "Azure API Management offers per-subscription and per-key policies. rate-limit and rate-limit-by-key control speed; quota and quota-by-key control call volume and/or bandwidth. The custom key can be constructed by expression from IP, JWT subject, tenant, operation or other trusted attribute."
  },
  {
    "kind": "paragraph",
    "text": "Implementation varies by tier. The current documentation states sliding window in classic tiers and token bucket in v2 tiers. She also warns that distributed rate limiting is not completely accurate. In multiple regions, rate limit counters are applied per regional gateway, while quotas operate globally at the instance level."
  },
  {
    "kind": "paragraph",
    "text": "The order of the policy matters. To use JWT identity as a counter-key, the token must be validated first. Increment-condition can only count specific responses, but outbound evaluations change the update timing. Named values and fragments help standardize limits, but equal keys in different scopes need coherent parameters."
  },
  {
    "kind": "subhead",
    "text": "Conceptual example of policy in Azure API Management"
  },
  {
    "kind": "code",
    "text": "<inbound>\n  <base />\n  <validate-jwt header-name=\"Authorization\" />\n  <rate-limit-by-key\n      calls=\"120\"\n      renewal-period=\"60\"\n      counter-key=\"@(context.Principal?.Identity?.Name ?? context.Request.IpAddress)\"\n      remaining-calls-header-name=\"X-Calls-Remaining\" />\n</inbound>"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.16 Axway API Gateway, Envoy and modern proxies",
    "id": "27-16-axway-api-gateway-envoy-and-modern-proxies"
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, the Throttling filter can be inserted into the policy circuit to limit calls to services and consumers. The design must define the key from the message context and, when necessary, use KPS for configuration data or association with plans. The filter position determines which costs have already been paid and which attributes are available."
  },
  {
    "kind": "paragraph",
    "text": "In topologies with multiple instances, it is essential to verify where the algorithm state resides and how counters are shared. A visually identical policy may behave differently if each gateway applies its own counter. Logs and Traffic Monitor must record the derived key, rule, and decision without exposing credentials."
  },
  {
    "kind": "paragraph",
    "text": "Envoy offers token bucket-based local rate limiting and a global filter that queries a rate limiting service for descriptors. Descriptors allow you to combine route, source, method, and metadata attributes. The architect must decide fail-open or fail-closed when the global service fails and measure the additional latency of the decision."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.17 Observability and indicators",
    "id": "27-17-observability-and-indicators"
  },
  {
    "kind": "paragraph",
    "text": "429 counters are just the beginning. The platform needs to measure evaluated, allowed, limited, unshadowed requests, decision service errors and fail-open. Metrics must be segmented by policy, operation, product, region and consumer class, without creating uncontrollable cardinality."
  },
  {
    "kind": "paragraph",
    "text": "Using the budget is more informative than the final rejection. Percentage of available tokens, time until renewal, current competition and quota approach allow you to alert before the impact. Hot keys, dominant consumers and expensive operations need specific dashboards."
  },
  {
    "kind": "paragraph",
    "text": "Traces should show the limiter's decision as span or event, including policy and query duration, but avoiding the raw key when it contains sensitive identity. Audit logs record configuration, ownership, justification, rollout and rollback changes."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Metrics must explain protection, fairness and mechanism failures.",
    "headers": [
      "Metric",
      "Interpretation"
    ],
    "rows": [
      [
        "allowed / rate limited",
        "Volume accepted and rejected by rule."
      ],
      [
        "remaining ratio",
        "Proximity of budget exhaustion."
      ],
      [
        "decision latency",
        "Limiter cost on the critical path."
      ],
      [
        "estimated overshoot",
        "Difference between contract and observed consumption."
      ],
      [
        "hot key concentration",
        "Dependence on few consumers or tenants."
      ],
      [
        "failure mode allowed",
        "Traffic released due to decision service failure."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Tests need to reproduce temporal pattern, not just total volume. Minimum cases include sub-threshold traffic, instantaneous burst, window boundary, multiple switches, multiple nodes, expiration, configuration change, and storage failure. The clock used by the test must be accurately controlled or recorded."
  },
  {
    "kind": "paragraph",
    "text": "Validate status distribution and customer guidance. Retry-After must be consistent with the effective window. Test whether or not rejected requests reach the backend, whether the counter is incremented by error responses and whether operations with different weights consume the expected units."
  },
  {
    "kind": "paragraph",
    "text": "In an authorized environment, perform progressive load and compare traffic generated, accepted and observed on the backend. A seemingly correct limiter on the gateway may fail due to automatic retry, multiple regions, or uneven balancing. The test must include end-to-end correlation."
  },
  {
    "kind": "code",
    "text": "Temporal validation plan\n# Conceptual test scenario example\n1. send 8 req/s por 30 s  -> no rejection expected\n2. send burst de 30       -> rejection according to bucket capacity\n3. repeat with 4 identities -> isolation between keys\n4. distribute across 3 gateways -> measure overshoot and counter scope\n5. take down rate-limit service -> validate fail-open/fail-closed"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "27.19 Troubleshooting",
    "id": "27-19-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "When a consumer reports 429, first identify which component responded. CDN, WAF, ingress, gateway, service mesh and backend can have independent limits. The response body, headers, trace ID, and visual signature help locate the source. Then, determine the key actually used and whether it matches the expected identity."
  },
  {
    "kind": "paragraph",
    "text": "Intermittent bounces can result from multiple windows, regional counters, clock skew, hot key, configuration cache, or invisible retries. A client can send a call and a library automatically repeats it, doubling consumption. In HTTP/2, multiple streams share a connection; Limiting by connection produces very different semantics than limiting by user."
  },
  {
    "kind": "paragraph",
    "text": "If the limit doesn't seem to work, check policy order, increment condition, scope, empty key, fallback to IP and consistency between instances. In distributed systems, test each node and region. The absence of 429 does not prove the absence of throttling: the engine may delay, queue or respond with another status."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Troubleshooting begins by locating the enforcement and the actual key.",
    "headers": [
      "Symptom",
      "Hypothesis",
      "Evidence"
    ],
    "rows": [
      [
        "Everyone shares the same limit",
        "Empty key or proxy IP.",
        "Counter-key log and trusted X-Forwarded-For chain."
      ],
      [
        "Limit multiplies by the number of nodes",
        "Local counter per instance.",
        "Test by fixing route on each gateway."
      ],
      [
        "429 after few calls",
        "Multiple policies or weighted cost.",
        "Winning Policy ID and increment-count."
      ],
      [
        "Exceeded quota continues to be accepted",
        "Incorrect propagation/restart or window.",
        "Counter status and start of period."
      ],
      [
        "Backend overloads without 429",
        "Limit too high or applied late.",
        "RPS and concurrency before/after the gateway."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - Bank balance API: limit per user prevents a single session from degrading the others, while limit per client_id protects the channel. A global competition rule protects the core. The endpoint receives cost 1; extract exports receive a higher cost. The gateway returns 429 before calling the backend and includes Retry-After."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - Open Finance Partner: each organization has a contractual monthly quota and burst rate limit. The key combines software statement, client_id and institution. mTLS prevents just having a key from consuming the budget. Metrics separate regulatory consumption, retries and business failures."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - AI platform: the policy controls requests per minute and tokens processed. Prompts and responses have variable cost, so the counter is updated with actual consumption when available. A prior estimate prevents extreme payloads; monthly quota controls commercial costs; competition protects GPUs and backends."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Rate limiting controls speed, quota controls budget and throttling defines the reaction to excess. The complete policy also needs key, unit, window, algorithm, scope and failure behavior."
  },
  {
    "kind": "paragraph",
    "text": "Fixed window is simple, sliding window smoothes boundaries, token bucket combines average rate with burst, leaky bucket regularizes output and concurrency limits protect work in flight. No algorithm is universally superior."
  },
  {
    "kind": "paragraph",
    "text": "In distributed clusters, accuracy competes with latency and availability. Local and global limits can be combined, and overshoot must be treated as a measurable property. 429 and Retry-After responses enable customer cooperation; backoff, jitter and idempotence avoid retrieval storms."
  },
  {
    "kind": "paragraph",
    "text": "Gateways like Azure API Management and Axway offer their own policies, while proxies like Envoy distinguish between local limiters and global services. The configuration needs to be validated with temporal load, observability and troubleshooting by key and scope."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "Chapter 28 will cover API Versioning, relating contract evolution, compatibility, coexistence, depreciation and lifecycle governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Project checklist",
    "id": "project-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The objective of the limit is documented: protection, fairness, security, cost or business plan.",
      "The key is stable, reliable, and compatible with NAT, proxies, and identity.",
      "The consumption unit represents the real cost of the operation.",
      "Short and long windows were combined when necessary.",
      "The algorithm and burst capacity are known.",
      "The local, regional or global scope is explicit.",
      "Fail-open/fail-closed was decided for counting service failures.",
      "429, Retry-After and error body are coherent and testable.",
      "Clients have backoff, jitter, and idempotence guidance.",
      "Metrics record policy, decision, overshoot, hot keys and latency.",
      "The rollout went through shadow mode and gradual enforcement.",
      "Tests cover window boundaries, multiple nodes, and configuration changes."
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
      "Differentiate between rate limit, quota, throttling and competition limit.",
      "Explain the fixed window boundary burst.",
      "Qualitatively calculate the behavior of a token bucket with B=20 and r=5/s.",
      "Compare sliding log and sliding counter.",
      "Propose keys for login, B2B API and multi-tenant API.",
      "Explain why a local limit can multiply across a cluster.",
      "Define a fail-open/fail-closed strategy for a critical API.",
      "Write a 429 response with Retry-After and Problem Details.",
      "Propose multiple windows to protect burst and monthly quota.",
      "Create a test plan for three gateways and two regions.",
      "Describe metrics for detecting hot keys and overshoot.",
      "Explain when weighted cost is greater than counting calls."
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
        "Backpressure",
        "Signaling for the producer to reduce shipping speed."
      ],
      [
        "Burst",
        "Short burst above average sustainable rate."
      ],
      [
        "Counterkey",
        "Identifier used to group and account for consumption."
      ],
      [
        "Fail-closed",
        "Block when the decision service fails."
      ],
      [
        "Fail-open",
        "Allow when the decision service fails."
      ],
      [
        "Fixed window",
        "Counting in discrete periods."
      ],
      [
        "GCRA",
        "Temporal algorithm to check rate and burst compliance."
      ],
      [
        "Hotkey",
        "Key with disproportionate volume of updates."
      ],
      [
        "Leaky bucket",
        "Queue drained at approximately constant rate."
      ],
      [
        "Load shedding",
        "Deliberate refusal to work to preserve health."
      ],
      [
        "Overshoot",
        "Admitted consumption above the configured limit."
      ],
      [
        "Quota",
        "Accumulated consumption budget."
      ],
      [
        "Rate limit",
        "Consumption frequency control."
      ],
      [
        "Retry-After",
        "HTTP field that guides when to repeat."
      ],
      [
        "Sliding window",
        "Moving window over the interval prior to the current instant."
      ],
      [
        "Throttling",
        "Containment action applied when exceeding a policy."
      ],
      [
        "Token bucket",
        "Algorithm with maximum capacity and token replacement."
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
      "IETF. RFC 6585 - Additional HTTP Status Codes, including 429 Too Many Requests.",
      "IETF. RFC 9110 - HTTP Semantics, including Retry-After.",
      "IETF HTTPAPI Working Group. RateLimit header fields for HTTP - Internet-Draft, work in progress.",
      "Microsoft Learn. Azure API Management: rate-limit, rate-limit-by-key, quota and quota-by-key policies.",
      "Microsoft Learn. Advanced request throttling with Azure API Management.",
      "Axway Documentation. API Gateway Throttling filter and policy filter reference.",
      "Envoy Proxy Documentation. Local rate limit and global rate limit filters.",
      "OWASP API Security Top 10 - Unrestricted Resource Consumption and protection of sensitive flows.",
      "ITU-T / traffic policing literature. Token bucket, leaky bucket and GCRA."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Algorithms and semantics of managed products can change by tier and version. Drafting RateLimit fields is still a work in progress in 2026. Before standardizing headers or copying policies, validate the official documentation of the deployed version."
  }
];
