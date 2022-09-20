import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
})
export class ShoppingCartModalComponent implements OnInit {
  shoppingCartList: Article[] = [];
  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private activeModal: NgbActiveModal
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
    this.shoppingCartSvc.checkOut();
    this.activeModal.dismiss();
  }
}
