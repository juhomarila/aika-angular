import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadermenuComponent } from './headermenu/headermenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignInModalComponent } from './signinmodal/signinmodal.component';
import { SignUpModalComponent } from './signupmodal/signupmodal.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeadermenuComponent,
    ForgotPasswordComponent,
    SignInModalComponent,
    SignUpModalComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, CommonModule, RouterModule],
  exports: [HeadermenuComponent, ForgotPasswordComponent, FooterComponent],
  providers: [AuthService, RouterModule],
})
export class MenuModule {}
