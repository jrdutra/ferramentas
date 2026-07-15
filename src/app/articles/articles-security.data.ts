import { ToolArticle } from './tool-article.model';

const publication = {
  publishedAt: 'July 16, 2026',
  publishedIso: '2026-07-16',
  modifiedIso: '2026-07-16T00:00:00-03:00'
};

export const SECURITY_TOOL_ARTICLES: ToolArticle[] = [
  {
    ...publication,
    slug: 'jwt-structure-signing-and-validation',
    toolName: 'JWT Manipulator',
    toolRoute: '/jwt-viewer',
    title: 'JWT Explained: Structure, Claims, Signing and Validation',
    description: 'A technical guide to JSON Web Tokens, Base64url segments, registered claims, signatures, key formats and secure validation.',
    keywords: 'JWT decoder, JSON Web Token, JWT signature validation, JWT claims, JWT header payload signature, JWT security',
    category: 'Application Security',
    image: '/assets/articles/jwt-manipulator-cover.png',
    imageAlt: 'Three glowing JWT token segments connected to a cryptographic signature shield',
    readingTime: '12 min read',
    introduction: [
      'JSON Web Tokens are widely used to carry identity and authorization information between an identity provider, an API gateway and application services. They appear in OAuth and OpenID Connect flows, session architectures, service-to-service calls and signed links.',
      'A JWT is compact and easy to transport, but decoding it is not the same as trusting it. The utily.tools JWT Manipulator separates header, payload and signature, documents known claims and can sign or verify supported asymmetric algorithms for debugging.'
    ],
    theoryTitle: 'Claims protected by a digital signature',
    theory: [
      'A signed JWT, formally a JWS compact serialization, contains three Base64url segments separated by periods. The header describes the algorithm and key metadata. The payload contains claims. The signature protects the exact encoded header and payload against modification.',
      'Registered claims include iss for issuer, sub for subject, aud for audience, exp for expiration, nbf for not-before and iat for issued-at. Their presence and meaning depend on the application profile. A valid cryptographic signature alone does not prove that the issuer, audience or lifetime is acceptable.'
    ],
    technicalIntroduction: [
      'Verification reconstructs the ASCII signing input header.payload, decodes the signature bytes and calls the algorithm with a trusted public key. The verifier must select allowed algorithms from configuration, not simply accept the alg value supplied by the token.'
    ],
    technicalPoints: [
      { title: 'Base64url and JSON parsing', paragraphs: ['JWT uses - and _ instead of + and / and often removes padding. Each decoded segment must be interpreted as UTF-8 JSON. Malformed encodings and duplicate or unexpected header values should fail closed.'] },
      { title: 'RSA and ECDSA signatures', paragraphs: ['RS256 uses RSA PKCS#1 v1.5 with SHA-256, while PS256 uses RSA-PSS. ES256 uses ECDSA over P-256; JWS stores its signature as fixed-width r || s bytes rather than the DER encoding used by many cryptographic libraries.'] },
      { title: 'Validation policy', paragraphs: ['Production validation should require issuer and audience, check exp and nbf with a limited clock tolerance, restrict algorithms, select keys through a trusted kid/JWKS process and reject tokens intended for another context. Private keys must never be pasted into an untrusted environment.'] }
    ],
    examples: [
      { title: 'API access tokens', description: 'An API verifies the issuer, intended audience, expiration and signature before translating scopes into authorization decisions.' },
      { title: 'Identity debugging', description: 'A developer inspects aud, iss, roles and time claims to understand why a validly signed token is rejected by one service.' },
      { title: 'Key rotation', description: 'The kid header selects a public key from a JWKS while old keys remain available long enough to verify tokens issued before rotation.' }
    ],
    conclusion: [
      'JWT combines compact JSON claims with a cryptographic integrity mechanism. Secure use requires more than decoding: algorithm restrictions, trusted keys and semantic claim validation are all part of verification.',
      'My view is that JWT works well for bounded, interoperable claims but becomes risky when applications treat it as a magical session container. Inspect tokens with the utily.tools JWT Manipulator and continue with the JWE, Base64 and timestamp articles for the surrounding concepts.'
    ]
  },
  {
    ...publication,
    slug: 'jwe-encryption-compact-serialization',
    toolName: 'JWE Manipulator',
    toolRoute: '/jwe-viewer',
    title: 'JWE Explained: Encrypted Tokens and Compact Serialization',
    description: 'Understand JSON Web Encryption, key management algorithms, authenticated content encryption and the five compact JWE segments.',
    keywords: 'JWE decoder, JSON Web Encryption, encrypted JWT, JWE compact serialization, RSA OAEP, AES GCM, token encryption',
    category: 'Application Security',
    image: '/assets/articles/jwe-manipulator-cover.png',
    imageAlt: 'Five encrypted token segments entering a luminous security vault',
    readingTime: '12 min read',
    introduction: [
      'Signed tokens protect integrity but do not hide their payload. When claims contain information that intermediaries or browser users should not read, JSON Web Encryption provides confidentiality and integrity in a standardized token format.',
      'JWE is used in financial integrations, identity protocols, encrypted API messages and nested tokens. The utily.tools JWE Manipulator exposes each compact segment and supports encryption or decryption with compatible keys for controlled debugging.'
    ],
    theoryTitle: 'Key management plus authenticated encryption',
    theory: [
      'A compact JWE has five Base64url segments: protected header, encrypted key, initialization vector, ciphertext and authentication tag. The protected header is visible but authenticated. The ciphertext contains the encrypted plaintext, and the tag detects modification.',
      'The alg header identifies how the content-encryption key is established or wrapped. The enc header identifies the symmetric authenticated-encryption algorithm applied to the plaintext. This separation allows RSA-OAEP, ECDH-ES or direct symmetric keys to work with AES-GCM or AES-CBC-HMAC content encryption.'
    ],
    technicalIntroduction: [
      'Encryption creates or derives a content-encryption key, generates a unique IV, authenticates the encoded protected header as additional authenticated data and emits ciphertext plus tag. Decryption must authenticate before releasing plaintext.'
    ],
    technicalPoints: [
      { title: 'Key-management algorithms', paragraphs: ['RSA-OAEP encrypts a randomly generated content key with an RSA public key. ECDH-ES derives key material from an ephemeral and recipient EC key agreement. In direct mode, the shared symmetric key is itself the content key, so the encrypted-key segment is empty.'] },
      { title: 'AES-GCM requirements', paragraphs: ['GCM provides encryption and authentication together. Reusing an IV with the same key can catastrophically reveal relationships between plaintexts and undermine authentication, so IV generation must be unique and normally random.'] },
      { title: 'Nested JWT and operational policy', paragraphs: ['A signed JWT may be encrypted as JWE so the recipient can verify origin after decryption. Applications must still validate algorithms, keys, claims and size limits, and should avoid detailed decryption errors that become cryptographic oracles.'] }
    ],
    examples: [
      { title: 'Confidential identity claims', description: 'An identity provider encrypts sensitive claims so only the relying party holding the private key can read them.' },
      { title: 'Partner API payloads', description: 'A sender encrypts a small structured message for a partner while retaining a portable standards-based envelope.' },
      { title: 'Debugging algorithm mismatch', description: 'Inspecting alg, enc and key type explains why an RSA key cannot decrypt an ECDH token or why an unsupported curve fails.' }
    ],
    conclusion: [
      'JWE combines key management and authenticated symmetric encryption in a compact, interoperable format. Its five segments expose the information needed for recipients while protecting the plaintext and detecting tampering.',
      'I recommend JWE only when token-level encryption is genuinely required; TLS remains mandatory and simpler designs are easier to operate. Use the utily.tools JWE Manipulator in safe test scenarios, then read the JWT and certificate articles for the trust infrastructure around it.'
    ]
  },
  {
    ...publication,
    slug: 'cryptographic-hash-functions-md5-sha',
    toolName: 'Hash Generator',
    toolRoute: '/hash-generator',
    title: 'Cryptographic Hash Functions: MD5, SHA-1 and SHA-2',
    description: 'Learn how cryptographic hashes process data, which security properties matter and when to use SHA-256, SHA-384 or SHA-512.',
    keywords: 'hash generator, SHA-256, SHA-512, MD5, SHA-1, cryptographic hash function, file integrity hash',
    category: 'Cryptography',
    image: '/assets/articles/hash-generator-cover.png',
    imageAlt: 'Data blocks flowing through a cryptographic hash engine into fixed-length fingerprints',
    readingTime: '11 min read',
    introduction: [
      'A cryptographic hash function reduces an input of arbitrary length to a fixed-size digest. Hashes identify downloaded files, protect signed messages, organize content-addressed storage, commit data in blockchains and support many authentication constructions.',
      'The same word is also used for non-cryptographic hash tables, but security hashes have stronger requirements. The utily.tools Hash Generator calculates MD5 and SHA-family digests for text, making algorithm and output differences visible.'
    ],
    theoryTitle: 'One-way compression with security properties',
    theory: [
      'A secure hash aims for preimage resistance, second-preimage resistance and collision resistance. Given a digest, finding an input should be infeasible; given one input, finding another with the same digest should be infeasible; and finding any colliding pair should require roughly the square root of the output space because of the birthday bound.',
      'Avalanche behavior means a tiny input change produces an apparently unrelated digest. Determinism means the same bytes always produce the same result. Hashes are not encryption because there is no key and no supported reverse operation.'
    ],
    technicalIntroduction: [
      'Hash algorithms pad the message, process fixed-size blocks through a compression function and update an internal state. The final state becomes the digest. SHA-256 emits 256 bits, usually written as 64 hexadecimal characters.'
    ],
    technicalPoints: [
      { title: 'Algorithm status', paragraphs: ['MD5 and SHA-1 have practical collision attacks and should not protect digital signatures or adversarial integrity. They remain useful only for compatibility or non-security fingerprints. SHA-256, SHA-384 and SHA-512 are members of SHA-2 and remain standard choices.'] },
      { title: 'Bytes and representation', paragraphs: ['The algorithm hashes bytes, not the visual idea of text. UTF-8 encoding, newline style and Unicode normalization affect the digest. Hexadecimal and Base64 are only representations of the same output bytes.'] },
      { title: 'Passwords and authenticity', paragraphs: ['Fast hashes are unsuitable for password storage because attackers can test guesses rapidly; use Argon2, scrypt, bcrypt or PBKDF2 with salts and policy. A plain hash also cannot prove who produced a message; HMAC or a digital signature adds keyed authenticity.'] }
    ],
    examples: [
      { title: 'Download verification', description: 'A publisher distributes a SHA-256 digest through a trusted channel so users can detect corrupted or replaced artifacts.' },
      { title: 'Content-addressed storage', description: 'Systems use a digest as the object key so identical content deduplicates and modification produces a new address.' },
      { title: 'Digital signatures', description: 'Signature algorithms normally sign a cryptographic digest rather than processing an arbitrarily large message directly.' }
    ],
    conclusion: [
      'Cryptographic hashes create deterministic fixed-length fingerprints with one-way and collision-resistance goals. Algorithm age and context determine whether a digest is merely convenient or genuinely secure.',
      'My practical recommendation is SHA-256 as the general default, with dedicated password hashing and HMAC where those properties are required. Compare algorithms in the utily.tools Hash Generator and read the HMAC and certificate articles for the next layer of authenticity.'
    ]
  },
  {
    ...publication,
    slug: 'hmac-message-authentication-guide',
    toolName: 'HMAC Generator',
    toolRoute: '/hmac-generator',
    title: 'HMAC Explained: Authenticating Messages with a Secret Key',
    description: 'Understand HMAC construction, secret-key management, canonical messages and signature verification for APIs and webhooks.',
    keywords: 'HMAC generator, HMAC SHA-256, message authentication code, webhook signature, API request signing, HMAC verification',
    category: 'Cryptography',
    image: '/assets/articles/hmac-generator-cover.png',
    imageAlt: 'Secret key and message entering a dual-layer hash authentication mechanism',
    readingTime: '10 min read',
    introduction: [
      'APIs and webhook consumers often need to know that a message came from a party sharing a secret and was not altered in transit. A plain hash detects accidental change but an attacker can replace both the message and its hash.',
      'HMAC combines a secret key with a cryptographic hash to create a message authentication code. Payment webhooks, cloud APIs, signed cookies and internal service calls use it extensively. The utily.tools HMAC Generator calculates signatures in hex, Base64 and Base64url for test and debugging workflows.'
    ],
    theoryTitle: 'A keyed construction around a hash function',
    theory: [
      'HMAC normalizes the key to the hash block size and combines it with two fixed pads. Conceptually, HMAC(K,m) = H((K ⊕ opad) || H((K ⊕ ipad) || m)). The inner and outer layers avoid structural weaknesses that would affect naive constructions such as H(K || m).',
      'Security depends on a strong secret key and a suitable hash. The same message and key always produce the same tag. Anyone with the key can generate valid tags, so HMAC provides shared-secret authenticity rather than non-repudiation.'
    ],
    technicalIntroduction: [
      'Both sides must authenticate exactly the same bytes. Method, path, timestamp, body encoding and line endings may be part of a canonical request. A one-character difference produces a completely different tag.'
    ],
    technicalPoints: [
      { title: 'Canonicalization', paragraphs: ['Define field order, separators, character encoding and JSON handling before signing. Re-serializing a JSON object may change whitespace or key order, so webhook verification often signs the raw request body captured before parsing.'] },
      { title: 'Replay protection', paragraphs: ['A valid HMAC does not prove freshness. Include a timestamp or nonce in the signed data, enforce a short acceptance window and record used identifiers where replay would be harmful.'] },
      { title: 'Constant-time comparison and key storage', paragraphs: ['Verification should compare tags in constant time to reduce timing leakage. Secrets belong in a managed secret store, should be rotated and must never be exposed in URLs, client-side bundles or logs.'] }
    ],
    examples: [
      { title: 'Webhook verification', description: 'A commerce platform signs the raw event body and timestamp; the receiver verifies both before processing a refund or order update.' },
      { title: 'API request signing', description: 'A client signs the HTTP method, canonical path, headers and body digest so intermediaries cannot alter the request undetected.' },
      { title: 'Signed state', description: 'An application attaches an HMAC to a compact state value to detect client-side tampering without encrypting the content.' }
    ],
    conclusion: [
      'HMAC adds secret-key authenticity to a cryptographic hash. Correct byte canonicalization, replay controls, constant-time comparison and disciplined secret management are as important as the algorithm.',
      'I view HMAC-SHA-256 as an excellent primitive for controlled integrations because it is efficient and widely supported, but protocol details must be documented precisely. Test known values with the utily.tools HMAC Generator and continue with the hash and JWE articles.'
    ]
  },
  {
    ...publication,
    slug: 'secure-password-generation-entropy',
    toolName: 'Password Generator',
    toolRoute: '/password-generator',
    title: 'Secure Password Generation: Entropy, Randomness and Policy',
    description: 'Learn how password generators use cryptographic randomness, character pools and entropy, and how to choose practical password policies.',
    keywords: 'secure password generator, random password, password entropy, strong password, cryptographic randomness, password policy',
    category: 'Application Security',
    image: '/assets/articles/password-generator-cover.png',
    imageAlt: 'Secure password characters emerging from a cryptographic random generator and lock',
    readingTime: '10 min read',
    introduction: [
      'Passwords remain a common authentication factor for websites, infrastructure, encrypted archives and service accounts. Human-created passwords tend to follow patterns that attackers prioritize, while arbitrary complexity rules often produce predictable substitutions.',
      'A password generator samples characters from a defined pool using a secure random source. The utily.tools Password Generator controls length, character sets, ambiguous characters and quantity so users can produce independent values appropriate for different systems.'
    ],
    theoryTitle: 'Search space and entropy',
    theory: [
      'If every character is selected independently and uniformly from a pool of N symbols, a password of length L has N^L possibilities and theoretical entropy of L × log2(N) bits. Length usually increases the search space more effectively and memorably than stacking arbitrary composition rules.',
      'The formula only applies when generation is truly uniform. Human choices, biased modulo operations and predictable pseudo-random generators reduce effective entropy. Password security also depends on rate limits, storage, reuse and resistance to phishing.'
    ],
    technicalIntroduction: [
      'Browsers provide crypto.getRandomValues for cryptographically strong random bytes. Mapping a byte directly with byte % pool.length can introduce modulo bias when 256 is not divisible by the pool size. Rejection sampling avoids that bias.'
    ],
    technicalPoints: [
      { title: 'Uniform sampling', paragraphs: ['Calculate the largest multiple of the pool length below 256 and discard bytes at or above that limit. Accepted bytes map evenly to pool positions. For normal password sizes the performance cost is negligible.'] },
      { title: 'Composition requirements', paragraphs: ['If a target requires at least one uppercase, lowercase, number and symbol, generate one character from each required pool, fill the rest from the combined pool and securely shuffle. Testing after generation and retrying is also possible but less deterministic.'] },
      { title: 'Storage and use', paragraphs: ['Users should store unique generated passwords in a password manager. Servers should hash passwords with a salted, memory-hard function such as Argon2id. Generated API secrets may need greater length and controlled rotation rather than human typing convenience.'] }
    ],
    examples: [
      { title: 'Password-manager credentials', description: 'A unique 20-character value protects one account and can be rotated without influencing credentials for other services.' },
      { title: 'Temporary test users', description: 'QA automation creates independent credentials without embedding a shared memorable password in source code.' },
      { title: 'Service bootstrap secrets', description: 'Infrastructure provisioning creates a long initial secret, stores it in a vault and rotates or replaces it with short-lived identity.' }
    ],
    conclusion: [
      'Secure password generation is a probability problem supported by cryptographic randomness. Length, uniform selection and uniqueness matter more than visual complexity alone.',
      'My preference is long generated credentials stored in a password manager, combined with multi-factor authentication and modern server-side hashing. Use the utily.tools Password Generator for appropriate test or personal values, and read the site security articles for authentication concepts beyond passwords.'
    ]
  },
  {
    ...publication,
    slug: 'x509-certificate-fields-and-decoding',
    toolName: 'X.509 Certificate Viewer',
    toolRoute: '/x509-viewer',
    title: 'How to Read an X.509 Certificate',
    description: 'Learn how X.509 certificates encode subjects, issuers, validity, public keys, extensions, signatures and fingerprints.',
    keywords: 'X509 certificate viewer, certificate decoder, SSL certificate fields, ASN.1 DER, certificate fingerprint, subject alternative name',
    category: 'PKI and Certificates',
    image: '/assets/articles/x509-viewer-cover.png',
    imageAlt: 'Digital X.509 certificate under a magnifying glass with trust-chain connections',
    readingTime: '12 min read',
    introduction: [
      'X.509 certificates bind an identity to a public key. They secure HTTPS, mutual TLS, code signing, document signatures, enterprise authentication and many device identities. When a connection fails, reading the certificate often reveals the cause.',
      'A certificate viewer translates dense ASN.1 structures into issuer, subject, dates, key details, extensions, signatures and fingerprints. The utily.tools X.509 Certificate Viewer performs this inspection from pasted or uploaded certificate data.'
    ],
    theoryTitle: 'A signed statement about a public key',
    theory: [
      'A certificate contains a to-be-signed structure, the signature algorithm and the issuer’s signature. The signed structure includes a serial number, issuer name, validity interval, subject name, subject public-key information and optional extensions.',
      'Trust does not come from the certificate text alone. A client builds a chain from the leaf through intermediate certification authorities to a locally trusted root, validates signatures and constraints, checks time and confirms that the requested identity appears in the appropriate extension.'
    ],
    technicalIntroduction: [
      'Certificates are encoded with ASN.1 DER. PEM is a textual envelope containing Base64 DER between BEGIN CERTIFICATE markers. Correct parsing operates on DER bytes and maps object identifiers to known algorithms or extension meanings.'
    ],
    technicalPoints: [
      { title: 'Names and SAN', paragraphs: ['The subject distinguished name may contain common name, organization and location attributes. For TLS hostname verification, the Subject Alternative Name extension is authoritative; modern clients do not rely on common name as a fallback.'] },
      { title: 'Validity and extensions', paragraphs: ['notBefore and notAfter bound the certificate lifetime. Basic Constraints distinguishes CAs from end entities. Key Usage and Extended Key Usage restrict operations such as signing, key encipherment, server authentication or client authentication.'] },
      { title: 'Fingerprints and signatures', paragraphs: ['A fingerprint hashes the complete DER certificate bytes, not the Base64 text. It identifies one exact certificate. The certificate signature instead verifies the to-be-signed bytes with the issuer public key and the declared signature algorithm.'] }
    ],
    examples: [
      { title: 'TLS name failure', description: 'A certificate may be current and trusted but fail because the requested hostname is absent from the SAN extension.' },
      { title: 'Unexpected chain', description: 'Issuer and Authority Key Identifier fields help distinguish renewed intermediates with similar names during chain debugging.' },
      { title: 'Certificate pinning checks', description: 'Operators compare a SHA-256 certificate or public-key fingerprint through a trusted out-of-band channel.' }
    ],
    conclusion: [
      'An X.509 certificate is a signed, structured binding between identity and public key. Names, constraints, intended usages, dates and the trust chain must be interpreted together.',
      'I believe certificate inspection is an essential debugging skill because many TLS errors become obvious once the right field is visible. Explore your test certificates in the utily.tools X.509 Certificate Viewer and continue with the generation and validation articles.'
    ]
  },
  {
    ...publication,
    slug: 'generate-self-signed-x509-certificates',
    toolName: 'X.509 Key & Certificate Generator',
    toolRoute: '/x509-generator',
    title: 'Generating RSA Keys and Self-Signed X.509 Certificates',
    description: 'A practical guide to RSA key generation, certificate fields, self-signing, PEM, DER, PFX, PKCS#8 and JWK exports.',
    keywords: 'X509 certificate generator, self signed certificate, RSA key generator, PEM certificate, PFX generator, PKCS8 JWK',
    category: 'PKI and Certificates',
    image: '/assets/articles/x509-generator-cover.png',
    imageAlt: 'Cryptographic key forge creating a luminous X.509 certificate and RSA key pair',
    readingTime: '12 min read',
    introduction: [
      'Development environments need keys and certificates for local HTTPS, mutual TLS prototypes, signing tests and format interoperability. Waiting for a production certificate authority is unnecessary for these isolated scenarios.',
      'A self-signed certificate uses its own private key to sign its public identity statement. The utily.tools X.509 Key & Certificate Generator creates RSA material in the browser and exports common certificate, key and container formats.'
    ],
    theoryTitle: 'Key generation followed by certificate signing',
    theory: [
      'RSA key generation chooses two large random primes, constructs a modulus and derives public and private exponents. The public key can be distributed; the private factors and exponent must remain secret. A certificate embeds the public key and descriptive fields.',
      'For a self-signed certificate, subject and issuer are normally the same and the new private key signs the certificate. This proves internal consistency, not external trust. Clients trust it only after explicit installation or pinning.'
    ],
    technicalIntroduction: [
      'Generation defines a positive serial number, validity period, subject attributes and extensions before signing with a suitable hash such as SHA-256. The private operation can be CPU-intensive, especially for larger RSA moduli.'
    ],
    technicalPoints: [
      { title: 'Key sizes and entropy', paragraphs: ['RSA 2048 remains a common interoperability baseline; larger keys increase computation and file size. Cryptographically secure randomness is mandatory because weak primes compromise every operation performed by the key.'] },
      { title: 'Extensions and purpose', paragraphs: ['A development server certificate should include its DNS names or IP addresses in SAN and use constraints appropriate to an end entity. Marking every self-signed certificate as a CA with keyCertSign can grant more authority than intended.'] },
      { title: 'Export formats', paragraphs: ['PEM wraps DER as Base64. PKCS#8 is a general private-key container. PFX/P12 can bundle private keys and certificates under password-based protection. JWK represents key parameters as Base64url fields for web protocols.'] }
    ],
    examples: [
      { title: 'Local HTTPS', description: 'A developer creates a short-lived certificate for localhost and trusts it only on the development machine.' },
      { title: 'Format compatibility testing', description: 'A QA workflow exports the same key as PEM, PKCS#8, JWK and PFX to verify import behavior across libraries.' },
      { title: 'Mutual TLS prototype', description: 'A private test CA and separate leaf certificates model client and server authentication before production PKI integration.' }
    ],
    conclusion: [
      'Certificate generation joins secure key creation, explicit identity fields, extensions and a digital signature. Self-signing is convenient for controlled testing but does not create public trust.',
      'My recommendation is short-lived, narrowly scoped development certificates and carefully protected private keys. Use the utily.tools generator for test material, then inspect and match the results with the viewer and validator covered in the related articles.'
    ]
  },
  {
    ...publication,
    slug: 'validate-certificates-and-key-pairs',
    toolName: 'Certificate & Key Validator',
    toolRoute: '/certificate-validator',
    title: 'Certificate and Private-Key Validation in Practice',
    description: 'Learn how to validate certificate dates, inspect formats and prove that public and private RSA keys belong to the same pair.',
    keywords: 'certificate validator, private key match certificate, PFX validator, X509 expiry check, RSA key pair validation, JWK thumbprint',
    category: 'PKI and Certificates',
    image: '/assets/articles/certificate-validator-cover.png',
    imageAlt: 'Certificate and private key aligned in a glowing cryptographic validation matrix',
    readingTime: '12 min read',
    introduction: [
      'Certificate deployments often fail because the wrong private key accompanies a renewed certificate, a PFX password is incorrect, the certificate is not yet valid or an imported file uses an unexpected format. These problems look similar from the application side but require different checks.',
      'The utily.tools Certificate & Key Validator reads PEM, DER, CRT, CER, PFX, P12 and JWK material, displays validity and builds a matrix showing which RSA certificates and keys match.'
    ],
    theoryTitle: 'Matching the public mathematical parameters',
    theory: [
      'An RSA public key consists primarily of modulus n and public exponent e. The corresponding private key includes the same n and e plus private exponent and prime factors. A certificate embeds the public key, so equality of the public parameters proves key-pair correspondence.',
      'This match does not validate the certificate chain or establish trust. Date validity, issuer signatures, name constraints, revocation and usage extensions are separate checks with different inputs and policies.'
    ],
    technicalIntroduction: [
      'A validator parses each container, extracts certificates and keys, derives public keys from private keys where possible and computes a stable fingerprint of public parameters. It can then compare every compatible pair without performing a destructive operation.'
    ],
    technicalPoints: [
      { title: 'Container parsing', paragraphs: ['PEM labels distinguish certificate, public key, PKCS#1 private key and PKCS#8 private key blocks. DER needs format detection. PKCS#12 may contain multiple safe bags, certificate chains and encrypted private keys protected by a password.'] },
      { title: 'Pair proof', paragraphs: ['For RSA, comparing modulus and exponent is direct. A challenge-sign-and-verify test is another option. EC keys require curve and point comparison rather than RSA modulus logic, so tools must clearly report unsupported algorithms.'] },
      { title: 'Validity and fingerprints', paragraphs: ['The current instant is compared with notBefore and notAfter. SHA-256 fingerprints should hash the certificate DER or a canonical public-key representation. JWK thumbprints use a specification-defined canonical JSON object, not arbitrary key-file bytes.'] }
    ],
    examples: [
      { title: 'Renewal deployment', description: 'Before replacing a TLS certificate, an operator proves that the existing private key matches the renewed leaf certificate.' },
      { title: 'PFX migration', description: 'A team inspects whether a P12 includes the expected leaf certificate, chain and private key before importing it into a cloud service.' },
      { title: 'JWK integration', description: 'A public JWK and a PEM private key can be compared through their RSA parameters, while kid metadata is treated as a label rather than proof.' }
    ],
    conclusion: [
      'Certificate validation is a collection of distinct checks: parse the container, inspect dates and metadata, match public parameters and, when required, validate the trust chain. Passing one check does not imply the others.',
      'I consider pre-deployment key matching one of the simplest ways to prevent avoidable certificate outages. Use the utily.tools Certificate & Key Validator with non-sensitive test material, then read the viewer and generator articles for a complete PKI workflow.'
    ]
  }
];
