from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_37_Arquiteturas_Bancarias_de_Alta_Disponibilidade.pdf')
spec=importlib.util.spec_from_file_location('c36',ROOT/'scripts/generate-chapter36-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/arquiteturas-bancarias-alta-disponibilidade-pt/high-availability-content.data.ts','en':ROOT/'src/app/learn/high-availability-banking-architectures-en/high-availability-content.data.ts','es':ROOT/'src/app/learn/arquitecturas-bancarias-alta-disponibilidad-es/high-availability-content.data.ts'};ASSET='/assets/learn/high-availability-banking-architectures'
ALTS={1:'Camadas interdependentes de resiliência bancária, do negócio à infraestrutura',2:'Linha do tempo comparando RPO e RTO durante uma recuperação',3:'Comparação entre topologias active-active e active-passive',4:'Fluxo resiliente de uma transação financeira com idempotência e reconciliação',5:'Ciclo de resposta, recuperação, reconciliação e aprendizado após incidente'}
CAP=['Tabela 1 - Resiliência começa pela operação de negócio e suas dependências reais.','Tabela 2 - Métricas técnicas precisam estar ligadas a decisões de arquitetura e negócio.','Tabela 3 - A escolha deve refletir tolerância, integridade, custo e capacidade operacional.','Tabela 4 - Replicação atende disponibilidade; backup atende também corrupção e perda lógica.','Tabela 5 - A disponibilidade da API depende da convergência de toda a cadeia de rede.','Tabela 6 - Resiliência inclui controlar demanda, não apenas aumentar infraestrutura.','Tabela 7 - Testes precisam validar hipóteses de negócio e tecnologia.','Tabela 8 - O diagnóstico deve preservar integridade e reconstruir a sequência de eventos.','Tabela 9 - Vocabulário essencial do capítulo.']
TABLES={3:[(410,510,0)],4:[(230,330,1)],5:[(255,360,2),(510,610,3)],6:[(500,605,4)],7:[(250,355,5)],8:[(85,190,6),(585,690,7)],9:[(485,750,8)]}
FIG={1:[(270,610)],3:[(80,250)],4:[(60,230)],5:[(60,260)],6:[(60,245)],7:[(500,675)]}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def extract():
 d=fitz.open(PDF);tabs=[]
 for p,i in [(3,0),(4,0),(5,0),(5,1),(6,0),(7,0),(8,0),(8,1),(9,0)]:tabs.append(tbl(rows(d,p,i),CAP[len(tabs)]))
 seen=set();o=[{'kind':'subhead','text':'Alta disponibilidade bancária: continuidade ponta a ponta, não apenas servidores duplicados'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'O serviço crítico precisa sobreviver a falhas de processo, nó, zona, região, fornecedor, mudança e erro humano.'}]
 for pn in range(1,len(d)+1):
  for b in sorted((x for x in d[pn-1].get_text('dict')['blocks']if'lines'in x),key=lambda x:(x['bbox'][1],x['bbox'][0])):
   text,size,bold=UTIL.block_text(b);y=b['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos')or re.fullmatch(r'Página\s+\d+',text)or text in{'FAAC','Fundamentos e Arquitetura de APIs','Corporativas','Fundamentos e Arquitetura de APIs Corporativas','Capítulo 37','Arquiteturas bancárias de','alta disponibilidade','Arquiteturas bancárias de alta disponibilidade','Como projetar operações críticas para resistir, recuperar e reconciliar serviços diante de falhas técnicas, humanas e operacionais'}:continue
   if text.startswith('Figura de abertura'):
    o.append({'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Arquitetura bancária resiliente protegendo a continuidade ponta a ponta','caption':text});continue
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
PRESERVE=base.PRESERVE|{'RTO','RPO','SLI','SLO','MTTR','MTBF','BIA','active-active','active-passive','warm standby','pilot light','fault domain','split-brain','quorum','ledger','Outbox','idempotência','API Gateway','DNS','WAF','HSM','PKI','Kubernetes','Zero Trust','disaster recovery','chaos engineering','backpressure','load shedding','Pix','mainframe','HTTP','SLA','DR','RCA','runbook','failover','fallback','timeout','cache','backup','journal'}
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
 w(OUT['pt'],'HIGH_AVAILABILITY_PT_BLOCKS',pt,'pt');w(OUT['en'],'HIGH_AVAILABILITY_EN_BLOCKS',en,'en');w(OUT['es'],'HIGH_AVAILABILITY_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
