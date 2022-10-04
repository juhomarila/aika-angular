import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Favourite } from '../interfaces/favourite';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  favourites: Favourite[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService
  ) {
    this.fireStoreSvc
      .getUserArticleFavourites(this.authSvc.user.uid)
      .then(favs => (this.favourites = favs));
  }

  async addArticleToFavourites(key: string) {
    await this.fireStoreSvc.addArticleToFavourites(key, this.authSvc.user.uid);
  }

  async removeArticleFromFavourites(key: string) {
    await this.fireStoreSvc.removeArticleFromFavourites(
      key,
      this.authSvc.user.uid
    );
  }

  getUserArticleFavourites() {
    return of(this.favourites);
  }
}
