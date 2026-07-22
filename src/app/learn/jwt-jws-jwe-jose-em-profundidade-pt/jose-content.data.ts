import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, rodapés e quebras físicas de página.
export const JOSE_PT_BLOCKS: ChapterBlock[] = [
  {
    "kind": "subhead",
    "text": "Criptografia, contexto e governança para tokens seguros"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/overview.svg",
    "alt": "Ciclo criptográfico de um token entre emissor, JWS ou JWT, API Gateway e backend",
    "caption": "Figura de abertura - Tokens seguros dependem de criptografia, contexto, destinatário e governança de chaves."
  },
  {
    "kind": "subhead",
    "text": "Princípio central"
  },
  {
    "kind": "paragraph",
    "text": "Assinatura protege integridade e origem; criptografia protege leitura. Nenhuma delas substitui validação de issuer, audience e finalidade."
  },
  {
    "kind": "paragraph",
    "text": "Edição aprofundada - material de estudo e consulta profissional"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Apresentação do capítulo",
    "id": "apresentacao-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "O capítulo anterior apresentou OpenID Connect e mostrou que ID Tokens, access tokens, logout tokens e outros artefatos podem utilizar JSON Web Token como formato. Entretanto, reconhecer três segmentos separados por pontos não é suficiente para operar tokens com segurança. É necessário compreender a família JOSE, a diferença entre claims e proteção criptográfica, a seleção de algoritmos, a distribuição de chaves e as validações específicas de cada perfil."
  },
  {
    "kind": "paragraph",
    "text": "JWT é uma estrutura para transportar claims. JWS protege conteúdo com assinatura digital ou código de autenticação de mensagem. JWE protege a confidencialidade por criptografia autenticada. JWK representa uma chave em JSON; um JWKS publica conjuntos de chaves; JWA registra algoritmos e identificadores. Esses componentes se combinam, mas não são sinônimos. Um JWT pode ser um JWS, um JWE ou uma estrutura aninhada."
  },
  {
    "kind": "paragraph",
    "text": "Em APIs corporativas, os erros mais graves raramente estão na decodificação Base64url. Eles surgem quando o consumidor aceita algoritmos não previstos, escolhe chaves usando dados não confiáveis, ignora issuer ou audience, mistura ID Token e access token, reutiliza a mesma regra para tipos distintos de JWT ou mantém rotação de chaves incompatível com caches e tempo de vida dos tokens."
  },
  {
    "kind": "paragraph",
    "text": "Este capítulo aprofunda serializações compacta e JSON, headers protegidos, claims, JWK, JWKS, thumbprints, rotação, JWE, tokens aninhados e perfis de access token. Também incorpora as boas práticas da RFC 8725 e a atualização da RFC 9864 sobre identificadores de algoritmos totalmente especificados, além de relacionar os conceitos a Axway API Gateway, Azure API Management e bibliotecas de validação."
  },
  {
    "kind": "subhead",
    "text": "Como estudar este capítulo"
  },
  {
    "kind": "paragraph",
    "text": "Para cada exemplo, responda em ordem: qual é o tipo do objeto, quem o emitiu, quem é o destinatário, qual algoritmo é permitido, de onde vem a chave, quais bytes foram protegidos e quais claims precisam ser validadas. Essa sequência reduz a chance de aceitar um token apenas porque sua assinatura parece válida."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Objetivos de aprendizagem"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Distinguir JOSE, JWT, JWS, JWE, JWK, JWKS e JWA.",
      "Explicar Base64url, UTF-8, JSON e o impacto da representação exata dos bytes.",
      "Interpretar claims registradas, públicas e privadas sem confundir presença com confiança.",
      "Descrever JWS Compact Serialization e JSON Serialization.",
      "Diferenciar assinatura digital e MAC, incluindo implicações de não repúdio e distribuição de chaves.",
      "Restringir algoritmos por allowlist e evitar algorithm confusion.",
      "Usar typ, cty, kid e crit de forma segura e contextual.",
      "Interpretar JWKs RSA, EC, OKP e oct e separar material público de material privado.",
      "Planejar JWKS, cache, rotação, sobreposição e retirada de chaves.",
      "Explicar os parâmetros alg e enc em JWE e a estrutura de cinco partes.",
      "Projetar tokens aninhados e decidir quando assinar, criptografar ou usar ambos.",
      "Validar JWTs de forma criptográfica, temporal e semântica.",
      "Aplicar o perfil JWT para access tokens e distinguir outros tipos de JWT.",
      "Diagnosticar falhas de assinatura, audience, issuer, kid, cache, relógio e criptografia."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Estrutura do capítulo"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "18.1 A família JOSE e suas responsabilidades",
      "18.2 Base64url, UTF-8 e JSON canônico",
      "18.3 JWT: claims e envelope de segurança",
      "18.4 Claims registradas, públicas e privadas",
      "18.5 JWS: signing input e serializações",
      "18.6 Assinatura digital e MAC",
      "18.7 Algoritmos, allowlists e RFC 9864",
      "18.8 Headers typ, cty, kid e crit",
      "18.9 JWK: anatomia e tipos de chave",
      "18.10 JWKS e distribuição de chaves",
      "18.11 kid, thumbprints e certificados X.509",
      "18.12 Rotação, cache e retirada de chaves",
      "18.13 JWE: alg, enc e Content Encryption Key",
      "18.14 Serializações JWE e múltiplos destinatários",
      "18.15 JWT aninhado e ordem das proteções",
      "18.16 Pipeline de validação segura",
      "18.17 JWT Profile for OAuth 2.0 Access Tokens",
      "18.18 Outros perfis de JWT",
      "18.19 Proof-of-possession e claim cnf",
      "18.20 Aplicação em API Gateways, Axway e Azure",
      "18.21 Ameaças e hardening",
      "18.22 Privacidade, logging e minimização",
      "18.23 Troubleshooting",
      "18.24 Estudos de caso e laboratórios",
      "Resumo, checklist, exercícios, glossário e referências"
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/figure-01-jose-family.svg",
    "alt": "Família JOSE separando JWT, JWS, JWE, JWK, JWKS e JWA por responsabilidade",
    "caption": "Figura 1 - JOSE é uma família de estruturas; JWT é apenas uma parte do modelo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.1 A família JOSE e suas responsabilidades",
    "id": "18-1-a-familia-jose-e-suas-responsabilidades"
  },
  {
    "kind": "paragraph",
    "text": "JSON Object Signing and Encryption é o conjunto de especificações que define estruturas JSON para assinatura, autenticação, criptografia e representação de chaves. O objetivo é transportar objetos de segurança de forma compatível com HTTP, URIs e aplicações que já utilizam JSON. A família foi dividida em documentos para separar estrutura, algoritmos, chaves e semântica de claims."
  },
  {
    "kind": "paragraph",
    "text": "JWT define um conjunto de claims e regras de processamento. JWS define como proteger uma sequência de bytes com assinatura digital ou MAC. JWE define criptografia autenticada e gerenciamento da chave de conteúdo. JWK define como representar chaves criptográficas em JSON, enquanto JWA associa identificadores como RS256, ES256 ou A256GCM a operações concretas."
  },
  {
    "kind": "paragraph",
    "text": "Um token chamado comercialmente de JWT geralmente é um JWS em serialização compacta, mas isso é uma convenção frequente, não uma equivalência formal. Também existem JWTs criptografados como JWE, JWSs cujo payload não é um JWT e objetos JOSE com múltiplas assinaturas ou destinatários usando serialização JSON."
  },
  {
    "kind": "table",
    "caption": "Tabela 1 - Cada componente JOSE resolve uma responsabilidade diferente.",
    "headers": [
      "Estrutura",
      "Proteção ou função",
      "Exemplo de uso"
    ],
    "rows": [
      [
        "JWT",
        "Conjunto de claims com semântica definida por um perfil.",
        "ID Token, access token, client assertion ou logout token."
      ],
      [
        "JWS",
        "Integridade e autenticação por assinatura ou MAC.",
        "Token assinado e webhook assinado."
      ],
      [
        "JWE",
        "Confidencialidade e integridade por criptografia autenticada.",
        "Token com claims sensíveis destinado a um cliente específico."
      ],
      [
        "JWK / JWKS",
        "Representação e publicação de chaves.",
        "Chaves públicas do issuer para validação."
      ],
      [
        "JWA",
        "Identificadores de algoritmos e parâmetros.",
        "RS256, ES256, A256GCM e RSA-OAEP-256."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.2 Base64url, UTF-8 e representação JSON",
    "id": "18-2-base64url-utf-8-e-representacao-json"
  },
  {
    "kind": "paragraph",
    "text": "Base64url transforma bytes em caracteres seguros para URLs ao substituir os caracteres + e / e normalmente remover o preenchimento =. A operação não cifra, não comprime e não oferece integridade. Qualquer pessoa que receba um JWS compacto pode decodificar header e payload, ainda que não possua a chave de assinatura."
  },
  {
    "kind": "paragraph",
    "text": "Antes da codificação, objetos JSON são convertidos para bytes UTF-8. Espaços, ordem de membros, escapes e formas numéricas podem produzir sequências de bytes diferentes mesmo quando duas representações parecem semanticamente equivalentes. No JWS, a assinatura cobre a representação exata usada no signing input; uma biblioteca não deve decodificar o payload e serializá-lo novamente para verificar a assinatura."
  },
  {
    "kind": "paragraph",
    "text": "JSON permite flexibilidade que exige validação defensiva. Nomes duplicados de membros, números fora do intervalo esperado, strings com normalização diferente e múltiplas representações podem causar interpretações divergentes entre bibliotecas. O perfil que usa JWT deve definir claims, tipos e limites aceitos, rejeitando objetos ambíguos."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - transformação do header\nheader JSON: {\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"key-2026-07\"}\nBASE64URL(UTF8(header))\n  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0yMDI2LTA3In0\nBase64url e apenas codificacao. O conteudo permanece legivel."
  },
  {
    "kind": "subhead",
    "text": "Erro recorrente"
  },
  {
    "kind": "paragraph",
    "text": "Ocultar um token no navegador, em um header ou em um log não equivale a proteger confidencialidade. Um JWS assinado continua legível. Para impedir leitura do conteúdo, é necessário JWE ou outra proteção de canal e armazenamento adequada."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.3 JWT: claims e envelope de segurança",
    "id": "18-3-jwt-claims-e-envelope-de-seguranca"
  },
  {
    "kind": "paragraph",
    "text": "Uma claim é uma afirmação representada por um par nome-valor. O JWT Claims Set é um objeto JSON que reúne essas afirmações. O formato não determina automaticamente quem pode emitir a claim, por quanto tempo ela é válida ou como deve ser interpretada. Essas regras pertencem ao perfil e à relação de confiança entre emissor e destinatário."
  },
  {
    "kind": "paragraph",
    "text": "JWT pode ser protegido por JWS ou JWE. Em um JWS, as claims são legíveis, mas alterações são detectáveis quando a assinatura é verificada corretamente. Em um JWE, o conteúdo é cifrado e autenticado. Em ambos os casos, o destinatário ainda precisa validar issuer, audience, tempo, tipo e regras específicas da aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Claims não devem transportar estado arbitrário apenas porque o token suporta JSON. Tokens grandes aumentam uso de banda, tamanho de headers, pressão sobre proxies e risco de exposição. A emissão deve privilegiar dados estáveis e necessários à decisão, usando identificadores para informações que precisam ser consultadas em tempo real."
  },
  {
    "kind": "table",
    "caption": "Tabela 2 - Claims registradas possuem semântica geral, mas o perfil define a obrigação concreta.",
    "headers": [
      "Claim",
      "Semântica geral",
      "Validação típica"
    ],
    "rows": [
      [
        "iss",
        "Identificador do emissor.",
        "Comparação exata com issuer permitido."
      ],
      [
        "sub",
        "Identificador do sujeito no emissor.",
        "Interpretar junto a iss e ao perfil."
      ],
      [
        "aud",
        "Destinatário ou conjunto de destinatários.",
        "Conter a audience da API ou cliente."
      ],
      [
        "exp",
        "Instante após o qual o token não deve ser aceito.",
        "Relógio sincronizado e tolerância pequena."
      ],
      [
        "nbf",
        "Instante antes do qual o token não deve ser aceito.",
        "Rejeitar uso antecipado fora da tolerância."
      ],
      [
        "iat",
        "Instante de emissão.",
        "Verificar plausibilidade e políticas de idade."
      ],
      [
        "jti",
        "Identificador único do token.",
        "Detecção de replay ou auditoria quando o perfil exigir."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.4 Claims registradas, públicas e privadas",
    "id": "18-4-claims-registradas-publicas-e-privadas"
  },
  {
    "kind": "paragraph",
    "text": "Claims registradas possuem nomes e semântica documentados no registro IANA, como iss, sub, aud, exp e jti. Elas não são obrigatórias em todo JWT, mas perfis como OIDC e RFC 9068 especificam quais devem aparecer. O uso correto depende de respeitar o tipo JSON previsto e a finalidade do perfil."
  },
  {
    "kind": "paragraph",
    "text": "Claims públicas usam nomes resistentes a colisão, normalmente registrados ou baseados em URI controlada pela organização. Claims privadas são acordos locais entre emissor e consumidor, como roles, tenant_id ou transaction_limit. Elas são úteis, mas podem colidir entre ecossistemas e mudar de significado quando um token atravessa fronteiras organizacionais."
  },
  {
    "kind": "paragraph",
    "text": "Uma claim de autorização não deve ser aceita apenas por existir. O resource server precisa conhecer o issuer, o perfil, o namespace, o tipo e a política que a produz. Por exemplo, roles emitidas por um diretório podem representar grupos administrativos e não permissões de domínio. A aplicação deve transformar claims confiáveis em decisões locais explícitas."
  },
  {
    "kind": "subhead",
    "text": "Design de claims"
  },
  {
    "kind": "paragraph",
    "text": "Prefira nomes estáveis, tipos simples e significado documentado. Evite incluir segredos, dados pessoais desnecessários, listas enormes de grupos ou objetos de negócio que mudam durante a validade do token."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/figure-02-jws-compact.svg",
    "alt": "JWS Compact Serialization com protected header, payload, assinatura e signing input",
    "caption": "Figura 2 - A assinatura cobre o protected header e o payload codificados, unidos por um ponto."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.5 JWS: signing input e serializações",
    "id": "18-5-jws-signing-input-e-serializacoes"
  },
  {
    "kind": "paragraph",
    "text": "JWS Compact Serialization possui três partes: protected header, payload e assinatura. As duas primeiras são codificadas em Base64url e unidas por um ponto para formar o signing input. O algoritmo usa esse valor e a chave apropriada para produzir a terceira parte. A verificação reconstrói os mesmos bytes e valida a operação criptográfica."
  },
  {
    "kind": "paragraph",
    "text": "JWS JSON Serialization representa o objeto como JSON e permite múltiplas assinaturas sobre o mesmo payload. A forma flattened contém uma assinatura; a forma general contém uma coleção. Esse modelo é útil quando diferentes organizações ou chaves precisam assinar o mesmo conteúdo, embora aumente a complexidade de política e processamento."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 7797 permite payload não codificado em Base64url por meio do parâmetro b64 no protected header e do uso de crit. Essa opção é especializada e pode melhorar integração com conteúdo destacado, mas exige suporte explícito e cuidado com caracteres que interferem na serialização compacta. APIs comuns devem preferir o comportamento padrão oferecido por bibliotecas maduras."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - construção conceitual de um JWS\nprotected = BASE64URL(UTF8({\"alg\":\"ES256\",\"kid\":\"ec-1\"}))\npayload   = BASE64URL(payload_bytes)\nsigning_input = protected + \".\" + payload\nsignature = ECDSA_sign(private_key, signing_input)\njws_compact = protected + \".\" + payload + \".\" + BASE64URL(signature)"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.6 Assinatura digital e MAC",
    "id": "18-6-assinatura-digital-e-mac"
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos assimétricos usam chave privada para assinar e chave pública para verificar. O emissor mantém a chave privada sob controle e distribui apenas material público. Esse modelo facilita validação por várias APIs e reduz a capacidade dos validadores de emitir tokens, pois possuir a chave pública não permite criar novas assinaturas."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos de MAC, como HMAC, usam o mesmo segredo para produzir e verificar o código. Todo componente capaz de validar também pode gerar um token indistinguível. Em arquiteturas com muitos resource servers, o compartilhamento do segredo amplia o impacto de comprometimento e dificulta atribuir qual componente produziu um token."
  },
  {
    "kind": "paragraph",
    "text": "Assinatura digital não cria não repúdio jurídico automaticamente. Logs, controle de chave, certificação, política, auditoria e contexto são necessários. Da mesma forma, verificar a assinatura prova apenas que os bytes correspondem a uma chave aceita; não prova que o token é atual, destinado àquela API ou autorizado para a operação."
  },
  {
    "kind": "table",
    "caption": "Tabela 3 - A escolha do modelo altera fronteiras de confiança e resposta a incidentes.",
    "headers": [
      "Modelo",
      "Distribuição",
      "Implicação operacional"
    ],
    "rows": [
      [
        "Assinatura assimétrica",
        "Privada no emissor; pública nos validadores.",
        "Validadores não conseguem emitir tokens. Facilita JWKS e rotação."
      ],
      [
        "MAC simétrico",
        "Mesmo segredo no emissor e nos validadores.",
        "Qualquer validador comprometido pode fabricar tokens."
      ],
      [
        "Assinatura com HSM/KMS",
        "Operação privada em módulo controlado.",
        "Reduz exposição da chave e melhora auditoria, com custo e dependência."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.7 Algoritmos, allowlists e RFC 9864",
    "id": "18-7-algoritmos-allowlists-e-rfc-9864"
  },
  {
    "kind": "paragraph",
    "text": "O header alg declara o algoritmo usado, mas não deve controlar sozinho a decisão. O consumidor precisa possuir uma allowlist configurada pelo perfil, pelo issuer e pelo tipo de token. Se a aplicação aceita qualquer algoritmo anunciado, pode ocorrer algorithm confusion, downgrade ou uso de uma chave em operação incompatível."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos precisam ser avaliados pelo conjunto completo de parâmetros, tamanho de chave, biblioteca, requisitos regulatórios e interoperabilidade. RS256 permanece amplamente suportado; PS256 usa RSA-PSS; ES256 usa ECDSA com P-256 e SHA-256. Algoritmos modernos baseados em EdDSA devem considerar as atualizações de identificadores totalmente especificados e o suporte real do ecossistema."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9864, publicada em 2025, diferencia algoritmos totalmente especificados daqueles que dependem de parâmetros externos para determinar a operação. Ela atualiza registros JOSE e deprecia identificadores polimórficos em situações cobertas pela especificação. Arquiteturas novas devem consultar o registro IANA atual e evitar negociar nomes ambíguos apenas por compatibilidade histórica."
  },
  {
    "kind": "table",
    "caption": "Tabela 4 - O algoritmo deve ser escolhido por política, não pelo conteúdo não confiável do token.",
    "headers": [
      "Algoritmo",
      "Família",
      "Atenção"
    ],
    "rows": [
      [
        "RS256",
        "RSA PKCS#1 v1.5 com SHA-256",
        "Amplo suporte; use chave suficiente e rotação governada."
      ],
      [
        "PS256",
        "RSA-PSS com SHA-256",
        "Padding probabilístico; confirme suporte de todos os componentes."
      ],
      [
        "ES256",
        "ECDSA P-256 com SHA-256",
        "Assinatura compacta; requer implementação correta de ECDSA."
      ],
      [
        "HS256",
        "HMAC com SHA-256",
        "Segredo compartilhado transforma validadores em emissores potenciais."
      ],
      [
        "none",
        "Sem proteção criptográfica",
        "Não aceitar em tokens de segurança."
      ],
      [
        "EdDSA / nomes atualizados",
        "Edwards curves",
        "Consultar RFC 9864 e registro IANA para identificador e suporte atual."
      ]
    ]
  },
  {
    "kind": "subhead",
    "text": "Regra de segurança"
  },
  {
    "kind": "paragraph",
    "text": "Configure algoritmo esperado junto ao issuer e ao tipo de token. Não derive a allowlist do próprio header alg e não reutilize a mesma chave em famílias de algoritmo incompatíveis."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.8 Headers typ, cty, kid e crit",
    "id": "18-8-headers-typ-cty-kid-e-crit"
  },
  {
    "kind": "paragraph",
    "text": "O parâmetro typ declara o tipo de objeto para a aplicação. Ele não muda a criptografia, mas ajuda a impedir confusão entre JWTs com finalidades diferentes. A RFC 8725 recomenda tipagem explícita e regras mutuamente exclusivas. O perfil de access token da RFC 9068 usa at+jwt, enquanto ID Tokens costumam usar JWT ou depender do contexto OIDC."
  },
  {
    "kind": "paragraph",
    "text": "cty descreve o tipo do payload, sendo especialmente útil em objetos aninhados. Um JWE que contém um JWT assinado pode usar cty igual a JWT. kid é uma dica para selecionar uma chave entre várias; não é identificador global, não prova propriedade e pode se repetir entre issuers."
  },
  {
    "kind": "paragraph",
    "text": "crit lista parâmetros de header que precisam ser compreendidos para processar o objeto. Se um item crítico é desconhecido, o consumidor deve rejeitar o token. Ignorar crit destrói a capacidade de extensões modificarem a semântica de segurança. Headers que influenciam a operação criptográfica devem estar na área protegida, não apenas em campos não protegidos da serialização JSON."
  },
  {
    "kind": "table",
    "caption": "Tabela 5 - Headers orientam processamento, mas precisam de política local.",
    "headers": [
      "Header",
      "Função",
      "Validação"
    ],
    "rows": [
      [
        "typ",
        "Tipo de objeto para a aplicação.",
        "Comparar com o perfil esperado e separar regras."
      ],
      [
        "cty",
        "Tipo do conteúdo protegido.",
        "Usar em nesting e conteúdos não óbvios."
      ],
      [
        "kid",
        "Selecionar chave candidata.",
        "Resolver apenas dentro do issuer confiável."
      ],
      [
        "crit",
        "Extensões que precisam ser entendidas.",
        "Rejeitar se qualquer item não for suportado."
      ],
      [
        "jku / x5u",
        "URL de chaves ou certificados.",
        "Não buscar livremente a partir de token não confiável."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.9 JWK: anatomia e tipos de chave",
    "id": "18-9-jwk-anatomia-e-tipos-de-chave"
  },
  {
    "kind": "paragraph",
    "text": "JSON Web Key representa material criptográfico com parâmetros definidos por kty. Uma chave RSA pública inclui n e e; uma chave EC inclui crv, x e y; uma chave OKP inclui curva e coordenada pública; uma chave simétrica oct inclui k. Parâmetros privados como d, p, q ou k não devem aparecer em JWKS públicos."
  },
  {
    "kind": "paragraph",
    "text": "use indica finalidade ampla, como sig ou enc. key_ops lista operações específicas, como verify, sign, encrypt ou decrypt. alg pode restringir a associação com um algoritmo. Esses campos precisam ser coerentes entre si e com a política da aplicação; não devem ampliar automaticamente o que a chave pode fazer."
  },
  {
    "kind": "paragraph",
    "text": "Chaves devem possuir origem, proprietário, data de ativação, data de retirada, finalidade e procedimento de revogação. Representar uma chave em JSON não elimina controles de segredo. Chaves privadas devem permanecer em HSM, KMS, cofre ou armazenamento protegido e ser carregadas apenas pelos processos autorizados."
  },
  {
    "kind": "code",
    "text": "Exemplo - JWK pública RSA\n{\n  \"kty\": \"RSA\",\n  \"kid\": \"signing-2026-07\",\n  \"use\": \"sig\",\n  \"alg\": \"RS256\",\n  \"n\": \"sXch...base64url-modulus...\",\n  \"e\": \"AQAB\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Material privado"
  },
  {
    "kind": "paragraph",
    "text": "Um JWKS público deve conter somente parâmetros públicos. A presença de d, p, q, dp, dq, qi ou k pode expor chave privada ou segredo simétrico e exige resposta imediata a incidente."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.10 JWKS e distribuição de chaves",
    "id": "18-10-jwks-e-distribuicao-de-chaves"
  },
  {
    "kind": "paragraph",
    "text": "Um JSON Web Key Set contém a propriedade keys com uma lista de JWKs. Provedores de identidade publicam JWKS para que clientes e resource servers verifiquem assinaturas. O endpoint deve ser obtido por configuração confiável ou metadados vinculados ao issuer, nunca por uma URL arbitrária fornecida pelo token."
  },
  {
    "kind": "paragraph",
    "text": "O consumidor mantém cache para evitar dependência de rede em cada requisição. O cache precisa respeitar políticas HTTP, possuir limite de tamanho, timeout, atualização controlada e fallback seguro. Em falha temporária do endpoint, chaves já conhecidas podem continuar válidas conforme política, mas não se deve aceitar token sem chave apenas para preservar disponibilidade."
  },
  {
    "kind": "paragraph",
    "text": "A validação deve primeiro fixar o issuer permitido, localizar o conjunto correspondente e então usar kid, kty, alg e key_ops para filtrar candidatos. Um cache global indexado apenas por kid permite colisões entre tenants e issuers. O índice seguro inclui pelo menos issuer e identificador da chave."
  },
  {
    "kind": "table",
    "caption": "Tabela 6 - Distribuição de chaves é parte da disponibilidade e da segurança do token.",
    "headers": [
      "Componente",
      "Responsabilidade",
      "Falha típica"
    ],
    "rows": [
      [
        "Issuer configuration",
        "Fixar domínio de confiança e perfil.",
        "Token de outro tenant ou ambiente aceito."
      ],
      [
        "jwks_uri",
        "Publicar chaves públicas atuais.",
        "URL trocada ou indisponível."
      ],
      [
        "Cache",
        "Reduzir latência e dependência por requisição.",
        "Chave nova não propagada ou chave antiga eterna."
      ],
      [
        "Seleção por kid",
        "Escolher candidata dentro do conjunto confiável.",
        "Colisão global ou kid inexistente."
      ],
      [
        "Atualização",
        "Buscar conjunto quando necessário.",
        "Refresh storm induzido por tokens maliciosos."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.11 kid, thumbprints e certificados X.509",
    "id": "18-11-kid-thumbprints-e-certificados-x-509"
  },
  {
    "kind": "paragraph",
    "text": "kid é um identificador escolhido pelo emissor e pode ser uma sequência opaca. Ele facilita rotação, mas não possui unicidade global. JWK Thumbprint, definido pela RFC 7638, calcula um digest sobre uma representação canônica de membros obrigatórios da chave e produz identificador derivado do próprio material público."
  },
  {
    "kind": "paragraph",
    "text": "x5c pode carregar uma cadeia de certificados X.509; x5t e x5t#S256 carregam thumbprints do certificado. Quando certificados são usados, o consumidor precisa validar cadeia, uso de chave, validade e confiança conforme o perfil. Comparar apenas um thumbprint recebido no token não cria uma âncora confiável."
  },
  {
    "kind": "paragraph",
    "text": "jku e x5u apontam para recursos remotos. Seguir essas URLs sem allowlist cria SSRF, acesso a redes internas e substituição de chaves. Em plataformas corporativas, endpoints de metadata e JWKS devem ser pré-configurados, resolvidos por canais controlados e monitorados."
  },
  {
    "kind": "code",
    "text": "Pseudocódigo - JWK Thumbprint\nthumbprint_input = canonical_json({\n  \"e\": \"AQAB\",\n  \"kty\": \"RSA\",\n  \"n\": \"sXch...\"\n})\njwk_thumbprint = BASE64URL(SHA256(UTF8(thumbprint_input)))"
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/figure-03-key-rotation.svg",
    "alt": "Rotação de chaves com publicação antecipada, sobreposição e retirada segura",
    "caption": "Figura 3 - Rotação segura publica a chave nova antes de usá-la e mantém a antiga durante a sobreposição."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.12 Rotação, cache e retirada de chaves",
    "id": "18-12-rotacao-cache-e-retirada-de-chaves"
  },
  {
    "kind": "paragraph",
    "text": "Rotação planejada começa com a publicação antecipada da nova chave. Depois que caches tiveram oportunidade de atualizá-la, o emissor passa a assinar novos tokens com o novo kid. A chave anterior permanece publicada até que todos os tokens por ela assinados tenham expirado, acrescidos de tolerâncias de relógio, filas, retries e atraso de propagação."
  },
  {
    "kind": "paragraph",
    "text": "Retirar a chave imediatamente após trocar o signer causa falhas em tokens ainda válidos. Manter chaves indefinidamente reduz capacidade de revogação e amplia superfície. A janela deve ser calculada com base em vida máxima dos tokens, refresh, cache-control, tempos de atualização e comportamento de componentes desconectados."
  },
  {
    "kind": "paragraph",
    "text": "Quando um kid desconhecido aparece, o validador pode atualizar o JWKS uma vez dentro de limites e usar coalescência para evitar múltiplas buscas simultâneas. Tokens aleatórios não devem provocar uma requisição por tentativa. Rate limiting, cache negativo curto e circuit breaker protegem o endpoint de metadata e o próprio gateway."
  },
  {
    "kind": "paragraph",
    "text": "Em comprometimento de chave, a prioridade pode exigir retirada imediata e invalidação de tokens, aceitando indisponibilidade controlada. O plano precisa definir detecção, rotação emergencial, comunicação aos consumidores, revogação, análise de emissão indevida e restauração de confiança."
  },
  {
    "kind": "subhead",
    "text": "Equação operacional"
  },
  {
    "kind": "paragraph",
    "text": "Tempo mínimo de sobreposição deve considerar: vida máxima do token + tolerância de relógio + atraso de cache + filas e retries. Use métricas reais, não apenas o valor exp nominal."
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/figure-04-jwe-compact.svg",
    "alt": "JWE Compact Serialization com protected header, encrypted key, IV, ciphertext e tag",
    "caption": "Figura 4 - JWE separa gerenciamento de chave e criptografia autenticada do conteúdo."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.13 JWE: alg, enc e Content Encryption Key",
    "id": "18-13-jwe-alg-enc-e-content-encryption-key"
  },
  {
    "kind": "paragraph",
    "text": "JWE utiliza uma Content Encryption Key, ou CEK, para cifrar o plaintext com algoritmo de criptografia autenticada indicado por enc. O parâmetro alg define como essa CEK é protegida, transportada, derivada ou compartilhada com o destinatário. Portanto, alg e enc possuem responsabilidades diferentes e ambos precisam ser permitidos pela política."
  },
  {
    "kind": "paragraph",
    "text": "Em RSA-OAEP-256, a CEK é cifrada com a chave pública RSA do destinatário. Em dir, a chave simétrica compartilhada é usada diretamente como CEK. Em ECDH-ES, uma operação de acordo de chaves deriva material a partir de chaves elípticas. A escolha altera distribuição de chaves, forward secrecy, interoperabilidade e risco de comprometimento."
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos como A256GCM oferecem confidencialidade e integridade em uma única operação autenticada. IV ou nonce precisa obedecer aos requisitos do algoritmo e não pode ser reutilizado sob a mesma chave quando isso comprometer segurança. A authentication tag deve ser validada antes de liberar qualquer plaintext à aplicação."
  },
  {
    "kind": "paragraph",
    "text": "Criptografar não elimina necessidade de assinatura quando o destinatário precisa verificar autoria de forma separada. Um JWE prova que a tag é válida sob a chave de criptografia, mas a identidade do produtor depende do mecanismo de key management e do perfil. Tokens aninhados podem combinar assinatura e criptografia."
  },
  {
    "kind": "table",
    "caption": "Tabela 7 - JWE combina key management, content encryption e metadados protegidos.",
    "headers": [
      "Parâmetro",
      "Exemplo",
      "Responsabilidade"
    ],
    "rows": [
      [
        "alg",
        "RSA-OAEP-256",
        "Proteger ou estabelecer a CEK para o destinatário."
      ],
      [
        "enc",
        "A256GCM",
        "Cifrar o conteúdo e produzir tag de autenticação."
      ],
      [
        "zip",
        "DEF",
        "Comprimir antes da criptografia; usar apenas com análise de risco."
      ],
      [
        "kid",
        "recipient-key-2",
        "Selecionar chave de decriptação dentro do domínio confiável."
      ],
      [
        "cty",
        "JWT",
        "Indicar que o plaintext é um JWT aninhado."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.14 Serializações JWE e múltiplos destinatários",
    "id": "18-14-serializacoes-jwe-e-multiplos-destinatarios"
  },
  {
    "kind": "paragraph",
    "text": "A serialização compacta possui cinco partes: protected header, encrypted key, IV, ciphertext e authentication tag. Ela é adequada para um destinatário e transporte em parâmetros ou headers. A serialização JSON permite campos protegidos e não protegidos, Additional Authenticated Data e múltiplos destinatários, cada um com sua encrypted key."
  },
  {
    "kind": "paragraph",
    "text": "Em múltiplos destinatários, o mesmo ciphertext pode ser compartilhado enquanto a CEK é protegida separadamente para cada chave. Isso reduz duplicação, mas cria política mais complexa: todos os destinatários recebem o mesmo conteúdo e precisam ser governados como conjunto. Retirar um destinatário exige nova criptografia para futuras mensagens."
  },
  {
    "kind": "paragraph",
    "text": "Headers não protegidos podem ser alterados sem invalidar a tag quando não participam de AAD. Informações que determinam algoritmo, chave, tipo ou interpretação devem estar no protected header. O consumidor precisa saber quais campos são autenticados e rejeitar combinações inconsistentes."
  },
  {
    "kind": "code",
    "text": "Mapa da JWE Compact Serialization\nprotected.encrypted_key.iv.ciphertext.tag\n1. protected: alg, enc, kid, cty\n2. encrypted_key: CEK protegida para o destinatario\n3. iv: valor unico exigido pelo algoritmo\n4. ciphertext: plaintext cifrado\n5. tag: autenticidade do ciphertext e dados associados"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.15 JWT aninhado e ordem das proteções",
    "id": "18-15-jwt-aninhado-e-ordem-das-protecoes"
  },
  {
    "kind": "paragraph",
    "text": "Um Nested JWT aplica JWS e JWE em sequência. O padrão comum é assinar primeiro e criptografar depois. O emissor cria um JWS que preserva integridade e autoria, então usa esse JWS como plaintext de um JWE destinado ao consumidor. O JWE externo usa cty igual a JWT para indicar o conteúdo aninhado."
  },
  {
    "kind": "paragraph",
    "text": "Após decriptar, o destinatário ainda precisa validar o JWS interno. A validade da tag externa não substitui assinatura, issuer, audience ou tempo do token interno. Da mesma forma, a assinatura interna não prova que o objeto externo foi destinado ao componente que o recebeu."
  },
  {
    "kind": "paragraph",
    "text": "Criptografar e depois assinar expõe metadados e a assinatura externa, além de produzir semântica diferente. Perfis devem definir a ordem, algoritmos, tipos e tratamento de erros. Não invente uma composição própria quando um perfil padronizado ou canal TLS com token assinado atende ao requisito."
  },
  {
    "kind": "table",
    "caption": "Tabela 8 - A escolha depende de confidencialidade, autonomia, revogação e complexidade.",
    "headers": [
      "Estratégia",
      "Propriedade",
      "Uso"
    ],
    "rows": [
      [
        "Somente JWS",
        "Integridade e origem; payload legível.",
        "Access tokens comuns em canais TLS."
      ],
      [
        "Somente JWE",
        "Confidencialidade e integridade sob a chave de criptografia.",
        "Conteúdo destinado a receptor específico."
      ],
      [
        "JWS dentro de JWE",
        "Autoria interna e confidencialidade externa.",
        "JWT aninhado com claims sensíveis."
      ],
      [
        "Referência opaca",
        "Servidor consulta estado por identificador.",
        "Revogação e minimização quando não é necessário self-contained."
      ]
    ]
  },
  {
    "kind": "figure",
    "src": "/assets/learn/jwt-jws-jwe-jose-in-depth/pt/figure-05-validation-pipeline.svg",
    "alt": "Pipeline seguro de validação de JWT em um resource server",
    "caption": "Figura 5 - Validação segura é uma cadeia; pular uma etapa altera o modelo de confiança."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.16 Pipeline de validação segura",
    "id": "18-16-pipeline-de-validacao-segura"
  },
  {
    "kind": "paragraph",
    "text": "O validador começa pelo contexto externo: endpoint, issuer esperado, tipo de token e perfil. Em seguida, faz parsing defensivo com limites de tamanho, número de segmentos, profundidade JSON e tipos. O header não confiável é lido apenas para selecionar uma operação permitida dentro da configuração."
  },
  {
    "kind": "paragraph",
    "text": "A seleção da chave ocorre no conjunto associado ao issuer. alg precisa estar na allowlist e ser compatível com kty, use e key_ops. A assinatura, MAC ou tag é verificada integralmente. Falhas criptográficas encerram o processamento sem tentar algoritmos alternativos não autorizados."
  },
  {
    "kind": "paragraph",
    "text": "Depois da criptografia vêm as validações semânticas: iss, aud, exp, nbf, iat, typ, cty, nonce, jti, scopes, tenant e claims do perfil. Regras para access token, ID Token, client assertion e logout token devem ser mutuamente exclusivas. Aceitar um token em múltiplos contextos favorece cross-JWT confusion."
  },
  {
    "kind": "paragraph",
    "text": "Por fim, a autorização aplica regras locais. Um token válido não implica permissão para qualquer objeto. O backend deve verificar operação, recurso, titularidade, contexto de negócio e políticas atuais. Logs devem registrar resultado e identificadores mínimos, nunca o token completo."
  },
  {
    "kind": "table",
    "caption": "Tabela 9 - Parsing, autenticação do token e autorização são etapas diferentes.",
    "headers": [
      "Etapa",
      "Pergunta",
      "Resultado de falha"
    ],
    "rows": [
      [
        "Contexto",
        "Que tipo de token e issuer este endpoint aceita?",
        "Rejeitar antes de confiança em headers."
      ],
      [
        "Parsing",
        "Estrutura, tamanho e JSON são aceitáveis?",
        "Erro genérico sem processamento profundo."
      ],
      [
        "Algoritmo e chave",
        "Algoritmo permitido e chave do issuer correto?",
        "Rejeitar; atualizar JWKS apenas de modo controlado."
      ],
      [
        "Criptografia",
        "Assinatura, MAC ou tag são válidos?",
        "Rejeitar sem usar claims."
      ],
      [
        "Claims",
        "Audience, tempo, tipo e regras do perfil são válidos?",
        "401 ou erro do protocolo correspondente."
      ],
      [
        "Autorização",
        "A identidade pode executar a ação no recurso?",
        "403 ou resposta de domínio apropriada."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.17 JWT Profile for OAuth 2.0 Access Tokens",
    "id": "18-17-jwt-profile-for-oauth-2-0-access-tokens"
  },
  {
    "kind": "paragraph",
    "text": "A RFC 9068 define um perfil interoperável para access tokens JWT. Ela não obriga OAuth a usar JWT; access tokens continuam podendo ser opacos. Quando o perfil é adotado, o token deve ser assinado, não pode usar alg none e deve declarar typ igual a at+jwt, além de claims e regras específicas para issuer, subject, audience, tempo, client_id e autorização."
  },
  {
    "kind": "paragraph",
    "text": "O resource server valida o token para sua própria audience. Scopes podem aparecer em scope, e informações adicionais de autorização podem ser transportadas conforme o perfil e acordos. O token não deve ser aceito por APIs de outra audiência apenas porque foi emitido pelo mesmo Authorization Server."
  },
  {
    "kind": "paragraph",
    "text": "JWT access tokens reduzem chamadas de introspecção e permitem validação local, mas tornam revogação imediata mais difícil. Vida curta, rotação, sender constraint, listas emergenciais e políticas de sessão podem reduzir exposição. Para dados que precisam refletir estado instantâneo, introspecção ou consulta de autorização pode ser mais adequada."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - header e claims de access token\n{\n  \"typ\": \"at+jwt\",\n  \"alg\": \"RS256\",\n  \"kid\": \"as-signing-4\"\n}.\n{\n  \"iss\": \"https://auth.example\",\n  \"sub\": \"user-481\",\n  \"aud\": \"https://api.example/payments\",\n  \"client_id\": \"mobile-app\",\n  \"scope\": \"payments.read payments.create\",\n  \"iat\": 1784126100,\n  \"exp\": 1784126700,\n  \"jti\": \"8b28b730-...\"\n}"
  },
  {
    "kind": "subhead",
    "text": "Access token não é ID Token"
  },
  {
    "kind": "paragraph",
    "text": "O access token é destinado ao resource server e descreve autoridade. O ID Token é destinado ao cliente OIDC e descreve autenticação. Mesmo que ambos sejam JWTs assinados pelo mesmo issuer, suas regras não podem ser intercambiadas."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.18 Outros perfis de JWT",
    "id": "18-18-outros-perfis-de-jwt"
  },
  {
    "kind": "paragraph",
    "text": "JWT é usado em diversos perfis. ID Tokens seguem regras do OpenID Connect. Client assertions da RFC 7523 permitem autenticar um cliente no token endpoint ou apresentar um grant. Request Objects da RFC 9101 protegem parâmetros de autorização. Logout tokens carregam eventos específicos de sessão. Respostas de introspecção podem ser protegidas como JWT conforme RFC 9701."
  },
  {
    "kind": "paragraph",
    "text": "Cada perfil define typ, audience, claims obrigatórias, tempo, replay e destinatário. Uma biblioteca genérica que apenas verifica assinatura não conhece essas regras. A aplicação precisa selecionar um validador ou configuração específica para cada tipo e manter endpoints separados quando possível."
  },
  {
    "kind": "paragraph",
    "text": "Novos formatos continuam surgindo. A RFC 9901, publicada em 2025, padroniza Selective Disclosure JWT para permitir apresentação seletiva de claims em cenários de credenciais. Esse mecanismo possui modelo próprio de emissão, apresentação, disclosure e key binding; não deve ser tratado como um JWT tradicional apenas porque reutiliza componentes JOSE."
  },
  {
    "kind": "table",
    "caption": "Tabela 10 - Tipos diferentes exigem regras de validação mutuamente exclusivas.",
    "headers": [
      "Perfil",
      "Destinatário",
      "Controle distintivo"
    ],
    "rows": [
      [
        "OIDC ID Token",
        "Relying Party",
        "client_id em aud, nonce e regras OIDC."
      ],
      [
        "JWT access token",
        "Resource Server",
        "typ at+jwt, audience da API e claims RFC 9068."
      ],
      [
        "Client assertion",
        "Authorization Server",
        "aud do endpoint, iss/sub do cliente e replay por jti."
      ],
      [
        "Logout token",
        "Relying Party",
        "events, sid/sub, jti e ausência de nonce."
      ],
      [
        "Request Object",
        "Authorization Server",
        "Parâmetros de authorization request protegidos."
      ],
      [
        "SD-JWT",
        "Verifier de credencial",
        "Disclosures selecionadas e regras de key binding."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.19 Proof-of-possession e claim cnf",
    "id": "18-19-proof-of-possession-e-claim-cnf"
  },
  {
    "kind": "paragraph",
    "text": "Bearer tokens podem ser usados por qualquer parte que obtenha o valor. Sender-constrained tokens vinculam o uso a uma chave ou certificado. A claim cnf confirma qual chave precisa ser demonstrada. O binding pode usar thumbprint de chave JWK, thumbprint de certificado ou parâmetros definidos pelo perfil."
  },
  {
    "kind": "paragraph",
    "text": "Em DPoP, o cliente apresenta uma prova JWS por requisição e o access token pode conter jkt, o thumbprint da chave pública. Em mTLS-bound access tokens, cnf pode conter x5t#S256 do certificado usado no canal. O resource server verifica tanto o token quanto a prova ou certificado correspondente."
  },
  {
    "kind": "paragraph",
    "text": "Proof-of-possession reduz replay de token roubado, mas adiciona gestão de chaves, sincronização, nonces, proxies TLS e diagnóstico. O gateway precisa preservar ou verificar a evidência no ponto correto. Terminar mTLS em um componente e encaminhar apenas um header não confiável ao backend destrói o vínculo se esse header puder ser injetado externamente."
  },
  {
    "kind": "code",
    "text": "Exemplos conceituais - confirmação da chave\n\"cnf\": {\n  \"jkt\": \"0ZcOCORZNYzC-7hV...\"\n}\n# ou, para certificado mTLS\n\"cnf\": {\n  \"x5t#S256\": \"qP3Q...thumbprint...\"\n}"
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.20 Aplicação em API Gateways, Axway e Azure",
    "id": "18-20-aplicacao-em-api-gateways-axway-e-azure"
  },
  {
    "kind": "paragraph",
    "text": "O API Gateway atua como Policy Enforcement Point e precisa separar validação do token de autorização da rota. Uma política robusta fixa issuer, audience, algoritmos, local de metadata, claims obrigatórias e comportamento de cache. Headers derivados de claims devem substituir valores externos e ser enviados ao backend apenas por canal confiável."
  },
  {
    "kind": "paragraph",
    "text": "No Axway API Gateway, filtros de validação JWT e bibliotecas de identidade podem verificar assinatura, claims e certificados. A configuração deve limitar algoritmos, escolher store ou JWKS por ambiente e correlacionar falhas com trace seguro. Políticas compartilhadas evitam divergência, mas precisam permitir diferenças de audience e perfil entre APIs."
  },
  {
    "kind": "paragraph",
    "text": "No Azure API Management, validate-jwt e validate-azure-ad-token integram validação a OpenID configuration, audiences e required-claims. A política deve verificar o token destinado à API e não apenas aceitar qualquer token do tenant. Caches de metadata e rotação precisam ser considerados em mudanças e incidentes."
  },
  {
    "kind": "paragraph",
    "text": "Quando o gateway reemite token interno, ocorre uma nova relação de confiança. O token externo deve ser validado primeiro; o token interno precisa ter issuer, audience, vida e claims mínimos próprios. O backend confia no emissor interno, não no token original, e a correlação deve preservar identificadores para auditoria."
  },
  {
    "kind": "code",
    "text": "Exemplo conceitual - política de validação no gateway\n<validate-jwt header-name=\"Authorization\"\n              require-scheme=\"Bearer\"\n              failed-validation-httpcode=\"401\">\n  <openid-config url=\"https://auth.example/.well-known/openid-configuration\" />\n  <audiences>\n    <audience>https://api.example/payments</audience>\n  </audiences>\n  <required-claims>\n    <claim name=\"scope\" match=\"all\">\n      <value>payments.read</value>\n    </claim>\n  </required-claims>\n</validate-jwt>"
  },
  {
    "kind": "subhead",
    "text": "Propagação de identidade"
  },
  {
    "kind": "paragraph",
    "text": "Remova headers de identidade recebidos da Internet antes de criar headers internos. O backend deve aceitar esses valores apenas do gateway autenticado e, para decisões críticas, continuar aplicando autorização de domínio."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.21 Ameaças e hardening",
    "id": "18-21-ameacas-e-hardening"
  },
  {
    "kind": "paragraph",
    "text": "Algorithm confusion ocorre quando o consumidor permite que alg selecione uma operação não prevista, como usar chave pública RSA como segredo HMAC. A defesa é uma allowlist fixa, chaves separadas por uso e biblioteca atualizada. alg none deve ser rejeitado em tokens de segurança, salvo perfil excepcional e explicitamente isolado."
  },
  {
    "kind": "paragraph",
    "text": "Substitution e cross-JWT confusion ocorrem quando um token válido é aceito no contexto errado. ID Token usado como access token, token de outra audience, token de staging em produção e client assertion aceita por API são exemplos. typ explícito, regras mutuamente exclusivas, issuer e audience reduzem o risco."
  },
  {
    "kind": "paragraph",
    "text": "URLs jku, x5u e campos jwk controlados pelo token podem induzir SSRF ou substituir chaves. kid pode causar path traversal ou consulta a banco insegura quando concatenado sem validação. O validador deve tratar headers como entrada hostil, usar endpoints pré-configurados e limitar tamanho e caracteres."
  },
  {
    "kind": "paragraph",
    "text": "Compression oracle é um risco quando dados secretos e controlados pelo atacante são comprimidos antes da criptografia e o tamanho pode ser observado. A RFC 8725 recomenda evitar compressão de entradas de criptografia em cenários sensíveis. Tokens também precisam de limites para impedir consumo excessivo de CPU e memória."
  },
  {
    "kind": "table",
    "caption": "Tabela 11 - O hardening combina criptografia, parsing, rede e governança.",
    "headers": [
      "Ameaça",
      "Exemplo",
      "Controle"
    ],
    "rows": [
      [
        "Algorithm confusion",
        "HS256 aceito com material destinado a RSA.",
        "Allowlist, compatibilidade kty/alg e bibliotecas maduras."
      ],
      [
        "Cross-JWT confusion",
        "ID Token aceito como access token.",
        "typ, audience, perfil e validadores separados."
      ],
      [
        "Key injection / SSRF",
        "jku aponta para host controlado ou rede interna.",
        "Endpoints pré-configurados e egress controlado."
      ],
      [
        "Replay",
        "Token copiado dentro da validade.",
        "Vida curta, jti quando aplicável e sender constraint."
      ],
      [
        "Key compromise",
        "Chave privada exposta.",
        "HSM/KMS, rotação emergencial e retirada coordenada."
      ],
      [
        "DoS criptográfico",
        "Tokens enormes ou kid aleatório forçam refresh.",
        "Limites, cache negativo, rate limit e circuit breaker."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.22 Privacidade, logging e minimização",
    "id": "18-22-privacidade-logging-e-minimizacao"
  },
  {
    "kind": "paragraph",
    "text": "Um JWS pode conter nome, e-mail, grupos, tenant, identificadores e dados de negócio em texto legível. Registrar o token completo em access logs, traces, APM, ferramentas de suporte ou mensagens de erro replica dados e credenciais por diversos sistemas. Mesmo tokens expirados podem revelar informações pessoais ou arquitetura interna."
  },
  {
    "kind": "paragraph",
    "text": "Logs devem registrar apenas campos necessários: issuer normalizado, audience esperada, kid, resultado de validação, código de falha, hash não reversível do jti ou subject quando permitido e correlation ID. O valor bruto do Authorization header deve ser mascarado antes de chegar a logs genéricos."
  },
  {
    "kind": "paragraph",
    "text": "Criptografia JWE reduz leitura durante transporte e armazenamento, mas o destinatário precisa decriptar e pode vazar o plaintext em logs. Minimização continua sendo o controle mais eficiente. Claims de autorização também podem revelar estrutura organizacional; avalie necessidade, retenção e acesso."
  },
  {
    "kind": "subhead",
    "text": "Regra de observabilidade"
  },
  {
    "kind": "paragraph",
    "text": "Colete evidência suficiente para diagnosticar sem copiar credenciais. Nunca publique tokens reais em tickets, chats, documentação ou ferramentas online de decodificação."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.23 Troubleshooting orientado por evidências",
    "id": "18-23-troubleshooting-orientado-por-evidencias"
  },
  {
    "kind": "paragraph",
    "text": "O diagnóstico começa classificando a falha. Erro de parsing indica estrutura, Base64url ou JSON. Invalid signature aponta para chave, algoritmo, bytes, ambiente ou corrupção. Unknown kid sugere rotação, cache ou issuer incorreto. Invalid audience e invalid issuer são falhas semânticas, não criptográficas."
  },
  {
    "kind": "paragraph",
    "text": "Compare o token com metadata do issuer sem expor o valor completo. Registre alg, kid, typ, iss, aud, exp e horário local. Consulte o JWKS confiável e confirme kty, use, key_ops e alg. Verifique se a chave nova já está publicada e se a antiga ainda deveria permanecer. Em clusters, compare caches e relógios entre instâncias."
  },
  {
    "kind": "paragraph",
    "text": "Para JWE, separe falha de key management, decriptação e tag. Chave privada errada, alg incompatível, IV inválido e ciphertext alterado produzem sintomas distintos na biblioteca, mas a resposta externa deve ser genérica para não criar oracle. Preserve detalhes apenas em logs restritos."
  },
  {
    "kind": "paragraph",
    "text": "Em gateways, correlacione access log, trace de política, métricas de metadata, cache e backend. Uma resposta 401 pode ser produzida pelo gateway, pela API ou por outro proxy. Identifique o componente exato e a etapa que falhou antes de alterar configuração."
  },
  {
    "kind": "table",
    "caption": "Tabela 12 - Sintomas de token apontam para etapas diferentes do pipeline.",
    "headers": [
      "Sintoma",
      "Hipóteses iniciais",
      "Evidência"
    ],
    "rows": [
      [
        "Malformed JWT",
        "Segmentos, Base64url, JSON ou tamanho.",
        "Contagem de partes e erro do parser."
      ],
      [
        "Invalid signature",
        "Chave errada, alg, token alterado ou ambiente.",
        "Issuer, kid, JWK e bytes recebidos."
      ],
      [
        "Unknown kid",
        "Rotação, cache ou issuer equivocado.",
        "JWKS atual, cache age e timeline de rotação."
      ],
      [
        "Expired / not yet valid",
        "Relógio, exp, nbf ou tolerância.",
        "UTC de todas as instâncias e claims temporais."
      ],
      [
        "Invalid audience",
        "Token emitido para outro recurso.",
        "aud, resource solicitado e configuração da API."
      ],
      [
        "Decryption failed",
        "Chave privada, alg, enc, IV ou tag.",
        "Configuração JWE e erro interno restrito."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "18.24 Estudos de caso e laboratórios",
    "id": "18-24-estudos-de-caso-e-laboratorios"
  },
  {
    "kind": "paragraph",
    "text": "Caso 1 - rotação intermitente: algumas instâncias aceitam o novo kid e outras retornam 401. A investigação mostra caches locais com tempos diferentes e atualização sem coalescência. A correção publica a chave com antecedência, padroniza cache, adiciona refresh controlado e mantém a chave antiga durante a validade máxima."
  },
  {
    "kind": "paragraph",
    "text": "Caso 2 - token válido para audiência errada: o gateway verifica a assinatura de um token emitido para o portal e encaminha a chamada à API. A correção exige typ e audience da API, separa validadores de ID Token e access token e adiciona teste negativo ao pipeline."
  },
  {
    "kind": "paragraph",
    "text": "Caso 3 - chave por URL do token: uma biblioteca segue jku e permite que o atacante forneça sua própria chave. A correção remove resolução dinâmica, fixa metadata por issuer, bloqueia egress não necessário e revisa tokens já aceitos."
  },
  {
    "kind": "paragraph",
    "text": "Caso 4 - claims sensíveis em logs: um incidente revela que APM armazenava Authorization completo. A correção mascara o header no primeiro ponto de entrada, reduz claims emitidas, aplica retenção e revoga tokens potencialmente expostos."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 1 - validar um JWS com biblioteca local"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Gere um par de chaves de laboratório em ambiente isolado e autorizado.",
      "Emita um JWS de curta duração com iss, aud, exp, typ e kid.",
      "Valide com allowlist de algoritmo e chave pública pré-configurada.",
      "Altere um byte do payload e observe a falha criptográfica.",
      "Mude aud sem reassinar para comparar falha de assinatura e falha semântica."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 2 - simular rotação de JWKS"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Publique K1 e emita tokens com kid K1.",
      "Adicione K2 ao conjunto antes de usá-la para assinatura.",
      "Atualize o signer para K2 e mantenha K1 disponível.",
      "Observe comportamento de caches em diferentes instâncias.",
      "Remova K1 apenas após expiração dos tokens e da margem operacional."
    ]
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Laboratório 3 - testes negativos obrigatórios"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Rejeite alg none e algoritmo fora da allowlist.",
      "Rejeite issuer, audience e typ incorretos.",
      "Rejeite token expirado, futuro ou excessivamente grande.",
      "Rejeite kid desconhecido sem provocar refresh ilimitado.",
      "Rejeite crit desconhecido e headers remotos não autorizados.",
      "Rejeite ID Token apresentado à API como access token."
    ]
  },
  {
    "kind": "subhead",
    "text": "Segurança do laboratório"
  },
  {
    "kind": "paragraph",
    "text": "Use somente chaves e tokens fictícios. Nunca copie credenciais de produção para ferramentas de teste, sites de decodificação ou documentos de treinamento."
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Resumo do capítulo",
    "id": "resumo-do-capitulo"
  },
  {
    "kind": "paragraph",
    "text": "JOSE separa claims, assinatura, criptografia, algoritmos e representação de chaves. JWT não significa automaticamente token assinado, access token ou credencial segura. A confiança surge da combinação entre estrutura válida, operação criptográfica correta, chave vinculada a um issuer permitido e validação semântica do perfil."
  },
  {
    "kind": "paragraph",
    "text": "JWS protege integridade e origem, mas mantém o payload legível. JWE protege confidencialidade por criptografia autenticada e separa alg, responsável pela CEK, de enc, responsável pelo conteúdo. Tokens aninhados podem combinar propriedades, mas aumentam complexidade e precisam de perfil claro."
  },
  {
    "kind": "paragraph",
    "text": "JWKS e rotação fazem parte do runtime. Publicação antecipada, cache controlado, sobreposição e retirada planejada evitam indisponibilidade. kid é apenas uma dica dentro do issuer; URLs e chaves fornecidas pelo próprio token não devem criar confiança."
  },
  {
    "kind": "paragraph",
    "text": "A RFC 8725 orienta allowlists, validações mutuamente exclusivas, tipagem explícita e proteção contra confusão. A RFC 9864 atualiza o tratamento de algoritmos totalmente especificados, e o registro IANA continua sendo a referência operacional para nomes e status."
  },
  {
    "kind": "heading",
    "level": 3,
    "text": "Checklist de projeto e operação"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Existe um perfil documentado para cada tipo de JWT aceito?",
      "Issuer, audience, typ e algoritmos são definidos por configuração confiável?",
      "A validação usa chave do issuer correto e não um cache global por kid?",
      "JWKS possui cache, limites, refresh coalescido e rotação testada?",
      "Chaves privadas ficam em HSM, KMS ou cofre com auditoria?",
      "Algoritmos são compatíveis com kty, use e key_ops?",
      "Claims temporais usam UTC, relógio sincronizado e tolerância limitada?",
      "ID Tokens, access tokens, client assertions e logout tokens usam validadores separados?",
      "Headers jku, x5u, jwk e crit recebem tratamento seguro?",
      "Logs mascaram Authorization e não armazenam tokens completos?",
      "Testes negativos cobrem confusão de tipo, audience, algoritmo e rotação?",
      "Existe procedimento de comprometimento e retirada emergencial de chave?"
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Exercícios de revisão",
    "id": "exercicios-de-revisao"
  },
  {
    "kind": "list",
    "ordered": false,
    "items": [
      "Explique por que um JWT decodificado com sucesso ainda não é confiável.",
      "Descreva a diferença entre JWT, JWS e JWE usando um exemplo de API.",
      "Calcule quais componentes podem emitir tokens quando HS256 é compartilhado entre cinco APIs.",
      "Proponha uma sequência de rotação para tokens com validade de 20 minutos e cache JWKS de 10 minutos.",
      "Explique por que kid não pode identificar uma chave globalmente.",
      "Diferencie alg e enc em uma JWE com RSA-OAEP-256 e A256GCM.",
      "Descreva como typ ajuda a impedir uso de ID Token como access token.",
      "Explique o risco de seguir jku informado pelo token.",
      "Compare token JWT localmente validado e token opaco com introspecção.",
      "Defina quais informações podem ser registradas em logs sem copiar a credencial."
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Glossário",
    "id": "glossario"
  },
  {
    "kind": "table",
    "caption": "Tabela 13 - Vocabulário essencial do capítulo.",
    "headers": [
      "Termo",
      "Definição"
    ],
    "rows": [
      [
        "AAD",
        "Additional Authenticated Data; dados autenticados sem serem cifrados."
      ],
      [
        "alg",
        "Algoritmo de assinatura, MAC ou gerenciamento de chave."
      ],
      [
        "Base64url",
        "Codificação de bytes segura para URLs, sem confidencialidade."
      ],
      [
        "CEK",
        "Content Encryption Key usada para cifrar o conteúdo em JWE."
      ],
      [
        "claims set",
        "Objeto JSON contendo afirmações transportadas pelo JWT."
      ],
      [
        "crit",
        "Lista de parâmetros críticos que o consumidor deve compreender."
      ],
      [
        "cty",
        "Tipo do conteúdo protegido, útil em objetos aninhados."
      ],
      [
        "enc",
        "Algoritmo de criptografia autenticada do conteúdo JWE."
      ],
      [
        "JWA",
        "JSON Web Algorithms; identificadores e parâmetros criptográficos."
      ],
      [
        "JWE",
        "JSON Web Encryption; estrutura de criptografia autenticada."
      ],
      [
        "JWK",
        "JSON Web Key; representação JSON de uma chave."
      ],
      [
        "JWKS",
        "JSON Web Key Set; conjunto de JWKs."
      ],
      [
        "JWS",
        "JSON Web Signature; assinatura digital ou MAC sobre bytes."
      ],
      [
        "JWT",
        "JSON Web Token; conjunto de claims protegido por JWS ou JWE."
      ],
      [
        "kid",
        "Key ID; dica de seleção de chave dentro de um contexto."
      ],
      [
        "Nested JWT",
        "JWT protegido em múltiplas camadas, como JWS dentro de JWE."
      ],
      [
        "thumbprint",
        "Digest derivado de chave ou certificado para identificação."
      ],
      [
        "typ",
        "Tipo de objeto declarado para processamento da aplicação."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Anexo A - Matriz de decisão",
    "id": "anexo-a-matriz-de-decisao"
  },
  {
    "kind": "table",
    "caption": "Tabela 14 - A arquitetura depende do requisito, não apenas da preferência por JWT.",
    "headers": [
      "Necessidade",
      "Estratégia inicial",
      "Controles essenciais"
    ],
    "rows": [
      [
        "API valida localmente",
        "JWS assimétrico e JWKS.",
        "Issuer, audience, typ, allowlist, cache e rotação."
      ],
      [
        "Revogação imediata",
        "Token opaco ou introspecção.",
        "Disponibilidade do AS, cache curto e autenticação do RS."
      ],
      [
        "Claims confidenciais",
        "JWE ou referência opaca.",
        "Minimização, alg/enc, chave de destinatário e logging."
      ],
      [
        "Vários validadores",
        "Assinatura assimétrica.",
        "Privada apenas no emissor e pública distribuída."
      ],
      [
        "Prova de posse",
        "DPoP ou mTLS-bound token.",
        "cnf, prova por requisição, nonce e proxies confiáveis."
      ],
      [
        "Múltiplos tipos de JWT",
        "Validadores separados e typ explícito.",
        "Regras mutuamente exclusivas e testes negativos."
      ],
      [
        "Rotação frequente",
        "JWKS com sobreposição planejada.",
        "Publicar antes, cache controlado e retirar depois."
      ],
      [
        "Credencial seletiva",
        "SD-JWT conforme RFC 9901.",
        "Disclosures, key binding, privacidade e perfil específico."
      ]
    ]
  },
  {
    "kind": "heading",
    "level": 2,
    "text": "Referências técnicas",
    "id": "referencias-tecnicas"
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
      "IETF. RFC 9068 - JWT Profile for OAuth 2.0 Access Tokens. 2021.",
      "IETF. RFC 9101 - OAuth 2.0 JWT-Secured Authorization Request. 2021.",
      "IETF. RFC 9278 - JWK Thumbprint URI. 2022.",
      "IETF. RFC 9701 - JWT Response for OAuth Token Introspection. 2025.",
      "IETF. RFC 9864 - Fully-Specified Algorithms for JOSE and COSE. 2025.",
      "IETF. RFC 9901 - Selective Disclosure for JSON Web Tokens. 2025.",
      "IANA. JSON Object Signing and Encryption (JOSE) registries.",
      "IANA. JSON Web Token Claims registry.",
      "Microsoft Learn. Azure API Management validate-jwt e validate-azure-ad-token policies.",
      "Axway Documentation. API Gateway JWT validation, signing and encryption filters.",
      "OWASP. JSON Web Token Cheat Sheet for Java e OAuth 2.0 Security Cheat Sheet."
    ]
  },
  {
    "kind": "subhead",
    "text": "Nota de atualização"
  },
  {
    "kind": "paragraph",
    "text": "Algoritmos, registros e perfis JOSE continuam evoluindo. Antes de implantar uma combinação, confirme o status atual no registro IANA, as RFCs que atualizam a especificação e o suporte exato da biblioteca, do HSM, do provedor de identidade e do API Gateway."
  }
];
