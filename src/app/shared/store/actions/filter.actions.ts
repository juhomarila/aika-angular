import { Action } from '@ngrx/store';

export enum FilterActionType {
  ADD_GENRE = '[GENRE] Add GENRE',
  ADD_GENRE_BACK = '[GENRE] Add Back GENRE',
  REMOVE_GENRE = '[GENRE] Remove GENRE',
  REMOVE_ONLY_GENRE = '[GENRE] Remove only GENRE',
  ADD_ORIGINAL_GENRES = '[GENRE] Add Original GENRE',
  EMPTY_GENRE_FILTER = '[GENRE] Empty filter GENRE',
  ADD_MAGAZINE = '[MAGAZINE] Add MAGAZINE',
  ADD_MAGAZINE_BACK = '[MAGAZINE] Add Back MAGAZINE',
  REMOVE_MAGAZINE = '[MAGAZINE] Remove MAGAZINE',
  ADD_ORIGINAL_MAGAZINES = '[MAGAZINE] Add Original MAGAZINE',
  EMPTY_MAGAZINE_FILTER = '[MAGAZINE] Empty filter MAGAZINE',
}

export class AddGenreAction implements Action {
  readonly type = FilterActionType.ADD_GENRE;
  constructor(public payload: string) {}
}

export class AddGenreBackAction implements Action {
  readonly type = FilterActionType.ADD_GENRE_BACK;
  constructor(
    public addIndex: number,
    public payload: string,
    public payloadTranslated: string
  ) {}
}

export class RemoveGenreAction implements Action {
  readonly type = FilterActionType.REMOVE_GENRE;
  constructor(public index: number, public payload: string) {}
}

export class RemoveOnlyGenreAction implements Action {
  readonly type = FilterActionType.REMOVE_ONLY_GENRE;
  constructor(public index: number, public payload: string) {}
}

export class AddOriginalGenresAction implements Action {
  readonly type = FilterActionType.ADD_ORIGINAL_GENRES;
  constructor(public payload: string) {}
}

export class EmptyFilterGenreAction implements Action {
  readonly type = FilterActionType.EMPTY_GENRE_FILTER;
  constructor() {}
}

export class AddMagazineAction implements Action {
  readonly type = FilterActionType.ADD_MAGAZINE;
  constructor(public payload: string) {}
}

export class EmptyMagazineFilterAction implements Action {
  readonly type = FilterActionType.EMPTY_MAGAZINE_FILTER;
  constructor() {}
}

export class AddMagazineBackAction implements Action {
  readonly type = FilterActionType.ADD_MAGAZINE_BACK;
  constructor(public addIndex: number, public payload: string) {}
}

export class RemoveMagazineAction implements Action {
  readonly type = FilterActionType.REMOVE_MAGAZINE;
  constructor(public index: number, public payload: string) {}
}

export class AddOriginalMagazinesAction implements Action {
  readonly type = FilterActionType.ADD_ORIGINAL_MAGAZINES;
  constructor(public payload: string) {}
}

export type FilterActions =
  | AddGenreAction
  | RemoveGenreAction
  | AddOriginalGenresAction
  | AddGenreBackAction
  | EmptyFilterGenreAction
  | RemoveOnlyGenreAction
  | AddMagazineAction
  | RemoveMagazineAction
  | AddOriginalMagazinesAction
  | AddMagazineBackAction
  | EmptyMagazineFilterAction;
