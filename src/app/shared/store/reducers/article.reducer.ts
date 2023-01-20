import { Article } from '../../interfaces/article';
import * as articleActions from '../actions/article.actions';

export interface ArticleState {
  originalArticles: Article[];
  articles: Article[];
  article: Article | undefined;
}

const initialState: ArticleState = {
  originalArticles: [],
  articles: [],
  article: undefined,
};

export function articleReducer(
  state: ArticleState = initialState,
  action: articleActions.ArticleActions
): ArticleState {
  switch (action.type) {
    case articleActions.ArticleActionType.ADD_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case articleActions.ArticleActionType.ADD_ORIGINAL_ARTICLES:
      return {
        ...state,
        originalArticles: [...state.originalArticles, action.payload],
      };
    case articleActions.ArticleActionType.RESET_ARTICLES:
      return {
        ...state,
        articles: [...state.originalArticles],
      };
    case articleActions.ArticleActionType.GET_ARTICLE:
      return {
        ...state,
        article: state.articles.find((a => a.key === action.payload)!),
      };
    default: {
      return state;
    }
  }
}
