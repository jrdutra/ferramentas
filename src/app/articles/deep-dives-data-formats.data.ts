import { ArticleDeepDive } from './tool-article.model';

export const DATA_FORMAT_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  'json-formatting-minification-and-validation': {
    readingTime: '17 min read',
    deepDiveSections: [
      {
        title: 'Where JSON is standardized',
        paragraphs: [
          'JSON began as a subset inspired by JavaScript object literal syntax, but it is a language-independent data format. The current Internet standard is RFC 8259, published by the IETF, and ECMA-404 defines the same grammar from Ecma International. RFC 8259 requires exchanged JSON text to use UTF-8 when it is not part of a closed ecosystem.',
          'A JSON value is an object, array, number, string, true, false or null. Comments, trailing commas, NaN, Infinity, undefined, BigInt and date literals are not part of the grammar. A formatter must parse according to these rules before reserializing; indentation alone cannot prove validity.'
        ],
        table: {
          caption: 'JSON value model and interoperability concerns',
          headers: ['Type', 'Syntax', 'Important detail'],
          rows: [
            ['Object', '{"name": value}', 'Member names should be unique; duplicate behavior differs among parsers'],
            ['Array', '[value, value]', 'Elements may have different types and order is significant'],
            ['Number', '-12.5e+2', 'No leading zero, NaN or Infinity; precision depends on the implementation'],
            ['String', '"Unicode text"', 'Control characters must be escaped; escapes represent UTF-16 code units'],
            ['Literal', 'true, false, null', 'Lowercase spelling is mandatory']
          ]
        }
      },
      {
        title: 'Numbers, duplicate names and Unicode edge cases',
        paragraphs: [
          'RFC 8259 allows numbers beyond IEEE 754 binary64 range, but interoperable software commonly expects binary64. Integers between -(2^53)+1 and (2^53)-1 compare exactly in JavaScript; larger account identifiers should usually travel as strings. Parsing 9007199254740993 into a Number can silently change it.',
          'Object member names should be unique, yet the grammar does not make duplicates invalid. Some parsers keep the last value, others keep all values or reject the object. Security-sensitive consumers should detect duplicates before normal object conversion. Unpaired UTF-16 surrogate escapes are permitted by the ABNF but produce unpredictable interoperability and should be rejected or handled explicitly.'
        ]
      },
      {
        title: 'Formatting, minification and canonicalization are different',
        paragraphs: [
          'Pretty printing changes insignificant whitespace. Minification removes it. Neither operation defines object-member order or a unique byte representation. Therefore ordinary serializer output is not automatically suitable for signing, hashing or cache keys across independent systems.',
          'RFC 8785 defines the JSON Canonicalization Scheme using deterministic property sorting, ECMAScript-compatible primitive serialization and UTF-8 output. A canonicalizer also requires input constraints such as unique names and representable numbers. Schema validation is a separate semantic step that checks required fields, formats and relationships after syntactic parsing.'
        ]
      }
    ],
    references: [
      { title: 'RFC 8259: The JavaScript Object Notation Data Interchange Format', url: 'https://www.rfc-editor.org/rfc/rfc8259.html', publisher: 'IETF / RFC Editor' },
      { title: 'ECMA-404: The JSON Data Interchange Syntax', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-404/', publisher: 'Ecma International' },
      { title: 'RFC 8785: JSON Canonicalization Scheme', url: 'https://www.rfc-editor.org/rfc/rfc8785.html', publisher: 'IETF / RFC Editor' }
    ]
  },
  'compare-json-yaml-structural-diff': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'Comparing representation graphs rather than source text',
        paragraphs: [
          'A structural comparison parses both documents into nodes and then recursively compares node kind, key and value. Object or mapping key order is normally ignored, while sequence order remains significant. Paths such as database.host or containers[2].image identify where the graphs diverge.',
          'Text equality and data equality are not the same. Whitespace and comments disappear during parsing; aliases can resolve to the same graph; numeric and boolean spellings can normalize. A comparator must state whether it compares the representation graph, the serialized form or an application-specific schema.'
        ],
        table: {
          caption: 'JSON and YAML semantic differences',
          headers: ['Feature', 'JSON', 'YAML 1.2'],
          rows: [
            ['Document stream', 'One JSON text', 'May contain multiple documents separated by markers'],
            ['Comments', 'Not allowed', 'Supported and normally lost after parsing'],
            ['Aliases and anchors', 'Not available', 'Can create shared or recursive graph references'],
            ['Mapping keys', 'Strings only', 'The model permits keys beyond plain strings'],
            ['Tags', 'Not available', 'Attach explicit types and application semantics'],
            ['Duplicate keys', 'Names should be unique', 'Must be handled deliberately; parsers vary']
          ]
        }
      },
      {
        title: 'YAML 1.2 schemas and implicit typing',
        paragraphs: [
          'YAML 1.2.2 defines a presentation stream, serialization tree and representation graph. A schema decides how plain scalars resolve. Under the core schema, null, true, false, integers and floating-point forms receive typed values. YAML 1.1 behavior found in older libraries can interpret values such as yes, no or certain timestamps differently, so parser version and schema are part of the comparison contract.',
          'Converting YAML to JSON is lossy when the document uses comments, anchors, non-string keys, custom tags, timestamps or numbers outside the target runtime. A safe comparator rejects unsupported constructs or reports the normalization instead of silently pretending the formats are equivalent.'
        ]
      },
      {
        title: 'Deep equality, arrays and numeric precision',
        paragraphs: [
          'Recursive comparison should distinguish a missing property from a property explicitly set to null. Arrays may be compared positionally, as sets or by a domain key such as id; only positional comparison is universally valid without schema knowledge. Floating-point values require an application-defined tolerance only when the domain calls for approximate measurement.',
          'Large integers can lose precision when both formats are converted to JavaScript Number. Parsers that preserve BigInt or decimal types provide stronger comparisons, but the result may no longer be directly serializable as ordinary JSON. Protect against YAML alias expansion and deeply nested input with size, depth and alias limits.'
        ]
      }
    ],
    references: [
      { title: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/', publisher: 'YAML Language Development Team' },
      { title: 'RFC 8259: JSON Data Interchange Format', url: 'https://www.rfc-editor.org/rfc/rfc8259.html', publisher: 'IETF / RFC Editor' },
      { title: 'JSON Schema 2020-12 Specification', url: 'https://json-schema.org/draft/2020-12/json-schema-core', publisher: 'JSON Schema project' }
    ]
  },
  'uuid-v1-v4-v7-generation-guide': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'RFC 9562 replaced RFC 4122',
        paragraphs: [
          'UUIDs are 128-bit identifiers standardized by the IETF. RFC 9562, published in 2024, obsoletes RFC 4122, clarifies byte order and existing versions, and standardizes versions 6, 7 and 8. The familiar text form contains 32 hexadecimal digits grouped 8-4-4-4-12. The four version bits occupy bits 48 through 51 and the IETF variant begins with binary 10 in bits 64 and 65.',
          'A UUID is designed to make collisions negligibly likely without a central allocator; it is not proof of authenticity, authorization or randomness. Systems should store all 128 bits and avoid parsing application meaning unless the selected version defines it.'
        ],
        table: {
          caption: 'UUID versions defined or reserved by RFC 9562',
          headers: ['Version', 'Source', 'Properties and recommended use'],
          rows: [
            ['v1', 'Gregorian timestamp + clock sequence + node', 'Time-based legacy format; can expose time and node information'],
            ['v3', 'Namespace + name hashed with MD5', 'Deterministic legacy name UUID; MD5 does not make it a security token'],
            ['v4', '122 random or pseudorandom bits', 'General opaque identifiers when generated by a CSPRNG'],
            ['v5', 'Namespace + name hashed with SHA-1', 'Deterministic name UUID with broader use than v3'],
            ['v6', 'Reordered v1 timestamp', 'Database-friendly time order while retaining v1 semantics'],
            ['v7', '48-bit Unix milliseconds + 74 variable bits', 'Preferred time-ordered UUID for new systems'],
            ['v8', '122 implementation-defined bits', 'Custom format; uniqueness depends entirely on its profile']
          ]
        }
      },
      {
        title: 'Version 4 collision probability and random generation',
        paragraphs: [
          'UUIDv4 fixes six version and variant bits and leaves 122 random bits. With n independently generated UUIDs, the birthday approximation gives collision probability about n² / 2^123 while the probability is small. Even one billion identifiers leaves an extremely small theoretical probability, but a broken or repeated random seed can dominate that math.',
          'Browser generation should use crypto.randomUUID or crypto.getRandomValues, never Math.random. Random UUIDs remain guessable only to the extent of their entropy; they are not a substitute for access control, and exposing one may still leak the existence of a record.'
        ]
      },
      {
        title: 'Version 7 layout, sorting and monotonicity',
        paragraphs: [
          'UUIDv7 places an unsigned 48-bit Unix timestamp in milliseconds at the most significant end, followed by the version, 12 rand_a bits, the variant and 62 rand_b bits. Lexicographic byte order therefore groups values chronologically and usually improves B-tree locality compared with v4.',
          'Several UUIDs created within one millisecond can use random bits, a counter or a sub-millisecond fraction according to RFC 9562. Implementations must handle clock rollback and counter overflow explicitly. The timestamp is observable, so v7 should not be used when creation-time disclosure is unacceptable.'
        ]
      }
    ],
    references: [
      { title: 'RFC 9562: Universally Unique IDentifiers', url: 'https://www.rfc-editor.org/rfc/rfc9562.html', publisher: 'IETF / RFC Editor' },
      { title: 'Web Cryptography API', url: 'https://www.w3.org/TR/WebCryptoAPI/', publisher: 'W3C' },
      { title: 'ECMAScript crypto.randomUUID Web API definition', url: 'https://w3c.github.io/webcrypto/#Crypto-method-randomUUID', publisher: 'W3C Web Cryptography Working Group' }
    ]
  },
  'unix-timestamp-epoch-time-conversion': {
    readingTime: '16 min read',
    deepDiveSections: [
      {
        title: 'POSIX time and the Unix Epoch',
        paragraphs: [
          'POSIX defines seconds since the Epoch relative to 1970-01-01 00:00:00 UTC. Its arithmetic intentionally ignores leap seconds, which keeps each civil day at 86,400 counted seconds in the model. A Unix timestamp therefore identifies an instant through a scale used by systems; it is not a formatted date and contains no time-zone identifier.',
          'Negative values represent instants before the Epoch when the implementation supports them. Fractions or separate nanosecond fields represent subsecond precision. JavaScript Date uses milliseconds since the Epoch, while many APIs and databases use seconds, producing the common 1,000-fold conversion error.'
        ],
        table: {
          caption: 'Common epoch representations',
          headers: ['Representation', 'Unit', 'Example concern'],
          rows: [
            ['POSIX time_t', 'Traditionally seconds', 'Signed width and range are implementation-defined'],
            ['JavaScript Date', 'Milliseconds', 'IEEE 754 Number and Date range rules apply'],
            ['JWT NumericDate', 'Seconds, fractions permitted', 'Validate exp, nbf and iat with controlled clock skew'],
            ['Database timestamp', 'Vendor-specific seconds or microseconds', 'May be with or without time-zone semantics'],
            ['Unix nanoseconds', 'Nanoseconds', 'Usually requires a 64-bit integer or BigInt']
          ]
        }
      },
      {
        title: 'Time zones, calendars and ISO 8601',
        paragraphs: [
          'Converting an instant to a local date requires a time-zone rule set such as the IANA Time Zone Database. An offset like -03:00 describes one displacement but not future daylight-saving transitions. Store an instant in UTC and retain a named zone such as America/Sao_Paulo when the original civil-time intent matters.',
          'ISO 8601 and RFC 3339 define textual date-time representations, not Unix timestamps. A trailing Z means UTC; an explicit offset ties the local fields to an instant. A date-time without an offset is ambiguous and must not be silently assumed to be UTC in cross-system APIs.'
        ]
      },
      {
        title: 'The Year 2038 problem and safe conversion',
        paragraphs: [
          'A signed 32-bit seconds counter reaches 2,147,483,647 at 2038-01-19 03:14:07 UTC and overflows on the next second. Modern 64-bit systems avoid that near-term boundary, but file formats, embedded devices and database columns can retain 32-bit constraints. Conversion code should validate its accepted range rather than relying on host overflow behavior.',
          'Round trips should be tested at the Epoch, before 1970, around daylight-saving transitions, at leap days, with fractional seconds and at range boundaries. Formatting belongs at the display edge; calculations should operate on instants or duration-aware temporal types.'
        ]
      }
    ],
    references: [
      { title: 'POSIX Base Definitions: Seconds Since the Epoch', url: 'https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap04.html#tag_04_19', publisher: 'The Open Group' },
      { title: 'RFC 3339: Date and Time on the Internet', url: 'https://www.rfc-editor.org/rfc/rfc3339.html', publisher: 'IETF / RFC Editor' },
      { title: 'IANA Time Zone Database', url: 'https://www.iana.org/time-zones', publisher: 'Internet Assigned Numbers Authority' }
    ]
  },
  'cpf-cnpj-check-digit-generation-for-testing': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'Identifiers, check digits and what validation proves',
        paragraphs: [
          'CPF and CNPJ are Brazilian tax identifiers administered by Receita Federal. Their final positions are check digits designed to detect common transcription errors. A mathematically valid number only satisfies its formation rule: it does not prove that a person or company exists, is active, owns the number or consented to its use.',
          'Test generators should produce synthetic values only and must never query, enumerate or present real taxpayer records. Formatting punctuation is a presentation layer; validation begins by removing permitted separators, checking length and character repertoire, rejecting known invalid repeated patterns, and then recalculating both check digits.'
        ],
        table: {
          caption: 'Classic numeric check-digit process',
          headers: ['Identifier', 'Base', 'First pass', 'Second pass'],
          rows: [
            ['CPF', '9 digits', 'Weights 10 through 2', 'Include first check digit; weights 11 through 2'],
            ['Numeric CNPJ', '12 digits', 'Weights 5,4,3,2,9,8,7,6,5,4,3,2', 'Include first check digit; weights start at 6 then 5 through 2']
          ]
        }
      },
      {
        title: 'Modulo 11 calculation in detail',
        paragraphs: [
          'For each pass, multiply each base position by its weight and sum the products. The classic CPF and CNPJ rule derives a remainder modulo 11 and maps small remainders to zero; otherwise the digit is 11 minus the remainder. The second digit repeats the process with the first digit appended and the shifted weight sequence.',
          'Implement the weight sequence visibly and test against official examples. Compact formulas that derive weights from indexes are easy to get wrong at the wrap point. Validation should compare digits without converting the whole identifier to a Number, because identifiers are strings and leading zeros are meaningful.'
        ]
      },
      {
        title: 'CNPJ alphanumeric transition in July 2026',
        paragraphs: [
          'Receita Federal introduced alphanumeric CNPJ for new registrations beginning in July 2026 while existing numeric CNPJs remain unchanged. The identifier keeps 14 positions: the first 12 may contain digits and uppercase letters, and the final two remain numeric check digits. The modulo 11 structure remains, but each alphanumeric character is converted using its ASCII decimal value minus 48, so A maps to 17, B to 18 and so on.',
          'Systems must stop modeling CNPJ as a numeric database column and should accept both legacy numeric and new alphanumeric forms. Case normalization, input masks, regexes, exports, API schemas and sorting all require review. A generator that supports only numeric CNPJ must label that limitation clearly rather than claiming complete compatibility with new registrations.'
        ]
      }
    ],
    references: [
      { title: 'CNPJ Alfanumérico project and technical documentation', url: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico', publisher: 'Receita Federal do Brasil' },
      { title: 'Cálculo do DV do CNPJ Alfanumérico', url: 'https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj', publisher: 'Receita Federal do Brasil' },
      { title: 'Simulador oficial do CNPJ Alfanumérico', url: 'https://www.gov.br/pt-br/servicos/simulador-cnpj-alfanumerico', publisher: 'Governo Federal do Brasil' }
    ]
  }
};
