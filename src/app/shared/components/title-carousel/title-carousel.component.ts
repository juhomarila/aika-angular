import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Owned } from '../../interfaces/owned';
import { FavouriteService } from '../../services/favourite.service';
import { UserService } from '../../services/user.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'title-carousel',
  templateUrl: './title-carousel.component.html',
})
export class TitleCarouselComponent implements OnInit {
  @Input() articleList: Article[] = [];
  @Input() favouriteList: Favourite[] = [];
  urlList: string[] = [];
  selectedArticle?: Article;
  ownedArticlesList: Owned[] = [];
  responsiveOptions: any;
  page: number = 1;

  constructor(
    private userSvc: UserService,
    private modalSvc: NgbModal,
    private router: Router
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.getOwnedArticles();
  }

  getUrls(articles: Article[]) {
    let tmpArr: string[] = [];
    articles.map(article => {
      tmpArr.push(article.fileUrl);
    });
    return tmpArr;
  }

  getOwnedArticles(): void {
    this.userSvc
      .getOwnedArticles()
      .subscribe(owned => (this.ownedArticlesList = owned));
  }

  onSelect(article: Article) {
    let owned = false;
    this.selectedArticle = article;
    for (let i = 0; i < this.ownedArticlesList.length; i++) {
      if (this.selectedArticle.key === this.ownedArticlesList[i].key) {
        owned = true;
      }
    }
    const modalRef = this.modalSvc.open(ArticleModalComponent, { size: 'lg' });
    modalRef.componentInstance.article = this.selectedArticle;
    modalRef.componentInstance.owned = owned;
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
    this.favouriteList.map(fav => {
      if (fav.key === article.key) {
        favourite = true;
      }
    });
    return favourite;
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
