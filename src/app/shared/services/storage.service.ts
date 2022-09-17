import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private afs: AngularFireStorage) {}

  getUrls() {
    return this.afs.storage.ref('kuvat/karusellikuvat').listAll();
  }
}
