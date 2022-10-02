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
        this.router.navigate(['frontpage']).then(() => {
          modal.dismiss();
          window.location.reload();
          this.loading.hide();
        });
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
          this.router.navigate(['frontpage']).then(() => {
            modal.dismiss();
            window.location.reload();
            this.loading.hide();
          });
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
    this.loading.show();
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        userCredentials.user?.sendEmailVerification();
        this.SetUserData(userCredentials.user).then(() => {
          modal.dismiss();
          window.location.reload();
          this.loading.hide();
        });
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
    localStorage.removeItem('journalist');
    localStorage.removeItem('magazine');
    this.router.navigate(['login']);
    window.location.reload();
  }

  async LogOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('journalist');
    localStorage.removeItem('magazine');
    this.router.navigate(['login']);
  }

  async resetPasswordInSettings(email: string, oldPsw: string, newPsw: string) {
    let msg = '';
    const login = await this.afAuth
      .signInWithEmailAndPassword(email, oldPsw)
      .then(() => {})
      .catch(e => {
        msg = e.code;
      });
    if (msg === '') {
      this.afAuth.currentUser.then(user => {
        user
          ?.updatePassword(newPsw)
          .then(() => {})
          .catch(e => {
            msg = e.code;
          });
      });
      return msg;
    }
    if (msg === 'auth/wrong-password') {
      return msg;
    }
    msg = 'something went wrong';
    return msg;
  }

  async sendForgotPasswordLink(email: string): Promise<boolean> {
    const result = this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return result;
  }

  async updateEmail(email: string): Promise<boolean> {
    return await this.afAuth.currentUser
      .then(user => user?.updateEmail(email))
      .then(() => {
        return true;
      })
      .catch(error => {
        return false;
      });
  }

  async updateDisplayname(uid: string, name: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    await this.afAuth.currentUser.then(user => {
      user
        ?.updateProfile({
          displayName: name,
        })
        .then(() => {
          userRef.set(
            { displayName: name },
            {
              merge: true,
            }
          );
        })
        .catch(() => {});
    });
  }

  async removeAccount() {
    try {
      this.afAuth.currentUser.then(user => {
        user?.delete();
      });
      return true;
    } catch {
      return false;
    }
  }
}
