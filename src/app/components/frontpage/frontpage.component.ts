import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { Observable } from '@firebase/util';
import { Store } from '@ngrx/store';
import {
  AddGenreBackAction,
  RemoveGenreAction,
} from 'src/app/shared/store/actions/genre.action';
import { RemoveMagazineAction } from 'src/app/shared/store/actions/magazine.action';

interface RemovedGenre {
  [key: string]: number;
}

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  genres!: Observable<string[]>;
  articleList: Article[] = [];
  filteredArticleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  genreArray: string[] = [];
  originalGenreArray: string[] = [];
  removedGenreArray: Map<string, number> = new Map<string, number>();
  filterByGenre: string[] = [];
  showFilters: boolean = false;
  filterMagazineName: string[] = [];
  magazineList: string[] = [];
  originalMagazineArray: string[] = [];

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private utilSvc: UtilService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
    this.uid = this.authSvc.user.uid;
    this.getArticles();
    this.getCarouselImages();
    this.getState();
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
      //this.filterGenre();
    }
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  filterGenre(event: string) {
    const index = this.genreArray.indexOf(event);
    this.store.dispatch(new RemoveGenreAction(index, event));
  }

  filterMagazine(event: string) {
    const index = this.magazineList.indexOf(event);
    this.store.dispatch(new RemoveMagazineAction(index, event));
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
    const addIndex = this.originalGenreArray.indexOf(event.value);
    this.store.dispatch(new AddGenreBackAction(addIndex, event.value));
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
    //this.filterMagazine();
  }

  resetGenreFilters() {
    if (localStorage.getItem('filteredArticleListGenres')) {
      this.genreArray = JSON.parse(
        localStorage.getItem('filteredArticleListGenres')!
      );
    } else {
      this.genreArray = this.originalGenreArray;
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

  resetMagazineFilters() {
    if (localStorage.getItem('filterGenre')) {
      this.filterByGenre = JSON.parse(localStorage.getItem('filterGenre')!);
    }
    //this.filterGenre();
    this.genreArray = this.originalGenreArray;
    this.filteredArticleList = this.articleList;
    localStorage.removeItem('filterMagazineName');
    localStorage.removeItem('magazines');
    localStorage.removeItem('filteredArticleList');
    localStorage.removeItem('filteredArticleListGenres');
    this.filterMagazineName = [];
  }

  resetFilters() {
    this.genreArray = this.originalGenreArray;
    console.log(this.genreArray);
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

  getState(): void {
    this.store.subscribe(state => {
      this.magazineList = state.magazines.magazines.magazines;
      this.filterMagazineName = state.magazines.magazines.removedMagazines;
      this.originalMagazineArray = state.magazines.magazines.originalMagazines;
      this.genreArray = state.genres.genres.genres;
      this.originalGenreArray = state.genres.genres.genres;
      this.filterByGenre = state.genres.genres.removedGenres;
      this.originalGenreArray = state.genres.genres.originalGenres;
    });
  }

  getCarouselImages(): void {
    this.storageSvc
      .getLoggedInCarouselEntities()
      .subscribe(
        carouselEntities => (this.carouselEntityList = carouselEntities)
      );
  }

  sort(articles: Article[]) {
    return this.utilSvc.weightedSorter(articles);
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
