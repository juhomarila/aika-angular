import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';
import { Favourite } from '../../interfaces/favourite';
import { Owned } from '../../interfaces/owned';
import { ArticlesvcService } from '../../services/articlesvc.service';
import { ArticleModalComponent } from '../article-modal/article-modal.component';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  @Input() articles?: Article[] = [];
  @Input() ownedArticles?: Owned[] = [];
  @Input() favouriteArticles?: Favourite[] = [];
  article!: Article;
  constructor(
    private modalSvc: NgbModal,
    private router: Router,
    private articleSvc: ArticlesvcService
  ) {}

  ngOnInit(): void {}

  getOwnedArticle(key: string): Article {
    this.articleSvc.getArticle(key).subscribe(article => {
      this.article = article;
    });
    return this.article;
  }

  getFavouriteArticle(key: string): Article {
    this.articleSvc.getArticle(key).subscribe(article => {
      this.article = article;
    });
    return this.article;
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
