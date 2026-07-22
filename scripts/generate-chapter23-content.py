from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1]; PDF_PATH=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_23_Axway_API_Gateway_Arquitetura_e_Funcionamento.pdf')
spec=importlib.util.spec_from_file_location('c22',ROOT/'scripts/generate-chapter22-content.py'); base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base)
OUTPUTS={'pt':ROOT/'src/app/learn/axway-api-gateway-arquitetura-pt/axway-api-gateway-content.data.ts','en':ROOT/'src/app/learn/axway-api-gateway-architecture-en/axway-api-gateway-content.data.ts','es':ROOT/'src/app/learn/axway-api-gateway-arquitectura-es/axway-api-gateway-content.data.ts'}; ASSET='/assets/learn/axway-api-gateway-architecture'
FIGURES={1:('figure-01-domain-topology.svg','Domínio Axway com Admin Node Manager, grupos, Node Managers e instâncias'),2:('figure-02-runtime-request.svg','Caminho de listener, service, policy circuit, routing e response no runtime'),3:('figure-03-data-stores.svg','Gateway runtime conectado a KPS, Cassandra e banco de métricas'),4:('figure-04-deployment-cycle.svg','Ciclo de configuração entre Policy Studio, Admin Node Manager, Node Managers e instâncias'),5:('figure-05-high-availability.svg','Load balancer com múltiplos gateways e alta disponibilidade administrativa')}
def rs(d,p,i):return [[base.base.base.clean_table_cell(c) for c in r] for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,cap):r=rs(d,p,i);return {'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]}
def joined(d,a,b,cap):r=rs(d,*a);s=rs(d,*b);return {'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]+s[1:]}
def tables(d):return {
 'components':tab(d,3,0,'Tabela 1 - Componentes com funções diferentes dentro da plataforma.'),'management':tab(d,4,0,'Tabela 2 - Disponibilidade de gestão e disponibilidade de tráfego são dimensões distintas.'),'context':tab(d,5,0,'Tabela 3 - O contexto é poderoso, mas precisa de contrato e higiene de segurança.'),'manager':joined(d,(5,1),(6,0),'Tabela 4 - Management plane e runtime cooperam, mas não são a mesma camada.'),'topology':joined(d,(7,0),(8,0),'Tabela 5 - A topologia deve equilibrar isolamento, latência, consistência e operabilidade.'),'tls':tab(d,8,1,'Tabela 6 - Cada canal possui identidade criptográfica e cadeia de confiança próprias.'),'errors':tab(d,9,0,'Tabela 7 - O erro apresentado pelo gateway deve ser decomposto por camada.'),'observability':tab(d,9,1,'Tabela 8 - Cada fonte responde a uma pergunta operacional diferente.'),'capacity':tab(d,9,2,'Tabela 9 - Planejamento de capacidade exige métricas de runtime e dependências.'),'hardening':tab(d,10,0,'Tabela 10 - Hardening combina produto, sistema operacional, rede e processo.'),'troubleshooting':joined(d,(10,1),(11,0),'Tabela 11 - Diagnóstico por camadas reduz tentativa e erro.'),'glossary':tab(d,12,0,'Tabela 12 - Vocabulário essencial do capítulo.')}
TABLES={3:[(252,384,'components')],4:[(230,330,'management')],5:[(429,544,'context'),(719,810,'manager')],6:[(57,108,'manager')],7:[(733,810,'topology')],8:[(57,124,'topology'),(286,386,'tls')],9:[(95,210,'errors'),(374,489,'observability'),(663,779,'capacity')],10:[(429,544,'hardening'),(707,810,'troubleshooting')],11:[(57,124,'troubleshooting')],12:[(150,412,'glossary')]}
FIGS={3:[(555,746)],5:[(80,268)],6:[(280,463)],7:[(55,232),(390,571)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Da configuração em Policy Studio ao processamento distribuído no runtime'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Plataforma Axway com design, administração, execução, persistência e operação','caption':'Figura de abertura - A plataforma combina ferramentas de design, administração centralizada, runtime de políticas e componentes de persistência e observabilidade.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'O Axway API Gateway combina topologia administrativa, configuração versionável e runtime de políticas de alta performance.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  for sb in sorted((b for b in d[pn-1].get_text('dict')['blocks'] if 'lines'in b),key=lambda b:(b['bbox'][1],b['bbox'][0])):
   text,size,bold=base.base.base.template.template.base.base.block_text(sb);y=sb['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+',text):continue
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
   if text.startswith(('•','●')):
    items=[base.base.base.template.template.base.base.clean_text(x) for x in re.split(r'[•●]',text) if base.base.base.template.template.base.base.clean_text(x)]
    if out and out[-1]['kind']=='list' and not out[-1]['ordered']:out[-1]['items'].extend(items)
    else:out.append({'kind':'list','ordered':False,'items':items})
   elif size>=14:out.append({'kind':'heading','level':2,'text':text,'id':base.base.base.template.template.base.base.slugify(text)})
   elif size>=9.8 and bold:out.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.5:out.append({'kind':'subhead','text':text})
   else:base.base.base.template.template.base.base.append_block(out,{'kind':'paragraph','text':text})
 return out
PRESERVE=base.PRESERVE|{'Axway','Axway API Gateway','API Gateway','Policy Studio','API Gateway Manager','API Manager','Admin Node Manager','Node Manager','ANM','Gateway instance','Gateway instances','policy circuit','message context','Key Property Store','KPS','Cassandra','Metrics DB','Traffic Monitor','Entity Store','Environment Package','Deployment Package','Configuration Studio','Visual Mapper','API Portal','client_id','subject','scope','RBAC','HSM','Kubernetes','OpenShift','Docker','Helm','StatefulSet','DaemonSet','GSLB','SIEM','JMX','SNMP','TLS','mTLS','JWT','OAuth 2.0','API key'}
REPL={'en':[('Axway Api Gateway','Axway API Gateway'),('Api Gateway','API Gateway')],'es':[('Puerta de enlace API Axway','Axway API Gateway'),('puerta de enlace API','API Gateway'),('Estudio de políticas','Policy Studio'),('Administrador de nodos','Node Manager')]}
def polish(v,l):
 v=base.base.base.template.template.base.polish(v,l)
 for a,b in REPL[l]:v=v.replace(a,b)
 return v.replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in {'heading','subhead','paragraph'}:
   b['text']=polish(tr[b['text']],l)
   if k=='heading' and b.get('level')==2:b['id']=base.base.base.template.template.base.base.slugify(b['text'])
  elif k=='list':b['items']=[polish(tr[x],l) for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l) for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l) for x in r] for r in q['rows']]
 return o
def main():
 pt=extract();vals=base.base.base.template.template.base.base.translatable_values(pt);en=loc(pt,'en',base.base.base.template.template.base.base.translate_values(vals,'en'));es=loc(pt,'es',base.base.base.template.template.base.base.translate_values(vals,'es'));w=base.base.base.template.template.base.write_typescript;w(OUTPUTS['pt'],'AXWAY_GATEWAY_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'AXWAY_GATEWAY_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'AXWAY_GATEWAY_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table' for b in pt),'figures':sum(b['kind']=='figure' for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
