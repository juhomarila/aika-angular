import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Article } from '../../interfaces/article';
import { LoadingService } from '../../services/loading.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
})
export class ShoppingCartModalComponent implements OnInit {
  shoppingCartList: Article[] = [];
  successfulPayment: boolean = true;
  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private activeModal: NgbActiveModal,
    private store: Store<AppState>,
    private loading: LoadingService,
    private route: Router
  ) {
    this.shoppingCartList = this.shoppingCartSvc.getCart();
  }

  ngOnInit(): void {}

  close() {
    this.activeModal.dismiss();
  }

  removeFromCart(index: number) {
    this.shoppingCartSvc.removeFromCart(index);
  }

  emptyCart() {
    this.shoppingCartSvc.emptyCart();
    this.shoppingCartList = [];
  }

  async checkOut() {
    this.loading.show();
    const result = await this.shoppingCartSvc.checkOut();
    if (!result) {
      this.successfulPayment = false;
    }
    setTimeout(() => {
      this.activeModal.dismiss();
      window.location.reload();
      this.loading.hide();
    }, 1500);
  }

  // async checkOut() {
  //   this.loading.show();
  //   await this.shoppingCartSvc
  //     .checkOut()
  //     .then(result => {
  //       if (!result) {
  //         this.successfulPayment = false;
  //       }
  //     })
  //     .then(() => {
  //       this.activeModal.dismiss();
  //       window.location.reload();
  //       this.loading.hide();
  //     })
  //     .catch(error => error.log(error));
  // }
}
