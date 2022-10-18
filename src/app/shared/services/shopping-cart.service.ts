import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { Owned } from '../interfaces/owned';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: Article[] = [];
  bought: Owned[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService,
    private userSvc: UserService
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
      this.shoppingCart.forEach(async article => {
        await this.fireStoreSvc.buyArticle(this.authSvc.user.uid, article.key);
        let boughtArticle: Owned = { key: article.key, time: Date.now() };
        this.bought.push(boughtArticle);
        this.userSvc.setOwnedArticles(boughtArticle);
      });
      localStorage.removeItem('cart');
      this.shoppingCart = [];
      return true;
    } else {
      return false;
    }
  }

  getCart() {
    return this.shoppingCart;
  }

  doPayment() {
    return true;
  }

  getBought() {
    return this.bought;
  }

  emptyBought() {
    this.bought = [];
  }
}
