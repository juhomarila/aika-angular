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
  AddMagazineAction,
  AddMagazineBackAction,
  EmptyMagazineFilterAction,
  RemoveMagazineAction,
} from 'src/app/shared/store/actions/filter.actions';
import { TranslateService } from '@ngx-translate/core';
import { FilterStateInterface } from 'src/app/shared/store/reducers';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  state$!: FilterStateInterface;
  articleList: Article[] = [];
  filteredArticleList: Article[] = [];
  translatedGenres: Map<string, string> = new Map();
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  showFilters: boolean = false;

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private utilSvc: UtilService,
    private store: Store<FilterStateInterface>,
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
      this.state$.filters.originalGenres.map((genre: string) => {
        this.translatedGenres.set(this.translate.instant(genre), genre);
        localStorage.setItem(
          'translations',
          JSON.stringify(Array.from(this.translatedGenres.entries()))
        );
      });
    });
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
    const index = this.state$.filters.genres.indexOf(translatedEvent);
    this.store.dispatch(new RemoveGenreAction(index, event));
    this.articleList.map(article => {
      if (
        translatedEvent === article.genre &&
        !this.state$.filters.magazines.includes(article.magazine.name)
      ) {
        this.store.dispatch(new AddMagazineAction(article.magazine.name));
      }
    });
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  filterMagazine(event: string) {
    const index = this.state$.filters.magazines.indexOf(event);
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
      this.state$.filters.originalGenres.indexOf(translatedEvent);
    this.store.dispatch(
      new AddGenreBackAction(addIndex, translatedEvent, event.value)
    );
    localStorage.setItem('state', JSON.stringify(this.state$));
  }

  backToMagazine(event: any) {
    const addIndex = this.state$.filters.originalMagazines.indexOf(event.value);
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

  getArticlesByGenre(genre: string) {
    let tempArray: Article[] = [];
    this.articleList.forEach(article => {
      if (
        this.translatedGenres.get(genre)! === article.genre ||
        genre === article.genre
      ) {
        if (this.state$.filters.removedMagazines.length > 0) {
          this.state$.filters.removedMagazines.map((magazine: string) => {
            if (magazine === article.magazine.name) {
              tempArray.push(article);
            }
          });
        } else {
          tempArray.push(article);
        }
      }
    });
    return this.sort(tempArray);
  }
}
