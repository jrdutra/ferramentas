from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_39_Estudo_de_Casos_Reais_de_Grandes_Empresas.pdf')
spec=importlib.util.spec_from_file_location('c38',ROOT/'scripts/generate-chapter38-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/estudos-casos-reais-grandes-empresas-pt/case-studies-content.data.ts','en':ROOT/'src/app/learn/real-world-enterprise-case-studies-en/case-studies-content.data.ts','es':ROOT/'src/app/learn/estudios-casos-reales-grandes-empresas-es/case-studies-content.data.ts'};ASSET='/assets/learn/real-world-enterprise-case-studies'
ALTS={1:'Estrutura para analisar contexto, problema, decisão e resultado de um caso público',2:'Padrões recorrentes de isolamento, controle, evolução e observabilidade',3:'Fluxo de adoção de uma lição por hipótese, experimento e governança'}
CAP=['Tabela 1 - Um caso técnico deve ser interrogado, não apenas admirado.','Tabela 2 - A confiabilidade vem da combinação de mecanismos, não de um único retry.','Tabela 3 - A tecnologia muda; os mecanismos de controle e governança se repetem.','Tabela 4 - Vocabulário essencial do capítulo.'];TABLES={3:[(240,345,0),(735,805,1)],4:[(50,135,1)],6:[(70,245,2)],8:[(70,300,3)]};FIG={1:[(260,600)],3:[(45,245)],5:[(500,700)],6:[(400,610)]}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def merge(a,b):return a+(b[1:]if a and b and a[0]==b[0]else b)
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def extract():
 d=fitz.open(PDF);raw=[rows(d,3,0),merge(rows(d,3,1),rows(d,4,0)),rows(d,6,0),rows(d,8,0)];tabs=[tbl(r,CAP[i])for i,r in enumerate(raw)];seen=set();o=[{'kind':'subhead','text':'Casos reais: arquitetura, operação, falhas e decisões em escala'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'O valor do estudo de caso está no raciocínio e nos trade-offs; copiar a solução sem contexto é um risco.'}]
 for pn in range(1,len(d)+1):
  for b in sorted((x for x in d[pn-1].get_text('dict')['blocks']if'lines'in x),key=lambda x:(x['bbox'][1],x['bbox'][0])):
   text,size,bold=UTIL.block_text(b);y=b['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text)or text in{'FAAC','Fundamentos e Arquitetura de APIs','Corporativas','Fundamentos e Arquitetura de APIs Corporativas','Capítulo 39','Estudo de casos reais','de grandes empresas','Estudo de casos reais de grandes empresas','Como organizações globais evoluíram gateways, APIs, mensageria, confiabilidade e plataformas internas sob restrições reais'}:continue
   if text.startswith('Figura de abertura'):o.append({'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Casos reais conectando decisões de arquitetura a problemas de produção','caption':text});continue
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
PRESERVE=base.PRESERVE|{'Netflix','Zuul','Zuul 2','Netty','Amazon','AWS','Stripe','Shopify','LinkedIn','Google','GitHub','Spotify','GraphQL','Kafka','gRPC','SRE','OpenAPI','SDK','API Gateway','HTTP/2','I/O','retry','retries','idempotência','rate limiting','load shedding','backpressure','service discovery','developer portal','Backstage','Hystrix','cell-based architecture','bulkhead','token bucket','leaky bucket','circuit breaker','trade-off'}
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
 w(OUT['pt'],'CASE_STUDIES_PT_BLOCKS',pt,'pt');w(OUT['en'],'CASE_STUDIES_EN_BLOCKS',en,'en');w(OUT['es'],'CASE_STUDIES_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
