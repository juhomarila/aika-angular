import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { Owned } from '../interfaces/owned';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User[] = [];
  ownedArticlesList: Article[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService
  ) {
    this.fireStoreSvc
      .getUser(this.authSvc.user.uid)
      .then(user => (this.user = user));
    this.fireStoreSvc
      .getOwnedArticles(this.authSvc.user.uid)
      .then(owned => (this.ownedArticlesList = owned));
  }

  getUser(): Observable<User[]> {
    const user = of(this.user);
    return user;
  }

  getOwnedArticles(): Observable<Article[]> {
    const owned = of(this.ownedArticlesList);
    return owned;
  }
}
