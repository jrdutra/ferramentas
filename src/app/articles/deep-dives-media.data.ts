import { ArticleDeepDive } from './tool-article.model';

export const MEDIA_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  'ocr-image-to-text-technology': {
    readingTime: '19 min read',
    deepDiveSections: [
      {
        title: 'The OCR pipeline from pixels to characters',
        paragraphs: [
          'Optical character recognition is a pipeline rather than one classification call. Preprocessing estimates orientation, removes noise, normalizes illumination, deskews the page and may binarize it. Layout analysis identifies blocks, columns, lines and reading order. Recognition converts line images into character sequences, and language models rank plausible outputs.',
          'Tesseract 4 introduced an LSTM-based recognition engine and Tesseract 5 continues that architecture. LSTM networks model context across a text line, which helps distinguish ambiguous glyphs. The traineddata package supplies script, language, character set, dictionaries and network parameters, so choosing the correct model is part of the algorithm.'
        ],
        table: {
          caption: 'OCR stages and typical failure modes',
          headers: ['Stage', 'Purpose', 'Frequent failure'],
          rows: [
            ['Image acquisition', 'Capture enough signal', 'Motion blur, glare, low DPI and compression artifacts'],
            ['Preprocessing', 'Deskew, denoise and normalize contrast', 'Removing thin strokes or preserving background noise'],
            ['Layout analysis', 'Find regions, lines and order', 'Mixing columns, captions or tables'],
            ['Recognition', 'Map line image to symbol sequence', 'Similar glyphs such as O/0 and l/1'],
            ['Post-processing', 'Apply language and format constraints', 'Overcorrecting names, codes or multilingual text']
          ]
        }
      },
      {
        title: 'Segmentation modes, confidence and evaluation',
        paragraphs: [
          'Page segmentation mode encodes assumptions: a full page of blocks, one uniform block, one line or one sparse-text image require different analysis. Supplying the wrong mode can be more damaging than using a smaller recognition model. Regions of interest reduce noise when the expected field location is known.',
          'Confidence is a model score, not a probability that guarantees correctness. Evaluate Character Error Rate and Word Error Rate against representative ground truth, separated by document class and language. For structured identifiers, add format and check-digit validation but retain the original image for human review.'
        ]
      },
      {
        title: 'Execution models, privacy and resource limits',
        paragraphs: [
          'OCR may run locally, on an edge device or as a remote service. Local execution can reduce data exposure and network latency, while centralized execution can provide larger models and specialized hardware. In every model, decoded pixel buffers are much larger than compressed uploads and should be bounded by dimensions, page count and available memory.',
          'Resize only to a resolution that preserves character detail and retain the original for audit or human review when the workflow is consequential. OCR output is untrusted text: validate it before using it as an identifier, command, query, address or navigation target.'
        ]
      }
    ],
    references: [
      { title: 'Tesseract 5 User Manual', url: 'https://tesseract-ocr.github.io/tessdoc/Home.html', publisher: 'Tesseract OCR project' },
      { title: 'Tesseract LSTM architecture overview', url: 'https://tesseract-ocr.github.io/tessdoc/tess4/NeuralNetsInTesseract4.00.html', publisher: 'Tesseract OCR project' },
      { title: 'Tesseract.js documentation', url: 'https://tesseract.projectnaptha.com/', publisher: 'Tesseract.js project' }
    ]
  },
  'qr-code-generation-error-correction': {
    readingTime: '20 min read',
    deepDiveSections: [
      {
        title: 'DENSO WAVE, ISO/IEC 18004 and symbol anatomy',
        paragraphs: [
          'QR Code was created by DENSO WAVE in 1994 and approved as ISO/IEC 18004 in 2000. A Model 2 symbol has three finder patterns, separators, timing patterns, alignment patterns in larger versions, format information, optional version information and a data region. A mandatory quiet zone of four modules surrounds the symbol.',
          'Versions range from 1 at 21×21 modules to 40 at 177×177, adding four modules per side. The encoder selects a version that fits the mode, data length and error-correction level. Numeric, alphanumeric, byte and Kanji modes have different bit efficiencies, and a symbol may switch modes within one payload.'
        ],
        table: {
          caption: 'QR Code error-correction levels',
          headers: ['Level', 'Approximate recoverable codewords', 'Typical trade-off'],
          rows: [
            ['L', '7%', 'Maximum capacity for clean controlled environments'],
            ['M', '15%', 'Common general-purpose default'],
            ['Q', '25%', 'More resilience with a larger symbol'],
            ['H', '30%', 'Highest resilience and lowest capacity at a fixed version']
          ]
        }
      },
      {
        title: 'Bit stream, Reed-Solomon blocks and mask selection',
        paragraphs: [
          'Encoding writes a mode indicator, character count and encoded data bits, adds a terminator and pad bytes, then partitions codewords into blocks. Reed-Solomon error-correction codewords are calculated over GF(256) and interleaved with data codewords so localized damage is distributed across blocks.',
          'Eight candidate masks alter module colors according to fixed formulas. The encoder scores each result for long runs, 2×2 blocks, finder-like patterns and dark/light imbalance, then selects the lowest-penalty mask. Format information records the error-correction level and chosen mask.'
        ]
      },
      {
        title: 'Design customization without destroying scan reliability',
        paragraphs: [
          'Module size, contrast, quiet zone and print quality matter more than visual preview size. Test at the final physical dimensions, expected camera distance, lighting and substrate. Avoid gradients with poor local contrast and do not distort the square grid.',
          'A central logo consumes error-correction budget but damage location and block distribution matter, so the nominal percentage is not permission to cover that percentage arbitrarily. Keep finder, timing, alignment and format regions intact and test with multiple scanning engines. Encode short HTTPS URLs rather than large payloads when practical.'
        ]
      }
    ],
    references: [
      { title: 'QR Code standardization history and outline', url: 'https://www.qrcode.com/en/about/standards.html', publisher: 'DENSO WAVE' },
      { title: 'QR Code versions and capacity', url: 'https://www.qrcode.com/en/about/version.html/versionPage/index.html', publisher: 'DENSO WAVE' },
      { title: 'QR Code error correction', url: 'https://www.qrcode.com/en/about/error_correction.html', publisher: 'DENSO WAVE' },
      { title: 'QR Code quiet-zone guidance', url: 'https://www.qrcode.com/en/howto/code.html', publisher: 'DENSO WAVE' }
    ]
  },
  'merge-pdf-and-images-in-browser': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'PDF object graph and page tree',
        paragraphs: [
          'PDF became ISO 32000 and represents a document as an object graph containing dictionaries, arrays, names, strings, streams and indirect references. The document catalog points to a page tree whose leaf Page objects define ordered pages. Each page references content streams, resources, media boxes, annotations and inherited attributes.',
          'A merger cannot safely concatenate file bytes. It parses each source, copies selected page objects and every reachable dependency into a new object graph, remaps indirect references, builds a new page tree and writes a cross-reference structure and trailer.'
        ],
        table: {
          caption: 'What may happen during a PDF merge',
          headers: ['Feature', 'Why it is difficult', 'Practical expectation'],
          rows: [
            ['Fonts and images', 'Referenced through page resources', 'Must be copied and deduplicated safely'],
            ['Forms', 'Field names and shared AcroForm state can collide', 'May require flattening or field renaming'],
            ['Bookmarks', 'Destinations reference source pages', 'Often not preserved by simple page copying'],
            ['Digital signatures', 'Cover exact byte ranges', 'Any rewritten merged document invalidates prior signatures'],
            ['Encryption', 'Objects depend on source security handlers', 'Usually requires decryption before copying'],
            ['Tagged PDF', 'Structure tree connects semantic content to pages', 'Accessibility metadata may need specialized merging']
          ]
        }
      },
      {
        title: 'Converting images into PDF pages',
        paragraphs: [
          'An image is embedded as an image XObject and painted by a page content stream through a transformation matrix. Pixel dimensions do not define physical page size until mapped to PDF user-space units, conventionally 72 points per inch. EXIF orientation, alpha channels and color profiles require deliberate handling.',
          'JPEG can often be embedded without recompressing its DCT stream; PNG generally requires decoding and embedding pixel data with appropriate compression and transparency. Scaling should preserve aspect ratio and avoid accidental upsampling that increases file size without adding detail.'
        ]
      },
      {
        title: 'Memory, malformed files and local privacy',
        paragraphs: [
          'Local merging can keep documents private because inputs need not leave the device. It still needs limits: parsing multiple PDFs, decoding images and serializing the result can hold several copies in memory. Sequential processing and bounded object or stream sizes reduce peak resource use.',
          'PDF is a complex active format. Reject encrypted or malformed input cleanly, cap object and stream sizes, and do not assume a newly merged file is safe merely because parsing succeeded. Viewer JavaScript, attachments and actions may require sanitization in security-sensitive workflows.'
        ]
      }
    ],
    references: [
      { title: 'PDF 2.0 specification, ISO 32000-2', url: 'https://pdfa.org/resource/iso-32000-2/', publisher: 'PDF Association / ISO' },
      { title: 'Adobe PDF Reference archive', url: 'https://opensource.adobe.com/dc-acrobat-sdk-docs/pdflsdk/', publisher: 'Adobe' }
    ]
  },
  'split-pdf-pages-and-export-jpg': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'Page extraction is object-graph copying',
        paragraphs: [
          'Extracting a page as a new PDF copies the Page object and its transitive resources into a new document, remaps indirect references and constructs a one-page page tree. Page resources can include fonts, images, color spaces, patterns, annotations and inherited boxes. Copying only the visible content stream produces an incomplete file.',
          'Page numbers shown to users are one-based, while many libraries use zero-based indexes. Validate ranges, preserve requested order and define how duplicates are handled. A split rewrites bytes and therefore invalidates digital signatures that protected the original document.'
        ]
      },
      {
        title: 'Rendering PDF pages to JPEG',
        paragraphs: [
          'PDF-to-image is rendering, not extraction. A renderer interprets graphics operators, fonts, transparency, clipping, color spaces and embedded images to paint a pixel surface. The viewport scale controls output pixels: doubling both width and height quadruples pixel memory and roughly quadruples rendering work.',
          'JPEG discards transparency and introduces lossy artifacts, so a background and quality must be selected explicitly. PNG is better for sharp diagrams and text but can be larger. A conforming renderer must also treat fonts, color profiles, transparency groups and malformed content streams as potentially complex or untrusted input.'
        ],
        table: {
          caption: 'PDF page export choices',
          headers: ['Output', 'Preserves', 'Loses or changes'],
          rows: [
            ['Single-page PDF', 'Vectors, searchable text and most page resources', 'Document-level navigation, signatures and some shared structures'],
            ['JPEG', 'Visual appearance at chosen resolution', 'Vectors, searchable text, transparency and exact colors'],
            ['PNG', 'Lossless rendered pixels and transparency support', 'Vectors, searchable text and interactive behavior'],
            ['ZIP package', 'Convenient batch transport', 'Adds container overhead; filenames and ordering must be defined']
          ]
        }
      },
      {
        title: 'Performance and output integrity',
        paragraphs: [
          'Render or copy pages incrementally rather than rasterizing an entire large document at once. Limit total pixel count, page count and archive size, because decoded surfaces can consume several bytes per pixel before compression.',
          'Use deterministic filenames with zero-padded page numbers so lexical order matches document order. Validate that every requested page produced output before finalizing a ZIP, and report partial failures instead of silently omitting pages.'
        ]
      }
    ],
    references: [
      { title: 'PDF 2.0 specification, ISO 32000-2', url: 'https://pdfa.org/resource/iso-32000-2/', publisher: 'PDF Association / ISO' },
      { title: 'JPEG standard overview, ITU-T T.81', url: 'https://www.itu.int/rec/T-REC-T.81', publisher: 'ITU-T' }
    ]
  },
  'create-pdf-from-images-browser': {
    readingTime: '17 min read',
    deepDiveSections: [
      {
        title: 'Mapping image pixels to a physical page',
        paragraphs: [
          'PDF page coordinates use user-space units, conventionally 72 points per inch. An A4 page is approximately 595×842 points and US Letter is 612×792 points. To fit an image without distortion, compute scale = min(availableWidth/imageWidth, availableHeight/imageHeight), then center or align the scaled result inside the margins.',
          'Pixel metadata may include a DPI hint, but browser-decoded images primarily expose pixels. Decide whether the workflow prioritizes a chosen paper size, a chosen physical DPI or one PDF point per source pixel. Each produces different print dimensions.'
        ],
        table: {
          caption: 'Image-to-PDF layout decisions',
          headers: ['Decision', 'Options', 'Consequence'],
          rows: [
            ['Page size', 'A4, Letter, custom or image-sized', 'Controls physical output and pagination consistency'],
            ['Fit mode', 'Contain, cover or actual size', 'Contain preserves all pixels; cover crops; actual size can overflow'],
            ['Orientation', 'Portrait, landscape or automatic', 'Automatic can minimize unused space per image'],
            ['Margins', 'None or fixed points', 'Printer-safe margins reduce usable area'],
            ['Compression', 'JPEG quality or lossless embedding', 'Trades file size against artifacts and transparency']
          ]
        }
      },
      {
        title: 'Embedding JPEG and PNG correctly',
        paragraphs: [
          'JPEG stores already compressed image samples and is efficient for photographs. PNG supports lossless compression and alpha transparency and is better for screenshots, diagrams and flat graphics. Converting every input to JPEG can create halos around transparency and blur text.',
          'Apply EXIF orientation before measuring layout, preserve aspect ratio and define a background when flattening alpha. Very high-resolution photos should be downsampled to the intended print resolution before embedding; shrinking only the drawing rectangle does not necessarily reduce PDF bytes.'
        ]
      },
      {
        title: 'Metadata, accessibility and resource limits',
        paragraphs: [
          'A professional PDF can include title, author, subject, keywords, creation date and page order. Image-only pages contain no searchable text or semantic structure. OCR can add a hidden text layer, while tagged PDF and alternative text require a more advanced authoring pipeline.',
          'Generate locally for privacy, but cap image dimensions and total decoded pixels. Decode sequentially where possible, display the final page count and size, and ensure the output begins with a valid PDF header and can be reopened before offering it to the user.'
        ]
      }
    ],
    references: [
      { title: 'PDF 2.0 specification, ISO 32000-2', url: 'https://pdfa.org/resource/iso-32000-2/', publisher: 'PDF Association / ISO' },
      { title: 'PNG Specification, Third Edition', url: 'https://www.w3.org/TR/png-3/', publisher: 'W3C' },
      { title: 'Exif 3.0 metadata specification', url: 'https://www.cipa.jp/std/documents/e/DC-008-Translation-2023-E.pdf', publisher: 'CIPA / JEITA' }
    ]
  },
  'real-time-text-sharing-websockets': {
    readingTime: '20 min read',
    deepDiveSections: [
      {
        title: 'WebSocket standardization and handshake',
        paragraphs: [
          'The WebSocket protocol is standardized by the IETF in RFC 6455. A client begins with an HTTP Upgrade request containing Sec-WebSocket-Key and version 13. A successful server returns status 101 and Sec-WebSocket-Accept derived from the key and the protocol GUID. The channel then carries full-duplex framed messages over the underlying connection.',
          'Text frames contain UTF-8; binary frames are application-defined. Control opcodes handle close, ping and pong. Client-to-server frames are masked to protect intermediaries, but masking is not encryption. Production traffic uses wss with TLS.'
        ],
        table: {
          caption: 'Layers in the real-time text stack',
          headers: ['Layer', 'Responsibility', 'What it does not guarantee'],
          rows: [
            ['TCP', 'Ordered reliable byte stream', 'Application message boundaries or reconnection continuity'],
            ['WebSocket', 'Handshake and text/binary/control frames', 'Rooms, acknowledgements or stored history'],
            ['Socket.IO transport', 'Fallbacks, heartbeats and reconnection', 'Exactly-once delivery by itself'],
            ['Socket.IO application protocol', 'Events, acknowledgements and namespaces', 'Business authorization or durable persistence'],
            ['Channel application', 'Room membership, versions and text state', 'Security unless identity and access rules are enforced']
          ]
        }
      },
      {
        title: 'Synchronization, ordering and conflict models',
        paragraphs: [
          'Sending the entire text after every change is simple but consumes bandwidth and can overwrite concurrent edits. Deltas reduce traffic but need a base revision and an unambiguous operation format. Attach monotonically increasing server revisions so clients can reject stale messages and request a full snapshot after a gap.',
          'Last-write-wins is acceptable for ephemeral single-writer sharing but loses concurrent input. Operational Transformation and CRDTs preserve multi-user edits by transforming or merging operations, at the cost of more metadata and implementation complexity. The chosen consistency model should be explicit.'
        ]
      },
      {
        title: 'Delivery guarantees, scale and security',
        paragraphs: [
          'Socket.IO preserves message ordering but default delivery is at most once: a connection break can lose an event without automatic server persistence. At-least-once behavior needs unique event IDs, acknowledgements, retries and deduplication. Durable recovery requires a log or database and client offsets.',
          'Authenticate the connection, authorize every room join and update, validate Origin, rate-limit events and cap payload size. High-entropy channel identifiers reduce accidental discovery but are not authorization. Avoid placing secrets in URLs because they leak through history and logs, and define retention and deletion for any server-stored text.',
          'Horizontal scaling needs a shared adapter or broker so events reach clients connected to different server instances. Load balancers may need connection affinity depending on the transport configuration, and deploys need graceful connection draining.'
        ]
      }
    ],
    references: [
      { title: 'RFC 6455: The WebSocket Protocol', url: 'https://www.rfc-editor.org/rfc/rfc6455.html', publisher: 'IETF / RFC Editor' },
      { title: 'Socket.IO protocol specification', url: 'https://github.com/socketio/socket.io-protocol', publisher: 'Socket.IO project' },
      { title: 'Socket.IO delivery guarantees', url: 'https://socket.io/docs/v4/delivery-guarantees', publisher: 'Socket.IO project' },
      { title: 'Socket.IO rooms documentation', url: 'https://socket.io/docs/v4/rooms/', publisher: 'Socket.IO project' }
    ]
  }
};
