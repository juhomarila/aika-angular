import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Like } from '../interfaces/like';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  likedArticlesList: Like[] = [];
  likes: number = 0;

  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService
  ) {
    this.fireStoreSvc
      .getUserArticleLikes(this.authSvc.user.uid)
      .then(likes => (this.likedArticlesList = likes));
  }

  async likeArticle(key: string) {
    await this.fireStoreSvc.addArticleLikeToArticle(key);
    await this.fireStoreSvc.addArticleLikeToUser(key, this.authSvc.user.uid);
    this.likedArticlesList.push({ key: key });
  }

  getUserArticleLikes() {
    return of(this.likedArticlesList);
  }

  checkIfLiked(key: string) {
    let liked = false;
    this.likedArticlesList.map(like => {
      if (like.key === key) {
        liked = true;
      }
    });
    return liked;
  }
}
