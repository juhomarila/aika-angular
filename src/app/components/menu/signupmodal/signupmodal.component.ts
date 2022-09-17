import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
})
export class SignUpModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private authSvc: AuthService,
  ) { }

  close() {
    this.activeModal.dismiss();
  }

  signUp(email: string, psw: string) {
    this.authSvc.SignUp(email, psw);
  }

}
