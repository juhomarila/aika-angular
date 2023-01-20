import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
})
export class SettingModalComponent implements OnInit {
  @Input() title!: string;
  @Input() email?: boolean;
  @Input() emailValue?: string;
  @Input() password?: boolean;
  @Input() name?: boolean;
  @Input() accountRemoval?: boolean;
  statusMessage: string = '';
  status: boolean = false;
  errorMsg: string = '';
  error: boolean = false;
  user!: User;
  clicked: boolean = false;
  show: boolean = false;
  show2: boolean = false;
  show3: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
    private utilSvc: UtilService,
    private loading: LoadingService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user = this.authSvc.user;
    if (this.accountRemoval) {
      this.error = true;
      this.errorMsg = this.translate.instant('settings.modal.confirmRemoval');
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  async removeAccount(removePsw: string) {
    this.clicked = true;
    this.authSvc
      .removeAccount(this.authSvc.user.uid, this.emailValue!, removePsw)
      .then(() => {});
    this.setStatusMessage(
      this.translate.instant('settings.modal.afterRemoval')
    );
  }

  async updateEmail(psw: string, newEmail: string) {
    this.clicked = true;
    this.authSvc.updateEmail(psw, newEmail, this.emailValue!);
    this.error = true;
    this.errorMsg = this.translate.instant('settings.modal.confirmEmailChange');
    this.setStatusMessage(this.translate.instant('settings.modal.autoLogout'));
  }

  async updatePassword(newPsw: string, retypeNewPsw: string, oldPsw: string) {
    if (newPsw === oldPsw) {
      this.error = true;
      this.errorMsg = this.translate.instant('errors.newOldSame');
    } else {
      if (this.utilSvc.validatePasswords(newPsw, retypeNewPsw)) {
        if (this.utilSvc.checkAllRequirements(newPsw)) {
          this.error = false;
          await this.authSvc
            .resetPasswordInSettings(this.emailValue!, oldPsw, newPsw)
            .then(value => {
              if (value === 'auth/wrong-password') {
                this.error = true;
                this.errorMsg = this.translate.instant('errors.currentWrong');
              } else {
                this.setStatusMessage(
                  this.translate.instant('success.passwordChange')
                );
              }
            })
            .catch(e => '');
        }
        if (!this.utilSvc.passwordRequirements(newPsw)) {
          this.error = true;
          this.errorMsg = this.translate.instant('errors.pswCapital');
        }
        if (!this.utilSvc.passwordLength(newPsw)) {
          this.error = true;
          this.errorMsg = this.translate.instant('errors.pswLength');
        }
        if (!this.utilSvc.checkWhiteSpace(newPsw)) {
          this.error = true;
          this.errorMsg = this.translate.instant('errors.pswNoEmptySpaces');
        }
      }
      if (!this.utilSvc.validatePasswords(newPsw, retypeNewPsw)) {
        this.error = true;
        this.errorMsg = this.translate.instant('errors.pswsNotMatch');
      }
    }
  }

  async updateDisplayname(name: string) {
    if (name.length > 4) {
      this.authSvc.updateDisplayname(this.user.uid, name).then(() => {
        this.setStatusMessage(
          this.translate.instant('success.usernameChange'),
          true
        );
      });
    } else {
      this.error = true;
      this.errorMsg = this.translate.instant('errors.usernameChange');
    }
  }

  async setStatusMessage(msg: string, reload?: boolean) {
    this.clicked = true;
    this.loading.show();
    this.status = true;
    this.statusMessage = msg;
    setTimeout(() => {
      this.statusMessage = '';
      this.status = false;
      this.activeModal.close('success');
      this.loading.hide();
    }, 5000);
  }

  showPsw() {
    this.show = !this.show;
  }

  showPsw2() {
    this.show2 = !this.show2;
  }

  showPsw3() {
    this.show3 = !this.show3;
  }
}
