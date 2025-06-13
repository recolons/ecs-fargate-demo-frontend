import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionComponent } from './section/section.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seccion/:section', component: SectionComponent },
    { path: '**', redirectTo: '' }
];
