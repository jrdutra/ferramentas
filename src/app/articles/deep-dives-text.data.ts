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
  },
  'uri-vs-url-difference-explained': {
    readingTime: '19 min read',
    deepDiveSections: [
      {
        title: 'Where the words came from: 1994 and the birth of three acronyms',
        paragraphs: [
          'When Tim Berners-Lee documented the addressing scheme of the early Web in RFC 1630 in June 1994, the document was titled "Universal Resource Identifiers in WWW". It already made the key observation that would define the next thirty years of debate: some identifiers encode enough information to locate a resource, while others merely name it. The paper described the former as locators and the latter as names.',
          'Later that year, RFC 1738 formalized Uniform Resource Locators, listing the schemes that browsers actually used — ftp, http, gopher, mailto, news, telnet, file. RFC 1737 published functional requirements for Uniform Resource Names in December 1994, describing an identifier that should be globally unique, persistent and independent of location. The vocabulary of URI, URL and URN was therefore complete before most people had ever used a browser.',
          'RFC 2396 replaced "Universal" with "Uniform" in August 1998 and unified the grammar. Its successor, RFC 3986, arrived in January 2005 as STD 66 and made a decision that most casual explanations still miss: it stopped treating URL and URN as formal classes. Section 1.1.3 explains that the terms are useful descriptions but that the specification defines only URI, since a single identifier can be both a durable name and a working locator at the same time.'
        ],
        table: {
          caption: 'Milestones in URI standardization',
          headers: ['Date', 'Document', 'Contribution'],
          rows: [
            ['June 1994', 'RFC 1630', 'First description of Universal Resource Identifiers and the locator/name split'],
            ['December 1994', 'RFC 1738', 'Defined Uniform Resource Locators and the original scheme list'],
            ['December 1994', 'RFC 1737', 'Functional requirements for Uniform Resource Names'],
            ['May 1997', 'RFC 2141', 'Original URN syntax'],
            ['August 1998', 'RFC 2396', 'Unified generic URI syntax; "Uniform" replaces "Universal"'],
            ['January 2005', 'RFC 3986 (STD 66)', 'Current generic syntax; URL and URN become informal descriptions'],
            ['January 2005', 'RFC 3987', 'Internationalized Resource Identifiers (IRIs) with Unicode'],
            ['April 2017', 'RFC 8141', 'Current URN syntax, replacing RFC 2141'],
            ['Living standard', 'WHATWG URL', 'Browser-accurate parsing model for web URLs']
          ]
        }
      },
      {
        title: 'The generic syntax, component by component',
        paragraphs: [
          'RFC 3986 defines a URI as scheme ":" hier-part [ "?" query ] [ "#" fragment ]. That single production covers every identifier you will ever meet, from https://utily.tools/url-codec?value=a%20b#result to urn:isbn:0451450523 and tel:+551140028922. What changes between them is which optional components appear, not the grammar itself.',
          'Consider https://user:pass@api.utily.tools:8443/v2/orders/42?fields=id,total#summary. The scheme is https. The authority is user:pass@api.utily.tools:8443, itself split into userinfo, host and port. The path is /v2/orders/42. The query is fields=id,total. The fragment is summary. Remove the authority and you have something like mailto:team@utily.tools — still a perfectly valid URI, just not a URL.',
          'A crucial and frequently misunderstood detail: the fragment is a client-side concern. RFC 3986 section 3.5 states that it identifies a secondary resource by reference to the primary resource, and the dereferencing is performed by the user agent. HTTP requests never carry it. This is why server logs cannot show which anchor a visitor jumped to, and why single-page applications historically used fragments for routing without any server round trip.'
        ],
        table: {
          caption: 'Components of https://user:pass@api.utily.tools:8443/v2/orders/42?fields=id,total#summary',
          headers: ['Component', 'Value', 'Delimiter', 'Required?'],
          rows: [
            ['Scheme', 'https', 'followed by :', 'Yes, in an absolute URI'],
            ['Userinfo', 'user:pass', 'followed by @', 'No, and deprecated for credentials'],
            ['Host', 'api.utily.tools', 'after //', 'Only when an authority exists'],
            ['Port', '8443', 'preceded by :', 'No; scheme default applies'],
            ['Path', '/v2/orders/42', 'starts with /', 'Yes, but may be empty'],
            ['Query', 'fields=id,total', 'preceded by ?', 'No'],
            ['Fragment', 'summary', 'preceded by #', 'No; never sent to the server']
          ]
        }
      },
      {
        title: 'Identifying versus locating: the test that actually works',
        paragraphs: [
          'The reliable test is not whether the string starts with http. It is whether the identifier describes an access mechanism. If it tells an agent which protocol to speak and which endpoint to speak it to, it functions as a locator. If it only asserts uniqueness, it functions as a name.',
          'This is why some examples surprise people. The XML namespace http://www.w3.org/1999/xhtml uses the http scheme and syntactically qualifies as a URL, yet it is used exclusively as a name — no conforming parser fetches it, and the W3C has published guidance explaining that namespace URIs need not be dereferenceable. Conversely urn:isbn:0451450523 is unambiguously a name, and resolving it to a copy of the book requires an external resolution service.',
          'The pragmatic conclusion drawn by RFC 3986 is that classification depends on use, not on shape. A given string can serve as a durable identifier in a contract and as a working address in production, which is exactly why the standard defines only one term and lets context supply the rest.'
        ],
        items: [
          { name: 'URI', description: 'Identifies a resource. The umbrella concept; the only one formally defined by RFC 3986.' },
          { name: 'URL', description: 'A URI that also specifies a primary access mechanism, normally a network protocol plus location.' },
          { name: 'URN', description: 'A URI under the urn scheme, intended to be a globally unique and persistent name.' },
          { name: 'URI reference', description: 'Either a full URI or a relative reference that must be resolved against a base.' },
          { name: 'IRI', description: 'An internationalized identifier permitting Unicode, mapped to a URI for transmission.' }
        ]
      },
      {
        title: 'Relative references and the resolution algorithm',
        paragraphs: [
          'Most links inside a real application are not URIs at all. /articles/uri-vs-url-difference-explained, ../assets/cover.png, ./next and the bare #summary are relative references. RFC 3986 section 5 specifies precisely how a base URI and a reference combine, and every browser, HTTP client and crawler implements the same steps.',
          'The algorithm resolves in order: if the reference has a scheme it is already absolute; otherwise inherit the base scheme. If it has an authority, keep it and take the path as given. If the path starts with a slash, replace the base path entirely. If the path is empty, keep the base path and substitute the query when one is present. Otherwise merge the reference onto the base path directory and run remove_dot_segments to collapse . and .. sequences.',
          'Two consequences trip teams up constantly. First, a base of https://utily.tools/articles/guide with reference "next" resolves to /articles/next, not /articles/guide/next — the last segment is treated as a file, not a directory, unless the base ends in a slash. Second, a reference beginning with a double slash, such as //cdn.example.com/lib.js, is a protocol-relative reference that inherits only the scheme and replaces the entire authority. That form was once idiomatic and is now discouraged, since it silently follows an insecure base into HTTP.'
        ],
        table: {
          caption: 'Resolution against base https://utily.tools/articles/guide?x=1',
          headers: ['Reference', 'Resolved URI', 'Rule applied'],
          rows: [
            ['other', 'https://utily.tools/articles/other', 'Merge with base directory'],
            ['/url-codec', 'https://utily.tools/url-codec', 'Absolute path replaces base path'],
            ['../about', 'https://utily.tools/about', 'Merge then remove dot segments'],
            ['?y=2', 'https://utily.tools/articles/guide?y=2', 'Empty path keeps base path, query replaced'],
            ['#top', 'https://utily.tools/articles/guide?x=1#top', 'Same-document reference'],
            ['//cdn.example.com/a.js', 'https://cdn.example.com/a.js', 'Scheme inherited, authority replaced'],
            ['mailto:hi@utily.tools', 'mailto:hi@utily.tools', 'Reference already has a scheme']
          ]
        }
      },
      {
        title: 'Normalization, equivalence and why two URIs can be the same',
        paragraphs: [
          'Comparing identifiers naively causes cache misses, duplicate database rows and broken authorization checks. RFC 3986 section 6 defines a ladder of comparison strategies, from simple string equality to scheme-based normalization, and warns that false negatives are usually more damaging than the cost of normalizing.',
          'Syntax-based normalization is always safe: lowercase the scheme and host because they are case-insensitive, uppercase the hexadecimal digits in percent triplets, decode percent-encoded octets that correspond to unreserved characters, and remove dot segments from the path. Scheme-based normalization adds knowledge of defaults — https://utily.tools:443/ equals https://utily.tools/, and an empty path in an http URI is equivalent to /.',
          'What is never safe to assume is that the path is case-insensitive, that a trailing slash is meaningless, or that reordering query parameters preserves identity. All three depend entirely on the server. This is the layer where SEO and engineering meet: canonical link elements exist precisely because a site can serve identical content under several non-equivalent URIs, and search engines need to be told which one is authoritative.'
        ],
        items: [
          { name: 'Case normalization', description: 'Scheme and host lowercase; percent-encoding hex digits uppercase.' },
          { name: 'Percent-encoding normalization', description: 'Decode triplets representing unreserved characters such as %7E to ~.' },
          { name: 'Path segment normalization', description: 'Apply remove_dot_segments to eliminate . and .. sequences.' },
          { name: 'Scheme-based normalization', description: 'Drop default ports and treat an empty http path as /.' },
          { name: 'Never assume', description: 'Path case-insensitivity, trailing-slash equivalence or query parameter order.' }
        ]
      },
      {
        title: 'The URN scheme in detail',
        paragraphs: [
          'RFC 8141 defines the current URN syntax as urn:NID:NSS, optionally followed by r-components, q-components and an f-component. The namespace identifier is registered with IANA; the namespace-specific string is governed by whoever owns that namespace. Case matters: the leading urn token and the NID are case-insensitive, but the NSS generally is not.',
          'Real namespaces include isbn for books, uuid for identifiers such as urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66, ietf for specifications, and oasis for OASIS standards. The persistence guarantee is a social and organizational commitment, not a technical property — a URN survives migrations only because a registry keeps its meaning stable.',
          'This is why URNs are common in publishing, library science, telecommunications and legal citation, and rare in day-to-day web development. When a system does need permanence, the usual pragmatic compromise is a persistent HTTP URI backed by a redirect service, as with DOIs served through doi.org. That approach gains dereferenceability at the cost of depending on one organization keeping the resolver alive.'
        ],
        table: {
          caption: 'Comparing the three roles side by side',
          headers: ['Property', 'URI (general)', 'URL', 'URN'],
          rows: [
            ['Purpose', 'Identify a resource', 'Identify and locate', 'Identify with a persistent name'],
            ['Defined by', 'RFC 3986', 'RFC 1738, described by RFC 3986', 'RFC 8141'],
            ['Access mechanism', 'Not required', 'Required', 'Not provided'],
            ['Example', 'mailto:team@utily.tools', 'https://utily.tools/url-codec', 'urn:isbn:0451450523'],
            ['Survives relocation', 'Depends', 'Often breaks', 'By design'],
            ['Directly fetchable', 'Depends', 'Yes', 'Only via a resolver']
          ]
        }
      },
      {
        title: 'RFC 3986 versus the WHATWG URL Standard',
        paragraphs: [
          'There are two living specifications, and they do not agree. RFC 3986 gives an ABNF grammar for identifiers in general. The WHATWG URL Standard describes a state-machine parser that reproduces what browsers actually do with web URLs, including error recovery for input that RFC 3986 would simply reject.',
          'The divergences are concrete. WHATWG parsing has no notion of an empty-but-present authority in the RFC sense, applies IDNA and percent-encode sets per component, resolves backslashes as slashes in special schemes, and defines an "opaque path" for non-special schemes. Given http://example.com/a\\b, a browser normalizes the backslash to a forward slash; an RFC 3986 parser treats it as an invalid path character.',
          'The engineering rule that follows is straightforward. Use the WHATWG model when the identifier will be handled by a browser, and the RFC 3986 model for protocol identifiers, namespaces and general-purpose URIs. Never rebuild an address by concatenating strings across the two models, and never let one component pass through a parser configured for another — this is the root cause of a large family of parser-confusion vulnerabilities.'
        ]
      },
      {
        title: 'Security: where the distinction becomes an incident report',
        paragraphs: [
          'URI parsing differences are a documented attack surface. When a proxy, a framework and an application each parse the same string with slightly different rules, an attacker can craft input that one layer treats as safe and another treats as a different resource entirely. Research on URL parser confusion has repeatedly shown request smuggling and access-control bypasses arising from exactly this mismatch.',
          'Server-side request forgery depends on the same ambiguity. A validator that checks whether a URL "contains" an allowed host is trivially defeated by https://allowed.example.com@attacker.example/ — the userinfo component makes attacker.example the real authority. Correct validation parses the URI, extracts the host component structurally and compares it against an allowlist, never using substring matching.',
          'Open redirects follow from the protocol-relative form: a redirect target of //attacker.example passes a naive "must start with /" check while sending the user off-site. Encoded traversal sequences such as %2e%2e%2f exploit decode-order mistakes when a path maps to a filesystem. In every case the mitigation is the same discipline: parse structurally, normalize exactly once at a defined boundary, validate the canonical form, and reject anything malformed rather than repairing it.'
        ],
        items: [
          { name: 'Parse, do not pattern-match', description: 'Extract host, path and query with a real parser before validating anything.' },
          { name: 'Beware userinfo', description: 'https://trusted.example@evil.example/ has authority evil.example.' },
          { name: 'Reject protocol-relative redirects', description: '//host bypasses checks that only require a leading slash.' },
          { name: 'Normalize once', description: 'Decoding twice turns %252e%252e into .. after the security check has passed.' },
          { name: 'Encode per component', description: 'Path, query and fragment have different permitted character sets.' }
        ]
      },
      {
        title: 'Practical guidance for APIs, code and documentation',
        paragraphs: [
          'In API contracts, prefer "URI" when you mean identity and "URL" when you promise retrieval. An OpenAPI description that says an order is identified by /orders/{id} is describing a URI reference that stays valid across every environment; the deployment-specific https://api.example.com/orders/42 is the URL. Mixing them bakes hostnames into contracts and makes environment promotion painful.',
          'In code, choose the type that matches the intent. Java draws the line sharply: java.net.URI parses and normalizes without network semantics, while java.net.URL can open connections and, in older releases, performed DNS resolution inside equals() and hashCode() — a well-known source of unexpected latency. In JavaScript, the URL constructor implements the WHATWG model and throws on invalid input, which makes it a reasonable validation gate. In Python, urllib.parse.urlsplit follows RFC 3986 closely and preserves components rather than guessing.',
          'For content and SEO, the practical items are ordinary but effective: pick one canonical form and declare it with a rel=canonical link, keep paths readable and lowercase, avoid duplicate content served under both trailing-slash variants, and remember that fragments are never seen by a crawler as separate pages. None of this requires arguing about terminology — it just requires knowing which component you are changing.',
          'When you need to inspect what a component actually contains, decode it rather than guessing. The utily.tools URL Codec percent-encodes and decodes values directly in the browser, which makes it quick to confirm whether a redirect_uri was double-encoded, whether a query value swallowed an ampersand, or how a UTF-8 string is represented on the wire.'
        ]
      },
      {
        title: 'Frequently confused cases, answered directly',
        paragraphs: [
          'Is every URL a URI? Yes. Is every URI a URL? No — mailto:team@utily.tools, urn:isbn:0451450523 and tel:+551140028922 identify resources without describing a retrievable network location. Does a URI have to start with http? No; the scheme is whatever the identifier declares, and thousands are registered with IANA.',
          'Is /articles/guide a URL? Strictly, no. It is a relative reference, and it only becomes a URI after resolution against a base. Is a URN a URL? No, though a resolver can map one to a URL. Is a file path a URI? Only when expressed with the file scheme, as in file:///home/user/notes.txt.',
          'Why does OAuth say redirect_uri instead of redirect_url? Because the value need not be an HTTP address — mobile applications legitimately register custom schemes such as com.example.app:/callback. And why does the WHATWG standard barely mention "URI"? Because it models what browsers do with web addresses specifically, and chose the more familiar term for that narrower job.'
        ]
      }
    ],
    references: [
      { title: 'RFC 3986: Uniform Resource Identifier (URI): Generic Syntax', url: 'https://www.rfc-editor.org/rfc/rfc3986.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1630: Universal Resource Identifiers in WWW', url: 'https://www.rfc-editor.org/info/rfc1630', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1738: Uniform Resource Locators (URL)', url: 'https://www.rfc-editor.org/info/rfc1738', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 1737: Functional Requirements for Uniform Resource Names', url: 'https://www.rfc-editor.org/info/rfc1737', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax', url: 'https://www.rfc-editor.org/info/rfc2396', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 8141: Uniform Resource Names (URNs)', url: 'https://www.rfc-editor.org/info/rfc8141', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 3987: Internationalized Resource Identifiers (IRIs)', url: 'https://www.rfc-editor.org/info/rfc3987', publisher: 'IETF / RFC Editor' },
      { title: 'WHATWG URL Standard', url: 'https://url.spec.whatwg.org/', publisher: 'WHATWG' },
      { title: 'IANA Uniform Resource Identifier (URI) Schemes registry', url: 'https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml', publisher: 'IANA' },
      { title: 'MDN: What is a URL?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL', publisher: 'MDN Web Docs' }
    ]
  }
};
