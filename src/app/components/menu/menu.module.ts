import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadermenuComponent } from './headermenu/headermenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignInModalComponent } from './signinmodal/signinmodal.component';
import { SignUpModalComponent } from './signupmodal/signupmodal.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgxTranslateModule } from 'src/app/ngx-translate/ngx-translate.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HeadermenuComponent,
    SignInModalComponent,
    SignUpModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgxTranslateModule,
    SharedModule,
  ],
  exports: [HeadermenuComponent, FooterComponent],
  providers: [AuthService, RouterModule],
})
export class MenuModule {}
