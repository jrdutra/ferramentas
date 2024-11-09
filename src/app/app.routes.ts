import { Routes } from '@angular/router';

import { Base64Component } from './ferramentas/base64/base64.component'
import { EditorJsonComponent } from './ferramentas/editor-json/editor-json.component'
import { VisualizadorJwtComponent } from './ferramentas/visualizador-jwt/visualizador-jwt.component'
import { UrlcodecComponent } from './ferramentas/urlcodec/urlcodec.component'
import { ConversorImagemTextoOcrComponent } from './ferramentas/conversor-imagem-texto-ocr/conversor-imagem-texto-ocr.component'
import { UnixTimestampComponent } from './ferramentas/unix-timestamp/unix-timestamp.component'
import { TextoQrcodeComponent } from './ferramentas/texto-qrcode/texto-qrcode.component'
import { QuebraLinhaComponent } from './ferramentas/quebra-linha/quebra-linha.component'
import { TextoGlobalComponent } from './ferramentas/texto-global/texto-global.component'
import { TemplateDeTextoComponent } from './ferramentas/template-de-texto/template-de-texto.component'
import { VisualizadorX509Component } from './ferramentas/visualizador-x-509/visualizador-x-509.component'

import { HomeComponent } from './home/home.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'base64', component: Base64Component },
    { path: 'editor-json', component: EditorJsonComponent },
    { path: 'visualizador-jwt', component: VisualizadorJwtComponent },
    { path: 'codec-de-url', component: UrlcodecComponent },
    { path: 'conversor-imagem-texto-ocr', component: ConversorImagemTextoOcrComponent },
    { path: 'unix-timestamp', component: UnixTimestampComponent },
    { path: 'texto-qrcode', component: TextoQrcodeComponent },
    { path: 'quebra-linha', component: QuebraLinhaComponent },
    { path: 'texto-global', component: TextoGlobalComponent },
    { path: 'template-de-texto', component: TemplateDeTextoComponent },
    { path: 'visualizador-x-509', component: VisualizadorX509Component }
];
