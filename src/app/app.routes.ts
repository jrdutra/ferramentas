import { Routes } from '@angular/router';

import { LeitorAreaCwsComponent } from './ferramentas/leitor-area-cws/leitor-area-cws.component'
import { Base64Component } from './ferramentas/base64/base64.component'
import { EditorJsonComponent } from './ferramentas/editor-json/editor-json.component'
import { VisualizadorJwtComponent } from './ferramentas/visualizador-jwt/visualizador-jwt.component'
import { UrlcodecComponent } from './ferramentas/urlcodec/urlcodec.component'
import { ConversorImagemTextoOcrComponent } from './ferramentas/conversor-imagem-texto-ocr/conversor-imagem-texto-ocr.component'

import { HomeComponent } from './home/home.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'leitor-area-cws', component: LeitorAreaCwsComponent },
    { path: 'base64', component: Base64Component },
    { path: 'editor-json', component: EditorJsonComponent },
    { path: 'visualizador-jwt', component: VisualizadorJwtComponent },
    { path: 'codec-de-url', component: UrlcodecComponent },
    { path: 'conversor-imagem-texto-ocr', component: ConversorImagemTextoOcrComponent }
];
