import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 16, 2026',
  publishedIso: '2026-07-16',
  modifiedIso: '2026-07-16T00:00:00-03:00'
};

export const TEXT_TOOL_ARTICLES: ToolArticle[] = [
  {
    ...publication,
    slug: 'online-text-editor-text-transformation-guide',
    toolName: 'Text Editor',
    toolRoute: '/text-editor',
    title: 'Online Text Editors: How Text Transformation Works',
    description: 'Learn how online text editors normalize, split, replace, count and transform text, with technical examples and practical use cases.',
    keywords: 'online text editor, text transformation, text cleaner, normalize text, replace text online, split text, developer text tools',
    category: 'Text Processing',
    image: '/assets/articles/text-editor-cover.png',
    imageAlt: 'Neon text editing workspace with structured lines and transformation controls',
    readingTime: '8 min read',
    introduction: [
      'Text is the most common interface between people and software. Source code, configuration, logs, CSV exports, database scripts, API payloads and support messages all begin as sequences of characters. Small inconsistencies such as unexpected line breaks, repeated whitespace or mixed letter casing can make otherwise valid content difficult to compare or import.',
      'A focused text editor is useful whenever the goal is transformation rather than document authoring. Developers use it to prepare values for SQL statements, clean copied terminal output, normalize lists before a deployment and inspect the number of characters accepted by an API field. The utily.tools Text Editor groups these operations into a browser-based workflow.'
    ],
    theoryTitle: 'Text as a sequence of characters',
    theory: [
      'At the theoretical level, a text transformation receives a string and produces another string according to deterministic rules. Line removal searches for carriage-return and line-feed sequences. Trimming collapses or removes whitespace. Splitting identifies delimiters or fixed-width boundaries, while replacement maps occurrences of one substring to another.',
      'Unicode matters because a visible character is not always equivalent to one byte or one JavaScript string position. UTF-16, used internally by JavaScript strings, represents some symbols with surrogate pairs. For ordinary Latin text, character counting appears straightforward; for emoji and combining marks, user-perceived graphemes may differ from the value returned by string length.'
    ],
    technicalIntroduction: [
      'Most editor operations can be expressed with regular expressions and immutable string methods. Immutability is important: each transformation returns a new value, which makes the operation predictable and prevents a partially modified input from escaping when validation fails.'
    ],
    technicalPoints: [
      { title: 'Line and whitespace normalization', paragraphs: ['A cross-platform line-break expression must recognize CRLF from Windows, LF from Unix systems and standalone CR from older formats. Whitespace normalization usually uses a global expression such as /\\s+/g, but that rule should not be applied blindly to source code or data where indentation is significant.'] },
      { title: 'Splitting and replacement', paragraphs: ['Delimiter-based splitting is appropriate for comma-separated identifiers or sentence boundaries. Fixed-width splitting walks the string in increments and slices each segment. Literal replacement is safer than a user-built regular expression when the search value may contain characters such as brackets, periods or question marks.'] },
      { title: 'Case conversion and line decoration', paragraphs: ['Uppercase and lowercase conversions are locale-sensitive in some languages. Line numbering and prefix insertion operate at the beginning of the text and immediately after every newline, producing output that can be pasted into documentation, tickets or scripts.'] }
    ],
    examples: [
      { title: 'Preparing identifiers for a migration', description: 'A copied column of identifiers can be trimmed, converted to one item per line and prefixed before it becomes part of a migration script.' },
      { title: 'Cleaning application logs', description: 'Repeated whitespace and unwanted breaks can be removed before a log fragment is attached to an incident or compared with a reference output.' },
      { title: 'Validating content limits', description: 'Character and word counts help verify titles, messages and payload fields before they are submitted to systems with strict limits.' }
    ],
    conclusion: [
      'Text transformation is simple in concept but appears in almost every technical workflow. Reliable handling of line endings, delimiters, whitespace and Unicode prevents subtle errors and saves time that would otherwise be spent writing temporary scripts.',
      'In my view, a good text utility should remain explicit: the user should always understand which rule will be applied and retain the original value until the result is acceptable. Try these operations in the utily.tools Text Editor, then explore the other articles on the site for deeper explanations of related developer technologies.'
    ]
  },
  {
    ...publication,
    slug: 'text-templates-variables-and-automation',
    toolName: 'Text Template',
    toolRoute: '/text-template',
    title: 'Text Templates and Variables: A Practical Automation Guide',
    description: 'Understand how text templates replace variables to generate consistent messages, commands and documents, including grammar, rendering rules and examples.',
    keywords: 'text template generator, template variables, placeholder replacement, message automation, reusable text template, developer productivity',
    category: 'Text Processing',
    image: '/assets/articles/text-template-cover.png',
    imageAlt: 'Neon document template with connected variable placeholders and generated text blocks',
    readingTime: '8 min read',
    introduction: [
      'Many technical messages repeat the same structure while only a few values change. Deployment notes contain a version and environment, support replies contain a customer and ticket number, and command snippets contain resource names. Rewriting the entire text increases the chance of inconsistent wording and forgotten substitutions.',
      'Text templates separate the stable structure from the variable data. They are used in notification systems, continuous integration pipelines, mail merge, infrastructure configuration and code generation. The utily.tools Text Template tool brings the same idea to quick browser-based tasks without requiring a template engine or project setup.'
    ],
    theoryTitle: 'Static structure and variable bindings',
    theory: [
      'A template is a string containing placeholders that follow a recognizable grammar. A rendering step discovers each placeholder, associates it with a supplied value and substitutes the occurrence in the output. If the same variable appears multiple times, one binding should update every occurrence consistently.',
      'Full template engines add conditions, loops, escaping rules and partial files. A lightweight text template intentionally limits the grammar to variable replacement. This reduced scope makes the output easier to predict and is appropriate for messages, snippets and small documents.'
    ],
    technicalIntroduction: [
      'A template language is defined by its placeholder grammar, tokenization rules, name-resolution model and behavior for missing values. Curly-brace markers such as {{name}} are readable, but any template system must distinguish valid variables from literal braces and define the meaning of an unresolved binding.'
    ],
    technicalPoints: [
      { title: 'Variable extraction', paragraphs: ['A global regular expression scans the template and captures the text inside each marker. Converting the matches to a set avoids showing duplicate input fields when a variable is reused. Names should be trimmed and empty markers ignored.'] },
      { title: 'Rendering strategy', paragraphs: ['Rendering can iterate through the variables and replace all literal occurrences. Escaping the variable name is essential if a dynamic regular expression is used. An alternative is tokenization: split the source into literal and placeholder tokens, then assemble the result from known values.'] },
      { title: 'Missing values and escaping', paragraphs: ['A predictable engine either preserves an unresolved marker or replaces it with an empty value; silently producing ambiguous output should be avoided. HTML, shell and SQL destinations require context-specific escaping because template substitution alone does not make untrusted values safe.'] }
    ],
    examples: [
      { title: 'Release communication', description: 'A release manager can reuse one announcement while changing the version, date, environment and responsible team.' },
      { title: 'Support responses', description: 'Agents can generate consistent troubleshooting instructions with the correct customer, protocol number and product name.' },
      { title: 'Command generation', description: 'A template can produce repeatable CLI commands for different namespaces or resources, provided values are reviewed and escaped for the target shell.' }
    ],
    conclusion: [
      'Templates transform repeated writing into a controlled data-binding problem. They improve consistency, shorten routine work and make the changing parts of a message visible.',
      'I consider small, transparent templates one of the highest-value forms of everyday automation: they provide most of the benefit without hiding the final text behind a complex system. Experiment with the utily.tools Text Template and continue through the site articles to learn how other focused utilities work.'
    ]
  },
  {
    ...publication,
    slug: 'text-diff-algorithms-and-comparison',
    toolName: 'Text Diff',
    toolRoute: '/text-diff',
    title: 'Text Diff Explained: Algorithms, Changes and Real Uses',
    description: 'Learn how text diff tools detect additions, removals and unchanged sequences using LCS-style algorithms, with technical examples.',
    keywords: 'text diff checker, compare text online, LCS algorithm, longest common subsequence, code comparison, line diff',
    category: 'Text Processing',
    image: '/assets/articles/text-diff-cover.png',
    imageAlt: 'Two glowing text documents connected by highlighted additions and removals',
    readingTime: '9 min read',
    introduction: [
      'Comparing two versions of text is central to software development. Version-control reviews, configuration audits, contract revisions, generated files and incident logs all depend on identifying what changed without rereading every line.',
      'A diff tool converts that visual problem into a sequence comparison. It classifies content as unchanged, added or removed and presents the result with aligned highlighting. The utily.tools Text Diff focuses on quick browser comparisons where creating a repository or opening a desktop editor would be excessive.'
    ],
    theoryTitle: 'The longest common subsequence model',
    theory: [
      'A classic diff begins by searching for a longest common subsequence, or LCS. A subsequence preserves order but does not require adjacent items. Once the largest shared backbone is known, items that appear only in the first sequence are removals and items that appear only in the second are additions.',
      'The compared items may be characters, words or lines. Character diffs are precise but noisy for long documents. Line diffs are easier to scan in code and configuration. Hybrid implementations first align lines and then highlight changed fragments inside matching line pairs.'
    ],
    technicalIntroduction: [
      'Dynamic programming computes an LCS table where each cell stores the best result for prefixes of the two sequences. Reconstructing the path through that table produces a series of equal, delete and insert operations.'
    ],
    technicalPoints: [
      { title: 'Time and memory complexity', paragraphs: ['The straightforward LCS table requires O(m × n) time and memory for inputs of length m and n. This is acceptable for modest browser inputs but becomes expensive for large files. Production diff engines may use Myers algorithm or memory-reduced variants.'] },
      { title: 'Granularity and normalization', paragraphs: ['Splitting by newline creates a line-oriented comparison. Optional normalization can ignore whitespace or case, but it changes semantics and should be explicit. A configuration diff where indentation matters must not use the same rules as a prose comparison.'] },
      { title: 'Safe rendering', paragraphs: ['Compared text is untrusted content. Before inserting highlighted fragments into HTML, ampersands, angle brackets and quotes must be escaped. Only the diff markup itself should be trusted, otherwise a pasted script could become an injection vector.'] }
    ],
    examples: [
      { title: 'Configuration review', description: 'Teams compare a known-good configuration with a deployed copy to identify changed endpoints, flags or resource limits.' },
      { title: 'API regression investigation', description: 'Two serialized responses can be compared to find renamed fields or unexpected messages after a release.' },
      { title: 'Editorial revision', description: 'Writers and analysts can inspect exactly which sentences changed between drafts before accepting a revision.' }
    ],
    conclusion: [
      'Diff algorithms turn a subjective visual search into a reproducible comparison based on shared order. Understanding granularity, complexity and normalization helps readers interpret the highlighted result correctly.',
      'My opinion is that diff is one of the foundational ideas of collaborative computing: it makes change reviewable. Use the utily.tools Text Diff for focused comparisons, and visit the other articles to explore the algorithms behind the rest of the toolbox.'
    ]
  },
  {
    ...publication,
    slug: 'base64-encoding-decoding-guide',
    toolName: 'Base64 Text Converter',
    toolRoute: '/base64',
    title: 'Base64 Encoding and Decoding: How It Really Works',
    description: 'Understand Base64 encoding, its 24-bit conversion process, padding, UTF-8 handling and practical uses in APIs, email and data URLs.',
    keywords: 'base64 encoder, base64 decoder, how base64 works, base64 encoding, base64 padding, text to base64, base64 online',
    category: 'Data Encoding',
    image: '/assets/articles/base64-cover.png',
    imageAlt: 'Glowing binary data transforming into structured Base64 character blocks',
    readingTime: '9 min read',
    introduction: [
      'Base64 appears wherever binary data must travel through a text-oriented channel. Email attachments, JSON APIs, data URLs, certificates and authentication headers commonly contain long strings made from letters, numbers, plus signs and slashes.',
      'Despite its appearance, Base64 is not encryption. It is a reversible representation that makes arbitrary bytes safe for systems designed around printable characters. The utily.tools Base64 Text Converter lets users inspect the transformation while preserving Unicode text correctly.'
    ],
    theoryTitle: 'From three bytes to four symbols',
    theory: [
      'Base64 groups input into blocks of 24 bits, normally three 8-bit bytes. Each block is divided into four 6-bit values. Because six bits represent 64 possibilities, every value maps to one symbol in a 64-character alphabet. The standard alphabet uses A–Z, a–z, 0–9, + and /.',
      'When the final block contains fewer than three bytes, zero bits complete the calculation and equals signs indicate missing output bytes. One remaining byte produces two symbols and two padding characters; two bytes produce three symbols and one padding character. Base64 increases size by roughly one third.'
    ],
    technicalIntroduction: [
      'The essential boundary is between characters and bytes. Base64 operates on octets and has no knowledge of Unicode, so text must first be mapped to bytes with a declared character encoding such as UTF-8. Decoding reverses those layers in order: Base64 symbols become bytes, then the selected charset converts the bytes back into characters.'
    ],
    technicalPoints: [
      { title: 'Bit-level transformation', paragraphs: ['For bytes 01001101, 01100001 and 01101110, concatenation yields 010011010110000101101110. Splitting into six-bit groups gives decimal values 19, 22, 5 and 46, which map to TWFu.'] },
      { title: 'Standard and URL-safe alphabets', paragraphs: ['Base64url replaces + with - and / with _, often omitting padding. JWT and JWE use this form because standard Base64 symbols have special meaning in URLs and filenames. A decoder must know which alphabet it receives.'] },
      { title: 'Validation and security', paragraphs: ['A decoder should reject malformed lengths and unexpected symbols instead of silently returning corrupted bytes. Base64 offers no confidentiality or integrity; credentials encoded in Base64 remain readable to anyone who obtains the value.'] }
    ],
    examples: [
      { title: 'JSON API payloads', description: 'A small binary value can be embedded in JSON as Base64 when multipart upload is unavailable, accepting the size overhead.' },
      { title: 'Email and MIME', description: 'Attachments are commonly encoded so binary bytes survive mail infrastructure that historically expected textual content.' },
      { title: 'Certificates and keys', description: 'PEM files wrap Base64-encoded DER bytes between descriptive headers and footers, making cryptographic objects portable as text.' }
    ],
    conclusion: [
      'Base64 is a transport encoding: it maps bytes to a limited printable alphabet with predictable overhead and no secrecy. Correct Unicode conversion, padding and alphabet selection are essential for interoperable results.',
      'I believe Base64 is most useful when treated as an explicit compatibility layer, not as a default storage format or security feature. Test the transformation in the utily.tools Base64 Text Converter and continue reading the site articles for more detail on formats such as JWT, JWE and certificates.'
    ]
  },
  {
    ...publication,
    slug: 'url-encoding-percent-encoding-guide',
    toolName: 'URL Codec',
    toolRoute: '/url-codec',
    title: 'URL Encoding Explained: Percent-Encoding in Practice',
    description: 'Learn how URL percent-encoding represents reserved characters and UTF-8 bytes in paths and query strings, including standards, normalization and security.',
    keywords: 'URL encoder, URL decoder, percent encoding, URL component encoding, URL encoding explained, query string encoding, RFC 3986',
    category: 'Web Standards',
    image: '/assets/articles/url-codec-cover.png',
    imageAlt: 'Neon web address flowing through percent-encoded character symbols',
    readingTime: '8 min read',
    introduction: [
      'URLs connect nearly every web interaction, but their syntax assigns special meaning to characters such as ?, &, #, / and =. A user value containing one of these symbols can accidentally change the structure of a request unless it is represented safely.',
      'Percent-encoding converts bytes that cannot appear literally into a percent sign followed by two hexadecimal digits. Browsers, API clients, routers and OAuth systems use it constantly. The utily.tools URL Codec provides a quick way to encode or inspect these values.'
    ],
    theoryTitle: 'Reserved characters and UTF-8 bytes',
    theory: [
      'RFC 3986 divides URI characters into unreserved, reserved and percent-encoded forms. Letters, digits, hyphen, period, underscore and tilde are generally unreserved. Reserved characters act as delimiters and should only remain literal when their structural meaning is intended.',
      'Non-ASCII characters are first encoded as UTF-8 bytes. Each byte is then written as %HH. The character ç becomes the UTF-8 bytes C3 A7 and therefore appears as %C3%A7. Decoding reverses the hexadecimal byte representation and then interprets the byte sequence as UTF-8.'
    ],
    technicalIntroduction: [
      'Percent-encoding is component-dependent. A complete URI contains structural delimiters that must remain recognizable, whereas an individual path segment or query value treats many of those same characters as data. Applying the wrong character set can either destroy the URI structure or allow a value to alter it.'
    ],
    technicalPoints: [
      { title: 'Component-aware encoding', paragraphs: ['Path segments, query names, query values and fragments occupy different grammatical positions. Each value must be encoded before it is assembled with structural delimiters; applying one rule to the complete address can escape required separators, while leaving data delimiters unescaped can enable parameter injection.'] },
      { title: 'Spaces and form encoding', paragraphs: ['Generic percent-encoding represents a space as %20. The application/x-www-form-urlencoded format commonly uses + for spaces and percent-encodes a literal plus sign. Confusing these conventions can change values during decoding.'] },
      { title: 'Double encoding', paragraphs: ['Encoding an already encoded percent sign transforms %20 into %2520. Systems should define exactly one encoding boundary and avoid repeatedly normalizing input, especially around redirects and signature calculations.'] }
    ],
    examples: [
      { title: 'Search parameters', description: 'Search text containing ampersands or hash signs must remain one query value instead of being interpreted as another parameter or fragment.' },
      { title: 'OAuth redirects', description: 'A callback URL is often itself embedded as a query parameter, so its delimiters must be encoded at the correct nesting level.' },
      { title: 'Internationalized content', description: 'Product names, addresses and user-generated text use UTF-8 percent-encoding when included in paths or query strings.' }
    ],
    conclusion: [
      'URL encoding protects the boundary between URI structure and user data. The correct function depends on whether the input is an entire address, a path segment, a query value or form data.',
      'In my opinion, the safest approach is to build URLs with structured APIs and use manual encoding tools for inspection and debugging. Explore values with the utily.tools URL Codec, then read more articles on the site about the formats and security mechanisms carried by modern web requests.'
    ]
  }
];
