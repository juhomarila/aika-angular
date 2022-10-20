import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  locale: string = 'fi';

  setLocale() {
    if (navigator.languages.length > 0) {
      this.locale = navigator.languages[0];
    }
  }
}
