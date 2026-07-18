from __future__ import annotations

import copy
import json
import re
import sys
from pathlib import Path

import fitz
from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r'C:\Users\joaor\Downloads\FAAC\FAAC_Capitulo_04_DNS_NAT_Proxies_e_Balanceadores.pdf'
)

OUTPUTS = {
    'pt': ROOT / 'src/app/learn/dns-nat-proxies-balanceadores/dns-nat-content.data.ts',
    'en': ROOT / 'src/app/learn/dns-nat-proxies-load-balancers/dns-nat-content.data.ts',
    'es': ROOT / 'src/app/learn/dns-nat-proxies-balanceadores-es/dns-nat-content.data.ts',
}

FIGURE_FILES = [
    'figure-01-dns-hierarchy.svg',
    'figure-02-recursive-resolution.svg',
    'figure-03-ttl-cache.svg',
    'figure-04-dns-transports.svg',
    'figure-05-split-horizon.svg',
    'figure-06-pat-state.svg',
    'figure-07-http-intermediaries.svg',
    'figure-08-tls-modes.svg',
    'figure-09-l4-l7.svg',
    'figure-10-load-balancing-algorithms.svg',
    'figure-11-endpoint-health-lifecycle.svg',
    'figure-12-api-request-path.svg',
    'figure-13-azure-services.svg',
]

FIGURE_ALTS = [
    'Árvore hierárquica do DNS com raiz, TLDs, zonas e delegações',
    'Sequência de resolução DNS entre aplicação, resolvedor recursivo, raiz, TLD e servidor autoritativo',
    'Linha do tempo de TTL com cache positivo, cache negativo, expiração e nova resolução',
    'Comparação dos transportes DNS UDP, TCP, EDNS, DNS over TLS e DNS over HTTPS',
    'Split-horizon DNS direcionando o mesmo nome para endpoints público e privado',
    'Tabela de estado PAT traduzindo fluxos internos para portas públicas distintas',
    'Comparação entre forward proxy, reverse proxy, gateway e túnel HTTP',
    'Comparação entre TLS pass-through, offload, re-encryption e mTLS na borda',
    'Comparação entre balanceamento de camada 4 e camada 7',
    'Comparação entre algoritmos de seleção de backend',
    'Ciclo de vida de saúde de um endpoint entre inicialização, readiness, degradação, indisponibilidade e drenagem',
    'Caminho corporativo de uma chamada de API entre cliente, DNS, borda, API Gateway, balanceador e backend',
    'Mapa conceitual de Traffic Manager, Front Door, Load Balancer, Application Gateway e API Management',
]

TABLES = {
    1: {
        'caption': 'Tabela 1 - Responsabilidades que devem ser analisadas separadamente.',
        'headers': ['Mecanismo', 'Entrada principal', 'Decisão ou transformação', 'Evidência típica'],
        'rows': [
            ['DNS', 'Nome e tipo de registro', 'Retorna dados de resolução', 'dig, nslookup, Resolve-DnsName'],
            ['NAT', 'Fluxo IP/porta', 'Traduz origem ou destino', 'Tabela NAT, captura, flow logs'],
            ['Proxy', 'Conexão e protocolo', 'Termina e recria comunicação', 'Access log, upstream log, headers'],
            ['Load balancer', 'Pool elegível', 'Seleciona destino', 'Health, algoritmo, backend metrics'],
        ],
    },
    2: {
        'caption': 'Tabela 2 - Componentes de autoridade e delegação.',
        'headers': ['Elemento', 'Função', 'Falha típica'],
        'rows': [
            ['Zona', 'Unidade administrativa de dados DNS', 'Registro criado na zona errada'],
            ['Delegação NS', 'Indica autoridade da zona filha', 'NS inconsistente ou indisponível'],
            ['Glue', 'Fornece endereço para nameserver dentro da zona delegada', 'Dependência circular de resolução'],
            ['SOA serial', 'Versiona o conteúdo da zona', 'Secundário não detecta atualização'],
            ['Servidor autoritativo', 'Responde pelos dados da zona', 'Respostas divergentes entre réplicas'],
        ],
    },
    3: {
        'caption': 'Tabela 3 - Resource records frequentes em ambientes corporativos.',
        'headers': ['Tipo', 'Dados principais', 'Uso em arquitetura de APIs'],
        'rows': [
            ['A', 'Endereço IPv4', 'Endpoint público ou privado'],
            ['AAAA', 'Endereço IPv6', 'Dual stack e acesso IPv6'],
            ['CNAME', 'Nome canônico', 'Alias para front door, CDN ou serviço gerenciado'],
            ['NS', 'Servidor de nomes', 'Delegação da zona'],
            ['SOA', 'Metadados da zona', 'Serial e parâmetros administrativos'],
            ['PTR', 'Nome associado ao IP', 'Resolução reversa e auditoria'],
            ['SRV', 'Prioridade, peso, porta e alvo', 'Service discovery em protocolos compatíveis'],
            ['CAA', 'CA autorizada', 'Governança de emissão de certificados'],
            ['TXT', 'Texto arbitrário', 'Verificações de domínio e políticas'],
        ],
    },
    4: {
        'caption': 'Tabela 4 - Falhas relacionadas ao transporte DNS.',
        'headers': ['Sintoma', 'Possível causa', 'Teste'],
        'rows': [
            ['Consultas simples funcionam, DNSSEC falha', 'EDNS ou respostas grandes filtradas', 'dig +dnssec e captura'],
            ['UDP funciona, resposta grande falha', 'TCP/53 bloqueado após TC=1', 'dig +tcp'],
            ['Aplicação ignora DNS privado', 'DoH próprio ou resolver externo', 'Verificar destino DNS da aplicação'],
            ['Timeout somente em uma filial', 'Fragmentação/MTU ou firewall DNS', 'Comparar payload EDNS e caminho'],
        ],
    },
    5: {
        'caption': 'Tabela 5 - Formas diferentes de distribuição global.',
        'headers': ['Estratégia', 'Momento da decisão', 'Vantagem', 'Limitação'],
        'rows': [
            ['Múltiplos A/AAAA', 'No cliente/resolvedor', 'Simplicidade', 'Saúde e escolha variam por cliente'],
            ['GSLB por DNS', 'Durante resolução', 'Distribuição global e failover', 'TTL e visão do resolver'],
            ['Anycast', 'Roteamento IP', 'Endpoint global com proximidade', 'Depende de anúncios e convergência'],
            ['Reverse proxy global', 'A cada conexão/requisição', 'Controle L7, WAF e TLS', 'Tráfego passa pelo serviço'],
        ],
    },
    6: {
        'caption': 'Tabela 6 - Modalidades de tradução e seus impactos.',
        'headers': ['Tipo', 'Campo alterado', 'Uso frequente', 'Risco operacional'],
        'rows': [
            ['SNAT', 'Origem', 'Saída de gateway/API para backend', 'Esgotamento de portas e allowlist'],
            ['DNAT', 'Destino', 'VIP ou publicação de serviço', 'Retorno assimétrico'],
            ['PAT/NAPT', 'IP e porta', 'Compartilhar endereço externo', 'Estado e timeout'],
            ['Hairpin', 'Tradução de retorno interno', 'Acesso interno ao endereço externo', 'Fluxo assimétrico'],
            ['CGNAT', 'Origem no provedor', 'Compartilhar IPv4 entre assinantes', 'IP não identifica cliente'],
        ],
    },
    7: {
        'caption': 'Tabela 7 - Critérios para escolha do algoritmo.',
        'headers': ['Algoritmo', 'Sinal usado', 'Indicado quando', 'Cuidado'],
        'rows': [
            ['Round robin', 'Sequência', 'Instâncias e requisições semelhantes', 'Ignora carga atual'],
            ['Weighted RR', 'Peso estático/dinâmico', 'Capacidades diferentes', 'Pesos incorretos concentram carga'],
            ['Least connections', 'Conexões ativas', 'Sessões de duração variável', 'HTTP/2 distorce a métrica'],
            ['Least response time', 'Latência e atividade', 'Desempenho variável', 'Pode oscilar'],
            ['Hash', 'Chave da requisição', 'Afinidade e cache local', 'Remapeamento e hotspots'],
            ['Consistent hash', 'Anel/tabela estável', 'Reduzir churn de afinidade', 'Mais complexidade'],
        ],
    },
    8: {
        'caption': 'Tabela 8 - Estado e persistência alteram a distribuição.',
        'headers': ['Mecanismo', 'Benefício', 'Efeito colateral'],
        'rows': [
            ['Cookie affinity', 'Sessão estável', 'Dependência de backend e failover'],
            ['IP hash', 'Sem cookie', 'NAT concentra clientes'],
            ['Connection pooling', 'Menos handshake e SNAT', 'Conexões antigas e concentração'],
            ['HTTP/2 multiplexing', 'Alta eficiência', 'Conexão não representa carga'],
            ['Draining', 'Deploy sem interrupção abrupta', 'Precisa de timeout coordenado'],
        ],
    },
    9: {
        'caption': 'Tabela 9 - Exemplo de divisão de responsabilidades.',
        'headers': ['Camada', 'Responsabilidade recomendada', 'Evitar duplicidade de'],
        'rows': [
            ['DNS/GSLB', 'Escolha global e failover de endpoint', 'Regras de aplicação'],
            ['Borda/WAF', 'Proteção pública, TLS, roteamento amplo', 'Autorização de negócio'],
            ['API Gateway', 'Autenticação, quotas, transformação, governança', 'Balanceamento global improvisado'],
            ['LB/Ingress', 'Distribuição local e health', 'Políticas de identidade duplicadas'],
            ['Service mesh', 'Resiliência service-to-service e mTLS interno', 'Retries sem orçamento'],
            ['Aplicação', 'Regra de negócio e estado funcional', 'Confiança em headers não validados'],
        ],
    },
    10: {
        'caption': 'Tabela 10 - Mapeamento conceitual de serviços Azure.',
        'headers': ['Serviço', 'Escopo/camada', 'Permanece no caminho?', 'Uso principal'],
        'rows': [
            ['Traffic Manager', 'Global por DNS', 'Não', 'Escolher endpoint por política e saúde'],
            ['Front Door', 'Global L7', 'Sim', 'Reverse proxy, WAF, TLS e aceleração'],
            ['Load Balancer', 'Regional L4', 'Sim', 'Distribuir fluxos TCP/UDP'],
            ['Application Gateway', 'Regional L7', 'Sim', 'Host/path routing, WAF e TLS'],
            ['API Management', 'API Gateway', 'Sim', 'Segurança, políticas e governança de APIs'],
        ],
    },
    11: {
        'caption': 'Tabela 11 - Sintomas e linhas iniciais de investigação.',
        'headers': ['Sintoma', 'Hipóteses prioritárias', 'Evidências'],
        'rows': [
            ['NXDOMAIN após criar registro', 'Cache negativo ou zona errada', 'SOA, TTL negativo, consulta autoritativa'],
            ['Funciona por IP, falha por nome', 'DNS, SNI, Host ou certificado', 'dig, curl --resolve, s_client'],
            ['Alguns clientes usam endpoint antigo', 'TTL/cache/conexão persistente', 'TTL restante e pool de conexões'],
            ['502 intermitente', 'DNS múltiplo, TLS upstream, SNAT, reset', 'Backend escolhido e erro detalhado'],
            ['503 no balanceador', 'Todos unhealthy ou pool vazio', 'Status de health e probe logs'],
            ['504 após tempo fixo', 'Timeout em uma camada', 'Duração e emissor do status'],
            ['Backend vê IP do proxy', 'Reverse proxy ou SNAT', 'Headers confiáveis e captura'],
            ['Distribuição desigual', 'Keep-alive, HTTP/2, afinidade, pesos', 'Requisições por backend e conexões'],
            ['Health verde, API falha', 'Probe superficial', 'Testar dependências e path real'],
            ['Somente respostas grandes DNS falham', 'TCP/53, EDNS ou fragmentação', 'TC flag, dig +tcp, captura'],
        ],
    },
    12: {
        'caption': 'Tabela 12 - Glossário do capítulo.',
        'headers': ['Termo', 'Definição'],
        'rows': [
            ['Authoritative server', 'Servidor que responde com autoridade sobre uma zona.'],
            ['CNAME', 'Registro que define um nome como alias de outro nome canônico.'],
            ['Delegação', 'Transferência de autoridade de uma parte da árvore DNS para outra zona.'],
            ['DNAT', 'Tradução do endereço ou porta de destino.'],
            ['DNSSEC', 'Extensões que fornecem autenticação de origem e integridade para dados DNS.'],
            ['DoH', 'Transporte de mensagens DNS sobre HTTPS.'],
            ['DoT', 'Transporte de mensagens DNS sobre TLS.'],
            ['EDNS(0)', 'Mecanismo extensível que anuncia capacidades e payload UDP DNS.'],
            ['Forward proxy', 'Intermediário que representa clientes diante de destinos.'],
            ['Forwarded', 'Header HTTP padronizado para metadados de proxying.'],
            ['FQDN', 'Nome de domínio totalmente qualificado.'],
            ['Glue record', 'Endereço fornecido pelo pai para alcançar nameserver dentro da zona delegada.'],
            ['GSLB', 'Distribuição global de tráfego, frequentemente baseada em DNS e saúde.'],
            ['Hairpin NAT', 'Tradução que permite a cliente interno acessar o endereço externo de serviço interno.'],
            ['Health check', 'Teste usado para decidir se um endpoint deve permanecer elegível.'],
            ['Least connections', 'Algoritmo que escolhe o endpoint com menos conexões ativas.'],
            ['NAPT/PAT', 'Tradução que inclui endereços e portas de transporte.'],
            ['Negative caching', 'Cache de inexistência de nome ou tipo DNS.'],
            ['Recursive resolver', 'Servidor que obtém a resposta final em nome do cliente e mantém cache.'],
            ['Reverse proxy', 'Intermediário que representa servidores e seleciona upstream.'],
            ['RRset', 'Conjunto de registros com mesmo nome, classe e tipo.'],
            ['Session affinity', 'Mecanismo que tenta manter requisições relacionadas no mesmo backend.'],
            ['SNI', 'Indicação de hostname enviada durante o handshake TLS.'],
            ['SNAT', 'Tradução do endereço ou porta de origem.'],
            ['Split-horizon DNS', 'Respostas diferentes para o mesmo nome conforme o ambiente de resolução.'],
            ['Stub resolver', 'Componente local que envia consultas a um resolvedor recursivo.'],
            ['TTL', 'Tempo pelo qual dados DNS podem permanecer em cache.'],
            ['Tunnel', 'Intermediário que encaminha bytes após estabelecer um túnel.'],
            ['Upstream', 'Destino ao qual proxy ou gateway encaminha tráfego.'],
            ['Zone', 'Porção administrada do espaço de nomes DNS.'],
        ],
    },
}

TABLE_REGIONS = {
    3: [(50, 280)], 5: [(50, 320)], 7: [(95, 460)], 9: [(515, 725)],
    11: [(245, 455)], 13: [(350, 605)], 18: [(685, 810)], 19: [(45, 290)],
    21: [(50, 260)], 22: [(365, 675)], 24: [(365, 630)], 25: [(390, 790)],
    30: [(320, 810)], 31: [(45, 810)], 32: [(45, 65)],
}

CALLOUTS = {
    'Princípio central', 'Nome absoluto', 'Mudança segura de endpoint', 'Private endpoint não é DNS',
    'DNS rebinding', 'Diagnóstico de SNAT', 'Nunca confie cegamente em X-Forwarded-For',
    'Health check de API Gateway', 'Aplicação prática em Axway', 'Aplicação no mundo bancário',
}

MAJOR_HEADINGS = {
    'Apresentação do capítulo', 'Resumo do capítulo', 'Exercícios de fixação', 'Glossário técnico',
    'Referências oficiais e leituras recomendadas',
}

HEADING_OVERRIDES = {
    'en': {
        'Apresentação do capítulo': 'Chapter overview',
        'Objetivos de aprendizagem': 'Learning objectives',
        'Estrutura do capítulo': 'Chapter structure',
        'Resumo do capítulo': 'Chapter summary',
        'Checklist de arquitetura': 'Architecture checklist',
        'Exercícios de fixação': 'Review exercises',
        'Questões de cenário': 'Scenario questions',
        'Glossário técnico': 'Technical glossary',
        'Referências oficiais e leituras recomendadas': 'Official references and recommended reading',
        'Próximo capítulo': 'Next chapter',
    },
    'es': {
        'Apresentação do capítulo': 'Presentación del capítulo',
        'Objetivos de aprendizagem': 'Objetivos de aprendizaje',
        'Estrutura do capítulo': 'Estructura del capítulo',
        'Resumo do capítulo': 'Resumen del capítulo',
        'Checklist de arquitetura': 'Checklist de arquitectura',
        'Exercícios de fixação': 'Ejercicios de repaso',
        'Questões de cenário': 'Preguntas de escenario',
        'Glossário técnico': 'Glosario técnico',
        'Referências oficiais e leituras recomendadas': 'Referencias oficiales y lecturas recomendadas',
        'Próximo capítulo': 'Próximo capítulo',
    },
}

TERMINOLOGY_REPLACEMENTS = {
    'en': [
        ('payments.company.com', 'pagamentos.empresa.com'),
        ('company.com', 'empresa.com'),
        ('enterprise corp.', 'corp.empresa'),
        ('recursive solver', 'recursive resolver'),
        ('Recursive solver', 'Recursive resolver'),
        ('authoritative solver', 'authoritative server'),
        ('Authoritative solver', 'Authoritative server'),
        ('solver view', 'resolver view'),
        ('continue solving until', 'continue resolving until'),
        ('Recursive starts with a root', 'The recursive resolver starts with a root server'),
        ('receives reference to the authoritative', 'receives a referral to the authoritative server'),
        ('queries the end zone', 'queries the final authoritative server'),
        ('between authoritative entities', 'between authoritative servers'),
        ('in the authoritative does not guarantee', 'on the authoritative server does not guarantee'),
        ('expired subscription', 'expired signature'),
        ('drainage', 'draining'),
        ('Observation laboratories', 'Observation labs'),
        ('query the bank', 'query the database'),
        ('makes false liveness', 'makes liveness false'),
        ('direct feedback from the server', 'a direct response from the server'),
        ('the parent with needs to provide', 'the .com parent needs to provide'),
        ('authoritative updating', 'an authoritative update'),
        ('customer experience', 'client experience'),
        ('Recursive solve', 'Recursive resolver'),
        ('stub resolve', 'stub resolver'),
        ('A direct consultation with the authoritative', 'A direct query to the authoritative server'),
        ('a direct consultation with the authoritative', 'a direct query to the authoritative server'),
    ],
    'es': [
        ('payments.company.com', 'pagamentos.empresa.com'),
        ('company.com', 'empresa.com'),
        ('corporaciones empresariales.', 'corp.empresa'),
        ('solucionador auxiliar', 'stub resolver'),
        ('código auxiliar', 'stub resolver'),
        ('solucionador recursivo', 'resolvedor recursivo'),
        ('solucionadores recursivos', 'resolvedores recursivos'),
        ('solucionadores específicos', 'resolvedores específicos'),
        ('solucionadores públicos', 'resolvedores públicos'),
        ('solucionadores externos', 'resolvedores externos'),
        ('solucionadores empresariales', 'resolvedores corporativos'),
        ('solucionador de validación', 'resolvedor validador'),
        ('solucionador autorizado', 'servidor autoritativo'),
        ('servidor autorizado', 'servidor autoritativo'),
        ('servidores autorizados', 'servidores autoritativos'),
        ('respuesta autorizada', 'respuesta autoritativa'),
        ('consulta autorizada', 'consulta autoritativa'),
        ('el autorizativo', 'el servidor autoritativo'),
        ('al autorizativo', 'al servidor autoritativo'),
        ('solucionador', 'resolvedor'),
        ('resolutor', 'resolvedor'),
        ('registros adicionales llamados pegamento', 'registros adicionales llamados glue'),
        ('equilibrio de carga', 'balanceo de carga'),
        ('equilibrio basado en DNS', 'balanceo basado en DNS'),
        ('equilibrio L4', 'balanceo L4'),
        ('equilibrio L7', 'balanceo L7'),
        ('equilibrio por solicitud', 'balanceo por solicitud'),
        ('equilibrio global', 'balanceo global'),
        ('fundamentos del equilibrio', 'fundamentos del balanceo'),
        ('Comparación entre el equilibrio', 'Comparación entre el balanceo'),
        ('consultar al banco', 'consultar la base de datos'),
        ('comentarios directos del servidor', 'una respuesta directa del servidor'),
        ('La vivacidad y la disposición', 'Liveness y readiness'),
        ('La vivacidad', 'Liveness'),
        ('la disposición', 'readiness'),
        ('una vida falsa', 'liveness falso'),
        ('una verdadera preparación', 'readiness real'),
        ('prueba la preparación real', 'prueba readiness real'),
        ('La preparación indica', 'Readiness indica'),
        ('la preparación, la parada previa', 'readiness, pre-stop'),
        ('agotamiento de la conexión', 'drenaje de conexiones'),
        ('tiempos de ejecución aún calentándose', 'runtimes que aún se están calentando'),
        ('fuente SNAT', 'origen SNAT'),
        ('recurso recursivo', 'resolvedor recursivo'),
        ('suscripción caducada', 'firma caducada'),
        ('consulta directa con el servidor autoritativo', 'consulta directa al servidor autoritativo'),
        ('Laboratorios de observación', 'Laboratorios prácticos'),
    ],
}


def clean_text(value: str) -> str:
    return re.sub(r'\s+', ' ', value.replace('\uf0b7', '•')).strip()


def block_text(block: dict) -> tuple[str, float, bool, bool]:
    spans = [span for line in block.get('lines', []) for span in line.get('spans', [])]
    text = clean_text(' '.join(span['text'] for span in spans))
    size = max((span['size'] for span in spans), default=0)
    bold = any(span['flags'] & 16 for span in spans)
    mono = bool(spans) and all(span['flags'] & 8 for span in spans)
    return text, size, bold, mono


def block_code(block: dict) -> str:
    return '\n'.join(''.join(span['text'] for span in line.get('spans', [])).rstrip()
                     for line in block.get('lines', [])).strip()


def slugify(value: str) -> str:
    replacements = str.maketrans('áàâãéêíóôõúüçñ', 'aaaaeeiooouucn')
    value = value.lower().translate(replacements)
    value = re.sub(r'[^a-z0-9]+', '-', value).strip('-')
    return value


def append_block(blocks: list[dict], block: dict) -> None:
    if block['kind'] == 'paragraph' and blocks and blocks[-1]['kind'] == 'paragraph':
        if not re.search(r'[.!?:)]$', blocks[-1]['text']):
            blocks[-1]['text'] += ' ' + block['text']
            return
    blocks.append(block)


def extract_portuguese_blocks() -> list[dict]:
    document = fitz.open(PDF_PATH)
    blocks: list[dict] = []
    pending_list: dict | None = None
    figure_index = 0

    def flush_list() -> None:
        nonlocal pending_list
        if pending_list:
            blocks.append(pending_list)
            pending_list = None

    for page_index in range(1, len(document)):
        page = document[page_index]
        page_blocks = sorted(
            (block for block in page.get_text('dict')['blocks'] if 'lines' in block),
            key=lambda block: (block['bbox'][1], block['bbox'][0]),
        )

        for source_block in page_blocks:
            text, size, bold, mono = block_text(source_block)
            y = source_block['bbox'][1]
            if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+', text):
                continue

            figure_match = re.match(r'Figura\s+(\d+)\s+-\s+(.+)', text)
            if figure_match:
                flush_list()
                figure_index = int(figure_match.group(1))
                blocks.append({
                    'kind': 'figure',
                    'src': f'/assets/learn/dns-nat-proxies-load-balancers/pt/{FIGURE_FILES[figure_index - 1]}',
                    'alt': FIGURE_ALTS[figure_index - 1],
                    'caption': text,
                })
                continue

            table_match = re.match(r'Tabela\s+(\d+)\s+-', text)
            if table_match:
                flush_list()
                table_number = int(table_match.group(1))
                table = copy.deepcopy(TABLES[table_number])
                blocks.append({'kind': 'table', **table})
                continue

            if any(start <= y <= end for start, end in TABLE_REGIONS.get(page_index, [])):
                continue

            if mono:
                flush_list()
                blocks.append({'kind': 'code', 'text': block_code(source_block)})
                continue

            if text.startswith('•'):
                items = [clean_text(item) for item in text.split('•') if clean_text(item)]
                if pending_list and pending_list['ordered'] is False:
                    pending_list['items'].extend(items)
                else:
                    flush_list()
                    pending_list = {'kind': 'list', 'ordered': False, 'items': items}
                continue

            numbered = re.match(r'^(\d+)\.\s+(.+)', text)
            if numbered and size < 13:
                item = numbered.group(2)
                if pending_list and pending_list['ordered'] is True:
                    pending_list['items'].append(item)
                else:
                    flush_list()
                    pending_list = {'kind': 'list', 'ordered': True, 'items': [item]}
                continue

            flush_list()
            if size >= 18 or text in MAJOR_HEADINGS:
                block_id = 'glossario' if text == 'Glossário técnico' else slugify(text)
                blocks.append({'kind': 'heading', 'level': 2, 'text': text, 'id': block_id})
            elif size >= 13.5 and bold:
                blocks.append({'kind': 'heading', 'level': 3, 'text': text})
            elif text in CALLOUTS or (bold and size >= 9.4):
                blocks.append({'kind': 'subhead', 'text': text})
            else:
                append_block(blocks, {'kind': 'paragraph', 'text': text})

    flush_list()
    return blocks


def translatable_values(blocks: list[dict]) -> list[str]:
    values: list[str] = []
    for block in blocks:
        if block['kind'] in {'heading', 'subhead', 'paragraph'}:
            values.append(block['text'])
        elif block['kind'] == 'list':
            for item in block['items']:
                if not re.match(r'^(RFC\s+\d+|IANA\s+-|NGINX\s+-|Envoy\s+-|Axway\s+-|Azure\s+|Integrate\s+)', item):
                    values.append(item)
        elif block['kind'] == 'figure':
            values.extend([block['alt'], block['caption']])
        elif block['kind'] == 'table':
            values.append(block['caption'])
            values.extend(block['headers'])
            values.extend(cell for row in block['rows'] for cell in row)
    return list(dict.fromkeys(values))


def translate_values(values: list[str], target: str) -> dict[str, str]:
    translated: dict[str, str] = {}
    groups: list[list[tuple[int, str]]] = []
    current: list[tuple[int, str]] = []
    current_size = 0
    for index, value in enumerate(values):
        estimated = len(value) + 24
        if current and current_size + estimated > 3900:
            groups.append(current)
            current = []
            current_size = 0
        current.append((index, value))
        current_size += estimated
    if current:
        groups.append(current)

    translator = GoogleTranslator(source='pt', target=target)
    for group_index, group in enumerate(groups, start=1):
        payload = '\n'.join(f'[[[UTB{index:04d}]]]\n{value}' for index, value in group)
        result = translator.translate(payload)
        parts = re.split(r'\[\[\[UTB(\d{4})\]\]\]', result)
        parsed: dict[int, str] = {}
        for position in range(1, len(parts), 2):
            parsed[int(parts[position])] = parts[position + 1].strip()
        if len(parsed) != len(group):
            parsed = {index: translator.translate(value) for index, value in group}
        for index, original in group:
            translated[original] = clean_text(parsed[index])
        print(f'{target}: translated group {group_index}/{len(groups)}', flush=True)
    return translated


def localize_blocks(source: list[dict], locale: str) -> list[dict]:
    target = 'en' if locale == 'en' else 'es'
    values = translatable_values(source)
    translations = translate_values(values, target)
    translations.update(HEADING_OVERRIDES[locale])
    localized = copy.deepcopy(source)

    for block in localized:
        kind = block['kind']
        if kind in {'heading', 'subhead', 'paragraph'}:
            original = block['text']
            block['text'] = translations.get(original, original)
            if kind == 'heading' and block.get('level') == 2:
                block['id'] = 'glossario' if original == 'Glossário técnico' else slugify(block['text'])
        elif kind == 'list':
            block['items'] = [translations.get(item, item) for item in block['items']]
        elif kind == 'figure':
            block['alt'] = translations[block['alt']]
            block['caption'] = translations[block['caption']]
            block['src'] = block['src'].replace('/pt/', f'/{locale}/')
        elif kind == 'table':
            block['caption'] = translations[block['caption']]
            block['headers'] = [translations.get(value, value) for value in block['headers']]
            block['rows'] = [[translations.get(value, value) for value in row] for row in block['rows']]
        elif kind == 'code':
            if locale == 'en':
                block['text'] = (block['text']
                    .replace('; Exemplo didático de zona', '; Educational zone example')
                    .replace('# Rede e sockets', '# Network and sockets'))
            else:
                block['text'] = (block['text']
                    .replace('; Exemplo didático de zona', '; Ejemplo didáctico de zona')
                    .replace('# Rede e sockets', '# Red y sockets'))

        for field in ('text', 'alt', 'caption'):
            if field in block:
                for before, after in TERMINOLOGY_REPLACEMENTS[locale]:
                    block[field] = block[field].replace(before, after)
        if kind == 'list':
            block['items'] = [
                polish_value(item, locale) for item in block['items']
            ]
        elif kind == 'table':
            block['headers'] = [polish_value(value, locale) for value in block['headers']]
            block['rows'] = [[polish_value(value, locale) for value in row] for row in block['rows']]
    return localized


def polish_value(value: str, locale: str) -> str:
    for before, after in TERMINOLOGY_REPLACEMENTS[locale]:
        value = value.replace(before, after)
    return value


def write_typescript(path: Path, const_name: str, blocks: list[dict], locale: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    comment = {
        'pt': 'Conteúdo extraído integralmente do PDF fornecido; apenas cabeçalhos, rodapés e quebras físicas de página foram removidos.',
        'en': 'Full translation of the supplied PDF; only headers, footers, and physical page breaks were removed.',
        'es': 'Traducción íntegra del PDF suministrado; solo se eliminaron encabezados, pies de página y saltos físicos de página.',
    }[locale]
    payload = json.dumps(blocks, ensure_ascii=False, indent=2)
    path.write_text(
        "import { ChapterBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';\n\n"
        f'// {comment}\n'
        f'export const {const_name}: ChapterBlock[] = {payload};\n',
        encoding='utf-8',
    )


portuguese = extract_portuguese_blocks()
english = localize_blocks(portuguese, 'en')
spanish = localize_blocks(portuguese, 'es')

write_typescript(OUTPUTS['pt'], 'DNS_NAT_PT_CHAPTER_BLOCKS', portuguese, 'pt')
write_typescript(OUTPUTS['en'], 'DNS_NAT_EN_CHAPTER_BLOCKS', english, 'en')
write_typescript(OUTPUTS['es'], 'DNS_NAT_ES_CHAPTER_BLOCKS', spanish, 'es')

print(f'Generated {len(portuguese)} Portuguese blocks and two complete translations.')
