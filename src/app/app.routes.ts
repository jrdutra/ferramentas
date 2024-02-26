import { Routes } from '@angular/router';

import { Ferramenta1Component } from './ferramentas/ferramenta1/ferramenta1.component'
import { Ferramenta2Component } from './ferramentas/ferramenta2/ferramenta2.component'
import { LeitorAreaCwsComponent } from './ferramentas/leitor-area-cws/leitor-area-cws.component'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ferramenta1', component: Ferramenta1Component },
    { path: 'ferramenta2', component: Ferramenta2Component },
    { path: 'leitor-area-cws', component: LeitorAreaCwsComponent }
];
