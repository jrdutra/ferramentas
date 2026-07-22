import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { buildGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { API_GATEWAYS_ES_BLOCKS } from './api-gateways-content.data';

@Component({ selector: 'app-api-gateways-conceptos-arquitectura-es', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent], templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class ApiGatewaysConceptosArquitecturaEsComponent implements OnInit {
  readonly chapterLabel='Capítulo 21'; readonly seriesName='Fundamentos y Arquitectura de APIs Corporativas'; readonly articleTitle='API Gateways: conceptos y arquitectura';
  readonly articleLead='De la terminación de conexiones a la aplicación de políticas, gobernanza, observabilidad y alta disponibilidad en plataformas corporativas de APIs';
  readonly editionNote='Edición en profundidad - material de estudio y consulta profesional'; readonly byLabel='Por'; readonly dateLabel='21 de julio de 2026'; readonly integralLabel='Material completo'; readonly tocLabel='En este capítulo'; readonly backLabel='Volver a Learn';
  readonly coverImage='/assets/learn/api-gateways-architecture-cover.png'; readonly coverAlt='API Gateway central que media consumidores, políticas y servicios backend'; readonly footerText='Fin del Capítulo 21 de Fundamentos y Arquitectura de APIs Corporativas.'; readonly footerLink='Volver a todos los contenidos Learn'; readonly blocks=API_GATEWAYS_ES_BLOCKS; readonly glossary=buildGlossary(this.blocks,'es');
  readonly tocItems=this.blocks.reduce<Array<{id:string;label:string}>>((a,b)=>{if(b.kind==='heading'&&b.level===2&&b.id)a.push({id:b.id,label:b.text});return a;},[]);
  constructor(private readonly dataService:DataService){} ngOnInit():void{this.dataService.setTituloAplicacao(this.articleTitle);}
}
