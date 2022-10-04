import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import { LikeService } from '../../services/like.service';
import { FavouriteService } from '../../services/favourite.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input() article!: Article;
  @Input() owned: boolean = false;
  @Input() favourite: boolean = false;
  @Output() selectedArticle = new EventEmitter<Article>();
  @Output() selectedMagazine = new EventEmitter<string>();
  @Output() selectedJournalist = new EventEmitter<string>();
  hover: boolean = false;
  inCart: boolean = false;
  arrayKey: number = 0;

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private likeSvc: LikeService,
    private favouriteSvc: FavouriteService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>,
    public router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes['owned'].currentValue);
  }

  ngOnInit(): void {
    this.ref.detach();
    setInterval(() => {
      this.inCart = this.checkIfIsInCart();
      this.ref.detectChanges();
    }, 1000);
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

  like() {
    this.favourite = true;
    this.favouriteSvc.addArticleToFavourites(this.article.key);
  }

  unlike() {
    this.favourite = false;
    this.favouriteSvc.removeArticleFromFavourites(this.article.key);
  }
}
