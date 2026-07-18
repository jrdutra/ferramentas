import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido, com remoção apenas de cabeçalhos, rodapés e quebras físicas de página.
export const CERTIFICATES_EN_CHAPTER_BLOCKS: ChapterBlock[] = [
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-01.svg",
    "alt": "Certificate and PKI Ecosystem Overview",
    "caption": "Figure 8.1 - Overview of the certificate and PKI ecosystem."
  },
  {
    "kind": "paragraph",
    "text": "This chapter explains how digital certificates transform public keys into verifiable identities. The reader will follow the X.509 model, the construction and validation of chains, issuance by certification authorities, revocation, storage formats and the operation of these elements in TLS, mTLS, API Gateways and corporate environments."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Chapter Objectives",
    "id": "chapter-objectives"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Differentiate public key, certificate, identity, trust and authorization, avoiding treating these concepts as equivalent.",
      "Understand the components of a PKI: holder, Registration Authority, Certification Authority, repositories, policies, auditors and relying parties.",
      "Read the structure of an X.509 v3 certificate, including required fields, critical extensions, names, key usages, and authority identifiers.",
      "Distinguish chain construction, path validation and trust decision, including anchors, intermediaries, policies and constraints.",
      "Understand the issuance cycle: key generation, CSR PKCS #10, validation, signature, publication, installation, renewal, rotation, revocation and destruction.",
      "Understand CRLs, OCSP, OCSP stapling, short-lived certificates, and the tradeoffs between security, privacy, and availability.",
      "Recognize DER, PEM, PKCS #12, JKS and PKCS #11 interface formats, diagnosing string, private key and conversion errors.",
      "Apply certificates in server TLS, mTLS authentication, Axway API Gateway, Azure API Management, and backend integrations.",
      "Perform structured troubleshooting with OpenSSL, handshake logs, trust store inspection and date analysis, SAN, EKU and revocation."
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
    "text": "Digital certificates bring together several layers at once: asymmetric encryption, ASN.1 formats, identity rules, organizational policies, repositories, revocation protocols and trust decisions. The best way to study is to separate the questions. First: what identity does the certificate assert? Second: who signed this statement? Third: why does the system trust the sender? Fourth: Does the chain meet the rules of time, use, name, policy and revocation?"
  },
  {
    "kind": "paragraph",
    "text": "The chapter uses the Internet profile defined by RFC 5280 as a basis, but shows that a real PKI is not just a set of certificates. It requires governance, key protection, issuance profiling, auditing, automation and incident response. In each section, connect the theory to a concrete flow: the certificate presented by a client, the certificate of a gateway's listener, or the certificate used by the gateway to authenticate to a backend."
  },
  {
    "kind": "subhead",
    "text": "Editorial rule for diagrams"
  },
  {
    "kind": "paragraph",
    "text": "To prevent wrapped text within boxes, the diagrams in this chapter use only short labels. Full technical explanations remain in the body of the text. Document highlight boxes have automatic height and enlarged internal margins, with no fixed vertical dimensions."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.1 From public key to digital certificate",
    "id": "8-1-from-public-key-to-digital-certificate"
  },
  {
    "kind": "paragraph",
    "text": "An isolated public key allows you to verify a signature or participate in a key establishment protocol, but it does not, by itself, tell you who controls the corresponding private key. An attacker could generate his own key pair and claim that the public key belongs to a bank, a domain or an application. The central problem is not mathematical: it is creating a verifiable association between an identifier and a key."
  },
  {
    "kind": "paragraph",
    "text": "The digital certificate solves this problem by encapsulating the public key, identity data, validity period, usage restrictions and metadata, protecting the whole with an issuer's digital signature. The signature does not make all information true in nature; it allows us to verify that the issuer assumed technical responsibility for the declaration. The trusting party still needs to decide whether it recognizes that issuer, whether the profile is appropriate, and whether the identity presented matches the context of the transaction."
  },
  {
    "kind": "paragraph",
    "text": "In server TLS, the certificate binds a public key to DNS names or IP addresses. In mTLS, it can bind a key to an application, device, partner, or legal entity. In code signing, it associates a key with a publisher identity. The same X.509 framework can serve different purposes, but extensions, policies, and validation processes determine what the certificate can actually prove."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.2 What is a Public Key Infrastructure",
    "id": "8-2-what-is-a-public-key-infrastructure"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-02.svg",
    "alt": "Essential roles in a Public Key Infrastructure",
    "caption": "Figure 8.2 - Essential roles in a Public Key Infrastructure."
  },
  {
    "kind": "paragraph",
    "text": "PKI, or Public Key Infrastructure, is the set of policies, processes, people, services, equipment and software used to issue, maintain, distribute, validate and revoke certificates and key pairs. The infrastructure includes certification authorities, registration systems, certificate and status repositories, cryptographic modules, audit procedures, segregation of duties and regulatory documents."
  },
  {
    "kind": "paragraph",
    "text": "The Certification Authority, or CA, signs certificates and revocation lists. The Registration Authority, or RA, validates information and authorizes issuance requests, but may not have the CA's signing key. The holder controls or uses the private key linked to the certificate. The relying party validates the certificate before accepting the identity. Repositories make certificates, CRLs, policy information, or status responses available. In a mature PKI, these roles are separated to reduce fraud and limit the impact of a compromise."
  },
  {
    "kind": "paragraph",
    "text": "There are also governance roles. Policy authority defines identification requirements, algorithms, deadlines, uses, and responsibilities. Operators manage components. Auditors check whether practices match policies. Security teams protect keys, analyze events, and coordinate revocation. Therefore, trusting a certificate means trusting a technical chain and, simultaneously, a chain of human and organizational processes."
  },
  {
    "kind": "table",
    "caption": "Components and responsibilities of a PKI.",
    "headers": [
      "Component",
      "Main function",
      "Risk if compromised"
    ],
    "rows": [
      [
        "Root CA",
        "It creates an anchor or hierarchy of trust.",
        "Compromise may require extensive replacement of trust."
      ],
      [
        "Intermediate AC",
        "Issues final or other intermediate certificates under restrictions.",
        "Allows improper emission within the authorized scope."
      ],
      [
        "FROG",
        "Validates identity and approves requests.",
        "May authorize certificates for wrong identities."
      ],
      [
        "Holder",
        "Controls the private key and uses the certificate.",
        "Key theft allows impersonation until lockout or expiration."
      ],
      [
        "Confident party",
        "Builds and validates the path before trusting.",
        "Incomplete validation accepts invalid identities or uses."
      ],
      [
        "Status Repository",
        "Publishes CRL, OCSP, certificates and metadata.",
        "Unavailability or outdated data affects the decision."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.3 X.509, ASN.1 and DER encoding",
    "id": "8-3-x-509-asn-1-and-der-encoding"
  },
  {
    "kind": "paragraph",
    "text": "X.509 is a family of standards for public key certificates, revocation lists, and attributes. On the Internet, RFC 5280 defines a profile of X.509 v3 certificates and X.509 v2 CRLs. A profile restricts options from a broad pattern so that independent implementations can interoperate. Not everything that the X.509 syntax allows is appropriate for public TLS or an enterprise PKI."
  },
  {
    "kind": "paragraph",
    "text": "The structure is described in ASN.1, a formal language for defining data types. The certificate is typically encoded with DER, a deterministic subset of the Basic Encoding Rules. DER ensures a unique representation for values, an important feature because the digital signature is calculated over specific bytes. Changing the encoding, even without changing the apparent meaning, produces different bytes and invalidates the signature."
  },
  {
    "kind": "paragraph",
    "text": "Tools often show the certificate in textual format, but the signed object remains binary. PEM is just a Base64 textual wrapper around the DER, accompanied by lines like BEGIN CERTIFICATE. Understanding this difference avoids confusing representation, structure and content: X.509 defines the model, ASN.1 describes the syntax, DER encodes the bytes and PEM facilitates transport in files and textual configurations."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.4 Anatomy of an X.509 v3 certificate",
    "id": "8-4-anatomy-of-an-x-509-v3-certificate"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-03.svg",
    "alt": "Conceptual structure of an X.509 certificate",
    "caption": "Figure 8.3 - Conceptual structure of an X.509 certificate."
  },
  {
    "kind": "paragraph",
    "text": "The Certificate object contains three parts: tbsCertificate, signatureAlgorithm, and signatureValue. The acronym TBS stands for to be signed. This part contains version, serial number, algorithm, issuer, validity, subject, SubjectPublicKeyInfo and extensions. The CA calculates the signature over the DER encoding of the tbsCertificate. The verifier uses the issuer's public key to verify signatureValue."
  },
  {
    "kind": "paragraph",
    "text": "The serial number identifies the certificate within the issuer's domain and is used in CRLs and OCSP queries. The validity interval contains notBefore and notAfter. Issuer identifies the issuing entity; subject identifies the holder when this field is used. SubjectPublicKeyInfo includes the algorithm and public key. X.509 v3 extensions express alternative names, authority restrictions, authorized uses, policies, distribution points, and certificate relationships."
  },
  {
    "kind": "paragraph",
    "text": "There are two signature algorithm fields: one inside tbsCertificate and one in the outer object. They need to be consistent. The certificate's signature algorithm is not necessarily the same as the holder's public key algorithm. For example, a CA with an RSA key can sign a certificate that carries an elliptical public key. What matters is that the verifier supports the algorithm used by the issuer and the algorithm associated with the holder's key for the subsequent protocol."
  },
  {
    "kind": "table",
    "caption": "Fields of a certificate and diagnostic questions.",
    "headers": [
      "Field",
      "Operational meaning",
      "Diagnostic question"
    ],
    "rows": [
      [
        "serial number",
        "Unique identifier under an issuer.",
        "Is the serial consulted in CRL/OCSP correct?"
      ],
      [
        "Issuer",
        "Name of the declared issuer.",
        "Is there a compatible and trusted issuing certificate?"
      ],
      [
        "Validity",
        "Time window of use.",
        "Are clock, timezone and notBefore/notAfter correct?"
      ],
      [
        "Subject",
        "Nominal identity of the holder.",
        "Does the profile use subject or does it mainly rely on SAN?"
      ],
      [
        "SubjectPublicKeyInfo",
        "Algorithm and public key of the holder.",
        "Is the key supported and matches the installed private key?"
      ],
      [
        "Extensions",
        "Names, uses and restrictions.",
        "Are any critical extensions unknown or incompatible?"
      ],
      [
        "Signature",
        "Protection of the issuer’s integrity and authorship.",
        "Does the signature verify with the issuer's public key?"
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.5 Distinguished Names, Subject and Issuer",
    "id": "8-5-distinguished-names-subject-and-issuer"
  },
  {
    "kind": "paragraph",
    "text": "Subject and issuer usually use Distinguished Names, structures composed of Relative Distinguished Names. Common elements include countryName, organizationName, organizationalUnitName, and commonName. The order, coding, and comparison rules can be more complex than a simple textual comparison. Two visually similar representations are not necessarily identical at the coding level."
  },
  {
    "kind": "paragraph",
    "text": "In modern TLS certificates, Common Name should not be treated as the primary source for hostname validation when Subject Alternative Name is present. SAN was created to represent protocol-appropriate name forms such as dNSName, iPAddress, rfc822Name, and URI. Enterprise systems can still use DN for policy selection, but relying on subject-free text without a rigid profile creates fragility and ambiguities."
  },
  {
    "kind": "paragraph",
    "text": "Issuer and subject are also not enough to build a chain safely. Different CAs may share similar or even the same names. Key identifiers, signatures, constraints, and path data participate in the decision. A validation that only compares the issuer of the child certificate with the subject of a candidate does not prove that the candidate is the correct issuer."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.6 Subject Alternative Name and identity validation",
    "id": "8-6-subject-alternative-name-and-identity-validation"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-04.svg",
    "alt": "Validation of the requested identifier against Subject Alternative Name",
    "caption": "Figure 8.4 - Validation of the requested identifier against Subject Alternative Name."
  },
  {
    "kind": "paragraph",
    "text": "For an HTTPS connection, the client initiates access with an identifier: typically a DNS name. After validating the signature and chain, it must verify that this identifier appears validly in the certificate. A dNSName is compared according to specific DNS name rules. An IP address access requires an appropriate iPAddress entry; writing the IP as text in dNSName does not produce the same semantics."
  },
  {
    "kind": "paragraph",
    "text": "Wildcards reduce the number of certificates, but they have limits and increase the impact of a key leak. A name such as *.example.com typically covers a single label, such as api.example.com, and should not be assumed to cover a.b.example.com. In internal environments, overly broad wildcards can allow the same key to represent many unrelated services, making segregation and incident response difficult."
  },
  {
    "kind": "paragraph",
    "text": "SNI and SAN solve different problems. SNI informs the server, during the handshake, which name the client intends to access, allowing it to select a certificate. SAN defines which identifiers the certificate is authorized to represent. The server may choose a certificate based on the SNI and still send a certificate whose SAN does not match the name. In this case, validation should fail."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.7 Critical and non-critical extensions",
    "id": "8-7-critical-and-non-critical-extensions"
  },
  {
    "kind": "paragraph",
    "text": "Each extension has an OID identifier, a value and a critical indicator. If an implementation does not recognize or cannot process an extension marked as critical, validation should fail. An unknown non-critical extension may be ignored, although its value may still be relevant for specific applications. Marking everything as critical harms interoperability; Failure to mark an essential restriction as critical may allow consumers to ignore it."
  },
  {
    "kind": "paragraph",
    "text": "Criticality does not mean that the extension is important in business terms, but it defines behavior in the face of lack of knowledge. A certificate profile needs to specify which extensions are required, their values, criticality, and interactions. CAs should not just copy requested extensions into a CSR: they should apply the authorized profile and reject or replace attributes that the requestor is not allowed to choose."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-05.svg",
    "alt": "X.509 extension families used in validation and operation",
    "caption": "Figure 8.5 - Families of X.509 extensions used in validation and operation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.8 Basic Constraints, Key Usage and Extended Key Usage",
    "id": "8-8-basic-constraints-key-usage-and-extended-key-usage"
  },
  {
    "kind": "paragraph",
    "text": "Basic Constraints informs whether the certificate can act as a CA. The true cA field identifies certificate authority, and pathLenConstraint can limit how many non-self-issued subordinate CAs can appear beneath it. A server or client end certificate should normally have fake cA. Accepting a final certificate as an issuer by ignoring Basic Constraints turns an ordinary credential into undue authority."
  },
  {
    "kind": "paragraph",
    "text": "Key Usage restricts basic cryptographic operations such as digitalSignature, keyEncipherment, keyAgreement, keyCertSign, and cRLSign. CA certificates need keyCertSign to sign certificates, and when publishing CRLs, cRLSign. For TLS, the appropriate bits depend on the algorithm and protocol version. Strict configurations must follow the profile, without assuming that any public key is suitable for any operation."
  },
  {
    "kind": "paragraph",
    "text": "Extended Key Usage, or EKU, expresses application purposes such as serverAuth, clientAuth, codeSigning, and OCSPSigning. A certificate may have a mathematically capable key for signing, but be semantically prohibited from authenticating a client. Gateways that validate mTLS must consider EKU and not just string and validity. Likewise, a server certificate without serverAuth may be rejected by compliant clients."
  },
  {
    "kind": "table",
    "caption": "X.509 extensions and their effects.",
    "headers": [
      "Extension",
      "Example",
      "Effect"
    ],
    "rows": [
      [
        "Basic Constraints",
        "CA=TRUE, pathLen=0",
        "Authorizes issuance, but prevents additional intermediaries below the CA."
      ],
      [
        "Key Usage",
        "digitalSignature",
        "Authorizes use of the key in signing within the profile."
      ],
      [
        "Key Usage",
        "keyCertSign",
        "Authorizes the CA key to sign certificates."
      ],
      [
        "Extended Key Usage",
        "serverAuth",
        "Declares TLS server authentication purpose."
      ],
      [
        "Extended Key Usage",
        "clientAuth",
        "Declares TLS client authentication purpose."
      ],
      [
        "Subject Alternative Name",
        "DNS:api.example.com",
        "Links the key to the identifier used by the client."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.9 SKI, AKI, AIA and distribution points",
    "id": "8-9-ski-aki-aia-and-distribution-points"
  },
  {
    "kind": "paragraph",
    "text": "Subject Key Identifier, or SKI, identifies the public key of the certificate. Authority Key Identifier, or AKI, helps identify the issuer's key. These values ​​help build a chain when there are issuers with the same names, CA renewals or multiple paths. They do not replace signature verification, but they reduce ambiguities when selecting candidates."
  },
  {
    "kind": "paragraph",
    "text": "Authority Information Access can point you to places to obtain issuing certificates and OCSP services. CRL Distribution Points indicate where to retrieve revocation lists. These fields are instructions for construction and status, not guarantees of availability. Isolated environments may block external access, and a gateway may rely on a cache, corporate repository, or peer-provided chain."
  },
  {
    "kind": "paragraph",
    "text": "Automatic recovery of intermediaries by AIA creates differences between clients. A browser can complete a chain that a JVM, appliance, or library does not complete in the same way. Therefore, the server must present the necessary intermediate chain, without depending on opportunistic downloads. The root generally does not need to be sent: it must be in the trust store of the relying party."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.10 Certificate Policies and Name Constraints",
    "id": "8-10-certificate-policies-and-name-constraints"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Policies contains OIDs that represent policies under which the certificate was issued. A policy may indicate validation level, community of trust, contractual requirements, or industry profile. The presence of an OID does not automatically create trust: the trusting party needs to know its meaning, map policies, and configure acceptable OIDs when policy is relevant."
  },
  {
    "kind": "paragraph",
    "text": "Policy Constraints, Policy Mappings, and Inhibit Any Policy participate in policy processing along the way. RFC 9618 updated the policy validation algorithm from RFC 5280 to avoid exponential behavior in adverse cases while preserving equivalent output. This example shows that even seemingly administrative validation algorithms can have a security and availability impact."
  },
  {
    "kind": "paragraph",
    "text": "Name Constraints allow you to restrict namespaces that a subordinate CA can certify, such as certain domains, emails, or IP networks. It is a powerful tool for private CAs, delegated intermediaries, and cross-organization integrations. However, inconsistent support on legacy systems and name complexity require testing. A technically restricted CA is preferable to a CA with broad power controlled only by procedure."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.11 Hierarchies, roots and intermediates",
    "id": "8-11-hierarchies-roots-and-intermediates"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-06.svg",
    "alt": "Hierarchy of root, intermediate and final certificates",
    "caption": "Figure 8.6 - Hierarchy of root, intermediate and final certificates."
  },
  {
    "kind": "paragraph",
    "text": "A root CA usually has a self-signed certificate, in which the subject and issuer represent the entity itself and the signature is produced by the corresponding private key. The fact that it is self-signed does not create trust. Trust arises when the root key or certificate is explicitly installed as a trust anchor by an organization, operating system, browser, runtime, or application."
  },
  {
    "kind": "paragraph",
    "text": "The root typically remains offline or heavily protected and subscribes to intermediate CAs. Intermediaries carry out daily issuance and allow segmentation by purpose, environment, region, partner or security level. If an intermediary is compromised, the organization can revoke and replace it without immediately changing all the roots. This architecture reduces the frequency of use of the most sensitive key."
  },
  {
    "kind": "paragraph",
    "text": "Alternative chains may exist through cross-certification or through intermediaries with more than one issuer. The same final certificate can be validated through different paths depending on the trust store and available certificates. This explains why a connection works on one client and fails on another. The diagnostic needs to capture the actually constructed string, not just the string the server intended to provide."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.12 Chain construction versus path validation",
    "id": "8-12-chain-construction-versus-path-validation"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-07.svg",
    "alt": "Difference between building a chain and validating the path",
    "caption": "Figure 8.7 - Difference between building a chain and validating the path."
  },
  {
    "kind": "paragraph",
    "text": "Chain construction is the process of finding candidate certificates up to a trust anchor. The engine can use the chain sent by the peer, local certificates, caches, AIA and its own selection rules. The result is one or more candidate paths. The order received is not always the order used, and extra certificates may be ignored or introduce unexpected paths."
  },
  {
    "kind": "paragraph",
    "text": "Path validation applies rules to the chosen path: checks signatures, temporal validity, Basic Constraints, Key Usage, EKU, policies, Name Constraints, critical extensions and, depending on local policy, revocation status. After that, the application still checks the service's identity, such as hostname, and business rules. A cryptographically correct string may be inappropriate for serverAuth, clientAuth, or the requested identity."
  },
  {
    "kind": "paragraph",
    "text": "The trust anchor is a configuration entry, not necessarily a certificate processed like the others. Implementations can represent anchors as self-signed certificates or as a name and public key. The important thing is to understand that the root's signature on itself is not the basis of trust; the basis is the administrative decision to trust that key under certain parameters."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.13 Issuance, CSR and proof of ownership",
    "id": "8-13-issuance-csr-and-proof-of-ownership"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-08.svg",
    "alt": "Operational lifecycle of a certificate",
    "caption": "Figure 8.8 - Operational life cycle of a certificate."
  },
  {
    "kind": "paragraph",
    "text": "Issuance begins with the generation of the key pair at the defined custody location. Whenever possible, the private key must be created in the component that will use it or in the HSM/KMS, avoiding transport. The holder then produces a Certificate Signing Request, typically PKCS #10. The CSR contains request information, public key, attributes, and a signature generated with the corresponding private key."
  },
  {
    "kind": "paragraph",
    "text": "Signing the CSR demonstrates possession of the associated private signing key, but does not prove the claimed identity. The RA or CA needs to authenticate the requester and validate names, organization, domain, application or device as per the policy. The CA should also not blindly accept requested Basic Constraints, EKU, or SAN. It issues a certificate according to a profile and authorization, and can modify or reject attributes."
  },
  {
    "kind": "paragraph",
    "text": "After issuance, the certificate and chain are installed in the service, while the private key remains protected. The deployment must verify correspondence between key and certificate, full chain, permissions, alias, format, and password. The operation continues with inventory, expiration monitoring, renewal, rotation, revocation and secure destruction. A forgotten certificate on a secondary listener can cause unavailability even if the primary certificate has been renewed."
  },
  {
    "kind": "subhead",
    "text": "Example of key generation and CSR for laboratory:"
  },
  {
    "kind": "code",
    "text": "openssl req -new -newkey rsa:3072 -nodes \\\n-keyout api.key -out api.csr \\\n-subj '/C=BR/O=Exemplo/CN=api.exemplo.com' \\\n-addext 'subjectAltName=DNS:api.exemplo.com,DNS:api-interno.exemplo.com'"
  },
  {
    "kind": "paragraph",
    "text": "Using -nodes leaves the key unencrypted in the file and is only appropriate for controlled laboratory use. In production, protection depends on the operating model: password, ACL, secret manager, keystore, HSM or managed identity. Automating does not mean storing keys in clear text indiscriminately."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.14 Certificate profiles and separation of purpose",
    "id": "8-14-certificate-profiles-and-separation-of-purpose"
  },
  {
    "kind": "paragraph",
    "text": "A profile defines fields, extensions, algorithms, key sizes, duration, allowed names, and validation process for a purpose. Common profiles include root CA, intermediate CA, TLS server, TLS client, code signing, document signing, and OCSP responder. Separating profiles reduces permissions and makes auditing easier. A single CA issuing any type of certificate increases the impact radius of policy errors."
  },
  {
    "kind": "paragraph",
    "text": "Person, application, and device certificates can use similar structures, but require different identity sources. A workload certificate can be automatically issued with a short validity. An external partner certificate may require contract and organizational validation. An administrator certificate may require physical token protection. X.509 technology does not alone determine the level of trust; the profile and issuance process provide the context."
  },
  {
    "kind": "paragraph",
    "text": "In enterprise architecture, at least separate production and non-production environments, server and client uses, and day-to-day issuing authorities from the roots. When partners need to trust only one part of the organization, a narrow, dedicated intermediary is safer than distributing a broad corporate root."
  },
  {
    "kind": "table",
    "caption": "Certificate profiles and operational care.",
    "headers": [
      "Profile",
      "Typical fields/extensions",
      "Main care"
    ],
    "rows": [
      [
        "Root CA",
        "CA=TRUE, keyCertSign, cRLSign, long-lived",
        "Offline key, ceremony, backups and rigorous auditing."
      ],
      [
        "Intermediate AC",
        "CA=TRUE, pathLen and constraints",
        "Limit namespace and purpose; facilitate replacement."
      ],
      [
        "TLS server",
        "SAN, serverAuth, CA=FALSE",
        "Correct name, complete chain and non-stop rotation."
      ],
      [
        "TLS client",
        "clientAuth, workload/partner identity",
        "Mapping for fast authorization and revocation."
      ],
      [
        "OCSP respond",
        "OCSPSigning",
        "Delegation and protection against inappropriate responses."
      ],
      [
        "Code signing",
        "codesigning",
        "Strong custody and temporal evidence of signature."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.15 TLS Server Certificate Validation",
    "id": "8-15-tls-server-certificate-validation"
  },
  {
    "kind": "paragraph",
    "text": "The client receives the chain during the handshake and needs to verify that there is a path to a trusted anchor, that each signature is valid, that the certificates are valid, and that the CAs are authorized. It then validates server usage and compares the requested identifier with SAN. If any step fails, proceeding silently eliminates impersonation protection."
  },
  {
    "kind": "paragraph",
    "text": "SNI influences which certificate the server presents. A test without SNI may receive the default certificate and generate a false hostname diagnosis. Proxies and gateways can terminate TLS and initiate a new backend connection; in this case, there are independent validations. The certificate seen by the external client is not necessarily the certificate presented by the backend to the gateway."
  },
  {
    "kind": "paragraph",
    "text": "On machine clients, it is common to disable validation to “solve” test environments. This practice tends to migrate to production. The correct solution is to install the appropriate CA in a delimited trust store, issue a certificate with the correct SAN and adjust the clock and chain. Trust-all turns TLS into encryption without destination authentication."
  },
  {
    "kind": "code",
    "text": "openssl s_client -connect api.exemplo.com:443 \\\n-servername api.exemplo.com -showcerts -verify_return_error"
  },
  {
    "kind": "paragraph",
    "text": "This command shows the sent string, the certificate selected by SNI, handshake details and verification result. It does not replace the exact behavior of all libraries, but it helps separate connectivity, TLS negotiation, and certificate validation."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.16 Client certificates and mTLS",
    "id": "8-16-client-certificates-and-mtls"
  },
  {
    "kind": "paragraph",
    "text": "In one-way TLS, only the server presents a certificate. In mTLS, the server requests the client's certificate and validates the presented string. The private key remains on the client and participates in the cryptographic proof during the handshake. The certificate can identify an application, partner or device, offering strong authentication across the channel."
  },
  {
    "kind": "paragraph",
    "text": "Authentication is not authorization. After validating the certificate, the gateway must map the identity to a policy: subject, SAN, fingerprint, serial, issuer, chain, OID or internal registration. Trusting any certificate issued by a broad CA may grant access to unintended principals. A dedicated client CA, EKU clientAuth, Name Constraints, and partner registrations reduce this risk."
  },
  {
    "kind": "paragraph",
    "text": "mTLS rotation requires overlap. Over a period of time, the server may need to accept old and new certificates or trust two intermediaries. The customer must install a new key and certificate before removing the old one. The process needs to consider rollback, multiple instances, caches, TLS sessions and partners that update at different speeds."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.17 Revocation by CRL",
    "id": "8-17-revocation-by-crl"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-09.svg",
    "alt": "Main models for obtaining certificate status",
    "caption": "Figure 8.9 - Main models for obtaining certificate status."
  },
  {
    "kind": "paragraph",
    "text": "A Certificate Revocation List is signed by a CA or authorized issuer and contains revoked certificates identified by serial, dates and reasons. The trusting party downloads the CRL, checks the signature and validity of the list and consults the serial. CRLs allow local processing and can work in disconnected environments, but they grow with the number of revocations and have a delay between publications."
  },
  {
    "kind": "paragraph",
    "text": "Delta CRLs can only carry changes from a base CRL. Distribution Points allow you to partition lists by scope. The project needs to define periodicity, nextUpdate, cache, unavailability and behavior when the CRL expires. An HTTP-accessible CRL does not need to be secret, but its authenticity depends on the signature. Repository availability can become critical dependency."
  },
  {
    "kind": "paragraph",
    "text": "Reasons for revocation include key compromise, change of affiliation, replacement, and cessation of operation. Some reasons affect incident analysis, but the consumer typically needs, at a minimum, to distinguish valid, revoked, and indeterminate status. Revoking an intermediary can invalidate a large set of certificates and requires coordination with trust stores and alternative chains."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.18 OCSP, stapling and short-term certificates",
    "id": "8-18-ocsp-stapling-and-short-term-certificates"
  },
  {
    "kind": "paragraph",
    "text": "OCSP allows you to query the status of a specific certificate without transferring an entire CRL. The request identifies issuer and serial number; the signed response states good, revoked or unknown, with production and validity times. Good means that the responder has no applicable revocation according to its scope; it is not a universal claim that identity or all other requirements are valid."
  },
  {
    "kind": "paragraph",
    "text": "Direct OCSP queries create availability dependency and can reveal when responding which services the client accesses. OCSP stapling allows the server to obtain a response and deliver it during the handshake, reducing latency and client exposure. The trusting party needs to verify the signature, times, and correspondence of the response. Soft-fail policies improve availability, but may accept a certificate when the status service is unavailable; hard-fail increases revocation security and unavailability risk."
  },
  {
    "kind": "paragraph",
    "text": "Short-term certificates reduce the exposure window and can operate without revocation information on specific profiles. RFC 9608 defines an extension to indicate no revocation available on certain certificates. This model requires reliable automation: if renewal fails, expiration arrives quickly. The decision between online and short-lived revocation depends on detection time, distribution time, criticality, availability and automation capacity."
  },
  {
    "kind": "subhead",
    "text": "State of Web PKI in July 2026"
  },
  {
    "kind": "paragraph",
    "text": "CA/Browser Forum public requirements now limit subscriber TLS certificates issued since March 15, 2026 to a maximum of 200 days. The official timeline calls for 100 days from March 15, 2027, and 47 days from March 15, 2029. These limits apply to public Web PKI; Private PKIs must set their own deadlines, but the trend reinforces automation and inventory."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.19 Formats and containers: DER, PEM, PKCS #12 and JKS",
    "id": "8-19-formats-and-containers-der-pem-pkcs-12-and-jks"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-10.svg",
    "alt": "Common certificate, chain, and key formats",
    "caption": "Figure 8.10 - Common formats for certificates, chains and keys."
  },
  {
    "kind": "paragraph",
    "text": "DER is the binary encoding of the ASN.1 object. PEM represents DER in Base64 with textual headers. .cer or .crt files can contain DER or PEM; the extension does not determine the format. A PEM file can also contain multiple certificates, a private key, parameters, or a CSR. Always inspect the content rather than relying on the name."
  },
  {
    "kind": "paragraph",
    "text": "PKCS #12, typically .p12 or .pfx, is a container that can carry private key, final certificate and chain, protected by password and integrity mechanisms. It is common in Windows, browsers, Java, and gateway products. An import may fail due to an unsupported protection algorithm, password, alias, missing private key, or incomplete string."
  },
  {
    "kind": "paragraph",
    "text": "JKS is a traditional Java keystore format. Modern versions of Java also use PKCS #12 as the default. Truststore and keystore have different conceptual roles: the first contains trusted anchors or certificates; the second contains local identities and private keys, although tools can store both. PKCS #11 is not a file format, but an interface for cryptographic modules such as HSMs and tokens."
  },
  {
    "kind": "code",
    "text": "# Inspect certificate\nopenssl x509 -in api.crt -noout -text"
  },
  {
    "kind": "code",
    "text": "# Inspect the CSR and verify its signature\nopenssl req -in api.csr -noout -text -verify"
  },
  {
    "kind": "code",
    "text": "# Inspect a PKCS#12 without exporting the key\nopenssl pkcs12 -in identidade.p12 -info -nokeys"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.20 Private key custody and HSM",
    "id": "8-20-private-key-custody-and-hsm"
  },
  {
    "kind": "paragraph",
    "text": "The certificate is public; the private key is the sensitive asset. Whoever obtains the key can impersonate the holder, sign messages or establish sessions according to authorized use. Protection needs to consider generation, storage, use, backup, transport, rotation, recovery and destruction. File permissions are just one layer and may be insufficient for CA keys or critical services."
  },
  {
    "kind": "paragraph",
    "text": "HSMs protect keys in validated hardware or modules and perform operations without exporting private material. KMSs provide central management, policies, auditing and integration, and can use HSM underneath. For roots, ceremonies, multi-factor authentication, quorum, and offline operation are common. For workloads, automation and machine identities reduce manual copies and static secrets."
  },
  {
    "kind": "paragraph",
    "text": "CA key backup is different from service ephemeral key backup. Losing a CA key may prevent issuance, revocation or continuity; copying it excessively increases risk. Signature keys may require archiving as per policy, while keys used for historical confidentiality may require retrieval. Each type of key needs a strategy compatible with its purpose and cryptographic period."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.21 Public PKI, Private PKI and Explicit Trust",
    "id": "8-21-public-pki-private-pki-and-explicit-trust"
  },
  {
    "kind": "paragraph",
    "text": "Public Web PKI is aimed at publicly verifiable names and trust distributed by browser and system root stores. Public CAs follow CA/Browser Forum requirements and root store programs. A private PKI serves internal identities, mTLS, devices and workloads, with roots distributed across the organization itself. Private certificates do not become externally trusted just by using X.509."
  },
  {
    "kind": "paragraph",
    "text": "The advantage of public PKI is interoperability with common clients. The private one offers namespace, profile, validity and issuance control. The cost is to distribute and govern trust. Installing a system-wide private root gives the CA broad power over many protocols; When possible, use application-specific trust stores and restricted intermediaries."
  },
  {
    "kind": "paragraph",
    "text": "Service self-signed certificates can work when the key is distributed over a trusted channel and explicitly pinned, but they don't scale well. They confuse rotation, inventory and validation. A private CA allows you to renew certificates while maintaining the anchor, separate roles, and revoke. However, a poorly protected private CA can magnify the impact rather than reduce it."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.22 Certificate Transparency, CAA and ACME",
    "id": "8-22-certificate-transparency-caa-and-acme"
  },
  {
    "kind": "paragraph",
    "text": "Certificate Transparency creates append-only public logs for PKI web certificates, allowing you to detect improper issuance and increase auditability. Precertificates and Signed Certificate Timestamps are part of this ecosystem. CT does not replace chain validation or revocation, but it makes emissions observable and allows for domain monitoring."
  },
  {
    "kind": "paragraph",
    "text": "CAA is a DNS record by which the owner of a domain can indicate which CAs are authorized to issue certificates for it. The public CA consults the CAA according to the applicable requirements. CAA reduces certain undue emissions, but does not protect an already compromised private key and does not replace domain control or monitoring."
  },
  {
    "kind": "paragraph",
    "text": "ACME, defined in RFC 8555, automates account creation, requests, challenges, finalization, and obtaining certificates. Challenges demonstrate control over identifiers. Automation reduces manual errors and enables tight turnarounds, but account credentials, DNS permissions, agents, and pipelines become critical assets. An attacker with access to the validation mechanism could issue legitimate certificates for malicious use."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.23 Rotation without unavailability",
    "id": "8-23-rotation-without-unavailability"
  },
  {
    "kind": "paragraph",
    "text": "Rotation is not just replacing a file. It is necessary to identify all points that terminate TLS or present a certificate: load balancers, gateway listeners, ingress controllers, backends, jobs, clients and recovery environments. The inventory must record holder, issuer, SAN, serial number, fingerprint, validity, location, owner and renewal process."
  },
  {
    "kind": "paragraph",
    "text": "A safe strategy uses overlap. For server certificates, deploy the new certificate and confirm that all instances display it before removing the old one. To change AC, first distribute the new anchor or intermediary to consumers; then issue and present the new string; Lastly remove old trust. Reversing the order causes chain failures. Automation needs observability. Monitoring only the expiration date in the repository does not guarantee that the active listener has been updated. External tests must open handshake, verify serial and string, and cover each endpoint and region. Alerts should consider correction time, change windows and partner dependencies, not just warn on the last day."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.24 Certificates in API Gateways and TLS multiple hops",
    "id": "8-24-certificates-in-api-gateways-and-tls-multiple-hops"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-11.svg",
    "alt": "Independent certificates and trust stores at each hop of an API architecture",
    "caption": "Figure 8.11 - Independent certificates and trust stores at each hop of an API architecture."
  },
  {
    "kind": "paragraph",
    "text": "In an architecture with client, balancer, API Gateway and backend, each TLS connection is independent. The balancer can present a certificate to the client and use another identity to talk to the gateway. The gateway can validate the backend CA and, in mTLS, present its own client certificate. Diagnosing “the API certificate” without indicating the jump leads to wrong conclusions."
  },
  {
    "kind": "paragraph",
    "text": "In Axway API Gateway, policies can check strings, query CRLs, and apply validation filters. The product also maintains certificates and keys used by listeners, signing, and outgoing connections. The configuration must separate trusted certificates from private key identities, define revocation sources, and protect cryptographic material. Logs must indicate in which filter and at which stage the validation failed."
  },
  {
    "kind": "paragraph",
    "text": "In Azure API Management, certificates can be used to authenticate clients to incoming traffic, authenticate APIM to backends, and add custom CAs for backend validation. Policies can examine properties of the presented certificate. In topologies with Application Gateway or another proxy at the front, it is essential to know where TLS ends and whether the client certificate reaches the APIM cryptographically or is transformed into trusted metadata by a previous layer."
  },
  {
    "kind": "subhead",
    "text": "Operating principle"
  },
  {
    "kind": "paragraph",
    "text": "Never treat subject, fingerprint or a certified header as sufficient proof without ensuring the authenticity of the channel carrying that information. When a proxy terminates mTLS, the next hop needs to authenticate the proxy and protect the metadata from injection or overwriting."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.25 Structured troubleshooting",
    "id": "8-25-structured-troubleshooting"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/digital-certificates/en/figure-12.svg",
    "alt": "Starting tree for diagnosing certificate failures",
    "caption": "Figure 8.12 - Initial tree for diagnosing certificate failures."
  },
  {
    "kind": "paragraph",
    "text": "Start by identifying the role and jump: external server certificate, client certificate, backend gateway certificate, or certificate from a CA. Capture the hostname, SNI, port, received string, effective trust store, system time and revocation policy. Generic messages like unable to get local issuer certificate or certificate unknown describe symptoms, not necessarily the root cause."
  },
  {
    "kind": "paragraph",
    "text": "Timing failures include expired certificate, not yet valid certificate, CRL or OCSP out of window, and incorrect clock. Identity failures include missing SAN, mismatched wildcard, IP access, and wrong SNI. Chain failures include unsent intermediate, missing root, mismatched AKI/SKI, invalid signature, and untrusted alternate path. Usage failures include Basic Constraints, Key Usage, EKU, or unsupported critical extension."
  },
  {
    "kind": "paragraph",
    "text": "After reproducing, compare behavior between tools. OpenSSL can use a different root set than the JVM, Windows, or appliance. A test that works with explicit -CAfile proves that the string can be validated with that anchor, not that the product is configured to use it. Also check that the certificate and private key match and that the active instance has loaded the new version."
  },
  {
    "kind": "table",
    "caption": "Frequent certificate symptoms and initial checks.",
    "headers": [
      "Symptom",
      "Probable causes",
      "Verification"
    ],
    "rows": [
      [
        "Hostname mismatch",
        "Incorrect SAN, wrong SNI, IP access.",
        "Inspect SAN and repeat handshake with correct SNI."
      ],
      [
        "Unknown CA",
        "Missing root, wrong trust store, private CA.",
        "List effective anchors and validate with explicit CAfile."
      ],
      [
        "Unable to get issuer",
        "Intermediate not sent or AIA inaccessible.",
        "Examine delivered chain and install intermediary."
      ],
      [
        "Certificate expired",
        "Listener still uses old version or wrong clock.",
        "Check serial presented by each instance and time."
      ],
      [
        "Unsupported certificate purpose",
        "EKU/KU incompatible.",
        "Inspect extensions and emission profile."
      ],
      [
        "Revocation check failed",
        "CRL/OCSP unavailable, expired or invalid response.",
        "Test endpoint, cache, nextUpdate and fail policy."
      ],
      [
        "Private key mismatch",
        "Certificate imported without the corresponding key.",
        "Compare derived public key and keystore alias."
      ]
    ]
  },
  {
    "kind": "code",
    "text": "# Validate the chain with an explicit root and intermediate\nopenssl verify -CAfile raiz.pem -untrusted intermediaria.pem servidor.pem"
  },
  {
    "kind": "code",
    "text": "# Show dates, serial, issuer, subject and SAN\nopenssl x509 -in servidor.pem -noout \\\n-dates -serial -issuer -subject -ext subjectAltName"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.26 Case studies",
    "id": "8-26-case-studies"
  },
  {
    "kind": "paragraph",
    "text": "Case 1 - incomplete chain after renewal. A gateway receives a new server certificate issued by another intermediary. The team only replaces the final certificate but keeps the old chain. Browsers that recover the intermediary via AIA work; a Java partner fails. The fix is ​​to install and present the new chain, validate on clients without AIA and inventory the association between final and intermediate certificates."
  },
  {
    "kind": "paragraph",
    "text": "Case 2 - Valid mTLS, improper authorization. The gateway trusts a corporate CA that issues certificates for thousands of users and applications. The policy accepts any valid string and uses only the organizationName. A certificate that is legitimate, but not intended for the partner, gains access. The solution involves a dedicated CA or intermediary, EKU clientAuth, SAN or stable identifier, authorization registration and operational revocation."
  },
  {
    "kind": "paragraph",
    "text": "Case 3 - backend renewal causes 502. The backend certificate changes from a public CA to a private CA. The gateway continues with the old trust store and rejects the outgoing handshake. For the client, the symptom is a gateway error. The analysis needs to separate inbound and outbound TLS, catch the backend error, install the new CA in advance, and maintain overlap during the migration."
  },
  {
    "kind": "paragraph",
    "text": "Case 4 - certificate apparently expired. The repository contains the new certificate, but a cluster instance has not reloaded the configuration and continues to display the old one. Monitors alternate between success and failure. The solution is to check serial and fingerprint per node, remove inconsistent instance, correct rollout and include active handshake testing in the deployment process."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "8.27 Hands-on labs",
    "id": "8-27-hands-on-labs"
  },
  {
    "kind": "paragraph",
    "text": "Laboratory 1 - certificate reading. Obtain a lab certificate, run openssl x509 -text and identify version, serial, signature algorithm, issuer, validity, subject, public key, SAN, Basic Constraints, KU, EKU, SKI, AKI, AIA and CRL Distribution Points. Explain what identity is asserted and what uses are permitted."
  },
  {
    "kind": "paragraph",
    "text": "Lab 2 - Simple private CA. In a disposable environment, create a root and an intermediate, issue a server certificate with SAN and validate the chain. Compare validation when intermediate is omitted. Do not reuse laboratory keys on real systems; the goal is to observe structure and flow, not build a production PKI."
  },
  {
    "kind": "paragraph",
    "text": "Lab 3 - hostname error. Issue a certificate for api.lab.local and present it in a service accessed by another name. Note that the chain may be trusted and the signature correct, but the identity fails. Then repeat with correct SAN. Record the difference between trust in issuer and name match."
  },
  {
    "kind": "paragraph",
    "text": "Lab 4 - PKCS #12. Package key, final and intermediate certificate in a .p12. Import into a test keystore, list aliases, and confirm that the entry contains a private key. Create a version without the intermediary and compare the server behavior. This exercise reproduces a common cause of failures after renewal. Lab 5 - endpoint diagnostics. Use s_client with SNI, capture the string and run verify with an explicit trust store. Compare the result with curl or a JVM. Document which trust store each tool uses and why results might differ."
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
      "Digital certificate associates a public key with the identity, period, uses and restrictions under the signature of an issuer.",
      "PKI includes governance, identity validation, CAs, RAs, repositories, auditing, key protection, and incident response.",
      "X.509 v3 uses extensions for names, authority, uses, policies, chaining, and status; unknown critical extensions invalidate the path.",
      "Building a chain is finding a path; to validate is to apply signatures, time, restrictions, uses, policies, names and revocation.",
      "Trust at the root is administrative. The fact that a root certificate is self-signed does not automatically create trust.",
      "CSR proves possession of the corresponding key, but does not prove the declared identity; the CA must apply validation and profiling.",
      "CRL, OCSP, stapling, and short certificates represent different tradeoffs between freshness, privacy, and availability.",
      "DER, PEM, PKCS #12 and JKS have different roles; File extension does not guarantee content or presence of private key.",
      "In gateways, each TLS hop has its own identity, chain and trust store. Troubleshooting must name the exact jump.",
      "Secure rotation depends on inventory, overlay, automation, observability, and testing of the certificate actually presented."
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
      "Explain why an isolated public key is not sufficient to authenticate a server.",
      "Differentiate between CA, RA, holder, relying party and repository.",
      "Which parts of a certificate are signed by the CA?",
      "Explain the difference between X.509, ASN.1, DER and PEM.",
      "Why is SAN essential for hostname validation?",
      "What is the difference between Basic Constraints, Key Usage and Extended Key Usage?",
      "How do SKI and AKI help build the chain?",
      "Why doesn't finding a chain to a root mean the certificate is valid?",
      "What does a CSR signature prove and what does it not prove?",
      "Compare CRL, OCSP, OCSP stapling and short-term certificates.",
      "Why shouldn't the root normally be sent by the server during the handshake?",
      "What is the difference between truststore and keystore?",
      "Describe a rotation strategy when the intermediate CA will also be replaced.",
      "In mTLS, why is validating the string not enough to authorize the call?",
      "A certificate has a valid chain, serverAuth and correct validity, but access fails by hostname. Explain.",
      "How does a load balancer in front of a gateway change certificate parsing?",
      "What risks arise when an organization installs its private root in the servers' global trust store?",
      "Create a checklist to diagnose unable to get local issuer certificate.",
      "Explain why monitoring only files in the repository does not guarantee successful renewal.",
      "Propose a CA architecture for production, approval, server certificates and client certificates."
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
    "caption": "Glossary of digital certificates, PKI and X.509.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "AKI",
        "Authority Key Identifier; helps identify the sender key."
      ],
      [
        "Trust Anchor",
        "Key or certificate configured as the initial point of trust."
      ],
      [
        "HERE",
        "Certification Authority; entity that signs certificates and status data."
      ],
      [
        "CRL",
        "Signed list of revoked certificates."
      ],
      [
        "CSR",
        "Certificate request that includes public key and proof of ownership."
      ],
      [
        "DER",
        "Deterministic binary encoding for ASN.1 structures."
      ],
      [
        "DN",
        "Distinguished Name composed of name attributes."
      ],
      [
        "EKU",
        "Extended Key Usage; authorized application purposes."
      ],
      [
        "HSM",
        "Module that protects keys and performs cryptographic operations."
      ],
      [
        "OCSP",
        "Certificate status online query protocol."
      ],
      [
        "OID",
        "Numeric object identifier used in algorithms, extensions, and policies."
      ],
      [
        "PEM",
        "Base64 textual representation with headers."
      ],
      [
        "PKCS #12",
        "Container that can store private key, certificate and chain."
      ],
      [
        "FROG",
        "Registration Authority; validates data and approves issuance."
      ],
      [
        "SAN",
        "Subject Alternative Name; names and identifiers linked to the certificate."
      ],
      [
        "SKI",
        "Subject Key Identifier; certificate public key identifier."
      ],
      [
        "Trust store",
        "Set of trusted anchors and certificates for validation."
      ],
      [
        "X.509",
        "Standard for certificates, CRLs and related structures."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Official references and recommended reading",
    "id": "official-references-and-recommended-reading"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile",
      "RFC 6818 - Updates to RFC 5280",
      "RFC 9618 - Updates to X.509 Policy Validation",
      "RFC 2986 - PKCS #10 Certification Request Syntax",
      "RFC 6960 - Online Certificate Status Protocol",
      "RFC 9608 - No Revocation Available for X.509 Certificates",
      "RFC 8555 - Automatic Certificate Management Environment",
      "RFC 9162 - Certificate Transparency Version 2.0",
      "RFC 8659 - DNS Certification Authority Authorization",
      "NIST SP 800-57 Part 1 Rev. 5 - Recommendation for Key Management",
      "CA/Browser Forum - Baseline Requirements for TLS Server Certificates",
      "Microsoft - Secure APIs using client certificate authentication in API Management",
      "Microsoft - Secure API Management backend using client certificates",
      "Microsoft - Add a custom CA certificate to API Management",
      "Axway - Certificate validation filters",
      "Axway - API Gateway administration and certificate chain checks"
    ]
  },
  {
    "kind": "subhead",
    "text": "Note on regulatory update"
  },
  {
    "kind": "paragraph",
    "text": "RFC 5280 remains the basis of the PKIX profile, but receives updates and interacts with later standards. Web PKI requirements and product documentation change over time. When applying content in production, confirm the current version of the CA policies, CA/Browser Forum, runtime, and gateway used."
  }
];
