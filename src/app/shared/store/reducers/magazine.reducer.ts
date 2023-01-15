import * as magazineActions from '../actions/magazine.action';

export interface MagazineState {
  originalMagazines: string[];
  magazines: string[];
  removedMagazines: string[];
}

const initialState: MagazineState = {
  originalMagazines: [],
  magazines: [],
  removedMagazines: [],
};

export function magazineReducer(
  state: MagazineState = initialState,
  action: magazineActions.MagazineActions
): MagazineState {
  switch (action.type) {
    case magazineActions.MagazineActionType.ADD_MAGAZINE:
      return {
        ...state,
        magazines: [...state.magazines, action.payload],
      };
    case magazineActions.MagazineActionType.ADD_MAGAZINE_BACK:
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
    case magazineActions.MagazineActionType.REMOVE_MAGAZINE:
      return {
        magazines: [
          ...state.magazines.slice(0, action.index),
          ...state.magazines.slice(action.index + 1),
        ],
        removedMagazines: [...state.removedMagazines, action.payload],
        originalMagazines: [...state.originalMagazines],
      };
    case magazineActions.MagazineActionType.ADD_ORIGINAL_MAGAZINES:
      return {
        ...state,
        originalMagazines: [...state.originalMagazines, action.payload],
      };
    case magazineActions.MagazineActionType.EMPTY_FILTER:
      return {
        ...state,
        removedMagazines: [],
        magazines: [...state.originalMagazines],
      };
    default: {
      if (localStorage.getItem('state')) {
        return JSON.parse(localStorage.getItem('state')!).magazines.magazines;
      } else {
        return state;
      }
    }
  }
}
