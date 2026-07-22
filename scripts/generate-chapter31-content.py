from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF_PATH=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_31_Mensageria_Kafka_RabbitMQ_AMQP_e_JMS.pdf')
spec=importlib.util.spec_from_file_location('c30',ROOT/'scripts/generate-chapter30-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUTPUTS={'pt':ROOT/'src/app/learn/mensageria-kafka-rabbitmq-amqp-jms-pt/messaging-content.data.ts','en':ROOT/'src/app/learn/messaging-kafka-rabbitmq-amqp-jms-en/messaging-content.data.ts','es':ROOT/'src/app/learn/mensajeria-kafka-rabbitmq-amqp-jms-es/messaging-content.data.ts'};ASSET='/assets/learn/messaging-kafka-rabbitmq-amqp-jms'
FIGURES={1:('figure-01-queue-log.svg','Fila tradicional comparada a log distribuído com offsets'),2:('figure-02-confirms-acks.svg','Confirmações entre produtor, broker e consumidor'),3:('figure-03-kafka.svg','Tópicos, partições, réplicas e consumer groups no Kafka'),4:('figure-04-rabbitmq.svg','Exchange do RabbitMQ roteando publicações para filas'),5:('figure-05-amqp.svg','Camadas de conexão, sessão e link do AMQP 1.0'),6:('figure-06-jms.svg','Jakarta Messaging conectando aplicação Java ao provider e destinos')}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def merge(a,b):return a+(b[1:]if a and b and a[0]==b[0]else b)
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
def tables(d):return{'models':tbl(rows(d,3,1),'Tabela 1 - O nome tópico não possui exatamente a mesma semântica em todas as plataformas.'),'delivery':tbl(rows(d,4,0),'Tabela 2 - A semântica deve ser definida ponta a ponta, não apenas pelo nome do recurso do broker.'),'kafka':tbl(rows(d,5,0),'Tabela 3 - A confiabilidade do Kafka emerge da combinação de várias decisões.'),'exchange':tbl(rows(d,6,0),'Tabela 4 - A exchange decide roteamento; a fila decide armazenamento e entrega aos consumidores.'),'rabbit':tbl(merge(rows(d,6,1),rows(d,7,0)),'Tabela 5 - Recursos de confiabilidade precisam ser combinados com comportamento correto da aplicação.'),'amqp':tbl(rows(d,7,1),'Tabela 6 - As duas famílias precisam ser documentadas separadamente.'),'patterns':tbl(rows(d,8,0),'Tabela 7 - Padrões só são completos quando incluem operação e recuperação.'),'troubleshooting':tbl(rows(d,9,0),'Tabela 8 - Troubleshooting eficaz separa publicação, armazenamento, entrega e processamento.'),'glossary':tbl(rows(d,11,0),'Tabela 9 - Vocabulário essencial do capítulo.')}
TABLES={3:[(472,580,'models')],4:[(512,595,'delivery')],5:[(558,672,'kafka')],6:[(470,570,'exchange'),(756,810,'rabbit')],7:[(57,155,'rabbit'),(487,585,'amqp')],8:[(485,600,'patterns')],9:[(390,512,'troubleshooting')],11:[(80,405,'glossary')]};FIGS={3:[(298,472)],4:[(346,512)],5:[(208,402)],6:[(287,470)],7:[(318,487)],8:[(60,240)]};CODE={4:[(70,176)],8:[(240,340)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Mensageria: desacoplar tempo, capacidade e disponibilidade'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Produtor publicando mensagens em broker para consumidores independentes','caption':'Figura de abertura - Brokers desacoplam produtores e consumidores, mas a confiabilidade continua sendo responsabilidade ponta a ponta.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Confiabilidade depende do protocolo, do broker e do comportamento correto de produtores e consumidores.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'Kafka','RabbitMQ','AMQP','AMQP 0-9-1','AMQP 1.0','JMS','Jakarta Messaging','broker','producer','consumer','queue','topic','stream','distributed log','publish/subscribe','pub/sub','acknowledgement','ack','publisher confirm','offset','partition','consumer group','KRaft','leader','replica','ISR','acks','rebalance','transaction','retention','compaction','tombstone','Kafka Connect','Kafka Streams','exchange','binding','routing key','direct','topic exchange','fanout','headers exchange','vhost','channel','quorum queue','DLX','DLQ','prefetch','settlement','delivery state','connection','session','link','source','target','JMSContext','JMSProducer','JMSConsumer','Message','Destination','Queue','Topic','competing consumers','request-reply','Outbox','Inbox','retry','backpressure','at-most-once','at-least-once','exactly-once','CloudEvents','JSON','Avro','Protobuf','schema registry','TLS','SASL','OAuth','ACL','lag','hot partition','poison message','eventId'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in{'heading','subhead','paragraph'}:b['text']=polish(tr[b['text']],l);b.update({'id':UTIL.slugify(b['text'])}if k=='heading'and b.get('level')==2 else{})
  elif k=='list':b['items']=[polish(tr[x],l)for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'pagamento.autorizado.v1':'payment.authorized.v1','servico-pagamentos':'payment-service','fila.pagamentos':'payments.queue','Pagamento autorizado':'Payment authorized','O consumidor deve tratar redelivery e idempotência.':'The consumer must handle redelivery and idempotency.'},'es':{'pagamento.autorizado.v1':'pago.autorizado.v1','servico-pagamentos':'servicio-pagos','fila.pagamentos':'cola.pagos','Pagamento autorizado':'Pago autorizado','O consumidor deve tratar redelivery e idempotência.':'El consumidor debe gestionar redelivery e idempotencia.'}}
   for a,z in maps[l].items():b['text']=b['text'].replace(a,z)
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l)for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l)for x in r]for r in q['rows']]
 return o
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(vals,'en'));es=loc(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'MESSAGING_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'MESSAGING_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'MESSAGING_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table'for b in pt),'figures':sum(b['kind']=='figure'for b in pt),'codes':sum(b['kind']=='code'for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
