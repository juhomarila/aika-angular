import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { FavouriteService } from 'src/app/shared/services/favourite.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-tbr',
  templateUrl: './tbr.component.html',
})
export class TbrComponent implements OnInit {
  favouriteList: Favourite[] = [];
  article!: Article;

  constructor(
    private favouriteSvc: FavouriteService,
    private firestoreSvc: FirestoreService,
    private articleSvc: ArticlesvcService
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
}
