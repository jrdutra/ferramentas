import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { API_GATEWAYS_PT_BLOCKS } from './api-gateways-content.data';

@Component({ selector: 'app-api-gateways-conceitos-arquitetura-pt', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent], templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class ApiGatewaysConceitosArquiteturaPtComponent implements OnInit {
  readonly chapterLabel='Capítulo 21'; readonly seriesName='Fundamentos e Arquitetura de APIs Corporativas'; readonly articleTitle='API Gateways: conceitos e arquitetura';
  readonly articleLead='Da terminação de conexões à aplicação de políticas, governança, observabilidade e alta disponibilidade em plataformas corporativas de APIs';
  readonly editionNote='Edição aprofundada - material de estudo e consulta profissional'; readonly byLabel='Por'; readonly dateLabel='21 de julho de 2026'; readonly integralLabel='Material integral'; readonly tocLabel='Neste capítulo'; readonly backLabel='Voltar para Learn';
  readonly coverImage='/assets/learn/api-gateways-architecture-cover.png'; readonly coverAlt='API Gateway central mediando consumidores, políticas e serviços de backend'; readonly footerText='Fim do Capítulo 21 de Fundamentos e Arquitetura de APIs Corporativas.'; readonly footerLink='Voltar para todos os conteúdos Learn'; readonly blocks=API_GATEWAYS_PT_BLOCKS; readonly glossary=buildGlossary(this.blocks,'pt');
  readonly tocItems=this.blocks.reduce<Array<{id:string;label:string}>>((a,b)=>{if(b.kind==='heading'&&b.level===2&&b.id)a.push({id:b.id,label:b.text});return a;},[]);
  constructor(private readonly dataService:DataService){} ngOnInit():void{this.dataService.setTituloAplicacao(this.articleTitle);}
}
