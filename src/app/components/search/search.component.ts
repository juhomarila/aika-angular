import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
import { Article } from 'src/app/shared/interfaces/article';
import { Journalist } from 'src/app/shared/interfaces/journalist';
import { Magazine } from 'src/app/shared/interfaces/magazine';
import { Owned } from 'src/app/shared/interfaces/owned';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { UserService } from 'src/app/shared/services/user.service';
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
  ownedArticlesList: Owned[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalSvc: NgbModal,
    private userSvc: UserService,
    private searchSvc: SearchService,
    private utilSvc: UtilService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.userSvc.getOwnedArticles().subscribe(articles => {
      this.ownedArticlesList = articles;
    });
    this.minHeight = window.innerHeight;
    if (!this.route.snapshot.queryParams['s']) {
      this.router.navigate(['frontpage']);
    }
    this.route.queryParams.subscribe(params => {
      this.searchSvc
        .search(params['s'], 'name', 'articles')
        .subscribe(articles => (this.searchArticles = articles));
      this.searchSvc
        .search(params['s'], 'name', 'journalists')
        .subscribe(journalists => (this.searchJournalists = journalists));
      this.searchSvc
        .search(params['s'], 'name', 'magazines')
        .subscribe(magazines => (this.searchMagazines = magazines));
    });
  }

  sort(articles: Article[]) {
    return this.utilSvc.byDateSorter(articles);
  }

  selectMagazine(selected: Magazine) {
    this.router.navigateByUrl(`/magazine?g=${selected.key}`, {
      state: { selected },
    });
  }

  selectJournalist(selected: Journalist) {
    this.router.navigateByUrl(`/journalist?g=${selected.key}`, {
      state: { selected },
    });
  }

  selectArticle(selected: Article) {
    let owned = false;
    for (let i = 0; i < this.ownedArticlesList.length; i++) {
      if (selected.key === this.ownedArticlesList[i].key) {
        owned = true;
      }
    }
    const modalRef = this.modalSvc.open(ArticleModalComponent, { size: 'lg' });
    modalRef.componentInstance.article = selected;
    modalRef.componentInstance.owned = owned;
  }
}
