import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Owned } from 'src/app/shared/interfaces/owned';
import { UtilService } from 'src/app/shared/services/util.service';
import { FavouriteService } from 'src/app/shared/services/favourite.service';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import * as _ from 'lodash';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  articleList: Article[] = [];
  filteredArticleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  ownedArticlesList: Owned[] = [];
  genreArray: string[] = [];
  favouriteArticlesList: Favourite[] = [];
  filterByGenre!: string[];

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private userSvc: UserService,
    private utilSvc: UtilService,
    private favouriteSvc: FavouriteService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
    this.uid = this.authSvc.user.uid;
    this.getArticles();
    this.getCarouselImages();
    this.getOwnedArticles();
    this.getFavouriteArticles();
    this.genreArray = [
      'Urheilu',
      'Kauneus',
      'Vapaa-aika',
      'Sisustaminen',
      'Käsityöt',
      'Tiede',
      'Ajankohtaista',
      'Viihde',
    ];
  }

  filterGenre() {
    this.filterByGenre.map(genre => {
      const index = this.genreArray.indexOf(genre);
      if (index > -1) {
        this.genreArray.splice(index, 1);
      }
    });
  }

  backToGenre(event: any) {
    this.genreArray.unshift(event.value);
  }

  resetFilters() {
    this.genreArray = [
      'Urheilu',
      'Kauneus',
      'Vapaa-aika',
      'Sisustaminen',
      'Käsityöt',
      'Tiede',
      'Ajankohtaista',
      'Viihde',
    ];
  }

  getArticles(): void {
    this.articleSvc.getArticles().subscribe(articles => {
      this.articleList = articles;
      this.filteredArticleList = this.articleList;
    });
  }

  getFavouriteArticles(): void {
    this.favouriteSvc
      .getUserArticleFavourites()
      .subscribe(favs => (this.favouriteArticlesList = favs));
  }

  getCarouselImages(): void {
    this.storageSvc
      .getLoggedInCarouselEntities()
      .subscribe(
        carouselEntities => (this.carouselEntityList = carouselEntities)
      );
  }

  getOwnedArticles(): void {
    this.userSvc
      .getOwnedArticles()
      .subscribe(owned => (this.ownedArticlesList = owned));
  }

  sort(articles: Article[]) {
    return this.utilSvc.byDateSorter(articles);
  }

  getGenreArticles(articles: Article[], genre: string) {
    let tempArray: Article[] = [];
    articles.forEach(article => {
      if (genre === article.genre) {
        tempArray.push(article);
      }
    });
    return this.sort(tempArray);
  }
}
