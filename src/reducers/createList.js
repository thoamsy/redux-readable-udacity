import { combineReducers } from 'redux';
import { prop, T, F } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/posts';
import createReducer from '../util/createReducer';

const ids = createReducer([], {
  [RECEIVE_POSTS]: (state, action) => action.payload.map(prop('id')),
});
const isFetching = createReducer(false, {
  [REQUEST_POSTS]: T,
  [RECEIVE_POSTS]: F,
});
// TODO: add error reducer

export default combineReducers({ isFetching, ids });
