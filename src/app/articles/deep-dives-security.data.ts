import { ArticleDeepDive } from './tool-article.model';

export const SECURITY_DEEP_DIVES: Record<string, ArticleDeepDive> = {
  'jwt-structure-signing-and-validation': {
    readingTime: '25 min read',
    deepDiveSections: [
      {
        title: 'Origin, standardization and the JOSE family',
        paragraphs: [
          'JSON Web Token was standardized by the IETF OAuth working group as RFC 7519 in May 2015. A JWT is a set of JSON claims carried inside a JSON Web Signature (JWS, RFC 7515), a JSON Web Encryption (JWE, RFC 7516), or a nested combination. JSON Web Key (JWK, RFC 7517) represents keys, and JSON Web Algorithms (JWA, RFC 7518) defines the original algorithm identifiers. RFC 8725 updates JWT with current Best Current Practice security guidance.',
          'The media type is application/jwt. A common signed JWT uses JWS Compact Serialization: base64url(protected header) + period + base64url(payload) + period + base64url(signature). Base64url only makes the bytes transport-safe; anyone holding a normal signed JWT can decode its header and claims. Confidential claims require JWE or protection outside the token.'
        ],
        items: [
          { name: 'JOSE header', description: 'Metadata for cryptographic processing. alg selects the algorithm, typ can explicitly identify JWT, kid can select a key, and crit marks extensions that must be understood.' },
          { name: 'JWT Claims Set', description: 'The JSON object containing registered, public or private claims. A claim is data, not automatically a trusted authorization decision.' },
          { name: 'Signing input', description: 'The exact ASCII bytes of encoded protected header + period + encoded payload. Reformatting either JSON value changes the signature input.' },
          { name: 'Nested JWT', description: 'A JWT wrapped in another JWS or JWE, commonly sign-then-encrypt. Each cryptographic layer must be validated.' }
        ]
      },
      {
        title: 'Registered JWT claims and validation semantics',
        paragraphs: [
          'RFC 7519 defines seven registered claims. None is universally mandatory; a token profile such as OpenID Connect or an internal authorization protocol decides which are required. NumericDate is seconds from 1970-01-01T00:00:00Z, ignoring leap seconds, and may be non-integer. Validators may allow a small configured leeway for clock skew but should not make expiry optional by accident.',
          'Claims not understood by a generic JWT implementation are ignored, so business validation belongs to the consuming application. The IANA JWT Claims registry contains additional claims defined by later specifications; registration does not mean every token may use them with the same semantics.'
        ],
        table: {
          caption: 'Claims registered by RFC 7519',
          headers: ['Claim', 'Meaning', 'Correct validation'],
          rows: [
            ['iss', 'Issuer', 'Exact match against a configured trusted issuer; use it to select the correct validation policy and keys'],
            ['sub', 'Subject', 'Interpret within the issuer namespace; often the stable principal identifier'],
            ['aud', 'Audience', 'String or array containing the intended recipient; reject a token not addressed to this service'],
            ['exp', 'Expiration time', 'Current time must be before exp, subject only to a small explicit clock-skew allowance'],
            ['nbf', 'Not-before time', 'Do not accept before this instant, again with bounded skew handling'],
            ['iat', 'Issued-at time', 'Use for freshness and anomaly checks; it is not expiry by itself'],
            ['jti', 'JWT ID', 'Unique identifier that can support replay detection or revocation records when the profile requires it']
          ]
        }
      },
      {
        title: 'JWS signature and MAC algorithms',
        paragraphs: [
          'The algorithm value is attacker-controlled input until verification succeeds. The application must configure an allowlist and bind each key to one algorithm; it must never choose verification behavior solely from alg. The IANA JOSE registry is the live source for registration and implementation status. RFC 9864 now favors fully specified identifiers: the generic EdDSA identifier is deprecated in favor of Ed25519 or Ed448, and RFC 9964 adds optional post-quantum ML-DSA identifiers.',
          'The table covers the principal standardized choices. Registered does not mean suitable for every deployment. Key size, library support, hardware, compliance and the token profile determine the acceptable subset.'
        ],
        table: {
          caption: 'Principal JOSE algorithms for signed JWTs',
          headers: ['Identifier', 'Primitive and key model', 'Technical and operational notes'],
          rows: [
            ['HS256 / HS384 / HS512', 'HMAC with SHA-2; shared secret', 'Every verifier can mint tokens. Use a random secret at least as strong as the hash output and separate keys by context.'],
            ['RS256 / RS384 / RS512', 'RSA PKCS #1 v1.5 signature with SHA-2', 'Public verification and broad interoperability. RSA keys should be at least 2048 bits; signatures are relatively large.'],
            ['PS256 / PS384 / PS512', 'RSA-PSS with SHA-2 and MGF1', 'Probabilistic modern RSA signature padding. JOSE fixes salt length to the hash output length.'],
            ['ES256', 'ECDSA P-256 with SHA-256', 'Compact 64-byte raw R||S JOSE signature. Nonce generation must be secure or deterministic.'],
            ['ES384', 'ECDSA P-384 with SHA-384', '96-byte raw signature and higher security target; less universal than ES256.'],
            ['ES512', 'ECDSA P-521 with SHA-512', 'Uses P-521 despite the name ES512; raw signature is 132 bytes.'],
            ['Ed25519 / Ed448', 'EdDSA with a fully specified parameter set', 'Deterministic modern signatures. These replace ambiguous EdDSA in updated JOSE registration.'],
            ['ES256K', 'ECDSA secp256k1 with SHA-256', 'Optional registration associated with ecosystems already using secp256k1.'],
            ['ML-DSA-44 / 65 / 87', 'FIPS 204 post-quantum signatures', 'Optional new JOSE algorithms with much larger keys and signatures; deploy only with explicit ecosystem support.'],
            ['none', 'No signature or MAC', 'Unsecured JWT. Reject unless a narrowly defined profile explicitly requests and protects it by other means.']
          ]
        }
      },
      {
        title: 'A complete JWT validation pipeline',
        paragraphs: [
          'Parse with strict size and JSON limits; require the expected compact or JSON serialization; reject unsupported critical headers; select a trusted issuer policy; resolve a key through a preconfigured JWKS source; verify the signature with an algorithm allowlist; then validate iss, aud, time claims, token type and application claims. Authentication and authorization happen only after every applicable check succeeds.',
          'RFC 8725 documents algorithm confusion, weak HMAC secrets, cross-JWT substitution, SSRF through jku or x5u, injection through kid, malformed elliptic-curve inputs and ciphertext-length leakage. Do not fetch arbitrary key URLs from a token. Cache and rotate trusted JWKS carefully, validate TLS, cap response size and handle unknown kid without creating a request flood.',
          'JWT is not automatically revocable. Short access-token lifetime, refresh-token rotation, sender-constrained tokens, jti deny-lists and issuer-side session state address different replay and revocation requirements. Avoid putting secrets or unnecessary personal data in a signed token because copies can persist in logs, browser storage and telemetry.'
        ]
      }
    ],
    references: [
      { title: 'RFC 7519: JSON Web Token', url: 'https://www.rfc-editor.org/rfc/rfc7519.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 7515: JSON Web Signature', url: 'https://www.rfc-editor.org/rfc/rfc7515.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 7518: JSON Web Algorithms', url: 'https://www.rfc-editor.org/rfc/rfc7518.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 8725: JWT Best Current Practices', url: 'https://www.rfc-editor.org/rfc/rfc8725.html', publisher: 'IETF / RFC Editor' },
      { title: 'IANA JOSE algorithm registry', url: 'https://www.iana.org/assignments/jose/jose.xhtml', publisher: 'Internet Assigned Numbers Authority' },
      { title: 'IANA JWT Claims registry', url: 'https://www.iana.org/assignments/jwt/jwt.xhtml', publisher: 'Internet Assigned Numbers Authority' }
    ]
  },
  'jwe-encryption-compact-serialization': {
    readingTime: '22 min read',
    deepDiveSections: [
      {
        title: 'RFC 7516 and the five compact segments',
        paragraphs: [
          'JWE was standardized by the IETF JOSE working group in RFC 7516. Compact Serialization is protected-header.encrypted-key.iv.ciphertext.authentication-tag, with each value base64url-encoded. The protected header is authenticated as Additional Authenticated Data, so changing alg, enc or protected key identifiers invalidates the tag.',
          'The content encryption key (CEK) encrypts the plaintext using the enc algorithm. The alg algorithm protects, derives or agrees upon that CEK. Keeping these roles separate supports multiple key-management models and, in JSON Serialization, multiple recipients sharing one encrypted payload.'
        ],
        table: {
          caption: 'JWE Compact Serialization segments',
          headers: ['Segment', 'Contains', 'Validation concern'],
          rows: [
            ['Protected header', 'UTF-8 JSON with alg, enc and optional parameters', 'Must be authenticated and all critical parameters understood'],
            ['Encrypted key', 'Protected CEK, or empty for direct modes', 'Interpretation depends on alg'],
            ['Initialization vector', 'Nonce or IV required by enc', 'Length must match the algorithm and uniqueness rules'],
            ['Ciphertext', 'Encrypted plaintext', 'Length can leak information even when contents remain secret'],
            ['Authentication tag', 'AEAD integrity result', 'Verify before releasing any plaintext']
          ]
        }
      },
      {
        title: 'Key-management algorithms versus content encryption',
        paragraphs: [
          'Common alg families include dir for direct symmetric keys, AES Key Wrap, RSA-OAEP, ECDH-ES key agreement, AES-GCM key wrap and PBES2 password-based wrapping. RSA1_5 remains registered for compatibility but RFC 8725 says to avoid RSA PKCS #1 v1.5 encryption and prefer OAEP. ECDH-ES requires validation of received public keys and careful ephemeral-key handling.',
          'The enc values A128GCM and A256GCM use AES-GCM authenticated encryption. A128CBC-HS256 and A256CBC-HS512 compose AES-CBC with HMAC under precisely split key material. Never substitute plain CBC or perform decryption before tag verification. A nonce repeated with the same GCM key can destroy confidentiality and authentication.'
        ]
      },
      {
        title: 'Compact, flattened and general JSON serializations',
        paragraphs: [
          'Compact JWE supports one recipient and no separate unprotected header or external AAD field. Flattened JSON Serialization supports one recipient with richer header placement. General JSON Serialization supports multiple recipients, each with its own encrypted key and recipient header, while sharing ciphertext, IV and tag.',
          'Only protected header parameters are integrity-protected. Security decisions such as alg and enc should be protected, and duplicated parameter names across protected, shared-unprotected and per-recipient headers must be rejected. Compression with zip=DEF can reveal secrets through ciphertext length when attacker-controlled and secret text are compressed together.'
        ]
      },
      {
        title: 'Safe decryption order',
        paragraphs: [
          'Select an expected application profile before processing; enforce serialization and algorithm allowlists; resolve only trusted keys; validate all key and IV lengths; recover or derive the CEK; authenticate the protected header and ciphertext; release plaintext only after the tag succeeds; then decompress if explicitly allowed and parse the nested content.',
          'Nested sign-and-encrypt content requires validation of both layers. Decrypting a JWE does not authenticate the business issuer unless the selected key-management profile provides that assurance, and a nested JWS signature must not be skipped.'
        ]
      }
    ],
    references: [
      { title: 'RFC 7516: JSON Web Encryption', url: 'https://www.rfc-editor.org/rfc/rfc7516.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 7518: JSON Web Algorithms', url: 'https://www.rfc-editor.org/rfc/rfc7518.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 8725: JWT Best Current Practices', url: 'https://www.rfc-editor.org/rfc/rfc8725.html', publisher: 'IETF / RFC Editor' },
      { title: 'IANA JOSE algorithm registry', url: 'https://www.iana.org/assignments/jose/jose.xhtml', publisher: 'Internet Assigned Numbers Authority' }
    ]
  },
  'cryptographic-hash-functions-md5-sha': {
    readingTime: '19 min read',
    deepDiveSections: [
      {
        title: 'Security properties and attack cost',
        paragraphs: [
          'A cryptographic hash maps arbitrary bytes to a fixed-size digest. Preimage resistance makes it difficult to find a message for a chosen digest; second-preimage resistance protects a fixed message from replacement; collision resistance makes finding any two equal-digest messages difficult. For an ideal n-bit hash, generic preimage work is about 2^n and collision work about 2^(n/2).',
          'The avalanche effect describes output sensitivity but does not prove those security properties. A checksum can detect accidental errors without resisting a malicious attacker. A bare hash also provides no authenticity because anyone who changes a file can recompute it.'
        ],
        table: {
          caption: 'Algorithms commonly exposed by hash tools',
          headers: ['Algorithm', 'Digest', 'Standard and status'],
          rows: [
            ['MD5', '128 bits', 'RFC 1321; practical collisions, prohibited for signatures and adversarial integrity'],
            ['SHA-1', '160 bits', 'Formerly FIPS 180; practical collisions, phased out for digital signatures'],
            ['SHA-256', '256 bits', 'SHA-2 in FIPS 180-4; widely recommended general-purpose hash'],
            ['SHA-384', '384 bits', 'SHA-2 derived from the SHA-512 design with a truncated output'],
            ['SHA-512', '512 bits', 'SHA-2 using 64-bit words and 1024-bit blocks'],
            ['SHA3-256 / 512', '256 / 512 bits', 'FIPS 202 Keccak sponge construction, structurally different from SHA-2']
          ]
        }
      },
      {
        title: 'Merkle-Damgård, sponge construction and length extension',
        paragraphs: [
          'MD5, SHA-1 and SHA-2 use iterative compression over padded blocks. Publishing H(secret || message) with these hashes can enable a length-extension attack because the digest exposes the internal chaining state. HMAC avoids this problem through a proven inner and outer keyed construction.',
          'SHA-3 uses a sponge: data is absorbed into a permutation state and output is squeezed from it. SHAKE128 and SHAKE256 are extendable-output functions whose output length is chosen by the application. SHA-3 supplements rather than simply versioning SHA-2.'
        ]
      },
      {
        title: 'Correct hashing workflows',
        paragraphs: [
          'Hash bytes, not an ambiguous visual string. Declare UTF-8 for text and normalize only when the protocol calls for it. Stream large files incrementally. When publishing a software checksum, deliver the expected digest through an authenticated channel or sign a release manifest.',
          'Passwords require a deliberately slow, salted password hashing function such as Argon2, scrypt, bcrypt or an approved PBKDF, not a fast SHA digest. Message authentication requires HMAC or another MAC. Digital signatures hash as part of a signature scheme but add private-key authenticity.'
        ]
      }
    ],
    references: [
      { title: 'FIPS 180-4: Secure Hash Standard', url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final', publisher: 'NIST' },
      { title: 'FIPS 202: SHA-3 Standard', url: 'https://csrc.nist.gov/pubs/fips/202/final', publisher: 'NIST' },
      { title: 'RFC 6151: Updated MD5 Security Considerations', url: 'https://www.rfc-editor.org/rfc/rfc6151.html', publisher: 'IETF / RFC Editor' }
    ]
  },
  'hmac-message-authentication-guide': {
    readingTime: '17 min read',
    deepDiveSections: [
      {
        title: 'RFC 2104 construction',
        paragraphs: [
          'HMAC was defined by Bellare, Canetti and Krawczyk and published as RFC 2104. For hash H, block-sized normalized key K, inner pad ipad=0x36 and outer pad opad=0x5c, it computes H((K xor opad) || H((K xor ipad) || message)). The two domains prevent the naive secret-prefix weaknesses of Merkle-Damgård hashes.',
          'Keys longer than the hash block size are first hashed; shorter keys are zero-padded for the construction. Security cannot exceed key entropy or digest strength. For HMAC-SHA-256, a uniformly random 256-bit key is a straightforward default.'
        ]
      },
      {
        title: 'Encoding and protocol canonicalization',
        paragraphs: [
          'Both parties must MAC identical bytes. HTTP methods, paths, query ordering, header case, newline choice, timestamp representation and JSON serialization all need a canonical signing specification. Signing visually equivalent but byte-different content produces a different tag.',
          'A robust envelope includes a key identifier, algorithm identifier fixed by policy, timestamp, nonce and the authenticated payload. Bind contextual fields such as tenant, endpoint and content type to prevent a valid tag from being replayed in another protocol location.'
        ]
      },
      {
        title: 'Verification, truncation and key lifecycle',
        paragraphs: [
          'Compare received and expected tags with a constant-time primitive after validating a fixed encoded length. Ordinary string equality can leak the first differing position through timing. RFC 2104 permits truncation, but the protocol must define one fixed length; longer tags increase forgery resistance.',
          'Rotate keys with explicit identifiers, accept old keys only for a bounded migration interval and never reuse one HMAC key across unrelated protocols. HMAC authenticates parties that share a key, but it cannot prove which holder produced a message and therefore does not provide non-repudiation.'
        ]
      }
    ],
    references: [
      { title: 'RFC 2104: HMAC Keyed-Hashing for Message Authentication', url: 'https://www.rfc-editor.org/rfc/rfc2104.html', publisher: 'IETF / RFC Editor' },
      { title: 'FIPS 198-1: The Keyed-Hash Message Authentication Code', url: 'https://csrc.nist.gov/pubs/fips/198-1/final', publisher: 'NIST' },
      { title: 'RFC 4231: HMAC-SHA Test Cases', url: 'https://www.rfc-editor.org/rfc/rfc4231.html', publisher: 'IETF / RFC Editor' }
    ]
  },
  'secure-password-generation-entropy': {
    readingTime: '18 min read',
    deepDiveSections: [
      {
        title: 'Entropy, search space and unbiased selection',
        paragraphs: [
          'If each of L positions is selected independently and uniformly from an alphabet of N symbols, the theoretical entropy is L × log2(N) bits and the search space is N^L. This formula does not describe a human-chosen password, whose choices are patterned and must be evaluated against attacker dictionaries.',
          'A generator needs a cryptographically secure random source such as crypto.getRandomValues. Mapping a random byte with byte % N is biased unless N divides 256. Rejection sampling discards values outside the largest multiple of N below the source range before applying modulo.'
        ],
        table: {
          caption: 'Approximate entropy for uniformly generated passwords',
          headers: ['Alphabet', 'Symbols', '12 characters', '20 characters'],
          rows: [
            ['Lowercase letters', '26', '56 bits', '94 bits'],
            ['Upper + lower + digits', '62', '71 bits', '119 bits'],
            ['94 printable ASCII symbols', '94', '79 bits', '131 bits'],
            ['Six-word list of 7,776 words', '7,776 per word', 'About 77 bits for six words', 'Not applicable']
          ]
        }
      },
      {
        title: 'Current NIST guidance for password verifiers',
        paragraphs: [
          'NIST SP 800-63B-4 requires at least 15 characters for a password used as a single authentication factor and at least eight when it is part of multi-factor authentication. Verifiers should allow at least 64 characters, accept spaces and Unicode, reject commonly used or compromised values, and must not impose character-class composition rules or periodic changes without evidence of compromise.',
          'These verifier rules and generated-secret design solve different problems. A generated 20-character secret can have excellent entropy, while a user-selected 15-character phrase still needs breach-list screening and rate limiting. Passwords are not phishing-resistant, so stronger assurance uses phishing-resistant multifactor authentication.'
        ]
      },
      {
        title: 'Storage and operational security',
        paragraphs: [
          'Servers store a per-password salt and the output of a memory-hard or approved password hashing scheme with its cost parameters. Salts need uniqueness, not secrecy. A server-side pepper can add defense in depth when stored separately, but it creates rotation and availability obligations.',
          'Generate a unique password for every account and store it in a password manager. Clipboard history, screenshots, logs and analytics can leak even a locally generated value. Clear temporary UI state where practical and never transmit generated passwords merely to measure strength.'
        ]
      }
    ],
    references: [
      { title: 'NIST SP 800-63B-4: Authenticator Management', url: 'https://pages.nist.gov/800-63-4/sp800-63b/authenticators/', publisher: 'NIST' },
      { title: 'Web Cryptography API', url: 'https://www.w3.org/TR/WebCryptoAPI/', publisher: 'W3C' },
      { title: 'NIST SP 800-132: Password-Based Key Derivation', url: 'https://csrc.nist.gov/pubs/sp/800/132/final', publisher: 'NIST' }
    ]
  },
  'x509-certificate-fields-and-decoding': {
    readingTime: '20 min read',
    deepDiveSections: [
      {
        title: 'X.509, PKIX, ASN.1 and DER',
        paragraphs: [
          'X.509 originated in the ITU-T directory standards. For Internet PKI, RFC 5280 profiles X.509 version 3 certificates and version 2 CRLs. The certificate structure is expressed in ASN.1 and normally encoded with DER, a canonical subset of BER. PEM wraps DER bytes in Base64 with BEGIN and END labels.',
          'A certificate contains tbsCertificate, signatureAlgorithm and signatureValue. The issuer signs the exact DER encoding of tbsCertificate; a viewer can decode fields without trusting them, while validation additionally verifies the signature, chain, time and application policy.'
        ],
        table: {
          caption: 'Core X.509 certificate fields',
          headers: ['Field', 'Purpose', 'Important interpretation'],
          rows: [
            ['Serial number', 'Issuer-assigned positive identifier', 'Unique per issuer; not globally unique by itself'],
            ['Issuer', 'Distinguished name of signing CA', 'Name equality alone does not prove the signing relationship'],
            ['Subject', 'Identity associated with the public key', 'May be empty when identity is entirely in SAN'],
            ['Validity', 'notBefore and notAfter', 'Necessary but insufficient for trust'],
            ['SubjectPublicKeyInfo', 'Algorithm and public-key bits', 'Includes parameters that must be validated'],
            ['Signature', 'Algorithm and signature over tbsCertificate', 'Verified with the issuer public key']
          ]
        }
      },
      {
        title: 'Extensions that control real behavior',
        paragraphs: [
          'subjectAltName carries DNS names, IP addresses, email addresses and other identity forms. basicConstraints distinguishes a CA and can limit subordinate path length. keyUsage is a bit field for operations such as digitalSignature, keyEncipherment and keyCertSign. extendedKeyUsage narrows acceptable applications such as TLS server or client authentication.',
          'subjectKeyIdentifier and authorityKeyIdentifier help chain construction but are not trust anchors. certificatePolicies, nameConstraints, CRL distribution points and Authority Information Access affect advanced validation. An unknown critical extension makes the certificate unusable to a conforming validator; an unknown noncritical extension may be ignored.'
        ]
      },
      {
        title: 'Reading is not validation',
        paragraphs: [
          'A parser should bound DER length, nesting and collection counts before rendering untrusted fields. Display fingerprints over the original DER bytes and label the hash algorithm. SHA-256 is appropriate for modern identification; an SHA-1 fingerprint may be displayed for compatibility but should not imply SHA-1 signature security.',
          'A decoded certificate can be self-signed, expired, issued by an unknown CA, revoked or valid for another hostname. A viewer should present these as facts and avoid a green trusted state unless it has run a full validation policy with a defined trust store and reference identity.'
        ]
      }
    ],
    references: [
      { title: 'RFC 5280: Internet X.509 PKI Certificate and CRL Profile', url: 'https://www.rfc-editor.org/rfc/rfc5280.html', publisher: 'IETF / RFC Editor' },
      { title: 'ITU-T Recommendation X.509', url: 'https://www.itu.int/rec/T-REC-X.509', publisher: 'International Telecommunication Union' },
      { title: 'RFC 7468: Textual Encodings of PKIX Structures', url: 'https://www.rfc-editor.org/rfc/rfc7468.html', publisher: 'IETF / RFC Editor' }
    ]
  },
  'generate-self-signed-x509-certificates': {
    readingTime: '20 min read',
    deepDiveSections: [
      {
        title: 'Key pair, CSR, issued certificate and self-signing',
        paragraphs: [
          'A private key is the secret signing or decryption material; SubjectPublicKeyInfo is its public counterpart. A PKCS #10 certification request defined by RFC 2986 contains a subject name, public key and optional attributes, signed by the requester to prove possession. A CA validates the request and chooses the certificate serial, validity, issuer, extensions and signature.',
          'A self-signed certificate uses the same entity as subject and issuer and signs with its own private key. It can be a deliberately distributed trust anchor or merely a development certificate. Self-signing does not create trust: clients must authenticate and install the trust anchor through a separate secure process.'
        ]
      },
      {
        title: 'Algorithms, key sizes and extensions',
        paragraphs: [
          'RSA 2048 remains a common minimum interoperability choice; larger RSA keys increase signature and generation cost. ECDSA P-256 provides roughly 128-bit classical security with smaller keys and signatures when the ecosystem supports it. The certificate signature hash should be SHA-256 or stronger and compatible with the selected key algorithm.',
          'A leaf TLS certificate normally sets CA=false, excludes keyCertSign, contains the intended DNS or IP identities in subjectAltName, and includes suitable key usage and extended key usage. A CA certificate requires basicConstraints CA=true and keyCertSign. Copying one extension template across both roles is dangerous.'
        ],
        table: {
          caption: 'Common key and container outputs',
          headers: ['Artifact', 'Contains', 'Typical encoding'],
          rows: [
            ['Private key', 'Secret key material', 'PKCS #8 PEM/DER; optionally encrypted'],
            ['Public key', 'SubjectPublicKeyInfo', 'PUBLIC KEY PEM/DER'],
            ['CSR', 'Subject, public key, attributes and proof signature', 'PKCS #10 PEM/DER'],
            ['Certificate', 'Issuer assertion binding identity to public key', 'X.509 DER or CERTIFICATE PEM'],
            ['PKCS #12', 'Keys and certificate bags', 'Binary PFX/P12 protected by password-based mechanisms']
          ]
        }
      },
      {
        title: 'Serial numbers, validity and private-key protection',
        paragraphs: [
          'RFC 5280 requires a positive serial number no longer than 20 octets and unique for each certificate issued by a CA. Generate serials with a CSPRNG or a collision-safe issuer process. Validity should be as short as operationally reasonable, with UTC handling and clock skew considered.',
          'Generate private keys locally where possible, encrypt exported keys with a strong passphrase and modern protection, restrict file permissions and never log them. PKCS #12 interoperability can force legacy algorithms; treat the container password as transport protection rather than a substitute for secure key storage.'
        ]
      }
    ],
    references: [
      { title: 'RFC 5280: Internet X.509 PKI Profile', url: 'https://www.rfc-editor.org/rfc/rfc5280.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 2986: PKCS #10 Certification Request Syntax', url: 'https://www.rfc-editor.org/rfc/rfc2986.html', publisher: 'IETF / RFC Editor' },
      { title: 'NIST SP 800-57 Part 1 Rev. 5', url: 'https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final', publisher: 'NIST' }
    ]
  },
  'validate-certificates-and-key-pairs': {
    readingTime: '22 min read',
    deepDiveSections: [
      {
        title: 'RFC 5280 certification-path validation',
        paragraphs: [
          'Path validation starts with an explicitly trusted anchor and a prospective sequence of intermediate certificates ending at the target. It verifies each signature, issuer relationship, validity period, basic constraints, path-length constraint, key usage, name constraints, certificate policies and every recognized critical extension. Chain construction and chain validation are related but distinct operations.',
          'The root self-signature is not what grants trust. The trust store configuration does. An intermediate sent by a server can help build a path but cannot appoint a new trust anchor. Different clients may construct different valid paths from the same certificate set.'
        ],
        table: {
          caption: 'Independent checks in certificate validation',
          headers: ['Check', 'Question answered', 'Common mistake'],
          rows: [
            ['Parsing', 'Is the ASN.1/DER structure well formed?', 'Treating successful parsing as trust'],
            ['Time', 'Is the certificate within notBefore/notAfter?', 'Ignoring UTC or clock skew'],
            ['Signature path', 'Does each issuer signature validate to a trust anchor?', 'Trusting matching issuer text'],
            ['Constraints', 'May each intermediate act as a CA for this path?', 'Ignoring basicConstraints or keyCertSign'],
            ['Identity', 'Does SAN match the expected DNS name, IP or service?', 'Checking only Common Name'],
            ['Revocation', 'Has the issuer revoked this serial?', 'Assuming expiry checking covers compromise'],
            ['Key match', 'Does the private key correspond to the public key?', 'Comparing file formatting rather than public components']
          ]
        }
      },
      {
        title: 'Service identity under RFC 9525',
        paragraphs: [
          'RFC 9525 obsoletes RFC 6125 and defines current TLS service-identity verification. A client constructs a reference identity from trusted connection configuration and matches it against subjectAltName entries of the correct type. DNS names match DNS-ID rules; IP addresses require an IP-ID. The legacy Common Name is not the general identity source.',
          'Wildcard matching is deliberately limited and application profiles can be stricter. Identity is checked only after a valid path is established; a publicly trusted certificate for example.com is still wrong for api.example.net.'
        ]
      },
      {
        title: 'Key-pair matching and revocation',
        paragraphs: [
          'For RSA, compare modulus n and public exponent e derived from the private key with SubjectPublicKeyInfo. For elliptic-curve keys, derive and compare the public point and curve parameters. A stronger generic approach signs a challenge with the private key and verifies it with the certificate public key using a suitable algorithm.',
          'CRLs and OCSP communicate revocation status, but behavior depends on the application policy, network availability, freshness and stapling. A local file validator can prove structural and key relationships without necessarily proving current public trust or revocation. Its report should identify exactly which checks were and were not performed.'
        ]
      }
    ],
    references: [
      { title: 'RFC 5280: Certification Path Validation', url: 'https://www.rfc-editor.org/rfc/rfc5280.html#section-6', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 9525: Service Identity in TLS', url: 'https://www.rfc-editor.org/rfc/rfc9525.html', publisher: 'IETF / RFC Editor' },
      { title: 'RFC 6960: Online Certificate Status Protocol', url: 'https://www.rfc-editor.org/rfc/rfc6960.html', publisher: 'IETF / RFC Editor' }
    ]
  }
};
