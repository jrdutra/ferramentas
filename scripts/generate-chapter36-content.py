from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_36_LGPD_aplicada_as_APIs.pdf')
spec=importlib.util.spec_from_file_location('c35',ROOT/'scripts/generate-chapter35-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/lgpd-aplicada-apis-pt/lgpd-content.data.ts','en':ROOT/'src/app/learn/lgpd-applied-to-apis-en/lgpd-content.data.ts','es':ROOT/'src/app/learn/lgpd-aplicada-apis-es/lgpd-content.data.ts'};ASSET='/assets/learn/lgpd-applied-to-apis'
ALTS={1:'Mapa do ciclo de vida de dados incluindo APIs, logs, filas, caches e backups',2:'Direitos dos titulares coordenados entre identidade, catálogo e sistemas distribuídos',3:'Privacy by design acompanhando requisitos, contratos, testes e implantação',4:'Resposta a incidente conectando contenção, avaliação de risco e governança'}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def merge(a,b):return a+(b[1:]if a and b and a[0]==b[0]else b)
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
CAP=['Tabela 1 - Classificação de dados deve considerar contexto e possibilidade de associação.','Tabela 2 - Princípios devem ser observáveis em decisões de arquitetura e operação.','Tabela 3 - Papéis devem ser analisados por operação de tratamento, não apenas por empresa.','Tabela 4 - Cópias operacionais precisam fazer parte da política de retenção.','Tabela 5 - A conformidade ganha escala quando a esteira gera evidências.','Tabela 6 - IA amplia o ciclo de vida e exige evidências adicionais.','Tabela 6 - Vocabulário essencial do capítulo.']
TABLES={3:[(325,445,0),(590,715,1)],4:[(120,225,2)],5:[(730,805,3)],6:[(45,135,3)],7:[(600,720,4)],8:[(320,430,5)],10:[(70,365,6)]};FIG={4:[(520,745)],5:[(420,610)],6:[(260,455),(600,780)]}
def extract():
 d=fitz.open(PDF);raw=[rows(d,3,0),rows(d,3,1),rows(d,4,0),merge(rows(d,5,0),rows(d,6,0)),rows(d,7,0),rows(d,8,0),rows(d,10,0)];tabs=[tbl(r,CAP[i])for i,r in enumerate(raw)];seen=set();o=[{'kind':'subhead','text':'LGPD aplicada às APIs: proteção de dados durante todo o ciclo de vida'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Dados pessoais atravessando coleta, processamento, compartilhamento, retenção e eliminação protegidos','caption':'Figura de abertura - A proteção de dados acompanha todo o ciclo de vida da informação processada por APIs.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Privacidade precisa ser traduzida em decisões técnicas verificáveis desde o contrato da API até logs, backups, terceiros e eliminação.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  for b in sorted((x for x in d[pn-1].get_text('dict')['blocks']if'lines'in x),key=lambda x:(x['bbox'][1],x['bbox'][0])):
   text,size,bold=UTIL.block_text(b);y=b['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text):continue
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
PRESERVE=base.PRESERVE|{'LGPD','ANPD','GDPR','dado pessoal','dado pessoal sensível','tratamento','titular','controlador','operador','encarregado','DPO','anonimização','pseudonimização','privacy by design','privacy by default','Relatório de Impacto à Proteção de Dados','RIPD','DPIA','base legal','consentimento','legítimo interesse','finalidade','adequação','necessidade','livre acesso','qualidade dos dados','transparência','segurança','prevenção','não discriminação','responsabilização','prestação de contas','data mapping','lineage','retenção','eliminação','backup','cache','log','API Gateway','DevSecOps','CI/CD','OpenAPI','JWT','OAuth','mTLS','TLS','WAF','SIEM','SLA','SLO','RTO','RPO','IA','profiling','transferência internacional','HTTP','JSON','CPF','CNPJ','IP','cookie','device ID'}
def polish(v,l):
 v=CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
 reps={'en':{},'es':{'Ley General de Protección de Datos':'LGPD','Ley General de Proteccion de Datos':'LGPD'}}[l]
 for a,z in reps.items():v=v.replace(a,z)
 return v
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
 w(OUT['pt'],'LGPD_PT_BLOCKS',pt,'pt');w(OUT['en'],'LGPD_EN_BLOCKS',en,'en');w(OUT['es'],'LGPD_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
