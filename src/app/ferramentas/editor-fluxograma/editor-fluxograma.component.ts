import { CommonModule } from '@angular/common';
import { PDFDocument } from 'pdf-lib';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';
import { DetectedFlowchart, FlowchartImageImportProgress } from '../../models/detected-flowchart.model';
import {
  ConexaoFluxograma,
  Fluxograma,
  FluxogramaService,
  FormaTipo,
  NoFluxograma,
  TAMANHO_SETA_PADRAO,
  TipoTraco,
} from '../../services/fluxograma.service';
import { FluxogramaImagemImportService } from '../../services/fluxograma-imagem-import/fluxograma-imagem-import.service';

type Ferramenta = 'selecionar' | 'conectar' | FormaTipo;
type Formato = 'mermaid' | 'xml';

interface OpcaoForma {
  tipo: FormaTipo;
  nome: string;
  icone: string;
}

interface BackupTema {
  nos: Map<string, { f: string; b: string; t: string }>;
  con: Map<string, string>;
  padrao: { corFundo: string; corBorda: string; corTexto: string; corLinha: string };
}

interface RetanguloCanvas {
  x: number;
  y: number;
  largura: number;
  altura: number;
}

interface EditorTextoInline {
  tipo: 'no' | 'conexao';
  id: string;
  texto: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-editor-fluxograma',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './editor-fluxograma.component.html',
  styleUrl: './editor-fluxograma.component.css',
})
export class EditorFluxogramaComponent implements OnInit {

  @ViewChild('svgCanvas') svgCanvas?: ElementRef<SVGSVGElement>;
  @ViewChild('editorTextoInline') editorTextoInlineEl?: ElementRef<HTMLTextAreaElement>;

  readonly formas: OpcaoForma[] = [
    { tipo: 'retangulo', nome: 'Processo', icone: 'crop_16_9' },
    { tipo: 'arredondado', nome: 'Arredondado', icone: 'rounded_corner' },
    { tipo: 'terminador', nome: 'Início/Fim', icone: 'stadium' },
    { tipo: 'losango', nome: 'Decisão', icone: 'change_history' },
    { tipo: 'circulo', nome: 'Círculo', icone: 'circle' },
    { tipo: 'elipse', nome: 'Elipse', icone: 'lens_blur' },
    { tipo: 'paralelogramo', nome: 'Entrada/Saída', icone: 'polyline' },
    { tipo: 'hexagono', nome: 'Preparação', icone: 'hexagon' },
    { tipo: 'cilindro', nome: 'Dados', icone: 'storage' },
  ];

  readonly containers: OpcaoForma[] = [
    { tipo: 'subprocesso', nome: 'Subprocesso', icone: 'dynamic_feed' },
    { tipo: 'container', nome: 'Contêiner', icone: 'space_dashboard' },
    { tipo: 'frame', nome: 'Moldura', icone: 'crop_free' },
    { tipo: 'grupo', nome: 'Grupo', icone: 'workspaces' },
    { tipo: 'swimlane', nome: 'Raia', icone: 'view_week' },
  ];

  readonly emojis: string[] = [
    '😀', '😄', '😁', '😆', '😅', '😂', '🙂', '😉', '😊', '😍', '😎', '🤔',
    '😐', '😴', '😮', '😢', '😭', '😡', '🤯', '🥳', '😱', '🤩', '😇', '🤨',
    '🙃', '😬', '😌', '🤗', '🧐', '😳', '🥶', '🤢',
    '🧍', '🚶', '🏃', '🕴️', '💁', '🙋', '🙆', '🙅', '🤷', '🤦',
    '🧑‍💻', '👨‍💻', '👩‍💻', '👷', '🧑‍🏫', '🧑‍💼', '🧑‍🔧', '🦸', '🦹', '🧙', '🧑‍🚀', '🧑‍🍳',
  ];

  // Catálogo de ícones por categoria. Crachás de texto nas cores das marcas
  // (não são os logotipos oficiais). A abreviação e a cor são geradas por nome.
  readonly catalogoIcones: { categoria: string; nomes: string[] }[] = [
    { categoria: 'Diversos', nomes: ['Computador', 'Celular', 'Servidor', 'Banco de Dados', 'Nuvem', 'Casa', 'Chave', 'Cadeado', 'Token', 'Certificado', 'Usuário', 'Rede', 'API', 'Webhook', 'Fila', 'Arquivo', 'Pasta', 'JSON', 'YAML', 'XML', 'JWT', 'JWE', 'JWK', 'JWS', 'OAuth', 'Timer'] },
    { categoria: 'Linguagens', nomes: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Go', 'Rust', 'C++', 'C', 'Kotlin', 'PHP', 'Swift', 'Dart', 'Scala', 'Ruby', 'Julia', 'R', 'Bash', 'Node.js'] },
    { categoria: 'Empresas', nomes: ['Apple', 'Microsoft', 'Google', 'Amazon', 'Meta', 'NVIDIA', 'OpenAI', 'Oracle', 'IBM', 'Intel', 'AMD', 'Cisco', 'Adobe', 'Salesforce', 'SAP', 'Samsung', 'Sony', 'Dell', 'Lenovo', 'Tencent'] },
    { categoria: 'Gateways de API', nomes: ['Apigee', 'Azure API Management', 'AWS API Gateway', 'Kong', 'NGINX', 'Traefik', 'Gravitee', 'WSO2', 'Axway', 'IBM API Connect', 'Oracle API', 'Red Hat', 'Tyk', 'MuleSoft', 'Broadcom', 'Solo.io', 'Envoy Proxy', 'Apache APISIX', 'Express Gateway', 'KrakenD', 'Zuplo', 'Akamai', 'Cloudflare', 'Boomi', 'Software AG', 'Gloo Gateway'] },
    { categoria: 'Front-end', nomes: ['React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Remix', 'Astro', 'Tailwind CSS', 'Bootstrap'] },
    { categoria: 'Back-end', nomes: ['Spring Boot', 'ASP.NET Core', 'Node.js', 'Express.js', 'NestJS', 'Django', 'FastAPI', 'Flask', 'Laravel', 'Ruby on Rails', 'Quarkus', 'Micronaut'] },
    { categoria: 'Mobile', nomes: ['Flutter', 'React Native', 'Android SDK', 'Jetpack Compose', 'SwiftUI', '.NET MAUI', 'Ionic'] },
    { categoria: 'Desktop', nomes: ['Electron', 'Qt', 'JavaFX', 'WPF', 'Avalonia', 'GTK'] },
    { categoria: 'Inteligência Artificial', nomes: ['TensorFlow', 'PyTorch', 'Keras', 'Hugging Face', 'LangChain', 'LlamaIndex', 'MLflow', 'ONNX', 'OpenCV', 'Scikit-learn', 'XGBoost'] },
    { categoria: 'Ciência de Dados', nomes: ['Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Plotly', 'Seaborn', 'Apache Spark', 'Apache Hadoop', 'Jupyter', 'Polars'] },
    { categoria: 'Banco de Dados', nomes: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle Database', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch', 'Neo4j', 'SQLite', 'MariaDB'] },
    { categoria: 'ORM', nomes: ['Hibernate', 'Entity Framework', 'Prisma', 'Sequelize', 'TypeORM', 'SQLAlchemy', 'JPA', 'Doctrine'] },
    { categoria: 'APIs', nomes: ['OpenAPI', 'GraphQL', 'gRPC', 'Postman', 'Insomnia', 'SoapUI', 'AsyncAPI'] },
    { categoria: 'Mensageria', nomes: ['Apache Kafka', 'RabbitMQ', 'ActiveMQ', 'Apache Pulsar', 'IBM MQ', 'Amazon SQS', 'Google Pub/Sub', 'Azure Service Bus', 'NATS'] },
    { categoria: 'Containers', nomes: ['Docker', 'Podman', 'containerd', 'Buildah'] },
    { categoria: 'Orquestração', nomes: ['Kubernetes', 'OpenShift', 'Docker Swarm', 'Nomad', 'Rancher'] },
    { categoria: 'DevOps / CI-CD', nomes: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD', 'Azure DevOps', 'Bamboo', 'TeamCity', 'CircleCI', 'ArgoCD', 'FluxCD', 'Tekton'] },
    { categoria: 'Cloud', nomes: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle Cloud', 'IBM Cloud', 'DigitalOcean', 'Cloudflare'] },
    { categoria: 'Infra como Código', nomes: ['Terraform', 'OpenTofu', 'Ansible', 'Puppet', 'Chef', 'SaltStack', 'Pulumi'] },
    { categoria: 'Monitoramento', nomes: ['Dynatrace', 'Prometheus', 'Grafana', 'Datadog', 'New Relic', 'Splunk', 'Elastic Stack', 'Zabbix', 'Nagios', 'Jaeger', 'Zipkin'] },
    { categoria: 'Segurança', nomes: ['Keycloak', 'HashiCorp Vault', 'OAuth 2.0', 'OpenID Connect', 'JWT', 'SonarQube', 'OWASP ZAP', 'Burp Suite', 'Snyk', 'Trivy', 'Checkmarx', 'Fortify'] },
    { categoria: 'Testes', nomes: ['JUnit', 'NUnit', 'xUnit', 'Mockito', 'Jest', 'Cypress', 'Playwright', 'Selenium', 'Cucumber', 'Karate', 'Gatling', 'JMeter', 'Testcontainers'] },
    { categoria: 'Versionamento', nomes: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Azure Repos'] },
    { categoria: 'Build', nomes: ['Maven', 'Gradle', 'npm', 'pnpm', 'Yarn', 'Vite', 'Webpack', 'Rollup', 'Parcel', 'Turbopack'] },
    { categoria: 'Linux / Automação', nomes: ['Bash', 'PowerShell', 'Make', 'CMake', 'GNU Make'] },
    { categoria: 'Big Data', nomes: ['Apache Spark', 'Hadoop', 'Hive', 'Flink', 'Airflow', 'Kafka', 'Delta Lake', 'Iceberg'] },
    { categoria: 'BI', nomes: ['Power BI', 'Tableau', 'Looker', 'Qlik Sense', 'Apache Superset', 'Metabase'] },
    { categoria: 'Design / UX', nomes: ['Figma', 'Adobe XD', 'Sketch', 'Miro', 'FigJam', 'Canva'] },
    { categoria: 'IDEs e Editores', nomes: ['VS Code', 'IntelliJ IDEA', 'Visual Studio', 'Eclipse', 'PyCharm', 'WebStorm', 'Rider', 'Android Studio', 'Xcode', 'NetBeans', 'Vim', 'Neovim'] },
    { categoria: 'Gestão Ágil', nomes: ['Jira', 'Confluence', 'Azure Boards', 'Trello', 'Monday', 'Asana', 'ClickUp', 'Notion'] },
    { categoria: 'Low-Code / No-Code', nomes: ['Power Platform', 'OutSystems', 'Mendix', 'Retool', 'Appsmith', 'Bubble'] },
    { categoria: 'Blockchain', nomes: ['Hardhat', 'Foundry', 'Truffle', 'Ganache', 'Remix IDE', 'Web3.js', 'Ethers.js'] },
    { categoria: 'Game Development', nomes: ['Unity', 'Unreal Engine', 'Godot', 'CryEngine'] },
    { categoria: 'Embedded / IoT', nomes: ['PlatformIO', 'Arduino IDE', 'ESP-IDF', 'Zephyr RTOS', 'FreeRTOS', 'STM32CubeIDE'] },
  ];

  readonly tracos: { id: TipoTraco; nome: string }[] = [
    { id: 'solido', nome: 'Traço sólido' },
    { id: 'giz', nome: 'Risco de giz' },
    { id: 'lapis', nome: 'Risco de lápis' },
  ];

  get todasFormas(): OpcaoForma[] {
    return [...this.formas, ...this.containers];
  }

  filtroElementos = '';

  get formasFiltradas(): OpcaoForma[] {
    return this.filtrarElementos(this.formas);
  }

  get containersFiltradas(): OpcaoForma[] {
    return this.filtrarElementos(this.containers);
  }

  private filtrarElementos(lista: OpcaoForma[]): OpcaoForma[] {
    const t = this.filtroElementos.trim().toLowerCase();
    if (!t) return lista;
    return lista.filter((f) => f.nome.toLowerCase().includes(t) || f.tipo.toLowerCase().includes(t));
  }

  // ─── Categorias recolhíveis (só "Formas" começa aberta) ───
  categoriasAbertas: Record<string, boolean> = { Formas: true };

  catAberta(nome: string): boolean {
    return !!this.categoriasAbertas[nome];
  }

  toggleCat(nome: string): void {
    this.categoriasAbertas[nome] = !this.categoriasAbertas[nome];
  }

  private _buscaTermo: string | null = null;
  private _buscaCache: { forma?: OpcaoForma; icone?: string }[] = [];

  /**
   * Itens que correspondem à busca (formas, contêineres e ícones do catálogo).
   * Memoizado pelo termo para manter a MESMA referência entre ciclos de detecção
   * de mudança — senão o *ngFor recria os botões e o clique não registra.
   */
  get resultadosBusca(): { forma?: OpcaoForma; icone?: string }[] {
    const t = this.filtroElementos.trim().toLowerCase();
    if (t === this._buscaTermo) return this._buscaCache;
    this._buscaTermo = t;
    const res: { forma?: OpcaoForma; icone?: string }[] = [];
    if (t) {
      [...this.formas, ...this.containers].forEach((f) => {
        if (f.nome.toLowerCase().includes(t) || f.tipo.toLowerCase().includes(t)) res.push({ forma: f });
      });
      this.catalogoIcones.forEach((c) => {
        c.nomes.forEach((n) => {
          if (n.toLowerCase().includes(t) || c.categoria.toLowerCase().includes(t)) res.push({ icone: n });
        });
      });
    }
    this._buscaCache = res;
    return res;
  }

  // ─── Crachás de ícone (SVG em data URL, sem recursos externos) ───
  private readonly coresMarca: Record<string, string> = {
    python: '#3776AB', javascript: '#F7DF1E', typescript: '#3178C6', java: '#007396', 'c#': '#239120',
    go: '#00ADD8', rust: '#DEA584', 'c++': '#00599C', c: '#A8B9CC', kotlin: '#7F52FF', php: '#777BB4',
    swift: '#F05138', dart: '#0175C2', scala: '#DC322F', ruby: '#CC342D', julia: '#9558B2', r: '#276DC3',
    bash: '#4EAA25', 'node.js': '#5FA04E', apple: '#111111', microsoft: '#0078D4', google: '#4285F4',
    amazon: '#FF9900', aws: '#FF9900', meta: '#0866FF', nvidia: '#76B900', openai: '#10A37F', oracle: '#C74634',
    ibm: '#0F62FE', intel: '#0071C5', amd: '#ED1C24', cisco: '#1BA0D7', adobe: '#FA0F00', salesforce: '#00A1E0',
    sap: '#008FD3', samsung: '#1428A0', sony: '#111111', dell: '#007DB8', lenovo: '#E2231A', tencent: '#0052D9',
    react: '#61DAFB', angular: '#DD0031', 'vue.js': '#4FC08D', svelte: '#FF3E00', 'next.js': '#111111',
    'nuxt.js': '#00DC82', astro: '#FF5D01', 'tailwind css': '#38BDF8', bootstrap: '#7952B3', 'spring boot': '#6DB33F',
    'asp.net core': '#512BD4', django: '#092E20', fastapi: '#009688', flask: '#111111', laravel: '#FF2D20',
    'ruby on rails': '#CC0000', flutter: '#02569B', 'react native': '#61DAFB', ionic: '#3880FF', electron: '#47848F',
    qt: '#41CD52', tensorflow: '#FF6F00', pytorch: '#EE4C2C', keras: '#D00000', 'hugging face': '#FFD21E',
    opencv: '#5C3EE8', 'scikit-learn': '#F7931E', pandas: '#150458', numpy: '#013243', matplotlib: '#11557C',
    plotly: '#3F4F75', jupyter: '#F37626', postgresql: '#4169E1', mysql: '#4479A1', 'sql server': '#CC2927',
    mongodb: '#47A248', redis: '#DC382D', cassandra: '#1287B1', elasticsearch: '#005571', neo4j: '#4581C3',
    sqlite: '#003B57', mariadb: '#003545', graphql: '#E10098', grpc: '#244B5A', postman: '#FF6C37',
    'apache kafka': '#231F20', kafka: '#231F20', rabbitmq: '#FF6600', nats: '#27AAE1', docker: '#2496ED',
    podman: '#892CA0', kubernetes: '#326CE5', openshift: '#EE0000', rancher: '#0075A8', jenkins: '#D24939',
    'github actions': '#2088FF', 'gitlab ci/cd': '#FC6D26', 'azure devops': '#0078D7', circleci: '#343434',
    argocd: '#EF7B4D', terraform: '#7B42BC', ansible: '#EE0000', pulumi: '#8A3391', prometheus: '#E6522C',
    grafana: '#F46800', datadog: '#632CA6', 'new relic': '#008C99', splunk: '#000000', keycloak: '#008AAA',
    sonarqube: '#4E9BCD', snyk: '#4C4A73', junit: '#25A162', jest: '#C21325', cypress: '#17202C',
    playwright: '#2EAD33', selenium: '#43B02A', git: '#F05032', github: '#181717', gitlab: '#FC6D26',
    bitbucket: '#0052CC', maven: '#C71A36', gradle: '#02303A', npm: '#CB3837', yarn: '#2C8EBB', vite: '#646CFF',
    webpack: '#8DD6F9', powershell: '#5391FE', 'power bi': '#F2C811', tableau: '#E97627', figma: '#F24E1E',
    canva: '#00C4CC', 'vs code': '#007ACC', 'intellij idea': '#000000', 'visual studio': '#5C2D91',
    eclipse: '#2C2255', pycharm: '#21D789', 'android studio': '#3DDC84', xcode: '#147EFB', jira: '#0052CC',
    notion: '#000000', trello: '#0052CC', unity: '#000000', 'unreal engine': '#0E1128', godot: '#478CBF',
    cloudflare: '#F38020', vim: '#019733', json: '#EAB308', yaml: '#CB171E', xml: '#F1662A', jwt: '#FB015B',
    jwe: '#7B2FBE', jwk: '#2E7D32', jws: '#1565C0', certificado: '#B8860B', chave: '#C7A008', cadeado: '#607D8B',
    token: '#8E44AD', servidor: '#455A64', computador: '#37474F', celular: '#00695C', nuvem: '#0288D1',
    casa: '#6D4C41', 'banco de dados': '#00838F', rede: '#5E35B1', usuário: '#3949AB', arquivo: '#546E7A',
    pasta: '#F9A825', timer: '#00897B', webhook: '#7B1FA2', fila: '#455A64', oauth: '#EB5424',
    apigee: '#4285F4', 'azure api management': '#0078D4', 'aws api gateway': '#FF9900', kong: '#1155CB',
    nginx: '#009639', traefik: '#24A1C1', gravitee: '#663CDC', wso2: '#FF7300', axway: '#CE0E2D',
    'ibm api connect': '#0F62FE', 'oracle api': '#C74634', 'red hat': '#EE0000', tyk: '#009D9A',
    mulesoft: '#00A0DF', broadcom: '#CC092F', 'solo.io': '#24BFA5', 'envoy proxy': '#AC6199',
    'apache apisix': '#E2231A', 'express gateway': '#444444', krakend: '#00B0EF', zuplo: '#FF00BD',
    akamai: '#0F7FC0', boomi: '#00AEEF', 'software ag': '#1B4EA0', 'gloo gateway': '#24BFA5',
    remix: '#121212', nestjs: '#E0234E', 'express.js': '#000000', quarkus: '#4695EB', micronaut: '#0FA5A5',
    'jetpack compose': '#4285F4', swiftui: '#0071E3', '.net maui': '#512BD4', javafx: '#007396',
    wpf: '#0C54C2', avalonia: '#8C2FDE', gtk: '#4A86CF', langchain: '#1C3C3C', llamaindex: '#5A67D8',
    mlflow: '#0194E2', onnx: '#005CED', xgboost: '#189FDD', scipy: '#8CAAE6', seaborn: '#4C72B0',
    'apache hadoop': '#66CCFF', hadoop: '#66CCFF', polars: '#CD792C', 'oracle database': '#C74634',
    hibernate: '#59666C', 'entity framework': '#512BD4', prisma: '#2D3748', sequelize: '#52B0E7',
    typeorm: '#FE0902', sqlalchemy: '#D71F00', jpa: '#59666C', doctrine: '#FB6B00', openapi: '#6BA539',
    insomnia: '#4000BF', soapui: '#5AA700', asyncapi: '#2856FF', activemq: '#78A540', 'apache pulsar': '#188FFF',
    'ibm mq': '#0F62FE', 'amazon sqs': '#FF4F8B', 'google pub/sub': '#4285F4', 'azure service bus': '#0078D4',
    containerd: '#575757', buildah: '#2496ED', 'docker swarm': '#2496ED', nomad: '#00CA8E',
    bamboo: '#0052CC', teamcity: '#000000', fluxcd: '#5468FF', tekton: '#FD495C', 'google cloud': '#4285F4',
    'oracle cloud': '#F80000', 'ibm cloud': '#1261FE', digitalocean: '#0080FF', opentofu: '#FFDA18',
    puppet: '#FFAE1A', chef: '#F09820', saltstack: '#00A651', dynatrace: '#1496FF', zabbix: '#D40000',
    nagios: '#CC0000', jaeger: '#66CFE3', zipkin: '#FF8000', 'openid connect': '#F78C40',
    'owasp zap': '#00549E', 'burp suite': '#FF6633', trivy: '#1904DA', nunit: '#004071', xunit: '#000000',
    mockito: '#78A641', cucumber: '#23D96C', gatling: '#FF3C2E', jmeter: '#D22128', testcontainers: '#291A44',
    'azure repos': '#0078D7', pnpm: '#F69220', rollup: '#EC4A3F', parcel: '#E7A93E', turbopack: '#EF4444',
    make: '#427819', cmake: '#064F8C', 'gnu make': '#427819', flink: '#E6526F', airflow: '#017CEE',
    hive: '#FDEE21', 'delta lake': '#00ADD4', iceberg: '#4B8BBE', looker: '#4285F4', 'qlik sense': '#009848',
    'apache superset': '#20A6C9', metabase: '#509EE3', 'adobe xd': '#FF61F6', sketch: '#F7B500',
    miro: '#FFD02F', figjam: '#FF7A00', webstorm: '#00CDD7', rider: '#C90F5E', netbeans: '#1B6AC6',
    neovim: '#57A143', confluence: '#172B4D', 'azure boards': '#0078D7', monday: '#FF3D57', asana: '#F06A6A',
    clickup: '#7B68EE', 'power platform': '#742774', outsystems: '#CC092F', mendix: '#0595DB',
    retool: '#3D3D3D', appsmith: '#2A2929', bubble: '#0000FF', hardhat: '#FFF100', foundry: '#000000',
    truffle: '#3FE0C5', ganache: '#E4A663', 'remix ide': '#B7B7B7', 'web3.js': '#F16822', 'ethers.js': '#2535A0',
    cryengine: '#000000', platformio: '#F5822A', 'arduino ide': '#00979D', 'esp-idf': '#E7352C',
    'zephyr rtos': '#7B3F96', freertos: '#59CE3F', stm32cubeide: '#03234B', 'apache spark': '#E25A1C',
  };

  private readonly abrevMarca: Record<string, string> = {
    'c#': 'C#', 'c++': 'C++', c: 'C', r: 'R', go: 'Go', 'node.js': 'Node', php: 'php', bash: '>_',
    javascript: 'JS', typescript: 'TS', 'asp.net core': '.NET', '.net maui': 'MAUI', 'vs code': 'VSC',
    'sql server': 'SQL', 'power bi': 'BI', 'ruby on rails': 'RoR', 'github actions': 'GHA', 'gitlab ci/cd': 'CI',
    graphql: 'GQL', grpc: 'gRPC', jwt: 'JWT', jwe: 'JWE', jwk: 'JWK', jws: 'JWS', 'oauth 2.0': 'OAu',
    'openid connect': 'OIDC', npm: 'npm', 'next.js': 'Nx', 'nuxt.js': 'Nu', 'vue.js': 'Vue', json: '{}',
    yaml: 'YAML', xml: '</>', computador: 'PC', celular: 'Cel', servidor: 'Srv', 'banco de dados': 'DB',
    nuvem: 'Nuv', casa: 'Casa', chave: 'Key', cadeado: 'Lock', token: 'Tok', certificado: 'Cert',
    usuário: 'Usr', rede: 'Net', api: 'API', webhook: 'Hook', fila: 'Fila', arquivo: 'Arq', pasta: 'Dir',
    oauth: 'OAu', timer: 'Tmr',
    apple: 'App', microsoft: 'MS', google: 'G', amazon: 'AMZ', meta: 'MT', nvidia: 'NV', openai: 'AI',
    oracle: 'ORA', ibm: 'IBM', intel: 'INT', amd: 'AMD', cisco: 'CIS', adobe: 'Ad', salesforce: 'SF',
    sap: 'SAP', samsung: 'SS', sony: 'SNY', dell: 'DL', lenovo: 'LNV', tencent: 'TCT',
  };

  corDe(nome: string): string {
    const k = nome.toLowerCase();
    return this.coresMarca[k] || this.corHash(nome);
  }

  private corHash(nome: string): string {
    let h = 0;
    for (let i = 0; i < nome.length; i += 1) h = (h * 31 + nome.charCodeAt(i)) | 0;
    const hue = Math.abs(h) % 360;
    return `hsl(${hue}, 52%, 40%)`;
  }

  corTextoDe(cor: string): string {
    if (cor[0] !== '#') return '#ffffff';
    const r = parseInt(cor.slice(1, 3), 16);
    const g = parseInt(cor.slice(3, 5), 16);
    const b = parseInt(cor.slice(5, 7), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.62 ? '#111111' : '#ffffff';
  }

  abrevDe(nome: string): string {
    const k = nome.toLowerCase();
    if (this.abrevMarca[k]) return this.abrevMarca[k];
    const limpo = nome.replace(/\.(js|io|net)\b/gi, '').trim();
    const palavras = limpo
      .split(/[\s./_-]+/)
      .filter((p) => p.length > 0 && !['de', 'the', 'on', 'of', 'and'].includes(p.toLowerCase()));
    if (palavras.length >= 2) return (palavras[0][0] + palavras[1][0]).toUpperCase();
    const w = palavras[0] || nome;
    return (w[0].toUpperCase() + (w[1] || '')).slice(0, 3);
  }

  // Glifos (traços em coordenadas 0..24) por conceito específico.
  private readonly glifosNome: Record<string, string> = {
    computador: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    celular: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    servidor: '<rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    'banco de dados': '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.6 3.6 3 8 3s8-1.4 8-3V5M4 12c0 1.6 3.6 3 8 3s8-1.4 8-3"/>',
    nuvem: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.4A3.5 3.5 0 1117 18z"/>',
    casa: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
    chave: '<circle cx="7" cy="15" r="4"/><path d="M10 12l9-9 3 3-3 3 2 2"/>',
    cadeado: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>',
    token: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a2 2 0 010 4h-4"/>',
    certificado: '<rect x="3" y="4" width="18" height="12" rx="2"/><circle cx="12" cy="19" r="2"/><path d="M8 8h8M8 11h5"/>',
    'usuário': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    rede: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M11 11l-5 6M13 11l5 6"/>',
    api: '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 12h8"/>',
    webhook: '<circle cx="12" cy="7" r="3"/><path d="M9.5 9L6 17M14.5 9L18 17M6 17h12"/>',
    fila: '<rect x="3" y="6" width="4" height="12"/><rect x="10" y="6" width="4" height="12"/><rect x="17" y="6" width="4" height="12"/>',
    arquivo: '<path d="M6 2h8l6 6v14H6z"/><path d="M14 2v6h6"/>',
    pasta: '<path d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 13V8M9 2h6"/>',
    json: '<path d="M8 4c-2 0-3 1-3 3v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 2-1 3-3 3"/>',
    xml: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>',
    yaml: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    jwt: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
    jwe: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M8 11h8"/>',
    jwk: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><circle cx="12" cy="11" r="2"/>',
    jws: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M9 11c1-1 5-1 5 1s-4 2-3 4"/>',
    oauth: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><circle cx="12" cy="11" r="2"/>',
  };

  // Glifos por categoria (quando o item não tem um específico).
  private readonly glifosCategoria: Record<string, string> = {
    Linguagens: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>',
    Empresas: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    'Gateways de API': '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 12h8"/>',
    'Front-end': '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M9 21h6"/>',
    'Back-end': '<rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    Mobile: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    Desktop: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    'Inteligência Artificial': '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M7 3v2M17 3v2"/>',
    'Ciência de Dados': '<path d="M4 20V10M10 20V4M16 20v-8M2 20h20"/>',
    'Banco de Dados': '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.6 3.6 3 8 3s8-1.4 8-3V5M4 12c0 1.6 3.6 3 8 3s8-1.4 8-3"/>',
    ORM: '<path d="M9 12a3 3 0 013-3h1a3 3 0 010 6M15 12a3 3 0 01-3 3h-1a3 3 0 010-6"/>',
    APIs: '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 12h8"/>',
    Mensageria: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    Containers: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>',
    'Orquestração': '<path d="M12 2l4 2v4l-4 2-4-2V4z"/><path d="M12 10v6M8 14l-4 4M16 14l4 4"/>',
    'DevOps / CI-CD': '<path d="M21 12a9 9 0 11-2.6-6.4M21 3v5h-5"/>',
    Cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.4A3.5 3.5 0 1117 18z"/>',
    'Infra como Código': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    Monitoramento: '<path d="M2 12h4l3-8 4 16 3-8h4"/>',
    'Segurança': '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
    Testes: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    Versionamento: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="9" r="2"/><path d="M6 8v8M6 12h6a3 3 0 003-3"/>',
    Build: '<path d="M14 7l3-3 3 3-3 3zM14 7L4 17l3 3L17 10"/>',
    'Linux / Automação': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    'Big Data': '<path d="M4 20V10M10 20V4M16 20v-8M2 20h20"/>',
    BI: '<path d="M4 20V10M10 20V4M16 20v-8M2 20h20"/>',
    'Design / UX': '<path d="M12 19l7-7-4-4-7 7-1 5z"/>',
    'IDEs e Editores': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 10l-2 2 2 2M15 10l2 2-2 2"/>',
    'Gestão Ágil': '<rect x="3" y="4" width="5" height="16"/><rect x="10" y="4" width="5" height="10"/><rect x="17" y="4" width="4" height="13"/>',
    'Low-Code / No-Code': '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/>',
    Blockchain: '<path d="M9 12a3 3 0 013-3h1a3 3 0 010 6M15 12a3 3 0 01-3 3h-1a3 3 0 010-6"/>',
    'Game Development': '<rect x="3" y="8" width="18" height="9" rx="4"/><path d="M8 12h.01M16 12h.01M12 11v2"/>',
    'Embedded / IoT': '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M7 3v2M17 3v2"/>',
    Diversos: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>',
  };

  private readonly glifoGenerico = '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/>';

  private categoriaDe(nome: string): string {
    for (const c of this.catalogoIcones) {
      if (c.nomes.includes(nome)) return c.categoria;
    }
    return '';
  }

  private glifoDe(nome: string): string {
    const k = nome.toLowerCase();
    if (this.glifosNome[k]) return this.glifosNome[k];
    const cat = this.categoriaDe(nome);
    if (cat && this.glifosCategoria[cat]) return this.glifosCategoria[cat];
    return this.glifoGenerico;
  }

  private badgeIconeSvg(nome: string): string {
    const corTexto = this.corTextoDe(this.corDe(nome));
    if (this.categoriaDe(nome) === 'Empresas') {
      const ab = this.escaparXml(this.abrevDe(nome));
      const fs = ab.length >= 4 ? 30 : ab.length === 3 ? 40 : 52;
      return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
        `<text x="50" y="54" font-size="${fs}" font-family="Arial,Helvetica,sans-serif" font-weight="800" fill="${corTexto}" text-anchor="middle" dominant-baseline="central">${ab}</text>` +
        `</svg>`
      );
    }
    const glifo = this.glifoDe(nome);
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
      `<g transform="translate(26,26) scale(2)" fill="none" stroke="${corTexto}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${glifo}</g>` +
      `</svg>`
    );
  }

  inserirIcone(nome: string): void {
    this.criarNoImagem('data:image/svg+xml,' + encodeURIComponent(this.badgeIconeSvg(nome)), 80, 80, nome, {
      corFundo: this.corDe(nome),
      escalaImagem: 0.72,
      raioBordaImagem: 18,
    });
    this.salvar();
  }

  inserirEmoji(e: string): void {
    this.criarNoImagem('data:image/svg+xml,' + encodeURIComponent(this.emojiIconeSvg(e)), 72, 72, '', {
      corFundo: this.padrao.corFundo,
      escalaImagem: 0.82,
      raioBordaImagem: 18,
    });
    this.salvar();
  }

  private emojiIconeSvg(e: string): string {
    const tipo = this.tipoEmoji(e);
    const seed = Array.from(e).reduce((acc, ch) => acc + (ch.codePointAt(0) || 0), 0);
    const olho = (x: number, y = 43, rx = 4.4, ry = 5.6) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#2b1d17"/><circle cx="${x - 1.3}" cy="${y - 1.8}" r="1.2" fill="#fff" opacity=".72"/>`;
    const olhos = olho(38) + olho(62);
    const bochechas = '<ellipse cx="31" cy="55" rx="8" ry="4" fill="#f47b6b" opacity=".28"/><ellipse cx="69" cy="55" rx="8" ry="4" fill="#f47b6b" opacity=".28"/>';
    const sorrisoAberto = '<path d="M33 58 Q50 78 67 58 Q50 67 33 58" fill="#3a231b"/><path d="M40 62 Q50 69 60 62" fill="none" stroke="#ff8da1" stroke-width="4" stroke-linecap="round"/>';
    const sorrisoLinha = '<path d="M34 59 Q50 73 66 59" fill="none" stroke="#2b1d17" stroke-width="5" stroke-linecap="round"/>';
    const defs = (claro: string, meio: string, escuro: string) =>
      '<defs>' +
      `<radialGradient id="face3d" cx="34%" cy="26%" r="70%"><stop offset="0" stop-color="${claro}"/><stop offset=".58" stop-color="${meio}"/><stop offset="1" stop-color="${escuro}"/></radialGradient>` +
      '<radialGradient id="shine" cx="33%" cy="22%" r="36%"><stop offset="0" stop-color="#fff" stop-opacity=".78"/><stop offset=".7" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#1b1010" flood-opacity=".32"/></filter>' +
      '<linearGradient id="tear3d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8f3ff"/><stop offset="1" stop-color="#3187d6"/></linearGradient>' +
      '<linearGradient id="glass3d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26395c"/><stop offset=".55" stop-color="#101828"/><stop offset="1" stop-color="#050914"/></linearGradient>' +
      '</defs>';
    const face = (detalhe: string, paleta = ['#fff1a8', '#ffd057', '#e99723']) =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${defs(paleta[0], paleta[1], paleta[2])}` +
      '<ellipse cx="50" cy="89" rx="29" ry="6" fill="#000" opacity=".18"/>' +
      '<g filter="url(#softShadow)"><circle cx="50" cy="50" r="35" fill="url(#face3d)"/><circle cx="39" cy="35" r="20" fill="url(#shine)"/>' +
      '<path d="M20 53 C22 78 44 89 66 79" fill="none" stroke="#8d5d18" stroke-width="2.6" opacity=".18" stroke-linecap="round"/>' +
      detalhe + '</g></svg>';

    let detalhe = olhos + bochechas + (seed % 3 === 0 ? sorrisoAberto : sorrisoLinha);
    let paleta = ['#fff1a8', '#ffd057', '#e99723'];
    if (tipo === 'laugh') detalhe = '<path d="M31 39 Q37 33 43 39M57 39 Q63 33 69 39" fill="none" stroke="#2b1d17" stroke-width="4.5" stroke-linecap="round"/>' + bochechas + '<path d="M29 56 Q50 82 71 56 Q50 68 29 56" fill="#2b1d17"/><path d="M39 65 Q50 73 61 65" fill="none" stroke="#ff8da1" stroke-width="5" stroke-linecap="round"/><path d="M25 51 C15 43 22 35 29 43" fill="none" stroke="url(#tear3d)" stroke-width="4" stroke-linecap="round"/>';
    else if (tipo === 'wink') detalhe = olho(38) + '<path d="M56 42 Q63 36 70 42" fill="none" stroke="#2b1d17" stroke-width="4.5" stroke-linecap="round"/>' + bochechas + sorrisoLinha;
    else if (tipo === 'love') detalhe = '<path d="M31 39 C26 31 17 38 22 47 L31 56 L40 47 C45 38 36 31 31 39Z" fill="#ef476f" stroke="#8f1239" stroke-width="2"/><path d="M69 39 C64 31 55 38 60 47 L69 56 L78 47 C83 38 74 31 69 39Z" fill="#ef476f" stroke="#8f1239" stroke-width="2"/>' + bochechas + sorrisoAberto;
    else if (tipo === 'cool') detalhe = '<path d="M25 38 H46 L42 52 H30 ZM54 38 H75 L70 52 H58 ZM46 43 H54" fill="url(#glass3d)" stroke="#2b1d17" stroke-width="3" stroke-linejoin="round"/><path d="M31 41 H43M59 41 H71" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/><path d="M39 64 Q50 70 61 64" fill="none" stroke="#2b1d17" stroke-width="4.5" stroke-linecap="round"/>';
    else if (tipo === 'think') detalhe = olho(37) + '<path d="M58 39 q7 -5 13 0" fill="none" stroke="#2b1d17" stroke-width="4" stroke-linecap="round"/><path d="M39 60 Q50 55 61 60" fill="none" stroke="#2b1d17" stroke-width="4.5" stroke-linecap="round"/><path d="M62 69 C71 68 76 73 75 81" fill="none" stroke="#2b1d17" stroke-width="5" stroke-linecap="round"/><circle cx="70" cy="78" r="3.5" fill="#2b1d17"/>';
    else if (tipo === 'neutral') detalhe = olhos + '<path d="M35 61 H65" fill="none" stroke="#2b1d17" stroke-width="5" stroke-linecap="round"/><path d="M33 35 Q38 32 43 35M57 35 Q62 32 67 35" fill="none" stroke="#2b1d17" stroke-width="3" opacity=".55"/>';
    else if (tipo === 'sleep') detalhe = '<path d="M31 42 q7 -6 14 0M55 42 q7 -6 14 0" fill="none" stroke="#2b1d17" stroke-width="4.5" stroke-linecap="round"/><path d="M39 62 Q50 58 61 62" fill="none" stroke="#2b1d17" stroke-width="4" stroke-linecap="round"/><text x="70" y="27" font-size="18" font-family="Arial" font-weight="800" fill="#3f8efc">Z</text><text x="82" y="17" font-size="12" font-family="Arial" font-weight="800" fill="#7ab7ff">Z</text>';
    else if (tipo === 'surprise') detalhe = '<circle cx="38" cy="42" r="6" fill="#2b1d17"/><circle cx="62" cy="42" r="6" fill="#2b1d17"/><ellipse cx="50" cy="64" rx="10" ry="13" fill="#2b1d17"/><ellipse cx="46" cy="59" rx="3" ry="2" fill="#fff" opacity=".35"/>';
    else if (tipo === 'sad') detalhe = olhos + '<path d="M34 68 Q50 53 66 68" fill="none" stroke="#2b1d17" stroke-width="5" stroke-linecap="round"/><path d="M30 33 q8 -5 16 0M54 33 q8 -5 16 0" fill="none" stroke="#2b1d17" stroke-width="3" opacity=".45"/>';
    else if (tipo === 'cry') detalhe = olhos + '<path d="M34 69 Q50 55 66 69" fill="none" stroke="#2b1d17" stroke-width="5" stroke-linecap="round"/><path d="M29 50 C20 62 25 72 33 70 C40 62 35 54 29 50Z" fill="url(#tear3d)"/><circle cx="31" cy="57" r="2" fill="#fff" opacity=".55"/>';
    else if (tipo === 'angry') { paleta = ['#ffb199', '#ff675f', '#c92a34']; detalhe = '<path d="M29 35 L45 43M71 35 L55 43" stroke="#391414" stroke-width="5" stroke-linecap="round"/><circle cx="38" cy="46" r="4.5" fill="#391414"/><circle cx="62" cy="46" r="4.5" fill="#391414"/><path d="M36 67 Q50 56 64 67" fill="none" stroke="#391414" stroke-width="5" stroke-linecap="round"/><path d="M25 27 l8 -5M75 27 l-8 -5" stroke="#ffddd2" stroke-width="3" opacity=".5" stroke-linecap="round"/>'; }
    else if (tipo === 'party') detalhe = olhos + bochechas + sorrisoAberto + '<path d="M42 14 L72 24 L50 41 Z" fill="#8e7dff" stroke="#2b1d17" stroke-width="3"/><circle cx="68" cy="22" r="3" fill="#ef476f"/><path d="M22 29 C10 20 25 12 18 6M76 73 C92 75 82 59 93 55" fill="none" stroke="#06d6a0" stroke-width="4" stroke-linecap="round"/><circle cx="21" cy="24" r="2.6" fill="#ffbe0b"/><circle cx="81" cy="69" r="2.6" fill="#ef476f"/>';
    else if (tipo === 'scared') { paleta = ['#ecfbff', '#a7e0ff', '#63a7dc']; detalhe = '<circle cx="38" cy="42" r="6" fill="#16324f"/><circle cx="62" cy="42" r="6" fill="#16324f"/><ellipse cx="50" cy="66" rx="10" ry="14" fill="#16324f"/><path d="M25 55 H17M83 55 H75" stroke="#3973aa" stroke-width="4" stroke-linecap="round"/><path d="M32 30 Q38 25 44 30M56 30 Q62 25 68 30" fill="none" stroke="#16324f" stroke-width="3" opacity=".5"/>'; }
    else if (tipo === 'sick') { paleta = ['#d8ffd2', '#91df83', '#4c9a54']; detalhe = olhos + '<path d="M36 64 Q50 58 64 64" fill="none" stroke="#183b21" stroke-width="5" stroke-linecap="round"/><path d="M31 29 C43 21 57 21 69 29" fill="none" stroke="#2f6f3e" stroke-width="5" stroke-linecap="round"/><circle cx="27" cy="52" r="2.6" fill="#2f6f3e" opacity=".45"/><circle cx="72" cy="58" r="2" fill="#2f6f3e" opacity=".45"/>'; }
    else if (tipo === 'cold') { paleta = ['#eaffff', '#9de7ef', '#4aa7c5']; detalhe = '<circle cx="38" cy="42" r="4.5" fill="#16324f"/><circle cx="62" cy="42" r="4.5" fill="#16324f"/><path d="M38 63 h24" stroke="#16324f" stroke-width="5" stroke-linecap="round"/><path d="M31 75 h38M35 81 h30" stroke="#16324f" stroke-width="3" stroke-linecap="round"/><path d="M24 31 l5 5M76 31 l-5 5M50 18 v8" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>'; }
    else if (tipo === 'person') return this.pessoaEmojiSvg(seed);

    return face(detalhe, paleta);
  }

  private pessoaEmojiSvg(seed: number): string {
    const cores = [
      ['#fff0bd', '#f7bf72', '#b86f37', '#5b7cff'],
      ['#ffe0c4', '#d9955b', '#8a4f2a', '#06b6d4'],
      ['#f5c89e', '#b97845', '#5b351f', '#8b5cf6'],
      ['#d49a6a', '#8a5635', '#3a2418', '#10b981'],
    ][seed % 4];
    const gesto = seed % 5;
    const cabelo =
      gesto === 0
        ? '<path d="M31 31 C34 14 65 12 70 33 C60 25 45 25 31 31Z" fill="#2d1b13"/>'
        : gesto === 1
          ? '<path d="M30 34 C32 15 68 17 71 38 C59 27 42 29 30 34Z" fill="#1f2937"/>'
          : '<path d="M32 29 C39 16 61 16 68 30 C59 25 43 25 32 29Z" fill="#5a371f"/>';
    const bracos =
      gesto === 0
        ? '<path d="M31 64 C17 58 13 46 18 39" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/><path d="M69 64 C83 58 87 46 82 39" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/>'
        : gesto === 1
          ? '<path d="M32 64 C20 67 17 80 26 84" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/><path d="M68 64 C80 58 78 42 70 35" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/>'
          : gesto === 2
            ? '<path d="M32 64 C19 61 14 70 17 80" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/><path d="M68 64 C81 61 86 70 83 80" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/>'
            : '<path d="M31 65 C19 69 15 78 21 86" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/><path d="M69 65 C81 69 85 78 79 86" stroke="#f7bf72" stroke-width="9" stroke-linecap="round"/>';

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<defs><radialGradient id="skin" cx="35%" cy="23%" r="75%">' +
      `<stop offset="0" stop-color="${cores[0]}"/><stop offset=".62" stop-color="${cores[1]}"/><stop offset="1" stop-color="${cores[2]}"/>` +
      '</radialGradient><linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">' +
      `<stop offset="0" stop-color="${cores[3]}"/><stop offset="1" stop-color="#172554"/>` +
      '</linearGradient><filter id="personShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#111827" flood-opacity=".35"/></filter></defs>' +
      '<ellipse cx="50" cy="90" rx="28" ry="6" fill="#000" opacity=".18"/>' +
      '<g filter="url(#personShadow)">' +
      bracos +
      '<path d="M24 87 C30 59 70 59 76 87 Z" fill="url(#shirt)"/>' +
      '<circle cx="50" cy="36" r="21" fill="url(#skin)"/>' +
      cabelo +
      '<circle cx="42" cy="37" r="3.3" fill="#20120d"/><circle cx="58" cy="37" r="3.3" fill="#20120d"/>' +
      '<path d="M41 49 Q50 57 59 49" fill="none" stroke="#20120d" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="36" cy="46" rx="5" ry="3" fill="#f47b6b" opacity=".28"/><ellipse cx="64" cy="46" rx="5" ry="3" fill="#f47b6b" opacity=".28"/>' +
      '<path d="M36 25 C43 19 58 19 65 25" fill="none" stroke="#fff" stroke-width="4" opacity=".25" stroke-linecap="round"/>' +
      '</g></svg>'
    );
  }

  private tipoEmoji(e: string): string {
    if (['😂', '😆', '😅', '😭'].includes(e)) return e === '😭' ? 'cry' : 'laugh';
    if (['😉', '🙃'].includes(e)) return 'wink';
    if (['😍', '🤩'].includes(e)) return 'love';
    if (['😎'].includes(e)) return 'cool';
    if (['🤔', '🧐', '🤨'].includes(e)) return 'think';
    if (['😐', '😬'].includes(e)) return 'neutral';
    if (['😴'].includes(e)) return 'sleep';
    if (['😮', '🤯'].includes(e)) return 'surprise';
    if (['😢'].includes(e)) return 'sad';
    if (['😡'].includes(e)) return 'angry';
    if (['🥳', '😇'].includes(e)) return 'party';
    if (['😱', '😳'].includes(e)) return 'scared';
    if (['🤢'].includes(e)) return 'sick';
    if (['🥶'].includes(e)) return 'cold';
    if (/[\u{1F9CD}\u{1F6B6}\u{1F3C3}\u{1F574}\u{1F481}\u{1F64B}\u{1F646}\u{1F645}\u{1F937}\u{1F926}\u{1F477}\u{1F9B8}\u{1F9B9}\u{1F9D9}\u{1F9D1}\u{1F468}\u{1F469}]/u.test(e)) return 'person';
    return 'happy';
  }

  private escaparXml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  nos: NoFluxograma[] = [];
  conexoes: ConexaoFluxograma[] = [];

  ferramenta: Ferramenta = 'selecionar';
  selecionadoId: string | null = null;
  selecionadoTipo: 'no' | 'conexao' | null = null;
  nosSelecionados = new Set<string>();
  conexoesSelecionadas = new Set<string>();
  retanguloSelecao: RetanguloCanvas | null = null;
  editorTextoInline: EditorTextoInline | null = null;

  // Origem temporária ao criar conexões.
  conexaoOrigemId: string | null = null;

  // Estilos padrão aplicados a novos elementos.
  padrao = {
    corFundo: '#0b2344',
    corBorda: '#00ffd1',
    espessuraBorda: 2,
    corTexto: '#f4fbff',
    corLinha: '#5b7cff',
    espessuraLinha: 2,
    tamanhoSeta: TAMANHO_SETA_PADRAO,
    tipoTraco: 'solido' as TipoTraco,
  };

  temaClaro = false;
  aviso = '';
  private backupTema: BackupTema | null = null;
  private substituirImagemId: string | null = null;
  private readonly chaveLocal = 'fluxograma-editor-v1';

  // Viewport
  zoom = 1;
  panX = 40;
  panY = 40;

  // Painel de import/export
  painelDados = false;
  formato: Formato = 'mermaid';
  textoDados = '';
  mensagem = '';
  copiado = false;

  // Importacao por imagem
  importandoImagem = false;
  progressoImportacaoImagem = 0;
  etapaImportacaoImagem = '';
  erroImportacaoImagem = '';
  painelRevisaoImagem = false;
  fluxogramaDetectado: DetectedFlowchart | null = null;
  fluxogramaImportacao: Fluxograma | null = null;

  // Estado de arraste / pan (apenas em memória durante o gesto).
  private curvando: ConexaoFluxograma | null = null;
  private curvouMovimento = false;
  private arrastePontoIndice = -1;
  private pendenteLinha: { c: ConexaoFluxograma; x: number; y: number } | null = null;
  guiaV: { x: number; y1: number; y2: number } | null = null;
  guiaH: { y: number; x1: number; x2: number } | null = null;
  private arrastando: NoFluxograma | null = null;
  private arrasteDx = 0;
  private arrasteDy = 0;
  private arrasteInicioX = 0;
  private arrasteInicioY = 0;
  private arrasteGrupo = false;
  private posicoesInicioArraste = new Map<string, { x: number; y: number }>();
  private panning = false;
  private panIniX = 0;
  private panIniY = 0;
  private selecionandoArea = false;
  private selecaoAreaAdicionar = false;
  private selecaoIniX = 0;
  private selecaoIniY = 0;
  private ignorarCliqueCanvas = false;

  // Estado de redimensionamento.
  private redimensionando: NoFluxograma | null = null;
  private resizeCanto = '';
  private resizeIniX = 0;
  private resizeIniY = 0;
  private resizeBounds = { x: 0, y: 0, largura: 0, altura: 0 };

  private contador = 0;

  constructor(
    private dataService: DataService,
    private fluxogramaService: FluxogramaService,
    private importadorImagem: FluxogramaImagemImportService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('Editor de Fluxograma');
    if (!this.carregarLocal()) this.exemplo();
  }

  // ─────────────────────────── Getters ───────────────────────────

  get noSelecionado(): NoFluxograma | null {
    return this.totalSelecionados === 1 && this.selecionadoTipo === 'no'
      ? this.nos.find((n) => n.id === this.selecionadoId) ?? null
      : null;
  }

  get conexaoSelecionada(): ConexaoFluxograma | null {
    return this.totalSelecionados === 1 && this.selecionadoTipo === 'conexao'
      ? this.conexoes.find((c) => c.id === this.selecionadoId) ?? null
      : null;
  }

  get totalSelecionados(): number {
    return this.nosSelecionados.size + this.conexoesSelecionadas.size;
  }

  get selecaoMultipla(): boolean {
    return this.totalSelecionados > 1;
  }

  get temSelecao(): boolean {
    return this.totalSelecionados > 0;
  }

  // ─────────────────────── Ferramentas / criação ───────────────────────

  selecionarFerramenta(f: Ferramenta): void {
    this.ferramenta = f;
    this.conexaoOrigemId = null;
    if (f !== 'selecionar') {
      this.limparSelecao();
    }
  }

  private novoId(prefixo: string): string {
    this.contador += 1;
    return `${prefixo}${this.contador}`;
  }

  private criarNo(tipo: FormaTipo, x: number, y: number): NoFluxograma {
    let largura = 150;
    let altura = 70;
    if (tipo === 'circulo') {
      largura = 90;
      altura = 90;
    } else if (tipo === 'swimlane') {
      largura = 340;
      altura = 220;
    } else if (this.ehContainer(tipo)) {
      largura = 280;
      altura = 180;
    }
    const no: NoFluxograma = {
      id: this.novoId('n'),
      tipo,
      x: Math.round(x - largura / 2),
      y: Math.round(y - altura / 2),
      largura,
      altura,
      texto: this.textoInicial(tipo),
      corFundo: this.padrao.corFundo,
      corBorda: this.padrao.corBorda,
      espessuraBorda: this.padrao.espessuraBorda,
      corTexto: this.padrao.corTexto,
      tipoTraco: this.padrao.tipoTraco,
    };
    // Contêineres entram no início do array para ficarem atrás dos demais.
    if (this.ehContainer(tipo)) this.nos.unshift(no);
    else this.nos.push(no);
    return no;
  }

  /** Insere (ou substitui) uma imagem a partir de um arquivo selecionado. */
  adicionarImagem(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    input.value = '';
    if (!arquivo) {
      this.substituirImagemId = null;
      return;
    }
    const leitor = new FileReader();
    leitor.onload = () => {
      const src = String(leitor.result || '');
      const img = new Image();
      img.onload = () => {
        if (this.substituirImagemId) {
          const alvo = this.nos.find((n) => n.id === this.substituirImagemId);
          if (alvo) alvo.src = src;
          this.substituirImagemId = null;
        } else {
          this.criarNoImagem(src, img.naturalWidth || 200, img.naturalHeight || 150);
        }
        this.salvar();
      };
      img.onerror = () => {
        this.substituirImagemId = null;
        this.avisar('Não foi possível carregar a imagem.');
      };
      img.src = src;
    };
    leitor.readAsDataURL(arquivo);
  }

  private criarNoImagem(
    src: string,
    w: number,
    h: number,
    texto = '',
    opcoes: { corFundo?: string; escalaImagem?: number; raioBordaImagem?: number } = {},
  ): void {
    const max = 240;
    const escala = Math.min(1, max / Math.max(w, h));
    const largura = Math.max(30, Math.round(w * escala));
    const altura = Math.max(30, Math.round(h * escala));
    const centro = this.centroViewport();
    const no: NoFluxograma = {
      id: this.novoId('n'),
      tipo: 'imagem',
      x: Math.round(centro.x - largura / 2),
      y: Math.round(centro.y - altura / 2),
      largura,
      altura,
      texto,
      corFundo: opcoes.corFundo || this.padrao.corFundo,
      corBorda: this.padrao.corBorda,
      espessuraBorda: 0,
      corTexto: this.padrao.corTexto,
      tipoTraco: 'solido',
      src,
      escalaImagem: this.normalizarEscalaImagem(opcoes.escalaImagem ?? 1),
      raioBordaImagem: this.normalizarRaioBordaImagem(opcoes.raioBordaImagem ?? 18),
    };
    this.nos.push(no);
    this.selecionar(no.id, 'no');
  }

  /** Marca a imagem selecionada para ser substituída pelo próximo arquivo escolhido. */
  trocarImagem(): void {
    if (this.noSelecionado?.tipo === 'imagem') {
      this.substituirImagemId = this.noSelecionado.id;
    }
  }

  private centroViewport(): { x: number; y: number } {
    const svg = this.svgCanvas?.nativeElement;
    if (!svg) return { x: 200, y: 150 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (rect.width / 2 - this.panX) / this.zoom,
      y: (rect.height / 2 - this.panY) / this.zoom,
    };
  }

  ehContainer(tipo: FormaTipo): boolean {
    return tipo === 'container' || tipo === 'frame' || tipo === 'grupo' || tipo === 'swimlane';
  }

  get nosContainer(): NoFluxograma[] {
    return this.nos.filter((n) => this.ehContainer(n.tipo));
  }

  get nosNormais(): NoFluxograma[] {
    return this.nos.filter((n) => !this.ehContainer(n.tipo));
  }

  private textoInicial(tipo: FormaTipo): string {
    switch (tipo) {
      case 'losango':
        return 'Decisão?';
      case 'terminador':
        return 'Início';
      case 'paralelogramo':
        return 'Entrada';
      case 'cilindro':
        return 'Dados';
      case 'subprocesso':
        return 'Subprocesso';
      case 'container':
        return 'Contêiner';
      case 'frame':
        return 'Moldura';
      case 'grupo':
        return 'Grupo';
      case 'swimlane':
        return 'Raia';
      default:
        return 'Texto';
    }
  }

  // ─────────────────────── Eventos do canvas ───────────────────────

  aoClicarCanvas(evento: MouseEvent): void {
    if (this.ignorarCliqueCanvas) {
      this.ignorarCliqueCanvas = false;
      return;
    }
    // Clique em área vazia.
    if (this.ferramenta !== 'selecionar' && this.ferramenta !== 'conectar') {
      const p = this.pontoCanvas(evento);
      const no = this.criarNo(this.ferramenta, p.x, p.y);
      this.selecionar(no.id, 'no');
      this.ferramenta = 'selecionar';
      this.salvar();
      return;
    }
    // Modo selecionar: clicar no vazio limpa a seleção.
    this.limparSelecao();
    this.conexaoOrigemId = null;
  }

  aoPressionarNo(evento: MouseEvent, no: NoFluxograma): void {
    evento.stopPropagation();

    if (this.ferramenta === 'conectar') {
      if (!this.conexaoOrigemId) {
        this.conexaoOrigemId = no.id;
        this.selecionar(no.id, 'no');
      } else if (this.conexaoOrigemId !== no.id) {
        this.criarConexao(this.conexaoOrigemId, no.id);
        this.conexaoOrigemId = null;
        this.salvar();
      }
      return;
    }

    // Modo selecionar → inicia arraste.
    const multisselecao = evento.ctrlKey || evento.metaKey || evento.shiftKey;
    if (multisselecao) {
      this.alternarSelecao(no.id, 'no');
      if (!this.isNoSelecionado(no)) return;
    } else if (!this.isNoSelecionado(no)) {
      this.selecionar(no.id, 'no');
    } else {
      this.selecionadoId = no.id;
      this.selecionadoTipo = 'no';
    }
    const p = this.pontoCanvas(evento);
    this.arrastando = no;
    this.arrasteDx = p.x - no.x;
    this.arrasteDy = p.y - no.y;
    this.arrasteInicioX = p.x;
    this.arrasteInicioY = p.y;
    this.arrasteGrupo = this.nosSelecionados.size > 1 && this.isNoSelecionado(no);
    this.posicoesInicioArraste = new Map(
      this.nos.filter((n) => this.nosSelecionados.has(n.id)).map((n) => [n.id, { x: n.x, y: n.y }]),
    );
  }

  aoClicarConexao(evento: MouseEvent, c: ConexaoFluxograma): void {
    evento.stopPropagation();
    if (this.ferramenta === 'conectar') return;
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey) {
      this.alternarSelecao(c.id, 'conexao');
    } else {
      this.selecionar(c.id, 'conexao');
    }
  }

  aoPressionarFundo(evento: MouseEvent): void {
    if (this.ferramenta === 'selecionar') {
      if (evento.button === 1 || evento.altKey) {
        this.panning = true;
        this.panIniX = evento.clientX - this.panX;
        this.panIniY = evento.clientY - this.panY;
        return;
      }
      const p = this.pontoCanvas(evento);
      this.selecionandoArea = true;
      this.selecaoAreaAdicionar = evento.ctrlKey || evento.metaKey || evento.shiftKey;
      this.selecaoIniX = p.x;
      this.selecaoIniY = p.y;
      this.retanguloSelecao = { x: p.x, y: p.y, largura: 0, altura: 0 };
    }
  }

  @HostListener('window:mousemove', ['$event'])
  aoMover(evento: MouseEvent): void {
    if (this.curvando) {
      this.moverPonto(evento);
      return;
    }
    if (this.pendenteLinha) {
      const pp = this.pontoCanvas(evento);
      if (Math.hypot(pp.x - this.pendenteLinha.x, pp.y - this.pendenteLinha.y) > 4) {
        const cc = this.pendenteLinha.c;
        const idx = this.inserirPonto(cc, { x: this.pendenteLinha.x, y: this.pendenteLinha.y });
        this.curvando = cc;
        this.arrastePontoIndice = idx;
        this.curvouMovimento = false;
        this.pendenteLinha = null;
        this.moverPonto(evento);
      }
      return;
    }
    if (this.redimensionando) {
      this.redimensionar(evento);
      return;
    }
    if (this.arrastando) {
      const p = this.pontoCanvas(evento);
      if (this.arrasteGrupo) {
        const dx = p.x - this.arrasteInicioX;
        const dy = p.y - this.arrasteInicioY;
        this.nos.forEach((n) => {
          const pos = this.posicoesInicioArraste.get(n.id);
          if (pos) {
            n.x = Math.round(pos.x + dx);
            n.y = Math.round(pos.y + dy);
          }
        });
      } else {
        this.arrastando.x = Math.round(p.x - this.arrasteDx);
        this.arrastando.y = Math.round(p.y - this.arrasteDy);
        this.aplicarSnap(this.arrastando);
      }
    } else if (this.panning) {
      this.panX = evento.clientX - this.panIniX;
      this.panY = evento.clientY - this.panIniY;
    } else if (this.selecionandoArea) {
      const p = this.pontoCanvas(evento);
      this.retanguloSelecao = this.normalizarRetangulo(this.selecaoIniX, this.selecaoIniY, p.x, p.y);
    }
  }

  @HostListener('window:mouseup')
  aoSoltar(): void {
    const mudou = !!(this.arrastando || this.redimensionando || this.panning);
    if (this.selecionandoArea) {
      const selecionou = this.aplicarSelecaoArea();
      this.ignorarCliqueCanvas = selecionou;
    }
    this.arrastando = null;
    this.arrasteGrupo = false;
    this.posicoesInicioArraste.clear();
    this.panning = false;
    this.redimensionando = null;
    this.selecionandoArea = false;
    this.retanguloSelecao = null;
    if (this.curvando) {
      this.curvando = null;
      this.arrastePontoIndice = -1;
      if (this.curvouMovimento) this.salvar();
      this.curvouMovimento = false;
    }
    this.pendenteLinha = null;
    this.guiaV = null;
    this.guiaH = null;
    if (mudou) this.salvar();
  }

  /** Alinha o elemento arrastado ao centro ou às bordas de outro próximo (snap) e exibe a guia. */
  private aplicarSnap(no: NoFluxograma): void {
    const limiar = 6 / this.zoom;
    const outros = this.nos.filter((n) => n.id !== no.id);
    const dragX = [no.x, no.x + no.largura / 2, no.x + no.largura];
    const dragY = [no.y, no.y + no.altura / 2, no.y + no.altura];
    let melhorX: { delta: number; guia: number; o: NoFluxograma } | null = null;
    let melhorY: { delta: number; guia: number; o: NoFluxograma } | null = null;

    for (const o of outros) {
      const oX = [o.x, o.x + o.largura / 2, o.x + o.largura];
      const oY = [o.y, o.y + o.altura / 2, o.y + o.altura];
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          const dX = oX[j] - dragX[i];
          if (Math.abs(dX) <= limiar && (!melhorX || Math.abs(dX) < Math.abs(melhorX.delta))) {
            melhorX = { delta: dX, guia: oX[j], o };
          }
          const dY = oY[j] - dragY[i];
          if (Math.abs(dY) <= limiar && (!melhorY || Math.abs(dY) < Math.abs(melhorY.delta))) {
            melhorY = { delta: dY, guia: oY[j], o };
          }
        }
      }
    }

    if (melhorX) {
      no.x = Math.round(no.x + melhorX.delta);
      const o = melhorX.o;
      this.guiaV = { x: melhorX.guia, y1: Math.min(no.y, o.y) - 10, y2: Math.max(no.y + no.altura, o.y + o.altura) + 10 };
    } else {
      this.guiaV = null;
    }
    if (melhorY) {
      no.y = Math.round(no.y + melhorY.delta);
      const o = melhorY.o;
      this.guiaH = { y: melhorY.guia, x1: Math.min(no.x, o.x) - 10, x2: Math.max(no.x + no.largura, o.x + o.largura) + 10 };
    } else {
      this.guiaH = null;
    }
  }

  @HostListener('window:keydown', ['$event'])
  aoTeclar(evento: KeyboardEvent): void {
    const alvo = evento.target as HTMLElement | null;
    if (alvo && ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName)) return;
    if ((evento.key === 'Delete' || evento.key === 'Backspace') && this.temSelecao) {
      evento.preventDefault();
      this.excluirSelecionado();
    }
    if (evento.key === 'Escape') {
      this.cancelarEdicaoTextoInline();
      this.limparSelecao();
      this.conexaoOrigemId = null;
      this.ferramenta = 'selecionar';
    }
  }

  private criarConexao(de: string, para: string): ConexaoFluxograma {
    const c: ConexaoFluxograma = {
      id: this.novoId('e'),
      de,
      para,
      texto: '',
      cor: this.padrao.corLinha,
      espessura: this.padrao.espessuraLinha,
      tracejada: false,
      setaInicio: false,
      setaFim: true,
      tamanhoSeta: this.padrao.tamanhoSeta,
      curvatura: 0,
      tipoTraco: this.padrao.tipoTraco,
    };
    this.conexoes.push(c);
    this.selecionar(c.id, 'conexao');
    return c;
  }

  private selecionar(id: string, tipo: 'no' | 'conexao'): void {
    this.nosSelecionados.clear();
    this.conexoesSelecionadas.clear();
    this.selecionadoId = id;
    this.selecionadoTipo = tipo;
    if (tipo === 'no') this.nosSelecionados.add(id);
    else this.conexoesSelecionadas.add(id);
  }

  private alternarSelecao(id: string, tipo: 'no' | 'conexao'): void {
    const set = tipo === 'no' ? this.nosSelecionados : this.conexoesSelecionadas;
    if (set.has(id)) {
      set.delete(id);
      if (this.selecionadoId === id && this.selecionadoTipo === tipo) this.definirAtivoDaSelecao();
      return;
    }
    set.add(id);
    this.selecionadoId = id;
    this.selecionadoTipo = tipo;
  }

  private definirAtivoDaSelecao(): void {
    const no = this.nosSelecionados.values().next().value as string | undefined;
    if (no) {
      this.selecionadoId = no;
      this.selecionadoTipo = 'no';
      return;
    }
    const conexao = this.conexoesSelecionadas.values().next().value as string | undefined;
    if (conexao) {
      this.selecionadoId = conexao;
      this.selecionadoTipo = 'conexao';
      return;
    }
    this.limparSelecao();
  }

  private limparSelecao(): void {
    this.nosSelecionados.clear();
    this.conexoesSelecionadas.clear();
    this.selecionadoId = null;
    this.selecionadoTipo = null;
  }

  isNoSelecionado(no: NoFluxograma): boolean {
    return this.nosSelecionados.has(no.id);
  }

  isConexaoSelecionada(c: ConexaoFluxograma): boolean {
    return this.conexoesSelecionadas.has(c.id);
  }

  excluirSelecionado(): void {
    if (!this.temSelecao) return;
    const nosExcluidos = new Set(this.nosSelecionados);
    const conexoesExcluidas = new Set(this.conexoesSelecionadas);
    this.nos = this.nos.filter((n) => !nosExcluidos.has(n.id));
    this.conexoes = this.conexoes.filter(
      (c) => !conexoesExcluidas.has(c.id) && !nosExcluidos.has(c.de) && !nosExcluidos.has(c.para),
    );
    this.limparSelecao();
    this.salvar();
  }

  // ─────────────────────── Coordenadas / viewport ───────────────────────

  private pontoCanvas(evento: MouseEvent): { x: number; y: number } {
    const svg = this.svgCanvas?.nativeElement;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (evento.clientX - rect.left - this.panX) / this.zoom,
      y: (evento.clientY - rect.top - this.panY) / this.zoom,
    };
  }

  private normalizarRetangulo(x1: number, y1: number, x2: number, y2: number): RetanguloCanvas {
    return {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      largura: Math.abs(x2 - x1),
      altura: Math.abs(y2 - y1),
    };
  }

  private aplicarSelecaoArea(): boolean {
    const r = this.retanguloSelecao;
    if (!r || (r.largura < 4 && r.altura < 4)) return false;
    if (!this.selecaoAreaAdicionar) {
      this.limparSelecao();
    }

    this.nos.forEach((n) => {
      if (this.retangulosIntersectam(r, n.x, n.y, n.largura, n.altura)) {
        this.nosSelecionados.add(n.id);
      }
    });

    this.conexoes.forEach((c) => {
      const p = this.pontosConexao(c);
      if (!p) return;
      const meio = { x: (p.x1 + p.x2) / 2, y: (p.y1 + p.y2) / 2 };
      if (
        this.segmentoIntersectaRetangulo(r, p.x1, p.y1, p.x2, p.y2) ||
        this.pontoDentroRetangulo(r, meio.x, meio.y)
      ) {
        this.conexoesSelecionadas.add(c.id);
      }
    });

    this.definirAtivoDaSelecao();
    return this.temSelecao;
  }

  private retangulosIntersectam(r: RetanguloCanvas, x: number, y: number, largura: number, altura: number): boolean {
    return x <= r.x + r.largura && x + largura >= r.x && y <= r.y + r.altura && y + altura >= r.y;
  }

  private pontoDentroRetangulo(r: RetanguloCanvas, x: number, y: number): boolean {
    return x >= r.x && x <= r.x + r.largura && y >= r.y && y <= r.y + r.altura;
  }

  private segmentoIntersectaRetangulo(r: RetanguloCanvas, x1: number, y1: number, x2: number, y2: number): boolean {
    if (this.pontoDentroRetangulo(r, x1, y1) || this.pontoDentroRetangulo(r, x2, y2)) return true;

    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const largura = Math.abs(x2 - x1);
    const altura = Math.abs(y2 - y1);
    if (!this.retangulosIntersectam(r, minX, minY, largura, altura)) return false;

    const rx1 = r.x;
    const ry1 = r.y;
    const rx2 = r.x + r.largura;
    const ry2 = r.y + r.altura;

    return (
      this.segmentosIntersectam(x1, y1, x2, y2, rx1, ry1, rx2, ry1) ||
      this.segmentosIntersectam(x1, y1, x2, y2, rx2, ry1, rx2, ry2) ||
      this.segmentosIntersectam(x1, y1, x2, y2, rx2, ry2, rx1, ry2) ||
      this.segmentosIntersectam(x1, y1, x2, y2, rx1, ry2, rx1, ry1)
    );
  }

  private segmentosIntersectam(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    cx: number,
    cy: number,
    dx: number,
    dy: number,
  ): boolean {
    const o1 = this.orientacao(ax, ay, bx, by, cx, cy);
    const o2 = this.orientacao(ax, ay, bx, by, dx, dy);
    const o3 = this.orientacao(cx, cy, dx, dy, ax, ay);
    const o4 = this.orientacao(cx, cy, dx, dy, bx, by);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && this.pontoNoSegmento(ax, ay, cx, cy, bx, by)) return true;
    if (o2 === 0 && this.pontoNoSegmento(ax, ay, dx, dy, bx, by)) return true;
    if (o3 === 0 && this.pontoNoSegmento(cx, cy, ax, ay, dx, dy)) return true;
    return o4 === 0 && this.pontoNoSegmento(cx, cy, bx, by, dx, dy);
  }

  private orientacao(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number {
    const valor = (by - ay) * (cx - bx) - (bx - ax) * (cy - by);
    if (Math.abs(valor) < 0.0001) return 0;
    return valor > 0 ? 1 : 2;
  }

  private pontoNoSegmento(ax: number, ay: number, px: number, py: number, bx: number, by: number): boolean {
    const margem = 0.0001;
    return (
      px <= Math.max(ax, bx) + margem &&
      px + margem >= Math.min(ax, bx) &&
      py <= Math.max(ay, by) + margem &&
      py + margem >= Math.min(ay, by)
    );
  }

  aplicarZoom(fator: number): void {
    this.zoom = Math.min(3, Math.max(0.25, +(this.zoom * fator).toFixed(2)));
  }

  ajustarZoom(valor: number): void {
    this.zoom = valor;
  }

  resetarView(): void {
    this.zoom = 1;
    this.panX = 40;
    this.panY = 40;
  }

  /** Ajusta zoom e pan para enquadrar todo o conteúdo na área visível (sem ultrapassar 100%). */
  ajustarZoomParaConteudo(margem = 28): void {
    const lim = this.limitesConteudo();
    if (!lim) {
      this.resetarView();
      return;
    }
    const svg = this.svgCanvas?.nativeElement;
    const rect = svg ? svg.getBoundingClientRect() : null;
    const larguraView = rect && rect.width ? rect.width : 900;
    const alturaView = rect && rect.height ? rect.height : 600;
    const escala = Math.min(
      (larguraView - margem * 2) / lim.largura,
      (alturaView - margem * 2) / lim.altura,
    );
    this.zoom = Math.min(1, Math.max(0.15, +escala.toFixed(3)));
    this.panX = Math.round(larguraView / 2 - (lim.minX + lim.largura / 2) * this.zoom);
    this.panY = Math.round(alturaView / 2 - (lim.minY + lim.altura / 2) * this.zoom);
  }

  /** Alterna o tema do gráfico entre escuro (atual) e claro (fundo branco, traços escuros). */
  alternarTema(): void {
    this.temaClaro = !this.temaClaro;
    if (this.temaClaro) {
      this.backupTema = {
        nos: new Map(this.nos.map((n) => [n.id, { f: n.corFundo, b: n.corBorda, t: n.corTexto }])),
        con: new Map(this.conexoes.map((c) => [c.id, c.cor])),
        padrao: {
          corFundo: this.padrao.corFundo,
          corBorda: this.padrao.corBorda,
          corTexto: this.padrao.corTexto,
          corLinha: this.padrao.corLinha,
        },
      };
      const borda = '#1f2937';
      const texto = '#111827';
      const fundo = '#ffffff';
      const linha = '#334155';
      this.nos.forEach((n) => {
        n.corFundo = fundo;
        n.corBorda = borda;
        n.corTexto = texto;
      });
      this.conexoes.forEach((c) => (c.cor = linha));
      this.padrao.corFundo = fundo;
      this.padrao.corBorda = borda;
      this.padrao.corTexto = texto;
      this.padrao.corLinha = linha;
    } else if (this.backupTema) {
      const bk = this.backupTema;
      this.nos.forEach((n) => {
        const o = bk.nos.get(n.id);
        if (o) {
          n.corFundo = o.f;
          n.corBorda = o.b;
          n.corTexto = o.t;
        }
      });
      this.conexoes.forEach((c) => {
        const o = bk.con.get(c.id);
        if (o !== undefined) c.cor = o;
      });
      this.padrao.corFundo = bk.padrao.corFundo;
      this.padrao.corBorda = bk.padrao.corBorda;
      this.padrao.corTexto = bk.padrao.corTexto;
      this.padrao.corLinha = bk.padrao.corLinha;
      this.backupTema = null;
    }
    this.salvar();
  }

  /** Filtro SVG (giz/lápis) correspondente ao tipo de traço. */
  filtroTraco(tipo: TipoTraco): string | null {
    if (tipo === 'giz') return 'url(#traco-giz)';
    if (tipo === 'lapis') return 'url(#traco-lapis)';
    return null;
  }

  aoRolar(evento: WheelEvent): void {
    if (!evento.ctrlKey) return;
    evento.preventDefault();
    this.aplicarZoom(evento.deltaY < 0 ? 1.1 : 0.9);
  }

  // ─────────────────────── Geometria das formas ───────────────────────

  cx(no: NoFluxograma): number {
    return no.x + no.largura / 2;
  }
  cy(no: NoFluxograma): number {
    return no.y + no.altura / 2;
  }

  escalaImagem(no: NoFluxograma): number {
    return this.normalizarEscalaImagem(no.escalaImagem ?? 1);
  }

  imagemX(no: NoFluxograma): number {
    return no.x + (no.largura - this.imagemLargura(no)) / 2;
  }

  imagemY(no: NoFluxograma): number {
    return no.y + (no.altura - this.imagemAltura(no)) / 2;
  }

  imagemLargura(no: NoFluxograma): number {
    return no.largura * this.escalaImagem(no);
  }

  imagemAltura(no: NoFluxograma): number {
    return no.altura * this.escalaImagem(no);
  }

  raioIcone(no: NoFluxograma): number {
    return Math.min(this.raioBordaImagem(no), no.largura / 2, no.altura / 2);
  }

  raioBordaImagem(no: NoFluxograma): number {
    return this.normalizarRaioBordaImagem(no.raioBordaImagem ?? 18);
  }

  clipImagemId(no: NoFluxograma): string {
    return `clip-img-${no.id}`;
  }

  private normalizarEscalaImagem(valor: unknown): number {
    const n = Number(valor);
    if (!Number.isFinite(n)) return 1;
    return Math.min(1, Math.max(0.2, n));
  }

  private normalizarRaioBordaImagem(valor: unknown): number {
    const n = Number(valor);
    if (!Number.isFinite(n)) return 18;
    return Math.min(80, Math.max(0, n));
  }

  /** Ponto na borda do nó na direção de (px, py). */
  private pontoBorda(no: NoFluxograma, px: number, py: number): { x: number; y: number } {
    const cx = this.cx(no);
    const cy = this.cy(no);
    let dx = px - cx;
    let dy = py - cy;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };
    const rx = no.largura / 2;
    const ry = no.altura / 2;

    if (no.tipo === 'circulo' || no.tipo === 'elipse') {
      const ang = Math.atan2(dy, dx);
      return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
    }
    if (no.tipo === 'losango') {
      const t = 1 / (Math.abs(dx) / rx + Math.abs(dy) / ry);
      return { x: cx + dx * t, y: cy + dy * t };
    }
    // Retângulo e derivados.
    const escala = 1 / Math.max(Math.abs(dx) / rx, Math.abs(dy) / ry);
    return { x: cx + dx * escala, y: cy + dy * escala };
  }

  private controleConexao(a: NoFluxograma, b: NoFluxograma, curv: number): { x: number; y: number } {
    const mx = (this.cx(a) + this.cx(b)) / 2;
    const my = (this.cy(a) + this.cy(b)) / 2;
    if (!curv) return { x: mx, y: my };
    const dx = this.cx(b) - this.cx(a);
    const dy = this.cy(b) - this.cy(a);
    const len = Math.hypot(dx, dy) || 1;
    return { x: mx + (-dy / len) * curv, y: my + (dx / len) * curv };
  }

  pontosConexao(c: ConexaoFluxograma): { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number } | null {
    const a = this.nos.find((n) => n.id === c.de);
    const b = this.nos.find((n) => n.id === c.para);
    if (!a || !b) return null;
    const ctrl = this.controleConexao(a, b, c.curvatura || 0);
    const p1 = this.pontoBorda(a, ctrl.x, ctrl.y);
    const p2 = this.pontoBorda(b, ctrl.x, ctrl.y);
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, cx: ctrl.x, cy: ctrl.y };
  }

  /** Sequencia de ancoras [origem, ...pontos, destino] considerando os waypoints. */
  private anchorsConexao(c: ConexaoFluxograma): { x: number; y: number }[] | null {
    const a = this.nos.find((n) => n.id === c.de);
    const b = this.nos.find((n) => n.id === c.para);
    if (!a || !b) return null;
    const wp = c.pontos && c.pontos.length ? c.pontos : [];
    const primeiro = wp.length ? wp[0] : { x: this.cx(b), y: this.cy(b) };
    const ultimo = wp.length ? wp[wp.length - 1] : { x: this.cx(a), y: this.cy(a) };
    const start = this.pontoBorda(a, primeiro.x, primeiro.y);
    const end = this.pontoBorda(b, ultimo.x, ultimo.y);
    return [start, ...wp.map((p) => ({ x: p.x, y: p.y })), end];
  }

  /** Caminho SVG da conexao: reta/curva simples (sem pontos) ou tracado pelos waypoints. */
  caminhoConexao(c: ConexaoFluxograma): string | null {
    const a = this.nos.find((n) => n.id === c.de);
    const b = this.nos.find((n) => n.id === c.para);
    if (!a || !b) return null;
    const wp = c.pontos || [];
    if (!wp.length) {
      const ctrl = this.controleConexao(a, b, c.curvatura || 0);
      const p1 = this.pontoBorda(a, ctrl.x, ctrl.y);
      const p2 = this.pontoBorda(b, ctrl.x, ctrl.y);
      if (!c.curvatura) return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      return `M ${p1.x} ${p1.y} Q ${ctrl.x} ${ctrl.y} ${p2.x} ${p2.y}`;
    }
    const P = this.anchorsConexao(c);
    if (!P) return null;
    const estilo = c.estilo || 'arredondado';
    if (estilo === 'curvo') return this.caminhoSpline(P);
    if (estilo === 'reto') return this.caminhoReto(P);
    return this.caminhoArredondado(P, c.raioCanto ?? 50);
  }

  private caminhoReto(P: { x: number; y: number }[]): string {
    return `M ${P[0].x} ${P[0].y}` + P.slice(1).map((p) => ` L ${p.x} ${p.y}`).join('');
  }

  private caminhoArredondado(P: { x: number; y: number }[], raio: number): string {
    if (P.length < 3 || raio <= 0) return this.caminhoReto(P);
    let d = `M ${P[0].x} ${P[0].y}`;
    for (let i = 1; i < P.length - 1; i += 1) {
      const prev = P[i - 1];
      const cur = P[i];
      const next = P[i + 1];
      const r1 = Math.min(raio, this.distancia(prev, cur) / 2);
      const r2 = Math.min(raio, this.distancia(cur, next) / 2);
      const ent = this.pontoNaDirecao(cur, prev, r1);
      const sai = this.pontoNaDirecao(cur, next, r2);
      d += ` L ${ent.x} ${ent.y} Q ${cur.x} ${cur.y} ${sai.x} ${sai.y}`;
    }
    const f = P[P.length - 1];
    return d + ` L ${f.x} ${f.y}`;
  }

  private caminhoSpline(P: { x: number; y: number }[]): string {
    if (P.length < 3) return this.caminhoReto(P);
    let d = `M ${P[0].x} ${P[0].y}`;
    for (let i = 0; i < P.length - 1; i += 1) {
      const p0 = P[i - 1] || P[i];
      const p1 = P[i];
      const p2 = P[i + 1];
      const p3 = P[i + 2] || P[i + 1];
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
    }
    return d;
  }

  private distancia(a: { x: number; y: number }, b: { x: number; y: number }): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private pontoNaDirecao(
    de: { x: number; y: number },
    para: { x: number; y: number },
    dist: number,
  ): { x: number; y: number } {
    const l = this.distancia(de, para) || 1;
    return { x: de.x + ((para.x - de.x) / l) * dist, y: de.y + ((para.y - de.y) / l) * dist };
  }

  private distPontoSegmento(
    p: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number },
  ): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return this.distancia(p, a);
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return this.distancia(p, { x: a.x + t * dx, y: a.y + t * dy });
  }

  meioConexao(c: ConexaoFluxograma): { x: number; y: number } {
    const wp = c.pontos || [];
    if (!wp.length) {
      const p = this.pontosConexao(c);
      if (!p) return { x: 0, y: 0 };
      if (!c.curvatura) return { x: (p.x1 + p.x2) / 2, y: (p.y1 + p.y2) / 2 };
      return {
        x: 0.25 * p.x1 + 0.5 * p.cx + 0.25 * p.x2,
        y: 0.25 * p.y1 + 0.5 * p.cy + 0.25 * p.y2,
      };
    }
    const P = this.anchorsConexao(c);
    if (!P) return { x: 0, y: 0 };
    const mid = Math.floor(P.length / 2);
    if (P.length % 2 === 0) {
      return { x: (P[mid - 1].x + P[mid].x) / 2, y: (P[mid - 1].y + P[mid].y) / 2 };
    }
    return { x: P[mid].x, y: P[mid].y };
  }

  /** Pressionar a linha: prepara para criar um ponto se houver arraste. */
  aoPressionarLinha(evento: MouseEvent, c: ConexaoFluxograma): void {
    if (this.ferramenta !== 'selecionar') return;
    evento.stopPropagation();
    this.selecionar(c.id, 'conexao');
    const p = this.pontoCanvas(evento);
    this.pendenteLinha = { c, x: p.x, y: p.y };
  }

  /** Pressionar um ponto (waypoint) existente para arrasta-lo. */
  aoPressionarPonto(evento: MouseEvent, c: ConexaoFluxograma, indice: number): void {
    if (this.ferramenta !== 'selecionar') return;
    evento.stopPropagation();
    this.selecionar(c.id, 'conexao');
    this.curvando = c;
    this.arrastePontoIndice = indice;
    this.curvouMovimento = false;
  }

  removerPonto(evento: MouseEvent, c: ConexaoFluxograma, indice: number): void {
    evento.stopPropagation();
    evento.preventDefault();
    if (!c.pontos) return;
    c.pontos.splice(indice, 1);
    if (!c.pontos.length) c.pontos = undefined;
    this.salvar();
  }

  private inserirPonto(c: ConexaoFluxograma, p: { x: number; y: number }): number {
    if (!c.estilo) c.estilo = 'arredondado';
    const anc = this.anchorsConexao(c);
    let idx = 0;
    if (anc && anc.length >= 2) {
      let dist = Infinity;
      for (let k = 0; k < anc.length - 1; k += 1) {
        const d = this.distPontoSegmento(p, anc[k], anc[k + 1]);
        if (d < dist) {
          dist = d;
          idx = k;
        }
      }
    }
    if (!c.pontos) c.pontos = [];
    c.pontos.splice(idx, 0, { x: Math.round(p.x), y: Math.round(p.y) });
    return idx;
  }

  private moverPonto(evento: MouseEvent): void {
    const c = this.curvando;
    if (!c || !c.pontos || this.arrastePontoIndice < 0) return;
    const pt = c.pontos[this.arrastePontoIndice];
    if (!pt) return;
    const p = this.pontoCanvas(evento);
    pt.x = Math.round(p.x);
    pt.y = Math.round(p.y);
    this.curvouMovimento = true;
  }

  setRaioCanto(c: ConexaoFluxograma, v: string): void {
    c.raioCanto = Math.max(0, Math.round(+v));
    this.salvar();
  }

  limparPontos(c: ConexaoFluxograma): void {
    c.pontos = undefined;
    c.curvatura = 0;
    this.salvar();
  }

  marcadorSetaId(c: ConexaoFluxograma, lado: 'inicio' | 'fim'): string {
    return `seta-${lado}-${String(c.id).replace(/[^A-Za-z0-9_-]/g, '_')}`;
  }

  tamanhoSetaConexao(c: ConexaoFluxograma): number {
    return this.normalizarTamanhoSeta(c.tamanhoSeta);
  }

  private normalizarTamanhoSeta(valor: unknown): number {
    const n = Number(valor);
    if (!Number.isFinite(n)) return TAMANHO_SETA_PADRAO;
    return Math.min(24, Math.max(3, n));
  }

  private normalizarTamanhoSetas(): void {
    this.conexoes.forEach((c) => {
      c.tamanhoSeta = this.normalizarTamanhoSeta(c.tamanhoSeta);
    });
  }

  /** Pontos do polígono (losango, paralelogramo, hexágono) em coordenadas absolutas. */
  pontosPoligono(no: NoFluxograma): string {
    const { x, y, largura: w, altura: h } = no;
    if (no.tipo === 'losango') {
      return `${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`;
    }
    if (no.tipo === 'paralelogramo') {
      const d = w * 0.22;
      return `${x + d},${y} ${x + w},${y} ${x + w - d},${y + h} ${x},${y + h}`;
    }
    if (no.tipo === 'hexagono') {
      const d = w * 0.18;
      return `${x + d},${y} ${x + w - d},${y} ${x + w},${y + h / 2} ${x + w - d},${y + h} ${x + d},${y + h} ${x},${y + h / 2}`;
    }
    return '';
  }

  /** Caminho do cilindro (banco de dados). */
  caminhoCilindro(no: NoFluxograma): string {
    const { x, y, largura: w, altura: h } = no;
    const r = Math.min(h * 0.18, 14);
    return (
      `M ${x} ${y + r} ` +
      `A ${w / 2} ${r} 0 0 1 ${x + w} ${y + r} ` +
      `L ${x + w} ${y + h - r} ` +
      `A ${w / 2} ${r} 0 0 1 ${x} ${y + h - r} ` +
      `Z`
    );
  }

  caminhoTopoCilindro(no: NoFluxograma): string {
    const { x, y, largura: w } = no;
    const r = Math.min(no.altura * 0.18, 14);
    return `M ${x} ${y + r} A ${w / 2} ${r} 0 0 0 ${x + w} ${y + r}`;
  }

  raioArredondado(no: NoFluxograma): number {
    if (no.tipo === 'terminador') return no.altura / 2;
    if (no.tipo === 'arredondado') return 14;
    return 0;
  }

  // ─────────────────────── Redimensionamento ───────────────────────

  /** Tamanho das alças (constante em pixels de tela, independente do zoom). */
  tamAlca(): number {
    return 9 / this.zoom;
  }

  /** Posições das 8 alças ao redor do nó. */
  alcas(no: NoFluxograma): { x: number; y: number; canto: string; cursor: string }[] {
    const { x, y, largura: w, altura: h } = no;
    return [
      { x, y, canto: 'nw', cursor: 'nwse-resize' },
      { x: x + w / 2, y, canto: 'n', cursor: 'ns-resize' },
      { x: x + w, y, canto: 'ne', cursor: 'nesw-resize' },
      { x: x + w, y: y + h / 2, canto: 'e', cursor: 'ew-resize' },
      { x: x + w, y: y + h, canto: 'se', cursor: 'nwse-resize' },
      { x: x + w / 2, y: y + h, canto: 's', cursor: 'ns-resize' },
      { x, y: y + h, canto: 'sw', cursor: 'nesw-resize' },
      { x, y: y + h / 2, canto: 'w', cursor: 'ew-resize' },
    ];
  }

  iniciarResize(evento: MouseEvent, no: NoFluxograma, canto: string): void {
    evento.stopPropagation();
    evento.preventDefault();
    this.selecionar(no.id, 'no');
    this.redimensionando = no;
    this.resizeCanto = canto;
    const p = this.pontoCanvas(evento);
    this.resizeIniX = p.x;
    this.resizeIniY = p.y;
    this.resizeBounds = { x: no.x, y: no.y, largura: no.largura, altura: no.altura };
  }

  private redimensionar(evento: MouseEvent): void {
    if (!this.redimensionando) return;
    const p = this.pontoCanvas(evento);
    const dx = p.x - this.resizeIniX;
    const dy = p.y - this.resizeIniY;
    const b = this.resizeBounds;
    const c = this.resizeCanto;
    const min = 24;

    let nw = b.largura;
    let nh = b.altura;
    if (c.includes('e')) nw = b.largura + dx;
    if (c.includes('w')) nw = b.largura - dx;
    if (c.includes('s')) nh = b.altura + dy;
    if (c.includes('n')) nh = b.altura - dy;

    // Imagens mantêm a proporção original para não distorcer.
    if (this.redimensionando.tipo === 'imagem') {
      const aspect = b.largura / b.altura || 1;
      if (c === 'n' || c === 's') nw = nh * aspect;
      else nh = nw / aspect;
    }

    nw = Math.max(min, Math.round(nw));
    nh = Math.max(min, Math.round(nh));

    let nx = b.x;
    let ny = b.y;
    if (c.includes('w')) nx = b.x + b.largura - nw;
    if (c.includes('n')) ny = b.y + b.altura - nh;

    const no = this.redimensionando;
    no.largura = nw;
    no.altura = nh;
    no.x = Math.round(nx);
    no.y = Math.round(ny);
  }

  /** Quebra o texto em linhas para renderizar em tspans. */
  linhasTexto(no: NoFluxograma): string[] {
    const bruto = (no.texto || '').split(/\r?\n/);
    const maxChars = Math.max(6, Math.floor(no.largura / 8));
    const linhas: string[] = [];
    for (const parte of bruto) {
      if (parte.length <= maxChars) {
        linhas.push(parte);
        continue;
      }
      const palavras = parte.split(/\s+/);
      let atual = '';
      for (const p of palavras) {
        if ((atual + ' ' + p).trim().length > maxChars && atual) {
          linhas.push(atual);
          atual = p;
        } else {
          atual = (atual + ' ' + p).trim();
        }
      }
      if (atual) linhas.push(atual);
    }
    return linhas.length ? linhas : [''];
  }

  editarTextoNo(evento: MouseEvent, no: NoFluxograma): void {
    evento.stopPropagation();
    evento.preventDefault();
    if (no.tipo === 'imagem') return;
    this.selecionar(no.id, 'no');
    this.editorTextoInline = {
      tipo: 'no',
      id: no.id,
      texto: no.texto,
      left: this.panX + no.x * this.zoom + 8,
      top: this.panY + no.y * this.zoom + 8,
      width: Math.max(90, no.largura * this.zoom - 16),
      height: Math.max(34, no.altura * this.zoom - 16),
    };
    this.focarEditorInline();
  }

  editarTextoConexao(evento: MouseEvent, c: ConexaoFluxograma): void {
    evento.stopPropagation();
    evento.preventDefault();
    this.selecionar(c.id, 'conexao');
    const meio = this.meioConexao(c);
    const largura = Math.max(120, Math.min(260, (c.texto || 'Rotulo').length * 8 + 48));
    this.editorTextoInline = {
      tipo: 'conexao',
      id: c.id,
      texto: c.texto,
      left: this.panX + meio.x * this.zoom - largura / 2,
      top: this.panY + meio.y * this.zoom - 18,
      width: largura,
      height: 36,
    };
    this.focarEditorInline();
  }

  confirmarEdicaoTextoInline(): void {
    const ed = this.editorTextoInline;
    if (!ed) return;
    const texto = ed.texto.trim();
    if (ed.tipo === 'no') {
      const no = this.nos.find((n) => n.id === ed.id);
      if (no) no.texto = texto;
    } else {
      const conexao = this.conexoes.find((c) => c.id === ed.id);
      if (conexao) conexao.texto = texto;
    }
    this.editorTextoInline = null;
    this.salvar();
  }

  cancelarEdicaoTextoInline(): void {
    this.editorTextoInline = null;
  }

  aoTeclarEditorInline(evento: KeyboardEvent): void {
    if (evento.key === 'Escape') {
      evento.preventDefault();
      this.cancelarEdicaoTextoInline();
      return;
    }
    if (evento.key === 'Enter' && (evento.ctrlKey || evento.metaKey)) {
      evento.preventDefault();
      this.confirmarEdicaoTextoInline();
    }
  }

  private focarEditorInline(): void {
    setTimeout(() => {
      const el = this.editorTextoInlineEl?.nativeElement;
      el?.focus();
      el?.select();
    });
  }

  // ─────────────────────── Import / Export ───────────────────────

  get fluxograma(): Fluxograma {
    return { nos: this.nos, conexoes: this.conexoes };
  }

  abrirPainelDados(formato: Formato): void {
    this.formato = formato;
    this.painelDados = true;
    this.gerar();
  }

  gerar(): void {
    this.mensagem = '';
    this.textoDados =
      this.formato === 'mermaid'
        ? this.fluxogramaService.paraMermaid(this.fluxograma)
        : this.fluxogramaService.paraXml(this.fluxograma);
  }

  aplicar(): void {
    try {
      const fluxo =
        this.formato === 'mermaid'
          ? this.fluxogramaService.deMermaid(this.textoDados)
          : this.fluxogramaService.deXml(this.textoDados);
      this.carregar(fluxo);
      this.mensagem = `Diagrama importado: ${fluxo.nos.length} formas, ${fluxo.conexoes.length} conexões.`;
    } catch (e) {
      this.mensagem = 'Erro ao importar: ' + (e instanceof Error ? e.message : 'formato inválido.');
    }
  }

  private carregar(fluxo: Fluxograma): void {
    this.nos = fluxo.nos;
    this.conexoes = fluxo.conexoes;
    this.normalizarTamanhoSetas();
    this.limparSelecao();
    // Ajusta o contador para evitar colisão de ids.
    const nums = [...this.nos, ...this.conexoes]
      .map((x) => parseInt(x.id.replace(/^\D+/, ''), 10))
      .filter((n) => Number.isFinite(n));
    this.contador = nums.length ? Math.max(...nums) : 0;
    this.resetarView();
    this.salvar();
  }

  copiar(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.textoDados).then(() => {
      this.copiado = true;
      setTimeout(() => (this.copiado = false), 2000);
    });
  }

  baixar(): void {
    if (typeof document === 'undefined') return;
    const ext = this.formato === 'mermaid' ? 'mmd' : 'xml';
    const mime = this.formato === 'mermaid' ? 'text/plain' : 'application/xml';
    const blob = new Blob([this.textoDados], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fluxograma.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  carregarArquivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      const conteudo = String(leitor.result || '');
      this.textoDados = conteudo;
      const inicio = conteudo.trimStart();
      this.formato = inicio.startsWith('<') || arquivo.name.endsWith('.xml') ? 'xml' : 'mermaid';
      this.painelDados = true;
      this.aplicar();
      input.value = '';
    };
    leitor.readAsText(arquivo);
  }

  async importarImagemFluxograma(evento: Event): Promise<void> {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    input.value = '';
    if (!arquivo) return;

    this.importandoImagem = true;
    this.progressoImportacaoImagem = 0;
    this.etapaImportacaoImagem = 'Preparando imagem';
    this.erroImportacaoImagem = '';
    this.fluxogramaDetectado = null;
    this.fluxogramaImportacao = null;
    this.painelRevisaoImagem = false;

    try {
      const detectado = await this.importadorImagem.importarImagem(arquivo, (p: FlowchartImageImportProgress) => {
        this.progressoImportacaoImagem = p.progress;
        this.etapaImportacaoImagem = p.message;
        this.cdr.detectChanges();
      });
      this.fluxogramaDetectado = detectado;
      this.fluxogramaImportacao = this.importadorImagem.converterParaFluxograma(detectado, {
        corFundo: this.padrao.corFundo,
        corBorda: this.padrao.corBorda,
        corTexto: this.padrao.corTexto,
        corLinha: this.padrao.corLinha,
        tamanhoSeta: this.padrao.tamanhoSeta,
        tipoTraco: this.padrao.tipoTraco,
      });
      this.painelRevisaoImagem = true;
    } catch (e) {
      this.erroImportacaoImagem = e instanceof Error ? e.message : 'Nao foi possivel importar a imagem.';
      this.avisar(this.erroImportacaoImagem);
    } finally {
      this.importandoImagem = false;
      this.progressoImportacaoImagem = 0;
      this.etapaImportacaoImagem = '';
      this.cdr.detectChanges();
    }
  }

  confirmarImportacaoImagem(): void {
    if (!this.fluxogramaImportacao) return;
    this.carregar(this.fluxogramaImportacao);
    this.ajustarZoomParaConteudo();
    this.salvar();
    this.painelRevisaoImagem = false;
    this.fluxogramaDetectado = null;
    this.fluxogramaImportacao = null;
  }

  cancelarImportacaoImagem(): void {
    this.painelRevisaoImagem = false;
    this.fluxogramaDetectado = null;
    this.fluxogramaImportacao = null;
  }

  classeConfianca(valor: number): string {
    if (valor < 0.45) return 'baixa';
    if (valor < 0.65) return 'media';
    return 'alta';
  }

  rotuloTipoDetectado(tipo: DetectedFlowchart['nodes'][number]['type']): string {
    switch (tipo) {
      case 'process':
        return 'Processo';
      case 'decision':
        return 'Decisao';
      case 'terminator':
        return 'Terminador';
      case 'inputOutput':
        return 'Entrada/Saida';
      case 'circle':
        return 'Circulo';
      default:
        return 'Desconhecido';
    }
  }

  private get fundoExport(): string {
    return this.temaClaro ? '#ffffff' : '#061326';
  }

  /** Limites do conteúdo (todas as formas). */
  private limitesConteudo(): { minX: number; minY: number; largura: number; altura: number } | null {
    if (!this.nos.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of this.nos) {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.largura);
      maxY = Math.max(maxY, n.y + n.altura);
    }
    // Inclui a geometria das ligações — curvas e waypoints podem extrapolar as formas.
    for (const c of this.conexoes) {
      for (const p of this.pontosLimiteConexao(c)) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      }
    }
    const pad = 32;
    return { minX: minX - pad, minY: minY - pad, largura: maxX - minX + pad * 2, altura: maxY - minY + pad * 2 };
  }

  /** Pontos que delimitam a geometria de uma ligação (extremidades, waypoints e ponto de controle). */
  private pontosLimiteConexao(c: ConexaoFluxograma): { x: number; y: number }[] {
    const a = this.nos.find((n) => n.id === c.de);
    const b = this.nos.find((n) => n.id === c.para);
    if (!a || !b) return [];
    const wp = c.pontos || [];
    if (!wp.length) {
      const ctrl = this.controleConexao(a, b, c.curvatura || 0);
      const p1 = this.pontoBorda(a, ctrl.x, ctrl.y);
      const p2 = this.pontoBorda(b, ctrl.x, ctrl.y);
      return c.curvatura ? [p1, p2, ctrl] : [p1, p2];
    }
    return this.anchorsConexao(c) || [];
  }

  /** Constrói um SVG autônomo, recortado ao conteúdo e com setas coloridas embutidas. */
  private construirSvgExport(
    fundo: string | null,
    semPreenchimento = false,
  ): { svg: string; largura: number; altura: number } | null {
    if (typeof document === 'undefined' || !this.svgCanvas) return null;
    const lim = this.limitesConteudo();
    if (!lim) return null;

    const ns = 'http://www.w3.org/2000/svg';
    const clone = this.svgCanvas.nativeElement.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', ns);
    clone.setAttribute('width', String(lim.largura));
    clone.setAttribute('height', String(lim.altura));
    clone.setAttribute('viewBox', `${lim.minX} ${lim.minY} ${lim.largura} ${lim.altura}`);
    clone.removeAttribute('class');

    // Remove a escala/pan do grupo de conteúdo (mantém os transforms de rótulo).
    clone.querySelectorAll('g').forEach((g) => {
      const t = g.getAttribute('transform');
      if (t && t.includes('scale')) g.removeAttribute('transform');
    });

    clone.querySelector('.fundo-grade')?.remove();
    clone.querySelectorAll('.conexao-hit, .contorno-selecao, .alca, .ponto-ligacao').forEach((el) => el.remove());

    // Estilos essenciais embutidos (o SVG exportado não carrega o CSS do componente).
    const estilo = document.createElementNS(ns, 'style');
    estilo.textContent =
      "text{font-family:Roboto,'Helvetica Neue',Arial,sans-serif;}" +
      '.no-texto{font-size:13px;font-weight:600;}' +
      '.conexao-rotulo{font-size:12px;font-weight:600;}' +
      '.conexao-linha{fill:none;}';
    clone.insertBefore(estilo, clone.firstChild);

    const defs = clone.querySelector('defs');
    // Substitui as setas por marcadores coloridos por conexão (context-stroke não é confiável fora do DOM).
    if (defs) {
      let i = 0;
      clone.querySelectorAll('.conexao-linha').forEach((linha) => {
        const cor = linha.getAttribute('stroke') || '#5b7cff';
        const tamanho = this.normalizarTamanhoSeta(linha.getAttribute('data-tamanho-seta'));
        if (linha.getAttribute('marker-end')) {
          const id = `exp-fim-${i}`;
          defs.appendChild(this.criarMarcador(ns, id, cor, true, tamanho));
          linha.setAttribute('marker-end', `url(#${id})`);
        }
        if (linha.getAttribute('marker-start')) {
          const id = `exp-ini-${i}`;
          defs.appendChild(this.criarMarcador(ns, id, cor, false, tamanho));
          linha.setAttribute('marker-start', `url(#${id})`);
        }
        linha.removeAttribute('data-tamanho-seta');
        i += 1;
      });
    }

    // Fundo sólido (para JPG/PDF).
    if (fundo) {
      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', String(lim.minX));
      rect.setAttribute('y', String(lim.minY));
      rect.setAttribute('width', String(lim.largura));
      rect.setAttribute('height', String(lim.altura));
      rect.setAttribute('fill', fundo);
      clone.insertBefore(rect, defs ? defs.nextSibling : clone.firstChild);
    }

    // Preenchimentos transparentes: mantém apenas bordas, texto e linhas.
    if (semPreenchimento) {
      clone.querySelectorAll('rect, ellipse, polygon, path').forEach((el) => {
        if (el.closest('defs')) return;
        el.setAttribute('fill', 'none');
        el.removeAttribute('fill-opacity');
      });
    }

    const svg = new XMLSerializer().serializeToString(clone);
    return { svg, largura: lim.largura, altura: lim.altura };
  }

  private criarMarcador(ns: string, id: string, cor: string, _fim: boolean, tamanho = TAMANHO_SETA_PADRAO): SVGMarkerElement {
    const marker = document.createElementNS(ns, 'marker') as SVGMarkerElement;
    const tamanhoSeguro = this.normalizarTamanhoSeta(tamanho);
    marker.setAttribute('id', id);
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', String(tamanhoSeguro));
    marker.setAttribute('markerHeight', String(tamanhoSeguro));
    marker.setAttribute('orient', 'auto-start-reverse');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    path.setAttribute('fill', cor);
    marker.appendChild(path);
    return marker;
  }

  private salvarBlob(blob: Blob, nome: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Rasteriza o diagrama para um blob PNG/JPEG. */
  private rasterizar(mime: string, fundo: string | null, escala = 2, semPreenchimento = false): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const dados = this.construirSvgExport(fundo, semPreenchimento);
      if (!dados) {
        reject(new Error('Adicione ao menos uma forma ao diagrama.'));
        return;
      }
      const blob = new Blob([dados.svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(dados.largura * escala));
        canvas.height = Math.max(1, Math.round(dados.altura * escala));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas indisponível.'));
          return;
        }
        if (fundo) {
          ctx.fillStyle = fundo;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao gerar a imagem.'))), mime, 0.95);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Falha ao renderizar o diagrama.'));
      };
      img.src = url;
    });
  }

  baixarSvg(): void {
    const dados = this.construirSvgExport(null);
    if (!dados) {
      this.avisar('Adicione ao menos uma forma ao diagrama.');
      return;
    }
    this.salvarBlob(new Blob([dados.svg], { type: 'image/svg+xml' }), 'fluxograma.svg');
  }

  baixarPng(): void {
    this.rasterizar('image/png', this.fundoExport)
      .then((b) => this.salvarBlob(b, 'fluxograma.png'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  /** PNG com fundo transparente e formas sem preenchimento (apenas contornos). */
  baixarPngTransparente(): void {
    this.rasterizar('image/png', null, 2, true)
      .then((b) => this.salvarBlob(b, 'fluxograma-transparente.png'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  baixarJpg(): void {
    this.rasterizar('image/jpeg', this.fundoExport)
      .then((b) => this.salvarBlob(b, 'fluxograma.jpg'))
      .catch((e) => this.avisar(e instanceof Error ? e.message : 'Erro ao exportar.'));
  }

  async baixarPdf(): Promise<void> {
    try {
      const blob = await this.rasterizar('image/png', this.fundoExport);
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const pdf = await PDFDocument.create();
      const png = await pdf.embedPng(bytes);
      const page = pdf.addPage([png.width, png.height]);
      page.drawImage(png, { x: 0, y: 0, width: png.width, height: png.height });
      const saida = await pdf.save();
      this.salvarBlob(new Blob([saida], { type: 'application/pdf' }), 'fluxograma.pdf');
    } catch (e) {
      this.avisar(e instanceof Error ? e.message : 'Erro ao exportar PDF.');
    }
  }

  private avisar(texto: string): void {
    this.aviso = texto;
    setTimeout(() => (this.aviso = ''), 3500);
  }

  // ─────────────────────── Persistência (localStorage) ───────────────────────

  salvar(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(
        this.chaveLocal,
        JSON.stringify({
          nos: this.nos,
          conexoes: this.conexoes,
          zoom: this.zoom,
          panX: this.panX,
          panY: this.panY,
          temaClaro: this.temaClaro,
          padrao: this.padrao,
          contador: this.contador,
        }),
      );
    } catch {
      /* localStorage cheio ou indisponível — ignora */
    }
  }

  private carregarLocal(): boolean {
    if (typeof localStorage === 'undefined') return false;
    try {
      const raw = localStorage.getItem(this.chaveLocal);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (!Array.isArray(d.nos) || !Array.isArray(d.conexoes)) return false;
      this.nos = d.nos;
      this.conexoes = d.conexoes;
      this.zoom = d.zoom ?? 1;
      this.panX = d.panX ?? 40;
      this.panY = d.panY ?? 40;
      this.temaClaro = !!d.temaClaro;
      if (d.padrao) this.padrao = { ...this.padrao, ...d.padrao };
      this.padrao.tamanhoSeta = this.normalizarTamanhoSeta(this.padrao.tamanhoSeta);
      this.normalizarTamanhoSetas();
      this.contador = d.contador ?? 0;
      return true;
    } catch {
      return false;
    }
  }

  /** Baixa a versão HTML standalone (offline) da ferramenta. */
  async baixarOffline(): Promise<void> {
    if (typeof fetch === 'undefined') return;
    try {
      const resp = await fetch('assets/fluxograma-offline.html');
      if (!resp.ok) throw new Error('arquivo não encontrado');
      const texto = await resp.text();
      this.salvarBlob(new Blob([texto], { type: 'text/html' }), 'fluxograma-offline.html');
    } catch {
      this.avisar('Não foi possível baixar o arquivo offline.');
    }
  }

  // ─────────────────────── Ações gerais ───────────────────────

  limparTudo(): void {
    this.nos = [];
    this.conexoes = [];
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.contador = 0;
    this.salvar();
  }

  private exemplo(): void {
    this.limparTudo();
    const inicio = this.criarNo('terminador', 160, 70);
    inicio.texto = 'Início';
    const proc = this.criarNo('retangulo', 160, 200);
    proc.texto = 'Processar dados';
    const dec = this.criarNo('losango', 160, 340);
    dec.texto = 'Válido?';
    const fim = this.criarNo('terminador', 400, 340);
    fim.texto = 'Fim';
    this.criarConexao(inicio.id, proc.id);
    this.criarConexao(proc.id, dec.id);
    const cSim = this.criarConexao(dec.id, fim.id);
    cSim.texto = 'Sim';
    const cNao = this.criarConexao(dec.id, proc.id);
    cNao.texto = 'Não';
    cNao.tracejada = true;
    this.selecionadoId = null;
    this.selecionadoTipo = null;
    this.salvar();
  }

  // Helpers de binding numérico para inputs range.
  setEspessuraBorda(no: NoFluxograma, v: string): void {
    no.espessuraBorda = +v;
    this.salvar();
  }

  ehSemCor(cor: string | null | undefined): boolean {
    return !cor || cor === 'transparent' || cor === 'none' || cor === 'rgba(0,0,0,0)';
  }

  corParaInput(cor: string | null | undefined): string {
    if (this.ehSemCor(cor)) return '#ffffff';
    return /^#[0-9a-f]{6}$/i.test(cor || '') ? String(cor) : '#ffffff';
  }

  setCorFundo(no: NoFluxograma, cor: string): void {
    no.corFundo = cor;
    this.salvar();
  }

  setSemCorFundo(no: NoFluxograma): void {
    no.corFundo = 'transparent';
    this.salvar();
  }

  setCorFundoPadrao(cor: string): void {
    this.padrao.corFundo = cor;
    this.salvar();
  }

  setSemCorFundoPadrao(): void {
    this.padrao.corFundo = 'transparent';
    this.salvar();
  }

  setEspessuraLinha(c: ConexaoFluxograma, v: string): void {
    c.espessura = +v;
    this.salvar();
  }

  setTamanhoSeta(c: ConexaoFluxograma, v: string): void {
    c.tamanhoSeta = this.normalizarTamanhoSeta(v);
    this.salvar();
  }

  setTamanhoSetaPadrao(v: string): void {
    this.padrao.tamanhoSeta = this.normalizarTamanhoSeta(v);
    this.salvar();
  }

  setEscalaImagem(no: NoFluxograma, v: string): void {
    no.escalaImagem = this.normalizarEscalaImagem(Number(v) / 100);
    this.salvar();
  }

  setRaioBordaImagem(no: NoFluxograma, v: string): void {
    no.raioBordaImagem = this.normalizarRaioBordaImagem(v);
    this.salvar();
  }

  setCurvatura(c: ConexaoFluxograma, v: string): void {
    c.curvatura = Math.round(+v);
    this.salvar();
  }

  endireitarConexao(c: ConexaoFluxograma): void {
    c.curvatura = 0;
    this.salvar();
  }

  larguraRotulo(texto: string, max: number): number {
    return Math.min(max, Math.max(40, (texto ? texto.length : 0) * 7 + 20));
  }

  trackNo(_: number, n: NoFluxograma): string {
    return n.id;
  }

  trackConexao(_: number, c: ConexaoFluxograma): string {
    return c.id;
  }
}
