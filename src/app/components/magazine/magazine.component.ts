import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireStoreSvc: FirestoreService,
    private articleSvc: ArticlesvcService
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
        this.magazine = JSON.parse(localStorage.getItem('journalist')!);
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
        });
      }
    }
    this.magazine?.journalists.map(jounalist => {
      this.fireStoreSvc.getJournalist(jounalist).subscribe(data => {
        this.journalists.push(data.data() as Journalist);
      });
    });
    this.magazine?.articles.map(articleKey => {
      this.fireStoreSvc.getArticle(articleKey).subscribe(article => {
        this.magazineArticles.push(article.data() as Article);
      });
    });
  }

  getMagazineArticles() {}

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

  mouseOver() {
    this.hover = true;
  }

  mouseLeave() {
    this.hover = false;
  }
}
