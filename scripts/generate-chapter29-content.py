from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF_PATH=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_29_Service_Mesh_Istio_Linkerd_e_Envoy.pdf')
spec=importlib.util.spec_from_file_location('c28',ROOT/'scripts/generate-chapter28-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUTPUTS={'pt':ROOT/'src/app/learn/service-mesh-istio-linkerd-envoy-pt/service-mesh-content.data.ts','en':ROOT/'src/app/learn/service-mesh-istio-linkerd-envoy-en/service-mesh-content.data.ts','es':ROOT/'src/app/learn/service-mesh-istio-linkerd-envoy-es/service-mesh-content.data.ts'};ASSET='/assets/learn/service-mesh-istio-linkerd-envoy'
FIGURES={1:('figure-01-control-data-plane.svg','Separação entre plano de controle e plano de dados do service mesh'),2:('figure-02-sidecar-ambient.svg','Modelos sidecar e ambient do plano de dados do Istio'),3:('figure-03-traffic-management.svg','Traffic management transformando regra declarativa em divisão ponderada'),4:('figure-04-envoy-model.svg','Listener, filtros, rota e cluster no modelo interno do Envoy'),5:('figure-05-multicluster.svg','Service mesh conectando serviços e gateways em múltiplos clusters')}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,c):r=rows(d,p,i);return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def tables(d):return{'roles':tab(d,3,0,'Tabela 1 - Gateway e mesh podem coexistir com responsabilidades complementares.'),'resilience':tab(d,5,0,'Tabela 2 - Resiliência exige limites coordenados entre aplicação, gateway e mesh.'),'comparison':tab(d,6,0,'Tabela 3 - A escolha depende de requisitos, maturidade e modelo operacional.'),'troubleshooting':tab(d,9,0,'Tabela 4 - O diagnóstico deve correlacionar intenção, control plane, proxy e aplicação.'),'glossary':tab(d,11,0,'Tabela 5 - Vocabulário essencial do capítulo.')}
TABLES={3:[(538,641,'roles')],5:[(502,605,'resilience')],6:[(613,716,'comparison')],9:[(334,453,'troubleshooting')],11:[(80,377,'glossary')]};FIGS={3:[(208,383)],4:[(197,380)],5:[(197,369)],7:[(136,319)],8:[(186,361)]};CODE={7:[(598,755)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Service mesh: uma camada de comunicação entre workloads'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Plano de controle distribuindo identidade, rotas e políticas para proxies entre serviços','caption':'Figura de abertura - O service mesh introduz uma camada operacional uniforme entre os serviços.'},{'kind':'paragraph','text':'O plano de dados aplica controles de forma transparente ao tráfego east-west.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  for sb in sorted((b for b in d[pn-1].get_text('dict')['blocks']if'lines'in b),key=lambda b:(b['bbox'][1],b['bbox'][0])):
   text,size,bold=UTIL.block_text(sb);y=sb['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text):continue
   if any(a<=y<=z for a,z in FIGS.get(pn,[])):
    m=re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)',text)
    if m:n=int(m.group(1));fn,alt=FIGURES[n];out.append({'kind':'figure','src':f'{ASSET}/pt/{fn}','alt':alt,'caption':text})
    continue
   hit=False
   for a,z,k in TABLES.get(pn,[]):
    if a<=y<=z:
     if k not in seen:out.append(copy.deepcopy(ts[k]));seen.add(k)
     hit=True;break
   if hit:continue
   if any(a<=y<=z for a,z in CODE.get(pn,[])):UTIL.append_block(out,{'kind':'code','text':UTIL.block_code(sb)});continue
   if text.startswith(('•','●')):
    items=[UTIL.clean_text(x)for x in re.split(r'[•●]',text)if UTIL.clean_text(x)]
    if out and out[-1]['kind']=='list'and not out[-1]['ordered']:out[-1]['items'].extend(items)
    else:out.append({'kind':'list','ordered':False,'items':items})
   elif size>=14:out.append({'kind':'heading','level':2,'text':text,'id':UTIL.slugify(text)})
   elif size>=9.8 and bold:out.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.3:out.append({'kind':'subhead','text':text})
   else:UTIL.append_block(out,{'kind':'paragraph','text':text})
 return out
PRESERVE=base.PRESERVE|{'service mesh','Service Mesh','Istio','Linkerd','Envoy','control plane','data plane','sidecar','ambient mode','ztunnel','waypoint proxy','workload','east-west','north-south','API Gateway','Ingress Gateway','Egress Gateway','mTLS','TLS','SPIFFE','SPIRE','SAN','L4','L7','HTTP','HTTP/2','gRPC','TCP','CNI','Kubernetes','Gateway API','GAMMA','HTTPRoute','Service','xDS','LDS','RDS','CDS','EDS','SDS','listener','filter chain','route','cluster','endpoint','upstream','downstream','traffic split','retry','timeout','circuit breaking','fault injection','canary','blue-green','multi-cluster','trust domain','SLO','CPU','memory','telemetry','OpenTelemetry','Prometheus','Jaeger','Kiali','Rust','istiod','OAuth','JWT','RBAC','ABAC','ACK','NACK'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in{'heading','subhead','paragraph'}:b['text']=polish(tr[b['text']],l);b.update({'id':UTIL.slugify(b['text'])}if k=='heading'and b.get('level')==2 else{})
  elif k=='list':b['items']=[polish(tr[x],l)for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l)for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l)for x in r]for r in q['rows']]
 return o
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(vals,'en'));es=loc(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'SERVICE_MESH_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'SERVICE_MESH_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'SERVICE_MESH_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table'for b in pt),'figures':sum(b['kind']=='figure'for b in pt),'codes':sum(b['kind']=='code'for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
