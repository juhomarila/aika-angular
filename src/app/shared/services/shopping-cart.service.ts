import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';
import { Owned } from '../interfaces/owned';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCartArray: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);
  shoppingCart = this.shoppingCartArray.asObservable();

  bought: Owned[] = [];
  constructor(
    private fireStoreSvc: FirestoreService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  addToCart(article: Article) {
    this.shoppingCartArray.next([...this.shoppingCartArray.value, article]);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCartArray.value));
    JSON.parse(localStorage.getItem('cart')!);
  }

  removeFromCart(article: Article) {
    let tmpArr: Article[] = this.shoppingCartArray.value;
    tmpArr.forEach((item, index) => {
      if (item.key === article.key) {
        tmpArr.splice(index, 1);
      }
    });
    this.shoppingCartArray.next(tmpArr);
    localStorage.setItem('cart', JSON.stringify(tmpArr));
    JSON.parse(localStorage.getItem('cart')!);
  }

  emptyCart() {
    this.shoppingCartArray.next([]);
    localStorage.setItem('cart', JSON.stringify([]));
    JSON.parse(localStorage.getItem('cart')!);
  }

  setCart(articleArray: Article[]) {
    this.shoppingCartArray.next(articleArray);
  }

  async checkOut() {
    if (this.doPayment()) {
      this.shoppingCartArray.value.forEach(async article => {
        await this.fireStoreSvc.buyArticle(this.authSvc.user.uid, article.key);
        let boughtArticle: Owned = { key: article.key, time: Date.now() };
        this.bought.push(boughtArticle);
        this.userSvc.setOwnedArticles(boughtArticle);
      });
      localStorage.removeItem('cart');
      this.emptyCart();
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
