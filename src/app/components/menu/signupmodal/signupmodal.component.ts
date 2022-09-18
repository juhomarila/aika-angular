import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
})
export class SignUpModalComponent {
  error: boolean = false;
  errorMsg: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signUp(email: string, psw: string, retypePassword: string) {
    if (this.validatePasswords(psw, retypePassword)) {
      if (this.checkAllRequirements(psw)) {
        const result = await this.authSvc.SignUp(email, psw, this.activeModal);
        if (result === 'auth/email-already-in-use') {
          this.error = true;
          this.errorMsg = 'Sähköpostiosoite on jo käytössä';
        }
      }
      if (!this.passwordRequirements(psw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee sisältää isoja ja pieniä kirjaimia, sekä numeroita.';
      }
      if (!this.passwordLength(psw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee olla vähintään kahdeksan merkkiä pitkä.';
      }
      if (!this.checkWhiteSpace(psw)) {
        this.error = true;
        this.errorMsg = 'Salasanassa ei saa olla tyhjiä välejä.';
      }
    }
    if (!this.validatePasswords(psw, retypePassword)) {
      this.error = true;
      this.errorMsg = 'Salasanat eivät täsmää.';
    }
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth(this.activeModal);
    //this.activeModal.dismiss();
  }

  validatePasswords(password: string, retypePassword: string) {
    if (password != retypePassword) {
      return false;
    }
    return true;
  }

  passwordRequirements(password: string) {
    const upper = /[A-Z]/.test(password),
      lower = /[a-z]/.test(password),
      num = /[0-9]/.test(password);

    return upper && lower && num;
  }

  passwordLength(password: string) {
    if (password.length < 8) {
      return false;
    }
    return true;
  }

  checkWhiteSpace(password: string) {
    if (/\s/.test(password)) {
      return false;
    }
    return true;
  }

  checkAllRequirements(password: string) {
    if (
      this.passwordRequirements(password) &&
      this.passwordLength(password) &&
      this.checkWhiteSpace(password)
    ) {
      return true;
    }
    return false;
  }
}
