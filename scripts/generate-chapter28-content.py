from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF_PATH=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_28_API_Versioning.pdf')
spec=importlib.util.spec_from_file_location('c27',ROOT/'scripts/generate-chapter27-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUTPUTS={'pt':ROOT/'src/app/learn/api-versioning-pt/api-versioning-content.data.ts','en':ROOT/'src/app/learn/api-versioning-en/api-versioning-content.data.ts','es':ROOT/'src/app/learn/api-versioning-es/api-versioning-content.data.ts'};ASSET='/assets/learn/api-versioning'
FIGURES={1:('figure-01-data-direction.svg','Compatibilidade analisada conforme a direção dos dados entre consumidor e provedor'),2:('figure-02-version-selection.svg','Estratégias para selecionar versões por path, query, header e media type'),3:('figure-03-lifecycle.svg','Ciclo de vida governado de uma versão de API'),4:('figure-04-expand-migrate-contract.svg','Evolução segura pelas fases expandir, migrar e contrair')}
def rows(d,p,i):return [[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,c):r=rows(d,p,i);return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def tables(d):return{'dimensions':tab(d,3,0,'Tabela 1 - Compatibilidade precisa ser avaliada em várias dimensões.'),'taxonomy':tab(d,4,0,'Tabela 2 - Taxonomia prática para revisão de mudanças.'),'semver':tab(d,4,1,'Tabela 3 - SemVer comunica intenção, mas depende de regras claras de compatibilidade.'),'numbers':tab(d,4,2,'Tabela 4 - Não trate todos os números como uma única versão.'),'selection':tab(d,5,0,'Tabela 5 - A escolha deve funcionar em toda a cadeia técnica.'),'schema':tab(d,6,0,'Tabela 6 - A direção da mensagem altera a análise de compatibilidade.'),'apim':tab(d,7,0,'Tabela 7 - Version, revision e release resolvem problemas diferentes.'),'testing':tab(d,9,0,'Tabela 8 - Automação reduz risco, mas precisa de contexto e revisão.'),'glossary':tab(d,11,0,'Tabela 9 - Vocabulário essencial do capítulo.')}
TABLES={3:[(312,432,'dimensions')],4:[(134,254,'taxonomy'),(390,478,'semver'),(603,707,'numbers')],5:[(503,607,'selection')],6:[(351,471,'schema')],7:[(494,581,'apim')],9:[(84,205,'testing')],11:[(81,331,'glossary')]};FIGS={3:[(571,738)],5:[(347,503)],8:[(60,227)],9:[(333,490)]};CODE={5:[(145,207)],8:[(365,433)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Evolução controlada: mudar sem surpreender consumidores'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Contrato, mudança, coexistência, depreciação e retirada como etapas da evolução de APIs','caption':'Figura de abertura - A evolução segura transforma mudanças em um processo observável e governado.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Compatibilidade é percebida pelo consumidor; a versão é apenas um mecanismo de coordenação.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'API Versioning','API','OpenAPI','SDK','REST','GraphQL','gRPC','SemVer','MAJOR','MINOR','PATCH','path','query string','header','media type','URI','URL','JSON','XML','HTTP','SLA','WAF','API Gateway','Azure API Management','APIM','Version','Revision','release','build','Deprecation','Sunset','Link','RFC','changelog','quality gate','semantic diff','contract drift','expand-migrate-contract','backward compatibility','forward compatibility','baseline','breaking change','compatibility window','version set','consumer-driven contract','Git','CI/CD'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in{'heading','subhead','paragraph'}:b['text']=polish(tr[b['text']],l);b.update({'id':UTIL.slugify(b['text'])}if k=='heading'and b.get('level')==2 else{})
  elif k=='list':b['items']=[polish(tr[x],l)for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'Exemplo de versão no caminho':'Path version example'},'es':{'Exemplo de versão no caminho':'Ejemplo de versión en la ruta'}}
   for a,z in maps[l].items():b['text']=b['text'].replace(a,z)
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l)for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l)for x in r]for r in q['rows']]
 return o
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(vals,'en'));es=loc(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'API_VERSIONING_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'API_VERSIONING_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'API_VERSIONING_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table'for b in pt),'figures':sum(b['kind']=='figure'for b in pt),'codes':sum(b['kind']=='code'for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
