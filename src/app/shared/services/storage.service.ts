import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarouselEntity } from '../interfaces/carouselentity';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  carouselEntityListLogin: CarouselEntity[] = [];
  carouselEntityListLoggedIn: CarouselEntity[] = [];
  constructor(private fireStoreSvc: FirestoreService) {
    this.getLoginUrls();
    this.getLoggedInUrls();
  }

  getLoginUrls() {
    this.fireStoreSvc
      .getAllLoginCarouselEntities()
      .then(
        carouselEntities => (this.carouselEntityListLogin = carouselEntities)
      );
  }

  getLoginCarouselEntities(): Observable<CarouselEntity[]> {
    const carouselEntites = of(this.carouselEntityListLogin);
    return carouselEntites;
  }

  getLoggedInUrls() {
    this.fireStoreSvc
      .getAllLoggedInCarouselEntities()
      .then(
        carouselEntities => (this.carouselEntityListLoggedIn = carouselEntities)
      );
  }

  getLoggedInCarouselEntities(): Observable<CarouselEntity[]> {
    const carouselEntites = of(this.carouselEntityListLoggedIn);
    return carouselEntites;
  }
}
