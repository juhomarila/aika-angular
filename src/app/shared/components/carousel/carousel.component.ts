import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselEntity } from '../../interfaces/carouselentity';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {
  @Input() carouselArray: CarouselEntity[] = [];
  // ehkä sinne state handleriin tääkin screenin hallinta
  height: number = 0;

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;

    this.height = screen.availHeight * 0.85;
  }

  ngOnInit(): void {}
}
