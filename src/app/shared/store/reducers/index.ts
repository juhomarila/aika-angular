import { CartState, cartReducer } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { GenreState, genreReducer } from './genre.reducer';
import * as genreActions from '../actions/genre.action';

export const rootReducer = {};

export interface AppState {
  genres: GenreState;
}

export const reducers: ActionReducerMap<
  AppState,
  | genreActions.AddGenreAction
  | genreActions.RemoveGenreAction
  | genreActions.AddOriginalGenresAction
> = {
  genres: genreReducer,
};
