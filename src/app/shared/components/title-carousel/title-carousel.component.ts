import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Owned } from '../../interfaces/owned';
import { UserService } from '../../services/user.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'title-carousel',
  templateUrl: './title-carousel.component.html',
})
export class TitleCarouselComponent implements OnInit {
  @Input() articleList: Article[] = [];
  urlList: string[] = [];
  selectedArticle?: Article;
  ownedArticlesList: Owned[] = [];
  responsiveOptions: any;
  page: number = 1;

  constructor(private userSvc: UserService, private modalSvc: NgbModal) {
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
    modalRef.result.then(
      result => {
        console.log(result);
      },
      () => {}
    );
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
}
