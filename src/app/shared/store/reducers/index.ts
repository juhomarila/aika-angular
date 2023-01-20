import { ActionReducerMap } from '@ngrx/store';
import { ArticleActions } from '../actions/article.actions';
import { FilterActions } from '../actions/filter.actions';
import { articleReducer, ArticleState } from './article.reducer';
import { filterReducer, FilterState } from './filter.reducers';

export const rootReducer = {};

export interface AppState {
  filters: FilterState;
  articles: ArticleState;
}

export type AppActions = ArticleActions & FilterActions;

export const reducers: ActionReducerMap<AppState, AppActions> = {
  filters: filterReducer,
  articles: articleReducer,
};
