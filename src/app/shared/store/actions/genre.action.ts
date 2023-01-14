import { Action } from '@ngrx/store';

export enum GenreActionType {
  ADD_GENRE = '[GENRE] Add GENRE',
  ADD_GENRE_BACK = '[GENRE] Add Back GENRE',
  REMOVE_GENRE = '[GENRE] Remove GENRE',
  ADD_ORIGINAL_GENRES = '[GENRE] Add Original GENRE',
}

export class AddGenreAction implements Action {
  readonly type = GenreActionType.ADD_GENRE;
  constructor(public payload: string) {}
}

export class AddGenreBackAction implements Action {
  readonly type = GenreActionType.ADD_GENRE_BACK;
  constructor(public addIndex: number, public payload: string) {}
}

export class RemoveGenreAction implements Action {
  readonly type = GenreActionType.REMOVE_GENRE;
  constructor(public index: number, public payload: string) {}
}

export class AddOriginalGenresAction implements Action {
  readonly type = GenreActionType.ADD_ORIGINAL_GENRES;
  constructor(public payload: string) {}
}

export type GenreActions =
  | AddGenreAction
  | RemoveGenreAction
  | AddOriginalGenresAction
  | AddGenreBackAction;
