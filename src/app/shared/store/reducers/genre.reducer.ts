import * as genreActions from '../actions/genre.action';

export interface GenreState {
  originalGenres: string[];
  genres: string[];
  removedGenres: string[];
}

const initialState: GenreState = {
  originalGenres: [],
  genres: [],
  removedGenres: [],
};
export function genreReducer(
  state: GenreState = initialState,
  action:
    | genreActions.AddGenreAction
    | genreActions.RemoveGenreAction
    | genreActions.AddOriginalGenresAction
): GenreState {
  switch (action.type) {
    case genreActions.GenreActionType.ADD_ITEM:
      return {
        ...state,
        genres: [...state.genres, action.payload],
      };
    case genreActions.GenreActionType.REMOVE_ITEM:
      return {
        genres: [
          ...state.genres.slice(0, action.id),
          ...state.genres.slice(action.id + 1),
        ],
        removedGenres: [...state.removedGenres, action.payload],
        originalGenres: [...state.removedGenres],
      };
    case genreActions.GenreActionType.ADD_ORIGINAL:
      return {
        ...state,
        originalGenres: [...state.originalGenres, action.payload],
      };
    default: {
      return state;
    }
  }
}
