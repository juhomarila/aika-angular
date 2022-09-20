import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: Article[] = [];
  constructor() {
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

  checkOut() {
    // todo backend methods for shoppingcartss
    console.log('ostettu');
    console.log(this.shoppingCart);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    JSON.parse(localStorage.getItem('cart')!);
    this.shoppingCart = [];
  }

  getCart() {
    return this.shoppingCart;
  }
}
