import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
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
    private utilSvc: UtilService,
    private translate: TranslateService
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
            this.translate.instant('success.userCreated')
          );
        });
      }
      if (!this.utilSvc.passwordRequirements(psw)) {
        this.error.error = true;
        this.error.errorMsg = this.translate.instant('errors.pwsCapital');
        this.error.clicked = false;
      }
      if (!this.utilSvc.passwordLength(psw)) {
        this.error.error = true;
        this.error.errorMsg = this.translate.instant('errors.pswLength');
        this.error.clicked = false;
      }
      if (!this.utilSvc.checkWhiteSpace(psw)) {
        this.error.error = true;
        this.error.errorMsg = this.translate.instant('errors.pswNoEmptySpaces');
        this.error.clicked = false;
      }
    }
    if (!this.utilSvc.validatePasswords(psw, retypePassword)) {
      this.error.error = true;
      this.error.errorMsg = this.translate.instant('errors.pswsNotMatch');
      this.error.clicked = false;
    }
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth(this.activeModal);
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
