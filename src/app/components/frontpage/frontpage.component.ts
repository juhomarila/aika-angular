import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Store } from '@ngrx/store';
import {
  AddGenreBackAction,
  EmptyFilterGenreAction,
  RemoveGenreAction,
} from 'src/app/shared/store/actions/genre.action';
import {
  AddMagazineBackAction,
  EmptyMagazineFilterAction,
  RemoveMagazineAction,
} from 'src/app/shared/store/actions/magazine.action';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  state$: any;
  articleList: Article[] = [];
  filteredArticleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  filterByGenre: string[] = [];
  showFilters: boolean = false;
  filterMagazineName: string[] = [];

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private utilSvc: UtilService,
    private store: Store<any>,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
    this.uid = this.authSvc.user.uid;
    this.getArticles();
    this.getCarouselImages();
    this.store.subscribe(state => {
      this.state$ = state;
      this.filterMagazineName =
        this.state$.magazines.magazines.removedMagazines;
      this.filterByGenre = this.state$.genres.genres.removedGenres;
    });
  }

  translator(event: string) {
    this.translate.instant(event);
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  filterGenre(event: string) {
    const index = this.state$.genres.genres.genres.indexOf(event);
    this.store.dispatch(new RemoveGenreAction(index, event));
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  filterMagazine(event: string) {
    const index = this.state$.magazines.magazines.magazines.indexOf(event);
    this.store.dispatch(new RemoveMagazineAction(index, event));
    localStorage.setItem('state', JSON.stringify(this.state$));
    let tmpArr: string[] = [];
    let tempArticleList: Article[] = [];
    this.articleList.map(article => {
      this.filterMagazineName.map(magazine => {
        if (magazine === article.magazine?.name) {
          tempArticleList.push(article);
          if (
            !this.filterByGenre.includes(article.genre) &&
            !tmpArr.includes(article.genre)
          ) {
            tmpArr.push(article.genre);
          }
        }
      });
    });
    this.filteredArticleList = tempArticleList;
  }

  backToGenre(event: any) {
    const addIndex = this.state$.genres.genres.originalGenres.indexOf(
      event.value
    );
    this.store.dispatch(new AddGenreBackAction(addIndex, event.value));
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  backToMagazine(event: any) {
    const addIndex = this.state$.magazines.magazines.originalMagazines.indexOf(
      event.value
    );
    this.store.dispatch(new AddMagazineBackAction(addIndex, event.value));
    let tempArticleList: Article[] = [];
    this.state$.magazines.magazines.removedMagazines.map((magazine: string) => {
      console.log(magazine);
      this.articleList.map(article => {
        if (article.magazine.name === magazine) {
          tempArticleList.push(article);
        }
      });
    });
    this.filteredArticleList = tempArticleList;
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  resetGenreFilters() {
    this.store.dispatch(new EmptyFilterGenreAction());
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  resetMagazineFilters() {
    this.filteredArticleList = this.articleList;
    this.store.dispatch(new EmptyMagazineFilterAction());
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  resetFilters() {
    this.filteredArticleList = this.articleList;
    this.store.dispatch(new EmptyFilterGenreAction());
    this.store.dispatch(new EmptyMagazineFilterAction());
    localStorage.removeItem('state');
  }

  getArticles(): void {
    this.articleSvc.getArticles().subscribe(articles => {
      this.articleList = articles;
      this.filteredArticleList = this.articleList;
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
