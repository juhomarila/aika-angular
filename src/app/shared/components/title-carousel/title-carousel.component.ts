import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'title-carousel',
  templateUrl: './title-carousel.component.html',
})
export class TitleCarouselComponent implements OnInit {
  @Input() articleList: Article[] = [];
  urlList: string[] = [];
  responsiveOptions: any;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 3,
      },
    ];
  }

  ngOnInit(): void {}

  getUrls(articles: Article[]) {
    let tmpArr: string[] = [];
    articles.map(article => {
      tmpArr.push(article.fileUrl);
    });
    return tmpArr;
  }
}
