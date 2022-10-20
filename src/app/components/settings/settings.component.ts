import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/shared/interfaces/article';
import { Owned } from 'src/app/shared/interfaces/owned';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { SettingModalComponent } from './setting-modal/setting-modal.component';
import { Globals } from 'src/app/globals';

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
    private fireStoreSvc: FirestoreService,
    private modalSvc: NgbModal,
    private utilSvc: UtilService,
    private globals: Globals,
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

  sortOwnedByDate(articles: Owned[]) {
    return articles.sort((a, b) => a.time! - b.time!);
  }

  setDate(time: number) {
    return new Date(time).toLocaleString([this.globals.locale], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  }

  openEmailChangeModal() {
    const modalRef = this.modalSvc.open(SettingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Vaihda sähköpostiosoite';
    modalRef.componentInstance.email = true;
    modalRef.componentInstance.emailValue = this.user.email;
    modalRef.result.then(data => {
      if (data) {
        localStorage.clear();
        this.authSvc.LogOut();
        window.location.reload();
      }
    });
  }

  openPasswordChangeModal() {
    const modalRef = this.modalSvc.open(SettingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Vaihda salasana';
    modalRef.componentInstance.password = true;
    modalRef.componentInstance.emailValue = this.user.email;
  }

  openNameChangeModal() {
    const modalRef = this.modalSvc.open(SettingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Vaihda nimi';
    modalRef.componentInstance.name = true;
    modalRef.result.then(data => {
      if (data) {
        window.location.reload();
        localStorage.setItem('user', JSON.stringify(this.authSvc.userData));
      }
    });
  }

  openRemoveAccountConfirmation() {
    const modalRef = this.modalSvc.open(SettingModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Vahvista tilin poisto';
    modalRef.componentInstance.accountRemoval = true;
    modalRef.componentInstance.emailValue = this.user.email;
    modalRef.result.then(data => {
      if (data) {
        localStorage.clear();
        this.authSvc.LogOut();
        window.location.reload();
      }
    });
  }
}
