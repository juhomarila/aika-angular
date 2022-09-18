import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signinmodal',
  templateUrl: './signinmodal.component.html',
})
export class SignInModalComponent {
  forgotClicked: boolean = false;
  failed: boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private authSvc: AuthService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth();
    this.activeModal.dismiss();
  }

  async signIn(email: string, psw: string) {
    const login = await this.authSvc.SignIn(email, psw);
    if (!login) {
      this.failed = true;
    } else {
      this.activeModal.dismiss();
    }
  }

  forgotPassword() {
    this.forgotClicked = true;
  }

  handleForgotPassword(email: string) {
    console.log(email);
  }
}
