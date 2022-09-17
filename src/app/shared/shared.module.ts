import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, BrowserModule, NgbCarouselModule],
  exports: [CarouselComponent],
})
export class SharedModule {}
