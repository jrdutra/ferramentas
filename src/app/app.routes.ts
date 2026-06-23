import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'sobre',
    loadComponent: () => import('./sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'base64',
    loadComponent: () => import('./ferramentas/base64/base64.component').then(m => m.Base64Component)
  },
  {
    path: 'editor-json',
    loadComponent: () => import('./ferramentas/editor-json/editor-json.component').then(m => m.EditorJsonComponent)
  },
  {
    path: 'visualizador-jwt',
    loadComponent: () => import('./ferramentas/visualizador-jwt/visualizador-jwt.component').then(m => m.VisualizadorJwtComponent)
  },
  {
    path: 'codec-de-url',
    loadComponent: () => import('./ferramentas/urlcodec/urlcodec.component').then(m => m.UrlcodecComponent)
  },
  {
    path: 'conversor-imagem-texto-ocr',
    loadComponent: () => import('./ferramentas/conversor-imagem-texto-ocr/conversor-imagem-texto-ocr.component')
      .then(m => m.ConversorImagemTextoOcrComponent)
  },
  {
    path: 'unix-timestamp',
    loadComponent: () => import('./ferramentas/unix-timestamp/unix-timestamp.component').then(m => m.UnixTimestampComponent)
  },
  {
    path: 'texto-qrcode',
    loadComponent: () => import('./ferramentas/texto-qrcode/texto-qrcode.component').then(m => m.TextoQrcodeComponent)
  },
  {
    path: 'quebra-linha',
    loadComponent: () => import('./ferramentas/quebra-linha/quebra-linha.component').then(m => m.QuebraLinhaComponent)
  },
  {
    path: 'texto-global',
    loadComponent: () => import('./ferramentas/texto-global/texto-global.component').then(m => m.TextoGlobalComponent)
  },
  {
    path: 'template-de-texto',
    loadComponent: () => import('./ferramentas/template-de-texto/template-de-texto.component').then(m => m.TemplateDeTextoComponent)
  },
  {
    path: 'visualizador-x-509',
    loadComponent: () => import('./ferramentas/visualizador-x-509/visualizador-x-509.component').then(m => m.VisualizadorX509Component)
  }
];
