import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { CarouselEntity } from '../interfaces/carouselentity';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  carouselEntityList: CarouselEntity[] = [];
  constructor(private fireStoreSvc: FirestoreService) {}

  getUrls() {
    this.fireStoreSvc
    .getAllCarouselEntities()
    .then(carouselEntities => (this.carouselEntityList = carouselEntities));
  }

  getCarouselEntities(): Observable<CarouselEntity[]> {
    const carouselEntites = of(this.carouselEntityList);
    return carouselEntites;
  }
}
