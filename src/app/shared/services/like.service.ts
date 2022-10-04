import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private fireStoreSvc: FirestoreService) {}

  async likeArticle(key: string, uid: string) {
    await this.fireStoreSvc.addArticleLikeToArticle(key);
    await this.fireStoreSvc.addArticleLikeToUser(key, uid);
  }
}
