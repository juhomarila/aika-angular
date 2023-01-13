import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselEntity } from '../../interfaces/carouselentity';

@Component({
  selector: 'logged-in-carousel',
  templateUrl: './logged-in-carousel.component.html',
  providers: [NgbCarouselConfig],
})
export class LoggedInCarouselComponent implements OnInit {
  @Input() carouselArray: CarouselEntity[] = [];
  height: number = 0;

  constructor(config: NgbCarouselConfig) {
    config.animation = false;
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;

    this.height = window.innerHeight * 0.8;
  }

  ngOnInit(): void {}
}
