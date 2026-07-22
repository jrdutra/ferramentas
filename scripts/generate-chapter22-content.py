from __future__ import annotations

import copy, importlib.util, json, re, sys
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[1]
PDF_PATH=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_22_Politicas_de_Gateway_Policies.pdf')
spec=importlib.util.spec_from_file_location('chapter21',ROOT/'scripts/generate-chapter21-content.py'); base=importlib.util.module_from_spec(spec); assert spec.loader; spec.loader.exec_module(base)
OUTPUTS={'pt':ROOT/'src/app/learn/politicas-gateway-policies-pt/gateway-policies-content.data.ts','en':ROOT/'src/app/learn/gateway-policies-en/gateway-policies-content.data.ts','es':ROOT/'src/app/learn/politicas-gateway-policies-es/gateway-policies-content.data.ts'}
ASSET_ROOT='/assets/learn/gateway-policies'
FIGURES={1:('figure-01-policy-phases.svg','Fases inbound, backend, outbound e on-error do pipeline de policies'),2:('figure-02-policy-order.svg','Ordem de correlação, autenticação, autorização, limites, transformação e roteamento'),3:('figure-03-resilience.svg','Coordenação entre timeout, retry, circuit breaker e fallback')}

def rows(doc,p,i): return [[base.base.clean_table_cell(c) for c in r] for r in doc[p-1].find_tables().tables[i].extract()]
def table(doc,p,i,caption):
    r=rows(doc,p,i); return {'kind':'table','caption':caption,'headers':r[0],'rows':r[1:]}
def tables(doc):
    evidence=rows(doc,7,0); continuation=rows(doc,8,0)
    return {
      'classes':table(doc,3,0,'Tabela 1 - Uma policy deve ter objetivo explícito e efeito observável.'),
      'scope':table(doc,4,0,'Tabela 2 - O escopo correto equilibra consistência e autonomia.'),
      'authz':table(doc,5,0,'Tabela 3 - Autorização deve equilibrar expressividade, latência e disponibilidade.'),
      'contracts':table(doc,5,1,'Tabela 4 - O gateway protege o contrato; o backend preserva a verdade do domínio.'),
      'routing':table(doc,6,0,'Tabela 5 - Roteamento precisa ser explicável em logs e traces.'),
      'evidence':{'kind':'table','caption':'Tabela 6 - Logs, métricas, traces e auditoria atendem perguntas diferentes.','headers':evidence[0],'rows':evidence[1:]+continuation[1:]},
      'troubleshooting':table(doc,8,1,'Tabela 7 - O diagnóstico deve localizar a decisão exata dentro do pipeline.'),
      'glossary':table(doc,10,0,'Tabela 8 - Vocabulário essencial do capítulo.')}

TABLE_REGIONS={3:[(219,351,'classes')],4:[(469,569,'scope')],5:[(318,401,'authz'),(542,642,'contracts')],6:[(520,621,'routing')],7:[(759,810,'evidence')],8:[(57,140,'evidence'),(434,550,'troubleshooting')],10:[(81,360,'glossary')]}
FIGURE_REGIONS={3:[(510,690)],4:[(95,263)],7:[(205,365)]}
CODE_REGIONS={7:[(515,610)]}

def extract_pt():
    doc=fitz.open(PDF_PATH); all_tables=tables(doc); inserted=set(); blocks=[
      {'kind':'subhead','text':'Políticas como pipeline executável de controle, proteção e mediação'},
      {'kind':'figure','src':f'{ASSET_ROOT}/pt/overview.svg','alt':'Pipeline programável de policies entre a entrada e a resposta do API Gateway','caption':'Figura de abertura - Policies transformam o gateway em um pipeline programável de controle e mediação.'},
      {'kind':'subhead','text':'Princípio central'},
      {'kind':'paragraph','text':'Uma policy é código de infraestrutura: ordem, dependências, efeitos colaterais e tratamento de falha determinam seu comportamento.'},
      {'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
    for pn in range(2,len(doc)+1):
      source=sorted((b for b in doc[pn-1].get_text('dict')['blocks'] if 'lines' in b),key=lambda b:(b['bbox'][1],b['bbox'][0]))
      for sb in source:
        text,size,bold=base.base.template.template.base.base.block_text(sb); y=sb['bbox'][1]
        if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+',text): continue
        if any(a<=y<=z for a,z in FIGURE_REGIONS.get(pn,[])):
          m=re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)',text)
          if m:
            n=int(m.group(1)); fn,alt=FIGURES[n]; blocks.append({'kind':'figure','src':f'{ASSET_ROOT}/pt/{fn}','alt':alt,'caption':text})
          continue
        hit=False
        for a,z,key in TABLE_REGIONS.get(pn,[]):
          if a<=y<=z:
            if key not in inserted: blocks.append(copy.deepcopy(all_tables[key])); inserted.add(key)
            hit=True; break
        if hit: continue
        if any(a<=y<=z for a,z in CODE_REGIONS.get(pn,[])):
          base.base.template.template.base.base.append_block(blocks,{'kind':'code','text':base.base.template.template.base.base.block_code(sb)}); continue
        if text.startswith(('•','●')):
          items=[base.base.template.template.base.base.clean_text(x) for x in re.split(r'[•●]',text) if base.base.template.template.base.base.clean_text(x)]
          if blocks and blocks[-1]['kind']=='list' and not blocks[-1]['ordered']: blocks[-1]['items'].extend(items)
          else: blocks.append({'kind':'list','ordered':False,'items':items})
        elif size>=14: blocks.append({'kind':'heading','level':2,'text':text,'id':base.base.template.template.base.base.slugify(text)})
        elif size>=9.8 and bold: blocks.append({'kind':'heading','level':3,'text':text})
        elif bold and size>=8.5: blocks.append({'kind':'subhead','text':text})
        else: base.base.template.template.base.base.append_block(blocks,{'kind':'paragraph','text':text})
    return blocks

PRESERVE=base.PRESERVE_TERMS|{'policy','policies','API Gateway','inbound','backend','outbound','on-error','short-circuit','context','fragment','scope','JWT','mTLS','API key','Basic Auth','OAuth 2.0','OpenID Connect','issuer','audience','claim','rate limiting','quota','throttling','spike arrest','cache','timeout','retry','circuit breaker','fallback','PDP','IdP','introspection','CI/CD','GitOps','canary','trace','span','OpenTelemetry','CORS','Problem Details','RFC 9457'}
REPL={'en':[('Policy policies','Policies'),('Api Gateway','API Gateway'),('Jwt','JWT')],'es':[('Puerta de enlace API','API Gateway'),('puerta de enlace API','API Gateway'),('política','policy'),('políticas','policies'),('Jwt','JWT')]}
def polish(v,loc):
    v=base.base.template.template.base.polish(v,loc)
    for a,b in REPL[loc]: v=v.replace(a,b)
    return v.replace('\u200b','').replace('\ufeff','')
def localize(src,loc,tr):
    out=copy.deepcopy(src)
    for i,b in enumerate(out):
      original=src[i]; k=b['kind']
      if k in {'heading','subhead','paragraph'}:
        b['text']=polish(tr[b['text']],loc)
        if k=='heading' and b.get('level')==2: b['id']=base.base.template.template.base.base.slugify(b['text'])
      elif k=='list': b['items']=[polish(tr[x],loc) for x in b['items']]
      elif k=='figure': b['alt']=polish(tr[b['alt']],loc); b['caption']=polish(tr[b['caption']],loc); b['src']=b['src'].replace('/pt/',f'/{loc}/')
      elif k=='code':
        if loc=='en': b['text']=b['text'].replace('Exemplo de resposta de erro padronizada','Standardized error response example').replace('Limite de requisições excedido','Request limit exceeded').replace('Tente novamente após o período indicado.','Try again after the indicated period.')
        else: b['text']=b['text'].replace('Exemplo de resposta de erro padronizada','Ejemplo de respuesta de error estandarizada').replace('Limite de requisições excedido','Límite de solicitudes excedido').replace('Tente novamente após o período indicado.','Inténtelo de nuevo después del período indicado.')
      elif k=='table':
        b['caption']=polish(tr[b['caption']],loc); b['headers']=[x if x in PRESERVE else polish(tr[x],loc) for x in original['headers']]; b['rows']=[[x if x in PRESERVE else polish(tr[x],loc) for x in r] for r in original['rows']]
    return out
def main():
    pt=extract_pt(); vals=base.base.template.template.base.base.translatable_values(pt); en=localize(pt,'en',base.base.template.template.base.base.translate_values(vals,'en')); es=localize(pt,'es',base.base.template.template.base.base.translate_values(vals,'es'))
    base.base.template.template.base.write_typescript(OUTPUTS['pt'],'GATEWAY_POLICIES_PT_BLOCKS',pt,'pt'); base.base.template.template.base.write_typescript(OUTPUTS['en'],'GATEWAY_POLICIES_EN_BLOCKS',en,'en'); base.base.template.template.base.write_typescript(OUTPUTS['es'],'GATEWAY_POLICIES_ES_BLOCKS',es,'es')
    print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table' for b in pt),'figures':sum(b['kind']=='figure' for b in pt),'codes':sum(b['kind']=='code' for b in pt)},ensure_ascii=False))
if __name__=='__main__': main()
