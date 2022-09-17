import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Article } from '../interfaces/article';
import { CarouselEntity } from '../interfaces/carouselentity';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  articleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  constructor(public afs: AngularFirestore) {}

  // async getAllArticles() {
  //   const articleRef: AngularFirestoreDocument<Article> = this.afs.doc(
  //     `articles`
  //   );
  //   const snapShot = articleRef.get();
  //   snapShot.subscribe(article => this.articleList.push(article.data() as Article));
  //   return this.articleList;
  // }

  async getAllArticles() {
    const snapShot = this.afs.collection('articles').get();
    snapShot.subscribe(articles =>
      articles.forEach(article =>
        this.articleList.push(article.data() as Article)
      )
    );
    return this.articleList;
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
}
