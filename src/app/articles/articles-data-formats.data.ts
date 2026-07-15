import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 16, 2026',
  publishedIso: '2026-07-16',
  modifiedIso: '2026-07-16T00:00:00-03:00'
};

export const DATA_FORMAT_TOOL_ARTICLES: ToolArticle[] = [
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
