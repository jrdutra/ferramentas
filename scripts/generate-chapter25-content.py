from __future__ import annotations
import copy, importlib.util, json, re, sys
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[1]
PDF_PATH=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_25_Seguranca_de_APIs_OWASP_API_Security_Top_10.pdf')
spec=importlib.util.spec_from_file_location('c24',ROOT/'scripts/generate-chapter24-content.py'); base=importlib.util.module_from_spec(spec); assert spec.loader; spec.loader.exec_module(base)
OUTPUTS={'pt':ROOT/'src/app/learn/seguranca-apis-owasp-top-10-pt/owasp-api-security-content.data.ts','en':ROOT/'src/app/learn/api-security-owasp-top-10-en/owasp-api-security-content.data.ts','es':ROOT/'src/app/learn/seguridad-apis-owasp-top-10-es/owasp-api-security-content.data.ts'}
ASSET='/assets/learn/api-security-owasp-top-10'
FIGURES={1:('figure-01-defense-in-depth.svg','Consumidor, WAF, API Gateway, backend e dados como camadas de defesa em profundidade'),2:('figure-02-bola.svg','Usuário autenticado tentando acessar objeto pertencente a outro cliente'),3:('figure-03-api-lifecycle.svg','Segurança acompanhando design, build, deploy, run e retire no ciclo da API')}

def rs(d,p,i): return [[base.base.base.base.base.clean_table_cell(c) for c in r] for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,cap):
 r=rs(d,p,i); return {'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]}
def joined(d,a,b,cap):
 r=rs(d,*a); s=rs(d,*b); return {'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]+s[1:]}
def tables(d): return {
 'layers':tab(d,3,0,'Tabela 1 - Cada camada protege um conjunto diferente de decisões.'),
 'auth':tab(d,4,0,'Tabela 2 - Autenticação segura depende do protocolo e de sua operação completa.'),
 'resources':joined(d,(4,1),(5,0),'Tabela 3 - Consumo precisa ser medido pelo custo real da operação.'),
 'authorization':tab(d,5,1,'Tabela 4 - Os três níveis de autorização devem ser testados separadamente.'),
 'configuration':tab(d,6,0,'Tabela 5 - Configuração efetiva deve ser verificada, não apenas o arquivo pretendido.'),
 'dependencies':joined(d,(6,1),(7,0),'Tabela 6 - Dependências devem ser tratadas como fronteiras de confiança.'),
 'defense':tab(d,7,1,'Tabela 7 - O gateway é importante, mas não substitui segurança da aplicação.'),
 'glossary':tab(d,9,0,'Tabela 8 - Vocabulário essencial do capítulo.')}

TABLES={3:[(264,366,'layers')],4:[(217,319,'auth'),(756,810,'resources')],5:[(57,143,'resources'),(277,363,'authorization')],6:[(206,308,'configuration'),(740,810,'dependencies')],7:[(57,127,'dependencies'),(272,390,'defense')],9:[(81,342,'glossary')]}
FIGS={3:[(135,264),(485,680)],6:[(430,606)]}
CODE={3:[(700,780)],4:[(486,548)],5:[(718,790)]}

def extract():
 d=fitz.open(PDF_PATH); ts=tables(d); seen=set(); out=[
  {'kind':'subhead','text':'OWASP API Security Top 10: riscos conectados ao ciclo completo da API'},
  {'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Dez riscos do OWASP API Security Top 10 conectados ao ciclo de vida da API','caption':'Figura de abertura - Os dez riscos representam classes de falhas que atravessam design, implementação, gateway e operação.'},
  {'kind':'subhead','text':'Princípio central'},
  {'kind':'paragraph','text':'O gateway reduz exposição, mas a autorização e a lógica segura precisam existir em todas as camadas.'},
  {'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  for sb in sorted((b for b in d[pn-1].get_text('dict')['blocks'] if 'lines'in b),key=lambda b:(b['bbox'][1],b['bbox'][0])):
   text,size,bold=base.base.base.base.base.template.template.base.base.block_text(sb); y=sb['bbox'][1]
   if not text or text.startswith('FAAC - Fundamentos') or re.fullmatch(r'Página\s+\d+',text): continue
   if any(a<=y<=z for a,z in FIGS.get(pn,[])):
    m=re.fullmatch(r'Figura\s+(\d+)\s+-\s+(.+)',text)
    if m:
     n=int(m.group(1)); fn,alt=FIGURES[n]; out.append({'kind':'figure','src':f'{ASSET}/pt/{fn}','alt':alt,'caption':text})
    continue
   hit=False
   for a,z,k in TABLES.get(pn,[]):
    if a<=y<=z:
     if k not in seen: out.append(copy.deepcopy(ts[k])); seen.add(k)
     hit=True; break
   if hit: continue
   if any(a<=y<=z for a,z in CODE.get(pn,[])):
    base.base.base.base.base.template.template.base.base.append_block(out,{'kind':'code','text':base.base.base.base.base.template.template.base.base.block_code(sb)}); continue
   if text.startswith(('•','●')):
    items=[base.base.base.base.base.template.template.base.base.clean_text(x) for x in re.split(r'[•●]',text) if base.base.base.base.base.template.template.base.base.clean_text(x)]
    if out and out[-1]['kind']=='list' and not out[-1]['ordered']: out[-1]['items'].extend(items)
    else: out.append({'kind':'list','ordered':False,'items':items})
   elif size>=14: out.append({'kind':'heading','level':2,'text':text,'id':base.base.base.base.base.template.template.base.base.slugify(text)})
   elif size>=9.8 and bold: out.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.3: out.append({'kind':'subhead','text':text})
   else: base.base.base.base.base.template.template.base.base.append_block(out,{'kind':'paragraph','text':text})
 return out

PRESERVE=base.PRESERVE|{'OWASP','OWASP API Security Top 10','API1','API2','API3','API4','API5','API6','API7','API8','API9','API10','BOLA','BFLA','BOPLA','SSRF','Broken Object Level Authorization','Broken Authentication','Broken Object Property Level Authorization','Unrestricted Resource Consumption','Broken Function Level Authorization','Unrestricted Access to Sensitive Business Flows','Server Side Request Forgery','Security Misconfiguration','Improper Inventory Management','Unsafe Consumption of APIs','API Gateway','WAF','backend','subject','tenant','ownership','JWT','OAuth 2.0','OpenID Connect','MFA','PKCE','issuer','audience','access token','ID Token','refresh token','credential stuffing','rate limiting','quota','throttling','GraphQL','bulkhead','backpressure','circuit breaker','allowlist','denylist','OpenAPI','CI/CD','SAST','DAST','IAST','SBOM','SIEM','SOAR','mTLS','TLS','DNS','HTTP','CORS','CSP','HSTS','SSO','RBAC','ABAC','Zero Trust','Open Finance'}
REPL={'en':[('Api Gateway','API Gateway'),('Owasp','OWASP')],'es':[('Puerta de enlace API','API Gateway'),('puerta de enlace API','API Gateway'),('Owasp','OWASP')]}
def polish(v,l):
 v=base.base.base.base.base.template.template.base.polish(v,l)
 for a,b in REPL[l]: v=v.replace(a,b)
 return v.replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i]; k=b['kind']
  if k in {'heading','subhead','paragraph'}:
   b['text']=polish(tr[b['text']],l)
   if k=='heading' and b.get('level')==2: b['id']=base.base.base.base.base.template.template.base.base.slugify(b['text'])
  elif k=='list': b['items']=[polish(tr[x],l) for x in b['items']]
  elif k=='figure': b['alt']=polish(tr[b['alt']],l); b['caption']=polish(tr[b['caption']],l); b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={'en':{'Padrão vulnerável':'Vulnerable pattern','Padrão defensivo':'Defensive pattern','conta':'account','repositorio':'repository','buscarPorIdETitular':'findByIdAndOwner','buscarPorId':'findById','idDaRequisicao':'requestId','subjectDoToken':'tokenSubject','negarAcesso':'denyAccess','Cliente Exemplo':'Example Customer','"nome"':'"name"','"limiteAprovado"':'"approvedLimit"','/importar-documento':'/import-document','A entrada parece uma URL, mas o destino alcançado pelo servidor':'The input looks like a URL, but the destination reached by the server','pode expor serviços internos ou credenciais de infraestrutura.':'may expose internal services or infrastructure credentials.'},'es':{'Padrão vulnerável':'Patrón vulnerable','Padrão defensivo':'Patrón defensivo','conta':'cuenta','buscarPorIdETitular':'buscarPorIdYTitular','idDaRequisicao':'idDeSolicitud','subjectDoToken':'subjectDelToken','negarAcesso':'denegarAcceso','Cliente Exemplo':'Cliente de Ejemplo','"nome"':'"nombre"','"limiteAprovado"':'"limiteAprobado"','A entrada parece uma URL, mas o destino alcançado pelo servidor':'La entrada parece una URL, pero el destino alcanzado por el servidor','pode expor serviços internos ou credenciais de infraestrutura.':'puede exponer servicios internos o credenciales de infraestructura.'}}
   for a,z in maps[l].items(): b['text']=b['text'].replace(a,z)
  elif k=='table': b['caption']=polish(tr[b['caption']],l); b['headers']=[x if x in PRESERVE else polish(tr[x],l) for x in q['headers']]; b['rows']=[[x if x in PRESERVE else polish(tr[x],l) for x in r] for r in q['rows']]
 return o
def main():
 pt=extract(); vals=base.base.base.base.base.template.template.base.base.translatable_values(pt); en=loc(pt,'en',base.base.base.base.base.template.template.base.base.translate_values(vals,'en')); es=loc(pt,'es',base.base.base.base.base.template.template.base.base.translate_values(vals,'es')); w=base.base.base.base.base.template.template.base.write_typescript
 w(OUTPUTS['pt'],'OWASP_API_SECURITY_PT_BLOCKS',pt,'pt'); w(OUTPUTS['en'],'OWASP_API_SECURITY_EN_BLOCKS',en,'en'); w(OUTPUTS['es'],'OWASP_API_SECURITY_ES_BLOCKS',es,'es'); print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table' for b in pt),'figures':sum(b['kind']=='figure' for b in pt),'codes':sum(b['kind']=='code' for b in pt)},ensure_ascii=False))
if __name__=='__main__': main()
