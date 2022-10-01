import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  statusMessage: string = '';
  status: boolean = false;
  errorMsg: string = '';
  error: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
    private utilSvc: UtilService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.dismiss();
  }

  async updatePassword(newPsw: string, retypeNewPsw: string, oldPsw: string) {
    if (this.utilSvc.validatePasswords(newPsw, retypeNewPsw)) {
      if (this.utilSvc.checkAllRequirements(newPsw)) {
        await this.authSvc
          .resetPasswordInSettings(this.emailValue!, oldPsw, newPsw)
          .then(value => {
            if (value === '') {
              this.setStatusMessage('Salasananvaihto onnistui');
            }
            if (value === 'auth/wrong-password') {
              this.setStatusMessage('Nykyinen salasana on väärä');
            } else {
              this.setStatusMessage(
                'Salasananvaihto ei onnistunut, yritä uudelleen'
              );
            }
          })
          .catch(e => console.log(e));
      }
      if (!this.utilSvc.passwordRequirements(newPsw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee sisältää isoja ja pieniä kirjaimia, sekä numeroita.';
      }
      if (!this.utilSvc.passwordLength(newPsw)) {
        this.error = true;
        this.errorMsg =
          'Salasanan tulee olla vähintään kahdeksan merkkiä pitkä.';
      }
      if (!this.utilSvc.checkWhiteSpace(newPsw)) {
        this.error = true;
        this.errorMsg = 'Salasanassa ei saa olla tyhjiä välejä.';
      }
    }
    if (!this.utilSvc.validatePasswords(newPsw, retypeNewPsw)) {
      this.error = true;
      this.errorMsg = 'Salasanat eivät täsmää.';
    }
  }

  async updateDisplayname(name: string) {
    this.authSvc.updateDisplayname(this.authSvc.user.uid, name).then(() => {
      this.setStatusMessage('Käyttäjänimen vaihto onnistui', true);
    });
  }

  setStatusMessage(msg: string, reload?: boolean) {
    this.loading.show();
    this.status = true;
    this.statusMessage = msg;
    setTimeout(() => {
      this.statusMessage = '';
      this.status = false;
      this.activeModal.dismiss();
      if (reload) {
        window.location.reload();
      }
      this.loading.hide();
    }, 3000);
  }
}
