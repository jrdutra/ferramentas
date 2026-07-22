from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_40_Projeto_Final_Plataforma_Completa_de_APIs.pdf')
spec=importlib.util.spec_from_file_location('c39',ROOT/'scripts/generate-chapter39-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/projeto-final-plataforma-completa-apis-pt/capstone-content.data.ts','en':ROOT/'src/app/learn/complete-api-platform-capstone-en/capstone-content.data.ts','es':ROOT/'src/app/learn/proyecto-final-plataforma-completa-apis-es/capstone-content.data.ts'};ASSET='/assets/learn/complete-api-platform-capstone'
ALTS={1:'Arquitetura lógica completa da plataforma de APIs do projeto final',2:'Ciclo orientado por contrato da implementação à evolução',3:'Fases do projeto com critérios de aceite e evidências armazenadas'}
CAP=['Tabela 1 - O projeto deve provar capacidades, não apenas apresentar componentes.','Tabela 2 - Requisitos não funcionais devem gerar testes e evidências.','Tabela 3 - A credencial deve corresponder ao tipo de sujeito e ao risco.','Tabela 4 - Padrões distribuídos precisam ser comprovados por testes de falha.','Tabela 5 - Golden signals transformam a plataforma em um sistema investigável.','Tabela 6 - O projeto evolui por capacidade demonstrável, não por quantidade de componentes.','Tabela 7 - Rubrica sugerida para avaliação do projeto final.','Tabela 8 - Vocabulário essencial do projeto final.'];TABLES={3:[(50,150,0),(700,805,1)],4:[(50,105,1),(715,805,2)],5:[(50,105,2),(515,625,3)],6:[(345,455,4)],7:[(200,310,5),(650,775,6)],8:[(580,790,7)]};FIG={1:[(260,615)],3:[(240,520)],4:[(400,600)],6:[(580,790)]}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def merge(a,b):return a+(b[1:]if a and b and a[0]==b[0]else b)
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def extract():
 d=fitz.open(PDF);raw=[rows(d,3,0),merge(rows(d,3,1),rows(d,4,0)),merge(rows(d,4,1),rows(d,5,0)),rows(d,5,1),rows(d,6,0),rows(d,7,0),rows(d,7,1),rows(d,8,0)];tabs=[tbl(r,CAP[i])for i,r in enumerate(raw)];seen=set();o=[{'kind':'subhead','text':'Projeto integrador: do contrato à operação resiliente'},{'kind':'subhead','text':'Objetivo final'},{'kind':'paragraph','text':'Construir uma plataforma demonstrável, segura, observável e operável, com decisões documentadas e testes reproduzíveis.'}]
 for pn in range(1,len(d)+1):
  for b in sorted((x for x in d[pn-1].get_text('dict')['blocks']if'lines'in x),key=lambda x:(x['bbox'][1],x['bbox'][0])):
   text,size,bold=UTIL.block_text(b);y=b['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text)or text in{'FAAC','Fundamentos e Arquitetura de APIs','Corporativas','Fundamentos e Arquitetura de APIs Corporativas','Capítulo 40','Projeto final: construindo uma','plataforma completa de APIs','Projeto final: construindo uma plataforma completa de APIs','Um projeto integrador com arquitetura, contratos, identidade, gateway, microserviços, mensageria, Kubernetes, observabilidade e resiliência'}:continue
   if text.startswith('Figura de abertura'):o.append({'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Plataforma completa de APIs conectando design, proteção, execução e operação','caption':text});continue
   m=re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)',text)
   if m:n=int(m.group(1));o.append({'kind':'figure','src':f'{ASSET}/pt/figure-{n:02}.svg','alt':ALTS[n],'caption':text});continue
   if any(a<=y<=z for a,z in FIG.get(pn,[])):continue
   hit=False
   for a,z,i in TABLES.get(pn,[]):
    if a<=y<=z:
     if i not in seen:o.append(copy.deepcopy(tabs[i]));seen.add(i)
     hit=True;break
   if hit:continue
   if text.startswith(('•','●')):
    it=[UTIL.clean_text(x)for x in re.split(r'[•●]',text)if UTIL.clean_text(x)]
    if o and o[-1]['kind']=='list'and not o[-1]['ordered']:o[-1]['items'].extend(it)
    else:o.append({'kind':'list','ordered':False,'items':it})
   elif size>=14:o.append({'kind':'heading','level':2,'text':text,'id':UTIL.slugify(text)})
   elif size>=9.8 and bold:o.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.3:o.append({'kind':'subhead','text':text})
   else:UTIL.append_block(o,{'kind':'paragraph','text':text})
 return o
PRESERVE=base.PRESERVE|{'Banco Horizonte','OpenAPI','OAuth 2.0','OpenID Connect','OIDC','mTLS','API Keys','API Gateway','Kubernetes','service mesh','Kafka','RabbitMQ','HTTP','JSON','gRPC','OpenTelemetry','SLI','SLO','SRE','CI/CD','IaC','ADR','Outbox','idempotência','rate limiting','WAF','DNS','JWT','PKI','HSM','GitOps','DevSecOps','RTO','RPO','blue-green','canary','rolling update','runbook','dashboard','trace','logs','Golden signals'}
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
 pt=extract();v=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(v,'en'));es=loc(pt,'es',UTIL.translate_values(v,'es'));w=CORE.template.template.base.write_typescript
 w(OUT['pt'],'CAPSTONE_PT_BLOCKS',pt,'pt');w(OUT['en'],'CAPSTONE_EN_BLOCKS',en,'en');w(OUT['es'],'CAPSTONE_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
