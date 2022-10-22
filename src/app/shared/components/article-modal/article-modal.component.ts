import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { FavouriteService } from '../../services/favourite.service';
import { LikeService } from '../../services/like.service';
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

  constructor(
    private activeModal: NgbActiveModal,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.owned = this.userSvc.checkIfOwned(this.article.key);
    this.liked = this.likeSvc.checkIfLiked(this.article.key);
    this.favourite = this.favouriteSvc.checkIfFavourite(this.article.key);
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
