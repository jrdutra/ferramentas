import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',

})
export class MenuComponent {

  readonly tituloAplicacao$ = this.dataService.tituloAplicacao$;
  router: Router;

  constructor(private r: Router, private dataService: DataService) {
    this.router = r;
  }

  navegaMenu(tag: string) {
    if (tag === 'home') {
      this.router.navigate(['/home']);
      this.dataService.setTituloAplicacao('Home');
    }
    if (tag === 'about') {
      this.router.navigate(['/about']);
      this.dataService.setTituloAplicacao('About');
    }
    if (tag === 'base64') {
      this.router.navigate(['/base64']);
      this.dataService.setTituloAplicacao('Base64 Converter');
    }
    if (tag === 'json-editor') {
      this.router.navigate(['/json-editor']);
      this.dataService.setTituloAplicacao('JSON Editor');
    }
    if (tag === 'jwt-viewer') {
      this.router.navigate(['/jwt-viewer']);
      this.dataService.setTituloAplicacao('JWT Manipulator');
    }
    if (tag === 'jwe-viewer') {
      this.router.navigate(['/jwe-viewer']);
      this.dataService.setTituloAplicacao('JWE Manipulator');
    }
    if (tag === 'url-codec') {
      this.router.navigate(['/url-codec']);
      this.dataService.setTituloAplicacao('URL Codec');
    }
    if (tag === 'image-to-text-ocr') {
      this.router.navigate(['/image-to-text-ocr']);
      this.dataService.setTituloAplicacao('OCR Converter');
    }
    if (tag === 'unix-timestamp') {
      this.router.navigate(['/unix-timestamp']);
      this.dataService.setTituloAplicacao('Unix Timestamp');
    }
    if (tag === 'text-to-qrcode') {
      this.router.navigate(['/text-to-qrcode']);
      this.dataService.setTituloAplicacao('Text to QR Code');
    }
    if (tag === 'text-editor') {
      this.router.navigate(['/text-editor']);
      this.dataService.setTituloAplicacao('Text Editor');
    }
    if (tag === 'text-template') {
      this.router.navigate(['/text-template']);
      this.dataService.setTituloAplicacao('Text Template');
    }
    if (tag === 'x509-viewer') {
      this.router.navigate(['/x509-viewer']);
      this.dataService.setTituloAplicacao('X.509 Certificate Viewer');
    }
    if (tag === 'x509-generator') {
      this.router.navigate(['/x509-generator']);
      this.dataService.setTituloAplicacao('X.509 Key & Certificate Generator');
    }
    if (tag === 'pdf-merger') {
      this.router.navigate(['/pdf-merger']);
      this.dataService.setTituloAplicacao('PDF & Image Merger');
    }
    if (tag === 'pdf-splitter') {
      this.router.navigate(['/pdf-splitter']);
      this.dataService.setTituloAplicacao('PDF Splitter');
    }
    if (tag === 'hash-generator') {
      this.router.navigate(['/hash-generator']);
      this.dataService.setTituloAplicacao('Hash Generator');
    }
    if (tag === 'text-diff') {
      this.router.navigate(['/text-diff']);
      this.dataService.setTituloAplicacao('Text Diff');
    }
    if (tag === 'uuid-generator') {
      this.router.navigate(['/uuid-generator']);
      this.dataService.setTituloAplicacao('UUID Generator');
    }
    if (tag === 'password-generator') {
      this.router.navigate(['/password-generator']);
      this.dataService.setTituloAplicacao('Password Generator');
    }
    if (tag === 'hmac-generator') {
      this.router.navigate(['/hmac-generator']);
      this.dataService.setTituloAplicacao('HMAC Generator');
    }
    if (tag === 'cpf-cnpj-generator') {
      this.router.navigate(['/cpf-cnpj-generator']);
      this.dataService.setTituloAplicacao('CPF & CNPJ Generator');
    }
    if (tag === 'json-yaml-compare') {
      this.router.navigate(['/json-yaml-compare']);
      this.dataService.setTituloAplicacao('JSON & YAML Comparator');
    }
    if (tag === 'certificate-validator') {
      this.router.navigate(['/certificate-validator']);
      this.dataService.setTituloAplicacao('Certificate & Key Validator');
    }
  }
}
