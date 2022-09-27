import { Article } from '../../interfaces/article';
import { Action } from '@ngrx/store';
import { CartActions, CartActionTypes } from '../actions/cart.action';

export interface CartState {
  articles: Article;
}

// const initialState: CartState = {
//   articlesInCart: [
//     {
//       key: 'initial',
//       name: 'initial',
//       text: 'initial',
//       fileUrl: 'initial',
//       fileName: 'initial',
//       magazine: 'initial',
//       uploader: 'initial',
//       date: {
//         day: 'initial',
//         month: 'initial',
//         year: 'initial',
//       },
//       uploadDate: 1,
//     },
//   ],
// };

const initialState: CartState = {
  articles: {
    key: 'initial',
    name: 'initial',
    text: 'initial',
    fileUrl: 'initial',
    fileName: 'initial',
    magazine: {
      key: 'initial',
      name: 'initial',
    },
    journalist: {
      key: 'initial',
      name: 'initial',
    },
    genre: 'initial',
    uploader: 'initial',
    date: {
      day: 1,
      month: 1,
      year: 1,
    },
    uploadDate: 1,
  },
};

export function cartReducer(
  state: CartState = initialState,
  action: CartActions
): CartState {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return { ...state, articles: action.payload };
    case CartActionTypes.REMOVE_ITEM:
      return { ...state, articles: action.payload };
    case CartActionTypes.RESET:
      return initialState;
    case CartActionTypes.GET:
      return state;
    default:
      return state;
  }
}
