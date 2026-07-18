import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/assets/learn/cryptography/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

const locales = {
  pt: [
    ['Primitivas criptográficas', 'Cada objetivo de segurança exige a primitiva correta.', ['Cifrar dados|AES · ChaCha20', 'Detectar alteração|SHA-2 · SHA-3', 'Autenticar mensagem|HMAC · GMAC', 'Provar autoria técnica|RSA-PSS · EdDSA']],
    ['Criptografia simétrica e assimétrica', 'Sistemas modernos combinam velocidade, distribuição segura e identidade.', ['Simétrica|Uma chave secreta|Rápida para grandes volumes|AES · ChaCha20', 'Assimétrica|Par pública/privada|Troca de chaves e assinaturas|RSA · ECC']],
    ['Visão conceitual de uma rodada do AES', 'O AES repete transformações sobre um bloco de 128 bits.', ['Bloco de 128 bits|Estado inicial', 'SubBytes|Substituição não linear', 'ShiftRows|Permutação das linhas', 'MixColumns|Difusão entre colunas', 'AddRoundKey|Combina a chave da rodada']],
    ['Modos de operação de cifras de bloco', 'O modo define como blocos, IVs, nonces e autenticação se relacionam.', ['ECB|Blocos iguais revelam padrões|Evitar', 'CBC|Encadeamento com IV|Exige MAC separado', 'CTR|Contador + XOR|Nonce nunca se repete', 'GCM|Cifra e autentica|AEAD recomendado']],
    ['Entradas e saídas de um esquema AEAD', 'Confidencialidade e integridade são produzidas na mesma operação.', ['Texto claro|Dados a proteger', 'AAD|Metadados autenticados', 'Nonce único|Nunca reutilizar', 'Chave secreta|Material protegido', 'AEAD|AES-GCM ou ChaCha20-Poly1305', 'Saída|Texto cifrado + tag']],
    ['Efeito avalanche de uma função hash', 'Uma alteração mínima na mensagem muda amplamente o resumo.', ['Mensagem A|Conteúdo original', 'Mensagem B|Diferença de um bit', 'Função hash|SHA-256', 'Resumos|Valores completamente distintos']],
    ['Fluxo simplificado de HMAC', 'HMAC autentica uma mensagem com um segredo compartilhado.', ['Mensagem|Bytes exatos', 'Segredo compartilhado|Chave do HMAC', 'HMAC-SHA-256|Hash com chave', 'MAC|Tag de autenticação']],
    ['Assinatura digital: geração e verificação', 'A chave privada assina; a chave pública permite verificar.', ['Documento|Calcular hash', 'Chave privada|Gerar assinatura', 'Documento recebido|Recalcular hash', 'Chave pública|Assinatura válida?']],
    ['Criptografia híbrida e envelope encryption', 'O dado usa criptografia simétrica; a data key recebe proteção separada.', ['Dados|Payload original', 'Data key|Chave simétrica', 'Cifra simétrica|Dados cifrados', 'KMS · RSA · KEM|Protege a data key', 'Envelope|Dados + chave encapsulada']],
    ['Ciclo de vida de uma chave criptográfica', 'Segurança depende de controles durante toda a existência da chave.', ['Gerar|Entropia e origem', 'Distribuir|Canal e identidade', 'Armazenar|KMS ou HSM', 'Usar|Política e auditoria', 'Rotacionar|Versão e transição', 'Revogar e destruir|Encerramento seguro']],
    ['Criptografia em uma arquitetura de API Gateway', 'Chaves diferentes atendem propósitos e fronteiras diferentes.', ['Cliente|TLS · mTLS', 'API Gateway|JWT/JWS · HMAC|Políticas e verificação', 'KMS ou HSM|Chaves protegidas', 'Backend|TLS · assinatura|Dados da aplicação']],
    ['Transição pós-quântica', 'Inventário e criptoagilidade permitem uma migração progressiva e testável.', ['Inventário criptográfico|Algoritmos e dependências', 'Criptoagilidade|Troca configurável', 'Testes híbridos|Clássico + PQC', 'Migração|Políticas e rollout', 'Padrões NIST|ML-KEM · ML-DSA · SLH-DSA']],
    ['Troubleshooting criptográfico', 'Diagnostique algoritmo, parâmetros, chave, codificação e contexto.', ['Algoritmo?|Suite ou esquema divergente', 'Chave?|ID, versão ou permissão', 'Nonce ou IV?|Tamanho, formato ou reuso', 'Formato?|Base64, DER, PEM ou JSON', 'Contexto?|AAD, canonicalização ou charset']]
  ],
  en: [
    ['Cryptographic primitives', 'Each security goal requires the correct primitive.', ['Encrypt data|AES · ChaCha20', 'Detect tampering|SHA-2 · SHA-3', 'Authenticate a message|HMAC · GMAC', 'Prove technical authorship|RSA-PSS · EdDSA']],
    ['Symmetric and asymmetric cryptography', 'Modern systems combine speed, secure distribution, and identity.', ['Symmetric|One secret key|Fast for large volumes|AES · ChaCha20', 'Asymmetric|Public/private pair|Key exchange and signatures|RSA · ECC']],
    ['Conceptual view of an AES round', 'AES repeats transformations over a 128-bit block.', ['128-bit block|Initial state', 'SubBytes|Nonlinear substitution', 'ShiftRows|Row permutation', 'MixColumns|Diffusion across columns', 'AddRoundKey|Combines the round key']],
    ['Block cipher modes of operation', 'The mode defines how blocks, IVs, nonces, and authentication relate.', ['ECB|Equal blocks reveal patterns|Avoid', 'CBC|Chaining with an IV|Requires a separate MAC', 'CTR|Counter + XOR|Never repeat the nonce', 'GCM|Encrypts and authenticates|Recommended AEAD']],
    ['Inputs and outputs of an AEAD scheme', 'Confidentiality and integrity are produced in the same operation.', ['Plaintext|Data to protect', 'AAD|Authenticated metadata', 'Unique nonce|Never reuse', 'Secret key|Protected material', 'AEAD|AES-GCM or ChaCha20-Poly1305', 'Output|Ciphertext + tag']],
    ['Avalanche effect of a hash function', 'A minimal message change widely alters the digest.', ['Message A|Original content', 'Message B|One-bit difference', 'Hash function|SHA-256', 'Digests|Completely different values']],
    ['Simplified HMAC flow', 'HMAC authenticates a message with a shared secret.', ['Message|Exact bytes', 'Shared secret|HMAC key', 'HMAC-SHA-256|Keyed hash', 'MAC|Authentication tag']],
    ['Digital signature: generation and verification', 'The private key signs; the public key enables verification.', ['Document|Calculate hash', 'Private key|Generate signature', 'Received document|Recalculate hash', 'Public key|Valid signature?']],
    ['Hybrid cryptography and envelope encryption', 'Data uses symmetric cryptography; its data key is protected separately.', ['Data|Original payload', 'Data key|Symmetric key', 'Symmetric cipher|Encrypted data', 'KMS · RSA · KEM|Protects the data key', 'Envelope|Data + encapsulated key']],
    ['Cryptographic key lifecycle', 'Security depends on controls throughout the key’s existence.', ['Generate|Entropy and origin', 'Distribute|Channel and identity', 'Store|KMS or HSM', 'Use|Policy and audit', 'Rotate|Version and transition', 'Revoke and destroy|Secure retirement']],
    ['Cryptography in an API Gateway architecture', 'Different keys serve different purposes and trust boundaries.', ['Client|TLS · mTLS', 'API Gateway|JWT/JWS · HMAC|Policies and verification', 'KMS or HSM|Protected keys', 'Backend|TLS · signature|Application data']],
    ['Post-quantum transition', 'Inventory and cryptographic agility enable progressive, testable migration.', ['Cryptographic inventory|Algorithms and dependencies', 'Cryptographic agility|Configurable replacement', 'Hybrid tests|Classical + PQC', 'Migration|Policies and rollout', 'NIST standards|ML-KEM · ML-DSA · SLH-DSA']],
    ['Cryptographic troubleshooting', 'Diagnose the algorithm, parameters, key, encoding, and context.', ['Algorithm?|Mismatched suite or scheme', 'Key?|ID, version, or permission', 'Nonce or IV?|Size, format, or reuse', 'Format?|Base64, DER, PEM, or JSON', 'Context?|AAD, canonicalization, or charset']]
  ],
  es: [
    ['Primitivas criptográficas', 'Cada objetivo de seguridad exige la primitiva correcta.', ['Cifrar datos|AES · ChaCha20', 'Detectar alteraciones|SHA-2 · SHA-3', 'Autenticar un mensaje|HMAC · GMAC', 'Probar autoría técnica|RSA-PSS · EdDSA']],
    ['Criptografía simétrica y asimétrica', 'Los sistemas modernos combinan velocidad, distribución segura e identidad.', ['Simétrica|Una clave secreta|Rápida para grandes volúmenes|AES · ChaCha20', 'Asimétrica|Par pública/privada|Intercambio de claves y firmas|RSA · ECC']],
    ['Vista conceptual de una ronda de AES', 'AES repite transformaciones sobre un bloque de 128 bits.', ['Bloque de 128 bits|Estado inicial', 'SubBytes|Sustitución no lineal', 'ShiftRows|Permutación de filas', 'MixColumns|Difusión entre columnas', 'AddRoundKey|Combina la clave de ronda']],
    ['Modos de operación de cifrado por bloques', 'El modo define cómo se relacionan bloques, IVs, nonces y autenticación.', ['ECB|Bloques iguales revelan patrones|Evitar', 'CBC|Encadenamiento con IV|Exige un MAC separado', 'CTR|Contador + XOR|Nunca repetir el nonce', 'GCM|Cifra y autentica|AEAD recomendado']],
    ['Entradas y salidas de un esquema AEAD', 'Confidencialidad e integridad se producen en la misma operación.', ['Texto claro|Datos que proteger', 'AAD|Metadatos autenticados', 'Nonce único|Nunca reutilizar', 'Clave secreta|Material protegido', 'AEAD|AES-GCM o ChaCha20-Poly1305', 'Salida|Texto cifrado + tag']],
    ['Efecto avalancha de una función hash', 'Un cambio mínimo en el mensaje altera ampliamente el resumen.', ['Mensaje A|Contenido original', 'Mensaje B|Diferencia de un bit', 'Función hash|SHA-256', 'Resúmenes|Valores completamente distintos']],
    ['Flujo simplificado de HMAC', 'HMAC autentica un mensaje con un secreto compartido.', ['Mensaje|Bytes exactos', 'Secreto compartido|Clave HMAC', 'HMAC-SHA-256|Hash con clave', 'MAC|Tag de autenticación']],
    ['Firma digital: generación y verificación', 'La clave privada firma; la clave pública permite verificar.', ['Documento|Calcular hash', 'Clave privada|Generar firma', 'Documento recibido|Recalcular hash', 'Clave pública|¿Firma válida?']],
    ['Criptografía híbrida y envelope encryption', 'Los datos usan criptografía simétrica; la data key se protege por separado.', ['Datos|Payload original', 'Data key|Clave simétrica', 'Cifrado simétrico|Datos cifrados', 'KMS · RSA · KEM|Protege la data key', 'Envelope|Datos + clave encapsulada']],
    ['Ciclo de vida de una clave criptográfica', 'La seguridad depende de controles durante toda la existencia de la clave.', ['Generar|Entropía y origen', 'Distribuir|Canal e identidad', 'Almacenar|KMS o HSM', 'Usar|Política y auditoría', 'Rotar|Versión y transición', 'Revocar y destruir|Retirada segura']],
    ['Criptografía en una arquitectura de API Gateway', 'Claves diferentes atienden propósitos y fronteras diferentes.', ['Cliente|TLS · mTLS', 'API Gateway|JWT/JWS · HMAC|Políticas y verificación', 'KMS o HSM|Claves protegidas', 'Backend|TLS · firma|Datos de aplicación']],
    ['Transición poscuántica', 'El inventario y la agilidad criptográfica permiten una migración progresiva y comprobable.', ['Inventario criptográfico|Algoritmos y dependencias', 'Agilidad criptográfica|Sustitución configurable', 'Pruebas híbridas|Clásico + PQC', 'Migración|Políticas y rollout', 'Estándares NIST|ML-KEM · ML-DSA · SLH-DSA']],
    ['Troubleshooting criptográfico', 'Diagnostica algoritmo, parámetros, clave, codificación y contexto.', ['¿Algoritmo?|Suite o esquema divergente', '¿Clave?|ID, versión o permiso', '¿Nonce o IV?|Tamaño, formato o reutilización', '¿Formato?|Base64, DER, PEM o JSON', '¿Contexto?|AAD, canonicalización o charset']]
  ]
};

const filenames = [
  'figure-01-cryptographic-primitives.svg', 'figure-02-symmetric-asymmetric.svg', 'figure-03-aes-round.svg',
  'figure-04-block-modes.svg', 'figure-05-aead.svg', 'figure-06-hash-avalanche.svg', 'figure-07-hmac.svg',
  'figure-08-digital-signature.svg', 'figure-09-envelope-encryption.svg', 'figure-10-key-lifecycle.svg',
  'figure-11-api-gateway-cryptography.svg', 'figure-12-post-quantum-transition.svg',
  'figure-13-cryptographic-troubleshooting.svg'
];

const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

function wrap(value, maxChars, maxLines = 4) {
  const words = value.split(/\s+/); const lines = []; let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) { lines.push(current); current = word; } else current = next;
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function textBlock(value, x, y, width, fontSize = 22, color = '#dbeafe', weight = 500, maxLines = 4) {
  const lines = wrap(value, Math.max(9, Math.floor(width / (fontSize * 0.54))), maxLines);
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="${fontSize}" font-weight="${weight}" text-anchor="middle">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? fontSize * 1.23 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function renderFigure(title, subtitle, rawCards, index) {
  const cards = rawCards.map((entry) => entry.split('|'));
  const count = cards.length; const gap = count >= 6 ? 12 : count >= 5 ? 16 : 28; const margin = 58;
  const cardWidth = (1400 - margin * 2 - gap * (count - 1)) / count;
  const titleFont = title.length > 46 ? 34 : 40; const titleLines = wrap(title, Math.floor(1220 / (titleFont * .54)), 2);
  const subtitleY = 80 + (titleLines.length - 1) * titleFont * 1.23 + 58;
  const cardY = 252; const cardH = 370; const palette = ['#22d3ee', '#60a5fa', '#a78bfa', '#34d399', '#818cf8', '#38bdf8'];
  const cardsSvg = cards.map((lines, cardIndex) => {
    const x = margin + cardIndex * (cardWidth + gap); const color = palette[cardIndex % palette.length];
    const headingFont = count >= 6 ? 19 : count >= 5 ? 21 : 25;
    const headingLines = wrap(lines[0], Math.max(9, Math.floor((cardWidth - 28) / (headingFont * .54))), 3);
    const details = lines.slice(1); const detailsStart = cardY + 102 + headingLines.length * headingFont * 1.18;
    const available = cardY + cardH - 54 - detailsStart; const detailGap = details.length > 1 ? Math.min(67, Math.max(44, available / (details.length - 1))) : 0;
    const detailFont = count >= 6 ? 16 : count >= 5 ? 17 : 20;
    const arrow = cardIndex < count - 1 ? `<path d="M ${x + cardWidth + 2} ${cardY + cardH / 2} H ${x + cardWidth + gap - 3}" stroke="#67e8f9" stroke-width="3" marker-end="url(#arrow)" opacity=".68"/>` : '';
    return `<g><rect x="${x}" y="${cardY}" width="${cardWidth}" height="${cardH}" rx="24" fill="url(#card${cardIndex % 3})" stroke="${color}" stroke-width="2.5"/><rect x="${x + 14}" y="${cardY + 16}" width="${cardWidth - 28}" height="7" rx="4" fill="${color}"/>${textBlock(lines[0], x + cardWidth / 2, cardY + 70, cardWidth - 28, headingFont, '#f8fafc', 760, 3)}${details.map((detail, detailIndex) => textBlock(detail, x + cardWidth / 2, detailsStart + detailIndex * detailGap, cardWidth - 28, detailFont, '#cbd5e1', 500, 3)).join('')}${arrow}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="780" viewBox="0 0 1400 780" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".55" stop-color="#071827"/><stop offset="1" stop-color="#171044"/></linearGradient><linearGradient id="card0"><stop stop-color="#082f49"/><stop offset="1" stop-color="#111827"/></linearGradient><linearGradient id="card1"><stop stop-color="#172554"/><stop offset="1" stop-color="#111827"/></linearGradient><linearGradient id="card2"><stop stop-color="#2e1065"/><stop offset="1" stop-color="#111827"/></linearGradient><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#67e8f9"/></marker><pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#2563eb" opacity=".13"/></pattern></defs><rect width="1400" height="780" rx="28" fill="url(#bg)"/><rect width="1400" height="780" rx="28" fill="url(#grid)"/><circle cx="152" cy="110" r="115" fill="#06b6d4" opacity=".08"/><circle cx="1245" cy="652" r="175" fill="#8b5cf6" opacity=".09"/>${textBlock(title, 700, 80, 1220, titleFont, '#f8fafc', 800, 2)}${textBlock(subtitle, 700, subtitleY, 1180, 22, '#93c5fd', 500, 2)}${cardsSvg}<path d="M65 687 H1335" stroke="#334155"/><text x="65" y="730" fill="#64748b" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="18">FAAC · 07.${String(index + 1).padStart(2, '0')}</text></svg>`;
}

for (const [locale, figures] of Object.entries(locales)) {
  const target = join(root, locale); mkdirSync(target, { recursive: true });
  figures.forEach(([title, subtitle, cards], index) => writeFileSync(join(target, filenames[index]), renderFigure(title, subtitle, cards, index), 'utf8'));
}

console.log(`Generated ${filenames.length * Object.keys(locales).length} localized SVG diagrams.`);
