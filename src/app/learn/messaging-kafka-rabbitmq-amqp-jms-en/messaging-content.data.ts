import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const MESSAGING_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Messaging: decoupling time, capacity and availability"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/overview.svg",
    "alt": "Producer publishing messages in broker for independent consumers",
    "caption": "Opening figure - Brokers decouple producers and consumers, but reliability remains an end-to-end responsibility."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Reliability depends on the protocol, the broker and the correct behavior of producers and consumers."
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
    "text": "Messaging is one of the foundations of distributed architectures. Instead of requiring two systems to be available at the same time and complete an interaction in the same interval, a producer publishes a message to an intermediary and one or more consumers process that message when they have the capacity. This temporal decoupling reduces direct dependencies, absorbs peaks and allows the creation of asynchronous business flows."
  },
  {
    "kind": "paragraph",
    "text": "The word messaging, however, covers different models. A traditional queue distributes units of work to consumers and tends to remove or commit messages after processing. A distributed log keeps records over a period of time and allows independent consumers to advance their own offsets or replay. A publish/subscribe system delivers logical copies to various interested groups. Each model changes ordering, retention, scalability, and recovery."
  },
  {
    "kind": "paragraph",
    "text": "Kafka and RabbitMQ are often compared as competitors, but they were born with different emphases. Kafka organizes events into partitioned, persistent topics, optimized for retention, replay, and high throughput. RabbitMQ is a messaging broker with flexible routing through exchanges, queues, acknowledgments and different queue types. AMQP can mean either the 0-9-1 model associated with RabbitMQ or the standardized AMQP 1.0 protocol. JMS, today Jakarta Messaging, is a Java API and not a single broker or protocol."
  },
  {
    "kind": "paragraph",
    "text": "This chapter builds a mental model that starts with messaging, confirmation, ordering, and idempotence; delves deeper into Kafka and RabbitMQ; differentiates AMQP 0-9-1 from AMQP 1.0; explains the JMS abstraction; and ends with integration, security, observability, capacity and troubleshooting standards. The goal is to enable informed technical decisions, not just teach commands for a product."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each flow, write who produces it, where the message is stored, how the broker confirms receipt, when the consumer confirms processing, what the ordering unit is and how duplicates will be handled. Without these answers, the promise of delivery remains ambiguous."
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
      "Explain why messaging decouples time, capacity and availability between systems.",
      "Distinguish queue, topic, distributed log, publish/subscribe and stream.",
      "Understand acknowledgments, confirmations, offsets and delivery semantics.",
      "Relate ordering, partitions, consumer groups, retries and idempotence.",
      "Describe the Kafka architecture, including topics, partitions, replicas, leaders, and KRaft.",
      "Describe the RabbitMQ architecture, including exchanges, queues, bindings, vhosts and channels.",
      "Differentiate between AMQP 0-9-1 and AMQP 1.0.",
      "Explain Jakarta Messaging/JMS as a programming API and provider abstraction.",
      "Design DLQ, retry, Outbox, Inbox, request-reply and competing consumers.",
      "Apply security, observability, capacity planning and troubleshooting."
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
      "31.1 Fundamentals of messaging and decoupling",
      "31.2 Queue, publish/subscribe, stream and distributed log",
      "31.3 Messages, envelopes, headers and contracts",
      "31.4 Acknowledgments, confirmations and delivery semantics",
      "31.5 Ordering, partitions, idempotence and duplicates",
      "31.6 Kafka: architecture, producers and consumers",
      "31.7 Retention, compression, replay, Connect and Streams",
      "31.8 RabbitMQ: exchanges, queues, bindings and routing",
      "31.9 Reliability, quorum queues, streams, DLX and prefetch",
      "31.10 AMQP 0-9-1 and AMQP 1.0",
      "31.11 Jakarta Messaging/JMS",
      "31.12 Integration, security, observability and troubleshooting standards",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.1 Fundamentals of messaging and decoupling",
    "id": "31-1-fundamentals-of-messaging-and-decoupling"
  },
  {
    "kind": "paragraph",
    "text": "In a synchronous call, the consumer depends on the provider's availability and response time. In an asynchronous flow, the producer transfers immediate responsibility to a broker or log, receives an appropriate acknowledgment, and continues its processing. The consumer can work later, respecting their own capacity. This difference changes the failure architecture: temporary unavailability of the consumer does not need to prevent publication, as long as the broker has sufficient storage and capacity."
  },
  {
    "kind": "paragraph",
    "text": "Decoupling is not absolute. Producers and consumers continue to share contracts, semantics, expected deadlines and business rules. A message can be technically delivered and still be semantically invalid. A consumer may commit too early and lose work, or commit too late and cause duplicates. Therefore, messaging needs a contract, ownership, observability and recovery strategy."
  },
  {
    "kind": "paragraph",
    "text": "The decision between synchronous and asynchronous must observe the meaning of the result. Queries that need to respond immediately to the user typically remain synchronous. Long processes, integration with multiple systems, absorption of spikes and propagation of events benefit from asynchronicity. Many flows combine both: an API accepts the command, persists state, and publishes an event; the customer monitors the conclusion via consultation, callback or notification channel."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.2 Queue, publish/subscribe, stream and distributed log",
    "id": "31-2-queue-publish-subscribe-stream-and-distributed-log"
  },
  {
    "kind": "paragraph",
    "text": "Queue is a structure in which messages wait for consumers. In the competing consumers pattern, several instances share the queue and each message is processed by only one of them. Publish/subscribe creates multiple subscriptions or logical queues so that different groups receive the same event. The term topic can represent a routing entity, a publishing category, or a partitioned log, depending on the technology."
  },
  {
    "kind": "paragraph",
    "text": "Kafka treats a topic as a log divided into partitions. Records remain as per retention or compression policies, and consumers record offsets. This allows for replay, multiple independent groups and reconstruction of projections. RabbitMQ uses exchanges to route messages to queues or streams; Consumers typically receive from queues and confirm processing. RabbitMQ streams add retention and offset reading, approximating log cases."
  },
  {
    "kind": "paragraph",
    "text": "Choosing the correct model is more important than choosing the product by brand. Unique work and targeted commands go well with queues. Domain events aimed at multiple consumers call for fan-out or independent groups. Reprocessable history, analytics and event streaming favor logs. A system can use more than one model at the same time."
  },
  {
    "kind": "subhead",
    "text": "Traditional queue and distributed log preserve different states"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-01-queue-log.svg",
    "alt": "Traditional queue compared to distributed log with offsets",
    "caption": "Figure 1 - Queues and logs differ mainly in the message life cycle and the position held by the consumer."
  },
  {
    "kind": "table",
    "caption": "Table 1 - The topic name does not have exactly the same semantics on all platforms.",
    "headers": [
      "Model",
      "Consumption unit",
      "Typical retention",
      "Recurring use"
    ],
    "rows": [
      [
        "Queue",
        "A message to a consumer in the group.",
        "Until ack, expiration or discard.",
        "Commands, tasks and operational integration."
      ],
      [
        "pub/sub",
        "One logical copy per subscription or group.",
        "Depending on each destination.",
        "Events for multiple domains."
      ],
      [
        "Partitioned log",
        "Offset by partition and group.",
        "By time, size or compression.",
        "Replay, analytics and event streaming."
      ],
      [
        "Persistent stream",
        "Sequential reading with offset.",
        "Retention configured.",
        "Telemetry, events and durable fan-out."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.3 Messages, envelopes, headers and contracts",
    "id": "31-3-messages-envelopes-headers-and-contracts"
  },
  {
    "kind": "paragraph",
    "text": "A message has payload and metadata. The payload carries the business data; headers or properties carry information such as type, version, correlation ID, content type, timestamp, trace context, priority, expiration and partitioning key. Mixing transport metadata with business rules makes migration between brokers difficult and can create excessive dependence on a specific library."
  },
  {
    "kind": "paragraph",
    "text": "Event contracts need to define semantics, not just JSON. The event name should indicate something that occurred, such as Authorized Payment, and not an ambiguous statement. The schema needs to inform mandatory fields, nullability, types, units, precision, identifiers and compatibility. Avro, JSON Schema, and Protobuf are common options, but governance depends on evolution, catalog, and testing rules."
  },
  {
    "kind": "paragraph",
    "text": "Standardized envelopes facilitate correlation and observability. However, replicating the entire entity in each event can expose unnecessary data and increase coupling. Publishing only one identifier may force consumers to make synchronous calls. The decision must balance autonomy, privacy, size, consistency and frequency of change."
  },
  {
    "kind": "subhead",
    "text": "Event envelope conceptual example"
  },
  {
    "kind": "code",
    "text": "{\n  \"specversion\": \"1.0\",\n  \"type\": \"payment.authorized.v1\",\n  \"id\": \"evt-7f8d2a\",\n  \"source\": \"payment-service\",\n  \"time\": \"2026-07-16T11:30:00Z\",\n  \"subject\": \"pagamento/93842\",\n  \"data\": { \"pagamentoId\": \"93842\", \"valor\": 149.90 }\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.4 Acknowledgments, confirmations and delivery semantics",
    "id": "31-4-acknowledgments-confirmations-and-delivery-semantics"
  },
  {
    "kind": "paragraph",
    "text": "Reliability needs to be analyzed piece by piece. The producer sends it to the broker and needs to know if the message was accepted with the required level of durability. Then, the broker delivers it to the consumer and needs to know whether processing has finished. Publisher confirmations and consumer acknowledgments resolve these two separate relationships. A confirmation from the broker does not prove that the consumer completed the business rule."
  },
  {
    "kind": "paragraph",
    "text": "At-most-once accepts the possibility of loss to avoid replay: the message can be considered complete before processing. At-least-once privileges not to lose, but accepts duplicates when there is a failure after the business effect and before acknowledgment. Exactly-once is a contextual property, typically limited to specific boundaries. It doesn't mean that any external effect, bank or remote API will magically run once."
  },
  {
    "kind": "paragraph",
    "text": "In real systems, at-least-once with idempotence is the most common basis. The consumer registers a processed identifier or uses a naturally idempotent operation, executes the effect, and commits later. If the message reappears, the same result is preserved. When the effect and deduplication record do not share transaction, there are still failure windows that need to be handled by the design."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-02-confirms-acks.svg",
    "alt": "Confirmations between producer, broker and consumer",
    "caption": "Figure 2 - Publication confirmation and processing confirmation are orthogonal mechanisms."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Semantics must be defined end-to-end, not just by the name of the broker resource.",
    "headers": [
      "Semantics",
      "What privileges",
      "Residual risk"
    ],
    "rows": [
      [
        "At-most-once",
        "Avoid repetition.",
        "Message may be lost."
      ],
      [
        "At-least-once",
        "Avoid loss.",
        "Consumer must tolerate duplicates."
      ],
      [
        "Exactly-once contextual",
        "A controlled transaction or pipeline.",
        "External effects may be outside the warranty."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.5 Ordering, partitions, idempotence and duplicates",
    "id": "31-5-ordering-partitions-idempotence-and-duplicates"
  },
  {
    "kind": "paragraph",
    "text": "Global ordering reduces parallelism and is expensive. Most platforms preserve order only within a queue, partition, channel, or session, and even that order can be changed by requeue, priority, multiple producers, or concurrent processing. The architecture must define which entity needs order: account, order, customer or aggregate. This entity usually guides the partitioning key or destination of the message."
  },
  {
    "kind": "paragraph",
    "text": "A stable key concentrates related events on the same partition, but can produce hot partitions if the distribution is uneven. Random keys improve balance, but lose ordering by entity. The consumer also needs to process in a compatible way: multiple threads on the same partition may complete out of order if there is no coordination."
  },
  {
    "kind": "paragraph",
    "text": "Duplicates arise in producer retries, redelivery after failure, failover, and intentional reprocessing. Idempotence can use business key, aggregate version, Inbox table, compare-and-set, upsert or sequence control. The solution must define how long deduplication is maintained and what the behavior is when an old message reappears."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "Always ask: order between which messages, within which unit, observed by which consumer and during which window? Just saying that the broker preserves order is insufficient."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.6 Kafka: distributed architecture",
    "id": "31-6-kafka-distributed-architecture"
  },
  {
    "kind": "paragraph",
    "text": "Kafka organizes data into partitioned topics. Each partition is an ordered log of records identified by increasing offsets. A partition has a leader replica that handles reads and writes and follower replicas that monitor the log. Replication increases fault tolerance, but perceived durability depends on producer configurations, number of replicas, and set of synchronized replicas."
  },
  {
    "kind": "paragraph",
    "text": "Brokers store partitions and serve clients. The cluster metadata is coordinated by KRaft mode, based on a quorum of controllers. The separation between brokers and controllers can be physical or logical, depending on the size and topology. Capacity planning considers sequential disk, page cache, network, number of partitions, replication, retention and access pattern."
  },
  {
    "kind": "paragraph",
    "text": "Topics are not exclusive queues. Multiple consumer groups can read the same topic independently. Within a group, each active partition is assigned to only one consumer at a time, which limits useful parallelism to the number of partitions. Adding consumers beyond this number does not increase throughput for that group."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-03-kafka.svg",
    "alt": "Topics, partitions, replicas and consumer groups in Kafka",
    "caption": "Figure 3 - Kafka combines partitions, replication and consumer groups to scale storage and consumption."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.7 Producers, consumers, offsets and transactions in Kafka",
    "id": "31-7-producers-consumers-offsets-and-transactions-in-kafka"
  },
  {
    "kind": "paragraph",
    "text": "The producer chooses topic, key, headers and payload. The key can determine the partition, and batching groups records to improve efficiency. The acks setting controls when publishing is considered complete. Idempotent producer avoids duplication caused by retries within the guarantees supported by the protocol. This does not automatically make a consumer who writes to another bank idempotent."
  },
  {
    "kind": "paragraph",
    "text": "Consumers are part of groups, receive partitions and control offsets. Early commit may lose processing; late commit may cause redelivery. Rebalances redistribute partitions when members join, leave, or change subscription. Cooperative strategies and correct revocation handling reduce pauses, but the consumer needs to finish or stop work in a safe manner."
  },
  {
    "kind": "paragraph",
    "text": "Kafka transactions can group publish and commit offsets for consume-transform-produce pipelines within the Kafka ecosystem. With appropriate isolation, consumers avoid reading aborted records. The guarantee does not automatically extend to external banks, emails or HTTP calls. For these purposes, Outbox, Inbox and idempotence remain relevant."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Kafka's reliability emerges from the combination of several decisions.",
    "headers": [
      "Element",
      "Technical decision",
      "Impact"
    ],
    "rows": [
      [
        "Key",
        "Entity used in partitioning.",
        "Ordering and load distribution."
      ],
      [
        "acks",
        "Cluster commit level.",
        "Durability and latency."
      ],
      [
        "offset commit",
        "Moment when the group advances.",
        "Loss or duplication after failure."
      ],
      [
        "Rebalance",
        "Partition redistribution.",
        "Pauses, revocation and parallelism."
      ],
      [
        "Transaction",
        "Atomic posts and offsets in Kafka.",
        "Exactly-once within controlled borders."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.8 Retention, compression, replay, Kafka Connect and Kafka Streams",
    "id": "31-8-retention-compression-replay-kafka-connect-and-kafka-streams"
  },
  {
    "kind": "paragraph",
    "text": "Retention by time or size removes old segments regardless of whether all consumers have read them. Scaling needs to ensure that late consumers do not exceed the retention window. Log compression eventually preserves the most recent record per key and is useful for changelogs and state reconstruction. Tombstones represent removals in the compressed model."
  },
  {
    "kind": "paragraph",
    "text": "Replay is a powerful and dangerous feature. Repositioning offsets allows you to reconstruct projections and correct consumers, but it can also repeat external effects. Before reprocessing, the team must separate purely deterministic consumers from those who send emails, debit amounts or call third parties. Replay environments, separate output threads, and dry-runs reduce risk."
  },
  {
    "kind": "paragraph",
    "text": "Kafka Connect standardizes integration with sources and destinations using connectors, tasks and offsets. Kafka Streams offers a library for transformations, joins, windows and state stores. These components do not eliminate schema, semantic, partition, and error handling decisions; they provide runtime and abstractions to implement them."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.9 RabbitMQ: architecture, exchanges, queues and bindings",
    "id": "31-9-rabbitmq-architecture-exchanges-queues-and-bindings"
  },
  {
    "kind": "paragraph",
    "text": "RabbitMQ receives TCP connections and multiplexes logical channels. Virtual hosts isolate namespaces, permissions, and topologies. In AMQP 0-9-1, publishers publish on exchanges. The exchange analyzes type, routing key, headers and bindings to forward the message to one or more queues, streams or other exchanges. An unrouted message can be discarded or returned to the publisher when mandatory mode is used."
  },
  {
    "kind": "paragraph",
    "text": "Direct exchanges compare routing keys exactly; topic use hierarchical patterns; fanout distribute to all bindings; headers use message properties. Queues store messages for consumers. Queue durability, message persistence and replication are different concepts: they all need to be consistent with the failure survivability requirement."
  },
  {
    "kind": "paragraph",
    "text": "Connections are relatively resource heavy; channels are used to multiplex operations. Opening a channel via message is anti-pattern. Long-running publishers and consumers need to handle reconnection, topology recovery, confirms, acknowledgements, and flow. The broker does not replace application logic for deduplication or reconciliation."
  },
  {
    "kind": "subhead",
    "text": "RabbitMQ AMQP 0-9-1: publishing to exchange and routing to queues"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-04-rabbitmq.svg",
    "alt": "RabbitMQ Exchange routing posts to queues",
    "caption": "Figure 4 - Exchanges decouple publishing and queues through routing rules."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The exchange decides routing; the queue decides storage and delivery to consumers.",
    "headers": [
      "Exchange",
      "Rule",
      "Common usage"
    ],
    "rows": [
      [
        "Direct",
        "Exact key routing.",
        "Commands by category or destination."
      ],
      [
        "Topic",
        "Patterns with words and wildcards.",
        "Hierarchical events and selective subscriptions."
      ],
      [
        "Fanout",
        "Ignore routing key and distribute it to everyone.",
        "Broadcast to multiple queues."
      ],
      [
        "Headers",
        "Combines message headers.",
        "Routing by multiple attributes."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.10 RabbitMQ: acknowledgements, prefetch, quorum queues, streams and DLX",
    "id": "31-10-rabbitmq-acknowledgements-prefetch-quorum-queues-streams-and-dlx"
  },
  {
    "kind": "paragraph",
    "text": "Consumer acknowledgments can be automatic or manual. In manual mode, the consumer confirms after completing the job, rejects without requeue when the message is invalid, or requests requeue when the failure appears temporary. Indiscriminate requeue can create redelivery loop. Prefetch limits the number of unconfirmed messages per consumer and works as a backpressure and load distribution mechanism."
  },
  {
    "kind": "paragraph",
    "text": "Publisher confirmations inform that the broker has assumed responsibility for the publication. They are independent of consumer acknowledgments. For high throughput, applications typically use asynchronous confirms and correlate sequences, rather than blocking after each message. The use of channel transactions is possible, but they tend to cost more and do not replace business transactions."
  },
  {
    "kind": "paragraph",
    "text": "Quorum queues are replicated queues aimed at data security and consensus. Classic queues remain useful for specific cases, but are not the choice for high availability. Streams and super streams offer retention, replay, and partitioning. Dead Letter Exchanges receive expired, rejected, or overage messages as per policies. Poison messages need attempt counting, quarantine and operational handling, not just infinite requeue."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Reliability features need to be combined with correct application behavior.",
    "headers": [
      "Feature",
      "Solve",
      "Caution"
    ],
    "rows": [
      [
        "Prefetch",
        "Number of in-flight deliveries.",
        "High value increases memory and work lost on failure."
      ],
      [
        "Publisher confirm",
        "Acceptance of publication by the broker.",
        "Does not confirm consumer processing."
      ],
      [
        "ack manual",
        "Consumer conclusion.",
        "Ack too soon may lose effect."
      ],
      [
        "Quorum queue",
        "Data replication and security.",
        "Higher cost of disk, network and quorum."
      ],
      [
        "DLX/DLQ",
        "Separation of unprocessable messages.",
        "It needs ownership, alerting and reprocessing."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.11 AMQP 0-9-1 and AMQP 1.0",
    "id": "31-11-amqp-0-9-1-and-amqp-1-0"
  },
  {
    "kind": "paragraph",
    "text": "AMQP 0-9-1 is the protocol model widely associated with RabbitMQ. It defines exchanges, queues, bindings, channels and methods such as basic.publish, basic.consume and acknowledgements. AMQP 1.0 is a different OASIS standard: it defines binary wire protocol, type system, messages, connections, sessions, links, flow control, settlement and outcomes. Sharing the AMQP name does not make the versions directly interoperable."
  },
  {
    "kind": "paragraph",
    "text": "In AMQP 1.0, a link is unidirectional between source and target and has sender and receiver endpoints. Deliveries may remain unsettled until the parties agree on the outcome. Link credits control flow. The specification does not require a broker topology with exchanges and queues equal to those of RabbitMQ 0-9-1; products map protocol concepts to their own entities."
  },
  {
    "kind": "paragraph",
    "text": "Architects need to record version and implementation explicitly. Saying we just use AMQP is insufficient. An AMQP 1.0 library does not automatically connect to an endpoint that only accepts 0-9-1. SASL authentication, addressing, settlement, transactions and product extensions also vary."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-05-amqp.svg",
    "alt": "AMQP 1.0 Connection, Session, and Link Layers",
    "caption": "Figure 5 - AMQP 1.0 defines a different protocol stack than the AMQP 0-9-1 exchange/queue model."
  },
  {
    "kind": "table",
    "caption": "Table 6 - The two families need to be documented separately.",
    "headers": [
      "Appearance",
      "AMQP 0-9-1",
      "AMQP 1.0"
    ],
    "rows": [
      [
        "Emphasis",
        "Broker model with exchanges and queues.",
        "Wire protocol and layered messaging."
      ],
      [
        "Logical unit",
        "Connection and channel.",
        "Connection, session and link."
      ],
      [
        "Routing",
        "Exchange, routing key and bindings.",
        "Source/target and product semantics."
      ],
      [
        "Confirmation",
        "Publisher confirmations and consumer acknowledgments.",
        "Settlement, delivery state and outcomes."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.12 Jakarta Messaging/JMS",
    "id": "31-12-jakarta-messaging-jms"
  },
  {
    "kind": "paragraph",
    "text": "JMS was the standardized Java API for corporate messaging and is now part of Jakarta Messaging. It offers interfaces to create connections, produce, consume and read messages through a provider. The simplified API uses JMSContext, while the classic model separates Connection, Session, MessageProducer and MessageConsumer. Destination represents Queue or Topic."
  },
  {
    "kind": "paragraph",
    "text": "JMS defines point-to-point and publish/subscribe models, durable subscriptions, selectors, delivery mode, priority, expiration, acknowledgment modes and transacted sessions. It also integrates with XA-distributed transactions when the provider and environment support it. XA may be necessary in legacies, but adds coupling and operational cost; Patterns like Outbox are often preferred in microservices."
  },
  {
    "kind": "paragraph",
    "text": "JMS does not define a single network protocol nor does it guarantee that all providers implement identical topologies. A provider can use proprietary protocol, AMQP or other transport. Migrating from a provider requires validating destination semantics, redelivery, selectors, transactions, temporary destinations, durable subscriptions and administration. Java code can compile and still exhibit different operational behavior."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/messaging-kafka-rabbitmq-amqp-jms/en/figure-06-jms.svg",
    "alt": "Jakarta Messaging connecting Java application to provider and destinations",
    "caption": "Figure 6 - Jakarta Messaging standardizes the application's API, while the provider implements connection with the messaging system."
  },
  {
    "kind": "code",
    "text": "try (JMSContext context = connectionFactory.createContext()) {\n    Queue fila = context.createQueue(\"payments.queue\");\n    JMSProducer producer = context.createProducer();\n    producer.setProperty(\"eventType\", \"PagamentoCriado\");\n    producer.send(fila, jsonPayload);\n}\n// The consumer must handle redelivery and idempotency."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.13 Messaging integration standards",
    "id": "31-13-messaging-integration-standards"
  },
  {
    "kind": "paragraph",
    "text": "Competing Consumers distributes work across instances. Publish/Subscribe delivers the same event to different groups. Request-Reply uses correlation ID and reply destination, but can recreate synchronous coupling over the broker. Dead Letter Channel isolates unprocessable messages. Delayed retry must differentiate transient failure from permanent error and limit retries."
  },
  {
    "kind": "paragraph",
    "text": "Transactional Outbox records business change and event in the same local transaction; a relay publishes later. Inbox logs processed messages for deduplication. Saga coordinates local transactions and clearings. Event-Carried State Transfer carries enough data in the event to reduce synchronous calls. Claim Check stores large payload outside the broker and transports only secure reference."
  },
  {
    "kind": "paragraph",
    "text": "Each pattern has a cost. Retry queues increase topology and latency. DLQ without an operational process becomes a silent cemetery. Request-Reply can saturate temporary queues. Event-Carried State Transfer replicates data and requires privacy governance. The design must include SLO, monitoring, ownership and reprocessing procedure."
  },
  {
    "kind": "table",
    "caption": "Table 7 - Standards are only complete when they include operation and recovery.",
    "headers": [
      "Standard",
      "Objective",
      "Risk"
    ],
    "rows": [
      [
        "Competing Consumers",
        "Scale task processing.",
        "Uneven ordering and loading."
      ],
      [
        "Pub/Sub",
        "Distribute events to multiple domains.",
        "Forgotten contracts and consumers."
      ],
      [
        "Retry + DLQ",
        "Separate transient and permanent failures.",
        "Loops, accumulation and unsafe reprocessing."
      ],
      [
        "Outbox + Inbox",
        "Coordinate banking and publishing; deduplicate.",
        "Latency and operational storage."
      ],
      [
        "Request-Reply",
        "Get correlated asynchronous response.",
        "Recreate temporal dependency."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.14 Security, schema governance and privacy",
    "id": "31-14-security-schema-governance-and-privacy"
  },
  {
    "kind": "paragraph",
    "text": "Security starts with transportation and identity. Kafka can use TLS, mTLS, SASL, and ACLs; RabbitMQ combines TLS, authentication mechanisms, users, vhosts and permissions; JMS providers have their own controls. Credentials need rotation, least privilege, and separation by application. Relying on an internal network does not replace authentication between workloads."
  },
  {
    "kind": "paragraph",
    "text": "Authorization must limit topics, groups, exchanges, queues, and administrative operations. A compromised producer should not publish to any domain, and a consumer should not read sensitive events unnecessarily. In multi-tenant brokers, quotas, namespace isolation and noisy neighbor protection are part of security."
  },
  {
    "kind": "paragraph",
    "text": "Schemas need catalog, owner, compatibility and data classification. Events that persist for days or months increase the impact of the leak and the right to retention. Encryption at rest protects media, but does not prevent authorized consumers from viewing payloads. Tokenization, minimization, and topic separation may be necessary for LGPD and corporate policies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.15 High availability, capacity and backpressure",
    "id": "31-15-high-availability-capacity-and-backpressure"
  },
  {
    "kind": "paragraph",
    "text": "Kafka distributes partitions and replicas across brokers. RabbitMQ uses quorum queues, streams and other mechanisms depending on the data type. High availability is not just about having three nodes: you need to distribute failures, test leader election, check replication, size disk, and ensure that clients discover new leaders or reconnect correctly."
  },
  {
    "kind": "paragraph",
    "text": "Capacity is determined by input rate, output rate, message size, retention, replication, and maximum backlog. A flow that receives 20 MB/s, replicates three times and retains seven days requires much more than the sum of the business payload. Compression, indexes, page cache, peaks, rebalance and operating margin are included in the calculation."
  },
  {
    "kind": "paragraph",
    "text": "Backpressure prevents producers or brokers from overcharging consumers. Kafka expresses lag pressure, polling limits, and consumer capacity. RabbitMQ uses prefetch, flow control and queue limits. The application needs to consciously reduce consumption, escalate or reject work. Accumulating backlog without SLO only shifts unavailability to the future."
  },
  {
    "kind": "subhead",
    "text": "Capacity planning"
  },
  {
    "kind": "paragraph",
    "text": "Size to the worst acceptable backlog, not just the average. Include retention, replication, overhead, reprocessing, maintenance, and growth. The broker needs to survive the period in which consumers are degraded."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.16 Observability and troubleshooting",
    "id": "31-16-observability-and-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Messaging observability needs to connect producer, broker and consumer. Essential metrics include publish rate, consumption rate, bytes, latency, errors, pending commits, uncommitted messages, lag, backlog, oldest message age, redeliveries, DLQ, partitions without synchronized replica, and disk utilization. A single metric rarely explains the problem."
  },
  {
    "kind": "paragraph",
    "text": "In Kafka, high lag can mean slow consumer, hot partition, frequent rebalance, processing error, or lack of capacity. In RabbitMQ, ready messages, unacked messages and acknowledgment rate help distinguish accumulated queue from stuck consumers. In JMS, the diagnosis also depends on the provider and the acknowledgment or transaction mode."
  },
  {
    "kind": "paragraph",
    "text": "Distributed traces must propagate traceparent or equivalent context in headers, but the asynchronous span must not pretend to be a long synchronous call. Correlation IDs, message IDs, causation IDs and timestamps allow you to reconstruct a chain of events. Logs need to avoid sensitive payloads and record decisions: published, confirmed, delivered, retried, dead-lettered and acknowledged."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Effective troubleshooting separates publishing, storage, delivery and processing.",
    "headers": [
      "Symptom",
      "Hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "Increasing lag in Kafka",
        "Slow consumer, hot partition or rebalance.",
        "Lag by partition, processing time and group events."
      ],
      [
        "Ready messages in RabbitMQ",
        "Lack of consumers or routing error.",
        "Consumer count, deliver rate and bindings."
      ],
      [
        "Many unacked",
        "High prefetch, stuck consumer or late ack.",
        "Unacked by channel and processing duration."
      ],
      [
        "DLQ growing",
        "Invalid contract, broken dependency or poison message.",
        "Reason, retry headers and application error."
      ],
      [
        "Duplicates",
        "Retry, redelivery or commit/ack out of order.",
        "IDs, offsets, redelivered flag and Inbox table."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "31.17 Case studies and labs",
    "id": "31-17-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case study 1 - payments: the API records the order and an Outbox in the same transaction. A relay publishes PaymentCreated in Kafka using paymentId as key. Fraud, notification and conciliation services use independent groups. The fraud service maintains payment ordering and publishes the decision. Replays are performed on isolated output threads so as not to resend external effects."
  },
  {
    "kind": "paragraph",
    "text": "Case study 2 - operational tasks: a system publishes commands to a RabbitMQ exchange topic. Queues by capacity receive messages by routing key. Consumers use limited prefetch, manual ack, and delayed retry. After the limit, messages go to DLQ with cause and count. An operational process allows data to be corrected and republished with key idempotency."
  },
  {
    "kind": "paragraph",
    "text": "Case study 3 - legacy Java: a Jakarta EE application uses JMS to publish to a corporate provider. Modernization preserves the logical contract, but reviews XA transactions, selectors, durable subscriptions, and redelivery before migrating to another broker. The team avoids assuming that the same Java API means identical behavior between providers."
  },
  {
    "kind": "subhead",
    "text": "Suggested labs"
  },
  {
    "kind": "paragraph",
    "text": "1) Publish messages to Kafka with two keys and observe partitions and offsets. 2) Create two consumers in the same group and then in different groups. 3) In RabbitMQ, configure direct, topic and fanout exchanges. 4) Manual ack, prefetch, nack, requeue and DLQ testing. 5) Implement an idempotent consumer with Inbox. 6) Compare a JMS API with the real protocol used by the provider."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Messaging decouples producers and consumers in time and capacity, but does not eliminate contracts, ownership or distributed failures. Queues, publish/subscribe, and partitioned logs have different lifecycles. The choice must consider retention, replay, ordering, fan-out and nature of the work."
  },
  {
    "kind": "paragraph",
    "text": "Kafka organizes topics into persistent partitions and offers consumer groups, offsets, retention, compression, and transactional pipelines within controlled boundaries. RabbitMQ emphasizes routing through exchanges, queues, acknowledgements, confirms, quorum queues, streams and flexible delivery topologies. AMQP 0-9-1 and AMQP 1.0 are distinct protocols despite their common name."
  },
  {
    "kind": "paragraph",
    "text": "Jakarta Messaging/JMS standardizes Java programming, not the broker or wire protocol. On any platform, true reliability depends on the combination of commits, idempotency, ordering, retries, DLQ, observability, and capacity. The best design explains the failure windows and the recovery procedure."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves into observability of APIs and distributed systems, connecting logs, metrics and tracing with OpenTelemetry. The concepts of correlation ID, lag, backlog, redelivery and causality studied here will be essential."
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
      "The model was chosen consciously: queue, pub/sub, log or stream.",
      "Contract, owner, version and data classification of the message are documented.",
      "Producer confirmation and consumer acknowledgment were handled separately.",
      "The ordering unit and partitioning key are defined.",
      "Consumers are idempotent or have an explicit strategy for duplicates.",
      "Retries have limit, delay and distinction between transient and permanent failure.",
      "DLQ has alert, owner, analysis procedure and safe reprocessing.",
      "Retention, replay, and compression were evaluated against privacy and capacity.",
      "Permissions follow least privilege for topics, groups, vhosts, exchanges, and queues.",
      "Lag, backlog, message age, confirms, unacked and DLQ are monitored.",
      "Failover, election, reconnection, and disaster have been tested.",
      "Capacity plans include replication, peaking, maintenance, and reprocessing."
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
      "Differentiate traditional queue, publish/subscribe and distributed log.",
      "Explain why publisher confirmation does not replace consumer acknowledgment.",
      "Describe an at-least-once situation and how to make it idempotent.",
      "Explain why Kafka preserves order per partition and not globally.",
      "Describe the relationship between topic, partition, offset and consumer group.",
      "Compare direct, topic, fanout and header exchanges in RabbitMQ.",
      "Differentiate between quorum queue, classic queue and stream.",
      "Explain why AMQP 0-9-1 and AMQP 1.0 should not be treated as the same thing.",
      "Describe the role of JMSContext, Destination, Producer, and Consumer.",
      "Design retry and DLQ for a consumer that calls an external service.",
      "List metrics to diagnose high lag in Kafka and high unacked in RabbitMQ.",
      "Propose a replay strategy that does not repeat dangerous external effects."
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
        "Acknowledgment",
        "Consumer confirmation to the broker about the processing of a delivery."
      ],
      [
        "Binding",
        "Rule that connects exchange to queue, stream or other exchange in RabbitMQ."
      ],
      [
        "broker",
        "Intermediary that receives, stores, routes and delivers messages."
      ],
      [
        "consumer group",
        "Consumer set that divides partitions of a Kafka topic."
      ],
      [
        "Dead Letter Queue",
        "Destination for messages that could not be processed normally."
      ],
      [
        "Delivery semantics",
        "Guarantee observed as at-most-once, at-least-once, or exactly once in specific context."
      ],
      [
        "Exchange",
        "RabbitMQ entity that routes publications according to type and bindings."
      ],
      [
        "Idempotence",
        "Property of repeating an operation without changing the final result beyond the first execution."
      ],
      [
        "JMSContext",
        "Simplified Jakarta Messaging API main interface."
      ],
      [
        "KRaft",
        "Kafka controllers metadata and quorum mode."
      ],
      [
        "offset",
        "Position of a record in a partition or stream."
      ],
      [
        "Partition",
        "Orderly and scalable subdivision of a Kafka topic."
      ],
      [
        "Prefetch",
        "Limit on unacknowledged messages delivered to a RabbitMQ consumer."
      ],
      [
        "Publisher confirm",
        "Confirmation from the broker to the producer about the publication."
      ],
      [
        "Quorum queue",
        "Data security-oriented RabbitMQ replicated queue."
      ],
      [
        "Settlement",
        "Agreement on the final state of a delivery in AMQP 1.0."
      ],
      [
        "Tombstone",
        "Record with null value used for pruning in compressed logs."
      ],
      [
        "virtual host",
        "Namespace and permissions boundary in RabbitMQ."
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
      "Apache Software Foundation. Apache Kafka Documentation - concepts, design, operations, Connect and Streams.",
      "RabbitMQ Documentation - queues, exchanges, consumers, publisher confirms, quorum queues, streams, TTL and dead lettering.",
      "OASIS. Advanced Message Queuing Protocol (AMQP) Version 1.0.",
      "Jakarta EE. Jakarta Messaging 3.1 Specification and API Documentation.",
      "Enterprise Integration Patterns - Message Channel, Competing Consumers, Publish-Subscribe, Dead Letter Channel and Request-Reply.",
      "CloudEvents Specification - standardized envelope for events.",
      "OpenTelemetry Specification - context propagation in messaging.",
      "OWASP and corporate security recommendations for brokers, credentials and persisted data."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Versions of Kafka, RabbitMQ, JMS libraries and providers evolve. Before adopting configurations, validate the official documentation of the deployed version, especially for KRaft, consumer groups, quorum queues, streams, AMQP 1.0 and transactional integration."
  }
];
