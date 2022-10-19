import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { Owned } from '../interfaces/owned';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User[] = [];
  ownedArticlesList: Owned[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService
  ) {
    if (this.authSvc.isLoggedIn) {
      this.fireStoreSvc
        .getOwnedArticles(this.authSvc.user.uid)
        .then(owned => (this.ownedArticlesList = owned));
    } else {
      this.ownedArticlesList = [];
    }
  }

  setOwnedArticles(owned: Owned) {
    this.ownedArticlesList.push(owned);
  }

  getOwnedArticles(): Observable<Owned[]> {
    const owned = of(this.ownedArticlesList);
    return owned;
  }
}
