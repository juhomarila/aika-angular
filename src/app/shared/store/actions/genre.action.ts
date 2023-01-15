import { Action } from '@ngrx/store';

export enum GenreActionType {
  ADD_GENRE = '[GENRE] Add GENRE',
  ADD_GENRE_BACK = '[GENRE] Add Back GENRE',
  REMOVE_GENRE = '[GENRE] Remove GENRE',
  REMOVE_ONLY_GENRE = '[GENRE] Remove only GENRE',
  ADD_ORIGINAL_GENRES = '[GENRE] Add Original GENRE',
  EMPTY_FILTER = '[GENRE] Empty filter GENRE',
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

export class RemoveOnlyGenreAction implements Action {
  readonly type = GenreActionType.REMOVE_ONLY_GENRE;
  constructor(public index: number, public payload: string) {}
}

export class AddOriginalGenresAction implements Action {
  readonly type = GenreActionType.ADD_ORIGINAL_GENRES;
  constructor(public payload: string) {}
}

export class EmptyFilterGenreAction implements Action {
  readonly type = GenreActionType.EMPTY_FILTER;
  constructor() {}
}

export type GenreActions =
  | AddGenreAction
  | RemoveGenreAction
  | AddOriginalGenresAction
  | AddGenreBackAction
  | EmptyFilterGenreAction
  | RemoveOnlyGenreAction;
