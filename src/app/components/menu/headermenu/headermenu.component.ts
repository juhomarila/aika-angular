import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartModalComponent } from 'src/app/shared/components/shopping-cart-modal/shopping-cart-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { SignInModalComponent } from '../signinmodal/signinmodal.component';
import { SignUpModalComponent } from '../signupmodal/signupmodal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'headerMenu',
  templateUrl: './headermenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadermenuComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  languageList = [
    { code: 'fi', label: 'Finnish' },
    { code: 'en', label: 'English' },
  ];
  noOfItemsInCart: number = 0;
  constructor(
    private modalSvc: NgbModal,
    private authSvc: AuthService,
    private shoppingCartSvc: ShoppingCartService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private translateSvc: TranslateService
  ) {}

  isLogged = false;
  username: string | undefined;

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    if (this.isLogged) {
      this.username = this.authSvc.user.displayName;
    }
    if (!this.isLogged) {
      this.logoutUserIsError();
    }
    this.shoppingCartSvc.shoppingCart.subscribe(cart => {
      this.noOfItemsInCart = cart.length;
      this.ref.markForCheck();
    });
    if (this.noOfItemsInCart === 0) {
      if (localStorage.getItem('cart') === null) {
        this.shoppingCartSvc.emptyCart();
      } else {
        this.shoppingCartSvc.setCart(JSON.parse(localStorage.getItem('cart')!));
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector(
      '.justify-content-between'
    ) as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('active-header');
    } else {
      element.classList.remove('active-header');
    }
  }

  detectInputLength(input: string) {
    if (input.length > 0) {
      this.searchInput.nativeElement.setAttribute('style', 'width: 18em;');
    }
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find(language => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.translateSvc.use(localeCode);
      localStorage.setItem('language', localeCode);
    }
  }

  search(event: any) {
    if (event.target.value.length === 0) {
      this.router.navigate(['frontpage']);
      this.searchInput.nativeElement.removeAttribute(
        'style',
        'width: 18em;   padding-left: 2em;   padding-right: 1em;   border: 1px solid var(--text);'
      );
    }
    if (event.target.value.length > 0) {
      this.searchInput.nativeElement.setAttribute(
        'style',
        'width: 18em;   padding-left: 2em;   padding-right: 1em;   border: 1px solid var(--text);'
      );
    }
    if (event.target.value.length === 1) {
      this.router.navigate(['search'], {
        queryParams: { s: event.target.value },
      });
    }
    if (event.target.value.length > 1) {
      this.router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          if (events.urlAfterRedirects.substring(0, 7) !== '/search') {
            event.target.value = '';
            this.searchInput.nativeElement.removeAttribute(
              'style',
              'width: 18em;   padding-left: 2em;   padding-right: 1em;   border: 1px solid var(--text);'
            );
          }
        }
      });
      this.router.navigate(['search'], {
        queryParams: { s: event.target.value },
        replaceUrl: true,
      });
    }
  }

  openSignIn() {
    this.modalSvc.open(SignInModalComponent, { size: 'lg' });
  }

  openSignUp() {
    this.modalSvc.open(SignUpModalComponent, { size: 'lg' });
  }

  logout() {
    this.authSvc.SignOut();
  }

  logoutUserIsError() {
    this.authSvc.LogOut();
  }

  openShoppingCartModal() {
    this.modalSvc.open(ShoppingCartModalComponent, { size: 'lg' });
  }
}
