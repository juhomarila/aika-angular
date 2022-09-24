import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(public afs: AngularFirestore) {}

  search(string: string) {
    this.afs
      .collection('articles')
      .ref.where('magazine', '==', string)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.data() as string);
        });
      });
  }
}
