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
  genreArray: string[] = [];
  article!: Article;

  constructor(private fireStoreSvc: FirestoreService) {
    this.fireStoreSvc
      .getAllArticles()
      .then(articles => (this.articleList = articles));
    this.fireStoreSvc
      .getAllMagazines()
      .then(magazines => (this.magazineList = magazines));
    this.fireStoreSvc.getGenres();
  }

  init() {
    return;
  }

  getArticles(): Observable<Article[]> {
    return of(this.articleList);
  }

  getArticle(key: string): Observable<Article> {
    const article = this.articleList.find(h => h.key === key)!;
    return of(article);
  }

  getSingleArticle(key: string): Article {
    return this.articleList.find(h => h.key === key)!;
  }

  getMagazines(): Observable<Magazine[]> {
    return of(this.magazineList);
  }
}
