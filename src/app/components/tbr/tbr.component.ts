import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { Like } from 'src/app/shared/interfaces/like';
import { Owned } from 'src/app/shared/interfaces/owned';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { FavouriteService } from 'src/app/shared/services/favourite.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tbr',
  templateUrl: './tbr.component.html',
})
export class TbrComponent implements OnInit {
  favouriteList: Favourite[] = [];
  article!: Article;
  ownedArticlesList: Owned[] = [];
  likedArticlesList: Like[] = [];
  selectedArticle?: Article;

  constructor(
    private favouriteSvc: FavouriteService,
    private userSvc: UserService,
    private articleSvc: ArticlesvcService,
    private likeSvc: LikeService,
    private modalSvc: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavouriteArticles();
    this.getOwnedArticlesList();
    this.getLikedArticles();
  }

  getFavouriteArticles(): void {
    this.favouriteSvc
      .getUserArticleFavourites()
      .subscribe(favs => (this.favouriteList = favs));
  }

  getFavouriteArticle(key: string): Article {
    this.articleSvc.getArticle(key).subscribe(article => {
      this.article = article;
    });
    return this.article;
  }

  getOwnedArticlesList() {
    this.userSvc
      .getOwnedArticles()
      .subscribe((owned: Owned[]) => (this.ownedArticlesList = owned));
  }

  getLikedArticles(): void {
    this.likeSvc
      .getUserArticleLikes()
      .subscribe(likes => (this.likedArticlesList = likes));
  }

  getOwnedArticles(key: string): Article {
    this.articleSvc.getArticle(key).subscribe(article => {
      this.article = article;
    });
    return this.article;
  }

  onSelect(article: Article) {
    let owned = false;
    let favourite = false;
    let liked = false;
    this.selectedArticle = article;
    for (let i = 0; i < this.ownedArticlesList.length; i++) {
      if (this.selectedArticle.key === this.ownedArticlesList[i].key) {
        owned = true;
      }
    }
    for (let i = 0; i < this.favouriteList.length; i++) {
      if (this.selectedArticle.key === this.favouriteList[i].key) {
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
    modalRef.componentInstance.favouriteList = this.favouriteList;
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
