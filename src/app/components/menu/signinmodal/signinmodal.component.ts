import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signinmodal',
  templateUrl: './signinmodal.component.html'
})
export class SignInModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
  ) { }

  close() {
    this.activeModal.dismiss();
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth();
    this.activeModal.dismiss();
  }

  async signIn(email: string, psw: string) {
    await this.authSvc.SignIn(email, psw);
    this.activeModal.dismiss();
  }
}
