import { Routes } from '@angular/router';

import { LeitorAreaCwsComponent } from './ferramentas/leitor-area-cws/leitor-area-cws.component'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'leitor-area-cws', component: LeitorAreaCwsComponent }
];
