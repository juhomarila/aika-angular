import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  carouselEntityList: CarouselEntity[] = [];
  constructor(
    private authSvc: AuthService,
    private storageSvc: StorageService,
    private router: Router
  ) {}

  public isLogged: boolean = false;

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    if (this.isLogged) {
      this.router.navigate(['frontpage']);
    }
    this.getCarouselImages();
  }

  getCarouselImages(): void {
    this.storageSvc
      .getCarouselEntities()
      .subscribe(
        carouselEntities => (this.carouselEntityList = carouselEntities)
      );
  }
}
