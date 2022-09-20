import { Action } from '@ngrx/store';
import { Article } from '../../interfaces/article';
export enum CartActionTypes {
  ADD_ITEM = '[ARTICLE] Add Cart',
  REMOVE_ITEM = '[ARTICLE] Remove Cart',
  RESET = '[ARTICLE] Reset Cart',
}
export class AddCartAction implements Action {
  readonly type = CartActionTypes.ADD_ITEM;
  constructor(public payload: Article) {}
}

export class RemoveCartAction implements Action {
  readonly type = CartActionTypes.REMOVE_ITEM;
  constructor(public payload: Article) {}
}

export class ResetArticleAction implements Action {
  readonly type = CartActionTypes.RESET;
}

export type CartActions = AddCartAction | RemoveCartAction | ResetArticleAction;
