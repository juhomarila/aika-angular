import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

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
}
