import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(public afs: AngularFirestore) {}

  search() {
    this.afs
      .collection('articles')
      .ref.where('name', '==', 'Viihdettä')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.data() as string);
        });
      });
  }
}
