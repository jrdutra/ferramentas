from __future__ import annotations
import copy, importlib.util, json, re, sys
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[1]
PDF_PATH=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_24_Azure_API_Management_APIM.pdf')
spec=importlib.util.spec_from_file_location('c23',ROOT/'scripts/generate-chapter23-content.py'); base=importlib.util.module_from_spec(spec); assert spec.loader; spec.loader.exec_module(base)
OUTPUTS={'pt':ROOT/'src/app/learn/azure-api-management-apim-pt/azure-apim-content.data.ts','en':ROOT/'src/app/learn/azure-api-management-apim-en/azure-apim-content.data.ts','es':ROOT/'src/app/learn/azure-api-management-apim-es/azure-apim-content.data.ts'}
ASSET='/assets/learn/azure-api-management-apim'
FIGURES={1:('figure-01-logical-architecture.svg','Consumidores, gateway, backends, management plane e developer portal no Azure API Management'),2:('figure-02-policy-pipeline.svg','Pipeline inbound, backend, outbound e on-error do APIM'),3:('figure-03-private-network.svg','Entrada privada no APIM e acesso privado aos backends'),4:('figure-04-availability.svg','Scale units, availability zones, multi-region e self-hosted gateway')}

def rs(d,p,i): return [[base.base.base.base.clean_table_cell(c) for c in r] for r in d[p-1].find_tables().tables[i].extract()]
def tab(d,p,i,cap):
 r=rs(d,p,i); return {'kind':'table','caption':cap,'headers':r[0],'rows':r[1:]}
def tables(d): return {
 'components':tab(d,3,0,'Tabela 1 - Componentes devem ser monitorados e protegidos conforme sua função.'),
 'gateways':tab(d,4,0,'Tabela 2 - O tipo de gateway muda o modelo operacional e de responsabilidade.'),
 'resources':tab(d,4,1,'Tabela 3 - Recursos administrativos possuem responsabilidades distintas.'),
 'scopes':tab(d,6,0,'Tabela 4 - Escopo define alcance e risco de uma mudança de policy.'),
 'identity':tab(d,6,1,'Tabela 5 - Os mecanismos podem ser combinados; eles resolvem problemas diferentes.'),
 'network':tab(d,7,0,'Tabela 6 - Diagnóstico de rede precisa observar o ponto real de execução.'),
 'resilience':tab(d,8,0,'Tabela 7 - Resiliência precisa considerar semântica e comportamento em falha.'),
 'workspaces':tab(d,9,0,'Tabela 8 - Federação exige responsabilidades explícitas.'),
 'signals':tab(d,9,1,'Tabela 9 - Cada fonte de telemetria responde a uma camada diferente.'),
 'glossary':tab(d,12,0,'Tabela 10 - Vocabulário essencial do capítulo.')}

TABLES={3:[(427,545,'components')],4:[(267,370,'gateways'),(539,674,'resources')],6:[(144,263,'scopes'),(642,810,'identity')],7:[(705,810,'network')],8:[(57,77,'network'),(658,810,'resilience')],9:[(218,321,'workspaces'),(670,810,'signals')],12:[(81,392,'glossary')]}
FIGS={3:[(238,422)],5:[(385,543)],7:[(522,704)],8:[(282,449)]}
CODE={5:[(114,211),(548,713)],7:[(225,327)],10:[(172,379)]}

def extract():
 d=fitz.open(PDF_PATH); ts=tables(d); seen=set(); out=[
  {'kind':'subhead','text':'Da publicação no Azure ao enforcement distribuído no gateway'},
  {'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Management plane, managed gateway, developer portal, self-hosted gateway e observabilidade no APIM','caption':'Figura de abertura - O APIM reúne plano de gerenciamento, gateways e experiência de consumo sob uma plataforma única.'},
  {'kind':'subhead','text':'Princípio central'},
  {'kind':'paragraph','text':'APIM separa governança, publicação e operação do tráfego, mas cada decisão de tier e rede muda capacidades e limites.'},
  {'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
 for pn in range(2,len(d)+1):
  for sb in sorted((b for b in d[pn-1].get_text('dict')['blocks'] if 'lines'in b),key=lambda b:(b['bbox'][1],b['bbox'][0])):
   text,size,bold=base.base.base.base.template.template.base.base.block_text(sb); y=sb['bbox'][1]
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
    raw=base.base.base.base.template.template.base.base.block_code(sb)
    marker='Exemplo conceitual - API Management as code'
    if marker in raw and not raw.startswith(marker):
     prose,raw=raw.split(marker,1); base.base.base.base.template.template.base.base.append_block(out,{'kind':'paragraph','text':base.base.base.base.template.template.base.base.clean_text(prose)}); raw=marker+raw
    base.base.base.base.template.template.base.base.append_block(out,{'kind':'code','text':raw}); continue
   if text.startswith(('•','●')):
    items=[base.base.base.base.template.template.base.base.clean_text(x) for x in re.split(r'[•●]',text) if base.base.base.base.template.template.base.base.clean_text(x)]
    if out and out[-1]['kind']=='list' and not out[-1]['ordered']: out[-1]['items'].extend(items)
    else: out.append({'kind':'list','ordered':False,'items':items})
   elif size>=14: out.append({'kind':'heading','level':2,'text':text,'id':base.base.base.base.template.template.base.base.slugify(text)})
   elif size>=9.8 and bold: out.append({'kind':'heading','level':3,'text':text})
   elif bold and size>=8.4: out.append({'kind':'subhead','text':text})
   else: base.base.base.base.template.template.base.base.append_block(out,{'kind':'paragraph','text':text})
 return out

PRESERVE=base.PRESERVE|{'Azure','Azure API Management','APIM','Azure portal','Azure Resource Manager','ARM','Bicep','Terraform','PowerShell','CLI','REST','Managed gateway','Self-hosted gateway','Workspace gateway','Developer portal','Consumption','Developer','Basic','Standard','Premium','VNet','Private Link','private endpoint','Key Vault','Microsoft Entra ID','Azure Monitor','Application Insights','OpenAPI','WSDL','OData','WebSocket','GraphQL','gRPC','API','operation','backend','product','subscription','user','group','named value','policy','policies','inbound','outbound','on-error','base','set-backend-service','validate-jwt','rate-limit-by-key','rewrite-uri','set-header','cache','retry','circuit breaker','managed identity','mTLS','TLS','CORS','XML','JSON','CI/CD','GitOps','SLA','DNS','RBAC','Kubernetes','OpenShift','SaaS'}
REPL={'en':[('Api Management','API Management'),('Api','API')],'es':[('Administración de API de Azure','Azure API Management'),('Gestión de API de Azure','Azure API Management'),('puerta de enlace administrada','managed gateway'),('puerta de enlace autohospedada','self-hosted gateway'),('portal de desarrolladores','developer portal')]}
def polish(v,l):
 v=base.base.base.base.template.template.base.polish(v,l)
 for a,b in REPL[l]: v=v.replace(a,b)
 return v.replace('\u200b','').replace('\ufeff','')
def loc(src,l,tr):
 o=copy.deepcopy(src)
 for i,b in enumerate(o):
  q=src[i]; k=b['kind']
  if k in {'heading','subhead','paragraph'}:
   b['text']=polish(tr[b['text']],l)
   if k=='heading' and b.get('level')==2: b['id']=base.base.base.base.template.template.base.base.slugify(b['text'])
  elif k=='list': b['items']=[polish(tr[x],l) for x in b['items']]
  elif k=='figure': b['alt']=polish(tr[b['alt']],l); b['caption']=polish(tr[b['caption']],l); b['src']=b['src'].replace('/pt/',f'/{l}/')
  elif k=='code':
   maps={
    'en':{'# Fluxo conceitual de publicação':'# Conceptual publishing flow','Contrato validado':'Validated contract','importação ou atualização da API':'API import or update','configuração de backend e named values':'backend and named values configuration','aplicação de policies por escopo':'policy application by scope','associação a product':'product association','testes no gateway':'gateway tests','publicação no developer portal':'publishing to the developer portal','observabilidade e rollout':'observability and rollout','Exemplo simplificado - policy XML':'Simplified example - policy XML','Validação simplificada de certificado de cliente':'Simplified client certificate validation','Drift entre portal e repositório é um risco. Azure Policy, RBAC, locks e pipelines ajudam a reduzir mudanças não rastreadas. Quando\numa correção emergencial é feita manualmente, ela precisa ser reconciliada com o código imediatamente.':'Drift between the portal and repository is a risk. Azure Policy, RBAC, locks, and pipelines help reduce untracked changes. When\nan emergency correction is made manually, it must be reconciled with the code immediately.','Exemplo conceitual - API Management as code':'Conceptual example - API Management as code','# Estrutura sugerida de repositório':'# Suggested repository structure','clientes/openapi.yaml':'customers/openapi.yaml','clientes/policies/':'customers/policies/'},
    'es':{'# Fluxo conceitual de publicação':'# Flujo conceptual de publicación','Contrato validado':'Contrato validado','importação ou atualização da API':'importación o actualización de la API','configuração de backend e named values':'configuración de backend y named values','aplicação de policies por escopo':'aplicación de policies por ámbito','associação a product':'asociación a product','testes no gateway':'pruebas en el gateway','publicação no developer portal':'publicación en el developer portal','observabilidade e rollout':'observabilidad y rollout','Exemplo simplificado - policy XML':'Ejemplo simplificado - policy XML','Validação simplificada de certificado de cliente':'Validación simplificada del certificado de cliente','Drift entre portal e repositório é um risco. Azure Policy, RBAC, locks e pipelines ajudam a reduzir mudanças não rastreadas. Quando\numa correção emergencial é feita manualmente, ela precisa ser reconciliada com o código imediatamente.':'El drift entre el portal y el repositorio es un riesgo. Azure Policy, RBAC, locks y pipelines ayudan a reducir los cambios no rastreados. Cuando\nse realiza manualmente una corrección de emergencia, debe reconciliarse inmediatamente con el código.','Exemplo conceitual - API Management as code':'Ejemplo conceptual - API Management as code','# Estrutura sugerida de repositório':'# Estructura de repositorio sugerida'} }
   for a,z in maps[l].items(): b['text']=b['text'].replace(a,z)
  elif k=='table': b['caption']=polish(tr[b['caption']],l); b['headers']=[x if x in PRESERVE else polish(tr[x],l) for x in q['headers']]; b['rows']=[[x if x in PRESERVE else polish(tr[x],l) for x in r] for r in q['rows']]
 return o
def main():
 pt=extract(); vals=base.base.base.base.template.template.base.base.translatable_values(pt); en=loc(pt,'en',base.base.base.base.template.template.base.base.translate_values(vals,'en')); es=loc(pt,'es',base.base.base.base.template.template.base.base.translate_values(vals,'es')); w=base.base.base.base.template.template.base.write_typescript
 w(OUTPUTS['pt'],'AZURE_APIM_PT_BLOCKS',pt,'pt'); w(OUTPUTS['en'],'AZURE_APIM_EN_BLOCKS',en,'en'); w(OUTPUTS['es'],'AZURE_APIM_ES_BLOCKS',es,'es'); print(json.dumps({'blocks':len(pt),'values':len(vals),'h2':sum(b.get('level')==2 for b in pt),'tables':sum(b['kind']=='table' for b in pt),'figures':sum(b['kind']=='figure' for b in pt),'codes':sum(b['kind']=='code' for b in pt)},ensure_ascii=False))
if __name__=='__main__': main()
