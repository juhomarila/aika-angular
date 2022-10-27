import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { LoadingService } from '../../services/loading.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
})
export class ShoppingCartModalComponent implements OnInit {
  shoppingCartList: Article[] = [];
  successfulPayment: boolean = true;
  clicked: boolean = false;
  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private activeModal: NgbActiveModal,
    private loading: LoadingService
  ) {
    this.shoppingCartSvc.shoppingCart.subscribe(cart => {
      this.shoppingCartList = cart;
    });
  }

  ngOnInit(): void {}

  close() {
    this.activeModal.dismiss();
  }

  removeFromCart(article: Article) {
    this.shoppingCartSvc.removeFromCart(article);
  }

  emptyCart() {
    this.shoppingCartSvc.emptyCart();
    this.shoppingCartList = [];
  }

  async checkOut() {
    this.clicked = true;
    this.loading.show();
    const result = await this.shoppingCartSvc.checkOut();
    if (!result) {
      this.successfulPayment = false;
      this.loading.hide();
      this.clicked = false;
    } else {
      setTimeout(() => {
        this.activeModal.dismiss();
        this.loading.hide();
      }, 1500);
    }
  }
}
