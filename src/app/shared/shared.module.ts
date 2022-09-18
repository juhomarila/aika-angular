import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';

@NgModule({
  declarations: [CarouselComponent, ArticleModalComponent],
  imports: [CommonModule, BrowserModule, NgbCarouselModule],
  exports: [CarouselComponent, ArticleModalComponent],
})
export class SharedModule {}
