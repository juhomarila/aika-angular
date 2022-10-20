import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../interfaces/article';
import { Magazine } from '../interfaces/magazine';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesvcService {
  magazineList: Magazine[] = [];
  articleList: Article[] = [];
  article!: Article;

  constructor(private fireStoreSvc: FirestoreService) {
    this.fireStoreSvc
      .getAllArticles()
      .then(articles => (this.articleList = articles));
    this.fireStoreSvc
      .getAllMagazines()
      .then(magazines => (this.magazineList = magazines));
  }

  getArticles(): Observable<Article[]> {
    const articles = of(this.articleList);
    return articles;
  }

  getArticle(key: string): Observable<Article> {
    const article = this.articleList.find(h => h.key === key)!;
    return of(article);
  }

  getMagazines(): Observable<Magazine[]> {
    const magazines = of(this.magazineList);
    return magazines;
  }
}
