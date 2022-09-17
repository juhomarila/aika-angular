import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  articleList: Article[] = [];
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
}
