import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchSvc: SearchService,
    private utilSvc: UtilService
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.queryParams['s']) {
      this.router.navigate(['frontpage']);
    }
    this.route.queryParams.subscribe(params => {
      this.searchSvc
        .search(params['s'], 'name')
        .subscribe(articles => (this.searchArticles = articles));
      this.searchSvc
        .search(params['s'], 'journalist')
        .subscribe(articles => this.searchArticles.concat(articles));
      this.searchSvc
        .search(params['s'], 'magazine')
        .subscribe(articles => this.searchArticles.concat(articles));
    });
  }

  sort(articles: Article[]) {
    return this.utilSvc.byDateSorter(articles);
  }
}
