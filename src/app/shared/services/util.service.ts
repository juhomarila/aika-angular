import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  byDateSorter(articles: Article[]) {
    return articles.sort(
      (a, b) =>
        b.date.year - a.date.year ||
        b.date.month - a.date.month ||
        b.date.day - a.date.day
    );
  }
}
