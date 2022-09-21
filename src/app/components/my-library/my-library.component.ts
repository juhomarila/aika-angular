import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mergeMap, switchMap, tap } from 'rxjs';
import { ArticleModalComponent } from 'src/app/shared/components/article-modal/article-modal.component';
import { Article } from 'src/app/shared/interfaces/article';
import { Owned } from 'src/app/shared/interfaces/owned';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
})
export class MyLibraryComponent implements OnInit {
  ownedArticlesList: Owned[] = [];
  article!: Article;
  selectedArticle?: Article;
  constructor(
    private userSvc: UserService,
    private modalSvc: NgbModal,
    private articleSvc: ArticlesvcService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getOwnedArticlesList();
  }

  getOwnedArticlesList() {
    this.userSvc
      .getOwnedArticles()
      .subscribe((owned: Owned[]) => (this.ownedArticlesList = owned));
  }

  getOwnedArticles(key: string): Article {
    this.articleSvc.getArticle(key).subscribe(article => {
      this.article = article;
    });
    return this.article;
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
    modalRef.result.then(
      result => {
        console.log(result);
      },
      () => {}
    );
  }
}
