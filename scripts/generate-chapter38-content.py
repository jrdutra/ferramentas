from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_38_Troubleshooting_de_APIs_e_Gateways.pdf')
spec=importlib.util.spec_from_file_location('c37',ROOT/'scripts/generate-chapter37-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/troubleshooting-apis-gateways-pt/troubleshooting-content.data.ts','en':ROOT/'src/app/learn/api-gateway-troubleshooting-en/troubleshooting-content.data.ts','es':ROOT/'src/app/learn/troubleshooting-apis-gateways-es/troubleshooting-content.data.ts'};ASSET='/assets/learn/api-gateway-troubleshooting'
ALTS={1:'Modelo em camadas para localizar onde uma transação de API parou',2:'Pontos de observação ao longo de uma chamada corporativa de API',3:'Alinhamento de timeouts entre cliente, gateway, backend e dependência',4:'Correlação entre identificadores técnicos e identificadores de negócio',5:'Ciclo de resposta a incidente desde detecção até aprendizado'}
CAP=['Tabela 1 - Perguntas iniciais reduzem rapidamente o espaço de busca.','Tabela 2 - Sintomas de transporte devem ser associados a evidências de rede.','Tabela 3 - Status codes iniciam a análise, mas não identificam sozinhos o componente responsável.','Tabela 4 - A seção da policy ajuda a localizar quando o fluxo foi interrompido.','Tabela 5 - A ferramenta correta depende da pergunta que se pretende responder.','Tabela 6 - Casos reais são resolvidos ao localizar a fronteira entre sucesso e falha.','Tabela 7 - Vocabulário essencial do capítulo.']
TABLES={3:[(325,430,0)],4:[(660,770,1)],5:[(470,575,2)],6:[(180,290,3)],7:[(730,805,4)],8:[(50,140,4),(620,725,5)],9:[(520,790,6)]};FIG={1:[(260,600)],3:[(590,800)],4:[(45,270)],6:[(590,790)],7:[(400,600)],8:[(270,460)]}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def merge(a,b):return a+(b[1:]if a and b and a[0]==b[0]else b)
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def extract():
 d=fitz.open(PDF);raw=[rows(d,3,0),rows(d,4,0),rows(d,5,0),rows(d,6,0),merge(rows(d,7,0),rows(d,8,0)),rows(d,8,1),rows(d,9,0)];tabs=[tbl(r,CAP[i])for i,r in enumerate(raw)];seen=set();o=[{'kind':'subhead','text':'Troubleshooting orientado por evidências: do sintoma à causa raiz'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Não altere a plataforma por tentativa e erro: formule hipóteses, colete evidências e reduza o espaço de busca.'}]
 for pn in range(1,len(d)+1):
  for b in sorted((x for x in d[pn-1].get_text('dict')['blocks']if'lines'in x),key=lambda x:(x['bbox'][1],x['bbox'][0])):
   text,size,bold=UTIL.block_text(b);y=b['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text)or text in{'FAAC','Fundamentos e Arquitetura de APIs','Corporativas','Fundamentos e Arquitetura de APIs Corporativas','Capítulo 38','Troubleshooting de APIs','e Gateways','Troubleshooting de APIs e Gateways','Como transformar sintomas vagos em hipóteses verificáveis, localizar a camada da falha e restaurar serviços com segurança'}:continue
   if text.startswith('Figura de abertura'):o.append({'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Investigação de API orientada por hipóteses, evidências e causa raiz','caption':text});continue
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
PRESERVE=base.PRESERVE|{'troubleshooting','API Gateway','DNS','WAF','LB','TCP','UDP','NAT','SNAT','TLS','mTLS','HTTP','JWT','OAuth','OIDC','SAML','HSM','PKI','Kubernetes','service mesh','sidecar','timeout','retry','rate limit','backpressure','load shedding','circuit breaker','request ID','trace ID','span ID','correlation ID','RCA','runbook','baseline','timestamp','NXDOMAIN','SERVFAIL','SYN','RST','FIN','502','503','504','401','403','429','curl','openssl','dig','nslookup','traceroute','tcpdump','Wireshark','OpenTelemetry','SIEM','URI','IP','BRT'}
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
 w(OUT['pt'],'TROUBLESHOOTING_PT_BLOCKS',pt,'pt');w(OUT['en'],'TROUBLESHOOTING_EN_BLOCKS',en,'en');w(OUT['es'],'TROUBLESHOOTING_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
