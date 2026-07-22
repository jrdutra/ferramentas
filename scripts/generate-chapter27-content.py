from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1]
PDF_PATH=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_27_Rate_Limiting_Quotas_e_Throttling.pdf')
spec=importlib.util.spec_from_file_location('c26',ROOT/'scripts/generate-chapter26-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base)
CORE=base.CORE;UTIL=base.UTIL
OUTPUTS={'pt':ROOT/'src/app/learn/rate-limiting-quotas-throttling-pt/rate-limiting-content.data.ts','en':ROOT/'src/app/learn/rate-limiting-quotas-throttling-en/rate-limiting-content.data.ts','es':ROOT/'src/app/learn/rate-limiting-cuotas-throttling-es/rate-limiting-content.data.ts'}
ASSET='/assets/learn/rate-limiting-quotas-throttling'
FIGURES={1:('figure-01-token-bucket.svg','Token bucket com capacidade de burst e taxa média sustentável'),2:('figure-02-local-global.svg','Limites locais por instância e limite global compartilhado'),3:('figure-03-layered-control.svg','Políticas de contenção em camadas desde a borda até o backend')}
def rows(d,p,i):return [[CORE.clean_table_cell(c) for c in r] for r in d[p-1].find_tables().tables[i].extract()]
def merge(*parts):
 out=parts[0]
 for nxt in parts[1:]:out.extend(nxt[1:] if nxt and out and nxt[0]==out[0] else nxt)
 return out
def table(r,caption):return {'kind':'table','caption':caption,'headers':r[0],'rows':r[1:]}
def tables(d):return {
 'concepts':table(merge(rows(d,2,0),rows(d,3,0)),'Tabela 1 - A política deve separar orçamento, velocidade e reação.'),
 'keys':table(rows(d,3,1),'Tabela 2 - A chave correta depende da fronteira de responsabilidade.'),
 'algorithms':table(merge(rows(d,3,2),rows(d,4,0)),'Tabela 3 - Precisão, custo e burst são trade-offs inseparáveis.'),
 'controls':table(rows(d,5,0),'Tabela 4 - Limitar frequência e limitar concorrência resolvem problemas diferentes.'),
 'sizing':table(rows(d,7,0),'Tabela 5 - Limites devem derivar de capacidade observada e política de negócio.'),
 'metrics':table(rows(d,8,0),'Tabela 6 - Métricas devem explicar proteção, fairness e falhas do mecanismo.'),
 'troubleshooting':table(merge(rows(d,8,1),rows(d,9,0)),'Tabela 7 - Troubleshooting começa localizando o enforcement e a chave real.'),
 'glossary':table(rows(d,10,0),'Tabela 8 - Vocabulário essencial do capítulo.')}
TABLES={2:[(736,810,'concepts')],3:[(57,136,'concepts'),(295,415,'keys'),(755,810,'algorithms')],4:[(57,136,'algorithms')],5:[(123,227,'controls')],7:[(339,443,'sizing')],8:[(238,375,'metrics'),(745,810,'troubleshooting')],9:[(57,161,'troubleshooting')],10:[(176,491,'glossary')]}
FIGS={4:[(275,450)],5:[(315,535)],6:[(130,292)]}
CODE={3:[(550,620)],4:[(452,540)],6:[(438,565),(720,785)],7:[(590,695)],8:[(521,600)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[
 {'kind':'subhead','text':'Controle de consumo em múltiplas escalas de tempo'},
 {'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Rate limit, quota, throttling e fairness como controles complementares','caption':'Figura de abertura - Frequência, orçamento acumulado e reação operacional são conceitos relacionados, mas distintos.'},
 {'kind':'subhead','text':'Pergunta fundamental'},
 {'kind':'paragraph','text':'Quem pode consumir quanto, em qual janela, com qual custo e qual comportamento ocorre quando o orçamento termina?'},
 {'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  blocks=sorted((b for b in d[pn-1].get_text('dict')['blocks'] if 'lines' in b),key=lambda b:(b['bbox'][1],b['bbox'][0]))
  for sb in blocks:
   text,size,bold=UTIL.block_text(sb);y=sb['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+',text):continue
   if any(a<=y<=z for a,z in FIGS.get(pn,[])):
    m=re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)',text)
    if m:
     n=int(m.group(1));fn,alt=FIGURES[n];out.append({'kind':'figure','src':f'{ASSET}/pt/{fn}','alt':alt,'caption':text})
    continue
   hit=False
   for a,z,k in TABLES.get(pn,[]):
    if a<=y<=z:
     if k not in seen:out.append(copy.deepcopy(ts[k]));seen.add(k)
     hit=True;break
   if hit:continue
   if any(a<=y<=z for a,z in CODE.get(pn,[])):UTIL.append_block(out,{'kind':'code','text':UTIL.block_code(sb)});continue
   if text.startswith(('•','●')):
    items=[UTIL.clean_text(x) for x in re.split(r'[•●]',text) if UTIL.clean_text(x)]
    if out and out[-1]['kind']=='list' and not out[-1]['ordered']:out[-1]['items'].extend(items)
    else:out.append({'kind':'list','ordered':False,'items':items})
   elif size>=14:out.append({'kind':'heading','level':2,'text':text,'id':UTIL.slugify(text)})
   elif size>=9.8 and bold:out.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.3:out.append({'kind':'subhead','text':text})
   else:UTIL.append_block(out,{'kind':'paragraph','text':text})
 return out
PRESERVE=base.PRESERVE|{'Rate limiting','Rate limit','Quota','Throttling','Fairness','burst','fixed window','sliding window','sliding log','sliding counter','token bucket','leaky bucket','GCRA','concurrency limit','backpressure','load shedding','overshoot','hot key','Redis','HTTP','429 Too Many Requests','Retry-After','RateLimit','X-RateLimit-*','exponential backoff','jitter','idempotência','API Gateway','Azure API Management','APIM','Axway API Gateway','Envoy','CDN','WAF','OAuth','JWT','client_id','sub','tenant','IP','SLO','shadow','fail-open','fail-closed'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def localize(src,l,tr):
 out=copy.deepcopy(src)
 for i,b in enumerate(out):
  q=src[i];k=b['kind']
  if k in {'heading','subhead','paragraph'}:
   b['text']=polish(tr[b['text']],l)
   if k=='heading' and b.get('level')==2:b['id']=UTIL.slugify(b['text'])
  elif k=='list':b['items']=[polish(tr[x],l) for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'Pseudocódigo conceitual de fixed window':'Conceptual fixed window pseudocode','Lógica conceitual de reposição preguiçosa':'Conceptual lazy refill logic','Resposta recomendada ao exceder um limite de curto prazo':'Recommended response when exceeding a short-term limit','Aguarde antes de repetir a operação.':'Wait before retrying the operation.','cliente-leitura-burst':'client-read-burst','Backoff exponencial com jitter - pseudocódigo':'Exponential backoff with jitter - pseudocode','Plano de validação temporal':'Temporal validation plan','rejeição conforme capacidade do bucket':'rejection according to bucket capacity','repetir com 4 identidades':'repeat with 4 identities','isolamento entre chaves':'isolation between keys','distribuir por 3 gateways':'distribute across 3 gateways','medir overshoot e escopo do contador':'measure overshoot and counter scope','derrubar rate-limit service':'take down rate-limit service','validar fail-open/fail-closed':'validate fail-open/fail-closed','enviar':'send','se permitido':'if allowed','senão':'else','Limite de chamadas excedido':'Call limit exceeded','Tente novamente em 20 segundos.':'Try again in 20 seconds.','Exemplo conceitual de cenário de teste':'Conceptual test scenario example','nenhuma rejeição esperada':'no rejection expected','rejeição limitada ao excedente':'rejection limited to excess'},'es':{'Pseudocódigo conceitual de fixed window':'Pseudocódigo conceptual de fixed window','Lógica conceitual de reposição preguiçosa':'Lógica conceptual de reposición diferida','Resposta recomendada ao exceder um limite de curto prazo':'Respuesta recomendada al superar un límite a corto plazo','Aguarde antes de repetir a operação.':'Espere antes de repetir la operación.','cliente-leitura-burst':'cliente-lectura-burst','Backoff exponencial com jitter - pseudocódigo':'Backoff exponencial con jitter - pseudocódigo','Plano de validação temporal':'Plan de validación temporal','rejeição conforme capacidade do bucket':'rechazo según la capacidad del bucket','repetir com 4 identidades':'repetir con 4 identidades','isolamento entre chaves':'aislamiento entre claves','distribuir por 3 gateways':'distribuir entre 3 gateways','medir overshoot e escopo do contador':'medir overshoot y alcance del contador','derrubar rate-limit service':'desactivar rate-limit service','validar fail-open/fail-closed':'validar fail-open/fail-closed','enviar':'enviar','se permitido':'si se permite','senão':'si no','Limite de chamadas excedido':'Límite de solicitudes excedido','Tente novamente em 20 segundos.':'Inténtelo de nuevo en 20 segundos.','Exemplo conceitual de cenário de teste':'Ejemplo conceptual de escenario de prueba','nenhuma rejeição esperada':'no se esperan rechazos','rejeição limitada ao excedente':'rechazo limitado al excedente'}}
   for a,z in maps[l].items():b['text']=b['text'].replace(a,z)
  elif k=='table':
   b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l) for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l) for x in r] for r in q['rows']]
 return out
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=localize(pt,'en',UTIL.translate_values(vals,'en'));es=localize(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'RATE_LIMITING_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'RATE_LIMITING_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'RATE_LIMITING_ES_BLOCKS',es,'es')
 print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table' for b in pt),'figures':sum(b['kind']=='figure' for b in pt),'codes':sum(b['kind']=='code' for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
