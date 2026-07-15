import { ArticleDeepDive } from './tool-article.model';

export const TEXT_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  'online-text-editor-text-transformation-guide': {
    readingTime: '15 min read',
    deepDiveSections: [
      {
        title: 'Unicode, code points and user-perceived characters',
        paragraphs: [
          'Modern text processing is defined over Unicode, but software exposes several different units. UTF-8 stores a code point in one to four bytes. JavaScript strings use UTF-16 code units, so String.length counts 16-bit units rather than bytes, Unicode code points or grapheme clusters. A supplementary character such as many emoji occupies two code units, and a visible symbol can contain several code points joined by combining marks or zero-width joiners.',
          'Unicode Standard Annex #29 defines extended grapheme clusters, word boundaries and sentence boundaries. Operations presented to a user as character counting, truncation or cursor movement should normally work on grapheme clusters. Byte limits for databases and protocols must instead be measured after encoding, usually with TextEncoder and UTF-8.'
        ],
        items: [
          { name: 'Code unit', description: 'The storage unit exposed by a string implementation. In ECMAScript it is a 16-bit unsigned value.' },
          { name: 'Code point', description: 'A Unicode scalar value such as U+0061 or U+1F680. Iterating a JavaScript string with for...of advances by code point.' },
          { name: 'Grapheme cluster', description: 'A sequence that users perceive as one character, potentially containing a base, combining marks, emoji modifiers and joiners.' },
          { name: 'Encoded byte', description: 'The actual octet representation used for storage or transmission. Its count depends on the character encoding.' }
        ]
      },
      {
        title: 'Normalization, line endings and deterministic transformations',
        paragraphs: [
          'Unicode allows canonically equivalent sequences to have different binary representations. NFC composes characters where possible, NFD decomposes them, and NFKC/NFKD also fold compatibility distinctions. Normalization before search or deduplication can prevent visually identical values from comparing as different, but compatibility normalization can erase distinctions such as superscripts or full-width forms and must be chosen deliberately.',
          'Line endings are another representation boundary. Unix commonly uses LF, Windows uses CRLF, and historic systems used CR. A safe normalization pass recognizes all three before producing one selected convention. Transformations should be ordered explicitly because trim, whitespace collapse, normalization and case conversion are not generally commutative.'
        ]
      },
      {
        title: 'Regular expressions, locale and safe processing',
        paragraphs: [
          'Regular expressions are powerful for lexical patterns but are not a full parser for nested languages. User-provided patterns can also cause catastrophic backtracking in vulnerable expressions. A production text pipeline should cap input size, escape literal search values, expose regex mode explicitly and avoid inserting transformed text with innerHTML.',
          'Case mapping is language-sensitive. Turkish dotted and dotless I are a familiar example, and uppercase conversion may change string length. Use locale-aware APIs when linguistic behavior is intended; use protocol-specific ASCII rules when handling identifiers whose standard defines ASCII case folding.'
        ]
      }
    ],
    references: [
      { title: 'Unicode Standard Annex #29: Text Segmentation', url: 'https://www.unicode.org/reports/tr29/', publisher: 'Unicode Consortium' },
      { title: 'Unicode Standard Annex #15: Normalization Forms', url: 'https://www.unicode.org/reports/tr15/', publisher: 'Unicode Consortium' },
      { title: 'ECMAScript Language Specification: String Objects', url: 'https://tc39.es/ecma262/#sec-string-objects', publisher: 'Ecma International / TC39' }
    ]
  },
  'text-templates-variables-and-automation': {
    readingTime: '14 min read',
    deepDiveSections: [
      {
        title: 'Template languages are small programming languages',
        paragraphs: [
          'A template combines literal text with placeholders evaluated against a data context. Even a minimal replacement syntax needs a lexer rule for delimiters, a name grammar, behavior for missing values and an escaping convention. Once conditionals, loops, partials or functions are introduced, the system becomes an interpreter and inherits concerns such as evaluation order, scope, recursion limits and untrusted input.',
          'Logic-less systems such as Mustache intentionally restrict expressions and treat a context stack as the data model. Other engines compile templates into executable functions. Compilation improves repeated rendering performance but makes code generation and sandbox boundaries critical.'
        ],
        items: [
          { name: 'Interpolation', description: 'Replace a placeholder with a scalar value, for example {{customerName}}.' },
          { name: 'Section', description: 'Conditionally render or repeat a block according to a value or collection.' },
          { name: 'Partial', description: 'Include a named reusable template fragment.' },
          { name: 'Context', description: 'The object or stack from which placeholder names are resolved.' }
        ]
      },
      {
        title: 'Escaping depends on the output context',
        paragraphs: [
          'There is no universal safe escaping function. HTML text, HTML attributes, URLs, JavaScript strings, JSON values, shell commands and SQL each have different grammars. A value escaped for HTML is not automatically safe inside a script or URL. Secure systems either restrict a template to plain text or attach a declared output context to every interpolation.',
          'Templates should never be mistaken for parameterization. Database values belong in prepared-statement parameters, and shell arguments should be passed as an argument array. If a generated artifact will later be interpreted as code, validate values against an allowlist and keep template authorship trusted.'
        ]
      },
      {
        title: 'Deterministic rendering and operational design',
        paragraphs: [
          'Reliable automation validates the input schema before rendering, reports every unresolved variable, and records the template version used. Stable date, number and currency formatting should declare locale and time zone instead of inheriting workstation defaults. For batch generation, parse or compile the template once and render it against each record.',
          'A useful test suite includes empty values, false and zero, missing nested paths, delimiter characters inside values, Unicode, large collections and hostile strings. Snapshot tests catch accidental layout changes, while property-based tests can verify that arbitrary values never break the chosen output grammar.'
        ]
      }
    ],
    references: [
      { title: 'Mustache Manual', url: 'https://mustache.github.io/mustache.5.html', publisher: 'Mustache project' },
      { title: 'OWASP Cross Site Scripting Prevention Cheat Sheet', url: 'https://owasp.org/www-community/attacks/xss/', publisher: 'OWASP Foundation' },
      { title: 'ECMAScript Template Literal Specification', url: 'https://tc39.es/ecma262/#sec-template-literals', publisher: 'Ecma International / TC39' }
    ]
  },
  'text-diff-algorithms-and-comparison': {
    readingTime: '16 min read',
    deepDiveSections: [
      {
        title: 'From longest common subsequence to an edit script',
        paragraphs: [
          'A diff algorithm seeks an edit script that transforms sequence A into sequence B through insertions and deletions; substitutions can be represented as one deletion plus one insertion. The Longest Common Subsequence formulation retains an ordered set of equal elements and treats everything outside it as an edit. A classic dynamic-programming LCS table uses O(NM) time and memory for sequences of lengths N and M.',
          'Eugene Myers described an O(ND) algorithm, where D is the length of the shortest edit script. It explores diagonals in an edit graph and is especially effective when two versions are similar. Production tools often add heuristics, patience diff or histogram diff to produce changes that humans find easier to review even when several mathematically minimal scripts exist.'
        ],
        table: {
          caption: 'Common comparison strategies',
          headers: ['Strategy', 'Core idea', 'Typical trade-off'],
          rows: [
            ['Dynamic-programming LCS', 'Build a matrix of optimal prefixes', 'Simple and exact, but O(NM) storage can be expensive'],
            ['Myers O(ND)', 'Search edit-graph diagonals by edit distance', 'Fast for similar inputs and widely used for source diffs'],
            ['Patience diff', 'Anchor unique lines before recursive comparison', 'Often clearer for moved or reordered code'],
            ['Histogram diff', 'Prefer low-frequency tokens as anchors', 'Balances readability and performance on source text']
          ]
        }
      },
      {
        title: 'Tokenization determines what a difference means',
        paragraphs: [
          'The same algorithm produces different results when the sequence elements are bytes, code points, words, lines or syntax-tree nodes. Line-level comparison scales well and matches code review conventions. Word or grapheme refinement inside changed lines reveals smaller edits. AST-aware comparison can recognize moves and renames but requires a parser for the language.',
          'Before comparison, decide whether CRLF versus LF, Unicode normalization, trailing whitespace and letter case are meaningful. Normalizing them can remove noise, but it also discards evidence. A trustworthy tool should state which preprocessing rules were applied.'
        ]
      },
      {
        title: 'Patch formats, context and conflict handling',
        paragraphs: [
          'Unified diff groups changes into hunks and includes surrounding context so a patch can locate the intended region even if line numbers shift. Applying a patch requires validating context; silently applying a hunk to an ambiguous location can corrupt data. Three-way merge improves conflict detection by comparing two descendants against a common base.',
          'For very large inputs, stream line indexes where possible, enforce size limits and avoid rendering thousands of DOM nodes at once. Virtualized output and collapsed equal regions preserve interactivity without changing the underlying edit script.'
        ]
      }
    ],
    references: [
      { title: 'An O(ND) Difference Algorithm and Its Variations', url: 'https://www.xmailserver.org/diff2.pdf', publisher: 'Eugene W. Myers' },
      { title: 'Git diff format documentation', url: 'https://git-scm.com/docs/diff-format', publisher: 'Git project' },
      { title: 'Unicode Standard Annex #29: Text Segmentation', url: 'https://www.unicode.org/reports/tr29/', publisher: 'Unicode Consortium' }
    ]
  },
  'base64-encoding-decoding-guide': {
    readingTime: '15 min read',
    deepDiveSections: [
      {
        title: 'RFC 4648 and the exact bit-level transformation',
        paragraphs: [
          'RFC 4648 standardizes Base16, Base32 and Base64 alphabets. Standard Base64 consumes 24 input bits at a time, divides them into four 6-bit indices and maps each index to one of 64 ASCII symbols. Three source bytes therefore become four encoded characters. When only one or two bytes remain, zero bits complete the final group and equals signs represent the missing output positions.',
          'Padding is part of canonical Base64 unless a referring specification explicitly says otherwise. Decoders should reject characters outside the selected alphabet unless their protocol directs them to ignore whitespace. Unused pad bits must be zero for a canonical encoding; otherwise multiple strings could decode to the same byte sequence.'
        ],
        table: {
          caption: 'Base64 alphabets and padding',
          headers: ['Variant', 'Indices 62 and 63', 'Padding', 'Typical use'],
          rows: [
            ['Base64', '+ and /', '= normally required', 'MIME bodies, PEM, binary fields'],
            ['base64url', '- and _', 'Often omitted when the protocol says so', 'JWT, JWS, URLs and filenames'],
            ['MIME Base64', '+ and /', '= with lines limited by MIME rules', 'Email transfer encoding'],
            ['PEM textual encoding', '+ and /', '= with labeled boundaries', 'Certificates and cryptographic keys']
          ]
        }
      },
      {
        title: 'Bytes first: UTF-8 is a separate step',
        paragraphs: [
          'Base64 has no concept of text or characters. Encoding a string means first selecting a character encoding, normally UTF-8, to obtain bytes. Decoding reverses the Base64 layer to bytes and only then interprets those bytes as UTF-8 or another declared charset. A mismatched or implicit charset can produce valid Base64 that decodes into incorrect text.',
          'Encoded data grows to 4 × ceil(n/3) characters before line wrapping or container overhead, approximately 33 percent for large inputs. Base64 may compress well when the surrounding transport is compressed, but it is never compression and never encryption.'
        ]
      },
      {
        title: 'Validation, security and interoperability',
        paragraphs: [
          'A robust decoder selects one alphabet, validates padding placement, imposes a decoded-size limit and reports malformed input rather than guessing. Lenient mixing of standard Base64 and base64url can hide corruption. Applications must also validate the decoded content: a syntactically valid Base64 value can contain executable files, oversized data or invalid UTF-8.',
          'Never compare secrets through their Base64 text or treat the representation as protection. Cryptographic verification belongs to the protocol that carries the bytes, and secret comparisons should use constant-time primitives where applicable.'
        ]
      }
    ],
    references: [
      { title: 'RFC 4648: The Base16, Base32, and Base64 Data Encodings', url: 'https://www.rfc-editor.org/rfc/rfc4648.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 2045: MIME Part One', url: 'https://www.rfc-editor.org/rfc/rfc2045.html', publisher: 'IETF / RFC Editor' },
      { title: 'Encoding Standard', url: 'https://encoding.spec.whatwg.org/', publisher: 'WHATWG' }
    ]
  },
  'url-encoding-percent-encoding-guide': {
    readingTime: '16 min read',
    deepDiveSections: [
      {
        title: 'URI syntax and percent-encoded octets',
        paragraphs: [
          'RFC 3986 defines a URI as scheme, authority, path, query and fragment components. Percent-encoding represents one byte as percent followed by two hexadecimal digits. For non-ASCII text, the producer normally encodes the character as UTF-8 and percent-encodes each resulting byte. The unreserved set is ASCII letters, digits, hyphen, period, underscore and tilde.',
          'Reserved characters have syntactic meaning. Gen-delimiters include colon, slash, question mark, number sign, square brackets and at sign; sub-delimiters include punctuation such as ampersand and equals. Decode only after splitting the URI into components, or an encoded delimiter can be reinterpreted as structure.'
        ],
        table: {
          caption: 'URI encoding scopes',
          headers: ['Scope', 'Intended input', 'Important behavior'],
          rows: [
            ['Complete URI', 'Scheme, authority, path, query and fragment together', 'Preserves structural delimiters needed to identify components'],
            ['Component value', 'One path segment, query name or query value', 'Escapes delimiters that would otherwise change the surrounding grammar'],
            ['Structured URL model', 'Separately represented URL components', 'Parses and serializes according to a defined URL standard'],
            ['Form query model', 'Name-value pairs in form data', 'Uses application/x-www-form-urlencoded rules, including plus for space']
          ]
        }
      },
      {
        title: 'RFC URI rules versus the WHATWG URL standard',
        paragraphs: [
          'RFC 3986 provides generic syntax and normalization principles, while the state-machine-based WHATWG URL Standard defines interoperable handling of web URLs. Their models are related but not identical. Systems should parse components structurally instead of rebuilding addresses through unvalidated string concatenation.',
          'The application/x-www-form-urlencoded format is another distinct layer: it traditionally represents spaces with plus signs. A literal plus sign must therefore be percent-encoded when form decoding is expected, whereas generic URI percent-decoding does not inherently translate plus into space.'
        ]
      },
      {
        title: 'Double decoding and canonicalization attacks',
        paragraphs: [
          'Encoding or decoding the same data twice can change meaning: %252F becomes %2F and then slash. Differences between a proxy, framework and application decoder can bypass routing or authorization checks. Normalize exactly once at a defined boundary, reject malformed percent triplets and run security validation on the same canonical representation used to access the resource.',
          'Do not decode an entire URL before parsing it. Encoded slash, dot segments, NUL and path traversal sequences require special care when a URL is mapped to a filesystem. Host names use IDNA processing rather than ordinary percent-encoding.'
        ]
      }
    ],
    references: [
      { title: 'RFC 3986: Uniform Resource Identifier Generic Syntax', url: 'https://www.rfc-editor.org/rfc/rfc3986.html', publisher: 'IETF / RFC Editor' },
      { title: 'WHATWG URL Standard', url: 'https://url.spec.whatwg.org/', publisher: 'WHATWG' },
      { title: 'HTML form URL-encoded serialization', url: 'https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#url-encoded-form-data', publisher: 'WHATWG' }
    ]
  }
};
