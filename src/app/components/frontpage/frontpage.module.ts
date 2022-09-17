import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage.component';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FrontpageComponent, LoginComponent, PreviewComponent],
  imports: [BrowserModule, CommonModule, RouterModule, SharedModule],
  exports: [FrontpageComponent, LoginComponent],
  providers: [SharedModule],
})
export class FrontpageModule {}
