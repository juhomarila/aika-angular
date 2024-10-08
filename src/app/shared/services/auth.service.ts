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
      .catch(() => {
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
          this.SetUserData(user.user).then(() => {
            this.router.navigate(['frontpage']).then(() => {
              modal.dismiss();
              window.location.reload();
              this.loading.hide();
            });
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
        userCredentials.user?.sendEmailVerification().then(() => {
          this.SetUserData(userCredentials.user).then(() => {
            setTimeout(() => {
              modal.dismiss();
              window.location.reload();
              this.loading.hide();
            }, 3000);
          });
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
    localStorage.removeItem('state');
    this.router.navigate(['login']);
    window.location.reload();
  }

  async LogOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('journalist');
    localStorage.removeItem('magazine');
    localStorage.removeItem('state');
    this.router.navigate(['login']);
  }

  async resetPasswordInSettings(email: string, oldPsw: string, newPsw: string) {
    let msg = '';
    await this.afAuth
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

  async sendForgotPasswordLink(email: string): Promise<string> {
    let msg = '';
    await this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {})
      .catch(e => {
        msg = e.code;
      });
    return msg;
  }

  async updateEmail(
    psw: string,
    newEmail: string,
    oldEmail: string
  ): Promise<boolean> {
    let msg = '';
    await this.afAuth
      .signInWithEmailAndPassword(oldEmail, psw)
      .then(() => {})
      .catch(e => {
        msg = e.code;
      });
    try {
      if (msg === '') {
        await this.afAuth.currentUser
          .then(user => {
            user?.verifyBeforeUpdateEmail(newEmail);
          })
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      }
    } catch {
      return false;
    }
    return false;
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

  async removeAccount(uid: string, email: string, removePsw: string) {
    let msg = '';
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    await this.afAuth
      .signInWithEmailAndPassword(email, removePsw)
      .then(() => {})
      .catch(e => {
        msg = e.code;
      });
    try {
      if (msg === '') {
        this.afAuth.currentUser.then(user => {
          user?.delete();
        });
        userRef.delete();
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
}
