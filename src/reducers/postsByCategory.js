// import createReducer from './createReducer';
import { RECEIVE_POSTS, REQUEST_POSTS, RECEIVE_POST_VOTE, REQUEST_POST_VOTE } from '../actions/posts';
import { assoc, evolve, __ } from 'ramda';
import posts from './posts';

const postsByCategory = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return assoc(action.category, posts(state[action.category], action), state);
    case RECEIVE_POST_VOTE:
    case REQUEST_POST_VOTE:
      return evolve({
        [action.category]: posts(__, action),
        all: posts(__, action)
    }, state);
    default:
      return state;
  }
};

export default postsByCategory;
