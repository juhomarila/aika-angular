import { CartState, cartReducer } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  cart: CartState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  cart: cartReducer,
};
