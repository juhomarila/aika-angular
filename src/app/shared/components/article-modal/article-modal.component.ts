import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Like } from '../../interfaces/like';
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
  @Input() favouriteList: Favourite[] = [];
  @Input() likedArticlesList: Like[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.article.likes === undefined) {
      this.article.likes = 0;
    }
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
    this.favouriteList.push({ key: this.article.key });
  }

  unfavor() {
    this.favourite = false;
    this.favouriteSvc.removeArticleFromFavourites(this.article.key);
    const index = this.favouriteList.findIndex(
      fav => fav.key === this.article.key
    );
    if (index > -1) {
      this.favouriteList.splice(index, 1);
    }
  }

  like() {
    this.liked = true;
    this.likeSvc.likeArticle(this.article.key);
    this.article.likes += 1;
    this.likedArticlesList.push({ key: this.article.key });
  }
}
