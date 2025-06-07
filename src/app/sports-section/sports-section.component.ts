import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-sports-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sports-section.component.html',
  styleUrl: './sports-section.component.css'
})
export class SportsSectionComponent implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadSportsArticles();
  }

  loadSportsArticles(): void {
    this.loading = true;
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data.filter((article: Article) => article.section === 'Deportes');
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading sports articles';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
}
