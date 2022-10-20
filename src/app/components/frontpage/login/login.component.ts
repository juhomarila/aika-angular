import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  carouselEntityList: CarouselEntity[] = [];
  constructor(
    private authSvc: AuthService,
    private storageSvc: StorageService,
    private router: Router,
    private globals: Globals,
    private utilSvc: UtilService
  ) {}

  public isLogged: boolean = false;

  ngOnInit(): void {
    console.log(localStorage.getItem('language'));
    if (!localStorage.getItem('language')) {
      this.globals.setLocale();
      localStorage.setItem(
        'language',
        this.utilSvc.verifyLocale(this.globals.locale)
      );
      window.location.reload();
    }
    this.isLogged = this.authSvc.isLoggedIn;
    if (this.isLogged) {
      this.router.navigate(['frontpage']);
    }
    this.getCarouselImages();
  }

  getCarouselImages(): void {
    this.storageSvc
      .getLoginCarouselEntities()
      .subscribe(
        carouselEntities => (this.carouselEntityList = carouselEntities)
      );
  }
}
