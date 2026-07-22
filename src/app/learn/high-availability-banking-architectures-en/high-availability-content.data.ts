import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const HIGH_AVAILABILITY_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "High banking availability: end-to-end continuity, not just duplicate servers"
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "The critical service needs to survive process, node, zone, region, vendor, change, and human error failures."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/overview.svg",
    "alt": "Resilient banking architecture protecting end-to-end continuity",
    "caption": "Opening figure - Bank availability depends on the continuity of the entire chain, not just isolated components."
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
    "text": "At a financial institution, unavailability doesn't just mean a slow screen. It can prevent payments, block transfers, interrupt settlements, leave customers without access to balances, delay reconciliations and increase exposure to fraud. Therefore, the high availability banking architecture needs to be built based on critical business operations and the consequences of their interruption, and not just the duplication of servers."
  },
  {
    "kind": "paragraph",
    "text": "The Basel Committee defines operational resilience as a bank's ability to deliver critical operations during a disruption. This perspective is broader than technical availability: it includes people, processes, technology, facilities, suppliers and external dependencies. The architecture must assume that failures will occur and establish tolerances for disruption, protection mechanisms, response, adaptation, recovery and learning."
  },
  {
    "kind": "paragraph",
    "text": "In Brazil, the topic relates to risk management structures, cybersecurity policy, the contracting of processing and cloud services and the requirements of payment arrangements. Standards and manuals do not prescribe a single topology, but require governance, continuity, controls, testing, recoverability and third-party management. The technical design needs to transform these obligations into verifiable properties."
  },
  {
    "kind": "paragraph",
    "text": "This chapter connects API Gateways, microservices, messaging, Kubernetes, observability, and Zero Trust to a banking vision of continuity. RTO, RPO, SLOs, fault domains, active-active, active-passive, consistency, replication, idempotence, reconciliation, capacity, security, disaster recovery and testing of severe but plausible scenarios will be studied."
  },
  {
    "kind": "paragraph",
    "text": "How to study this chapter For each architecture, identify the critical operation, the dependency that could fail, the customer-observed effect, the accepted tolerance, the recovery strategy, and the evidence produced by testing. High availability without measurable criteria is just an intention."
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
      "Differentiate between availability, reliability, business continuity, disaster recovery and operational resilience.",
      "Define critical operations, impact, disruption tolerance, RTO, RPO, SLI and SLO.",
      "Design redundancy by process, node, zone, region, network, vendor, and team.",
      "Compare active-active, active-passive, warm standby and pilot light topologies.",
      "Understand synchronous and asynchronous replication, quorum, split-brain and consistency.",
      "Apply idempotence, ledger, Outbox, reconciliation and delivery semantics to financial transactions.",
      "Design DNS, balancers, API Gateways, egress and connectivity with controlled failover.",
      "Relate security, HSM, PKI, secret management and suppliers to availability.",
      "Plan capacity, graceful degradation, load shedding, and protection against cascading failures.",
      "Build DR, chaos engineering, observability and auditable incident response tests."
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
      "37.1 High availability and operational resilience",
      "37.2 Critical operations, impact and tolerance to disruption",
      "37.3 Metrics: availability, SLI, SLO, RTO and RPO",
      "37.4 Fault domains and true redundancy",
      "37.5 Active-active, active-passive and multi-region",
      "37.6 Data: replication, quorum and consistency",
      "37.7 Transactional integrity, idempotency and reconciliation",
      "37.8 Network, DNS, balancers and API Gateways",
      "37.9 Security, HSM, PKI, cloud and third parties",
      "37.10 Capacity, backpressure and controlled degradation",
      "37.11 Observability and incident response",
      "37.12 Changes, DR, testing and chaos engineering",
      "37.13 Hybrid architectures, mainframe, Pix and instant payments",
      "37.14 Troubleshooting and case studies",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.1 High availability and operational resilience",
    "id": "37-1-high-availability-and-operational-resilience"
  },
  {
    "kind": "paragraph",
    "text": "High availability is the ability of a service to remain accessible within an agreed level. Reliability deals with the probability of performing correctly over a period of time; business continuity deals with maintaining essential activities; disaster recovery focuses on restoring technology after a disaster; operational resilience integrates prevention, absorption, response, recovery and learning. In banks, these concepts overlap, but are not synonymous."
  },
  {
    "kind": "paragraph",
    "text": "An application can have 99.99% uptime and still be operationally fragile if a failure produces incorrect balances, duplicate payments or incomplete reconciliation. Therefore, the quality of recovery is as important as its speed. The architecture must preserve integrity, traceability and the ability to explain the final state of each transaction."
  },
  {
    "kind": "paragraph",
    "text": "Resilience must be assessed by critical operation, not the aggregate status of the infrastructure. The mobile application may be available while payment initiation fails due to unavailability of an HSM or an external participant. The chain needs to be modeled from channel to ledger, including authentication, gateway, services, queues, banks, networks, providers and human processes."
  },
  {
    "kind": "subhead",
    "text": "Layered resilience: every dependency needs a failure response"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/figure-01.svg",
    "alt": "Interdependent layers of banking resilience, from business to infrastructure",
    "caption": "Figure 1 - Resilience is made up of interdependent technical and organizational layers."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.2 Critical operations, impact and tolerance to disruption",
    "id": "37-2-critical-operations-impact-and-tolerance-to-disruption"
  },
  {
    "kind": "paragraph",
    "text": "The first step is to identify critical operations, such as balance inquiry, card authorization, settlement, Pix, bill issuance, authentication, fraud prevention and partner access. The classification needs to consider customers, financial stability, regulatory obligations, financial losses, reputation and systemic effect. Internal services can also be critical when supporting multiple external journeys."
  },
  {
    "kind": "paragraph",
    "text": "Business Impact Analysis relates operations, dependencies, peak periods, volumes, consequences and recovery priorities. Disruption tolerance expresses how much impact the institution accepts under severe but plausible scenarios. This tolerance is not just time: it can involve number of affected customers, financial volume, settlement delay, tolerable divergence and manual contingency capacity."
  },
  {
    "kind": "paragraph",
    "text": "Mapping dependencies requires going beyond the logical diagram. It is necessary to register certificates, HSMs, DNS, queues, banks, legacy systems, cloud providers, telecommunications, on-call teams and support contracts. A shared dependency can invalidate seemingly independent redundancies. Two data centers that use the same circuit, the same certificate authority, or the same configuration pipeline have common risks."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Resilience starts with the business operation and its real dependencies.",
    "headers": [
      "Element",
      "Architecture question",
      "Evidence"
    ],
    "rows": [
      [
        "Critical Operation",
        "Which service should continue during the disruption?",
        "Catalog, BIA and owner."
      ],
      [
        "Tolerance",
        "How much impact is acceptable and for how long?",
        "Approved limits and scenarios."
      ],
      [
        "Dependencies",
        "What resources support the end-to-end operation?",
        "Technical and third-party map."
      ],
      [
        "Contingency",
        "How to operate in degraded or manual mode?",
        "Runbook and periodic testing."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.3 Metrics: availability, SLI, SLO, RTO and RPO",
    "id": "37-3-metrics-availability-sli-slo-rto-and-rpo"
  },
  {
    "kind": "paragraph",
    "text": "Availability can be measured as the proportion of time or requests that are successful. For APIs, the indicator must consider semantics: an HTTP 200 response with incorrect data is not success. SLIs can measure success rate, latency, data freshness, completeness, processing time, and backlog. The SLO defines the objective and the error budget allows you to decide how much change or operational risk fits into the period."
  },
  {
    "kind": "paragraph",
    "text": "RTO is the maximum time expected to restore operation after an interruption. RPO is the maximum amount of data that can be lost, expressed as the temporal distance between the last recoverable point and failure. These values guide replication, backup, failover, automation, and testing frequency. Zero RPO typically requires synchronous mechanisms or a distributed ledger with strong coordination, increasing latency and complexity."
  },
  {
    "kind": "paragraph",
    "text": "MTTR and MTBF help observe recovery and failure frequency, but are not a substitute for experience metrics. In distributed systems, partial degradations are more common than total failures. Therefore, dashboards must show availability by operation, region, channel and dependency, as well as integrity and reconciliation indicators."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/figure-02.svg",
    "alt": "Timeline comparing RPO and RTO during a recovery",
    "caption": "Figure 2 - RPO limits data loss; RTO limits the time to restore operation."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Technical metrics need to be linked to architecture and business decisions.",
    "headers": [
      "Objective",
      "Meaning",
      "Influenced decision"
    ],
    "rows": [
      [
        "SLO",
        "Desired service level in one window.",
        "Capacity, alerts and error budget."
      ],
      [
        "RTO",
        "Deadline to reestablish operation.",
        "Automation, standby and priority."
      ],
      [
        "RPO",
        "Maximum acceptable data loss.",
        "Replication, journal and backup."
      ],
      [
        "Disruption tolerance",
        "Maximum accepted impact on the business.",
        "End-to-end strategy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.4 Fault domains and true redundancy",
    "id": "37-4-fault-domains-and-true-redundancy"
  },
  {
    "kind": "paragraph",
    "text": "A fault domain is a set of components that can be affected by the same event. Processes on the same host share the node; nodes in the same rack can share power; zones can share a region; Regions can share provider, control plane, identity, or wide area network. True high availability requires identifying the biggest event that the architecture must tolerate."
  },
  {
    "kind": "paragraph",
    "text": "Redundancy eliminates single points only when copies are independent and tested. Two firewalls with the same faulty configuration can fail simultaneously. Two clusters receiving the same incorrect change do not protect against logical error. Operational diversity, pipeline separation, staged rollout and the ability to freeze changes during an incident are part of the architecture."
  },
  {
    "kind": "paragraph",
    "text": "Independence also needs to include people and procedures. The same team may not be able to operate two environments during a crisis. Emergency credentials, out-of-band communication, vendor contacts, and runbook access must survive the unavailability of normal systems."
  },
  {
    "kind": "paragraph",
    "text": "Test of Independence Ask: What common cause brings down all the replicas? Whether the response includes identity, DNS, configuration repository, HSM, route, telecom, vendor, or team, redundancy still has a shared point that needs to be addressed."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.5 Active-active, active-passive and multi-region",
    "id": "37-5-active-active-active-passive-and-multi-region"
  },
  {
    "kind": "paragraph",
    "text": "In active-active, two or more locations serve traffic simultaneously. The capacity is already warmed up and the fault can be absorbed more quickly. However, the model requires data distribution, routing, split-brain prevention, configuration consistency and cross-region reconciliation. Gaining RTO may be accompanied by greater complexity and ongoing cost."
  },
  {
    "kind": "paragraph",
    "text": "In active-passive, one primary location responds and another remains ready to take over. Standby can be hot, warm or cold, depending on capacity, data and active components. This model simplifies some consistency decisions, but failover needs to be automated and tested. Passive environments that never receive traffic tend to accumulate drift, expired certificates, and unvalidated dependencies."
  },
  {
    "kind": "paragraph",
    "text": "Multi-region architectures need to define failover granularity. Moving the entire institution at once increases the blast radius; moving operations by domain allows control but requires decoupled dependencies. Returning to the original region, or failback, must be treated as another high-risk change, with its own synchronization and criteria."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/figure-03.svg",
    "alt": "Comparison between active-active and active-passive topologies",
    "caption": "Figure 3 - Active-active reduces activation time; active-passive reduces concurrency, but requires demonstrably ready standby."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The choice must reflect tolerance, integrity, cost and operational capacity.",
    "headers": [
      "Topology",
      "Advantage",
      "Dominant risk"
    ],
    "rows": [
      [
        "Active-active",
        "Capacity in use and fast failover.",
        "Consistency, split-brain and conflict."
      ],
      [
        "Hot standby",
        "Low RTO with concentrated writing.",
        "Passive environment may diverge."
      ],
      [
        "Warm standby",
        "Lower cost than hot standby.",
        "Scale and startup during crisis."
      ],
      [
        "Pilot light",
        "Minimal components and replicated data.",
        "Larger RTO and unheated premises."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.6 Data: replication, quorum and consistency",
    "id": "37-6-data-replication-quorum-and-consistency"
  },
  {
    "kind": "paragraph",
    "text": "Data is typically the hardest part of high availability. Synchronous replication confirms writing only after reaching the required number of replicas, reducing RPO, but increasing latency and network sensitivity. Asynchronous replication allows for faster response, but may lose not-yet-replicated transactions during failure. The decision must be made by data class, not by a single rule for the entire platform."
  },
  {
    "kind": "paragraph",
    "text": "Quorum-based systems require that reads and writes reach a sufficient number of nodes to preserve desired properties. However, quorum does not automatically eliminate conflicts. It is necessary to understand leader election, fencing tokens, clocks, linearizable consistency, eventual consistency and behavior under partitions. Split-brain occurs when isolated sides accept incompatible operations; prevention and reconciliation need to be explicit."
  },
  {
    "kind": "paragraph",
    "text": "Financial ledgers typically require logical immutability, double entry, auditable trail, and reconstructability. Caches and materialized views can eventually be consistent, as long as the authoritative system remains clear. The architecture must differentiate decision data, derived data and presentation data, preventing a late replica from being treated as an official source."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Replication meets availability; Backup also caters for corruption and logical loss.",
    "headers": [
      "Mechanism",
      "Property",
      "Caution"
    ],
    "rows": [
      [
        "Synchronous replication",
        "Lower potential loss.",
        "Latency and availability under partition."
      ],
      [
        "Asynchronous replication",
        "Lower latency and greater distance.",
        "RPO and delayed replica promotion."
      ],
      [
        "Quorum",
        "Coordination between replicas.",
        "Configuration, election and partitions."
      ],
      [
        "Immutable backup",
        "Recovery from corruption or attack.",
        "Restoration needs to be tested."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.7 Transactional integrity, idempotency and reconciliation",
    "id": "37-7-transactional-integrity-idempotency-and-reconciliation"
  },
  {
    "kind": "paragraph",
    "text": "Failures in financial transactions generate ambiguous states: the customer received a timeout, but the payment was accepted; the gateway repeated the request; the service recorded the ledger, but did not publish the event; the message was consumed twice. The architecture needs to resolve ambiguity through unique identifiers, idempotency keys, transactional states, status query, and reconciliation."
  },
  {
    "kind": "paragraph",
    "text": "Idempotence allows you to repeat an operation without producing additional financial effects. The key needs to be linked to the consumer, the operation and the relevant payload. The server must persist result or state before responding so that competing retries do not bypass protection. For messaging, Inbox, deduplication and transactional processing reduce delivery effects at least once."
  },
  {
    "kind": "paragraph",
    "text": "The Transactional Outbox pattern records the business change and event in the same local transaction; a separate publisher sends the event later. This avoids dual writing between bank and broker. Still, consumers must tolerate duplicates. Reconciliation compares authoritative sources, events, settlement, and statements to identify differences that online controls did not resolve."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/figure-04.svg",
    "alt": "Resilient flow of a financial transaction with idempotence and reconciliation",
    "caption": "Figure 4 - A resilient transaction needs to preserve state and allow recovery without duplication."
  },
  {
    "kind": "paragraph",
    "text": "Conceptual flow of idempotent processing POST/payments HTTP/1.1 Idempotency-Key: 98f4d0b2-..."
  },
  {
    "kind": "paragraph",
    "text": "1. Reserve the key and validate the command 2. Record the transaction in the ledger 3. Record event in Outbox 4. Respond with identifier and status 5. Publish event and reconcile asynchronously"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.8 Network, DNS, balancers and API Gateways",
    "id": "37-8-network-dns-balancers-and-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "The path of a banking API goes through DNS, edge protection, balancers, API Gateways, private networks, proxies and backends. Each layer needs health checks that reflect real capacity. A TCP check can declare healthy an instance unable to access the HSM or the bank. Readiness must consider essential dependencies without creating a cascade in which all replicas are removed simultaneously."
  },
  {
    "kind": "paragraph",
    "text": "DNS and GSLB can direct traffic between regions, but TTL, caches, and persistent clients delay convergence. L4 and L7 balancers can maintain existing connections to the previous region. In HTTP/2, gRPC, and WebSocket, long-lasting connections require controlled draining and reconnection. Failover needs to be tested with real customers and not just administrative queries."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways must distribute configuration securely, maintain critical policies during control plane loss, and have low-latency dependencies for rate limiting, authentication, and routing. An architecture can choose fail-open or fail-closed by control, but the decision must consider fraud, unavailability and integrity. Key and policy caching needs expiration, revocation, and observability."
  },
  {
    "kind": "table",
    "caption": "Table 5 - API availability depends on the convergence of the entire network chain.",
    "headers": [
      "Component",
      "Typical failure",
      "Control"
    ],
    "rows": [
      [
        "DNS/GSLB",
        "Old destination remains cached.",
        "TTL, global health and convergence tests."
      ],
      [
        "load balancer",
        "Superficial health check.",
        "Readiness without non-essential dependencies."
      ],
      [
        "API Gateway",
        "Policy store or control plane unavailable.",
        "Valid local configuration and rollback."
      ],
      [
        "Private network",
        "Asymmetric route or single circuit.",
        "Independent paths and flow logs."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.9 Security, HSM, PKI, cloud and third parties",
    "id": "37-9-security-hsm-pki-cloud-and-third-parties"
  },
  {
    "kind": "paragraph",
    "text": "Security is dependent on availability. If the identity authority, HSM, PKI, or secret service fails, healthy applications may stop authenticating and signing operations. These components need redundancy, capacity, safe rotation, and emergency procedures. Contingency certificates should not be improvised during the incident."
  },
  {
    "kind": "paragraph",
    "text": "Hiring cloud and external processing requires knowing regions, responsibility models, support, portability, backup, administrative access and subcontractors. Multi-cloud can reduce vendor lock-in, but increases complexity, operational differences, and error surface. In many cases, a well-tested architecture at one provider with data portability is more resilient than two unevenly maintained clouds."
  },
  {
    "kind": "paragraph",
    "text": "Zero Trust remains applicable during contingency. Break-glass accounts must be heavily secured, audited and tested. The pressure to recover does not justify deactivating timeless controls and compensations. The response needs to record who authorized, what restrictions were relaxed and when the normal configuration will be restored."
  },
  {
    "kind": "paragraph",
    "text": "Hidden Dependency Risk Critical systems may share the same HSM, identity tenant, secret vault, pipeline, or telecommunications provider. These components need to appear in the dependency map and test scenarios, even when they are not part of the visible functional flow."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.10 Capacity, backpressure and controlled degradation",
    "id": "37-10-capacity-backpressure-and-controlled-degradation"
  },
  {
    "kind": "paragraph",
    "text": "Failover increases load on surviving infrastructure. If two regions operate at 70% each, the loss of one cannot be absorbed by the other. Capacity planning needs to consider peaks, maintenance, growth, retries, and dependency degradation. N+1 means that the operation continues after losing a component; in multi-region, the institution must decide whether to require full capacity or degraded service."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure prevents producers from overcharging consumers. Queues, concurrency limits, rate limiting and circuit breakers must keep the system in a recoverable range. Retries need backoff, jitter and budget; otherwise, they multiply traffic during the failure. Load shedding rejects lower priority work to preserve critical operations."
  },
  {
    "kind": "paragraph",
    "text": "Graceful degradation must be planned in advance. The bank can maintain balance inquiry and payments while suspending non-essential reporting, recommendations and enrichment. Degraded responses need to be explicit to avoid decisions based on outdated data. Contingency feature flags must be tested, versioned and protected against improper activation."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Resilience includes controlling demand, not just increasing infrastructure.",
    "headers": [
      "Technique",
      "Objective",
      "Banking example"
    ],
    "rows": [
      [
        "Backpressure",
        "Reduce input when the consumer saturates.",
        "Limit commands while ledger recovers."
      ],
      [
        "Load shedding",
        "Preserve priority traffic.",
        "Suspend reporting before payments."
      ],
      [
        "circuit breaker",
        "Interrupt calls with no chance of success.",
        "Avoid cascading to unavailable provider."
      ],
      [
        "Bulkhead",
        "Isolate pools and resources.",
        "Separate cards, Pix and queries."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.11 Observability and incident response",
    "id": "37-11-observability-and-incident-response"
  },
  {
    "kind": "paragraph",
    "text": "Observability needs to respond to whether the critical operation is available, correct, and within tolerance. Infrastructure metrics are insufficient without business signals: payments accepted, settled, pending, duplicated, reversed, and reconciled. Distributed traces help locate dependency, while audit logs explain decisions and changes."
  },
  {
    "kind": "paragraph",
    "text": "Alerts must be actionable and SLO-driven. A small error rate can be critical in a high-value operation; high latency may be tolerable in reporting. Burn-rate alerts detect accelerated error budget consumption. Synthetic transactions and external probes verify the complete journey, but they need to use controlled data and do not create real financial effects."
  },
  {
    "kind": "paragraph",
    "text": "During the incident, the command needs to combine technology, business, security, communications and suppliers. Runbooks describe actions, preconditions and rollback, but are not a substitute for judgment. After recovery, reconciliation and root cause analysis must occur before declaring definitive closure."
  },
  {
    "kind": "subhead",
    "text": "Operational resilience cycle"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/high-availability-banking-architectures/en/figure-05.svg",
    "alt": "Incident response, recovery, reconciliation and learning cycle",
    "caption": "Figure 5 - Recovering the service is just one step; reconciling and learning complete resilience."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.12 Changes, disaster recovery and chaos engineering",
    "id": "37-12-changes-disaster-recovery-and-chaos-engineering"
  },
  {
    "kind": "paragraph",
    "text": "Changes are one of the main sources of unavailability. Progressive delivery, canary, blue-green, feature flags, automatic validation and rollback reduce risk. Schema changes and data migrations require expand-migrate-contract to enable coexistence. Automation should block promotion when SLOs, reconciliation, or security checks fail."
  },
  {
    "kind": "paragraph",
    "text": "Disaster recovery needs to be exercised with real objectives. Just testing machine creation does not prove that the critical operation works. Testing should include enabling traffic, identity, keys, data, queues, providers, channels, and feedback. Evidence must record times, data loss, manual interventions, deviations and corrective actions."
  },
  {
    "kind": "paragraph",
    "text": "Chaos engineering introduces controlled failures to validate hypotheses. In banks, the scope needs to respect risk and environment: pod loss, network delay, zone unavailability, certificate expiration, backlog or HSM failure can be simulated progressively. The objective is not to cause chaos, but to discover weaknesses before a real event."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Tests need to validate business and technology hypotheses.",
    "headers": [
      "Test",
      "Hypothesis",
      "Expected evidence"
    ],
    "rows": [
      [
        "Node loss",
        "Orchestrator restores capacity without relevant impact.",
        "Recovery time and observed errors."
      ],
      [
        "Zone fault",
        "Traffic migrates and data remains consistent.",
        "SLO, quorum and backlog."
      ],
      [
        "Regional promotion",
        "Standby takes over within the RTO/RPO.",
        "Complete journey and reconciliation."
      ],
      [
        "Backup Restore",
        "Logical corruption can be recovered.",
        "Time, integrity and chain of custody."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.13 Hybrid architectures, mainframe, Pix and instant payments",
    "id": "37-13-hybrid-architectures-mainframe-pix-and-instant-payments"
  },
  {
    "kind": "paragraph",
    "text": "Banks often combine mainframes, middleware, distributed banking, cloud and gateways. The mainframe can be the authoritative ledger, while pipelines and APIs operate on modern platforms. High availability depends on the coupling between these worlds: queues, transactions, adapters, batch windows, host capacity and connection limits need to be observed together."
  },
  {
    "kind": "paragraph",
    "text": "Instant payments increase the requirement for continuous operation and low latency. The institution needs to treat connectivity, certificates, signature, fraud prevention, limits, messaging, reconciliation and contingency as a chain. A customer response should distinguish outright rejection, pending processing and unknown status, allowing for later consultation without repeating the financial effect."
  },
  {
    "kind": "paragraph",
    "text": "In hybrid architectures, migration to the cloud must occur across capabilities and domains, not just by copying machines. Strangler, events, anti-corruption APIs, and controlled replication enable gradual transition. Coexistence needs clear data ownership and legacy disconnection criteria to avoid two authoritative systems."
  },
  {
    "kind": "paragraph",
    "text": "Pix Case A communication failure after sending an order should not be automatically treated as a business failure. The system needs to query the status, use unique identifiers, and reconcile before allowing another attempt that could duplicate the payment."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "37.14 Troubleshooting and case studies",
    "id": "37-14-troubleshooting-and-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "High availability troubleshooting starts with the timeline. Determine what change or failure occurred, what region or zone was affected, when the health check reacted, when routing converged, and what data state was promoted. Logs without synchronized clocks and correlation IDs make reconstruction difficult."
  },
  {
    "kind": "paragraph",
    "text": "For intermittent failovers, investigate flapping health checks, TTLs, connection pools, sessions, leader elections, and dependencies with insufficient capacity. In data divergence, discontinue conflicting new writings, preserve evidence, and establish the authoritative source before reconciling. Regaining availability at the expense of integrity can compound the loss."
  },
  {
    "kind": "paragraph",
    "text": "Case Study: A primary region loses connectivity to the database. The balancer maintains instances as healthy because the technical endpoint responds. Clients receive errors for several minutes. The fix involves operation-oriented readiness, circuit breaker, gradual removal of traffic, replica promotion, lag checking and subsequent reconciliation."
  },
  {
    "kind": "paragraph",
    "text": "Case study: after a deployment, the two active-active clusters start to reject tokens due to incorrect issuer configuration. Redundancy did not protect against common configuration failure. The answer requires independent rollback, staged rollout, synthetic validation, and pipeline separation between deployment waves."
  },
  {
    "kind": "table",
    "caption": "Table 8 - The diagnosis must preserve integrity and reconstruct the sequence of events.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Priority evidence"
    ],
    "rows": [
      [
        "Slow failover",
        "DNS, persistent connections or cold standby.",
        "Routing timeline and capacity."
      ],
      [
        "Duplicate payments",
        "Retry without idempotence or dedupe.",
        "Keys, ledger and command logs."
      ],
      [
        "Divergent regions",
        "Delayed or split-brain replication.",
        "LSN/offset, quorum and election."
      ],
      [
        "Simultaneous failure",
        "Dependency or shared change.",
        "Blast radius map and configuration."
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
    "text": "High-availability banking architectures need to start from critical operations and their tolerances to disruption. Technical availability alone does not guarantee resilience: integrity, reconciliation, security, people, suppliers and communication are part of the result."
  },
  {
    "kind": "paragraph",
    "text": "RTO, RPO, SLOs, and tolerances drive topology, replication, capacity, and testing. Active-active and active-passive have different trade-offs; Neither option eliminates the need to understand data, common dependencies, and behavior under partition."
  },
  {
    "kind": "paragraph",
    "text": "Financial transactions require idempotence, authoritative ledger, Outbox, status query and reconciliation. Networking, DNS, gateways, HSMs, identity, and cloud are also critical dependencies. Operational resilience is proven through exercises, evidence and continuous learning."
  },
  {
    "kind": "paragraph",
    "text": "Next step of the course Chapter 38 will delve deeper into troubleshooting APIs and Gateways, consolidating a methodology for locating flaws in DNS, TCP, TLS, authentication, policies, backends, data and distributed platforms."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Architecture checklist",
    "id": "architecture-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Critical operations, owners, dependencies and tolerances are documented.",
      "SLIs and SLOs measure actual success, latency, integrity, and freshness per operation.",
      "RTO and RPO have compatible technical mechanisms and tests.",
      "Fault domains and shared dependencies were identified.",
      "Active-active or active-passive topology has promotion and failback criteria.",
      "Replication, quorum, fencing and split-brain prevention are defined.",
      "Transactions use idempotence, ledger, Outbox and reconciliation.",
      "DNS, balancers, gateways, persistent connections, and clients were tested on failover.",
      "HSM, PKI, identity, secrets, cloud and third parties participate in the exercises.",
      "Survivable capability supports failure with margin and explicit priorities.",
      "Backpressure, retries, circuit breakers and load shedding prevent cascades.",
      "DR, restore, chaos tests and runbooks produce evidence and corrective actions."
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
      "Differentiate high availability, disaster recovery and operational resilience.",
      "Define RTO and RPO for balance consultation, Pix and monthly report, justifying differences.",
      "Design an active-active architecture and identify consistency risks.",
      "Explain why replication does not replace backup.",
      "Describe how to prevent duplicate payments after timeout.",
      "Propose health checks for gateway, service and ledger.",
      "List common dependencies that can bring down two regions simultaneously.",
      "Define a graceful degradation strategy for a digital bank.",
      "Create a DR test that validates full journey and reconciliation.",
      "Analyze a scenario in which the service returns quickly, but the data is divergent."
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
    "caption": "Table 9 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Active-active",
        "Topology in which multiple locations serve traffic simultaneously."
      ],
      [
        "Active-passive",
        "Topology with primary location and another prepared to take over."
      ],
      [
        "BIA",
        "Business impact analysis used to prioritize continuity and recovery."
      ],
      [
        "blast radius",
        "Scope affected by a failure, change, or incident."
      ],
      [
        "Disaster recovery",
        "Ability to restore technology after severe event."
      ],
      [
        "Fencing token",
        "Mechanism that prevents an old node from continuing writing after losing leadership."
      ],
      [
        "Failback",
        "Controlled return to original location after failover."
      ],
      [
        "Idempotence",
        "Property that allows you to repeat an operation without duplicating its effect."
      ],
      [
        "Load shedding",
        "Deliberate rejection of work to preserve priority operations."
      ],
      [
        "RPO",
        "Maximum acceptable data loss measured in time."
      ],
      [
        "RTO",
        "Maximum expected period to reestablish the operation."
      ],
      [
        "Split-brain",
        "Condition in which isolated partitions accept conflicting decisions."
      ],
      [
        "Disruption tolerance",
        "Maximum accepted impact for a critical operation."
      ],
      [
        "Warm standby",
        "Partially active secondary environment, scaled up during failover."
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
      "Basel Committee on Banking Supervision. Principles for Operational Resilience. 2021.",
      "Basel Committee on Banking Supervision. Revisions to the Principles for the Sound Management of Operational Risk. 2021.",
      "Central Bank of Brazil. CMN Resolution No. 4,557, of February 23, 2017 - risk and capital management structure.",
      "Central Bank of Brazil. CMN Resolution No. 4,893, of February 26, 2021, with subsequent amendments - cybersecurity and contracting of processing, storage and cloud.",
      "Central Bank of Brazil. CMN Resolution No. 5,274, of December 18, 2025 - changes to cybersecurity requirements and technology services.",
      "Central Bank of Brazil. Pix regulations and current technical and safety manuals.",
      "NIST. SP 800-34 Rev. 1 - Contingency Planning Guide for Federal Information Systems.",
      "NIST. Cybersecurity Framework 2.0.",
      "Google. Site Reliability Engineering - Availability, SLOs and error budgets.",
      "OpenTelemetry. Specifications and Semantic Conventions for distributed observability."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Update Note Banking regulations, payment arrangement manuals and provider requirements evolve. Before applying controls or declaring compliance, validate the current Central Bank text, critical service manuals and the actual capabilities of the deployed version."
  }
];
