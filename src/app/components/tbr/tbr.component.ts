import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { FavouriteService } from 'src/app/shared/services/favourite.service';

@Component({
  selector: 'app-tbr',
  templateUrl: './tbr.component.html',
})
export class TbrComponent implements OnInit {
  favouriteList: Favourite[] = [];
  article!: Article;

  constructor(private favouriteSvc: FavouriteService) {}

  ngOnInit(): void {
    this.getFavouriteArticles();
  }

  getFavouriteArticles(): void {
    this.favouriteSvc
      .getUserArticleFavourites()
      .subscribe(favs => (this.favouriteList = favs));
  }
}
