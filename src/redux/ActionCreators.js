import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
});

export const fetchDishes = () => async dispatch => {
  dispatch(dishesLoading());
  const response = await fetch(baseUrl + 'dishes');
  const dishes = await response.json();
  dispatch(addDishes(dishes));
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

export const fetchComments = () => async dispatch => {
  const response = await fetch(baseUrl + 'comments');
  const comments = await response.json();
  dispatch(addComments(comments));
}

export const commentsFailed = errMsg => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMsg,
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
})

export const fetchPromos = () => async dispatch => {
  dispatch(promosLoading(true));
  const response = await fetch(baseUrl + 'promotions');
  const promos = await response.json();
  dispatch(addPromos(promos));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const promosFailed = errMsg => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMsg,
});