import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionComponent } from './section/section.component';
import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seccion/:section', component: SectionComponent },
    { path: 'articulo/:id', component: ArticleComponent },
    { path: '**', redirectTo: '' }
];
