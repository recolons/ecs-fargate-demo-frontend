import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{

  article: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      this.loadArticle(articleId);
    });
  }

  private loadArticle(articleId: string): void {
    this.articleService.getArticleById(articleId).subscribe(article => {
      this.article = article;
    });
  }
}
