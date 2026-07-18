import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { GlossaryTextComponent } from '../glossary/glossary-text.component';
import { ArticleReadToggleComponent } from '../reading-progress/article-read-toggle.component';
import { TopicReadToggleComponent } from '../reading-progress/topic-read-toggle.component';
import { extractGlossary } from '../glossary/glossary.model';
import { CERTIFICATES_EN_CHAPTER_BLOCKS } from './certificates-content.data';

@Component({
  selector: 'app-digital-certificates-pki-x509-en',
  standalone: true,
  imports: [MatIconModule, RouterLink, GlossaryTextComponent, ArticleReadToggleComponent, TopicReadToggleComponent],
  templateUrl: '../localized-article.component.html',
  styleUrl: '../fundamentos-internet-redes-apis/fundamentos-internet-redes-apis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalCertificatesPkiX509EnComponent implements OnInit {
  readonly chapterLabel = 'Chapter 8';
  readonly seriesName = 'Corporate API Fundamentals and Architecture';
  readonly articleTitle = 'Digital Certificates, PKI, and X.509';
  readonly articleLead = 'Identity, trust, issuance, validation, revocation, and certificate operations in TLS, mTLS, and API Gateways';
  readonly editionNote = 'In-depth edition — study material and professional reference';
  readonly byLabel = 'By';
  readonly dateLabel = 'July 18, 2026';
  readonly integralLabel = 'Complete material';
  readonly tocLabel = 'In this chapter';
  readonly backLabel = 'Back to Learn';
  readonly coverImage = '/assets/learn/digital-certificates-pki-x509-cover.png';
  readonly coverAlt = 'PKI trust chain connecting a root CA, certificates, an HSM, an API Gateway, and servers';
  readonly footerText = 'End of Chapter 8 of Corporate API Fundamentals and Architecture.';
  readonly footerLink = 'Back to all Learn content';
  readonly blocks = CERTIFICATES_EN_CHAPTER_BLOCKS;
  readonly glossary = extractGlossary(this.blocks);
  readonly tocItems = this.blocks.reduce<Array<{ id: string; label: string }>>((items, block) => {
    if (block.kind === 'heading' && block.level === 2 && block.id) items.push({ id: block.id, label: block.text });
    return items;
  }, []);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao(this.articleTitle);
  }
}
