from __future__ import annotations
import copy,importlib.util,json,re,sys
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[1];PDF=Path(sys.argv[1])if len(sys.argv)>1 else Path(r'C:\Users\joaor\ferramentas\ARTIGOS\UtilyTools\FAAC\FAAC_Capitulo_33_Kubernetes_para_APIs.pdf')
spec=importlib.util.spec_from_file_location('c32',ROOT/'scripts/generate-chapter32-content.py');base=importlib.util.module_from_spec(spec);assert spec.loader;spec.loader.exec_module(base);CORE=base.CORE;UTIL=base.UTIL
OUT={'pt':ROOT/'src/app/learn/kubernetes-para-apis-pt/kubernetes-content.data.ts','en':ROOT/'src/app/learn/kubernetes-for-apis-en/kubernetes-content.data.ts','es':ROOT/'src/app/learn/kubernetes-para-apis-es/kubernetes-content.data.ts'};ASSET='/assets/learn/kubernetes-for-apis'
ALTS={1:'Control plane coordenando worker nodes e workloads',2:'Gateway e Route encaminhando tráfego por Service e EndpointSlices',3:'Probes de startup, readiness e liveness com responsabilidades distintas',4:'HPA, scheduler e capacidade de nós em um sistema acoplado',5:'Camadas de segurança protegendo workloads e segredos',6:'GitOps reconciliando estado desejado e estado observado',7:'Fluxo de troubleshooting desde objetos Kubernetes até a aplicação'}
def rows(d,p,i):return[[CORE.clean_table_cell(c)for c in r]for r in d[p-1].find_tables().tables[i].extract()]
def tbl(r,c):return{'kind':'table','caption':c,'headers':r[0],'rows':r[1:]}
CAP=['Tabela 1 - Containers no mesmo Pod compartilham destino operacional e ciclo de vida.','Tabela 2 - Service abstrai destinos, mas a implementação de rede continua relevante.','Tabela 3 - Requests e limits são parâmetros de engenharia, não valores decorativos.','Tabela 4 - Scheduling traduz requisitos de isolamento e disponibilidade em restrições.','Tabela 5 - Cada controle protege uma superfície diferente.','Tabela 6 - Diagnóstico confiável combina estado declarativo e telemetria de execução.','Tabela 7 - Estados conhecidos reduzem troubleshooting por tentativa e erro.','Tabela 8 - Vocabulário essencial do capítulo.']
TABLES={3:[(685,795,0)],4:[(600,710,1)],6:[(145,245,2)],7:[(570,675,3)],8:[(285,390,4)],9:[(135,235,5)],10:[(325,445,6)],11:[(450,745,7)]};FIG={3:[(300,520)],5:[(130,325)],6:[(400,575)],7:[(230,410)],8:[(100,295)],9:[(390,550)],10:[(170,335)]}
def extract():
 d=fitz.open(PDF);tabs=[tbl(rows(d,p,0),CAP[i])for i,p in enumerate([3,4,6,7,8,9,10,11])];seen=set();o=[{'kind':'subhead','text':'Kubernetes para APIs: reconciliar estado, tráfego e capacidade'},{'kind':'figure','src':f'{ASSET}/pt/overview.svg','alt':'Cluster Kubernetes executando APIs com roteamento, segurança e observabilidade','caption':'Figura de abertura - Kubernetes fornece reconciliação e abstrações operacionais; o caminho da API atravessa várias camadas.'},{'kind':'subhead','text':'Princípio central'},{'kind':'paragraph','text':'Kubernetes mantém estado desejado por reconciliação; confiabilidade depende da combinação correta de workloads, rede, capacidade, segurança e observabilidade.'},{'kind':'paragraph','text':'Edição aprofundada - material de estudo e consulta profissional'}]
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
PRESERVE=base.PRESERVE|{'Kubernetes','Pod','Pods','container','containers','control plane','worker node','worker nodes','kube-apiserver','etcd','scheduler','controller manager','kubelet','Deployment','StatefulSet','DaemonSet','Job','CronJob','ReplicaSet','Service','ClusterIP','NodePort','LoadBalancer','ExternalName','EndpointSlice','EndpointSlices','Ingress','Gateway API','Gateway','HTTPRoute','ConfigMap','Secret','requests','limits','QoS','Guaranteed','Burstable','BestEffort','startupProbe','readinessProbe','livenessProbe','HPA','VPA','Cluster Autoscaler','KEDA','scheduler','affinity','anti-affinity','taints','tolerations','topology spread','RBAC','ServiceAccount','NetworkPolicy','Pod Security Standards','Namespace','ResourceQuota','LimitRange','PersistentVolume','PersistentVolumeClaim','StorageClass','GitOps','Argo CD','Flux','Helm','Kustomize','image digest','SBOM','admission controller','service mesh','API Gateway','kubectl','CrashLoopBackOff','Pending','OOMKilled','ImagePullBackOff','Evicted','CNI','CSI','DNS','TLS','mTLS','OpenTelemetry','Prometheus'}
def polish(v,l):
 v=CORE.template.template.base.polish(v,l).replace('\u200b','').replace('\ufeff','')
 for a,z in({'en':{},'es':{'cápsula':'Pod','cápsulas':'Pods','vaina':'Pod','vainas':'Pods','racimo':'cluster','clúster':'cluster'}}[l]).items():v=v.replace(a,z)
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
 w(OUT['pt'],'KUBERNETES_PT_BLOCKS',pt,'pt');w(OUT['en'],'KUBERNETES_EN_BLOCKS',en,'en');w(OUT['es'],'KUBERNETES_ES_BLOCKS',es,'es');print(json.dumps({'blocks':len(pt),'values':len(v),'h2':sum(x.get('level')==2 for x in pt),'tables':sum(x['kind']=='table'for x in pt),'figures':sum(x['kind']=='figure'for x in pt)},ensure_ascii=False))
if __name__=='__main__':main()
