import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: Article[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService
  ) {
    if (this.shoppingCart.length === 0) {
      if (localStorage.getItem('cart') === null) {
        this.shoppingCart = [];
      } else {
        this.shoppingCart = JSON.parse(localStorage.getItem('cart')!);
      }
    }
  }

  addToCart(article: Article): number {
    this.shoppingCart.push(article);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    JSON.parse(localStorage.getItem('cart')!);
    this.shoppingCart.slice();
    return this.shoppingCart.length - 1;
  }

  removeFromCart(key: number) {
    this.shoppingCart.splice(key, 1);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    JSON.parse(localStorage.getItem('cart')!);
  }

  emptyCart() {
    this.shoppingCart = [];
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    JSON.parse(localStorage.getItem('cart')!);
  }

  async checkOut() {
    if (this.doPayment()) {
      console.log(this.authSvc.user.uid);
      this.shoppingCart.forEach(
        async article =>
          await this.fireStoreSvc.buyArticle(this.authSvc.user.uid, article.key)
      );
      localStorage.removeItem('cart');
      this.shoppingCart = [];
      return true;
    } else {
      return false;
      // todo inform about unsuccessfull payment
    }
  }

  getCart() {
    return this.shoppingCart;
  }

  doPayment() {
    return true;
  }
}
