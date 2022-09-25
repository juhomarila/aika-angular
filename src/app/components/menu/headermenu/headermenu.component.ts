import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartModalComponent } from 'src/app/shared/components/shopping-cart-modal/shopping-cart-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { SignInModalComponent } from '../signinmodal/signinmodal.component';
import { SignUpModalComponent } from '../signupmodal/signupmodal.component';

@Component({
  selector: 'headerMenu',
  templateUrl: './headermenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadermenuComponent implements OnInit {
  noOfItemsInCart: number = 0;
  constructor(
    private modalSvc: NgbModal,
    private authSvc: AuthService,
    private shoppingCartSvc: ShoppingCartService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {}

  isLogged = false;
  username: string | undefined;

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    if (this.isLogged) {
      this.username = this.authSvc.user.displayName;
    }
    setInterval(() => {
      this.noOfItemsInCart = this.shoppingCartSvc.getCart().length;
      this.ref.markForCheck();
    }, 1000);
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

  search(event: any) {
    if (event.target.value.length === 1) {
      this.router.navigate(['search'], {
        queryParams: { s: event.target.value },
      });
    }
    if (event.target.value.length > 1) {
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

  openShoppingCartModal() {
    this.modalSvc.open(ShoppingCartModalComponent, { size: 'lg' });
  }
}
