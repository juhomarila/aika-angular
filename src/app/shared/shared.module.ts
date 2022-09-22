import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ArticleModalComponent,
    ShoppingCartModalComponent,
    MagazineComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, BrowserModule, NgbCarouselModule],
  exports: [CarouselComponent, ArticleModalComponent, SpinnerComponent],
})
export class SharedModule {}
