import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { FavouriteService } from '../../services/favourite.service';
import { LikeService } from '../../services/like.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
})
export class ArticleModalComponent implements OnInit {
  @Input() article!: Article;
  owned: boolean = false;
  favourite: boolean = false;
  liked: boolean = false;
  likeChecked: boolean = false;
  inCart: boolean = false;
  shoppingCart: string[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService,
    private userSvc: UserService,
    private router: Router,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.owned = this.userSvc.checkIfOwned(this.article.key);
    this.liked = this.likeSvc.checkIfLiked(this.article.key);
    this.favourite = this.favouriteSvc.checkIfFavourite(this.article.key);
    if (this.article.likes === undefined) {
      this.article.likes = 0;
    }
    this.shoppingCartSvc.shoppingCart.subscribe(cart => {
      this.shoppingCart = cart;
    });
    this.inCart = this.checkIfIsInCart();
  }

  onSelectMagazine(magazine: string) {
    this.activeModal.dismiss();
    this.router.navigate(['magazine'], {
      queryParams: { g: magazine },
    });
  }

  onSelectJournalist(journalist: string) {
    this.activeModal.dismiss();
    this.router.navigate(['journalist'], {
      queryParams: { g: journalist },
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  favor() {
    this.favourite = true;
    this.favouriteSvc.addArticleToFavourites(this.article.key);
  }

  unfavor() {
    this.favourite = false;
    this.favouriteSvc.removeArticleFromFavourites(this.article.key);
  }

  like() {
    this.liked = true;
    this.likeSvc.likeArticle(this.article.key);
    this.article.likes += 1;
  }

  addToCart() {
    this.inCart = true;
    this.shoppingCartSvc.addToCart(this.article.key);
    return true;
  }

  removeFromCart() {
    this.inCart = false;
    this.shoppingCartSvc.removeFromCart(this.article.key);
  }

  checkIfIsInCart() {
    if (!this.shoppingCart.some(a => a === this.article.key)) {
      return false;
    }
    return true;
  }

  preview(text: string): string {
    let tmpArr = text.split(/\s+/g);
    tmpArr.splice(50, tmpArr.length - 50);
    return tmpArr.join(' ');
  }
}
