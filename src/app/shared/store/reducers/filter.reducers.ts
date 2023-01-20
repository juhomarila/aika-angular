import * as filterActions from '../actions/filter.actions';

export interface FilterState {
  originalGenres: string[];
  genres: string[];
  removedGenres: string[];
  originalMagazines: string[];
  magazines: string[];
  removedMagazines: string[];
}

const initialState: FilterState = {
  originalGenres: [],
  genres: [],
  removedGenres: [],
  originalMagazines: [],
  magazines: [],
  removedMagazines: [],
};

export function filterReducer(
  state: FilterState = initialState,
  action: filterActions.FilterActions
): FilterState {
  switch (action.type) {
    case filterActions.FilterActionType.ADD_GENRE:
      return {
        ...state,
        genres: [...state.genres, action.payload],
      };
    case filterActions.FilterActionType.ADD_GENRE_BACK:
      return {
        ...state,
        genres: [
          ...state.genres.slice(0, action.addIndex),
          action.payload,
          ...state.genres.slice(action.addIndex),
        ],
        removedGenres: [
          ...state.removedGenres.filter(genre => {
            return genre != action.payloadTranslated;
          }),
        ],
      };
    case filterActions.FilterActionType.REMOVE_GENRE:
      return {
        ...state,
        genres: [
          ...state.genres.slice(0, action.index),
          ...state.genres.slice(action.index + 1),
        ],
        removedGenres: [...state.removedGenres, action.payload],
      };
    case filterActions.FilterActionType.ADD_ORIGINAL_GENRES:
      return {
        ...state,
        originalGenres: [...state.originalGenres, action.payload],
      };
    case filterActions.FilterActionType.EMPTY_GENRE_FILTER:
      return {
        ...state,
        removedGenres: [],
        genres: [...state.originalGenres],
      };
    case filterActions.FilterActionType.REMOVE_ONLY_GENRE:
      return {
        ...state,
        genres: [
          ...state.genres.slice(0, action.index),
          ...state.genres.slice(action.index + 1),
        ],
      };
    case filterActions.FilterActionType.ADD_MAGAZINE:
      return {
        ...state,
        magazines: [...state.magazines, action.payload],
      };
    case filterActions.FilterActionType.ADD_MAGAZINE_BACK:
      return {
        ...state,
        magazines: [
          ...state.magazines.slice(0, action.addIndex),
          action.payload,
          ...state.magazines.slice(action.addIndex),
        ],
        removedMagazines: [
          ...state.removedMagazines.filter(magazine => {
            return magazine != action.payload;
          }),
        ],
      };
    case filterActions.FilterActionType.REMOVE_MAGAZINE:
      return {
        ...state,
        magazines: [
          ...state.magazines.slice(0, action.index),
          ...state.magazines.slice(action.index + 1),
        ],
        removedMagazines: [...state.removedMagazines, action.payload],
      };
    case filterActions.FilterActionType.ADD_ORIGINAL_MAGAZINES:
      return {
        ...state,
        originalMagazines: [...state.originalMagazines, action.payload],
      };
    case filterActions.FilterActionType.EMPTY_MAGAZINE_FILTER:
      return {
        ...state,
        removedMagazines: [],
        magazines: [...state.originalMagazines],
      };
    default: {
      if (localStorage.getItem('state')) {
        return JSON.parse(localStorage.getItem('state')!).filters;
      } else {
        return state;
      }
    }
  }
}
