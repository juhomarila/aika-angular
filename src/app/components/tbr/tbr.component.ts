import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { FavouriteService } from 'src/app/shared/services/favourite.service';

@Component({
  selector: 'app-tbr',
  templateUrl: './tbr.component.html',
})
export class TbrComponent implements OnInit {
  favouriteList: Favourite[] = [];
  article!: Article;

  constructor(
    private favouriteSvc: FavouriteService,
    private articleSvc: ArticlesvcService,
    private modalSvc: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavouriteArticles();
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
