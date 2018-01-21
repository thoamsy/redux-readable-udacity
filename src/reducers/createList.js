import { combineReducers } from 'redux';
import { prop } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/posts';

const ids = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.payload.map(prop('id'));
    default:
      return state;
  }
};
const isFetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return true;
    case RECEIVE_POSTS:
      return false;
    default:
      return state;
  }
};
// TODO: add error reducer

export default combineReducers({ isFetching, ids });
