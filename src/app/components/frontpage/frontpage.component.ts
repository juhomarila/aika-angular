import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { CarouselEntity } from 'src/app/shared/interfaces/carouselentity';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
})
export class FrontpageComponent implements OnInit {
  articleList: Article[] = [];
  carouselEntityList: CarouselEntity[] = [];
  selectedArticle?: Article;
  constructor(
    private authSvc: AuthService,
    private articleSvc: ArticlesvcService,
    private router: Router,
    private storageSvc: StorageService
  ) {}

  public isLogged: boolean = false;
  public username: string = '';

  ngOnInit(): void {
    this.isLogged = this.authSvc.isLoggedIn;
    this.username = this.authSvc.user.displayName;
    this.getArticles();
    this.getCarouselImages();
  }

  getArticles(): void {
    this.articleSvc
      .getArticles()
      .subscribe(articles => (this.articleList = articles));
  }

  getCarouselImages(): void {
    this.storageSvc
    .getCarouselEntities()
    .subscribe(carouselEntities => (this.carouselEntityList = carouselEntities));
  }

  onSelect(article: Article) {
    this.selectedArticle = article;
    console.log(this.selectedArticle);
    this.router.navigate([`article/${this.selectedArticle.key}`]);
  }
}
