import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Owned } from 'src/app/shared/interfaces/owned';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  user!: User;
  ownedArticles: Owned[] = [];
  articles: Article[] = [];

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private fireStoreSvc: FirestoreService
  ) {}
  ngOnDestroy(): void {
    localStorage.removeItem('owned');
  }

  ngOnInit(): void {
    if (localStorage.getItem('owned')) {
      this.ownedArticles = JSON.parse(localStorage.getItem('owned')!);
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      const uid = this.authSvc.user.uid;
      this.fireStoreSvc.getUser(uid).subscribe(user => {
        this.user = user.data() as User;
      });
      this.userSvc.getOwnedArticles().subscribe(owned => {
        this.ownedArticles = owned;
        localStorage.setItem('owned', JSON.stringify(this.ownedArticles));
        this.ownedArticles.map(key => {
          this.fireStoreSvc.getArticle(key.key).subscribe(article => {
            this.articles.push(article.data() as Article);
          });
        });
      });
    }
    this.ownedArticles.map(key => {
      this.fireStoreSvc.getArticle(key.key).subscribe(article => {
        this.articles.push(article.data() as Article);
      });
    });
  }

  getArticleName(key: string): string {
    let articleName = '';
    this.articles.map(article => {
      if (article.key === key) {
        articleName = article.name;
      }
    });
    return articleName;
  }

  setDate(time: number) {
    return new Date(time).toLocaleString();
  }
}
