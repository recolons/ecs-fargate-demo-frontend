import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;
  sectionName: string = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sectionSlug = params['section'];
      this.loadSectionArticles(sectionSlug);
    });
  }

  private loadSectionArticles(sectionSlug: string): void {
    this.loading = true;
    this.error = null;
    
    // Map the section slug to its ID
    const sectionMap: { [key: string]: { id: string, name: string } } = {
      'deportes': { id: '1', name: 'Deportes' },
      'noticias': { id: '2', name: 'Noticias' },
      'tecnologia': { id: '3', name: 'Tecnología' },
      'entretenimiento': { id: '4', name: 'Entretenimiento' },
      'horoscopo': { id: '5', name: 'Horóscopo' },
      'politica': { id: '6', name: 'Política' },
      'salud': { id: '7', name: 'Salud' },
      'ciencia': { id: '8', name: 'Ciencia' },
      'cultura': { id: '9', name: 'Cultura' },
      'economia': { id: '10', name: 'Economía' },
      'finanzas': { id: '11', name: 'Finanzas' },
      'educacion': { id: '12', name: 'Educación' },
    };

    const section = sectionMap[sectionSlug];
    if (!section) {
      this.error = 'Sección no encontrada';
      this.loading = false;
      return;
    }

    this.sectionName = section.name;
    this.articleService.getArticlesBySection(section.id).subscribe({
      next: (data: { content: Article[] }) => {
        this.articles = data.content;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Error al cargar los artículos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
} 