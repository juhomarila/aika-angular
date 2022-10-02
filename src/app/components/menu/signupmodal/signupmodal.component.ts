import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/shared/interfaces/error-message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
})
export class SignUpModalComponent {
  error: ErrorMessage = {
    error: false,
    errorMsg: '',
    clicked: false,
  };
  show: boolean = false;
  show2: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
    private utilSvc: UtilService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signUp(email: string, psw: string, retypePassword: string) {
    this.error.clicked = true;
    if (this.utilSvc.validatePasswords(psw, retypePassword)) {
      if (this.utilSvc.checkAllRequirements(psw)) {
        await this.authSvc.SignUp(email, psw, this.activeModal).then(result => {
          this.error = this.utilSvc.messageSvc(
            result,
            'Käyttäjätili luotu onnistuneesti, tarkista sähköpostistasi vahvistusviesti ja seuraa ohjeita'
          );
        });
      }
      if (!this.utilSvc.passwordRequirements(psw)) {
        this.error.error = true;
        this.error.errorMsg =
          'Salasanan tulee sisältää isoja ja pieniä kirjaimia, sekä numeroita.';
        this.error.clicked = false;
      }
      if (!this.utilSvc.passwordLength(psw)) {
        this.error.error = true;
        this.error.errorMsg =
          'Salasanan tulee olla vähintään kahdeksan merkkiä pitkä.';
        this.error.clicked = false;
      }
      if (!this.utilSvc.checkWhiteSpace(psw)) {
        this.error.error = true;
        this.error.errorMsg = 'Salasanassa ei saa olla tyhjiä välejä.';
        this.error.clicked = false;
      }
    }
    if (!this.utilSvc.validatePasswords(psw, retypePassword)) {
      this.error.error = true;
      this.error.errorMsg = 'Salasanat eivät täsmää.';
      this.error.clicked = false;
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

  showPsw() {
    this.show = !this.show;
  }

  showPsw2() {
    this.show2 = !this.show2;
  }
}
