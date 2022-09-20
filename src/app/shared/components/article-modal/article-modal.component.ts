import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
})
export class ArticleModalComponent implements OnInit {
  @Input() article!: Article;
  @Input() owned!: boolean;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.article);
  }

  close() {
    this.activeModal.dismiss();
  }
}
