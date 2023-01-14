import { Action } from '@ngrx/store';

export enum MagazineActionType {
  ADD_MAGAZINE = '[MAGAZINE] Add MAGAZINE',
  ADD_MAGAZINE_BACK = '[MAGAZINE] Add Back MAGAZINE',
  REMOVE_MAGAZINE = '[MAGAZINE] Remove MAGAZINE',
  ADD_ORIGINAL_MAGAZINES = '[MAGAZINE] Add Original MAGAZINE',
}

export class AddMagazineAction implements Action {
  readonly type = MagazineActionType.ADD_MAGAZINE;
  constructor(public payload: string) {}
}

export class AddMagazineBackAction implements Action {
  readonly type = MagazineActionType.ADD_MAGAZINE_BACK;
  constructor(public addIndex: number, public payload: string) {}
}

export class RemoveMagazineAction implements Action {
  readonly type = MagazineActionType.REMOVE_MAGAZINE;
  constructor(public index: number, public payload: string) {}
}

export class AddOriginalMagazinesAction implements Action {
  readonly type = MagazineActionType.ADD_ORIGINAL_MAGAZINES;
  constructor(public payload: string) {}
}

export type MagazineActions =
  | AddMagazineAction
  | RemoveMagazineAction
  | AddOriginalMagazinesAction
  | AddMagazineBackAction;
