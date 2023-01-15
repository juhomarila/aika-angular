import { ActionReducerMap } from '@ngrx/store';
import { GenreState, genreReducer } from './genre.reducer';
import * as genreActions from '../actions/genre.action';
import * as magazineActions from '../actions/magazine.action';
import { magazineReducer, MagazineState } from './magazine.reducer';
import { MetaReducer } from "@ngrx/store";;

export const rootReducer = {};

export interface GenreStateInterface {
  genres: GenreState;
}

export interface MagazineStateInterface {
  magazines: MagazineState;
}

export interface AppState {
  genres: GenreState;
  magazines: MagazineState;
}

export const genreReducers: ActionReducerMap<
  GenreStateInterface,
  | genreActions.AddGenreAction
  | genreActions.RemoveGenreAction
  | genreActions.AddOriginalGenresAction
  | genreActions.AddGenreBackAction
> = {
  genres: genreReducer,
};

export const magazineReducers: ActionReducerMap<
  MagazineStateInterface,
  | magazineActions.AddMagazineAction
  | magazineActions.RemoveMagazineAction
  | magazineActions.AddOriginalMagazinesAction
  | magazineActions.AddMagazineBackAction
> = {
  magazines: magazineReducer,
};
