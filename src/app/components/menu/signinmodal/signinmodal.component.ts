import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessage } from 'src/app/shared/interfaces/error-message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-signinmodal',
  templateUrl: './signinmodal.component.html',
})
export class SignInModalComponent {
  forgotClicked: boolean = false;
  error: ErrorMessage = {
    error: false,
    errorMsg: '',
    clicked: false,
  };
  show: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
    private utilSvc: UtilService,
    private translate: TranslateService
  ) {}

  close() {
    this.activeModal.dismiss();
  }

  async signInWithGoogle() {
    await this.authSvc.GoogleAuth(this.activeModal);
  }

  async signIn(email: string, psw: string) {
    this.error.clicked = true;
    await this.authSvc.SignIn(email, psw, this.activeModal).then(result => {
      this.error = this.utilSvc.messageSvc(result);
    });
  }

  forgotPassword() {
    this.forgotClicked = true;
  }

  async handleForgotPassword(email: string) {
    this.error.clicked = true;
    this.authSvc.sendForgotPasswordLink(email).then(result => {
      this.error = this.utilSvc.messageSvc(
        result,
        this.translate.instant('errors.pswResetLinkSent')
      );
    });
  }

  showPsw() {
    this.show = !this.show;
  }
}
