import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
})
export class SignUpModalComponent {
  error: boolean = false;
  errorMsg: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
    private utilSvc: UtilService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signUp(email: string, psw: string, retypePassword: string) {
    if (this.utilSvc.validatePasswords(psw, retypePassword)) {
      if (this.utilSvc.checkAllRequirements(psw)) {
        const result = await this.authSvc.SignUp(email, psw, this.activeModal);
        if (result === 'auth/email-already-in-use') {
          this.error = true;
          this.errorMsg = 'Sähköpostiosoite on jo käytössä';
        }
      }
      if (!this.utilSvc.passwordRequirements(psw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee sisältää isoja ja pieniä kirjaimia, sekä numeroita.';
      }
      if (!this.utilSvc.passwordLength(psw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee olla vähintään kahdeksan merkkiä pitkä.';
      }
      if (!this.utilSvc.checkWhiteSpace(psw)) {
        this.error = true;
        this.errorMsg = 'Salasanassa ei saa olla tyhjiä välejä.';
      }
    }
    if (!this.utilSvc.validatePasswords(psw, retypePassword)) {
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
}
