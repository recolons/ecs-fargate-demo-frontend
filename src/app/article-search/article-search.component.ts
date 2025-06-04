import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './article-search.component.html',
  styleUrl: './article-search.component.css'
})
export class ArticleSearchComponent {
  searchQuery = '';
  articles: any[] = [];

  searchArticles() {
    console.log('Searching for articles with query:', this.searchQuery);
  }
}
