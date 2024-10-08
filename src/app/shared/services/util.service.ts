import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Article } from '../interfaces/article';
import { ErrorMessage } from '../interfaces/error-message';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private translate: TranslateService) {}

  weightedSorter(articles: Article[]) {
    return articles.sort(
      (a, b) =>
        b.likes * 0.6 +
        b.tbr * 0.9 -
        (Date.now() -
          new Date(b.date.year, b.date.month, b.date.day).getTime()) /
          8000000 -
        (a.likes * 0.6 +
          a.tbr * 0.9 -
          (Date.now() -
            new Date(a.date.year, a.date.month, a.date.day).getTime()) /
            8000000)
    );
  }

  // for article dates (separate strings for every value day/month/year)
  byDateSorter(articles: Article[]) {
    return articles.sort(
      (a, b) =>
        b.date.year - a.date.year ||
        b.date.month - a.date.month ||
        b.date.day - a.date.day
    );
  }

  byEpochDateSorter(dates: number[]) {
    return dates.sort((a, b) => a - b);
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
        errorMsg: this.translate.instant('errors.noUserWithEmail'),
        clicked: false,
      };
    }
    if (result === 'auth/invalid-email') {
      error = {
        error: true,
        errorMsg: this.translate.instant('errors.invalidEmail'),
        clicked: false,
      };
    }
    if (result === 'auth/email-already-in-use') {
      error = {
        error: true,
        errorMsg: this.translate.instant('errors.emailAlreadyInUse'),
        clicked: false,
      };
    }
    if (result === 'auth/email-not-verified') {
      error = {
        error: true,
        errorMsg: this.translate.instant('errors.emailNotVerified'),
        clicked: false,
      };
    }
    if (result === 'auth/wrong-password') {
      error = {
        error: true,
        errorMsg: this.translate.instant('errors.wrongPsw'),
        clicked: false,
      };
    }
    return error;
  }

  verifyLocale(locale: string): string {
    if (
      locale === 'sv_FI' ||
      locale === 'sv' ||
      locale === 'FI' ||
      locale === 'fi' ||
      locale === 'fi_FI'
    ) {
      return 'fi';
    } else {
      return 'en';
    }
  }
}
