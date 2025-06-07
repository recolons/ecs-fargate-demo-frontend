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
}
