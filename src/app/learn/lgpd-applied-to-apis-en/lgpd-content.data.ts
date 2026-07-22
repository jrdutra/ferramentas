import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const LGPD_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "LGPD applied to APIs: data protection throughout the entire lifecycle"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/en/overview.svg",
    "alt": "Personal data through secure collection, processing, sharing, retention and deletion",
    "caption": "Opening figure - Data protection follows the entire life cycle of information processed by APIs."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Privacy needs to be translated into verifiable technical decisions from the API contract to logs, backups, third parties and deletion."
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
    "text": "APIs are data processing channels. They collect identifiers, receive credentials, consult records, move information between systems, feed logs, caches and queues and, in many cases, share data with partners. Therefore, the application of the General Personal Data Protection Law cannot be reduced to a privacy notice or a consent screen. Compliance needs to be built into the API contract, architecture, code, operation, and governance."
  },
  {
    "kind": "paragraph",
    "text": "The LGPD regulates the processing of personal data carried out by natural or legal persons governed by public or private law, including in digital media. For an API team, this means understanding which fields identify or make identifiable a person, what purpose justifies each operation, who decides the processing, who executes it on behalf of another agent, which third parties receive data and how long copies remain in production, observability, backup and development environments."
  },
  {
    "kind": "paragraph",
    "text": "The technical challenge arises because distributed APIs multiply copies and contexts. A field sent in the payload can appear in the gateway's access log, in the distributed trace, in a dead-letter queue, in a data lake and in a backup. A deletion request may require coordinated actions across multiple services. A contract change may introduce a new category of data without the impact analysis being updated. Therefore, mapping flows and responsibilities is a condition for applying minimization, necessity, transparency and security."
  },
  {
    "kind": "paragraph",
    "text": "This chapter translates principles and obligations into practices for architects, developers, gateway, security, and operations teams. The text is educational and does not replace a legal assessment of the specific case. The interpretation must consider the compiled LGPD, current regulations of the National Data Protection Agency - ANPD, sectoral standards and applicable contracts."
  },
  {
    "kind": "paragraph",
    "text": "How to study this chapter For each endpoint, record: purpose, data categories, legal basis, owner, origin, recipients, retention, access controls, logs generated and rights fulfillment procedure. This sheet transforms legal concepts into verifiable architectural evidence."
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
      "Explain how LGPD applies to the lifecycle of an API.",
      "Distinguish personal data, sensitive personal data, anonymized and pseudonymized data.",
      "Relate LGPD principles to technical requirements of contracts and gateways.",
      "Differentiate controller, operator, supervisor and sub-operators in integrations.",
      "Map legal bases without treating consent as a universal option.",
      "Design minimization, retention, elimination and fulfillment of rights.",
      "Apply privacy by design, security and accountability to APIs.",
      "Understand RIPD, incidents, international transfer and contracts.",
      "Diagnose risks in logs, tokens, payloads, caches, queues and test environments."
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
      "36.1 Scope of the LGPD and the role of APIs",
      "36.2 Personal, sensitive data, anonymization and pseudonymization",
      "36.3 Principles translated into technical requirements",
      "36.4 Processing agents and responsibilities",
      "36.5 Legal bases and purpose",
      "36.6 Inventory, data mapping and lineage",
      "36.7 Minimization and contract design",
      "36.8 Rights of holders in distributed architectures",
      "36.9 Retention, deletion, backups and logs",
      "36.10 Privacy by design and RIPD",
      "36.11 Security, incidents and communication",
      "36.12 International transfer and third parties",
      "36.13 Gateways, observability and development environments",
      "36.14 Governance, DevSecOps and evidence",
      "36.15 Children, adolescents and reinforced protection",
      "36.16 Automated decisions, profiling and AI",
      "36.17 Inspection, sanctions and accountability",
      "36.18 Troubleshooting and case studies",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.1 Scope of the LGPD and the role of APIs",
    "id": "36-1-scope-of-the-lgpd-and-the-role-of-apis"
  },
  {
    "kind": "paragraph",
    "text": "The LGPD applies to processing operations, a broad concept that includes collection, production, reception, classification, use, access, reproduction, transmission, distribution, processing, archiving, storage, elimination, evaluation, modification, communication, transfer, dissemination and extraction. An API call can perform several of these operations in sequence. The endpoint is not just a technical interface: it is a point in the treatment flow."
  },
  {
    "kind": "paragraph",
    "text": "The territorial scope does not only depend on the server location. The law covers situations provided for in its text, such as processing carried out in the national territory, offering or supplying goods and services to people located in Brazil or data collected in the country. Global architectures need to analyze cloud regions, international support, replication, vendors, and telemetry transfer."
  },
  {
    "kind": "paragraph",
    "text": "There are hypotheses of non-application and special regimes, but they must be evaluated carefully. It is not safe to assume that an internal API is outside the LGPD or that corporate data is never personal. Email addresses, license plates, IPs, user IDs, device identifiers and audit trails may relate to natural persons."
  },
  {
    "kind": "paragraph",
    "text": "Mental model The question is not just “does the answer contain CPF?”. Ask whether any data in the flow allows you to identify, individualize, contact, profile or make a decision about a natural person, alone or in conjunction with other information."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.2 Personal, sensitive data, anonymization and pseudonymization",
    "id": "36-2-personal-sensitive-data-anonymization-and-pseudonymization"
  },
  {
    "kind": "paragraph",
    "text": "Personal data is information related to an identified or identifiable natural person. Identification can be direct, such as name and CPF, or indirect, when combinations of attributes allow someone to be recognized. In APIs, technical identifiers also matter: an apparently random customerId remains personal data if the organization can relate it to the holder."
  },
  {
    "kind": "paragraph",
    "text": "Sensitive personal data receives enhanced protection. The category includes, among other elements defined by the LGPD, data on racial or ethnic origin, religious conviction, political opinion, union membership, health, sexual life, genetics and biometrics when linked to a person. A biometric authentication, healthcare, or fraud prevention API must explicitly recognize this category and apply compatible legal basis and controls."
  },
  {
    "kind": "paragraph",
    "text": "Anonymization seeks to remove the reasonable possibility of direct or indirect association with a person, considering technical means available at the time. Pseudonymization replaces identifiers with keys or tokens, but preserves the possibility of re-identification through additional information. Pseudonymization reduces risk and exposure, but the data remains subject to the LGPD."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Data classification must consider context and possibility of association.",
    "headers": [
      "Category",
      "Example in APIs",
      "Technical implication"
    ],
    "rows": [
      [
        "Direct personal data",
        "name, CPF, email",
        "Restricted access, explicit purpose and retention."
      ],
      [
        "Indirect identifier",
        "customerId, IP, deviceId",
        "It remains personal if there is a reasonable association."
      ],
      [
        "Sensitive data",
        "biometrics, health",
        "Reinforced protection and specific legal hypothesis."
      ],
      [
        "Pseudonymized",
        "token replacing CPF",
        "Reduces exposure, but personal data remains."
      ],
      [
        "Anonymized",
        "statistic without reasonable re-identification",
        "You can leave the regime, as long as anonymization is effective."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.3 Principles translated into technical requirements",
    "id": "36-3-principles-translated-into-technical-requirements"
  },
  {
    "kind": "paragraph",
    "text": "The principles of art. 6th guide the entire design. Purpose requires that the API has a legitimate, specific, and informed purpose. Adequacy requires consistency between the processing and the declared purpose. Necessity limits treatment to the relevant minimum. Free access, quality and transparency guide documentation and service channels. Security and prevention require technical and administrative controls. Non-discrimination prevents abusive use. Accountability and accountability require evidence."
  },
  {
    "kind": "paragraph",
    "text": "In engineering, principles need to become acceptance criteria. Necessity can be verified by reviewing the schema and optional fields. Transparency can be supported by consistent catalogs and notices. Security appears in authentication, authorization, encryption, segregation, testing and monitoring. Accountability appears in recorded decisions, owners, inventory, reviews, metrics and audit trails."
  },
  {
    "kind": "paragraph",
    "text": "Principles also help resolve situations not covered by a specific operating rule. When a team wants to add a field to the log “to facilitate support”, the question is not just whether it technically works. It is necessary to assess need, risk, access, retention and transparency."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Principles must be observable in architectural and operational decisions.",
    "headers": [
      "Principle",
      "Question for the API",
      "Associated control"
    ],
    "rows": [
      [
        "Purpose",
        "Why does this endpoint need the data?",
        "Registration of purpose and permitted use."
      ],
      [
        "Need",
        "What is the minimum field set?",
        "Minimal schemas and response filtering."
      ],
      [
        "Transparency",
        "Does the incumbent understand the flow?",
        "Consistent documentation and notice."
      ],
      [
        "Security",
        "Who can access and how do we protect?",
        "IAM, encryption, logs and testing."
      ],
      [
        "Accountability",
        "What evidence demonstrates compliance?",
        "Inventory, approvals and audit."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.4 Processing agents and responsibilities",
    "id": "36-4-processing-agents-and-responsibilities"
  },
  {
    "kind": "paragraph",
    "text": "The controller is the person who makes decisions regarding treatment. Operator carries out processing on behalf of the controller. The person in charge acts as a communication channel and carries out duties defined in the LGPD and regulations. In modern chains, cloud providers, observability platforms, managed gateways and bureaus can act as operators or sub-operators depending on the contractual and factual context."
  },
  {
    "kind": "paragraph",
    "text": "The classification is not just a result of the name used in the contract. It is necessary to observe who determines the purposes and essential elements of the treatment. The same organization can be a controller in one flow and an operator in another. Architects should record API, domain, and integration responsibilities, avoiding generic documents that do not reflect actual operations."
  },
  {
    "kind": "paragraph",
    "text": "Contracts with operators must describe instructions, confidentiality, security, subcontracting, incidents, return or deletion of data, auditing and support for data subject rights. These elements need to match the technical capabilities of the product. There is no point promising immediate deletion if the architecture keeps copies in backups without a defined policy."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Papers must be analyzed by processing operation, not just by company.",
    "headers": [
      "Paper",
      "Main decision",
      "Evidence on APIs"
    ],
    "rows": [
      [
        "Controller",
        "Defines purpose and essential means.",
        "Catalog, legal basis, owner and rules of use."
      ],
      [
        "Operator",
        "Execute as instructed.",
        "Contract, runbook, controls and reports."
      ],
      [
        "In charge",
        "Channel and governance support.",
        "Service flow and recommendations."
      ],
      [
        "Suboperator",
        "Executes part of the chain.",
        "Third party inventory and applicable clauses."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.5 Legal bases and purpose",
    "id": "36-5-legal-bases-and-purpose"
  },
  {
    "kind": "paragraph",
    "text": "Every processing operation must be supported by an appropriate legal hypothesis. The LGPD provides for different bases for personal data and for sensitive personal data. Consent is just one of them and should not be automatically used when another basis better represents the relationship. The choice requires legal and factual analysis, registration of the purpose and coherence between collection, use and sharing."
  },
  {
    "kind": "paragraph",
    "text": "Execution of a contract, compliance with legal or regulatory obligations, regular exercise of rights, protection of life, protection of health, protection of credit and legitimate interest are examples provided for by law, each with its own conditions. Legitimate interest requires assessment of purpose, need, balance and safeguards, in addition to consideration of the legitimate expectations and rights of the holder."
  },
  {
    "kind": "paragraph",
    "text": "In the API, the legal basis does not need to travel as a header in every call, but it needs to be linked to the product's inventory and rules. The same endpoint can serve different purposes; this should be avoided when it hinders segregation and governance. Very generic APIs increase the risk of incompatible reuse."
  },
  {
    "kind": "paragraph",
    "text": "Consent is not synonymous with authentication Login proves or helps prove who is interacting. Consent is a specific expression for a specific purpose, when this is the applicable basis. A login screen or continued use of the service does not automatically replace consent requirements."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.6 Inventory, data mapping and lineage",
    "id": "36-6-inventory-data-mapping-and-lineage"
  },
  {
    "kind": "paragraph",
    "text": "The processing inventory must be connected to the API catalog. For each operation, record categories of owners, data, purpose, legal basis, source and destination systems, shares, retention, controls and responsible parties. OpenAPI helps you identify fields, but it doesn't alone reveal logs, transformations, caches, replicas, or indirect targets."
  },
  {
    "kind": "paragraph",
    "text": "Data mapping describes the flow. Lineage records the trajectory and transformations. At a gateway, the payload can be transformed, enriched and forwarded. In messaging, events can be replicated to multiple consumers. In observability, attributes can be exported to external tools. The map needs to include these paths, not just the main database."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/en/figure-01.svg",
    "alt": "Data lifecycle map including APIs, logs, queues, caches and backups",
    "caption": "Figure 1 - The data map needs to include operational components and indirect copies."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.7 Minimization and contract design",
    "id": "36-7-minimization-and-contract-design"
  },
  {
    "kind": "paragraph",
    "text": "Minimization starts with design. Requests should only ask for necessary data; responses should avoid oversized objects. Just because a backend has many fields doesn't mean they all have to go through the gateway. Context-based APIs, appropriate scopes, field-level authorization and controlled projections help reduce exposure."
  },
  {
    "kind": "paragraph",
    "text": "Errors also need to be minimized. Stack traces, SQL, tokens, keys, registration data and complete responses from suppliers should not reach the consumer. The external message must be useful without revealing unnecessary details. Internally, logs need to balance diagnostics and protection."
  },
  {
    "kind": "paragraph",
    "text": "GraphQL deserves special attention because the client chooses fields. Authorization by field, complexity limits and carefully designed schemas prevent flexibility from becoming exposure. In REST, field filters and multiple representations must also respect authorization and purpose."
  },
  {
    "kind": "paragraph",
    "text": "Need-oriented contract # Conceptual example of minimized response { \"clienteId\": \"c_9f32...\", \"nomeExibicao\": \"João D.\", \"status\": \"ACTIVO\" } # Do not return by default: full CPF, address, # biometrics, history and data from other domains."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.8 Rights of holders in distributed architectures",
    "id": "36-8-rights-of-holders-in-distributed-architectures"
  },
  {
    "kind": "paragraph",
    "text": "The LGPD ensures rights such as confirmation of the existence of treatment, access, correction, anonymization, blocking or deletion under certain conditions, portability, information on sharing and review of automated decisions under applicable terms. The operation must have a channel, proportional authentication and a process to locate the holder's data."
  },
  {
    "kind": "paragraph",
    "text": "In microservices, service cannot depend on manual queries without coordination. A privacy service can orchestrate requests, query catalog and lineage, send commands to domains, and gather evidence. The identity used to locate data needs to be secure: asking for CPF in plain text from all services can create new exposure."
  },
  {
    "kind": "paragraph",
    "text": "Elimination is not absolute in all situations. Legal and regulatory obligations, exercise of rights and other hypotheses may justify conservation. The system must distinguish active, blocked, archived and deleted data, recording the basis and deadline."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/en/figure-02.svg",
    "alt": "Rights of holders coordinated between identity, catalog and distributed systems",
    "caption": "Figure 2 - Holder rights require coordination between identity, catalog and distributed systems."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.9 Retention, deletion, backups and logs",
    "id": "36-9-retention-deletion-backups-and-logs"
  },
  {
    "kind": "paragraph",
    "text": "Retention should be defined by purpose and applicable obligation, not by technical habit. Banks, objects, topics, caches and indexes need policies. Expired data should not remain indefinitely just because storage is cheap. The policy must describe the start of the count, events that change the deadline, disposal and evidence."
  },
  {
    "kind": "paragraph",
    "text": "Backups require specific treatment. Immediate deletion of every record on all media may be impractical, but the organization must control access, limit retention, and prevent restored data from returning to active use without reapplying deletions. Restore runbooks need to address this risk."
  },
  {
    "kind": "paragraph",
    "text": "Logs and traces are frequent sources of leaks. Tokens, Authorization headers, cookies, payloads, query strings and sensitive identifiers must be masked or omitted. The principle is to record what is necessary for operation and auditing, using correlation IDs and pseudonymized references rather than full content."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Operational copies must be part of the retention policy.",
    "headers": [
      "Active",
      "Typical risk",
      "Recommended control"
    ],
    "rows": [
      [
        "Access log",
        "Headers or query with personal data.",
        "Allowlist of fields and masking."
      ],
      [
        "Distributed trace",
        "Baggage propagating identifiers.",
        "Attribute and redaction policy."
      ],
      [
        "Fila / DLQ",
        "Payload held indefinitely.",
        "TTL, encryption and restricted access."
      ],
      [
        "Backup",
        "Restore reintroduces deleted data.",
        "Reapplication and retention runbook."
      ],
      [
        "Test environment",
        "Unprotected production copy.",
        "Synthetic or masked data."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.10 Privacy by design and Impact Report",
    "id": "36-10-privacy-by-design-and-impact-report"
  },
  {
    "kind": "paragraph",
    "text": "Privacy by design means incorporating protection from product conception and throughout its entire lifecycle. In practice, discovery identifies data and purposes; design defines minimization, segregation and authorization; development implements controls; tests validate abuse and exposure; the operation measures, reviews and responds to incidents."
  },
  {
    "kind": "paragraph",
    "text": "The Personal Data Protection Impact Report - RIPD - documents treatments that may generate risks and describes measures, safeguards and mitigation mechanisms. The need, form and timing must consider the LGPD, ANPD guidelines, risk and sectoral context. For APIs, flowcharts, inventory, threats, contracts, and technical evidence feed into the report."
  },
  {
    "kind": "paragraph",
    "text": "The assessment needs to be updated when there is a relevant change: new purpose, new third party, sensitive data, profiling, scale expansion, use of AI, international transfer or integration with external ecosystems. A static RIPD, disconnected from the catalog and pipeline, quickly loses value."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/en/figure-03.svg",
    "alt": "Privacy by design following requirements, contracts, testing and deployment",
    "caption": "Figure 3 - Privacy must follow the treadmill and contract changes."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.11 Security, incidents and communication",
    "id": "36-11-security-incidents-and-communication"
  },
  {
    "kind": "paragraph",
    "text": "The LGPD requires technical and administrative measures capable of protecting data against unauthorized access and accidental or illicit situations. For APIs, this involves strong authentication, least privilege, mTLS where appropriate, encryption, secret management, segmentation, input validation, abuse protection, dependency security, and monitoring."
  },
  {
    "kind": "paragraph",
    "text": "A security incident is not automatically synonymous with an obligation to communicate, but it needs to be evaluated. The ANPD Security Incident Reporting Regulation defines criteria and procedures for situations that may result in relevant risk or damage. The organization must have a process to detect, classify, contain, preserve evidence and decide quickly."
  },
  {
    "kind": "paragraph",
    "text": "API inventory speeds up response. When a credential is exposed, you need to know which endpoints it reaches, what data may have been queried, which logs record usage, and how to revoke it. Communication, when applicable, must be consistent with confirmed facts and adopted measures."
  },
  {
    "kind": "subhead",
    "text": "Response to an incident involving personal data"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/lgpd-applied-to-apis/en/figure-04.svg",
    "alt": "Incident response connecting containment, risk assessment and governance",
    "caption": "Figure 4 - Incident response combines technical operation, risk assessment and governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.12 International transfer and third parties",
    "id": "36-12-international-transfer-and-third-parties"
  },
  {
    "kind": "paragraph",
    "text": "International transfer occurs when personal data is transferred to a foreign country or international organization. Cloud architectures can perform transfers via hosting, support, observability, backup, CDN, or remote access. The endpoint location alone does not reveal all flows."
  },
  {
    "kind": "paragraph",
    "text": "Resolution CD/ANPD No. 19/2024 regulates transfer mechanisms, including standard contractual clauses, specific clauses, global corporate standards and adequacy decisions. In 2025, the regulation was amended. Teams must maintain inventory of destinations, suppliers, subprocessors, regions, and corresponding legal mechanisms."
  },
  {
    "kind": "paragraph",
    "text": "Third-party APIs also require due diligence. The contract must limit purpose, instructions, retention, subcontracting, security and incidents. Technically, egress control, allowlists, gateways, token exchange, pseudonymization and minimization reduce exposure. The supplier must receive only what is necessary for its function."
  },
  {
    "kind": "paragraph",
    "text": "Cloud does not eliminate responsibility Managed service reduces operational burden, but does not replace data classification, secure configuration, contracts, region control, subprocessor review and access monitoring."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.13 API Gateways, observability and development environments",
    "id": "36-13-api-gateways-observability-and-development-environments"
  },
  {
    "kind": "paragraph",
    "text": "The API Gateway is a valuable point of enforcement: authentication, authorization, schema validation, field filtering, masking, rate limiting and auditing. However, it should not become an unrestricted payload repository. Detailed traces and Traffic Monitors require controlled access, short retention and masking."
  },
  {
    "kind": "paragraph",
    "text": "Observability should favor operational metadata: status, latency, routeId, pseudonymized clientId, policy result, and correlation IDs. Body capture must be exceptional, justified and temporary. Dashboards and alerts can also expose data if labels and dimensions have high cardinality with person identifiers."
  },
  {
    "kind": "paragraph",
    "text": "Development and approval environments must use synthetic or appropriately masked data. Copying production base to investigate bug creates additional treatment and expands surface. Replay tools need to remove credentials, cookies, and personal fields."
  },
  {
    "kind": "paragraph",
    "text": "Minimum policy for API telemetry # Conceptual example of logging policy allow: method, routeId, status, latencyMs, traceId pseudonymize: customerId, partnerId mask: email, phone, document block: Authorization, Cookie, token, password, biometrics full payload: approved and temporary exception only"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.14 Governance, DevSecOps and evidence",
    "id": "36-14-governance-devsecops-and-evidence"
  },
  {
    "kind": "paragraph",
    "text": "Sustainable compliance depends on automation. The API catalog can store owner, data classification, purpose, and retention. Linters can detect sensitive fields in OpenAPI. Pipelines can prevent logs of prohibited headers, require threat modeling, and record approvals. Contract scanners and tests check for accidental exposure."
  },
  {
    "kind": "paragraph",
    "text": "Evidence as code is the practice of generating evidence from the conveyor belt: contract hash, test results, policy version, updated inventory, security approval and deployment record. This reduces audits based on outdated spreadsheets. The evidence needs to be complete, accessible to those responsible and proportionate to the risk."
  },
  {
    "kind": "paragraph",
    "text": "Governance also includes training, metrics and periodic review. Useful indicators: APIs with full classification, sensitive fields without owner, logs with redaction, owner requests on time, incidents, third parties reviewed, and expired holds."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Compliance increases when the treadmill generates evidence.",
    "headers": [
      "Treadmill control",
      "Evidence produced",
      "Failure avoided"
    ],
    "rows": [
      [
        "OpenAPI Lint",
        "Critical fields report.",
        "New data enters without review."
      ],
      [
        "Policy tests",
        "Versioned result.",
        "Gateway leaks header or payload."
      ],
      [
        "SAST/secret scan",
        "Findings and corrections.",
        "Credentials in the code."
      ],
      [
        "Signed deployment",
        "Artifact and approval.",
        "Untraceable configuration."
      ],
      [
        "Periodic review",
        "Owner registration and retention.",
        "Obsolete inventory."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.15 Children, adolescents and reinforced protection",
    "id": "36-15-children-adolescents-and-reinforced-protection"
  },
  {
    "kind": "paragraph",
    "text": "The processing of data from children and adolescents requires priority consideration of their best interests. Digital services, education APIs, games, health, identity and benefits need to evaluate language, transparency, profiling, advertising, sharing and verification or age measurement mechanisms when applicable to the product and current legislation."
  },
  {
    "kind": "paragraph",
    "text": "From a technical perspective, the architecture must reduce collection, avoid unnecessary inferences, limit retention, and prevent incompatible secondary use. Guardian identifiers, school data, location, biometrics and usage history can increase the risk. Consent or representation controls, when required, should not be implemented as a simple checkbox disconnected from identity and purpose."
  },
  {
    "kind": "paragraph",
    "text": "Law No. 15,211/2025, known as the Digital Statute of Children and Adolescents, added specific duties to the digital ecosystem and reinforced coordination with the LGPD. As regulation and inspection evolve, teams must follow official ANPD guidelines and review products intended for or accessible to minors."
  },
  {
    "kind": "paragraph",
    "text": "Protection by default For potentially smaller audiences, the initial configuration should prioritize privacy: less collection, less exposure, restricted sharing and understandable controls."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.16 Automated decisions, profiling and artificial intelligence",
    "id": "36-16-automated-decisions-profiling-and-artificial-intelligence"
  },
  {
    "kind": "paragraph",
    "text": "APIs often provide scores, recommendations, fraud detection, thresholds, and model-produced rankings. When automated decisions affect the holder's interests, the architecture must allow proportional explainability, review, contestation and identification of relevant criteria, observing commercial and industrial secrets and applicable legislation."
  },
  {
    "kind": "paragraph",
    "text": "The risk isn't just in the inference endpoint. Training data, features, prompts, logs, feedback and outputs are also part of the treatment. It is necessary to record origin, purpose, quality, biases, retention, access and shares. A third-party hosted model may introduce international transfer, sub-operators, and secondary data use."
  },
  {
    "kind": "paragraph",
    "text": "Technical controls include separation between identifiers and attributes, model versioning, decision recording, drift monitoring, discrimination tests, human review in critical cases and limiting data sent to providers. The decision to use legitimate interest, consent or another basis needs to be analyzed in the concrete context."
  },
  {
    "kind": "table",
    "caption": "Table 6 - AI extends the life cycle and requires additional evidence.",
    "headers": [
      "Element",
      "Risk",
      "Evidence needed"
    ],
    "rows": [
      [
        "Feature store",
        "Reuse beyond purpose.",
        "Catalog, origin and retention policy."
      ],
      [
        "Score endpoint",
        "Opaque or discriminatory decision.",
        "Version, criteria and review."
      ],
      [
        "Prompt/context",
        "Personal data sent to third parties.",
        "Minimization and contract."
      ],
      [
        "Feedback",
        "Silent expansion of treatment.",
        "Revised purpose and basis."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.17 Inspection, sanctions and accountability",
    "id": "36-17-inspection-sanctions-and-accountability"
  },
  {
    "kind": "paragraph",
    "text": "The ANPD can act in a guiding, preventive, supervisory and sanctioning manner. The LGPD provides for administrative sanctions, and Resolution CD/ANPD No. 4/2023 regulates dosimetry and application. The analysis considers factors provided for in the law and regulations, such as severity, good faith, advantage, recidivism, cooperation and adoption of mechanisms capable of minimizing damage."
  },
  {
    "kind": "paragraph",
    "text": "For technical teams, accountability means demonstrating that decisions were made before the incident or audit. Documented policies, updated inventory, testing, access reviews, disposal records, training, and incident response are stronger evidence than generic documents produced later."
  },
  {
    "kind": "paragraph",
    "text": "Compliance metrics need to be actionable. Number of unowned APIs, unclassified sensitive fields, expired holds, exposed credentials, late requests and unreviewed third parties help prioritize risk. Governance must avoid transforming privacy into a mere document count."
  },
  {
    "kind": "paragraph",
    "text": "Accountability is not bureaucracy The objective of the evidence is to allow us to reconstruct why the organization processed data, what controls it applied, how it assessed risk and how it corrected deviations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "36.18 Troubleshooting and case studies",
    "id": "36-18-troubleshooting-and-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - payload appearing in logs: a registration API records the entire body for diagnosis. The problem is not solved simply by reducing retention. The analysis must identify fields, users with access, export destinations, backups and queries performed. Remediation includes removing capture, masking, restricting access, reviewing incidents, and updating tests."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - Incomplete purge request: Master record is deleted, but events, indexes, and data lake remain. The cause is incomplete inventory and lack of lineage. The solution requires orchestration, lock states, retention policy, and evidence per domain."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - international supplier receives more data than necessary: integration sends complete object when only one score is needed. The fix combines minimum contract, pseudonymization, egress control, transfer mechanism and purpose review."
  },
  {
    "kind": "paragraph",
    "text": "Privacy troubleshooting must preserve evidence without expanding exposure. Avoid copying data to chats, tickets and spreadsheets. Use correlation IDs, temporary access, controlled environments, and auditable emergency procedures."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "Applying LGPD to APIs means transforming principles and obligations into verifiable architecture. Compliance starts in inventory, goes through purpose, legal basis, minimization and responsibilities and continues through logs, queues, backups, third parties and entitlement fulfillment."
  },
  {
    "kind": "paragraph",
    "text": "Controllers and operators need to know the actual flow. The OpenAPI contract is part of the evidence, but it must be complemented by lineage, retention, gateway policies, observability, and vendor contracts. Pseudonymized data remains personal; Consent does not replace other legal bases nor is it confused with authentication."
  },
  {
    "kind": "paragraph",
    "text": "Privacy by design, RIPD, security and incident response form a continuous cycle. API changes can change risk and purpose, requiring review. Automation of controls and evidence on the conveyor belt reduces dependence on manual processes and increases the ability to demonstrate accountability."
  },
  {
    "kind": "paragraph",
    "text": "Next step in the course Chapter 37 delves into high-availability banking architectures, connecting continuity, redundancy, consistency, capacity, and recovery to critical API requirements."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "LGPD Checklist for APIs",
    "id": "lgpd-checklist-for-apis"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The purpose, legal basis, data categories and data subject are recorded per operation.",
      "Schemas and responses follow minimization and authorization by context.",
      "Gateway, logs, traces, queues, caches, backups and tests are in the data map.",
      "Roles of controller, operator and third parties reflect practice and contracts.",
      "Retention, blocking, deletion and restoration have rules and evidence.",
      "Rights of holders can be met in a coordinated and secure manner.",
      "Sensitive data and technical identifiers receive appropriate classification.",
      "International transfers and subprocessors are inventoried.",
      "Policies prevent registration of unnecessary tokens, cookies, passwords and payloads.",
      "Contract changes trigger privacy and risk review.",
      "Incidents have a containment, assessment and communication process.",
      "The conveyor belt generates evidence of testing, approvals and deployed versions."
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
      "Map the data lifecycle of a registration API from gateway to backups.",
      "Classify customerId, IP, biometrics and credit score and justify.",
      "Explain why pseudonymization does not automatically make data anonymous.",
      "Compare controller and operator in an anti-fraud SaaS integration.",
      "Propose a minimized response for a client query API.",
      "Design the flow of responding to an access request in microservices.",
      "Set retention policy for access logs, traces, DLQ and backups.",
      "List triggers for updating a RIPD after API change.",
      "Propose gateway controls to prevent log leaks.",
      "Describe evidence needed to investigate an exposed token incident."
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
    "caption": "Table 6 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "ANPD",
        "National Data Protection Agency, responsible for regulating and monitoring data protection in Brazil."
      ],
      [
        "Anonymization",
        "Use of reasonable technical means to remove the possibility of association with a person."
      ],
      [
        "Legal basis",
        "Hypothesis provided for by law that legitimizes a processing operation."
      ],
      [
        "Controller",
        "Agent responsible for decisions regarding treatment."
      ],
      [
        "Personal data",
        "Information related to an identified or identifiable natural person."
      ],
      [
        "Sensitive data",
        "Category of personal data with reinforced protection defined by the LGPD."
      ],
      [
        "In charge",
        "Channel and support agent with duties provided for in the LGPD and regulations."
      ],
      [
        "Lineage",
        "Traceability of data origin, transformation and destinations."
      ],
      [
        "Operator",
        "Agent that processes data on behalf of the controller."
      ],
      [
        "Privacy by design",
        "Integration of data protection from conception and throughout the lifecycle."
      ],
      [
        "Pseudonymization",
        "Treatment that separates identifiers, maintaining re-identification through additional information."
      ],
      [
        "RIPD",
        "Personal Data Protection Impact Report."
      ],
      [
        "Automated decision",
        "Result produced exclusively or predominantly by automated processing."
      ],
      [
        "Holder",
        "Natural person to whom the personal data refer."
      ],
      [
        "Treatment",
        "Broad set of operations carried out with personal data."
      ],
      [
        "International transfer",
        "Transfer of personal data to a foreign country or international organization."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical and normative references",
    "id": "technical-and-normative-references"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "BRAZIL. Law No. 13,709/2018 - General Personal Data Protection Law, compiled text.",
      "BRAZIL. Law No. 13,853/2019 - changes to the LGPD and creation of the ANPD.",
      "BRAZIL. Law No. 15,211/2025 - Digital Statute of Children and Adolescents.",
      "BRAZIL. Law No. 15,352/2026 - transformation of the ANPD into a regulatory agency and related changes.",
      "ANPD. Current regulations of the National Data Protection Agency.",
      "ANPD. Resolution CD/ANPD nº 4/2023 - dosimetry and application of administrative sanctions.",
      "ANPD. Resolution CD/ANPD nº 15/2024 - Security Incident Reporting Regulation.",
      "ANPD. Resolution CD/ANPD nº 18/2024 - role of the person responsible for processing personal data.",
      "ANPD. Resolution CD/ANPD nº 19/2024 - International Data Transfer and standard contractual clauses.",
      "ANPD. Guidance on Legal Hypotheses - Legitimate Interest.",
      "ANPD. Guidance on Information Security for Small Processing Agents.",
      "ANPD. Guidance for Definitions of Processing Agents and Person in Charge.",
      "ANPD. Data Subject Rights Portal.",
      "OWASP. API Security Top 10 and security practices for APIs."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Legal and Update Note This chapter is educational material. The application of the LGPD depends on the context, sector and current standards. Validate decisions with the legal, privacy, security and regulatory areas and consult the ANPD's updated official publications."
  }
];
