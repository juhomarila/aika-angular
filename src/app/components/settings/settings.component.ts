import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  user!: User;
  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private fireStoreSvc: FirestoreService
  ) {}

  ngOnInit(): void {
    console.log(this.authSvc.user.uid);
    this.fireStoreSvc.getUser(this.authSvc.user.uid).subscribe(user => {
      this.user = user.data() as User;
    });
    console.log(this.user);
  }
}
