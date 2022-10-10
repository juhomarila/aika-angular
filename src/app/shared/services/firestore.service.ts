import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Article } from '../interfaces/article';
import { CarouselEntity } from '../interfaces/carouselentity';
import { User } from '../interfaces/user';
import { Magazine } from '../interfaces/magazine';
import { increment } from '@angular/fire/firestore';
import { Owned } from '../interfaces/owned';
import { Favourite } from '../interfaces/favourite';
import { Like } from '../interfaces/like';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  articleList: Article[] = [];
  article!: Article;
  carouselEntityList: CarouselEntity[] = [];
  loginCarouselEntityList: CarouselEntity[] = [];
  user: User[] = [];
  ownedArticlesList: Article[] = [];
  magazine!: Magazine;
  magazineList: Magazine[] = [];
  boughtArticles: Owned[] = [];
  favouritesList: Favourite[] = [];
  likedList: Like[] = [];
  likes: number = 0;

  constructor(public afs: AngularFirestore) {}

  async getAllArticles() {
    const snapShot = this.afs.collection('articles').get();
    snapShot.subscribe(articles =>
      articles.forEach(article =>
        this.articleList.push(article.data() as Article)
      )
    );
    return this.articleList;
  }

  async getAllLoginCarouselEntities() {
    const snapShot = this.afs.collection('frontpagecarousel').get();
    snapShot.subscribe(carouselEntities =>
      carouselEntities.forEach(carouselEntity =>
        this.carouselEntityList.push(carouselEntity.data() as CarouselEntity)
      )
    );
    return this.carouselEntityList;
  }

  async getAllLoggedInCarouselEntities() {
    const snapShot = this.afs.collection('loginfrontpagecarousel').get();
    snapShot.subscribe(carouselEntities =>
      carouselEntities.forEach(carouselEntity =>
        this.loginCarouselEntityList.push(
          carouselEntity.data() as CarouselEntity
        )
      )
    );
    return this.loginCarouselEntityList;
  }

  getUser(uid: string) {
    // const snapShot = this.afs.collection('users').doc(uid).get();
    // snapShot.subscribe(user => this.user.push(user.data() as User));
    // return this.user;
    return this.afs.collection('users').doc(uid).get();
  }

  async getOwnedArticles(uid: string) {
    const snapShot = this.afs
      .collection('users')
      .doc(uid)
      .collection('ownedArticles')
      .get();
    snapShot.subscribe(permissions =>
      permissions.forEach(permission =>
        this.ownedArticlesList.push(permission.data() as Article)
      )
    );
    localStorage.setItem(
      'ownedArticles',
      JSON.stringify(this.ownedArticlesList)
    );
    return this.ownedArticlesList;
  }

  get ownedArticles() {
    return JSON.parse(localStorage.getItem('ownedArticles')!);
  }

  async buyArticle(uid: string, key: string): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(uid)
      .collection('ownedArticles')
      .doc(key);
    return userRef.set(
      { key: key, time: Date.now() },
      {
        merge: true,
      }
    );
  }

  getMagazine(key: string) {
    return this.afs.collection('magazines').doc(key).get();
  }

  getJournalist(key: string) {
    return this.afs.collection('journalists').doc(key).get();
  }

  getArticle(key: string) {
    return this.afs.collection('articles').doc(key).get();
  }

  async getAllMagazines() {
    const snapShot = this.afs.collection('magazines').get();
    snapShot.subscribe(magazines =>
      magazines.forEach(magazine =>
        this.magazineList.push(magazine.data() as Magazine)
      )
    );
    return this.magazineList;
  }

  async getAllBoughtArticles(uid: string) {
    const snapShot = this.afs
      .collection('users')
      .doc(uid)
      .collection('ownedArticles')
      .get();
    snapShot.subscribe(owned =>
      owned.forEach(data => this.boughtArticles.push(data.data() as Owned))
    );
    return this.boughtArticles;
  }

  async addArticleLikeToUser(key: string, uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(uid)
      .collection('likedArticles')
      .doc(key);
    return userRef.set(
      { key: key },
      {
        merge: true,
      }
    );
  }

  async getUserArticleLikes(uid: string) {
    const snapShot = this.afs
      .collection('users')
      .doc(uid)
      .collection('likedArticles')
      .get();
    snapShot.subscribe(likes =>
      likes.forEach(like => this.likedList.push(like.data() as Like))
    );
    return this.likedList;
  }

  async addArticleLikeToArticle(key: string) {
    const articleRef: AngularFirestoreDocument<any> = this.afs
      .collection('articles')
      .doc(key);
    return await articleRef.set(
      { likes: increment(1) },
      {
        merge: true,
      }
    );
  }

  async addArticleToFavourites(key: string, uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(uid)
      .collection('favouriteArticles')
      .doc(key);
    return userRef.set(
      { key: key },
      {
        merge: true,
      }
    );
  }

  async addArticleFavouriteToArticle(key: string) {
    const articleRef: AngularFirestoreDocument<any> = this.afs
      .collection('articles')
      .doc(key);
    return await articleRef.set(
      { tbr: increment(1) },
      {
        merge: true,
      }
    );
  }

  async removeArticleFavouriteFromArticle(key: string) {
    const articleRef: AngularFirestoreDocument<any> = this.afs
      .collection('articles')
      .doc(key);
    return await articleRef.set(
      { tbr: increment(-1) },
      {
        merge: true,
      }
    );
  }

  async getUserArticleFavourites(uid: string) {
    const snapShot = this.afs
      .collection('users')
      .doc(uid)
      .collection('favouriteArticles')
      .get();
    snapShot.subscribe(favs =>
      favs.forEach(fav => this.favouritesList.push(fav.data() as Favourite))
    );
    return this.favouritesList;
  }

  async removeArticleFromFavourites(key: string, uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(uid)
      .collection('favouriteArticles')
      .doc(key);
    return userRef.delete();
  }
}
