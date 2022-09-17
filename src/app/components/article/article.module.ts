import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleComponent } from './article.component';
import { AuthService } from 'src/app/shared/services/auth.service';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [ArticleComponent],
  providers: [AuthService]
})
export class ArticleModule { }
