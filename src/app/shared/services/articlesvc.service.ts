import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../interfaces/article';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesvcService {
  articleList: Article[] = [];
  article!: Article;

  constructor(private fireStoreSvc: FirestoreService) {
    this.fireStoreSvc
      .getAllArticles()
      .then(articles => (this.articleList = articles));
  }

  getArticles(): Observable<Article[]> {
    const articles = of(this.articleList);
    return articles;
  }

  getArticle(key: string): Observable<Article> {
    const article = this.articleList.find(h => h.key === key)!;
    localStorage.setItem('article', JSON.stringify(article));
    return of(article);
  }

  // getArticle(key: string): Observable<Article> {
  //   this.fireStoreSvc.getArticle(key).then(article => {
  //     this.article = article;
  //   });
  //   return of(this.article);
  // }
}
