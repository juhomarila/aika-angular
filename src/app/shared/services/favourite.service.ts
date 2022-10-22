import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    if (this.authSvc.isLoggedIn) {
      this.fireStoreSvc
        .getUserArticleFavourites(this.authSvc.user.uid)
        .then(favs => (this.favourites = favs));
    } else {
      this.favourites = [];
    }
  }

  async addArticleToFavourites(key: string) {
    await this.fireStoreSvc.addArticleToFavourites(key, this.authSvc.user.uid);
    await this.fireStoreSvc.addArticleFavouriteToArticle(key);
    this.favourites.push({ key: key });
  }

  async removeArticleFromFavourites(key: string) {
    await this.fireStoreSvc.removeArticleFromFavourites(
      key,
      this.authSvc.user.uid
    );
    await this.fireStoreSvc.removeArticleFavouriteFromArticle(key);
    const index = this.favourites.findIndex(fav => fav.key === key);
    if (index > -1) {
      this.favourites.splice(index, 1);
    }
  }

  getUserArticleFavourites(): Observable<Favourite[]> {
    const favs = of(this.favourites);
    return favs;
  }

  checkIfFavourite(key: string) {
    let favourite = false;
    this.favourites.map(fav => {
      if (fav.key === key) {
        favourite = true;
      }
    });
    return favourite;
  }
}
