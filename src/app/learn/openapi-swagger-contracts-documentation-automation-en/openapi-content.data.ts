import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const OPENAPI_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "From design to runtime: the contract as the platform’s axis"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/en/overview.svg",
    "alt": "OpenAPI contract connecting design, quality, automation, execution, documentation and governance",
    "caption": "Opening Figure - The OpenAPI contract connects design, implementation, testing, documentation and operation."
  },
  {
    "kind": "paragraph",
    "text": "The same description guides documentation, validation, security, compatibility and publication."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "In previous chapters, REST was studied as an architectural style and the Richardson Maturity Model was used to observe resources, HTTP semantics and hypermedia. The next step is to transform these decisions into an explicit, reviewable and tool-processable contract. The OpenAPI Specification, often associated with the name Swagger for historical reasons, provides a standardized language for describing HTTP interfaces without relying on a specific programming language."
  },
  {
    "kind": "paragraph",
    "text": "An OpenAPI Description is not just a documentation page. When complete and coherent, it records paths, operations, parameters, bodies, representations, responses, headers, data models, security requirements and server information. This document can feed developer portals, validators, mocks, client generators, contract tests, gateway policies, catalogs, and compatibility analysis engines."
  },
  {
    "kind": "paragraph",
    "text": "In enterprise environments, contract value increases because multiple teams rely on the same API. The consumer needs to know what they can send and receive; the backend developer needs to implement the agreed interface; the gateway team needs to publish and secure operations; security needs to evaluate authentication schemes; tests need to build scenarios; and governance needs to detect incompatible changes. Without a common source, each area creates its own interpretation and divergence appears late, usually during staging or production."
  },
  {
    "kind": "paragraph",
    "text": "This chapter uses the OpenAPI 3 family as a reference. The document structure, the relationship with JSON Schema, the use of YAML and JSON, reusable references, security, examples, callbacks, webhooks, design-first, code-first, linting, semantic diff, artifact generation and integration with API Gateways will be covered. The emphasis is on producing accurate contracts, not just files that go through a visual editor."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "Keep an OpenAPI editor open and validate each example. For each operation, ask: what resource is being represented, what inputs are required, what responses are possible, how are errors modeled, what security applies, and how will a tool distinguish compatible change from breaking change?"
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
      "Explain the purpose of the OpenAPI Specification and differentiate specification, description, contract, documentation and implementation.",
      "Distinguish OpenAPI from Swagger and recognize the historical and current role of these terms.",
      "Build the root structure of an OpenAPI Description in YAML or JSON.",
      "Describe paths, operations, parameters, requestBody, responses, headers and media types.",
      "Model data with Schema Objects, composition, restrictions, nullability and discrimination.",
      "Reuse elements with components and references without creating cycles or fragile dependencies.",
      "Declare API keys, HTTP authentication, OAuth 2.0, OpenID Connect and mTLS in the contract.",
      "Compare design-first, code-first and hybrid approaches with technical and organizational criteria.",
      "Apply parsing, linting, diff, mocking, SDK generation and contract testing in pipelines.",
      "Integrate OpenAPI with portals, catalogs, API Gateways and governance processes."
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
      "12.1 What is OpenAPI and what problem does it solve",
      "12.2 OpenAPI and Swagger: related but different terms",
      "12.3 OpenAPI Description as executable contract",
      "12.4 Document root structure",
      "12.5 YAML, JSON and serialization rules",
      "12.6 info, servers, tags and externalDocs",
      "12.7 paths, Path Item and Operation Object",
      "12.8 Path, query, header and cookie parameters",
      "12.9 requestBody, content and media types",
      "12.10 Responses, headers, links and errors",
      "12.11 Schema Object and JSON Schema",
      "12.12 Constraints, composition and polymorphism",
      "12.13 components, $ref and modularization",
      "12.14 Security in the contract",
      "12.15 Examples, callbacks and webhooks",
      "12.16 Design-first, code-first and hybrid approach",
      "12.17 Parsing, validation and linting",
      "12.18 Mock servers, generation of SDKs and stubs",
      "12.19 Contract and compliance testing",
      "12.20 Compatibility and breaking changes",
      "12.21 OpenAPI 3.0, 3.1 and 3.2",
      "12.22 Portals, catalogs and API Gateways",
      "12.23 Governance and CI/CD",
      "12.24 Troubleshooting",
      "12.25 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.1 What is OpenAPI and what problem does it solve",
    "id": "12-1-what-is-openapi-and-what-problem-does-it-solve"
  },
  {
    "kind": "paragraph",
    "text": "The OpenAPI Specification, or OAS, defines a standardized, language-independent way to describe HTTP APIs. The resulting document is called the OpenAPI Description. It can be read by people, but its defining characteristic is that it is structured enough for programs to discover operations, data, and requirements without inspecting the service's source code or observing network traffic."
  },
  {
    "kind": "paragraph",
    "text": "The central problem solved is interface ambiguity. Documentation written in text only may state that the value field is numeric, but not say whether it accepts negatives, how many decimal places are allowed, whether it is mandatory or how errors are represented. In OpenAPI, these rules can be expressed by types, formats, limits, patterns, enumerations, required, content types and responses associated with each operation."
  },
  {
    "kind": "paragraph",
    "text": "The specification does not implement the service and does not guarantee that the runtime will fulfill the contract. It describes the expected interface. Compliance depends on controlled generation, message validation, testing, and observability. It also does not define the business logic: knowing that POST/transferencias accepts a structure does not explain how balance, anti-fraud, limits or compensation are calculated."
  },
  {
    "kind": "paragraph",
    "text": "OAS is particularly useful on platforms with multiple consumers because it allows you to separate the public interface from the internal backend structure. A service can change database, classes, framework or topology without changing the contract. When an interface change is necessary, tools can compare versions and indicate potential breaks before publication."
  },
  {
    "kind": "subhead",
    "text": "Mental model"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describes what a consumer can observe and use in the HTTP interface. Code implements this behavior; tests verify correspondence; gateway and portal publish and govern the interface. None of these elements replaces the others."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.2 OpenAPI and Swagger: related but different terms",
    "id": "12-2-openapi-and-swagger-related-but-different-terms"
  },
  {
    "kind": "paragraph",
    "text": "Swagger was the name of the original project created to describe RESTful APIs and provide tools such as a documentation interface, code generation, and editor. In 2015, the specification was donated to the OpenAPI Initiative and began to be developed as the OpenAPI Specification. The Swagger 2.0 version became the basis for OpenAPI 2.0; later lines officially adopted the name OpenAPI 3.x."
  },
  {
    "kind": "paragraph",
    "text": "Today, Swagger usually designates an ecosystem of tools and products that work with OpenAPI, while OpenAPI designates the specification. Expressions like Swagger file still appear in projects, but they can be imprecise: it is necessary to know whether the document is in Swagger/OpenAPI 2.0 or OpenAPI 3.x, because the structure of servers, requestBody, content, components and security has changed significantly."
  },
  {
    "kind": "paragraph",
    "text": "The distinction avoids integration errors. A tool that only supports Swagger 2.0 does not necessarily understand OpenAPI 3.1. Similarly, a visual interface called Swagger UI can render an OpenAPI Description without the service being generated by Swagger or using any specific library. The contract belongs to the organization and must remain portable."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Vocabulary that reduces ambiguities in projects and integrations.",
    "headers": [
      "Term",
      "Recommended use",
      "Note"
    ],
    "rows": [
      [
        "OpenAPI Specification",
        "Standard that defines the language and objects of the description.",
        "It has versions and normative documents."
      ],
      [
        "OpenAPI Description",
        "Concrete API document, in YAML or JSON.",
        "It can be single or distributed across multiple files."
      ],
      [
        "Swagger 2.0",
        "Historical name often associated with OpenAPI 2.0.",
        "Structure different from OAS 3.x."
      ],
      [
        "Swagger tooling",
        "Editors, UI, generators and libraries.",
        "Tools are not the specification."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.3 OpenAPI Description as executable contract",
    "id": "12-3-openapi-description-as-executable-contract"
  },
  {
    "kind": "paragraph",
    "text": "The term enforceable contract indicates that the description can participate in the engineering cycle, not just be published at the end. A parser checks whether the YAML or JSON forms a valid document; a validator checks specification rules; a linter enforces organizational conventions; a generator produces stubs or SDKs; a mock responds according to examples; and a test compares real messages with declared schemas."
  },
  {
    "kind": "paragraph",
    "text": "Executable does not mean perfectly complete. Complex business rules, dependencies between fields, contextual authorization, and side effects may require additional testing or extensions. Still, the more precise the description, the greater the number of automatic checks possible. Vague descriptions, with object-type schemas without properties or generic default responses, provide little protection."
  },
  {
    "kind": "paragraph",
    "text": "In governance, the contract makes the review objective. Instead of just evaluating separate screenshots or documents, the team reviews a versioned change. Pull requests record who changed the interface, which rules failed, which impact was detected, and which approvals occurred. This trail is especially important in external APIs that are regulated or shared across many domains."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/en/figure-01.svg",
    "alt": "Contract pipeline with pull request, parser, linter, diff, testing and publishing",
    "caption": "Figure 1 - A contract pipeline transforms the description into repeatable controls before publishing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.4 Document root structure",
    "id": "12-4-document-root-structure"
  },
  {
    "kind": "paragraph",
    "text": "The root of an OpenAPI Description is the OpenAPI Object. The openapi field informs the version of the specification used by the document. The info object identifies the API and contract version. paths describe endpoints and operations; components stores reusable objects; security can apply global requirements; tags organize operations; servers indicates base URLs; externalDocs points to additional material. In recent versions, webhooks may also appear in the root."
  },
  {
    "kind": "paragraph",
    "text": "Not all fields are required in all versions, but a minimum useful document needs to go beyond syntactic validity. A description without operations, responses or schemas can be accepted by a parser and still be inappropriate for consumers. The quality criteria must consider whether the interface can be understood, tested and evolved."
  },
  {
    "kind": "paragraph",
    "text": "Specification extensions typically begin with x-, such as x-owner-team or x-gateway-policy. They allow you to transport non-standard metadata, but create coupling with tools. An extension must have an owner, schema, version, documentation and compatibility policy; otherwise, the contract becomes a container of arbitrary configurations."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/en/figure-02.svg",
    "alt": "OpenAPI Object anatomy with info, servers, paths, components, security and tags",
    "caption": "Figure 2 - Main areas of the OpenAPI Object and their responsibilities."
  },
  {
    "kind": "code",
    "text": "Expanded minimum document\nopenapi: 3.1.1\ninfo:\n  title: Customers API\n  version: 1.4.0\nservers:\n  - url: https://api.company.example/customers/v1\npaths:\n  /customers/{customerId}:\n    get:\n      operationId: getCustomer\n      responses:\n        '200':\n          description: Customer found\ncomponents:\n  schemas: {}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.5 YAML, JSON and serialization rules",
    "id": "12-5-yaml-json-and-serialization-rules"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI can be serialized into JSON or YAML. The two formats represent the same logical structure, but have different risks. JSON is explicit in quotes, braces and brackets; YAML is more readable for manual editing, but it depends on indentation and has features that can vary between parsers. In both cases, field names, types and values ​​must respect the OAS version."
  },
  {
    "kind": "paragraph",
    "text": "In YAML, tabs should not be used for indentation, strings with special characters may require quotation marks, and values such as yes, no, on or dates may be interpreted in unexpected ways by older implementations. Response codes should be treated as strings, for example '200'. A path that contains a colon, hash, or braces must be reviewed to avoid misinterpretation."
  },
  {
    "kind": "paragraph",
    "text": "The organization must standardize UTF-8 encoding, line endings, logical ordering and formatting. An automatic formatter reduces noisy diffs and conflicts. Comments are useful for authors, but they are not part of the semantic model consumed by all tools; Essential information must be in description, summary or defined extensions."
  },
  {
    "kind": "subhead",
    "text": "Rule of thumb for YAML"
  },
  {
    "kind": "paragraph",
    "text": "Use two spaces per level, never tabs; enclose status codes in quotation marks; avoid ambiguous implicit types; limit lines; and run parser and linter on the same commit. A visually aligned file can still represent unexpected types."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.6 info, servers, tags and externalDocs",
    "id": "12-6-info-servers-tags-and-externaldocs"
  },
  {
    "kind": "paragraph",
    "text": "The info object provides human identity to the contract. title must distinguish the API; version represents the version of the description or interface, according to the declared convention; description explains scope, audience, limits and assumptions; contact and license record responsibility and conditions of use. The version in info is not the OAS version, which remains in the openapi field."
  },
  {
    "kind": "paragraph",
    "text": "servers lists base URLs and can contain variables. A description can present production, staging, and sandbox, but publishing internal endpoints in an external contract can expose topology. In many organizations, the canonical contract uses a logical URL and the portal injects the environment. Variables must have defaults and coherent enumerations to avoid invalid combinations."
  },
  {
    "kind": "paragraph",
    "text": "Tags group operations by capability or domain. They should not reproduce the structure of teams or controllers automatically if this harms the consumer experience. externalDocs are used for materials that do not fit into the contract, such as onboarding guides, business rules, runbooks or legal policies. External links need a lifecycle and monitoring to avoid becoming broken references."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Metadata is also part of experience and governance.",
    "headers": [
      "Element",
      "Question that answers",
      "Frequent error"
    ],
    "rows": [
      [
        "info",
        "What API is this, who maintains it and what version is published?",
        "Version without convention or omit owner."
      ],
      [
        "servers",
        "On what bases can the interface be called?",
        "Mix indoor and outdoor environments."
      ],
      [
        "tags",
        "How are operations grouped for discovery?",
        "Copy class or squad names."
      ],
      [
        "externalDocs",
        "Where are the supplementary guides and rules?",
        "Point maintenance-free documents."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.7 paths, Path Item and Operation Object",
    "id": "12-7-paths-path-item-and-operation-object"
  },
  {
    "kind": "paragraph",
    "text": "paths is a map whose keys represent path templates. Each Path Item can contain operations such as get, post, put, patch and delete, as well as shared parameters. The path describes the structure relative to the base URL; query string should not be embedded in the key. /customers/{customerId} represents an identified resource, while filters belong to parameters."
  },
  {
    "kind": "paragraph",
    "text": "Each Operation Object must communicate intent. summary offers a short sentence; description records details; operationId creates a stable identifier used by generators; tags organize; parameters and requestBody describe inputs; responses describe results; security can override the global rule; deprecated signals deprecation without immediately removing the operation."
  },
  {
    "kind": "paragraph",
    "text": "operationId must be unique throughout the document and stable over time. Generators often turn it into a method name. Renaming it can break SDKs even when URL and HTTP remain the same. Paths should also avoid ambiguities such as /customers/{id} and /customers/active at the same level when the router can treat active as an identifier value."
  },
  {
    "kind": "paragraph",
    "text": "The contract must document relevant success and failure responses. Declaring only 200 hides validation, authentication, authorization, conflict, limitation and unavailability. On the other hand, listing all possible HTTP codes unrelated to the operation creates noise. The selection should reflect behaviors that consumers need to address."
  },
  {
    "kind": "code",
    "text": "Path Item and GET operation\npaths:\n  /customers/{customerId}:\n    parameters:\n      - $ref: '#/components/parameters/CustomerId'\n    get:\n      tags: [Customers]\n      summary: Gets a customer\n      operationId: getCustomer\n      responses:\n        '200':\n          $ref: '#/components/responses/CustomerFound'\n        '404':\n          $ref: '#/components/responses/NotFoundProblem'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.8 Path, query, header and cookie parameters",
    "id": "12-8-path-query-header-and-cookie-parameters"
  },
  {
    "kind": "paragraph",
    "text": "The Parameter Object describes values carried in path, query, header or cookie. name and in form the identity of the parameter. Path parameters are always mandatory because the template cannot be resolved without the value. Query parameters represent filters, pagination, ordering or projection; headers carry metadata; Cookies are less common in machine-to-machine enterprise APIs."
  },
  {
    "kind": "paragraph",
    "text": "schema defines the type and constraints. style and explode control the serialization of arrays and objects, a detail often ignored. A status array can be sent as status=ACTIVE&status;=BLOCKED, as status=ACTIVE,BLOCKED, or in other ways. Without declaring the strategy, clients and servers may produce incompatible representations despite agreeing on the logical type."
  },
  {
    "kind": "paragraph",
    "text": "Parameters should not duplicate body information without an explicit precedence rule. HTTP-standardized headers do not need to be redefined inconsistently. Correlation identifiers, idempotency keys and conditional versions can be declared, but the semantics must appear in the description and, when possible, be associated with schemas, examples and responses."
  },
  {
    "kind": "table",
    "caption": "Table 3 - Location changes parameter serialization and semantics.",
    "headers": [
      "Location",
      "Typical usage",
      "Care"
    ],
    "rows": [
      [
        "path",
        "Mandatory identity at the resource address.",
        "required=true and exact match to the template."
      ],
      [
        "query",
        "Filters, pagination, sorting and optional fields.",
        "Define array serialization, defaults and limits."
      ],
      [
        "header",
        "Correlation, idempotence, preferences and preconditions.",
        "Avoid duplicating reserved headers or sensitive data."
      ],
      [
        "cookie",
        "State associated with the client in specific scenarios.",
        "Assess security, domain, SameSite and API style suitability."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.9 requestBody, content and media types",
    "id": "12-9-requestbody-content-and-media-types"
  },
  {
    "kind": "paragraph",
    "text": "In OpenAPI 3, request bodies are described by requestBody. The content field maps media types to schemas and examples. This allows the same operation to accept different representations, such as application/json and application/xml, as long as the behavior is actually supported. Declaring media types just to fill out documentation creates false expectations and expands the testing and security surface."
  },
  {
    "kind": "paragraph",
    "text": "required indicates whether the body is mandatory. The schema describes structure, but does not replace operational limits such as maximum size, supported compression or upload rules. multipart/form-data requires modeling parts and their types; application/octet-stream represents binary content; JSON files typically need clear encoding and metadata."
  },
  {
    "kind": "paragraph",
    "text": "The contract must distinguish absence of property, null value and empty string. This difference impacts creation, full update and PATCH. In partial updates, a missing field can mean keep value, while null can mean remove. Semantics are not automatically inferred by schema and must be documented."
  },
  {
    "kind": "code",
    "text": "JSON body with schema and example\nrequestBody:\n  required: true\n  content:\n    application/json:\n      schema:\n        $ref: '#/components/schemas/NewTransfer'\n      examples:\n        pixTransfer:\n          value:\n            sourceAccount: '000123'\n            amount: 125.90\n            destinationKey: customer@example.com"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.10 Responses, headers, links and errors",
    "id": "12-10-responses-headers-links-and-errors"
  },
  {
    "kind": "paragraph",
    "text": "responses is mandatory in every operation and maps status codes or ranges to Response Objects. Each response has a description and can include headers, content and links. The description must explain the meaning of that response in the context of the operation, not just repeat the generic phrase from the HTTP code."
  },
  {
    "kind": "paragraph",
    "text": "Response headers such as Location, ETag, Retry-After, RateLimit or correlation identifiers are part of the observable contract. Location in a creation indicates the resource created; ETag participates in caching and preconditions; Retry-After guides retry; Throttling headers must have semantics standardized by the organization. Documenting them allows for more realistic client generation and testing."
  },
  {
    "kind": "paragraph",
    "text": "Errors must have a consistent model. A structure inspired by Problem Details can register type, title, status, detail, instance and domain extensions. The contract needs to differentiate validation error, authentication, authorization, conflict and unavailability. Returning 200 with a success=false field reduces the ability of intermediaries and clients to apply the HTTP semantics studied in previous chapters."
  },
  {
    "kind": "paragraph",
    "text": "Links in the Response Object describe how values from a response can feed into another operation. They are not identical to the hypermedia links sent in the payload, but they help tools understand relationships and flows. For complex journeys, the organization can complement OpenAPI with specifications for workflows, tests or documentation."
  },
  {
    "kind": "code",
    "text": "Explicit success and failure responses\nresponses:\n  '201':\n    description: Transfer accepted\n    headers:\n      Location:\n        schema: { type: string, format: uri-reference }\n    content:\n      application/json:\n        schema:\n          $ref: '#/components/schemas/Transfer'\n  '422':\n    $ref: '#/components/responses/ValidationProblem'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.11 Schema Object and JSON Schema",
    "id": "12-11-schema-object-and-json-schema"
  },
  {
    "kind": "paragraph",
    "text": "The Schema Object describes the form and constraints of data used in parameters, bodies, and responses. In the OpenAPI 3.1 line, the model has been broadly aligned with the JSON Schema Draft 2020-12. This allows you to use validation and composition keywords more consistently, although tools may implement subsets or have differences in support."
  },
  {
    "kind": "paragraph",
    "text": "Basic types include string, number, integer, boolean, object, array, and null, depending on the applicable dialect. properties defines object members; required lists required names; additionalProperties controls undeclared fields; items describes array elements; enum and const limit values; minimum, maximum, minLength, pattern and formats refine validation."
  },
  {
    "kind": "paragraph",
    "text": "format normally works as a semantic annotation, and its validation depends on the tool and configuration. Declaring format: date-time does not guarantee that all parsers will reject invalid values. Critical contracts must test real examples and messages with the same implementation used in the pipeline or runtime."
  },
  {
    "kind": "paragraph",
    "text": "Overly permissive schemes weaken the contract. additionalProperties: true may be fine for dynamic maps, but in stable DTOs it allows unknown fields and makes it difficult to detect typos. In contrast, closing all objects without an evolution strategy can turn compatible additions into breaks for strictly validating consumers."
  },
  {
    "kind": "code",
    "text": "Object schema with constraints\ncomponents:\n  schemas:\n    Customer:\n      type: object\n      additionalProperties: false\n      required: [id, name, status]\n      properties:\n        id:\n          type: string\n          pattern: '^[0-9]{10}$'\n        name:\n          type: string\n          minLength: 1\n          maxLength: 120\n        status:\n          type: string\n          enum: [ACTIVE, BLOCKED, CLOSED]"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.12 Constraints, composition and polymorphism",
    "id": "12-12-constraints-composition-and-polymorphism"
  },
  {
    "kind": "paragraph",
    "text": "allOf, anyOf, oneOf and not allow you to compose schemas. allOf requires the instance to satisfy all subschemes and is often used to combine structures; oneOf requires exactly one valid alternative; anyOf accepts one or more; not rejects the indicated schema. Usage must consider how validators and generators interpret the composition."
  },
  {
    "kind": "paragraph",
    "text": "allOf should not be automatically treated as object-oriented inheritance. It represents intersection of constraints. If two subschemes define incompatible properties, composition may become impossible. Generators can produce different classes for the same contract; therefore, the priority is the semantics of the instance, not the desired structure in the code."
  },
  {
    "kind": "paragraph",
    "text": "The discriminator helps select alternatives for a property, but it does not replace oneOf or itself validate all cases. Mappings need to point to existing schemas and values ​​must be stable. Polymorphism without a discriminator may depend on mutually exclusive formats, which increases validation costs and can generate difficult error messages."
  },
  {
    "kind": "paragraph",
    "text": "JSON Schema conditional constraints, when supported, allow you to express relationships such as: if type is COMPANY, then cnpj is mandatory. Before adopting them, check support from publishers, gateways, generators and validators. A theoretically correct contract may be impractical if critical tools ignore the keyword."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Composition requires precision and testing with real tools.",
    "headers": [
      "Keyword",
      "Semantics",
      "Trap"
    ],
    "rows": [
      [
        "allOf",
        "The instance must satisfy all schemas.",
        "Confusing intersection with class inheritance."
      ],
      [
        "oneOf",
        "Exactly one alternative must be valid.",
        "Overlapping alternatives validate more than one."
      ],
      [
        "anyOf",
        "One or more alternatives may be valid.",
        "Consumer does not know which representation he received."
      ],
      [
        "discriminator",
        "Helps choose schema by property.",
        "Incomplete mapping or unstable values."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.13 components, $ref and modularization",
    "id": "12-13-components-ref-and-modularization"
  },
  {
    "kind": "paragraph",
    "text": "components stores schemas, responses, parameters, examples, requestBodies, headers, securitySchemes, links, callbacks and other reusable objects. Reuse reduces duplication and allows you to apply corrections at one point. However, global components are not used automatically: they need to be referenced by the operation or another object."
  },
  {
    "kind": "paragraph",
    "text": "$ref replaces the object where it appears with a reference to another component or document, according to the version rules. Internal references use JSON Pointer, such as #/components/schemas/Cliente. External references can point to files or network resources. Identity, relative resolution, character encoding, and access policy need to be controlled for reproducible builds."
  },
  {
    "kind": "paragraph",
    "text": "Splitting a contract into many files improves organization, but increases the complexity of resolving and packaging. Bundling brings together resources while maintaining references; dereferencing replaces references with content, which can increase size and create problems with cycles. The publishing tool must produce a form compatible with portal, gateway and consumers without losing the modular source."
  },
  {
    "kind": "paragraph",
    "text": "Enterprise schema libraries can promote consistency, but also couple domains and hinder evolution. Shared components must represent truly stable concepts, have versioning and prevent a change in a central file from breaking dozens of APIs. Reuse due to structural coincidence is more dangerous than conscious duplication."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/en/figure-03.svg",
    "alt": "References connecting an operation to reusable responses and schemas",
    "caption": "Figure 3 - $ref connects operations to reusable components, but governance needs to control identity and evolution."
  },
  {
    "kind": "subhead",
    "text": "Avoid the universal component"
  },
  {
    "kind": "paragraph",
    "text": "A Person schema used by customer, employee, attorney and beneficiary tends to accumulate optional fields and contradictory rules. Prefer operation context-oriented models and only share elements with truly common semantics."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.14 Security in the contract",
    "id": "12-14-security-in-the-contract"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describes security mechanisms by Security Scheme Objects and enforces requirements by Security Requirement Objects. Common schemes include apiKey, http, oauth2, openIdConnect, and mutualTLS in the versions that support it. The description tells how the consumer presents credentials, but does not contain secrets or implement authentication."
  },
  {
    "kind": "paragraph",
    "text": "A global requirement can be defined at the root and overridden per operation. A list of requirements represents logical alternatives; Multiple schemas on the same object represent combination. This syntax needs to be reviewed carefully: declaring OAuth or API key as alternatives is different from requiring both."
  },
  {
    "kind": "paragraph",
    "text": "OAuth 2.0 must inform flows, authorizationUrl, tokenUrl and applicable scopes. OpenID Connect uses the discovery URL. Bearer tokens are described as HTTP bearer, with bearerFormat just as a hint. mTLS describes certificate authentication, but details of truststore, issuance, revocation and subject mapping remain in operational policies."
  },
  {
    "kind": "paragraph",
    "text": "Do not put real tokens, keys, passwords or certificates in examples, descriptions or extensions. Contracts are copied to repositories, portals, and artifacts. Test data also needs to be synthetic to avoid exposing personal information or secrets."
  },
  {
    "kind": "code",
    "text": "OAuth 2.0 combined with mTLS\ncomponents:\n  securitySchemes:\n    CorporateOAuth:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes:\n            customers.read: Read customers\n    ClientCertificate:\n      type: mutualTLS\nsecurity:\n  - CorporateOAuth: [customers.read]\n    ClientCertificate: []"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.15 Examples, callbacks and webhooks",
    "id": "12-15-examples-callbacks-and-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "Examples make the contract concrete and feed documentation, mocks and tests. A schema can have example, and media objects can have named examples. Examples must be valid according to the schema, cover representative cases and avoid real data. An outdated example generates more confusion than its absence, so it should be automatically validated."
  },
  {
    "kind": "paragraph",
    "text": "Callbacks describe requests that the provider will make to a URL provided during an operation. The callback path can use an expression that extracts the URL of the request or response. They are useful in asynchronous processing, but require modeling callback authentication, retries, idempotency, availability, and URL validation to prevent abuse of outgoing connections."
  },
  {
    "kind": "paragraph",
    "text": "Webhooks defined at the root describe requests initiated by the provider without depending on a specific operation that registers the URL. The description informs the message contract, but the signature, replay protection, delivery, ordering and replay policy require additional documentation. Consumers should consider that events may arrive duplicated or out of order."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI describes individual operations well, but journeys with multiple calls and dependencies may require additional specifications, test scenarios, or workflow documents. Don't force every temporal rule into long descriptions; use governed references and executable examples."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.16 Design-first, code-first and hybrid approach",
    "id": "12-16-design-first-code-first-and-hybrid-approach"
  },
  {
    "kind": "paragraph",
    "text": "In design-first, the contract is drafted and reviewed before implementation. This allows you to involve consumers, architecture, security and gateway while changes are still cheap. Mocks can unlock parallel development. The risk is that the contract will move away from the code if the team does not automate compliance."
  },
  {
    "kind": "paragraph",
    "text": "In code-first, the service is implemented and the description is generated from annotations, reflection or metadata. The approach reduces initial duplication and tends to follow code types, but can expose framework details, produce unstable operationIds, omit errors and make it difficult to review the experience before development. The contract now reflects what was codified, not necessarily what should be public."
  },
  {
    "kind": "paragraph",
    "text": "The hybrid approach defines a canonical contract, generates part of the code, and validates the runtime against it. You can also extract the code description and submit it to rules and approval as an artifact. The essential point is to establish a source of truth: when contract and code diverge, which one is corrected and which pipeline prevents publication?"
  },
  {
    "kind": "paragraph",
    "text": "The choice must consider team maturity, release cycle, number of consumers, need for mocks, tool support and governance. In external or widely shared APIs, design-first often offers greater control. In simple internal services, code-first may be acceptable as long as the published contract is stable and reviewed."
  },
  {
    "kind": "table",
    "caption": "Table 5 - The approach is a process decision, not just a tool decision.",
    "headers": [
      "Approach",
      "Main strength",
      "Main risk",
      "Necessary control"
    ],
    "rows": [
      [
        "Design-first",
        "Early review and parallel work.",
        "Divergence between contract and runtime.",
        "Conformity testing and controlled generation."
      ],
      [
        "Code-first",
        "Proximity to types and implementation.",
        "Contract coupled to the framework and late.",
        "Linting, diff and review of the generated artifact."
      ],
      [
        "Hybrid",
        "Combines canonical contract and automation.",
        "Complex flow with no clear source of truth.",
        "Explicit precedence and pipeline policy."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.17 Parsing, validation and linting",
    "id": "12-17-parsing-validation-and-linting"
  },
  {
    "kind": "paragraph",
    "text": "Parsing checks whether YAML or JSON can be read. Structural validation checks whether the objects comply with the OAS version. Reference resolution confirms that targets exist. Schema validation analyzes keywords and examples. Linting applies style, governance, and quality rules that the specification does not require, such as unique operationId, minimum descriptions, naming convention, and mandatory responses."
  },
  {
    "kind": "paragraph",
    "text": "These steps must be separated because they produce different diagnoses. A document can be syntactically valid and structurally invalid; may be valid by OAS and disprove corporate rules; can pass the linter and have an external reference unavailable. Pipeline messages must indicate file, object path, rule, severity, and suggested fix."
  },
  {
    "kind": "paragraph",
    "text": "Linting rules must have justification and versioning. Turning every preference into a blocking error creates friction and encourages exceptions. Classify rules into error, warning and information; provide traceable suppression mechanism; review false positives; and measure which rules prevent actual incidents or incompatibilities."
  },
  {
    "kind": "paragraph",
    "text": "Validation must occur locally, in the pull request and before publication. Using different parser versions at each step produces inconsistent results. Fix versions, record checksums when necessary and update tools through a controlled process."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.18 Mock servers, generation of SDKs and stubs",
    "id": "12-18-mock-servers-generation-of-sdks-and-stubs"
  },
  {
    "kind": "paragraph",
    "text": "A mock server interprets the contract and returns simulated responses. It allows consumers to develop before the backend, demonstrates the API in portals, and runs isolated integration tests. The mock can choose explicit examples or generate values ​​from schemas. Automatically generated values ​​do not always represent realistic business cases, so named examples are important."
  },
  {
    "kind": "paragraph",
    "text": "Generators transform operations and schemas into clients, models, or server stubs. The result depends on operationId, schema names, nullability, composition and formats. Seemingly cosmetic changes can rename methods or types. Before adopting mass generation, the team must evaluate code quality, extensibility, error handling, authentication, retries and version updates."
  },
  {
    "kind": "paragraph",
    "text": "Generated SDKs must not hide HTTP semantics in dangerous ways. A method that throws the same exception for 400, 404, and 409 prevents consumer decisions. The generator or templates need to preserve status, headers, error body and correlation. It is also necessary to define who publishes the SDK, how it is versioned and how vulnerabilities in dependencies are fixed."
  },
  {
    "kind": "paragraph",
    "text": "Server stubs accelerate scaffolding, but do not implement business rules, security, or observability. Generated code must be isolated from manual extensions to allow regeneration. Directly changing generated files creates conflicts and makes future updates unpredictable."
  },
  {
    "kind": "subhead",
    "text": "A mock is not a staging environment"
  },
  {
    "kind": "paragraph",
    "text": "A mock proves that the consumer understands the simulated contract. It does not prove that the actual backend complies with semantics, authorization, performance, consistency, or side effects. Use mock for parallelism and quick testing, and complement it with compliance against real environments."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.19 Contract and compliance testing",
    "id": "12-19-contract-and-compliance-testing"
  },
  {
    "kind": "paragraph",
    "text": "Contract testing verifies that observable messages and behaviors match the description. On the provider side, real responses can be validated against status, media type and schema. On the consumer side, generated requests can be validated before sending. Negative tests confirm rejection of invalid fields, formats, and states."
  },
  {
    "kind": "paragraph",
    "text": "Runtime validation needs to balance security and cost. Validating all large payloads can increase latency and CPU consumption; validating only samples may not block violations. A common strategy combines full validation in testing and staging, selective protection at the gateway, and observability in production. Sensitive data must be masked in error logs."
  },
  {
    "kind": "paragraph",
    "text": "Compliance is not just schema. A response can have valid structure and incorrect status; a POST may return 200 instead of 201; a GET can modify state; a mandatory header may be missing; an operation can accept undeclared media type. Tests need to cover HTTP semantics, security, and compatibility rules."
  },
  {
    "kind": "paragraph",
    "text": "Consumer-driven contracts capture specific consumer expectations, while OpenAPI describes the general interface. The approaches can complement each other: OpenAPI is the broad source and consumer contracts validate critical interactions. It is necessary to prevent particular expectations from impeding legitimate evolution for everyone."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.20 Compatibility and breaking changes",
    "id": "12-20-compatibility-and-breaking-changes"
  },
  {
    "kind": "paragraph",
    "text": "A breaking change is one that could cause a previously compatible consumer to stop working. Removing path, operation, parameter, property or response is an obvious case. Making an optional field mandatory, restricting enum, reducing limit, changing type or changing security can also break. Additive changes are often compatible, but depend on consumer behavior."
  },
  {
    "kind": "paragraph",
    "text": "Adding response property can break clients that reject unknown fields. Adding new enum value may break exhaustive switches. Adding 429 response may reveal a new operating condition. Making validation stricter may reject previously accepted data. Therefore, semantic diff needs to be combined with robustness policies and ecosystem knowledge."
  },
  {
    "kind": "paragraph",
    "text": "Contract versioning must distinguish the OAS version, the document version in info.version and the interface version exposed in the URL or header. Without this distinction, teams update openapi: 3.1.1 and believe they have created a new business version. The convention needs to define when major, minor and patch are changed and how deprecation is communicated."
  },
  {
    "kind": "paragraph",
    "text": "Deprecating involves marking deprecated, publishing replacement, measuring usage, notifying consumers, offering deadline and removing only after criteria. A portal can display warning, but the gateway and observability need to identify who still calls the operation. Contract without telemetry does not inform the real impact of the removal."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Compatibility depends on data direction and consumer behavior.",
    "headers": [
      "Change",
      "Probable classification",
      "Why"
    ],
    "rows": [
      [
        "Remove operation",
        "Breaker",
        "Clients fail to find the endpoint."
      ],
      [
        "Add optional property in response",
        "Potentially compatible",
        "Strict clients may reject unknown fields."
      ],
      [
        "Add value to response enum",
        "Potentially disruptive",
        "Consumer may not deal with the new case."
      ],
      [
        "Relax input minLength",
        "Compatible for customers",
        "Server now accepts larger set."
      ],
      [
        "Make optional parameter mandatory",
        "Breaker",
        "Existing requests become invalid."
      ],
      [
        "Add example",
        "Non-breaking",
        "Does not change validation, if the example is already valid."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.21 OpenAPI 3.0, 3.1 and 3.2",
    "id": "12-21-openapi-3-0-3-1-and-3-2"
  },
  {
    "kind": "paragraph",
    "text": "Line 3.0 profoundly reorganized the model in relation to version 2.0, introducing servers, components, requestBody and content per media type. Line 3.1 brought Schema Object closer to JSON Schema Draft 2020-12, allowed expressing null as a type, added jsonSchemaDialect and refined several interoperability points."
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI 3.2.0 was published as a further evolution of the specification. Adoption in corporate environments must consider real support from publishers, generators, validators, portals and gateways. Just because a version is published does not mean that every toolchain will implement it immediately."
  },
  {
    "kind": "paragraph",
    "text": "Migration should not be done just by changing the value of the openapi field. Keywords, nullability, examples, references, and tool behavior may change. Perform controlled conversion, validate the resulting description, compare generated artifacts and test imports on all critical components."
  },
  {
    "kind": "paragraph",
    "text": "When a gateway supports only one previous version, keep a canonical source and a proven transform rather than manually editing two descriptions. Document losses of expressiveness. A conversion that drops webhooks, callbacks, types, or constraints may produce documentation that appears to be correct but semantically incomplete."
  },
  {
    "kind": "table",
    "caption": "Table 7 - The contract version must be chosen based on the capacity of the complete chain.",
    "headers": [
      "Line",
      "Relevant features",
      "Operational attention"
    ],
    "rows": [
      [
        "3.0.x",
        "OAS 3 model with components, requestBody and content.",
        "Schema Object has differences from the full JSON Schema."
      ],
      [
        "3.1.x",
        "Greater alignment with JSON Schema 2020-12 and explicit dialect.",
        "Old tools may interpret nullability and keywords differently."
      ],
      [
        "3.2.x",
        "Published evolution of OAS.",
        "Confirm end-to-end support before adopting as canonical format."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.22 Portals, catalogs and API Gateways",
    "id": "12-22-portals-catalogs-and-api-gateways"
  },
  {
    "kind": "paragraph",
    "text": "Developer portals render operations, schemas, and examples from the contract. A well-organized description reduces duplicate documentation and allows for interactive exploration. However, the test interface must handle authentication, CORS, environments, and data securely. Enabling production calls directly in the browser may be inappropriate for sensitive operations."
  },
  {
    "kind": "paragraph",
    "text": "Catalogs use metadata for discovery, ownership, data classification, domain, lifecycle and dependencies. Part of this data may be in x-extensions, but the organization must avoid coupling the contract to a specific catalog unnecessarily. An external metadata layer can complement the OAS and preserve portability."
  },
  {
    "kind": "paragraph",
    "text": "API Gateways often import OpenAPI to create routes, methods, policies, or products. The import does not replace backend configuration, timeouts, authentication, transformations and observability. There may also be differences between what the gateway accepts and the canonical version. The pipeline must validate the transformation before applying changes in production."
  },
  {
    "kind": "paragraph",
    "text": "The publication must be idempotent and traceable. The same commit must generate the portal artifact, gateway configuration, and test evidence. Manual changes to the console cause drift: the contract says one thing, the gateway executes another. Exporting configuration and comparing state helps detect divergences."
  },
  {
    "kind": "subhead",
    "text": "Contract is not complete gateway policy"
  },
  {
    "kind": "paragraph",
    "text": "OpenAPI can declare interface and expected security, but rate limiting, quotas, circuit breakers, transformations, routing, logging, and threat protection typically require additional configuration. Extensions can help, as long as they are standardized and portable when possible."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.23 Governance and CI/CD",
    "id": "12-23-governance-and-ci-cd"
  },
  {
    "kind": "paragraph",
    "text": "Effective governance turns standards into automated feedback. The repository must contain the canonical source, lint rules, examples, changelog and ownership. Pull requests execute parser, resolution, linter, example validation, compatibility diff, tests and preview generation. Approvals may vary according to risk: a textual correction does not require the same flow as a removal from operation."
  },
  {
    "kind": "paragraph",
    "text": "Policies need to distinguish universal requirements from per-domain conventions. Every API may require unique operationId, explicit security and error model; pagination or idempotency key depend on the operation. Overly generic rules produce artificial contracts and extensions to bypass the standard."
  },
  {
    "kind": "paragraph",
    "text": "Artifacts should be immutable and promoted across environments. Regenerating the contract at each stage may introduce differences. Sign or record checksum, associate version with commit and preserve validation report. When the gateway transforms the description, it also stores the actually imported artifact."
  },
  {
    "kind": "paragraph",
    "text": "Governance metrics can include response coverage, percentage of operations with examples, violations per rule, review time, blocked breaking changes, deviating runtime contracts, and use of deprecated operations. Metrics should guide improvement, not encourage superficial filling."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/openapi-contracts/en/figure-04.svg",
    "alt": "Governance pipeline reducing divergence between contract, portal, gateway and runtime",
    "caption": "Figure 4 - Automation reduces divergence and maintains evidence of the promoted contract."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.24 Troubleshooting",
    "id": "12-24-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "When a tool rejects the contract, first identify the fault layer: invalid YAML/JSON, OAS rule, unresolved reference, JSON Schema keyword, unknown extension, or product-specific limitation. Testing the same file in multiple editors without registering versions can be confusing as each implementation has different coverage."
  },
  {
    "kind": "paragraph",
    "text": "Reference errors require checking URI base, relative path, JSON Pointer, character encoding, and resource availability. In isolated environments, external HTTP references may fail. Packaging dependencies or using an internal registry makes builds reproducible. Cycles may be valid for recursive models, but some generators do not support them."
  },
  {
    "kind": "paragraph",
    "text": "When documentation and runtime diverge, capture the real request and response, identify the operation by method and path, validate media type and schema, check the deployed version and compare contract commit. The problem could be in the backend, gateway, transformation, portal cache, or old artifact. Hash and build identifier exposed in metadata help correlate."
  },
  {
    "kind": "paragraph",
    "text": "Gateway import failures need to be reproduced with the exact artifact. Check accepted OAS version, size, extensions, complex schemas, duplicate operationIds, incompatible paths and security schemes. Do not simplify the contract manually without recording what was lost; create automated transformation and regression testing."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Diagnosis must separate specification validity, tool support and runtime compliance.",
    "headers": [
      "Symptom",
      "Initial hypothesis",
      "Evidence"
    ],
    "rows": [
      [
        "Editor does not open the file",
        "YAML/JSON syntax or excessive size.",
        "Local parser, line/column and encoding."
      ],
      [
        "$ref not found",
        "Relative base, pointer or file missing.",
        "URI resolved and bundle generated."
      ],
      [
        "SDK changes names unexpectedly",
        "operationId or unstable schema name.",
        "Contract diff and generator configuration."
      ],
      [
        "Portal shows old version",
        "Unpromoted cache or artifact.",
        "Checksum, commit and publication timestamp."
      ],
      [
        "Gateway ignores restriction",
        "Importer does not support keyword.",
        "Support matrix and effective configuration."
      ],
      [
        "Actual response fails schema",
        "Runtime drift or incorrect schema.",
        "Masked payload and validation report."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "12.25 Case studies and labs",
    "id": "12-25-case-studies-and-labs"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case study 1 - contract generated after backend"
  },
  {
    "kind": "paragraph",
    "text": "One team implemented endpoints and generated OpenAPI by annotations. The published contract contained only 200 responses, schemas without required, and operationIds derived from Java method names. After internal refactoring, SDKs were regenerated with different names and consumers needed to change code despite URLs and payloads remaining the same."
  },
  {
    "kind": "paragraph",
    "text": "The fix was to stabilize operationIds, model error responses, declare mandatory and submit the generated artifact to diff and review. The case shows that code-first does not eliminate contract design; it just shifts the point at which it needs to be controlled."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case study 2 - partial import into gateway"
  },
  {
    "kind": "paragraph",
    "text": "An OpenAPI 3.1 contract used JSON Schema keywords not recognized by the gateway importer. The import ended without a serious error, but some restrictions were discarded. The portal showed the full schema while the runtime accepted broader messages."
  },
  {
    "kind": "paragraph",
    "text": "The team created a transformation step for the supported version, published a loss report, and maintained validation of critical messages in a supported component. Regression tests began to compare the canonical contract, the transformed artifact and the effective behavior."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 1 - build and validate a client API"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Create info, servers and tags for a fictional client API.",
      "Describe GET /customers/{customerId} and POST /customers with stable operationIds.",
      "Model Customer, NewClient and Problem Details in components/schemas.",
      "Include parameters, examples, responses 201, 400, 401, 404, 409 and 500 according to the defined behavior.",
      "Run parser, structural validation and linter; correct each diagnosis by recording the cause."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - detect breaking changes"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Create an initial version of the contract and generate a customer.",
      "Remove one property, make another mandatory, and add a response enum value.",
      "Perform a semantic diff and classify each change by data direction.",
      "Restore compatibility or propose a new major version with deprecation plan."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 3 - publish with mock and gateway"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Start a mock server from the examples and validate a simple consumer.",
      "Generate a bundle for import and compare it to the modular source.",
      "Import into an authorized gateway or simulator environment and record ignored fields.",
      "Compare a real response with the schema and produce a compliance report."
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
    "text": "OpenAPI provides a standardized language for describing HTTP interfaces in a readable and processable way. The contract connects consumers, backend, testing, documentation, portal, gateway and governance. Its value depends on the precision of paths, operations, parameters, bodies, responses, schemas and security."
  },
  {
    "kind": "paragraph",
    "text": "The description does not replace implementation or guarantee compliance. Parsing, validation, linting, examples, testing and observability are necessary to keep the contract and runtime aligned. Reuse with components and $ref reduces duplication, but requires identity control, modularization and compatibility."
  },
  {
    "kind": "paragraph",
    "text": "Design-first, code-first, and hybrid approaches can work when there is a source of truth and a pipeline that blocks disagreements. Breaking changes need to be detected semantically and evaluated by actual consumer behavior. The OAS version, contract version, and public API version are distinct concepts."
  },
  {
    "kind": "paragraph",
    "text": "On enterprise platforms, OpenAPI must be treated as a governed artifact: versioned, reviewed, validated, promoted and correlated with the state of the gateway and portal. A file that just renders in a UI is not enough; the goal is a trusted contract that reduces ambiguity and enables secure automation."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "After formalizing the contract with OpenAPI, the course can delve deeper into versioning, compatibility, governance and API lifecycle, connecting design decisions to publishing, deprecation and operation at scale."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Checklist for reviewing an OpenAPI Description",
    "id": "checklist-for-reviewing-an-openapi-description"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "The openapi version is supported by parser, portal, generator and gateway used in the pipeline.",
      "info identifies API, version, responsible and scope without confusing OAS version.",
      "Each operation has a summary, unique operationId, tags, relevant inputs and responses.",
      "Parameters have coherent location, mandatory, schema and serialization.",
      "Request bodies and responses declare actually supported media types.",
      "Schemas have types, required, limits and strategy for unknown fields.",
      "Errors follow common model and preserve secure status, correlation, and details.",
      "Security schemes and requirements correctly represent alternatives and combinations.",
      "Examples are synthetic, valid and automatically tested.",
      "References are resolvable and the published bundle is reproducible.",
      "The compatibility diff is performed against the currently supported version.",
      "Portal, gateway and runtime can be correlated to the same commit and checksum."
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
      "Explain why a valid OpenAPI Description can still be a weak contract.",
      "Differentiate OpenAPI Specification, OpenAPI Description, Swagger 2.0 and Swagger UI.",
      "Model the PATCH /customers/{id} operation and describe the difference between a missing field and null.",
      "Create a Parameter Object for a status list and choose style/explode, justifying the serialization.",
      "Model responses 200, 304, 404, and 412 for a conditional GET with ETag.",
      "Compare allOf and oneOf and present a case where overlapping alternatives make oneOf invalid.",
      "Describe how to simultaneously require OAuth 2.0 and mTLS and how to declare alternatives.",
      "Classify as compatible or breaking the addition of an optional property in response.",
      "Propose governance pipeline for design-first contract published on an API Gateway.",
      "Explain how to investigate a discrepancy between portal documentation and actual response."
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
        "OAS",
        "OpenAPI Specification, standard for describing HTTP APIs."
      ],
      [
        "OAD",
        "OpenAPI Description, concrete document that describes an API."
      ],
      [
        "OpenAPI Object",
        "Description root object."
      ],
      [
        "Path Item",
        "Object associated with a path template and its operations."
      ],
      [
        "Operation Object",
        "Description of a specific HTTP operation."
      ],
      [
        "Schema Object",
        "Data structure and restrictions on parameters and messages."
      ],
      [
        "JSON Schema",
        "Vocabulary for describing and validating JSON documents."
      ],
      [
        "$ref",
        "Reference to another object or document."
      ],
      [
        "Bundling",
        "Packaging of documents maintaining references."
      ],
      [
        "Dereferencing",
        "Replacing references with referenced content."
      ],
      [
        "Linting",
        "Application of quality and governance rules."
      ],
      [
        "Semantic diff",
        "Comparison that considers the impact of the contract, not just the text."
      ],
      [
        "mock server",
        "Simulated server based on the contract and examples."
      ],
      [
        "Design-first",
        "Process in which the contract precedes implementation."
      ],
      [
        "Code-first",
        "Process in which the contract is derived from the code."
      ],
      [
        "Drift",
        "Divergence between contract, published configuration and runtime."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Integrated contract example",
    "id": "annex-a-integrated-contract-example"
  },
  {
    "kind": "paragraph",
    "text": "The following excerpt brings together the central elements studied: metadata, server, path, operation, parameter, security, response and reusable schema. It is purposefully compact and should be expanded with specific errors, examples, and rules before actual use."
  },
  {
    "kind": "code",
    "text": "Consolidated YAML example\nopenapi: 3.1.1\ninfo:\n  title: Customers API\n  version: 1.0.0\nservers:\n  - url: https://api.company.example/customers/v1\npaths:\n  /customers/{customerId}:\n    get:\n      operationId: getCustomer\n      security:\n        - CorporateOAuth: [customers.read]\n      parameters:\n        - name: customerId\n          in: path\n          required: true\n          schema: { type: string, pattern: '^[0-9]{10}$' }\n      responses:\n        '200':\n          description: Customer found\n          content:\n            application/json:\n              schema: { $ref: '#/components/schemas/Customer' }\n        '404': { $ref: '#/components/responses/NotFound' }\ncomponents:\n  securitySchemes:\n    CorporateOAuth:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: https://id.example/oauth2/token\n          scopes: { customers.read: Read customers }\n  schemas:\n    Customer:\n      type: object\n      required: [id, name, status]\n      properties:\n        id: { type: string }\n        name: { type: string, maxLength: 120 }\n        status: { type: string, enum: [ACTIVE, BLOCKED] }"
  },
  {
    "kind": "subhead",
    "text": "How to use attachment"
  },
  {
    "kind": "paragraph",
    "text": "Validate the snippet, generate documentation, start a mock and then add authentication, authorization, validation, conflict and unavailability responses. Then run a diff after changing enum, required, and schemas to observe the impact."
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
      "OpenAPI Initiative. OpenAPI Specification 3.2.0. Normative document published on September 19th. 2025.",
      "OpenAPI Initiative. OpenAPI Specification 3.1.1. Normative document published on October 24th. 2024.",
      "OpenAPI Initiative. Learn OpenAPI - Introduction, Structure, Paths, Components, Security, Referencing and Best Practices.",
      "JSON Schema. Draft 2020-12 - Core and Validation specifications.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9111 - HTTP Caching.",
      "IETF. RFC 9457 - Problem Details for HTTP APIs.",
      "Fielding, Roy T. Architectural Styles and the Design of Network-based Software Architectures. 2000.",
      "OpenAPI Initiative. Arazzo Specification 1.1.0, for describing call sequences and dependencies."
    ]
  },
  {
    "kind": "subhead",
    "text": "Note on versions"
  },
  {
    "kind": "paragraph",
    "text": "Tool specification and support evolve. Before adopting features from a version, consult the official documentation and test the entire chain: editor, parser, linter, generator, portal, gateway and runtime. This material prioritizes durable principles and uses the OpenAPI 3 family as its foundation."
  }
];
