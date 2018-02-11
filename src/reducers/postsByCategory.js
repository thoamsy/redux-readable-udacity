// import createReducer from './createReducer';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POST_VOTE,
  DELETE_POST,
} from '../actions/posts';
import {
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT,
} from '../actions/comments';
import { PUBLISH_POST_SUCCESS } from '../actions/editPost';
import { assoc, evolve, __ } from 'ramda';
import posts from './posts';

const postsByCategory = (state = {}, action) => {
  const { category = 'all' } = action;

  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS: {
      return assoc(category, posts(state[category], action), state);
    }
    case RECEIVE_POST_VOTE:
    case FETCH_COMMENTS_SUCCESS:
    case PUBLISH_POST_SUCCESS:
    case DELETE_POST:
    case ADD_COMMENT_SUCCESS:
    case DELETE_COMMENT:
      return evolve(__, state)({
        [action.category]: posts(__, action),
        all: posts(__, action),
      });
    default:
      return state;
  }
};

export default postsByCategory;
