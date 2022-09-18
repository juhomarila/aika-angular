import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignInModalComponent } from '../signinmodal/signinmodal.component';
import { SignUpModalComponent } from '../signupmodal/signupmodal.component';

@Component({
  selector: 'headerMenu',
  templateUrl: './headermenu.component.html',
})
export class HeadermenuComponent implements OnInit {
  constructor(private modalSvc: NgbModal, private authSvc: AuthService) {}

  isLogged = false;
  username!: string;

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
  }

  openSignIn() {
    this.modalSvc.open(SignInModalComponent, { size: 'lg' });
  }

  openSignUp() {
    this.modalSvc.open(SignUpModalComponent, { size: 'lg' });
  }

  logout() {
    this.authSvc.SignOut();
  }
}
