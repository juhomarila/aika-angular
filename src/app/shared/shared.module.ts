import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TitleCarouselComponent } from './components/title-carousel/title-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { PreviewComponent } from './components/preview/preview.component';
import { LoggedInCarouselComponent } from './components/logged-in-carousel/logged-in-carousel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CarouselComponent,
    ArticleModalComponent,
    ShoppingCartModalComponent,
    SpinnerComponent,
    TitleCarouselComponent,
    PreviewComponent,
    LoggedInCarouselComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbCarouselModule,
    CarouselModule,
    RouterModule,
  ],
  exports: [
    CarouselComponent,
    ArticleModalComponent,
    SpinnerComponent,
    TitleCarouselComponent,
    LoggedInCarouselComponent,
  ],
})
export class SharedModule {}
