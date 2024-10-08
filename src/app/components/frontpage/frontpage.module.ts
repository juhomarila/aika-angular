import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxTranslateModule } from 'src/app/ngx-translate/ngx-translate.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [FrontpageComponent, LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SharedModule,
    NgxTranslateModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [FrontpageComponent, LoginComponent],
  providers: [SharedModule],
})
export class FrontpageModule {}
