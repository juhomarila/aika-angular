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

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  @Input() article!: Article;
  @Output() selectedArticle = new EventEmitter<Article>();
  hover: boolean = false;
  inCart: boolean = false;
  arrayKey: number = 0;

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private ref: ChangeDetectorRef
  ) {
    // setInterval(() => {
    //   this.inCart = this.checkIfIsInCart();
    //   this.ref.markForCheck();
    // }, 1000);
    ref.detach();
    setInterval(() => {
      this.inCart = this.checkIfIsInCart();
      this.ref.detectChanges();
    }, 1000);
  }

  ngOnInit(): void {}

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
    return true;
  }

  removeFromCart() {
    this.inCart = false;
    this.shoppingCartSvc.removeFromCart(this.arrayKey);
  }

  checkIfIsInCart() {
    if (!this.shoppingCartSvc.getCart().some(a => a.key === this.article.key)) {
      return false;
    }
    return true;
  }
}
