import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 16, 2026',
  publishedIso: '2026-07-16',
  modifiedIso: '2026-07-16T00:00:00-03:00'
};

export const MEDIA_TOOL_ARTICLES: ToolArticle[] = [
  {
    ...publication,
    slug: 'ocr-image-to-text-technology',
    toolName: 'OCR Converter',
    toolRoute: '/image-to-text-ocr',
    title: 'OCR Explained: How Images Become Editable Text',
    description: 'Learn how optical character recognition preprocesses images, detects text and uses trained language models to produce editable content.',
    keywords: 'OCR online, image to text, optical character recognition, Tesseract OCR, extract text from image, OCR preprocessing',
    category: 'Images and OCR',
    image: '/assets/articles/ocr-converter-cover.png',
    imageAlt: 'Luminous document image being scanned into precise editable text characters',
    readingTime: '11 min read',
    introduction: [
      'Screenshots, scanned forms, photographs and historical archives contain text as pixels rather than characters. Search engines cannot index it directly, screen readers cannot interpret it and users cannot copy it into another application.',
      'Optical character recognition converts those visual patterns into machine-readable text. It is used in document digitization, accessibility, invoice processing, identity workflows and archival search. The utily.tools OCR Converter runs recognition through Tesseract.js in the browser.'
    ],
    theoryTitle: 'From pixels to characters and words',
    theory: [
      'An OCR pipeline analyzes an image, locates text regions, segments lines or symbols and predicts characters using a trained model. Modern engines combine visual recognition with language information so ambiguous shapes can be interpreted in context.',
      'Recognition is probabilistic. Resolution, contrast, blur, perspective, font, handwriting and language influence confidence. The output should be reviewed when it controls money, identity or legal records.'
    ],
    technicalIntroduction: [
      'A recognition pipeline converts compressed image data into pixels, normalizes contrast and geometry, analyzes page layout, segments lines or regions and classifies character sequences with trained models. Language constraints and confidence scores help rank alternatives, while post-processing reconstructs words and reading order.'
    ],
    technicalPoints: [
      { title: 'Image preprocessing', paragraphs: ['Grayscale conversion, contrast adjustment, thresholding, deskewing, denoising and perspective correction can dramatically improve input. Upscaling may help small glyphs but cannot recreate detail absent from the source.'] },
      { title: 'Segmentation and language models', paragraphs: ['Page-segmentation modes describe whether the image contains a block, sparse text or a single line. Selecting the correct trained languages narrows predictions and handles accents, but loading more languages increases startup cost.'] },
      { title: 'Computational cost, confidence and privacy', paragraphs: ['OCR expands compressed images into large pixel matrices and may evaluate several layout and language hypotheses, so memory and processing cost grow with resolution and page count. Local processing can reduce data exposure, but model assets, retention policy and the treatment of recognized text must still be considered.'] }
    ],
    examples: [
      { title: 'Scanned document indexing', description: 'A document-management system adds recognized text beside the original scan so records become searchable.' },
      { title: 'Screenshot recovery', description: 'A developer extracts an error message from an image before searching logs or documentation.' },
      { title: 'Invoice assistance', description: 'OCR proposes supplier, date and amount fields, while validation rules and human review confirm the final accounting data.' }
    ],
    conclusion: [
      'OCR combines image processing, segmentation and trained recognition models to bridge visual documents and textual systems. Quality and confidence depend heavily on the source image and selected language.',
      'My opinion is that OCR is most valuable as an assisted extraction step, not an unquestioned source of truth. Try clear images with the utily.tools OCR Converter and read the other site articles about images, QR codes and PDF processing.'
    ]
  },
  {
    ...publication,
    slug: 'qr-code-generation-error-correction',
    toolName: 'Text to QR Code',
    toolRoute: '/text-to-qrcode',
    title: 'QR Codes: Encoding, Error Correction and Design',
    description: 'Understand QR Code structure, data modes, Reed–Solomon error correction, masking and the design rules behind reliable custom codes.',
    keywords: 'QR code generator, how QR codes work, QR error correction, Reed Solomon QR, custom QR code, text to QR code',
    category: 'Images and Codes',
    image: '/assets/articles/qr-code-generator-cover.png',
    imageAlt: 'Elegant neon QR matrix with finder patterns, data modules and scanning beams',
    readingTime: '11 min read',
    introduction: [
      'QR Codes connect physical surfaces to digital information. Product packaging, event tickets, payment flows, Wi-Fi setup, authentication and marketing campaigns use a camera-readable square to carry text or a URL.',
      'A QR Code is more than random black and white cells. Its geometry helps a scanner locate, orient and recover data even when part of the symbol is damaged. The utily.tools Text to QR Code tool adds visual customization and export while preserving the encoded payload.'
    ],
    theoryTitle: 'A matrix symbol with recoverable data',
    theory: [
      'The matrix contains finder patterns, timing patterns, alignment patterns, format information and encoded data modules. A quiet zone around the symbol separates it from surrounding graphics. Version determines matrix dimensions and capacity.',
      'Input is encoded in numeric, alphanumeric, byte or kanji modes. Reed–Solomon error-correction codewords allow recovery from missing or incorrect modules. Levels L, M, Q and H trade capacity for increasing resilience.'
    ],
    technicalIntroduction: [
      'Generation selects an encoding mode and version, builds data codewords, adds error-correction blocks, places bits into the matrix and evaluates mask patterns designed to avoid scanner-hostile visual structures.'
    ],
    technicalPoints: [
      { title: 'Capacity and payload design', paragraphs: ['Long URLs increase the required version and module density. A short redirect URL can create a simpler, more reliable code and allows the destination to change without reprinting the physical symbol.'] },
      { title: 'Masking and contrast', paragraphs: ['Eight masks alter module placement with reversible formulas. A penalty score selects the pattern with balanced runs and contrast. Custom colors must preserve strong luminance contrast; gradients and transparent backgrounds require real-device testing.'] },
      { title: 'Logos and rounded modules', paragraphs: ['A centered logo intentionally covers data, relying on error correction. Its size, padding and location must remain conservative. Finder patterns should stay recognizable even when normal modules are drawn as circles or rounded shapes.'] }
    ],
    examples: [
      { title: 'Event admission', description: 'A ticket embeds a short signed identifier that the gate application verifies and marks as consumed.' },
      { title: 'Wi-Fi onboarding', description: 'A standard WIFI payload lets a compatible phone configure network name and credentials after user confirmation.' },
      { title: 'Packaging and manuals', description: 'A durable redirect code links a physical product to documentation while analytics and destinations evolve behind the short URL.' }
    ],
    conclusion: [
      'QR Codes combine structured geometry, compact encoding, masking and error correction to make data resilient under real camera conditions. Good visual design must respect the technical features scanners depend on.',
      'I enjoy customized QR Codes when aesthetics remain subordinate to scanning reliability. Build and test designs with the utily.tools Text to QR Code tool, and explore more site articles about URL encoding, images and security tokens.'
    ]
  },
  {
    ...publication,
    slug: 'merge-pdf-and-images-in-browser',
    toolName: 'PDF & Image Merger',
    toolRoute: '/pdf-merger',
    title: 'How PDF and Image Merging Works in the Browser',
    description: 'Learn how PDF pages are copied, images are embedded, dimensions are preserved and mixed files become one downloadable document.',
    keywords: 'merge PDF online, combine PDF and images, PDF merger, PDF object structure, merge images to PDF, PDF page tree',
    category: 'PDF Processing',
    image: '/assets/articles/pdf-merger-cover.png',
    imageAlt: 'Multiple PDF pages and images converging into one polished digital document',
    readingTime: '10 min read',
    introduction: [
      'Reports, scanned records, portfolios and application packages often arrive as several PDFs and image files that must be delivered in one order. Desktop suites can perform the task, but quick browser-side merging removes installation and upload steps.',
      'The utily.tools PDF & Image Merger accepts mixed files, supports drag-and-drop ordering and can produce a combined PDF or a long image depending on the selected workflow.'
    ],
    theoryTitle: 'Page composition rather than text concatenation',
    theory: [
      'A PDF is a structured collection of indirect objects, page trees, fonts, images and content streams. Two PDF byte sequences cannot simply be appended. A merger creates a new document and copies selected page objects while preserving their resources.',
      'Raster images do not contain PDF pages, so the merger creates a page with dimensions derived from the image and embeds the compressed pixels into its content. Orientation and scaling determine whether the output preserves native dimensions or targets a standard paper size.'
    ],
    technicalIntroduction: [
      'A merger parses each source object graph, copies the selected pages and all reachable resources, remaps indirect object references, constructs a destination page tree and serializes a new cross-reference structure. Raster inputs require image objects, color-space metadata and page content streams that position the pixels in PDF user space.'
    ],
    technicalPoints: [
      { title: 'Ordering and resource copying', paragraphs: ['The selected sequence becomes the destination page order. Copied pages must retain their media boxes and reachable fonts, images, graphics states and color spaces. Encrypted, malformed or rights-restricted sources require explicit policy and may not be safely processed.'] },
      { title: 'Image dimensions and quality', paragraphs: ['Using pixel dimensions as PDF points changes physical print size because a point is 1/72 inch. A production workflow may read DPI metadata or scale into A4/Letter boundaries. Re-encoding through canvas can lose metadata and introduce JPEG artifacts.'] },
      { title: 'Resource and complexity limits', paragraphs: ['Merging may hold compressed sources, parsed object graphs, decoded images and the destination simultaneously. Peak memory can greatly exceed file size, especially for raster content. Large workflows therefore need explicit size limits, incremental processing where possible and validation against decompression bombs or cyclic object graphs.'] }
    ],
    examples: [
      { title: 'Application package', description: 'A cover letter, form, certificates and scanned identification become one ordered PDF for submission.' },
      { title: 'Monthly reporting', description: 'Independently generated charts and departmental PDFs are combined into one consistent delivery artifact.' },
      { title: 'Photo documentation', description: 'Site photographs are ordered and embedded as pages alongside a written inspection report.' }
    ],
    conclusion: [
      'PDF merging rebuilds a document from copied pages and newly embedded images. Page geometry, image decoding, resource preservation and memory limits determine output quality.',
      'My preference is local browser merging for ordinary, non-confidential jobs that fit comfortably in memory, with dedicated server workflows for very large or archival documents. Try the utily.tools PDF & Image Merger and read the splitter and creator articles for complementary operations.'
    ]
  },
  {
    ...publication,
    slug: 'split-pdf-pages-and-export-jpg',
    toolName: 'PDF Splitter',
    toolRoute: '/pdf-splitter',
    title: 'PDF Splitting and Page-to-JPG Rendering Explained',
    description: 'Understand how PDF pages are extracted without rasterization and how content streams are rendered into JPG images and packaged downloads.',
    keywords: 'split PDF online, extract PDF pages, PDF to JPG, PDF rasterization, PDF content streams, ZIP PDF pages',
    category: 'PDF Processing',
    image: '/assets/articles/pdf-splitter-cover.png',
    imageAlt: 'One PDF document separating into clean individual pages and image previews',
    readingTime: '10 min read',
    introduction: [
      'Large PDF files often contain independent invoices, forms, chapters or scans that must be distributed separately. Extracting each page as a PDF preserves its document structure, while exporting JPG creates a widely viewable raster snapshot.',
      'The utily.tools PDF Splitter supports both workflows and packages the generated files into a ZIP, keeping the entire operation manageable from one browser action.'
    ],
    theoryTitle: 'Extraction versus rasterization',
    theory: [
      'Page extraction copies a page object and its dependencies into a new PDF. Vector text, paths, embedded fonts and images remain document objects, so zoom quality and text selection may be preserved.',
      'Rasterization interprets the page’s drawing instructions at a chosen scale and paints pixels onto a canvas. The JPG captures appearance rather than structure. Resolution and compression determine legibility and output size.'
    ],
    technicalIntroduction: [
      'Extraction and rendering are fundamentally different transformations. Extraction copies a page object and its dependency closure into a valid new document. Rendering executes graphics operators, resolves fonts and color spaces, applies page geometry and samples the result into a pixel grid at a chosen resolution.'
    ],
    technicalPoints: [
      { title: 'Independent PDF pages', paragraphs: ['For each source index, create a destination document, copy that page and save it. Resource dependencies must accompany the copied page. Metadata, bookmarks and interactive relationships outside the page may not survive isolated extraction.'] },
      { title: 'Canvas rendering scale', paragraphs: ['A viewport scale of 2 produces roughly twice the pixel dimensions of scale 1 and four times the pixel count. Higher values improve text edges but increase memory, rendering time and JPG size.'] },
      { title: 'Packaging and processing lifecycle', paragraphs: ['Generated pages or images should use deterministic names and preserve their original sequence when collected into an archive. Sequential processing reduces peak memory, while checksums and manifest metadata can help consumers verify completeness and ordering.'] }
    ],
    examples: [
      { title: 'Invoice distribution', description: 'A consolidated billing PDF is separated so each customer receives only the relevant page.' },
      { title: 'Preview generation', description: 'A content system renders page JPGs for thumbnails while retaining the original PDF for download.' },
      { title: 'Archival extraction', description: 'Selected forms are preserved as individual PDFs with their vector content and searchable text when available.' }
    ],
    conclusion: [
      'Splitting preserves PDF page structure, while JPG export renders page appearance into pixels. Choosing between them depends on whether the consumer needs document behavior or a simple image.',
      'I recommend PDF extraction whenever fidelity, text and future processing matter, and JPG for previews or image-only workflows. Use the utily.tools PDF Splitter and continue through the merger and PDF-creation articles.'
    ]
  },
  {
    ...publication,
    slug: 'create-pdf-from-images-browser',
    toolName: 'PDF Creator',
    toolRoute: '/pdf-creator',
    title: 'Creating a PDF from Images in the Browser',
    description: 'Learn how image files are decoded, ordered, embedded and scaled into PDF pages through image sampling, page geometry and compression.',
    keywords: 'create PDF from images, images to PDF, PDF creator online, PDF page geometry, image embedding, PDF image compression',
    category: 'PDF Processing',
    image: '/assets/articles/pdf-creator-cover.png',
    imageAlt: 'Ordered photographs transforming into a professionally bound digital PDF document',
    readingTime: '9 min read',
    introduction: [
      'Receipts, whiteboard photos, scanned forms and design exports frequently need to become one portable document. PDF provides consistent pagination and is easier to archive or share than a folder of separate images.',
      'The utily.tools PDF Creator loads image files, displays previews, supports reordering and builds one PDF locally. It demonstrates how a browser can perform useful document generation without uploading source images.'
    ],
    theoryTitle: 'Embedding raster content into page coordinates',
    theory: [
      'A PDF page defines a coordinate system measured in points. An embedded image becomes a reusable PDF object, and a content stream draws that object at a position and size. One source image can map to one page whose dimensions follow the image or a selected paper format.',
      'JPEG data is often stored directly with efficient compression. PNG may preserve lossless pixels and transparency. Other formats first need browser decoding and canvas conversion to a supported representation.'
    ],
    technicalIntroduction: [
      'Image-to-PDF conversion decodes the source into samples and metadata, determines color space, bit depth, transparency and orientation, then embeds a compatible image stream. A page content stream maps that image into PDF user space with a transformation matrix, preserving aspect ratio according to the chosen layout policy.'
    ],
    technicalPoints: [
      { title: 'Sizing policy', paragraphs: ['Native pixel dimensions used as points may produce unexpectedly large physical pages. Fit-to-page scaling preserves aspect ratio inside A4 or Letter margins. A deliberate DPI assumption, such as 96 or 300, makes print dimensions predictable.'] },
      { title: 'Rotation and metadata', paragraphs: ['Phone photographs may rely on EXIF orientation. Canvas decoding commonly applies orientation, while direct embedding may not. A robust creator should normalize rotation and decide whether metadata is retained or intentionally removed.'] },
      { title: 'Resolution, compression and output size', paragraphs: ['Large photographs can consume substantial decoded memory even when their compressed files are small. Downsampling lowers memory and document size at the cost of detail. Lossy compression suits photographs, while lossless compression better preserves diagrams, text and transparency.'] }
    ],
    examples: [
      { title: 'Expense documentation', description: 'A set of receipt photographs becomes one ordered PDF attached to an expense report.' },
      { title: 'Portfolio assembly', description: 'Exported artwork is arranged into a single presentation while keeping the original image files unchanged.' },
      { title: 'Mobile scan workflow', description: 'Corrected document photos are converted locally into a PDF before they leave the device.' }
    ],
    conclusion: [
      'Image-to-PDF creation is a page-layout operation involving decoding, coordinate systems, sizing, compression and output memory. A clear policy for physical dimensions produces better documents than blindly mapping pixels to points.',
      'I think browser-side generation is ideal for small personal workflows because it is immediate and keeps inputs local. Try the utily.tools PDF Creator and read the merger and splitter articles to understand the complete PDF toolset.'
    ]
  },
  {
    ...publication,
    slug: 'real-time-text-sharing-websockets',
    toolName: 'Text Sharer',
    toolRoute: '/shared-text',
    title: 'Real-Time Text Sharing with WebSockets and Channels',
    description: 'Learn how Socket.IO channels synchronize text, presence and short-lived history across browser screens in real time.',
    keywords: 'real time text sharing, WebSocket text share, Socket.IO channels, shared clipboard browser, real time collaboration',
    category: 'Real-Time Web',
    image: '/assets/articles/text-sharer-cover.png',
    imageAlt: 'Multiple screens synchronizing glowing text through real-time network channels',
    readingTime: '11 min read',
    introduction: [
      'Moving a short command or note between computers is surprisingly inconvenient when accounts, messaging applications or shared files are unavailable. Real-time text sharing creates a temporary channel that synchronizes one text value across connected screens.',
      'The utily.tools Text Sharer uses Socket.IO groups and channels to broadcast changes, presence, recent history and administrative events. It is designed for temporary collaboration rather than durable document storage.'
    ],
    theoryTitle: 'Persistent bidirectional communication',
    theory: [
      'Traditional HTTP is request-response: the client asks and the server replies. WebSocket upgrades one connection into a bidirectional channel so either side can send events immediately. Socket.IO adds event names, reconnection, heartbeats, rooms and fallback transport behavior.',
      'A logical room maps a group and channel to a set of sockets. When one client updates the text, the server records the short-lived state and broadcasts the new value to room members. Presence is derived from active connections rather than permanent accounts.'
    ],
    technicalIntroduction: [
      'A real-time channel establishes a persistent bidirectional session, associates each participant with a logical room and propagates either complete state snapshots or ordered operations. Update frequency balances perceived latency against bandwidth, while sequence information and acknowledgements determine whether delayed or duplicated messages can be detected.'
    ],
    technicalPoints: [
      { title: 'Rooms and lifecycle', paragraphs: ['The server normalizes room identifiers, joins the socket and sends current state. Disconnect events decrement presence. A cleanup timer can delete text and history after the last client leaves, implementing explicit ephemeral retention.'] },
      { title: 'Ordering and conflicts', paragraphs: ['A simple shared textarea normally uses last-write-wins semantics. Network latency can reorder competing updates, so multi-author document editing needs sequence numbers, operational transformation or CRDTs rather than naive replacement.'] },
      { title: 'Security and abuse controls', paragraphs: ['Transport must use TLS. Public channel names should not be treated as secrets. Servers need payload limits, rate limiting, input validation, origin policy and moderation controls; sensitive credentials should not be shared through an unauthenticated channel.'] }
    ],
    examples: [
      { title: 'Cross-device command transfer', description: 'A developer opens the same temporary channel on a workstation and lab machine to move a non-sensitive command.' },
      { title: 'Presentation support', description: 'An operator updates a short status or link that appears immediately on another screen.' },
      { title: 'Ephemeral troubleshooting notes', description: 'Two engineers share temporary observations during a call without creating a durable document, understanding the retention policy.' }
    ],
    conclusion: [
      'Real-time text sharing uses a persistent event connection, room membership and an explicit state lifecycle to synchronize screens. Simple replacement is effective for one active editor but differs from true concurrent document collaboration.',
      'My view is that ephemeral sharing is valuable when its limits are visible: channel names are not authentication and sensitive secrets deserve stronger channels. Explore the utily.tools Text Sharer and read more articles about browser APIs, security and data encoding.'
    ]
  }
];
