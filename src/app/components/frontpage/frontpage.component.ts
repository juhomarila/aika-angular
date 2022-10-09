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
import { Magazine } from 'src/app/shared/interfaces/magazine';

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
  filterByGenre: string[] = [];
  showFilters: boolean = false;
  filterMagazineName: string[] = [];
  magazineList: Magazine[] = [];

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
    this.getAllMagazines();
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
    if (localStorage.getItem('filterMagazineName')) {
      this.filterMagazineName = JSON.parse(
        localStorage.getItem('filterMagazineName')!
      );
      this.genreArray = JSON.parse(
        localStorage.getItem('filteredArticleListGenres')!
      );
      if (localStorage.getItem('magazines')) {
        this.magazineList = JSON.parse(localStorage.getItem('magazines')!);
        this.filteredArticleList = JSON.parse(
          localStorage.getItem('filteredArticleList')!
        );
      }
      this.showFilters = true;
    }
    if (localStorage.getItem('filterGenre')) {
      if (localStorage.getItem('magazines')) {
        this.magazineList = JSON.parse(localStorage.getItem('magazines')!);
      }
      this.showFilters = true;
      this.filterByGenre = JSON.parse(localStorage.getItem('filterGenre')!);
      this.filterGenre();
    }
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  filterGenre() {
    localStorage.setItem('filterGenre', JSON.stringify(this.filterByGenre));
    localStorage.setItem('magazines', JSON.stringify(this.magazineList));
    this.filterByGenre.map(genre => {
      const index = this.genreArray.indexOf(genre);
      if (index > -1) {
        this.genreArray.splice(index, 1);
      }
    });
  }

  filterMagazine() {
    localStorage.setItem(
      'filterMagazineName',
      JSON.stringify(this.filterMagazineName)
    );
    localStorage.setItem('magazines', JSON.stringify(this.magazineList));
    this.genreArray = [];
    let tempArticleList: Article[] = [];
    this.articleList.map(article => {
      this.filterMagazineName.map(magazine => {
        if (magazine === article.magazine?.name) {
          tempArticleList.push(article);
          if (
            !this.genreArray.includes(article.genre) &&
            !this.filterByGenre.includes(article.genre)
          ) {
            this.genreArray.push(article.genre);
          }
        }
      });
    });
    this.filteredArticleList = tempArticleList;
    localStorage.setItem(
      'filteredArticleList',
      JSON.stringify(this.filteredArticleList)
    );
    localStorage.setItem(
      'filteredArticleListGenres',
      JSON.stringify(this.genreArray)
    );
  }

  backToGenre(event: any) {
    this.genreArray.unshift(event.value);
    console.log(event.value);
    console.log(this.filterByGenre);
    localStorage.setItem('filterGenre', JSON.stringify(this.filterByGenre));
    this.filterMagazine();
  }

  backToMagazine(event: any) {
    const index = this.filterMagazineName.indexOf(event.value);
    if (index > -1) {
      this.filterMagazineName.splice(index, 1);
      localStorage.setItem(
        'filterMagazineName',
        JSON.stringify(this.filterMagazineName)
      );
    }
    this.filterMagazine();
  }

  resetGenreFilters() {
    if (localStorage.getItem('filteredArticleListGenres')) {
      this.genreArray = JSON.parse(
        localStorage.getItem('filteredArticleListGenres')!
      );
    } else {
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
    if (localStorage.getItem('filteredArticleList')) {
      this.filteredArticleList = JSON.parse(
        localStorage.getItem('filteredArticleList')!
      );
    } else {
      this.filteredArticleList = this.articleList;
    }
    localStorage.removeItem('filterGenre');
    this.filterByGenre = [];
  }

  resetArticleFilters() {
    if (localStorage.getItem('filterGenre')) {
      this.filterByGenre = JSON.parse(localStorage.getItem('filterGenre')!);
    }
    this.filterGenre();
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
    this.filteredArticleList = this.articleList;
    localStorage.removeItem('filterMagazineName');
    localStorage.removeItem('magazines');
    localStorage.removeItem('filteredArticleList');
    localStorage.removeItem('filteredArticleListGenres');
    this.filterMagazineName = [];
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
    this.filteredArticleList = this.articleList;
    localStorage.removeItem('filterGenre');
    localStorage.removeItem('filterMagazineName');
    localStorage.removeItem('magazines');
    localStorage.removeItem('filteredArticleList');
    localStorage.removeItem('filteredArticleListGenres');
    this.filterByGenre = [];
    this.filterMagazineName = [];
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

  getAllMagazines(): void {
    this.articleSvc.getMagazines().subscribe(magazines => {
      this.magazineList = magazines;
    });
  }
}
