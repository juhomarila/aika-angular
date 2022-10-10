import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { FavouriteService } from '../../services/favourite.service';
import { FirestoreService } from '../../services/firestore.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
})
export class ArticleModalComponent implements OnInit {
  @Input() article!: Article;
  @Input() owned!: boolean;
  @Input() favourite!: boolean;
  @Input() liked!: boolean;
  constructor(
    private activeModal: NgbActiveModal,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService
  ) {}

  ngOnInit(): void {
    console.log(this.article.key);
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
}
