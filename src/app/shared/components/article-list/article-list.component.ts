import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Like } from '../../interfaces/like';
import { Owned } from '../../interfaces/owned';
import { FavouriteService } from '../../services/favourite.service';
import { LikeService } from '../../services/like.service';
import { UserService } from '../../services/user.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Article[] = [];
  selectedArticle?: Article;
  ownedArticlesList: Owned[] = [];
  favouriteArticlesList: Favourite[] = [];
  likedArticlesList: Like[] = [];
  constructor(
    private modalSvc: NgbModal,
    private router: Router,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService,
    private userSvc: UserService,
  ) {}

  ngOnInit(): void {
    this.getFavouriteArticles();
    this.getLikedArticles();
    this.getOwnedArticles();
  }

  getFavouriteArticles(): void {
    this.favouriteSvc
      .getUserArticleFavourites()
      .subscribe((favs: Favourite[]) => (this.favouriteArticlesList = favs));
  }

  getLikedArticles(): void {
    this.likeSvc
      .getUserArticleLikes()
      .subscribe((likes: Like[]) => (this.likedArticlesList = likes));
  }

  getOwnedArticles(): void {
    this.userSvc
      .getOwnedArticles()
      .subscribe((owned: Owned[]) => (this.ownedArticlesList = owned));
  }

  onSelectCheckIfOwned(selectedArticle: Article): boolean {
    let owned = false;
    this.ownedArticlesList.map(article => {
      if (article.key === selectedArticle.key) {
        owned = true;
      }
    });
    return owned;
  }

  checkIfFavourite(article: Article): boolean {
    let favourite = false;
    this.articles.map(fav => {
      if (fav.key === article.key) {
        favourite = true;
      }
    });
    return favourite;
  }

  onSelect(article: Article) {
    let owned = false;
    let favourite = false;
    let liked = false;
    this.selectedArticle = article;
    console.log(this.selectedArticle);
    for (let i = 0; i < this.ownedArticlesList.length; i++) {
      if (this.selectedArticle.key === this.ownedArticlesList[i].key) {
        owned = true;
      }
    }
    for (let i = 0; i < this.favouriteArticlesList.length; i++) {
      if (this.selectedArticle.key === this.favouriteArticlesList[i].key) {
        favourite = true;
      }
    }
    for (let i = 0; i < this.likedArticlesList.length; i++) {
      if (this.selectedArticle.key === this.likedArticlesList[i].key) {
        liked = true;
      }
    }
    const modalRef = this.modalSvc.open(ArticleModalComponent, { size: 'lg' });
    modalRef.componentInstance.article = this.selectedArticle;
    modalRef.componentInstance.owned = owned;
    modalRef.componentInstance.favourite = favourite;
    modalRef.componentInstance.liked = liked;
    modalRef.componentInstance.favouriteList = this.favouriteArticlesList;
    modalRef.componentInstance.likedArticlesList = this.likedArticlesList;
  }

  onSelectMagazine(magazine: string) {
    this.router.navigate(['magazine'], {
      queryParams: { g: magazine },
    });
  }

  onSelectJournalist(journalist: string) {
    this.router.navigate(['journalist'], {
      queryParams: { g: journalist },
    });
  }
}
