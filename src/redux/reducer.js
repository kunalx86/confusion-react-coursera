import { dishes } from '../shared/dishes';
import { comments } from '../shared/comments';
import { leaders } from '../shared/leaders';
import { promotions } from '../shared/promotions';

export const initialState = {
  dishes,
  comments,
  leaders,
  promotions,
};

export const Reducer = (state=initialState, action) => {
  return {...state};
};