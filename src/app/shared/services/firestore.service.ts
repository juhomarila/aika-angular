import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Article } from '../interfaces/article';
import { CarouselEntity } from '../interfaces/carouselentity';
import { User } from '../interfaces/user';
import { Owned } from '../interfaces/owned';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  articleList: Article[] = [];
  article!: Article;
  carouselEntityList: CarouselEntity[] = [];
  user: User[] = [];
  ownedArticlesList: Article[] = [];

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

  async getArticle(key: string) {
    const snapShot = this.afs.collection('articles').doc(key).get();
    snapShot.subscribe(article => (this.article = article.data() as Article));
    return this.article;
  }

  async getAllCarouselEntities() {
    const snapShot = this.afs.collection('frontpagecarousel').get();
    snapShot.subscribe(carouselEntities =>
      carouselEntities.forEach(carouselEntity =>
        this.carouselEntityList.push(carouselEntity.data() as CarouselEntity)
      )
    );
    return this.carouselEntityList;
  }

  async getUser(uid: string) {
    const snapShot = this.afs.collection('users').doc(uid).get();
    snapShot.subscribe(user => this.user.push(user.data() as User));
    return this.user;
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
    return this.ownedArticlesList;
  }

  async buyArticle(uid: string, key: string): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(uid)
      .collection('ownedArticles')
      .doc(key);
    return userRef.set(
      { key: key },
      {
        merge: true,
      }
    );
  }
}
