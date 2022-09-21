import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Article } from '../../interfaces/article';
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
    private store: Store<AppState>
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

  checkOut() {
    const result = this.shoppingCartSvc.checkOut();
    if (!result) {
      this.successfulPayment = false;
    }
    this.activeModal.dismiss();
  }
}
