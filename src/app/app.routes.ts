import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SportsSectionComponent } from './sports-section/sports-section.component';
import { NewsSectionComponent } from './news-section/news-section.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'deportes', component: SportsSectionComponent},
    { path: 'noticias', component: NewsSectionComponent},
    { path: '**', redirectTo: '' }
    
];
