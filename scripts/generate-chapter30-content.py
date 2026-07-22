from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF_PATH=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_30_Microservicos_e_Padroes_de_Integracao.pdf')
spec=importlib.util.spec_from_file_location('c29',ROOT/'scripts/generate-chapter29-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUTPUTS={'pt':ROOT/'src/app/learn/microservicos-padroes-integracao-pt/microservices-content.data.ts','en':ROOT/'src/app/learn/microservices-integration-patterns-en/microservices-content.data.ts','es':ROOT/'src/app/learn/microservicios-patrones-integracion-es/microservices-content.data.ts'};ASSET='/assets/learn/microservices-integration-patterns'
FIGURES={1:('figure-01-bounded-contexts.svg','Decomposição de microserviços por capacidades de negócio e bounded contexts'),2:('figure-02-sync-async.svg','Comparação entre integração síncrona e assíncrona'),3:('figure-03-saga.svg','Saga como sequência de transações locais e compensações'),4:('figure-04-transactional-outbox.svg','Transactional Outbox conectando serviço, banco local e broker')}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,c):r=rows(d,p,i);return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def tables(d):return{'boundaries':tab(d,4,0,'Tabela 1 - A qualidade da fronteira é observada pelo comportamento das mudanças.'),'communication':tab(d,4,1,'Tabela 2 - O modelo de comunicação altera garantias e experiência operacional.'),'saga':tab(d,6,0,'Tabela 3 - A escolha depende da complexidade e da necessidade de controle do processo.'),'delivery':tab(d,6,1,'Tabela 4 - Entrega confiável combina protocolo, persistência e semântica de negócio.'),'troubleshooting':tab(d,9,0,'Tabela 5 - O troubleshooting deve reconstruir estados e mensagens, não apenas respostas HTTP.'),'glossary':tab(d,10,0,'Tabela 6 - Vocabulário essencial do capítulo.'),'selection':tab(d,11,0,'Tabela 7 - O padrão é escolhido pela necessidade e pelo custo operacional aceitável.')}
TABLES={4:[(57,160,'boundaries'),(630,755,'communication')],6:[(57,128,'saga'),(574,677,'delivery')],9:[(95,206,'troubleshooting')],10:[(313,609,'glossary')],11:[(138,274,'selection')]};FIGS={3:[(446,621)],4:[(458,630)],5:[(612,790)],6:[(275,441)]};CODE={5:[(220,325)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Microserviços: autonomia local com coordenação explícita'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Canal integrando domínios de pedidos, pagamentos e estoque com dados próprios','caption':'Figura de abertura - A autonomia dos serviços depende de fronteiras claras e integração governada.'},{'kind':'subhead','text':'Integração madura'},{'kind':'paragraph','text':'Contratos, consistência, idempotência, observabilidade e ownership são tão importantes quanto a divisão dos serviços.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'microservices','Microservices','bounded context','Domain-Driven Design','DDD','API','event','command','query','Saga','Choreography','Orchestration','Transactional Outbox','CDC','Inbox','Idempotent Consumer','API Composition','CQRS','Materialized View','Event Sourcing','Strangler Fig','aggregate','eventual consistency','two-phase commit','2PC','XA','broker','Kafka','RabbitMQ','REST','gRPC','HTTP','JSON','eventId','eventType','occurredAt','aggregateId','correlationId','causationId','payload','Idempotency-Key','DLQ','retry','timeout','circuit breaker','bulkhead','service discovery','API Gateway','service mesh','mTLS','OAuth','JWT','OpenTelemetry','traceId','spanId','SLO','CI/CD','consumer-driven contract','schema registry','ownership','fan-out'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in{'heading','subhead','paragraph'}:b['text']=polish(tr[b['text']],l);b.update({'id':UTIL.slugify(b['text'])}if k=='heading'and b.get('level')==2 else{})
  elif k=='list':b['items']=[polish(tr[x],l)for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'PagamentoAutorizado':'PaymentAuthorized','valor':'amount','moeda':'currency'},'es':{'PagamentoAutorizado':'PagoAutorizado','valor':'importe','moeda':'moneda'}}
   for a,z in maps[l].items():b['text']=b['text'].replace(a,z)
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l)for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l)for x in r]for r in q['rows']]
 return o
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(vals,'en'));es=loc(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'MICROSERVICES_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'MICROSERVICES_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'MICROSERVICES_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table'for b in pt),'figures':sum(b['kind']=='figure'for b in pt),'codes':sum(b['kind']=='code'for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
