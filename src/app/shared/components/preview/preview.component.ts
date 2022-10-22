import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import {
  AddCartAction,
  RemoveCartAction,
} from 'src/app/shared/store/actions/cart.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/reducers';
import { Router } from '@angular/router';
import { FavouriteService } from '../../services/favourite.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  @Input() article!: Article;
  owned: boolean = false;
  favourite: boolean = false;
  @Output() selectedArticle = new EventEmitter<Article>();
  @Output() selectedMagazine = new EventEmitter<string>();
  @Output() selectedJournalist = new EventEmitter<string>();
  hover: boolean = false;
  inCart: boolean = false;
  bought: boolean = false;
  arrayKey: number = 0;
  language: string = '';

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>,
    public router: Router,
    private userSvc: UserService,
    private favouriteSvc: FavouriteService
  ) {}

  ngOnInit(): void {
    if (this.article) {
      this.owned = this.userSvc.checkIfOwned(this.article.key);
      this.favourite = this.favouriteSvc.checkIfFavourite(this.article.key);
      this.language = localStorage.getItem('language')!;
      this.ref.detach();
      setInterval(() => {
        this.inCart = this.checkIfIsInCart();
        this.bought = this.checkIfIsBought();
        if (this.bought) {
          this.owned = this.bought;
        }
        this.ref.detectChanges();
      }, 1000);
    }
  }

  onSelect(article: Article) {
    this.selectedArticle.emit(article);
  }

  onSelectMagazine(magazine: string) {
    this.selectedMagazine.emit(magazine);
  }

  onSelectJournalist(journalist: string) {
    this.selectedJournalist.emit(journalist);
  }

  mouseOver() {
    this.hover = true;
  }

  mouseLeave() {
    this.hover = false;
  }

  addToCart() {
    this.inCart = true;
    this.arrayKey = this.shoppingCartSvc.addToCart(this.article);
    this.store.dispatch(new AddCartAction(this.article));
    return true;
  }

  removeFromCart() {
    this.inCart = false;
    this.store.dispatch(new RemoveCartAction(this.article));
    this.shoppingCartSvc.removeFromCart(this.arrayKey);
  }

  checkIfIsInCart() {
    if (!this.shoppingCartSvc.getCart().some(a => a.key === this.article.key)) {
      return false;
    }
    return true;
  }

  checkIfIsBought() {
    if (
      !this.shoppingCartSvc.getBought().some(a => a.key === this.article.key)
    ) {
      return false;
    }
    return true;
  }

  like() {
    this.favourite = true;
    this.favouriteSvc.addArticleToFavourites(this.article.key);
  }

  unlike() {
    this.favourite = false;
    this.favouriteSvc.removeArticleFromFavourites(this.article.key);
  }
}
