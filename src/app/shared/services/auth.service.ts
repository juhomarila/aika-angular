import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private loading: LoadingService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get user() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async GoogleAuth(modal: NgbActiveModal) {
    await this.AuthLogin(new auth.GoogleAuthProvider(), modal);
  }

  async AuthLogin(provider: any, modal: NgbActiveModal) {
    this.loading.show();
    await this.afAuth
      .signInWithPopup(provider)
      .then(user => {
        this.SetUserData(user.user);
        this.router.navigate(['frontpage']);
        modal.dismiss();
        setTimeout(() => {
          window.location.reload();
          this.loading.hide();
        }, 3000);
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  }

  async SignIn(
    email: string,
    password: string,
    modal: NgbActiveModal
  ): Promise<string> {
    let msg = '';
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user?.emailVerified) {
          this.SetUserData(user.user);
          this.router.navigate(['frontpage']);
          modal.dismiss();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          msg = 'auth/email-not-verified';
        }
      })
      .catch(e => {
        msg = e.code;
      });
    return msg;
  }

  async SignUp(
    email: string,
    password: string,
    modal: NgbActiveModal
  ): Promise<string> {
    let msg = '';
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        userCredentials.user?.sendEmailVerification();
        this.SetUserData(userCredentials.user);
        modal.dismiss();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(e => {
        msg = e.code;
      });
    return msg;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.router.navigate(['login']);
    window.location.reload();
  }
}
