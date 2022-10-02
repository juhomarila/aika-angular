import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { UtilService } from 'src/app/shared/services/util.service';

/* tänne tunnistus ettei tallenna jokaista keystorkea erilliseksi sivuhistorian elemantiksi vaan
  poistuu edellinen painikkeella edellisene näkymään */

/* TODO jos searchparami on genre niin ehdota genreä. Eli lista kaikista genreistä tänne
  ja sitten jos käyttäjä kirjoittaa genreä niin ehdota sitä väliin mukaan myös jotenkin */

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  allArticles: Article[] = [];
  searchArticles: Article[] = [];
  searchJournalists: Journalist[] = [];
  searchMagazines: Magazine[] = [];
  minHeight: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchSvc: SearchService,
    private utilSvc: UtilService
  ) {}

  ngOnInit(): void {
    this.minHeight = window.innerHeight;
    if (!this.route.snapshot.queryParams['s']) {
      this.router.navigate(['frontpage']);
    }
    this.route.queryParams.subscribe(params => {
      this.searchSvc
        .search(params['s'], 'name', 'articles')
        .subscribe(articles => (this.searchArticles = articles));
      // this.searchSvc
      //   .search(params['s'], 'name', 'journalists')
      //   .subscribe(articles => this.searchArticles.concat(articles));
      // this.searchSvc
      //   .search(params['s'], 'name', 'magazines')
      //   .subscribe(articles => this.searchArticles.concat(articles));
      this.searchSvc
        .search(params['s'], 'name', 'journalists')
        .subscribe(journalists => (this.searchJournalists = journalists));
      this.searchSvc
        .search(params['s'], 'name', 'magazines')
        .subscribe(magazines => (this.searchMagazines = magazines));
      // this.searchSvc
      //   .search(params['s'], 'genre', 'magazines')
      //   .subscribe(articles => this.searchArticles.concat(articles));
    });
  }

  sort(articles: Article[]) {
    return this.utilSvc.byDateSorter(articles);
  }
}
