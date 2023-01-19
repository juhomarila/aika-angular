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
  AddMagazineAction,
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
  translatedGenres: Map<string, string> = new Map();
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  showFilters: boolean = false;
  filterByGenre: string[] = [];
  filterByMagazine: string[] = [];

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private utilSvc: UtilService,
    private store: Store<any>,
    private translate: TranslateService
  ) {
    this.store.subscribe(state => {
      this.state$ = state;
      this.filterByMagazine = this.state$.magazines.magazines.removedMagazines;
      this.filterByGenre = this.state$.genres.genres.removedGenres;
      this.translatedGenres.clear();
      this.state$.genres.genres.originalGenres.map((genre: string) => {
        this.translatedGenres.set(this.translate.instant(genre), genre);
        localStorage.setItem(
          'translations',
          JSON.stringify(Array.from(this.translatedGenres.entries()))
        );
      });
    });
  }

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
    this.uid = this.authSvc.user.uid;
    this.getArticles();
    this.getCarouselImages();
    if (localStorage.getItem('state')) {
      this.showFilters = true;
    }
    if (localStorage.getItem('translations')) {
      this.translatedGenres = new Map(
        JSON.parse(localStorage.getItem('translations')!)
      );
    }
  }

  translator(event: string): string {
    return this.translate.instant(event);
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  filterGenre(event: string) {
    let translatedEvent: string = '';
    if (this.translate.currentLang === 'en') {
      translatedEvent = this.translatedGenres.get(event)!;
    } else {
      translatedEvent = event;
    }
    const index = this.state$.genres.genres.genres.indexOf(translatedEvent);
    this.store.dispatch(new RemoveGenreAction(index, event));
    this.articleList.map(article => {
      if (
        translatedEvent === article.genre &&
        !this.state$.magazines.magazines.magazines.includes(
          article.magazine.name
        )
      ) {
        this.store.dispatch(new AddMagazineAction(article.magazine.name));
      }
    });
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  filterMagazine(event: string) {
    const index = this.state$.magazines.magazines.magazines.indexOf(event);
    this.store.dispatch(new RemoveMagazineAction(index, event));
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  backToGenre(event: any) {
    let translatedEvent: string = '';
    if (this.translate.currentLang === 'en') {
      translatedEvent = this.translatedGenres.get(event.value)!;
    } else {
      translatedEvent = event.value;
    }
    const addIndex =
      this.state$.genres.genres.originalGenres.indexOf(translatedEvent);
    this.store.dispatch(
      new AddGenreBackAction(addIndex, translatedEvent, event.value)
    );
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  backToMagazine(event: any) {
    const addIndex = this.state$.magazines.magazines.originalMagazines.indexOf(
      event.value
    );
    this.store.dispatch(new AddMagazineBackAction(addIndex, event.value));
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  resetGenreFilters() {
    this.store.dispatch(new EmptyFilterGenreAction());
    this.store.dispatch(new EmptyMagazineFilterAction());
    localStorage.removeItem('state');
  }

  resetMagazineFilters() {
    this.store.dispatch(new EmptyMagazineFilterAction());
    //TODO, if reset return list of genre magazines
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  resetFilters() {
    this.store.dispatch(new EmptyFilterGenreAction());
    this.store.dispatch(new EmptyMagazineFilterAction());
    localStorage.removeItem('state');
  }

  getArticles(): void {
    this.articleSvc.getArticles().subscribe(articles => {
      this.articleList = articles;
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

  getArticlesByGenre(articles: Article[], genre: string) {
    let tempArray: Article[] = [];
    articles.forEach(article => {
      if (
        this.translatedGenres.get(genre)! === article.genre ||
        genre === article.genre
      ) {
        if (this.state$.magazines.magazines.removedMagazines.length > 0) {
          this.state$.magazines.magazines.removedMagazines.map(
            (magazine: string) => {
              if (magazine === article.magazine.name) {
                tempArray.push(article);
              }
            }
          );
        } else {
          tempArray.push(article);
        }
      }
    });
    return this.sort(tempArray);
  }
}
