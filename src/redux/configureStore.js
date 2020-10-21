import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from "react-redux-form";
import { initialFeedback } from './forms';

export const ConfigureStore = () => {
  const middlewares = [thunk, logger];
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      leaders: Leaders,
      promotions: Promotions,
      ...createForms({
        feedback: initialFeedback,
      })
    }),
    compose(applyMiddleware(...middlewares)),
  );
  return store;
}