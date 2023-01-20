import { Action } from '@ngrx/store';
import { Article } from '../../interfaces/article';

export enum ArticleActionType {
  ADD_ARTICLES = '[ARTICLE] Add ARTICLE',
  RESET_ARTICLES = '[ARTICLE] Reset ARTICLES',
  ADD_ORIGINAL_ARTICLES = '[ARTICLE] Add Original ARTICLES',
  GET_ARTICLE = '[ARTICLE] Get ARTICLE',
}

export class AddArticlesAction implements Action {
  readonly type = ArticleActionType.ADD_ARTICLES;
  constructor(public payload: Article) {}
}

export class ResetArticlesAction implements Action {
  readonly type = ArticleActionType.RESET_ARTICLES;
  constructor() {}
}

export class GetArticleAction implements Action {
  readonly type = ArticleActionType.GET_ARTICLE;
  constructor(public payload: string) {}
}

export class AddOriginalArticlesAction implements Action {
  readonly type = ArticleActionType.ADD_ORIGINAL_ARTICLES;
  constructor(public payload: Article) {}
}

export type ArticleActions =
  | AddArticlesAction
  | ResetArticlesAction
  | AddOriginalArticlesAction
  | GetArticleAction;
