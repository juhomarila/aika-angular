import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { FavouriteService } from 'src/app/shared/services/favourite.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-tbr',
  templateUrl: './tbr.component.html',
})
export class TbrComponent implements OnInit {
  favouriteList: Favourite[] = [];
  favouriteArticlesList: Article[] = [];

  constructor(
    private favouriteSvc: FavouriteService,
    private firestoreSvc: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getFavouriteArticles();
    this.favouriteList?.map(key => {
      this.firestoreSvc.getArticle(key.key).subscribe(article => {
        this.favouriteArticlesList.push(article.data() as Article);
      });
    });
  }

  getFavouriteArticles(): void {
    this.favouriteSvc
      .getUserArticleFavourites()
      .subscribe(favs => (this.favouriteList = favs));
  }
}
