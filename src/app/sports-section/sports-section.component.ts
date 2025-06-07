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
    // sectionId is the id of the section in the database
    const sectionId = '1'; 
    this.articleService.getArticlesBySection(sectionId).subscribe({
      next: (data) => {
        this.articles = data.content;
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
