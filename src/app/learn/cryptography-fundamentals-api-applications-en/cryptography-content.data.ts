import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const CRYPTOGRAPHY_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-01-cryptographic-primitives.svg",
    "alt": "Map of the main cryptographic primitives and the objectives that each one serves",
    "caption": "Figure 7.1 - Map of the main cryptographic primitives."
  },
  {
    "kind": "paragraph",
    "text": "This chapter introduces the mathematical and operational foundations of modern cryptography and connects each primitive to real-world usage in APIs, TLS, tokens, message signatures, key vaults, and API Gateways. The objective is to allow the reader to recognize the role of each algorithm, its critical parameters and the risks of incorrect composition."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter objectives",
    "id": "chapter-objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Distinguish confidentiality, integrity, authenticity, authorization and non-repudiation, avoiding attributing properties to an algorithm that it does not provide.",
      "Understand the differences between symmetric and asymmetric encryption, as well as why modern systems combine the two in hybrid schemes.",
      "Understand AES, operating modes, stream ciphers, AEAD, nonces, IVs, tags and the effects of parameter reuse.",
      "Understand hash functions, HMAC, KDFs, password storage, and the difference between simple hashing and password attack-resistant derivation.",
      "Understand RSA, elliptic curve cryptography, key exchange, key encapsulation and digital signatures.",
      "Relate cryptographic primitives to TLS, mTLS, JWT, JWS, JWE, webhooks, Open Finance, HSM, KMS, Axway API Gateway and Azure API Management.",
      "Build a troubleshooting process for signature, decryption, integrity, encryption and key access failures.",
      "Know the post-quantum standards FIPS 203, FIPS 204 and FIPS 205 and understand why cryptographic agility and inventory are architectural requirements."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "How to study this chapter",
    "id": "how-to-study-this-chapter"
  },
  {
    "kind": "paragraph",
    "text": "Cryptography often looks like a set of isolated acronyms: AES, RSA, SHA, HMAC, ECDSA, EdDSA, GCM, OAEP, and PSS. Learning improves when these acronyms are organized by objective. First identify the desired service - encryption, integrity checking, authenticating a message, establishing a key, or signing. Then choose the appropriate primitive, schema, and parameters. Finally, examine the key lifecycle and protocol context."
  },
  {
    "kind": "paragraph",
    "text": "The focus will not be on demonstrating all mathematical proofs, but on providing sufficient depth to architecture and operation. The reader should finish the chapter knowing why using AES-GCM is different from using AES-ECB, why a hash function does not encrypt data, why HMAC is not equivalent to a digital signature, why RSA should not encrypt large payloads directly and why the biggest risk is often in key management, not in the algorithm."
  },
  {
    "kind": "paragraph",
    "text": "Editorial rule for diagrams To avoid broken text, the diagrams in this chapter use only short labels. Contextual and technical explanations are in the body of the text, where the flow can grow naturally between pages. The document's highlight boxes are automatic height tables, with no fixed dimensions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "What cryptography solves",
    "id": "what-cryptography-solves"
  },
  {
    "kind": "paragraph",
    "text": "Cryptography is a set of techniques to protect information against adversaries. In digital systems, it can prevent data from being read by unauthorized people, detect changes, authenticate who produced a message, establish secrets between parties who have never shared a key and produce technical evidence of authorship. These goals appear in network protocols, storage, identity, payments, APIs, and devices."
  },
  {
    "kind": "paragraph",
    "text": "A common mistake is to treat encryption as a synonym for encryption. Encryption is just one of the possible functions. A digital signature, for example, does not normally hide the content; it allows you to verify integrity and authenticity. A hash function also does not reversibly hide the content; it produces a fixed-length summary. A MAC authenticates a message between participants who share a secret. Safe architecture arises from the correct composition of these primitives."
  },
  {
    "kind": "paragraph",
    "text": "In the context of APIs, encryption protects multiple borders. TLS secures the channel. JWS protects the integrity of tokens and messages. JWE can provide object confidentiality. HMAC is used in webhook signatures and request authentication. Certificates and private keys support TLS, mTLS, and signatures. KMS and HSM reduce key exposure. Each mechanism responds to a different threat."
  },
  {
    "kind": "paragraph",
    "text": "The cryptographic choice is also an operational decision. Algorithms and key sizes need to be supported by clients, gateways, libraries, appliances, and HSMs. Keys need to be generated, distributed, rotated, audited and discarded. An implementation may use a robust algorithm and still be insecure because of repeated nonces, weak randomness, keys shared by many systems, or logs that reveal sensitive material."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Security objectives and limits of primitives",
    "id": "security-objectives-and-limits-of-primitives"
  },
  {
    "kind": "paragraph",
    "text": "Confidentiality means preventing third parties from understanding protected content. Integrity means detecting changes. Authenticity relates the message to an identity or key holder. Availability, authorization and validation of business rules are not automatically provided by cryptography. An endpoint can use strong TLS and still allow improper operation due to authorization failure."
  },
  {
    "kind": "paragraph",
    "text": "The term non-repudiation should be used with caution. A digital signature can create technical evidence verifiable by third parties, because the public key is different from the private key. However, the legal conclusion that a person cannot deny an action depends on identity, key custody, audit, policy, device, issuance process, and legal context. Mathematics is a part of the evidentiary system, not the entire system."
  },
  {
    "kind": "paragraph",
    "text": "Another limit is that encryption protects data in specific states and borders. Encryption in transit does not automatically protect data after the application decrypts it. Encryption at rest can protect stolen disks, but it does not prevent an authorized, compromised process from reading the data. Signatures detect changes, but do not guarantee that the signed content is true or permitted."
  },
  {
    "kind": "paragraph",
    "text": "Architects must formulate the threat before choosing the primitive. Who is the opponent? Does it observe the network, alter messages, compromise a server, steal a backup, control a client, or have administrative access? What information needs to remain secret and for how long? Who should verify authenticity? These answers determine algorithm, key, protocol, isolation and governance."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Essential vocabulary: keys, nonces, IVs, salts and tags",
    "id": "essential-vocabulary-keys-nonces-ivs-salts-and-tags"
  },
  {
    "kind": "paragraph",
    "text": "Clear text is the information before encryption. Ciphertext and the result produced by the algorithm. The key is a secret or partially public value that controls the transformation. The algorithm can be known by everyone; security must depend on the key. This idea is associated with Kerckhoffs' principle: systems must remain secure even if the adversary knows the project, except for the cryptographic secret."
  },
  {
    "kind": "paragraph",
    "text": "Nonce means number used once. In many schemes, it does not need to be secret, but it does need to meet a uniqueness or unpredictability rule. In AES-GCM, reusing the same nonce with the same key can compromise confidentiality and integrity. IV, initialization vector, is a parameter used by operating modes; your requirements vary. Treating every IV as \"any random number\" is dangerous."
  },
  {
    "kind": "paragraph",
    "text": "Salt is a value mainly associated with key derivation and password storage. It is normally not secret. Its role is to ensure that equal inputs produce different results and to make precomputed tables difficult. Salt does not replace computational cost. For passwords, it is necessary to use an appropriate derivation function, with memory and time parameters adjusted to the environment."
  },
  {
    "kind": "paragraph",
    "text": "Authentication tag is the value that allows integrity and authenticity to be verified in an AEAD or MAC scheme. The application should reject the message if the tag check fails, without releasing partial clear text. Reducing tags excessively, comparing tags in a way that is vulnerable to timing, or continuing processing after authentication failure destroys properties that the algorithm should provide."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Randomness, entropy and key generation",
    "id": "randomness-entropy-and-key-generation"
  },
  {
    "kind": "paragraph",
    "text": "Keys, nonces, salts, challenges and temporary values depend on adequate randomness. A common generator used for simulations or interfaces is not necessarily secure for encryption. Cryptographically secure generators combine sources of entropy with deterministic mechanisms designed to produce unpredictable sequences. NIST treats sources of entropy and DRBGs in the SP 800-90 family."
  },
  {
    "kind": "paragraph",
    "text": "Entropy describes uncertainty. A 256-bit key does not have 256 bits of security if it was chosen from a short list, a timestamp, or a predictable identifier. The nominal field size does not correct for a weak origin. Keys must be generated by reliable cryptographic libraries, operating systems, HSMs or KMSs, avoiding homemade implementations."
  },
  {
    "kind": "paragraph",
    "text": "Randomness failures can be silent. Two devices initialized to the same state can generate repeating keys. A container cloned at an inappropriate time can reproduce sequences. A reset counter may repeat nonces. A library can fall to a weak source when the main source fails. Therefore, cryptographic modules need initialization, health tests, isolation and observability."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, randomness appears in TLS sessions, key generation, opaque tokens, correlation, and replay protections. The gateway must not use predictable identifiers as secrets. Externally generated keys need to be imported with access controls, and keys generated in the HSM ideally never leave the cryptographic boundary in clear text."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Symmetric cryptography",
    "id": "symmetric-cryptography"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-02-symmetric-asymmetric.svg",
    "alt": "Comparison between symmetric and asymmetric encryption in real systems",
    "caption": "Figure 7.2 - Comparison between symmetric and asymmetric encryption."
  },
  {
    "kind": "paragraph",
    "text": "In symmetric encryption, parties use the same secret key, or directly related keys, to encrypt and decrypt. The main advantage is performance: symmetric algorithms process large volumes with low relative cost. Therefore, TLS application data, files, disks and backups are normally protected by symmetric ciphers."
  },
  {
    "kind": "paragraph",
    "text": "The challenge is distributing the key. If two parties need to share a secret, how does that secret reach both parties without being intercepted? Modern systems solve this with asymmetric keying, KEMs, pre-secured channels, KMSs, or provisioning processes. Once a session key is established, the symmetric cipher protects the data stream."
  },
  {
    "kind": "paragraph",
    "text": "Symmetrical keys require separation of purpose. The same key should not be reused indiscriminately for encryption, MAC, environments, clients and protocols. KDFs allow you to derive distinct keys from a master secret and a context. This separation reduces the impact of failures and avoids unexpected interactions between schemes."
  },
  {
    "kind": "paragraph",
    "text": "Symmetric cryptography also does not automatically provide authenticity. A cipher-only mode can allow controlled changes to the ciphertext. Therefore, modern architectures prefer AEAD, which combines confidentiality and authentication, or a formally secure composition of encryption and MAC."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Block ciphers, stream ciphers, and AES",
    "id": "block-ciphers-stream-ciphers-and-aes"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-03-aes-round.svg",
    "alt": "Conceptual transformations performed during an AES round",
    "caption": "Figure 7.3 - Conceptual view of an AES round."
  },
  {
    "kind": "paragraph",
    "text": "A block cipher transforms blocks of fixed size. AES, standardized in FIPS 197, works with 128-bit blocks and 128, 192 or 256-bit keys. Real messages are larger or smaller than a block; Therefore, AES needs to be used with an operating mode. The AES algorithm is just the core. The security of the application depends on the mode, the nonce or IV, authentication and error handling."
  },
  {
    "kind": "paragraph",
    "text": "AES organizes the block into a state and applies rounds of substitution, permutation, shuffling, and key addition. These operations create confusion and diffusion: simple relationships between input, key and output disappear. The number of rounds varies depending on the size of the key. The implementation must be resistant to side channels, because a mathematically correct execution can leak information due to timing, cache, consumption or induced failures."
  },
  {
    "kind": "paragraph",
    "text": "Stream ciphers produce a key sequence that is combined with the plaintext, usually by XOR. ChaCha20 is a modern example, often combined with Poly1305 to form an AEAD. It performs well in software and is specified for IETF protocols in RFC 8439. As with other schemes, reusing nonce and key can be catastrophic."
  },
  {
    "kind": "paragraph",
    "text": "In APIs, the choice between AES-GCM and ChaCha20-Poly1305 is often made by the protocol or library. Applications should not invent their own formats unnecessarily. TLS, JOSE, COSE and envelope encryption libraries already define algorithms, fields and checks. The interoperability and security analysis of an established protocol are worth more than an artisanal composition."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Operating modes: ECB, CBC, CTR and GCM",
    "id": "operating-modes-ecb-cbc-ctr-and-gcm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-04-block-modes.svg",
    "alt": "Comparison between ECB, CBC, CTR and GCM operating modes",
    "caption": "Figure 7.4 - Conceptual differences between operating modes."
  },
  {
    "kind": "paragraph",
    "text": "ECB encrypts each block independently. Equal blocks under the same key generate equal cipher blocks, revealing patterns. Therefore, ECB is not appropriate for protecting structured messages. It is an important teaching example: using AES does not guarantee security if the operating mode is inappropriate."
  },
  {
    "kind": "paragraph",
    "text": "CBC chains each block with the previous block and requires an IV with correct properties. Historically it was widely used, but requires separate padding and authentication. Validation errors can create padding oracles, allowing the attacker to learn information from different responses. Modern protocols tend to prefer AEAD, reducing composition complexity."
  },
  {
    "kind": "paragraph",
    "text": "CTR turns a block cipher into a stream cipher using counters. It allows parallelism and does not require padding, but reusing the same counter or nonce with the same key can reveal relationships between clear texts. CTR provides confidentiality, not authentication; needs to be combined with a MAC securely."
  },
  {
    "kind": "paragraph",
    "text": "GCM combines counter mode with Galois-based authentication, producing ciphertext and tag. It supports authenticated data that is not encrypted, such as protocol headers. GCM is efficient and widely used in TLS and JOSE, but it depends heavily on the uniqueness of the nonce. NIST is revising SP 800-38D, but the current final recommendation remains the operational reference until a final revision replaces it."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "AEAD and associated data",
    "id": "aead-and-associated-data"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-05-aead.svg",
    "alt": "Inputs and outputs of an AEAD authenticated encryption scheme",
    "caption": "Figure 7.5 - Inputs and outputs of an AEAD scheme."
  },
  {
    "kind": "paragraph",
    "text": "AEAD stands for Authenticated Encryption with Associated Data. The scheme protects confidentiality of the plaintext and authenticity of both the ciphertext and associated data. AAD may contain metadata that needs to be protected from alteration, but needs to remain visible for routing or processing."
  },
  {
    "kind": "paragraph",
    "text": "An AEAD operation receives key, nonce, plaintext and AAD. It returns ciphertext and tag. Upon opening, the receiver presents the same parameters and validates the tag. Only after successful verification should the plain text be accepted. This flow prevents changed data from reaching the business logic as if it were valid."
  },
  {
    "kind": "paragraph",
    "text": "In token and message formats, the fields that make up AAD must be defined by the standard. Changing serialization, order, canonicalization or encoding can cause the tag to fail, even when the data appears semantically the same. This is common in JOSE troubleshooting: the signature or tag covers exact bytes, not a freely interpreted abstract object."
  },
  {
    "kind": "paragraph",
    "text": "Nonce management must be part of the design. Generating random nonces may be appropriate when the collision probability is controlled; Counters may be better in other contexts, as long as they don't restart under the same key. Distributed systems need to coordinate uniqueness between instances or separate keys by instance and context."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cryptographic hash functions",
    "id": "cryptographic-hash-functions"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-06-hash-avalanche.svg",
    "alt": "Avalanche effect produced by a cryptographic hash function",
    "caption": "Figure 7.6 - Avalanche effect of a hash function."
  },
  {
    "kind": "paragraph",
    "text": "A hash function takes a message of arbitrary size and produces a digest of fixed size. It must be deterministic, efficient and resistant to pre-image, second pre-image and collisions. Preimage resistance makes it difficult to recover an input from the digest. Collision resistance makes it difficult to find two different inputs with the same digest."
  },
  {
    "kind": "paragraph",
    "text": "Hashes are used for integrity, signatures, data structures, identifiers, derivation and protocols. They are not encryption because there is no decryption key that recovers the message. It is also not safe to protect passwords just by calculating SHA-256, as generic hashes are too fast and allow testing large volumes of guesses."
  },
  {
    "kind": "paragraph",
    "text": "The SHA-2 family includes SHA-256 and SHA-512. SHA-3, standardized in FIPS 202, uses a different construction based on Keccak and offers alternatives such as SHA3-256 and XOF SHAKE functions. Having different families increases cryptographic diversity. The choice depends on protocol, interoperability, performance, and compliance requirements."
  },
  {
    "kind": "paragraph",
    "text": "MD5 and SHA-1 should not be used when collision resistance is necessary. Legacy systems can keep them to non-adversarial identifiers, but new designs must use modern algorithms. The transition needs to consider where the hash appears: signature, certificate, storage, ETag, checksum, protocol or external integration."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "MAC and HMAC",
    "id": "mac-and-hmac"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-07-hmac.svg",
    "alt": "Simplified flow of generating an HMAC with a shared secret",
    "caption": "Figure 7.7 - Simplified HMAC flow."
  },
  {
    "kind": "paragraph",
    "text": "A Message Authentication Code produces a tag using a shared secret key. The receiver that has the same key recalculates the tag and compares. If the check is successful, there is evidence that the message was not altered and was produced by someone who knows the secret. HMAC is a construct standardized in RFC 2104 that combines a hash function with a key."
  },
  {
    "kind": "paragraph",
    "text": "HMAC does not encrypt the content. The message can remain readable while its integrity and authenticity are protected. This model is common in webhooks, partner APIs and request signatures. The protocol needs to define exactly which bytes go into the HMAC, including method, path, timestamp, body, headers and canonicalization."
  },
  {
    "kind": "paragraph",
    "text": "As both parties have the same secret, either party can generate valid tags. This limits third-party verifiability and differentiates HMAC from digital signature. HMAC is excellent for efficient two-way authentication, but it does not offer the same separation of powers as a public and private key."
  },
  {
    "kind": "paragraph",
    "text": "Tag comparison should be done in constant time when possible. The protocol also needs replay protection, for example timestamp, nonce and acceptance window. An old message with a valid HMAC remains authentic; Without a freshness mechanism, the attacker can retransmit it."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "KDFs and password storage",
    "id": "kdfs-and-password-storage"
  },
  {
    "kind": "paragraph",
    "text": "A Key Derivation Function transforms key material into one or more keys with suitable properties. HKDF, defined in RFC 5869, uses an extraction step and an expansion step. It is common in TLS and key establishment protocols, because it separates keys by context, label and purpose."
  },
  {
    "kind": "paragraph",
    "text": "Human passwords have low entropy and need functions designed to make each attempt expensive. PBKDF2 applies repetitions of a pseudorandom function and remains widely supported. Argon2id, recommended in RFC 9106 for many scenarios, adds memory cost, making parallel attacks with specialized hardware difficult. Parameters must be calibrated and reviewed over time."
  },
  {
    "kind": "paragraph",
    "text": "Salt must be unique per password and stored next to the result. A pepper is an additional secret kept separately, for example in HSM or KMS, but it increases operational complexity and needs planned rotation. The application must store the algorithm identifier and its parameters to allow verification and migration."
  },
  {
    "kind": "paragraph",
    "text": "In APIs, passwords are ideally handled by identity providers, not resource gateways. Still, understanding KDFs is important for legacy Basic Authentication, client secrets, vaults, and credential processes. A high-entropy client secret can be stored as a hash for comparison, while a signing key needs to remain available for cryptographic operations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Asymmetric cryptography",
    "id": "asymmetric-cryptography"
  },
  {
    "kind": "paragraph",
    "text": "Asymmetric cryptography uses a mathematically related pair of keys. The public key can be distributed; the private key must remain protected. Depending on the scheme, the public key allows encryption for the private key holder, verify signatures or participate in a key agreement."
  },
  {
    "kind": "paragraph",
    "text": "The main advantage is to reduce the secret distribution problem. A client can verify a signature without possessing the private key. Two parties can establish a secret via public channel. However, asymmetric operations are more costly and produce larger artifacts, so they rarely protect large volumes directly."
  },
  {
    "kind": "paragraph",
    "text": "Asymmetric keys also require authenticity of the public key. Receiving a public key through an insecure channel does not prove who it belongs to. Certificates, fingerprints, directories, secure DNS, pinning and provisioning processes associate keys with identities. Chapter 8 will delve deeper into PKI and X.509."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, public keys validate JWS and certificates; private keys sign tokens, terminate TLS and authenticate the gateway to backends. Separating keys by environment, issuer, purpose and algorithm reduces impact and facilitates auditing."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "RSA: encryption, signature and padding",
    "id": "rsa-encryption-signature-and-padding"
  },
  {
    "kind": "paragraph",
    "text": "RSA bases its practical security on the difficulty of factoring a large module composed of primes. A public key contains modulus and public exponent; the private key contains information that allows the reverse operation. RFC 8017 specifies RSA encryption and signature schemes and shows that the raw mathematical operation needs secure encoding and padding."
  },
  {
    "kind": "paragraph",
    "text": "For encryption, RSAES-OAEP and the modern scheme described in PKCS #1. RSA should not encrypt large payloads directly. Normal usage is to protect a short session key in envelope encryption. RSAES- PKCS1-v1_5 remains in legacy systems, but its history of oracles requires caution and uniformity of errors."
  },
  {
    "kind": "paragraph",
    "text": "For signatures, RSASSA-PSS introduces randomness and is generally preferred in new designs when the ecosystem supports it. RSASSA-PKCS1-v1_5 remains widely used and interoperable. The choice must follow the protocol standard and the organization's policy, avoiding \"pure RSA\" or invented padding."
  },
  {
    "kind": "paragraph",
    "text": "Key size impacts security, performance, and signature size. RSA 2048 still appears widely; longer requirements may require 3072 bits or migration to ECC/PQC depending on the protection horizon. The correct size must follow current standards and the period during which the information needs to remain protected."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Elliptic curves, X25519 and Ed25519",
    "id": "elliptic-curves-x25519-and-ed25519"
  },
  {
    "kind": "paragraph",
    "text": "Elliptical curve cryptography offers high levels of security with keys smaller than RSA. The security is based on the difficulty of the discrete logarithm in groups of points on a curve. Smaller keys and signatures reduce bandwidth, storage and cost, although implementation requires care with validation, curves and side channels."
  },
  {
    "kind": "paragraph",
    "text": "X25519, specified in RFC 7748, and used for key agreement. Ed25519, described in RFC 8032 as an instance of EdDSA, is used for signatures. Despite the related names, they fulfill different functions and should not be treated as the same key or algorithm. Protocols need to define formats and conversions explicitly."
  },
  {
    "kind": "paragraph",
    "text": "ECDSA is another signature family, standardized in FIPS 186-5. Its implementation security depends heavily on nonce generation by signature; repeating or skewing this value may reveal the private key. EdDSA was designed with a deterministic approach, but implementations still need to protect keys and resist failures and side channels."
  },
  {
    "kind": "paragraph",
    "text": "In JOSE, curve support depends on the implementation and registration of algorithms. Gateways need to validate allowed algorithm, curve, key usage and key origin. Accepting any key presented in a token without linking it to the trusted issuer turns cryptographic verification into a false guarantee."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Key agreement, ECDH and KEM",
    "id": "key-agreement-ecdh-and-kem"
  },
  {
    "kind": "paragraph",
    "text": "Key agreement allows two parties to derive a shared secret without directly transmitting it. Diffie-Hellman and ECDH use contributions from both parties. In modern TLS, ephemeral variants provide forward secrecy: future compromise of the identity key does not automatically reveal past sessions."
  },
  {
    "kind": "paragraph",
    "text": "The raw secret produced by a key agreement should not be used directly. A KDF incorporates context, nonces and identifiers to generate distinct traffic keys. Key confirmation and handshake authentication prevent attacks in which an adversary positions himself between the parties."
  },
  {
    "kind": "paragraph",
    "text": "A KEM, Key Encapsulation Mechanism, has operations to generate an encapsulation ciphertext and a shared secret, and to recover this secret with the private key. FIPS 203 standardizes ML-KEM, a post-quantum mechanism. KEMs are a natural fit for hybrid cryptography and key establishment."
  },
  {
    "kind": "paragraph",
    "text": "In gateways, the key agreement is often encapsulated in TLS. Even so, the architect needs to understand curves, groups, forward secrecy and compatibility. A poorly configured group list can prevent handshakes; an old TLS terminator can eliminate desired properties; An HSM can support signing, but not a certain key agreement."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Digital signatures",
    "id": "digital-signatures"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-08-digital-signature.svg",
    "alt": "Flows for generating and verifying a digital signature",
    "caption": "Figure 7.8 - Generation and verification of digital signature."
  },
  {
    "kind": "paragraph",
    "text": "A digital signature uses the private key to produce a value verifiable with the public key. Typically the algorithm signs a digest or encoded representation of the message. The verification confirms that the covered bytes have not been altered and that the signature was produced by a corresponding private key."
  },
  {
    "kind": "paragraph",
    "text": "Signing and encrypting are different operations. Subscription does not hide the content. \"Private key\" encryption is not an adequate explanation of modern signatures, because schemes such as PSS, ECDSA, EdDSA and ML-DSA have specific structures and proofs. Understanding must follow the scheme, not a simplified analogy."
  },
  {
    "kind": "paragraph",
    "text": "Canonicalization is a central challenge. JSON can be serialized in several equivalent ways. If producer and verifier sign different bytes, verification fails. JWS solves part of this problem by defining Base64url, protected header and signing input. HTTP signature protocols also need to define derived components and order."
  },
  {
    "kind": "paragraph",
    "text": "The private signing key deserves strong protection. HSMs allow you to sign without exporting the key. Policies may require dual approval, immutable logs, usage limits, and separation of test and production keys. If the key is compromised, valid signatures can be forged until trust is revoked and consumers are updated."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Hybrid encryption and envelope encryption",
    "id": "hybrid-encryption-and-envelope-encryption"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-09-envelope-encryption.svg",
    "alt": "Hybrid encryption with data key and envelope encryption",
    "caption": "Figure 7.9 - Hybrid encryption and envelope encryption."
  },
  {
    "kind": "paragraph",
    "text": "Hybrid encryption combines the efficiency of symmetric encryption with asymmetric key distribution. The application generates a random data key, encrypts the payload with AEAD and protects the data key with RSA-OAEP, ECDH/KDF, KEM or an envelope key held in KMS. The package stores ciphertext, nonce, tag and encapsulated key."
  },
  {
    "kind": "paragraph",
    "text": "Envelope encryption allows KMS to protect only small keys, while the application processes large volumes locally. This reduces key service calls and allows you to rotate a master key by re-encrypting data keys, without decrypting all payloads. The drawing must record the version and identifier of the key used."
  },
  {
    "kind": "paragraph",
    "text": "A data key can be unique per object, batch, session or period, depending on risk and cost. Widespread reuse increases the impact of compromise. Envelope keys require access controls that prevent a service from decrypting data outside its domain. The KMS policy must reflect cargo identity and purpose."
  },
  {
    "kind": "paragraph",
    "text": "JWE is an example of a hybrid encryption format applied to JOSE objects. It separates key management algorithm and content encryption algorithm. Gateways that process JWE need to support approved combinations, control sizes, and avoid decrypting content before validating boundaries and context."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Key management, KMS and HSM",
    "id": "key-management-kms-and-hsm"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-10-key-lifecycle.svg",
    "alt": "Lifecycle of a cryptographic key from generation to rotation",
    "caption": "Figure 7.10 - Summary life cycle of a cryptographic key."
  },
  {
    "kind": "paragraph",
    "text": "Strong algorithms depend on well-managed keys. The cycle includes generation, registration, distribution, activation, storage, use, rotation, suspension, revocation, backup, recovery, archiving, and destruction. NIST SP 800-57 organizes principles for managing cryptographic material and helps define protections according to the type and purpose of the key."
  },
  {
    "kind": "paragraph",
    "text": "KMS is a management service that enforces identity, authorization, auditing, and key operations. HSM is a module with a cryptographic boundary designed to protect keys and perform operations. A KMS can use HSM underneath. Not every key needs to be at the same level, but root keys, critical signing keys, and CA keys often require hardened protection."
  },
  {
    "kind": "paragraph",
    "text": "Access control must be operations-oriented. A service may need to sign but not export; another can verify with a public key; a pipeline can activate a new version, but not use the key for data. Separating administration, use and auditing reduces abuse and human error."
  },
  {
    "kind": "paragraph",
    "text": "Rotation needs to be compatible with existing data and consumers. Old verification keys may remain published until tokens expire. Decryption keys need to be maintained as long as data is encrypted. Key identifiers, such as kid in JOSE, help select versions, but should not be accepted as a trusted source without a controlled issuer and repository."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cryptography in TLS, JWT, JWS, JWE, and webhooks",
    "id": "cryptography-in-tls-jwt-jws-jwe-and-webhooks"
  },
  {
    "kind": "paragraph",
    "text": "TLS combines key agreement, signatures or certificates, KDFs and AEAD. The client and server negotiate parameters, authenticate the handshake, and derive traffic keys. Chapter 6 analyzed the protocol; Here the lesson is that TLS is a composition of primitives with distinct roles."
  },
  {
    "kind": "paragraph",
    "text": "JWT is a claims format. When protected by JWS, it receives signature or MAC. When protected by JWE, it receives authenticated encryption. A JWT only encoded in Base64url is not protected. The gateway must verify algorithm, sender, audience, time, key and claims, not just confirm that the mathematical signature is valid."
  },
  {
    "kind": "paragraph",
    "text": "Webhooks often use HMAC over body, timestamp, and identifiers. The consumer needs to read the exact bytes received before any normalization that changes the body. Verification must occur before processing the operation, with a time window and storage of identifiers to prevent replay."
  },
  {
    "kind": "paragraph",
    "text": "In Open Finance and banking integrations, signatures can protect messages, tokens and requests in addition to TLS. The design needs to make it clear which artifact is signed, which key is used, how the public key is distributed, which algorithm is allowed and how revocation and rotation happen."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Using Axway API Gateway and Azure API Management",
    "id": "using-axway-api-gateway-and-azure-api-management"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-11-api-gateway-cryptography.svg",
    "alt": "Cryptographic primitives applied in an API Gateway architecture",
    "caption": "Figure 7.11 - Cryptographic primitives in an API Gateway architecture."
  },
  {
    "kind": "paragraph",
    "text": "An API Gateway can terminate TLS, validate client certificates, verify JWT, produce tokens, sign or validate messages, call KMSs, and protect backend secrets. These functions should not be treated as a single \"encryption\" policy. Each policy has specific inputs, keys, algorithms and flaws."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, certificates, private key stores, trusted certificate stores, filters and policies make up the flow. The diagnosis must identify whether the failure occurs in the TLS listener, in token validation, in the signing policy, in decryption or in the outgoing connection. Logs need to inform key identifier and algorithm without revealing secret or sensitive payload."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, certificates, named values, Key Vault, managed identity, and policies can participate. The platform can validate JWT, authenticate backend with certificate and obtain secrets from a vault. Managed identity reduces static credentials, but Key Vault and update cache access permissions need to be understood."
  },
  {
    "kind": "paragraph",
    "text": "In both products, the gateway should not become an indiscriminate safe. Secrets need an owner, purpose and rotation. Policies must use algorithms allowed by baseline. Development and production environments must have separate keys. Configuration exports and backups need to be protected as they may contain references or sensitive material."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Common errors and attacks",
    "id": "common-errors-and-attacks"
  },
  {
    "kind": "paragraph",
    "text": "Reusing nonce in AES-GCM or ChaCha20-Poly1305 is one of the most serious errors. Depending on the scheme, the attacker can derive relationships between plaintexts, recover the authentication key, or forge messages. Distributed systems need an explicit strategy for uniqueness, especially after restart, rollback or cloning."
  },
  {
    "kind": "paragraph",
    "text": "Using ECB, encrypting without authenticating, validating padding with distinguishable errors, accepting algorithms chosen by the attacker, mixing keys between environments, disabling certificate validation and storing keys in code are recurring failures. Many don't break the math; they break protocol and operation."
  },
  {
    "kind": "paragraph",
    "text": "Side channels explore timing, cache, consumption, emission, and error behavior. MAC and signature comparisons should avoid progressive leakage. RSA, ECC, and AES implementations need to use mature libraries and adequate hardware resources. Writing primitives manually is almost never justifiable in enterprise applications."
  },
  {
    "kind": "paragraph",
    "text": "Encryption can also fail due to overconfidence. A signed payload may contain a malicious operation authorized by a compromised key. An encrypted token can carry wrong claims. A hash can validate the integrity of a file provided by the same attacker who provided the hash. Trusted origin and context matter as much as verification."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Post-quantum cryptography and cryptographic agility",
    "id": "post-quantum-cryptography-and-cryptographic-agility"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-12-post-quantum-transition.svg",
    "alt": "Inventory steps, hybrid testing and post-quantum migration",
    "caption": "Figure 7.12 - Steps of a post-quantum transition."
  },
  {
    "kind": "paragraph",
    "text": "Quantum computers of cryptographically relevant scale could apply Shor's algorithm against RSA, Diffie-Hellman and ECC. Symmetric ciphers and hashes are also theoretically impacted, but can maintain larger margins with appropriate sizes. The risk includes harvest now, decrypt later: capturing data today to try to decrypt it in the future."
  },
  {
    "kind": "paragraph",
    "text": "In August 2024, NIST published FIPS 203 for ML-KEM, FIPS 204 for ML-DSA, and FIPS 205 for SLH-DSA. ML-KEM establishes secrets; ML-DSA and SLH-DSA produce signatures. These algorithms have different sizes and profiles than classic schemes, requiring performance tests, bandwidth, storage, certificates, HSMs and protocols."
  },
  {
    "kind": "paragraph",
    "text": "Post-quantum migration does not mean changing everything immediately without planning. The first step is cryptographic inventory: where RSA, ECC and DH appear, how long the data needs to remain secret, which vendors control the implementation and which dependencies lack agility. Then comes risk classification, testing and transition."
  },
  {
    "kind": "paragraph",
    "text": "Cryptoagility is the ability to exchange algorithms, parameters and keys without rebuilding the system. Protocols must negotiate only permitted suites, formats must identify algorithm and version, and applications must not encode fixed sizes. Hybrid strategies combine classical and post-quantum mechanisms during the transition, but need formal specifications to avoid unsafe compositions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Cryptographic troubleshooting",
    "id": "cryptographic-troubleshooting"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/cryptography/en/figure-13-cryptographic-troubleshooting.svg",
    "alt": "Troubleshooting tree to classify cryptographic failures",
    "caption": "Figure 7.13 - Initial cryptographic troubleshooting tree."
  },
  {
    "kind": "paragraph",
    "text": "Troubleshooting must separate format, algorithm, parameters, key and context. An \"invalid signature\" failure could mean wrong public key, different algorithm, payload canonicalized in another way, incorrect Base64url, different protected header or altered message. Changing the key without testing the signed bytes may mask the cause."
  },
  {
    "kind": "paragraph",
    "text": "Decryption failures can come from wrong data key, invalid tag, incorrect nonce, different AAD, padding, encoding or envelope version. In AEAD, tag failure must be treated as an inauthentic message. The application should not attempt to \"recover\" partial text or skip checking to diagnose in production."
  },
  {
    "kind": "paragraph",
    "text": "KMS/HSM access errors may appear to be cryptographic, but may be identity, network, quota, partition, or permission errors. Check which principal called, which operation was denied, which key version was selected and whether the key is active. KMS latency and throttling may require secure caching of data keys or encryption envelope adjustments."
  },
  {
    "kind": "paragraph",
    "text": "To reproduce a signature, capture only non-sensitive data and normalize the case in a controlled environment. Record algorithm, key identifier, length, payload hash, timestamp and result, without recording private key, secret, sensitive cleartext or full token. Safe and essential observability for diagnosis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Application in banking and finance",
    "id": "application-in-banking-and-finance"
  },
  {
    "kind": "paragraph",
    "text": "Banks use encryption in digital channels, payments, Open Finance, PIN, cards, messaging, files, backups, HSMs, certificates and transaction signatures. Criticality comes from financial value, privacy, regulation and the need for auditing. A cryptographic choice needs to consider availability and recovery, not just confidentiality."
  },
  {
    "kind": "paragraph",
    "text": "HSMs are common for high-criticality keys, including issuance, signing, payment processing, and roots of trust. Controls such as dual control, split knowledge and audit trails reduce the possibility of one person controlling the entire cycle. These organizational controls complement the mathematics."
  },
  {
    "kind": "paragraph",
    "text": "In Open Finance, TLS and mTLS secure channels and authenticate participants, while OAuth and tokens control authorization. Message signatures can guarantee integrity at intermediate hops. Keys and certificates need coordinated rotation between institutions, with overlap and testing to avoid unavailability."
  },
  {
    "kind": "paragraph",
    "text": "The gateway professional needs to distinguish between cryptographic failure and business failure. A valid signature demonstrates that bytes were signed by a trusted key; does not demonstrate balance, consent or permission. Cryptographic policies should feed the authorization context, not replace it."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Technical reference tables",
    "id": "technical-reference-tables"
  },
  {
    "kind": "paragraph",
    "text": "The tables summarize frequent decisions. They do not replace the protocol documentation or the organization's cryptographic policy."
  },
  {
    "kind": "table",
    "caption": "Table 1 — Cryptographic primitives, objectives, examples and cautions.",
    "headers": [
      "Primitive",
      "Main objective",
      "Examples",
      "Essential care"
    ],
    "rows": [
      [
        "Symmetric cipher",
        "Efficient confidentiality",
        "AES, ChaCha20",
        "Mode, nonce/IV and authentication."
      ],
      [
        "AEAD",
        "Confidentiality and authenticity",
        "AES-GCM, ChaCha20-Poly1305",
        "Unique nonce per key and tag verification."
      ],
      [
        "Hash",
        "Summary and integrity when the reference is reliable",
        "SHA-256, SHA-3",
        "Do not use fast hash as password storage."
      ],
      [
        "MAC",
        "Integrity and authentication with shared secret",
        "HMAC-SHA-256, GMAC",
        "Replay protection and secure comparison."
      ],
      [
        "Subscription",
        "Integrity and authenticity verifiable by public key",
        "RSA-PSS, ECDSA, EdDSA, ML-DSA",
        "Key custody, canonicalization and allowed algorithm."
      ],
      [
        "KDF",
        "Derive keys by context",
        "HKDF",
        "Separate purpose, salt/context and length."
      ],
      [
        "KDF Password",
        "Make password guesses expensive",
        "Argon2id, PBKDF2",
        "Calibrated parameters, single salt and migration."
      ],
      [
        "KEM / agreement",
        "Establish shared secret",
        "X25519, ML-KEM",
        "Protocol authentication and subsequent derivation."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Table 2 — Secrecy and uniqueness requirements for cryptographic materials.",
    "headers": [
      "Term",
      "Does it need to be secret?",
      "Does it need to be unique?",
      "Observation"
    ],
    "rows": [
      [
        "Symmetrical key",
        "Yes",
        "Must be independent by purpose",
        "Compromise allows encryption/decryption or authentication."
      ],
      [
        "Nonce",
        "Normally not",
        "Often yes, according to the diagram",
        "In GCM, I reuse it with the same key and record."
      ],
      [
        "IV",
        "Depends on the mode",
        "Requirements vary",
        "Do not assume that IV is always random or always secret."
      ],
      [
        "Salt",
        "No",
        "Must be unique per credential/derivation",
        "Combat precomputation; does not replace cost."
      ],
      [
        "Tag AEAD/MAC",
        "No",
        "Message derivative and parameters",
        "It must be verified before accepting the message."
      ],
      [
        "Public key",
        "No",
        "Association with identity must be reliable",
        "It can be distributed by certified or controlled repository."
      ],
      [
        "Private key",
        "Yes",
        "One per identity/purpose according to policy",
        "Ideally not exportable in critical cases."
      ]
    ]
  },
  {
    "kind": "table",
    "caption": "Table 3 — Cryptographic problems, hypotheses and initial verifications.",
    "headers": [
      "Problem observed",
      "Hypotheses",
      "Initial checks"
    ],
    "rows": [
      [
        "Invalid signature",
        "Different key, algorithm, bytes or encoding",
        "Compare signing input byte by byte, kid, alg and sender key."
      ],
      [
        "GCM tag invalid",
        "Divergent key, nonce, AAD or ciphertext",
        "Confirm all parameters; do not release partial plaintext."
      ],
      [
        "Different HMAC",
        "Canonicalization, secret or encoding",
        "Reproduce method, path, timestamp and raw body."
      ],
      [
        "KMS access denied",
        "Identity or policy",
        "Check main, operation, key, version and environment."
      ],
      [
        "Algorithm not supported",
        "Library, gateway, or HSM out of capacity",
        "Consult support matrix and approved baseline."
      ],
      [
        "PEM/DER error",
        "Incorrect format or string",
        "Identify container, headers, Base64, algorithm and key type."
      ],
      [
        "Failure after rotation",
        "Consumer uses old key or incorrect kid",
        "Maintain overlay and publish updated scan set."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Annotated technical examples",
    "id": "annotated-technical-examples"
  },
  {
    "kind": "paragraph",
    "text": "The following examples are didactic. In production, use libraries, formats and services approved by the organization. Do not implement cryptographic primitives manually."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Example 1 – Hash and HMAC in Python"
  },
  {
    "kind": "code",
    "text": "import hashlib\nimport hmac\nmensagem = b\"evento=pagamento&valor=100\"\nsegredo = b\"segredo-de-alta-entropia-obtido-de-um-cofre\"\ndigest = hashlib.sha256(mensagem).hexdigest()\nmac = hmac.new(segredo, mensagem, hashlib.sha256).hexdigest()\nprint(\"SHA-256:\", digest)\nprint(\"HMAC-SHA-256:\", mac)\n# When checking, prefer compare_digest to reduce timing leakage.\nmac_recebido = mac\nassert hmac.compare_digest(mac, mac_recebido)"
  },
  {
    "kind": "paragraph",
    "text": "SHA-256 produces a keyless digest. Anyone can recalculate it. HMAC includes a shared secret and authenticates the message between holders of that secret. The comparison must use an appropriate function, and the protocol still needs a timestamp or nonce to avoid replay."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Example 2 - Inspection of algorithms and keys with OpenSSL"
  },
  {
    "kind": "code",
    "text": "# Generate 32 random bytes in hexadecimal.\nopenssl rand -hex 32\n# Calculate SHA-256 from a file.\nopenssl dgst -sha256 mensagem.json\n# Generate RSA key for laboratory.\nopenssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out chave-privada.pem\nopenssl pkey -in chave-privada.pem -pubout -out chave-publica.pem\n# Sign and verify with RSA-PSS and SHA-256.\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -sign chave-privada.pem -out assinatura.bin\nmensagem.json\nopenssl dgst -sha256 -sigopt rsa_padding_mode:pss   -verify chave-publica.pem -signature\nassinatura.bin mensagem.json"
  },
  {
    "kind": "paragraph",
    "text": "The laboratory separates private and public keys and uses PSS. The private key should not be sent to the verifier. In a real environment, the signature can occur in an HSM or KMS, and the verifier receives the public key through a trusted channel."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Example 3 - Conceptual structure of an envelope"
  },
  {
    "kind": "code",
    "text": "{\n  \"versao\": 1,\n  \"algoritmo_chave\": \"KMS-KEY-WRAP\",\n  \"algoritmo_conteudo\": \"AES-256-GCM\",\n  \"id_chave_mestra\": \"payments-prod-v12\",\n  \"chave_dados_encapsulada\": \"...\",\n  \"nonce\": \"...\",\n  \"aad\": \"...\",\n  \"ciphertext\": \"...\",\n  \"tag\": \"...\"\n}"
  },
  {
    "kind": "paragraph",
    "text": "The envelope records version and algorithms to allow migration. The encapsulated data key is not the master key. The consumer retrieves the data key through an authorized operation in the KMS, validates the tag and only then accepts the clear text."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Case Studies",
    "id": "case-studies"
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 1 - Webhook with valid HMAC and duplicate operation"
  },
  {
    "kind": "paragraph",
    "text": "One partner sent webhooks signed with HMAC-SHA-256. The consumer correctly verified the signature, but did not register the event identifier or validate the timestamp. An intermediary relayed an old message. The HMAC remained valid because the message was not changed, and the financial transaction was processed twice."
  },
  {
    "kind": "paragraph",
    "text": "The correction was not to change the algorithm. It was adding signed timestamp, tolerance window, unique identifier, storage of processed events and idempotence in the backend. The case demonstrates that authenticity does not imply freshness or uniqueness of business."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 2 - AES-GCM intermittent failure after horizontal scaling"
  },
  {
    "kind": "paragraph",
    "text": "One application used a local counter as a nonce. Each instance started the counter at zero. When the service went from one to several replicas, different instances reused nonces with the same key. The system continued to work, but lost cryptographic guarantees and opened up the possibility of forgery."
  },
  {
    "kind": "paragraph",
    "text": "The solution required stopping use of the affected key, rotating material, evaluating exposed data and adopting a distributed nonce strategy or separate keys per instance. Uniqueness monitoring and restart tests have been incorporated into the pipeline."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 3 - JWT key rotation brings down consumers"
  },
  {
    "kind": "paragraph",
    "text": "The issuer changed the signing key and immediately removed the old JWKS public key. Tokens issued minutes earlier were still valid, but consumers were unable to verify them. The incident was initially interpreted as an OAuth failure, although the cause was in the cryptographic lifecycle."
  },
  {
    "kind": "paragraph",
    "text": "The correct strategy kept old verification keys published until the end of the longest lifetime of tokens and caches, used consistent kid, published the new key before activating the subscription, and monitored consumers. Safe rotation is a coordinated change, not just file replacement."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Case 4 - Gateway validates signature with key chosen by the token"
  },
  {
    "kind": "paragraph",
    "text": "A policy accepted a key URL informed in the token itself. The gateway downloaded the key and confirmed that the signature was mathematically valid. An attacker generated his own pair, published the key, and created accepted tokens. The cryptographic verification worked, but the root of trust was controlled by the attacker."
  },
  {
    "kind": "paragraph",
    "text": "The fix linked each authorized issuer to a previously configured JWKS, restricted algorithms, validated issuer and audience, and applied secure caching. The case shows that a public key needs to be trustworthy and associated with an identity; A valid signature alone is not enough."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Study labs",
    "id": "study-labs"
  },
  {
    "kind": "paragraph",
    "text": "Laboratory environment Run tests only on files and keys created for study. Do not copy keys, tokens, payloads or production secrets. The objective is to observe properties and formats, not to reproduce sensitive material."
  },
  {
    "kind": "list",
    "ordered": true,
    "items": [
      "Calculate SHA-256 from two files that differ by one character and compare the digests. Relate the result to the avalanche effect.",
      "Calculate HMAC of the same body with two different keys. Then change one byte of the message and confirm that the check fails.",
      "Generate a lab RSA pair, sign a file with RSA-PSS, verify with the public key, and confirm that the verification fails after changing the file.",
      "Examine a PEM key and identify whether it represents a private key, public key, or certificate. Convert between PEM and DER only in the laboratory.",
      "Create a small conceptual envelope containing version, algorithm, key id, nonce, ciphertext and tag. Explain how each field participates in decryption.",
      "Design a gateway policy for webhook with HMAC, including canonicalization, timestamp, replay protection, secure comparison and observability.",
      "Create a cryptographic inventory of a fictitious architecture: TLS, JWT, bank, backups, queues, KMS and partners. Record algorithm, key, owner, validity and dependency.",
      "Choose a fictitious RSA/ECC integration and describe what a transition to a hybrid approach with a post-quantum algorithm would look like, including size and compatibility risks."
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
    "ordered": true,
    "items": [
      "Explain why encryption is broader than encryption.",
      "Differentiate between confidentiality, integrity, authenticity, authorization and non-repudiation.",
      "Why does Kerckhoffs' principle favor public algorithms and secret keys?",
      "What is the difference between nonce, IV and salt?",
      "Why does AES need a mode of operation?",
      "Why does ECB reveal patterns?",
      "What properties does AES-GCM provide and what nonce and critical requirements?",
      "Differentiate SHA-256, HMAC-SHA-256 and RSA-PSS signature.",
      "Why fast hashing is not suitable for password storage?",
      "What is the role of a KDF like HKDF?",
      "Why shouldn't RSA encrypt large payloads directly?",
      "Differentiate between X25519 and Ed25519.",
      "How can a digital signature fail even when producer and verifier use the same key?",
      "Explain envelope encryption and its relationship with KMS.",
      "Why should kid not be treated as a root of trust?",
      "What additional controls does an HMAC webhook need to prevent replay?",
      "Describe the life cycle of a key and rotation care.",
      "How can Axway API Gateway or Azure API Management use KMS, certificates, and keys without becoming indiscriminate repositories of secrets?",
      "Which algorithm families were standardized in FIPS 203, 204 and 205?",
      "Why are inventory and cryptographic agility prerequisites for post-quantum migration?"
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
    "caption": "Table 4 — Chapter glossary.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "AEAD",
        "Authenticated encryption with associated data, producing ciphertext and tag."
      ],
      [
        "AES",
        "Symmetric block cipher standardized in FIPS 197."
      ],
      [
        "AAD",
        "Data authenticated, but not encrypted, in an AEAD scheme."
      ],
      [
        "Ciphertext",
        "Encrypted result of a message."
      ],
      [
        "CSPRNG/DRBG",
        "Generator designed to produce unpredictable bits for cryptographic use."
      ],
      [
        "digest",
        "Output of a hash function."
      ],
      [
        "Envelope encryption",
        "Data protection with data key, which in turn is protected by a master key or KEM."
      ],
      [
        "HMAC",
        "MAC built from hash function and shared secret."
      ],
      [
        "HSM",
        "Hardware security module that protects keys and performs cryptographic operations."
      ],
      [
        "IV",
        "Initialization vector used by certain modes of operation."
      ],
      [
        "KDF",
        "Function that derives keys from input material and context."
      ],
      [
        "KEM",
        "Key encapsulation mechanism to establish shared secret."
      ],
      [
        "KMS",
        "Key management service with identity, policy, version and audit."
      ],
      [
        "MAC",
        "Message authentication code based on shared secret."
      ],
      [
        "Nonce",
        "Value used once or according to the scheme's uniqueness rule."
      ],
      [
        "Plaintext",
        "Information before encryption."
      ],
      [
        "Salt",
        "Non-secret value is typically the only value used in derivation, especially from passwords."
      ],
      [
        "Tag",
        "Authentication value produced by MAC or AEAD."
      ],
      [
        "Cryptoagility",
        "Ability to exchange algorithms, parameters and keys with controlled impact."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter summary",
    "id": "chapter-summary"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Cryptography provides different services; No primitive alone solves confidentiality, integrity, authentication, authorization and availability.",
      "Symmetric cryptography protects large volumes; Asymmetric cryptography distributes trust, establishes keys and allows signatures.",
      "AES must be used with appropriate mode. AEAD, like AES-GCM and ChaCha20-Poly1305, combines encryption and authentication.",
      "Nonces, IVs, salts and tags have different requirements. Nonce reuse can destroy the security of a scheme.",
      "Hashes do not encrypt data. HMAC authenticates with shared secret. Signatures use a private key and are verified with a public key.",
      "KDFs separate keys by context; password functions add cost against guessing.",
      "RSA-OAEP and RSA-PSS are schemes with appropriate padding. ECC offers agreement and signature with smaller keys.",
      "Envelope encryption and KMS/HSM reduce exposure and organize the key lifecycle.",
      "Gateways apply encryption across TLS, mTLS, tokens, webhooks, and backend connections, but need root of trust, governance, and observability.",
      "The post-quantum transition with ML-KEM, ML-DSA and SLH-DSA requires inventory, testing and cryptographic agility."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended reading",
    "id": "official-references-and-recommended-reading"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 197 - Advanced Encryption Standard (AES): https://csrc.nist.gov/pubs/fips/197/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-38D - GCM and GMAC: https://csrc.nist.gov/pubs/sp/800/38/d/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 180-4 - Secure Hash Standard: https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 202 - SHA-3 Standard: https://csrc.nist.gov/pubs/fips/202/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 186-5 - Digital Signature Standard: https://csrc.nist.gov/pubs/fips/186-5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-57 Part 1 Rev. 5 - Key Management: https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90A Rev. 1 - Deterministic Random Bit Generators: https://csrc.nist.gov/pubs/sp/800/90/a/r1/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90B - Entropy Sources: https://csrc.nist.gov/pubs/sp/800/90/b/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST SP 800-90C - Random Bit Generator Constructions: https://csrc.nist.gov/pubs/sp/800/90/c/final"
  },
  {
    "kind": "paragraph",
    "text": "RFC 2104 - HMAC: https://www.rfc-editor.org/info/rfc2104/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5869 - HKDF: https://www.rfc-editor.org/info/rfc5869/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8017 - PKCS #1 RSA v2.2: https://www.rfc-editor.org/info/rfc8017/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 7748 - X25519 and X448: https://www.rfc-editor.org/info/rfc7748/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8032 - EdDSA: https://www.rfc-editor.org/info/rfc8032/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 8439 - ChaCha20 and Poly1305: https://www.rfc-editor.org/info/rfc8439/"
  },
  {
    "kind": "paragraph",
    "text": "RFC 9106 - Argon2: https://www.rfc-editor.org/info/rfc9106/"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 203 - ML-KEM: https://csrc.nist.gov/pubs/fips/203/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 204 - ML-DSA: https://csrc.nist.gov/pubs/fips/204/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST FIPS 205 - SLH-DSA: https://csrc.nist.gov/pubs/fips/205/final"
  },
  {
    "kind": "paragraph",
    "text": "NIST Post-Quantum Cryptography Project: https://csrc.nist.gov/projects/post-quantum-cryptography"
  },
  {
    "kind": "paragraph",
    "text": "Note on documents under review Cryptographic standards evolve. As of July 2026, NIST maintains review processes for documents such as SP 800-38D and SP 800-57. For new projects, always consult the official publication status, the organization's baseline and product support matrices before defining algorithms and sizes."
  }
];
