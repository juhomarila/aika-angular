import { ActionReducerMap } from '@ngrx/store';
import { GenreState, genreReducer } from './genre.reducer';
import * as genreActions from '../actions/genre.action';
import * as magazineActions from '../actions/magazine.action';
import { magazineReducer, MagazineState } from './magazine.reducer';

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
  genreActions.GenreActions
> = {
  genres: genreReducer,
};

export const magazineReducers: ActionReducerMap<
  MagazineStateInterface,
  magazineActions.MagazineActions
> = {
  magazines: magazineReducer,
};
