import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { ErrorMessage } from '../interfaces/error-message';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  byDateSorter(articles: Article[]) {
    return articles.sort(
      (a, b) =>
        b.date.year - a.date.year ||
        b.date.month - a.date.month ||
        b.date.day - a.date.day
    );
  }

  validatePasswords(password: string, retypePassword: string) {
    if (password != retypePassword) {
      return false;
    }
    return true;
  }

  passwordRequirements(password: string) {
    const upper = /[A-Z]/.test(password),
      lower = /[a-z]/.test(password),
      num = /[0-9]/.test(password);

    return upper && lower && num;
  }

  passwordLength(password: string) {
    if (password.length < 8) {
      return false;
    }
    return true;
  }

  checkWhiteSpace(password: string) {
    if (/\s/.test(password)) {
      return false;
    }
    return true;
  }

  checkAllRequirements(password: string) {
    if (
      this.passwordRequirements(password) &&
      this.passwordLength(password) &&
      this.checkWhiteSpace(password)
    ) {
      return true;
    }
    return false;
  }

  messageSvc(result: string, message?: string) {
    let error: ErrorMessage = {
      error: false,
      errorMsg: '',
      clicked: false,
    };
    if (result === '') {
      error = {
        error: true,
        errorMsg: message!,
        clicked: true,
      };
    }
    if (result === 'auth/user-not-found') {
      error = {
        error: true,
        errorMsg: 'Annetulla sähköpostiosoitteella ei löydy käyttäjää.',
        clicked: false,
      };
    }
    if (result === 'auth/invalid-email') {
      error = {
        error: true,
        errorMsg: 'Väärä sähköpostiosoite',
        clicked: false,
      };
    }
    if (result === 'auth/email-already-in-use') {
      error = {
        error: true,
        errorMsg: 'Sähköpostiosoite on jo käytössä',
        clicked: false,
      };
    }
    if (result === 'auth/email-not-verified') {
      error = {
        error: true,
        errorMsg:
          'Sähköpostiosoitetta ei ole vahvistettu, tarkasta sähköpostisi',
        clicked: false,
      };
    }
    if (result === 'auth/wrong-password') {
      error = {
        error: true,
        errorMsg: 'Väärä salasana',
        clicked: false,
      };
    }

    // else {
    //   error = {
    //     error: true,
    //     errorMsg: 'Jokin meni pieleen, yritä uudelleen.',
    //     clicked: false,
    //   };
    // }
    return error;
  }
}
