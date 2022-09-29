import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselEntity } from '../../interfaces/carouselentity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {
  @Input() carouselArray: CarouselEntity[] = [];
  // ehkä sinne state handleriin tääkin screenin hallinta
  height: number = 0;
  width: number = 0;
  isLogged: boolean = false;

  constructor(config: NgbCarouselConfig, private authSvc: AuthService) {
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;

    this.height = window.innerHeight;
  }

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
  }
}
