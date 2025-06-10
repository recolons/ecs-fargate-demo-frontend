import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsSectionComponent } from './sports-section.component';
import { ArticleService } from '../services/article.service';
import { of, throwError } from 'rxjs';
import { Article } from '../models/article.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SportsSectionComponent', () => {
  let component: SportsSectionComponent;
  let fixture: ComponentFixture<SportsSectionComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  const mockArticles = {
    content: [
      {
        id: '1',
        title: 'Test Sports Article 1',
        content: 'Test content 1',
        date: new Date('2024-03-20'),
        section: { id: '1', name: 'Deportes' }
      },
      {
        id: '2',
        title: 'Test Sports Article 2',
        content: 'Test content 2',
        date: new Date('2024-03-19'),
        section: { id: '1', name: 'Deportes' }
      }
    ]
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ArticleService', ['getArticlesBySection']);
    await TestBed.configureTestingModule({
      imports: [SportsSectionComponent, RouterTestingModule],
      providers: [
        { provide: ArticleService, useValue: spy }
      ]
    }).compileComponents();

    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', () => {
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    expect(loadingElement).toBeTruthy();
  });

  it('should load and display articles successfully', () => {
    articleServiceSpy.getArticlesBySection.and.returnValue(of(mockArticles));
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.articles).toEqual(mockArticles.content);

    const articleCards = fixture.debugElement.queryAll(By.css('.article-card'));
    expect(articleCards.length).toBe(2);

    const firstArticleTitle = fixture.debugElement.query(By.css('.article-card h3')).nativeElement.textContent;
    expect(firstArticleTitle).toContain('Test Sports Article 1');
  });

  it('should handle error when loading articles', () => {
    articleServiceSpy.getArticlesBySection.and.returnValue(throwError(() => new Error('Test error')));
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.error).toBeTruthy();
    expect(component.articles).toEqual([]);

    const errorElement = fixture.debugElement.query(By.css('.error'));
    expect(errorElement).toBeTruthy();
  });

  it('should show no articles message when content is empty', () => {
    articleServiceSpy.getArticlesBySection.and.returnValue(of({ content: [] }));
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.articles).toEqual([]);

    const noArticlesElement = fixture.debugElement.query(By.css('.no-articles'));
    expect(noArticlesElement).toBeTruthy();
  });

  it('should format article dates correctly', () => {
    articleServiceSpy.getArticlesBySection.and.returnValue(of(mockArticles));
    fixture.detectChanges();

    const dateElement = fixture.debugElement.query(By.css('.article-date')).nativeElement;
    expect(dateElement.textContent).toContain('Mar 20, 2024');
  });

  it('should truncate article content to 150 characters', () => {
    const longContent = 'a'.repeat(200);
    const articleWithLongContent = {
      content: [{
        ...mockArticles.content[0],
        content: longContent
      }]
    };

    articleServiceSpy.getArticlesBySection.and.returnValue(of(articleWithLongContent));
    fixture.detectChanges();

    const contentElement = fixture.debugElement.query(By.css('.article-excerpt')).nativeElement;
    expect(contentElement.textContent.length).toBeLessThanOrEqual(153); // 150 + '...'
  });

  it('should have correct router links for articles', () => {
    articleServiceSpy.getArticlesBySection.and.returnValue(of(mockArticles));
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    expect(links[0].attributes['routerLink']).toBe('/articulo,1');
  });
});
