from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF_PATH=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_26_CORS_CSP_HSTS_e_Outros_Cabecalhos_HTTP.pdf')
spec=importlib.util.spec_from_file_location('c25',ROOT/'scripts/generate-chapter25-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.base.base.base.base.base;UTIL=CORE.template.template.base.base
OUTPUTS={'pt':ROOT/'src/app/learn/cors-csp-hsts-cabecalhos-http-pt/http-security-headers-content.data.ts','en':ROOT/'src/app/learn/cors-csp-hsts-http-headers-en/http-security-headers-content.data.ts','es':ROOT/'src/app/learn/cors-csp-hsts-encabezados-http-es/http-security-headers-content.data.ts'};ASSET='/assets/learn/http-security-headers'
FIGURES={1:('figure-01-cors-preflight.svg','Navegador negociando preflight OPTIONS com API antes da requisição real'),2:('figure-02-csp-resources.svg','Documento HTML usando diretivas CSP para controlar scripts, frames e conexões'),3:('figure-03-hsts.svg','Navegador aprendendo HSTS e promovendo HTTP para HTTPS')}
def rs(d,p,i):return [[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,cap):r=rs(d,p,i);return{'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]}
def tables(d):return{
'origins':tab(d,3,0,'Tabela 1 - A origem é determinada por esquema, host e porta, não pelo caminho.'),'cors':tab(d,5,0,'Tabela 2 - O conjunto CORS forma um protocolo de negociação, não um header isolado.'),'errors':tab(d,6,0,'Tabela 3 - Erros de CORS são frequentemente erros de arquitetura e não apenas de sintaxe.'),'nonces':tab(d,7,0,'Tabela 4 - Nonces e hashes permitem reduzir dependência de unsafe-inline.'),'frames':tab(d,8,0,'Tabela 5 - Proteção de frame e tipo de conteúdo são responsabilidades diferentes.'),'cross':tab(d,9,0,'Tabela 6 - Políticas cross-origin se complementam, mas protegem fronteiras distintas.'),'cache':tab(d,10,0,'Tabela 7 - Cache e cookies exigem precisão semântica; nomes intuitivos podem enganar.'),'obsolete':tab(d,10,1,'Tabela 8 - Segurança exige remover controles obsoletos, não apenas adicionar novos headers.'),'diagnosis':tab(d,11,0,'Tabela 9 - O diagnóstico deve identificar qual agente aplicou a política.'),'glossary':tab(d,12,0,'Tabela 10 - Vocabulário essencial do capítulo.')}
TABLES={3:[(458,560,'origins')],5:[(145,299,'cors')],6:[(219,348,'errors')],7:[(219,323,'nonces')],8:[(600,705,'frames')],9:[(372,480,'cross')],10:[(344,481,'cache'),(629,750,'obsolete')],11:[(429,550,'diagnosis')],12:[(423,708,'glossary')]}
FIGS={4:[(235,400)],6:[(535,690)],8:[(220,350)]};CODE={4:[(580,700)],6:[(705,795)],8:[(365,430)],9:[(155,215)],10:[(280,340)]}
def extract():
 d=fitz.open(PDF_PATH);ts=tables(d);seen=set();out=[{'kind':'subhead','text':'Cabeçalhos como políticas declarativas entre servidor, gateway e navegador'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'CORS, CSP, HSTS e outros cabeçalhos como camadas declarativas de proteção','caption':'Figura de abertura - Os cabeçalhos formam uma camada declarativa de proteção, mas atuam sobre problemas diferentes.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Cabeçalhos não corrigem lógica de autorização, autenticação ou negócio; eles governam comportamento de clientes e intermediários.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'CORS','CSP','HSTS','HTTP','HTTPS','Same-Origin Policy','SOP','origin','site','scheme','host','port','preflight','OPTIONS','Origin','Access-Control-Request-Method','Access-Control-Request-Headers','Access-Control-Allow-Origin','Access-Control-Allow-Methods','Access-Control-Allow-Headers','Access-Control-Allow-Credentials','Access-Control-Expose-Headers','Access-Control-Max-Age','Vary','Authorization','cookie','SameSite','Content Security Policy','Content-Security-Policy','nonce','hash','strict-dynamic','unsafe-inline','default-src','script-src','style-src','img-src','connect-src','frame-ancestors','report-uri','report-to','Report-Only','Strict-Transport-Security','max-age','includeSubDomains','preload','X-Frame-Options','X-Content-Type-Options','nosniff','Content-Type','Referrer-Policy','Permissions-Policy','COOP','COEP','CORP','Cross-Origin-Opener-Policy','Cross-Origin-Embedder-Policy','Cross-Origin-Resource-Policy','Cache-Control','Clear-Site-Data','Set-Cookie','Secure','HttpOnly','X-XSS-Protection','Public-Key-Pins','Expect-CT','Feature-Policy','X-Powered-By','CDN','API Gateway'}
def polish(v,l):return CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i];k=b['kind']
  if k in{'heading','subhead','paragraph'}:
   b['text']=polish(tr[b['text']],l)
   if k=='heading'and b.get('level')==2:b['id']=UTIL.slugify(b['text'])
  elif k=='list':b['items']=[polish(tr[x],l)for x in b['items']]
  elif k=='figure':b['alt']=polish(tr[b['alt']],l);b['caption']=polish(tr[b['caption']],l);b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'Exemplo mais restritivo':'More restrictive example','Implantação gradual possível':'Possible gradual deployment','Conteúdo público versionado':'Versioned public content','valor':'value'},'es':{'Exemplo mais restritivo':'Ejemplo más restrictivo','Implantação gradual possível':'Posible despliegue gradual','Conteúdo público versionado':'Contenido público versionado','valor':'valor'}}
   for a,z in maps[l].items():b['text']=b['text'].replace(a,z)
  elif k=='table':b['caption']=polish(tr[b['caption']],l);b['headers']=[x if x in PRESERVE else polish(tr[x],l)for x in q['headers']];b['rows']=[[x if x in PRESERVE else polish(tr[x],l)for x in r]for r in q['rows']]
 return o
def main():
 pt=extract();vals=UTIL.translatable_values(pt);en=loc(pt,'en',UTIL.translate_values(vals,'en'));es=loc(pt,'es',UTIL.translate_values(vals,'es'));w=CORE.template.template.base.write_typescript
 w(OUTPUTS['pt'],'HTTP_SECURITY_HEADERS_PT_BLOCKS',pt,'pt');w(OUTPUTS['en'],'HTTP_SECURITY_HEADERS_EN_BLOCKS',en,'en');w(OUTPUTS['es'],'HTTP_SECURITY_HEADERS_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table'for b in pt),'figures':sum(b['kind']=='figure'for b in pt),'codes':sum(b['kind']=='code'for b in pt)},ensure_ascii=False))
if __name__=='__main__':main()
