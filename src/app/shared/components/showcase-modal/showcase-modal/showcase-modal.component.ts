import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';

@Component({
  selector: 'showcase-modal',
  templateUrl: './showcase-modal.component.html',
})
export class ShowcaseModalComponent implements OnInit {
  @Input() column1: Article[] = [];
  @Input() column2: Article[] = [];
  constructor() {}

  ngOnInit(): void {
  }
}
