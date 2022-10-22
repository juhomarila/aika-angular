import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
import { Article } from 'src/app/shared/interfaces/article';
import { Favourite } from 'src/app/shared/interfaces/favourite';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Like } from 'src/app/shared/interfaces/like';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { Owned } from 'src/app/shared/interfaces/owned';
import { FavouriteService } from 'src/app/shared/services/favourite.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
})
export class MagazineComponent implements OnInit, OnDestroy {
  magazineKey!: string;
  magazine!: Magazine;
  height: number = 0;
  width: number = 0;
  journalists: Journalist[] = [];
  selectedJournalist!: Journalist;
  magazineArticles: Article[] = [];
  hover: boolean = false;
  ownedArticlesList: Owned[] = [];
  favouriteArticlesList: Favourite[] = [];
  likedArticlesList: Like[] = [];
  hidden: boolean = true;
  selectedArticle?: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireStoreSvc: FirestoreService,
    private utilSvc: UtilService,
    private favouriteSvc: FavouriteService,
    private likeSvc: LikeService,
    private userSvc: UserService,
    private modalSvc: NgbModal
  ) {
    this.height = window.innerHeight * 0.75;
    this.width = window.innerWidth * 0.4;
  }

  ngOnInit(): void {
    if (history.state['magazine']) {
      this.magazine = history.state['magazine'];
      localStorage.setItem('magazine', JSON.stringify(this.magazine));
    } else {
      if (localStorage.getItem('magazine')) {
        this.magazine = JSON.parse(localStorage.getItem('magazine')!);
      }
      if (!localStorage.getItem('magazine')) {
        this.activatedRoute.queryParams.forEach(param => {
          this.magazineKey = param['g'];
        });
        this.fireStoreSvc.getMagazine(this.magazineKey).subscribe(magazine => {
          this.magazine = magazine.data() as Magazine;
          this.magazine.journalists.map(jounalist => {
            this.fireStoreSvc.getJournalist(jounalist).subscribe(data => {
              this.journalists.push(data.data() as Journalist);
            });
          });
          this.getMagazineArticles();
        });
      }
    }
    this.magazine?.journalists?.map(jounalist => {
      this.fireStoreSvc.getJournalist(jounalist).subscribe(data => {
        this.journalists.push(data.data() as Journalist);
      });
    });
    this.getMagazineArticles();
  }

  getMagazineArticles() {
    this.magazine?.articles?.map(articleKey => {
      this.fireStoreSvc.getArticle(articleKey).subscribe(article => {
        this.magazineArticles.push(article.data() as Article);
      });
    });
  }

  getJournalist(key: string): string {
    let journalistName = '';
    this.journalists.map(journalist => {
      if (journalist.key === key) {
        journalistName = journalist.name;
      }
    });
    return journalistName;
  }

  goToJournalistPage(key: string) {
    this.journalists.map(journalist => {
      if (journalist.key === key) {
        this.router.navigateByUrl(`/journalist?g=${journalist.key}`, {
          state: { journalist },
        });
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('magazine');
  }

  mouseOver(isOver: boolean) {
    this.hover = isOver;
  }

  sliceCol1(articles: Article[]) {
    this.sort(articles);
    return articles.slice(0, 2);
  }

  sliceCol2(articles: Article[]) {
    this.sort(articles);
    return articles.slice(2, 4);
  }

  sort(articles: Article[]) {
    return this.utilSvc.weightedSorter(articles);
  }
}
