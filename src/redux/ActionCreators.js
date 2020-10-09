import * as ActionTypes from './ActionTypes';
import { dishes } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
});

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());
  setTimeout(() => {
    dispatch(addDishes(dishes));
  }, 2000);
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = errMsg => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMsg,
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
})