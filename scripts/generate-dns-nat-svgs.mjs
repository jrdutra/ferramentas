import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/assets/learn/dns-nat-proxies-load-balancers/', import.meta.url));

const locales = {
  pt: {
    titles: ['DNS: hierarquia e delegação', 'Resolução recursiva e consultas iterativas', 'TTL, cache positivo e cache negativo', 'Transportes do DNS', 'Split-horizon DNS e nomes privados', 'PAT/NAPT: tradução orientada por estado', 'Intermediários HTTP', 'TLS em proxies e balanceadores', 'Balanceamento de camada 4 e camada 7', 'Algoritmos de seleção de backend', 'Saúde, readiness, drenagem e retorno gradual', 'Caminho corporativo de uma chamada de API', 'Serviços Azure no caminho de APIs'],
    f1: [['Raiz', '.'], ['TLD', '.com  .org  .br'], ['Zona', 'empresa.com'], ['Delegação', 'pagamentos.empresa.com']],
    f2: [['Aplicação', 'stub resolver'], ['Recursivo', 'cache e iteração'], ['Raiz', 'referência ao TLD'], ['TLD', 'referência à zona'], ['Autoritativo', 'A = 198.51.100.25']],
    f3: [['t=0', 'Resposta A', 'TTL 300'], ['t=120', 'Cache válido', 'TTL 180'], ['t=300', 'Entrada expira', ''], ['t=301', 'Nova resolução', '']],
    f4: [['UDP/53', 'Consulta comum', 'Baixa sobrecarga'], ['TCP/53', 'Resposta truncada e zonas', 'Fluxo confiável'], ['EDNS(0)', 'Anuncia capacidade e payload', 'Extensão do DNS'], ['DoT/853', 'DNS sobre TLS', 'Protege o transporte'], ['DoH/443', 'DNS sobre HTTPS', 'Canal HTTP criptografado']],
    f5: [['Cliente externo', 'DNS público'], ['api.empresa.com', 'Público: 203.0.113.20', 'Privado: 10.20.5.20'], ['Borda pública', 'WAF / Front Door'], ['Gateway interno', 'DNS privado'], ['Backend privado', 'VNet / datacenter']],
    f6: [['Gateway A', '10.1.1.10:52001'], ['Gateway B', '10.1.1.11:52001'], ['Dispositivo NAT', '10.1.1.10:52001 -> 203.0.113.8:40001', '10.1.1.11:52001 -> 203.0.113.8:40002'], ['Backend', '198.51.100.25:443']],
    f7: [['Forward proxy', 'Representa clientes', 'Escolhido pelo cliente'], ['Reverse proxy', 'Representa servidores', 'Seleciona upstream'], ['Gateway', 'Traduz ou conecta ambientes', 'Atua como origem'], ['Túnel', 'Encaminha bytes', 'Exemplo: CONNECT']],
    f8: [['Pass-through', 'Cliente === TLS ponta a ponta === Backend'], ['TLS offload', 'Cliente === TLS === Proxy ---- HTTP ---- Backend'], ['Re-encryption', 'Cliente === TLS === Proxy === TLS === Backend'], ['mTLS na borda', 'Cliente == mTLS == Proxy === TLS/mTLS === Backend']],
    f9: [['Camada 4', 'Decide por IP, porta e fluxo', 'Pode preservar TLS', 'Não roteia por path'], ['Camada 7', 'Interpreta HTTP e Host', 'Roteia por path e header', 'Pode aplicar WAF']],
    f10: [['Round robin', 'Sequência', 'Instâncias equivalentes'], ['Weighted RR', 'Proporção por peso', 'Capacidades diferentes'], ['Least connections', 'Menos conexões ativas', 'Sessões variáveis'], ['Least response time', 'Latência e atividade', 'Desempenho variável'], ['Hash / affinity', 'Chave escolhe servidor', 'Sessão ou cache local'], ['Consistent hash', 'Reduz remapeamento', 'Menos churn']],
    f11: [['Inicializando', 'Não elegível'], ['Ready', 'Recebe tráfego'], ['Degradado', 'Menor peso'], ['Unhealthy', 'Removido do pool'], ['Draining', 'Conexões terminam']],
    f12: [['Cliente', 'stub resolver'], ['DNS / GSLB', 'nome -> endpoint'], ['Borda L7', 'WAF, TLS e rota'], ['API Gateway', 'auth e políticas'], ['LB interno', 'pool saudável'], ['API', 'serviço']],
    f13: [['Traffic Manager', 'Decisão por DNS', 'Cliente conecta direto'], ['Front Door', 'Reverse proxy global L7', 'WAF, aceleração, TLS'], ['Load Balancer', 'Distribuição regional L4', 'IP, porta e fluxo'], ['Application Gateway', 'Proxy regional L7', 'Host/path, WAF, TLS'], ['API Management', 'API Gateway', 'Políticas e governança']]
  },
  en: {
    titles: ['DNS: hierarchy and delegation', 'Recursive resolution and iterative queries', 'TTL, positive cache, and negative cache', 'DNS transports', 'Split-horizon DNS and private names', 'PAT/NAPT: stateful translation', 'HTTP intermediaries', 'TLS in proxies and load balancers', 'Layer 4 and layer 7 load balancing', 'Backend selection algorithms', 'Health, readiness, draining, and gradual return', 'Corporate API request path', 'Azure services in the API path'],
    f1: [['Root', '.'], ['TLD', '.com  .org  .br'], ['Zone', 'empresa.com'], ['Delegation', 'pagamentos.empresa.com']],
    f2: [['Application', 'stub resolver'], ['Recursive', 'cache and iteration'], ['Root', 'TLD referral'], ['TLD', 'zone referral'], ['Authoritative', 'A = 198.51.100.25']],
    f3: [['t=0', 'A response', 'TTL 300'], ['t=120', 'Valid cache', 'TTL 180'], ['t=300', 'Entry expires', ''], ['t=301', 'New resolution', '']],
    f4: [['UDP/53', 'Common query', 'Low overhead'], ['TCP/53', 'Truncated response and zones', 'Reliable stream'], ['EDNS(0)', 'Advertises capability and payload', 'DNS extension'], ['DoT/853', 'DNS over TLS', 'Protects transport'], ['DoH/443', 'DNS over HTTPS', 'Encrypted HTTP channel']],
    f5: [['External client', 'Public DNS'], ['api.empresa.com', 'Public: 203.0.113.20', 'Private: 10.20.5.20'], ['Public edge', 'WAF / Front Door'], ['Internal gateway', 'Private DNS'], ['Private backend', 'VNet / datacenter']],
    f6: [['Gateway A', '10.1.1.10:52001'], ['Gateway B', '10.1.1.11:52001'], ['NAT device', '10.1.1.10:52001 -> 203.0.113.8:40001', '10.1.1.11:52001 -> 203.0.113.8:40002'], ['Backend', '198.51.100.25:443']],
    f7: [['Forward proxy', 'Represents clients', 'Chosen by the client'], ['Reverse proxy', 'Represents servers', 'Selects an upstream'], ['Gateway', 'Translates or connects environments', 'Acts as an origin'], ['Tunnel', 'Forwards bytes', 'Example: CONNECT']],
    f8: [['Pass-through', 'Client === end-to-end TLS === Backend'], ['TLS offload', 'Client === TLS === Proxy ---- HTTP ---- Backend'], ['Re-encryption', 'Client === TLS === Proxy === TLS === Backend'], ['Edge mTLS', 'Client == mTLS == Proxy === TLS/mTLS === Backend']],
    f9: [['Layer 4', 'Decides by IP, port, and flow', 'Can preserve TLS', 'Does not route by path'], ['Layer 7', 'Understands HTTP and Host', 'Routes by path and header', 'Can apply WAF']],
    f10: [['Round robin', 'Sequential selection', 'Equivalent instances'], ['Weighted RR', 'Weight-based share', 'Different capacities'], ['Least connections', 'Fewest active connections', 'Variable sessions'], ['Least response time', 'Latency and activity', 'Variable performance'], ['Hash / affinity', 'A key selects the server', 'Session or local cache'], ['Consistent hash', 'Reduces remapping', 'Less churn']],
    f11: [['Starting', 'Not eligible'], ['Ready', 'Receives traffic'], ['Degraded', 'Lower weight'], ['Unhealthy', 'Removed from pool'], ['Draining', 'Connections finish']],
    f12: [['Client', 'stub resolver'], ['DNS / GSLB', 'name -> endpoint'], ['L7 edge', 'WAF, TLS, and routing'], ['API Gateway', 'auth and policies'], ['Internal LB', 'healthy pool'], ['API', 'service']],
    f13: [['Traffic Manager', 'DNS decision', 'Client connects directly'], ['Front Door', 'Global L7 reverse proxy', 'WAF, acceleration, TLS'], ['Load Balancer', 'Regional L4 distribution', 'IP, port, and flow'], ['Application Gateway', 'Regional L7 proxy', 'Host/path, WAF, TLS'], ['API Management', 'API Gateway', 'Policies and governance']]
  },
  es: {
    titles: ['DNS: jerarquía y delegación', 'Resolución recursiva y consultas iterativas', 'TTL, caché positivo y caché negativo', 'Transportes de DNS', 'DNS split-horizon y nombres privados', 'PAT/NAPT: traducción con estado', 'Intermediarios HTTP', 'TLS en proxies y balanceadores', 'Balanceo de capa 4 y capa 7', 'Algoritmos de selección de backend', 'Salud, readiness, drenaje y retorno gradual', 'Ruta corporativa de una solicitud API', 'Servicios Azure en la ruta de APIs'],
    f1: [['Raíz', '.'], ['TLD', '.com  .org  .br'], ['Zona', 'empresa.com'], ['Delegación', 'pagamentos.empresa.com']],
    f2: [['Aplicación', 'stub resolver'], ['Recursivo', 'caché e iteración'], ['Raíz', 'referencia al TLD'], ['TLD', 'referencia a la zona'], ['Autoritativo', 'A = 198.51.100.25']],
    f3: [['t=0', 'Respuesta A', 'TTL 300'], ['t=120', 'Caché válido', 'TTL 180'], ['t=300', 'La entrada caduca', ''], ['t=301', 'Nueva resolución', '']],
    f4: [['UDP/53', 'Consulta común', 'Baja sobrecarga'], ['TCP/53', 'Respuesta truncada y zonas', 'Flujo confiable'], ['EDNS(0)', 'Anuncia capacidad y payload', 'Extensión de DNS'], ['DoT/853', 'DNS sobre TLS', 'Protege el transporte'], ['DoH/443', 'DNS sobre HTTPS', 'Canal HTTP cifrado']],
    f5: [['Cliente externo', 'DNS público'], ['api.empresa.com', 'Público: 203.0.113.20', 'Privado: 10.20.5.20'], ['Borde público', 'WAF / Front Door'], ['Gateway interno', 'DNS privado'], ['Backend privado', 'VNet / datacenter']],
    f6: [['Gateway A', '10.1.1.10:52001'], ['Gateway B', '10.1.1.11:52001'], ['Dispositivo NAT', '10.1.1.10:52001 -> 203.0.113.8:40001', '10.1.1.11:52001 -> 203.0.113.8:40002'], ['Backend', '198.51.100.25:443']],
    f7: [['Forward proxy', 'Representa clientes', 'Elegido por el cliente'], ['Reverse proxy', 'Representa servidores', 'Selecciona upstream'], ['Gateway', 'Traduce o conecta entornos', 'Actúa como origen'], ['Túnel', 'Reenvía bytes', 'Ejemplo: CONNECT']],
    f8: [['Pass-through', 'Cliente === TLS extremo a extremo === Backend'], ['TLS offload', 'Cliente === TLS === Proxy ---- HTTP ---- Backend'], ['Re-encryption', 'Cliente === TLS === Proxy === TLS === Backend'], ['mTLS en el borde', 'Cliente == mTLS == Proxy === TLS/mTLS === Backend']],
    f9: [['Capa 4', 'Decide por IP, puerto y flujo', 'Puede preservar TLS', 'No enruta por path'], ['Capa 7', 'Interpreta HTTP y Host', 'Enruta por path y header', 'Puede aplicar WAF']],
    f10: [['Round robin', 'Selección secuencial', 'Instancias equivalentes'], ['Weighted RR', 'Proporción por peso', 'Capacidades diferentes'], ['Least connections', 'Menos conexiones activas', 'Sesiones variables'], ['Least response time', 'Latencia y actividad', 'Rendimiento variable'], ['Hash / affinity', 'Una clave elige el servidor', 'Sesión o caché local'], ['Consistent hash', 'Reduce el remapeo', 'Menos churn']],
    f11: [['Iniciando', 'No elegible'], ['Ready', 'Recibe tráfico'], ['Degradado', 'Menor peso'], ['Unhealthy', 'Fuera del pool'], ['Draining', 'Finalizan conexiones']],
    f12: [['Cliente', 'stub resolver'], ['DNS / GSLB', 'nombre -> endpoint'], ['Borde L7', 'WAF, TLS y ruta'], ['API Gateway', 'auth y políticas'], ['LB interno', 'pool saludable'], ['API', 'servicio']],
    f13: [['Traffic Manager', 'Decisión por DNS', 'El cliente conecta directamente'], ['Front Door', 'Reverse proxy global L7', 'WAF, aceleración, TLS'], ['Load Balancer', 'Distribución regional L4', 'IP, puerto y flujo'], ['Application Gateway', 'Proxy regional L7', 'Host/path, WAF, TLS'], ['API Management', 'API Gateway', 'Políticas y gobernanza']]
  }
};

const names = ['figure-01-dns-hierarchy.svg','figure-02-recursive-resolution.svg','figure-03-ttl-cache.svg','figure-04-dns-transports.svg','figure-05-split-horizon.svg','figure-06-pat-state.svg','figure-07-http-intermediaries.svg','figure-08-tls-modes.svg','figure-09-l4-l7.svg','figure-10-load-balancing-algorithms.svg','figure-11-endpoint-health-lifecycle.svg','figure-12-api-request-path.svg','figure-13-azure-services.svg'];
const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const text = (x,y,value,cls='label',anchor='middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
const lines = (x,y,values,cls='small',anchor='middle',gap=25) => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${values.filter(Boolean).map((v,i)=>`<tspan x="${x}" dy="${i ? gap : 0}">${esc(v)}</tspan>`).join('')}</text>`;
const arrow = (x1,y1,x2,y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" class="arrow" marker-end="url(#arrow)"/>`;
const card = (x,y,w,h,values,index=0) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" class="card c${index%5}"/>${lines(x+w/2,y+42,[values[0]],'cardTitle')}${lines(x+w/2,y+78,values.slice(1),'small')}</g>`;
const shell = (title,body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 780" role="img" aria-label="${esc(title)}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#071a34"/><stop offset="1" stop-color="#030817"/></linearGradient><marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0L12 6L0 12z" fill="#65e8ff"/></marker><style>text{font-family:Inter,Segoe UI,Arial,sans-serif;fill:#e5f4ff}.title{font-size:34px;font-weight:800}.cardTitle{font-size:23px;font-weight:800}.label{font-size:22px;font-weight:750}.small{font-size:17px;font-weight:600;fill:#b7d0e3}.card{fill:#081b35;stroke-width:2}.c0{stroke:#00d8ff}.c1{stroke:#9b6cff}.c2{stroke:#00ffd1}.c3{stroke:#ffb84d}.c4{stroke:#ff5cab}.arrow{fill:none;stroke:#65e8ff;stroke-width:4}.track{fill:none;stroke:#376e9d;stroke-width:4}</style></defs><rect width="1400" height="780" rx="30" fill="url(#bg)"/>${text(55,62,title,'title','start')}${body}</svg>`;

function rowFigure(title, items, y=250) { const gap=22, w=(1290-gap*(items.length-1))/items.length; return shell(title, items.map((v,i)=>card(55+i*(w+gap),y,w,190,v,i)).join('') + items.slice(0,-1).map((_,i)=>arrow(55+(i+1)*w+i*gap,y+95,55+(i+1)*w+(i+1)*gap-10,y+95)).join('')); }
function stackedFigure(title, items) { return shell(title, items.map((v,i)=>card(90,110+i*118,1220,92,v,i)).join('')); }
function gridFigure(title, items) { const w=570,h=190; return shell(title, items.map((v,i)=>card(i%2?740:90,115+Math.floor(i/2)*220,w,h,v,i)).join('')); }
function hierarchyFigure(t) { return shell(t.titles[0], card(545,105,310,105,t.f1[0],0)+card(170,285,300,110,t.f1[1],1)+card(550,285,300,110,t.f1[2],2)+card(930,285,300,110,t.f1[3],3)+arrow(700,210,320,275)+arrow(700,210,700,275)+arrow(700,210,1080,275)+text(700,520,'NS  •  SOA  •  glue  •  authority','label')); }
function timelineFigure(t) { return shell(t.titles[2], `<path d="M130 300H1270" class="track"/>`+t.f3.map((v,i)=>{const x=150+i*365;return `<circle cx="${x}" cy="300" r="14" fill="#00ffd1"/>${lines(x,235,[v[0]],'cardTitle')}${lines(x,350,v.slice(1),'small')}`}).join('')+card(190,510,450,125,['Cache positivo','RRsets válidos até o TTL'],0)+card(760,510,450,125,['Cache negativo','NXDOMAIN ou ausência de tipo'],3)); }
function splitFigure(t) { return shell(t.titles[4], card(85,155,280,135,t.f5[0],0)+card(560,245,280,165,t.f5[1],3)+card(1035,155,280,135,t.f5[2],4)+card(85,505,280,135,t.f5[3],2)+card(1035,505,280,135,t.f5[4],1)+arrow(365,220,550,300)+arrow(850,300,1025,220)+arrow(365,570,550,365)+arrow(850,365,1025,570)); }
function patFigure(t) { return shell(t.titles[5], card(70,150,270,125,t.f6[0],0)+card(70,500,270,125,t.f6[1],0)+card(500,235,520,300,t.f6[2],3)+card(1110,325,240,125,t.f6[3],2)+arrow(340,212,490,315)+arrow(340,562,490,455)+arrow(1020,385,1100,385)); }

for (const [locale,t] of Object.entries(locales)) {
  const renders = [hierarchyFigure(t),rowFigure(t.titles[1],t.f2),timelineFigure(t),stackedFigure(t.titles[3],t.f4),splitFigure(t),patFigure(t),gridFigure(t.titles[6],t.f7),stackedFigure(t.titles[7],t.f8),gridFigure(t.titles[8],t.f9),stackedFigure(t.titles[9],t.f10),rowFigure(t.titles[10],t.f11),rowFigure(t.titles[11],t.f12),gridFigure(t.titles[12],t.f13)];
  const directory=join(root,locale); await mkdir(directory,{recursive:true});
  await Promise.all(renders.map((svg,i)=>writeFile(join(directory,names[i]),svg,'utf8')));
}
console.log(`Generated ${names.length * Object.keys(locales).length} localized SVG diagrams.`);
