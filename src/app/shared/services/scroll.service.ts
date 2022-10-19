import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { empty, fromEvent, map, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  public navigation$: Observable<number>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.navigation$ = fromEvent(window, 'scroll').pipe(
        map(event => {
          return window.scrollY || this.document.documentElement.scrollTop;
        }),
        share()
      );
    } else {
      this.navigation$ = empty();
    }
  }
}
