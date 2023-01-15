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
  action: genreActions.GenreActions
): GenreState {
  console.log(state);
  switch (action.type) {
    case genreActions.GenreActionType.ADD_GENRE:
      return {
        ...state,
        genres: [...state.genres, action.payload],
      };
    case genreActions.GenreActionType.ADD_GENRE_BACK:
      return {
        ...state,
        genres: [
          ...state.genres.slice(0, action.addIndex),
          action.payload,
          ...state.genres.slice(action.addIndex),
        ],
        removedGenres: [
          ...state.removedGenres.filter(genre => {
            return genre != action.payload;
          }),
        ],
      };
    case genreActions.GenreActionType.REMOVE_GENRE:
      return {
        genres: [
          ...state.genres.slice(0, action.index),
          ...state.genres.slice(action.index + 1),
        ],
        removedGenres: [...state.removedGenres, action.payload],
        originalGenres: [...state.originalGenres],
      };
    case genreActions.GenreActionType.ADD_ORIGINAL_GENRES:
      return {
        ...state,
        originalGenres: [...state.originalGenres, action.payload],
      };
    case genreActions.GenreActionType.EMPTY_FILTER:
      return {
        ...state,
        removedGenres: [],
        genres: [...state.originalGenres],
      };
    case genreActions.GenreActionType.REMOVE_ONLY_GENRE:
      return {
        ...state,
        genres: [
          ...state.genres.slice(0, action.index),
          ...state.genres.slice(action.index + 1),
        ],
      };
    default: {
      if (localStorage.getItem('state')) {
        return JSON.parse(localStorage.getItem('state')!).genres.genres;
      } else {
        return state;
      }
    }
  }
}
