import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => async dispatch => {
  const newComment = {
    dishId,
    rating,
    author,
    comment,
    date: new Date().toISOString(),
  }
  try {
    const response = await fetch(baseUrl + 'comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    });
    if (response.ok) {
      const comment = await response.json();
      return dispatch(addComment(comment));
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    console.error(err);
    alert('Comment couldn\'t be posted')
  }
} 

export const postFeedback = async feedback => {
  try {
    const response = await fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });
    if (response.ok) {
      const resultFeedback = await response.json();
      alert(`Thank you for your feedback!\n${JSON.stringify(resultFeedback)}`);
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    console.error(err);
    alert('Feedback couldn\'t be posted');
  }
}

export const fetchDishes = () => async dispatch => {
  dispatch(dishesLoading());
  try {
    const response = await fetch(baseUrl + 'dishes');
    if (response.ok) {
      const dishes = await response.json();
      return dispatch(addDishes(dishes));
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    return dispatch(dishesFailed(err.message));
  }
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
  try {
    const response = await fetch(baseUrl + 'comments');
    if (response.ok) {
      const comments = await response.json();
      return dispatch(addComments(comments));
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    return dispatch(commentsFailed(err.message));
  }
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
  try {
    const response = await fetch(baseUrl + 'promotions');
    if (response.ok) {
      const promos = await response.json();
      return dispatch(addPromos(promos));
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    return dispatch(promosFailed(err.message));
  }
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

export const fetchLeaders = () => async dispatch => {
  dispatch(leadersLoading());
  try {
    const response = await fetch(baseUrl + 'leaders');
    if (response.ok) {
      const leaders = await response.json();
      return dispatch(addLeaders(leaders));
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  } catch(err) {
    return dispatch(leadersFailed(err.message));
  }
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const leadersFailed = errMsg => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMsg,
});