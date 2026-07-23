import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const MCP_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "heading",
    "level": 2,
    "text": "What Is the Model Context Protocol (MCP)?",
    "id": "what-is-the-model-context-protocol-mcp"
  },
  {
    "kind": "paragraph",
    "text": "A Complete Guide to MCP Servers, Architecture, Security, and AI Agent Integration"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Article type",
      "Technical deep dive"
    ],
    "rows": [
      [
        "Research date",
        "July 23, 2026"
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "SEO-FOCUSED TITLE SELECTION"
  },
  {
    "kind": "paragraph",
    "text": "The title leads with the dominant informational query - \"What Is Model Context Protocol (MCP)?\" - and includes high-intent supporting terms such as MCP servers, architecture, security, AI agents, and integration."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Executive Summary",
    "id": "executive-summary"
  },
  {
    "kind": "paragraph",
    "text": "Large language models are impressive reasoners, but reasoning alone does not give them reliable access to current documents, databases, software systems, or business actions. Model Context Protocol, usually shortened to MCP, is an open protocol designed to standardize that missing connection. It gives AI applications a consistent way to discover and use external tools, read contextual resources, and offer reusable prompt workflows."
  },
  {
    "kind": "paragraph",
    "text": "The central idea is simple: instead of writing a different custom connector for every combination of AI assistant and external service, developers can expose capabilities through an MCP server. Any compatible AI host can then create an MCP client connection to that server. This reduces integration duplication, encourages interoperability, and makes connected AI systems easier to test, govern, and evolve."
  },
  {
    "kind": "paragraph",
    "text": "MCP is not a model, an agent framework, a database, or a replacement for APIs. It is an interface contract between AI applications and external capabilities. Its value becomes clearest when the same tool or knowledge source must work across multiple assistants, IDEs, agent platforms, or enterprise environments."
  },
  {
    "kind": "subhead",
    "text": "Key Takeaways"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "MCP standardizes how AI applications connect to external tools, data sources, and reusable workflows.",
      "The architecture separates the host, an MCP client connection, and an MCP server that exposes capabilities.",
      "Servers primarily expose three primitives: tools, resources, and prompts.",
      "The protocol uses JSON-RPC messages and supports local stdio connections and remote Streamable HTTP connections.",
      "MCP improves portability, but it does not automatically solve authorization, prompt injection, data leakage, or unsafe tool execution.",
      "The strongest production designs combine least privilege, explicit user approval, schema validation, isolation, observability, and careful server trust decisions."
    ]
  },
  {
    "kind": "subhead",
    "text": "Contents"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "1. Introduction: From Chatbots to Connected AI Systems",
      "2. A Brief History of MCP",
      "3. What MCP Is - and What It Is Not",
      "4. The Problem MCP Solves",
      "5. MCP Architecture: Host, Client, and Server",
      "6. The Protocol Layer: JSON-RPC, Lifecycle, and Capabilities",
      "7. The Three Core Server Primitives",
      "8. Client-Side Capabilities",
      "9. Local and Remote Transports",
      "10. Authorization and Identity",
      "11. MCP Compared with APIs, Function Calling, RAG, and Agent Protocols",
      "12. Security Risks and Defensive Design",
      "13. Practical Python Example: A Small MCP Server",
      "14. Real-World Use Cases",
      "15. Design Principles for Production MCP Servers",
      "16. Limitations, Trade-offs, and Common Misconceptions",
      "17. The Future of MCP and Its Broader Social Impact",
      "18. Conclusion",
      "Glossary and References"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "1. Introduction: From Chatbots to Connected AI Systems",
    "id": "1-introduction-from-chatbots-to-connected-ai-systems"
  },
  {
    "kind": "paragraph",
    "text": "The first wave of generative AI taught the public to think of a language model as a conversational machine: ask a question, receive an answer. The next wave is more ambitious. Instead of merely describing what should be done, an AI system can search an internal knowledge base, inspect a code repository, query a live database, create a support ticket, update a project plan, or trigger a controlled workflow."
  },
  {
    "kind": "paragraph",
    "text": "That transition changes the engineering problem. A model can generate text without touching another system, but a useful AI agent needs context, permissions, interfaces, and a reliable way to call software. Before a standard interface existed, every connection was typically custom: one integration for an assistant and a file system, another for an IDE and GitHub, another for a support bot and a ticketing platform. As the number of AI applications and external systems grew, the integration matrix became expensive and fragile."
  },
  {
    "kind": "paragraph",
    "text": "MCP approaches this problem at the protocol level. It defines a common language through which an AI application can ask, \"What capabilities do you provide?\", receive structured descriptions, invoke an allowed operation, and incorporate the result into the ongoing conversation. The official documentation compares the role of MCP to a universal connector for AI applications - a useful analogy because the protocol is less about intelligence itself and more about interoperability. [2]"
  },
  {
    "kind": "subhead",
    "text": "THE QUESTION THAT MATTERS"
  },
  {
    "kind": "paragraph",
    "text": "What happens when an AI model stops being isolated from the world and begins operating through real tools? MCP is one answer - but the quality and safety of that answer depend on architecture, permissions, and human oversight."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "2. A Brief History of MCP",
    "id": "2-a-brief-history-of-mcp"
  },
  {
    "kind": "paragraph",
    "text": "MCP emerged from a practical bottleneck in the development of AI assistants. Model quality was improving quickly, yet models remained separated from the data and systems that made their responses useful inside real organizations. Anthropic publicly introduced and open-sourced the Model Context Protocol on November 25, 2024, describing it as a standard for connecting AI assistants to content repositories, business tools, and development environments. [1]"
  },
  {
    "kind": "paragraph",
    "text": "The initial release included a specification, software development kits, local server support, and reference server implementations. The important architectural promise was that a developer could expose a capability once as an MCP server and make it available to multiple compatible clients, instead of rebuilding the integration for each AI product."
  },
  {
    "kind": "table",
    "caption": "A condensed timeline",
    "headers": [
      "Period",
      "Development",
      "Why it mattered"
    ],
    "rows": [
      [
        "Before late 2024",
        "AI tool integrations were commonly built as product-specific plugins, custom function schemas, or framework adapters.",
        "Useful, but duplicated across vendors and difficult to reuse."
      ],
      [
        "November 25, 2024",
        "Anthropic introduced and open-sourced MCP.",
        "Created a public protocol and shared vocabulary for AI-to-system connections."
      ],
      [
        "2025",
        "Support expanded across AI assistants, development tools, frameworks, and infrastructure providers. OpenAI added remote MCP server support to the Responses API in May 2025.",
        "MCP moved beyond a single-vendor experiment and became a broader interoperability layer."
      ],
      [
        "December 2025",
        "Anthropic donated MCP to the Linux Foundation's Agentic AI Foundation.",
        "Neutral stewardship strengthened the protocol's position as an open ecosystem standard."
      ],
      [
        "2026",
        "The ecosystem expanded toward richer interfaces, production governance, and enterprise server offerings.",
        "MCP increasingly became a platform boundary, not merely a connector format."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "OpenAI announced support for remote MCP servers in its Responses API in May 2025 and stated that it had joined MCP steering efforts. Later that year, Anthropic donated the project to the Linux Foundation's Agentic AI Foundation, a move intended to preserve open and vendor-neutral governance. [9]"
  },
  {
    "kind": "paragraph",
    "text": "The historical pattern resembles earlier infrastructure standards: first, a painful collection of one-off integrations; then, a shared protocol; finally, an ecosystem of tooling, security practices, registries, gateways, and managed services. MCP is still evolving, but its direction is clear: it aims to make AI capability integration portable enough to become infrastructure. [10]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "3. What MCP Is - and What It Is Not",
    "id": "3-what-mcp-is-and-what-it-is-not"
  },
  {
    "kind": "paragraph",
    "text": "Model Context Protocol is an open protocol for connecting large-language-model applications to external data sources and executable tools. The official specification defines the requirements for clients and servers, while language-specific SDKs implement much of the lower-level message handling. [3]"
  },
  {
    "kind": "subhead",
    "text": "A precise definition"
  },
  {
    "kind": "paragraph",
    "text": "MCP is a standardized runtime interface that allows an AI host to discover contextual resources, reusable prompts, and executable tools exposed by one or more servers. It also defines lifecycle negotiation, message schemas, transports, notifications, and optional authorization behavior."
  },
  {
    "kind": "subhead",
    "text": "MCP is not..."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "An LLM: MCP connects models to capabilities; it does not generate language or perform reasoning by itself.",
      "An agent framework: it does not prescribe planning loops, memory strategies, reflection, or multi-agent orchestration.",
      "A replacement for REST, GraphQL, databases, or message brokers: MCP servers often wrap these existing systems.",
      "A guarantee of security: the protocol supplies structure, but secure deployment still requires strong engineering controls.",
      "A universal semantic model: two servers can expose similar tools with different names, descriptions, and schemas.",
      "A promise that every client supports every feature: implementations negotiate capabilities, and clients may present tools or approvals differently."
    ]
  },
  {
    "kind": "subhead",
    "text": "A USEFUL MENTAL MODEL"
  },
  {
    "kind": "paragraph",
    "text": "An API describes how software can access a service. MCP describes how an AI application can discover and use capabilities from a service in a model-aware, conversational workflow."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "4. The Problem MCP Solves",
    "id": "4-the-problem-mcp-solves"
  },
  {
    "kind": "paragraph",
    "text": "The core problem is sometimes called the N-by-M integration problem. Imagine N AI applications and M enterprise systems. Without a shared protocol, teams may need a custom adapter for each relevant pairing. Even when connectors share similar logic, authentication, schemas, error handling, deployment, and user approval are repeatedly implemented."
  },
  {
    "kind": "paragraph",
    "text": "MCP reduces that repetition by placing a stable protocol boundary around capabilities. A server owns the integration with the external system. A host owns the user experience, model interaction, approval flow, and context management. The MCP client connection translates between those two sides using a shared contract."
  },
  {
    "kind": "subhead",
    "text": "Why the word \"context\" matters"
  },
  {
    "kind": "paragraph",
    "text": "A model answers based on what appears in its current input context and what it learned during training. Real organizations, however, depend on information that is private, dynamic, and too large to place permanently in a prompt. MCP resources and tools allow the host to retrieve only what is needed at the moment, then feed the result back to the model."
  },
  {
    "kind": "paragraph",
    "text": "This can improve relevance and reduce context bloat, but MCP does not decide which information is truly relevant. Retrieval quality, tool descriptions, model behavior, and application policies still determine whether the right context reaches the model."
  },
  {
    "kind": "subhead",
    "text": "From read-only answers to controlled action"
  },
  {
    "kind": "paragraph",
    "text": "The second problem is action. Reading a policy document is different from changing a customer record. MCP tools can represent both retrieval and mutation, but production systems should treat them differently. Read operations can often be automatic within a permitted scope; write operations may require confirmation, stronger authorization, audit records, idempotency keys, or multi-step approval."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "5. MCP Architecture: Host, Client, and Server",
    "id": "5-mcp-architecture-host-client-and-server"
  },
  {
    "kind": "paragraph",
    "text": "MCP follows a client-server architecture, but its terminology is more specific than a conventional web application. The host is the AI application that interacts with the user and coordinates model behavior. For each server connection, the host creates an MCP client component. The MCP server exposes capabilities and communicates with that client. [2]"
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Participant",
      "Primary responsibility",
      "Typical examples"
    ],
    "rows": [
      [
        "MCP host",
        "Runs the AI experience, selects the model, manages context, presents approvals, and coordinates one or more client connections.",
        "AI assistant, IDE, desktop agent, enterprise copilot."
      ],
      [
        "MCP client",
        "Maintains a dedicated protocol session with one MCP server and translates host requests into MCP messages.",
        "A connection object inside the host application."
      ],
      [
        "MCP server",
        "Exposes tools, resources, and prompts backed by a local program or remote service.",
        "Filesystem connector, database gateway, ticketing integration, cloud- management server."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "One host, many servers"
  },
  {
    "kind": "paragraph",
    "text": "A single host can connect to several MCP servers at the same time. For example, an engineering assistant might connect to a Git server, an issue tracker, an observability platform, and an internal architecture repository. The host remains responsible for deciding how the combined capability list is shown to the model and user."
  },
  {
    "kind": "paragraph",
    "text": "The one-client-per-server relationship creates isolation boundaries. Credentials, sessions, and failures can be separated by connection. It also means the host must handle naming conflicts, tool selection, latency, and the risk that one untrusted server influences behavior involving another server."
  },
  {
    "kind": "subhead",
    "text": "Two protocol layers"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Data layer: JSON-RPC messages, lifecycle negotiation, tools, resources, prompts, client features, notifications, progress, and errors.",
      "Transport layer: the channel that moves those messages, including local stdio and remote Streamable HTTP."
    ]
  },
  {
    "kind": "paragraph",
    "text": "This separation matters because the same conceptual tool can work over a local process or a remote network endpoint without changing the high-level MCP primitive. Transport changes deployment and security requirements, not the meaning of the tool itself. [2]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "6. The Protocol Layer: JSON-RPC, Lifecycle, and Capabilities",
    "id": "6-the-protocol-layer-json-rpc-lifecycle-and-capabilities"
  },
  {
    "kind": "paragraph",
    "text": "MCP uses JSON-RPC 2.0 as its base message format. JSON-RPC defines requests, responses, notifications, method names, identifiers, parameters, results, and error objects. MCP adds domain-specific methods and schemas on top of that foundation. [2]"
  },
  {
    "kind": "subhead",
    "text": "Requests, responses, and notifications"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Request: asks the other participant to perform an operation and includes an identifier so the response can be correlated.",
      "Response: returns a result or structured error for a request.",
      "Notification: communicates an event without expecting a response, such as a list-change signal or progress update."
    ]
  },
  {
    "kind": "subhead",
    "text": "The connection lifecycle"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Initialization: the client proposes a protocol version and declares supported capabilities.",
      "Negotiation: the server returns its selected version, implementation information, and capabilities.",
      "Initialized state: the client signals that normal protocol operations can begin.",
      "Operation: the client lists and invokes primitives; either side may send supported notifications or requests.",
      "Termination: the connection or session is closed according to the transport and host lifecycle."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Capability negotiation prevents either side from assuming that an optional feature exists. A server may offer tools but not prompts. A host may support sampling but not elicitation. Robust implementations branch on negotiated capabilities rather than relying on optimistic assumptions."
  },
  {
    "kind": "subhead",
    "text": "Dynamic discovery"
  },
  {
    "kind": "paragraph",
    "text": "The protocol is designed for discovery. A client can request a list of tools, resources, or prompts and inspect structured metadata before using them. Servers can also notify clients that a list changed. This is more flexible than hard-coding every capability into the host, but it raises a governance question: should every newly advertised capability become immediately available to the model? In high-trust environments, the answer may be yes. In sensitive environments, new or changed capabilities should be reviewed, filtered, or policy-checked first."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "7. The Three Core Server Primitives",
    "id": "7-the-three-core-server-primitives"
  },
  {
    "kind": "paragraph",
    "text": "The most important MCP concepts are the three primitives that servers expose: tools, resources, and prompts. They are not interchangeable. Each has a different control model and should be designed for a different kind of interaction. [2]"
  },
  {
    "kind": "subhead",
    "text": "7.1 Tools: model-invoked functions"
  },
  {
    "kind": "paragraph",
    "text": "Tools are executable functions exposed to the model through the host. A tool has a name, a description, an input schema, and a result. Examples include querying a database, creating a ticket, calculating a price, reading a deployment status, or writing a file. In the official control hierarchy, tools are model-controlled: the model may decide that a tool is useful while answering the user. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Tool design strongly affects model behavior. A vague description such as \"manage data\" is difficult to use safely. A precise tool such as \"get_invoice_status(invoice_id)\" gives the model a narrower decision boundary. Input schemas should reject invalid shapes, and output should be structured enough for the host and model to interpret reliably."
  },
  {
    "kind": "subhead",
    "text": "DESIGN PRINCIPLE"
  },
  {
    "kind": "paragraph",
    "text": "Prefer small, intention-revealing tools over a single unrestricted \"execute anything\" tool. Narrow tools are easier to authorize, test, audit, and explain to users."
  },
  {
    "kind": "subhead",
    "text": "7.2 Resources: application-managed context"
  },
  {
    "kind": "paragraph",
    "text": "Resources represent contextual data that can be listed and read. A resource might be a file, database schema, knowledge article, repository history, configuration, or API response. Resources are application-controlled: the host decides how users discover, select, preview, or attach them to the model context. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Resources are especially useful when the content has an addressable identity, such as a URI, and when reading is conceptually different from performing an action. A well-designed resource includes useful metadata - title, description, media type, and freshness signals - so the client can present it intelligently."
  },
  {
    "kind": "subhead",
    "text": "7.3 Prompts: user-invoked workflow templates"
  },
  {
    "kind": "paragraph",
    "text": "Prompts are reusable, parameterized interaction templates. A prompt can encode a recommended workflow, domain instructions, few-shot examples, or a structured sequence that combines resources and tools. Prompts are user-controlled and normally require an explicit selection in the host interface. [3]"
  },
  {
    "kind": "paragraph",
    "text": "Prompts help server authors teach users how to get value from a capability without placing all domain guidance in tool descriptions. For example, a security server might offer a \"Review an API for common risks\" prompt that asks for an OpenAPI document, an environment, and a risk tolerance. The resulting messages can guide the model through a consistent analysis."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Primitive",
      "Control model",
      "Best used for",
      "Example"
    ],
    "rows": [
      [
        "Tool",
        "Model-controlled",
        "Actions and dynamic retrieval",
        "create_ticket, query_orders, restart_service"
      ],
      [
        "Resource",
        "Application-controlled",
        "Addressable context and reference data",
        "file://policy.pdf, db://schema/orders"
      ],
      [
        "Prompt",
        "User-controlled",
        "Reusable workflows and structured interactions",
        "review-code, plan-release, summarize-incident"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8. Client-Side Capabilities",
    "id": "8-client-side-capabilities"
  },
  {
    "kind": "paragraph",
    "text": "MCP is bidirectional. Servers do not only answer client requests; they may also use capabilities exposed by the client, when negotiated. These features enable richer workflows while keeping the host in control of the model and user experience. [2]"
  },
  {
    "kind": "subhead",
    "text": "Sampling"
  },
  {
    "kind": "paragraph",
    "text": "Sampling allows a server to request a language-model completion through the client. This helps server developers remain model-independent: the server can ask the host to reason over information without embedding a vendor-specific model SDK or possessing the user's model credentials. The host still decides whether and how to fulfill the request."
  },
  {
    "kind": "subhead",
    "text": "Elicitation"
  },
  {
    "kind": "paragraph",
    "text": "Elicitation allows a server to request more information or confirmation from the user through the host. A deployment tool might need a target environment; a purchasing workflow might need confirmation before creating an order. The host should present the request clearly and avoid turning elicitation into a hidden authorization bypass."
  },
  {
    "kind": "subhead",
    "text": "Roots and boundaries"
  },
  {
    "kind": "paragraph",
    "text": "Roots can communicate filesystem or workspace boundaries that the server may consider relevant. They are useful for local development tools, but they should not be treated as a complete sandbox. The server process still needs operating-system permissions, path validation, and protection against traversal or symlink-based escapes."
  },
  {
    "kind": "subhead",
    "text": "Logging and progress"
  },
  {
    "kind": "paragraph",
    "text": "Logging, notifications, cancellation, and progress reporting make long-running operations observable and interruptible. These details may seem secondary, but they are essential for production reliability. An AI agent that can start work but cannot explain progress, handle cancellation, or surface structured errors creates a poor and potentially unsafe user experience."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "9. Local and Remote Transports",
    "id": "9-local-and-remote-transports"
  },
  {
    "kind": "paragraph",
    "text": "The transport layer defines how MCP messages move between client and server. The stable specification describes two standard mechanisms: stdio and Streamable HTTP. [4]"
  },
  {
    "kind": "subhead",
    "text": "9.1 stdio: local process communication"
  },
  {
    "kind": "paragraph",
    "text": "With stdio, the host launches the MCP server as a subprocess. The server reads protocol messages from standard input and writes protocol messages to standard output. This approach is efficient for local tools because it avoids network overhead and allows the host to manage the server process lifecycle."
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Good fit: local filesystem access, developer tools, command-line integrations, personal automations.",
      "Credential pattern: environment variables, local configuration, or operating-system facilities rather than the HTTP authorization flow.",
      "Critical implementation rule: protocol messages must be the only content written to standard output; logs should go to standard error or a file."
    ]
  },
  {
    "kind": "subhead",
    "text": "9.2 Streamable HTTP: remote services"
  },
  {
    "kind": "paragraph",
    "text": "Streamable HTTP enables remote MCP servers. Clients send JSON-RPC messages through HTTP requests, while the server can return JSON responses or use Server-Sent Events for streaming. The design supports multiple client connections, server-to-client messages, resumability, and optional session identifiers. [4]"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Good fit: SaaS integrations, centrally managed enterprise connectors, cloud services, shared organization-wide tools.",
      "Operational concerns: authentication, TLS, origin validation, rate limiting, tenancy isolation, session security, observability, and network egress controls.",
      "Compatibility concern: older implementations may still use the deprecated HTTP plus SSE transport, so clients and servers may need a migration strategy."
    ]
  },
  {
    "kind": "table",
    "caption": "Choosing a transport",
    "headers": [
      "Question",
      "Prefer stdio when...",
      "Prefer Streamable HTTP when..."
    ],
    "rows": [
      [
        "Where does it run?",
        "The server is local to the user or workstation.",
        "The server is centrally hosted or internet-accessible."
      ],
      [
        "Who uses it?",
        "One host typically owns the process.",
        "Many clients or users need the same service."
      ],
      [
        "How are credentials handled?",
        "Local environment and process permissions are sufficient.",
        "OAuth, bearer tokens, gateways, and tenant-aware identity are required."
      ],
      [
        "What is the operational model?",
        "Simple local lifecycle and minimal latency.",
        "Scalable deployment, monitoring, policy, and remote availability."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "10. Authorization and Identity",
    "id": "10-authorization-and-identity"
  },
  {
    "kind": "paragraph",
    "text": "Authorization is optional at the protocol level, but it is rarely optional in a serious remote deployment. The stable MCP authorization specification is designed primarily for HTTP-based transports. For stdio, credentials are generally obtained through the local environment rather than the remote authorization protocol. [5]"
  },
  {
    "kind": "subhead",
    "text": "Authentication is not authorization"
  },
  {
    "kind": "paragraph",
    "text": "Authentication answers \"Who is this client or user?\" Authorization answers \"What may this identity do?\" A server that validates a token but ignores audience, scope, tenant, role, or resource ownership has not completed the security job."
  },
  {
    "kind": "subhead",
    "text": "Important identity boundaries"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "User to host: the AI application must know which user is asking and which organization or tenant applies.",
      "Host or client to MCP server: the server must validate that credentials were intended for it.",
      "MCP server to downstream API: the server may need delegated user tokens, service credentials, or an on- behalf-of flow.",
      "Tool to business object: authorization must still be checked at the record, project, account, or resource level."
    ]
  },
  {
    "kind": "paragraph",
    "text": "Token passthrough is especially dangerous. A server should not accept arbitrary tokens and forward them to another service without validating the intended audience and privileges. The official security guidance explicitly warns against accepting tokens that were not issued for the MCP server. [6]"
  },
  {
    "kind": "subhead",
    "text": "Consent and approval"
  },
  {
    "kind": "paragraph",
    "text": "Protocol authorization and user approval solve different problems. OAuth may prove that a user granted access to a service, while an in-conversation approval can confirm that the user wants a specific action now. High-impact tools often need both: durable permission plus contextual confirmation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "11. MCP Compared with APIs, Function Calling, RAG, and Agent Protocols",
    "id": "11-mcp-compared-with-apis-function-calling-rag-and-agent-protocols"
  },
  {
    "kind": "paragraph",
    "text": "MCP is easiest to understand by comparing it with adjacent technologies. It usually complements them rather than replacing them."
  },
  {
    "kind": "table",
    "caption": "",
    "headers": [
      "Technology",
      "Primary purpose",
      "Relationship to MCP"
    ],
    "rows": [
      [
        "REST or GraphQL API",
        "Expose application data and operations to software clients.",
        "An MCP server often wraps one or more APIs and presents AI-oriented tools or resources."
      ],
      [
        "Model function calling",
        "Let a specific model API return structured function-call arguments.",
        "MCP standardizes discovery and execution between hosts and external servers across model and vendor boundaries."
      ],
      [
        "RAG",
        "Retrieve relevant knowledge and place it in model context.",
        "An MCP server can expose search tools and resources that implement a RAG pipeline."
      ],
      [
        "Agent framework",
        "Manage planning, memory, loops, state, and orchestration.",
        "A framework can use MCP as its tool and context integration layer."
      ],
      [
        "Agent-to-agent protocol",
        "Enable agents to discover, delegate, and collaborate with other agents.",
        "MCP primarily connects AI applications to tools and context; agent collaboration protocols address a different boundary."
      ],
      [
        "Plugin system",
        "Extend one application with packaged capabilities.",
        "MCP can serve as the open protocol underneath a plugin or connector ecosystem."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "MCP versus direct function calling"
  },
  {
    "kind": "paragraph",
    "text": "Direct function calling works well when the application already owns a small, static tool set. The developer defines function schemas inside the model request and executes the chosen function in application code. MCP becomes more valuable when tools are external, dynamically discovered, shared across applications, independently deployed, or maintained by another team."
  },
  {
    "kind": "subhead",
    "text": "MCP versus RAG"
  },
  {
    "kind": "paragraph",
    "text": "RAG is an information-retrieval pattern, not an interoperability protocol. A RAG system decides how to index, rank, chunk, and retrieve knowledge. MCP can expose that retrieval capability as a tool or expose individual documents as resources. It does not guarantee that the underlying retrieval is accurate or that the returned context is sufficient."
  },
  {
    "kind": "subhead",
    "text": "MCP versus APIs"
  },
  {
    "kind": "paragraph",
    "text": "An API is usually designed for deterministic software clients that already know the endpoint and operation. An MCP server adds AI-oriented discovery metadata, tool schemas, prompts, resources, and protocol lifecycle behavior. The server still needs a real implementation behind it - often an API, database driver, command-line program, or business service."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12. Security Risks and Defensive Design",
    "id": "12-security-risks-and-defensive-design"
  },
  {
    "kind": "paragraph",
    "text": "MCP expands what an AI application can reach, so it also expands the consequences of mistakes. Security cannot be reduced to \"use OAuth\" or \"ask the user before tool calls.\" A complete design considers the model, host, server, transport, downstream systems, data, and human interface as separate trust boundaries."
  },
  {
    "kind": "subhead",
    "text": "12.1 Prompt injection and untrusted content"
  },
  {
    "kind": "paragraph",
    "text": "A tool or resource can return text that contains malicious instructions. The model may mistake that content for trusted guidance and attempt an unsafe action. This is indirect prompt injection: the attacker controls data rather than the user's visible prompt. Defenses include separating instructions from data, labeling provenance, restricting tool chains, filtering sensitive actions, and requiring approval for consequential operations."
  },
  {
    "kind": "subhead",
    "text": "12.2 Tool poisoning and misleading descriptions"
  },
  {
    "kind": "paragraph",
    "text": "The model selects tools partly from names and descriptions. A malicious or compromised server can advertise a tool in a way that manipulates selection or hides side effects. Hosts should display meaningful tool identity, origin, permissions, and action previews. Enterprise environments may need allowlists, signed packages, reviewed manifests, or a gateway that rewrites and filters exposed tool metadata."
  },
  {
    "kind": "subhead",
    "text": "12.3 Excessive privilege"
  },
  {
    "kind": "paragraph",
    "text": "A server that runs with broad filesystem, cloud, database, or administrative permissions converts a model error into a large incident. Use least-privilege credentials, read-only defaults, tenant and resource scoping, short- lived tokens, sandboxing, and separate servers for different privilege tiers."
  },
  {
    "kind": "subhead",
    "text": "12.4 Confused deputy problems"
  },
  {
    "kind": "paragraph",
    "text": "A server can become a confused deputy when it has authority that the requesting user does not. For example, a shared service account may access every customer record even though the user should see only one tenant. The server must preserve user identity and enforce business authorization instead of assuming that a valid MCP connection implies permission to every downstream action."
  },
  {
    "kind": "subhead",
    "text": "12.5 Server-Side Request Forgery"
  },
  {
    "kind": "paragraph",
    "text": "Remote authorization and metadata discovery may cause a client to fetch URLs supplied by another party. Without strict validation, an attacker can target internal network addresses, cloud metadata services, or local administrative endpoints. Official MCP security guidance recommends network controls and SSRF-resistant request handling. [6]"
  },
  {
    "kind": "subhead",
    "text": "12.6 DNS rebinding and local exposure"
  },
  {
    "kind": "paragraph",
    "text": "The Streamable HTTP specification requires origin validation for incoming connections and recommends binding local servers to localhost rather than every network interface. Without those protections, a malicious website could potentially interact with a local server through DNS rebinding techniques. [4]"
  },
  {
    "kind": "subhead",
    "text": "12.7 Data leakage and cross-server influence"
  },
  {
    "kind": "paragraph",
    "text": "A host connected to multiple servers may accidentally move information from a trusted resource into an untrusted tool call. The model can be the bridge. Hosts should classify data, restrict which tools can receive sensitive content, redact secrets, and apply policy before sending arguments to a server."
  },
  {
    "kind": "subhead",
    "text": "A practical defense checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Trust servers explicitly; do not auto-connect to arbitrary endpoints.",
      "Use least-privilege, short-lived credentials and validate token audience, issuer, scope, and tenant.",
      "Separate read-only and write capabilities; require confirmation for high-impact operations.",
      "Validate every input against a strict schema and independently validate business rules.",
      "Sanitize paths, URLs, shell arguments, SQL parameters, and file names.",
      "Run local servers in a sandbox or restricted operating-system account.",
      "Validate Origin for HTTP transports and bind local endpoints only to localhost.",
      "Restrict outbound network access and protect against SSRF and metadata-service access.",
      "Record tool identity, user identity, arguments, approvals, results, latency, and errors in an audit trail.",
      "Limit output size and handle untrusted content as data, not as privileged instructions.",
      "Test with malicious prompts, poisoned tool descriptions, malformed schemas, replay attempts, and cross-tenant scenarios.",
      "Provide users with clear previews, reversible actions, and meaningful error messages."
    ]
  },
  {
    "kind": "subhead",
    "text": "SECURITY PRINCIPLE"
  },
  {
    "kind": "paragraph",
    "text": "The model should propose; policy should decide; the server should enforce; and the user should understand consequential actions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "13. Practical Python Example: A Small MCP Server",
    "id": "13-practical-python-example-a-small-mcp-server"
  },
  {
    "kind": "paragraph",
    "text": "The following example shows a minimal local MCP server that exposes a read-only policy search tool. It uses the Python SDK's FastMCP helper, which can derive tool schemas from Python type hints and docstrings. The example is intentionally small so the protocol boundary is visible. [7]"
  },
  {
    "kind": "subhead",
    "text": "Step 1: Create the project"
  },
  {
    "kind": "paragraph",
    "text": "Terminal"
  },
  {
    "kind": "code",
    "text": "uv init policy-mcp-server\ncd policy-mcp-server\nuv add \"mcp[cli]\""
  },
  {
    "kind": "subhead",
    "text": "Step 2: Implement the server"
  },
  {
    "kind": "paragraph",
    "text": "policy_server.py"
  },
  {
    "kind": "code",
    "text": "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP(\"company-policy\")\n\nPOLICIES = {\n    \"external-api\": (\n        \"External APIs require OAuth 2.0, TLS, rate limiting, \"\n        \"centralized logging, and an approved threat model.\"\n    ),\n    \"data-retention\": (\n        \"Production logs must follow the approved retention schedule \"\n        \"and must not store secrets or full authentication tokens.\"\n    ),\n    \"change-management\": (\n        \"High-risk production changes require peer review, a rollback \"\n        \"plan, and a recorded change ticket.\"\n    ),\n}\n\n@mcp.tool()\ndef search_policies(query: str) -> str:\n    \"\"\"Search approved company policies using a short text query.\n\n    Args:\n        query: Words describing the policy topic to find.\n    \"\"\"\n    terms = query.lower().split()\n    matches = []\n\n    for name, text in POLICIES.items():\n        searchable = f\"{name} {text}\".lower()\n        if all(term in searchable for term in terms):\n            matches.append(f\"{name}: {text}\")\n\n    if not matches:\n        return \"No approved policy matched the query.\"\n\n    return \"\\n\".join(matches)\n\ndef main() -> None:\n    mcp.run(transport=\"stdio\")\n\nif __name__ == \"__main__\":\n    main()"
  },
  {
    "kind": "subhead",
    "text": "Step 3: Connect an MCP host"
  },
  {
    "kind": "paragraph",
    "text": "A compatible local host is configured to launch the server command. The exact configuration format depends on the host, but the essential information is the executable, working directory, and arguments. When the host starts the process, the stdio channel carries MCP JSON-RPC messages."
  },
  {
    "kind": "paragraph",
    "text": "Illustrative local configuration"
  },
  {
    "kind": "code",
    "text": "{\n  \"mcpServers\": {\n    \"company-policy\": {\n      \"command\": \"uv\",\n\n      \"args\": [\n        \"--directory\",\n        \"/absolute/path/to/policy-mcp-server\",\n        \"run\",\n        \"policy_server.py\"\n      ]\n    }\n  }\n}"
  },
  {
    "kind": "subhead",
    "text": "Step 4: Understand the runtime flow"
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "The host starts policy_server.py as a local process.",
      "The client and server initialize the MCP session and negotiate capabilities.",
      "The client lists tools and discovers search_policies with its generated input schema.",
      "The user asks, \"What controls apply to an external API?\"",
      "The model selects search_policies and supplies a query such as \"external API\".",
      "The host routes the call to the server, receives the policy text, and adds it to the model context.",
      "The model explains the policy to the user and can cite that retrieved result in the conversation."
    ]
  },
  {
    "kind": "subhead",
    "text": "What makes this an MCP integration?"
  },
  {
    "kind": "paragraph",
    "text": "The search function itself is ordinary Python. MCP adds the standardized discovery, schema, lifecycle, transport, and invocation boundary. The same server can be used by another compatible host without rewriting the search function as a vendor-specific plugin."
  },
  {
    "kind": "subhead",
    "text": "How to evolve the example"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Replace the in-memory dictionary with a document index or approved knowledge service.",
      "Expose policies as resources with stable URIs for direct reading and citation.",
      "Add a user-invoked prompt such as \"Create an external API compliance checklist.\"",
      "Return structured results with policy ID, version, owner, effective date, and source URI.",
      "Add tenant-aware authorization for a remote Streamable HTTP deployment.",
      "Use MCP Inspector to test discovery, inputs, results, errors, and notifications before connecting a production host."
    ]
  },
  {
    "kind": "paragraph",
    "text": "The official MCP Inspector provides an interactive environment for connecting to a server and examining its tools, resources, prompts, and notifications. It is one of the most useful tools for validating a server before integration. [8]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "14. Real-World Use Cases",
    "id": "14-real-world-use-cases"
  },
  {
    "kind": "subhead",
    "text": "Software engineering"
  },
  {
    "kind": "paragraph",
    "text": "An IDE or coding agent can use MCP servers to read repository history, inspect issues, query documentation, understand deployment status, or trigger controlled build operations. The benefit is contextual continuity: the assistant can reason over the same systems developers already use."
  },
  {
    "kind": "subhead",
    "text": "Enterprise knowledge"
  },
  {
    "kind": "paragraph",
    "text": "Organizations can expose policies, architecture decisions, product documentation, and support knowledge through resources and search tools. A centralized server can enforce access control and return authoritative metadata, reducing the temptation to copy entire private knowledge bases into prompts."
  },
  {
    "kind": "subhead",
    "text": "Customer support and operations"
  },
  {
    "kind": "paragraph",
    "text": "A support assistant can retrieve account context, inspect service status, summarize prior tickets, and draft a resolution. Write operations - refunds, account changes, escalations - can be represented as separate tools with explicit approval and audit requirements."
  },
  {
    "kind": "subhead",
    "text": "Data and analytics"
  },
  {
    "kind": "paragraph",
    "text": "An analytics server can expose database schemas as resources, query tools with bounded parameters, and prompts for standard reports. This can make natural-language analysis more portable, but unrestricted text-to- SQL should be avoided in sensitive production databases. A safer server exposes curated views, read-only roles, query limits, and result-size controls."
  },
  {
    "kind": "subhead",
    "text": "Cloud and infrastructure"
  },
  {
    "kind": "paragraph",
    "text": "Cloud-management MCP servers can help users inspect resources, diagnose incidents, and perform approved operations. Because the privilege level can be high, production designs should separate inventory tools from mutation tools, scope credentials by subscription or project, and require strong confirmation for changes."
  },
  {
    "kind": "subhead",
    "text": "Education and research"
  },
  {
    "kind": "paragraph",
    "text": "A learning assistant can connect to course materials, simulations, datasets, and citation libraries. MCP can make educational tools reusable across assistants, while resource metadata can help preserve provenance. The protocol does not replace academic judgment: the system must still distinguish primary sources, interpretations, and generated explanations."
  },
  {
    "kind": "subhead",
    "text": "Interactive agent experiences"
  },
  {
    "kind": "paragraph",
    "text": "The MCP ecosystem is also expanding beyond plain-text tool results. MCP Apps, introduced as an extension in 2026, allows tools to return sandboxed interactive interfaces that can be rendered inside compatible hosts. This points toward agents that combine conversation with charts, forms, document viewers, and direct manipulation. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "15. Design Principles for Production MCP Servers",
    "id": "15-design-principles-for-production-mcp-servers"
  },
  {
    "kind": "subhead",
    "text": "Design for model comprehension"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Use clear names that describe intent and avoid ambiguous abbreviations.",
      "Write descriptions that state purpose, side effects, limitations, and when not to use the tool.",
      "Keep schemas small, typed, and constrained with enums, formats, ranges, and required fields.",
      "Return structured, concise results; place large content behind resources or pagination.",
      "Use consistent error categories so the model can recover or ask the user for missing information."
    ]
  },
  {
    "kind": "subhead",
    "text": "Design for humans"
  },
  {
    "kind": "paragraph",
    "text": "Users should be able to understand what a tool will do before approving it. Tool names and argument previews should be readable, not merely technically correct. For destructive or expensive actions, show the target, scope, expected effect, and whether the action can be reversed."
  },
  {
    "kind": "subhead",
    "text": "Design for operations"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publish version and implementation metadata.",
      "Use timeouts, cancellation, retries with care, and idempotency for mutations.",
      "Record structured metrics for tool calls, latency, failures, approvals, and downstream dependencies.",
      "Protect against result flooding with size limits and pagination.",
      "Support graceful degradation when a downstream API is unavailable.",
      "Test compatibility against multiple clients because user-interface and approval behavior may differ."
    ]
  },
  {
    "kind": "subhead",
    "text": "Design for governance"
  },
  {
    "kind": "paragraph",
    "text": "Enterprise MCP programs need ownership. Every server should have a maintainer, data classification, approved scopes, dependency inventory, security review, incident process, and retirement plan. A registry or gateway"
  },
  {
    "kind": "paragraph",
    "text": "can make server discovery easier, but it should also communicate trust level and policy status rather than functioning as an unreviewed marketplace."
  },
  {
    "kind": "table",
    "caption": "A maturity model",
    "headers": [
      "Level",
      "Characteristics",
      "Primary goal"
    ],
    "rows": [
      [
        "1 - Experimental",
        "Local server, narrow read-only tool, manual configuration, developer-only use.",
        "Prove usefulness."
      ],
      [
        "2 - Controlled",
        "Defined schemas, basic approvals, logging, tests, restricted permissions.",
        "Reduce obvious risk."
      ],
      [
        "3 - Managed",
        "Central deployment, identity integration, policy enforcement, monitoring, documented ownership.",
        "Operate reliably at team scale."
      ],
      [
        "4 - Enterprise",
        "Tenant isolation, gateway controls, continuous security testing, change governance, audit integration.",
        "Scale across the organization."
      ],
      [
        "5 - Ecosystem",
        "Reusable servers across vendors and hosts, portable interactive experiences, measurable trust and compatibility.",
        "Achieve strategic interoperability."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "16. Limitations, Trade-offs, and Common Misconceptions",
    "id": "16-limitations-trade-offs-and-common-misconceptions"
  },
  {
    "kind": "subhead",
    "text": "Standardized transport is not standardized meaning"
  },
  {
    "kind": "paragraph",
    "text": "MCP can standardize how a tool is described and called, but it cannot ensure that every server describes equivalent business concepts in the same way. Organizations may still need naming conventions, domain schemas, semantic catalogs, and curated server design."
  },
  {
    "kind": "subhead",
    "text": "More tools can reduce reliability"
  },
  {
    "kind": "paragraph",
    "text": "A model presented with hundreds of overlapping tools may choose poorly, consume more context, or require extra routing logic. Hosts may need tool filtering, grouping, retrieval-based tool selection, or task-specific capability sets."
  },
  {
    "kind": "subhead",
    "text": "Protocol compatibility does not imply quality"
  },
  {
    "kind": "paragraph",
    "text": "A server can be valid MCP and still be slow, insecure, poorly documented, or semantically confusing. Production evaluation should include correctness, availability, authorization, data handling, observability, user experience, and resistance to adversarial inputs."
  },
  {
    "kind": "subhead",
    "text": "MCP does not make an agent autonomous"
  },
  {
    "kind": "paragraph",
    "text": "Tools increase what a system can do, but autonomy depends on the host's planning loop, model behavior, memory, policy, and approval design. A chat interface with one MCP search tool is connected, not necessarily autonomous. Conversely, an agent framework can be highly autonomous without MCP by using proprietary integrations."
  },
  {
    "kind": "subhead",
    "text": "Local does not automatically mean safe"
  },
  {
    "kind": "paragraph",
    "text": "A local stdio server can access sensitive files or execute commands with the user's permissions. Because it does not cross the public internet, teams may underestimate its risk. Local servers should still be reviewed, sandboxed, scoped, and monitored when they handle consequential data or actions."
  },
  {
    "kind": "subhead",
    "text": "The protocol will continue to evolve"
  },
  {
    "kind": "paragraph",
    "text": "MCP uses dated protocol versions and capability negotiation because features and requirements change. Developers should pin tested SDK versions, monitor specification changes, preserve backward compatibility where needed, and avoid assuming that draft features are universally supported."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "17. The Future of MCP and Its Broader Social Impact",
    "id": "17-the-future-of-mcp-and-its-broader-social-impact"
  },
  {
    "kind": "paragraph",
    "text": "MCP can influence more than developer convenience. A portable connection layer can reduce vendor lock-in: organizations may expose a capability once and allow users to access it through different compatible AI hosts. That shifts some power from the interface vendor toward the capability provider and the user."
  },
  {
    "kind": "paragraph",
    "text": "The protocol can also lower the cost of creating specialized assistants. A school, public institution, small business, or open-source community could publish a carefully scoped server that works across multiple AI applications. Shared standards can make useful integrations less dependent on exclusive partnerships."
  },
  {
    "kind": "paragraph",
    "text": "However, lower integration friction also lowers the friction of granting AI systems access to sensitive tools. Society will need better norms for consent, provenance, auditability, revocation, liability, and human control. The question is not only whether an agent can connect to a system, but who authorized the connection, what data crossed the boundary, what action occurred, and who can explain or reverse it."
  },
  {
    "kind": "paragraph",
    "text": "Neutral governance under the Linux Foundation's Agentic AI Foundation may help MCP develop as shared infrastructure rather than a feature owned by one model vendor. Its long-term success will depend on practical interoperability, secure defaults, clear standards, and the willingness of hosts and server providers to implement the protocol faithfully. [10]"
  },
  {
    "kind": "paragraph",
    "text": "The emergence of MCP Apps suggests another direction: interfaces themselves may become portable agent capabilities. Instead of navigating separate applications, users may increasingly work through a trusted AI host that renders the right interactive component at the right moment. This could simplify workflows, but it also increases the importance of sandboxing, provenance, and transparent user consent. [11]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18. Conclusion",
    "id": "18-conclusion"
  },
  {
    "kind": "paragraph",
    "text": "Model Context Protocol addresses one of the central engineering problems of connected AI: how to give models structured, reusable access to external context and actions without rebuilding every integration for every assistant. Its host-client-server architecture separates the user-facing AI application from the systems that provide tools, resources, and prompt workflows. JSON-RPC, capability negotiation, local and remote transports, and optional authorization create a common technical foundation."
  },
  {
    "kind": "paragraph",
    "text": "The protocol's greatest strength is interoperability. A well-designed MCP server can make a capability available to multiple compatible hosts, allowing teams to invest in one governed integration rather than many product- specific adapters. This makes MCP especially compelling for enterprise knowledge, developer tools, support operations, analytics, cloud management, and other domains where AI must work with live systems."
  },
  {
    "kind": "paragraph",
    "text": "Its greatest risk is also interoperability: a standard connector can make powerful capabilities easy to attach. Without least privilege, validation, isolation, approvals, identity preservation, and observability, a convenient tool layer can become an attack surface. MCP should therefore be treated as infrastructure, not as a shortcut around security architecture."
  },
  {
    "kind": "paragraph",
    "text": "My assessment is that MCP is likely to become a durable part of the agentic AI stack, not because it makes models smarter, but because it gives the industry a shared way to connect intelligence to useful systems. The winning implementations will not be the servers with the largest number of tools. They will be the ones that expose the right capabilities, with clear semantics, defensible permissions, reliable operations, and a user experience that keeps humans meaningfully in control."
  },
  {
    "kind": "subhead",
    "text": "FINAL THOUGHT"
  },
  {
    "kind": "paragraph",
    "text": "MCP turns the question from \"Can this model call my system?\" into a more important set of questions:"
  },
  {
    "kind": "paragraph",
    "text": "\"Through which standard, under whose authority, with what context, and with what safeguards?\""
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossary"
  },
  {
    "kind": "subhead",
    "text": "AI agent: An AI application that can reason, choose actions, and interact with tools or environments over multiple steps."
  },
  {
    "kind": "subhead",
    "text": "Capability negotiation: The initialization process through which client and server declare which optional protocol features they support."
  },
  {
    "kind": "subhead",
    "text": "Elicitation: A client capability that lets a server request additional information or confirmation from the user through the host."
  },
  {
    "kind": "subhead",
    "text": "Host: The AI application that manages the user experience, model, context, approvals, and MCP client connections."
  },
  {
    "kind": "subhead",
    "text": "JSON-RPC: A lightweight remote-procedure-call message format used as MCP's base data exchange protocol."
  },
  {
    "kind": "subhead",
    "text": "MCP client: The component inside a host that maintains a dedicated connection to one MCP server."
  },
  {
    "kind": "subhead",
    "text": "MCP server: A program or service that exposes tools, resources, and prompts through MCP."
  },
  {
    "kind": "subhead",
    "text": "Prompt: A reusable, user-invoked workflow template provided by a server."
  },
  {
    "kind": "subhead",
    "text": "Resource: Addressable context or data that a client can list or read."
  },
  {
    "kind": "subhead",
    "text": "Sampling: A client capability through which a server asks the host to generate a model completion."
  },
  {
    "kind": "subhead",
    "text": "stdio: A local transport that exchanges protocol messages through standard input and output."
  },
  {
    "kind": "subhead",
    "text": "Streamable HTTP: The standard remote MCP transport using HTTP requests and optional Server-Sent Events."
  },
  {
    "kind": "subhead",
    "text": "Tool: An executable function exposed by a server for model-selected retrieval or action."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "References",
    "id": "references"
  },
  {
    "kind": "subhead",
    "text": "[1] Anthropic - Introducing the Model Context Protocol. November 25, 2024."
  },
  {
    "kind": "subhead",
    "text": "[2] Model Context Protocol - Architecture Overview. Official conceptual architecture and protocol layers."
  },
  {
    "kind": "subhead",
    "text": "[3] Model Context Protocol Specification - 2025-11-25. Stable protocol specification used for this article."
  },
  {
    "kind": "subhead",
    "text": "[4] Model Context Protocol Specification - Transports. stdio and Streamable HTTP requirements."
  },
  {
    "kind": "subhead",
    "text": "[5] Model Context Protocol Specification - Authorization. Authorization requirements for HTTP-based deployments."
  },
  {
    "kind": "subhead",
    "text": "[6] Model Context Protocol - Security Best Practices. Official attack scenarios and implementation guidance."
  },
  {
    "kind": "subhead",
    "text": "[7] Model Context Protocol - Build an MCP Server. Official SDK tutorial and FastMCP example."
  },
  {
    "kind": "subhead",
    "text": "[8] Model Context Protocol - MCP Inspector. Official server testing and debugging tool."
  },
  {
    "kind": "subhead",
    "text": "[9] OpenAI - New Tools and Features in the Responses API. Remote MCP support announcement, May 21, 2025."
  },
  {
    "kind": "subhead",
    "text": "[10] Anthropic - Donating MCP and Establishing the Agentic AI Foundation. Open governance announcement, December 9, 2025."
  },
  {
    "kind": "subhead",
    "text": "[11] Model Context Protocol Blog - MCP Apps. Interactive UI extension announcement, January 26, 2026."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Search and Publishing Notes",
    "id": "search-and-publishing-notes"
  },
  {
    "kind": "paragraph",
    "text": "Recommended meta title: What Is Model Context Protocol (MCP)? Complete Guide to Servers, Architecture, and Security"
  },
  {
    "kind": "paragraph",
    "text": "Recommended meta description: Learn what Model Context Protocol (MCP) is, how MCP servers and clients work, its architecture, tools, resources, prompts, security risks, and how to build a simple MCP server in Python."
  },
  {
    "kind": "paragraph",
    "text": "Primary keyword: Model Context Protocol (MCP)"
  },
  {
    "kind": "paragraph",
    "text": "Supporting keywords: what is MCP, MCP server, MCP client, MCP architecture, MCP tools, MCP resources, MCP prompts, AI agents, LLM integration, MCP security, build an MCP server, Python MCP server, AI tool integration."
  },
  {
    "kind": "subhead",
    "text": "THE BIG LEARN"
  },
  {
    "kind": "paragraph",
    "text": "Deep technical learning for a connected world"
  }
];
