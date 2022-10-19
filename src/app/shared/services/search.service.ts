import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { Article } from '../interfaces/article';
import { Journalist } from '../interfaces/journalist';
import { Magazine } from '../interfaces/magazine';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  nameSearch: Article[] = [];
  genreSearch: Article[] = [];
  journalistSearch: Journalist[] = [];
  magazineSearch: Magazine[] = [];

  constructor(public afs: AngularFirestore) {}

  search(searchString: string, field: string, collection: string) {
    let tmpArr: any[] = [];
    this.afs
      .collection(collection)
      .ref.where(field, '>=', searchString)
      .where(field, '<=', searchString + '\uf8ff')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (collection === 'articles') {
            tmpArr.push(doc.data() as Article);
          }
          if (collection === 'journalists') {
            tmpArr.push(doc.data() as Journalist);
          }
          if (collection === 'magazines') {
            tmpArr.push(doc.data() as Magazine);
          }
        });
      });
    return of(tmpArr);
  }
}
