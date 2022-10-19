import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { Like } from 'src/app/shared/interfaces/like';
import { Owned } from 'src/app/shared/interfaces/owned';
import { ArticleModalComponent } from '../../article-modal/article-modal.component';

@Component({
  selector: 'showcase-modal',
  templateUrl: './showcase-modal.component.html',
})
export class ShowcaseModalComponent implements OnInit {
  @Input() column1: Article[] = [];
  @Input() column2: Article[] = [];
  @Input() favouriteList: Favourite[] = [];
  @Input() ownedArticlesList: Owned[] = [];
  @Input() likedArticlesList: Like[] = [];
  selectedArticle?: Article;

  constructor(private modalSvc: NgbModal) {}

  ngOnInit(): void {}

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
    this.favouriteList.map(fav => {
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
}
