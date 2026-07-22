from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_35_Open_Finance_e_Open_Banking_Brasil.pdf')
spec=importlib.util.spec_from_file_location('c34',ROOT/'scripts/generate-chapter34-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/open-finance-open-banking-brasil-pt/open-finance-content.data.ts','en':ROOT/'src/app/learn/open-finance-open-banking-brazil-en/open-finance-content.data.ts','es':ROOT/'src/app/learn/open-finance-open-banking-brasil-es/open-finance-content.data.ts'};ASSET='/assets/learn/open-finance-open-banking-brazil'
ALTS={1:'Consentimento, autenticação e chamada de API como etapas independentes',2:'Diretório e confiança institucional conectando participantes por criptografia e protocolos',3:'Iniciador de pagamento orquestrando jornada executada pela instituição detentora',4:'API Gateway aplicando controles de borda em uma jornada autorizada fim a fim'}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
CAP=['Tabela 1 - Os termos se relacionam, mas não são sinônimos perfeitos.','Tabela 2 - As fases explicam a evolução, mas a operação atual é contínua e versionada.','Tabela 3 - O diagnóstico deve registrar qual papel cada instituição exercia na transação.','Tabela 4 - Segurança é composta por camadas; nenhum mecanismo isolado resolve todo o problema.','Tabela 5 - Cada ameaça precisa de controle preventivo e evidência verificável.','Tabela 6 - A experiência segura precisa prever caminhos de erro e cancelamento.','Tabela 7 - Disponibilidade técnica sem qualidade ou segurança não representa sucesso.','Tabela 6 - O diagnóstico começa pela etapa, não pelo produto apontado pelo usuário.','Tabela 7 - Vocabulário essencial do capítulo.']
SPECS=[(3,0),(3,1),(3,2),(5,0),(6,0),(7,0),(8,0),(8,1),(10,0)];TABLES={3:[(85,185,0),(335,440,1),(590,695,2)],5:[(170,290,3)],6:[(370,490,4)],7:[(505,610,5)],8:[(180,300,6),(620,740,7)],10:[(70,300,8)]};FIG={4:[(130,325),(510,720)],6:[(90,245)],7:[(90,245)]}
def extract():
 d=fitz.open(PDF);tabs=[tbl(rows(d,p,i),CAP[n])for n,(p,i)in enumerate(SPECS)];seen=set();o=[{'kind':'subhead','text':'Open Finance Brasil: consentimento, confiança institucional e APIs padronizadas'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Cliente autorizando compartilhamento seguro entre instituições financeiras por APIs','caption':'Figura de abertura - A jornada combina escolha do cliente, confiança entre participantes e APIs padronizadas.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'O cliente controla o consentimento, enquanto participantes regulados preservam segurança, interoperabilidade, evidências e responsabilidades ponta a ponta.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'Open Banking','Open Finance','Open Finance Brasil','Banco Central do Brasil','BCB','CMN','consentimento','consent','FAPI','FAPI-BR','OAuth 2.0','OpenID Connect','OIDC','mTLS','TLS','PAR','JARM','PKCE','DPoP','JWT','JWS','JWE','JOSE','client credentials','authorization code','redirect URI','scope','audience','issuer','access token','refresh token','ID Token','API Gateway','ASPSP','TPP','PISP','AISP','detentora','receptora','iniciador de transação de pagamento','ITP','DICT','Pix','CPF','CNPJ','LGPD','Diretório de Participantes','Software Statement Assertion','SSA','JWKS','OpenAPI','ISO 20022','webhook','idempotency key','correlation ID','rate limit','SLA','SLO','RTO','RPO','HTTP','401','403','429','5xx','SIEM','WAF','HSM','OCSP','CRL'}
def polish(v,l):
 v=CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
 reps={'en':{'Brazil Open Finance':'Open Finance Brazil'},'es':{'Finanzas Abiertas':'Open Finance','Banca Abierta':'Open Banking','Finanzas abiertas':'Open Finance','Banca abierta':'Open Banking'}}[l]
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
 w(OUT['pt'],'OPEN_FINANCE_PT_BLOCKS',pt,'pt');w(OUT['en'],'OPEN_FINANCE_EN_BLOCKS',en,'en');w(OUT['es'],'OPEN_FINANCE_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
