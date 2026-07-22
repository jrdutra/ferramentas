import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const JOSE_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Cryptography, Context, and Governance for Secure Tokens"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/overview.svg",
    "alt": "Cryptographic cycle of a token between issuer, JWS or JWT, API Gateway and backend",
    "caption": "Opening Figure - Secure tokens depend on encryption, context, recipient, and key governance."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Signature protects integrity and origin; encryption protects reading. None of them replace issuer, audience and purpose validation."
  },
  {
    "kind": "paragraph",
    "text": "In-depth edition - study material and professional reference"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter presentation",
    "id": "chapter-presentation"
  },
  {
    "kind": "paragraph",
    "text": "The previous chapter presented OpenID Connect and showed that ID Tokens, access tokens, logout tokens and other artifacts can use JSON Web Token as a format. However, recognizing three segments separated by dots is not enough to trade tokens safely. It is necessary to understand the JOSE family, the difference between claims and cryptographic protection, the selection of algorithms, the distribution of keys and the specific validations for each profile."
  },
  {
    "kind": "paragraph",
    "text": "JWT is a framework for transporting claims. JWS protects content with a digital signature or message authentication code. JWE protects confidentiality by authenticated encryption. JWK represents a key in JSON; a JWKS publishes key sets; JWA records algorithms and identifiers. These components combine, but are not synonymous. A JWT can be a JWS, a JWE, or a nested structure."
  },
  {
    "kind": "paragraph",
    "text": "In enterprise APIs, the most serious errors are rarely in Base64url decoding. They arise when the consumer accepts unforeseen algorithms, chooses keys using untrusted data, ignores issuer or audience, mixes ID Token and access token, reuses the same rule for different types of JWT or maintains key rotation incompatible with caches and token lifetime."
  },
  {
    "kind": "paragraph",
    "text": "This chapter delves into compact and JSON serializations, protected headers, claims, JWK, JWKS, thumbprints, rotation, JWE, nested tokens, and access token profiles. It also incorporates best practices from RFC 8725 and the update to RFC 9864 on fully specified algorithm identifiers, as well as relating the concepts to Axway API Gateway, Azure API Management, and validation libraries."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each example, answer in order: what is the type of the object, who issued it, who is the recipient, which algorithm is allowed, where the key comes from, which bytes were protected and which claims need to be validated. This sequence reduces the chance of accepting a token just because its signature appears valid."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Learning Objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Distinguish JOSE, JWT, JWS, JWE, JWK, JWKS and JWA.",
      "Explain Base64url, UTF-8, JSON and the impact of exact byte representation.",
      "Interpret registered, public and private claims without confusing presence with trust.",
      "Describe JWS Compact Serialization and JSON Serialization.",
      "Differentiate digital signature and MAC, including non-repudiation and key distribution implications.",
      "Restrict algorithms by allowlist and avoid algorithm confusion.",
      "Use typ, cty, kid and crit in a safe and contextual way.",
      "Interpret JWKs RSA, EC, OKP and oct and separate public material from private material.",
      "Plan JWKS, caching, rotation, rollover and key removal.",
      "Explain the alg and enc parameters in JWE and the five-part structure.",
      "Design nested tokens and decide when to sign, encrypt, or use both.",
      "Validate JWTs cryptographically, temporally and semantically.",
      "Apply JWT profile to access tokens and distinguish other JWT types.",
      "Diagnose signature, audience, issuer, kid, cache, clock and encryption failures."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Chapter structure"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "18.1 The JOSE family and its responsibilities",
      "18.2 Base64url, UTF-8 and canonical JSON",
      "18.3 JWT: claims and security envelope",
      "18.4 Registered claims, public and private",
      "18.5 JWS: signing input and serializations",
      "18.6 Digital signature and MAC",
      "18.7 Algorithms, allowlists and RFC 9864",
      "18.8 Headers typ, cty, kid and crit",
      "18.9 JWK: anatomy and key types",
      "18.10 JWKS and key distribution",
      "18.11 kid, thumbprints and X.509 certificates",
      "18.12 Key rotation, caching, and key retirement",
      "18.13 JWE: alg, enc and Content Encryption Key",
      "18.14 JWE Serializations and Multiple Recipients",
      "18.15 Nested JWT and order of protections",
      "18.16 Secure Validation Pipeline",
      "18.17 JWT Profile for OAuth 2.0 access tokens",
      "18.18 Other JWT profiles",
      "18.19 Proof-of-possession and claim cnf",
      "18.20 Application in API Gateways, Axway, and Azure",
      "18.21 Threats and hardening",
      "18.22 Privacy, logging and minimization",
      "18.23 Troubleshooting",
      "18.24 Case studies and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/figure-01-jose-family.svg",
    "alt": "JOSE family separating JWT, JWS, JWE, JWK, JWKS and JWA due to liability",
    "caption": "Figure 1 - JOSE is a family of structures; JWT is just one part of the model."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.1 The JOSE family and its responsibilities",
    "id": "18-1-the-jose-family-and-their-responsibilities"
  },
  {
    "kind": "paragraph",
    "text": "JSON Object Signing and Encryption is the set of specifications that define JSON structures for signing, authentication, encryption, and key representation. The objective is to transport security objects in a way that is compatible with HTTP, URIs and applications that already use JSON. The family was divided into documents to separate structure, algorithms, keys and claims semantics."
  },
  {
    "kind": "paragraph",
    "text": "JWT defines a set of claims and processing rules. JWS defines how to protect a sequence of bytes with a digital signature or MAC. JWE defines authenticated encryption and content key management. JWK defines how to represent cryptographic keys in JSON, while JWA associates identifiers such as RS256, ES256 or A256GCM with concrete operations."
  },
  {
    "kind": "paragraph",
    "text": "A token commercially called a JWT is usually a JWS in compact serialization, but this is a frequent convention, not a formal equivalence. There are also encrypted JWTs like JWE, JWSs whose payload is not a JWT, and JOSE objects with multiple signatures or recipients using JSON serialization."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Each JOSE component solves a different responsibility.",
    "headers": [
      "Structure",
      "Protection or function",
      "Usage example"
    ],
    "rows": [
      [
        "JWT",
        "Set of claims with semantics defined by a profile.",
        "ID Token, access token, client assertion or logout token."
      ],
      [
        "JWS",
        "Integrity and authentication by signature or MAC.",
        "Signed token and signed webhook."
      ],
      [
        "JWE",
        "Confidentiality and integrity through authenticated encryption.",
      "Token with sensitive claims intended for a specific recipient."
      ],
      [
        "JWK/JWKS",
        "Representation and publication of keys.",
        "Issuer public keys for validation."
      ],
      [
        "JWA",
        "Algorithm and parameter identifiers.",
        "RS256, ES256, A256GCM and RSA-OAEP-256."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.2 Base64url, UTF-8 and JSON representation",
    "id": "18-2-base64url-utf-8-and-json-representation"
  },
  {
    "kind": "paragraph",
    "text": "Base64url transforms bytes into URL-safe characters by replacing the + and / characters and typically removing the = padding. The operation does not encrypt, does not compress and does not provide integrity. Anyone who receives a compact JWS can decode header and payload, even if they do not have the signing key."
  },
  {
    "kind": "paragraph",
    "text": "Before encoding, JSON objects are converted to UTF-8 bytes. Spaces, member order, escapes, and numeric forms can produce different byte sequences even when two representations appear semantically equivalent. In JWS, the signature covers the exact representation used in the signing input; a library should not decode the payload and reserialize it to verify the signature."
  },
  {
    "kind": "paragraph",
    "text": "JSON allows flexibility that requires defensive validation. Duplicate member names, numbers outside the expected range, strings with different normalization, and multiple representations can cause differing interpretations between libraries. The profile that uses JWT must define accepted claims, types and limits, rejecting ambiguous objects."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - transformação do header\nheader JSON: {\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"key-2026-07\"}\nBASE64URL(UTF8(header))\n  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0yMDI2LTA3In0\nBase64url e apenas codificacao. O conteudo permanece legivel."
  },
  {
    "kind": "subhead",
    "text": "Recurring error"
  },
  {
    "kind": "paragraph",
    "text": "Hiding a token in the browser, in a header or in a log is not equivalent to protecting confidentiality. A signed JWS remains readable. To prevent content from being read, JWE or other suitable channel and storage protection is required."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.3 JWT: claims and security envelope",
    "id": "18-3-jwt-claims-and-security-envelope"
  },
  {
    "kind": "paragraph",
    "text": "A claim is an assertion represented by a name-value pair. The JWT Claims Set is a JSON object that brings together these claims. The format does not automatically determine who can issue the claim, how long it is valid or how it should be interpreted. These rules pertain to the profile and the trust relationship between sender and recipient."
  },
  {
    "kind": "paragraph",
    "text": "JWT can be protected by JWS or JWE. In a JWS, claims are readable, but changes are detectable when the signature is verified correctly. In a JWE, the content is encrypted and authenticated. In both cases, the recipient still needs to validate issuer, audience, time, type and application-specific rules."
  },
  {
    "kind": "paragraph",
    "text": "Claims should not carry arbitrary state just because the token supports JSON. Large tokens increase bandwidth usage, header size, pressure on proxies and risk of exposure. The issuance must prioritize stable data necessary for the decision, using identifiers for information that needs to be consulted in real time."
  },
  {
    "kind": "table",
    "caption": "Table 2 - Registered claims have general semantics, but the profile defines the concrete obligation.",
    "headers": [
      "Claim",
      "General semantics",
      "Typical validation"
    ],
    "rows": [
      [
        "iss",
        "Issuer identifier.",
        "Accurate comparison with issuer enabled."
      ],
      [
        "sub",
        "Identifier of the subject in the sender.",
        "Interpret together with this and the profile."
      ],
      [
        "aud",
        "Recipient or set of recipients.",
        "Contain the audience of the API or client."
      ],
      [
        "exp",
        "Instant after which the token should not be accepted.",
        "Synchronized clock and small tolerance."
      ],
      [
        "nbf",
        "Instant before which the token should not be accepted.",
        "Reject early use outside of tolerance."
      ],
      [
        "iat",
        "Emission time.",
        "Check plausibility and age policies."
      ],
      [
        "jti",
        "Unique token identifier.",
        "Replay detection or audit when the profile requires it."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.4 Registered claims, public and private",
    "id": "18-4-registered-claims-public-and-private"
  },
  {
    "kind": "paragraph",
    "text": "Registered claims have names and semantics documented in the IANA registry, such as iss, sub, aud, exp and jti. They are not mandatory in every JWT, but profiles such as OIDC and RFC 9068 specify which ones should appear. Correct usage depends on respecting the intended JSON type and the purpose of the profile."
  },
  {
    "kind": "paragraph",
    "text": "Public claims use collision-resistant names, typically registered or based on a URI controlled by the organization. Private claims are local agreements between issuer and consumer, such as roles, tenant_id, or transaction_limit. They are useful, but they can clash across ecosystems and change meaning when a token crosses organizational boundaries."
  },
  {
    "kind": "paragraph",
    "text": "An authorization claim should not be accepted just because it exists. The resource server needs to know the issuer, profile, namespace, type and policy that produces it. For example, roles issued by a directory may represent administrative groups rather than domain permissions. The application must transform reliable claims into explicit local decisions."
  },
  {
    "kind": "subhead",
    "text": "Claim design"
  },
  {
    "kind": "paragraph",
    "text": "Prefer stable names, simple types, and documented meaning. Avoid including secrets, unnecessary personal data, huge lists of groups, or business objects that change during the token's validity."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/figure-02-jws-compact.svg",
    "alt": "JWS Compact Serialization with protected header, payload, signature and signing input",
    "caption": "Figure 2 - The signature covers the protected header and the encoded payload, joined by a dot."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.5 JWS: signing input and serializations",
    "id": "18-5-jws-signing-input-and-serializations"
  },
  {
    "kind": "paragraph",
    "text": "JWS Compact Serialization has three parts: protected header, payload and signature. The first two are encoded in Base64url and joined by a dot to form the signing input. The algorithm uses this value and the appropriate key to produce the third part. The check reconstructs the same bytes and validates the cryptographic operation."
  },
  {
    "kind": "paragraph",
    "text": "JWS JSON Serialization represents the object as JSON and allows multiple signatures on the same payload. The flattened form contains a signature; the general form contains a collection. This model is useful when different organizations or keys need to sign the same content, although it increases policy and processing complexity."
  },
  {
    "kind": "paragraph",
    "text": "RFC 7797 allows non-Base64url-encoded payloads through the b64 parameter in the protected header and the use of crit. This option is specialized and can improve integration with highlighted content, but requires explicit support and care for characters that interfere with compact serialization. Common APIs should prefer the default behavior offered by mature libraries."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - construção conceitual de um JWS\nprotected = BASE64URL(UTF8({\"alg\":\"ES256\",\"kid\":\"ec-1\"}))\npayload   = BASE64URL(payload_bytes)\nsigning_input = protected + \".\" + payload\nsignature = ECDSA_sign(private_key, signing_input)\njws_compact = protected + \".\" + payload + \".\" + BASE64URL(signature)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.6 Digital signature and MAC",
    "id": "18-6-digital-signature-and-mac"
  },
  {
    "kind": "paragraph",
    "text": "Asymmetric algorithms use private key to sign and public key to verify. The issuer keeps the private key under control and distributes only public material. This model facilitates validation by multiple APIs and reduces the ability of validators to issue tokens, as having the public key does not allow creating new signatures."
  },
  {
    "kind": "paragraph",
    "text": "MAC algorithms such as HMAC use the same secret to produce and verify code. Every component capable of validating can also generate an indistinguishable token. In architectures with many resource servers, secret sharing increases the impact of compromise and makes it difficult to assign which component produced a token."
  },
  {
    "kind": "paragraph",
    "text": "Digital signature does not automatically create legal non-repudiation. Logs, key control, certification, policy, auditing, and context are required. Likewise, verifying the signature only proves that the bytes correspond to an accepted key; it does not prove that the token is current, intended for that API, or authorized for the operation."
  },
  {
    "kind": "table",
    "caption": "Table 3 - The choice of model changes boundaries of trust and incident response.",
    "headers": [
      "Model",
      "Distribution",
      "Operational implication"
    ],
    "rows": [
      [
        "Asymmetric signature",
        "Private at the issuer; public on validators.",
        "Validators are unable to issue tokens. Facilitates JWKS and rotation."
      ],
      [
        "Symmetrical MAC",
        "Same secrecy at issuer and validators.",
        "Any committed validator can craft tokens."
      ],
      [
        "Signature with HSM/KMS",
        "Private operation in controlled module.",
        "Reduces key exposure and improves auditing, with cost and dependency."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.7 Algorithms, allowlists and RFC 9864",
    "id": "18-7-algorithms-allowlists-and-rfc-9864"
  },
  {
    "kind": "paragraph",
    "text": "The alg header declares the algorithm used, but should not alone control the decision. The consumer must have an allowlist configured by profile, issuer and token type. If the application accepts any advertised algorithm, algorithm confusion, downgrade or use of an incompatible operating key may occur."
  },
  {
    "kind": "paragraph",
    "text": "Algorithms need to be evaluated for the full set of parameters, key size, library, regulatory requirements, and interoperability. RS256 remains widely supported; PS256 uses RSA-PSS; ES256 uses ECDSA with P-256 and SHA-256. Modern algorithms based on EdDSA must consider updates to fully specified identifiers and actual ecosystem support."
  },
  {
    "kind": "paragraph",
    "text": "RFC 9864, published in 2025, differentiates fully specified algorithms from those that rely on external parameters to determine operation. It updates JOSE records and deprecates polymorphic identifiers in situations covered by the specification. New architectures should consult the current IANA registry and avoid negotiating ambiguous names just for historical compatibility."
  },
  {
    "kind": "table",
    "caption": "Table 4 - The algorithm should be chosen by policy, not by the untrusted content of the token.",
    "headers": [
      "Algorithm",
      "Family",
      "Attention"
    ],
    "rows": [
      [
        "RS256",
        "RSA PKCS#1 v1.5 with SHA-256",
        "Broad support; use sufficient wrench and governed rotation."
      ],
      [
        "PS256",
        "RSA-PSS with SHA-256",
        "Probabilistic padding; confirm support of all components."
      ],
      [
        "ES256",
        "ECDSA P-256 with SHA-256",
        "Compact signature; requires correct implementation of ECDSA."
      ],
      [
        "HS256",
        "HMAC with SHA-256",
        "Shared secret turns validators into potential issuers."
      ],
      [
        "none",
        "No cryptographic protection",
        "Do not accept in security tokens."
      ],
      [
        "EdDSA / updated names",
        "Edwards curves",
        "Consult RFC 9864 and IANA registry for identifier and current support."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Security rule"
  },
  {
    "kind": "paragraph",
    "text": "Configure expected algorithm next to the issuer and the token type. Do not derive the allowlist from the alg header itself, and do not reuse the same key in incompatible algorithm families."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.8 Headers typ, cty, kid and crit",
    "id": "18-8-headers-typ-cty-kid-and-crit"
  },
  {
    "kind": "paragraph",
    "text": "The type parameter declares the type of object for the application. It doesn't change the encryption, but it helps prevent confusion between JWTs with different purposes. RFC 8725 recommends explicit typing and mutually exclusive rules. The RFC 9068 access token profile uses at+jwt, while ID Tokens often use JWT or rely on the OIDC context."
  },
  {
    "kind": "paragraph",
    "text": "cty describes the payload type, being especially useful in nested objects. A JWE that contains a signed JWT can use cty equal to JWT. kid is a tip for selecting a key among several; is not a global identifier, does not prove ownership and can be repeated between issuers."
  },
  {
    "kind": "paragraph",
    "text": "crit lists header parameters that need to be understood to process the object. If a critical item is unknown, the consumer must reject the token. Ignoring crit destroys the ability of extensions to modify security semantics. Headers that influence the cryptographic operation must be in the protected area, not just in unprotected fields of JSON serialization."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Headers guide processing, but require local policy.",
    "headers": [
      "Header",
      "Function",
      "Validation"
    ],
    "rows": [
      [
        "typ",
        "Object type for the application.",
        "Compare with the expected profile and separate rules."
      ],
      [
        "cty",
        "Type of protected content.",
        "Use in nesting and non-obvious content."
      ],
      [
        "kid",
        "Select candidate key.",
        "Resolve only within the trusted issuer."
      ],
      [
        "crit",
        "Extensions that need to be understood.",
        "Reject if any item is not supported."
      ],
      [
        "jku/x5u",
        "URL of keys or certificates.",
        "Do not fetch freely from untrusted token."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.9 JWK: anatomy and key types",
    "id": "18-9-jwk-anatomy-and-key-types"
  },
  {
    "kind": "paragraph",
    "text": "JSON Web Key represents cryptographic material with parameters defined by kty. A public RSA key includes n and e; an EC key includes crv, x and y; an OKP key includes curve and public coordinate; a symmetric key oct includes k. Private parameters such as d, p, q, or k should not appear in public JWKS."
  },
  {
    "kind": "paragraph",
    "text": "use indicates broad purpose, such as sig or enc. key_ops lists specific operations, such as verify, sign, encrypt, or decrypt. alg can restrict association with an algorithm. These fields need to be coherent with each other and with the application policy; they should not automatically expand what the key can do."
  },
  {
    "kind": "paragraph",
    "text": "Keys must have origin, owner, activation date, withdrawal date, purpose and revocation procedure. Representing a key in JSON does not eliminate secret controls. Private keys must remain in HSM, KMS, vault, or secure storage and be loaded only by authorized processes."
  },
  {
    "kind": "code",
    "text": "Exemplo - JWK pública RSA\n{\n  \"kty\": \"RSA\",\n  \"kid\": \"signing-2026-07\",\n  \"use\": \"sig\",\n  \"alg\": \"RS256\",\n  \"n\": \"sXch...base64url-modulus...\",\n  \"e\": \"AQAB\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Private material"
  },
  {
    "kind": "paragraph",
    "text": "A public JWKS must contain only public parameters. The presence of d, p, q, dp, dq, qi, or k may expose a private key or symmetric secret and requires immediate incident response."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.10 JWKS and key distribution",
    "id": "18-10-jwks-and-key-distribution"
  },
  {
    "kind": "paragraph",
    "text": "A JSON Web Key Set contains the keys property with a list of JWKs. Identity providers publish JWKS for clients and resource servers to verify signatures. The endpoint must be obtained by trusted configuration or metadata linked to the issuer, never by an arbitrary URL provided by the token."
  },
  {
    "kind": "paragraph",
    "text": "The consumer maintains cache to avoid network dependency on each request. The cache must respect HTTP policies, have a size limit, timeout, controlled update and safe fallback. In the event of temporary endpoint failure, known keys may continue to be valid according to policy, but keyless tokens should not be accepted just to preserve availability."
  },
  {
    "kind": "paragraph",
    "text": "Validation must first fix the allowed issuer, find the corresponding set, and then use kid, kty, alg and key_ops to filter candidates. A global cache indexed only by kid allows for collisions between tenants and issuers. The secure index includes at least the issuer and key identifier."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Key distribution is part of token availability and security.",
    "headers": [
      "Component",
      "Responsibility",
      "Typical failure"
    ],
    "rows": [
      [
        "Issuer configuration",
        "Set trusted domain and profile.",
        "Token from another tenant or accepted environment."
      ],
      [
        "jwks_uri",
        "Publish current public keys.",
        "URL changed or unavailable."
      ],
      [
        "Cache",
        "Reduce latency and dependency per request.",
        "New unseeded key or old eternal key."
      ],
      [
        "Selection by kid",
        "Choose candidate from the trusted set.",
        "Global collision or non-existent kid."
      ],
      [
        "Update",
        "Search set when necessary.",
        "Refresh storm induced by malicious tokens."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.11 kid, thumbprints and X.509 certificates",
    "id": "18-11-kid-thumbprints-and-x-509-certificates"
  },
  {
    "kind": "paragraph",
    "text": "kid is an identifier chosen by the issuer and can be an opaque string. It facilitates rotation, but does not have global uniqueness. JWK Thumbprint, defined by RFC 7638, computes a digest over a canonical representation of the key's required members and produces identifier derived from the public material itself."
  },
  {
    "kind": "paragraph",
    "text": "x5c can carry an X.509 certificate chain; x5t and x5t#S256 carry certificate thumbprints. When certificates are used, the consumer needs to validate chain, key usage, validity and trust according to the profile. Comparing just a thumbprint received in the token does not create a reliable anchor."
  },
  {
    "kind": "paragraph",
    "text": "jku and x5u point to remote resources. Following these URLs without allowlist creates SSRF, access to internal networks and key rollover. On enterprise platforms, metadata endpoints and JWKS must be pre-configured, resolved through controlled and monitored channels."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - JWK Thumbprint\nthumbprint_input = canonical_json({\n  \"e\": \"AQAB\",\n  \"kty\": \"RSA\",\n  \"n\": \"sXch...\"\n})\njwk_thumbprint = BASE64URL(SHA256(UTF8(thumbprint_input)))"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/figure-03-key-rotation.svg",
    "alt": "Key rotation with early publishing, overlay, and secure retirement",
    "caption": "Figure 3 - Secure rotation publishes the new key before using it and keeps the old one during rollover."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.12 Key rotation, caching, and key retirement",
    "id": "18-12-key-rotation-caching-and-key-retirement"
  },
  {
    "kind": "paragraph",
    "text": "Planned rotation begins with early publication of the new key. After caches have had the opportunity to update it, the issuer starts signing new tokens with the new kid. The previous key remains published until all tokens signed by it have expired, plus clock tolerances, queues, retries and propagation delay."
  },
  {
    "kind": "paragraph",
    "text": "Removing the key immediately after changing the signer causes tokens that are still valid to fail. Keeping keys indefinitely reduces revocation capacity and expands surface area. The window must be calculated based on maximum token lifetime, refresh, cache-control, update times and behavior of disconnected components."
  },
  {
    "kind": "paragraph",
    "text": "When an unknown kid appears, the validator can update the JWKS once within limits and use coalescence to avoid multiple simultaneous searches. Random tokens should not trigger a request per attempt. Rate limiting, short negative cache and circuit breaker protect the metadata endpoint and the gateway itself."
  },
  {
    "kind": "paragraph",
    "text": "In key compromise, priority may require immediate withdrawal and invalidation of tokens, accepting controlled unavailability. The plan needs to define detection, emergency rotation, communication to consumers, revocation, analysis of improper issuance and restoration of trust."
  },
  {
    "kind": "subhead",
    "text": "Operating equation"
  },
  {
    "kind": "paragraph",
    "text": "Minimum overlap time must consider: maximum token life + clock tolerance + cache delay + queues and retries. Use real metrics, not just nominal exp value."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/figure-04-jwe-compact.svg",
    "alt": "JWE Compact Serialization with protected header, encrypted key, IV, ciphertext and tag",
    "caption": "Figure 4 - JWE separates key management and authenticated content encryption."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.13 JWE: alg, enc and Content Encryption Key",
    "id": "18-13-jwe-alg-enc-and-content-encryption-key"
  },
  {
    "kind": "paragraph",
    "text": "JWE uses a Content Encryption Key, or CEK, to encrypt plaintext with the authenticated encryption algorithm denoted by enc. The alg parameter defines how this CEK is secured, transported, derived, or shared with the recipient. Therefore, alg and enc have different responsibilities and both must be allowed by the policy."
  },
  {
    "kind": "paragraph",
    "text": "In RSA-OAEP-256, the CEK is encrypted with the recipient's RSA public key. In dir, the shared symmetric key is directly used as CEK. In ECDH-ES, a key agreement operation derives material from elliptical keys. The choice changes key distribution, forward secrecy, interoperability and risk of compromise."
  },
  {
    "kind": "paragraph",
    "text": "Algorithms like A256GCM provide confidentiality and integrity in a single authenticated operation. IV or nonce must comply with the algorithm requirements and cannot be reused under the same key when this compromises security. The authentication tag must be validated before releasing any plaintext to the application."
  },
  {
    "kind": "paragraph",
    "text": "Encryption does not eliminate the need for a signature when the recipient needs to verify authorship separately. A JWE proves that the tag is valid under the encryption key, but the identity of the producer depends on the key management mechanism and the profile. Nested tokens can combine signing and encryption."
  },
  {
    "kind": "table",
    "caption": "Table 7 - JWE combines key management, content encryption and protected metadata.",
    "headers": [
      "Parameter",
      "Example",
      "Responsibility"
    ],
    "rows": [
      [
        "alg",
        "RSA-OAEP-256",
        "Protect or establish the CEK for the recipient."
      ],
      [
        "enc",
        "A256GCM",
        "Encrypt content and produce authentication tag."
      ],
      [
        "zip",
        "DEF",
        "Compress before encryption; use only with risk analysis."
      ],
      [
        "kid",
        "recipient-key-2",
        "Select decryption key within the trusted domain."
      ],
      [
        "cty",
        "JWT",
        "Indicate that the plaintext is a nested JWT."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.14 JWE Serializations and Multiple Recipients",
    "id": "18-14-jwe-serializations-and-multiple-recipients"
  },
  {
    "kind": "paragraph",
    "text": "Compact serialization has five parts: protected header, encrypted key, IV, ciphertext and authentication tag. It is suitable for a recipient and transport in parameters or headers. JSON serialization allows protected and unprotected fields, Additional Authenticated Data and multiple recipients, each with their own encrypted key."
  },
  {
    "kind": "paragraph",
    "text": "Across multiple recipients, the same ciphertext can be shared while the CEK is protected separately for each key. This reduces duplication, but creates more complex policy: all recipients receive the same content and need to be governed as a whole. Removing a recipient requires re-encryption for future messages."
  },
  {
    "kind": "paragraph",
    "text": "Unprotected headers can be changed without invalidating the tag when they do not participate in AAD. Information that determines algorithm, key, type or interpretation must be in the protected header. The consumer needs to know which fields are authenticated and reject inconsistent combinations."
  },
  {
    "kind": "code",
    "text": "Mapa da JWE Compact Serialization\nprotected.encrypted_key.iv.ciphertext.tag\n1. protected: alg, enc, kid, cty\n2. encrypted_key: CEK protected for the recipient\n3. iv: unique value required by the algorithm\n4. ciphertext: plaintext cifrado\n5. tag: authenticity of ciphertext and associated data"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.15 Nested JWT and order of protections",
    "id": "18-15-nested-jwt-and-order-of-protections"
  },
  {
    "kind": "paragraph",
    "text": "A Nested JWT applies JWS and JWE in sequence. The common pattern is to sign first and encrypt later. The issuer creates a JWS that preserves integrity and authorship, then uses that JWS as the plaintext of a JWE intended for the consumer. The outer JWE uses cty the same as JWT to indicate nested content."
  },
  {
    "kind": "paragraph",
    "text": "After decryption, the recipient still needs to validate the internal JWS. The validity of the external tag does not replace the internal token's signature, issuer, audience or time. Likewise, the internal signature does not prove that the external object was intended for the component that received it."
  },
  {
    "kind": "paragraph",
    "text": "Encrypting and then signing exposes metadata and the external signature, and produces different semantics. Profiles must define the order, algorithms, types and error handling. Don't invent your own composition when a standardized profile or token-signed TLS channel meets the requirement."
  },
  {
    "kind": "table",
    "caption": "Table 8 - The choice depends on confidentiality, autonomy, revocation and complexity.",
    "headers": [
      "Strategy",
      "Property",
      "Usage"
    ],
    "rows": [
      [
        "JWS only",
        "Integrity and origin; readable payload.",
        "Access common tokens over TLS channels."
      ],
      [
        "JWE only",
        "Confidentiality and integrity under the encryption key.",
        "Content intended for specific recipient."
      ],
      [
        "JWS within JWE",
        "Internal authorship and external confidentiality.",
        "Nested JWT with sensitive claims."
      ],
      [
        "Opaque reference",
        "Server queries state by identifier.",
        "Revocation and minimization when not necessary self-contained."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/en/figure-05-validation-pipeline.svg",
    "alt": "Secure JWT validation pipeline on a resource server",
    "caption": "Figure 5 - Secure validation is a chain; skipping a step changes the trust model."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.16 Secure Validation Pipeline",
    "id": "18-16-secure-validation-pipeline"
  },
  {
    "kind": "paragraph",
    "text": "The validator starts with the external context: endpoint, expected issuer, token type and profile. It then does defensive parsing with limits on size, number of segments, JSON depth, and types. The untrusted header is only read to select an operation allowed within the configuration."
  },
  {
    "kind": "paragraph",
    "text": "Key selection occurs in the set associated with the issuer. alg needs to be on the allowlist and compatible with kty, use and key_ops. The signature, MAC or tag is fully verified. Cryptographic failures terminate processing without trying alternative unauthorized algorithms."
  },
  {
    "kind": "paragraph",
    "text": "After encryption come semantic validations: iss, aud, exp, nbf, iat, typ, cty, nonce, jti, scopes, tenant and profile claims. Rules for access token, ID Token, client assertion and logout token must be mutually exclusive. Accepting a token in multiple contexts favors cross-JWT confusion."
  },
  {
    "kind": "paragraph",
    "text": "Finally, authorization applies local rules. A valid token does not imply permission for any object. The backend must verify operation, resource, ownership, business context and current policies. Logs must record minimum results and identifiers, never the complete token."
  },
  {
    "kind": "table",
    "caption": "Table 9 - Parsing, token authentication and authorization are different steps.",
    "headers": [
      "Step",
      "Question",
      "Failure result"
    ],
    "rows": [
      [
        "Context",
        "What type of token and issuer does this endpoint accept?",
        "Reject before trust in headers."
      ],
      [
        "Parsing",
        "Are structure, size and JSON acceptable?",
        "Generic error without deep processing."
      ],
      [
        "Algorithm and key",
        "Allowed algorithm and correct issuer key?",
        "Reject; update JWKS only in a controlled manner."
      ],
      [
        "Cryptography",
        "Are signature, MAC or tag valid?",
        "Reject without using claims."
      ],
      [
        "Claims",
        "Are audience, time, type and profile rules valid?",
        "401 or corresponding protocol error."
      ],
      [
        "Authorization",
        "Can the identity perform the action on the resource?",
        "403 or appropriate domain response."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.17 JWT Profile for OAuth 2.0 access tokens",
    "id": "18-17-jwt-profile-for-oauth-2-0-access-tokens"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9068 defines an interoperable profile for JWT access tokens. It does not force OAuth to use JWT; access tokens can still be opaque. When the profile is adopted, the token must be signed, cannot use alg none and must declare typ equal to at+jwt, in addition to claims and specific rules for issuer, subject, audience, time, client_id and authorization."
  },
  {
    "kind": "paragraph",
    "text": "The resource server validates the token for its own audience. Scopes may appear in scope, and additional authorization information may be carried depending on the profile and agreements. The token should not be accepted by APIs from another audience just because it was issued by the same Authorization Server."
  },
  {
    "kind": "paragraph",
    "text": "JWT access tokens reduce introspection calls and allow local validation, but make immediate revocation more difficult. Short lifetime, rotation, sender constraints, emergency lists, and session policies can reduce exposure. For data that needs to reflect instantaneous state, introspection or authorization query may be more appropriate."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - header e claims de access token\n{\n  \"typ\": \"at+jwt\",\n  \"alg\": \"RS256\",\n  \"kid\": \"as-signing-4\"\n}.\n{\n  \"iss\": \"https://auth.example\",\n  \"sub\": \"user-481\",\n  \"aud\": \"https://api.example/payments\",\n  \"client_id\": \"mobile-app\",\n  \"scope\": \"payments.read payments.create\",\n  \"iat\": 1784126100,\n  \"exp\": 1784126700,\n  \"jti\": \"8b28b730-...\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Access token is not ID token"
  },
  {
    "kind": "paragraph",
    "text": "The access token is intended for the resource server and describes authority. The ID Token is intended for the OIDC client and describes authentication. Even though both are JWTs signed by the same issuer, their rules cannot be interchanged."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.18 Other JWT profiles",
    "id": "18-18-other-jwt-profiles"
  },
  {
    "kind": "paragraph",
    "text": "JWT is used in several profiles. ID Tokens follow OpenID Connect rules. RFC 7523 client assertions allow you to authenticate a client to the token endpoint or present a grant. RFC 9101 Request Objects protect authorization parameters. Logout tokens carry session-specific events. Introspection responses can be protected as JWT as per RFC 9701."
  },
  {
    "kind": "paragraph",
    "text": "Each profile defines type, audience, mandatory claims, time, replay and recipient. A generic library that only checks signatures does not know these rules. The application needs to select a specific validator or configuration for each type and maintain separate endpoints when possible."
  },
  {
    "kind": "paragraph",
    "text": "New formats continue to emerge. RFC 9901, published in 2025, standardizes Selective Disclosure JWT to allow selective presentation of claims in credential scenarios. This mechanism has its own issuance, presentation, disclosure and key binding model; it should not be treated as a traditional JWT just because it reuses JOSE components."
  },
  {
    "kind": "table",
    "caption": "Table 10 - Different types require mutually exclusive validation rules.",
    "headers": [
      "Profile",
      "Recipient",
      "Distinctive control"
    ],
    "rows": [
      [
        "OIDC ID Token",
        "Relying Party",
        "client_id in aud, nonce and OIDC rules."
      ],
      [
        "JWT access token",
        "Resource Server",
        "type at+jwt, API audience and RFC 9068 claims."
      ],
      [
        "Client assertion",
        "AuthorizationServer",
        "aud from the endpoint, iss/sub from the client and replay by jti."
      ],
      [
        "Logout token",
        "Relying Party",
        "events, sid/sub, jti and absence of nonce."
      ],
      [
        "Request Object",
        "AuthorizationServer",
        "Protected authorization request parameters."
      ],
      [
        "SD-JWT",
        "Credential Verifier",
        "Selected disclosures and key binding rules."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.19 Proof-of-possession and claim cnf",
    "id": "18-19-proof-of-possession-and-claim-cnf"
  },
  {
    "kind": "paragraph",
    "text": "Bearer tokens can be used by any party that obtains the value. Sender-constrained tokens bind usage to a key or certificate. The claim cnf confirms which key needs to be demonstrated. Binding can use JWK key thumbprint, certificate thumbprint, or profile-defined parameters."
  },
  {
    "kind": "paragraph",
    "text": "In DPoP, the client presents a JWS proof per request and the access token can contain jkt, the thumbprint of the public key. In mTLS-bound access tokens, cnf can contain x5t#S256 of the certificate used in the channel. The resource server verifies both the token and the corresponding proof or certificate."
  },
  {
    "kind": "paragraph",
    "text": "Proof-of-possession reduces stolen token replay, but adds key management, synchronization, nonces, TLS proxies, and diagnostics. The gateway needs to preserve or verify the evidence at the correct point. Terminating mTLS in a component and forwarding only an untrusted header to the backend destroys the binding if that header can be injected externally."
  },
  {
    "kind": "code",
    "text": "Exemplos conceituais - confirmação da chave\n\"cnf\": {\n  \"jkt\": \"0ZcOCORZNYzC-7hV...\"\n}\n# ou, para certificado mTLS\n\"cnf\": {\n  \"x5t#S256\": \"qP3Q...thumbprint...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.20 Application in API Gateways, Axway, and Azure",
    "id": "18-20-application-on-api-gateways-axway-and-azure"
  },
  {
    "kind": "paragraph",
    "text": "The API Gateway acts as a Policy Enforcement Point and needs to separate authorization token validation from the route. A robust policy fixes issuer, audience, algorithms, metadata location, mandatory claims and cache behavior. Headers derived from claims must replace external values and be sent to the backend only via a trusted channel."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, JWT validation filters and identity libraries can verify signatures, claims and certificates. The configuration must limit algorithms, choose store or JWKS per environment and correlate failures with safe traces. Shared policies avoid divergence, but need to allow for audience and profile differences between APIs."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, validate-jwt and validate-azure-ad-token integrate validation with OpenID configuration, audiences, and required-claims. The policy should verify the token intended for the API and not just accept any token from the tenant. Metadata caches and rotation need to be considered for changes and incidents."
  },
  {
    "kind": "paragraph",
    "text": "When the gateway reissues internal token, a new trust relationship occurs. The external token must be validated first; the internal token must have its own issuer, audience, life and minimum claims. The backend trusts the internal issuer, not the original token, and the correlation must preserve identifiers for auditing."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - política de validação no gateway\n<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://auth.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>https://api.example/payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"all\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Identity Propagation"
  },
  {
    "kind": "paragraph",
    "text": "Remove identity headers received from the Internet before creating internal headers. The backend should accept these values only from the authenticated gateway and, for critical decisions, continue to apply domain authorization."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.21 Threats and hardening",
    "id": "18-21-threats-and-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Algorithm confusion occurs when the consumer allows someone to select an unforeseen operation, such as using an RSA public key as an HMAC secret. The defense is a fixed allowlist, separate keys by use and updated library. alg none should be rejected in security tokens, unless exceptional and explicitly isolated profile."
  },
  {
    "kind": "paragraph",
    "text": "Substitution and cross-JWT confusion occur when a valid token is accepted in the wrong context. ID Token used as an access token, token from another audience, staging token in production and client assertion accepted by API are examples. explicit typ, mutually exclusive rules, issuer and audience reduce risk."
  },
  {
    "kind": "paragraph",
    "text": "jku URLs, x5u, and jwk fields controlled by the token can induce SSRF or key substitution. kid can cause path traversal or insecure database query when concatenated without validation. The validator must treat headers as hostile input, use preconfigured endpoints, and limit size and characters."
  },
  {
    "kind": "paragraph",
    "text": "Compression oracle is a risk when secret and attacker-controlled data is compressed before encryption and the size can be observed. RFC 8725 recommends avoiding compression of cryptographic inputs in sensitive scenarios. Tokens also need limits to prevent excessive CPU and memory consumption."
  },
  {
    "kind": "table",
    "caption": "Table 11 - Hardening combines encryption, parsing, networking and governance.",
    "headers": [
      "Threat",
      "Example",
      "Control"
    ],
    "rows": [
      [
        "Algorithm confusion",
        "HS256 accepted with material intended for RSA.",
        "Allowlist, kty/alg compatibility and mature libraries."
      ],
      [
        "Cross-JWT confusion",
        "ID Token accepted as access token.",
        "type, audience, profile and separate validators."
      ],
      [
        "Key injection / SSRF",
        "jku points to controlled host or internal network.",
        "Pre-configured endpoints and controlled egress."
      ],
      [
        "Replay",
        "Token copied within validity.",
        "Short life, jti where applicable and sender constraint."
      ],
      [
        "Key compromise",
        "Private key exposed.",
        "HSM/KMS, emergency rotation and coordinated withdrawal."
      ],
      [
        "Cryptographic DoS",
        "Huge tokens or random kid force refresh.",
        "Limits, negative cache, rate limit and circuit breaker."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.22 Privacy, logging and minimization",
    "id": "18-22-privacy-logging-and-minimization"
  },
  {
    "kind": "paragraph",
    "text": "A JWS can contain name, email, groups, tenant, identifiers and business data in human-readable text. Recording the full token in access logs, traces, APM, support tools or error messages replicates data and credentials across multiple systems. Even expired tokens can reveal personal information or internal architecture."
  },
  {
    "kind": "paragraph",
    "text": "Logs must record only necessary fields: normalized issuer, expected audience, kid, validation result, failure code, non-reversible hash of the jti or subject when allowed and correlation ID. The raw value of the Authorization header must be masked before reaching generic logs."
  },
  {
    "kind": "paragraph",
    "text": "JWE encryption reduces reading during transport and storage, but the recipient needs decryption and may leak the plaintext into logs. Minimization remains the most efficient control. Authorization claims can also reveal organizational structure; assess need, retention and access."
  },
  {
    "kind": "subhead",
    "text": "Observability rule"
  },
  {
    "kind": "paragraph",
    "text": "Collect enough evidence to diagnose without copying credentials. Never post real tokens in tickets, chats, documentation, or online decryption tools."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.23 Evidence-driven troubleshooting",
    "id": "18-23-evidence-driven-troubleshooting"
  },
  {
    "kind": "paragraph",
    "text": "Diagnosis begins by classifying the fault. Parsing error indicates structure, Base64url or JSON. Invalid signature points to key, algorithm, bytes, environment or corruption. Unknown kid suggests incorrect rotation, cache or issuer. Invalid audience and invalid issuer are semantic, not cryptographic, flaws."
  },
  {
    "kind": "paragraph",
    "text": "Compare the token with the issuer's metadata without exposing the full value. Record alg, kid, typ, iss, aud, exp and local time. Consult the trusted JWKS and confirm kty, usage, key_ops and alg. Check if the new key is already published and if the old one should still remain. In clusters, compare caches and clocks across instances."
  },
  {
    "kind": "paragraph",
    "text": "For JWE, separate failure from key management, decryption and tag. Wrong private key, incompatible alg, invalid IV and changed ciphertext produce different symptoms in the library, but the external response must be generic to not create oracle. Preserve details only in restricted logs."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, correlate access log, policy trace, metadata metrics, cache and backend. A 401 response can be produced by the gateway, the API, or another proxy. Identify the exact component and step that failed before changing configuration."
  },
  {
    "kind": "table",
    "caption": "Table 12 - Token symptoms point to different pipeline steps.",
    "headers": [
      "Symptom",
      "Initial hypotheses",
      "Evidence"
    ],
    "rows": [
      [
        "Malformed JWT",
        "Segments, Base64url, JSON or size.",
        "Part count and parser error."
      ],
      [
        "Invalid signature",
        "Wrong key, alg, changed token or environment.",
        "Issuer, kid, JWK and bytes received."
      ],
      [
        "Unknown kid",
        "Wrong rotation, cache or issuer.",
        "Current JWKS, cache age and rotation timeline."
      ],
      [
        "Expired / not yet valid",
        "Clock, exp, nbf or tolerance.",
        "UTC of all instances and temporal claims."
      ],
      [
        "Invalid audience",
        "Token issued to another resource.",
        "aud, requested resource and API configuration."
      ],
      [
        "Decryption failed",
        "Private key, alg, enc, IV or tag.",
        "JWE configuration and restricted internal error."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.24 Case studies and labs",
    "id": "18-24-case-studies-and-labs"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - Intermittent rotation: some instances accept the new kid and others return 401. Investigation shows local caches with different times and update without coalescing. The fix publishes the key in advance, standardizes caching, adds controlled refresh, and keeps the old key for the maximum validity."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - valid token for wrong audience: the gateway verifies the signature of a token issued to the portal and forwards the call to the API. The fix requires API type and audience, separates ID Token and access token validators, and adds negative testing to the pipeline."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - key by token URL: A library follows jku and allows the attacker to provide his own key. The fix removes dynamic resolution, fixes metadata per issuer, blocks unnecessary egress and revises already accepted tokens."
  },
  {
    "kind": "paragraph",
    "text": "Case 4 - sensitive claims in logs: an incident reveals that APM stored complete Authorization. The fix masks the header at the first entry point, reduces claims issued, applies retention and revokes potentially exposed tokens."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 1 - validate a JWS with local library"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Generate a laboratory key pair in an isolated and authorized environment.",
      "Issue a short-lived JWS with iss, aud, exp, typ and kid.",
      "Validate with algorithm allowlist and pre-configured public key.",
      "Change one byte of the payload and observe the cryptographic failure.",
      "Change aud without re-signing to compare signature failure and semantic failure."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Lab 2 - simulate JWKS rotation"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publish K1 and issue tokens with kid K1.",
      "Add K2 to the set before using it for signing.",
      "Upgrade signer to K2 and keep K1 available.",
      "Observe cache behavior in different instances.",
      "Remove K1 only after tokens and operating margin expire."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratory 3 - mandatory negative tests"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Reject alg none and algorithm outside the allowlist.",
      "Reject incorrect issuer, audience and type.",
      "Reject expired, future or excessively large token.",
      "Reject unknown kid without triggering unlimited refresh.",
      "Reject unknown crit and unauthorized remote headers.",
      "Reject ID Token presented to the API as an access token."
    ]
  },
  {
    "kind": "subhead",
    "text": "Laboratory security"
  },
  {
    "kind": "paragraph",
    "text": "Use only dummy keys and tokens. Never copy production credentials to testing tools, decryption sites, or training documents."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "paragraph",
    "text": "JOSE separates claims, signature, encryption, algorithms and key representation. JWT does not automatically stand for signed token, access token, or secure credential. Trust arises from the combination of valid structure, correct cryptographic operation, key linked to a permitted issuer and semantic validation of the profile."
  },
  {
    "kind": "paragraph",
    "text": "JWS protects integrity and origin, but keeps the payload readable. JWE protects confidentiality by authenticated encryption and separates alg, responsible for CEK, from enc, responsible for content. Nested tokens can combine properties, but increase complexity and need clear profiling."
  },
  {
    "kind": "paragraph",
    "text": "JWKS and rotation are part of the runtime. Early publishing, controlled caching, overlapping, and planned retirement prevent downtime. kid is just a hint inside the issuer; URLs and keys provided by the token itself should not create trust."
  },
  {
    "kind": "paragraph",
    "text": "RFC 8725 guides allowlists, mutually exclusive validations, explicit typing, and protection against confusion. RFC 9864 updates the handling of fully specified algorithms, and the IANA registry remains the operational reference for names and status."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Design and operation checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Is there a documented profile for each supported JWT type?",
      "Are issuer, audience, type and algorithms defined by trust configuration?",
      "Does validation use the correct issuer key and not a global cache per kid?",
      "Does JWKS have cache, limits, coalesced refresh and tested rotation?",
      "Are private keys stored in an HSM, KMS or audited vault?",
      "Are algorithms compatible with kty, use and key_ops?",
      "Do temporal claims use UTC, clock synchronization and limited tolerance?",
      "Do ID tokens, access tokens, client assertions and logout tokens use separate validators?",
      "Do jku, x5u, jwk and crit headers receive safe treatment?",
      "Logs mask Authorization and not store full tokens?",
      "Do negative tests cover confusion of type, audience, algorithm and rotation?",
      "Is there a procedure for committing and emergency key removal?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Review exercises",
    "id": "review-exercises"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explain why a successfully decoded JWT is still untrustworthy.",
      "Describe the difference between JWT, JWS and JWE using an API example.",
      "Calculate which components can issue tokens when HS256 is shared between five APIs.",
      "Propose a rotation sequence for tokens with a 20-minute expiry and a 10-minute JWKS cache.",
      "Explain why kid cannot identify a key globally.",
      "Differentiate alg and enc in a JWE with RSA-OAEP-256 and A256GCM.",
      "Describe how typ helps prevent the use of ID Token as an access token.",
      "Explain the risk of following jku informed by the token.",
      "Compare locally validated JWT token and opaque token with introspection.",
      "Define what information can be recorded in logs without copying the credential."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossary",
    "id": "glossary"
  },
  {
    "kind": "table",
    "caption": "Table 13 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "AAD",
        "Additional Authenticated Data; authenticated data without being encrypted."
      ],
      [
        "alg",
        "Signature algorithm, MAC or key management."
      ],
      [
        "Base64url",
        "Secure byte encoding for URLs, without confidentiality."
      ],
      [
        "CEK",
        "Content Encryption Key used to encrypt content in JWE."
      ],
      [
        "claims set",
        "JSON object containing assertions carried by JWT."
      ],
      [
        "crit",
        "List of critical parameters that the consumer must understand."
      ],
      [
        "cty",
        "Protected content type, useful in nested objects."
      ],
      [
        "enc",
        "JWE content authenticated encryption algorithm."
      ],
      [
        "JWA",
        "JSON Web Algorithms; identifiers and cryptographic parameters."
      ],
      [
        "JWE",
        "JSON Web Encryption; authenticated cryptography framework."
      ],
      [
        "JWK",
        "JSON Web Key; JSON representation of a key."
      ],
      [
        "JWKS",
        "JSON Web Key Set; set of JWKs."
      ],
      [
        "JWS",
        "JSON Web Signature; digital signature or MAC over bytes."
      ],
      [
        "JWT",
        "JSON Web Token; set of claims protected by JWS or JWE."
      ],
      [
        "kid",
        "KeyID; key selection hint within a context."
      ],
      [
        "Nested JWT",
        "JWT protected in multiple layers, like JWS inside JWE."
      ],
      [
        "thumbprint",
        "Digest derived from key or certificate for identification."
      ],
      [
        "typ",
        "Type of object declared for application processing."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annex A - Decision matrix",
    "id": "annex-a-decision-matrix"
  },
  {
    "kind": "table",
    "caption": "Table 14 - Architecture depends on the requirement, not just JWT preference.",
    "headers": [
      "Need",
      "Initial strategy",
      "Essential controls"
    ],
    "rows": [
      [
        "API validates locally",
        "Asymmetrical JWS and JWKS.",
        "Issuer, audience, type, allowlist, cache and rotation."
      ],
      [
        "Immediate revocation",
        "Opaque token or introspection.",
        "AS availability, short cache and RS authentication."
      ],
      [
        "Confidential Claims",
        "JWE or opaque reference.",
        "Minimization, alg/enc, recipient key and logging."
      ],
      [
        "Multiple validators",
        "Asymmetric signature.",
        "Private only at the issuer and public distributed."
      ],
      [
        "Proof of possession",
        "DPoP or mTLS-bound token.",
        "cnf, proof by request, nonce and trusted proxies."
      ],
      [
        "Multiple types of JWT",
        "Separate validators and explicit type.",
        "Mutually exclusive rules and negative tests."
      ],
      [
        "Frequent rotation",
        "JWKS with planned overlap.",
        "Publish before, cache controlled and remove later."
      ],
      [
        "Selective credential",
        "SD-JWT as per RFC 9901.",
        "Disclosures, key binding, privacy and specific profile."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical references",
    "id": "technical-references"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "IETF. RFC 7515 - JSON Web Signature (JWS). 2015.",
      "IETF. RFC 7516 - JSON Web Encryption (JWE). 2015.",
      "IETF. RFC 7517 - JSON Web Key (JWK). 2015.",
      "IETF. RFC 7518 - JSON Web Algorithms (JWA). 2015.",
      "IETF. RFC 7519 - JSON Web Token (JWT). 2015.",
      "IETF. RFC 7638 - JSON Web Key (JWK) Thumbprint. 2015.",
      "IETF. RFC 7797 - JWS Unencoded Payload Option. 2016.",
      "IETF. RFC 7800 - Proof-of-Possession Key Semantics for JWTs. 2016.",
      "IETF. RFC 8037 - CFRG Elliptic Curve Diffie-Hellman and Signatures in JOSE. 2017.",
      "IETF. RFC 8725 / BCP 225 - JSON Web Token Best Current Practices. 2020.",
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 access tokens. 2021.",
      "IETF. RFC 9101 - OAuth 2.0 JWT-Secured Authorization Request. 2021.",
      "IETF. RFC 9278 - JWK Thumbprint URI. 2022.",
      "IETF. RFC 9701 - JWT Response for OAuth Token Introspection. 2025.",
      "IETF. RFC 9864 - Fully-Specified Algorithms for JOSE and COSE. 2025.",
      "IETF. RFC 9901 - Selective Disclosure for JSON Web Tokens. 2025.",
      "IANA. JSON Object Signing and Encryption (JOSE) registries.",
      "IANA. JSON Web Token Claims registry.",
      "Microsoft Learn. Azure API Management validate-jwt and validate-azure-ad-token policies.",
      "Axway Documentation. API Gateway JWT validation, signing and encryption filters.",
      "OWASP. JSON Web Token Cheat Sheet for Java and OAuth 2.0 Security Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "JOSE algorithms, logs and profiles continue to evolve. Before deploying a combination, confirm the current status in the IANA registry, the RFCs that update the specification, and the exact support of the library, HSM, identity provider, and API Gateway."
  }
];
