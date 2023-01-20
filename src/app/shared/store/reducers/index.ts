import { ActionReducerMap } from '@ngrx/store';
import { GenreState, genreReducer } from './genre.reducer';
import * as genreActions from '../actions/genre.action';
import * as magazineActions from '../actions/magazine.action';
import * as filterActions from '../actions/filter.actions';
import { magazineReducer, MagazineState } from './magazine.reducer';
import { filterReducer, FilterState } from './filter.reducers';

export const rootReducer = {};

export interface GenreStateInterface {
  genres: GenreState;
}

export interface MagazineStateInterface {
  magazines: MagazineState;
}

export interface FilterStateInterface {
  filters: FilterState;
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

export const filterReducers: ActionReducerMap<
  FilterStateInterface,
  filterActions.FilterActions
> = {
  filters: filterReducer,
};
