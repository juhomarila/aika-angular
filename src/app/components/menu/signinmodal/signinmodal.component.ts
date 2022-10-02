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
  error: boolean = false;
  errorMsg: string = '';
  clicked: boolean = false;
  show: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private authSvc: AuthService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth(this.activeModal);
    //this.activeModal.dismiss();
  }

  async signIn(email: string, psw: string) {
    this.clicked = true;
    const login = await this.authSvc.SignIn(email, psw, this.activeModal);
    if (login === 'auth/invalid-email') {
      this.error = true;
      this.errorMsg = 'Väärä sähköpostiosoite';
      this.clicked = false;
    }
    if (login === 'auth/user-not-found') {
      this.error = true;
      this.errorMsg = 'Annetulla sähköpostilla ei rekisteröityneitä käyttäjiä';
      this.clicked = false;
    }
    if (login === 'auth/wrong-password') {
      this.error = true;
      this.errorMsg = 'Väärä salasana';
      this.clicked = false;
    }
    if (login === 'auth/email-not-verified') {
      this.error = true;
      this.errorMsg =
        'Sähköpostiosoitetta ei ole vahvistettu, tarkasta sähköpostisi';
      this.clicked = false;
    }
  }

  forgotPassword() {
    this.forgotClicked = true;
  }

  async handleForgotPassword(email: string) {
    this.clicked = true;
    this.authSvc.sendForgotPasswordLink(email).then(result => {
      console.log(result);
      if (result === '') {
        this.error = true;
        this.errorMsg =
          'Sähköpostiisi on lähetetty salasanan nollauslinkki, tarkasta sähköpostisi ja odota muutama minuutti';
      }
      if (result === 'auth/user-not-found') {
        this.error = true;
        this.errorMsg = 'Sähköpostiosoitteella ei löydy käyttäjää.';
        this.clicked = false;
      }
      if (result === 'auth/invalid-email') {
        this.error = true;
        this.errorMsg = 'Väärä sähköpostiosoite';
        this.clicked = false;
      } else {
        this.error = true;
        this.errorMsg = 'Jokin meni pieleen, yritä uudelleen.';
        this.clicked = false;
      }
    });
  }

  showPsw() {
    this.show = !this.show;
  }
}
