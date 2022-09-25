import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  nameSearch: Article[] = [];
  genreSearch: Article[] = [];
  journalistSearch: Article[] = [];
  magazineSearch: Article[] = [];

  constructor(public afs: AngularFirestore) {}

  // tämä tulee olemaan tärkeä. Tänne order by popularity, rating jne
  // hyvä ja toimiva hakualgoritmi tulee olemaan kaiken keskiössä

  search(searchString: string, field: string) {
    let tmpArr: Article[] = [];
    this.afs
      .collection('articles')
      .ref.where(field, '>=', searchString)
      .where(field, '<=', searchString + '\uf8ff')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          tmpArr.push(doc.data() as Article);
          this.nameSearch = tmpArr;
        });
      });
    return of(this.nameSearch);
  }
}
