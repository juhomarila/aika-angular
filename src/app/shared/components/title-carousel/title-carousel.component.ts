import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Like } from '../../interfaces/like';
import { Owned } from '../../interfaces/owned';
import { UserService } from '../../services/user.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'title-carousel',
  templateUrl: './title-carousel.component.html',
})
export class TitleCarouselComponent {
  @Input() articleList: Article[] = [];
  @Input() favouriteList: Favourite[] = [];
  @Input() ownedArticlesList: Owned[] = [];
  @Input() likedArticlesList: Like[] = [];
  urlList: string[] = [];
  selectedArticle?: Article;
  responsiveOptions: any;
  page: number = 1;

  constructor(private modalSvc: NgbModal, private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getUrls(articles: Article[]) {
    let tmpArr: string[] = [];
    articles.map(article => {
      tmpArr.push(article.fileUrl);
    });
    return tmpArr;
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
