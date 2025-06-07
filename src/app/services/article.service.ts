import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Replace this with your actual ECS Fargate backend URL
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Get all articles
  getArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles`);
  }

  // Get article by ID
  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${id}`);
  }

  // Search articles
  searchArticles(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/search?q=${query}`);
  }

  // Get paginated articles by section with sorting
  getArticlesBySection(
    sectionId: string, 
    page: number = 0, 
    size: number = 10,
    sortBy: string = 'date',
    direction: 'asc' | 'desc' = 'desc'
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/articles/section/${sectionId}/page?page=${page}&size=${size}&sort=${sortBy},${direction}`
    );
  }

  // Get articles by section, newest first
  getArticlesBySectionNewestFirst(sectionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/section/${sectionId}/newest`);
  }

}
