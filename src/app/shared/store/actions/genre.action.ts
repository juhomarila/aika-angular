import { Action } from '@ngrx/store';

export enum GenreActionType {
  ADD_ITEM = '[GENRE] Add GENRE',
  REMOVE_ITEM = '[GENRE] Remove GENRE',
  ADD_ORIGINAL = '[GENRE] Add Original GENRE',
}

export class AddGenreAction implements Action {
  readonly type = GenreActionType.ADD_ITEM;
  constructor(public payload: string) {}
}

export class RemoveGenreAction implements Action {
  readonly type = GenreActionType.REMOVE_ITEM;
  constructor(public id: number, public payload: string) {}
}

export class AddOriginalGenresAction implements Action {
  readonly type = GenreActionType.ADD_ORIGINAL;
  constructor(public payload: string) {}
}

export type GenreActions = AddGenreAction | RemoveGenreAction | AddOriginalGenresAction;
