import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.user = this.authSvc.user;
    if (this.accountRemoval) {
      this.error = true;
      this.errorMsg =
        'Tilisi kaikki tiedot, ostot mukaanlukien poistetaan, etkä pysty palauttamaan tiliäsi. Vahvista poisto painamalla painiketta';
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  async removeAccount(removePsw: string) {
    this.clicked = true;
    this.authSvc
      .removeAccount(this.authSvc.user.uid, this.emailValue!, removePsw)
      .then(status => {
        console.log(status);
      });
    this.setStatusMessage(
      'Tilisi poistettu, sinut kirjataan ulos automaattisesti'
    );
  }

  async updateEmail(psw: string, newEmail: string) {
    this.clicked = true;
    this.authSvc.updateEmail(psw, newEmail, this.emailValue!);
    this.error = true;
    this.errorMsg =
      'Tarkista sähköpostisi, se päivitetään kun olet käynyt verifioimassa sähköpostiosoitteesi sähköpostiin lähtetystä linkistä.';
    this.setStatusMessage('Sinut kirjataan automaattisesti ulos');
  }

  async updatePassword(newPsw: string, retypeNewPsw: string, oldPsw: string) {
    if (newPsw === oldPsw) {
      this.error = true;
      this.errorMsg = 'Uusi ja vanha salasana ovat samat';
    } else {
      if (this.utilSvc.validatePasswords(newPsw, retypeNewPsw)) {
        if (this.utilSvc.checkAllRequirements(newPsw)) {
          this.error = false;
          await this.authSvc
            .resetPasswordInSettings(this.emailValue!, oldPsw, newPsw)
            .then(value => {
              if (value === 'auth/wrong-password') {
                this.error = true;
                this.errorMsg = 'Nykyinen salasana on väärä';
              } else {
                this.setStatusMessage('Salasananvaihto onnistui');
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
  }

  async updateDisplayname(name: string) {
    if (name.length > 4) {
      this.authSvc.updateDisplayname(this.user.uid, name).then(() => {
        this.setStatusMessage('Käyttäjänimen vaihto onnistui', true);
      });
    } else {
      this.error = true;
      this.errorMsg = 'Käyttäjänimen on oltava vähintään neljä merkkiä pitkä';
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
