import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const middlewares = [thunk, logger];
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      leaders: Leaders,
      promotions: Promotions,
    }),
    compose(applyMiddleware(...middlewares)),
  );
  return store;
}