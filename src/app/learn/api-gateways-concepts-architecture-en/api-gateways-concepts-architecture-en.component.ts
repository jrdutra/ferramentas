import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { extractGlossary } from '../glossary/glossary.model';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { API_GATEWAYS_EN_BLOCKS } from './api-gateways-content.data';

@Component({ selector: 'app-api-gateways-concepts-architecture-en', standalone: true, imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent], templateUrl: '../localized-article.component.html', styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class ApiGatewaysConceptsArchitectureEnComponent implements OnInit {
  readonly chapterLabel='Chapter 21'; readonly seriesName='Corporate API Fundamentals and Architecture'; readonly articleTitle='API Gateways: Concepts and Architecture';
  readonly articleLead='From connection termination to policy enforcement, governance, observability, and high availability in enterprise API platforms';
  readonly editionNote='In-depth edition - study material and professional reference'; readonly byLabel='By'; readonly dateLabel='July 21, 2026'; readonly integralLabel='Complete material'; readonly tocLabel='In this chapter'; readonly backLabel='Back to Learn';
  readonly coverImage='/assets/learn/api-gateways-architecture-cover.png'; readonly coverAlt='Central API Gateway mediating consumers, policies, and backend services'; readonly footerText='End of Chapter 21 of Corporate API Fundamentals and Architecture.'; readonly footerLink='Back to all Learn content'; readonly blocks=API_GATEWAYS_EN_BLOCKS; readonly glossary=extractGlossary(this.blocks);
  readonly tocItems=this.blocks.reduce<Array<{id:string;label:string}>>((a,b)=>{if(b.kind==='heading'&&b.level===2&&b.id)a.push({id:b.id,label:b.text});return a;},[]);
  constructor(private readonly dataService:DataService){} ngOnInit():void{this.dataService.setTituloAplicacao(this.articleTitle);}
}
