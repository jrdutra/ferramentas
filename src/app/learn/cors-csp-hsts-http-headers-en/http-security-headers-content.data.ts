import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.
export const HTTP_SECURITY_HEADERS_EN_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Headers as declarative policies between server, gateway and browser"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/en/overview.svg",
    "alt": "CORS, CSP, HSTS and other headers as declarative layers of protection",
    "caption": "Opening figure - Headers form a declarative layer of protection, but they act on different problems."
  },
  {
    "kind": "subhead",
    "text": "Central principle"
  },
  {
    "kind": "paragraph",
    "text": "Headers do not correct authorization, authentication or business logic; they govern behavior of customers and intermediaries."
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
    "text": "The previous chapter presented the OWASP API Security Top 10 and showed that protecting an API depends on distributed controls between client, browser, gateway, backend, identity, network and operation. This chapter delves into a specific part of that defense: the HTTP headers that instruct browsers and intermediaries how to handle origins, executable content, secure transport, context isolation, privacy, and caching."
  },
  {
    "kind": "paragraph",
    "text": "CORS, CSP, and HSTS are often grouped together as security headers, but they solve very different problems. CORS defines when a browser can expose a response obtained from another source to a web application. CSP limits script fonts, styles, frames, connections and other resources, reducing the impact of content injection. HSTS instructs the browser to use HTTPS for a host during a defined period of time. None of them replace authentication, authorization, data validation or fixing vulnerabilities on the backend."
  },
  {
    "kind": "paragraph",
    "text": "Other headers complement this model. Referrer-Policy limits the information sent on Referer; Permissions-Policy controls browser resources; X-Content-Type-Options reduces unexpected MIME interpretations; frame-ancestors and X-Frame-Options handle embedding in frames; COOP, COEP and CORP participate in cross-origin isolation; Cache-Control protects sensitive responses from improper storage; Cookie attributes reduce exposure to scripts, insecure transport and cross-site requests."
  },
  {
    "kind": "paragraph",
    "text": "The goal is to build an accurate mental model for implementation and troubleshooting. The reader should know how to distinguish an actual API failure from a browser decision, recognize configuration errors in API Gateways and CDNs, plan secure rollout of restrictive policies, and test protections without relying solely on automatic scanners."
  },
  {
    "kind": "subhead",
    "text": "How to study this chapter"
  },
  {
    "kind": "paragraph",
    "text": "For each header, identify five elements: who sends, who applies, what asset protects, what threat mitigates, and what legitimate behavior can be broken. This analysis avoids the dangerous practice of copying a set of headers without understanding their effects."
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
      "Explain origin, site, same-origin policy, and browser security boundary.",
      "Describe simple CORS requests, preflight, credentials and preflight cache.",
      "Correctly configure Access-Control-Allow-Origin and related headers.",
      "Differentiate CORS from authentication, CSRF, firewall and server-server security.",
      "Design Content Security Policy with directives, nonces, hashes and report-only deployment.",
      "Understand HSTS, includeSubDomains, preload and incorrect rollout risks.",
      "Apply X-Content-Type-Options, frame-ancestors, Referrer-Policy and Permissions-Policy.",
      "Relate COOP, COEP and CORP to cross-origin isolation.",
      "Set Cache-Control and cookie attributes for sensitive responses and sessions.",
      "Implement, test and observe headers in applications, gateways and CDNs."
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
      "26.1 Browser Security Model and Declarative Headers",
      "26.2 Origin, website and Same-Origin Policy",
      "26.3 CORS: purpose and decision flow",
      "26.4 Simple and preflight requests",
      "26.5 CORS request and response headers",
      "26.6 Credentials, cookies, Authorization and wildcards",
      "26.7 CORS in API Gateways and frequent errors",
      "26.8 Content Security Policy: model and directives",
      "26.9 Nonces, hashes, strict-dynamic and inline scripts",
      "26.10 Reporting and gradual implementation of CSP",
      "26.11 HTTP Strict Transport Security",
      "26.12 Clickjacking, MIME sniffing and frame protection",
      "26.13 Referrer-Policy and Permissions-Policy",
      "26.14 COOP, COEP and CORP",
      "26.15 Cache-Control, Clear-Site-Data and cookies",
      "26.16 Obsolete headers, troubleshooting and labs",
      "Summary, checklist, exercises, glossary and references"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.1 Browser Security Model and Declarative Headers",
    "id": "26-1-browser-security-model-and-declarative-headers"
  },
  {
    "kind": "paragraph",
    "text": "Browsers run code provided by multiple sources and need to prevent a malicious page from reading data from another application just because the user is authenticated there. This protection is not implemented by a single mechanism. The Same-Origin Policy establishes a basic boundary; CORS allows controlled exceptions; CSP restricts the content that can be loaded or executed; cookies have their own attributes; and isolation policies reduce sharing between contexts."
  },
  {
    "kind": "paragraph",
    "text": "Security headers are declarative: the server sends a policy and the compliant agent decides how to apply it. This creates an important difference between browser security and API security. A client written in Java, Python, or curl can completely ignore CORS and CSP, because these mechanisms were not designed as universal access control. The API still needs to validate credentials, authorization, schema and business rules on every request."
  },
  {
    "kind": "paragraph",
    "text": "The gateway is an efficient point for standardizing headers, but it does not automatically know all of the application's needs. A suitable CSP depends on the scripts, frames and connections actually used by each front-end. CORS depends on consumer origins and credential policy. Cache-Control depends on sensitivity and shareability. Therefore, the platform can provide defaults and guardrails, while the product maintains ownership of the specific policy."
  },
  {
    "kind": "subhead",
    "text": "Essential distinction"
  },
  {
    "kind": "paragraph",
    "text": "CORS does not protect the API against external calls; it controls whether a browser delivers the response to JavaScript from another source. An attacker or server-server system is still able to send the request. Authorization and protection from abuse remain mandatory."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.2 Origin, website and Same-Origin Policy",
    "id": "26-2-origin-website-and-same-origin-policy"
  },
  {
    "kind": "paragraph",
    "text": "A source is conceptually defined by the trio of schema, host and port. https://app.empresa.com and https://api.empresa.com have different hosts and therefore different origins. https://app.empresa.com and http://app.empresa.com differ in schema. https://app.empresa.com:443 and https://app.empresa.com:8443 differ in port. The URL path does not participate in the origin."
  },
  {
    "kind": "paragraph",
    "text": "The concept of a website is related, but not identical. Mechanisms like SameSite in cookies work with the notion of site, while CORS uses origin. Two subdomains can be same-site and even cross-origin. This difference explains scenarios where a cookie is sent but JavaScript cannot read the response because the CORS policy did not authorize the origin."
  },
  {
    "kind": "paragraph",
    "text": "The Same-Origin Policy limits reading and interaction between contexts of different origins. It does not prevent all cross-origin data sending: forms, images, links and other resources historically make requests. The main protection is in restricting the script's ability to observe content and manipulate objects from another source. CORS is the protocol that allows the server to declare controlled exceptions for certain operations."
  },
  {
    "kind": "table",
    "caption": "Table 1 - Source is determined by scheme, host, and port, not path.",
    "headers": [
      "URL A",
      "URLB",
      "Same origin?",
      "Reason"
    ],
    "rows": [
      [
        "https://app.example.com",
        "https://app.exemplo.com/perfil",
        "Yes",
        "Same scheme, host and port."
      ],
      [
        "https://app.example.com",
        "https://api.exemplo.com",
        "No",
        "Different host."
      ],
      [
        "http://app.example.com",
        "https://app.example.com",
        "No",
        "Different scheme."
      ],
      [
        "https://app.example.com",
        "https://app.exemplo.com:8443",
        "No",
        "Different port."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.3 CORS: purpose and decision flow",
    "id": "26-3-cors-purpose-and-decision-flow"
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin Resource Sharing is a protocol integrated into the browser's fetch model. When a script tries to access an API from another origin, the browser appends the Origin header. The response must contain headers that indicate whether that source, method, set of headers, and use of credentials are allowed. When the policy does not match, the request can even reach the server, but the response is not made available to JavaScript."
  },
  {
    "kind": "paragraph",
    "text": "This feature produces a frequent symptom: the backend records success, the gateway returns 200, but the browser console shows CORS error. There is no contradiction. The server processed the operation; the browser blocked the response from being displayed. Therefore, operations with side effects cannot depend on CORS as protection against CSRF or improper actions."
  },
  {
    "kind": "paragraph",
    "text": "The browser can directly send the request when it meets the criteria for a simple CORS request. In other situations, preflight with OPTIONS. Preflight asks the server whether the intended method and headers are accepted before sending the actual operation. The positive response may be stored in a specific browser cache for a limited period of time."
  },
  {
    "kind": "subhead",
    "text": "CORS with preflight: browser negotiates before sending the actual operation"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/en/figure-01-cors-preflight.svg",
    "alt": "Browser negotiating preflight OPTIONS with API before the actual request",
    "caption": "Figure 1 - Preflight negotiates permission; The final decision to display the response belongs to the browser."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.4 Simple and preflight requests",
    "id": "26-4-simple-and-preflight-requests"
  },
  {
    "kind": "paragraph",
    "text": "The term simple request does not mean that the operation is safe for the business. It indicates that the browser can send it without preflight to maintain compatibility with historical Web standards. Methods such as GET, HEAD and POST can participate when the headers and Content-Type remain within the set allowed by the protocol. A POST application/json, for example, normally causes preflight."
  },
  {
    "kind": "paragraph",
    "text": "Preflight uses OPTIONS and includes Access-Control-Request-Method. If the script intends to send unsafelisted headers, the browser also includes Access-Control-Request-Headers. The server responds with authorized methods and headers. The actual request is only released when the response satisfies the browser's checks."
  },
  {
    "kind": "paragraph",
    "text": "Preflight is not authentication. Some architectures make the mistake of requiring a token in OPTIONS or forwarding preflight to backends that don't know CORS. Since preflight is a policy query performed before the actual request, gateways usually treat it specifically. However, responding permissively to any source and method also creates risk; policy needs to be derived from trusted configuration."
  },
  {
    "kind": "subhead",
    "text": "Preflight and response example"
  },
  {
    "kind": "code",
    "text": "OPTIONS /clientes/123 HTTP/1.1\nHost: api.empresa.example\nOrigin: https://portal.empresa.example\nAccess-Control-Request-Method: PUT\nAccess-Control-Request-Headers: authorization, content-type\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://portal.empresa.example\nAccess-Control-Allow-Methods: GET, PUT\nAccess-Control-Allow-Headers: Authorization, Content-Type\nAccess-Control-Max-Age: 600\nVary: Origin"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.5 CORS request and response headers",
    "id": "26-5-cors-request-and-response-headers"
  },
  {
    "kind": "paragraph",
    "text": "Origin identifies the origin of the context that initiated the request. Access-Control-Allow-Origin tells you which origin is authorized to read the response. The value can be a specific origin or wildcard in non-credential scenarios. When the allowlist is dynamic, the server must validate the received value against an allowlist and return exactly the approved source, never reflecting any value without checking."
  },
  {
    "kind": "paragraph",
    "text": "Access-Control-Allow-Methods and Access-Control-Allow-Headers mainly participate in preflight. Access-Control-Expose-Headers allows JavaScript to read response headers that do not belong to the set exposed by default. Access-Control-Max-Age influences preflight cache, subject to browser limits. Access-Control-Allow-Credentials allows credentialed responses when combined with an explicit source."
  },
  {
    "kind": "paragraph",
    "text": "Vary: Origin is important when the response can change depending on the requesting origin and passes through shared caches. Without this indication, a cache may reuse a response that contains a specific Access-Control-Allow-Origin for another origin. On platforms with a CDN or gateway, the cache key and CORS policy must be designed together."
  },
  {
    "kind": "table",
    "caption": "Table 2 - The CORS set forms a negotiation protocol, not an isolated header.",
    "headers": [
      "Header",
      "Direction",
      "Function"
    ],
    "rows": [
      [
        "Origin",
        "Request",
        "Identifies the origin of the requesting context."
      ],
      [
        "Access-Control-Allow-Origin",
        "Response",
        "Authorizes a source or, in limited cases, the wildcard."
      ],
      [
        "Access-Control-Allow-Methods",
        "preflight response",
        "Declares allowed methods."
      ],
      [
        "Access-Control-Allow-Headers",
        "preflight response",
        "Declares headers allowed in the actual request."
      ],
      [
        "Access-Control-Expose-Headers",
        "Response",
        "Exposes additional headers to JavaScript."
      ],
      [
        "Access-Control-Allow-Credentials",
        "Response",
        "Allows response with credentials in CORS context."
      ],
      [
        "Access-Control-Max-Age",
        "preflight response",
        "Controls preflight cache duration."
      ]
    ]
  },
  {
    "kind": "paragraph",
    "text": "A credentialed request can involve cookies, client certificates, or agent-controlled HTTP credentials. In fetch, credentials mode determines whether credentials are sent and whether responses with Set-Cookie are considered. For JavaScript to receive a credentialed cross-origin response, the server needs to return Access-Control-Allow-Credentials: true and an explicit origin."
  },
  {
    "kind": "paragraph",
    "text": "The wildcard in Access-Control-Allow-Origin cannot be used to expose credentialed responses. This restriction reduces the risk of an arbitrary website reading data associated with the user's session. It is also inappropriate to generate Access-Control-Allow-Origin by copying the received Origin without validation. Unrestricted reflection turns policy into universal authorization in disguise."
  },
  {
    "kind": "paragraph",
    "text": "CORS and SameSite cookie attributes are related but not equivalent. The cookie may not be sent because of SameSite, Secure, or third-party rules before CORS is even evaluated. In another scenario, the cookie is sent and the server processes the request, but the browser blocks reading the response. Diagnosis needs to look at cookie sending, preflight, actual response and browser console separately."
  },
  {
    "kind": "subhead",
    "text": "Rule of thumb"
  },
  {
    "kind": "paragraph",
    "text": "For cookie-based session APIs, treat CORS, SameSite, CSRF, and origin policy as supplemental controls. For APIs with a bearer token, validate token and authorization normally; The fact that the browser requires preflight does not make the endpoint secure from clients outside the browser."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.7 CORS in API Gateways and frequent errors",
    "id": "26-7-cors-in-api-gateways-and-frequent-errors"
  },
  {
    "kind": "paragraph",
    "text": "API Gateways can centralize CORS, respond preflight without reaching the backend, and apply allowlists by environment, product, or API. This centralization reduces duplication, but requires defining ownership. If gateway and backend add different headers, the response may contain duplicate or contradictory values. Some browsers reject responses with multiple Access-Control-Allow-Origin."
  },
  {
    "kind": "paragraph",
    "text": "The policy must also be applied to error responses. An API that returns CORS only in 2xx can cause the browser to hide the body of 401, 403 or 500, making diagnosis and customer experience difficult. The on-error section or equivalent of the gateway needs to produce the same relevant headers without opening additional permissions."
  },
  {
    "kind": "paragraph",
    "text": "Another common mistake is allowing sources via insecure textual comparison. Tests like endsWith(\"company.com\") can accept malicious domains. The value needs to be interpreted as origin and compared with exact allowlist or carefully defined subdomain rule. Regular expressions must be anchored and tested against schemas, ports, case normalization, and null sources when applicable."
  },
  {
    "kind": "table",
    "caption": "Table 3 - CORS errors are often architectural errors and not just syntax errors.",
    "headers": [
      "Failure",
      "Symptom",
      "Correction"
    ],
    "rows": [
      [
        "OPTIONS requires authentication",
        "Preflight returns 401 before the actual call.",
        "Treat OPTIONS according to CORS policy and not as a business operation."
      ],
      [
        "CORS only in 2xx responses",
        "Frontend sees generic error.",
        "Also apply headers to the error flow."
      ],
      [
        "Origin reflected without validation",
        "Any website receives permission.",
        "Compare with trusted allowlist."
      ],
      [
        "Gateway and backend duplicate headers",
        "Browser rejects ambiguous response.",
        "Define a single emission point."
      ],
      [
        "No Vary: Origin cached",
        "Origin receives policy from another origin.",
        "Adjust Vary and cache key."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.8 Content Security Policy: model and directives",
    "id": "26-8-content-security-policy-model-and-directives"
  },
  {
    "kind": "paragraph",
    "text": "Content Security Policy defines restrictions on the resources that a page can load or run. The policy can be sent in the Content-Security-Policy header or, in specific cases, by meta element. The header has greater scope and is the preferred form for complete policies. CSP does not fix the vulnerability that allowed the injection, but it can reduce what the injected content can do."
  },
  {
    "kind": "paragraph",
    "text": "Directives are specialized. default-src provides fallback for various resource types. script-src controls scripts; style-src controls styles; img-src images; connect-src connections made by fetch, XHR, WebSocket and related mechanisms; font-src fonts; frame-src content loaded in frames; frame-ancestors define who can embed the page; object-src controls plugins; base-uri restricts the base URL; form-action limits form targets."
  },
  {
    "kind": "paragraph",
    "text": "A policy must be minimal and compatible with actual application. Widely authorizing https: or using unsafe-inline and unsafe-eval reduces protection. At the same time, blocking resources without inventory can break legitimate login, telemetry, fonts, integrations, and functionality. Therefore, CSP must be built from inventory, testing and observation, not copied from another application."
  },
  {
    "kind": "subhead",
    "text": "CSP: each resource is compared with the policy before being loaded or executed"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/en/figure-02-csp-resources.svg",
    "alt": "HTML document using CSP directives to control scripts, frames and connections",
    "caption": "Figure 2 - The policy compares each resource type with the corresponding policy."
  },
  {
    "kind": "subhead",
    "text": "Restrictive CSP Policy Example"
  },
  {
    "kind": "code",
    "text": "Content-Security-Policy:\n  default-src 'none';\n  script-src 'self' 'nonce-R4nd0mBase64';\n  style-src 'self';\n  img-src 'self' data:;\n  connect-src 'self' https://api.empresa.example;\n  frame-ancestors 'none';\n  base-uri 'none';\n  form-action 'self'"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.9 Nonces, hashes, strict-dynamic and inline scripts",
    "id": "26-9-nonces-hashes-strict-dynamic-and-inline-scripts"
  },
  {
    "kind": "paragraph",
    "text": "Inline scripts are a major source of risk because an HTML injection can turn into JavaScript execution. Removing inline scripts and serving static files is the simplest solution when possible. When the application requires inline scripting, a cryptographically unpredictable nonce can be generated per response and included in both the CSP and the authorized script element."
  },
  {
    "kind": "paragraph",
    "text": "Hashes allow you to authorize inline content whose text is known and stable. The browser calculates the hash of the block and compares it with the policy value. Small changes to the content require re-hashing. Nonces are best suited for dynamic content, as long as they are not reused or automatically inserted into user-controlled content."
  },
  {
    "kind": "paragraph",
    "text": "strict-dynamic allows trusted scripts loaded by nonce or hash to propagate trust to scripts they add, reducing dependency on host allowlists. This strategy requires compatibility testing and understanding of the application bootstrap. unsafe-inline and unsafe-eval should be treated as temporary leases with a removal plan, not as a default configuration."
  },
  {
    "kind": "table",
    "caption": "Table 4 - Nonces and hashes allow reducing dependence on unsafe-inline.",
    "headers": [
      "Mechanism",
      "When to use",
      "Main care"
    ],
    "rows": [
      [
        "External file in self",
        "Application controls the scripts on the host itself.",
        "Host compromise still compromises scripts."
      ],
      [
        "Nonce",
        "Response-authorized dynamic inline scripting.",
        "Generate unpredictable and unique value per response."
      ],
      [
        "Hash",
        "Stable and well-known inline block.",
        "Any change requires updating the hash."
      ],
      [
        "strict-dynamic",
        "Reliable Bootstrap loads dependencies.",
        "Validate compatibility and chain of trust."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.10 Reporting and gradual implementation of CSP",
    "id": "26-10-reporting-and-gradual-implementation-of-csp"
  },
  {
    "kind": "paragraph",
    "text": "Content-Security-Policy-Report-Only allows you to observe violations without blocking resources. It's useful for inventorying dependencies and discovering inline code, third-party domains, and undocumented flows. However, report-only does not protect the user; it is an implementation stage. A mature organization sets a deadline for turning observations into effective policy."
  },
  {
    "kind": "paragraph",
    "text": "Reports may contain sensitive URLs and information. The collection endpoint needs volume control, retention, and privacy. Events should be aggregated by policy, origin, and application version to distinguish attacks, browser extensions, noise, and actual regressions. Effective policy and observation policy can coexist, allowing progressive hardening."
  },
  {
    "kind": "paragraph",
    "text": "The recommended rollout starts with inventory, goes through report-only, fixes legitimate violations, blocks lower-risk policies, and progresses to restrictive policy. CSP changes must participate in the pipeline and be tested with critical journeys, because an incorrect header can make the entire front-end unavailable even if the API remains healthy."
  },
  {
    "kind": "subhead",
    "text": "CSP is not trusted domain list"
  },
  {
    "kind": "paragraph",
    "text": "Authorizing a domain means accepting all content it can serve in that context. Shared CDNs, upload endpoints, and third-party services expand the surface. Prefer specific nonces, hashes, and sources over overly broad allowlists."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.11 HTTP Strict Transport Security",
    "id": "26-11-http-strict-transport-security"
  },
  {
    "kind": "paragraph",
    "text": "HTTP Strict Transport Security allows a host to declare that it should only be accessed via HTTPS. The browser stores the received policy in a valid HTTPS connection and, during max-age, transforms HTTP attempts to HTTPS before sending the request over the network. This reduces exposure to TLS downgrade and removal attacks after the host has been known to be secure."
  },
  {
    "kind": "paragraph",
    "text": "The header has the max-age directive and can include includeSubDomains. The latter extends the policy to subdomains and requires full inventory: any subdomain without functional HTTPS may become inaccessible. The preload directive is used as a signal of intent to preload programs, but actual inclusion depends on requirements and processes external to the protocol."
  },
  {
    "kind": "paragraph",
    "text": "HSTS does not fix expired certificate, incorrect hostname or invalid string. Instead, the browser must fail hard and not offer unsafe downgrade. First access remains a consideration when the host is not yet in the HSTS state; preload may reduce this window, but increases the long-term operational commitment."
  },
  {
    "kind": "subhead",
    "text": "HSTS changes future browser decisions to a known host"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/http-security-headers/en/figure-03-hsts.svg",
    "alt": "Browser learning HSTS and promoting HTTP to HTTPS",
    "caption": "Figure 3 - Once learned, HSTS makes the browser prefer HTTPS and reject downgrade."
  },
  {
    "kind": "subhead",
    "text": "Examples of HSTS"
  },
  {
    "kind": "code",
    "text": "Strict-Transport-Security: max-age=31536000; includeSubDomains\n# Possible gradual deployment\nStrict-Transport-Security: max-age=300\nStrict-Transport-Security: max-age=86400\nStrict-Transport-Security: max-age=31536000; includeSubDomains"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.12 Clickjacking, MIME sniffing and frame protection",
    "id": "26-12-clickjacking-mime-sniffing-and-frame-protection"
  },
  {
    "kind": "paragraph",
    "text": "Clickjacking occurs when an application is embedded invisibly or deceptively on another website and the user interacts with controls without realizing the real context. The CSP frame-ancestors directive is the modern mechanism for controlling which origins can frame the page. X-Frame-Options offers DENY and SAMEORIGIN, remaining relevant in compatibility, but lacks the flexibility of an origin list."
  },
  {
    "kind": "paragraph",
    "text": "X-Content-Type-Options: nosniff instructs the browser to respect MIME types in relevant contexts rather than inferring executable content. This reduces scenarios where a resource served with the incorrect type is interpreted as a script or stylesheet. The header does not replace the correct Content-Type; both must be configured."
  },
  {
    "kind": "paragraph",
    "text": "frame-ancestors protect documents that can be framed, while frame-src controls which frames the page itself can load. Confusing the two directives produces ineffective policies. It's also important to note that pure JSON APIs typically don't need to be frame-rendered, but portals, administrative consoles, and authentication pages need explicit protection."
  },
  {
    "kind": "table",
    "caption": "Table 5 - Frame protection and content type are different responsibilities.",
    "headers": [
      "Header or directive",
      "Example",
      "Usage"
    ],
    "rows": [
      [
        "CSP frame-ancestors",
        "frame-ancestors 'none'",
        "Blocks incorporation from any source."
      ],
      [
        "X-Frame-Options",
        "DENY or SAMEORIGIN",
        "Framing protection compatibility."
      ],
      [
        "X-Content-Type-Options",
        "nosniff",
        "Reduces MIME sniffing on executable resources."
      ],
      [
        "Content-Type",
        "application/json",
        "Declares the actual type of the payload."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.13 Referrer-Policy and Permissions-Policy",
    "id": "26-13-referrer-policy-and-permissions-policy"
  },
  {
    "kind": "paragraph",
    "text": "The Referer header can reveal the origin URL of navigation or loading. When URLs contain identifiers, internal parameters, or sensitive structure, such sharing creates a privacy risk. Referrer-Policy controls how much of the information is sent. Policies like no-referrer, same-origin, and strict-origin-when-cross-origin offer different levels of restriction."
  },
  {
    "kind": "paragraph",
    "text": "The choice must balance privacy, anti-fraud, analytics and troubleshooting. Sending the full URL to third parties is rarely necessary. An origin-oriented policy reduces path and query exposure in cross-origin navigations, maintaining sufficient information for some controls. Sensitive data should not be in URLs, even with a restrictive policy, because it may appear in logs and history."
  },
  {
    "kind": "paragraph",
    "text": "Permissions-Policy allows you to enable or disable browser features for the document and frames, such as camera, microphone, geolocation and fullscreen, depending on the supported set. The objective is to reduce available capabilities to own and third-party content. The old Feature-Policy nomenclature has been replaced; Configurations must use the current syntax and capabilities of the target agent."
  },
  {
    "kind": "subhead",
    "text": "Privacy Examples and Browser Capabilities"
  },
  {
    "kind": "code",
    "text": "Referrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=(self)\n# More restrictive example\nReferrer-Policy: no-referrer"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.14 COOP, COEP and CORP",
    "id": "26-14-coop-coep-and-corp"
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin-Opener-Policy controls the relationship between a document and open or opened windows. By isolating context groups, it reduces attacks and interference that rely on cross-window references. Cross-Origin-Embedder-Policy requires that embedded cross-origin resources are explicitly shareable by CORS or CORP, depending on the mode adopted."
  },
  {
    "kind": "paragraph",
    "text": "Cross-Origin-Resource-Policy allows a resource to declare whether it can be loaded by documents of the same origin, same site, or any permitted context. Together, COOP and COEP can produce cross-origin isolation, necessary for some powerful browser APIs. This configuration should be tested because third-party resources without proper headers may fail to load."
  },
  {
    "kind": "paragraph",
    "text": "These headers are not replacements for CSP or CORS. CORS controls programmatic access to responses; CORP protects the resource against certain cross-origin loads; COOP separates navigation contexts; COEP defines incorporation requirements. The architecture needs to know which side publishes each policy and how third-party CDNs, images, fonts, and scripts behave."
  },
  {
    "kind": "table",
    "caption": "Table 6 - Cross-origin policies complement each other, but protect different borders.",
    "headers": [
      "Mechanism",
      "Question that answers",
      "Example"
    ],
    "rows": [
      [
        "COOP",
        "With which windows does this document share context group?",
        "Cross-Origin-Opener-Policy: same-origin"
      ],
      [
        "COEP",
        "What cross-origin features can be incorporated?",
        "Cross-Origin-Embedder-Policy: require-corp"
      ],
      [
        "CORP",
        "Who can upload this resource?",
        "Cross-Origin-Resource-Policy: same-site"
      ],
      [
        "CORS",
        "Which source can access the response via browser?",
        "Access-Control-Allow-Origin: https://app..."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.15 Cache-Control, Clear-Site-Data and cookies",
    "id": "26-15-cache-control-clear-site-data-and-cookies"
  },
  {
    "kind": "paragraph",
    "text": "Sensitive responses may remain in the browser cache, proxy, or CDN. Cache-Control sets policies for storage and reuse. no-store is appropriate when no retention is acceptable; private allows private but not shared caching; no-cache requires revalidation before use; max-age defines freshness. Directives should be chosen by the semantics of the response, not by a single rule for the entire API."
  },
  {
    "kind": "paragraph",
    "text": "Authentication does not automatically make a response uncacheable. Gateways and CDNs need to consider Authorization, cookies, Vary and explicit rules. A custom response stored in a shared cache can leak data between users. On the other hand, disabling all cache indiscriminately can degrade performance and increase cost. The design must separate public, private, immutable and transactional content."
  },
  {
    "kind": "paragraph",
    "text": "Clear-Site-Data allows you to request clearing of website data categories, such as cache, cookies and storage, depending on support. It can be useful in logout or incident response, but must be used carefully so as not to eliminate legitimate state or cause loops. Does not replace session revocation on the server."
  },
  {
    "kind": "paragraph",
    "text": "Set-Cookie has security-relevant attributes. Secure restricts sending to secure channels; HttpOnly prevents access via JavaScript; SameSite influences sending in cross-site contexts; Path and Domain control scope; Max-Age and Expires define persistence. Session and authentication cookies must use minimal scope and not carry sensitive information in clear text."
  },
  {
    "kind": "subhead",
    "text": "Cache, clearing and cookie examples"
  },
  {
    "kind": "code",
    "text": "Cache-Control: no-store\nClear-Site-Data: \"cache\", \"cookies\", \"storage\"\nSet-Cookie: __Host-session=<value>; Path=/; Secure; HttpOnly; SameSite=Lax\n# Versioned public content\nCache-Control: public, max-age=31536000, immutable"
  },
  {
    "kind": "table",
    "caption": "Table 7 - Cache and cookies require semantic precision; Intuitive names can be deceiving.",
    "headers": [
      "Directive or attribute",
      "Operational meaning",
      "Caution"
    ],
    "rows": [
      [
        "no-store",
        "Do not store the response.",
        "Useful for highly sensitive data."
      ],
      [
        "private",
        "Allow private, not shared cache.",
        "It may still remain on the user's device."
      ],
      [
        "no-cache",
        "Store, but revalidate before use.",
        "It does not mean no storage."
      ],
      [
        "Secure",
        "Only send cookies via a secure channel.",
        "It depends on correctly implemented HTTPS."
      ],
      [
        "HttpOnly",
        "Prevent access by JavaScript.",
        "It does not prevent automatic sending of the cookie."
      ],
      [
        "SameSite",
        "Limit sending in cross-site context.",
        "Choice depends on login and onboarding flow."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.16 Obsolete headers and technology disclosure",
    "id": "26-16-obsolete-headers-and-technology-disclosure"
  },
  {
    "kind": "paragraph",
    "text": "Not every historically recommended header should continue to be implemented. X-XSS-Protection relates to older browser filters and does not replace CSP. Public Key Pinning for HTTP created significant operational risks and was abandoned by browsers; HPKP should not be reintroduced as generic hardening. Expect-CT lost relevance with the evolution of Certificate Transparency and agent support."
  },
  {
    "kind": "paragraph",
    "text": "Feature-Policy has been replaced by Permissions-Policy. X-Frame-Options remains useful for compatibility, but frame-ancestors offers modern control. Pragma is legacy for HTTP/1.0 caching and does not replace a clear Cache-Control policy. Header management needs to follow standards and real support, removing obsolete recommendations from corporate templates."
  },
  {
    "kind": "paragraph",
    "text": "Headers such as Server and X-Powered-By can reveal products and versions. Reducing disclosure avoids providing unnecessary information, but should not be confused with fixing vulnerabilities. An attacker can identify technology by other signals. The priority continues to be patching, secure configuration, inventory and surface reduction."
  },
  {
    "kind": "table",
    "caption": "Table 8 - Security requires removing obsolete controls, not just adding new headers.",
    "headers": [
      "Item",
      "Recommended situation",
      "Alternative or observation"
    ],
    "rows": [
      [
        "X-XSS-Protection",
        "Do not treat as main modern control.",
        "Use CSP and fix injection/XSS."
      ],
      [
        "Public-Key-Pins",
        "Do not deploy.",
        "Manage certificates, CT and renewal automation."
      ],
      [
        "Expect-CT",
        "Do not adopt as a new requirement.",
        "Use current Certificate Transparency ecosystem."
      ],
      [
        "Feature-Policy",
        "Migrate.",
        "Use Permissions-Policy."
      ],
      [
        "X-Powered-By",
        "Remove when possible.",
        "Does not replace hardening or patching."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.17 Implementation in applications, gateways and CDNs",
    "id": "26-17-implementation-in-applications-gateways-and-cdns"
  },
  {
    "kind": "paragraph",
    "text": "The application knows the content best and must participate in CSP, cookies, cache, and journey-specific policies. The gateway can apply defaults, CORS, HSTS, disclosure removal, observability and guardrails. The CDN can add or normalize headers, but their position in the stream needs to be understood to avoid overwriting and duplication."
  },
  {
    "kind": "paragraph",
    "text": "A mature corporate policy defines a matrix by asset type: public JSON API, private API, static portal, authenticated application, administrative console, and file download. Each category receives baseline and approved exceptions. Applying the same CSP to a JSON API and a SPA doesn't make sense; similarly, CORS may be irrelevant for exclusively server-to-server integration."
  },
  {
    "kind": "paragraph",
    "text": "Configuration as code and automated testing reduce drift. The pipeline can check presence, value, duplicity and consistency of headers. End-to-end tests must validate real behavior in the browser, because proxies, redirects, and error responses can change policy. In distributed environments, record which component added or removed each header."
  },
  {
    "kind": "subhead",
    "text": "Order of responsibility"
  },
  {
    "kind": "paragraph",
    "text": "Avoid multiple components by writing the same header without precedence rules. Clearly define whether application, gateway, ingress, CDN or web server is the authoritative source. Duplicity can be as dangerous as absence."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "26.18 Troubleshooting and laboratories",
    "id": "26-18-troubleshooting-and-laboratories"
  },
  {
    "kind": "paragraph",
    "text": "The diagnosis starts in the browser: Network shows preflight, redirects, cookies and headers; Console exhibits CORS and CSP violations; Application tools show cookies and storage. Then compare the response observed in the browser with curl or a server-server client. If curl works and fetch fails, the difference is probably in the browser's security model, not basic connectivity."
  },
  {
    "kind": "paragraph",
    "text": "For CORS, check Origin, method, requested headers, OPTIONS response, actual response, credentials, Vary, and duplicity. For CSP, identify the violated policy, blocked URL, nonce or hash, and effective policy. For HSTS, confirm that the header was received over HTTPS, the host state, and subdomain coverage. For cache, look at Age, Cache-Control, Vary, and the component that served the response."
  },
  {
    "kind": "paragraph",
    "text": "Laboratories must be performed in authorized environments. It is useful to set up two local sources on different ports, observe simple request and preflight, activate credentials, test allowlist, deploy CSP in report-only, introduce a blocked inline script, enable HSTS with short max-age and validate headers in gateway error responses."
  },
  {
    "kind": "table",
    "caption": "Table 9 - The diagnosis must identify which agent applied the policy.",
    "headers": [
      "Symptom",
      "Probable layer",
      "Evidence to collect"
    ],
    "rows": [
      [
        "CORS error, backend registered 200",
        "Browser policy or CORS response.",
        "Origin, ACAO, credentials, console and actual response."
      ],
      [
        "Script does not run after deploy",
        "CSP.",
        "Violated directive, nonce/hash and Report-Only."
      ],
      [
        "Subdomain stopped after HSTS",
        "IncludeSubDomains coverage.",
        "HSTS and TLS status of the subdomain."
      ],
      [
        "Another user's data appears",
        "Shared cache.",
        "Cache-Control, Vary, key and identity headers."
      ],
      [
        "Legitimate Iframe has been blocked",
        "frame-ancestors/XFO.",
        "Effective policy and origin of the embedder."
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
    "kind": "paragraph",
    "text": "CORS, CSP and HSTS are distinct mechanisms. CORS controls browser-mediated cross-origin access; CSP restricts content loading and execution; HSTS establishes mandatory use of HTTPS after the policy is learned. None of them replace backend security, authentication, or authorization."
  },
  {
    "kind": "paragraph",
    "text": "Complementary headers reduce other classes of risk: frame-ancestors and X-Frame-Options handle clickjacking; X-Content-Type-Options reduces MIME sniffing; Referrer-Policy improves privacy; Permissions-Policy limits capabilities; COOP, COEP and CORP participate in isolation; Cache-Control and cookie attributes protect state and sensitive responses."
  },
  {
    "kind": "paragraph",
    "text": "Correct deployment requires ownership, gradual rollout, browser testing, consistency in error responses and observability. Generic templates without understanding can break applications or produce a false sense of security. The policy needs to reflect the architecture and be revised as standards, browsers, and products evolve."
  },
  {
    "kind": "subhead",
    "text": "Next step of the course"
  },
  {
    "kind": "paragraph",
    "text": "The next chapter delves into Rate Limiting, Quotas and Throttling, mechanisms that control consumption, protect capacity and apply operational contracts in API Gateways."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Implementation checklist",
    "id": "implementation-checklist"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "CORS has an explicit allowlist and does not arbitrarily reflect Origin.",
      "Preflight is handled correctly and does not rely on authentication of the actual operation.",
      "CORS headers also appear in the relevant error responses.",
      "Per-origin variable responses use Vary and coherent cache key.",
      "CSP was implemented with inventory, report-only and unsafe-inline/unsafe-eval removal plan.",
      "Authoritative inline scripts use nonce or hash correctly.",
      "HSTS was gradually enabled and includeSubDomains was preceded by inventory.",
      "frame-ancestors, nosniff, Referrer-Policy and Permissions-Policy have values appropriate to the asset.",
      "COOP, COEP and CORP were tested with third-party resources.",
      "Cache-Control protects personalized and sensitive responses without blocking legitimate cache indiscriminately.",
      "Session cookies use Secure, HttpOnly, SameSite, and minimal scope.",
      "Obsolete headers have been removed from the baseline.",
      "There is an authoritative component for each header and tests against duplication.",
      "Critical journeys are tested in browser after gateway, CDN or application changes."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercises",
    "id": "exercises"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explain why CORS does not prevent a server-server client from calling an API.",
      "Differentiate origin and site and relate the difference to CORS and SameSite.",
      "Describe the complete preflight flow for a PUT with Authorization and application/json.",
      "Explain why Access-Control-Allow-Origin: * does not work with credentialed response.",
      "Propose a CSP for a SPA that loads its own scripts and calls a specific API.",
      "Compare nonce, hash and unsafe-inline.",
      "Explain the operational risk of includeSubDomains in HSTS.",
      "Differentiate between frame-src, frame-ancestors and X-Frame-Options.",
      "Compare no-store and no-cache with an example banking API.",
      "Explain the differences between CORS, CORP, COOP and COEP.",
      "Set up a gateway rollout plan for CSP and CORS without downtime.",
      "List evidence needed to investigate a CORS error that only occurs in production."
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
    "caption": "Table 10 - Essential vocabulary of the chapter.",
    "headers": [
      "Term",
      "Definition"
    ],
    "rows": [
      [
        "Allowlist",
        "Explicit set of authoritative origins or sources."
      ],
      [
        "CORS",
        "Protocol for controlled sharing of resources across origins in the browser."
      ],
      [
        "CSP",
        "Policy that restricts resources loaded and executed by a page."
      ],
      [
        "COEP",
        "Requirements policy for cross-origin incorporation."
      ],
      [
        "COOP",
        "Isolation policy between browsing contexts."
      ],
      [
        "CORP",
        "Resource declared policy on cross-origin upload."
      ],
      [
        "Credentialed request",
        "CORS request that uses credentials according to the client mode."
      ],
      [
        "HSTS",
        "Policy that requires the use of HTTPS for a certain period."
      ],
      [
        "MIME sniffing",
        "Inference of the content type by the browser in disagreement with the declared type."
      ],
      [
        "Nonce",
        "Unpredictable value used to authorize specific content in CSP."
      ],
      [
        "Origin",
        "Combination of scheme, host and port."
      ],
      [
        "Preflight",
        "OPTIONS query performed before certain CORS requests."
      ],
      [
        "Referrer",
        "Information about the context that led to navigation or loading."
      ],
      [
        "Same-Origin Policy",
        "Set of restrictions that separate contexts from different origins."
      ],
      [
        "Vary",
        "Header indicating request dimensions used to select cached representation."
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
      "WHATWG. Fetch Standard - CORS protocol, preflight and fetch policies.",
      "WHATWG. HTML Standard - origin, navigation and context policies.",
      "W3C. Content Security Policy Level 3.",
      "IETF. RFC 6797 - HTTP Strict Transport Security (HSTS).",
      "IETF. RFC 7034 - HTTP Header Field X-Frame-Options.",
      "IETF. RFC 9110 - HTTP Semantics.",
      "IETF. RFC 9111 - HTTP Caching.",
      "W3C. Referrer Policy.",
      "W3C. Permissions Policy.",
      "W3C. Clear Site Data.",
      "OWASP. HTTP Headers Cheat Sheet and Cross Origin Resource Sharing Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Update note"
  },
  {
    "kind": "paragraph",
    "text": "Browser headers and behavior evolve. Before adopting a corporate policy, validate the current specification, support of target browsers, and the behavior of the specific version of the gateway, ingress, CDN, and framework used."
  }
];
