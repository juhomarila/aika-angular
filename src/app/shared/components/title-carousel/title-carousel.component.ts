import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Like } from '../../interfaces/like';
import { Owned } from '../../interfaces/owned';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'title-carousel',
  templateUrl: './title-carousel.component.html',
})
export class TitleCarouselComponent {
  @Input() articleList: Article[] = [];
  urlList: string[] = [];
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
    const modalRef = this.modalSvc.open(ArticleModalComponent, { size: 'lg' });
    modalRef.componentInstance.article = article;
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
