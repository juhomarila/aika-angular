import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
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

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  articleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  isLogged: boolean = false;
  username: string = '';
  uid: string = '';
  ownedArticlesList: Owned[] = [];
  genreArray: string[] = [];
  favouriteArticlesList: Favourite[] = [];

  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private storageSvc: StorageService,
    private modalSvc: NgbModal,
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

  getArticles(): void {
    this.articleSvc
      .getArticles()
      .subscribe(articles => (this.articleList = articles));
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

  onSelect(article: Article) {
    let owned = false;
    this.selectedArticle = article;
    for (let i = 0; i < this.ownedArticlesList.length; i++) {
      if (this.selectedArticle.key === this.ownedArticlesList[i].key) {
        owned = true;
      }
    }
    const modalRef = this.modalSvc.open(ArticleModalComponent, { size: 'lg' });
    modalRef.componentInstance.article = this.selectedArticle;
    modalRef.componentInstance.owned = owned;
  }

  onSelectCheckIfOwned(selectedArticle: Article): boolean {
    let owned = false;
    this.ownedArticlesList.map(article => {
      if (article.key === selectedArticle.key) {
        owned = true;
      }
    });
    return owned;
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
