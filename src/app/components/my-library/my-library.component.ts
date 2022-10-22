import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Owned } from 'src/app/shared/interfaces/owned';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
})
export class MyLibraryComponent implements OnInit {
  ownedArticlesList: Owned[] = [];
  article!: Article;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.getOwnedArticlesList();
  }

  getOwnedArticlesList() {
    this.userSvc
      .getOwnedArticles()
      .subscribe((owned: Owned[]) => (this.ownedArticlesList = owned));
  }
}
