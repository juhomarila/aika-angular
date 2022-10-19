import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
})
export class JournalistComponent implements OnInit, OnDestroy {
  journalistKey!: string;
  journalist!: Journalist;
  height: number = 0;
  width: number = 0;
  magazines: Magazine[] = [];
  selectedMagazine!: Magazine;
  journalistArticles: Article[] = [];
  hover: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireStoreSvc: FirestoreService,
    private router: Router,
    private utilSvc: UtilService
  ) {
    this.height = window.innerHeight * 0.75;
    this.width = window.innerWidth * 0.4;
  }

  ngOnInit(): void {
    if (history.state['journalist']) {
      this.journalist = history.state['journalist'];
      localStorage.setItem('journalist', JSON.stringify(this.journalist));
    } else {
      if (localStorage.getItem('journalist')) {
        this.journalist = JSON.parse(localStorage.getItem('journalist')!);
      }
      if (!localStorage.getItem('journalist')) {
        this.activatedRoute.queryParams.forEach(param => {
          this.journalistKey = param['g'];
        });
        this.fireStoreSvc
          .getJournalist(this.journalistKey)
          .subscribe(journalist => {
            this.journalist = journalist.data() as Journalist;
            this.journalist.magazines.map(magazine => {
              this.fireStoreSvc.getMagazine(magazine).subscribe(magazine => {
                this.magazines.push(magazine.data() as Magazine);
              });
            });
            this.getJournalistArticles();
          });
      }
    }
    this.journalist?.magazines.map(magazineKey => {
      this.fireStoreSvc.getMagazine(magazineKey).subscribe(magazine => {
        this.magazines.push(magazine.data() as Magazine);
      });
    });
    this.getJournalistArticles();
  }

  getJournalistArticles() {
    this.journalist?.articles?.map(articleKey => {
      this.fireStoreSvc.getArticle(articleKey).subscribe(article => {
        this.journalistArticles.push(article.data() as Article);
      });
    });
  }

  getMagazine(key: string): string {
    let magazineName = '';
    this.magazines.map(magazine => {
      if (magazine.key === key) {
        magazineName = magazine.name;
      }
    });
    return magazineName;
  }

  goToMagazinePage(key: string) {
    this.magazines.map(magazine => {
      if (magazine.key === key) {
        this.router.navigateByUrl(`/magazine?g=${magazine.key}`, {
          state: { magazine },
        });
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('journalist');
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
