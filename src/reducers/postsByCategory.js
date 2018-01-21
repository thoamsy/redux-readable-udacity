// import createReducer from './createReducer';
import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/posts';
import { assoc } from 'ramda';
import posts from './posts';

const postsByCategory = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return assoc(action.category, posts(state[action.category], action), state);
    default:
      return state;
  }
};

export default postsByCategory;
