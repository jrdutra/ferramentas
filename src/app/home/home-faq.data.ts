export interface HomeFaqItem {
  question: string;
  answer: string;
}

/**
 * Questions shown in the FAQ section of the home page.
 *
 * The same list feeds the FAQPage structured data declared for the home route,
 * so the visible answers and the ones sent to search engines never drift apart
 * — a requirement of Google's FAQ rich result guidelines.
 */
export const HOME_FAQ: readonly HomeFaqItem[] = [
  {
    question: 'What is utily.tools?',
    answer:
      'utily.tools is a free collection of online developer tools that run in your browser. It brings together text utilities, encoders and decoders, JSON and YAML tooling, certificate and token inspectors, hash and password generators, PDF utilities and QR code generation in a single place, so you do not need to install anything or jump between sites.'
  },
  {
    question: 'Are the tools really free to use?',
    answer:
      'Yes. Every tool on utily.tools is free, with no account, no sign-up and no usage limits. There is no paid tier and no trial period.'
  },
  {
    question: 'Do I need to create an account or install anything?',
    answer:
      'No. You open the tool you need and start using it immediately. utily.tools runs entirely in a modern web browser, on desktop or mobile, with no extension, download or registration required.'
  },
  {
    question: 'Is my data safe? Does anything get uploaded to a server?',
    answer:
      'The vast majority of the tools process your input locally in the browser, which means the text, files, certificates and tokens you paste never leave your device. The exceptions are the features that need a server by definition, such as the shared text tool that synchronises content between screens. Even so, avoid pasting production secrets or private keys into any online utility, here or elsewhere.'
  },
  {
    question: 'Which tools does utily.tools offer?',
    answer:
      'The catalogue is grouped into text tools, developer tools, generators and image, graphics and PDF tools. It includes a Base64 converter, URL encoder and decoder, JSON editor, JSON and YAML comparator, JWT and JWE inspectors, X.509 certificate viewer, generator and validator, hash and HMAC generators, UUID and password generators, Unix timestamp converter, IPv4 CIDR calculator, Swagger and OpenAPI editor, text diff, OCR converter, QR code generator and PDF merger, splitter and creator.'
  },
  {
    question: 'Can I use utily.tools offline?',
    answer:
      'Tools that run fully in the browser keep working while the page stays open, even if the connection drops. However, the site is not installable as an offline application, so the first load and any navigation to another tool require an internet connection.'
  },
  {
    question: 'What is the difference between the Tools and the Learn sections?',
    answer:
      'The tools solve an immediate task, such as decoding a token or calculating a subnet. The Learn section holds long-form study material on corporate API fundamentals and architecture, published in English, Portuguese and Spanish, while the Articles section explains the standards and concepts behind each individual tool.'
  },
  {
    question: 'Can I use utily.tools for commercial or professional work?',
    answer:
      'Yes. The tools are intended for everyday professional use by developers, QA engineers, security analysts and infrastructure teams. Bear in mind the usual precaution about sensitive material: use test data when you are inspecting formats and structures.'
  },
  {
    question: 'How can I report a bug or suggest a new tool?',
    answer:
      'The About page lists the contact details for feedback. Suggestions for new tools, bug reports and corrections to the articles are all welcome, and the catalogue grows regularly based on them.'
  }
];
