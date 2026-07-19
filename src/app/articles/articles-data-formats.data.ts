import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 16, 2026',
  publishedIso: '2026-07-16',
  modifiedIso: '2026-07-16T00:00:00-03:00'
};

export const DATA_FORMAT_TOOL_ARTICLES: ToolArticle[] = [
  {
    publishedAt: 'July 17, 2026',
    publishedIso: '2026-07-17',
    modifiedIso: '2026-07-17T00:00:00-03:00',
    slug: 'swagger-openapi-specification-guide',
    toolName: 'Swagger Viewer & Editor',
    toolRoute: '/swagger-editor',
    title: 'Swagger and OpenAPI: History, Versions and Technical Differences',
    description: 'The history of Swagger and OpenAPI, who standardizes the specification, and the technical differences between Swagger 2.0, OpenAPI 3.0 and 3.1.',
    keywords: 'swagger, openapi, openapi specification, swagger 2.0, openapi 3.0, openapi 3.1, swagger vs openapi, api documentation, api description, openapi initiative, swagger history, convert swagger to openapi',
    category: 'APIs',
    image: '/assets/articles/swagger-editor-cover.png',
    imageAlt: 'Split view of a glowing OpenAPI document in YAML next to rendered API endpoints with colored HTTP method badges',
    imageWidth: 1672,
    imageHeight: 941,
    readingTime: '14 min read',
    introduction: [
      'Every HTTP API raises the same questions: which paths exist, which parameters do they accept, what do responses look like and how is the caller authenticated. Swagger — today formalized as the OpenAPI Specification — answers those questions with a machine-readable contract. The same YAML or JSON document drives interactive documentation, client and server code generation, request validation, mock servers and automated tests.',
      'This article traces where Swagger came from, explains who standardizes OpenAPI today, and then goes deep into the technical differences between Swagger 2.0, OpenAPI 3.0 and OpenAPI 3.1 — including what you gain and what you lose when moving a document from one version to another.',
      'You can follow along interactively: the utily.tools Swagger Viewer & Editor loads the classic Petstore contract, lets you edit it visually or as code, converts it between Swagger 2.0, OpenAPI 3.0 and 3.1 in either YAML or JSON, and even sends real requests to the described endpoints — all in the browser.'
    ],
    theoryTitle: 'From Swagger to OpenAPI: a short history',
    theory: [
      'Swagger was created around 2010–2011 by Tony Tam at Wordnik, an online dictionary company that needed a way to describe and document its own REST APIs. The specification was open-sourced together with a toolchain that made it popular far beyond Wordnik: Swagger UI rendered interactive documentation from the contract, and Swagger Codegen generated client and server code. Describing an API once and deriving documentation, SDKs and test consoles from that single source was the idea that made Swagger the de facto standard.',
      'In 2015 SmartBear Software acquired the Swagger assets and, in November of the same year, donated the specification to the newly created OpenAPI Initiative, an open-governance project hosted by the Linux Foundation with founding members including Google, Microsoft, IBM, PayPal and others. The specification itself was renamed: Swagger 2.0 became the OpenAPI Specification, and the name "Swagger" now formally refers to SmartBear\'s tooling family (Swagger UI, Swagger Editor, SwaggerHub). In everyday conversation, however, "a swagger" still usually means "an OpenAPI document".',
      'Under the OpenAPI Initiative the specification evolved in the open: OpenAPI 3.0.0 arrived in July 2017 with a restructured document model, OpenAPI 3.1.0 in February 2021 aligned schemas with modern JSON Schema, patch releases 3.0.4 and 3.1.1 in October 2024 clarified ambiguities, and OpenAPI 3.2.0 was released in September 2025. A special interest group known as "Moonwalk" explores what a future OpenAPI 4.0 could look like.'
    ],
    technicalIntroduction: [
      'All versions share the same core anatomy: an info block with metadata, a paths map from URL templates to HTTP operations, reusable definitions referenced through $ref pointers, and security scheme declarations. What changes between versions is how requests and responses are modeled, how much of JSON Schema is available, and how servers, content types and reusable components are expressed.'
    ],
    technicalPoints: [
      {
        title: 'Swagger 2.0: one host, flat parameters',
        paragraphs: [
          'A Swagger 2.0 document declares swagger: "2.0" and describes exactly one API surface through host, basePath and schemes. Media types are listed globally or per operation with consumes and produces. Every input is a parameter with an in location of path, query, header, formData or body — the body parameter carries a schema, while all the others use a flattened, restricted subset of JSON Schema directly on the parameter object. Reusable schemas live under definitions, reusable parameters under parameters and security schemes under securityDefinitions.',
          'This flat model is simple to read and generate, but it has hard limits: only one server, no way to describe different payloads per media type, no cookie parameters, at most one body, and no oneOf/anyOf composition, which makes polymorphic payloads difficult to express.'
        ]
      },
      {
        title: 'OpenAPI 3.0: servers, content maps and components',
        paragraphs: [
          'OpenAPI 3.0 declares openapi: 3.0.x and replaces host/basePath/schemes with a servers array whose URLs support templated variables — multiple environments and parameterized hosts become first-class. The body parameter disappears: operations gain a requestBody whose content map associates each media type (application/json, multipart/form-data, text/csv…) with its own schema, and responses adopt the same content structure, replacing produces/consumes entirely.',
          'All reusable pieces are consolidated under components (schemas, parameters, responses, requestBodies, headers, examples, links, callbacks, securitySchemes), $ref paths change accordingly (#/definitions/Pet becomes #/components/schemas/Pet), and the schema object grows: oneOf, anyOf, not and discriminator enable real polymorphism, nullable marks optional null values, and callbacks plus links describe asynchronous notifications and workflow relations between operations. Security also improves, with http bearer, openIdConnect and structured OAuth2 flows.'
        ]
      },
      {
        title: 'OpenAPI 3.1: full JSON Schema alignment',
        paragraphs: [
          'OpenAPI 3.0 used an "extended subset" of JSON Schema Draft 4, which meant a schema valid for an OpenAPI validator could be invalid for a standard JSON Schema validator and vice versa. OpenAPI 3.1 ended that divergence: its schema object is a full JSON Schema 2020-12 dialect. nullable: true disappears in favor of type: ["string", "null"], exclusiveMinimum/exclusiveMaximum become numeric values instead of booleans, const, if/then/else, prefixItems and $dynamicRef become available, and examples follows JSON Schema semantics.',
          'Version 3.1 also adds top-level webhooks for event callbacks the API sends to consumers, makes paths optional (a document can describe only webhooks or only components), and permits license identification by SPDX identifier. Although the version number suggests a patch-level change, 3.1 is effectively a breaking release for tooling — which is exactly why many generators took years to support it.'
        ]
      },
      {
        title: 'Gains and losses when converting between versions',
        paragraphs: [
          'Upgrading 2.0 → 3.0 is mostly mechanical and lossless: hosts map to servers, body and formData parameters map to requestBody content, definitions move under components and $refs are rewritten. What you gain is expressiveness — multiple servers, per-media-type schemas, cookie parameters, polymorphism, callbacks and links. Upgrading 3.0 → 3.1 rewrites nullable and the exclusive bounds and unlocks the full JSON Schema vocabulary.',
          'Downgrading is where losses appear. Going 3.1 → 3.0 must approximate type arrays back to nullable, turn const into a single-value enum and drop webhooks. Going 3.0 → 2.0 collapses multiple servers into one host, keeps only one media type per body, loses cookie parameters, oneOf/anyOf composition, callbacks and links, and approximates modern security schemes — HTTP bearer authentication, for example, has no 2.0 equivalent and is usually emulated as an apiKey header. Converters, including the one built into the utily.tools Swagger Viewer & Editor, are best-effort adaptations: always review a downgraded contract before publishing it.'
        ]
      }
    ],
    examples: [
      { title: 'Design-first development', description: 'Teams write the OpenAPI contract before any code, review it like source code, and generate servers, clients and tests from it — keeping frontend and backend aligned from day one.' },
      { title: 'Interactive documentation and onboarding', description: 'A rendered contract with a try-it-out console lets consumers explore endpoints and send real requests without reading source code or importing collections.' },
      { title: 'Legacy migration and audits', description: 'Converting a Swagger 2.0 contract to OpenAPI 3.1 exposes implicit assumptions — single host, single content type, informal null handling — and prepares the API description for modern validation and generation pipelines.' }
    ],
    conclusion: [
      'Swagger started as one company\'s internal documentation tool and became, as OpenAPI, the neutral standard that the entire HTTP API ecosystem builds on. Knowing the differences between 2.0, 3.0 and 3.1 is not trivia: it determines which features you can express, which tools can consume your contract and what breaks when a document moves between versions.',
      'My practical advice: author new contracts in OpenAPI 3.1, keep 3.0 output available while any consumer tooling lags behind, and treat any remaining Swagger 2.0 documents as migration candidates. Use the utily.tools Swagger Viewer & Editor to paste a contract in YAML or JSON, convert it across versions, edit it visually with + and − controls, call the real endpoints and export the result — including a standalone HTML documentation page you can share with your team.'
    ]
  },
  {
    ...publication,
    slug: 'json-formatting-minification-and-validation',
    toolName: 'JSON Editor',
    toolRoute: '/json-editor',
    title: 'JSON Formatting, Minification and Validation Explained',
    description: 'A technical guide to JSON syntax, parsing, formatting, minification and stringification for APIs, configuration and web applications.',
    keywords: 'JSON formatter, JSON minifier, JSON validator, JSON stringify, format JSON online, JSON syntax, JSON parser',
    category: 'Data Formats',
    image: '/assets/articles/json-editor-cover.png',
    imageAlt: 'Glowing JSON document with nested objects, arrays and formatting guides',
    readingTime: '9 min read',
    introduction: [
      'JSON is the default data language of modern web APIs. Browsers exchange it with servers, applications store configuration in it, logs serialize events with it and message queues carry it between services. Its compact syntax is easy for machines to parse, but a dense response can be difficult for a person to inspect.',
      'Formatting, minification, validation and stringification solve different parts of that problem. The utily.tools JSON Editor performs these operations in the browser, making it useful when diagnosing API responses or preparing data for code, tests and configuration.'
    ],
    theoryTitle: 'The JSON data model',
    theory: [
      'JSON supports objects with string keys, ordered arrays, strings, numbers, booleans and null. It does not natively represent dates, binary values, comments, functions, undefined or arbitrary-precision numbers. Those values require an agreed string or object convention.',
      'Whitespace outside strings is insignificant. A formatted and a minified document can represent exactly the same value. Parsing converts JSON text into an in-memory data structure; serialization converts a supported structure back into JSON text.'
    ],
    technicalIntroduction: [
      'A reliable formatter is parser-driven. Lexical analysis identifies strings, numbers, literals and punctuation; grammatical analysis then verifies that arrays, objects and values follow the JSON production rules. Only after successful parsing can a serializer emit equivalent content with consistent punctuation and configurable whitespace.'
    ],
    technicalPoints: [
      { title: 'Parsing and diagnostics', paragraphs: ['The grammar requires double-quoted property names and strings, forbids trailing commas and permits only defined escape sequences. Parsing errors often report a character position; an editor can translate that position into a line and column for faster debugging.'] },
      { title: 'Formatting and minification', paragraphs: ['Pretty printing inserts insignificant whitespace according to an indentation policy, while minification removes that whitespace. Neither changes the data model. Object-member order is not semantic, so consumers must not treat a particular serialized key order as meaningful unless a separate canonicalization scheme defines it.'] },
      { title: 'Stringification and embedded JSON', paragraphs: ['Stringifying JSON text produces a JSON string whose quotes and control characters are escaped. This is useful when embedding a payload inside another JSON field, but it differs from serializing the parsed object. Large integers may lose precision when converted to JavaScript Number.'] }
    ],
    examples: [
      { title: 'API troubleshooting', description: 'Formatting a compact response reveals nested error objects, pagination metadata and fields that are difficult to see on one line.' },
      { title: 'Snapshot and fixture preparation', description: 'Test data can be validated and consistently indented before it is committed as a fixture.' },
      { title: 'Payload transport', description: 'Minified JSON reduces unnecessary whitespace when a payload must be copied into an environment variable or message body.' }
    ],
    conclusion: [
      'JSON tooling is not cosmetic: parsing confirms the grammar, formatting exposes structure, minification removes transport whitespace and stringification changes the representation for embedding.',
      'I consider parse-first behavior essential because a beautiful rendering of invalid data creates false confidence. Use the utily.tools JSON Editor to inspect and transform payloads, and continue with the site articles on JSON comparison, JWT and JWE.'
    ]
  },
  {
    ...publication,
    slug: 'compare-json-yaml-structural-diff',
    toolName: 'JSON & YAML Comparator',
    toolRoute: '/json-yaml-compare',
    title: 'How to Compare JSON and YAML Structurally',
    description: 'Learn how structural comparison parses JSON and YAML, walks object paths and reports missing fields and different values.',
    keywords: 'compare JSON, compare YAML, JSON diff, YAML diff, structural comparison, missing fields, configuration comparison',
    category: 'Data Formats',
    image: '/assets/articles/json-yaml-comparator-cover.png',
    imageAlt: 'Side-by-side JSON and YAML trees connected by highlighted matching and different fields',
    readingTime: '10 min read',
    introduction: [
      'Configuration files and API payloads are often logically equivalent even when their formatting differs. A textual diff may report every line as changed because keys were reordered or because one document uses JSON and the other uses YAML.',
      'Structural comparison first interprets both inputs as data. It can then report fields missing on either side and values that differ at the same logical path. The utily.tools JSON & YAML Comparator is designed for this semantic view.'
    ],
    theoryTitle: 'Trees, paths and semantic equality',
    theory: [
      'Objects and arrays form a tree. Object properties create named edges and array elements create indexed edges. A path such as server.tls.enabled or users[2].email identifies one node independently of line numbers or indentation.',
      'A structural comparator recursively walks both trees. If a path exists only on the left, it is missing on the right; if it exists only on the right, it is missing on the left. When both nodes are containers, traversal continues. When they are scalars or incompatible types, their values are compared.'
    ],
    technicalIntroduction: [
      'The result depends on parsing quality and equality rules. JSON has a strict standard grammar. YAML is much broader, supporting anchors, tags and multiple scalar syntaxes, so a lightweight parser usually supports a documented subset rather than the complete specification.'
    ],
    technicalPoints: [
      { title: 'Canonical serialization', paragraphs: ['Sorting object keys and serializing both parsed values into consistently indented JSON creates a stable presentation. A path-to-line map connects semantic differences back to highlighted output lines.'] },
      { title: 'Arrays and ordering', paragraphs: ['Index-by-index comparison treats array order as meaningful, which is correct for most JSON arrays. If an array represents an unordered set, a domain-specific comparator needs a key such as id and must match elements before comparing them.'] },
      { title: 'Type-aware equality', paragraphs: ['The string "1", the number 1 and the boolean true are different JSON values. Automatic coercion can conceal configuration bugs. Deep equality should preserve type and recursively compare nested values.'] }
    ],
    examples: [
      { title: 'Environment drift', description: 'Development and production configuration can be checked for missing flags, different endpoints and inconsistent limits.' },
      { title: 'API contract migration', description: 'Old and new responses reveal removed fields, new nested objects and type changes before consumers are upgraded.' },
      { title: 'Kubernetes review', description: 'YAML manifests can be normalized and compared to identify semantic changes hidden by formatting or key reordering.' }
    ],
    conclusion: [
      'Structural comparison focuses on meaning rather than presentation. Recursive paths, strict types and explicit array semantics make the output much more useful than a plain line diff for structured data.',
      'In my view, both tools are valuable: textual diff explains editing history, while structural diff explains data changes. Try the utily.tools JSON & YAML Comparator and read the related articles to choose the right comparison model.'
    ]
  },
  {
    ...publication,
    slug: 'uuid-v1-v4-v7-generation-guide',
    toolName: 'UUID Generator',
    toolRoute: '/uuid-generator',
    title: 'UUID v1, v4 and v7: Generation, Structure and Uses',
    description: 'Compare UUID v1, v4 and v7, understand their bit layout, randomness, ordering and practical use in distributed systems.',
    keywords: 'UUID generator, UUID v4, UUID v7, UUID v1, GUID generator, unique identifier, distributed ID',
    category: 'Identifiers',
    image: '/assets/articles/uuid-generator-cover.png',
    imageAlt: 'Glowing UUID segments arranged across a distributed network of database nodes',
    readingTime: '10 min read',
    introduction: [
      'Distributed applications need identifiers that can be created without asking one central database for the next number. UUIDs appear in API resources, database rows, event messages, file names, tracing systems and idempotency keys.',
      'Different UUID versions make different trade-offs. Version 4 emphasizes randomness, version 1 combines time with node information, and version 7 places Unix time before random bits for sortable modern identifiers. The utily.tools UUID Generator exposes these versions and common formatting options.'
    ],
    theoryTitle: 'A 128-bit identifier with versioned semantics',
    theory: [
      'A UUID contains 128 bits, usually displayed as 32 hexadecimal digits in groups of 8-4-4-4-12. Specific bits encode the version and variant, leaving the remainder to time, randomness, counters or node data depending on the version.',
      'Uniqueness is probabilistic or construction-based rather than a guarantee from a global registry. With properly generated v4 values, the available random space makes collisions extraordinarily unlikely. UUIDs still require correct randomness and should normally retain a unique database constraint.'
    ],
    technicalIntroduction: [
      'Generation begins with 16 bytes. The version nibble is written into byte 6 and the RFC variant into byte 8. Formatting only changes presentation; uppercase and hyphen removal do not alter the underlying identifier.'
    ],
    technicalPoints: [
      { title: 'UUID v4', paragraphs: ['Version 4 uses 122 random bits after version and variant markers. Cryptographically secure random bytes are essential. Math.random is unsuitable because its internal state and distribution are not designed for identifier security.'] },
      { title: 'UUID v1', paragraphs: ['Version 1 encodes a timestamp, clock sequence and node identifier. Its ordering and embedded metadata can be useful but may reveal creation time and historically a network address, which creates privacy concerns.'] },
      { title: 'UUID v7', paragraphs: ['Version 7 begins with a 48-bit Unix timestamp in milliseconds followed by random data. Values generated later generally sort later, improving locality in B-tree indexes compared with fully random v4 keys. Implementations still need a strategy for multiple IDs within the same millisecond and clock rollback.'] }
    ],
    examples: [
      { title: 'Offline resource creation', description: 'A mobile client can assign an ID before synchronization, avoiding a round trip solely to reserve an identifier.' },
      { title: 'Event-driven systems', description: 'Events created by many producers receive independent IDs used for tracing, deduplication and replay.' },
      { title: 'Database primary keys', description: 'UUID v7 offers distributed creation with time-ordered insertion, often reducing index fragmentation compared with v4.' }
    ],
    conclusion: [
      'UUIDs solve decentralized identification, but their versions are not interchangeable. Version 4 is simple and private, version 1 exposes time-oriented structure, and version 7 adds modern sortability.',
      'I prefer v7 for new distributed database keys when ecosystem support is available, and v4 for opaque identifiers where ordering is irrelevant. Generate test sets with the utily.tools UUID Generator and explore more site articles about hashes, timestamps and secure randomness.'
    ]
  },
  {
    ...publication,
    slug: 'unix-timestamp-epoch-time-conversion',
    toolName: 'Unix Timestamp',
    toolRoute: '/unix-timestamp',
    title: 'Unix Timestamps: Epoch Time, Precision and Time Zones',
    description: 'Understand Unix timestamps in seconds and milliseconds, UTC conversion, time zones, precision and practical application behavior.',
    keywords: 'Unix timestamp converter, epoch time, timestamp to date, date to timestamp, UTC time, milliseconds timestamp',
    category: 'Date and Time',
    image: '/assets/articles/unix-timestamp-cover.png',
    imageAlt: 'Digital clock and timeline flowing from the Unix epoch into modern systems',
    readingTime: '9 min read',
    introduction: [
      'Computers need a compact way to represent an instant without storing a formatted sentence such as July 16 at noon. Unix time provides that coordinate by counting elapsed time from the Unix epoch: 1970-01-01 00:00:00 UTC.',
      'Timestamps are used in databases, JWT claims, logs, cache expiration, analytics, schedulers and APIs. The utily.tools Unix Timestamp converter translates between numeric values and human-readable date components for quick validation.'
    ],
    theoryTitle: 'An instant measured from a shared origin',
    theory: [
      'A Unix timestamp normally counts seconds since the epoch, although JavaScript and many APIs use milliseconds. The number identifies an instant in UTC and does not contain a time-zone label. A local date display is a projection of that instant through time-zone rules.',
      'Calendar arithmetic is more complex than elapsed-time arithmetic. Time zones change offset because of daylight-saving rules and political decisions. Leap seconds are not represented consistently by common Unix-time implementations, which typically treat days as 86,400 seconds.'
    ],
    technicalIntroduction: [
      'Epoch values are commonly expressed in seconds, milliseconds, microseconds or nanoseconds. Conversion therefore requires an explicit unit and a defined rounding policy. A 13-digit millisecond value interpreted as seconds points thousands of years into the future, while truncating subsecond precision can change ordering or expiration behavior.'
    ],
    technicalPoints: [
      { title: 'Seconds versus milliseconds', paragraphs: ['A ten-digit contemporary value usually indicates seconds, while a thirteen-digit value usually indicates milliseconds. Guessing by length is convenient for a UI but an API contract should specify the unit explicitly.'] },
      { title: 'UTC and local constructors', paragraphs: ['new Date(year, month, day) interprets components in the local time zone. Date.UTC builds a millisecond timestamp from UTC components. Mixing these functions can shift the output by the local offset.'] },
      { title: 'Range and precision', paragraphs: ['The historical 2038 problem affects signed 32-bit seconds. Modern JavaScript Number safely represents contemporary millisecond timestamps, but nanosecond values require BigInt or strings to avoid precision loss.'] }
    ],
    examples: [
      { title: 'JWT expiration', description: 'The exp claim uses NumericDate seconds. Comparing it directly with Date.now() milliseconds produces an incorrect result unless units are normalized.' },
      { title: 'Log correlation', description: 'Services in different regions can record one UTC instant and let observability tools render it in the investigator’s local zone.' },
      { title: 'Cache control', description: 'An expiration instant can be compared numerically with the current epoch time without parsing localized date strings.' }
    ],
    conclusion: [
      'Unix time is a simple coordinate for an instant, but correct use depends on units, UTC interpretation, precision and display-time zone. Most timestamp bugs come from mixing those layers.',
      'My recommendation is to keep machine values in a documented UTC-based format and localize only at the interface boundary. Verify conversions with the utily.tools Unix Timestamp page and continue with articles about JWT claims and distributed identifiers.'
    ]
  },
  {
    ...publication,
    slug: 'cpf-cnpj-check-digit-generation-for-testing',
    toolName: 'CPF & CNPJ Generator',
    toolRoute: '/cpf-cnpj-generator',
    title: 'CPF and CNPJ Check Digits for Software Testing',
    description: 'Learn how CPF and CNPJ check digits are calculated, why valid test documents matter and how to use generated values responsibly.',
    keywords: 'CPF generator, CNPJ generator, CPF check digit, CNPJ check digit, Brazilian document validation, test CPF CNPJ',
    category: 'Testing Data',
    image: '/assets/articles/cpf-cnpj-generator-cover.png',
    imageAlt: 'Abstract Brazilian test document numbers with verification digits and validation marks',
    readingTime: '10 min read',
    introduction: [
      'Brazilian software frequently validates CPF and CNPJ identifiers in registration, billing, tax and customer-management flows. A random sequence of digits usually fails immediately because the final positions are mathematical check digits.',
      'Test teams need syntactically valid values to exercise form masks, validation services and downstream integrations without using a real person or organization. The utily.tools CPF & CNPJ Generator creates such values for development and quality assurance.'
    ],
    theoryTitle: 'Weighted sums and modulo-11 verification',
    theory: [
      'Both identifiers use weighted sums followed by modulo-11 rules. Each base digit is multiplied by a position-dependent weight, the products are added and the remainder determines a check digit. A second pass includes the first calculated digit to produce the final one.',
      'A valid check digit proves only that the number satisfies the arithmetic rule. It does not prove that the identifier was issued, belongs to a specific taxpayer or is active in an official registry.'
    ],
    technicalIntroduction: [
      'A classic CPF has nine base digits and two verification digits. CNPJ has twelve base positions and two verification digits, traditionally including the branch sequence. Validation also commonly rejects repeated values such as 000.000.000-00 even when a naive calculation appears acceptable.'
    ],
    technicalPoints: [
      { title: 'CPF calculation', paragraphs: ['For the first digit, the nine base digits are multiplied by weights 10 through 2. The second uses ten digits and weights 11 through 2. A common rule maps remainders below 2 to zero and otherwise uses 11 minus the remainder.'] },
      { title: 'CNPJ calculation', paragraphs: ['The first CNPJ digit uses weights 5,4,3,2,9,8,7,6,5,4,3,2. The second prepends 6 and includes the first verifier. Alphanumeric CNPJ formats require a specification-aware character-to-value mapping rather than digit-only arithmetic.'] },
      { title: 'Responsible testing', paragraphs: ['Generated values should remain inside development and test environments. Systems must not use them to impersonate taxpayers, bypass identity verification or create fraudulent transactions. Official existence checks require authorized registry integration.'] }
    ],
    examples: [
      { title: 'Front-end form tests', description: 'QA can verify masks, validation messages, paste behavior and formatted versus unformatted submission.' },
      { title: 'Automated test fixtures', description: 'A test suite can create independent valid values instead of reusing one hard-coded document across parallel runs.' },
      { title: 'Integration boundaries', description: 'Generated data exercises local validation, while sandbox-issued identifiers should be used when an external provider performs registry checks.' }
    ],
    conclusion: [
      'CPF and CNPJ verification digits are error-detection mechanisms built from weighted modulo arithmetic. They are valuable for input validation but are not evidence of identity or registration status.',
      'I support document generators when they are clearly framed as development tools and kept away from real transactions. Use the utily.tools CPF & CNPJ Generator responsibly, and read more site articles about test data, identifiers and validation.'
    ]
  }
];
