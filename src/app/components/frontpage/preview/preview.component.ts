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

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit {
  @Input() article!: Article;
  @Input() owned: boolean = false;
  @Output() selectedArticle = new EventEmitter<Article>();
  hover: boolean = false;
  inCart: boolean = false;
  arrayKey: number = 0;

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>,
    public route: Router
  ) {}

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
}
