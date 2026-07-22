from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_34_Zero_Trust_aplicado_a_APIs.pdf')
spec=importlib.util.spec_from_file_location('c33',ROOT/'scripts/generate-chapter33-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/zero-trust-aplicado-apis-pt/zero-trust-content.data.ts','en':ROOT/'src/app/learn/zero-trust-applied-to-apis-en/zero-trust-content.data.ts','es':ROOT/'src/app/learn/zero-trust-aplicado-apis-es/zero-trust-content.data.ts'};ASSET='/assets/learn/zero-trust-applied-to-apis'
ALTS={1:'Policy Decision Point separado do Policy Enforcement Point e alimentado por sinais',2:'Identidade efetiva composta por usuário, aplicação, workload e dispositivo',3:'Sequência de identificação, contexto, decisão e enforcement',4:'Token vinculado a uma chave criptográfica para prova de posse',5:'Cadeia governada de atributos, política, decisão e enforcement',6:'Service mesh aplicando identidade e políticas entre workloads',7:'Pilares coordenados da maturidade Zero Trust',8:'Investigação seguindo identidade, contexto, política, enforcement e recurso'}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
CAP=['Tabela 1 - Zero Trust deve ser compreendido como arquitetura e processo, não como marca de produto.','Tabela 2 - Zero Trust combina identidades e sinais sem presumir que um único atributo seja suficiente.','Tabela 3 - Prova de posse melhora a resistência a replay de tokens, mas exige validação e operação corretas.','Tabela 4 - O gateway precisa produzir diagnósticos por etapa, sem devolver detalhes sensíveis ao consumidor.','Tabela 5 - Microsegmentação é apenas uma das camadas de uma estratégia orientada ao recurso.','Tabela 6 - Disponibilidade e segurança precisam ser modeladas juntas.','Tabela 7 - A resposta HTTP é apenas o sintoma final; a evidência precisa localizar a decisão.','Tabela 8 - Vocabulário essencial do capítulo.']
SPECS=[(3,0),(5,0),(5,1),(6,0),(7,0),(8,0),(9,0),(11,0)];TABLES={3:[(125,225,0)],5:[(95,200,1),(565,665,2)],6:[(610,715,3)],7:[(545,650,4)],8:[(350,460,5)],9:[(570,675,6)],11:[(70,365,7)]};FIG={3:[(420,630)],4:[(110,280),(450,645)],5:[(380,575)],6:[(130,320)],7:[(170,360)],9:[(90,240),(390,580)]}
def extract():
 d=fitz.open(PDF);tabs=[tbl(rows(d,p,i),CAP[n])for n,(p,i)in enumerate(SPECS)];seen=set();o=[{'kind':'subhead','text':'Zero Trust para APIs: verificar explicitamente e decidir por requisição'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Solicitação de API atravessando verificação de identidade, risco, política e enforcement','caption':'Figura de abertura - O acesso a uma API é uma decisão dinâmica baseada no sujeito, no recurso, no contexto e na política vigente.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Nenhuma localização concede confiança implícita; cada acesso deve ser autenticado, autorizado, limitado e continuamente avaliado.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'Zero Trust','NIST','SP 800-207','Policy Decision Point','PDP','Policy Enforcement Point','PEP','Policy Engine','PE','Policy Administrator','PA','Policy Information Point','PIP','identity provider','IdP','API Gateway','service mesh','workload identity','device identity','mTLS','TLS','OAuth 2.0','OpenID Connect','OIDC','JWT','DPoP','mTLS-bound token','proof of possession','PoP','Bearer','RBAC','ABAC','ReBAC','PBAC','policy-as-code','OPA','Rego','Cedar','XACML','Kubernetes','ServiceAccount','SPIFFE','SPIRE','NetworkPolicy','microsegmentation','east-west','north-south','egress','WAF','SIEM','SOAR','UEBA','risk score','continuous access evaluation','least privilege','deny by default','fail-open','fail-closed','token exchange','audience','issuer','subject','client_id','cnf','jkt','x5t#S256','HTTP','403','401'}
def polish(v,l):
 v=CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
 reps={'en':{},'es':{'Confianza Cero':'Zero Trust','Confianza cero':'Zero Trust','confianza cero':'Zero Trust','Punto de Ejecución de Políticas':'Policy Enforcement Point','Punto de Aplicación de Políticas':'Policy Enforcement Point','punto de aplicación de políticas':'Policy Enforcement Point','Punto de Decisión de Política':'Policy Decision Point','Punto de decisión de políticas':'Policy Decision Point','punto de decisión de políticas':'Policy Decision Point'}}[l]
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
 w(OUT['pt'],'ZERO_TRUST_PT_BLOCKS',pt,'pt');w(OUT['en'],'ZERO_TRUST_EN_BLOCKS',en,'en');w(OUT['es'],'ZERO_TRUST_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
