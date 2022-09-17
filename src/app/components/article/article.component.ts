import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  article!: Article;
  key!: string;

  constructor(
    private articleSvc: ArticlesvcService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.key = params['key'];
    });
    if (this.key !== null) {
      this.getArticle(this.key);
    } else {
      this.article = JSON.parse(localStorage.getItem('article')!);
    }
    // this.article = JSON.parse(localStorage.getItem('data')!);
    // localStorage.removeItem('data');
  }

  getArticle(key: string): void {
    this.articleSvc
      .getArticle(key)
      .subscribe(article => (this.article = article));
  }
}
