import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    if (this.isLogged) {
      this.router.navigate(['frontpage']);
    }
  }
}
