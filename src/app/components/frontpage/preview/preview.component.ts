import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { ArticlesvcService } from 'src/app/shared/services/articlesvc.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  @Input() article!: Article;
  @Output() selectedArticle = new EventEmitter<Article>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(article: Article) {
    this.selectedArticle.emit(article);
  }
}
