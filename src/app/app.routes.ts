import { Routes } from '@angular/router';

import { Ferramenta1Component } from './ferramentas/ferramenta1/ferramenta1.component'
import { Ferramenta2Component } from './ferramentas/ferramenta2/ferramenta2.component'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
    { path: 'ferramenta1', component: Ferramenta1Component },
    { path: 'ferramenta2', component: Ferramenta2Component },
    { path: 'home', component: HomeComponent }
];
